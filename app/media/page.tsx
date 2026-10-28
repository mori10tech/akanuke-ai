import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Logo from "../components/Logo";
import AdSenseAd from "../components/AdSenseAd";
import { getAllArticles } from "../../data/articles";
import JournalFooter from "./components/JournalFooter";
import JournalPagination from "./components/JournalPagination";
import JournalServiceCta from "./components/JournalServiceCta";

function ArrowRightIcon() {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

const ARTICLES_PER_PAGE = 10;

const PAGE_TITLE = "AKANUKE JOURNAL｜メンズ美容・垢抜け情報";

type ArticlesPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

// page 未指定は1ページ目。数字以外・0以下・範囲外は notFound() にする
function resolveListing(
  categoryParam: string | string[] | undefined,
  pageParam: string | string[] | undefined,
) {
  const allArticles = getAllArticles();
  const categories = [...new Set(allArticles.map((article) => article.category))];
  const selectedCategory =
    typeof categoryParam === "string" && categories.includes(categoryParam)
      ? categoryParam
      : null;
  const articles = selectedCategory
    ? allArticles.filter((article) => article.category === selectedCategory)
    : allArticles;
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));

  let currentPage = 1;

  if (pageParam !== undefined) {
    if (typeof pageParam !== "string" || !/^[1-9][0-9]*$/.test(pageParam)) {
      notFound();
    }

    currentPage = Number(pageParam);
  }

  if (currentPage > totalPages) {
    notFound();
  }

  return { categories, selectedCategory, articles, totalPages, currentPage };
}

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const { category, page } = await searchParams;
  const { selectedCategory, currentPage } = resolveListing(category, page);
  const isPagedTopListing = !selectedCategory && currentPage > 1;
  const title = isPagedTopListing
    ? `${PAGE_TITLE}（${currentPage}ページ目）`
    : PAGE_TITLE;
  const url = isPagedTopListing ? `/media?page=${currentPage}` : "/media";

  return {
    title,

    description:
      "男性が垢抜けるための髪型・眉毛・スキンケア・メンズ美容など、第一印象を整えるために役立つ情報を発信するAKANUKE.AIのメディアです。",

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description:
        "髪型・眉毛・スキンケアなど、男性が第一印象を整えるためのメンズ美容・垢抜け情報を発信します。",
      url,
      type: "website",
    },
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { category, page } = await searchParams;
  const { categories, selectedCategory, articles, totalPages, currentPage } =
    resolveListing(category, page);
  const pageArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  return (
    <>
      <main className="min-h-screen bg-white text-[#111111]">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] w-full max-w-[1180px] items-center justify-between px-5">
            <Logo href="/" />
            <JournalServiceCta />
          </div>
        </header>

        <section className="border-b border-black/10 bg-gradient-to-b from-white to-[#EEF6FF]">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:py-12">
            <h1 className="whitespace-nowrap text-[32px] font-black leading-[1.1] tracking-[0.04em] text-[#111111] sm:text-[56px]">
              AKANUKE JOURNAL
            </h1>

            <p className="mt-5 text-[16px] font-bold tracking-[-0.025em] text-[#1677FF] sm:text-[20px]">
              メンズの垢抜け・美容を、分かりやすく。
            </p>

            <p className="mt-4 text-[12px] leading-7 text-black/75 sm:whitespace-nowrap sm:text-[15px]">
              髪型・眉毛・スキンケア・ファッションなど、男性が第一印象を整えるために役立つ情報を発信します。
            </p>
          </div>
        </section>

        <nav aria-label="記事カテゴリー" className="border-b border-black/10 bg-white">
          <div className="mx-auto flex w-full max-w-[1180px] gap-2 overflow-x-auto px-5 py-4">
            <Link href="/media" scroll={true} aria-current={!selectedCategory ? "page" : undefined} className={`shrink-0 rounded-full px-4 py-2.5 text-[12px] font-bold ${!selectedCategory ? "bg-[#1677FF] text-white" : "border border-black/10 bg-[#F8FAFC] text-black/75"}`}>
              すべての記事
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/media?category=${encodeURIComponent(category)}`}
                scroll={true}
                aria-current={selectedCategory === category ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-2.5 text-[12px] font-bold transition ${selectedCategory === category ? "bg-[#1677FF] text-white" : "border border-black/10 bg-[#F8FAFC] text-black/75 hover:border-[#1677FF]/30 hover:text-[#1677FF]"}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>

        <section id="latest-articles" className="mx-auto w-full max-w-[1180px] scroll-mt-24 px-5 pb-12 pt-6 sm:pb-16 sm:pt-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                LATEST ARTICLES
              </p>

              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                {selectedCategory ? `${selectedCategory}の記事` : "最新の記事"}
              </h2>
            </div>

            <span className="text-[11px] font-bold text-black/50">
              全{articles.length}件
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {pageArticles.map((article, index) => (
              <Fragment key={article.slug}>
                <Link
                  href={`/media/${article.slug}`}
                  className="group block overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(15,23,42,0.09)]"
                >
                  <div className="relative aspect-[1200/630] overflow-hidden bg-[#EEF6FF]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 560px"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold text-black/50">
                      <time dateTime={article.publishedAt}>
                        {formatDate(article.publishedAt)}
                      </time>

                      <span aria-hidden="true">•</span>

                      <span>{article.readingTime}</span>
                    </div>

                    <h3 className="mt-3 text-[20px] font-semibold leading-[1.5] tracking-[-0.035em] sm:text-[22px]">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-[12px] leading-6 text-black/65">
                      {article.description}
                    </p>

                    <div className="mt-5 flex min-h-[46px] items-center justify-between rounded-[12px] bg-[#F7F9FC] px-4 text-[12px] font-black transition group-hover:bg-[#EEF6FF] group-hover:text-[#1677FF]">
                      <span>記事を読む</span>
                      <ArrowRightIcon />
                    </div>
                  </div>
                </Link>

                {index === 3 && (
                  <div className="md:col-span-2">
                    <AdSenseAd className="my-2 sm:my-3" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {totalPages > 1 && (
            <JournalPagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={selectedCategory}
            />
          )}

        <AdSenseAd className="mt-10 sm:mt-12" />
        </section>

        <section className="border-t border-black/10 px-5 py-12">
          <div className="mx-auto max-w-[760px] overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 text-center shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-10">
            <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
              <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                AI BEAUTY DIAGNOSIS
              </span>
            </div>

            <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.04em] text-[#111111]">
              自分に合う改善方法を知りたい方へ
            </h2>

            <p className="mx-auto mt-4 max-w-[500px] text-[13px] font-medium leading-6 text-black/70">
              顔写真をもとに、髪型・眉毛・肌・全体の印象をAIが分析します。
            </p>

            <div className="mt-6">
              <JournalServiceCta variant="large" />
            </div>
          </div>
        </section>

        <JournalFooter />
      </main>
    </>
  );
}