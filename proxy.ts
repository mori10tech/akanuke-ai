import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isBasicAuthEnabled =
    process.env.BASIC_AUTH_ENABLED === "true";

  if (!isBasicAuthEnabled) {
    return NextResponse.next();
  }

  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  if (!username || !password) {
    return new NextResponse(
      "Basic authentication is not configured.",
      {
        status: 500,
      },
    );
  }

  const authorization =
    request.headers.get("authorization");

  if (authorization) {
    const [scheme, encodedCredentials] =
      authorization.split(" ");

    if (
      scheme === "Basic" &&
      encodedCredentials
    ) {
      try {
        const decodedCredentials = atob(
          encodedCredentials,
        );

        const separatorIndex =
          decodedCredentials.indexOf(":");

        if (separatorIndex !== -1) {
          const inputUsername =
            decodedCredentials.slice(
              0,
              separatorIndex,
            );

          const inputPassword =
            decodedCredentials.slice(
              separatorIndex + 1,
            );

          if (
            inputUsername === username &&
            inputPassword === password
          ) {
            return NextResponse.next();
          }
        }
      } catch {
        // 不正なAuthorizationヘッダーの場合は
        // 下の401レスポンスへ進みます。
      }
    }
  }

  return new NextResponse(
    "Authentication required.",
    {
      status: 401,
      headers: {
        "WWW-Authenticate":
          'Basic realm="AKANUKE.AI", charset="UTF-8"',
        "Cache-Control":
          "no-store, no-cache, must-revalidate",
      },
    },
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};