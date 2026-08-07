import Link from "next/link";
import AppShell from "../components/AppShell";
import DummyAd from "../components/DummyAd";
import AppLogo from "../components/AppLogo";
import {
  activeProducts,
  categories,
  type CategorySection,
  type Product,
  type ProductVisualType,
} from "../../data/products";

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

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
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

function SparkleIcon({
  className = "h-6 w-6",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
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

function CategoryIcon({
  type,
}: {
  type: CategorySection["icon"];
}) {
  if (type === "drop") {
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
        <path d="M12 3S6 9.2 6 14a6 6 0 0 0 12 0c0-4.8-6-11-6-11Z" />
      </svg>
    );
  }

  if (type === "hair") {
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
        <path d="M7 18c1.5-4 3.5-6 6-6 2 0 3.6 1.1 4.8 3.1" />
        <path d="M6 10c1.4-4.4 4-6.6 7.7-6.6 3.2 0 5.4 1.7 6.3 5.1" />
        <path d="M4 14c.8-2.1 2-3.4 3.6-4" />
      </svg>
    );
  }

  if (type === "brow") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M3 14c4-4 8-4 12 0" />
        <path d="M9 14c4-4 8-4 12 0" />
      </svg>
    );
  }

  return <SparkleIcon className="h-5 w-5" />;
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function getVisualSettings(type: ProductVisualType) {
  const settings: Record<
    ProductVisualType,
    {
      label: string;
      subLabel: string;
      bodyClass: string;
      shapeClass: string;
    }
  > = {
    sunscreen: {
      label: "UV",
      subLabel: "CARE",
      bodyClass:
        "border-black/10 bg-gradient-to-br from-white via-[#F7F9FC] to-[#EEF6FF]",
      shapeClass:
        "h-[76%] w-[44%] rounded-b-[16px] rounded-t-[7px]",
    },

    lotion: {
      label: "MEN",
      subLabel: "LOTION",
      bodyClass:
        "border-[#1677FF]/15 bg-gradient-to-b from-[#EEF6FF] to-[#1677FF] text-white",
      shapeClass:
        "h-[72%] w-[40%] rounded-b-[12px] rounded-t-[7px]",
    },

    cleanser: {
      label: "WASH",
      subLabel: "CLEAN",
      bodyClass:
        "border-black/10 bg-[#111111] text-white",
      shapeClass:
        "h-[70%] w-[45%] rounded-b-[14px] rounded-t-[8px]",
    },

    wax: {
      label: "N.",
      subLabel: "BALM",
      bodyClass:
        "border-black/10 bg-[#111111] text-white",
      shapeClass:
        "h-[45%] w-[60%] rounded-[15px]",
    },

    hairOil: {
      label: "OIL",
      subLabel: "HAIR",
      bodyClass:
        "border-black/10 bg-gradient-to-b from-[#FFF9D9] to-[#FFD400]",
      shapeClass:
        "h-[72%] w-[36%] rounded-b-[12px] rounded-t-[5px]",
    },

    dryer: {
      label: "ION",
      subLabel: "DRYER",
      bodyClass:
        "border-black/10 bg-gradient-to-br from-white to-[#F7F9FC]",
      shapeClass:
        "h-[46%] w-[64%] rounded-[22px]",
    },

    eyebrowShaver: {
      label: "眉",
      subLabel: "SHAVER",
      bodyClass:
        "border-black/10 bg-gradient-to-b from-white to-[#F7F9FC]",
      shapeClass:
        "h-[78%] w-[22%] rounded-full",
    },

    eyebrowPencil: {
      label: "BROW",
      subLabel: "PENCIL",
      bodyClass:
        "border-black/10 bg-[#111111] text-white",
      shapeClass:
        "h-[82%] w-[12%] rounded-full",
    },

    tweezers: {
      label: "CARE",
      subLabel: "TOOL",
      bodyClass:
        "border-black/10 bg-gradient-to-b from-white to-[#F7F9FC]",
      shapeClass:
        "h-[76%] w-[18%] rotate-6 rounded-full",
    },

    fragrance: {
      label: "SAVON",
      subLabel: "EAU",
      bodyClass:
        "border-[#1677FF]/10 bg-gradient-to-br from-white to-[#EEF6FF]",
      shapeClass:
        "h-[60%] w-[46%] rounded-[10px]",
    },

    lip: {
      label: "LIP",
      subLabel: "CARE",
      bodyClass:
        "border-black/10 bg-[#111111] text-white",
      shapeClass:
        "h-[72%] w-[22%] rounded-[7px]",
    },

    toothbrush: {
      label: "ORAL",
      subLabel: "CARE",
      bodyClass:
        "border-[#1677FF]/10 bg-gradient-to-b from-white to-[#EEF6FF]",
      shapeClass:
        "h-[78%] w-[20%] rounded-full",
    },
  };

  return settings[type];
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

  const settings = getVisualSettings(type);

  return (
    <div
      className={`relative flex items-end justify-center ${wrapperSize}`}
    >
      <div
        className={`relative flex items-center justify-center border shadow-[0_10px_34px_rgba(15,23,42,0.05)] ${settings.bodyClass} ${settings.shapeClass}`}
      >
        <div className="text-center">
          <p className="text-[7px] font-black tracking-[0.08em]">
            {settings.label}
          </p>

          <p className="mt-0.5 text-[4px] font-bold opacity-60">
            {settings.subLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

function AffiliateButtons({
  product,
}: {
  product: Product;
}) {
  const baseClass =
    "flex min-h-10 items-center justify-center gap-1 rounded-[10px] px-2 text-[8px] font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]";

  return (
    <div
      className={`mt-4 grid gap-2 ${
        product.rakuten
          ? "grid-cols-2"
          : "grid-cols-1"
      }`}
    >
      <a
        href={product.amazon.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`${baseClass} bg-[#111111]`}
      >
        Amazonで見る
        <ExternalLinkIcon />
      </a>

      {product.rakuten && (
        <a
          href={product.rakuten.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`${baseClass} bg-[#BF0000]`}
        >
          楽天で見る
          <ExternalLinkIcon />
        </a>
      )}
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
      <div className="grid grid-cols-[118px_1fr] border-b border-black/10">
        <div className="relative flex min-h-[170px] items-center justify-center bg-gradient-to-b from-white to-[#F7F9FC]">
          <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFD400] text-[10px] font-black text-[#111111]">
            {product.rank}
          </span>

          <ProductVisual
            type={product.visualType}
            size="normal"
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-black tracking-[0.08em] text-black/35">
                {product.brand}
              </p>

              <h3 className="mt-1 text-[15px] font-black leading-6">
                {product.name}
              </h3>
            </div>

            <div className="shrink-0 rounded-[12px] bg-[#EEF6FF] px-2.5 py-2 text-right">
              <p className="text-[7px] font-black text-[#1677FF]">
                AI一致度
              </p>

              <p className="mt-0.5 text-[18px] font-black leading-none text-[#1677FF]">
                {product.matchScore}%
              </p>
            </div>
          </div>

          <p className="mt-2 text-[10px] leading-5 text-black/55">
            {product.description}
          </p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              {product.rating &&
              product.reviewCount ? (
                <>
                  <p className="text-[9px] text-[#FFD400]">
                    ★ {product.rating}
                  </p>

                  <p className="mt-0.5 text-[8px] text-black/35">
                    {product.reviewCount}
                  </p>
                </>
              ) : (
                <p className="text-[8px] leading-4 text-black/35">
                  商品情報は
                  <br />
                  販売サイトで確認
                </p>
              )}
            </div>

            {product.price !== null ? (
              <p className="text-[18px] font-black">
                ¥{formatPrice(product.price)}
              </p>
            ) : (
              <p className="text-[9px] font-black text-[#1677FF]">
                価格を確認
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-[#FFF9D9] px-2 py-1 text-[8px] font-black text-[#111111]"
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[8px] font-black text-black/35">
          おすすめポイント
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.recommendedFor.map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-1 rounded-full bg-[#EEF6FF] px-2 py-1 text-[8px] font-black text-[#1677FF]"
              >
                <CheckIcon />
                {item}
              </span>
            ),
          )}
        </div>

        <AffiliateButtons
          product={product}
        />
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const primaryProduct =
    activeProducts[0];

  if (!primaryProduct) {
    return (
      <AppShell background="white">
        <div className="flex min-h-screen items-center justify-center px-5 text-center">
          <p className="text-[13px] font-bold text-black/55">
            現在掲載中の商品はありません。
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell background="white">
      <div className="overflow-hidden bg-white">
        <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
            <Link
              href="/result"
              aria-label="診断結果へ戻る"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#111111] transition hover:bg-[#EEF6FF] active:scale-95"
            >
              <ArrowLeftIcon />
            </Link>

            <div className="flex justify-center">
              <AppLogo />
            </div>

            <div aria-hidden="true" />
          </div>
        </header>

        <div className="px-4 pb-32 pt-6">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            PERSONAL PRODUCT GUIDE
          </p>

          <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
            あなた専用のおすすめ商品
          </h1>

          <p className="mt-3 text-[11px] leading-5 text-black/55">
            AI診断結果をもとに、
            あなたの改善内容に合う商品を整理しました。
          </p>

          <section className="mt-6 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="grid grid-cols-[44%_56%]">
              <div className="relative flex min-h-[260px] items-center justify-center border-r border-black/10 bg-gradient-to-br from-white to-[#EEF6FF]">
                <span className="absolute left-3 top-3 rounded-full bg-[#FFD400] px-3 py-1.5 text-[9px] font-black text-[#111111]">
                  AI最優先
                </span>

                <ProductVisual
                  type={
                    primaryProduct.visualType
                  }
                  size="large"
                />
              </div>

              <div className="flex flex-col justify-center px-4 py-6">
                <p className="text-[8px] font-black tracking-[0.14em] text-[#1677FF]">
                  BEST MATCH
                </p>

                <h2 className="mt-2 text-[23px] font-black tracking-[-0.04em]">
                  {primaryProduct.shortName}
                </h2>

                <p className="mt-3 text-[10px] leading-5 text-black/55">
                  現在の診断では、
                  紫外線対策と肌印象をまとめて整えられるアイテムを優先しています。
                </p>

                <div className="mt-5 inline-flex w-fit flex-col rounded-[14px] border border-[#1677FF]/15 bg-[#EEF6FF] px-3.5 py-3">
                  <p className="text-[8px] font-black text-[#1677FF]">
                    AI診断一致度
                  </p>

                  <div className="mt-1 flex items-end gap-1.5">
                    <p className="text-[29px] font-black leading-none tracking-[-0.04em] text-[#1677FF]">
                      {
                        primaryProduct.matchScore
                      }
                      %
                    </p>

                    <p className="pb-0.5 text-[8px] font-bold tracking-[0.08em] text-black/35">
                      MATCH
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 p-4">
              <div className="flex gap-3 rounded-[16px] bg-[#EEF6FF] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
                  <SparkleIcon />
                </span>

                <div>
                  <p className="text-[11px] font-black text-[#1677FF]">
                    AIからのアドバイス
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-black/55">
                    最初からすべて揃える必要はありません。
                    診断結果で優先度が高い項目から、
                    自分に合う商品を選びましょう。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <nav
            aria-label="商品カテゴリー"
            className="mt-5 grid grid-cols-4 gap-2"
          >
            {categories.map(
              (category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex min-h-[70px] flex-col items-center justify-center rounded-[15px] border border-black/10 bg-white px-1 text-center shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:border-[#1677FF]/30 hover:bg-[#EEF6FF]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                    <CategoryIcon
                      type={category.icon}
                    />
                  </span>

                  <span className="mt-2 text-[9px] font-black">
                    {category.label}
                  </span>
                </a>
              ),
            )}
          </nav>

          <div className="mt-10 space-y-12">
            {categories.map(
              (
                category,
                categoryIndex,
              ) => {
                const categoryProducts =
                  activeProducts.filter(
                    (product) =>
                      product.category ===
                      category.id,
                  );

                if (
                  categoryProducts.length === 0
                ) {
                  return null;
                }

                return (
                  <div key={category.id}>
                    <section
                      id={category.id}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-black tracking-[0.14em] text-[#1677FF]">
                            PRIORITY{" "}
                            {category.priority}
                          </p>

                          <h2 className="mt-1 text-[23px] font-black tracking-[-0.04em]">
                            {category.label}
                          </h2>
                        </div>

                        <span className="rounded-full bg-[#EEF6FF] px-3 py-1.5 text-[9px] font-black text-[#1677FF]">
                          {
                            categoryProducts.length
                          }
                          商品
                        </span>
                      </div>

                      <p className="mt-3 text-[11px] leading-5 text-black/55">
                        {
                          category.description
                        }
                      </p>

                      <div className="mt-4 flex gap-3 rounded-[16px] bg-[#EEF6FF] p-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
                          <SparkleIcon className="h-5 w-5" />
                        </span>

                        <div>
                          <p className="text-[10px] font-black text-[#1677FF]">
                            AIカテゴリコメント
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-black/55">
                            {category.advice}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4">
                        {categoryProducts.map(
                          (product) => (
                            <ProductCard
                              key={
                                product.id
                              }
                              product={
                                product
                              }
                            />
                          ),
                        )}
                      </div>
                    </section>

                    {categoryIndex === 2 && (
                      <DummyAd
                        className="mt-10"
                        format="rectangle"
                      />
                    )}
                  </div>
                );
              },
            )}
          </div>

          <aside className="mt-9 rounded-[16px] bg-[#F7F9FC] px-4 py-4">
            <p className="text-center text-[9px] leading-5 text-black/35">
              ※商品情報・価格・在庫状況は変更される場合があります。
              <br />
              最新情報は各販売サイトでご確認ください。
            </p>
          </aside>

          <Link
            href="/result"
            className="mt-5 flex min-h-[50px] items-center justify-center rounded-[12px] border border-black/10 bg-white px-5 text-[11px] font-black transition hover:bg-[#EEF6FF]"
          >
            診断結果へ戻る
          </Link>
        </div>
      </div>
    </AppShell>
  );
}