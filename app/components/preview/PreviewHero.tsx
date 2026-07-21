import ProgressBar from "./ProgressBar";

type PreviewHeroProps = {
  desiredImpression: string;
  currentScore: number;
  targetScore: number;
};

export default function PreviewHero({
  desiredImpression,
  currentScore,
  targetScore,
}: PreviewHeroProps) {
  const scoreDifference = targetScore - currentScore;

  return (
    <header className="relative overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-200 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold tracking-[0.2em] text-blue-300">
            4 WEEK AI PREVIEW
          </p>

          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-bold text-slate-200 backdrop-blur">
            AI変化予測
          </span>
        </div>

        <p className="mt-7 text-sm font-bold text-slate-400">
          4週間でここまで変わる
        </p>

        <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
          小さな変化を積み重ねて、
          <br />
          理想の印象へ。
        </h1>

        <div className="mt-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold text-slate-400">
              現在のスコア
            </p>

            <div className="mt-1 flex items-end gap-1">
              <span className="text-5xl font-black">
                {currentScore}
              </span>

              <span className="pb-1 text-sm font-bold text-slate-500">
                点
              </span>
            </div>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-lg font-bold text-blue-300">
            →
          </div>

          <div className="text-right">
            <p className="text-xs font-bold text-blue-300">
              4週間後の目標
            </p>

            <div className="mt-1 flex items-end justify-end gap-1">
              <span className="text-5xl font-black text-blue-400">
                {targetScore}
              </span>

              <span className="pb-1 text-sm font-bold text-slate-500">
                点
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar
            value={targetScore}
            label={`予想改善幅 +${scoreDifference}点`}
            variant="dark"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
          <p className="text-xs font-bold tracking-[0.14em] text-blue-300">
            YOUR GOAL
          </p>

          <p className="mt-2 text-lg font-bold">
            {desiredImpression}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            選択した印象を軸に、眉毛・髪型・肌・表情を4週間かけて段階的に整えます。
          </p>
        </div>
      </div>
    </header>
  );
}