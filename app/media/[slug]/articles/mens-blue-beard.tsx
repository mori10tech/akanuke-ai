import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {
  article: Article;
};

const tableOfContents = [
  {
    id: "cause",
    label: "青髭はなぜ目立つ？",
  },
  {
    id: "measures",
    label: "青髭対策は大きく3つ",
  },
  {
    id: "shaving",
    label: "まずは髭をきれいに剃る",
  },
  {
    id: "bb-cream",
    label: "BBクリームで自然にカバー",
  },
  {
    id: "concealer",
    label: "濃い青髭にはコンシーラー",
  },
  {
    id: "mistakes",
    label: "青髭を隠すときの失敗",
  },
  {
    id: "long-term",
    label: "長期的な選択肢",
  },
  {
    id: "cleanliness",
    label: "顔全体の清潔感も確認",
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

const measures = [
  {
    number: "01",
    title: "髭剃りで表面の髭を整える",
    description:
      "まずは毎日の髭剃りで、肌表面に出ている髭や剃り残しを整えます。ただし、青みをなくそうとして同じ場所を何度も強く剃るのは避けましょう。",
  },
  {
    number: "02",
    title: "BBクリームやコンシーラーでカバーする",
    description:
      "髭を剃っても残る青みは、BBクリームやコンシーラーを使って目立ちにくくする方法があります。青みの強さに合わせて使い分けます。",
  },
  {
    number: "03",
    title: "髭そのものを減らす方法を検討する",
    description:
      "毎日の髭剃りやメイクとは別に、医療脱毛など髭そのものにアプローチする選択肢もあります。費用・期間・リスクを確認したうえで検討しましょう。",
  },
];

const shavingPoints = [
  {
    title: "髭と肌を濡らしてから剃る",
    description:
      "乾いた状態で無理に深剃りするのではなく、洗顔後や入浴後など髭がやわらかくなった状態で剃ると整えやすくなります。",
  },
  {
    title: "シェービング剤を使う",
    description:
      "カミソリを使う場合はフォームやジェルなどを使い、肌との摩擦を抑えます。",
  },
  {
    title: "何度も同じ場所を剃らない",
    description:
      "青みが残って見えても、それが皮膚の下の髭によるものなら、繰り返し剃っても完全には消えません。肌への負担を増やさないことも大切です。",
  },
  {
    title: "剃った後は保湿する",
    description:
      "髭剃り後は乾燥や赤みが出ることがあります。自分の肌に合った化粧水や乳液などで整えましょう。",
  },
];

const mistakes = [
  {
    title: "BBクリームを厚く塗りすぎる",
    description:
      "青みを完全に消そうとして何度も重ねると、青髭よりもメイク感が目立つことがあります。まずは薄く全体を整えましょう。",
  },
  {
    title: "口周りだけ色を変える",
    description:
      "青髭部分だけを強くカバーすると、顔全体との境目が目立つことがあります。顔と首まで含めて色のバランスを確認します。",
  },
  {
    title: "青みが残るたびに深剃りする",
    description:
      "皮膚の下にある髭が透けている場合、肌表面を何度も剃っても解決しないことがあります。深剃りだけに頼らないようにしましょう。",
  },
];

const faqs = [
  {
    question: "青髭は髭を剃ればなくなりますか？",
    answer:
      "髭を剃ることで肌表面に出ている髭は処理できますが、皮膚の下に残る髭が透けている場合は、剃った直後でも青く見えることがあります。",
  },
  {
    question: "BBクリームだけでも青髭を隠せますか？",
    answer:
      "青みが比較的薄い場合は、BBクリームで目立ちにくくできることがあります。青みが強い場合は、BBクリームを厚く重ねるよりもコンシーラーを部分的に使う方法があります。",
  },
  {
    question: "青髭を隠すとメイクしていることが分かりませんか？",
    answer:
      "色選びや使用量によって仕上がりは変わります。少量を薄くなじませ、顔と首の色差やフェイスラインの境目を確認すると自然に仕上げやすくなります。",
  },
  {
    question: "青髭が気になる場合、毎日深剃りした方がいいですか？",
    answer:
      "必要以上に同じ場所を何度も剃ると、赤みやヒリつきなど肌への負担につながることがあります。剃り残しを整えることと、皮膚の下から透ける青みは分けて考えましょう。",
  },
  {
    question: "青髭を長期的に目立ちにくくする方法はありますか？",
    answer:
      "髭そのものを減らしたい場合は、医療脱毛などを検討する人もいます。費用・期間・施術内容・リスクなどを確認し、検討する場合は医療機関などで説明を受けたうえで判断してください。",
  },
];

export default function MensBlueBeardArticle({
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
            「毎朝きれいに髭を剃っているのに、口周りが青く見える」「夕方になると青髭が目立ってくる」と悩む男性もいるのではないでしょうか。
          </p>

          <p className="mt-5">
            青髭は、単純に髭をきれいに剃れていないから起こるとは限りません。肌表面の髭を剃っても、皮膚の下に残る黒い髭が透けることで、口周りやあごが青黒く見えることがあります。
          </p>

          <p className="mt-5">
            そのため、青みが気になるからと何度も深剃りするだけでは解決しない場合があります。
          </p>

          <p className="mt-5">
            この記事では、青髭が目立つ原因から、毎日の髭剃り、BBクリームやコンシーラーを使った自然なカバー方法、長期的な選択肢まで初心者向けに解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="cause"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CAUSE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            青髭はなぜ目立つ？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              髭を剃った直後でも青く見える場合、「剃り残しているのかな？」と思うかもしれません。
            </p>

            <p className="mt-5">
              ただし、カミソリや電気シェーバーで処理できるのは基本的に肌表面から出ている髭です。皮膚の下には髭が残っているため、その黒い色が肌越しに透けて青黒く見えることがあります。
            </p>

            <p className="mt-5">
              特に口周りやあごなど、太い髭が密集している部分では目立ちやすくなります。
            </p>

            <p className="mt-5">
              つまり、青髭があるからといって「髭剃りができていない」とは限りません。まずは剃り残しと、皮膚の下から透けている青みを分けて考えることが大切です。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              青髭対策の基本
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              「青い＝もっと深く剃ればいい」と考えず、まずは肌表面の剃り残しなのか、皮膚の下の髭が透けているのかを分けて考えましょう。
            </p>
          </div>
        </section>

        <section
          id="measures"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            3 MEASURES
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            青髭対策は大きく3つ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            青髭への対策は、「剃る」「隠す」「髭そのものを減らす」の3つに分けて考えると整理しやすくなります。
          </p>

          <div className="mt-8 space-y-4">
            {measures.map((item) => (
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
          id="shaving"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SHAVING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            まずは髭をきれいに剃る
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームやコンシーラーを使う場合でも、その前に肌表面の髭や剃り残しを整えておくことが基本です。
            </p>

            <p className="mt-5">
              長い髭や剃り残しがある状態で上からBBクリームを塗ると、肌表面が均一になりにくく、仕上がりも不自然になりやすくなります。
            </p>

            <p className="mt-5">
              一方で、青みを完全になくそうとして必要以上に深剃りするのも避けたいところです。青髭が皮膚の下の髭によるものであれば、同じ場所を何度も剃っても完全には消えません。
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {shavingPoints.map((item, index) => (
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
              href="/media/mens-beard-grooming"
              title="メンズのヒゲの整え方を見る"
              description="基本の剃り方・ヒゲを残す場合の考え方・肌荒れ対策まで初心者向けに解説。"
            />
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="bb-cream"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BB CREAM
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            薄い青髭ならBBクリームで自然にカバー
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              「メイクしているようには見せたくない」という男性が取り入れやすい方法のひとつがBBクリームです。
            </p>

            <p className="mt-5">
              BBクリームは青髭だけを完全に隠すためのものではなく、肌全体の色ムラや毛穴などを整えながら、青みを目立ちにくくするために使えます。
            </p>

            <p className="mt-5">
              ポイントは厚塗りしないことです。青髭を隠そうとして口周りだけ大量に塗ると、その部分だけ色や質感が変わって不自然に見えやすくなります。
            </p>

            <p className="mt-5">
              まずは顔全体へ薄くなじませ、青みが気になるところだけ少量を追加しましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-bb-cream"
              title="メンズBBクリームの使い方を見る"
              description="初心者向けに、選び方・基本の塗り方・自然に仕上げるコツを詳しく解説しています。"
            />
          </div>
        </section>

        <section
          id="concealer"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CONCEALER
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            濃い青髭にはコンシーラーという方法も
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              BBクリームを何度重ねても青みが目立つ場合、さらに厚く塗るより、コンシーラーを部分的に使う方法があります。
            </p>

            <p className="mt-5">
              コンシーラーは、BBクリームよりも狭い範囲をカバーしたいときに使いやすいアイテムです。鼻下やあごなど、青みが強い部分だけに少量使います。
            </p>

            <p className="mt-5">
              青みを補正するためにオレンジ系などの色を使う方法もあります。ただし、肌色や青みの強さによって合う色は異なるため、一度に濃く塗るのではなく少量ずつ調整しましょう。
            </p>

            <p className="mt-5">
              BBクリームと同じく、コンシーラーも「完全に消す」より、顔全体として自然に見えるところで止めるのがポイントです。
            </p>
          </div>

<div className="mt-7">
  <JournalRelatedArticleLink
    href="/media/mens-concealer"
    title="メンズコンシーラーの使い方を見る"
    description="青髭・ニキビ跡・クマを自然に隠す使い方や色選びを初心者向けに詳しく解説。"
  />
</div>

        </section>

        <section
          id="mistakes"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NG POINTS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            青髭を隠すときに避けたい3つの失敗
          </h2>

          <div className="mt-7 space-y-4">
            {mistakes.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {index + 1}
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
              </div>
            ))}
          </div>
        </section>

        <section
          id="long-term"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            LONG-TERM OPTION
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            青髭を長期的に目立ちにくくしたい場合
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              髭剃りやBBクリーム・コンシーラーは、その日の見た目を整えるための方法です。
            </p>

            <p className="mt-5">
              毎日の髭剃りそのものを負担に感じている場合や、髭そのものを減らしたい場合には、医療脱毛などを検討する人もいます。
            </p>

            <p className="mt-5">
              ただし、脱毛はすべての男性に必要なものではありません。費用・期間・施術内容・痛み・肌への影響などを確認し、将来ヒゲを残したくなる可能性も含めて判断することが大切です。
            </p>

            <p className="mt-5">
              検討する場合は、医療機関などで施術内容やリスクについて説明を受け、自分に合う方法か確認してください。
            </p>
          </div>
        </section>

        <section
          id="cleanliness"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CLEAN IMPRESSION
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            青髭だけでなく、顔全体の清潔感も確認
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              青髭が気になると、どうしても口周りだけに目が向きがちです。
            </p>

            <p className="mt-5">
              しかし、人の印象は青髭だけで決まるものではありません。髪型・眉毛・肌・ヒゲなど複数の要素が組み合わさって、顔全体の印象につながります。
            </p>

            <p className="mt-5">
              青髭を整えた後は、髪型が自分に合っているか、眉毛が伸びすぎていないか、肌が乾燥していないかなども一緒に確認してみましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-cleanliness-guide"
              title="メンズの清潔感を出す方法を見る"
              description="髪型・眉毛・肌・ヒゲ・服装など、清潔感を整えるポイントをまとめて解説。"
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
            青髭だけでなく、
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
            メンズの青髭についてよくある質問
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
            青髭は「剃る・隠す・減らす」を分けて考えよう
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              青髭は、髭を剃っていないから目立つとは限りません。皮膚の下に残っている髭が透けることで、きれいに剃った後でも青黒く見えることがあります。
            </p>

            <p className="mt-5">
              まずは肌に負担をかけすぎないように髭を整え、そのうえで青みが気になる場合はBBクリームやコンシーラーを使って自然にカバーする方法があります。
            </p>

            <p className="mt-5">
              そして青髭だけに注目するのではなく、髪型・眉毛・肌・ヒゲまで含めて顔全体を整えていくことが、第一印象を見直すうえで大切です。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/mens-bb-cream"
              title="メンズBBクリームの使い方"
              description="青髭・毛穴・肌の色ムラを自然にカバーする基本の塗り方を解説。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-beard-grooming"
              title="メンズのヒゲの整え方"
              description="基本の剃り方やヒゲを残す場合の整え方、肌荒れ対策まで詳しく解説。"
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
