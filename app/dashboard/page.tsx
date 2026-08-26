import Link from "next/link";
import { Suspense } from "react";

import AppShell from "../components/AppShell";
import AppHeader from "../components/AppHeader";
import LogoutButton from "../components/LogoutButton";

import LatestReport from "./LatestReport";
import LatestReportLoading from "./LatestReportLoading";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function ProductIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />

      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.97 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.52-1.03H3v-4h.08A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88L4.2 7l2.83-2.83.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 10 3.05V3h4v.05a1.7 1.7 0 0 0 1.03 1.52 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 7l-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <AppShell background="white">
      <div className="overflow-x-clip bg-white">
        <AppHeader
          backHref="/"
          backLabel="前のページへ戻る"
          backMode="history"
        />

        <div className="px-4 pb-28 pt-6">
          {/* MY AKANUKE */}
          <section className="overflow-hidden rounded-[24px] border border-[#1677FF]/10 bg-gradient-to-br from-[#EEF6FF] via-white to-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              MY AKANUKE
            </p>

            <h2 className="mt-2 text-[20px] font-black tracking-[-0.04em] text-[#111111]">
              自分の魅力を、最大限に。
            </h2>

            <p className="mt-3 text-[12px] leading-5 text-black/55">
              診断結果をもとに、
              <br />
              できることから一つずつ進めていきましょう。
            </p>

            <Link
              href="/upload"
              className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 active:scale-[0.99]"
            >
              新しくAI診断する

              <span
                className="ml-2"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </section>

          {/* MENU */}
          <section className="mt-7">
  <p className="px-1 text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
    MENU
  </p>

  <h2 className="mt-1 px-1 text-[18px] font-black tracking-[-0.03em] text-[#111111]">
    マイメニュー
  </h2>

  {/* ユーザー機能 */}
  <div className="mt-3 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
    <Link
      href="/plan"
      className="flex items-center gap-4 border-b border-black/10 px-5 py-4 transition hover:bg-[#F7F9FC]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
          />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M4 10h16" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#111111]">
          垢抜けプラン
        </span>

        <span className="mt-0.5 block text-[10px] text-black/35">
          あなた専用の改善プランを確認する
        </span>
      </span>

      <span className="text-[#1677FF]">
        <ChevronRightIcon />
      </span>
    </Link>

    <Link
      href="/products"
      className="flex items-center gap-4 border-b border-black/10 px-5 py-4 transition hover:bg-[#F7F9FC]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
        <ProductIcon />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#111111]">
          おすすめ商品
        </span>

        <span className="mt-0.5 block text-[10px] text-black/35">
          AIがおすすめする商品を見る
        </span>
      </span>

      <span className="text-[#1677FF]">
        <ChevronRightIcon />
      </span>
    </Link>

    <Link
      href="/history"
      className="flex items-center gap-4 border-b border-black/10 px-5 py-4 transition hover:bg-[#F7F9FC]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
        <SparkleIcon />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#111111]">
          診断履歴
        </span>

        <span className="mt-0.5 block text-[10px] text-black/35">
          保存した診断結果を確認する
        </span>
      </span>

      <span className="text-[#1677FF]">
        <ChevronRightIcon />
      </span>
    </Link>

    <Link
      href="/dashboard/account"
      className="flex items-center gap-4 px-5 py-4 transition hover:bg-[#F7F9FC]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
        <SettingsIcon />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#111111]">
          アカウント設定
        </span>

        <span className="mt-0.5 block text-[10px] text-black/35">
          会員情報と退会手続きを管理
        </span>
      </span>

      <span className="text-[#1677FF]">
        <ChevronRightIcon />
      </span>
    </Link>
  </div>

  {/* コンテンツ・サイト導線 */}
  <div className="mt-4 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
    <Link
      href="/media"
      className="flex items-center gap-4 border-b border-black/10 px-5 py-4 transition hover:bg-[#F7F9FC]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
          <path d="M8 4v13a3 3 0 0 0 3 3" />
          <path d="M11 8h5" />
          <path d="M11 12h5" />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#111111]">
          AKANUKE JOURNAL
        </span>

        <span className="mt-0.5 block text-[10px] text-black/35">
          メンズ美容の記事を読む
        </span>
      </span>

      <span className="text-[#1677FF]">
        <ChevronRightIcon />
      </span>
    </Link>

    <Link
      href="/"
      className="flex items-center gap-4 px-5 py-4 transition hover:bg-[#F7F9FC]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
        <HomeIcon />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-[#111111]">
          トップページ
        </span>

        <span className="mt-0.5 block text-[10px] text-black/35">
          AKANUKE.AIのトップへ戻る
        </span>
      </span>

      <span className="text-[#1677FF]">
        <ChevronRightIcon />
      </span>
    </Link>
  </div>
</section>

          {/* LATEST REPORT */}
          <Suspense
            fallback={
              <LatestReportLoading />
            }
          >
            <LatestReport />
          </Suspense>

          <LogoutButton />
        </div>
      </div>
    </AppShell>
  );
}