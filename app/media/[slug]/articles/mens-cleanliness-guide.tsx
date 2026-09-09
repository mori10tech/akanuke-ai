import Link from "next/link";

import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";

type Props = {
  article: Article;
};

const tableOfContents = [
  {
    id: "meaning",
    label: "清潔感のある男性とは？",
  },
  {
    id: "points",
    label: "清潔感を出す7つのポイント",
  },
  {
    id: "ng",
    label: "清潔感がないと思われやすいNG例",
  },
  {
    id: "priority",
    label: "何から始めればいい？",
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

const cleanlinessPoints = [
  {
    number: "01",
    title: "髪型を整える",
    description:
      "髪型は顔周りの大きな面積を占めるため、清潔感に影響しやすいポイントです。寝ぐせが残っている、前髪が目にかかりすぎている、サイドや襟足が伸びている状態は、服装を整えていてもだらしなく見えることがあります。",
    point:
      "流行の髪型にする必要はありません。前髪・サイド・襟足を整え、自分の顔型や髪質に合った状態を保つことを優先しましょう。",
    relatedArticle: {
      href: "/media/mens-akanuke-hairstyle",
      label: "メンズが垢抜ける髪型を詳しく見る",
    },
  },
  {
    number: "02",
    title: "眉毛を整える",
    description:
      "眉間や眉下に余分な毛が多かったり、長い毛が不規則に飛び出していたりすると、目元が整っていない印象につながることがあります。眉毛は細くするのではなく、元の形を活かしながら余分な部分だけを整えるのが基本です。",
    point:
      "初心者は眉間・眉下・眉尻周辺の明らかな余分な毛から整え、迷う毛は残すようにすると失敗しにくくなります。",
    relatedArticle: {
      href: "/media/mens-akanuke-eyebrows",
      label: "メンズ眉毛の整え方を詳しく見る",
    },
  },
  {
    number: "03",
    title: "肌を清潔に保つ",
    description:
      "乾燥・過度なテカリ・肌荒れなどは、顔全体の印象に影響します。高価な美容アイテムを多く使う必要はなく、洗顔・保湿・日焼け止めといった基本的なケアを続けることが大切です。",
    point:
      "洗顔後に何もつけず放置するのではなく、自分の肌に合った保湿を取り入れましょう。",
    relatedArticle: {
      href: "/media/mens-skincare-beginner",
      label: "メンズスキンケアの基本を見る",
    },
  },
  {
    number: "04",
    title: "ヒゲ・鼻毛など細かい部分を整える",
    description:
      "ヒゲの剃り残しや鼻毛などは、本人が気付きにくくても相手から見えやすい部分です。ヒゲを残す場合も、長さや輪郭を整えて意図的に残している状態にすると清潔に見えやすくなります。",
    point:
      "外出前に正面だけでなく横からも鏡を確認し、剃り残しや飛び出した毛がないか確認する習慣を作りましょう。",
  },
  {
    number: "05",
    title: "口元・歯を清潔にする",
    description:
      "会話をするときは口元にも視線が集まります。歯の汚れや口臭が気になる状態では、髪型や服装が整っていても清潔感を損なうことがあります。",
    point:
      "毎日の歯磨きに加えて、必要に応じてフロスや舌ケアを取り入れましょう。気になる症状が続く場合は歯科医院で相談してください。",
  },
  {
    number: "06",
    title: "服・靴をきれいに保つ",
    description:
      "清潔感は高価な服を着ることではありません。服のシワ・毛玉・汚れ、靴の泥汚れなどが目立たない状態にすることの方が重要です。サイズ感が合っていることも、整って見えるためのポイントです。",
    point:
      "新しい服を買う前に、今持っている服や靴の汚れ・シワ・傷みを確認するだけでも印象は変えられます。",
  },
  {
    number: "07",
    title: "におい対策をする",
    description:
      "汗・頭皮・衣類・口元などのにおいは、自分では慣れてしまい気付きにくいことがあります。香水で隠すよりも、入浴・洗濯・制汗ケアなど基本的な対策を優先することが大切です。",
    point:
      "香水や柔軟剤、整髪料など複数の香りを重ねすぎず、近づいたときに強く感じない程度を意識しましょう。",
  },
];

const ngExamples = [
  {
    title: "寝ぐせや伸びっぱなしの髪",
    description:
      "髪型そのものより、手入れされている状態かどうかが清潔感に影響します。",
  },
  {
    title: "ヒゲの剃り残し",
    description:
      "口周りや顎下など、正面から見えにくい部分も確認しましょう。",
  },
  {
    title: "服のシワ・毛玉・汚れ",
    description:
      "高価な服でも状態が悪いと、清潔な印象にはつながりにくくなります。",
  },
  {
    title: "靴が汚れている",
    description:
      "足元は意外と目に入りやすいため、定期的に汚れを落としましょう。",
  },
  {
    title: "香りが強すぎる",
    description:
      "清潔感を出そうとして香水を付けすぎると、逆効果になる場合があります。",
  },
  {
    title: "爪や手元の手入れ不足",
    description:
      "爪が伸びすぎていたり汚れていたりすると、細かい部分まで目立つことがあります。",
  },
];

const faqs = [
  {
    question: "男性の清潔感は何で決まりますか？",
    answer:
      "髪型・眉毛・肌・ヒゲ・口元・服装・においなど、複数の要素が合わさって決まります。一つだけ完璧にするより、全体を一定以上に整えることが大切です。",
  },
  {
    question: "清潔にしているのに清潔感がないと言われるのはなぜですか？",
    answer:
      "実際に清潔であることと、見た目から清潔に感じられることは少し異なります。髪の乱れ、服のシワ、ヒゲの剃り残しなど、見た目から伝わる要素も確認してみましょう。",
  },
  {
    question: "清潔感を出すなら最初に何を変えるべきですか？",
    answer:
      "迷った場合は、髪型・眉毛・ヒゲなど顔周りから見直すのがおすすめです。人と会ったときに目に入りやすく、比較的変化も感じやすい部分です。",
  },
  {
    question: "お金をかけないと清潔感は出せませんか？",
    answer:
      "高額な費用は必須ではありません。髪を整える、服のシワを取る、靴をきれいにする、ヒゲを整えるなど、日常的なケアだけでも改善できる部分は多くあります。",
  },
  {
    question: "香水を使えば清潔感が出ますか？",
    answer:
      "香水だけで清潔感が決まるわけではありません。まず汗や衣類、頭皮などのにおい対策を行い、そのうえで香水を使う場合は強くなりすぎないようにしましょう。",
  },
];

export default function MensCleanlinessGuideArticle({
  article,
}: Props) {
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
            「清潔にはしているつもりなのに、なぜか清潔感がないように見える」と感じたことはありませんか？
          </p>

          <p className="mt-5">
            男性の清潔感は、毎日お風呂に入っているかどうかだけで決まるものではありません。髪型・眉毛・肌・ヒゲ・口元・服装・においなど、相手から見える複数の要素が組み合わさって印象が作られます。
          </p>

          <p className="mt-5">
            大切なのは、高価な美容サービスやブランド服を取り入れることではなく、「手入れされているように見える状態」を作ることです。
          </p>

          <p className="mt-5">
            この記事では、清潔感を出したい男性が見直したい7つのポイントと、清潔感がないと思われやすいNG例を初心者向けに解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="meaning"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CLEAN IMPRESSION
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            清潔感のある男性とは？
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/80">
            <p>
              清潔感のある男性とは、単に体や服が清潔なだけではなく、髪・肌・ヒゲ・服装などが適度に手入れされ、相手から見て整っていると感じられる状態です。
            </p>

            <p className="mt-5">
              例えば、毎日洗濯している服でも強いシワが残っていれば、相手には「整っていない」と見えることがあります。逆に、高価な服でなくても、サイズが合っていて汚れやシワが少なければ清潔な印象を作りやすくなります。
            </p>

            <p className="mt-5">
              清潔感は一つの要素だけで作るものではありません。目立つマイナスポイントを少しずつ減らし、全体を整えることが重要です。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              清潔感の基本
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              「おしゃれに見せる」より先に、「手入れされている状態に見せる」ことを意識すると、清潔感を整えやすくなります。
            </p>
          </div>
        </section>

        <section
          id="points"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            7 POINTS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズが清潔感を出す7つのポイント
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            すべてを一度に完璧にする必要はありません。現在できていない部分から一つずつ整えていきましょう。
          </p>

          <div className="mt-8 space-y-5">
            {cleanlinessPoints.map((item) => (
              <section
                key={item.number}
                className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                    {item.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {item.description}
                    </p>

                    <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                      <p className="text-[11px] font-bold leading-6 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          POINT
                        </span>

                        {item.point}
                      </p>
                    </div>

                    {"relatedArticle" in item &&
                      item.relatedArticle && (
                        <Link
                          href={item.relatedArticle.href}
                          className="mt-4 flex min-h-[44px] items-center justify-between rounded-[12px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[11px] font-black text-[#1677FF] transition hover:bg-[#E3F0FF]"
                        >
                          <span>
                            {item.relatedArticle.label}
                          </span>

                          <span aria-hidden="true">
                            →
                          </span>
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
          id="ng"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CHECK LIST
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            清潔感がないと思われやすいNG例
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            自分では気にならなくても、相手から見ると清潔感を下げる原因になっていることがあります。次の項目を定期的に確認してみましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {ngExamples.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {item.description}
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
            PRIORITY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            清潔感を出すなら何から始めればいい？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              何から始めればいいか迷った場合は、まず顔周りを確認するのがおすすめです。髪型・眉毛・肌・ヒゲは、人と会ったときに目に入りやすく、比較的変化も感じやすい部分です。
            </p>

            <p className="mt-5">
              その後、服・靴・口元・においなどを確認すると、清潔感を全体的に整えやすくなります。
            </p>

            <p className="mt-5">
              ただし、すでに髪型が整っている人なら、肌や眉毛など別の部分を優先した方が効果的な場合もあります。自分に必要な改善を見極めることが大切です。
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/media/mens-akanuke-order"
              className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/20 hover:bg-[#EEF6FF]"
            >
              <p className="text-[11px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </p>

              <p className="mt-2 text-[15px] font-black leading-6">
                メンズが垢抜ける順番
              </p>

              <p className="mt-3 text-[11px] font-medium leading-5 text-black/65">
                髪型・眉毛・肌など、何から始めるべきか7ステップで確認できます。
              </p>
            </Link>

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
                自分がどこで印象を損しているのか確認したい方はこちら。
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
            自分に必要な改善ポイントをAIで確認
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。あなたが優先して整えたいポイントを確認できます。
          </p>

          <JournalDiagnosisCta />
        </section>

        <section
          id="faq"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FAQ
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズの清潔感についてよくある質問
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
            メンズの清潔感は、小さな手入れの積み重ね
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              男性が清潔感を出すために、高価な美容アイテムやブランド服を揃える必要はありません。
            </p>

            <p className="mt-5">
              髪型・眉毛・肌・ヒゲ・口元・服・靴・においなど、相手から見える部分を一つずつ整えることが大切です。
            </p>

            <p className="mt-5">
              まずは現在できていない部分を確認し、今日から改善できることを一つ始めてみましょう。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/media/mens-akanuke-guide"
              className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/25"
            >
              <span className="text-[10px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </span>

              <p className="mt-2 text-[13px] font-black leading-6">
                メンズ垢抜け完全ガイド
              </p>

              <p className="mt-2 text-[11px] font-medium leading-5 text-black/65">
                清潔感だけでなく、男性が垢抜けるための方法をまとめて確認できます。
              </p>
            </Link>

            <Link
              href="/media/mens-beauty-beginner"
              className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/25"
            >
              <span className="text-[10px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </span>

              <p className="mt-2 text-[13px] font-black leading-6">
                メンズ美容の始め方
              </p>

              <p className="mt-2 text-[11px] font-medium leading-5 text-black/65">
                美容初心者が最初に取り組みたい内容を順番に解説しています。
              </p>
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