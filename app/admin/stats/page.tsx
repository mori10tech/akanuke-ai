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

const WEEKDAY_LABELS = [
  "日",
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
];

/*
 * 直近30日の日別推移（日付を横に並べた表）
 * 数字で確認しやすいよう、1列＝1日、左から古い順・右端が今日
 */
function TrendTable({
  trend,
  todayKey,
}: {
  trend: TrendRow[];
  todayKey: string;
}) {
  // stats.trend は新しい日付が先頭なので、古い順へ並べ替える
  const rows = [...trend].reverse();

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
    <table className="w-full table-fixed text-[13px]">
      <colgroup>
        <col className="w-[92px]" />
        {rows.map((row) => (
          <col key={row.date} />
        ))}
        <col className="w-[56px]" />
      </colgroup>
      <thead>
        <tr className="text-[11px] text-black/50">
          <th />
          {rows.map((row, index) => {
            const date = new Date(
              `${row.date}T00:00:00Z`,
            );

            const day = date.getUTCDate();
            const weekday = date.getUTCDay();

            const isToday =
              row.date === todayKey;

            // 最初の列と月初だけ「月/日」、それ以外は日のみ
            const dateLabel =
              index === 0 || day === 1
                ? `${date.getUTCMonth() + 1}/${day}`
                : `${day}`;

            return (
              <th
                key={row.date}
                className={`rounded-t-[8px] px-0 pb-1 pt-2 text-center font-bold ${
                  isToday
                    ? "bg-[#EEF6FF] text-[#1677FF]"
                    : ""
                }`}
              >
                <span className="block leading-tight">
                  {dateLabel}
                </span>
                <span
                  className={`block text-[10px] font-normal leading-tight ${
                    isToday
                      ? "text-[#1677FF]"
                      : weekday === 0 ||
                          weekday === 6
                        ? "text-black/55"
                        : "text-black/35"
                  }`}
                >
                  {isToday
                    ? "今日"
                    : WEEKDAY_LABELS[weekday]}
                </span>
              </th>
            );
          })}
          <th className="pb-1 pt-2 text-right font-bold">
            合計
          </th>
        </tr>
      </thead>
      <tbody>
        {series.map((item) => {
          const total = rows.reduce(
            (sum, row) =>
              sum + row[item.key],
            0,
          );

          return (
            <tr
              key={item.key}
              className="border-t border-black/10"
            >
              <th className="py-2 text-left text-[12px] font-bold text-black/55">
                {item.label}
              </th>
              {rows.map((row) => {
                const value =
                  row[item.key];

                const isToday =
                  row.date === todayKey;

                return (
                  <td
                    key={row.date}
                    className={`py-2 text-center font-bold ${
                      isToday
                        ? "bg-[#EEF6FF] text-[#1677FF]"
                        : value === 0
                          ? "text-black/20"
                          : "text-[#111111]"
                    }`}
                  >
                    {formatNumber(value)}
                  </td>
                );
              })}
              <td className="py-2 text-right text-[15px] font-bold text-[#111111]">
                {formatNumber(total)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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
          <TrendTable
            trend={stats.trend}
            todayKey={stats.todayKey}
          />
        </section>
      </div>
    </main>
  );
}
