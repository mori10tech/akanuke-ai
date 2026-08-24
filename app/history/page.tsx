import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "../components/AppShell";
import HistoryResultButton from "./HistoryResultButton";
import {
  isAkanukeAnalysis,
  type DiagnosisRow,
} from "../../lib/diagnoses/types";
import { createClient } from "../../lib/supabase/server";
import { DIAGNOSIS_IMAGE_BUCKET } from "../../lib/diagnoses/images";

export const dynamic = "force-dynamic";

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4m8-4v4M4 10h16" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
  );
}

function formatDiagnosisDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

function HistoryCard({ diagnosis, latest = false }: { diagnosis: DiagnosisRow; latest?: boolean }) {
  const { analysis } = diagnosis;

  return (
    <article className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-black/45">
          <CalendarIcon />
          {formatDiagnosisDate(diagnosis.created_at)}
        </span>

        {latest && (
          <span className="rounded-full bg-[#FFF9D9] px-3 py-1 text-[9px] font-black text-[#9A7800]">最新</span>
        )}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[92px_1fr] gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#EEF6FF] text-[#1677FF]">
            {diagnosis.beforeImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
  src={diagnosis.beforeImageUrl}
  alt={`${formatDiagnosisDate(diagnosis.created_at)}の診断写真`}
  loading={latest ? "eager" : "lazy"}
  decoding="async"
  className="h-full w-full object-cover"
/>
            ) : (
              <span className="flex h-full w-full items-center justify-center">
                <SparkleIcon />
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold text-black/40">AKANUKE PROGRESS</p>
                <p className="mt-1 text-[34px] font-semibold leading-none tracking-[-0.05em]">
                  {diagnosis.overall_progress}<span className="ml-0.5 text-[14px]">%</span>
                </p>
              </div>

              <span className="rounded-full bg-[#EEF6FF] px-2.5 py-1 text-[9px] font-black text-[#1677FF]">保存済み</span>
            </div>

            <div className="mt-4">
              <p className="text-[9px] font-black tracking-[0.1em] text-[#1677FF]">TARGET</p>
              <p className="mt-1 line-clamp-2 text-[12px] font-black leading-5">{diagnosis.target_impression}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.priorities.map((priority) => (
            <span key={`${priority.rank}-${priority.title}`} className="rounded-full bg-[#F7F9FC] px-3 py-1.5 text-[9px] font-bold text-black/55">
              {priority.title}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[11px] leading-5 text-black/55">{analysis.summary.headline}</p>
        <HistoryResultButton diagnosisId={diagnosis.id} />
      </div>
    </article>
  );
}

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data, error } = await supabase
  .from("diagnoses")
  .select(
    "id, target_impression, overall_progress, analysis, created_at, before_image_path, after_image_path"
  )
  .eq("user_id", user.id)
  .order("created_at", { ascending: false })
  .limit(3);

  const diagnosesWithoutUrls = (data ?? []).flatMap((row) => {
    if (!isAkanukeAnalysis(row.analysis)) {
      return [];
    }

    return [{ ...row, analysis: row.analysis } satisfies DiagnosisRow];
  });

  const beforeImagePaths =
  diagnosesWithoutUrls
    .map(
      (diagnosis) =>
        diagnosis.before_image_path,
    )
    .filter(
      (path): path is string =>
        typeof path === "string" &&
        path.length > 0,
    );

const signedUrlMap =
  new Map<string, string>();

if (beforeImagePaths.length > 0) {
  const {
    data: signedUrls,
    error: signedUrlsError,
  } = await supabase.storage
    .from(DIAGNOSIS_IMAGE_BUCKET)
    .createSignedUrls(
      beforeImagePaths,
      60 * 60,
    );

  if (signedUrlsError) {
    console.error(
      "[AKANUKE.AI] 診断履歴画像URLの取得に失敗:",
      signedUrlsError,
    );
  } else {
    signedUrls?.forEach((item) => {
      if (
        item.path &&
        item.signedUrl
      ) {
        signedUrlMap.set(
          item.path,
          item.signedUrl,
        );
      }
    });
  }
}

const diagnoses =
  diagnosesWithoutUrls.map(
    (diagnosis) => ({
      ...diagnosis,
      beforeImageUrl:
        diagnosis.before_image_path
          ? signedUrlMap.get(
              diagnosis.before_image_path,
            ) ?? null
          : null,
    }),
  );

  return (
    <AppShell>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
  <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
    <Link
      href="/dashboard"
      aria-label="マイページへ戻る"
      className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#EEF6FF] active:scale-95"
    >
      <ArrowLeftIcon />
    </Link>

    <div className="text-center text-[20px] font-black tracking-[-0.03em]">
      AKANUKE.AI
    </div>

    <div aria-hidden="true" />
  </div>
</header>

      <div className="px-4 pb-12 pt-6">
        <section>
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">DIAGNOSIS HISTORY</p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-black tracking-[-0.04em]">診断履歴</h1>
              <p className="mt-2 text-[12px] leading-5 text-black/50">過去の診断結果と、<br />印象の変化を確認できます。</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black text-[#1677FF] shadow-sm">全{diagnoses.length}件</span>
          </div>
        </section>

        <Link href="/upload" className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_12px_28px_rgba(255,212,0,0.22)] transition hover:-translate-y-0.5">
          <CameraIcon />
          <span className="ml-2">新しくAI診断する</span>
        </Link>

        {error ? (
          <div className="mt-6 rounded-[18px] border border-red-200 bg-red-50 p-5">
            <p className="text-[12px] font-black text-red-600">診断履歴を読み込めませんでした</p>
            <p className="mt-2 text-[11px] leading-5 text-red-600/80">Supabaseのテーブル設定を確認して、もう一度お試しください。</p>
          </div>
        ) : diagnoses.length > 0 ? (
          <section className="mt-6 space-y-4">
            {diagnoses.map((diagnosis, index) => (
              <HistoryCard key={diagnosis.id} diagnosis={diagnosis} latest={index === 0} />
            ))}
          </section>
        ) : (
          <div className="mt-6 rounded-[22px] border border-black/5 bg-white p-7 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]"><SparkleIcon /></span>
            <h2 className="mt-4 text-[16px] font-black">まだ診断履歴がありません</h2>
            <p className="mt-2 text-[11px] leading-5 text-black/50">AI診断を完了すると、結果がここに保存されます。</p>
          </div>
        )}

        <div className="mt-6 rounded-[18px] bg-[#EEF6FF] p-5">
          <p className="text-[12px] font-black text-[#1677FF]">診断を続けるメリット</p>
          <p className="mt-2 text-[11px] leading-5 text-black/55">定期的に再診断すると、髪型・眉毛・肌などの変化を比較しながら、次に取り組むべき改善ポイントを確認できます。</p>
        </div>

        <p className="mt-5 text-center text-[9px] leading-4 text-black/30">診断画像は本人だけが確認できる非公開領域に保存されます。</p>
      </div>
    </AppShell>
  );
}
