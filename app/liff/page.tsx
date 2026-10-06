"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
} from "react";
import liff from "@line/liff";

import {
  createClient,
} from "../../lib/supabase/client";

const DEFAULT_NEXT =
  "/upload";

const ALLOWED_NEXT_PATHS =
  new Set([
    "/",
    "/upload",
    "/line/result",
    "/plan",
    "/products",
    "/media",
    "/dashboard",
    "/debug-user",
  ]);

function getSafeNext() {
  const searchParams =
    new URLSearchParams(
      window.location.search,
    );

  const requestedNext =
    searchParams.get(
      "next",
    );

  if (
    requestedNext &&
    ALLOWED_NEXT_PATHS.has(
      requestedNext,
    )
  ) {
    return requestedNext;
  }

  return DEFAULT_NEXT;
}

function getRedirectPath(
  path: string,
  loginCompleted: boolean,
) {
  if (!loginCompleted) {
    return path;
  }

  const url =
    new URL(
      path,
      window.location.origin,
    );

  url.searchParams.set(
    "login_complete",
    "1",
  );

  return `${url.pathname}${url.search}${url.hash}`;
}

function getPageTitle(
  path: string,
) {
  switch (path) {
    case "/upload":
      return "AI垢抜け診断";

    case "/line/result":
      return "診断結果";

    case "/plan":
      return "垢抜けプラン";

    case "/products":
      return "おすすめ商品";

    case "/media":
      return "AKANUKE JOURNAL";

    case "/dashboard":
      return "マイページ";

    case "/":
      return "AKANUKE.AI";

    default:
      return "AKANUKE.AI";
  }
}

/*
 * リッチメニューから要求されたページと
 * 診断履歴の有無から実際の遷移先を決定する。
 *
 * 診断結果・垢抜けプラン・おすすめ商品は
 * 診断データを前提とするため、
 * 未診断ユーザーは診断画面へ誘導する。
 *
 * マイページ・メディア・トップ・AI診断は
 * 診断履歴の有無に関係なくアクセス可能。
 */
function resolveNextPath(
  requestedPath: string,
  hasDiagnosis: boolean,
) {
  if (
    requestedPath ===
    "/line/result"
  ) {
    return hasDiagnosis
      ? "/line/result"
      : "/upload";
  }

  if (
    requestedPath ===
    "/plan"
  ) {
    return hasDiagnosis
      ? "/plan"
      : "/upload";
  }

  if (
    requestedPath ===
    "/products"
  ) {
    return hasDiagnosis
      ? "/products"
      : "/upload";
  }

  return requestedPath;
}

async function getHasDiagnosis() {
  const response =
    await fetch(
      "/api/diagnoses/latest",
      {
        method: "GET",
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "診断履歴を確認できませんでした。",
    );
  }

  const data =
    (await response.json()) as {
      hasDiagnosis?: boolean;
    };

  return Boolean(
    data.hasDiagnosis,
  );
}

export default function LiffPage() {
  const [
    message,
    setMessage,
  ] =
    useState(
      "AKANUKE.AIを準備しています...",
    );

  const [
    pageTitle,
    setPageTitle,
  ] =
    useState(
      "AKANUKE.AI",
    );

  useEffect(() => {
    async function initializeLiff() {
      try {
        const liffId =
          process.env
            .NEXT_PUBLIC_LINE_LIFF_ID;

        if (!liffId) {
          throw new Error(
            "LIFF IDが設定されていません。",
          );
        }

        const safeNext =
          getSafeNext();

        setPageTitle(
          getPageTitle(
            safeNext,
          ),
        );

        await liff.init({
          liffId,
        });

        /*
         * LINEアプリ外からLIFFを開いた場合のみ、
         * LINE側のログイン状態を確立する。
         *
         * LINEアプリ内では liff.init() 後の
         * ログイン状態をそのまま利用する。
         */
        if (
          !liff.isInClient() &&
          !liff.isLoggedIn()
        ) {
          liff.login({
            redirectUri:
              window.location.href,
          });

          return;
        }

        if (!liff.isLoggedIn()) {
          throw new Error(
            "LINEのログイン状態を確認できませんでした。",
          );
        }

        setMessage(
          "LINE公式アカウントを確認しています...",
        );

        /*
         * AKANUKE.AI公式LINEとの
         * 友だち状態を確認する。
         */
        let friendship =
          await liff.getFriendship();

        /*
         * 未追加またはブロック中の場合は
         * LIFF内で友だち追加を促す。
         */
        if (
          !friendship.friendFlag
        ) {
          setMessage(
            "AKANUKE.AI公式LINEの友だち追加が必要です...",
          );

          try {
            await liff.requestFriendship();
          } catch (error) {
            console.error(
              "LINE friendship request error:",
              error,
            );
          }

          /*
           * 追加画面を閉じた後に
           * 友だち状態を再確認する。
           */
          friendship =
            await liff.getFriendship();

          if (
            !friendship.friendFlag
          ) {
            setMessage(
              "AKANUKE.AIを利用するには、LINE公式アカウントの友だち追加が必要です。",
            );

            return;
          }
        }

        setMessage(
          "AKANUKE.AIにログインしています...",
        );

        const supabase =
          createClient();

        /*
         * LIFFがすでに持っているLINE ID Tokenを使って、
         * SupabaseのCustom OIDC Providerへログインする。
         *
         * これによりLINEアプリ内で
         * custom:line OAuthをもう一度実行しない。
         */
        const idToken =
          liff.getIDToken();

        const accessToken =
          liff.getAccessToken();

        if (!idToken) {
          throw new Error(
            "LINE ID Tokenを取得できませんでした。",
          );
        }

        /*
         * すでにOIDCセッションが存在する場合は、
         * 不要な再ログインを行わない。
         */
        const {
          data: {
            user: currentUser,
          },
          error:
            currentUserError,
        } =
          await supabase.auth.getUser();

        if (
          currentUserError
        ) {
          console.warn(
            "Supabase user check error:",
            currentUserError,
          );
        }

        const currentProvider =
          typeof currentUser
            ?.app_metadata
            ?.provider ===
          "string"
            ? currentUser
                .app_metadata
                .provider
            : null;

        let authenticatedUser =
          currentUser;

        let didSignIn =
  false;

        /*
         * 既存の旧custom:lineセッションが残っている場合も含め、
         * custom:line-oidc以外なら
         * LINE ID Tokenを使ってOIDCログインへ切り替える。
         *
         * 既存ユーザーはテストユーザーのため、
         * user_idの引き継ぎは行わない。
         */
        if (
          !authenticatedUser ||
          currentProvider !==
            "custom:line-oidc"
        ) {
          const {
            data,
            error,
          } =
            await supabase.auth.signInWithIdToken(
              {
                provider:
                  "custom:line-oidc",

                token:
                  idToken,

                ...(accessToken
                  ? {
                      access_token:
                        accessToken,
                    }
                  : {}),
              },
            );

          if (error) {
            throw error;
          }

          if (!data.user) {
            throw new Error(
              "Supabaseユーザーを取得できませんでした。",
            );
          }

          authenticatedUser =
            data.user;

          didSignIn =
            true;
        }

        if (!authenticatedUser) {
          throw new Error(
            "ログイン状態を確認できませんでした。",
          );
        }

        /*
         * 診断結果・垢抜けプラン・おすすめ商品は
         * 診断履歴を確認してから遷移先を決定する。
         */
        if (
          safeNext ===
            "/line/result" ||
          safeNext ===
            "/plan" ||
          safeNext ===
            "/products"
        ) {
          setMessage(
            "診断履歴を確認しています...",
          );

          const hasDiagnosis =
            await getHasDiagnosis();

          const resolvedNext =
            resolveNextPath(
              safeNext,
              hasDiagnosis,
            );

          window.location.replace(
  getRedirectPath(
    resolvedNext,
    didSignIn,
  ),
);

          return;
        }
        /*
 * LINEから「AI診断」を明示的に開いた場合は、
 * 診断済みユーザーでも再診断画面を表示する。
 */
if (
  safeNext ===
  "/upload"
) {
  window.location.replace(
  getRedirectPath(
    "/upload?mode=retry",
    didSignIn,
  ),
);

  return;
}

        /*
         * マイページ・メディア・トップなどは
         * 診断履歴に関係なくそのままアクセスする。
         */
        window.location.replace(
  getRedirectPath(
    safeNext,
    didSignIn,
  ),
);
      } catch (error) {
        console.error(
          "LIFF initialization error:",
          error,
        );

        setMessage(
          "LINEとの接続に失敗しました。もう一度お試しください。",
        );
      }
    }

    void initializeLiff();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 text-[#111111]">
      <div className="w-full max-w-[420px] text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-[20px] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
          <Image
            src="/icon-512.png"
            alt="AKANUKE.AI"
            width={80}
            height={80}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mt-4 text-[26px] font-black tracking-[-0.04em]">
          {pageTitle}
        </h1>

        <p className="mt-4 text-[13px] leading-7 text-black/50">
          {message}
        </p>
      </div>
    </main>
  );
}