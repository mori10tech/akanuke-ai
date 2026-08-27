"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import AppHeader from "../components/AppHeader";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [lineLoginUrl, setLineLoginUrl] =
    useState<string | null>(null);

  const [isLineLoading, setIsLineLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function prepareLineLogin() {
      try {
        const searchParams =
          new URLSearchParams(
            window.location.search,
          );

        const reason =
          searchParams.get("reason");

        if (
          reason === "line_friend_required"
        ) {
          setErrorMessage(
            "AKANUKE.AIのご利用には、LINE公式アカウントの友だち追加が必要です。友だち追加後、もう一度LINEでログインしてください。",
          );
        } else if (
          reason ===
          "line_friend_check_failed"
        ) {
          setErrorMessage(
            "LINEの友だち追加状況を確認できませんでした。時間をおいて、もう一度LINEでログインしてください。",
          );
        } else if (
          reason === "auth_failed"
        ) {
          setErrorMessage(
            "LINEログインに失敗しました。もう一度お試しください。",
          );
        }

        const requestedNext =
          searchParams.get("next");

        const safeNext =
          requestedNext?.startsWith("/") &&
          !requestedNext.startsWith("//")
            ? requestedNext
            : "/dashboard";

        const supabase = createClient();

        /*
         * LINE Loginの認可URLだけ先に生成する。
         *
         * skipBrowserRedirect を指定することで、
         * signInWithOAuth() からJavaScriptで即リダイレクトせず、
         * 実際の遷移はユーザーが下の <a> をタップした瞬間に行う。
         *
         * Safari上でPKCEのcode verifierを保持したまま
         * LINEの自動ログインを開始できるため、認証完了後の
         * SupabaseセッションもSafari側へ作成できる。
         */
        const { data, error } =
          await supabase.auth.signInWithOAuth({
            provider: "custom:line",

            options: {
              redirectTo:
                `${window.location.origin}/auth/callback?next=${encodeURIComponent(
                  safeNext,
                )}`,

              skipBrowserRedirect: true,

              queryParams: {
                bot_prompt: "aggressive",
              },
            },
          });

        if (error) {
          throw error;
        }

        if (!data.url) {
          throw new Error(
            "LINE Login URLを取得できませんでした。",
          );
        }

        if (!cancelled) {
          setLineLoginUrl(data.url);
          setIsLineLoading(false);
        }
      } catch (error) {
        console.error(
          "LINE login preparation error:",
          error,
        );

        if (!cancelled) {
          setErrorMessage(
            "LINEログインを開始できませんでした。時間をおいてもう一度お試しください。",
          );
          setIsLineLoading(false);
        }
      }
    }

    void prepareLineLogin();

    return () => {
      cancelled = true;
    };
  }, []);

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

            <p className="mt-6 text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
              WELCOME TO AKANUKE.AI
            </p>

            <h1 className="mt-3 text-[28px] font-black tracking-[-0.04em]">
              LINEで登録・ログイン
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-black/55">
              AKANUKE.AIのご利用には、
              <br />
              LINE公式アカウントの友だち追加が必要です。
            </p>
          </div>

          <div className="mt-8 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="rounded-[16px] bg-[#F7F9FC] px-4 py-4">
              <p className="text-[12px] font-black text-[#111111]">
                LINE登録でできること
              </p>

              <ul className="mt-3 space-y-2 text-[11px] font-bold leading-5 text-black/55">
                <li>
                  ・診断結果をいつでも確認
                </li>

                <li>
                  ・あなた専用の垢抜けプランを保存
                </li>

                <li>
                  ・おすすめ商品をすぐに確認
                </li>
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

            {lineLoginUrl ? (
              <a
                href={lineLoginUrl}
                className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#06C755] px-5 text-[14px] font-black text-white shadow-[0_10px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-1 text-[8px] font-black text-[#06C755]"
                >
                  LINE
                </span>

                LINEで登録・ログイン
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#06C755] px-5 text-[14px] font-black text-white opacity-50 shadow-[0_10px_34px_rgba(15,23,42,0.08)]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-1 text-[8px] font-black text-[#06C755]"
                >
                  LINE
                </span>

                {isLineLoading
                  ? "LINEログインを準備中..."
                  : "LINEで登録・ログイン"}
              </button>
            )}

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
