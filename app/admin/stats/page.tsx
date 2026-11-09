import type { Metadata } from "next";

import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { isAdminRequestAllowed } from "../../../lib/admin/access";
import {
  getAdminStats,
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
    <div className="mb-4">
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
    <div className="rounded-[16px] bg-[#F7F9FC] px-5 py-4">
      <p className="text-[12px] font-bold text-black/50">
        {label}
      </p>
      <p className="mt-2 text-[28px] font-bold leading-none text-[#111111]">
        {formatNumber(value)}
      </p>
      {note && (
        <p className="mt-2 text-[11px] text-black/50">
          {note}
        </p>
      )}
    </div>
  );
}

function PeriodRow({
  title,
  counts,
  showComparison = false,
}: {
  title: string;
  counts: PeriodCount;
  showComparison?: boolean;
}) {
  return (
    <div>
      <p className="mb-3 text-[13px] font-bold text-black/55">
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
        />
      </div>
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

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto max-w-[1080px] px-10 py-12">
        <header className="mb-10 flex items-end justify-between border-b border-black/10 pb-6">
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
              対象：本番ユーザー（custom:line-oidc）
            </p>
          </div>
        </header>

        <section className="mb-8 rounded-[22px] border border-black/10 bg-white p-6">
          <SectionTitle
            label="SIGN UP"
            title="新規登録数"
          />
          <PeriodRow
            title="登録ユーザー数"
            counts={stats.signups}
            showComparison
          />
        </section>

        <section className="mb-8 rounded-[22px] border border-black/10 bg-white p-6">
          <SectionTitle
            label="DIAGNOSIS"
            title="診断数・診断したユーザー数"
          />
          <div className="space-y-6">
            <PeriodRow
              title="診断数"
              counts={stats.diagnoses}
            />
            <PeriodRow
              title="診断したユーザー数"
              counts={stats.diagnosedUsers}
            />
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">
                <StatCell
                  label="再訪ユーザー数"
                  value={stats.returningUsers}
                />
              </div>
              <p className="col-span-3 self-center text-[12px] leading-relaxed text-black/50">
                日本時間で別の日に2回以上診断したユーザーの数です（累計）。
              </p>
            </div>
          </div>
        </section>

        <div className="mb-8 grid grid-cols-[3fr_2fr] gap-8">
          <section className="rounded-[22px] border border-black/10 bg-white p-6">
            <SectionTitle
              label="DAILY"
              title="直近30日の日別推移"
            />
            <table className="w-full text-[13px]">
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
                {stats.trend.map((row) => (
                  <tr
                    key={row.date}
                    className="border-b border-black/10 last:border-b-0"
                  >
                    <td className="py-2 text-black/55">
                      {formatDateKey(row.date)}
                      {row.date ===
                        stats.todayKey && (
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
          </section>

          <div className="space-y-8">
            <section className="rounded-[22px] border border-black/10 bg-white p-6">
              <SectionTitle
                label="NOT YET"
                title="未診断ユーザー（最新10人）"
              />
              <p className="mb-3 text-[12px] text-black/50">
                登録後に一度も診断していないユーザー：
                {formatNumber(
                  stats.neverDiagnosedTotal,
                )}
                人
              </p>
              {stats.neverDiagnosedUsers
                .length === 0 ? (
                <p className="text-[13px] text-black/35">
                  該当するユーザーはいません。
                </p>
              ) : (
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-black/10 text-left text-[12px] text-black/50">
                      <th className="py-2 font-bold">
                        名前
                      </th>
                      <th className="py-2 text-right font-bold">
                        登録日時
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.neverDiagnosedUsers.map(
                      (user, index) => (
                        <tr
                          key={`${user.createdAt}-${index}`}
                          className="border-b border-black/10 last:border-b-0"
                        >
                          <td className="max-w-[180px] truncate py-2">
                            {user.name}
                          </td>
                          <td className="py-2 text-right text-black/55">
                            {formatDateTime(
                              user.createdAt,
                            )}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              )}
            </section>

            <section className="rounded-[22px] bg-[#F7F9FC] p-6">
              <SectionTitle
                label="REFERENCE"
                title="参考（本番の数字に含めない）"
              />
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-black/10 text-left text-[12px] text-black/50">
                    <th className="py-2 font-bold">
                      種別
                    </th>
                    <th className="py-2 text-right font-bold">
                      ユーザー数
                    </th>
                    <th className="py-2 text-right font-bold">
                      診断数
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label:
                        "custom:line（旧方式）",
                      value:
                        stats.reference
                          .legacyLine,
                    },
                    {
                      label: "email",
                      value:
                        stats.reference.email,
                    },
                    {
                      label: "その他・不明",
                      value:
                        stats.reference.other,
                    },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-black/10 last:border-b-0"
                    >
                      <td className="py-2 text-black/55">
                        {row.label}
                      </td>
                      <td className="py-2 text-right font-bold">
                        {formatNumber(
                          row.value.users,
                        )}
                      </td>
                      <td className="py-2 text-right font-bold">
                        {formatNumber(
                          row.value.diagnoses,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stats.otherProviders.length >
                0 && (
                <div className="mt-4 text-[11px] leading-relaxed text-black/50">
                  <p className="font-bold">
                    その他・不明の内訳（provider）
                  </p>
                  <ul className="mt-1">
                    {stats.otherProviders.map(
                      (row) => (
                        <li key={row.provider}>
                          {row.provider}：
                          {formatNumber(
                            row.users,
                          )}
                          人
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
