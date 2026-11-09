import Link from "next/link";

export const metadata = {
  title: "運営者情報 | AKANUKE.AI",
  description:
    "男性向け美容AIサービス「AKANUKE.AI」と、オウンドメディア「AKANUKE JOURNAL」の運営者情報をご案内します。",
  alternates: {
    canonical: "/about",
  },
};

const operatorRows = [
  {
    label: "サービス名",
    value: "AKANUKE.AI（アカヌケエーアイ）",
  },
  {
    label: "URL",
    value: "https://akanuke.ai",
  },
  {
    label: "サービス開始",
    value: "2026年9月14日",
  },
  {
    label: "運営会社",
    value: (
      <a
        href="https://www.raygence.co.jp/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
      >
        株式会社レイジェンス
        <span aria-hidden="true">→</span>
      </a>
    ),
  },
  {
    label: "メディア名",
    value: "AKANUKE JOURNAL（アカヌケジャーナル）",
  },
  {
    label: "記事の編集",
    value: "AKANUKE JOURNAL編集部",
  },
  {
    label: "お問い合わせ",
    value: (
      <Link
        href="/contact"
        className="inline-flex items-center gap-1 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
      >
        お問い合わせページ
        <span aria-hidden="true">→</span>
      </Link>
    ),
  },
];

const sections = [
  {
    title: "AKANUKE.AIについて",
    content: (
      <>
        <p>
          AKANUKE.AIは、男性の美容・身だしなみ・垢抜けを支援するAIサービスです。顔写真をもとに、AIが髪型・眉毛・肌・全体の印象を分析し、改善ポイントと、一人ひとりに合わせた垢抜けプランを提案します。
        </p>

        <p>
          「何から始めればいいか分からない」という男性が、自分に必要な改善点を知り、具体的な行動に移せるようにすることを目指しています。
        </p>
      </>
    ),
  },
  {
    title: "AKANUKE JOURNALについて",
    content: (
      <>
        <p>
          AKANUKE JOURNALは、AKANUKE.AIが運営するメンズ美容・身だしなみのメディアです。髪型、眉毛、スキンケア、ヒゲ、清潔感など、男性の垢抜けに関するテーマを、初めての方にも実践しやすい形で解説しています。
        </p>

        <p>
          記事の制作方法や情報源の基準は、編集方針でご案内しています。
        </p>

        <Link
          href="/editorial-policy"
          className="inline-flex items-center gap-2 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
        >
          編集方針
          <span aria-hidden="true">→</span>
        </Link>
      </>
    ),
  },
  {
    title: "運営者",
    content: (
      <dl className="overflow-hidden rounded-[14px] border border-black/10">
        {operatorRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[104px_1fr] gap-3 border-b border-black/10 px-4 py-3 last:border-b-0 sm:grid-cols-[140px_1fr] sm:px-5"
          >
            <dt className="text-[12px] font-bold text-black/45">
              {row.label}
            </dt>

            <dd className="break-all text-[13px] leading-6 text-[#111111]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    title: "広告・商品紹介について",
    content: (
      <>
        <p>
          本サイトでは、Google AdSenseによる広告を掲載する場合があります。広告配信におけるCookie等の利用については、個人情報の取扱いをご確認ください。
        </p>

        <p>
          AKANUKE.AIで紹介する商品には、アフィリエイトリンクが含まれる場合があります。Amazonのアソシエイトとして、AKANUKE.AIは適格販売により収入を得ています。
        </p>

        <p>
          広告や報酬の有無によって、記事の内容や診断結果を変えることはありません。
        </p>

        <Link
          href="/privacy"
          className="inline-flex items-center gap-2 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
        >
          個人情報の取扱い
          <span aria-hidden="true">→</span>
        </Link>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="border-b border-black/10">
        <div className="mx-auto flex h-[68px] w-full max-w-[760px] items-center px-5 sm:px-8">
          <Link
            href="/"
            className="text-[18px] font-black tracking-[-0.03em] text-[#111111] transition-opacity hover:opacity-70"
          >
            AKANUKE.AI
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <div className="border-b border-black/10 pb-10">
          <p className="text-[11px] font-black tracking-[0.18em] text-[#1677FF]">
            ABOUT
          </p>

          <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] sm:text-[36px]">
            運営者情報
          </h1>

          <p className="mt-5 text-[14px] leading-7 text-black/55">
            AKANUKE.AIと、オウンドメディア「AKANUKE JOURNAL」の運営者についてご案内します。
          </p>
        </div>

        <div className="divide-y divide-black/10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="py-9 sm:py-10"
            >
              <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
                {section.title}
              </h2>

              <div className="mt-5 space-y-3 text-[14px] leading-7 text-black/65">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-4 border-t border-black/10 pt-8">
          <p className="text-[13px] leading-7 text-black/50">
            最終更新日：2026年11月9日
          </p>

          <p className="mt-1 text-[13px] leading-7 text-black/50">
            株式会社レイジェンス
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1677FF] transition-opacity hover:opacity-70"
          >
            <span aria-hidden="true">←</span>
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
