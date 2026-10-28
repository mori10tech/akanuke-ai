import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  { id: "basics", label: "BBクリームでできること・できないこと" },
  { id: "choose", label: "買う前に決めること" },
  { id: "color", label: "失敗しにくい色の選び方" },
  { id: "steps", label: "基本の塗り方5ステップ" },
  { id: "check", label: "塗った後に確認する3つのポイント" },
  { id: "daytime", label: "日中の崩れと直し方" },
  { id: "sunscreen", label: "日焼け止めとの順番と落とし方" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const canDo = [
  "赤みやくすみなど、肌の色ムラを目立ちにくくする",
  "毛穴の影や、薄いニキビ跡を目立ちにくくする",
  "薄い青髭の青みを和らげる",
  "顔全体の色をそろえて、明るく見せる",
];

const cannotDo = [
  "濃い青髭やはっきりしたニキビ跡を、完全に隠す",
  "ニキビの盛り上がりや、肌の凹凸を平らにする",
  "スキンケアの代わりになる",
];

const purposeOptions = [
  {
    purpose: "顔全体の色ムラを、さりげなく整えたい",
    answer: "BBクリーム",
    description:
      "顔全体に薄く伸ばして、肌の色をそろえるのに向いています。初めての人が取り入れやすいアイテムです。",
  },
  {
    purpose: "青髭やニキビ跡など、一部分だけを隠したい",
    answer: "コンシーラー",
    description:
      "狭い範囲をしっかりカバーするのに向いています。BBクリームで全体を整えた後に、残った部分だけに使う方法もあります。",
  },
  {
    purpose: "メイク感はできるだけ出したくない",
    answer: "色付きの日焼け止め",
    description:
      "カバー力は控えめですが、日焼け止めのついでに肌の色を少し整えられます。BBクリームの前に試してみるのも一つの方法です。",
  },
];

const colorSteps = [
  {
    title: "フェイスラインで試す",
    description:
      "手の甲は顔より色が濃いことが多いため、テスターはあごのラインなど、顔と首の境目に塗って確認します。",
  },
  {
    title: "自然光で見る",
    description:
      "店内の照明では色が違って見えることがあります。可能であれば、窓際や屋外で首の色となじんでいるかを確認しましょう。",
  },
  {
    title: "明るすぎる色を避ける",
    description:
      "肌を明るく見せたいからと明るい色を選ぶと、顔だけ白く浮いて見えます。2色で迷ったら、首の色に近いほうを選びます。",
  },
];

const bbSteps = [
  {
    number: "01",
    title: "スキンケアで肌を整える",
    description:
      "洗顔・保湿をしてから使います。乾燥した肌に塗ると、粉をふいたように見えたり、ムラになったりしやすくなります。",
    point:
      "保湿剤のベタつきが残っている場合は、少し時間を置いてから塗りましょう。",
  },
  {
    number: "02",
    title: "少量を5か所に置く",
    description:
      "手の甲に少量を出し、額・両頬・鼻・あごの5か所に少しずつ置きます。量は製品によって違うため、表示の量より少なめから始めると、厚塗りを防ぎやすくなります。",
    point:
      "足りない場合は後から追加できますが、多すぎた分を減らすのは難しくなります。",
  },
  {
    number: "03",
    title: "顔の中心から外側へ伸ばす",
    description:
      "指の腹で、顔の中心から外側に向かって薄く伸ばします。こするのではなく、肌の上をすべらせるように動かします。",
    point:
      "小鼻のわきや口の周りは、指先で軽くたたくようになじませます。",
  },
  {
    number: "04",
    title: "フェイスラインはさらに薄くする",
    description:
      "あご・耳の前・生え際に近づくほど薄くして、何も塗っていない首や髪との境目をぼかします。",
    point:
      "指に残った量だけでなじませる程度で十分です。",
  },
  {
    number: "05",
    title: "気になる部分だけ重ねる",
    description:
      "鏡から少し離れて全体を確認し、青髭や赤みが残っている部分にだけ、ごく少量を重ねます。",
    point:
      "それでも隠れない場合は、BBクリームを重ね続けるより、コンシーラーを使うほうが自然に仕上がります。",
  },
];

const checkPoints = [
  {
    title: "首との色の差",
    description:
      "鏡から少し離れて、首まで映した状態で見ます。顔だけ明るく見える場合は、色が合っていないか、量が多すぎます。",
  },
  {
    title: "横顔と耳の前",
    description:
      "正面だけでなく、横を向いてフェイスラインに境目がないかを確認します。正面からは見えにくい部分です。",
  },
  {
    title: "表情を動かしたとき",
    description:
      "口を動かしたり笑ったりして、口の周りや目元にBBクリームがたまっていないかを確認します。たまっている場合は、指で軽く押さえてなじませます。",
  },
];

const faqs = [
  {
    question: "男性がBBクリームを使うと、メイクしているとバレませんか？",
    answer:
      "首の色に近い色を選び、少量を薄く伸ばして、フェイスラインをぼかせば、気づかれにくい仕上がりになります。塗った後に、首との色の差・横顔・表情を動かしたときの3点を確認しましょう。",
  },
  {
    question: "BBクリームで青髭は隠せますか？",
    answer:
      "薄い青髭なら目立ちにくくできることがあります。青みが強い場合は、BBクリームを重ねるより、オレンジ系のコンシーラーを部分的に使うほうが自然に仕上がります。",
  },
  {
    question: "BBクリームは毎日使ってもいいですか？",
    answer:
      "製品の使用方法に従って使えば問題ありません。使った日は、製品に合った方法できちんと落としましょう。赤みやかゆみなどが出た場合は使用を中止し、続く場合は皮膚科に相談してください。",
  },
  {
    question: "BBクリームとファンデーションの違いは何ですか？",
    answer:
      "一般的に、BBクリームはファンデーションより薄づきで、保湿や紫外線カットなどの機能を兼ねた製品が多いアイテムです。ただし、製品によって特徴は異なるため、カバー力や機能は製品の説明で確認しましょう。",
  },
  {
    question: "肌荒れしているときに使ってもいいですか？",
    answer:
      "赤く腫れたニキビや傷がある部分には、塗るのを避けましょう。肌荒れを隠すために厚く塗ると、刺激になったり、かえって目立ったりすることがあります。",
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
            「BBクリームを使ってみたいけれど、メイクしているとバレたくない」「買ってみたものの、塗ると顔だけ白く浮いてしまう」と悩んでいませんか？
          </p>

          <p className="mt-5">
            BBクリームが不自然に見える原因の多くは、色選びと量です。自分の肌に合う色を選び、少量を薄く伸ばして、塗った後に何を確認すればよいかが分かれば、初めてでも自然に仕上げられます。
          </p>

          <p className="mt-5">
            この記事では、BBクリームでできることとできないこと、買う前に決めること、色の選び方、塗り方、塗った後の確認ポイント、日中の直し方を解説します。
          </p>
        </section>

        <section
          id="basics"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BASICS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            BBクリームでできること・できないこと
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            BBクリームは、顔全体に薄く伸ばして、肌の色をそろえて見せるためのアイテムです。できることとできないことを知っておくと、塗りすぎを防げます。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
              <p className="text-[12px] font-black text-[#1677FF]">
                できること
              </p>

              <ul className="mt-3 space-y-2 text-[12px] font-medium leading-6 text-black/75">
                {canDo.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5">
              <p className="text-[12px] font-black text-black/70">
                できないこと
              </p>

              <ul className="mt-3 space-y-2 text-[12px] font-medium leading-6 text-black/75">
                {cannotDo.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-5 text-[13px] leading-7 text-black/70">
            「できないこと」を無理にBBクリームで解決しようとして重ね塗りすると、厚塗りに見える原因になります。
          </p>
        </section>

        <section
          id="choose"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BEFORE BUYING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            買う前に決めること｜BBクリームが本当に合っているか
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            隠したいものによっては、BBクリーム以外のアイテムのほうが向いていることがあります。まず「何を、どこまで隠したいか」を決めましょう。
          </p>

          <div className="mt-7 space-y-3">
            {purposeOptions.map((option) => (
              <div
                key={option.purpose}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <p className="text-[13px] font-bold">
                  {option.purpose}
                </p>

                <p className="mt-2 text-[13px] font-black text-[#1677FF]">
                  → {option.answer}
                </p>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-concealer"
              title="メンズコンシーラーの使い方を見る"
              description="青髭・ニキビ跡・クマなど、部分的に隠す方法と色選びを解説。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-blue-beard"
              title="青髭の原因と対策を見る"
              description="髭を剃っても青く見える原因と、状態に合った対策の選び方を解説。"
            />
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

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            BBクリームが不自然に見える一番の原因は、色が肌に合っていないことです。店頭のテスターを使って、次の3点を確認しましょう。
          </p>

          <div className="mt-7 space-y-3">
            {colorSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex items-start gap-3 rounded-[14px] border border-black/10 bg-white px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                  {index + 1}
                </span>

                <p className="text-[12px] font-bold leading-6 text-black/65">
                  {step.title}
                  <span className="block font-medium text-black/60">
                    {step.description}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] leading-6 text-black/60">
            ※テスターがない場合は、少量サイズの製品から試すと、色が合わなかったときの失敗を小さくできます。
          </p>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            5 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズBBクリームの基本の塗り方5ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            初めて使うときは、一度で完成させようとせず、少量ずつ調整しましょう。
          </p>

          <div className="mt-8 space-y-5">
            {bbSteps.map((step) => (
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
          id="check"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CHECK
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            塗った後に確認する3つのポイント
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            鏡に近づいて正面だけを見ていると、不自然な部分に気づきにくくなります。家を出る前に、次の3点を確認しましょう。
          </p>

          <div className="mt-7 space-y-4">
            {checkPoints.map((point, index) => (
              <div
                key={point.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {point.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="daytime"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TOUCH UP
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            日中の崩れと直し方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              時間がたつと、皮脂や汗でBBクリームがよれたり、テカって見えたりすることがあります。その上から重ね塗りすると、厚塗りに見える原因になります。
            </p>

            <p className="mt-5">
              直すときは、まずティッシュを顔に軽く当てて、皮脂を押さえます。そのうえで、色が薄くなった部分にだけ、指に取ったごく少量をたたくようになじませます。夕方に青髭が目立ってくる場合も、同じように少量を重ねる程度にとどめましょう。
            </p>
          </div>
        </section>

        <section
          id="sunscreen"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SUNSCREEN & REMOVE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            日焼け止めとの順番と落とし方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              日焼け止めとBBクリームを両方使う場合は、一般的に「スキンケア → 日焼け止め → BBクリーム」の順番です。ただし、製品によって推奨される使い方が違うため、それぞれの説明を確認しましょう。
            </p>

            <p className="mt-5">
              UVカット機能付きのBBクリームもありますが、薄く塗った場合は、表示どおりの効果を得られないことがあります。屋外で長く過ごす日は、日焼け止めを別に使うと安心です。
            </p>

            <p className="mt-5">
              BBクリームを使った日は、夜に必ず落とします。洗顔料だけで落とせる製品もあれば、クレンジングが必要な製品もあるため、パッケージの表示に従いましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="BBクリームの前に整えたい、洗顔・保湿・日焼け止めの基本を解説。"
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            色選びと量で、BBクリームの仕上がりは決まる
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームは、顔全体の色ムラをさりげなく整えるためのアイテムです。濃い青髭やはっきりした跡を完全に隠すものではないため、隠したいものによってはコンシーラーなどと使い分けましょう。
            </p>

            <p className="mt-5">
              色はフェイスラインと自然光で確認し、首の色に近いものを選びます。少量を5か所に置いて薄く伸ばし、首との色の差・横顔・表情を動かしたときの3点を確認すれば、初めてでも自然に仕上げられます。
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