import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  {
    id: "rule",
    label: "眉毛は「残す範囲」を先に決める",
  },
  {
    id: "guide",
    label: "眉頭・眉山・眉尻の目安の位置",
  },
  {
    id: "tools",
    label: "道具の選び方と使い分け",
  },
  {
    id: "howto",
    label: "失敗しにくい整え方6ステップ",
  },
  {
    id: "trouble",
    label: "失敗したときの対処法",
  },
  {
    id: "salon",
    label: "眉毛サロンを利用する場合",
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

const guidePoints = [
  {
    title: "眉頭",
    position: "目頭の真上あたり",
    description:
      "眉頭が目頭より大きく内側にあると、眉と眉の間が狭く見えます。眉間の毛を処理するときも、眉頭そのものは削らないようにしましょう。",
  },
  {
    title: "眉山",
    position: "黒目の外側から目尻の真上の間",
    description:
      "眉の中で一番高くなる位置です。自然に高くなっている位置があれば、無理に動かす必要はありません。",
  },
  {
    title: "眉尻",
    position: "小鼻と目尻を結んだ線の延長上",
    description:
      "細いペンやコームの柄を、小鼻と目尻に当てると確認できます。眉尻が眉頭の高さより大きく下がっていないかも見ておきましょう。",
  },
];

const tools = [
  {
    name: "眉用コーム",
    use: "毛流れを整え、長すぎる毛を見つける",
    note: "カットの前に必ず使います。スクリューブラシでも代用できます。",
  },
  {
    name: "眉用ハサミ",
    use: "輪郭から飛び出す長い毛を短くする",
    note: "先が細く小さいものが扱いやすく、切りすぎを防ぎやすくなります。",
  },
  {
    name: "眉用シェーバー",
    use: "眉間や眉下の、輪郭から離れた毛を処理する",
    note: "刃が肌に直接当たりにくい電動タイプは、初心者でも扱いやすい道具です。",
  },
  {
    name: "アイブロウペンシル",
    use: "残す範囲の下書き、薄い部分の描き足し",
    note: "髪色に近い色か、少し明るい色を選ぶと自然になじみます。",
  },
  {
    name: "毛抜き",
    use: "輪郭のすぐ近くの毛を1本ずつ処理する",
    note: "抜いた部分はしばらく生えてこないため、やり直しがききません。初心者は使わなくても十分です。",
  },
];

const howToSteps = [
  {
    number: "01",
    title: "髪型を整え、明るい場所で始める",
    description:
      "前髪の長さや分け目によって、眉の見え方は変わります。普段どおりに髪を整え、窓際など明るい場所で鏡を見ます。肌が乾いた状態のほうが、毛を判断しやすくなります。",
    point:
      "美容室で髪を切る予定が近い場合は、カットの後に眉を整えるのがおすすめです。",
  },
  {
    number: "02",
    title: "コームで毛流れを整える",
    description:
      "眉頭は上向きに、眉山から眉尻は斜め外向きに、毛の流れに沿ってとかします。重なっていた毛がそろうと、長すぎる毛や輪郭から外れた毛が見つけやすくなります。",
    point:
      "強く押し付けず、軽くとかせば十分です。",
  },
  {
    number: "03",
    title: "ペンシルで残す範囲を描く",
    description:
      "前の章の目安の位置を参考に、アイブロウペンシルで眉の輪郭を薄く描きます。特に眉の下側のラインを描いておくと、どこまで処理してよいかが分かります。",
    point:
      "眉の上側は形が変わりやすいため、初めての場合は輪郭を描かず、処理もしないのが安全です。",
  },
  {
    number: "04",
    title: "輪郭の外の毛だけを処理する",
    description:
      "描いた輪郭の外側にある、眉間や眉下の毛を、シェーバーで少しずつ処理します。毛の流れに沿って動かし、同じ場所を何度もこすらないようにします。",
    point:
      "輪郭に近くて迷う毛は残してください。後から処理するのは簡単ですが、処理した毛はすぐには戻りません。",
  },
  {
    number: "05",
    title: "長すぎる毛をカットする",
    description:
      "コームを眉に当てて毛を上にとかし、コームから飛び出した部分だけをハサミで切ります。眉全体を短くする必要はありません。",
    point:
      "一度に多く切らず、少しずつ切っては確認を繰り返します。",
  },
  {
    number: "06",
    title: "離れて確認し、翌日もう一度見る",
    description:
      "ペンシルの線を落としてから、鏡から少し離れて顔全体で確認します。その日のうちに直し続けず、翌日にもう一度見て、気になる部分があれば少しだけ整えます。",
    point:
      "左右を完全に同じ形にする必要はありません。人の顔にはもともと左右差があります。",
  },
];

const troubles = [
  {
    title: "剃りすぎた・細くなりすぎた",
    description:
      "生えてくるまでは、その部分を触らないようにします。薄くなった部分は、アイブロウペンシルで毛を1本ずつ描くように補うと自然に見えます。生えそろうまでの期間には個人差があります。",
  },
  {
    title: "左右の形がそろわない",
    description:
      "細くなったほうに合わせて反対側を削ると、両方とも細くなってしまいます。削るのではなく、足りない側をペンシルで描き足して調整しましょう。",
  },
  {
    title: "処理した後に赤みやかゆみが出た",
    description:
      "処理した部分をこすらず、保湿して様子を見ます。ニキビや肌荒れがある場所は、治るまで処理を避けましょう。赤みやかゆみが続く場合は、皮膚科に相談してください。",
  },
  {
    title: "眉の上を剃ってしまった",
    description:
      "眉の上側は、少し削るだけで形の印象が大きく変わります。伸びてくるまでは上側に触らず、ペンシルで元の輪郭を補いましょう。",
  },
];

const salonOrders = [
  "「眉を整えたと分かりにくいくらい、自然な仕上がりにしたいです」",
  "「自分で維持しやすい形にしてください」",
  "「自宅ではどこまで処理してよいか教えてください」",
];

const faqs = [
  {
    question: "男性も眉毛を整えた方がいいですか？",
    answer:
      "必ず整えなければならないわけではありません。ただ、眉間や眉下の余分な毛、長く飛び出した毛を整えるだけでも、目元の輪郭がはっきりしてすっきり見えやすくなります。",
  },
  {
    question: "メンズ眉毛は細い方が垢抜けて見えますか？",
    answer:
      "細いほど垢抜けて見えるとは限りません。元の眉の太さを残して輪郭を整えるほうが、自然に見えやすくなります。",
  },
  {
    question: "眉毛は剃るのと抜くのではどちらがいいですか？",
    answer:
      "初心者には、シェーバーで剃る方法がおすすめです。抜いた毛はしばらく生えてこないため、失敗したときにやり直しがききません。また、抜くことは肌への刺激にもなります。",
  },
  {
    question: "眉毛はどのくらいの頻度で整えればいいですか？",
    answer:
      "毛の伸びる速さには個人差があるため、決まった頻度はありません。一度形を整えた後は、輪郭からはみ出した毛が気になったときに、その部分だけを処理します。髪を切るタイミングに合わせて確認するのも一つの方法です。",
  },
  {
    question: "自分に似合う眉の形が分からない場合はどうすればいいですか？",
    answer:
      "まずは形を変えず、輪郭の外の毛だけを整える方法がおすすめです。形そのものを変えたい場合や左右差が大きい場合は、眉毛サロンで一度整えてもらい、その形を自宅で維持する方法もあります。",
  },
];

export default function MensAkanukeEyebrowsArticle({
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

          <p className="mt-1 text-[15px] font-black">目次</p>

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
            「眉毛を整えた方がいいとは聞くけれど、どこを剃ればいいのか分からない」「自分で整えたら細くなりすぎた」という経験はありませんか？
          </p>

          <p className="mt-5">
            眉毛の手入れで失敗する原因の多くは、どこまで処理してよいかを決めないまま剃り始めることです。先に「残す範囲」を決めておけば、初めてでも削りすぎを防げます。
          </p>

          <p className="mt-5">
            この記事では、眉の形の目安となる位置の見つけ方、道具の使い分け、残す範囲を決めてから整える6つのステップ、失敗したときの対処法を解説します。
          </p>
        </section>

        <section id="rule" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BASIC RULE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            眉毛は「残す範囲」を先に決める
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              眉毛は目元の「枠」のような役割をしています。眉間や眉下に毛が散らばっていると輪郭がぼやけ、目元が重く見えやすくなります。整えるときに目指すのは、眉の形を作り変えることではなく、この輪郭をはっきりさせることです。
            </p>

            <p className="mt-5">
              鏡を見ながら「この毛はいらない」と1本ずつ判断していくと、処理するほど基準があいまいになり、気づいたときには削りすぎていることがあります。先に残す範囲を決め、その外側だけを処理するのが失敗しないための基本です。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              処理していいのは「輪郭の外」だけ
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              初めての場合は、眉間と眉下の毛、輪郭から飛び出した長い毛の3つだけを整えます。眉の上側と、眉本体の毛には手を付けません。
            </p>
          </div>
        </section>

        <section id="guide" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            GUIDE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            眉頭・眉山・眉尻の目安の位置
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            残す範囲を決めるときは、次の3つの位置を目安にします。一般的に使われる目安で、顔立ちによって合う位置は少しずつ違います。元の眉が目安から少しずれていても、無理に合わせる必要はありません。
          </p>

          <div className="mt-8 space-y-4">
            {guidePoints.map((point, index) => (
              <div
                key={point.title}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#111111] text-[11px] font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold tracking-[-0.03em]">
                      {point.title}
                    </h3>

                    <p className="mt-1 text-[12px] font-bold text-[#1677FF]">
                      目安：{point.position}
                    </p>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tools" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TOOLS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            道具の選び方と使い分け
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            最初に必要なのは、コーム・ハサミ・シェーバーの3つです。ペンシルは残す範囲の下書きに使うため、あると失敗を防ぎやすくなります。
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {tool.name}
                </h3>

                <p className="mt-2 text-[12px] font-bold leading-6 text-[#1677FF]">
                  {tool.use}
                </p>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {tool.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="howto" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            初心者向け｜失敗しにくい眉毛の整え方6ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            一度で完成させようとしないことが大切です。次の順番で、少しずつ整えていきましょう。
          </p>

          <div className="mt-8 space-y-5">
            {howToSteps.map((step) => (
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

        <AdSenseAd className="mt-10" format="rectangle" />

        <section id="trouble" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TROUBLESHOOTING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            失敗したときの対処法
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            失敗したときに慌てて直そうとすると、さらに削りすぎてしまうことがあります。次のように対処しましょう。
          </p>

          <div className="mt-7 grid gap-4">
            {troubles.map((trouble, index) => (
              <div
                key={trouble.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {trouble.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {trouble.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="salon" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            EYEBROW SALON
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            眉毛サロンを利用する場合
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              輪郭の外の毛を整える程度であれば、自宅で十分にできます。一方で、眉の形そのものを変えたい場合、左右差が大きい場合、自分で整えるのが不安な場合は、眉毛サロンで一度整えてもらう方法があります。
            </p>

            <p className="mt-5">
              プロに整えてもらった形は、その後自宅で維持するときの基準になります。伸びてきた毛だけを自分で処理すれば、形を崩さずに保ちやすくなります。施術の方法や料金はサロンによって違うため、予約前に確認しましょう。
            </p>
          </div>

          <div className="mt-7 rounded-[22px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6">
            <p className="text-[12px] font-black text-[#1677FF]">
              サロンで伝えると失敗しにくいこと
            </p>

            <ul className="mt-4 space-y-2 text-[13px] font-bold leading-7 text-[#111111]">
              {salonOrders.map((order) => (
                <li key={order}>{order}</li>
              ))}
            </ul>

            <p className="mt-4 text-[12px] leading-6 text-black/60">
              職場の雰囲気や、普段の髪型も伝えておくと、生活に合った形を提案してもらいやすくなります。
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

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。自分はどこから整えるべきかを確認できます。
          </p>

          <JournalDiagnosisCta />
        </section>

        <section id="faq" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FAQ
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズ眉毛についてよくある質問
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

        <section id="summary" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SUMMARY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            残す範囲を決めてから、外側だけを整える
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              眉毛の手入れで大切なのは、形を作り変えることではなく、輪郭をはっきりさせることです。眉頭・眉山・眉尻の目安を参考にペンシルで残す範囲を描き、その外側にある眉間と眉下の毛、飛び出した長い毛だけを整えましょう。
            </p>

            <p className="mt-5">
              迷う毛は残し、その日のうちに直し続けないことも、失敗を防ぐコツです。眉の見え方は前髪にも左右されるため、髪型を整えた状態で確認するようにしましょう。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-hairstyle"
              title="垢抜ける髪型の選び方を見る"
              description="眉の見え方に関わる前髪や分け目も含めて、似合う髪型の決め方を解説しています。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-akanuke-order"
              title="垢抜ける順番を見る"
              description="眉の次に何を整えればいいか、全体の進め方を確認できます。"
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