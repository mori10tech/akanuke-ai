import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  { id: "basics", label: "BBクリームとは？" },
  { id: "benefits", label: "どんな悩みをカバーできる？" },
  { id: "choose", label: "初心者向けの選び方" },
  { id: "steps", label: "基本の使い方5ステップ" },
  { id: "natural", label: "自然に仕上げる5つのコツ" },
  { id: "sunscreen", label: "日焼け止めとの順番" },
  { id: "remove", label: "BBクリームの落とし方" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const benefits = [
  {
    title: "肌の色ムラ",
    description:
      "赤みやくすみなど、部分的な色の違いをカバーして肌全体を均一に見せやすくします。",
  },
  {
    title: "毛穴・ニキビ跡",
    description:
      "気になる部分を自然にカバーすることで、肌表面をなめらかな印象に見せやすくなります。",
  },
  {
    title: "青髭",
    description:
      "髭剃り後の青みを目立ちにくくするために使える商品もあります。隠しきれない場合はコンシーラーなどを組み合わせる方法もあります。",
  },
  {
    title: "クマ・疲れた印象",
    description:
      "目元の色ムラを自然に整えることで、顔全体の印象をすっきり見せやすくなります。",
  },
];

const bbSteps = [
  {
    number: "01",
    title: "洗顔して肌を清潔にする",
    description:
      "まずは洗顔して、肌表面の汗や余分な皮脂、汚れを落とします。BBクリームを塗る前に肌を清潔な状態に整えましょう。",
    point:
      "強くこする必要はありません。普段の洗顔と同じように、肌に負担をかけすぎないように洗いましょう。",
  },
  {
    number: "02",
    title: "化粧水などで肌を整える",
    description:
      "洗顔後は、普段使っている化粧水や乳液などで肌を整えます。乾燥した状態よりも、スキンケア後の肌になじませる方が仕上がりを整えやすくなります。",
    point:
      "スキンケア直後にベタつきが残っている場合は、少し時間を置いてからBBクリームを使いましょう。",
  },
  {
    number: "03",
    title: "BBクリームを少量取る",
    description:
      "BBクリームを手の甲などに少量出します。適量は商品によって異なるため、まずは使用する商品の説明を確認しましょう。",
    point:
      "最初から多く出すより、少量から始めて足りない部分だけ追加する方が厚塗りを防ぎやすくなります。",
  },
  {
    number: "04",
    title: "顔の中心から外側へ薄く伸ばす",
    description:
      "頬や額、鼻、あごなどに少量ずつ置き、顔の中心から外側へ向かって薄くなじませます。指で強くこすらず、やさしく伸ばしましょう。",
    point:
      "フェイスラインに近づくほど薄くすると、顔と首の境目が目立ちにくくなります。",
  },
  {
    number: "05",
    title: "全体を確認して必要な部分だけ重ねる",
    description:
      "最後に鏡から少し離れて、顔全体の仕上がりを確認します。青髭やニキビ跡などが気になる場合は、必要な部分にだけ少量を追加します。",
    point:
      "完全に隠そうとして重ね続けるのではなく、顔全体として自然に見えるところで止めるのがポイントです。",
  },
];

const naturalTips = [
  {
    title: "最初からたくさん塗らない",
    description:
      "カバーしたい部分が多くても、一度に量を増やすと厚塗りに見えやすくなります。まずは薄く塗り、必要な部分だけ後から調整しましょう。",
  },
  {
    title: "フェイスラインは薄くする",
    description:
      "あごや耳の横まで同じ濃さで塗ると、首との境目が目立つことがあります。顔の外側ほど薄くなじませましょう。",
  },
  {
    title: "青髭を隠そうとして重ねすぎない",
    description:
      "口まわりだけ何度も重ねると、そこだけ質感が変わって見えることがあります。BBクリームだけで難しい場合は、部分用のコンシーラーなどを検討します。",
  },
  {
    title: "顔と首の色を一緒に確認する",
    description:
      "顔だけを近くで見るのではなく、首まで鏡に映して色の差を確認します。顔だけ明るく浮いて見えないかチェックしましょう。",
  },
  {
    title: "最後は少し離れて確認する",
    description:
      "鏡に近づきすぎると毛穴や細かな跡が気になり、必要以上に重ねやすくなります。最後は少し離れて顔全体の印象を確認しましょう。",
  },
];

const faqs = [
  {
    question: "男性がBBクリームを使っても不自然になりませんか？",
    answer:
      "自分の肌になじむ色を選び、少量を薄く伸ばせば自然に仕上げやすくなります。厚塗りを避け、顔と首の境目まで確認することがポイントです。",
  },
  {
    question: "BBクリームで青髭は隠せますか？",
    answer:
      "青髭を目立ちにくくできる商品もあります。ただし青みの強さによってはBBクリームだけでは十分にカバーできないこともあります。その場合は、コンシーラーなどを部分的に使う方法もあります。",
  },
  {
    question: "BBクリームは毎日使ってもいいですか？",
    answer:
      "使用頻度は商品や肌状態によって異なります。使用後に刺激や赤みなどの異常を感じた場合は使用を中止し、症状が続く場合は医療機関へ相談してください。",
  },
  {
    question: "BBクリームと日焼け止めはどちらを先に塗りますか？",
    answer:
      "商品によって推奨される使用方法が異なります。UVカット機能付きのBBクリームもあるため、使用する日焼け止めやBBクリームの説明を確認して使いましょう。",
  },
  {
    question: "BBクリームは洗顔だけで落とせますか？",
    answer:
      "商品によって異なります。洗顔料だけで落とせるものもあれば、クレンジングが必要なものもあるため、パッケージやメーカー公式の使用方法を確認してください。",
  },
];

export default function MensBbCreamArticle({
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
            「BBクリームを使ってみたいけれど、メイクしている感じにはしたくない」「青髭や肌の色ムラを自然に目立たなくしたい」と感じている男性もいるのではないでしょうか。
          </p>

          <p className="mt-5">
            BBクリームは、肌の色ムラや毛穴、青髭などをカバーし、肌全体を整えて見せるために使えるアイテムです。
          </p>

          <p className="mt-5">
            ただし、たくさん塗れば自然に仕上がるわけではありません。初心者が特に意識したいのは、少量を薄くなじませることです。
          </p>

          <p className="mt-5">
            この記事では、初めてBBクリームを使う男性に向けて、選び方から基本的な塗り方、自然に仕上げるためのポイントまで分かりやすく解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="basics"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BASICS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズBBクリームとは？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームは、肌の色ムラや毛穴などをカバーし、肌を均一に見せるために使われるベースメイクアイテムです。
            </p>

            <p className="mt-5">
              商品によって特徴は異なり、UVカット機能などを備えているものもあります。
            </p>

            <p className="mt-5">
              男性が使う場合も、顔を別人のように変える必要はありません。気になる部分を自然に整え、肌全体をすっきり見せるための選択肢として取り入れられます。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              初心者が覚えておきたいこと
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              BBクリームは「全部隠す」ためではなく、気になる部分を自然に整える感覚で使うと仕上がりが不自然になりにくくなります。
            </p>
          </div>
        </section>

        <section
          id="benefits"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COVER
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            BBクリームでカバーしやすい肌悩み
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            BBクリームは、男性が気になりやすいさまざまな肌悩みを目立ちにくくするために使えます。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#111111] text-[10px] font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

<div className="mt-7">
  <JournalRelatedArticleLink
    href="/media/mens-blue-beard"
    title="青髭の原因と対策を詳しく見る"
    description="髭を剃っても青く見える原因や、BBクリーム・コンシーラーで自然に隠す方法を解説。"
  />
</div>
</section>

        <section
          id="choose"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO CHOOSE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            初心者が失敗しにくいBBクリームの選び方
          </h2>

          <div className="mt-7 space-y-4">
            <div className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5">
              <h3 className="text-[15px] font-black">
                自分の肌から浮きにくい色を選ぶ
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-black/75">
                顔だけ白く見えたり、首との境目が目立ったりしないよう、自分の肌になじみやすい色を選びます。肌を明るく見せたいからと、必要以上に明るい色を選ばないようにしましょう。
              </p>
            </div>

            <div className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5">
              <h3 className="text-[15px] font-black">
                カバー力だけで決めない
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-black/75">
                カバー力が高いほど自分に合うとは限りません。自然な仕上がりを優先するなら、どこまでカバーしたいのかを考えて選びましょう。
              </p>
            </div>

            <div className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5">
              <h3 className="text-[15px] font-black">
                UVカット機能も確認する
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-black/75">
                BBクリームにはSPF・PAが表示されている商品もあります。紫外線対策も兼ねたい場合は、商品の機能や使用方法を確認して選びましょう。
              </p>
            </div>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            5 STEPS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズBBクリームの基本的な使い方5ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            初めて使うときは、一気に完成させようとせず少量ずつ調整しましょう。
          </p>

          <div className="mt-8 space-y-5">
            {bbSteps.map((step) => (
              <section
                key={step.number}
                className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#1677FF] text-[12px] font-black text-white">
                    {step.number}
                  </span>

                  <div className="min-w-0">
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
          id="natural"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NATURAL FINISH
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            BBクリームを自然に見せる5つのコツ
          </h2>

          <div className="mt-7 grid gap-4">
            {naturalTips.map((tip, index) => (
              <div
                key={tip.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {tip.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="sunscreen"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SUNSCREEN
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            日焼け止めとBBクリームはどっちが先？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームにはUVカット機能が付いている商品もあります。一方で、別の日焼け止めを併用する場合もあります。
            </p>

            <p className="mt-5">
              使用する商品によって推奨される使い方が異なるため、「必ずこの順番」と決めるのではなく、それぞれの商品説明を確認することが基本です。
            </p>

            <p className="mt-5">
              UVカット機能付きの商品でも、使用量などによっては表示されている紫外線防御効果を十分に得られない場合があります。紫外線対策を重視する場合は、商品の使用方法を確認して適切に使いましょう。
            </p>
          </div>
        </section>

        <section
          id="remove"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            REMOVE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            BBクリームはどうやって落とす？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームを使った日は、その商品に合った方法で落としましょう。
            </p>

            <p className="mt-5">
              洗顔料だけで落とせる商品もあれば、クレンジングが必要な商品もあります。そのため、「BBクリームなら洗顔だけで大丈夫」と一律に判断するのは避けましょう。
            </p>

            <p className="mt-5">
              パッケージやメーカー公式サイトに記載されている落とし方を確認し、使用している商品に合わせてケアしてください。
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
            肌だけでなく、顔全体の改善ポイントを確認
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
            メンズBBクリームについてよくある質問
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
            メンズBBクリームは少量から自然に仕上げよう
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームは、青髭や毛穴、肌の色ムラなどを自然にカバーし、肌全体を整えて見せるために使えるアイテムです。
            </p>

            <p className="mt-5">
              初心者は、最初から完璧に隠そうとせず、自分の肌になじむ色を選んで少量ずつ薄く伸ばすことから始めましょう。
            </p>

            <p className="mt-5">
              また、垢抜けた印象は肌だけで決まるものではありません。髪型・眉毛・ヒゲなども含めて、自分が取り組みやすいところから少しずつ整えていくことが大切です。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="洗顔・保湿・日焼け止めなど、初心者が最初に覚えたい基本3ステップを解説。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-beard-grooming"
              title="ヒゲの整え方を見る"
              description="基本の剃り方や青ヒゲが気になるときの考え方を初心者向けに解説。"
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