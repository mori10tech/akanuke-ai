import Image from "next/image";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensSunscreenArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "why", label: "男性こそ日焼け止めが必要な理由" },
  { id: "choose", label: "日焼け止めの選び方" },
  { id: "amount", label: "量が足りないと効果が出ない" },
  { id: "steps", label: "顔に塗る基本の5ステップ" },
  { id: "missed", label: "塗り忘れやすい場所" },
  { id: "reapply", label: "塗り直しの方法" },
  { id: "remove", label: "落とし方" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const reasons = [
  {
    title: "屋外にいる時間が長くなりやすい",
    description:
      "通勤や外回り、屋外でのスポーツなど、日中に外を歩く時間は意外と長いものです。短い時間でも、毎日積み重なると紫外線を浴びる量は多くなります。",
  },
  {
    title: "日焼けはシミや肌の老化の原因になる",
    description:
      "紫外線は、日焼けで肌が赤くなるだけでなく、シミやしわなど、肌の見た目が老けて見える原因の一つになります。若いうちから対策しておくと、将来の肌の差につながります。",
  },
  {
    title: "夏以外も紫外線は届いている",
    description:
      "紫外線は、季節や天気にかかわらず届いています。くもりの日や冬でも、外に出る日は日焼け止めを使う習慣をつけておきましょう。",
  },
];

const types = [
  {
    name: "ジェル・ミルクタイプ",
    feature: "伸びがよく、顔全体にムラなく塗りやすい",
    suited: "初めて使う人、毎朝の習慣にしたい人",
  },
  {
    name: "クリームタイプ",
    feature: "しっとりとした使用感で、落ちにくいものが多い",
    suited: "乾燥しやすい人、屋外で長く過ごす日",
  },
  {
    name: "スティックタイプ",
    feature: "手を汚さずに、気になる部分に直接塗れる",
    suited: "外出先での塗り直し",
  },
  {
    name: "スプレータイプ",
    feature: "髪や首の後ろなど、手が届きにくい部分にも使いやすい",
    suited: "塗り直し、体や髪への使用",
  },
];

const steps = [
  {
    number: "01",
    title: "スキンケアで肌を整える",
    description:
      "洗顔・保湿をして、肌を整えてから塗ります。保湿剤がベタついている状態で塗るとムラになりやすいため、少し時間を置いてなじませましょう。",
    point:
      "ひげを剃る日は、ひげ剃りと保湿を済ませてから塗ります。",
  },
  {
    number: "02",
    title: "製品の表示どおりの量を手に取る",
    description:
      "パッケージに書かれている使用量を確認し、その量を手に取ります。少なく感じても、表示の量を使うことが大切です。",
    point:
      "一度に塗りにくい場合は、半分ずつ2回に分けて塗ります。",
  },
  {
    number: "03",
    title: "額・両頬・鼻・あごの5か所に置く",
    description:
      "手に取った日焼け止めを、額・両頬・鼻・あごの5か所に分けて置きます。最初から一か所に塗り広げると、端のほうが薄くなりやすくなります。",
    point:
      "頬骨や鼻の頭など、高くなっている部分は日焼けしやすいため、多めに置きます。",
  },
  {
    number: "04",
    title: "内側から外側へ、ムラなく伸ばす",
    description:
      "指の腹で、顔の中心から外側に向かって伸ばします。生え際やフェイスラインまで、すき間ができないように広げましょう。",
    point:
      "強くこすらず、肌の上をすべらせるように伸ばします。",
  },
  {
    number: "05",
    title: "耳と首まで塗る",
    description:
      "顔に塗り終わったら、指に残った分に少し足して、耳と首、首の後ろにも塗ります。顔だけ塗って首を忘れると、顔と首の色に差が出る原因になります。",
    point:
      "外出の直前ではなく、少し時間に余裕をもって塗っておくと安心です。",
  },
];

const missedAreas = [
  {
    title: "耳",
    description:
      "顔の横にあり、真上から日光が当たりやすいのに、塗り忘れが多い場所です。耳の表側だけでなく、耳たぶまで塗りましょう。",
  },
  {
    title: "首と首の後ろ",
    description:
      "短い髪型の男性は、首の後ろが日光に当たりやすくなります。シャツの襟より上は、すべて塗るつもりで広げましょう。",
  },
  {
    title: "髪の生え際",
    description:
      "髪に付くのを避けて、生え際の手前で止めてしまいがちです。生え際ぎりぎりまで、指先で丁寧に塗ります。",
  },
  {
    title: "鼻の頭と頬骨",
    description:
      "顔の中で高くなっている部分は、日光が当たりやすく、日焼けしやすい場所です。重ねて塗っておきましょう。",
  },
];

const faqs = [
  {
    question: "毎日日焼け止めを塗ったほうがいいですか？",
    answer:
      "外に出る日は、季節や天気にかかわらず塗るのがおすすめです。短い外出でも毎日積み重なると、紫外線を浴びる量は多くなります。ほとんど外に出ない日は、無理に塗らなくても構いません。",
  },
  {
    question: "SPFとPAは高いほどいいですか？",
    answer:
      "高ければよいわけではありません。通勤や買い物などの日常生活と、屋外でのスポーツやレジャーなど、過ごし方に合わせて選びましょう。数値が高い製品は、肌への負担を感じる人もいます。",
  },
  {
    question: "日焼け止めを塗ると白くなります",
    answer:
      "白くなりにくい製品を選ぶか、5か所に置いてから伸ばす方法で、ムラなく薄く広げてみましょう。それでも白くなる場合は、色付きの日焼け止めを試すのも一つの方法です。",
  },
  {
    question: "ヒゲが生えている部分にも塗れますか？",
    answer:
      "塗れます。ヒゲの部分は日焼け止めが均一に広がりにくいため、指先で軽くたたくようになじませましょう。ヒゲを剃る日は、剃った後の肌を保湿してから塗ります。",
  },
  {
    question: "日焼け止めで肌が荒れた場合はどうすればいいですか？",
    answer:
      "赤み・かゆみ・ひりつきが出た場合は、すぐに使用を中止してください。症状が続く場合は、皮膚科に相談しましょう。肌が敏感な人は、製品の注意表示に従って、腕の内側などで試してから使う方法もあります。",
  },
];

export default function MensSunscreenArticle({
  article,
}: MensSunscreenArticleProps) {
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
            「日焼け止めは塗っているのに、なぜか日焼けしている」「塗ると顔が白くなるから使いたくない」と感じていませんか？
          </p>

          <p className="mt-5">
            日焼け止めの効果が出ない原因の多くは、量が足りないこと、塗り忘れている場所があること、塗り直しをしていないことです。どれだけ数値の高い製品を選んでも、使い方が合っていなければ、表示どおりの効果は得られません。
          </p>

          <p className="mt-5">
            この記事では、男性が日焼け止めを使うべき理由と、製品の選び方、量の考え方、顔に塗る5つのステップ、塗り忘れやすい場所、塗り直しと落とし方を解説します。
          </p>
        </section>

        <section
          id="why"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WHY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            男性こそ日焼け止めが必要な理由
          </h2>

          <div className="mt-7 space-y-3">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  REASON {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {reason.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="choose"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO CHOOSE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            日焼け止めの選び方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              SPFは、肌が赤くなる日焼けの原因になる紫外線（UV-B）を、PAは、肌が黒くなる原因になる紫外線（UV-A）を防ぐ効果の目安です。数値が高いほど効果は強くなりますが、高ければよいというわけではありません。
            </p>

            <p className="mt-5">
              日本化粧品工業連合会は、通勤や買い物などの日常生活か、屋外でのスポーツやレジャーかといった、生活の場面に合わせて選ぶことをすすめています。毎日の通勤用と、屋外で長く過ごす日用で使い分けるのも一つの方法です。
            </p>
          </div>

          <h3 className="mt-9 text-[17px] font-bold">タイプ別の特徴</h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {types.map((type) => (
              <div
                key={type.name}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h4 className="text-[15px] font-black">
                  {type.name}
                </h4>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {type.feature}
                </p>

                <p className="mt-2 text-[12px] font-bold leading-6 text-[#1677FF]">
                  向いている場面：{type.suited}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="amount"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            AMOUNT
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            量が足りないと、表示どおりの効果は出ない
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              パッケージに書かれているSPFやPAの数値は、決められた量を肌に塗った状態で測定されたものです。多くの人が普段使っている量は、この量より少ないといわれています。量が少ないと、数値どおりの効果は得られません。
            </p>

            <p className="mt-5">
              まずは製品に書かれている使用量を確認し、その量を使いましょう。「少し多いかな」と感じるくらいが、実際には適量に近いことがほとんどです。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              白くなるのが気になる場合
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              量を減らすのではなく、白くなりにくい製品を選ぶか、半分ずつ2回に分けて薄く重ねるようにしましょう。量を減らすと、白くなりにくくなる代わりに、効果も弱くなります。
            </p>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            5 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            顔に塗る基本の5ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            ポイントは、5か所に分けて置いてから伸ばすことです。ムラと塗り残しを防げます。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-sunscreen/mens-sunscreen-five-points.webp"
              alt="日焼け止めを額・両頬・鼻・あごの5か所に置いた男性の顔"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              額・両頬・鼻・あごの5か所に分けて置いてから、内側から外側へ伸ばします。
            </figcaption>
          </figure>

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
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="missed"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CHECK
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            塗り忘れやすい4つの場所
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            顔の正面はきちんと塗れていても、次の場所は塗り忘れが多く、そこだけ日焼けしてしまいがちです。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-sunscreen/mens-sunscreen-missed-areas.webp"
              alt="日焼け止めを塗り忘れやすい鼻・頬骨、髪の生え際、耳、首の後ろを示した画像"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              鼻・頬骨、髪の生え際、耳、首の後ろは、塗り忘れやすい場所です。
            </figcaption>
          </figure>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {missedAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {area.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="reapply"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            REAPPLY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            塗り直しの方法
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              日焼け止めは、汗や皮脂、手でさわったときの摩擦などで、時間とともに少しずつ落ちていきます。屋外で長く過ごす日は、2〜3時間を目安に塗り直しましょう。汗をたくさんかいたり、タオルで顔をふいたりした後も、塗り直すタイミングです。
            </p>

            <p className="mt-5">
              塗り直す前に、ティッシュで汗や皮脂を軽く押さえておくと、ムラになりにくくなります。外出先では、手を汚さずに塗れるスティックタイプや、スプレータイプが便利です。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="日焼け止めの前に行う、洗顔と保湿の基本を解説しています。"
            />
          </div>
        </section>

        <section
          id="remove"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            REMOVE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            日焼け止めの落とし方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              日焼け止めを使った日は、夜に必ず落とします。洗顔料だけで落とせる製品もあれば、クレンジングが必要な製品もあるため、パッケージの表示を確認しましょう。
            </p>

            <p className="mt-5">
              特に、汗や水に強いウォータープルーフタイプは、洗顔料だけでは落ちにくいことがあります。耳や首など、日焼け止めを塗った場所も忘れずに洗いましょう。
            </p>
          </div>
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
            日焼け止めについてよくある質問
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
            日焼け止めは、量と塗り直しで効果が決まる
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              日焼け止めは、生活の場面に合ったSPFとPAの製品を選び、製品の表示どおりの量を使うことが大切です。額・両頬・鼻・あごの5か所に置いてから伸ばし、耳や首、首の後ろまで塗りましょう。
            </p>

            <p className="mt-5">
              屋外で長く過ごす日は、2〜3時間を目安に塗り直し、使った日は夜に製品に合った方法で落とします。外に出る日は季節を問わず塗る習慣をつけることが、将来の肌の差につながります。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-toner-emulsion"
            secondaryLabel="化粧水と乳液の違いを見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}