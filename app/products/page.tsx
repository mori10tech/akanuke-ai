import Link from "next/link";
import AppShell from "../components/AppShell";

type ProductVisualType = "sunscreen" | "lotion" | "wax";

type Product = {
  rank: number;
  name: string;
  shortName: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  score: number;
  rating: string;
  reviewCount: string;
  visualType: ProductVisualType;
};

const products: Product[] = [
  {
    rank: 1,
    name: "クロノビューティ ジェルUV EX",
    shortName: "日焼け止め",
    brand: "ALLIE",
    description: "紫外線から肌を守り、清潔感のある印象を維持",
    category: "日焼け止め",
    price: 2310,
    score: 15,
    rating: "4.6",
    reviewCount: "1,234件",
    visualType: "sunscreen",
  },
  {
    rank: 2,
    name: "メン スキンコンディショナーバーム",
    shortName: "化粧水",
    brand: "NIVEA MEN",
    description: "肌のうるおいを整え、乾燥によるくすみを防ぐ",
    category: "化粧水",
    price: 1320,
    score: 8,
    rating: "4.5",
    reviewCount: "656件",
    visualType: "lotion",
  },
  {
    rank: 3,
    name: "ナチュラルバーム",
    shortName: "ヘアワックス",
    brand: "N. HOMME",
    description: "自然な毛流れを作り、爽やかな印象へ整える",
    category: "ヘアワックス",
    price: 2200,
    score: 6,
    rating: "4.7",
    reviewCount: "633件",
    visualType: "wax",
  },
];

const totalPrice = products.reduce((total, product) => total + product.price, 0);

function formatPrice(price: number) {
  return new Intl.NumberFormat("ja-JP").format(price);
}

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

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
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

function ExternalLinkIcon() {
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
      <path d="M15 4h5v5" />
      <path d="m10 14 10-10" />
      <path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
  );
}

function ProductVisual({
  type,
  size = "normal",
}: {
  type: ProductVisualType;
  size?: "small" | "normal" | "large";
}) {
  const wrapperSize =
    size === "large"
      ? "h-44 w-32"
      : size === "small"
        ? "h-16 w-12"
        : "h-28 w-20";

  if (type === "sunscreen") {
    return (
      <div className={`relative flex items-end justify-center ${wrapperSize}`}>
        <div className="absolute bottom-0 h-[92%] w-[58%] rounded-b-[18px] rounded-t-[8px] border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-stone-100 shadow-[0_12px_25px_rgba(30,41,59,0.13)]">
          <div className="absolute left-1/2 top-[28%] -translate-x-1/2 text-center">
            <p className="text-[8px] font-black tracking-[0.14em] text-stone-700">
              ALLIE
            </p>
            <p className="mt-1 text-[5px] leading-tight text-stone-400">
              CHRONO
              <br />
              BEAUTY
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 h-[9%] w-[64%] rounded-b-[7px] bg-stone-200" />
      </div>
    );
  }

  if (type === "lotion") {
    return (
      <div className={`relative flex items-end justify-center ${wrapperSize}`}>
        <div className="absolute bottom-0 h-[82%] w-[48%] rounded-b-[13px] rounded-t-[7px] border border-blue-800/20 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 shadow-[0_12px_25px_rgba(30,64,175,0.25)]">
          <div className="absolute left-1/2 top-[24%] -translate-x-1/2 text-center">
            <p className="text-[5px] font-bold tracking-wide text-black">
              NIVEA
            </p>
            <p className="mt-0.5 text-[4px] text-blue-100">MEN</p>
          </div>
        </div>

        <div className="absolute bottom-[82%] h-[10%] w-[34%] rounded-t-md bg-slate-900" />
      </div>
    );
  }

  return (
    <div className={`relative flex items-end justify-center ${wrapperSize}`}>
      <div className="absolute bottom-0 h-[47%] w-[68%] rounded-[16px] border border-neutral-700 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black shadow-[0_12px_25px_rgba(15,23,42,0.24)]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[8px] font-black text-black">N.</p>
          <p className="mt-0.5 whitespace-nowrap text-[4px] text-neutral-400">
            HOMME
          </p>
        </div>
      </div>

      <div className="absolute bottom-[44%] h-[8%] w-[64%] rounded-t-lg bg-neutral-700" />
    </div>
  );
}

function ScoreStars() {
  return (
    <span
      className="tracking-[0.08em] text-[#FFD400]"
      aria-label="星5つ"
    >
      ★★★★★
    </span>
  );
}

export default function ProductsPage() {
  const primaryProduct = products[0];

  return (
    <AppShell>
        <header className="sticky top-0 z-30 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
            <Link
              href="/result"
              aria-label="診断結果へ戻る"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-neutral-100 active:scale-95"
            >
              <ArrowLeftIcon />
            </Link>

            <Link
              href="/"
              className="text-center text-[21px] font-black tracking-[-0.03em]"
            >
              AKANUKE.AI
            </Link>

            <button
              type="button"
              aria-label="メニューを開く"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-neutral-100 active:scale-95"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        <div className="px-4 pb-32 pt-5">
          <p className="text-[15px] font-black">あなたにおすすめの商品</p>

          <section className="mt-4 overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
            <div className="grid grid-cols-[46%_54%]">
              <div className="relative flex min-h-[230px] items-center justify-center border-r border-[#e5e5e5] bg-gradient-to-br from-white to-[#EEF6FF]">
                <span className="absolute left-3 top-3 rounded-md bg-[#FFD400] text-black px-2.5 py-1 text-[11px] font-black text-black">
                  最優先アイテム
                </span>

                <ProductVisual type="sunscreen" size="large" />
              </div>

              <div className="flex flex-col justify-center px-4 py-5">
                <p className="text-[22px] font-black tracking-tight">
                  {primaryProduct.shortName}
                </p>

                <p className="mt-2 text-[12px] leading-5 text-neutral-600">
                  肌の印象改善に最も効果的なアイテムです。
                </p>

                <div className="mt-6">
                  <p className="text-[12px] font-black">あなたとの相性</p>

                  <div className="mt-1 flex items-center gap-2">
                    <ScoreStars />
                    <span className="text-sm font-black">5.0</span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between rounded-xl bg-[#FFF9D9] px-3 py-3">
                  <span className="text-[13px] font-black">効果</span>

                  <span className="text-[25px] font-black leading-none text-[#1677FF]">
                    +{primaryProduct.score}
                    <span className="ml-0.5 text-sm">点</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e5e5e5] p-4">
              <h2 className="text-[17px] font-black">優先順位</h2>

              <div className="mt-3 space-y-2.5">
                {products.map((product) => (
                  <article
                    key={product.name}
                    className="grid grid-cols-[38px_48px_1fr_auto_20px] items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-2.5 py-3"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD400] text-sm font-black text-black">
                      {product.rank}
                    </span>

                    <div className="flex h-12 items-center justify-center">
                      <ProductVisual type={product.visualType} size="small" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-black">
                        {product.shortName}
                      </p>

                      <p className="mt-1 line-clamp-1 text-[10px] text-neutral-500">
                        {product.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-neutral-500">効果</p>

                      <p className="mt-0.5 whitespace-nowrap text-[17px] font-black text-[#1677FF]">
                        +{product.score}
                        <span className="text-[10px]">点</span>
                      </p>
                    </div>

                    <ChevronRightIcon />
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-[#e5e5e5] p-4">
              <div className="flex gap-3 rounded-[16px] bg-[#FFF9D9] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-sm">
                  <SparkleIcon />
                </div>

                <div>
                  <p className="text-[14px] font-black text-[#1677FF]">
                    AIからのアドバイス
                  </p>

                  <p className="mt-1.5 text-[12px] leading-5 text-neutral-700">
                    まずは「日焼け止め」だけでも印象は大きく変わります。
                    慣れてきたら、化粧水、ヘアワックスの順に取り入れるのがおすすめです。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-7">
            <h2 className="text-[18px] font-black">おすすめ商品一覧</h2>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {products.map((product) => (
                <article
                  key={product.name}
                  className="flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-black/10 bg-white"
                >
                  <div className="flex h-[138px] items-center justify-center bg-gradient-to-b from-white to-[#fafafa]">
                    <ProductVisual
                      type={product.visualType}
                      size="normal"
                    />
                  </div>

                  <div className="flex flex-1 flex-col border-t border-[#eeeeee] p-2.5">
                    <p className="text-[9px] font-black leading-tight text-neutral-500">
                      {product.brand}
                    </p>

                    <h3 className="mt-1 line-clamp-2 min-h-8 text-[11px] font-black leading-4">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-[8px]">
                      <span className="text-[#1677FF]">★★★★★</span>
                      <span className="font-bold">{product.rating}</span>
                    </div>

                    <p className="mt-2 text-[15px] font-black">
                      ¥{formatPrice(product.price)}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded bg-[#f5f5f5] px-1.5 py-1 text-[8px] font-bold">
                        {product.category}
                      </span>

                      <span className="rounded bg-[#FFF9D9] px-1.5 py-1 text-[8px] font-black text-[#1677FF]">
                        効果 +{product.score}点
                      </span>
                    </div>

                    <a
                      href="https://www.amazon.co.jp/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 flex min-h-9 items-center justify-center gap-1 rounded-lg bg-black px-1 py-2 text-center text-[9px] font-black text-white transition hover:bg-neutral-800 active:scale-[0.98]"
                    >
                      Amazonで見る
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <h2 className="text-[18px] font-black">
              まとめ：これだけ揃えればOK
            </h2>

            <div className="mt-3 rounded-[16px] border border-black/10 bg-white p-4">
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="flex items-center justify-center gap-2">
                  {products.map((product, index) => (
                    <div
                      key={product.name}
                      className="flex items-center gap-2"
                    >
                      {index > 0 && (
                        <span className="text-lg font-light text-neutral-400">
                          +
                        </span>
                      )}

                      <div className="text-center">
                        <div className="flex h-16 items-center justify-center">
                          <ProductVisual
                            type={product.visualType}
                            size="small"
                          />
                        </div>

                        <p className="mt-1 text-[9px] font-black">
                          {product.shortName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-l border-[#e5e5e5] pl-4 text-center">
                  <p className="text-[11px] font-black text-neutral-600">
                    予算の目安
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[25px] font-black text-[#1677FF]">
                    約{formatPrice(totalPrice)}円
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-[9px] leading-4 text-neutral-400">
              ※価格は参考価格です。販売店や時期により変更される場合があります。
            </p>
          </section>
        </div>

    </AppShell>
  );
}