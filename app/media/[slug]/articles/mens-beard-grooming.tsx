import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  {
    id: "decide",
    label: "剃るか残すかを決める基準",
  },
  {
    id: "tools",
    label: "カミソリと電気シェーバーの選び方",
  },
  {
    id: "direction",
    label: "剃る前に毛の流れを確認する",
  },
  {
    id: "shave",
    label: "肌に負担をかけにくい剃り方5ステップ",
  },
  {
    id: "keep",
    label: "ヒゲを残す場合の整え方",
  },
  {
    id: "skin-care",
    label: "カミソリ負け・肌荒れを防ぐには",
  },
  {
    id: "blue-beard",
    label: "青ヒゲが気になる場合",
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

const decisionPoints = [
  {
    title: "職場や学校の決まり",
    description:
      "身だしなみの規定でヒゲが認められていない場合は、剃ることが前提になります。規定がなくても、接客など人と近い距離で話す仕事では、周囲の雰囲気も確認しておきましょう。",
  },
  {
    title: "ヒゲの生え方",
    description:
      "口周りやあごに均一に生えている人は、残しても整って見えやすくなります。まばらな部分が多い場合は、残すと手入れ不足に見えやすいため、剃るほうが清潔感を出しやすくなります。",
  },
  {
    title: "手入れにかけられる時間",
    description:
      "ヒゲを残す場合も、長さと輪郭を保つための手入れが必要です。「剃らなくていいから楽」とは限らない点に注意しましょう。",
  },
];

const tools = [
  {
    name: "カミソリ（T字）",
    merit: "深く剃りやすく、剃り残しが少なくなりやすい",
    caution:
      "刃が肌に直接当たるため、シェービング剤が欠かせません。切れ味が落ちた刃は肌への負担になるため、メーカーの目安に沿って交換します。",
  },
  {
    name: "電気シェーバー",
    merit: "刃が肌に直接当たりにくく、肌への負担を抑えやすい",
    caution:
      "カミソリほど深くは剃れない場合があります。外刃や替刃にも交換の目安があるため、製品の説明を確認しましょう。",
  },
  {
    name: "ヒゲトリマー",
    merit: "長さをそろえる、残すヒゲの輪郭を整える",
    caution:
      "肌の表面ぎりぎりまで剃る道具ではありません。ヒゲを残す人や、伸びたヒゲを短くしてから剃るときに使います。",
  },
];

const shavingSteps = [
  {
    number: "01",
    title: "ヒゲと肌を温めてやわらかくする",
    description:
      "洗顔後や入浴後など、ヒゲが水分を含んでやわらかくなった状態で剃ります。乾いた状態で剃ると摩擦が大きくなり、肌への負担が増えやすくなります。",
    point:
      "朝に剃る場合は、ぬるま湯で洗顔してから始めましょう。",
  },
  {
    number: "02",
    title: "シェービング剤をのせる",
    description:
      "カミソリを使う場合は、フォームやジェルをヒゲ全体にのせ、刃がなめらかに滑るようにします。電気シェーバーは、製品によって使い方が違うため説明書を確認しましょう。",
    point:
      "肌が敏感な場合は、刺激の少ないシェービング剤を選びます。",
  },
  {
    number: "03",
    title: "毛の流れに沿って剃る",
    description:
      "次の章で確認した毛の流れに沿って、頬、あご、口周りの順に剃ります。口周りやあごはヒゲが硬いことが多いため、シェービング剤をなじませる時間を取ってから剃ると負担を抑えやすくなります。",
    point:
      "同じ場所を何度も往復させないようにします。",
  },
  {
    number: "04",
    title: "剃り残しを確認する",
    description:
      "明るい場所で、顔を少し横や上に向けながら、あご下・首・口角の周りを確認します。どうしても剃り残しがある部分だけ、もう一度シェービング剤をつけて剃ります。",
    point:
      "毛の流れと逆方向に剃る「逆剃り」は深く剃れますが、肌への負担が大きくなります。肌が弱い人は避けましょう。",
  },
  {
    number: "05",
    title: "洗い流して保湿する",
    description:
      "ぬるま湯でシェービング剤を洗い流し、タオルで押さえるように水分を取ります。剃った後の肌は乾燥しやすいため、すぐに化粧水や乳液で保湿しましょう。",
    point:
      "ヒリつきや赤みが強い日は、無理に剃らず肌を休ませることも大切です。",
  },
];

const keepPoints = [
  {
    number: "01",
    title: "長めの設定から短くしていく",
    description:
      "トリマーで長さをそろえるときは、まず長めのアタッチメントで全体を整え、様子を見ながら短くしていきます。短く切りすぎた部分は、伸びるまで元に戻せません。",
  },
  {
    number: "02",
    title: "首側の輪郭を決める",
    description:
      "あご下から首にかけてヒゲが広がっていると、伸びっぱなしに見えやすくなります。あご下の、のど仏より少し上のあたりを境目の目安にして、それより下は剃りましょう。",
  },
  {
    number: "03",
    title: "頬側の輪郭を決める",
    description:
      "頬の上のほうに生えている薄いヒゲは、輪郭をぼやけさせます。ヒゲが自然に濃くなり始める位置を境目にして、それより上は剃ると整って見えます。",
  },
  {
    number: "04",
    title: "口元を清潔に保つ",
    description:
      "口ヒゲが唇にかかっていると、食事のときに汚れが付きやすくなります。唇のラインにかからない長さに整え、洗顔のときにヒゲの中まで洗いましょう。",
  },
];

const skinCarePoints = [
  {
    title: "切れ味の落ちた刃を使わない",
    description:
      "切れ味が落ちると、同じ場所を何度も剃ることになり、肌への負担が増えます。",
  },
  {
    title: "剃る回数を見直す",
    description:
      "肌荒れが続く場合は、毎日剃る必要があるかを見直します。電気シェーバーに切り替えるのも一つの方法です。",
  },
  {
    title: "剃った後は必ず保湿する",
    description:
      "剃った後の肌は乾燥しやすい状態です。こすらずに保湿しましょう。",
  },
  {
    title: "ニキビや傷がある場所を避ける",
    description:
      "肌トラブルがある部分は、刃を当てると悪化することがあります。治るまではその部分を避けるか、トリマーで短くするだけにとどめます。",
  },
];

const faqs = [
  {
    question: "垢抜けたい男性はヒゲを全部剃った方がいいですか？",
    answer:
      "必ず全部剃る必要はありません。ヒゲが均一に生えていて、長さと輪郭を整えられるなら、残しても清潔に見えます。迷う場合は、職場の決まり、ヒゲの生え方、手入れの時間の3つで判断しましょう。",
  },
  {
    question: "ヒゲは朝と夜、どちらに剃るのがいいですか？",
    answer:
      "日中の見た目を重視するなら朝がおすすめです。夜に剃ると、翌日の夕方にはヒゲが伸びて目立ちやすくなります。肌が荒れやすい人は、入浴後の肌がやわらかい時間に剃り、翌朝は剃り残しの確認だけにする方法もあります。",
  },
  {
    question: "カミソリと電気シェーバーはどちらがおすすめですか？",
    answer:
      "深く剃りたいならカミソリ、肌への負担を抑えたいなら電気シェーバーが向いています。カミソリ負けを繰り返している人は、電気シェーバーを試してみましょう。",
  },
  {
    question: "ヒゲを伸ばし始めるときに気をつけることはありますか？",
    answer:
      "伸ばし始めの時期は、長さが不ぞろいで手入れ不足に見えやすくなります。輪郭の外側だけは剃り続け、長さがある程度そろってからトリマーで整えましょう。",
  },
  {
    question: "ヒゲ剃りで肌荒れする場合はどうすればいいですか？",
    answer:
      "シェービング剤を使う、刃を交換する、同じ場所を何度も剃らない、剃った後に保湿する、といった方法を試しましょう。赤み・痛み・ブツブツが続く場合は、自己判断で剃り続けず皮膚科に相談してください。",
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
            「毎朝ヒゲを剃っているのに、昼過ぎには口周りが整って見えない」「ヒゲを残したほうが似合うのか、全部剃ったほうがいいのか分からない」と悩んでいませんか？
          </p>

          <p className="mt-5">
            ヒゲは、剃るにしても残すにしても、手入れされているかどうかで印象が大きく変わります。剃り残しや不ぞろいな長さがあると、髪型や服を整えていても「手入れ不足」に見えやすくなります。
          </p>

          <p className="mt-5">
            この記事では、剃るか残すかの判断基準、道具の選び方、毛の流れの確認方法、肌に負担をかけにくい剃り方、ヒゲを残す場合の輪郭の決め方、カミソリ負けの防ぎ方を解説します。
          </p>
        </section>

        <section
          id="decide"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DECISION
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            剃るか残すかを決める基準
          </h2>

          <p className="mt-6 text-[14px] leading-8 text-black/80">
            ヒゲそのものが清潔感を下げるわけではありません。きれいに剃ったヒゲも、長さと輪郭を整えて残したヒゲも、手入れされていれば自然に見えます。どちらにするかは、次の3つで判断しましょう。
          </p>

          <div className="mt-7 space-y-3">
            {decisionPoints.map((point, index) => (
              <div
                key={point.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  POINT {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {point.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              迷ったら、まずは剃る
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              判断に迷う場合は、まずきれいに剃った状態で過ごしてみましょう。ヒゲを残すスタイルは、伸ばし始めの時期に不ぞろいに見えやすく、試すなら長期休みなど人に会う機会が少ない時期が向いています。
            </p>
          </div>
        </section>

        <section
          id="tools"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TOOLS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            カミソリと電気シェーバーの選び方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            剃り上がりの深さと肌への負担は、道具によって変わります。自分の肌の強さと、どこまで深く剃りたいかで選びましょう。
          </p>

          <div className="mt-7 space-y-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[16px] font-black">
                  {tool.name}
                </h3>

                <p className="mt-2 text-[12px] font-bold leading-6 text-[#1677FF]">
                  {tool.merit}
                </p>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {tool.caution}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="direction"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HAIR DIRECTION
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            剃る前に毛の流れを確認する
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲが生えている向きは、頬・あご・口周り・首で違うことがあり、人によっても異なります。毛の流れに沿って剃ると、肌への負担を抑えやすくなります。
            </p>

            <p className="mt-5">
              確認するには、ヒゲが少し伸びた状態で、指で上下左右になでてみます。なめらかに感じる方向が毛の流れで、引っかかる方向が逆方向です。特に首は、下から上に向かって生えている人や、横向きに生えている人もいるため、一度確認しておきましょう。
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            肌に負担をかけにくい剃り方5ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            カミソリを使う場合の手順です。深く剃ることより、肌への負担を抑えながら剃り残しを減らすことを優先しましょう。
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
          id="keep"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BEARD STYLE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ヒゲを残す場合の整え方
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            ヒゲを残すときは、「剃らない」のではなく「残す部分と剃る部分を決める」ことが大切です。長さと輪郭がそろっていると、意図して残していることが伝わります。
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            カミソリ負け・肌荒れを防ぐには
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            剃った後に赤みやヒリつき、ブツブツが出る場合は、剃り方か道具に原因があることが多いものです。次の4つを見直しましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {skinCarePoints.map((item, index) => (
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

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="ひげ剃りを含めた朝と夜の手順や、保湿の基本を解説しています。"
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
          id="blue-beard"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BLUE BEARD
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            青ヒゲが気になる場合
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              きれいに剃っても口周りが青く見える場合、皮膚の下に残っているヒゲが透けていることがあります。この青みは、何度も深剃りしても消えないことが多く、かえって肌を傷める原因になります。
            </p>

            <p className="mt-5">
              青ヒゲは、剃り方とは別に「隠す」「ヒゲそのものを減らす」といった方法で考える必要があります。原因の見分け方や対策は、次の記事で詳しく解説しています。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-blue-beard"
              title="青髭対策を詳しく見る"
              description="青髭が目立つ原因の見分け方から、BBクリーム・コンシーラーで自然に隠す方法、長期的な選択肢まで解説。"
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズのヒゲは「なくす」より「整える」が基本
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ヒゲを剃るか残すかは、職場の決まり、ヒゲの生え方、手入れにかけられる時間の3つで判断します。剃る場合は、毛の流れを確認したうえで、肌に負担をかけないように剃り残しを減らしましょう。
            </p>

            <p className="mt-5">
              残す場合は、長めの設定から長さをそろえ、首側と頬側の輪郭を決めることが大切です。カミソリ負けが続く場合は、道具と剃り方を見直し、改善しなければ皮膚科に相談してください。
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