import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(
  request: NextRequest,
) {
  const requestUrl =
    new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const next =
    requestUrl.searchParams.get("next") ??
    "/dashboard";

  if (code) {
    const supabase =
      await createClient();

    const { error } =
  await supabase.auth.exchangeCodeForSession(
    code,
  );

if (error) {
  console.error("Auth callback error:", error);
}

if (!error) {
      const redirectUrl =
        request.nextUrl.clone();

      redirectUrl.pathname = next;
      redirectUrl.search = "";

      return NextResponse.redirect(
        redirectUrl,
      );
    }
  }

  const loginUrl =
    request.nextUrl.clone();

  loginUrl.pathname = "/login";
  loginUrl.search = "";

  return NextResponse.redirect(
    loginUrl,
  );
}