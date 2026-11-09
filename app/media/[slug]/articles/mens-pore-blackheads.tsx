import Link from "next/link";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensPoreBlackheadsArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "causes", label: "鼻の毛穴が黒く見える3つの原因" },
  { id: "ng", label: "黒ずみを悪化させるNGケア" },
  { id: "steps", label: "毎日の毛穴ケア4ステップ" },
  { id: "weekly", label: "週1回のスペシャルケア" },
  { id: "cover", label: "すぐに目立たなくしたいとき" },
  { id: "doctor", label: "皮膚科に相談したほうがいいサイン" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const causes = [
  {
    title: "角栓",
    description:
      "角栓は、毛穴の中で皮脂と古い角質が混ざって固まったものです。コーセーによると、角栓の約7割はたんぱく質でできています。皮脂の多い鼻やあごのTゾーンにできやすく、毛穴の入り口で目立つと、黒い点のように見えます。",
  },
  {
    title: "毛穴に詰まった産毛",
    description:
      "資生堂によると、角栓がふたになって、毛穴から出られなくなった産毛が詰まり、黒く見えることもあります。角栓が大きくなると毛穴が広がり、黒ずみがさらに目立ちやすくなります。",
  },
  {
    title: "刺激による色素沈着",
    description:
      "毛穴の周りを何度も触ったり、こすったりすると、炎症が起きて、肌の色が茶色っぽく残ることがあります。この場合、角栓を取っても黒ずみは消えません。",
  },
];

const ngCares = [
  {
    title: "指や爪で押し出す",
    description:
      "角栓を無理に押し出すと、毛穴の周りが傷ついて炎症が起き、かえって黒ずみや赤みの原因になります。気になっても、触らないことが第一です。",
  },
  {
    title: "ゴシゴシこすって洗う",
    description:
      "強くこすっても角栓は取れず、肌を傷つけるだけです。摩擦による刺激は、色素沈着の原因にもなります。",
  },
  {
    title: "はがすタイプのパックを頻繁に使う",
    description:
      "角栓をはがすパックは、使いすぎると肌への負担が大きくなります。コーセーは、使う場合も多くて週1回までとし、毛穴の周りが皮むけしているならやりすぎだとしています。",
  },
  {
    title: "鼻の産毛を剃る",
    description:
      "資生堂は、鼻の産毛を剃ることを避けるよう呼びかけています。剃ると肌に負担がかかるうえ、毛穴の黒ずみの根本的な対策にはなりません。",
  },
];

const steps = [
  {
    number: "01",
    title: "ぬるま湯で顔を温める",
    description:
      "洗顔の前に、ぬるま湯で顔を濡らすか、蒸しタオルを30秒〜1分ほど当てて、肌を温めます。角栓がやわらかくなり、汚れが落ちやすくなります。入浴中に洗顔するのも効果的です。",
    point:
      "熱いお湯は肌を乾燥させるため、ぬるま湯を使います。",
  },
  {
    number: "02",
    title: "洗顔料をしっかり泡立てて、泡で洗う",
    description:
      "洗顔料をしっかり泡立て、皮脂の多い額と鼻から泡をのせます。小鼻の横やあご先は、指先で小さく円を描くように、泡を転がして洗います。洗う時間は20〜30秒ほどが目安です。",
    point:
      "指が肌に直接こすれないよう、泡をクッションにします。",
  },
  {
    number: "03",
    title: "すすぎ残しがないように流す",
    description:
      "小鼻の横、生え際、あごの下は、泡が残りやすい場所です。ぬるま湯で十分にすすぎ、洗い残しがないようにします。",
    point:
      "タオルは押し当てるようにして水分を取り、こすらないようにします。",
  },
  {
    number: "04",
    title: "すぐに保湿する",
    description:
      "洗顔後の肌は乾燥しやすく、乾燥すると古い角質がたまりやすくなります。化粧水で水分を補い、乳液などで保湿します。黒ずみが気になる鼻にも、忘れずになじませます。",
    point:
      "鼻がテカりやすい人は、さっぱりした使用感の保湿剤を少量にします。",
  },
];

const faqs = [
  {
    question: "毛穴の黒ずみは、何日で消えますか？",
    answer:
      "角栓は毎日少しずつ作られるため、一度で消すことはできません。正しい洗顔と保湿を続けながら、数週間単位で様子を見ましょう。刺激による色素沈着が原因の場合は、さらに時間がかかります。",
  },
  {
    question: "毛穴パックは使わないほうがいいですか？",
    answer:
      "絶対に使えないわけではありませんが、使いすぎは肌の負担になります。使う場合は製品の使用方法を守り、多くても週1回程度にとどめましょう。毛穴の周りが赤くなったり、皮がむけたりする場合は、使用をやめてください。",
  },
  {
    question: "洗顔の回数を増やせば、黒ずみは減りますか？",
    answer:
      "洗顔料を使った洗顔は、朝と夜の2回で十分です。回数を増やすと、肌の乾燥を招き、かえって古い角質がたまりやすくなることがあります。",
  },
  {
    question: "クレンジングは必要ですか？",
    answer:
      "日焼け止めやBBクリームを使っている日は、製品の表示に合わせてクレンジングを使います。何も塗っていない日は、洗顔料だけで構いません。",
  },
  {
    question: "毛穴の開きと黒ずみは、同じものですか？",
    answer:
      "原因が異なることがあります。黒ずみは角栓や産毛、色素沈着によるもの、開きは皮脂の量や肌のハリの低下などが関係しているといわれています。まずは、黒い点のように見えるのか、毛穴の形そのものが目立つのかを確認しましょう。",
  },
];

export default function MensPoreBlackheadsArticle({
  article,
}: MensPoreBlackheadsArticleProps) {
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
            「鼻の毛穴が黒いブツブツで目立つ」「パックで取っても、すぐに元に戻る」と悩んでいませんか？
          </p>

          <p className="mt-5">
            鼻の毛穴の黒ずみは、無理に取ろうとすると、かえって悪化しやすい肌悩みです。大切なのは、黒ずみの原因を知り、毎日の洗顔と保湿で、角栓がたまりにくい状態を保つことです。
          </p>

          <p className="mt-5">
            この記事では、鼻の毛穴が黒く見える原因と、悪化させるNGケア、毎日の毛穴ケア4ステップ、週1回のスペシャルケア、すぐに目立たなくしたいときの方法を解説します。
          </p>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              AKANUKE.AIの診断データより
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              AKANUKE.AIのAI診断の結果を集計したところ、毛穴・洗顔ケアが35.3%、皮脂・テカリ対策が61.8%の診断で必要と判定されました。どちらも、毎日の洗顔の見直しから始められる課題です。
            </p>

            <Link
              href="/media/mens-akanuke-diagnosis-data"
              className="mt-3 inline-block text-[12px] font-bold text-[#1677FF] transition hover:opacity-70"
            >
              診断データの記事を見る →
            </Link>
          </div>
        </section>

        <section
          id="causes"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CAUSES
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            鼻の毛穴が黒く見える3つの原因
          </h2>

          <div className="mt-7 space-y-3">
            {causes.map((cause, index) => (
              <div
                key={cause.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  CAUSE {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {cause.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {cause.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[13px] font-medium leading-7 text-black/70">
            黒ずみが、触るとザラッとする場合は角栓、細い毛のように見える場合は産毛、平らで茶色っぽい場合は色素沈着の可能性があります。
          </p>

          <div className="mt-5 space-y-1 text-[11px] font-medium leading-6 text-black/50">
            <p>
              参考：
              <a
                href="https://maison.kose.co.jp/article/g/gskincare-20191101/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition hover:text-[#1677FF]"
              >
                コーセー「毛穴の黒ずみの原因は？無理やり取るのはNG ! 正しいケア方法」
              </a>
            </p>

            <p>
              参考：
              <a
                href="https://www.shiseido.co.jp/sw/beautyinfo/DB006571/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition hover:text-[#1677FF]"
              >
                資生堂「鼻・小鼻の毛穴の黒ずみの正体は『汚れ』と『産毛』も!?」
              </a>
            </p>
          </div>
        </section>

        <section
          id="ng"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NG CARE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            黒ずみを悪化させるNGケア
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            黒ずみを早く取りたいと思うほど、次のようなケアをしてしまいがちです。どれも、一時的にきれいになったように見えても、肌を傷つけて黒ずみを長引かせる原因になります。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {ngCares.map((care) => (
              <div
                key={care.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[15px] font-black">
                  {care.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {care.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            4 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            毎日の毛穴ケア4ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            毛穴の黒ずみ対策の基本は、特別なアイテムではなく、毎日の洗顔と保湿です。朝と夜、次の順番で行いましょう。
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

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="肌の傾向の確認方法と、朝晩の手順を解説しています。"
            />
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="weekly"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WEEKLY CARE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            週1回のスペシャルケア
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              毎日のケアに慣れてきたら、古い角質を落とすケアを、週1回程度取り入れる方法もあります。たとえば、酵素洗顔料や、ふき取り化粧水をコットンでやさしくなじませるケアです。
            </p>

            <p className="mt-5">
              どちらも、使用頻度や使い方は製品の表示に従います。肌が赤くなる、ヒリヒリするといった場合は、すぐに使用をやめましょう。毎日行うと、肌の負担になることがあります。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              新しいアイテムは、まず1つだけ
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              いくつものアイテムを同時に使い始めると、肌に合わなかったときに原因が分からなくなります。まずは毎日の洗顔と保湿を整え、追加するアイテムは1つずつにしましょう。
            </p>
          </div>
        </section>

        <section
          id="cover"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COVER
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            すぐに目立たなくしたいとき
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              毛穴のケアは、すぐに結果が出るものではありません。大事な予定や写真を撮る日には、BBクリームを鼻の周りに薄く重ねると、毛穴の黒ずみや凹凸が目立ちにくくなります。
            </p>

            <p className="mt-5">
              塗るときは、こすらず、指先で軽くたたくようになじませます。使った日は、夜に必ず落としましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-bb-cream"
              title="メンズBBクリームの使い方を見る"
              description="自然に見える量と塗り方、落とし方を解説しています。"
            />
          </div>
        </section>

        <section
          id="doctor"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DERMATOLOGY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            皮膚科に相談したほうがいいサイン
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            毛穴の黒ずみそのものは病気ではありませんが、次のような場合は、セルフケアを続けるより皮膚科に相談しましょう。
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-[13px] leading-7 text-black/75">
            <li>毛穴が赤く腫れている、痛みがある、膿がたまっている</li>
            <li>ニキビが繰り返しできる、数が増えている</li>
            <li>ケアを変えた後に、赤みやかゆみ、皮むけが続いている</li>
          </ul>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
            肌だけでなく、
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            毛穴の黒ずみについてよくある質問
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
            毛穴の黒ずみは、取るより「ためない」
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              鼻の毛穴の黒ずみは、角栓、毛穴に詰まった産毛、刺激による色素沈着が主な原因です。指で押し出す、ゴシゴシこする、パックを頻繁に使う、産毛を剃るといったケアは、かえって黒ずみを長引かせます。
            </p>

            <p className="mt-5">
              肌を温めてから泡で洗い、すすぎ残しをなくし、すぐに保湿する。この毎日のケアを続けることが、角栓をためないための基本です。赤みや痛みを伴う場合は、皮膚科に相談しましょう。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-oily-skin"
            secondaryLabel="テカリを抑える方法を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}
