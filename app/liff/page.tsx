"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import liff from "@line/liff";

import { createClient } from "../../lib/supabase/client";

const DEFAULT_NEXT = "/upload";

const ALLOWED_NEXT_PATHS = new Set([
  "/",
  "/upload",
  "/line/result",
  "/products",
  "/media",
  "/dashboard",
  "/debug-user",
]);

function getSafeNext() {
  const searchParams = new URLSearchParams(
    window.location.search,
  );

  const requestedNext =
    searchParams.get("next");

  if (
    requestedNext &&
    ALLOWED_NEXT_PATHS.has(requestedNext)
  ) {
    return requestedNext;
  }

  return DEFAULT_NEXT;
}

function getPageTitle(path: string) {
  switch (path) {
    case "/upload":
      return "AI垢抜け診断";

    case "/line/result":
      return "診断結果";

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

export default function LiffPage() {
  const [message, setMessage] = useState(
    "AKANUKE.AIを準備しています...",
  );

  const [pageTitle, setPageTitle] =
    useState("AKANUKE.AI");

  useEffect(() => {
    async function initializeLiff() {
      try {
        const liffId =
          process.env.NEXT_PUBLIC_LINE_LIFF_ID;

        if (!liffId) {
          throw new Error(
            "LIFF IDが設定されていません。",
          );
        }

        const safeNext = getSafeNext();

        setPageTitle(
          getPageTitle(safeNext),
        );

        await liff.init({
          liffId,
        });

        /*
         * LINEアプリ外からLIFFを開いた場合のみ
         * LINEログインを実行する。
         *
         * LINEアプリ内では
         * liff.init() によるログイン状態を利用する。
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

        setMessage(
          "LINE公式アカウントを確認しています...",
        );

        /*
         * AKANUKE.AI公式LINEとの
         * 友だち状態を確認
         */
        let friendship =
          await liff.getFriendship();

        /*
         * 未追加またはブロック中の場合は
         * 友だち追加を促す
         */
        if (!friendship.friendFlag) {
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
           * 追加画面を閉じた後に再確認
           */
          friendship =
            await liff.getFriendship();

          if (!friendship.friendFlag) {
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

        /*
         * LIFFブラウザ内ですでに
         * Supabaseログイン済みなら
         * そのまま目的ページへ
         */
        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (userError) {
          console.warn(
            "Supabase user check error:",
            userError,
          );
        }

        if (user) {
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
         * 既存custom:line OAuthを実行。
         *
         * source=liff を付けることで
         * callback側で公式LINEトークではなく
         * safeNextへ戻す。
         */
        const callbackUrl =
          `${window.location.origin}/auth/callback` +
          `?source=liff` +
          `&next=${encodeURIComponent(
            safeNext,
          )}`;

        const { error } =
          await supabase.auth.signInWithOAuth({
            provider: "custom:line",

            options: {
              redirectTo:
                callbackUrl,

              queryParams: {
                bot_prompt:
                  "aggressive",
              },
            },
          });

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