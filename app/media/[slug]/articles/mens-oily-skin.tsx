import Image from "next/image";
import Link from "next/link";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensOilySkinArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "why", label: "男性の顔がテカりやすい理由" },
  { id: "morning", label: "朝の対策4ステップ" },
  { id: "daytime", label: "日中のテカリの直し方" },
  { id: "ng", label: "テカリを悪化させやすいNG習慣" },
  { id: "items", label: "テカリ対策のアイテムの選び方" },
  { id: "doctor", label: "皮膚科に相談したほうがいいサイン" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const reasons = [
  {
    title: "男性は皮脂の量が多い傾向がある",
    description:
      "資生堂が2020年に発表した研究では、20〜30代の男性は、女性に比べて毛穴が多く、皮脂の量が多い傾向にあると報告されています。テカリやすいのは、ケア不足だけが原因ではありません。",
  },
  {
    title: "Tゾーンは皮脂が出やすい",
    description:
      "額から鼻にかけてのTゾーンは、顔の中でも皮脂が出やすい場所です。頬はテカらないのに、額と鼻だけがテカるのはこのためです。",
  },
  {
    title: "気温が高い日や汗をかいた日は目立ちやすい",
    description:
      "暑い日や体を動かした日は、皮脂と汗が混ざって、顔がより光って見えます。夏場や外回りの多い日は、日中の対策が特に大切になります。",
  },
];

const morningSteps = [
  {
    number: "01",
    title: "洗顔料を泡立てて、Tゾーンから洗う",
    description:
      "洗顔料をしっかり泡立て、皮脂の多い額と鼻から泡をのせます。手で肌をこするのではなく、泡を転がすように洗い、ぬるま湯で生え際やあごの下まで丁寧にすすぎます。",
    point:
      "熱いお湯は肌を乾燥させやすいため、ぬるま湯を使います。",
  },
  {
    number: "02",
    title: "さっぱりした保湿剤を少量なじませる",
    description:
      "テカるからといって保湿を省くと、肌がつっぱったり、乾燥によるヒリつきを感じたりすることがあります。ジェルタイプなど、さっぱりした使用感の保湿剤を選び、顔全体に薄くなじませます。",
    point:
      "Tゾーンは薄めに、乾燥しやすい頬や口元はしっかりと、量を調整します。",
  },
  {
    number: "03",
    title: "日焼け止めを塗る",
    description:
      "日焼け止めは、テカリ対策と並んで毎朝の基本です。皮脂でテカりやすい人は、さらっとした仕上がりのジェルタイプやミルクタイプを選ぶと、ベタつきを感じにくくなります。",
    point:
      "保湿剤がなじんでから塗ると、ムラになりにくくなります。",
  },
  {
    number: "04",
    title: "気になる人はTゾーンにだけパウダーを",
    description:
      "どうしてもテカりやすい人は、皮脂を吸着するタイプのフェイスパウダーを、額と鼻にだけ薄くのせます。顔全体に付ける必要はありません。",
    point:
      "パフやブラシで軽く押さえるようにのせ、こすらないようにします。",
  },
];

const daytimeSteps = [
  {
    title: "あぶらとり紙かティッシュで「押さえる」",
    description:
      "テカリが気になったら、あぶらとり紙やティッシュを額や鼻に軽く当てて、浮いた皮脂を吸い取ります。こすったり、何枚も使って取りきろうとしたりする必要はありません。",
  },
  {
    title: "汗はハンカチで押さえてから直す",
    description:
      "汗をかいている場合は、先にハンカチやタオルで押さえて汗を取ります。汗と皮脂が混ざったまま上からパウダーを重ねると、ムラになりやすくなります。",
  },
  {
    title: "必要ならパウダーや日焼け止めを重ねる",
    description:
      "皮脂を押さえた後、テカりやすい部分にパウダーを軽く重ねます。屋外で過ごす時間が長い日は、このタイミングで日焼け止めも塗り直しましょう。",
  },
];

const ngHabits = [
  {
    title: "1日に何度も洗顔料で洗う",
    description:
      "皮脂が気になっても、洗顔料を使った洗顔は朝と夜の2回が基本です。何度も洗うと、肌に必要なうるおいまで落とし、乾燥やヒリつきの原因になることがあります。日中は、押さえる対策で十分です。",
  },
  {
    title: "テカるからと保湿をやめる",
    description:
      "保湿をしないと、洗顔後に肌がつっぱり、乾燥しやすくなります。保湿剤の量や使用感を調整し、保湿そのものはやめないようにしましょう。",
  },
  {
    title: "あぶらとり紙で強くこする",
    description:
      "肌をこすると、摩擦で赤みや刺激の原因になります。あぶらとり紙は、肌に当てて軽く押さえるだけで皮脂を吸い取れます。",
  },
  {
    title: "顔や前髪を何度もさわる",
    description:
      "手で顔をさわる癖や、前髪が額に触れ続ける状態は、皮脂や汚れが広がる原因になります。気になっても、手でさわらずにティッシュで押さえるようにしましょう。",
  },
];

const items = [
  {
    name: "洗顔料",
    point: "泡立ちがよく、洗い上がりがつっぱりすぎないもの",
    note: "「皮脂」「さっぱり」などの表示がある、メンズ向けの洗顔料が選びやすい",
  },
  {
    name: "保湿剤",
    point: "ジェルタイプや、さっぱりした使用感の乳液",
    note: "化粧水だけで終わらせず、軽い保湿剤で仕上げる",
  },
  {
    name: "フェイスパウダー",
    point: "皮脂を吸着するタイプで、色が付かない（透明）もの",
    note: "Tゾーンにだけ使えば、塗っていることが分かりにくい",
  },
  {
    name: "あぶらとり紙",
    point: "持ち歩きやすい薄いタイプ",
    note: "ない場合はティッシュで代用できる",
  },
];

const faqs = [
  {
    question: "テカリは、洗顔を増やせば減りますか？",
    answer:
      "洗顔料を使った洗顔は、朝と夜の2回が基本です。回数を増やしても、時間がたてば皮脂は再び出てきます。洗いすぎは乾燥の原因にもなるため、日中はあぶらとり紙やティッシュで押さえる対策に切り替えましょう。",
  },
  {
    question: "あぶらとり紙を使うと、皮脂が余計に出ると聞きました",
    answer:
      "あぶらとり紙は、浮いた皮脂を吸い取るものです。強くこすったり、何度も使ったりしなければ、使ってかまいません。気になる場合は、ティッシュで軽く押さえる方法でも十分です。",
  },
  {
    question: "オイリー肌でも保湿は必要ですか？",
    answer:
      "必要です。皮脂が多いことと、肌のうるおいが足りていることは別の問題です。べたつきが気になる場合は、ジェルタイプなどさっぱりした保湿剤を選び、Tゾーンは薄めに付けましょう。",
  },
  {
    question: "フェイスパウダーを使うと、メイクしていると思われませんか？",
    answer:
      "色の付かない透明タイプを、額と鼻にだけ薄くのせれば、ほとんど分かりません。顔全体に厚く付けると不自然に見えやすいため、量と範囲を絞ることが大切です。",
  },
  {
    question: "テカリと一緒に、ニキビや赤みも気になります",
    answer:
      "ニキビを繰り返す、赤みやかゆみが続くといった場合は、自分でケアを続けるより、皮膚科に相談するのがおすすめです。特に、小鼻の横や眉間、髪の生え際に赤みと細かい皮むけがある場合は、早めに受診しましょう。",
  },
];

export default function MensOilySkinArticle({
  article,
}: MensOilySkinArticleProps) {
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
                  className="flex gap-3 text-[13px] font-medium leading-6 text-black/70 transition hover:text-[#1677FF]"
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
        <section className="text-[16px] leading-8 text-black/80">
          <p>
            「朝は普通なのに、昼過ぎには額と鼻がテカっている」「写真を撮ると、顔が光って見える」と悩んでいませんか？
          </p>

          <p className="mt-5">
            顔のテカリは、洗顔を増やすだけでは解決しません。朝のうちに皮脂が目立ちにくい状態を作り、日中に出てきた皮脂を正しく押さえることが大切です。
          </p>

          <p className="mt-5">
            この記事では、男性の顔がテカりやすい理由と、朝の対策、日中の直し方、テカリを悪化させやすい習慣、アイテムの選び方を解説します。
          </p>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[14px] font-black text-[#1677FF]">
              AKANUKE.AIの診断データより
            </p>

            <p className="mt-3 text-[14px] font-medium leading-7 text-black/70">
              AKANUKE.AIのAI診断の結果を集計したところ、皮脂・テカリ対策が61.8%の診断で必要と判定され、必要なケアの3位でした。テカリは写真で特に目立ちやすく、多くの男性に共通する課題です。
            </p>

            <Link
              href="/media/mens-akanuke-diagnosis-data"
              className="mt-3 inline-block text-[14px] font-bold text-[#1677FF] transition hover:opacity-70"
            >
              診断データの記事を見る →
            </Link>
          </div>
        </section>

        <section
          id="why"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WHY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            男性の顔がテカりやすい理由
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

                <p className="mt-2 text-[15px] font-bold">
                  {reason.title}
                </p>

                <p className="mt-2 text-[14px] leading-7 text-black/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[13px] font-medium leading-6 text-black/50">
            参考：
            <a
              href="https://corp.shiseido.com/jp/news/detail.html?n=00000000003030"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-[#1677FF]"
            >
              資生堂「資生堂、男性は女性よりも肌のストレス耐性が低いことを発見」（2020年12月2日）
            </a>
          </p>
        </section>

        <section
          id="morning"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            MORNING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            朝の対策4ステップ
          </h2>

          <p className="mt-4 text-[15px] font-medium leading-7 text-black/70">
            朝のスキンケアで、日中のテカリ方は変わります。ポイントは、洗いすぎず、保湿を軽く、Tゾーンを中心に対策することです。
          </p>

          <div className="mt-8 space-y-5">
            {morningSteps.map((step) => (
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

                    <p className="mt-3 text-[15px] leading-7 text-black/75">
                      {step.description}
                    </p>

                    <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                      <p className="text-[13px] font-bold leading-6 text-black/65">
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
              description="洗顔と保湿の正しい手順を、初心者向けに解説しています。"
            />
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="daytime"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DAYTIME
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            日中のテカリの直し方
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            日中に出てきた皮脂は、洗い流すのではなく「押さえて取る」のが基本です。トイレや休憩のタイミングで、次の順番で直しましょう。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-oily-skin/mens-oily-skin-blotting.webp"
              alt="あぶらとり紙を鼻の横に軽く当てて、皮脂を押さえている男性"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[13px] font-medium leading-6 text-black/65">
              あぶらとり紙は、こすらずに肌へ軽く当てて押さえます。
            </figcaption>
          </figure>

          <ol className="mt-7 space-y-3">
            {daytimeSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  STEP {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[15px] font-bold">
                  {step.title}
                </p>

                <p className="mt-2 text-[14px] leading-7 text-black/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[14px] font-black text-[#1677FF]">
              BBクリームを使っている場合
            </p>

            <p className="mt-3 text-[14px] font-medium leading-7 text-black/70">
              BBクリームの上から皮脂を押さえるときは、ティッシュを軽く当てるだけにします。こするとBBクリームまで落ちて、色ムラの原因になります。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-bb-cream"
              title="メンズBBクリームの使い方を見る"
              description="日中の崩れと直し方も含めて解説しています。"
            />
          </div>
        </section>

        <section
          id="ng"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NG HABITS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            テカリを悪化させやすいNG習慣
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {ngHabits.map((habit) => (
              <div
                key={habit.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[16px] font-black">
                  {habit.title}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-black/70">
                  {habit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="items"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            ITEMS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            テカリ対策のアイテムの選び方
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            新しいアイテムを増やす前に、今使っている洗顔料と保湿剤が、自分の肌に合っているかを見直しましょう。そのうえで、必要に応じてパウダーやあぶらとり紙を加えます。
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.name}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[16px] font-black">
                  {item.name}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-black/70">
                  {item.point}
                </p>

                <p className="mt-2 text-[14px] font-bold leading-7 text-[#1677FF]">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[15px] font-medium leading-7 text-black/70">
            新しいアイテムを使い始めるときは、製品の注意表示を確認し、赤みやかゆみが出た場合はすぐに使用を中止してください。
          </p>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-toner-emulsion"
              title="化粧水と乳液の違いを見る"
              description="肌の傾向に合わせた保湿の組み合わせを解説しています。"
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

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              テカリそのものは病気ではありませんが、次のような症状がある場合は、セルフケアを続けるより、皮膚科に相談しましょう。
            </p>
          </div>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-7 text-black/75">
            <li>ニキビが繰り返しできる、数が増えている</li>
            <li>小鼻の横、眉間、髪の生え際などに、赤みと細かい皮むけがある</li>
            <li>かゆみやヒリつきが続いている</li>
            <li>スキンケアを変えた後に、赤みや湿疹が出た</li>
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

          <p className="mt-4 text-[15px] font-medium leading-6 text-black/70">
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
            テカリについてよくある質問
          </h2>

          <div className="mt-7 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[16px] border border-black/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-black">
                  {faq.question}

                  <span className="shrink-0 text-[#1677FF] transition group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <p className="border-t border-black/5 px-5 py-4 text-[14px] font-medium leading-7 text-black/70">
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
            テカリは「朝に整え、日中は押さえる」
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              男性は皮脂が多い傾向があり、特に額と鼻のTゾーンはテカりやすい場所です。朝は洗顔料を泡立てて洗い、さっぱりした保湿剤と日焼け止めで整え、必要ならTゾーンにだけパウダーをのせます。
            </p>

            <p className="mt-5">
              日中は、洗い流すのではなく、あぶらとり紙やティッシュで軽く押さえて直します。洗いすぎや保湿の省略は、かえって肌の負担になります。ニキビや赤みが続く場合は、皮膚科に相談しましょう。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-skincare-beginner"
            secondaryLabel="スキンケアの基本を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}
