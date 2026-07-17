import BottomNav from "../components/BottomNav";

const salonSteps = [
  {
    step: 1,
    category: "眉毛サロン",
    title: "眉毛を整える",
    rating: "★★★★★",
    time: "所要時間：約30分",
    price: "目安：3,000〜5,000円",
    description:
      "最も印象が変わりやすい眉毛から整えるのがおすすめです。",
    buttonText: "近くの眉毛サロンを探す",
    href: "https://www.google.com/search?q=近くの眉毛サロン",
  },
  {
    step: 2,
    category: "美容室",
    title: "髪型をアップデート",
    rating: "★★★★★",
    time: "所要時間：約60〜90分",
    price: "目安：4,000〜7,000円",
    description:
      "前髪を軽くして、額が少し見える髪型を相談しましょう。",
    buttonText: "近くの美容室を探す",
    href: "https://www.google.com/search?q=近くの美容室",
  },
];

export default function SalonPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-28 pt-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-950">
          おすすめサロン
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          眉毛と髪型は、プロに任せるのが第一印象を変える最短ルートです。
        </p>

        <section className="mt-6 space-y-4">
          {salonSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-blue-600">
                    STEP {item.step}
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {item.category}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    {item.title}
                  </h2>
                </div>

                <span className="shrink-0 text-sm text-amber-500">
                  {item.rating}
                </span>
              </div>

              <p className="mt-4 leading-7 text-slate-600">
                {item.description}
              </p>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p>{item.time}</p>
                <p className="mt-1">{item.price}</p>
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-2xl bg-slate-950 px-5 py-4 text-center font-bold text-white transition hover:bg-slate-800"
              >
                {item.buttonText}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-3xl bg-blue-50 p-6">
          <p className="text-sm font-bold text-blue-700">
            美容師さんへのオーダーメモ
          </p>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li>・前髪は重くしすぎない</li>
            <li>・額が少し見える長さにする</li>
            <li>・横は自然にすっきりさせる</li>
            <li>・毎朝セットしやすい髪型にする</li>
          </ul>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}