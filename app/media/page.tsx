import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import Logo from "../components/Logo";
import { getAllArticles, getArticleBySlug } from "../../data/articles";
import JournalFooter from "./components/JournalFooter";
import JournalServiceCta from "./components/JournalServiceCta";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

// トップに表示する注目記事。存在しない・非公開の場合は最新の公開記事を表示する
const FEATURED_SLUG = "mens-toner-emulsion";

const SUB_ARTICLE_COUNT = 3;

const PAGE_TITLE = "AKANUKE JOURNAL｜メンズ美容・垢抜け情報";

type JournalTopPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

// 旧URL（/media?page=N・/media?category=X）は一覧ページへ恒久リダイレクト（308）する
async function redirectLegacyListing(
  searchParams: JournalTopPageProps["searchParams"],
) {
  const { category, page } = await searchParams;

  if (category === undefined && page === undefined) {
    return;
  }

  const params = new URLSearchParams();

  if (typeof category === "string") {
    params.set("category", category);
  }

  if (typeof page === "string" && page !== "1") {
    params.set("page", page);
  }

  const query = params.toString();

  permanentRedirect(query ? `/media/all?${query}` : "/media/all");
}

export async function generateMetadata({
  searchParams,
}: JournalTopPageProps): Promise<Metadata> {
  await redirectLegacyListing(searchParams);

  return {
    title: PAGE_TITLE,

    description:
      "男性が垢抜けるための髪型・眉毛・スキンケア・メンズ美容など、第一印象を整えるために役立つ情報を発信するAKANUKE.AIのメディアです。",

    alternates: {
      canonical: "/media",
    },

    openGraph: {
      title: PAGE_TITLE,
      description:
        "髪型・眉毛・スキンケアなど、男性が第一印象を整えるためのメンズ美容・垢抜け情報を発信します。",
      url: "/media",
      type: "website",
    },
  };
}

export default async function JournalTopPage({
  searchParams,
}: JournalTopPageProps) {
  await redirectLegacyListing(searchParams);

  const allArticles = getAllArticles();
  const featuredArticle = getArticleBySlug(FEATURED_SLUG) ?? allArticles[0];
  const subArticles = allArticles
    .filter((article) => article.slug !== featuredArticle?.slug)
    .slice(0, SUB_ARTICLE_COUNT);

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
          <div className="mx-auto w-full max-w-[1180px] px-5 py-9 md:py-14">
            <h1 className="whitespace-nowrap text-[28px] font-black leading-[1.1] tracking-[0.04em] text-[#111111] md:text-[56px] md:tracking-[0.02em]">
              AKANUKE JOURNAL
            </h1>

            <div aria-hidden="true" className="mt-7 hidden h-px bg-[#111111] md:block" />

            <p className="mt-4 text-[12px] font-bold text-[#111111] md:mt-6 md:text-[18px]">
              メンズの垢抜け・美容を、分かりやすく。
            </p>

            <p className="mt-2 text-[12px] leading-[1.8] text-[#4B5058] md:mt-3 md:whitespace-nowrap md:text-[13px]">
              髪型・眉毛・スキンケアなど、
              <br className="md:hidden" />
              男性が第一印象を整えるために役立つ情報を発信します。
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1180px] px-5 pb-12 pt-8 md:pb-16 md:pt-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {featuredArticle && (
              <Link
                href={`/media/${featuredArticle.slug}`}
                className="group block lg:col-span-7"
              >
                <div className="relative aspect-[1200/630] overflow-hidden rounded-[20px] bg-[#EEF6FF] shadow-[0_12px_36px_rgba(15,23,42,0.07)]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 650px"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold text-black/50">
                  <span className="rounded-full bg-[#1677FF] px-2.5 py-1 text-[9px] font-black tracking-[0.12em] text-white">
                    FEATURED
                  </span>

                  <span className="text-[#1677FF]">{featuredArticle.category}</span>

                  <span>{featuredArticle.readingTime}</span>
                </div>

                <h2 className="mt-3 text-[22px] font-semibold leading-[1.5] tracking-[-0.035em] transition group-hover:text-[#1677FF] md:text-[28px]">
                  {featuredArticle.title}
                </h2>

                <p className="mt-3 text-[12px] leading-6 text-black/65 md:text-[13px]">
                  {featuredArticle.description}
                </p>
              </Link>
            )}

            <div className="lg:col-span-5">
              <ul className="divide-y divide-black/10 border-y border-black/10">
                {subArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/media/${article.slug}`}
                      className="group flex gap-4 py-4"
                    >
                      <div className="relative aspect-[1200/630] w-[128px] shrink-0 overflow-hidden rounded-[12px] bg-[#EEF6FF] md:w-[168px]">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 767px) 128px, 168px"
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold text-black/50">
                          <span className="text-[#1677FF]">{article.category}</span>

                          <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                          </time>
                        </div>

                        <h3 className="mt-1.5 text-[13px] font-semibold leading-[1.6] tracking-[-0.02em] transition group-hover:text-[#1677FF] md:text-[14px]">
                          {article.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/media/all"
                className="mt-6 flex min-h-[48px] items-center justify-center rounded-[12px] bg-[#F7F9FC] px-5 text-[12px] font-black text-[#111111] transition hover:bg-[#EEF6FF] hover:text-[#1677FF]"
              >
                すべての記事を見る →
              </Link>
            </div>
          </div>
        </section>

        <JournalFooter />
      </main>
    </>
  );
}
