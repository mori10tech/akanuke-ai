import {
  createServerClient,
} from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function updateSupabaseSession(
  request: NextRequest,
) {
  let response =
    NextResponse.next({
      request,
    });

  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (
    !supabaseUrl ||
    !supabasePublishableKey
  ) {
    return {
      response,
      isAuthenticated: false,
    };
  }

  const supabase =
    createServerClient(
      supabaseUrl,
      supabasePublishableKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },

          setAll(cookiesToSet) {
            cookiesToSet.forEach(
              ({
                name,
                value,
              }) => {
                request.cookies.set(
                  name,
                  value,
                );
              },
            );

            response =
              NextResponse.next({
                request,
              });

            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                response.cookies.set(
                  name,
                  value,
                  options,
                );
              },
            );
          },
        },
      },
    );

  /*
   * Proxyではユーザー情報そのものは不要で、
   * 「認証済みか」だけ判定できれば十分です。
   *
   * getUser() はSupabase Authへの
   * ネットワーク通信が発生するため、
   * ページ表示前の大きな遅延原因になります。
   *
   * getClaims() はJWTを検証して
   * 認証状態を判定する用途に適しています。
   */
  const {
    data,
    error,
  } =
    await supabase.auth.getClaims();

  return {
    response,

    isAuthenticated:
      !error &&
      Boolean(
        data?.claims?.sub,
      ),
  };
}