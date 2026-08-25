import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "../components/Logo";
import AdSenseAd from "../components/AdSenseAd";
import { getAllArticles } from "../../data/articles";


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

export const metadata: Metadata = {
  title: "AKANUKE JOURNAL｜メンズ美容・垢抜け情報",

  description:
    "男性が垢抜けるための髪型・眉毛・スキンケア・メンズ美容など、第一印象を整えるために役立つ情報を発信するAKANUKE.AIのメディアです。",

  alternates: {
    canonical: "/media",
  },

  openGraph: {
    title: "AKANUKE JOURNAL｜メンズ美容・垢抜け情報",
    description:
      "髪型・眉毛・スキンケアなど、男性が第一印象を整えるためのメンズ美容・垢抜け情報を発信します。",
    url: "/media",
    type: "website",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
  <>
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-[1180px] items-center justify-between px-5">
          <Logo href="/" />

          <Link
  href="/"
  className="group flex min-h-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[11px] font-black text-[#111111] shadow-[0_8px_20px_rgba(255,212,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(255,212,0,0.28)] active:scale-[0.98] sm:min-h-[48px] sm:px-6 sm:text-[12px]"
>
  <span className="whitespace-nowrap">
    AKANUKE.AIを見る
  </span>

  <span
    className="ml-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
    aria-hidden="true"
  >
    ›
  </span>
</Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-gradient-to-b from-white to-[#EEF6FF]">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-14 sm:pb-20 sm:pt-20">
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

      <section className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              LATEST ARTICLES
            </p>

            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] sm:text-[32px]">
              最新の記事
            </h2>
          </div>

          <span className="text-[11px] font-bold text-black/35">
            全{articles.length}件
          </span>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
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
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold text-black/35">
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>

                  <span aria-hidden="true">•</span>

                  <span>{article.readingTime}</span>
                </div>

                <h3 className="mt-3 text-[20px] font-semibold leading-[1.5] tracking-[-0.035em] sm:text-[22px]">
                  {article.title}
                </h3>

                <p className="mt-3 text-[12px] leading-6 text-black/55">
                  {article.description}
                </p>

                <div className="mt-5 flex min-h-[46px] items-center justify-between rounded-[12px] bg-[#F7F9FC] px-4 text-[12px] font-black transition group-hover:bg-[#EEF6FF] group-hover:text-[#1677FF]">
                  <span>記事を読む</span>
                  <ArrowRightIcon />
                </div>
              </div>
            </Link>
          ))}
        </div>

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

    <p className="mx-auto mt-4 max-w-[500px] text-[12px] leading-6 text-black/55">
      顔写真をもとに、髪型・眉毛・肌・全体の印象をAIが分析します。
    </p>

    <Link
      href="/"
      className="mx-auto mt-6 flex min-h-[52px] w-full max-w-[320px] items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_24px_rgba(255,212,0,0.22)] transition hover:-translate-y-0.5"
    >
      AKANUKE.AIを見る
      <span className="ml-2" aria-hidden="true">
        →
      </span>
    </Link>
  </div>
</section>

      <footer className="border-t border-black/10 py-8">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-left">
          <Logo href="/media" />

          <p className="text-[10px] text-black/35">
            © AKANUKE.AI All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  </>
  );
}