"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import AppHeader from "../components/AppHeader";
import AppShell from "../components/AppShell";
import AdSenseAd from "../components/AdSenseAd";
import {
  activeProducts,
  categories,
  type Product,
  type ProductCategory,
  type ProductVisualType,
} from "../../data/products";

import {
  productNeedLabels,
  productNeeds,
  type ProductNeed,
} from "../../data/productNeeds";

function formatPrice(price: number) {
  return new Intl.NumberFormat("ja-JP").format(price);
}

const RESULT_STORAGE_KEY =
  "akanukeAnalysisResult";

function isProductNeed(
  value: unknown,
): value is ProductNeed {
  return (
    typeof value === "string" &&
    (
      productNeeds as readonly string[]
    ).includes(value)
  );
}

function getProductScore(
  product: Product,
  diagnosisNeeds: ProductNeed[],
) {
  return (product.needTags ?? []).reduce(
    (totalScore, tag) => {
      const needIndex =
        diagnosisNeeds.indexOf(tag);

      if (needIndex === -1) {
        return totalScore;
      }

      return (
        totalScore +
        diagnosisNeeds.length -
        needIndex
      );
    },
    0,
  );
}

function getCategoryScore(
  category: ProductCategory,
  diagnosisNeeds: ProductNeed[],
) {
  return activeProducts
    .filter(
      (product) =>
        product.category === category,
    )
    .reduce(
      (highestScore, product) =>
        Math.max(
          highestScore,
          getProductScore(
            product,
            diagnosisNeeds,
          ),
        ),
      0,
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
}: {
  type: ProductVisualType;
}) {
  const settings = getVisualSettings(type);

  return (
    <div className="relative flex h-28 w-20 items-end justify-center">
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
    <div className="mt-4">
      <a
        href={product.amazon.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`${baseClass} w-full bg-[#111111]`}
      >
        Amazonで見る
        <ExternalLinkIcon />
      </a>
    </div>
  );
}

function ProductCard({
  product,
  diagnosisNeeds,
  featured = false,
}: {
  product: Product;
  diagnosisNeeds: ProductNeed[];
  featured?: boolean;
}) {
  const matchedReasons =
    diagnosisNeeds
      .filter((need) =>
        (
          product.needTags ?? []
        ).includes(need),
      )
      .map(
        (need) =>
          productNeedLabels[need],
      );

  const displayedReasons =
    matchedReasons.length > 0
      ? matchedReasons
      : product.recommendedFor;

  return (
    <article
  className={`overflow-hidden rounded-[20px] bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)] ${
    featured
      ? "border-2 border-[#1677FF]/20"
      : "border border-black/10"
  }`}
>
  {featured ? (
    <div className="bg-[#1677FF] px-4 py-2">
      <p className="text-[9px] font-black tracking-[0.12em] text-white">
        AI PICK
      </p>
    </div>
  ) : null}

  <div
    className={`grid border-b border-black/10 ${
      featured
        ? "grid-cols-[140px_1fr]"
        : "grid-cols-[112px_1fr]"
    }`}
  >
        <div className="relative flex min-h-[166px] items-center justify-center bg-gradient-to-b from-white to-[#F7F9FC]">
          
          {product.imagePath ? (
  <Image
    src={product.imagePath}
    alt={
      product.imageAlt ??
      `${product.brand} ${product.name}`
    }
    width={240}
    height={240}
    className="h-auto max-h-[150px] w-auto max-w-[90%] object-contain"
  />
) : (
  <ProductVisual
    type={product.visualType}
  />
)}
        </div>

        <div className="flex min-w-0 flex-col justify-center p-4">
          <p className="text-[9px] font-black tracking-[0.08em] text-black/35">
            {product.brand}
          </p>

          <h3 className="mt-1 text-[15px] font-black leading-6">
            {product.name}
          </h3>

          <p className="mt-2 text-[10px] leading-5 text-black/55">
            {product.description}
          </p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              {product.rating &&
              product.reviewCount ? (
                <>
                  <p className="text-[9px] font-black text-[#111111]">
                    ★ {product.rating}
                  </p>

                  <p className="mt-0.5 text-[8px] text-black/35">
                    {product.reviewCount}
                  </p>
                </>
              ) : (
                <p className="text-[8px] leading-4 text-black/35">
                  商品情報は販売サイトで確認
                </p>
              )}
            </div>

            {product.price !== null ? (
              <p className="shrink-0 text-[17px] font-black">
                ¥{formatPrice(product.price)}
              </p>
            ) : null}
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

        <div className="mt-4 rounded-[14px] bg-[#EEF6FF] p-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
              <SparkleIcon className="h-4 w-4" />
            </span>

            <p className="text-[9px] font-black text-[#1677FF]">
              あなたにおすすめの理由
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
                        {displayedReasons.map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[8px] font-black text-[#1677FF]"
                >
                  <CheckIcon />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <AffiliateButtons product={product} />
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [
    diagnosisNeeds,
    setDiagnosisNeeds,
  ] = useState<ProductNeed[]>([]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<ProductCategory>(
    categories[0]?.id ?? "skincare",
  );

    const [
    showAllProducts,
    setShowAllProducts,
  ] = useState(false);

  useEffect(() => {
  const timeoutId =
    window.setTimeout(() => {
      const requestedCategory =
        categories.find(
          (category) =>
            category.id ===
            new URLSearchParams(
              window.location.search,
            ).get("category"),
        )?.id;

      /*
       * URLでカテゴリが指定されている場合は、
       * そのカテゴリを最初に表示します。
       */
      if (requestedCategory) {
        setSelectedCategory(
          requestedCategory,
        );
      }

      const rawResult =
        window.sessionStorage.getItem(
          RESULT_STORAGE_KEY,
        );

      if (!rawResult) {
        return;
      }

      try {
        const parsed = JSON.parse(
          rawResult,
        ) as {
          productNeeds?: unknown;
        };

        if (
          !Array.isArray(
            parsed.productNeeds,
          )
        ) {
          return;
        }

        const validNeeds =
          parsed.productNeeds.filter(
            isProductNeed,
          );

        if (
          validNeeds.length === 0
        ) {
          return;
        }

        setDiagnosisNeeds(
          validNeeds,
        );

        /*
         * URLでカテゴリが指定されている場合は、
         * 診断結果によるカテゴリ変更を行いません。
         *
         * 商品の並び順については、
         * 指定されたカテゴリ内で診断結果を反映します。
         */
        if (requestedCategory) {
          return;
        }

        const recommendedCategory =
          [...categories].sort(
            (a, b) =>
              getCategoryScore(
                b.id,
                validNeeds,
              ) -
              getCategoryScore(
                a.id,
                validNeeds,
              ),
          )[0];

        if (recommendedCategory) {
          setSelectedCategory(
            recommendedCategory.id,
          );
        }
      } catch (error) {
        console.warn(
          "[AKANUKE.AI] 商品レコメンド用の診断結果を読み込めませんでした:",
          error,
        );
      }
    }, 0);

  return () => {
    window.clearTimeout(
      timeoutId,
    );
  };
}, []);

  const availableCategories = useMemo(
    () =>
      [...categories].sort(
        (a, b) =>
          getCategoryScore(
            b.id,
            diagnosisNeeds,
          ) -
          getCategoryScore(
            a.id,
            diagnosisNeeds,
          ),
      ),
    [diagnosisNeeds],
  );

  const selectedCategoryData =
    availableCategories.find(
      (category) =>
        category.id ===
        selectedCategory,
    ) ?? availableCategories[0];

  const selectedProducts = useMemo(
    () =>
      activeProducts
        .filter(
          (product) =>
            product.category ===
            selectedCategory,
        )
        .sort((a, b) => {
          const scoreDifference =
            getProductScore(
              b,
              diagnosisNeeds,
            ) -
            getProductScore(
              a,
              diagnosisNeeds,
            );

          if (scoreDifference !== 0) {
            return scoreDifference;
          }

          return a.rank - b.rank;
        }),
    [
      selectedCategory,
      diagnosisNeeds,
    ],
  );

    const displayedProducts =
    showAllProducts
      ? selectedProducts
      : selectedProducts.slice(0, 3);

  if (!selectedCategoryData) {
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
        <AppHeader
  backHref="/result"
  backMode="history"
  backLabel="前のページへ戻る"
/>

        <main className="pb-32 pt-6">
          <div className="px-4">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              PERSONAL PRODUCT GUIDE
            </p>

            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              あなた専用のおすすめ商品
            </h1>

            <p className="mt-3 text-[11px] leading-5 text-black/55">
              AI診断結果をもとに、あなたに合ったケア用品をカテゴリ別に紹介します。
            </p>
          </div>

          <nav
            aria-label="商品カテゴリー"
            className="mt-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max gap-2">
              {availableCategories.map(
                (category) => {
                  const isActive =
                    selectedCategory ===
                    category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
  setSelectedCategory(
    category.id,
  );
  setShowAllProducts(false);
}}
                      className={`min-h-[42px] shrink-0 rounded-full border px-4 text-[10px] font-black transition active:scale-[0.98] ${
                        isActive
                          ? "border-[#1677FF] bg-[#1677FF] text-white shadow-[0_8px_24px_rgba(22,119,255,0.16)]"
                          : "border-black/10 bg-white text-black/55 hover:border-[#1677FF]/30 hover:bg-[#EEF6FF] hover:text-[#1677FF]"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                },
              )}
            </div>
          </nav>

          <div className="mt-4 border-t border-black/5" />

          <div className="px-4 pt-7">
            <section>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black tracking-[0.14em] text-[#1677FF]">
                    {
                      selectedCategoryData.englishLabel
                    }
                  </p>

                  <h2 className="mt-1 text-[24px] font-black tracking-[-0.04em]">
                    {selectedCategoryData.label}
                  </h2>
                </div>

                <span className="shrink-0 rounded-full bg-[#EEF6FF] px-3 py-1.5 text-[9px] font-black text-[#1677FF]">
                  {selectedProducts.length}商品
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-black/55">
                {
                  selectedCategoryData.description
                }
              </p>

              <div className="mt-4 flex gap-3 rounded-[16px] bg-[#EEF6FF] p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
                  <SparkleIcon className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] font-black text-[#1677FF]">
                    AIからのアドバイス
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-black/55">
                    {selectedCategoryData.advice}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4">
  {displayedProducts.map(
  (product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      diagnosisNeeds={
        diagnosisNeeds
      }
      featured={index === 0}
    />
  ),
)}
</div>

{selectedProducts.length > 3 ? (
  <button
    type="button"
    onClick={() =>
      setShowAllProducts(
        (current) => !current,
      )
    }
    className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-[12px] border border-[#1677FF]/15 bg-white px-5 text-[11px] font-black text-[#1677FF] transition hover:bg-[#EEF6FF] active:scale-[0.99]"
  >
    {showAllProducts
      ? "候補商品を閉じる"
      : `他の候補商品を見る（${selectedProducts.length - 3}件）`}
  </button>
) : null}
            </section>

            <AdSenseAd
              className="mt-10"
              format="rectangle"
            />

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
        </main>
      </div>
    </AppShell>
  );
}
