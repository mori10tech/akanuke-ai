import Link from "next/link";
import { Fragment } from "react";

import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type AkanukenaiManFeaturesArticleProps = {
  article: Article;
};

const tableOfContents = [
  {
    id: "reason",
    label: "垢抜けない男には共通する特徴がある",
  },
  {
    id: "features",
    label: "垢抜けない男の特徴10選",
  },
  {
    id: "self-check",
    label: "3分セルフチェックと改善の選び方",
  },
  {
    id: "improvement",
    label: "垢抜けるために何から変える？",
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

const features = [
  {
    number: "01",
    title: "髪型を何年も変えていない",
    description:
      "学生時代から同じ髪型を続けていたり、伸びたら短くするだけになっていたりすると、現在の顔立ちや雰囲気に合わなくなっていることがあります。髪型は顔全体の印象を大きく左右するため、垢抜けたい男性が最初に見直したいポイントです。",
    improvement:
      "美容室では「朝のセットは5分以内」「前髪が目にかからない長さ」「耳周りと襟足はすっきり」など、生活に合う条件を具体的に伝えましょう。参考写真を見せて、髪質で再現できるか相談するのもおすすめです。",
  },
  {
    number: "02",
    title: "眉毛をほとんど整えていない",
    description:
      "眉毛が伸びっぱなしだったり、眉間や眉下に余分な毛が残っていたりすると、目元がぼんやりして見えることがあります。一方で、細くしすぎるなど自己流で大きく形を変えるのもおすすめできません。",
    improvement:
      "まずは眉間・眉下・眉尻周辺の余分な毛を整える程度から始めましょう。初めてならメンズ眉毛サロンを利用する方法もあります。",
  },
  {
    number: "03",
    title: "スキンケアをしていない",
    description:
      "肌の乾燥・テカリ・毛穴・肌荒れなどは、顔全体の清潔感に影響しやすいポイントです。男性の場合、スキンケアを何から始めればいいか分からず、洗顔後に何もしていないケースも少なくありません。",
    improvement:
      "最初は洗顔・保湿・日焼け止めの3つで十分です。多くの商品を一度に使うより、毎日続けることを優先しましょう。",
  },
  {
    number: "04",
    title: "ヒゲ・鼻毛など細かい部分を放置している",
    description:
      "髪型や服装を整えていても、ヒゲの剃り残しや鼻毛などが目立つと、細かい部分まで手入れが行き届いていない印象につながることがあります。",
    improvement:
      "出かける前に顔全体を鏡で確認する習慣を作りましょう。ヒゲを残す場合も、長さや輪郭を揃えることが重要です。",
  },
  {
    number: "05",
    title: "服のサイズ感が合っていない",
    description:
      "高価な服や流行の服を着ていても、肩幅・袖丈・着丈・パンツ丈が合っていないと、全体のバランスが崩れて見えることがあります。ブランドよりもサイズ感の方が印象を左右することもあります。",
    improvement:
      "まず手持ちの服を着て、肩の縫い目が大きく落ちていないか、袖が手の甲を覆いすぎないか、パンツの裾が靴の上で大きくたまらないかを確認しましょう。ゆったりしたデザインの場合は、意図したシルエットかも見て判断します。",
  },
  {
    number: "06",
    title: "清潔感より「おしゃれ」を優先している",
    description:
      "垢抜けようとして、アクセサリー・香水・流行のファッションなどを一気に取り入れても、髪・肌・眉毛・服のシワなど基本的な部分が整っていなければ、思ったほど印象が変わらないことがあります。",
    improvement:
      "出かける前に「寝ぐせ・ヒゲの剃り残し・服のシワや汚れ・靴の汚れ」の4点を確認しましょう。香水やアクセサリーを買い足す前に、手持ちのもので整えられる部分から始められます。",
  },
  {
    number: "07",
    title: "髪型・肌・服をすべて自己流で選んでいる",
    description:
      "自分では似合っていると思っていても、客観的に見ると顔立ちや体型とのバランスが合っていない場合があります。特に髪型や眉毛は、自分だけで判断するのが難しい部分です。",
    improvement:
      "美容師や眉毛サロンなど、専門知識のある人へ一度相談してみましょう。第三者の意見を取り入れるだけでも選択肢が広がります。",
  },
  {
    number: "08",
    title: "姿勢や表情を意識していない",
    description:
      "垢抜けは髪型や服装だけで決まるものではありません。猫背・うつむいた姿勢・無表情などは、実際の見た目以上に暗い印象や自信のない印象につながることがあります。",
    improvement:
      "肩の力を抜いて背筋を伸ばし、相手を見るときは自然に顔を上げることから始めましょう。無理に笑顔を作る必要はありません。",
  },
  {
    number: "09",
    title: "一度に全部変えようとして続かない",
    description:
      "髪型・眉毛・スキンケア・筋トレ・ファッションなどを一度に始めると、お金も時間もかかり、途中で続かなくなることがあります。垢抜けは短期間で完成させる必要はありません。",
    improvement:
      "最初の1週間は「外出前の身だしなみ確認」と「夜の保湿」など、毎日5分程度でできることを一つ選びましょう。美容室の予約など時間が必要な改善は、別の日に予定を入れると続けやすくなります。",
  },
  {
    number: "10",
    title: "自分の改善ポイントを把握していない",
    description:
      "人によって垢抜けない原因は異なります。髪型を変えるべき人もいれば、眉毛や肌を整えるだけで印象が大きく変わる人もいます。自分の課題が分からないまま他人の方法を真似すると、遠回りになることがあります。",
    improvement:
      "まず鏡と普段着の全身写真で、髪・眉毛・ヒゲ・服の状態を一つずつ確認します。気になる項目が複数あれば「今日直せる」「人に相談する」「継続が必要」の3種類に分けると着手しやすくなります。",
  },
];

const improvementSteps = [
  {
    number: "01",
    title: "髪型",
    description: "顔全体の印象を整える",
    href: "/media/mens-akanuke-hairstyle",
  },
  {
    number: "02",
    title: "眉毛",
    description: "目元をすっきり見せる",
  },
  {
    number: "03",
    title: "肌",
    description: "清潔感を高める",
  },
  {
    number: "04",
    title: "服装",
    description: "サイズ感を整える",
  },
  {
    number: "05",
    title: "客観視",
    description: "自分の優先順位を知る",
  },
];

const faqs = [
  {
    question: "イケメンじゃないと垢抜けることはできませんか？",
    answer:
      "顔立ちだけで垢抜けが決まるわけではありません。髪型・眉毛・肌・服装・姿勢などを自分に合う状態へ整えることで、現在の印象を改善することは可能です。",
  },
  {
    question: "男性が最初に変えるなら何が一番おすすめですか？",
    answer:
      "迷った場合は髪型から見直すのがおすすめです。顔の大部分を占めるため印象への影響が大きく、美容師へ相談すれば自分だけで判断する必要もありません。その次に眉毛と肌を整えていくと進めやすいです。",
  },
  {
    question: "お金をかけないと垢抜けるのは難しいですか？",
    answer:
      "必ずしも高額な費用は必要ありません。姿勢を整える、服や靴をきれいにする、眉間の余分な毛を整えるなど、ほとんど費用をかけずに改善できることもあります。",
  },
  {
    question: "何歳からでも垢抜けることはできますか？",
    answer:
      "年齢に関係なく、現在の髪型・肌・服装・清潔感を見直すことはできます。年齢に合った自然な改善を行うことが重要です。",
  },
  {
    question: "自分のどこを改善すればいいか分かりません",
    answer:
      "自分では毎日見ているため、改善点に気付きにくいことがあります。美容師など第三者へ相談したり、写真を使って客観的に確認したりすると優先順位を決めやすくなります。",
  },
];

export default function AkanukenaiManFeaturesArticle({
  article,
}: AkanukenaiManFeaturesArticleProps) {
  return (
    <>
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
              「垢抜けたいと思って髪型や服装を変えてみたけれど、なぜかあまり変わらない」と感じていませんか？
            </p>

            <p className="mt-5">
              男性が垢抜けない原因は、顔立ちだけにあるわけではありません。髪型・眉毛・肌・服装・清潔感など、少しずつ積み重なった要素によって全体の印象が決まります。
            </p>

            <p className="mt-5">
              この記事では、垢抜けない男性に共通しやすい10の特徴と、それぞれの改善方法を初心者向けに解説します。
            </p>
          </section>


          <section
            id="reason"
            className="scroll-mt-24 pt-14"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              WHY
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けない男には共通する特徴がある
            </h2>

            <div className="mt-6 text-[14px] leading-8 text-black/80">
              <p>
                「垢抜けている人」と「垢抜けていない人」の違いは、一つの大きなポイントだけで決まるものではありません。
              </p>

              <p className="mt-5">
                髪型は整っているけれど眉毛が伸びっぱなし、服はおしゃれだけれどサイズが合っていないなど、小さな違和感が積み重なることで全体の印象が整って見えないことがあります。
              </p>

              <p className="mt-5">
                逆に言えば、自分に必要なポイントを一つずつ改善していけば、すべてを大きく変えなくても印象は整えていけます。
              </p>
            </div>

            <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
              <p className="text-[12px] font-black text-[#1677FF]">
                大切なのは「自分に必要な改善」を知ること
              </p>

              <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                SNSで見つけた髪型やファッションをそのまま真似するのではなく、自分の顔立ち・髪質・肌・体型に合う改善から始めることが重要です。
              </p>
            </div>
          </section>

          <section
            id="features"
            className="scroll-mt-24 pt-16"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              10 FEATURES
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けない男の特徴10選
            </h2>

            <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
              当てはまる項目があっても、すべてを一度に直す必要はありません。改善しやすいところから順番に見直してみましょう。
            </p>

            <div className="mt-8 space-y-5">
              {features.map((feature, index) => (
                <Fragment key={feature.number}>
                  <section className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                        {feature.number}
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                          {feature.title}
                        </h3>

                        <p className="mt-3 text-[13px] leading-7 text-black/75">
                          {feature.description}
                        </p>

                        <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                          <p className="text-[11px] font-bold leading-6 text-black/65">
                            <span className="mr-2 font-black text-[#9A7800]">
                              改善ポイント
                            </span>

                            {feature.improvement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {index === 4 && (
                    <AdSenseAd
                      className="my-8"
                      format="rectangle"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </section>

          <section id="self-check" className="scroll-mt-24 pt-16">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              SELF CHECK
            </p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">
              3分セルフチェックと改善の選び方
            </h2>
            <p className="mt-5 text-[14px] leading-8 text-black/80">
              10個の特徴を読んでも、どこから手を付ければよいか迷うかもしれません。まずは鏡と普段着を使って、次の項目を確認してみてください。全部に当てはまる必要はありません。
            </p>
            <div className="mt-6 rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6">
              <h3 className="text-[16px] font-bold">外出前に確認する6項目</h3>
              <ul className="mt-4 space-y-3 text-[13px] leading-7 text-black/75">
                <li>□ 髪：寝ぐせが残っていないか、前髪が目を覆っていないか</li>
                <li>□ 眉：眉間や眉下に、気になる余分な毛がないか</li>
                <li>□ ヒゲ：剃り残しや、整えていない輪郭がないか</li>
                <li>□ 肌：洗顔後のつっぱりや、日中の乾燥が気にならないか</li>
                <li>□ 服：目立つシワ・汚れがなく、袖や裾の長さが不自然でないか</li>
                <li>□ 靴：汚れや傷みが目立っていないか</li>
              </ul>
              <p className="mt-4 text-[11px] leading-6 text-black/60">
                ※これは医学的な診断や外見の点数付けではなく、身だしなみを見直すための任意のチェックです。
              </p>
            </div>
            <h3 className="mt-9 text-[17px] font-bold">気になる項目を見つけたら、こう選ぶ</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-[16px] border border-black/10 p-5">
                <p className="text-[13px] font-bold">今日できること</p>
                <p className="mt-2 text-[12px] leading-7 text-black/70">寝ぐせを直す、服のシワを伸ばす、靴を拭くなど。お金をかけずにできる項目から一つ試しましょう。</p>
              </div>
              <div className="rounded-[16px] border border-black/10 p-5">
                <p className="text-[13px] font-bold">相談した方がよいこと</p>
                <p className="mt-2 text-[12px] leading-7 text-black/70">髪型や眉の形を大きく変えたい場合は、美容師や眉毛サロンで希望と普段の手入れ時間を伝えて相談します。</p>
              </div>
              <div className="rounded-[16px] border border-black/10 p-5">
                <p className="text-[13px] font-bold">続けて様子を見ること</p>
                <p className="mt-2 text-[12px] leading-7 text-black/70">保湿や日焼け止めなどは、一度で見た目が大きく変わるものではありません。刺激が出る場合は使用を中止し、症状が続くときは皮膚科に相談してください。</p>
              </div>
            </div>
            <p className="mt-6 text-[13px] leading-7 text-black/75">
              迷ったら「気になる度合いが高い」「今日できる」「無理なく続けられる」の3条件で、一つだけ選ぶのがおすすめです。ほかの人と比較する必要はありません。
            </p>
          </section>

          <section
            id="improvement"
            className="scroll-mt-24 pt-16"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              HOW TO IMPROVE
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けるために何から変える？
            </h2>

            <p className="mt-5 text-[14px] leading-8 text-black/80">
              何から始めればいいか迷った場合は、第一印象への影響が大きい顔周りから整えるのがおすすめです。
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {improvementSteps.map((step) => {
                const content = (
                  <>
                    <span className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                      STEP {step.number}
                    </span>

                    <p className="mt-2 text-[18px] font-black">
                      {step.title}
                    </p>

                    <p className="mt-2 text-[11px] font-medium leading-5 text-black/65">
                      {step.description}
                    </p>
                  </>
                );

                if ("href" in step && step.href) {
                  return (
                    <Link
                      key={step.number}
                      href={step.href}
                      className="group flex min-h-[150px] flex-col rounded-[18px] border border-[#1677FF]/25 bg-white p-5 shadow-[0_4px_14px_rgba(22,119,255,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1677FF]/40 hover:bg-[#F7FBFF] hover:shadow-[0_8px_20px_rgba(22,119,255,0.10)] active:translate-y-0 active:scale-[0.99]"
                    >
                      {content}

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-[11px] font-black text-[#1677FF]">
                          詳しく見る
                        </span>

                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1677FF] text-white transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <span className="-translate-y-px">
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <div
                    key={step.number}
                    className="min-h-[150px] rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <p className="text-[13px] font-black">
                さらに詳しく知りたい方はこちら
              </p>

              <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                改善ポイントが分かったら、何から始めるかを7ステップで確認できます。
              </p>

              <div className="mt-4">
                <JournalRelatedArticleLink
                  href="/media/mens-akanuke-order"
                  title="メンズが垢抜ける順番｜初心者が最初にやるべき7ステップ"
                  description="改善ポイントが分かったら、何から始めるかを7ステップで確認できます。"
                />
              </div>
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
            <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
              <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                AI BEAUTY DIAGNOSIS
              </span>
            </div>

            <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
              自分はどこから変えるべき？
            </h2>

            <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
              AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。あなたが優先して改善したいポイントを整理します。
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

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けない男性についてよくある質問
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

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けない原因を知ることが、最初の一歩
            </h2>

            <div className="mt-5 text-[14px] leading-8 text-black/80">
              <p>
                垢抜けない男性には、髪型・眉毛・肌・服装・清潔感など、いくつかの共通しやすい特徴があります。
              </p>

              <p className="mt-5">
                大切なのは、10個すべてを一度に変えることではありません。自分に当てはまる部分を確認し、改善効果の高いところから一つずつ取り組んでいきましょう。
              </p>

              <p className="mt-5">
                自分では改善ポイントが分からない場合は、第三者から意見をもらったり、写真を使って客観的に確認したりすることも有効です。
              </p>
            </div>

            <JournalArticleFooterNav
              secondaryHref="/upload"
              secondaryLabel="無料で診断をはじめる"
              secondaryVariant="diagnosis"
            />
          </section>

          <p className="sr-only">
            {article.title}
          </p>
        </div>
      </div>
    </>
  );
}