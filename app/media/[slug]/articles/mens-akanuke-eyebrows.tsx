import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  {
    id: "importance",
    label: "メンズの垢抜けに眉毛が重要な理由",
  },
  {
    id: "features",
    label: "垢抜けて見える眉毛の特徴",
  },
  {
    id: "howto",
    label: "初心者向け眉毛の整え方",
  },
  {
    id: "mistakes",
    label: "メンズ眉毛でよくある失敗",
  },
  {
    id: "salon",
    label: "セルフケアと眉毛サロンの違い",
  },
  {
    id: "frequency",
    label: "眉毛を整える頻度",
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

const eyebrowFeatures = [
  {
    number: "01",
    title: "眉間の余分な毛が整っている",
    description:
      "眉間に毛が多く残っていると、眉毛同士がつながって見えたり、顔全体が重たい印象になったりすることがあります。眉頭そのものを削るのではなく、眉間に生えている明らかな余分な毛を整えるのが基本です。",
  },
  {
    number: "02",
    title: "眉下がすっきりしている",
    description:
      "眉下のまぶた側に生えている余分な毛を整えると、眉毛の輪郭が見えやすくなり、目元もすっきりした印象になります。ただし、眉毛本体まで削りすぎないことが重要です。",
  },
  {
    number: "03",
    title: "長すぎる毛が飛び出していない",
    description:
      "眉毛の形が悪いのではなく、一部の毛だけが長く伸びて輪郭から飛び出している場合もあります。コームで毛流れを確認し、必要な部分だけ長さを整えると自然に見えやすくなります。",
  },
  {
    number: "04",
    title: "細くしすぎず自然な太さが残っている",
    description:
      "垢抜けようとして眉毛を細くしすぎると、かえって不自然に見えることがあります。特に初心者は元の眉毛を大きく変えるより、本来の形を活かしながら余分な部分を整える方が失敗しにくいです。",
  },
];

const howToSteps = [
  {
    number: "01",
    title: "何もせず現在の眉毛を確認する",
    description:
      "いきなり剃ったり抜いたりせず、まず鏡で左右の眉毛を確認します。眉頭・眉山・眉尻の位置や、輪郭から離れて生えている毛をチェックしましょう。",
    point:
      "最初から理想の形を作ろうとせず、「明らかに余分な毛はどこか」を探すことから始めます。",
  },
  {
    number: "02",
    title: "眉毛をコームでとかす",
    description:
      "眉毛用コームを使って毛流れを整えます。毛が重なった状態では長さを判断しにくいため、カットする前にとかしておくことが大切です。",
    point:
      "強く押し付けず、普段の毛流れに沿って軽くとかせば十分です。",
  },
  {
    number: "03",
    title: "眉間などの余分な毛を処理する",
    description:
      "眉毛の輪郭から明らかに離れている毛を、眉用シェーバーなどで少しずつ処理します。特に眉間や眉下は変化を感じやすい部分です。",
    point:
      "迷う毛は残してください。一度剃ってしまうより、後から追加で整える方が安全です。",
  },
  {
    number: "04",
    title: "長すぎる毛だけをカットする",
    description:
      "コームで毛流れを確認し、眉毛の輪郭から大きく飛び出す長い毛があれば眉用ハサミで少しずつカットします。",
    point:
      "眉毛全体を同じ長さまで短くする必要はありません。切りすぎると毛量が少なく見えることがあります。",
  },
  {
    number: "05",
    title: "少し離れて左右を確認する",
    description:
      "処理が終わったら鏡へ近づいた状態だけで判断せず、少し離れて顔全体を確認します。眉毛単体ではなく、目元や髪型を含めたバランスを見ることが大切です。",
    point:
      "左右を完全に同じ形にする必要はありません。自然に見える範囲の違いなら問題ありません。",
  },
];

const mistakes = [
  {
    title: "眉毛を細くしすぎる",
    description:
      "余分な毛を整えているうちに眉毛本体まで削ると、本来の自然な太さがなくなってしまいます。初心者ほど「少し物足りない」と感じる程度で止める方が安全です。",
  },
  {
    title: "眉頭を剃りすぎる",
    description:
      "眉間を広く見せようとして眉頭まで大きく削ると、不自然な形になりやすくなります。眉頭ではなく、左右の眉毛の間にある余分な毛を中心に処理しましょう。",
  },
  {
    title: "左右を完全に同じ形にしようとする",
    description:
      "人の顔にはもともと左右差があります。一方を削って反対側へ合わせ続けると、結果的に両方とも細くなってしまうことがあります。",
  },
  {
    title: "一度に形を大きく変える",
    description:
      "初めて眉毛を整えるときに眉山や眉尻まで大きく作り直すと、失敗したときに戻しにくくなります。最初は元の形を活かすことを優先しましょう。",
  },
];

const faqs = [
  {
    question: "男性も眉毛を整えた方がいいですか？",
    answer:
      "必ず整えなければならないわけではありませんが、眉間や眉下の余分な毛、長く飛び出した毛を整えるだけでも目元がすっきり見えやすくなります。大きく形を変える必要はありません。",
  },
  {
    question: "メンズ眉毛は細い方が垢抜けて見えますか？",
    answer:
      "細ければ垢抜けて見えるとは限りません。顔立ちや元の眉毛によって似合う太さは異なります。初心者の場合は自然な太さを残し、輪郭を整えることから始めるのがおすすめです。",
  },
  {
    question: "眉毛は剃るのと抜くのではどちらがいいですか？",
    answer:
      "初心者は、まず眉用シェーバーなどで少しずつ整える方法が取り組みやすいです。毛を抜くと肌への刺激になる場合があり、処理した部分をすぐ元に戻すこともできないため、無理に抜く必要はありません。",
  },
  {
    question: "眉毛を整えるために何を用意すればいいですか？",
    answer:
      "基本的には眉用コーム、眉用ハサミ、眉用シェーバーがあると整えやすくなります。すべてを一度に揃えなくても、必要なものから用意すれば問題ありません。",
  },
  {
    question: "自分に似合う眉毛が分からない場合はどうすればいいですか？",
    answer:
      "自分で大きく形を変えず、まず余分な毛だけを整える方法があります。形そのものを変えたい場合や左右差が気になる場合は、メンズ眉毛サロンなどで相談するのも選択肢です。",
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
            「眉毛を整えた方がいいとは聞くけれど、どこを剃ればいいのか分からない」と悩んでいる男性も多いのではないでしょうか。
          </p>

          <p className="mt-5">
            眉毛は目元の印象に関わるパーツです。しかし、垢抜けるために眉毛を細くしたり、大きく形を変えたりする必要はありません。
          </p>

          <p className="mt-5">
            初心者の場合は、元の眉毛を活かしながら、眉間や眉下の余分な毛、長く飛び出した毛を少し整えるだけでも十分です。
          </p>

          <p className="mt-5">
            この記事では、眉毛を初めて整える男性に向けて、自然に見せるための基本的な考え方から具体的な手順、失敗しやすいポイントまで分かりやすく解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section id="importance" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            IMPORTANCE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズの垢抜けに眉毛が重要な理由
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              眉毛は目のすぐ上にあるため、会話をするときにも視線に入りやすいパーツです。眉毛の周囲が整っていると、目元の輪郭が分かりやすくなり、顔全体もすっきりした印象に見えやすくなります。
            </p>

            <p className="mt-5">
              一方で、眉間に余分な毛が多かったり、長い毛が不規則に飛び出していたりすると、髪型や服装を整えていても顔周りが整っていないように見えることがあります。
            </p>

            <p className="mt-5">
              重要なのは「眉毛の形を別物にすること」ではありません。まずは自分が持っている眉毛を活かし、余分な部分だけを整えることが自然な垢抜けにつながります。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              初心者が意識したいこと
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              「形を作る」より「余分な部分を整える」と考えるのがおすすめです。判断に迷う毛は残し、少しずつ調整すると失敗を防ぎやすくなります。
            </p>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            4 POINTS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            垢抜けて見える男性の眉毛の特徴
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            眉毛の正解は一つではありません。まずは次の4つを意識すると、自然な状態を保ちながら整えやすくなります。
          </p>

          <div className="mt-8 space-y-4">
            {eyebrowFeatures.map((feature) => (
              <div
                key={feature.number}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#111111] text-[11px] font-black text-white">
                    {feature.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold tracking-[-0.03em]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="howto" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            初心者向け｜メンズ眉毛の整え方5ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            初めての場合は、一度に完成させようとしないことが大切です。次の順番で少しずつ整えていきましょう。
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

        <section id="mistakes" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            MISTAKES
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ眉毛でよくある4つの失敗
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

        <section id="salon" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SELF CARE OR SALON
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            自分で整える？眉毛サロンへ行く？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              眉間や眉下の余分な毛を処理したり、長い毛を少しカットしたりする程度であれば、自宅でも取り組めます。
            </p>

            <p className="mt-5">
              一方で、「自分に似合う形が分からない」「左右差をどう整えればいいか分からない」「一度きれいな形を作ってほしい」という場合は、メンズ眉毛サロンを利用する方法もあります。
            </p>

            <p className="mt-5">
              特に初めて眉毛を大きく整えたい場合は、プロに形を作ってもらい、その後伸びてきた部分を自宅で維持する方法も選択肢になります。
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-black/10 bg-white p-5">
              <p className="text-[11px] font-black text-[#1677FF]">
                SELF CARE
              </p>

              <h3 className="mt-2 text-[17px] font-black">
                セルフケアがおすすめ
              </h3>

              <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                元の眉毛を大きく変えず、眉間・眉下・長い毛などを少し整えたい人。費用を抑えながら定期的にケアできます。
              </p>
            </div>

            <div className="rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
              <p className="text-[11px] font-black text-[#1677FF]">
                EYEBROW SALON
              </p>

              <h3 className="mt-2 text-[17px] font-black">
                眉毛サロンがおすすめ
              </h3>

              <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                自分に合う形が分からない人や、左右差・形そのものを整えたい人。一度プロへ相談して基準を作りたい場合にも向いています。
              </p>
            </div>
          </div>
        </section>

        <section id="frequency" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FREQUENCY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ眉毛を整える頻度は？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              眉毛が伸びる速さや毛量には個人差があるため、「必ず何日に一度」と決める必要はありません。
            </p>

            <p className="mt-5">
              毎日のように形を削るのではなく、鏡を見たときに眉間の毛や輪郭から飛び出した毛が気になってきたタイミングで整える方が、削りすぎを防ぎやすくなります。
            </p>

            <p className="mt-5">
              一度形を整えた後は、その形から明らかにはみ出してきた部分を中心にメンテナンスすると、状態を維持しやすくなります。
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

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
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

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ眉毛は「整えすぎない」ことが大切
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              垢抜けるために、眉毛を細くしたり大きく形を変えたりする必要はありません。まずは眉間や眉下の余分な毛、長く飛び出した毛を整えることから始めましょう。
            </p>

            <p className="mt-5">
              特に初心者は、元の眉毛を活かしながら少しずつ調整する方が自然に仕上がりやすく、失敗も防ぎやすくなります。
            </p>

            <p className="mt-5">
              眉毛以外にも何から変えればいいか迷っている場合は、髪型・肌・ヒゲ・服装まで含めて優先順位を整理してみましょう。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
  <JournalRelatedArticleLink
    href="/media/mens-akanuke-order"
    title="メンズが垢抜ける順番を見る"
    description="髪型・眉毛・肌など、初心者が取り組みたい順番を7ステップで解説。"
  />

  <JournalRelatedArticleLink
    href="/media/mens-akanuke-hairstyle"
    title="垢抜ける髪型の選び方を見る"
    description="自分に似合う髪型の考え方や、美容室での頼み方を初心者向けに解説。"
  />
</div>
        </section>
      </div>
    </div>
  );
}