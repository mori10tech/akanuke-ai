"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import liff from "@line/liff";

import AppHeader from "../components/AppHeader";
import AppShell from "../components/AppShell";
import AdSenseAd from "../components/AdSenseAd";
import { trackEvent } from "../../lib/analytics";

import {
  activeProducts,
  categories,
  type Product,
  type ProductCategory,
} from "../../data/products";

import {
  productNeedLabels,
  productNeeds,
  type ProductNeed,
} from "../../data/productNeeds";

function formatPrice(
  price: number,
) {
  return new Intl.NumberFormat(
    "ja-JP",
  ).format(price);
}

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
  return (
    product.needTags ?? []
  ).reduce(
    (
      totalScore,
      tag,
    ) => {
      const needIndex =
        diagnosisNeeds.indexOf(
          tag,
        );

      if (
        needIndex === -1
      ) {
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
        product.category ===
        category,
    )
    .reduce(
      (
        highestScore,
        product,
      ) =>
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

/*
 * Amazonなどの外部販売サイトを開きます。
 *
 * GA4へ商品クリック情報を送信したあと、
 * LIFF内では外部ブラウザ、
 * 通常ブラウザでは新規タブで開きます。
 */
function openExternalProductUrl({
  url,
  product,
  clickPosition,
  featured,
}: {
  url: string;
  product: Product;
  clickPosition:
    | "image"
    | "button";
  featured: boolean;
}) {
  trackEvent(
    "product_click",
    {
      product_id:
        product.id,

      product_category:
        product.category,

      affiliate_provider:
        "amazon",

      click_position:
        clickPosition,

      is_ai_pick:
        featured,
    },
  );

  try {
    if (
      liff.isInClient()
    ) {
      liff.openWindow({
        url,
        external: true,
      });

      return;
    }
  } catch (error) {
    console.warn(
      "[AKANUKE.AI] LIFF外部ブラウザ起動に失敗しました:",
      error,
    );
  }

  window.open(
    url,
    "_blank",
    "noopener,noreferrer",
  );
}

function AffiliateButtons({
  product,
  featured,
}: {
  product: Product;
  featured: boolean;
}) {
  const baseClass =
    "flex min-h-[50px] items-center justify-center gap-2 rounded-[12px] px-4 text-[12px] font-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] active:scale-[0.98]";

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() =>
          openExternalProductUrl(
            {
              url:
                product
                  .amazon
                  .url,

              product,

              clickPosition:
                "button",

              featured,
            },
          )
        }
        className={`${baseClass} w-full bg-[#111111]`}
      >
        Amazonで見る

        <ExternalLinkIcon />
      </button>
    </div>
  );
}

function ProductCard({
  product,
  diagnosisNeeds,
  featured = false,
}: {
  product: Product;
  diagnosisNeeds:
    ProductNeed[];
  featured?: boolean;
}) {
  const matchedReasons =
    diagnosisNeeds
      .filter(
        (need) =>
          (
            product
              .needTags ??
            []
          ).includes(
            need,
          ),
      )
      .map(
        (need) =>
          productNeedLabels[
            need
          ],
      );

  const displayedReasons =
    matchedReasons.length >
    0
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
          <p className="text-[10px] font-black tracking-[0.12em] text-white">
            AI PICK
          </p>
        </div>
      ) : null}

      <div className="p-4">
        {product.imageUrl ? (
          <button
            type="button"
            onClick={() =>
              openExternalProductUrl(
                {
                  url:
                    product
                      .amazon
                      .url,

                  product,

                  clickPosition:
                    "image",

                  featured,
                },
              )
            }
            className="mb-4 flex w-full items-center justify-center overflow-hidden rounded-[16px] bg-white p-3"
            aria-label={`${product.name}をAmazonで見る`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                product.imageUrl
              }
              alt={
                product.imageAlt ??
                product.name
              }
              className="h-[160px] w-full object-contain"
            />
          </button>
        ) : null}

        <p className="text-[12px] font-black tracking-[0.06em] text-black/65">
          {product.brand}
        </p>

        <h3
          className={`mt-1 font-black leading-7 ${
            featured
              ? "text-[19px]"
              : "text-[16px]"
          }`}
        >
          {product.name}
        </h3>

        <p className="mt-3 text-[13px] leading-6 text-black/70">
          {
            product.description
          }
        </p>

        {(product.rating &&
          product.reviewCount) ||
        product.price !==
          null ? (
          <div className="mt-4 flex items-end justify-between gap-3 border-t border-black/10 pt-4">
            <div>
              {product.rating &&
              product.reviewCount ? (
                <>
                  <p className="text-[11px] font-black text-[#111111]">
                    ★{" "}
                    {
                      product.rating
                    }
                  </p>

                  <p className="mt-0.5 text-[10px] text-black/55">
                    {
                      product.reviewCount
                    }
                  </p>
                </>
              ) : null}
            </div>

            {product.price !==
            null ? (
              <p className="shrink-0 text-[17px] font-black">
                ¥
                {formatPrice(
                  product.price,
                )}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.badges.map(
            (badge) => (
              <span
                key={
                  badge
                }
                className="rounded-full bg-[#FFF9D9] px-2.5 py-1.5 text-[10px] font-black text-[#111111]"
              >
                {badge}
              </span>
            ),
          )}
        </div>

        <div className="mt-4 rounded-[14px] bg-[#EEF6FF] p-3.5">
          <p className="text-[11px] font-black text-[#1677FF]">
            あなたにおすすめの理由
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {displayedReasons.map(
              (item) => (
                <span
                  key={
                    item
                  }
                  className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-black text-[#1677FF]"
                >
                  <CheckIcon />

                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <AffiliateButtons
          product={
            product
          }
          featured={
            featured
          }
        />
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const productsViewTrackedRef =
    useRef(false);

  const categoryScrollRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    categoryScrollProgress,
    setCategoryScrollProgress,
  ] = useState(0);

  const [
    categoryIndicatorWidth,
    setCategoryIndicatorWidth,
  ] = useState(100);

  const [
    hasCategoryOverflow,
    setHasCategoryOverflow,
  ] = useState(false);

  const [
    diagnosisNeeds,
    setDiagnosisNeeds,
  ] = useState<
    ProductNeed[]
  >([]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] =
    useState<ProductCategory | null>(
      null,
    );

  const [
    showAllProducts,
    setShowAllProducts,
  ] = useState(false);

  const [
    isDiagnosisReady,
    setIsDiagnosisReady,
  ] = useState(false);

  /*
   * 横スクロール量から、
   * 下部インジケーターの幅と位置を計算します。
   */
  const updateCategoryScrollIndicator =
    useCallback(() => {
      const element =
        categoryScrollRef.current;

      if (!element) {
        setHasCategoryOverflow(
          false,
        );

        setCategoryScrollProgress(
          0,
        );

        setCategoryIndicatorWidth(
          100,
        );

        return;
      }

      const {
        scrollWidth,
        clientWidth,
        scrollLeft,
      } = element;

      const hasOverflow =
        scrollWidth >
        clientWidth + 2;

      setHasCategoryOverflow(
        hasOverflow,
      );

      if (
        !hasOverflow
      ) {
        setCategoryScrollProgress(
          0,
        );

        setCategoryIndicatorWidth(
          100,
        );

        return;
      }

      const maxScroll =
        Math.max(
          scrollWidth -
            clientWidth,
          1,
        );

      const progress =
        Math.min(
          1,
          Math.max(
            0,
            scrollLeft /
              maxScroll,
          ),
        );

      const visibleRatio =
        Math.min(
          1,
          clientWidth /
            scrollWidth,
        );

      /*
       * 短すぎるバーにならないよう、
       * 最低24%は確保します。
       */
      const indicatorWidth =
        Math.max(
          24,
          visibleRatio *
            100,
        );

      setCategoryScrollProgress(
        progress,
      );

      setCategoryIndicatorWidth(
        indicatorWidth,
      );
    }, []);

  /*
   * 初回表示・画面幅変更時に
   * スクロール可能かを再計算します。
   */
  useEffect(() => {
    const element =
      categoryScrollRef.current;

    if (!element) {
      return;
    }

    const frameId =
      window.requestAnimationFrame(
        () => {
          updateCategoryScrollIndicator();
        },
      );

    const resizeObserver =
      new ResizeObserver(
        () => {
          updateCategoryScrollIndicator();
        },
      );

    resizeObserver.observe(
      element,
    );

    window.addEventListener(
      "resize",
      updateCategoryScrollIndicator,
    );

    return () => {
      window.cancelAnimationFrame(
        frameId,
      );

      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        updateCategoryScrollIndicator,
      );
    };
  }, [
    updateCategoryScrollIndicator,
  ]);

  useEffect(() => {
    let isCancelled =
      false;

    /*
     * Result・Planなどのページ途中から遷移しても、
     * 商品ページは必ず最上部から表示します。
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    async function restoreLatestDiagnosis() {
      try {
        const requestedCategory =
          categories.find(
            (
              category,
            ) =>
              category.id ===
              new URLSearchParams(
                window.location
                  .search,
              ).get(
                "category",
              ),
          )?.id;

        if (
          requestedCategory
        ) {
          setSelectedCategory(
            requestedCategory,
          );
        }

        const latestResponse =
          await fetch(
            "/api/diagnoses/latest",
            {
              method:
                "GET",

              cache:
                "no-store",
            },
          );

        const latestData =
          (await latestResponse.json()) as {
            diagnosisId?:
              | string
              | null;

            error?: string;
          };

        if (
          !latestResponse.ok
        ) {
          throw new Error(
            latestData.error ??
              "最新の診断情報を取得できませんでした。",
          );
        }

        const latestDiagnosisId =
          typeof latestData
            .diagnosisId ===
            "string" &&
          latestData.diagnosisId
            .trim()
            .length > 0
            ? latestData.diagnosisId
            : null;

        if (
          !latestDiagnosisId ||
          isCancelled
        ) {
          if (
            !isCancelled
          ) {
            setSelectedCategory(
              requestedCategory ??
                categories[0]
                  ?.id ??
                "skincare",
            );

            setIsDiagnosisReady(
              true,
            );
          }

          return;
        }

        const diagnosisResponse =
          await fetch(
            `/api/diagnoses/${encodeURIComponent(
              latestDiagnosisId,
            )}`,
            {
              method:
                "GET",

              cache:
                "no-store",
            },
          );

        const diagnosisData =
          (await diagnosisResponse.json()) as {
            diagnosis?: {
              analysis?: {
                productNeeds?:
                  unknown;
              };
            };

            error?: string;
          };

        if (
          !diagnosisResponse.ok
        ) {
          throw new Error(
            diagnosisData.error ??
              "診断結果を取得できませんでした。",
          );
        }

        if (
          isCancelled ||
          !diagnosisData.diagnosis
        ) {
          if (
            !isCancelled
          ) {
            setSelectedCategory(
              requestedCategory ??
                categories[0]
                  ?.id ??
                "skincare",
            );

            setIsDiagnosisReady(
              true,
            );
          }

          return;
        }

        const productNeedsValue =
          diagnosisData
            .diagnosis
            .analysis
            ?.productNeeds;

        if (
          !Array.isArray(
            productNeedsValue,
          )
        ) {
          if (
            !isCancelled
          ) {
            setSelectedCategory(
              requestedCategory ??
                categories[0]
                  ?.id ??
                "skincare",
            );

            setIsDiagnosisReady(
              true,
            );
          }

          return;
        }

        const validNeeds =
          productNeedsValue.filter(
            isProductNeed,
          );

        if (
          validNeeds.length ===
          0
        ) {
          if (
            !isCancelled
          ) {
            setSelectedCategory(
              requestedCategory ??
                categories[0]
                  ?.id ??
                "skincare",
            );

            setIsDiagnosisReady(
              true,
            );
          }

          return;
        }

        setDiagnosisNeeds(
          validNeeds,
        );

        /*
         * URLでカテゴリ指定がある場合は、
         * そのカテゴリを優先します。
         */
        if (
          requestedCategory
        ) {
          setIsDiagnosisReady(
            true,
          );

          return;
        }

        const recommendedCategory =
          [
            ...categories,
          ].sort(
            (
              a,
              b,
            ) =>
              getCategoryScore(
                b.id,
                validNeeds,
              ) -
              getCategoryScore(
                a.id,
                validNeeds,
              ),
          )[0];

        if (
          recommendedCategory
        ) {
          setSelectedCategory(
            recommendedCategory
              .id,
          );
        }

        setIsDiagnosisReady(
          true,
        );
      } catch (error) {
        console.warn(
          "[AKANUKE.AI] 商品レコメンド用の最新診断結果を読み込めませんでした:",
          error,
        );

        if (
          !isCancelled
        ) {
          setSelectedCategory(
            categories[0]
              ?.id ??
              "skincare",
          );

          setIsDiagnosisReady(
            true,
          );
        }
      }
    }

    const timeoutId =
      window.setTimeout(
        () => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior:
              "auto",
          });

          void restoreLatestDiagnosis();
        },
        0,
      );

    return () => {
      isCancelled =
        true;

      window.clearTimeout(
        timeoutId,
      );
    };
  }, []);

  const availableCategories =
    useMemo(
      () =>
        [
          ...categories,
        ].sort(
          (
            a,
            b,
          ) =>
            getCategoryScore(
              b.id,
              diagnosisNeeds,
            ) -
            getCategoryScore(
              a.id,
              diagnosisNeeds,
            ),
        ),
      [
        diagnosisNeeds,
      ],
    );

  /*
   * AI診断結果によってカテゴリの並び順が変わった場合も、
   * インジケーターを再計算します。
   */
  useEffect(() => {
    const frameId =
      window.requestAnimationFrame(
        () => {
          updateCategoryScrollIndicator();
        },
      );

    return () => {
      window.cancelAnimationFrame(
        frameId,
      );
    };
  }, [
    availableCategories,
    updateCategoryScrollIndicator,
  ]);

  const selectedCategoryData =
    selectedCategory
      ? availableCategories.find(
          (
            category,
          ) =>
            category.id ===
            selectedCategory,
        )
      : undefined;

  const selectedProducts =
    useMemo(() => {
      if (
        !selectedCategory
      ) {
        return [];
      }

      return activeProducts
        .filter(
          (
            product,
          ) =>
            product.category ===
            selectedCategory,
        )
        .sort(
          (
            a,
            b,
          ) => {
            const scoreDifference =
              getProductScore(
                b,
                diagnosisNeeds,
              ) -
              getProductScore(
                a,
                diagnosisNeeds,
              );

            if (
              scoreDifference !==
              0
            ) {
              return scoreDifference;
            }

            return (
              a.rank -
              b.rank
            );
          },
        );
    }, [
      selectedCategory,
      diagnosisNeeds,
    ]);

  const displayedProducts =
    showAllProducts
      ? selectedProducts
      : selectedProducts.slice(
          0,
          3,
        );

  /*
   * 商品ページを実際に表示できる状態になった時点で
   * 1回だけGA4へ送信します。
   */
  useEffect(() => {
    if (
      !isDiagnosisReady ||
      !selectedCategory ||
      productsViewTrackedRef.current
    ) {
      return;
    }

    productsViewTrackedRef.current =
      true;

    const searchParams =
      new URLSearchParams(
        window.location.search,
      );

    trackEvent(
      "products_view",
      {
        initial_category:
          selectedCategory,

        has_diagnosis_needs:
          diagnosisNeeds.length >
          0,

        diagnosis_need_count:
          diagnosisNeeds.length,

        entry_source:
          searchParams.has(
            "category",
          )
            ? "plan"
            : "other",
      },
    );
  }, [
    isDiagnosisReady,
    selectedCategory,
    diagnosisNeeds,
  ]);

  if (
    !isDiagnosisReady
  ) {
    return (
      <AppShell background="white">
        <div className="min-h-screen bg-white">
          <AppHeader
            backHref="/result"
            backMode="history"
            backLabel="前のページへ戻る"
          />

          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-black/10 border-t-[#1677FF]" />
          </div>
        </div>
      </AppShell>
    );
  }

  if (
    !selectedCategoryData
  ) {
    return (
      <AppShell background="white">
        <div className="flex min-h-screen items-center justify-center px-5 text-center">
          <p className="text-[13px] font-bold text-black/70">
            現在掲載中の商品はありません。
          </p>
        </div>
      </AppShell>
    );
  }

  /*
   * インジケーターの青いバーが移動できる残り幅。
   */
  const indicatorTravel =
    100 -
    categoryIndicatorWidth;

  const indicatorLeft =
    indicatorTravel *
    categoryScrollProgress;

  return (
    <AppShell background="white">
      <div className="overflow-x-clip bg-white">
        <AppHeader
          backHref="/result"
          backMode="history"
          backLabel="前のページへ戻る"
        />

        <main className="pb-32">
          <section className="px-5 pb-4 pt-3 text-center sm:pb-6 sm:pt-7">
  <p className="text-[9px] font-black tracking-[0.18em] text-[#1677FF] sm:text-[10px]">
    PERSONAL PRODUCT GUIDE
  </p>

  <h1 className="mt-1.5 text-[23px] font-black leading-[1.2] tracking-[-0.045em] sm:mt-2 sm:text-[29px]">
    あなた専用のおすすめ商品
  </h1>

  <p className="mx-auto mt-1.5 max-w-[340px] text-[11px] leading-[1.7] text-black/70 sm:mt-2 sm:text-[12px] sm:leading-5">
    AI診断をもとに、あなたに合った商品をカテゴリ別に紹介します。
  </p>
</section>

          {/* CATEGORY SCROLL */}
<div className="mt-1 sm:mt-1">
            <div
              ref={
                categoryScrollRef
              }
              role="navigation"
              aria-label="商品カテゴリー"
              onScroll={
                updateCategoryScrollIndicator
              }
              className="overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex w-max gap-2 pr-4">
                {availableCategories.map(
                  (
                    category,
                  ) => {
                    const isActive =
                      selectedCategory ===
                      category.id;

                    return (
                      <button
                        key={
                          category.id
                        }
                        type="button"
                        onClick={() => {
                          setSelectedCategory(
                            category.id,
                          );

                          setShowAllProducts(
                            false,
                          );
                        }}
                        className={`min-h-[42px] shrink-0 rounded-full border px-4 text-[11px] font-black transition active:scale-[0.98] ${
                          isActive
                            ? "border-[#1677FF] bg-[#1677FF] text-white shadow-[0_8px_24px_rgba(22,119,255,0.16)]"
                            : "border-black/10 bg-white text-black/70 hover:border-[#1677FF]/30 hover:bg-[#EEF6FF] hover:text-[#1677FF]"
                        }`}
                      >
                        {
                          category.label
                        }
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {hasCategoryOverflow ? (
              <div
                aria-hidden="true"
                className="mx-4 mt-1.5 h-[3px] overflow-hidden rounded-full bg-black/[0.06]"
              >
                <div
                  className="h-full rounded-full bg-[#1677FF] transition-[left,width] duration-150 ease-out"
                  style={{
                    position:
                      "relative",

                    width: `${categoryIndicatorWidth}%`,

                    left: `${indicatorLeft}%`,
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-4 border-t border-black/5" />

          <div className="px-4 pt-4 sm:pt-4">
            <section>
              <div className="flex items-center justify-between gap-3">
  <div>
    <h2 className="text-[22px] font-black tracking-[-0.04em]">
  {
    selectedCategoryData
      .label
  }
</h2>
  </div>

  <span className="shrink-0 rounded-full bg-[#EEF6FF] px-2.5 py-1 text-[9px] font-black text-[#1677FF]">
    {
      selectedProducts.length
    }
    商品
  </span>
</div>

<p className="mt-2 text-[11px] leading-5 text-black/70">
  {
    selectedCategoryData
      .description
  }
</p>

<div className="mt-4 grid gap-4">
                {displayedProducts.map(
                  (
                    product,
                    index,
                  ) => (
                    <div
                      key={
                        product.id
                      }
                      className="grid gap-4"
                    >
                      <ProductCard
                        product={
                          product
                        }
                        diagnosisNeeds={
                          diagnosisNeeds
                        }
                        featured={
                          index ===
                          0
                        }
                      />

                      {index ===
                        0 &&
                      displayedProducts.length >
                        1 ? (
                        <AdSenseAd
                          className="my-2"
                          format="rectangle"
                        />
                      ) : null}
                    </div>
                  ),
                )}
              </div>

              {selectedProducts.length >
              3 ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowAllProducts(
                      (
                        current,
                      ) =>
                        !current,
                    )
                  }
                  className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-[12px] border border-[#1677FF]/15 bg-white px-5 text-[12px] font-black text-[#1677FF] transition hover:bg-[#EEF6FF] active:scale-[0.99]"
                >
                  {showAllProducts
                    ? "候補商品を閉じる"
                    : `他の候補商品を見る（${
                        selectedProducts.length -
                        3
                      }件）`}
                </button>
              ) : null}
            </section>

            <aside className="mt-9 rounded-[16px] bg-[#F7F9FC] px-4 py-4">
              <p className="text-[10px] leading-5 text-black/65">
                ※AKANUKE.AIのAI診断結果をもとに、
                ユーザーごとの改善ポイントに合わせて商品を選定・紹介しています。
                本コンテンツにはプロモーションが含まれます。
              </p>

              <div className="my-3 h-px w-full bg-black/5" />

              <p className="text-[10px] leading-5 text-black/60">
                ※商品情報・価格・在庫状況は変更される場合があります。
                最新情報は各販売サイトでご確認ください。
              </p>
            </aside>

            <div className="mt-6 space-y-3">
              <Link
                href="/dashboard"
                className="flex min-h-[56px] w-full items-center justify-center rounded-[14px] bg-[#1677FF] px-5 text-[13px] font-black text-white shadow-[0_10px_28px_rgba(22,119,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0F6FEF] active:scale-[0.99]"
              >
                マイページへ
              </Link>

              <Link
                href="/result"
                className="flex min-h-[50px] w-full items-center justify-center rounded-[12px] border border-black/10 bg-white px-5 text-[12px] font-black text-black/70 transition hover:bg-[#EEF6FF] active:scale-[0.99]"
              >
                診断結果へ戻る
              </Link>
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  );
}