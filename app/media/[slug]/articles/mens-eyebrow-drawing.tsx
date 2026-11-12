import Image from "next/image";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensEyebrowDrawingArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "who", label: "眉毛を描いたほうがいい人" },
  { id: "tools", label: "ペンシルとパウダーの違い" },
  { id: "color", label: "失敗しにくい色の選び方" },
  { id: "steps", label: "自然に見える描き方5ステップ" },
  { id: "tips", label: "描いたと分かりにくくするコツ" },
  { id: "trouble", label: "悩み別の描き方" },
  { id: "remove", label: "落とし方" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const cases = [
  {
    title: "眉毛にすき間や薄い部分がある",
    description:
      "毛がまばらな部分があると、眉の形がはっきりせず、顔全体の印象がぼやけて見えます。すき間だけを埋めるだけでも、目元が引き締まります。",
  },
  {
    title: "眉尻が短い、または途中で消えている",
    description:
      "眉尻が短いと、顔の横幅に対して眉が小さく見えます。眉尻を少し描き足すと、顔全体のバランスが整って見えやすくなります。",
  },
  {
    title: "左右の形がそろわない",
    description:
      "人の顔にはもともと左右差がありますが、眉の長さや高さが大きく違うと気になりやすいものです。削ってそろえるのではなく、足りない側を描き足して調整します。",
  },
  {
    title: "整えたときに剃りすぎてしまった",
    description:
      "剃りすぎた部分は、生えてくるまで時間がかかります。その間は、描き足して元の形を補うのが最も自然な方法です。",
  },
];

const tools = [
  {
    name: "アイブロウペンシル",
    feature: "細い線が描ける。毛を1本ずつ描き足すように使える",
    suited: "すき間を埋めたい、眉尻を描き足したい",
  },
  {
    name: "アイブロウパウダー",
    feature: "ふんわりと色をのせられる。広い範囲を自然に埋められる",
    suited: "眉全体が薄い、ペンシルだと濃く見えやすい",
  },
  {
    name: "スクリューブラシ",
    feature: "毛流れを整え、描いた色をぼかしてなじませる",
    suited: "すべての人。描く前と描いた後に使う",
  },
];

const steps = [
  {
    number: "01",
    title: "スクリューブラシで毛流れを整える",
    description:
      "眉頭は上向きに、眉山から眉尻は斜め外向きに、毛の流れに沿ってとかします。毛がそろうと、どこにすき間があるか分かりやすくなります。",
    point:
      "スキンケアの直後は描いた色がにじみやすいため、保湿剤がなじんでから始めます。",
  },
  {
    number: "02",
    title: "足りない部分を確認する",
    description:
      "鏡から少し離れて、眉全体を見ます。すき間がある場所、薄い場所、眉尻の長さを確認し、描き足す場所を決めます。眉全体を描く必要はありません。",
    point:
      "眉の位置の目安は、眉頭・眉山・眉尻の3点です。眉毛の整え方の記事で確認できます。",
  },
  {
    number: "03",
    title: "パウダーで薄い部分に色をのせる",
    description:
      "パウダーをブラシに少量取り、眉山から眉尻にかけての薄い部分に、ふんわりと色をのせます。最初はごく少量にし、足りなければ重ねます。",
    point:
      "ブラシに取ったら、手の甲で一度余分な粉を落としてから眉にのせます。",
  },
  {
    number: "04",
    title: "ペンシルで毛を1本ずつ描くように埋める",
    description:
      "パウダーだけでは埋まらないすき間や、眉尻の足りない部分を、ペンシルで描き足します。線でなぞるのではなく、毛の流れに沿って短い線を1本ずつ描くと、本物の毛のように見えます。",
    point:
      "力を入れず、ペン先を軽く当てる程度で描きます。",
  },
  {
    number: "05",
    title: "スクリューブラシでぼかして仕上げる",
    description:
      "最後に、スクリューブラシで眉全体を軽くとかし、描いた色を毛になじませます。特に眉頭は、色が残っていると不自然に見えやすいため、しっかりぼかします。",
    point:
      "仕上げたら、鏡から離れて顔全体で確認します。",
  },
];

const tips = [
  {
    title: "眉頭はほとんど描かない",
    description:
      "眉頭に色をのせると、くっきりとした「描いた眉」に見えやすくなります。眉頭は描かないか、ブラシに残った色を軽くなじませる程度にします。",
  },
  {
    title: "輪郭を線で囲まない",
    description:
      "眉の上下をペンシルの線で囲むと、眉の形がくっきりしすぎて不自然になります。すき間を埋めることを目的にし、輪郭は元の毛に任せます。",
  },
  {
    title: "濃さは「眉頭が薄く、眉尻が濃い」",
    description:
      "自然な眉は、眉頭が最も薄く、眉山から眉尻にかけて少し濃くなっています。色をのせる量も、この濃さの差に合わせます。",
  },
  {
    title: "明るい場所で、離れて確認する",
    description:
      "暗い場所や鏡に近づいたまま描くと、濃く描きすぎてしまいます。窓際など明るい場所で描き、仕上げは鏡から離れて確認しましょう。",
  },
];

const troubles = [
  {
    title: "眉毛の中にすき間がある",
    description:
      "すき間の部分だけに、ペンシルで毛の流れに沿った短い線を数本描きます。周りの毛より濃くならないように、少しずつ足していきます。",
  },
  {
    title: "眉尻が短い",
    description:
      "小鼻と目尻を結んだ線の延長上を目安に、ペンシルで眉尻を描き足します。眉尻の端は細く、薄くなるように描くと自然です。",
  },
  {
    title: "左右の長さや高さが違う",
    description:
      "形の整っているほうを基準にして、足りない側だけを描き足します。完全に同じ形にする必要はなく、正面から見て大きな差がなければ十分です。",
  },
  {
    title: "眉全体が薄い",
    description:
      "ペンシルで全体を描くと濃く見えやすいため、パウダーで全体にふんわり色をのせ、足りない部分だけペンシルで足します。",
  },
];

const faqs = [
  {
    question: "眉毛を描いていると、周りに気づかれませんか？",
    answer:
      "髪色に合った色を選び、すき間を埋める程度に描けば、ほとんど気づかれません。気づかれやすいのは、色が濃すぎる場合、眉頭まで描いている場合、輪郭を線で囲んでいる場合です。",
  },
  {
    question: "ペンシルとパウダーは、どちらから始めればいいですか？",
    answer:
      "すき間や眉尻を少し足したいだけなら、ペンシル1本から始めるのがおすすめです。眉全体が薄い場合は、パウダーのほうが自然に仕上げやすくなります。",
  },
  {
    question: "毎日描く必要はありますか？",
    answer:
      "毎日描く必要はありません。仕事の日や人と会う日だけ描く、写真を撮る日だけ描く、という使い方でも十分です。",
  },
  {
    question: "汗をかくと落ちてしまいます",
    answer:
      "汗をかきやすい日は、描く前に眉の周りの皮脂をティッシュで押さえておくと、落ちにくくなります。汗や水に強いタイプのペンシルを選ぶ方法もあります。",
  },
  {
    question: "アートメイクという方法もありますか？",
    answer:
      "アートメイクは、針を使って皮膚に色素を入れる施術で、日本では医療行為として、医療機関で行われるものです。リスクや費用、持続期間について、施術を行う医療機関で十分に説明を受けてから検討しましょう。",
  },
];

export default function MensEyebrowDrawingArticle({
  article,
}: MensEyebrowDrawingArticleProps) {
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
            「眉毛にすき間があって、形がはっきりしない」「整えたら剃りすぎて、眉尻が短くなった」と悩んでいませんか？
          </p>

          <p className="mt-5">
            眉毛は、整えるだけでなく、足りない部分を少し描き足すだけでも、目元の印象がはっきりします。ポイントは、眉全体を描くのではなく、すき間を埋める程度にとどめることです。
          </p>

          <p className="mt-5">
            この記事では、眉毛を描いたほうがいい人、ペンシルとパウダーの違い、色の選び方、自然に見える描き方5ステップ、描いたと分かりにくくするコツを解説します。
          </p>
        </section>

        <section
          id="who"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WHO
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            眉毛を描いたほうがいい人
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            眉毛が濃く、形もそろっている人は、無理に描く必要はありません。次のような場合は、描き足すことで目元が整って見えやすくなります。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {cases.map((item) => (
              <div
                key={item.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[16px] font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-black/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-eyebrows"
              title="メンズ眉毛の整え方を見る"
              description="描く前に、余分な毛を整える方法と眉の位置の目安を解説しています。"
            />
          </div>
        </section>

        {/* 記事途中の診断CTA（クリック計測：placement="middle"）。デザインは末尾のCTAと共通 */}
        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
            眉の改善点をAIで確かめる
          </h2>

          <p className="mt-4 text-[15px] font-medium leading-6 text-black/70">
            眉のどこを補うべきかは、自分では判断しにくいものです。AKANUKE.AIなら、顔写真から髪型・眉毛・肌・全体の印象をAIが分析し、優先して改善したいポイントを確認できます。
          </p>

          <JournalDiagnosisCta placement="middle" />
        </section>

        <section
          id="tools"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TOOLS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ペンシルとパウダーの違い
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            眉毛を描く道具は、主にペンシルとパウダーの2種類です。初めての人は、ペンシルとスクリューブラシが1本になったタイプを選ぶと、そろえる手間がかかりません。
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[16px] font-black">
                  {tool.name}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-black/70">
                  {tool.feature}
                </p>

                <p className="mt-2 text-[14px] font-bold leading-7 text-[#1677FF]">
                  向いている人：{tool.suited}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="color"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COLOR
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            失敗しにくい色の選び方
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              色は、髪の色に近い色か、髪より少し明るい色を選ぶと、自然になじみます。黒髪の場合でも、真っ黒のペンシルは描いた部分だけが目立ちやすいため、ダークブラウンやグレー系の色が使いやすい選択肢です。
            </p>

            <p className="mt-5">
              髪を明るく染めている場合は、髪の色に合わせたブラウン系を選びます。迷ったときは、売り場のテスターを手の甲に描き、自分の眉毛の色と並べて比べてみましょう。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[14px] font-black text-[#1677FF]">
              迷ったら、明るいほうを選ぶ
            </p>

            <p className="mt-3 text-[14px] font-medium leading-7 text-black/70">
              明るい色は、重ねて描けば濃くできます。一方で、濃すぎる色を薄く見せることは難しいため、2色で迷ったら明るいほうを選ぶと失敗しにくくなります。
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
            自然に見える描き方5ステップ
          </h2>

          <p className="mt-4 text-[15px] font-medium leading-7 text-black/70">
            ポイントは、パウダーで薄い部分をふんわり埋め、ペンシルで足りない部分だけを描き足すことです。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-eyebrow-drawing/mens-eyebrow-drawing-areas.webp"
              alt="男性の眉毛で、パウダーをのせる眉山から眉尻の範囲と、ペンシルで描き足すすき間と眉尻、ぼかす眉頭を示した図"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[13px] font-medium leading-6 text-black/65">
              眉山から眉尻はパウダー、すき間と眉尻はペンシル、眉頭はぼかすだけにします。
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
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="tips"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TIPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            描いたと分かりにくくするコツ
          </h2>

          <div className="mt-7 space-y-3">
            {tips.map((tip, index) => (
              <div
                key={tip.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  TIP {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[15px] font-bold">
                  {tip.title}
                </p>

                <p className="mt-2 text-[14px] leading-7 text-black/70">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="trouble"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TROUBLESHOOTING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            悩み別の描き方
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {troubles.map((trouble) => (
              <div
                key={trouble.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[16px] font-black">
                  {trouble.title}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-black/70">
                  {trouble.description}
                </p>
              </div>
            ))}
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
            描いた眉毛の落とし方
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              描いた眉毛は、夜の洗顔で落とします。洗顔料で落とせる製品もあれば、汗や水に強いタイプのように、クレンジングが必要な製品もあるため、パッケージの表示を確認しましょう。
            </p>

            <p className="mt-5">
              落とすときは、眉毛を指でこすらず、泡や洗浄料をなじませてからやさしく洗い流します。強くこすると、眉毛が抜けたり、肌に負担がかかったりする原因になります。
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
            眉毛だけでなく、
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
            眉毛の描き方についてよくある質問
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
            眉毛は、すき間を埋める程度に描く
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              眉毛を描くときに大切なのは、眉全体を描き直すのではなく、すき間や足りない部分だけを補うことです。色は髪色に近いか少し明るい色を選び、パウダーで薄い部分をふんわり埋めてから、ペンシルで毛を1本ずつ描くように足しましょう。
            </p>

            <p className="mt-5">
              眉頭は描かずにぼかし、輪郭を線で囲まないことが、描いたと分かりにくくするコツです。まずは余分な毛を整え、それでも足りない部分があれば描き足す、という順番で取り入れてみてください。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-akanuke-eyebrows"
            secondaryLabel="眉毛の整え方を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}
