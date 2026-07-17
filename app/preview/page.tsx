import BottomNav from "../components/BottomNav";
const weeks = [
  {
    week: "現在",
    day: "DAY 1",
    score: 68,
    title: "改善ポイントが見えてきた状態",
    description:
      "眉毛と前髪の印象を整えることで、短期間でも変化が出やすい状態です。",
    tasks: ["現在の写真を保存", "眉毛サロンを探す"],
    active: false,
  },
  {
    week: "1週間後",
    day: "DAY 7",
    score: 72,
    title: "眉毛が整い、清潔感が上がる",
    description:
      "眉下の余分な毛を整えることで、目元がすっきりして見えます。",
    tasks: ["眉毛を整える", "朝晩の洗顔を続ける"],
    active: false,
  },
  {
    week: "2週間後",
    day: "DAY 14",
    score: 76,
    title: "髪型が変わり、爽やかな印象へ",
    description:
      "前髪を軽くし、額を少し見せることで、幼い印象が抑えられます。",
    tasks: ["美容室へ行く", "ヘアセットを練習する"],
    active: false,
  },
  {
    week: "3週間後",
    day: "DAY 21",
    score: 80,
    title: "肌と身だしなみが安定する",
    description:
      "洗顔と日焼け止めが習慣になり、全体の清潔感が整ってきます。",
    tasks: ["日焼け止めを毎朝使う", "ヒゲと鼻毛を整える"],
    active: false,
  },
  {
    week: "4週間後",
    day: "DAY 28",
    score: 84,
    title: "整った第一印象が完成",
    description:
      "眉毛・髪型・肌・服装が揃い、初対面で好印象を持たれやすい状態です。",
    tasks: ["同じ条件で再撮影", "Before／Afterを比較する"],
    active: true,
  },
];

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-28 pt-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <p className="mt-5 text-sm font-bold text-slate-500">
          4週間後の予測
        </p>

        <h1 className="mt-1 text-3xl font-bold leading-tight text-slate-950">
          1週間ずつ、
          <br />
          こう変わります。
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          優先順位に沿って行動すると、第一印象のスコアは段階的に変化していきます。
        </p>

        <section className="mt-7 rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                現在
              </p>

              <p className="mt-1 text-4xl font-black">
                68
              </p>
            </div>

            <div className="text-3xl text-slate-500">
              →
            </div>

            <div className="text-right">
              <p className="text-sm text-blue-300">
                4週間後
              </p>

              <p className="mt-1 text-4xl font-black text-blue-400">
                84
              </p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[84%] rounded-full bg-blue-500" />
          </div>

          <p className="mt-4 text-center text-sm font-bold text-blue-300">
            4週間で＋16点を目指します
          </p>
        </section>

        <section className="relative mt-8">
          <div className="absolute bottom-8 left-[23px] top-8 w-0.5 bg-slate-200" />

          <div className="space-y-5">
            {weeks.map((item) => (
              <article
                key={item.day}
                className={`relative ml-14 rounded-3xl border p-5 shadow-sm ${
                  item.active
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div
                  className={`absolute -left-[54px] top-6 flex h-11 w-11 items-center justify-center rounded-full border-4 border-slate-50 font-black ${
                    item.active
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-500"
                  }`}
                >
                  {item.score}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] text-blue-600">
                      {item.day}
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {item.week}
                    </p>
                  </div>

                  {item.active && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                      GOAL
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-bold leading-7 text-slate-950">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-4 space-y-2">
                  {item.tasks.map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700"
                    >
                      <span className="font-bold text-blue-600">
                        ✓
                      </span>

                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <a
          href="/plan"
          className="mt-8 block rounded-2xl bg-blue-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-blue-200"
        >
          4週間プランを確認する
        </a>

        <a
          href="/result"
          className="mt-3 block py-4 text-center text-sm font-bold text-slate-500"
        >
          診断結果に戻る
        </a>
      </div>
      <BottomNav />
    </main>
  );
}