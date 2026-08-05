import Link from "next/link";
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

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-[1180px] items-center justify-between px-5">
          <Link href="/" className="leading-none">
            <span className="block text-[18px] font-black tracking-[0.14em]">
              AKANUKE.AI
            </span>

            <span className="mt-1 block text-[8px] font-bold tracking-[0.28em] text-[#1677FF]">
              MEN&apos;S AI BEAUTY
            </span>
          </Link>

          <Link
            href="/"
            className="flex min-h-[42px] items-center justify-center rounded-[10px] bg-[#FFD400] px-4 text-[11px] font-black text-[#111111] shadow-[0_8px_20px_rgba(255,212,0,0.2)] transition hover:-translate-y-0.5"
          >
            無料で診断
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-gradient-to-b from-white to-[#EEF6FF]">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-14 sm:pb-20 sm:pt-20">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#1677FF]">
            AKANUKE JOURNAL
          </p>

          <h1 className="mt-4 text-[36px] font-semibold leading-[1.2] tracking-[-0.05em] sm:text-[52px]">
            メンズ美容を、
            <br />
            分かりやすく。
          </h1>

          <p className="mt-5 max-w-[560px] text-[13px] leading-7 text-black/55 sm:text-[15px]">
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
  href={`/articles/${article.slug}`}
  className="group block overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(15,23,42,0.09)]"
>
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF6FF] via-white to-[#FFF9D9]">
                <div className="absolute left-[14%] top-[18%] h-24 w-24 rounded-full bg-[#1677FF]/10 blur-2xl" />
                <div className="absolute bottom-[10%] right-[12%] h-28 w-28 rounded-full bg-[#FFD400]/20 blur-2xl" />

                <div className="relative px-6 text-center">
                  <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[9px] font-black tracking-[0.1em] text-[#1677FF] shadow-sm">
                    {article.category}
                  </span>

                  <p className="mt-4 text-[13px] font-black tracking-[0.14em] text-[#111111]">
                    AKANUKE JOURNAL
                  </p>
                </div>
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
      </section>

      <section className="border-t border-black/10 px-5 py-12">
        <div className="mx-auto max-w-[760px] rounded-[26px] bg-[#111111] px-6 py-9 text-center text-white sm:px-10">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#FFD400]">
            AI BEAUTY DIAGNOSIS
          </p>

          <h2 className="mt-3 text-[25px] font-semibold tracking-[-0.04em]">
            自分に合う改善方法を知りたい方へ
          </h2>

          <p className="mx-auto mt-4 max-w-[500px] text-[12px] leading-6 text-white/60">
            顔写真をもとに、髪型・眉毛・肌・全体の印象をAIが分析します。
          </p>

          <Link
            href="/"
            className="mx-auto mt-6 flex min-h-[52px] w-full max-w-[320px] items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111]"
          >
            無料で診断をはじめる
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/10 py-8">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-[14px] font-black tracking-[0.14em]">
              AKANUKE.AI
            </p>

            <p className="mt-1 text-[8px] font-bold tracking-[0.24em] text-[#1677FF]">
              MEN&apos;S AI BEAUTY
            </p>
          </div>

          <p className="text-[10px] text-black/35">
            © AKANUKE.AI All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}