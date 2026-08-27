import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "../../../lib/supabase/server";

type LineFriendshipResponse = {
  friendFlag?: boolean;
};

const DEFAULT_NEXT = "/upload";

const ALLOWED_NEXT_PATHS = new Set([
  "/",
  "/upload",
  "/line/result",
  "/products",
  "/media",
  "/dashboard",
]);

function getSafeNext(
  value: string | null,
) {
  if (
    value &&
    ALLOWED_NEXT_PATHS.has(value)
  ) {
    return value;
  }

  return DEFAULT_NEXT;
}

function createLoginRedirect(
  request: NextRequest,
  reason?: string,
) {
  const loginUrl =
    request.nextUrl.clone();

  loginUrl.pathname = "/login";
  loginUrl.search = "";

  if (reason) {
    loginUrl.searchParams.set(
      "reason",
      reason,
    );
  }

  return NextResponse.redirect(
    loginUrl,
  );
}

function createInternalRedirect(
  request: NextRequest,
  pathname: string,
) {
  const redirectUrl =
    request.nextUrl.clone();

  redirectUrl.pathname = pathname;
  redirectUrl.search = "";

  return NextResponse.redirect(
    redirectUrl,
  );
}

export async function GET(
  request: NextRequest,
) {
  const requestUrl =
    new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const safeNext =
    getSafeNext(
      requestUrl.searchParams.get(
        "next",
      ),
    );

  if (!code) {
    return createLoginRedirect(
      request,
      "auth_failed",
    );
  }

  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.auth.exchangeCodeForSession(
      code,
    );

  if (error) {
    console.error(
      "Auth callback error:",
      error,
    );

    return createLoginRedirect(
      request,
      "auth_failed",
    );
  }

  const providerToken =
    data.session?.provider_token;

  if (!providerToken) {
    console.error(
      "LINE provider token was not returned.",
    );

    await supabase.auth.signOut();

    return createLoginRedirect(
      request,
      "line_friend_check_failed",
    );
  }

  try {
    const friendshipResponse =
      await fetch(
        "https://api.line.me/friendship/v1/status",
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${providerToken}`,
          },

          cache: "no-store",
        },
      );

    if (!friendshipResponse.ok) {
      const responseText =
        await friendshipResponse.text();

      console.error(
        "LINE friendship API error:",
        friendshipResponse.status,
        responseText,
      );

      await supabase.auth.signOut();

      return createLoginRedirect(
        request,
        "line_friend_check_failed",
      );
    }

    const friendshipData =
      (await friendshipResponse.json()) as LineFriendshipResponse;

    /*
     * 友だち追加していない、
     * またはブロック中なら
     * AKANUKE.AIを利用させない
     */
    if (
      friendshipData.friendFlag !== true
    ) {
      await supabase.auth.signOut();

      return createLoginRedirect(
        request,
        "line_friend_required",
      );
    }

    /*
     * LINE認証・友だち確認が
     * 正常に完了したら、
     * 認証を開始したブラウザ上で
     * AKANUKE.AIへ戻す。
     *
     * Safariから開始
     * → SafariでsafeNextへ
     *
     * LIFFから開始
     * → LIFFでsafeNextへ
     *
     * ブラウザを強制的に
     * LINEトークへ移動させない。
     */
    return createInternalRedirect(
      request,
      safeNext,
    );
  } catch (error) {
    console.error(
      "LINE friendship check error:",
      error,
    );

    await supabase.auth.signOut();

    return createLoginRedirect(
      request,
      "line_friend_check_failed",
    );
  }
}