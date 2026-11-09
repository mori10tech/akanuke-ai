import Link from "next/link";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensSkinRednessArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "causes", label: "男性の肌が赤くなる主な原因" },
  { id: "check", label: "自分の赤みのタイプを確認する" },
  { id: "care", label: "自分でできる赤み対策" },
  { id: "shaving", label: "ひげ剃りで赤くならないために" },
  { id: "cover", label: "赤みが気になる日の整え方" },
  { id: "doctor", label: "皮膚科に相談したほうがいいサイン" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const causes = [
  {
    title: "ひげ剃りや洗顔による刺激",
    description:
      "カミソリの刃が何度も当たる、洗顔で顔をこする、タオルで強くふくといった摩擦は、肌に赤みが出る原因になります。毎日ひげを剃る男性は、特に口元やあごに赤みが出やすくなります。",
  },
  {
    title: "乾燥",
    description:
      "洗いすぎや保湿不足で肌が乾燥すると、外からの刺激を受けやすくなり、赤みやヒリつきが出ることがあります。",
  },
  {
    title: "紫外線",
    description:
      "日焼けは、肌が赤くなる代表的な原因です。屋外で過ごした後に頬や鼻が赤くなる場合は、紫外線の影響が考えられます。",
  },
  {
    title: "ニキビとニキビ跡",
    description:
      "炎症を起こしているニキビの周りや、治った後のニキビ跡が、赤みとして残ることがあります。",
  },
  {
    title: "温度差や飲酒による一時的なほてり",
    description:
      "暖かい部屋に入ったときや、お酒を飲んだときに顔が赤くなるのは、多くの人に起こる一時的な反応です。ただし、すぐに引かない赤みが続く場合は、下で紹介する皮膚の病気の可能性もあります。",
  },
];

const checkRows = [
  {
    pattern: "ひげ剃りの後、口元やあごだけが赤い",
    type: "剃るときの刺激",
    next: "剃り方と、剃った後の保湿を見直す",
  },
  {
    pattern: "頬や口元が赤く、つっぱり感やヒリつきがある",
    type: "乾燥",
    next: "洗顔の方法と保湿を見直す",
  },
  {
    pattern: "屋外で過ごした後に、頬や鼻が赤くなる",
    type: "紫外線",
    next: "日焼け止めを毎日使う",
  },
  {
    pattern: "ニキビやニキビ跡の周りだけが赤い",
    type: "ニキビ",
    next: "触らずに様子を見る。繰り返すなら皮膚科へ",
  },
  {
    pattern: "頬や鼻の赤みが、何週間も引かない",
    type: "皮膚の病気の可能性",
    next: "セルフケアより先に皮膚科に相談する",
  },
];

const careSteps = [
  {
    number: "01",
    title: "洗顔は泡で、こすらずに",
    description:
      "洗顔料をしっかり泡立て、手が肌に直接触れないように泡で洗います。すすぎはぬるま湯で行い、熱いお湯は避けます。洗った後は、タオルを押し当てるようにして水分を取ります。",
  },
  {
    number: "02",
    title: "洗顔後すぐに保湿する",
    description:
      "洗顔後は肌が乾燥しやすいため、時間を空けずに保湿します。赤みが気になるときは、香りやアルコールの刺激が少ない、シンプルな保湿剤を選ぶと安心です。",
  },
  {
    number: "03",
    title: "日焼け止めを毎日使う",
    description:
      "紫外線は、赤みの原因になるだけでなく、日本皮膚科学会のガイドラインでも、赤ら顔（酒皶）を悪化させる要因の一つに挙げられています。外に出る日は、季節を問わず日焼け止めを使いましょう。",
  },
  {
    number: "04",
    title: "新しい製品は少しずつ試す",
    description:
      "赤みが出やすい人は、新しいスキンケア用品を使い始めるときに注意が必要です。製品の注意表示を確認し、赤みやかゆみが出た場合はすぐに使用を中止してください。",
  },
];

const shavingTips = [
  {
    title: "剃る前に肌と毛をやわらかくする",
    description:
      "洗顔の後や入浴中など、肌と毛が水分を含んでやわらかくなったタイミングで剃ります。乾いた肌にカミソリを当てると、刺激が強くなります。",
  },
  {
    title: "毛の流れに沿って剃る",
    description:
      "毛の流れに逆らって剃ると深く剃れますが、肌への負担も大きくなります。赤みが出やすい人は、毛の流れに沿って剃ることから始めましょう。",
  },
  {
    title: "同じ場所に何度も刃を当てない",
    description:
      "剃り残しが気になっても、同じ場所を何度も往復させないようにします。肌への負担が気になる場合は、電気シェーバーも選択肢の一つです。",
  },
  {
    title: "剃った後は必ず保湿する",
    description:
      "剃った直後の肌は、刺激を受けやすい状態です。冷たい水で軽くすすいでから、保湿剤をなじませます。",
  },
];

const doctorSigns = [
  "頬や鼻の赤みが何週間も続き、ほてり感がある",
  "細い血管が透けて見える、ニキビのようなブツブツが繰り返し出る",
  "小鼻の横、眉間、髪の生え際などに、赤みと細かい皮むけがある",
  "かゆみ、ヒリつき、湿疹がある",
  "スキンケア用品を変えた後に赤みが出た",
  "目の充血や、まぶたの赤み・腫れを伴う",
];

const faqs = [
  {
    question: "赤みは、スキンケアで治りますか？",
    answer:
      "ひげ剃りの刺激や乾燥による一時的な赤みは、刺激を減らして保湿を続けることで落ち着くことがあります。ただし、何週間も続く赤みや、ブツブツを伴う赤みは、皮膚の病気が原因のこともあります。自己判断を続けず、皮膚科に相談しましょう。",
  },
  {
    question: "お酒を飲むと顔が赤くなるのは問題ですか？",
    answer:
      "お酒を飲んで一時的に顔が赤くなるのは、多くの人に起こる反応です。ただし、日本皮膚科学会のガイドラインでは、アルコールは赤ら顔（酒皶）の悪化要因の一つとされています。飲んでいないときも赤みが続く場合は、皮膚科に相談しましょう。",
  },
  {
    question: "赤みがあるときに、BBクリームを使ってもいいですか？",
    answer:
      "炎症や傷、かゆみがある部分には使わないでください。肌の状態が落ち着いていて、色ムラを整えたい場合は、少量を薄く使う方法があります。使った日は、夜に必ず落としましょう。",
  },
  {
    question: "赤ら顔は、何科に相談すればいいですか？",
    answer:
      "皮膚科に相談しましょう。赤みの原因によって、治療の方法は大きく異なります。いつから、どの部分が、どんなときに赤くなるかをメモして持っていくと、相談しやすくなります。",
  },
  {
    question: "ひげ剃りの後に毎回赤くなります",
    answer:
      "剃る前に肌をやわらかくする、毛の流れに沿って剃る、同じ場所に何度も刃を当てない、剃った後に保湿する、という4点を見直してみましょう。それでも赤みやブツブツが続く場合は、皮膚科に相談してください。",
  },
];

export default function MensSkinRednessArticle({
  article,
}: MensSkinRednessArticleProps) {
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
            「頬や口元がいつも赤い」「ひげを剃った後に赤くなる」「写真を撮ると、顔の赤みが目立つ」と悩んでいませんか？
          </p>

          <p className="mt-5">
            肌の赤みには、ひげ剃りや乾燥による一時的なものから、皮膚科での治療が必要なものまで、さまざまな原因があります。原因に合わない対策を続けると、かえって赤みが長引くこともあります。
          </p>

          <p className="mt-5">
            この記事では、男性の肌が赤くなる主な原因と、自分の赤みのタイプの見分け方、自分でできる対策、皮膚科に相談したほうがいいサインを解説します。
          </p>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              AKANUKE.AIの診断データより
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              AKANUKE.AIのAI診断の結果を集計したところ、肌の色ムラ・赤み・くすみを整えるケアが、およそ7件に6件（86.8%）の診断で必要と判定され、必要なケアの1位でした。
            </p>

            <Link
              href="/media/mens-akanuke-diagnosis-data"
              className="mt-3 inline-block text-[12px] font-bold text-[#1677FF] transition hover:opacity-70"
            >
              診断データの記事を見る →
            </Link>
          </div>
        </section>

        <section
          id="causes"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CAUSES
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            男性の肌が赤くなる主な原因
          </h2>

          <div className="mt-7 space-y-3">
            {causes.map((cause, index) => (
              <div
                key={cause.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  CAUSE {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {cause.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {cause.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#FFD400]/60 bg-[#FFF9D9] p-5">
            <p className="text-[12px] font-black text-[#9A7800]">
              皮膚の病気が原因のこともある
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              日本皮膚科学会のガイドラインでは、顔に赤み、細い血管の拡張、ほてり感が続く「酒皶（しゅさ）」という病気が紹介されています。いわゆる「赤ら顔」とも呼ばれ、主に中高年に見られます。紫外線、急な気温の変化、刺激の強い食べ物、アルコールが悪化要因に挙げられています。また、小鼻の横や眉間に赤みと細かい皮むけが出る場合は、別の皮膚の病気のこともあります。こうした赤みは、セルフケアだけで治そうとせず、皮膚科に相談しましょう。
            </p>
          </div>

          <p className="mt-5 text-[11px] font-medium leading-6 text-black/50">
            参考：
            <a
              href="https://www.dermatol.or.jp/dermatol/wp-content/uploads/xoops/files/guideline/zasou2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-[#1677FF]"
            >
              日本皮膚科学会「尋常性痤瘡・酒皶治療ガイドライン2023」
            </a>
          </p>
        </section>

        <section
          id="check"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CHECK
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            自分の赤みのタイプを確認する
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            赤みが出る場所とタイミングから、おおよその原因を考えることができます。ただし、これは目安です。判断に迷う場合や、複数に当てはまる場合は、皮膚科で相談しましょう。
          </p>

          <div className="mt-7 space-y-3">
            {checkRows.map((row) => (
              <div
                key={row.pattern}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <p className="text-[13px] font-bold leading-6">
                  {row.pattern}
                </p>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  考えられる原因：{row.type}
                </p>

                <p className="mt-1 text-[12px] font-bold leading-6 text-[#1677FF]">
                  まずやること：{row.next}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="care"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SELF CARE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            自分でできる赤み対策
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            一時的な赤みを落ち着かせるための基本は、肌への刺激を減らし、乾燥と紫外線から守ることです。
          </p>

          <div className="mt-8 space-y-5">
            {careSteps.map((step) => (
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
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-7 space-y-3">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="肌に負担をかけない洗顔と保湿の手順を解説しています。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-sunscreen"
              title="日焼け止めの選び方と塗り方を見る"
              description="効果が出る量と、塗り忘れやすい場所を解説しています。"
            />
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="shaving"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SHAVING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ひげ剃りで赤くならないために
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            口元やあごの赤みは、毎日のひげ剃りが原因になっていることがあります。次の4点を見直しましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {shavingTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[15px] font-black">
                  {tip.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-beard-grooming"
              title="ヒゲの整え方を見る"
              description="肌に負担をかけにくい剃り方と、道具の選び方を解説しています。"
            />
          </div>
        </section>

        <section
          id="cover"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COVER
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            赤みが気になる日の整え方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              大事な予定や写真を撮る日に赤みが気になる場合は、BBクリームやコンシーラーで目立たなくする方法もあります。顔全体の色ムラにはBBクリームを薄く、部分的な赤みにはコンシーラーを点で使います。
            </p>

            <p className="mt-5">
              ただし、隠すことは原因の対策にはなりません。炎症や傷、かゆみがある部分には使わず、使った日は夜に必ず落としましょう。
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <JournalRelatedArticleLink
              href="/media/mens-bb-cream"
              title="メンズBBクリームの使い方を見る"
              description="自然に見える量と色の選び方を解説しています。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-concealer"
              title="メンズコンシーラーの使い方を見る"
              description="ニキビ跡など、部分的な色ムラの隠し方を解説しています。"
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

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            次のような場合は、セルフケアを続けるより、皮膚科に相談しましょう。赤みの原因によって、必要な治療は大きく異なります。
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-[13px] leading-7 text-black/75">
            {doctorSigns.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>

          <p className="mt-5 text-[13px] font-medium leading-7 text-black/70">
            受診するときは、いつから、顔のどの部分が、どんなときに赤くなるかをメモしておくと、医師に伝えやすくなります。
          </p>
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
            肌の赤みについてよくある質問
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
            赤みは、原因を見分けてから対策する
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              男性の肌の赤みは、ひげ剃りや洗顔の刺激、乾燥、紫外線、ニキビなど、原因によって対策が変わります。まずは赤みが出る場所とタイミングを確認し、刺激を減らす、保湿する、日焼け止めを使うという基本から見直しましょう。
            </p>

            <p className="mt-5">
              何週間も続く赤みや、ほてり、ブツブツ、かゆみを伴う赤みは、皮膚の病気が原因のこともあります。セルフケアで治そうとせず、皮膚科に相談してください。
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
