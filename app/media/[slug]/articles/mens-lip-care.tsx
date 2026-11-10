import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensLipCareArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "why", label: "唇が乾燥しやすい理由" },
  { id: "ng", label: "唇の荒れを悪化させるNG習慣" },
  { id: "choose", label: "メンズのリップクリームの選び方" },
  { id: "how", label: "リップクリームの塗り方とタイミング" },
  { id: "peeling", label: "皮がむけているときのケア" },
  { id: "doctor", label: "皮膚科に相談したほうがいいサイン" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const reasons = [
  {
    title: "角層が薄い",
    description:
      "唇は、顔のほかの部分に比べて、肌の表面を守る角層が薄くなっています。そのため、乾燥や摩擦などの刺激を受けやすい場所です。",
  },
  {
    title: "汗腺や皮脂腺がない",
    description:
      "顔の肌は、皮脂が自然にうるおいを守っていますが、唇には皮脂腺がありません。自分でうるおいを保つ力が弱く、外から保湿する必要があります。",
  },
  {
    title: "紫外線の影響を受けやすい",
    description:
      "唇には、紫外線から肌を守るメラニンを作る細胞がきわめて少なく、紫外線に対して無防備な状態です。",
  },
];

const ngHabits = [
  {
    title: "唇をなめる",
    description:
      "なめると一時的にうるおったように感じますが、唾液が乾くと、かえって乾燥が進みやすくなります。乾燥を感じたら、なめずにリップクリームを塗りましょう。",
  },
  {
    title: "ゴシゴシこする",
    description:
      "食後にナプキンやティッシュで強くふく、タオルで口元をこするといった摩擦は、薄い唇の角層を傷つけます。ふくときは、軽く押さえるようにします。",
  },
  {
    title: "むけた皮をはがす",
    description:
      "皮むけが気になっても、指や歯ではがさないようにします。まだはがれる準備ができていない部分まではがれて、出血や傷の原因になります。",
  },
  {
    title: "何もつけずに寝る",
    description:
      "唇の乾燥は、寝ている間にも進みます。朝起きたときに唇が荒れている人は、寝る前のケアを見直しましょう。",
  },
];

const chooseItems = [
  {
    name: "無香料・無着色",
    point: "香りや色が付いていないものは、毎日使っても目立たない",
    note: "人前で塗っても気づかれにくい",
  },
  {
    name: "ベタつきにくい使用感",
    point: "テカリが出にくい、さらっとしたタイプ",
    note: "メンズ向けの製品に多い",
  },
  {
    name: "UVカット",
    point: "SPFの表示がある、紫外線を防ぐタイプ",
    note: "屋外で過ごす時間が長い人に",
  },
  {
    name: "薬用（医薬部外品）",
    point: "唇の荒れを防ぐ有効成分が配合されたタイプ",
    note: "荒れやすい人や、乾燥する季節に",
  },
];

const timings = [
  {
    title: "朝のスキンケアの後",
    description:
      "顔の保湿と一緒に、唇にもリップクリームを塗ります。毎朝の習慣にすると、塗り忘れを防げます。",
  },
  {
    title: "食事の後",
    description:
      "食事や飲み物で、リップクリームは落ちてしまいます。食後に口元を軽く押さえてから、塗り直しましょう。",
  },
  {
    title: "乾燥を感じたとき",
    description:
      "唇がつっぱる、かさつくと感じたら、なめずにすぐ塗ります。持ち歩いておくと、こまめに塗り直せます。",
  },
  {
    title: "寝る前",
    description:
      "寝ている間の乾燥を防ぐため、寝る前に少し多めに塗ります。朝の唇の状態が変わります。",
  },
];

const faqs = [
  {
    question: "男性がリップクリームを塗るのは変ですか？",
    answer:
      "変ではありません。唇には皮脂腺がなく、性別に関係なく乾燥しやすい場所です。無香料・無着色で、ベタつきにくいタイプを選べば、塗っていることはほとんど分かりません。",
  },
  {
    question: "リップクリームは1日に何回塗ればいいですか？",
    answer:
      "回数は決まっていません。朝、食後、寝る前の3回を基本に、乾燥を感じたときに塗り直すのがおすすめです。製品に使用方法の記載がある場合は、それに従いましょう。",
  },
  {
    question: "ワセリンでも代用できますか？",
    answer:
      "ワセリンは、唇の表面をおおって乾燥から守る目的で使えます。荒れを防ぐ有効成分や、紫外線を防ぐ効果を求める場合は、目的に合ったリップクリームを選びましょう。",
  },
  {
    question: "リップクリームを塗っても、すぐに乾燥します",
    answer:
      "唇をなめる癖がないか、食後に塗り直しているかを確認しましょう。寝る前に多めに塗る習慣も効果的です。それでも荒れが続く場合は、使っているリップクリームが合っていない可能性もあります。",
  },
  {
    question: "口角が切れて痛みます",
    answer:
      "口角の切れが繰り返す、なかなか治らないといった場合は、皮膚科に相談しましょう。乾燥以外の原因が関係していることもあります。",
  },
];

export default function MensLipCareArticle({
  article,
}: MensLipCareArticleProps) {
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
            「唇がいつもカサカサしている」「皮がむけて、白く浮いて見える」と気になっていませんか？
          </p>

          <p className="mt-5">
            唇の乾燥や皮むけは、自分では気づきにくい一方で、会話をしている相手からはよく見える部分です。顔の肌を整えていても、唇が荒れていると、清潔感が下がって見えることがあります。
          </p>

          <p className="mt-5">
            この記事では、唇が乾燥しやすい理由と、荒れを悪化させるNG習慣、メンズのリップクリームの選び方と塗り方、皮がむけているときのケアを解説します。
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
            唇が乾燥しやすい理由
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            唇は、顔のほかの部分とは異なる特徴を持っています。資生堂によると、主に次の3つの理由から、唇は乾燥しやすく、刺激を受けやすい場所です。
          </p>

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
              href="https://www.shiseido.co.jp/sw/beautyinfo/DB009326/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-[#1677FF]"
            >
              資生堂「唇の乾燥をケアする方法」
            </a>
          </p>
        </section>

        <section
          id="ng"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NG HABITS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            唇の荒れを悪化させるNG習慣
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
          id="choose"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO CHOOSE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズのリップクリームの選び方
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            男性が毎日使うなら、塗っていることが目立たず、ベタつきにくいものを選ぶと続けやすくなります。そのうえで、生活や唇の状態に合わせて機能を選びましょう。
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {chooseItems.map((item) => (
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
            新しいリップクリームを使い始めて、唇が赤くなる、かゆくなるといった場合は、すぐに使用をやめてください。
          </p>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="how"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO APPLY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            リップクリームの塗り方とタイミング
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              リップクリームは、唇の表面をすべらせるように、力を入れずに塗ります。唇には縦方向の細かいしわがあるため、しわに沿って縦に動かすように塗ると、すき間までなじみやすくなります。唇の端まで、塗り残しがないようにしましょう。
            </p>

            <p className="mt-5">
              大切なのは、1回の塗り方よりも、こまめに塗ることです。次のタイミングを目安にしましょう。
            </p>
          </div>

          <div className="mt-7 space-y-3">
            {timings.map((timing, index) => (
              <div
                key={timing.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  TIMING {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[15px] font-bold">
                  {timing.title}
                </p>

                <p className="mt-2 text-[14px] leading-7 text-black/70">
                  {timing.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="顔の保湿と一緒に覚えたい、朝晩の手順を解説しています。"
            />
          </div>
        </section>

        <section
          id="peeling"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            PEELING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            皮がむけているときのケア
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              皮がむけているときは、むけた皮をはがさず、リップクリームで保湿を続けて、自然にはがれるのを待ちます。
            </p>

            <p className="mt-5">
              日中にこまめに塗っても乾燥が治まらない場合は、資生堂が紹介している「ラップパック」を夜に試す方法もあります。リップクリームを厚めに塗ってラップをのせ、入浴中の蒸気で唇を温めます。やわらかくなったらラップを外し、指の腹でやさしくなじませてから、もう一度リップクリームを塗ります。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[14px] font-black text-[#1677FF]">
              むけた皮が気になる日は
            </p>

            <p className="mt-3 text-[14px] font-medium leading-7 text-black/70">
              大事な予定がある日でも、皮を無理にはがさず、リップクリームを重ねて落ち着かせましょう。はがして出血すると、治るまでにかえって時間がかかります。
            </p>
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

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            唇の荒れの多くは乾燥によるものですが、次のような場合は、セルフケアを続けるより皮膚科に相談しましょう。
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-7 text-black/75">
            <li>唇が腫れている、強い痛みやかゆみがある</li>
            <li>小さな水ぶくれができている</li>
            <li>口角の切れや、唇のひび割れが繰り返す・治らない</li>
            <li>リップクリームや食べ物が触れた後に、赤みやかぶれが出る</li>
            <li>保湿を続けても、荒れが何週間も続く</li>
          </ul>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
            口元だけでなく、
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
            リップケアについてよくある質問
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
            唇は、なめずに、こまめに保湿する
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              唇は角層が薄く、皮脂腺もないため、顔の中でも特に乾燥しやすい場所です。なめる、こする、むけた皮をはがすといった習慣をやめ、無香料・無着色でベタつきにくいリップクリームをこまめに塗りましょう。
            </p>

            <p className="mt-5">
              朝のスキンケアの後、食後、寝る前を基本に、乾燥を感じたら塗り直します。腫れや水ぶくれ、繰り返すひび割れがある場合は、皮膚科に相談してください。
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
