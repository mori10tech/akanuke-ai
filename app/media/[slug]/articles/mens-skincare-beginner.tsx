import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  { id: "skin-check", label: "まず自分の肌の傾向を確認する" },
  { id: "basics", label: "基本は「洗う・潤す・守る」の3つ" },
  { id: "routine", label: "朝と夜の手順（ひげ剃りの順番）" },
  { id: "wash", label: "肌に負担をかけない洗顔のやり方" },
  { id: "choose", label: "商品の選び方" },
  { id: "start", label: "新しい商品を使い始めるときの注意" },
  { id: "doctor", label: "皮膚科に相談したほうがいいサイン" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const skinChecks = [
  {
    title: "全体がつっぱる・粉をふく",
    result: "乾燥しやすい傾向",
    advice:
      "保湿を重視し、洗浄力の強すぎる洗顔料は避けます。乳液やクリームなど、うるおいを保つものを組み合わせましょう。",
  },
  {
    title: "全体がテカる・ベタつく",
    result: "皮脂が出やすい傾向",
    advice:
      "洗いすぎに注意しながら、さっぱりした使用感の保湿剤を選びます。テカリが気になっても、保湿は省かないようにしましょう。",
  },
  {
    title: "額や鼻はテカり、頬はつっぱる",
    result: "部位によって違う傾向",
    advice:
      "顔全体を同じように扱わず、乾燥する頬には保湿を重ね、テカる部分は薄めにするなど、塗る量で調整します。",
  },
  {
    title: "特に気になることがない",
    result: "大きな偏りが少ない傾向",
    advice:
      "基本の3ステップをそのまま続けます。季節によって状態が変わるため、ときどき同じ方法で確認しましょう。",
  },
];

const skincareSteps = [
  {
    number: "01",
    title: "洗う｜洗顔",
    description:
      "肌表面の余分な皮脂や汚れを落とします。強くこすらず、泡で包むようにやさしく洗い、ぬるま湯で十分にすすぎます。",
    point:
      "皮脂が気になるからといって、1日に何度も洗う必要はありません。",
  },
  {
    number: "02",
    title: "潤す｜保湿",
    description:
      "洗顔後の肌は乾燥しやすいため、化粧水で水分を補い、乳液やクリームでうるおいを保ちます。1本で済むオールインワンタイプから始めても構いません。",
    point:
      "高価な商品を何種類もそろえるより、毎日続けられることを優先しましょう。",
  },
  {
    number: "03",
    title: "守る｜日焼け止め",
    description:
      "紫外線は季節や天候にかかわらず届くため、外出する日は日焼け止めを使います。使用感が軽いものを選ぶと、毎日続けやすくなります。",
    point:
      "長時間外にいる日は、製品の表示に従って塗り直しましょう。",
  },
];

const washSteps = [
  "手を洗ってから、顔をぬるま湯で軽くぬらす",
  "洗顔料を手やネットでよく泡立てる",
  "皮脂の出やすい額と鼻から泡をのせ、頬や口周りは最後に",
  "指が肌に直接触れないよう、泡を転がすように洗う",
  "ぬるま湯で十分にすすぐ。髪の生え際やあご下は特にすすぎ残しやすい",
  "タオルでこすらず、押し当てるように水分を取る",
];

const chooseTips = [
  {
    title: "使用感の表示を見る",
    description:
      "「さっぱり」「しっとり」などの表示は、選ぶときの大きな手がかりです。皮脂が出やすい人はさっぱり、乾燥しやすい人はしっとりから試すと選びやすくなります。",
  },
  {
    title: "メンズ用にこだわらない",
    description:
      "メンズ用である必要はありません。性別の表示より、自分の肌の傾向と使用感、続けやすさを基準に選びましょう。",
  },
  {
    title: "日焼け止めは生活に合わせて選ぶ",
    description:
      "SPFは肌が赤くなる日焼けの原因になる紫外線（UV-B）、PAは肌が黒くなる原因になる紫外線（UV-A）を防ぐ効果の目安です。数値が高いほどよいわけではなく、日本化粧品工業連合会は、通勤や買い物などの日常生活と、屋外でのレジャーなど、生活の場面に合わせて選ぶことをすすめています。",
  },
  {
    title: "まずは少ない数で始める",
    description:
      "美容液やパックは、基本の3ステップが習慣になってからで十分です。最初から増やすと、肌に合わないものがあったときに原因を判断しにくくなります。",
  },
];

const doctorSigns = [
  "ニキビが繰り返しできる、または痛みや腫れがある",
  "赤み・かゆみ・ひりつきが続いている",
  "肌荒れやニキビが、スキンケアを見直して2週間ほどたっても良くならない、または悪化している",
  "ニキビ跡やシミなど、化粧品だけでは対処が難しい悩みがある",
];

const faqs = [
  {
    question: "メンズスキンケアは何をそろえればいいですか？",
    answer:
      "洗顔料、保湿剤（化粧水と乳液、またはオールインワン）、日焼け止めの3つから始めれば十分です。慣れてから、必要に応じて追加しましょう。",
  },
  {
    question: "ひげ剃りとスキンケアはどちらが先ですか？",
    answer:
      "洗顔の後にひげを剃り、その後に保湿するのがおすすめです。洗顔でひげがやわらかくなり、剃った後の肌を保湿で整えられます。",
  },
  {
    question: "朝も洗顔料を使った方がいいですか？",
    answer:
      "肌の状態によって違います。朝の皮脂やベタつきが気になる場合は洗顔料を使い、乾燥しやすい場合はぬるま湯だけで洗う方法もあります。肌の様子を見ながら調整しましょう。",
  },
  {
    question: "どのくらい続ければ効果が分かりますか？",
    answer:
      "肌の状態は、睡眠・食生活・季節などにも左右されるため、数日で判断するのは難しいものです。まずは同じ商品を2週間ほど続け、肌の調子を確認しましょう。",
  },
  {
    question: "ニキビがある場合も同じスキンケアでいいですか？",
    answer:
      "基本のケアは同じですが、繰り返すニキビや、痛み・腫れがあるニキビは皮膚科への相談をおすすめします。自分でつぶしたり、強くこすったりするのは避けましょう。",
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
            「スキンケアを始めたいけれど、何を買えばいいか分からない」「とりあえず買った化粧水が合っているのか分からない」という男性は少なくありません。
          </p>

          <p className="mt-5">
            スキンケアで迷う原因の多くは、自分の肌の傾向を知らないまま商品を選んでいることです。最初に自分の肌を確認しておけば、選ぶべき商品や使い方が分かりやすくなります。
          </p>

          <p className="mt-5">
            この記事では、自宅でできる肌の傾向の確認方法から、基本の3ステップ、ひげ剃りを含めた朝と夜の手順、洗顔のやり方、商品の選び方、皮膚科に相談したほうがいいサインまでを解説します。
          </p>
        </section>

        <section
          id="skin-check"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SKIN CHECK
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            まず自分の肌の傾向を確認する
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              洗顔をした後、化粧水などを何もつけずに15分ほど過ごし、鏡で顔を見てみましょう。どこがつっぱるか、どこがテカるかで、自分の肌の傾向が分かります。
            </p>

            <p className="mt-5">
              肌の状態は季節や体調でも変わるため、これは診断ではなく、商品を選ぶための目安です。
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {skinChecks.map((check) => (
              <div
                key={check.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[14px] font-bold">
                  {check.title}
                </h3>

                <p className="mt-2 text-[12px] font-bold text-[#1677FF]">
                  {check.result}
                </p>

                <p className="mt-2 text-[12px] leading-6 text-black/75">
                  {check.advice}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] leading-6 text-black/60">
            ※赤み・かゆみ・ニキビなどが目立つ場合は、この確認より先に、この記事の最後にある「皮膚科に相談したほうがいいサイン」を確認してください。
          </p>
        </section>

        <section
          id="basics"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            3 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            基本は「洗う・潤す・守る」の3つ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            肌の傾向にかかわらず、最初はこの3つで十分です。慣れてきたら、肌の状態に合わせて調整します。
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

        <section id="routine" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">DAILY ROUTINE</p>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">朝と夜の手順（ひげ剃りの順番）</h2>
          <p className="mt-4 text-[13px] leading-7 text-black/75">男性の場合は、ひげ剃りをどこに入れるかがポイントです。洗顔でひげをやわらかくしてから剃り、剃った後の肌は保湿で整えます。</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5">
              <h3 className="text-[16px] font-bold">朝｜外出前</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-[13px] leading-7 text-black/75">
                <li>洗顔する。乾燥しやすい人は、ぬるま湯だけでも構わない</li>
                <li>ひげを剃る</li>
                <li>化粧水・乳液などで保湿する</li>
                <li>外出する日は日焼け止めを塗る</li>
              </ol>
            </div>
            <div className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5">
              <h3 className="text-[16px] font-bold">夜｜入浴時から就寝前</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-[13px] leading-7 text-black/75">
                <li>日焼け止めの落とし方を製品の表示で確認し、必要ならクレンジングを使う</li>
                <li>洗顔料で洗い、すすぎ残しがないようにする</li>
                <li>入浴後は、肌が乾燥する前に保湿する</li>
              </ol>
            </div>
          </div>
          <div className="mt-4 rounded-[18px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5 text-[12px] leading-7 text-black/75">
            <p className="font-bold text-[#1677FF]">続けるための工夫</p>
            <p className="mt-2">洗顔料と保湿剤を洗面所の目に入る場所に並べる、歯みがきの後に保湿する、と決めておくなど、すでにある習慣とセットにすると忘れにくくなります。</p>
          </div>
        </section>

        <section
          id="wash"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO WASH
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            肌に負担をかけない洗顔のやり方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            洗顔は毎日のことなので、洗い方の違いが肌の調子に影響しやすい部分です。次の手順で洗ってみましょう。
          </p>

          <ol className="mt-7 space-y-3">
            {washSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-[14px] border border-black/10 bg-white px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                  {index + 1}
                </span>

                <p className="text-[12px] font-bold leading-6 text-black/65">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-[12px] leading-6 text-black/60">
            ※熱いお湯は肌のうるおいまで落としやすいため、ぬるま湯を使いましょう。
          </p>
        </section>

        <section
          id="choose"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO CHOOSE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            商品の選び方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            最初に確認した肌の傾向をもとに、次の点を見ながら選びましょう。
          </p>

          <div className="mt-8 space-y-4">
            {chooseTips.map((tip, index) => (
              <div
                key={tip.title}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#111111] text-[11px] font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold tracking-[-0.03em]">
                      {tip.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="start"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FIRST USE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            新しい商品を使い始めるときの注意
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              新しい商品は、一度に複数を使い始めず、1つずつ追加します。同時に始めると、肌に合わないものがあったときに、どれが原因か分からなくなるためです。
            </p>

            <p className="mt-5">
              肌が敏感な人は、製品の注意表示に従い、腕の内側など目立たない場所に少量を塗って様子を見てから使う方法もあります。
            </p>

            <p className="mt-5">
              使い始めたら、問題がなければ同じ商品を2週間ほど続け、肌の調子を確認します。使用中に赤み・かゆみ・ひりつきが出た場合は、すぐに使用を中止してください。
            </p>
          </div>
        </section>

        <section
          id="doctor"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SEE A DOCTOR
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            皮膚科に相談したほうがいいサイン
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            スキンケアは肌を健やかに保つためのもので、病気を治すものではありません。次のような場合は、化粧品で解決しようとせず、皮膚科に相談しましょう。
          </p>

          <div className="mt-7 rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6">
            <ul className="space-y-3 text-[13px] leading-7 text-black/75">
              {doctorSigns.map((sign) => (
                <li key={sign}>□ {sign}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-beard-grooming"
              title="メンズのヒゲの整え方"
              description="ひげ剃りの方法や、肌に負担をかけにくい剃り方を確認できます。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-akanuke-order"
              title="メンズが垢抜ける順番"
              description="スキンケアと並行して進めたい、髪型や眉の整え方の順番を確認できます。"
            />
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            肌の傾向を知ってから、基本の3ステップを続ける
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              スキンケアは、最初に自分の肌の傾向を確認してから始めると、商品選びで迷いにくくなります。そのうえで「洗う・潤す・守る」の3ステップを、朝はひげ剃りを含めた順番で続けましょう。
            </p>

            <p className="mt-5">
              新しい商品は1つずつ追加し、2週間ほど様子を見ます。肌の悩みが続く場合や悪化する場合は、化粧品だけで解決しようとせず、皮膚科に相談してください。
            </p>
          </div>

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}