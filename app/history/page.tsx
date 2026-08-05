import Image from "next/image";
import Link from "next/link";

type DiagnosisHistory = {
  id: string;
  date: string;
  image: string;
  overallScore: number;
  hairScore: number;
  eyebrowScore: number;
  skinScore: number;
  impressions: string[];
  summary: string;
};

const diagnosisHistories: DiagnosisHistory[] = [
  {
    id: "diagnosis-20260805",
    date: "2026年8月5日",
    image: "/lp/before-v2.png",
    overallScore: 78,
    hairScore: 82,
    eyebrowScore: 78,
    skinScore: 76,
    impressions: ["爽やか", "清潔感"],
    summary: "髪型と眉毛を整えることで、爽やかさをさらに引き出せます。",
  },
  {
    id: "diagnosis-20260719",
    date: "2026年7月19日",
    image: "/lp/before-v2.png",
    overallScore: 73,
    hairScore: 75,
    eyebrowScore: 72,
    skinScore: 74,
    impressions: ["大人っぽい", "ビジネス向き"],
    summary: "清潔感を保ちながら、落ち着いた印象を目指すのがおすすめです。",
  },
  {
    id: "diagnosis-20260628",
    date: "2026年6月28日",
    image: "/lp/before-v2.png",
    overallScore: 69,
    hairScore: 70,
    eyebrowScore: 66,
    skinScore: 71,
    impressions: ["AIにおまかせ"],
    summary: "まずは眉毛とヘアスタイルから改善すると印象が変わりやすいです。",
  },
];

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
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

function CameraIcon() {
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
      <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4m8-4v4M4 10h16" />
    </svg>
  );
}

function ScoreRow({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold text-black/50">
          {label}
        </span>

        <span className="text-[11px] font-black text-[#1677FF]">
          {score}
        </span>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF6FF]">
        <div
          className="h-full rounded-full bg-[#1677FF]"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function HistoryCard({
  history,
  latest = false,
}: {
  history: DiagnosisHistory;
  latest?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-black/45">
          <CalendarIcon />
          {history.date}
        </span>

        {latest && (
          <span className="rounded-full bg-[#FFF9D9] px-3 py-1 text-[9px] font-black text-[#9A7800]">
            最新
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[92px_1fr] gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#EEF6FF]">
            <Image
              src={history.image}
              alt={`${history.date}の診断写真`}
              fill
              sizes="92px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold text-black/40">
                  総合スコア
                </p>

                <p className="mt-1 text-[34px] font-semibold leading-none tracking-[-0.05em]">
                  {history.overallScore}
                </p>
              </div>

              <span className="rounded-full bg-[#EEF6FF] px-2.5 py-1 text-[9px] font-black text-[#1677FF]">
                保存済み
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <ScoreRow
                label="髪型"
                score={history.hairScore}
              />
              <ScoreRow
                label="眉毛"
                score={history.eyebrowScore}
              />
              <ScoreRow
                label="肌"
                score={history.skinScore}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {history.impressions.map((impression) => (
            <span
              key={impression}
              className="rounded-full bg-[#F7F9FC] px-3 py-1.5 text-[9px] font-bold text-black/55"
            >
              {impression}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[11px] leading-5 text-black/55">
          {history.summary}
        </p>

        <Link
          href="/result"
          className="mt-4 flex min-h-[46px] items-center justify-between rounded-[12px] border border-black/10 bg-white px-4 text-[12px] font-black transition hover:border-[#1677FF] hover:bg-[#EEF6FF]"
        >
          診断結果を詳しく見る
          <ChevronRightIcon />
        </Link>
      </div>
    </article>
  );
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#EEF6FF] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-[#F8FAFC] shadow-[0_0_40px_rgba(15,23,42,0.08)]">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
            <Link
              href="/dashboard"
              aria-label="マイページへ戻る"
              className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#EEF6FF] active:scale-95"
            >
              <ArrowLeftIcon />
            </Link>

            <Link
              href="/"
              className="text-center text-[20px] font-black tracking-[-0.03em]"
            >
              AKANUKE.AI
            </Link>

            <div aria-hidden="true" />
          </div>
        </header>

        <div className="px-4 pb-12 pt-6">
          <section>
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              DIAGNOSIS HISTORY
            </p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-black tracking-[-0.04em]">
                  診断履歴
                </h1>

                <p className="mt-2 text-[12px] leading-5 text-black/50">
                  過去の診断結果と、
                  <br />
                  印象の変化を確認できます。
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black text-[#1677FF] shadow-sm">
                全{diagnosisHistories.length}件
              </span>
            </div>
          </section>

          <Link
            href="/upload"
            className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_12px_28px_rgba(255,212,0,0.22)] transition hover:-translate-y-0.5"
          >
            <CameraIcon />
            <span className="ml-2">新しくAI診断する</span>
          </Link>

          <section className="mt-6 space-y-4">
            {diagnosisHistories.map((history, index) => (
              <HistoryCard
                key={history.id}
                history={history}
                latest={index === 0}
              />
            ))}
          </section>

          <div className="mt-6 rounded-[18px] bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              診断を続けるメリット
            </p>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              定期的に再診断すると、髪型・眉毛・肌などの変化を比較しながら、次に取り組むべき改善ポイントを確認できます。
            </p>
          </div>

          <p className="mt-5 text-center text-[9px] text-black/30">
            現在はUI確認用のダミーデータを表示しています。
          </p>
        </div>
      </div>
    </main>
  );
}