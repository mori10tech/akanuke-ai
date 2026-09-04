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

type RateLimitClaim = {
  allowed: boolean;
  used: number;
  remaining: number;
  retry_after_seconds: number;
};

const RATE_LIMIT = 20;
const RATE_WINDOW_SECONDS = 60;

function getClientIp(
  request: NextRequest,
) {
  /*
   * Vercelが付与するヘッダを優先します。
   * x-forwarded-for は複数IPの場合があるため、
   * 先頭だけを使用します。
   */
  const vercelForwardedFor =
    request.headers.get(
      "x-vercel-forwarded-for",
    );

  if (vercelForwardedFor) {
    return (
      vercelForwardedFor
        .split(",")[0]
        ?.trim() || "unknown"
    );
  }

  const forwardedFor =
    request.headers.get(
      "x-forwarded-for",
    );

  if (forwardedFor) {
    return (
      forwardedFor
        .split(",")[0]
        ?.trim() || "unknown"
    );
  }

  return "unknown";
}

export async function GET(
  request: NextRequest,
) {
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
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  /*
   * Authorization形式を確認した後、
   * LINE APIを呼ぶ前にレート制限します。
   */
  try {
    const adminClient =
      createAdminClient();

    const clientIp =
      getClientIp(request);

    const {
      data: rateLimitData,
      error: rateLimitError,
    } =
      await adminClient.rpc(
        "claim_api_rate_limit",
        {
          p_rate_key:
            `line-userinfo:${clientIp}`,
          p_limit:
            RATE_LIMIT,
          p_window_seconds:
            RATE_WINDOW_SECONDS,
        },
      );

    if (rateLimitError) {
      console.error(
        "[AKANUKE.AI] LINE userinfo レート制限確認エラー:",
        rateLimitError,
      );

      return NextResponse.json(
        {
          error:
            "LINE authentication is temporarily unavailable",
        },
        {
          status: 503,
        },
      );
    }

    const rateLimit =
      Array.isArray(
        rateLimitData,
      ) &&
      rateLimitData.length > 0
        ? (rateLimitData[0] as RateLimitClaim)
        : null;

    if (
      !rateLimit ||
      typeof rateLimit.allowed !==
        "boolean" ||
      typeof rateLimit.used !==
        "number" ||
      typeof rateLimit.remaining !==
        "number" ||
      typeof rateLimit.retry_after_seconds !==
        "number"
    ) {
      console.error(
        "[AKANUKE.AI] LINE userinfo レート制限RPCのレスポンス形式が不正です:",
        rateLimitData,
      );

      return NextResponse.json(
        {
          error:
            "LINE authentication is temporarily unavailable",
        },
        {
          status: 503,
        },
      );
    }

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests",
        },
        {
          status: 429,
          headers: {
            "Retry-After":
              String(
                rateLimit.retry_after_seconds,
              ),
          },
        },
      );
    }
  } catch (rateLimitError) {
    console.error(
      "[AKANUKE.AI] LINE userinfo レート制限処理エラー:",
      rateLimitError,
    );

    return NextResponse.json(
      {
        error:
          "LINE authentication is temporarily unavailable",
      },
      {
        status: 503,
      },
    );
  }

  /*
   * ここから下は既存のLINEプロフィール取得処理です。
   */
  try {
    const response = await fetch(
      "https://api.line.me/v2/profile",
      {
        headers: {
          Authorization:
            authorization,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Failed to get LINE profile",
        },
        {
          status:
            response.status,
        },
      );
    }

    const profile =
      (await response.json()) as LineProfile;

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

    return NextResponse.json({
      sub: profile.userId,
      name:
        profile.displayName ?? "",
      picture:
        profile.pictureUrl ??
        null,
    });
  } catch (error) {
    console.error(
      "LINE userinfo error:",
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