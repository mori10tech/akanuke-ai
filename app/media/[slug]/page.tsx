import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllArticles,
  getArticleBySlug,
} from "../../../data/articles";

import Logo from "../../components/Logo";

import JournalFooter from "../components/JournalFooter";
import JournalServiceCta from "../components/JournalServiceCta";
import { articleRegistry } from "./articleRegistry";
import ArticleStructuredData from "./ArticleStructuredData";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function ArrowLeftIcon() {
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
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ArticleHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto grid h-[64px] w-full max-w-[980px] grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:flex sm:h-[68px] sm:justify-between sm:gap-4 sm:px-5">
        <Link
          href="/media"
          aria-label="記事一覧へ戻る"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-black/50 transition hover:text-[#1677FF] sm:h-auto sm:w-auto sm:justify-start sm:gap-2 sm:text-[11px] sm:font-black"
        >
          <ArrowLeftIcon />

          <span className="hidden sm:inline">
            記事一覧
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-start sm:justify-center">
          <Logo href="/" />
        </div>

        <div className="shrink-0">
          <JournalServiceCta />
        </div>
      </div>
    </header>
  );
}

function ArticleHero({
  article,
}: {
  article: NonNullable<ReturnType<typeof getArticleBySlug>>;
}) {
  return (
    <header className="border-b border-black/10 bg-gradient-to-b from-white to-[#EEF6FF]">
      <div className="mx-auto max-w-[860px] px-5 pb-10 pt-8 sm:pb-16 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-black text-[#1677FF] shadow-sm">
            {article.category}
          </span>

          <span className="text-[10px] font-bold text-black/65">
            {article.readingTime}
          </span>
        </div>

        <h1 className="mt-5 text-[28px] font-semibold leading-[1.4] tracking-[-0.045em] sm:text-[48px] sm:leading-[1.35] sm:tracking-[-0.05em]">
          {article.title}
        </h1>

        <p className="mt-4 max-w-[720px] text-[13px] font-medium leading-7 text-black/70 sm:mt-5 sm:text-[15px]">
          {article.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-black/65 sm:mt-6">
          <time dateTime={article.publishedAt}>
            公開日：{formatDate(article.publishedAt)}
          </time>

          {article.updatedAt && (
            <time dateTime={article.updatedAt}>
              更新日：{formatDate(article.updatedAt)}
            </time>
          )}
        </div>

        <div className="relative mt-7 aspect-[1200/630] overflow-hidden rounded-[20px] border border-black/5 bg-[#EEF6FF] shadow-[0_12px_36px_rgba(15,23,42,0.07)] sm:mt-9 sm:rounded-[28px] sm:shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 860px"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "記事が見つかりません｜AKANUKE.AI",
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,

    alternates: {
      canonical: `/media/${article.slug}`,
    },

    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: article.image
        ? [
            {
              url: article.image,
              alt: article.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const ArticleContent = articleRegistry[article.slug];

  if (!ArticleContent) {
    notFound();
  }

  return (
    <>
      <ArticleStructuredData article={article} />

      <main className="min-h-screen bg-white text-[#111111]">
        <ArticleHeader />

        <article>
          <ArticleHero article={article} />

          <ArticleContent article={article} />
        </article>

        <JournalFooter />
      </main>
    </>
  );
}