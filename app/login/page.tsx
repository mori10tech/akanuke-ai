"use client";

import Link from "next/link";
import { useState } from "react";
import AppHeader from "../components/AppHeader";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [isLineLoading, setIsLineLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleLineLogin() {

  if (isLineLoading) {
      return;
    }

    setErrorMessage("");
    setIsLineLoading(true);

    try {
      const supabase = createClient();

const searchParams =
  new URLSearchParams(
    window.location.search,
  );

const requestedNext =
  searchParams.get("next");

const safeNext =
  requestedNext?.startsWith("/") &&
  !requestedNext.startsWith("//")
    ? requestedNext
    : "/dashboard";

const { error } =
  await supabase.auth.signInWithOAuth({
    provider: "custom:line",
    options: {
      redirectTo:
        `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      queryParams: {
        bot_prompt: "normal",
      },
    },
  });

if (error) {
  throw error;
}

    } catch (error) {
      console.error(
        "LINE login error:",
        error,
      );

      setErrorMessage(
        "LINEログインを開始できませんでした。時間をおいてもう一度お試しください。",
      );

      setIsLineLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] border-x border-black/5 bg-white">
        <AppHeader
          backHref="/"
          backLabel="トップページへ戻る"
          backMode="history"
        />

        <div className="px-5 pb-12 pt-10">
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#EEF6FF] text-[25px] text-[#1677FF] shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
              ✦
            </span>

            <p className="mt-6 text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
              WELCOME TO AKANUKE.AI
            </p>

            <h1 className="mt-3 text-[28px] font-black tracking-[-0.04em]">
              LINEで登録・ログイン
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-black/55">
              AKANUKE.AIのご利用には、
              <br />
              LINE登録が必要です。
            </p>
          </div>

          <div className="mt-8 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="rounded-[16px] bg-[#F7F9FC] px-4 py-4">
              <p className="text-[12px] font-black text-[#111111]">
                LINE登録でできること
              </p>

              <ul className="mt-3 space-y-2 text-[11px] font-bold leading-5 text-black/55">
                <li>・診断結果をいつでも確認</li>
                <li>・あなた専用の垢抜けプランを保存</li>
                <li>・おすすめ商品をすぐに確認</li>
              </ul>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mt-5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3"
              >
                <p className="text-[11px] font-bold leading-5 text-red-600">
                  {errorMessage}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleLineLogin}
              disabled={isLineLoading}
              className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#06C755] px-5 text-[14px] font-black text-white shadow-[0_10px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <span
                aria-hidden="true"
                className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-1 text-[8px] font-black text-[#06C755]"
              >
                LINE
              </span>

              {isLineLoading
                ? "LINEへ移動中..."
                : "LINEで登録・ログイン"}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-black/40">
              続行すると、
              <Link
                href="/terms"
                className="font-bold text-[#1677FF]"
              >
                利用規約
              </Link>
              と
              <a
                href="https://www.leafworks.jp/doc/privacy.pdf"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#1677FF]"
              >
                プライバシーポリシー
              </a>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}