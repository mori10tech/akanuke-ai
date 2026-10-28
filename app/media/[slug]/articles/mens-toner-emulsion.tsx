import Image from "next/image";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensTonerEmulsionArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "difference", label: "化粧水と乳液の役割の違い" },
  { id: "both", label: "化粧水だけではだめな理由" },
  { id: "steps", label: "正しい使い方4ステップ" },
  { id: "skin-type", label: "肌の傾向別の組み合わせ" },
  { id: "all-in-one", label: "オールインワンとの違い" },
  { id: "mistakes", label: "よくある間違い" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const roles = [
  {
    name: "化粧水",
    role: "肌にうるおい（水分）を与える",
    description:
      "水を主な成分とした、さらっとした液体です。洗顔後の肌に水分を補い、肌をやわらかく整えて、次に使う乳液がなじみやすい状態にします。",
  },
  {
    name: "乳液",
    role: "うるおいを保ち、逃がしにくくする",
    description:
      "水分と油分を混ぜ合わせた、とろみのある液体です。油分が肌の表面をおおうことで、化粧水で与えた水分が逃げにくくなり、肌のうるおいを保ちます。",
  },
];

const steps = [
  {
    number: "01",
    title: "洗顔後、すぐに化粧水をつける",
    description:
      "洗顔後の肌は、時間がたつほど乾燥していきます。タオルで水分を押さえたら、間を空けずに化粧水をつけましょう。",
    point:
      "ひげを剃る日は、洗顔とひげ剃りの後に化粧水をつけます。",
  },
  {
    number: "02",
    title: "化粧水は手のひらで押さえてなじませる",
    description:
      "製品の表示どおりの量を手のひらに取り、両手で軽く温めてから、顔全体を包むように押さえてなじませます。パンパンとたたく必要はありません。",
    point:
      "一度で足りないと感じたら、量を増やすより、少量を2回に分けて重ねるほうがなじみやすくなります。",
  },
  {
    number: "03",
    title: "乳液を薄く広げる",
    description:
      "化粧水がなじんだら、乳液を手に取り、顔の中心から外側に向かって薄く広げます。乾燥しやすい頬や口の周りは、少し重ねて塗りましょう。",
    point:
      "皮脂が出やすい額や鼻は、ほかの部分より薄めで構いません。",
  },
  {
    number: "04",
    title: "手のひらで押さえて仕上げる",
    description:
      "最後に、手のひらで顔全体を軽く押さえて、乳液をなじませます。ベタつきが気になる場合は、少し時間を置くと落ち着きます。",
    point:
      "朝は、この後に日焼け止めを塗ります。",
  },
];

const skinTypes = [
  {
    type: "乾燥しやすい",
    sign: "洗顔後につっぱる、頬や口の周りが粉をふく",
    combination: "化粧水＋しっとりタイプの乳液",
    note: "乾燥が強い時期は、乳液の後にクリームを重ねるのも一つの方法です。",
  },
  {
    type: "皮脂が出やすい",
    sign: "昼過ぎに額や鼻がテカる",
    combination: "化粧水＋さっぱりタイプの乳液",
    note: "ベタつきが苦手な場合は、乳液のかわりにジェルタイプの保湿剤を使う方法もあります。",
  },
  {
    type: "部位によって違う",
    sign: "額や鼻はテカるのに、頬はつっぱる",
    combination: "化粧水＋乳液（部位で量を変える）",
    note: "乳液は、頬や口の周りに多めに、額や鼻は薄めに塗ります。",
  },
];

const mistakes = [
  {
    title: "化粧水だけで終わらせる",
    description:
      "化粧水の水分は、そのままにしておくと時間とともに蒸発していきます。化粧水の後は、乳液などで水分を保つようにしましょう。",
  },
  {
    title: "テカるから乳液を使わない",
    description:
      "皮脂が出やすい人も、肌の水分が足りていないことがあります。乳液を省くのではなく、さっぱりタイプを選んだり、量を減らしたりして調整しましょう。",
  },
  {
    title: "強くたたく・こすってなじませる",
    description:
      "強い刺激は、肌の負担になります。手のひらで包むように押さえるだけで、十分になじみます。",
  },
  {
    title: "順番を逆にする",
    description:
      "乳液を先に塗ると、油分が肌の表面をおおい、後から使う化粧水がなじみにくくなります。製品に特別な指示がない限り、化粧水 → 乳液の順に使いましょう。",
  },
];

const faqs = [
  {
    question: "化粧水と乳液はどちらか一つだけでもいいですか？",
    answer:
      "基本は両方を使うのがおすすめです。化粧水だけでは水分が逃げやすく、乳液だけでは水分を補う力が足りないことがあります。手間を減らしたい場合は、1本で両方の役割を持つオールインワンタイプを使う方法もあります。",
  },
  {
    question: "メンズ用でないとだめですか？",
    answer:
      "メンズ用である必要はありません。性別の表示より、さっぱり・しっとりなどの使用感が、自分の肌の傾向に合っているかで選びましょう。",
  },
  {
    question: "化粧水はコットンで付けたほうがいいですか？",
    answer:
      "手でもコットンでも構いません。手で付けるほうが、手間が少なく続けやすいでしょう。コットンを使う場合は、肌をこすらないように注意してください。",
  },
  {
    question: "朝と夜、両方使ったほうがいいですか？",
    answer:
      "はい。朝は日中の乾燥やひげ剃りの後の肌を整えるため、夜は洗顔後の乾燥を防ぐために、両方で使うのがおすすめです。",
  },
  {
    question: "使ったら肌がひりひりします",
    answer:
      "赤み・かゆみ・ひりつきが出た場合は、すぐに使用を中止してください。症状が続く場合は、皮膚科に相談しましょう。新しい製品は1つずつ試すと、合わないものを見つけやすくなります。",
  },
];

export default function MensTonerEmulsionArticle({
  article,
}: MensTonerEmulsionArticleProps) {
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
            「化粧水と乳液、何が違うの？」「化粧水だけでいいのでは？」と疑問に思っていませんか？
          </p>

          <p className="mt-5">
            化粧水と乳液は、どちらも肌を保湿するためのものですが、役割が違います。化粧水は肌にうるおいを与え、乳液はそのうるおいを保ちます。この違いを知っておくと、どちらか一方だけで終わらせることのデメリットや、自分の肌に合った選び方が分かります。
          </p>

          <p className="mt-5">
            この記事では、化粧水と乳液の役割の違い、正しい使い方、肌の傾向別の組み合わせ、オールインワンとの違い、よくある間違いを解説します。
          </p>
        </section>

        <section
          id="difference"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DIFFERENCE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            化粧水と乳液の役割の違い
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {roles.map((item) => (
              <div
                key={item.name}
                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-[18px] font-black">
                  {item.name}
                </h3>

                <p className="mt-2 text-[13px] font-bold text-[#1677FF]">
                  {item.role}
                </p>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              覚え方
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              化粧水は「水分を入れる」、乳液は「水分にふたをする」と考えると分かりやすくなります。そのため、使う順番は必ず「化粧水 → 乳液」です。
            </p>
          </div>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-toner-emulsion/mens-toner-emulsion-texture.webp"
              alt="さらっとした透明な化粧水と、とろみのある白い乳液の質感の比較"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              化粧水は水が主な成分でさらっとしており、乳液は水分と油分を含むため、とろみがあります。
            </figcaption>
          </figure>
        </section>

        <section
          id="both"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WHY BOTH
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            化粧水だけではだめな理由
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              化粧水をつけた直後は、肌がしっとりしたように感じます。しかし、化粧水の水分は、そのままにしておくと時間とともに蒸発していきます。化粧水だけでケアを終えると、しばらくして肌がつっぱったり、乾燥を感じたりすることがあります。
            </p>

            <p className="mt-5">
              乳液を重ねると、油分が肌の表面をおおい、水分が逃げにくくなります。「化粧水で水分を補い、乳液で保つ」という2つの役割がそろって、はじめて保湿が完成します。
            </p>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            4 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            化粧水と乳液の正しい使い方4ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            朝も夜も、洗顔の後に同じ手順で使います。量は、製品の表示を目安にしましょう。
          </p>

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
          id="skin-type"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SKIN TYPE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            肌の傾向別の組み合わせ
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            自分の肌の傾向に合わせて、乳液の使用感や量を調整しましょう。肌の傾向の確認方法は、スキンケアの基本の記事で紹介しています。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-toner-emulsion/mens-toner-emulsion-skin-type.webp"
              alt="乾燥しやすい肌、皮脂が出やすい肌、部位で違う肌それぞれに合う化粧水と乳液の組み合わせの図解"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              肌の傾向によって、乳液の使用感や量を変えるのがポイントです。
            </figcaption>
          </figure>

          <div className="mt-7 space-y-3">
            {skinTypes.map((item) => (
              <div
                key={item.type}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {item.type}
                </h3>

                <p className="mt-1 text-[11px] font-medium leading-6 text-black/60">
                  例：{item.sign}
                </p>

                <p className="mt-2 text-[13px] font-bold leading-6 text-[#1677FF]">
                  {item.combination}
                </p>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="自宅でできる肌の傾向の確認方法と、洗顔・保湿・日焼け止めの基本を解説しています。"
            />
          </div>
        </section>

        <section
          id="all-in-one"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            ALL IN ONE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            オールインワンとの違い
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              オールインワンは、化粧水と乳液などの役割を1本にまとめた製品です。1回塗るだけで済むため、手間をかけたくない人や、スキンケアを始めたばかりの人が続けやすいのが利点です。
            </p>

            <p className="mt-5">
              一方で、化粧水と乳液を別々に使う場合は、肌の状態に合わせて量や組み合わせを変えられます。たとえば、乾燥する冬だけ乳液をしっとりタイプにする、テカる部分だけ乳液を薄くするといった調整がしやすくなります。
            </p>

            <p className="mt-5">
              まずはオールインワンで習慣をつくり、肌の悩みが出てきたら、化粧水と乳液に分けて調整する、という順番でも構いません。
            </p>
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
            よくある4つの間違い
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {mistake.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {mistake.description}
                </p>
              </div>
            ))}
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
            化粧水と乳液についてよくある質問
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
            化粧水で与えて、乳液で保つ
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              化粧水は肌にうるおいを与え、乳液はそのうるおいを保ちます。どちらか一方では保湿が不十分になりやすいため、洗顔後は「化粧水 → 乳液」の順に使いましょう。
            </p>

            <p className="mt-5">
              乳液の使用感や量は、肌の傾向に合わせて調整します。手間をかけたくない場合は、オールインワンから始めるのも一つの方法です。朝は、乳液の後に日焼け止めを塗って仕上げます。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-sunscreen"
            secondaryLabel="日焼け止めの塗り方を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}