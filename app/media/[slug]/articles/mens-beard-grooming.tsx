import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  {
    id: "cleanliness",
    label: "ヒゲは清潔感にどう影響する？",
  },
  {
    id: "shave",
    label: "清潔感を出す基本のヒゲの剃り方",
  },
  {
    id: "blue-beard",
    label: "青ヒゲが目立つ場合はどうする？",
  },
  {
    id: "keep",
    label: "ヒゲを残す場合の整え方",
  },
  {
    id: "skin-care",
    label: "ヒゲ剃り後の肌荒れを防ぐには？",
  },
  {
    id: "hair-removal",
    label: "ヒゲ脱毛という選択肢",
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

const shavingSteps = [
  {
    number: "01",
    title: "ヒゲと肌を濡らす",
    description:
      "乾いた肌にそのままカミソリを当てると、摩擦が大きくなりやすくなります。洗顔後や入浴後など、ヒゲが水分を含んで柔らかくなった状態で剃ると負担を抑えやすくなります。",
    point:
      "朝に剃る場合も、ぬるま湯で顔を洗ってから始めるとヒゲを柔らかくしやすくなります。",
  },
  {
    number: "02",
    title: "シェービング剤を使う",
    description:
      "カミソリを使う場合は、シェービングフォームやジェルなどを使用して肌との摩擦を減らしましょう。何も付けずに剃るより、刃を滑らせやすくなります。",
    point:
      "肌が敏感な場合は、刺激の少ないシェービング剤を選び、肌に合わないものは使用を中止しましょう。",
  },
  {
    number: "03",
    title: "まず毛の流れに沿って剃る",
    description:
      "最初から強く逆剃りするのではなく、まずヒゲが生えている方向に沿って剃ります。口周り・顎・首では毛の向きが異なることがあるため、事前に確認しておくと剃りやすくなります。",
    point:
      "何度も同じ場所へ刃を当てると肌への負担が増えやすいため、必要以上に往復しないことも大切です。",
  },
  {
    number: "04",
    title: "剃り残しを確認する",
    description:
      "正面だけでなく、顎下・首・口角周辺なども鏡で確認します。本人からは見えにくい部分に剃り残しがあると、ヒゲ全体が整っていないように見えることがあります。",
    point:
      "明るい場所で、顔を少し横へ向けながら確認すると剃り残しを見つけやすくなります。",
  },
  {
    number: "05",
    title: "剃った後は保湿する",
    description:
      "ヒゲ剃り後の肌は乾燥したり刺激を感じたりすることがあります。剃り終わったら肌を強くこすらず、自分の肌に合った化粧水や乳液などで保湿しましょう。",
    point:
      "ヒリつきや赤みが強い場合は無理に何度も剃らず、肌を休ませることも大切です。",
  },
];

const keepPoints = [
  {
    number: "01",
    title: "長さを揃える",
    description:
      "ヒゲを残す場合でも、毛の長さがバラバラだと伸ばしっぱなしに見えやすくなります。ヒゲトリマーなどを使い、全体の長さを揃えると意図して残している印象を作りやすくなります。",
  },
  {
    number: "02",
    title: "輪郭を整える",
    description:
      "頬や首まで不規則に毛が広がっている場合は、残したいヒゲとの境界が分かりにくくなります。不要な部分を処理し、どこまで残すかを明確にしましょう。",
  },
  {
    number: "03",
    title: "口周りを清潔に保つ",
    description:
      "口周りのヒゲが長すぎると、食事の際に汚れが付きやすくなることがあります。唇へかかりすぎないように整え、洗顔時にも清潔に保ちましょう。",
  },
  {
    number: "04",
    title: "似合うかを顔全体で判断する",
    description:
      "ヒゲだけを見て判断するのではなく、髪型・眉毛・輪郭・服装などとのバランスも確認します。ヒゲを残すこと自体が目的にならないよう、顔全体で自然に見えるかを確認しましょう。",
  },
];

const blueBeardActions = [
  {
    title: "深剃りしすぎない",
    description:
      "青ヒゲが気になるからと何度も逆剃りすると、肌への負担が増えることがあります。まずは肌を傷めない範囲できれいに剃ることを優先しましょう。",
  },
  {
    title: "肌の状態も整える",
    description:
      "乾燥や赤みがあると、口周りがより目立って見えることがあります。ヒゲだけでなく洗顔・保湿など基本的なスキンケアも続けましょう。",
  },
  {
    title: "必要ならメンズメイクも選択肢",
    description:
      "青みを一時的に目立ちにくくしたい場合は、コンシーラーなどを利用する方法もあります。厚く塗るのではなく、自然に見える範囲で少量から試しましょう。",
  },
  {
    title: "長期的には脱毛も検討できる",
    description:
      "毎日のヒゲ剃りそのものを負担に感じている場合は、医療機関や専門サービスでヒゲ脱毛について相談する選択肢もあります。",
  },
];

const faqs = [
  {
    question: "垢抜けたい男性はヒゲを全部剃った方がいいですか？",
    answer:
      "必ず全部剃る必要はありません。ヒゲが似合う人もいます。重要なのは、剃る場合は剃り残しを減らし、残す場合は長さや輪郭を整えて、手入れされている状態にすることです。",
  },
  {
    question: "ヒゲは毎日剃った方が清潔感がありますか？",
    answer:
      "ヒゲの濃さや伸びる速さによって異なります。毎日剃らなくても整って見える人もいます。見た目を確認しながら、自分に合った頻度で手入れしましょう。",
  },
  {
    question: "カミソリと電気シェーバーはどちらがおすすめですか？",
    answer:
      "どちらにも特徴があります。カミソリは深く剃りやすい一方、肌への刺激を感じる人もいます。電気シェーバーは手軽で肌への負担を抑えやすい場合があります。自分のヒゲの濃さや肌状態に合わせて選びましょう。",
  },
  {
    question: "青ヒゲは剃り方だけでなくせますか？",
    answer:
      "ヒゲが皮膚の下に透けて青く見えている場合、剃り方だけでは完全に目立たなくするのが難しいことがあります。深剃りを繰り返すより、肌を整えることやメイク、脱毛など複数の方法から考えるのがおすすめです。",
  },
  {
    question: "ヒゲ脱毛をした方が垢抜けますか？",
    answer:
      "ヒゲ脱毛がすべての男性に必要なわけではありません。毎日のヒゲ剃りが負担な人や、青ヒゲが強く気になる人にとっては選択肢の一つです。費用や回数、肌への影響などを確認したうえで検討しましょう。",
  },
  {
    question: "ヒゲ剃りで肌荒れする場合はどうすればいいですか？",
    answer:
      "シェービング剤を使用する、同じ場所を何度も剃らない、剃った後に保湿するなどの方法があります。赤み・痛み・炎症などが続く場合は、自己判断で無理に剃り続けず皮膚科などの医療機関へ相談してください。",
  },
];

export default function MensBeardGroomingArticle({
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
            「ヒゲをきれいに剃っているつもりなのに、なぜか口周りが整って見えない」「ヒゲを残した方が似合うのか、全部剃った方がいいのか分からない」と悩む男性は少なくありません。
          </p>

          <p className="mt-5">
            ヒゲは髪型や眉毛と同じように、顔周りの印象に関わるポイントです。ただし、垢抜けるために必ずヒゲをなくす必要はありません。
          </p>

          <p className="mt-5">
            大切なのは、剃る場合も残す場合も「手入れされている状態」にすることです。剃り残しや不揃いな長さを減らし、自分の顔立ちやライフスタイルに合った方法を選びましょう。
          </p>

          <p className="mt-5">
            この記事では、ヒゲを整えて清潔感を出したい男性向けに、基本的な剃り方・ヒゲを残す場合の考え方・青ヒゲ・肌荒れ・ヒゲ脱毛まで初心者向けに解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="cleanliness"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CLEAN IMPRESSION
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            ヒゲは男性の清潔感にどう影響する？
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲそのものが清潔感を下げるわけではありません。きれいに剃られているヒゲも、長さや輪郭を整えて残しているヒゲも、手入れされていれば自然な印象を作れます。
            </p>

            <p className="mt-5">
              一方で、口周り・顎下・首などに剃り残しがあったり、残しているヒゲの長さが不揃いだったりすると、「手入れされていない」という印象につながりやすくなります。
            </p>

            <p className="mt-5">
              垢抜けを目指す場合は、「ヒゲをなくすかどうか」だけで考えるのではなく、「顔全体を見たときに整っているか」という視点で判断することが大切です。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              ヒゲの基本
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              剃るなら剃り残しを減らす。残すなら長さと輪郭を整える。「伸びっぱなし」に見えない状態を作ることが、清潔感につながります。
            </p>
          </div>
        </section>

        <section
          id="shave"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            5 STEPS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            清潔感を出す基本のヒゲの剃り方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            ヒゲ剃りでは、深く剃ることだけを優先するのではなく、肌への負担を抑えながら剃り残しを減らすことが重要です。
          </p>

          <div className="mt-8 space-y-5">
            {shavingSteps.map((step) => (
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
                      <p className="text-[11px] font-bold leading-6 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          POINT
                        </span>

                        {step.point}
                      </p>
                    </div>
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
          id="blue-beard"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BLUE BEARD
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            青ヒゲが目立つ場合はどうする？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲをきれいに剃っても、口周りや顎が青く見えることがあります。これは皮膚の下に残っているヒゲが透けて見えることなどが原因で、単純に「剃り残し」とは限りません。
            </p>

            <p className="mt-5">
              青ヒゲが気になるからといって、同じ場所を何度も強く逆剃りすると、カミソリ負けや赤みにつながることがあります。
            </p>

            <p className="mt-5">
              肌への負担を抑えながら、自分がどこまで目立たなくしたいのかに応じて方法を選びましょう。
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {blueBeardActions.map((item, index) => (
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
          id="keep"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BEARD STYLE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            ヒゲを残す場合の整え方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            ヒゲを残したい場合は、「剃らない」のではなく「残す部分と処理する部分を決める」ことが大切です。
          </p>

          <div className="mt-8 space-y-4">
            {keepPoints.map((item) => (
              <section
                key={item.number}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#1677FF] text-[11px] font-black text-white">
                    {item.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section
          id="skin-care"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            AFTER SHAVING
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            ヒゲ剃り後の肌荒れを防ぐには？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲ剃りは刃を肌へ当てるため、人によっては乾燥・ヒリつき・赤みなどが起こることがあります。清潔感を出そうとして毎回深剃りしすぎると、かえって肌が荒れて見える場合もあります。
            </p>

            <p className="mt-5">
              シェービング剤を使う、切れ味の悪い刃を使い続けない、必要以上に同じ部分を剃らないといった基本を意識しましょう。
            </p>

            <p className="mt-5">
              また、ヒゲ剃り後は肌を強くこすらず、自分の肌に合った保湿を取り入れることも大切です。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="洗顔・保湿・日焼け止めなど、初心者が最初に知りたい基本を解説しています。"
            />
          </div>

          <div className="mt-7 rounded-[20px] border border-[#FFD400]/45 bg-[#FFFBE8] p-5">
            <p className="text-[12px] font-black text-[#7A6200]">
              肌トラブルが続く場合
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              強い赤み・痛み・かゆみ・炎症などが続く場合は、ヒゲ剃りや化粧品だけで解決しようとせず、皮膚科などの医療機関へ相談してください。
            </p>
          </div>
        </section>

        <section
          id="hair-removal"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HAIR REMOVAL
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            ヒゲ脱毛という選択肢もある
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲが濃く毎朝のシェービングに時間がかかる、青ヒゲが強く気になる、カミソリ負けを繰り返しているといった場合は、ヒゲ脱毛を検討する人もいます。
            </p>

            <p className="mt-5">
              ただし、ヒゲ脱毛は「垢抜けるために全員がするべきもの」ではありません。将来ヒゲを生やしたくなる可能性や、費用・施術回数なども考えて判断する必要があります。
            </p>

            <p className="mt-5">
              また、医療脱毛と美容系サービスでは施術方法などが異なります。検討する場合は、料金だけではなく施術内容・リスク・アフターケアなども確認しましょう。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              まずは「何に困っているか」を整理
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              毎日の処理時間を減らしたいのか、青ヒゲを目立ちにくくしたいのか、肌への負担を減らしたいのか。目的を明確にしてから選択肢を比較すると判断しやすくなります。
            </p>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[26px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#111111]">
            ヒゲだけでなく、
            <br />
            顔全体の改善ポイントを確認
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。自分はどこから整えるべきかを確認できます。
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
            メンズのヒゲについてよくある質問
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
            メンズのヒゲは「なくす」より「整える」が基本
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲで清潔感を出すために、必ずすべて剃る必要はありません。剃る場合は剃り残しを減らし、残す場合は長さや輪郭を整えることが基本です。
            </p>

            <p className="mt-5">
              青ヒゲが気になる場合も、無理な深剃りだけで解決しようとせず、肌のケア・メイク・脱毛など自分に合う方法を検討しましょう。
            </p>

            <p className="mt-5">
              ヒゲだけでなく、髪型・眉毛・肌・服装なども含めて全体を整えることで、より自然に清潔感のある印象を作りやすくなります。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-cleanliness-guide"
              title="メンズの清潔感を出す方法"
              description="髪型・眉毛・肌・ヒゲ・服装など、清潔感を整えるポイントをまとめて解説。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-akanuke-order"
              title="メンズが垢抜ける順番"
              description="髪型・眉毛・肌など、何から整えるべきか7ステップで確認できます。"
            />
          </div>

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}