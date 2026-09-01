import Link from "next/link";

import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";

type MensAkanukeOrderArticleProps = {
  article: Article;
};

const tableOfContents = [
  {
    id: "importance",
    label: "メンズの垢抜けは順番が大切",
  },
  {
    id: "steps",
    label: "メンズが垢抜ける7ステップ",
  },
  {
    id: "budget",
    label: "お金をかけずに始めるなら？",
  },
  {
    id: "mistakes",
    label: "順番を間違えると垢抜けにくい理由",
  },
  {
    id: "priority",
    label: "自分の優先順位が分からない場合",
  },
  {
    id: "faq",
    label: "よくある質問",
  },
  {
    id: "summary",
    label: "まとめ",
  },
];

const steps = [
  {
    number: "01",
    title: "髪型を整える",
    description:
      "最初に見直したいのは髪型です。髪は顔周りの大きな面積を占めるため、長さ・前髪・サイド・襟足を整えるだけでも第一印象が変わりやすいポイントです。流行の髪型をそのまま真似するのではなく、顔型や髪質に合ったスタイルを選びましょう。",
    point:
      "美容室では「清潔感を出したい」「自分に似合う髪型にしたい」と伝えるのがおすすめです。",
    href: "/media/mens-akanuke-hairstyle",
    linkLabel: "メンズが垢抜ける髪型を詳しく見る",
  },
  {
    number: "02",
    title: "眉毛を整える",
    description:
      "髪型の次は眉毛です。眉毛は目元の印象を大きく左右します。眉間や眉下の余分な毛、伸びすぎた毛を整えるだけでも顔全体がすっきり見えやすくなります。",
    point:
      "初めて整える場合は、細くしすぎず自然な形を残すことを意識しましょう。",
  },
  {
    number: "03",
    title: "肌を整える",
    description:
      "髪型と眉毛が整ったら、次は肌です。乾燥・過度なテカリ・肌荒れなどは清潔感に影響しやすいため、基本的なスキンケアを習慣にしましょう。",
    point:
      "最初は洗顔・保湿・日焼け止めの3つで十分です。高価な美容液をそろえる必要はありません。",
  },
  {
    number: "04",
    title: "ヒゲ・ムダ毛を整える",
    description:
      "ヒゲの剃り残しや鼻毛などは、小さな部分でも清潔感に影響します。ヒゲを残す場合も、長さや輪郭を整えて意図的に残している状態にしましょう。",
    point:
      "肌が荒れやすい場合は、無理な深剃りを避け、電気シェーバーやシェービング剤を活用しましょう。",
  },
  {
    number: "05",
    title: "服装のサイズ感を整える",
    description:
      "顔周りを整えたあとに服装を見直します。高価なブランド服よりも、肩幅・袖丈・着丈・パンツ丈など、自分の体型に合ったサイズを選ぶことが大切です。",
    point:
      "迷ったら白・黒・ネイビー・グレーなどのシンプルな色から始めると合わせやすくなります。",
  },
  {
    number: "06",
    title: "姿勢・体型を整える",
    description:
      "髪型や服装が整っていても、猫背やうつむいた姿勢では全体の印象が暗く見えることがあります。背筋を伸ばし、自然に顔を上げるだけでも見え方は変わります。",
    point:
      "いきなり本格的な筋トレを始める必要はありません。歩く・軽く運動するなど、続けやすい習慣から始めましょう。",
  },
  {
    number: "07",
    title: "自分に似合う方向性を知る",
    description:
      "最後に重要なのが、自分に合う方向性を把握することです。同じ髪型や服装でも、人によって似合うものは異なります。他人の正解をそのまま真似するのではなく、自分の顔立ちや雰囲気に合わせて調整しましょう。",
    point:
      "写真で自分を客観的に確認したり、美容師など第三者の意見を取り入れたりすると優先順位を決めやすくなります。",
  },
];

const lowCostActions = [
  {
    title: "髪を整える",
    description:
      "寝ぐせを直し、前髪・サイド・襟足を清潔に保つ。",
  },
  {
    title: "眉間の毛を整える",
    description:
      "眉毛の形を大きく変えず、余分な毛だけを処理する。",
  },
  {
    title: "服と靴を清潔にする",
    description:
      "シワや汚れを確認し、今持っているものをきれいに使う。",
  },
  {
    title: "姿勢を意識する",
    description:
      "猫背を避け、自然に顔を上げることを習慣にする。",
  },
];

const mistakes = [
  {
    title: "いきなり服を大量に買う",
    description:
      "髪型や清潔感が整っていない状態で服だけを変えても、思ったほど印象が変わらないことがあります。",
  },
  {
    title: "美容アイテムを一気に増やす",
    description:
      "スキンケア用品を大量に購入しても、使い方や継続方法が分からなければ習慣になりません。",
  },
  {
    title: "流行だけを真似する",
    description:
      "人気の髪型やファッションでも、自分の顔型・髪質・体型に合わなければ違和感につながる場合があります。",
  },
  {
    title: "全部同時に変えようとする",
    description:
      "一度に多くのことを始めると、費用も手間も増えて継続しにくくなります。",
  },
];

const faqs = [
  {
    question: "メンズが垢抜けるには何から始めるのが一番ですか？",
    answer:
      "迷った場合は髪型から始めるのがおすすめです。顔周りの大きな面積を占めるため、比較的変化を感じやすいポイントです。その後、眉毛・肌・ヒゲなどへ進めると取り組みやすくなります。",
  },
  {
    question: "服装から変えるのはダメですか？",
    answer:
      "服装から始めても問題ありません。ただし、髪型・眉毛・肌など顔周りの印象は相手から見られやすいため、垢抜けを目的とするなら先に整える方が効率的な場合があります。",
  },
  {
    question: "垢抜けるまでどのくらいかかりますか？",
    answer:
      "髪型や眉毛は比較的すぐに変化を感じられます。一方、肌・体型・生活習慣などは数週間から数か月かけて整えていくものです。短期間ですべてを変える必要はありません。",
  },
  {
    question: "お金をかけないと垢抜けられませんか？",
    answer:
      "必ずしも高額な費用は必要ありません。髪を整える、眉間の余分な毛を処理する、姿勢を改善する、服や靴を清潔にするなど、費用をほとんどかけずにできることもあります。",
  },
  {
    question: "自分が何から変えるべきか分かりません",
    answer:
      "人によって優先順位は異なります。髪型が最優先の人もいれば、眉毛や肌を整える方が変化を感じやすい人もいます。まず現在の自分を写真などで客観的に確認することがおすすめです。",
  },
];

export default function MensAkanukeOrderArticle({
  article,
}: MensAkanukeOrderArticleProps) {
  return (
    <div className="mx-auto grid max-w-[980px] gap-10 px-5 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-16">
      <aside className="lg:sticky lg:top-[92px] lg:self-start">
        <nav
          aria-label="目次"
          className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5"
        >
          <p className="text-[11px] font-black tracking-[0.12em] text-[#1677FF]">
            CONTENTS
          </p>

          <p className="mt-1 text-[15px] font-black">
            目次
          </p>

          <ol className="mt-4 space-y-3">
            {tableOfContents.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex gap-3 text-[11px] font-medium leading-5 text-black/70 transition hover:text-[#1677FF]"
                >
                  <span className="shrink-0 font-black text-[#1677FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div className="min-w-0">
        <section className="text-[14px] leading-8 text-black/80">
          <p>
            「垢抜けたいけれど、髪型・眉毛・肌・服装のどこから変えればいいか分からない」と悩んでいませんか？
          </p>

          <p className="mt-5">
            メンズの垢抜けでは、最初からすべてを変える必要はありません。第一印象への影響が大きく、比較的変化を感じやすい部分から順番に整える方が効率的です。
          </p>

          <p className="mt-5">
            この記事では、垢抜けたい男性が最初にやるべきことを7つのステップに分けて解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="importance"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            PRIORITY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズの垢抜けは順番が大切
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/80">
            <p>
              垢抜けようと思ったとき、最初にファッションや高価な美容アイテムへお金をかける必要はありません。
            </p>

            <p className="mt-5">
              髪型・眉毛・肌などの顔周りは、人と会ったときに目に入りやすい部分です。まず顔周りを整え、その後に服装や姿勢へ進むと、変化を実感しながら取り組みやすくなります。
            </p>

            <p className="mt-5">
              また、一つずつ改善することで「何を変えたことで印象が良くなったのか」も分かりやすくなります。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              おすすめの基本順序
            </p>

            <p className="mt-3 text-[12px] font-bold leading-6 text-black/65">
              髪型 → 眉毛 → 肌 → ヒゲ・ムダ毛 → 服装 → 姿勢・体型 → 自分に似合う方向性
            </p>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            7 STEPS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズが垢抜けるおすすめの順番
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            すべてを一度に変える必要はありません。できていない項目から順番に進めていきましょう。
          </p>

          <div className="mt-8 space-y-5">
            {steps.map((step) => (
              <section
                key={step.number}
                className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                    {step.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {step.description}
                    </p>

                    <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                      <p className="text-[11px] font-bold leading-5 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          POINT
                        </span>

                        {step.point}
                      </p>
                    </div>

                    {"href" in step && step.href && (
                      <Link
                        href={step.href}
                        className="mt-4 flex min-h-[44px] items-center justify-between rounded-[12px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[11px] font-black text-[#1677FF] transition hover:bg-[#E3F0FF]"
                      >
                        <span>{step.linkLabel}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="budget"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            LOW COST
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            お金をかけずに垢抜けるなら何から始める？
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            垢抜けるために、最初から高価な美容サービスやブランド服を購入する必要はありません。まずは今あるものを整えるだけでも印象を改善できます。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {lowCostActions.map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[16px] font-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="mistakes"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COMMON MISTAKES
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            順番を間違えると垢抜けにくい理由
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            垢抜けに正解の順番が一つだけあるわけではありません。ただし、基本的な清潔感を整える前に細かいおしゃれへ力を入れると、変化を感じにくいことがあります。
          </p>

          <div className="mt-7 space-y-4">
            {mistakes.map((mistake, index) => (
              <article
                key={mistake.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {mistake.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {mistake.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="priority"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            YOUR PRIORITY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            自分が何から変えるべきか分からない場合は？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ここまで紹介した順番は、あくまで一般的な目安です。すでに髪型が整っている人なら、眉毛や肌から始めた方が効率的な場合もあります。
            </p>

            <p className="mt-5">
              大切なのは、自分の現在の状態を客観的に見て、改善効果が大きそうな部分を優先することです。
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/media/akanukenai-man-features"
              className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/20 hover:bg-[#EEF6FF]"
            >
              <p className="text-[11px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </p>

              <p className="mt-2 text-[15px] font-black leading-6">
                垢抜けない男の特徴10選
              </p>

              <p className="mt-3 text-[11px] font-medium leading-5 text-black/65">
                自分がどこで損をしているのか確認したい方はこちら。
              </p>
            </Link>

            <Link
              href="/media/mens-akanuke-guide"
              className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/20 hover:bg-[#EEF6FF]"
            >
              <p className="text-[11px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </p>

              <p className="mt-2 text-[15px] font-black leading-6">
                メンズ垢抜け完全ガイド
              </p>

              <p className="mt-3 text-[11px] font-medium leading-5 text-black/65">
                垢抜け全体の方法をまとめて確認したい方はこちら。
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[26px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#111111]">
            自分は何から
            <br />
            変えるべき？
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析し、あなたに合った垢抜けプランを提案します。
          </p>

          <Link
            href="/upload"
            className="group mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_24px_rgba(255,212,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,212,0,0.3)] active:scale-[0.98]"
          >
            <span>
              無料で診断をはじめる
            </span>

            <span
              aria-hidden="true"
              className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
            >
              ›
            </span>
          </Link>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-black/60">
            <span>約1分で完了</span>
            <span>無料で利用可能</span>
            <span>メンズ専用</span>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FAQ
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズの垢抜ける順番についてよくある質問
          </h2>

          <div className="mt-7 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[16px] border border-black/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[13px] font-black">
                  {faq.question}

                  <span className="shrink-0 text-[#1677FF] transition group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <p className="border-t border-black/5 px-5 py-4 text-[12px] font-medium leading-6 text-black/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="summary"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SUMMARY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズの垢抜けは、変化が大きい部分から順番に
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              メンズが垢抜けたい場合は、髪型・眉毛・肌など第一印象への影響が大きい部分から整えるのがおすすめです。
            </p>

            <p className="mt-5">
              その後、ヒゲ・服装・姿勢などへ範囲を広げていけば、一度に多くのお金や時間をかけずに改善を続けられます。
            </p>

            <p className="mt-5">
              ただし、必要な改善は人によって異なります。自分に必要な部分を見極めながら、一つずつ進めていきましょう。
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
            <Link
              href="/media"
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] border border-black/10 bg-white px-5 text-[12px] font-black"
            >
              記事一覧へ戻る
            </Link>

            <Link
              href="/media/mens-akanuke-guide"
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] bg-[#EEF6FF] px-5 text-[12px] font-black text-[#1677FF]"
            >
              垢抜け完全ガイドを見る
            </Link>
          </div>

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}