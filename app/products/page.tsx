import BottomNav from "../components/BottomNav";

const products = [
  {
    category: "日焼け止め",
    name: "スキンアクア UVジェル",
    price: "約800円",
    reason: "清潔感アップには紫外線対策が必須です。",
  },
  {
    category: "洗顔",
    name: "キュレル 泡洗顔",
    price: "約1,200円",
    reason: "肌荒れを防ぎながら、やさしく洗顔したい人におすすめです。",
  },
  {
    category: "化粧水",
    name: "無印良品 敏感肌用 高保湿",
    price: "約700円",
    reason: "毎日続けやすい価格で、乾燥対策を始められます。",
  },
  {
    category: "眉毛",
    name: "資生堂 アイブロウシザー",
    price: "約1,000円",
    reason: "眉周りを整えるだけでも、顔全体の印象が変わります。",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-28 pt-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-950">
          おすすめ商品
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          AI診断結果をもとに、優先度の高い美容アイテムを選びました。
        </p>

        <section className="mt-8 space-y-5">
          {products.map((item) => (
            <article
              key={item.name}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-blue-600">
                {item.category}
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                {item.name}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {item.reason}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="shrink-0 font-bold text-slate-950">
                  {item.price}
                </span>

                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Amazonを見る
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}