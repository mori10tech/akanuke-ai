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
  ]);

function getSafeNext() {
  const searchParams =
    new URLSearchParams(
      window.location.search,
    );

  const requestedNext =
    searchParams.get("next");

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
 * 診断結果・おすすめ商品は
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
  ] = useState(
    "AKANUKE.AIを準備しています...",
  );

  const [
    pageTitle,
    setPageTitle,
  ] = useState(
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
         * LINEアプリ外から
         * LIFFを開いた場合のみ
         * LINEログインを実行する。
         *
         * LINEアプリ内では
         * liff.init() による
         * ログイン状態を利用する。
         */
        if (
          !liff.isInClient() &&
          !liff.isLoggedIn()
        ) {
          liff.login({
            redirectUri:
              window.location
                .href,
          });

          return;
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
         * 未追加または
         * ブロック中の場合は
         * 友だち追加を促す。
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
          "ログイン状態を確認しています...",
        );

        const supabase =
          createClient();

        const {
          data: {
            user,
          },
          error:
            userError,
        } =
          await supabase.auth.getUser();

        if (userError) {
          console.warn(
            "Supabase user check error:",
            userError,
          );
        }

        /*
         * LIFFブラウザ内ですでに
         * Supabaseログイン済みの場合。
         *
         * 診断結果・おすすめ商品への
         * アクセスでは診断履歴を確認してから
         * 遷移先を決定する。
         */
        if (user) {
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
              resolvedNext,
            );

            return;
          }

          /*
           * AI診断・マイページ・
           * メディア・トップなどは
           * 診断履歴に関係なく
           * そのままアクセスする。
           */
          window.location.replace(
            safeNext,
          );

          return;
        }

        setMessage(
          "AKANUKE.AIにログインしています...",
        );

        /*
         * Supabase未ログインの場合のみ
         * custom:line OAuthを実行する。
         *
         * callback側でも
         * safeNextと診断履歴を確認して
         * 最終的な遷移先を決定する。
         */
        const callbackUrl =
          `${window.location.origin}/auth/callback` +
          `?source=liff` +
          `&next=${encodeURIComponent(
            safeNext,
          )}`;

        const {
          error,
        } =
          await supabase.auth.signInWithOAuth(
            {
              provider:
                "custom:line",

              options: {
                redirectTo:
                  callbackUrl,

                queryParams: {
                  bot_prompt:
                    "aggressive",
                },
              },
            },
          );

        if (error) {
          throw error;
        }
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