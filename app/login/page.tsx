"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import AppHeader from "../components/AppHeader";
import { createClient } from "../../lib/supabase/client";

type BrowserEnvironment = {
  isIos: boolean;
  isAndroid: boolean;
  isLineBrowser: boolean;
  isRecommendedExternalBrowser: boolean;
  isLikelyInAppBrowser: boolean;
  recommendedBrowserName: string;
};

function detectBrowserEnvironment(): BrowserEnvironment {
  const userAgent = window.navigator.userAgent;

  const isIos =
    /iPhone|iPad|iPod/i.test(userAgent);

  const isAndroid =
    /Android/i.test(userAgent);

  const isLineBrowser =
    /Line\//i.test(userAgent);

  const isIosSafari =
    isIos &&
    /Safari/i.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);

  const isAndroidChrome =
    isAndroid &&
    /Chrome\//i.test(userAgent) &&
    !/SamsungBrowser|EdgA|OPR\//i.test(userAgent);

  const knownInAppBrowser =
    /Instagram|FBAN|FBAV|Twitter|X\//i.test(userAgent);

  const isRecommendedExternalBrowser =
    isIosSafari || isAndroidChrome;

  const isLikelyInAppBrowser =
    !isLineBrowser &&
    (knownInAppBrowser ||
      ((isIos || isAndroid) &&
        !isRecommendedExternalBrowser));

  return {
    isIos,
    isAndroid,
    isLineBrowser,
    isRecommendedExternalBrowser,
    isLikelyInAppBrowser,
    recommendedBrowserName: isIos
      ? "Safari"
      : isAndroid
        ? "Chrome"
        : "Safari / Chrome",
  };
}

export default function LoginPage() {  
  const [isLineLoading, setIsLineLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [copyMessage, setCopyMessage] =
    useState("");

  const [browserEnvironment, setBrowserEnvironment] =
    useState<BrowserEnvironment | null>(null);

    useEffect(() => {
    const environment =
      detectBrowserEnvironment();

    setBrowserEnvironment(
      environment,
    );

    const searchParams =
      new URLSearchParams(
        window.location.search,
      );

    const reason =
      searchParams.get("reason");

    if (
      reason ===
      "line_friend_required"
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

    setIsLineLoading(false);
  }, []);

    async function startLineLogin() {
    if (isLineLoading) {
      return;
    }

    setIsLineLoading(true);
    setErrorMessage("");

    try {
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

      const supabase =
        createClient();

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
              ui_locales: "ja-JP",
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

      window.location.href =
        data.url;
    } catch (error) {
      console.error(
        "LINE login start error:",
        error,
      );

      setErrorMessage(
        "LINEログインを開始できませんでした。時間をおいてもう一度お試しください。",
      );

      setIsLineLoading(false);
    }
  }

  async function copyCurrentUrl() {
    try {
      await navigator.clipboard.writeText(
        window.location.href,
      );

      setCopyMessage(
        "URLをコピーしました",
      );

      window.setTimeout(() => {
        setCopyMessage("");
      }, 2500);
    } catch (error) {
      console.error(
        "Copy login URL error:",
        error,
      );

      setCopyMessage(
        "URLをコピーできませんでした",
      );
    }
  }

  const showExternalBrowserWarning =
    browserEnvironment?.isLikelyInAppBrowser ===
    true;

  const recommendedBrowserName =
    browserEnvironment?.recommendedBrowserName ??
    "Safari / Chrome";

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] border-x border-black/5 bg-white">
       <AppHeader
          backHref="/"
          backLabel="トップページへ戻る"
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

          {showExternalBrowserWarning && (
            <div className="mt-7 rounded-[18px] border border-[#FFD400]/50 bg-[#FFF9D9] p-4">
              <p className="text-[12px] font-black text-[#111111]">
                {recommendedBrowserName}でのログインがおすすめです
              </p>

              <p className="mt-2 text-[11px] leading-5 text-black/60">
                アプリ内ブラウザではLINEアプリが自動で開かない場合があります。このページを
                {recommendedBrowserName}
                で開いてからログインしてください。
              </p>

              <button
                type="button"
                onClick={() =>
                  void copyCurrentUrl()
                }
                className="mt-3 flex min-h-[42px] w-full items-center justify-center rounded-[11px] border border-black/10 bg-white px-4 text-[11px] font-black text-[#111111]"
              >
                このページのURLをコピー
              </button>

              {copyMessage && (
                <p className="mt-2 text-center text-[10px] font-bold text-black/45">
                  {copyMessage}
                </p>
              )}
            </div>
          )}

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

            <button
  type="button"
  onClick={() =>
    void startLineLogin()
  }
  disabled={isLineLoading}
  className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#06C755] px-5 text-[14px] font-black text-white shadow-[0_10px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
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

<div className="mt-4"></div>
            
              <div className="mt-3 rounded-[16px] border border-[#1677FF]/10 bg-[#EEF6FF] p-4">
                <p className="text-[12px] font-black text-[#111111]">
                  LINEのログイン画面が表示された場合
                </p>

                <ol className="mt-3 space-y-2 text-[11px] font-bold leading-5 text-black/80">
                  <li>
                    ・ 画面下部の「LINEアプリでログインする」をタップしてください。
                  </li>

                  <li>
                    ・ Instagram・Xなどのアプリ内ブラウザの場合、SafariまたはChromeでこのページを開き直してください。
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() =>
                    void copyCurrentUrl()
                  }
                  className="mt-4 flex min-h-[42px] w-full items-center justify-center rounded-[11px] bg-white px-4 text-[11px] font-black text-[#1677FF] shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
                >
                  このページのURLをコピー
                </button>

                {copyMessage && (
                  <p className="mt-2 text-center text-[10px] font-bold text-black/45">
                    {copyMessage}
                  </p>
                )}

                <a
                  href="https://help.line.me/line/ios/sp?lang=ja&contentId=20020693"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex min-h-[40px] items-center justify-center text-[10px] font-bold text-black/45 underline underline-offset-2"
                >
                  LINE公式ヘルプを確認
                </a>
              </div>

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
