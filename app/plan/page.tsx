const weeklyPlans = [
  {
    week: 1,
    title: "眉毛を整える",
    description: "最も印象が変わりやすい眉毛から改善します。",
    tasks: [
      "眉毛サロンを予約する",
      "眉下の余分な毛を整える",
      "眉尻を細く整える",
    ],
  },
  {
    week: 2,
    title: "髪型をアップデート",
    description: "前髪とサイドを整え、顔全体をすっきり見せます。",
    tasks: [
      "美容室を予約する",
      "前髪を重くしすぎない",
      "額が少し見える髪型にする",
    ],
  },
  {
    week: 3,
    title: "清潔感の土台づくり",
    description: "毎日のケアを習慣化します。",
    tasks: [
      "朝晩の洗顔を続ける",
      "毎朝日焼け止めを使う",
      "ヒゲと鼻毛を定期的に整える",
    ],
  },
  {
    week: 4,
    title: "総仕上げと再撮影",
    description: "服装と表情を整え、変化を確認します。",
    tasks: [
      "清潔感のある服装を選ぶ",
      "自然な笑顔を練習する",
      "同じ条件で顔写真を撮り直す",
    ],
  },
];

export default function PlanPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">
              あなた専用
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              4週間プラン
            </h1>
          </div>

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            Day 1 / 28
          </div>
        </div>

        <section className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
          <p className="text-sm text-slate-300">
            4週間後の目標
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            清潔感のある、整った第一印象
          </h2>

          <p className="mt-3 leading-7 text-slate-300">
            眉毛・髪型・肌の清潔感を順番に整えることで、
            無理なく印象アップを目指します。
          </p>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
            <span className="text-sm text-slate-300">
              垢抜けスコア
            </span>

            <span className="text-lg font-bold">
              68 → 84
            </span>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          {weeklyPlans.map((plan, index) => (
            <article
              key={plan.week}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold ${
                    index === 0
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  W{plan.week}
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-blue-600">
                    WEEK {String(plan.week).padStart(2, "0")}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    {plan.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {plan.description}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {plan.tasks.map((task) => (
                  <li
                    key={task}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 text-blue-600">
                      ✓
                    </span>

                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <a
          href="/result"
          className="mt-8 block rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center font-bold text-slate-700"
        >
          診断結果に戻る
        </a>

        <a
          href="/upload"
          className="mt-3 block py-3 text-center text-sm font-bold text-slate-500"
        >
          別の写真で診断し直す
        </a>
      </div>
    </main>
  );
}