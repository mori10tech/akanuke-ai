import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  { id: "basics", label: "メンズスキンケアは何から始める？" },
  { id: "steps", label: "初心者向け基本3ステップ" },
  { id: "skin-type", label: "肌質別のアイテム選び" },
  { id: "mistakes", label: "初心者によくある失敗" },
  { id: "timing", label: "いつ・どのくらい続ける？" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const skincareSteps = [
  {
    number: "01",
    title: "洗顔で余分な皮脂や汚れを落とす",
    description:
      "まずは肌表面の余分な皮脂や汚れを落とします。洗顔料をよく泡立て、手で強くこするのではなく、泡を転がすようにやさしく洗うことを意識しましょう。洗った後はぬるま湯で十分にすすぎます。",
    point:
      "皮脂が気になるからといって何度も洗ったり、熱いお湯でゴシゴシ洗ったりする必要はありません。",
  },
  {
    number: "02",
    title: "化粧水・乳液などで保湿する",
    description:
      "洗顔後は肌が乾燥しやすいため、化粧水で水分を補い、乳液や保湿剤でうるおいを保ちます。ベタつきが苦手な場合は、さっぱりした使用感の商品など、自分が毎日使いやすいものから始めましょう。",
    point:
      "高価な商品を何種類も揃えるより、まずは洗顔後の保湿を毎日続けることを優先しましょう。",
  },
  {
    number: "03",
    title: "日焼け止めで紫外線から肌を守る",
    description:
      "朝のスキンケアでは、外出前に日焼け止めを使う習慣も取り入れたいポイントです。紫外線は季節や天候にかかわらず届くため、日常的な対策として無理なく続けられるものを選びましょう。",
    point:
      "最初から数値だけで選ばず、普段の外出時間や使用感に合わせて、継続して使いやすい日焼け止めを選ぶのがおすすめです。",
  },
];

const skinTypes = [
  {
    title: "脂性肌が気になる人",
    description:
      "テカリやベタつきが気になっても、洗いすぎには注意が必要です。さっぱりした使用感の保湿アイテムなどを選び、洗顔後の保湿までセットで考えましょう。",
  },
  {
    title: "乾燥しやすい人",
    description:
      "洗顔後につっぱりやカサつきを感じやすい場合は、保湿力を重視します。洗浄力が強すぎるものを避け、乳液やクリームなども使いながら乾燥を防ぎましょう。",
  },
  {
    title: "部分的にベタつく人",
    description:
      "額や鼻はベタつく一方で頬は乾燥するなど、部位によって状態が違うこともあります。顔全体を同じように扱わず、乾燥する部分には保湿を補うなど調整しましょう。",
  },
  {
    title: "刺激を感じやすい人",
    description:
      "化粧品で赤みや刺激を感じやすい場合は、一度に多くの商品を増やさず、シンプルなケアから始めます。強い症状や肌トラブルが続く場合は、自己判断でケアを続けず皮膚科へ相談してください。",
  },
];

const mistakes = [
  {
    title: "皮脂が気になって洗いすぎる",
    description:
      "テカリを落とそうとして一日に何度も洗顔したり、強くこすったりすると肌への負担になることがあります。回数を増やすより、やさしく洗うことを意識しましょう。",
  },
  {
    title: "化粧水だけでケアを終える",
    description:
      "化粧水をつけるだけではなく、必要に応じて乳液や保湿剤も使い、洗顔後の肌が乾燥しないように整えることが大切です。",
  },
  {
    title: "最初から商品を増やしすぎる",
    description:
      "美容液やパックなどを一度に追加すると、何が自分の肌に合っているのか判断しにくくなります。まずは洗顔・保湿・紫外線対策の基本から始めましょう。",
  },
  {
    title: "肌に合わなくても使い続ける",
    description:
      "使用後に強い刺激や赤みなどの異常が出た場合は使用を中止しましょう。症状が続く場合は、化粧品だけで解決しようとせず医療機関へ相談することも大切です。",
  },
];

const faqs = [
  {
    question: "メンズスキンケアは何を揃えればいいですか？",
    answer:
      "初心者なら、まず洗顔料と保湿用の化粧水・乳液など、そして日中に使う日焼け止めから始めれば十分です。慣れてから必要に応じてアイテムを追加しましょう。",
  },
  {
    question: "男性も化粧水と乳液の両方を使った方がいいですか？",
    answer:
      "性別にかかわらず、洗顔後の肌を乾燥から守ることが重要です。化粧水だけで乾燥を感じる場合は、乳液や保湿剤も組み合わせるとよいでしょう。",
  },
  {
    question: "朝も洗顔料を使った方がいいですか？",
    answer:
      "肌状態には個人差があります。朝の皮脂やベタつきが気になる場合は洗顔料を使う方法がありますが、乾燥しやすい人は洗いすぎにならないよう肌の状態を見ながら調整しましょう。",
  },
  {
    question: "メンズ用の化粧品を選ばないとダメですか？",
    answer:
      "必ずしもメンズ用である必要はありません。性別の表示だけでなく、自分の肌状態や使用感、続けやすさを基準に選ぶことが大切です。",
  },
  {
    question: "ニキビがある場合も同じスキンケアでいいですか？",
    answer:
      "軽いケアだけで改善しないニキビや、炎症・痛み・跡が気になる場合は皮膚科への相談をおすすめします。強くこすったり、自分でつぶしたりするのは避けましょう。",
  },
];

export default function MensSkincareBeginnerArticle({
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
            「スキンケアを始めたいけれど、洗顔・化粧水・乳液のどれから始めればいいか分からない」という男性も多いのではないでしょうか。
          </p>

          <p className="mt-5">
            メンズスキンケアは、最初からたくさんの化粧品を揃える必要はありません。初心者がまず意識したいのは、肌を「洗う・潤す・守る」というシンプルな3つです。
          </p>

          <p className="mt-5">
            基本を毎日の習慣にしてから、自分の肌状態に合わせて必要なケアを追加する方が、無理なく続けやすくなります。
          </p>

          <p className="mt-5">
            この記事では、スキンケア初心者の男性に向けて、最初に取り組みたい基本3ステップと、肌質別の選び方、よくある失敗まで分かりやすく解説します。
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
            メンズスキンケアは何から始める？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              スキンケア初心者が最初に覚えたいのは、特別な美容法ではなく毎日の基本です。肌表面の汚れや余分な皮脂を落とし、洗顔後に保湿し、日中は紫外線から肌を守る。この3つを土台に考えます。
            </p>

            <p className="mt-5">
              美容液やパックなどの商品もありますが、基本のケアが定まっていない段階で一度に増やす必要はありません。使うものが多すぎると続けにくく、自分に合わない商品があったときにも原因を判断しにくくなります。
            </p>

            <p className="mt-5">
              まずは少ないアイテムで習慣を作り、肌の状態を見ながら調整していきましょう。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              初心者が覚える3つ
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              洗顔で「洗う」→ 化粧水・乳液などで「潤す」→ 日焼け止めで「守る」。まずはこの流れを毎日の基本にしましょう。
            </p>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            3 STEPS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            初心者向け｜メンズスキンケアの基本3ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            最初は複雑に考えず、次の3ステップから始めてみましょう。
          </p>

          <div className="mt-8 space-y-5">
            {skincareSteps.map((step) => (
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
          id="skin-type"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SKIN TYPE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            肌質別｜スキンケアアイテム選びの考え方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            同じ男性でも肌の状態は人によって異なります。「メンズ用」という表示だけで決めず、自分の肌の状態を見ながら選びましょう。
          </p>

          <div className="mt-8 space-y-4">
            {skinTypes.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#111111] text-[11px] font-black text-white">
                    {String(index + 1).padStart(2, "0")}
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
              </div>
            ))}
          </div>
        </section>

        <section
          id="mistakes"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            MISTAKES
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            初心者がやりがちな4つのスキンケア失敗
          </h2>

          <div className="mt-7 grid gap-4">
            {mistakes.map((mistake, index) => (
              <div
                key={mistake.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {index + 1}
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
              </div>
            ))}
          </div>
        </section>

        <section
          id="timing"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            ROUTINE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            スキンケアはいつ・どのくらい続ければいい？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              基本的には、朝と夜の生活の中にスキンケアを組み込むと習慣にしやすくなります。朝は肌を整えて保湿し、外出する日は日焼け止めまで。夜は一日の汚れを落とした後に保湿する、という流れです。
            </p>

            <p className="mt-5">
              肌の見え方は、睡眠・食生活・季節・体調などにも左右されます。数日で大きな変化を求めるのではなく、まずは基本のケアを無理なく続けることを意識しましょう。
            </p>

            <p className="mt-5">
              また、ニキビや赤み、かゆみなどの肌トラブルが続く場合は、スキンケアだけで改善しようとせず皮膚科などの医療機関へ相談してください。
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
            メンズスキンケアについてよくある質問
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
            メンズスキンケアは基本3ステップから始めよう
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              スキンケア初心者は、最初から多くの化粧品を揃える必要はありません。まずは「洗顔・保湿・紫外線対策」の3つを基本にして、毎日の習慣を作りましょう。
            </p>

            <p className="mt-5">
              肌の状態には個人差があるため、ベタつきや乾燥などを確認しながら、自分が無理なく使い続けられるアイテムを選ぶことも大切です。
            </p>

            <p className="mt-5">
              肌だけでなく、髪型や眉毛なども含めて何から変えるべきか迷っている場合は、顔全体の印象から優先順位を整理してみましょう。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-order"
              title="メンズが垢抜ける順番を見る"
              description="髪型・眉毛・肌など、初心者が取り組みたい順番を7ステップで解説。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-beauty-beginner"
              title="メンズ美容の始め方を見る"
              description="美容初心者向けに、髪型・眉毛・肌・ヒゲなど何から始めるかを解説。"
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