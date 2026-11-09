/*
 * 管理者ページ（/admin 以下）のアクセス判定
 * proxy.ts とページ側の両方から使う
 */

type HeaderReader = {
  get(name: string): string | null;
};

export function isAdminPath(
  pathname: string,
) {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  );
}

/*
 * proxy.ts の getClientIp と同じ方法で取得する
 */
export function getAdminClientIp(
  headers: HeaderReader,
) {
  const forwardedFor =
    headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return null;
  }

  return (
    forwardedFor
      .split(",")[0]
      ?.trim() ?? null
  );
}

function getAdminAllowedIps() {
  return (
    process.env.ADMIN_ALLOWED_IPS ?? ""
  )
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
}

/*
 * 3つの環境変数がすべて設定されている場合のみ有効
 */
export function isAdminAccessConfigured() {
  return (
    getAdminAllowedIps().length > 0 &&
    Boolean(
      process.env.ADMIN_BASIC_AUTH_USER,
    ) &&
    Boolean(
      process.env
        .ADMIN_BASIC_AUTH_PASSWORD,
    )
  );
}

export function isAdminIpAllowed(
  headers: HeaderReader,
) {
  const clientIp =
    getAdminClientIp(headers);

  if (!clientIp) {
    return false;
  }

  return getAdminAllowedIps().includes(
    clientIp,
  );
}

function safeEqual(
  a: string,
  b: string,
) {
  const length = Math.max(
    a.length,
    b.length,
  );

  let diff = a.length ^ b.length;

  for (let i = 0; i < length; i++) {
    diff |=
      (a.charCodeAt(i) || 0) ^
      (b.charCodeAt(i) || 0);
  }

  return diff === 0;
}

export function isAdminBasicAuthValid(
  headers: HeaderReader,
) {
  const username =
    process.env.ADMIN_BASIC_AUTH_USER;

  const password =
    process.env
      .ADMIN_BASIC_AUTH_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const authorization =
    headers.get("authorization");

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

    const isUsernameValid = safeEqual(
      inputUsername,
      username,
    );

    const isPasswordValid = safeEqual(
      inputPassword,
      password,
    );

    return (
      isUsernameValid &&
      isPasswordValid
    );
  } catch {
    return false;
  }
}

/*
 * ページ側の最終確認（IP と Basic 認証の両方）
 */
export function isAdminRequestAllowed(
  headers: HeaderReader,
) {
  return (
    isAdminAccessConfigured() &&
    isAdminIpAllowed(headers) &&
    isAdminBasicAuthValid(headers)
  );
}
