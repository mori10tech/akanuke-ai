export type WeeklySummaryItem = {
  week: number;
  label: string;
  score: number;
  progress: number;
  imageFilter: string;
  isFinal?: boolean;
};

type WeeklySummaryProps = {
  image: string | null;
  items: WeeklySummaryItem[];
  onSelectWeek: (week: number) => void;
};

export default function WeeklySummary({
  image,
  items,
  onSelectWeek,
}: WeeklySummaryProps) {
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
            WEEKLY SUMMARY
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            4週間の変化
          </h2>
        </div>

        <p className="shrink-0 text-xs font-bold text-slate-400">
          タップで詳細へ
        </p>
      </div>

      <div className="-mx-5 mt-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-3">
          {items.map((item) => (
            <button
              key={item.week}
              type="button"
              onClick={() => onSelectWeek(item.week)}
              className={`w-40 shrink-0 overflow-hidden rounded-3xl border bg-white text-left shadow-sm transition active:scale-[0.98] ${
                item.isFinal
                  ? "border-blue-300 shadow-blue-100"
                  : "border-slate-100"
              }`}
            >
              <div
                className={`flex h-12 items-center justify-between px-4 ${
                  item.isFinal
                    ? "bg-blue-600 text-white"
                    : "bg-slate-950 text-white"
                }`}
              >
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] opacity-70">
                    WEEK
                  </p>

                  <p className="text-lg font-black leading-none">
                    {item.week}
                  </p>
                </div>

                {item.isFinal ? (
                  <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold">
                    理想形
                  </span>
                ) : (
                  <span className="text-xs font-bold opacity-80">
                    {item.progress}%
                  </span>
                )}
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                {image ? (
                  <img
                    src={image}
                    alt={`${item.week}週目の変化予測`}
                    className="h-full w-full object-cover"
                    style={{ filter: item.imageFilter }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl text-slate-300">
                    📷
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />

                <span className="absolute bottom-3 left-3 rounded-full border border-white/50 bg-slate-950/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                  {item.label}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400">
                      SCORE
                    </p>

                    <p
                      className={`mt-1 text-2xl font-black ${
                        item.isFinal
                          ? "text-blue-600"
                          : "text-slate-950"
                      }`}
                    >
                      {item.score}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    / 100
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-1 text-center text-xs leading-5 text-slate-400">
        横にスワイプすると、4週目まで確認できます
      </p>
    </section>
  );
}