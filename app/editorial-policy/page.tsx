import Link from "next/link";

export const metadata = {
  title: "編集方針 | AKANUKE.AI",
  description:
    "AKANUKE JOURNALの記事制作における基本方針、情報源の基準、生成AIの利用、診断データの扱い、記事の更新・訂正についてご案内します。",
  alternates: {
    canonical: "/editorial-policy",
  },
};

const sections = [
  {
    title: "1. 基本方針",
    content: (
      <>
        <p>
          AKANUKE JOURNALは、男性の美容・身だしなみ・垢抜けについて、読者が記事を読んだその日から実践できる情報を届けることを目的としています。
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>読者の疑問に対して、具体的な手順と判断基準を示します。</li>
          <li>事実・一般的な考え方・編集部の提案を区別して書きます。</li>
          <li>架空の体験談、口コミ、調査結果、監修者を作りません。</li>
          <li>効果を保証する表現や、根拠のない断定をしません。</li>
          <li>サービスへの誘導だけを目的とした記事は作りません。</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. 記事の制作体制",
    content: (
      <>
        <p>
          記事はAKANUKE JOURNAL編集部が企画・制作し、次の流れで公開しています。
        </p>

        <ol className="list-decimal space-y-2 pl-5">
          <li>読者の悩みや検索される疑問をもとに、テーマと記事の目的を決めます。</li>
          <li>既存記事と内容が重複しないことを確認します。</li>
          <li>公的機関や専門団体、メーカーの公式情報などで内容を確認します。</li>
          <li>編集部が事実関係、表現、リンク先、画像を確認してから公開します。</li>
        </ol>
      </>
    ),
  },
  {
    title: "3. 情報源の基準",
    content: (
      <>
        <p>
          記事の根拠には、次のような情報を優先して使用します。
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>行政機関や公的機関が公開している情報</li>
          <li>医学・皮膚科学などの専門団体が公開している情報</li>
          <li>商品の成分や使い方については、メーカーの公式情報や製品の表示</li>
          <li>AKANUKE.AIの診断データを匿名で集計した統計（下記5を参照）</li>
        </ul>

        <p>
          個人の感想やSNSの投稿だけを根拠に、効果や事実を説明することはありません。
        </p>
      </>
    ),
  },
  {
    title: "4. 肌・健康に関する情報の扱い",
    content: (
      <>
        <p>
          AKANUKE JOURNALの記事は、日常の身だしなみやセルフケアに関する一般的な情報です。医療行為の代わりになるものではありません。
        </p>

        <p>
          肌の炎症やかゆみ、ニキビの悪化など、症状が続く場合や気になる場合は、皮膚科などの医療機関にご相談ください。
        </p>
      </>
    ),
  },
  {
    title: "5. AKANUKE.AIの診断データの利用",
    content: (
      <>
        <p>
          記事では、AKANUKE.AIの診断結果を集計した統計（例：改善ポイントとして多く挙がった項目の割合）を紹介する場合があります。
        </p>

        <p>
          統計には、個人を特定できない形に加工・集計したデータのみを使用します。顔画像や個人の診断結果をそのまま記事に掲載することはありません。
        </p>
      </>
    ),
  },
  {
    title: "6. 生成AIの利用について",
    content: (
      <>
        <p>
          記事の構成案や下書き、図解などの制作に、生成AIを利用する場合があります。生成AIが作成した内容は、そのまま公開せず、編集部が事実関係と表現を確認したうえで公開します。
        </p>

        <p>
          生成AIで作成した人物画像を、実在する人物の写真や使用前後の比較写真のように見せることはしません。
        </p>
      </>
    ),
  },
  {
    title: "7. 広告・商品紹介について",
    content: (
      <>
        <p>
          本サイトには広告が掲載される場合があり、AKANUKE.AIで紹介する商品にはアフィリエイトリンクが含まれる場合があります。
        </p>

        <p>
          広告や報酬の有無によって、記事の内容や評価を変えることはありません。
        </p>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
        >
          運営者情報
          <span aria-hidden="true">→</span>
        </Link>
      </>
    ),
  },
  {
    title: "8. 記事の更新と訂正",
    content: (
      <>
        <p>
          情報が古くなった場合や、より分かりやすい説明が必要になった場合は、記事を見直して更新します。内容を更新した記事には、更新日を表示します。
        </p>

        <p>
          記事の内容に誤りを見つけた場合は、お問い合わせページからご連絡ください。編集部で確認し、必要に応じて訂正します。
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
        >
          お問い合わせページ
          <span aria-hidden="true">→</span>
        </Link>
      </>
    ),
  },
];

export default function EditorialPolicyPage() {
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
            EDITORIAL POLICY
          </p>

          <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] sm:text-[36px]">
            編集方針
          </h1>

          <p className="mt-5 text-[14px] leading-7 text-black/55">
            AKANUKE JOURNALの記事を、どのような考え方と基準で制作しているかをご案内します。
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
            制定日：2026年11月9日
          </p>

          <p className="mt-1 text-[13px] leading-7 text-black/50">
            AKANUKE JOURNAL編集部
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1677FF] transition-opacity hover:opacity-70"
          >
            <span aria-hidden="true">←</span>
            AKANUKE JOURNALへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
