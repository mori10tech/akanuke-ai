const products = [
  {
    category: "日焼け止め",
    name: "スキンアクア UVジェル",
    price: "約800円",
    reason: "清潔感アップには紫外線対策が必須。",
  },
  {
    category: "洗顔",
    name: "キュレル 泡洗顔",
    price: "約1,200円",
    reason: "肌荒れ予防におすすめ。",
  },
  {
    category: "化粧水",
    name: "無印良品 敏感肌用 高保湿",
    price: "約700円",
    reason: "コスパ最強。",
  },
  {
    category: "眉毛",
    name: "資生堂 アイブロウシザー",
    price: "約1,000円",
    reason: "眉を整えるだけで印象UP。",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pt-8 pb-28">
      <div className="mx-auto max-w-md">

        <p className="text-sm font-bold text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          おすすめ商品
        </h1>

        <p className="mt-3 text-slate-500">
          AI診断結果から優先度の高い商品を選びました。
        </p>

        <div className="mt-8 space-y-5">
          {products.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-blue-600 font-bold">
                {item.category}
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {item.name}
              </h2>

              <p className="mt-3 text-slate-600">
                {item.reason}
              </p>

              <div className="mt-5 flex items-center justify-between">

                <span className="font-bold">
                  {item.price}
                </span>

                <button className="rounded-xl bg-blue-600 px-5 py-3 text-white font-bold">
                  Amazonを見る
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

    </main>
  );
}