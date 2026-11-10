import type { User } from "@supabase/supabase-js";

/*
 * 管理画面の集計と削除記録で共通して使う、ユーザー区分の判定
 */

const PRODUCTION_PROVIDER =
  "custom:line-oidc";
const LEGACY_LINE_PROVIDER =
  "custom:line";
const EMAIL_PROVIDER = "email";

export type UserCategory =
  | "production"
  | "email"
  | "other";

/*
 * identities に加えて、既存のログイン処理（app/liff）が見ている
 * app_metadata.provider / providers も判定に使う
 */
export function getUserProviders(user: User) {
  const providers = new Set<string>();

  for (const identity of user.identities ?? []) {
    if (identity.provider) {
      providers.add(identity.provider);
    }
  }

  const appMetadata =
    user.app_metadata ?? {};

  if (
    typeof appMetadata.provider ===
    "string"
  ) {
    providers.add(appMetadata.provider);
  }

  if (
    Array.isArray(appMetadata.providers)
  ) {
    for (const provider of appMetadata.providers) {
      if (typeof provider === "string") {
        providers.add(provider);
      }
    }
  }

  return [...providers];
}

export function getUserCategory(
  user: User,
): UserCategory {
  const providers =
    getUserProviders(user);

  /*
   * 本番ユーザー：custom:line-oidc と旧方式の custom:line
   */
  if (
    providers.includes(
      PRODUCTION_PROVIDER,
    ) ||
    providers.includes(
      LEGACY_LINE_PROVIDER,
    )
  ) {
    return "production";
  }

  if (
    providers.includes(EMAIL_PROVIDER)
  ) {
    return "email";
  }

  return "other";
}

