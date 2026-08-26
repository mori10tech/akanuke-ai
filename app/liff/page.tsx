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
          "LINEアカウントを確認しています...",
        );

        const idToken =
          liff.getIDToken();

        if (!idToken) {
          throw new Error(
            "LINEのIDトークンを取得できませんでした。",
          );
        }

        const supabase =
          createClient();

        const {
          data,
          error,
        } =
          await supabase.auth.signInWithIdToken({
            provider: "custom:line",
            token: idToken,
          });

        if (error) {
          throw error;
        }

        if (!data.session) {
          throw new Error(
            "Supabaseセッションを作成できませんでした。",
          );
        }

        window.location.replace("/upload");
      } catch (error) {
        console.error(
          "LIFF login error:",
          error,
        );

        setMessage(
          "LINEログインに失敗しました。もう一度お試しください。",
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