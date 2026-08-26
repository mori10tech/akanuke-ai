"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

import { createClient } from "../../lib/supabase/client";

export default function LiffPage() {
  const [message, setMessage] = useState(
    "AKANUKE.AIを準備しています...",
  );

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

        await liff.init({
          liffId,
          withLoginOnExternalBrowser: true,
        });

        if (!liff.isLoggedIn()) {
          liff.login({
            redirectUri: window.location.href,
          });

          return;
        }

        setMessage(
          "LINE公式アカウントを確認しています...",
        );

        /*
         * LINE公式アカウントとの友だち状態を確認
         */
        let friendship =
          await liff.getFriendship();

        /*
         * 未追加またはブロック中なら、
         * LINE公式の友だち追加画面を表示
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
           * 友だち追加画面を閉じた後、
           * 状態をもう一度取得
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
         * すでにSupabaseへログイン済みなら
         * OAuthをやり直さず診断へ
         */
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (user) {
          window.location.replace(
            "/upload",
          );

          return;
        }

        setMessage(
          "AKANUKE.AIにログインしています...",
        );

        /*
         * 既存の正常動作している
         * custom:line OAuthを使用
         */
        const { error } =
          await supabase.auth.signInWithOAuth({
            provider: "custom:line",

            options: {
              redirectTo:
                `${window.location.origin}/auth/callback?next=${encodeURIComponent(
                  "/upload",
                )}`,

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
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#EEF6FF] text-[25px] text-[#1677FF] shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
          ✦
        </span>

        <p className="mt-6 text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
          AKANUKE.AI
        </p>

        <h1 className="mt-3 text-[26px] font-black tracking-[-0.04em]">
          AI垢抜け診断
        </h1>

        <p className="mt-4 text-[13px] leading-7 text-black/50">
          {message}
        </p>
      </div>
    </main>
  );
}