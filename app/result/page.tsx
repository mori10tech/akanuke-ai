import BottomNav from "../components/BottomNav";
const priorities = [
  {
    rank: 1,
    title: "眉毛",
    stars: "★★★★★",
    description:
      "眉下の余分な毛を整え、眉尻を少し細くすると清潔感が出ます。",
  },
  {
    rank: 2,
    title: "髪型",
    stars: "★★★★★",
    description:
      "前髪を重くしすぎず、額が少し見える髪型にすると印象が変わります。",
  },
  {
    rank: 3,
    title: "日焼け止め",
    stars: "★★★★☆",
    description:
      "毎朝、ベタつきにくい日焼け止めを使うと肌の清潔感を保てます。",
  },
];

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-950">
          診断結果
        </h1>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            あなたの垢抜けスコア
          </p>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-400">現在</p>
              <p className="text-5xl font-bold text-slate-950">68</p>
            </div>

            <p className="pb-3 text-2xl text-slate-300">→</p>

            <div className="text-right">
              <p className="text-sm text-blue-600">4週間後</p>
              <p className="text-5xl font-bold text-blue-600">84</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-blue-50 px-4 py-3 text-center">
            <p className="font-bold text-blue-700">
              4週間で +16点を目指せます
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-blue-50 p-6">
          <p className="text-sm font-bold text-blue-700">
            AIコメント
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            現在は少し幼い印象があります。原因は前髪と眉毛です。
            この2点を整えるだけで、第一印象は大きく変わります。
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-950">
            改善すると印象が変わりやすい順
          </h2>

          <div className="mt-4 space-y-3">
            {priorities.map((item) => (
              <article
                key={item.rank}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {item.rank}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-sm text-amber-500">
                    {item.stars}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <a
          href="/plan"
          className="mt-8 block rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white"
        >
          4週間プランを見る
        </a>

        <a
          href="/upload"
          className="mt-3 block py-3 text-center text-sm font-bold text-slate-500"
        >
          別の写真で診断し直す
        </a>
      </div>

      <BottomNav />
    </main>
  );
}