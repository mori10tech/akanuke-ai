import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../../../lib/supabase/admin";

type LineProfile = {
  userId?: string;
  displayName?: string;
  pictureUrl?: string;
};

type LineTokenVerifyResponse = {
  client_id?: string;
  expires_in?: number;
  scope?: string;
};

type RateLimitRow = {
  allowed: boolean;
  used: number;
  remaining: number;
  retry_after_seconds: number;
};

const RATE_LIMIT_REQUESTS = 20;
const RATE_LIMIT_WINDOW_SECONDS = 60;

function getClientIp(
  request: NextRequest,
) {
  const vercelForwardedFor =
    request.headers.get(
      "x-vercel-forwarded-for",
    );

  if (vercelForwardedFor) {
    const values =
      vercelForwardedFor
        .split(",")
        .map((value) =>
          value.trim(),
        )
        .filter(Boolean);

    if (values.length > 0) {
      return values[
        values.length - 1
      ];
    }
  }

  const forwardedFor =
    request.headers.get(
      "x-forwarded-for",
    );

  if (forwardedFor) {
    const values =
      forwardedFor
        .split(",")
        .map((value) =>
          value.trim(),
        )
        .filter(Boolean);

    if (values.length > 0) {
      return values[
        values.length - 1
      ];
    }
  }

  return "unknown";
}

export async function GET(
  request: NextRequest,
) {
  const clientIp =
    getClientIp(request);

  const adminClient =
    createAdminClient();

  /*
   * =====================================================
   * レート制限
   * =====================================================
   */
  const {
    data: rateRows,
    error: rateError,
  } =
    await adminClient.rpc(
      "claim_api_rate_limit",
      {
        p_rate_key:
          `line-userinfo:${clientIp}`,
        p_limit:
          RATE_LIMIT_REQUESTS,
        p_window_seconds:
          RATE_LIMIT_WINDOW_SECONDS,
      },
    );

  if (rateError) {
    console.error(
      "[AKANUKE.AI] LINE userinfo レート制限確認エラー:",
      rateError,
    );

    return NextResponse.json(
      {
        error:
          "Request temporarily unavailable",
      },
      {
        status: 503,
      },
    );
  }

  const rate =
    Array.isArray(rateRows)
      ? (
          rateRows[0] as
            | RateLimitRow
            | undefined
        )
      : undefined;

  if (!rate) {
    console.error(
      "[AKANUKE.AI] LINE userinfo レート制限結果が空です:",
      {
        clientIp,
      },
    );

    return NextResponse.json(
      {
        error:
          "Request temporarily unavailable",
      },
      {
        status: 503,
      },
    );
  }

  if (!rate.allowed) {
    return NextResponse.json(
      {
        error:
          "Too Many Requests",
      },
      {
        status: 429,
        headers: {
          "Retry-After":
            String(
              rate.retry_after_seconds,
            ),
        },
      },
    );
  }

  /*
   * =====================================================
   * Bearer Token確認
   * =====================================================
   */
  const authorization =
    request.headers.get(
      "authorization",
    );

  if (
    !authorization?.startsWith(
      "Bearer ",
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const accessToken =
    authorization
      .slice(
        "Bearer ".length,
      )
      .trim();

  if (!accessToken) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const lineLoginChannelId =
    process.env
      .LINE_LOGIN_CHANNEL_ID;

  if (!lineLoginChannelId) {
    console.error(
      "[AKANUKE.AI] LINE_LOGIN_CHANNEL_ID が設定されていません。",
    );

    return NextResponse.json(
      {
        error:
          "LINE authentication is not configured",
      },
      {
        status: 500,
      },
    );
  }

  try {
    /*
     * =====================================================
     * LINEアクセストークン検証
     * =====================================================
     */
    const verifyUrl =
      new URL(
        "https://api.line.me/oauth2/v2.1/verify",
      );

    verifyUrl.searchParams.set(
      "access_token",
      accessToken,
    );

    const verifyResponse =
      await fetch(
        verifyUrl.toString(),
        {
          method: "GET",
          cache: "no-store",
        },
      );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        {
          error:
            "Invalid LINE access token",
        },
        {
          status: 401,
        },
      );
    }

    const verifyData =
      (await verifyResponse.json()) as
        LineTokenVerifyResponse;

    if (
      verifyData.client_id !==
      lineLoginChannelId
    ) {
      console.warn(
        "[AKANUKE.AI] 別LINE Loginチャネルのアクセストークンを拒否:",
        {
          clientId:
            verifyData.client_id,
        },
      );

      return NextResponse.json(
        {
          error:
            "Invalid LINE access token",
        },
        {
          status: 401,
        },
      );
    }

    if (
      typeof verifyData.expires_in !==
        "number" ||
      verifyData.expires_in <=
        0
    ) {
      return NextResponse.json(
        {
          error:
            "LINE access token expired",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * =====================================================
     * LINEプロフィール取得
     * =====================================================
     */
    const profileResponse =
      await fetch(
        "https://api.line.me/v2/profile",
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
          cache: "no-store",
        },
      );

    if (
      !profileResponse.ok
    ) {
      return NextResponse.json(
        {
          error:
            "Failed to get LINE profile",
        },
        {
          status:
            profileResponse.status,
        },
      );
    }

    const profile =
      (await profileResponse.json()) as
        LineProfile;

    if (!profile.userId) {
      return NextResponse.json(
        {
          error:
            "LINE user ID was not returned",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json(
      {
        sub:
          profile.userId,
        name:
          profile.displayName ??
          "",
        picture:
          profile.pictureUrl ??
          null,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] LINE userinfo error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "LINE profile request failed",
      },
      {
        status: 500,
      },
    );
  }
}