import {
  NextRequest,
  NextResponse,
} from "next/server";
import { updateSupabaseSession } from "./lib/supabase/proxy";

function getClientIp(
  request: NextRequest,
) {
  const forwardedFor =
    request.headers.get(
      "x-forwarded-for",
    );

  if (!forwardedFor) {
    return null;
  }

  return (
    forwardedFor
      .split(",")[0]
      ?.trim() ?? null
  );
}

function getBypassIps() {
  return (
    process.env
      .BASIC_AUTH_BYPASS_IPS ?? ""
  )
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
}

function isBasicAuthValid(
  request: NextRequest,
) {
  const username =
    process.env.BASIC_AUTH_USER;

  const password =
    process.env.BASIC_AUTH_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const authorization =
    request.headers.get(
      "authorization",
    );

  if (!authorization) {
    return false;
  }

  const [
    scheme,
    encodedCredentials,
  ] = authorization.split(" ");

  if (
    scheme !== "Basic" ||
    !encodedCredentials
  ) {
    return false;
  }

  try {
    const decodedCredentials =
      atob(encodedCredentials);

    const separatorIndex =
      decodedCredentials.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const inputUsername =
      decodedCredentials.slice(
        0,
        separatorIndex,
      );

    const inputPassword =
      decodedCredentials.slice(
        separatorIndex + 1,
      );

    return (
      inputUsername === username &&
      inputPassword === password
    );
  } catch {
    return false;
  }
}

const protectedPagePaths = [
  "/app",
  "/dashboard",
  "/upload",
  "/preview",
  "/analyzing",
  "/result",
  "/plan",
  "/products",
  "/history",
  "/preferences",
  "/salon",
];

const protectedApiPaths = [
  "/api/analyze",
  "/api/generate-after",
  "/api/openai-test",
];

function matchesProtectedPath(
  pathname: string,
  paths: string[],
) {
  return paths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`),
  );
}

function requiresPageLogin(
  pathname: string,
) {
  return matchesProtectedPath(
    pathname,
    protectedPagePaths,
  );
}

function requiresApiLogin(
  pathname: string,
) {
  return matchesProtectedPath(
    pathname,
    protectedApiPaths,
  );
}

function isGuestOnlyPage(
  pathname: string,
) {
  return (
    pathname === "/login" ||
    pathname === "/signup"
  );
}

export async function proxy(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

    const isLineUserinfoApi =
  pathname ===
  "/api/auth/line/userinfo";

  /*
   * 1. Basic認証
   */
  const isBasicAuthEnabled =
    process.env
      .BASIC_AUTH_ENABLED === "true";

  if (
  isBasicAuthEnabled &&
  !isLineUserinfoApi
) {
    const clientIp =
      getClientIp(request);

    const bypassIps =
      getBypassIps();

    const isIpBypassed =
      Boolean(clientIp) &&
      bypassIps.includes(
        clientIp as string,
      );

    if (
      !isIpBypassed &&
      !isBasicAuthValid(request)
    ) {
      if (
        !process.env
          .BASIC_AUTH_USER ||
        !process.env
          .BASIC_AUTH_PASSWORD
      ) {
        return new NextResponse(
          "Basic authentication is not configured.",
          {
            status: 500,
          },
        );
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
  }

  /*
   * 2. Supabaseセッション確認・更新
   */
  const {
    response,
    isAuthenticated,
  } =
    await updateSupabaseSession(
      request,
    );

  /*
   * 3. 未ログインユーザーから
   *    Dashboardを保護
   */
  if (
  requiresApiLogin(pathname) &&
  !isAuthenticated
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

if (
  requiresPageLogin(pathname) &&
  !isAuthenticated
) {
  const loginUrl =
    request.nextUrl.clone();

  loginUrl.pathname = "/login";
loginUrl.search = "";
loginUrl.searchParams.set(
  "next",
  pathname,
);

  return NextResponse.redirect(
    loginUrl,
  );
}

  /*
   * 4. ログイン済みユーザーが
   *    /login・/signupを開いた場合
   *    Dashboardへ戻す
   */
  if (
    isGuestOnlyPage(pathname) &&
    isAuthenticated
  ) {
    const dashboardUrl =
      request.nextUrl.clone();

    dashboardUrl.pathname =
      "/dashboard";

    dashboardUrl.search = "";

    return NextResponse.redirect(
      dashboardUrl,
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
