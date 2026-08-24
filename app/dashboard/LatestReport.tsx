import Link from "next/link";

import { isAkanukeAnalysis } from "../../lib/diagnoses/types";
import { createClient } from "../../lib/supabase/server";

function formatDiagnosisDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo",
    },
  ).format(new Date(value));
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

export default async function LatestReport() {
  const supabase =
    await createClient();

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
    data &&
    isAkanukeAnalysis(
      data.analysis,
    )
      ? {
          ...data,
          analysis:
            data.analysis,
        }
      : null;

  if (!latest) {
    return (
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
    );
  }

  return (
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
  );
}