import type { Metadata } from "next";

import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { isAdminRequestAllowed } from "../../../lib/admin/access";
import {
  getAdminStats,
  type AdminStats,
  type PeriodCount,
} from "../../../lib/admin/stats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "利用状況｜AKANUKE.AI 管理",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const numberFormatter =
  new Intl.NumberFormat("ja-JP");

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

function formatDateKey(dateKey: string) {
  const date = new Date(
    `${dateKey}T00:00:00Z`,
  );

  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
}

function formatDiff(
  current: number,
  previous: number,
) {
  const diff = current - previous;

  if (diff === 0) {
    return "±0";
  }

  return diff > 0
    ? `+${formatNumber(diff)}`
    : `−${formatNumber(Math.abs(diff))}`;
}

function SectionTitle({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-3">
      <p className="text-[11px] font-bold tracking-[0.18em] text-[#1677FF]">
        {label}
      </p>
      <h2 className="mt-1 text-[18px] font-bold text-[#111111]">
        {title}
      </h2>
    </div>
  );
}

function StatCell({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="rounded-[16px] bg-[#F7F9FC] px-5 py-3">
      <p className="text-[12px] font-bold text-black/50">
        {label}
      </p>
      {/* 縦の高さを抑えるため、補足は数字の右側に並べる */}
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-[28px] font-bold leading-none text-[#111111]">
          {formatNumber(value)}
        </p>
        {note && (
          <p className="text-right text-[11px] leading-tight text-black/50">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

function PeriodRow({
  title,
  counts,
  showComparison = false,
  totalNote,
}: {
  title: string;
  counts: PeriodCount;
  showComparison?: boolean;
  totalNote?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-bold text-black/55">
        {title}
      </p>
      <div className="grid grid-cols-4 gap-3">
        <StatCell
          label="今日"
          value={counts.today}
        />
        <StatCell
          label="昨日"
          value={counts.yesterday}
        />
        <StatCell
          label="直近7日"
          value={counts.last7Days}
          note={
            showComparison
              ? `前の7日間 ${formatNumber(counts.previous7Days)}（${formatDiff(counts.last7Days, counts.previous7Days)}）`
              : undefined
          }
        />
        <StatCell
          label="累計"
          value={counts.total}
          note={totalNote}
        />
      </div>
    </div>
  );
}

type TrendRow = AdminStats["trend"][number];

const TREND_CHART_HEIGHT = 88;

/*
 * 直近30日の日別推移（登録数・診断数を同じ縦軸の目盛りで2段に並べる）
 * 色はブランドブルー1色のみ。数値はバーにカーソルを合わせると表示、表でも確認できる
 */
function TrendChart({
  trend,
  todayKey,
}: {
  trend: TrendRow[];
  todayKey: string;
}) {
  // stats.trend は新しい日付が先頭なので、グラフ用に古い順へ並べ替える
  const rows = [...trend].reverse();

  const scaleMax = Math.max(
    1,
    ...rows.map((row) =>
      Math.max(
        row.signups,
        row.diagnoses,
      ),
    ),
  );

  const series = [
    {
      key: "signups" as const,
      label: "新規登録数",
    },
    {
      key: "diagnoses" as const,
      label: "診断数",
    },
  ];

  return (
    <div>
      <div className="space-y-4">
        {series.map((item) => {
          const total = rows.reduce(
            (sum, row) =>
              sum + row[item.key],
            0,
          );

          return (
            <div
              key={item.key}
              className="grid grid-cols-[132px_1fr] gap-4"
            >
              <div className="self-end pb-1">
                <p className="text-[13px] font-bold text-black/55">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-black/50">
                  30日合計
                </p>
                <p className="text-[22px] font-bold leading-tight text-[#111111]">
                  {formatNumber(total)}
                </p>
              </div>

              <div
                className="relative border-b border-black/15"
                style={{
                  height:
                    TREND_CHART_HEIGHT,
                }}
              >
                {/* 目盛り：上端（最大値）と中間 */}
                <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-black/10" />
                <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-black/10" />
                <span className="pointer-events-none absolute -top-[7px] right-full mr-2 text-[10px] leading-none text-black/35">
                  {formatNumber(scaleMax)}
                </span>

                <div className="absolute inset-0 grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px]">
                  {rows.map((row) => {
                    const value =
                      row[item.key];

                    const heightPercent =
                      (value / scaleMax) *
                      100;

                    return (
                      <div
                        key={row.date}
                        className="group relative flex h-full items-end"
                      >
                        {value > 0 && (
                          <div
                            className={`w-full rounded-t-[4px] ${
                              row.date ===
                              todayKey
                                ? "bg-[#1677FF]"
                                : "bg-[#1677FF]/75"
                            } group-hover:bg-[#1677FF]`}
                            style={{
                              height: `${heightPercent}%`,
                            }}
                          />
                        )}
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-[#111111] px-2 py-1 text-[11px] text-white group-hover:block">
                          {formatDateKey(
                            row.date,
                          )}
                          ：{item.label}{" "}
                          <span className="font-bold">
                            {formatNumber(
                              value,
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 日付ラベル（5日おき＋今日） */}
      <div className="mt-2 grid grid-cols-[132px_1fr] gap-4">
        <div />
        <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px]">
          {rows.map((row, index) => {
            const isToday =
              row.date === todayKey;

            const showLabel =
              isToday ||
              (rows.length - 1 - index) %
                5 ===
                0;

            return (
              <div
                key={row.date}
                className="relative h-4"
              >
                {showLabel && (
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] ${
                      isToday
                        ? "font-bold text-[#1677FF]"
                        : "text-black/40"
                    }`}
                  >
                    {isToday
                      ? "今日"
                      : formatDateKey(
                          row.date,
                        ).replace(
                          /\(.+\)/,
                          "",
                        )}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 正確な数字は表で確認できるようにする */}
      <details className="mt-4 text-[13px]">
        <summary className="cursor-pointer text-[12px] font-bold text-black/50">
          表で見る
        </summary>
        <table className="mt-2 w-full">
          <thead>
            <tr className="border-b border-black/10 text-left text-[12px] text-black/50">
              <th className="py-2 font-bold">
                日付
              </th>
              <th className="py-2 text-right font-bold">
                新規登録数
              </th>
              <th className="py-2 text-right font-bold">
                診断数
              </th>
            </tr>
          </thead>
          <tbody>
            {trend.map((row) => (
              <tr
                key={row.date}
                className="border-b border-black/10 last:border-b-0"
              >
                <td className="py-2 text-black/55">
                  {formatDateKey(row.date)}
                  {row.date === todayKey && (
                    <span className="ml-2 rounded-full bg-[#EEF6FF] px-2 py-0.5 text-[10px] font-bold text-[#1677FF]">
                      今日
                    </span>
                  )}
                </td>
                <td className="py-2 text-right font-bold">
                  {formatNumber(row.signups)}
                </td>
                <td className="py-2 text-right font-bold">
                  {formatNumber(
                    row.diagnoses,
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

export default async function AdminStatsPage() {
  /*
   * データ取得より前に IP と Basic 認証を確認する
   * （proxy.ts でも同じ判定をしている）
   */
  const requestHeaders = await headers();

  if (
    !isAdminRequestAllowed(
      requestHeaders,
    )
  ) {
    notFound();
  }

  const stats = await getAdminStats();
  const deleted =
    stats.deletionIncluded;

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto max-w-[1080px] px-10 py-8">
        <header className="mb-6 flex items-end justify-between border-b border-black/10 pb-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#1677FF]">
              AKANUKE.AI ADMIN
            </p>
            <h1 className="mt-2 text-[26px] font-bold">
              利用状況
            </h1>
          </div>
          <div className="text-right text-[12px] text-black/50">
            <p>
              集計日時：
              {formatDateTime(
                stats.generatedAt,
              )}
              （日本時間）
            </p>
            <p className="mt-1">
              対象：本番ユーザー（custom:line-oidc ＋ 旧方式 custom:line）
            </p>
            <p className="mt-1">
              {deleted.available
                ? "累計：2026/11以降に退会・自動削除された分を含む"
                : "累計：削除記録を取得できないため、退会・自動削除分を含まない"}
            </p>
          </div>
        </header>

        <section className="mb-5 rounded-[22px] border border-black/10 bg-white px-6 py-5">
          <SectionTitle
            label="SIGN UP"
            title="新規登録数"
          />
          <PeriodRow
            title="登録ユーザー数"
            counts={stats.signups}
            showComparison
            totalNote={`うち退会 ${formatNumber(deleted.deletedUsers)}`}
          />
        </section>

        <section className="mb-5 rounded-[22px] border border-black/10 bg-white px-6 py-5">
          <SectionTitle
            label="DIAGNOSIS"
            title="診断数・診断したユーザー数"
          />
          <div className="space-y-4">
            <PeriodRow
              title="診断数"
              counts={stats.diagnoses}
              totalNote={`うち削除済み ${formatNumber(deleted.deletedDiagnoses)}`}
            />
            <PeriodRow
              title="診断したユーザー数"
              counts={stats.diagnosedUsers}
              totalNote={`うち削除済み ${formatNumber(deleted.deletedDiagnosedUsers)}`}
            />
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">
                <StatCell
                  label="再訪ユーザー数"
                  value={stats.returningUsers}
                />
              </div>
              <p className="col-span-3 self-center text-[12px] leading-relaxed text-black/50">
                日本時間で別の日に2回以上診断したユーザーの数です（累計・うち削除済み {formatNumber(deleted.deletedReturningUsers)}）。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[22px] border border-black/10 bg-white px-6 py-5">
          <SectionTitle
            label="DAILY"
            title="直近30日の日別推移"
          />
          <TrendChart
            trend={stats.trend}
            todayKey={stats.todayKey}
          />
        </section>
      </div>
    </main>
  );
}
