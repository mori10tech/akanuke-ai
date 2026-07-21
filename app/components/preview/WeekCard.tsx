import ProgressBar from "./ProgressBar";

export type WeekData = {
  week: number;
  label: string;
  subtitle: string;
  score: number;
  previousScore: number;
  progress: number;
  aiComment: string;
  impressionChange: string;
  imageFilter: string;
  accentLabel: string;
  actions: string[];
  isFinal?: boolean;
};

type WeekCardProps = {
  data: WeekData;
  image: string | null;
};

export default function WeekCard({
  data,
  image,
}: WeekCardProps) {
  const scoreDifference = data.score - data.previousScore;

  return (
    <article
      id={`week-${data.week}`}
      className={`scroll-mt-24 overflow-hidden rounded-[32px] border bg-white shadow-sm ${
        data.isFinal
          ? "border-blue-200 shadow-blue-100"
          : "border-slate-100"
      }`}
    >
      <div
        className={`p-5 sm:p-6 ${
          data.isFinal
            ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
            : "bg-white text-slate-950"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p
                className={`text-xs font-bold tracking-[0.18em] ${
                  data.isFinal
                    ? "text-blue-100"
                    : "text-blue-600"
                }`}
              >
                WEEK {data.week}
              </p>

              {data.isFinal && (
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-white">
                  IDEAL STYLE
                </span>
              )}
            </div>

            <h2 className="mt-2 text-2xl font-black">
              {data.label}
            </h2>

            <p
              className={`mt-1 text-sm ${
                data.isFinal
                  ? "text-blue-100"
                  : "text-slate-500"
              }`}
            >
              {data.subtitle}
            </p>
          </div>

          <div
            className={`shrink-0 rounded-2xl px-4 py-3 text-right ${
              data.isFinal
                ? "bg-white/15"
                : "bg-slate-950 text-white"
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] opacity-70">
              SCORE
            </p>

            <div className="mt-1 flex items-end justify-end gap-1">
              <span className="text-2xl font-black">
                {data.score}
              </span>

              <span className="pb-0.5 text-[10px] font-bold opacity-60">
                /100
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar
            value={data.progress}
            label={`AI PROGRESS・+${scoreDifference}点`}
            variant={data.isFinal ? "dark" : "light"}
          />
        </div>
      </div>

      {/* ---------- 画像エリア ---------- */}

      <div className="relative overflow-hidden bg-gradient-to-b from-sky-400 to-sky-500">
        <div className="flex justify-center px-6 py-8">
          {image ? (
            <img
              src={image}
              alt={`${data.week}週目の変化予測`}
              className="
                w-auto
                max-w-full
                max-h-[340px]
                rounded-2xl
                object-contain
                drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]
                transition-all
                duration-700
              "
              style={{ filter: data.imageFilter }}
            />
          ) : (
            <div className="flex h-[340px] w-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/30 text-2xl backdrop-blur">
                  📷
                </div>

                <p className="mt-4 font-bold text-white">
                  写真が見つかりません
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/50 bg-slate-950/60 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
          {data.accentLabel}
        </div>

        {data.isFinal && (
          <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/50 bg-blue-600/90 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
            4週間後の理想形
          </div>
        )}

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-slate-950/65 p-4 text-white shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-bold tracking-[0.16em] text-blue-200">
            IMPRESSION CHANGE
          </p>

          <p className="mt-1 text-sm font-bold leading-6">
            {data.impressionChange}
          </p>
        </div>
      </div>

            <div className="p-5 sm:p-6">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">
              AI
            </span>

            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-blue-700">
                AI COMMENT
              </p>

              <p className="mt-2 text-sm font-bold leading-7 text-slate-800">
                {data.aiComment}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold tracking-[0.15em] text-slate-400">
            THIS WEEK&apos;S ACTION
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-950">
            今週取り組むこと
          </h3>

          <div className="mt-4 space-y-3">
            {data.actions.map((action, index) => (
              <div
                key={action}
                className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                  {index + 1}
                </span>

                <p className="pt-0.5 text-sm font-bold leading-6 text-slate-700">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-4">
          <div>
            <p className="text-xs font-bold text-slate-400">
              スコア変化
            </p>

            <div className="mt-1 flex items-center gap-2 text-lg font-black">
              <span className="text-slate-400">
                {data.previousScore}
              </span>

              <span className="text-slate-300">
                →
              </span>

              <span
                className={
                  data.isFinal
                    ? "text-blue-600"
                    : "text-slate-950"
                }
              >
                {data.score}
              </span>
            </div>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
            +{scoreDifference}点
          </span>
        </div>
      </div>
    </article>
  );
}