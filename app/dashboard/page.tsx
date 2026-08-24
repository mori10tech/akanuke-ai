import Link from "next/link";
import AppShell from "../components/AppShell";
import AppLogo from "../components/AppLogo";
import LogoutButton from "../components/LogoutButton";
import InstallAppCard from "../components/InstallAppCard";
import { isAkanukeAnalysis } from "../../lib/diagnoses/types";
import { createClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

function formatDiagnosisDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

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

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("diagnoses")
    .select(
      "id, overall_progress, analysis, created_at",
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  const latest =
    data && isAkanukeAnalysis(data.analysis)
      ? {
          ...data,
          analysis: data.analysis,
        }
      : null;

  return (
    <AppShell background="white">
      <div className="overflow-hidden bg-white">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[44px_1fr_44px] items-center px-4">
            <div aria-hidden="true" />

            <div className="flex justify-center">
              <AppLogo />
            </div>

            <div aria-hidden="true" />
          </div>
        </header>

        <div className="px-4 pb-28 pt-6">

{/* 3. MY AKANUKE */}
          {/* 1. MY AKANUKE */}
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

          {/* 1. MY MENU */}
          <section className="mt-7">
  <p className="px-1 text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
    MENU
  </p>

            <h1 className="mt-1 px-1 text-[18px] font-black tracking-[-0.03em] text-[#111111]">
              マイメニュー
            </h1>

            <div className="mt-3 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
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
                href="/dashboard/account"
                className="flex items-center gap-4 border-b border-black/10 px-5 py-4 transition hover:bg-[#F7F9FC]"
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

          {/* 2. LATEST REPORT */}
          {latest ? (
            <section className="mt-7 rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
                    LATEST REPORT
                  </p>

                  <h2 className="mt-1 text-[18px] font-black tracking-[-0.03em] text-[#111111]">
                    {formatDiagnosisDate(
                      latest.created_at,
                    )}
                    の診断
                  </h2>
                </div>

                <span className="rounded-full bg-[#EEF6FF] px-3 py-1.5 text-[9px] font-black text-[#1677FF]">
                  保存済み
                </span>
              </div>

              <div className="mt-5 rounded-[20px] border border-[#1677FF]/10 bg-[#EEF6FF] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-black tracking-[0.14em] text-[#1677FF]">
                      AKANUKE PROGRESS
                    </p>

                    <div className="mt-2 flex items-end gap-1">
                      <span className="text-[36px] font-black leading-none tracking-[-0.05em] text-[#1677FF]">
                        {latest.overall_progress}
                      </span>

                      <span className="pb-0.5 text-[13px] font-black text-[#1677FF]">
                        %
                      </span>
                    </div>

                    <p className="mt-2 text-[9px] leading-4 text-black/35">
                      Afterイメージを100%とした現在の目安
                    </p>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
                    <SparkleIcon />
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[8px] font-black text-black/35">
                    CURRENT
                  </span>

                  <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-[#1677FF]"
                      style={{
                        width: `${latest.overall_progress}%`,
                      }}
                    />
                  </div>

                  <span className="text-[9px] font-black text-[#1677FF]">
                    100%
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] font-black tracking-[0.14em] text-[#1677FF]">
                      PRIORITY
                    </p>

                    <h3 className="mt-1 text-[15px] font-black text-[#111111]">
                      改善優先順位
                    </h3>
                  </div>

                  <p className="text-[9px] text-black/35">
                    上から優先
                  </p>
                </div>

                <div className="mt-3 divide-y divide-black/10">
                  {latest.analysis.priorities.map(
                    (item) => (
                      <div
                        key={item.rank}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF] text-[12px] font-black text-[#1677FF]">
                          {item.rank}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-black text-[#111111]">
                            {item.title}
                          </p>

                          <p className="mt-0.5 truncate text-[9px] text-black/35">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Link
                href="/history"
                className="mt-5 flex min-h-[48px] items-center justify-center rounded-[12px] border border-black/10 bg-white text-[12px] font-black text-[#111111] transition hover:bg-[#F7F9FC]"
              >
                診断履歴を見る
              </Link>
            </section>
          ) : (
            <section className="mt-7 rounded-[24px] border border-black/10 bg-white p-6 text-center shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                <SparkleIcon />
              </span>

              <h2 className="mt-4 text-[16px] font-black text-[#111111]">
                まだ診断結果がありません
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-black/45">
                AI診断を完了すると、最新レポートがここに表示されます。
              </p>
            </section>
          )}

          {/* 4. ADD TO HOME SCREEN */}
          <div className="mt-7">
            <InstallAppCard />
          </div>

          <LogoutButton />
        </div>
      </div>
    </AppShell>
  );
}