import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensAkanukeDiagnosisDataArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "overview", label: "調査の概要" },
  { id: "results", label: "AIが判定した「必要なケア」ランキング" },
  { id: "skin-tone", label: "1位：肌色・色ムラの補正（86.8%）" },
  { id: "hair", label: "2位：髪のまとまり（75.0%）" },
  { id: "oil", label: "3位：皮脂・テカリ対策（61.8%）" },
  { id: "others", label: "4位以下の結果" },
  { id: "low", label: "少なかった項目の読み方" },
  { id: "priority", label: "結果から考える、最初の3ステップ" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const overviewRows = [
  {
    label: "集計期間",
    value: "2026年9月14日〜2026年11月8日",
  },
  {
    label: "対象",
    value: "AKANUKE.AIで行われたAI診断 68件（48人）",
  },
  {
    label: "集計した項目",
    value:
      "AIが顔写真をもとに判定した「必要なケア」（1回の診断につき最大5つ）",
  },
  {
    label: "集計方法",
    value:
      "各ケアが選ばれた診断の件数を、全68件に対する割合で算出。個人を特定できない形で集計",
  },
];

const results = [
  { rank: 1, label: "肌色・色ムラ補正", count: 59, percent: 86.8 },
  { rank: 2, label: "髪のまとまり", count: 51, percent: 75.0 },
  { rank: 3, label: "皮脂・テカリ対策", count: 42, percent: 61.8 },
  { rank: 4, label: "毛流れ・前髪セット", count: 36, percent: 52.9 },
  { rank: 5, label: "毛穴・洗顔ケア", count: 24, percent: 35.3 },
  { rank: 6, label: "青ヒゲ・ヒゲ影補正", count: 22, percent: 32.4 },
  { rank: 7, label: "紫外線対策", count: 19, percent: 27.9 },
  { rank: 8, label: "自然なツヤ感（髪）", count: 8, percent: 11.8 },
  { rank: 9, label: "髪の乾燥・ダメージケア", count: 3, percent: 4.4 },
  { rank: 10, label: "乾燥・保湿ケア", count: 2, percent: 2.9 },
];

const skinToneActions = [
  {
    title: "まずは洗顔と保湿で土台を整える",
    description:
      "赤みやくすみは、肌の乾燥や皮脂、洗い残しで目立ちやすくなります。補正の前に、朝晩の洗顔と保湿を習慣にすることが先です。",
  },
  {
    title: "全体はBBクリームで薄く整える",
    description:
      "顔全体の色ムラが気になる場合は、肌の色に近いBBクリームを少量だけ使います。塗ったと分からない程度の薄さが、自然に見せるコツです。",
  },
  {
    title: "目立つ部分だけコンシーラーで隠す",
    description:
      "ニキビ跡やクマなど、部分的に色が違う場所は、コンシーラーで点のように隠します。顔全体に厚く塗る必要はありません。",
  },
];

const hairActions = [
  {
    title: "根元から乾かして、広がりを抑える",
    description:
      "髪が自然に乾くのを待つと、寝ぐせや広がりの原因になります。洗ったらすぐに、根元から乾かすだけで、まとまり方が変わります。",
  },
  {
    title: "スタイリング剤は少量を後ろから付ける",
    description:
      "ワックスを前髪から付けると、量が多くなりすぎて重く見えます。少量を手のひらに広げ、後ろ・サイドから付けてから前髪を整えます。",
  },
  {
    title: "美容室で「まとまりやすさ」を相談する",
    description:
      "毎朝まとまらない場合は、髪の量や長さが今の髪質に合っていない可能性があります。カットの際に、まとまりにくい場所を具体的に伝えましょう。",
  },
];

const othersRows = [
  {
    label: "毛流れ・前髪セット",
    percent: "52.9%",
    description:
      "前髪の分け目や毛流れを整えることで、印象が変わると判定された診断です。半数を超える診断で選ばれており、髪は肌と並んで改善点を指摘されやすい部分です。",
    href: "/media/mens-hair-wax",
    linkLabel: "ワックスの付け方を見る",
  },
  {
    label: "毛穴・洗顔ケア",
    percent: "35.3%",
    description:
      "毛穴の汚れや洗い残しへのケアが必要と判定された診断です。皮脂・テカリ対策と同じく、洗顔の方法を見直すことから始めます。",
    href: "/media/mens-skincare-beginner",
    linkLabel: "スキンケアの基本を見る",
  },
  {
    label: "青ヒゲ・ヒゲ影補正",
    percent: "32.4%",
    description:
      "写真でヒゲの剃り跡やヒゲ影がはっきり確認できた診断です。約3件に1件で選ばれており、肌の色ムラと並んで、口元の印象を左右する項目です。",
    href: "/media/mens-blue-beard",
    linkLabel: "青ヒゲの対策を見る",
  },
  {
    label: "紫外線対策",
    percent: "27.9%",
    description:
      "今の肌の印象を保つために、紫外線対策が有効と判定された診断です。日焼けによる色ムラは、すぐには戻らないため、予防が大切です。",
    href: "/media/mens-sunscreen",
    linkLabel: "日焼け止めの選び方を見る",
  },
];

const priorities = [
  {
    number: "01",
    title: "洗顔と保湿で、肌の土台を整える",
    description:
      "上位の「肌色・色ムラ」「皮脂・テカリ」「毛穴」は、どれも毎日の洗顔と保湿が出発点です。まずは朝晩のスキンケアを1か月続けましょう。",
  },
  {
    number: "02",
    title: "髪を正しく乾かし、まとまりを作る",
    description:
      "4人に3人の診断で選ばれた「髪のまとまり」は、乾かし方で変わる部分が大きい項目です。道具を買い足す前に、今日から変えられます。",
  },
  {
    number: "03",
    title: "必要な人だけ、補正とスタイリングを足す",
    description:
      "土台ができてから、色ムラが残るならBBクリームやコンシーラー、毛流れが決まらないならスタイリング剤を足します。順番を守ると、やりすぎに見えにくくなります。",
  },
];

const faqs = [
  {
    question: "この結果は、日本人男性全体の傾向ですか？",
    answer:
      "いいえ。AKANUKE.AIを使った人の診断結果だけを集計したもので、日本人男性全体を代表するデータではありません。垢抜けに関心がある人が使うサービスのため、利用者の傾向が反映されている点に注意してください。",
  },
  {
    question: "AIの判定は正確ですか？",
    answer:
      "AIは、アップロードされた1枚の顔写真から判定しています。照明、カメラの性能、写真の角度によって、肌の色や髪の見え方は変わります。判定は、写真から分かる範囲の目安として活用してください。",
  },
  {
    question: "保湿ケアが必要な人は、ほとんどいないのですか？",
    answer:
      "そうではありません。肌の乾燥は、写真では判断しにくい状態です。今回の割合が低いのは、写真で分かる乾燥が少なかったためと考えられます。保湿は、肌の状態にかかわらず毎日のスキンケアの基本です。",
  },
  {
    question: "1回の診断で、いくつのケアが選ばれますか？",
    answer:
      "1回の診断につき、写真から確認できた特徴をもとに、重要度が高い順に最大5つ選ばれます。そのため、各項目の割合を合計すると100%を超えます。",
  },
  {
    question: "データは今後更新されますか？",
    answer:
      "診断の件数が増えた時点で、集計し直して記事を更新する予定です。更新した場合は、記事の更新日を変更します。",
  },
];

export default function MensAkanukeDiagnosisDataArticle({
  article,
}: MensAkanukeDiagnosisDataArticleProps) {
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
            「垢抜けたいけれど、髪・眉毛・肌のどこから手を付ければいいか分からない」という男性は少なくありません。
          </p>

          <p className="mt-5">
            AKANUKE.AIでは、顔写真をもとに、AIがその人に必要なケアを判定しています。この記事では、正式リリースから約2か月間に行われたAI診断の結果を集計し、どのケアが多く必要と判定されたのかを公開します。
          </p>

          <p className="mt-5">
            結果から見えてきたのは、多くの診断で、肌の色ムラと髪のまとまりという「毎日のケアで変えられる部分」が上位に挙がっていることです。集計結果と、そこから考える改善の優先順位を解説します。
          </p>
        </section>

        <section
          id="overview"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            OVERVIEW
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            調査の概要
          </h2>

          <dl className="mt-7 overflow-hidden rounded-[18px] border border-black/10">
            {overviewRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[96px_1fr] gap-3 border-b border-black/10 bg-white px-4 py-4 last:border-b-0 sm:grid-cols-[130px_1fr] sm:px-5"
              >
                <dt className="text-[13px] font-black leading-6 text-black/45">
                  {row.label}
                </dt>

                <dd className="text-[15px] font-medium leading-6 text-black/80">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[14px] font-black text-[#1677FF]">
              データを読むときの注意
            </p>

            <p className="mt-3 text-[14px] font-medium leading-7 text-black/70">
              AIは、アップロードされた顔写真1枚から、写真で確認できる特徴をもとに判定しています。照明や写真の写り方の影響を受けるため、肌や髪の状態を医学的に診断したものではありません。また、AKANUKE.AIの利用者の診断を集計したもので、男性全体の傾向を示すものではありません。
            </p>
          </div>
        </section>

        <section
          id="results"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            RESULTS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            AIが判定した「必要なケア」ランキング
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            集計した診断のうち、各ケアが選ばれた割合は次のとおりです。1回の診断で最大5つ選ばれるため、割合の合計は100%になりません。
          </p>

          <figure className="mt-7 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6">
            <ol className="space-y-4">
              {results.map((item) => (
                <li key={item.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[14px] font-bold leading-5 text-black/80">
                      <span className="mr-2 font-black text-[#1677FF]">
                        {item.rank}
                      </span>
                      {item.label}
                    </p>

                    <p className="shrink-0 text-[15px] font-black tabular-nums text-[#111111]">
                      {item.percent.toFixed(1)}%
                      <span className="ml-1 text-[10px] font-bold text-black/40">
                        （{item.count}件）
                      </span>
                    </p>
                  </div>

                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#EEF6FF]">
                    <div
                      className={`h-full rounded-full ${
                        item.rank <= 3
                          ? "bg-[#1677FF]"
                          : "bg-[#1677FF]/45"
                      }`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <figcaption className="mt-5 border-t border-black/5 pt-4 text-[13px] font-medium leading-6 text-black/55">
              AKANUKE.AIのAI診断68件（48人）を集計。集計期間：2026年9月14日〜2026年11月8日。
            </figcaption>
          </figure>

          <p className="mt-7 text-[16px] leading-8 text-black/80">
            上位3つの「肌色・色ムラ補正」「髪のまとまり」「皮脂・テカリ対策」は、いずれも半数以上の診断で選ばれました。以下では、それぞれの項目が何を意味するのか、どう改善すればよいのかを順に解説します。
          </p>
        </section>

        <section
          id="skin-tone"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NO.1 SKIN TONE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            1位：肌色・色ムラの補正（86.8%）
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              最も多く選ばれたのは、肌の色ムラ、赤み、くすみを自然に整えるケアです。およそ7件に6件の診断で選ばれました。
            </p>

            <p className="mt-5">
              肌の色ムラは、本人が鏡で見るよりも、写真や他人の目には目立って見えることがあります。顔の印象は、髪型や眉毛だけでなく、肌の色が均一に見えるかどうかにも大きく左右されます。
            </p>
          </div>

          <h3 className="mt-9 text-[17px] font-bold">改善の進め方</h3>

          <div className="mt-5 space-y-3">
            {skinToneActions.map((action, index) => (
              <div
                key={action.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  STEP {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[15px] font-bold">
                  {action.title}
                </p>

                <p className="mt-2 text-[14px] leading-7 text-black/70">
                  {action.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-3">
            <JournalRelatedArticleLink
              href="/media/mens-bb-cream"
              title="メンズBBクリームの使い方を見る"
              description="自然に見える量と塗り方、選び方を解説しています。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-concealer"
              title="メンズコンシーラーの使い方を見る"
              description="ニキビ跡やクマを部分的に隠す方法を解説しています。"
            />
          </div>
        </section>

        <section
          id="hair"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NO.2 HAIR
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            2位：髪のまとまり（75.0%）
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              2番目に多かったのは、髪の広がりを抑え、まとまりを良くするケアです。4件に3件の診断で選ばれました。4位の「毛流れ・前髪セット」（52.9%）とあわせると、髪に関する改善点を指摘された診断が多いことが分かります。
            </p>

            <p className="mt-5">
              髪のまとまりは、髪型そのものよりも、毎日の乾かし方とスタイリングで変わる部分が大きい項目です。美容室で髪型を変えなくても、今日から見直せます。
            </p>
          </div>

          <h3 className="mt-9 text-[17px] font-bold">改善の進め方</h3>

          <div className="mt-5 space-y-3">
            {hairActions.map((action, index) => (
              <div
                key={action.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  STEP {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[15px] font-bold">
                  {action.title}
                </p>

                <p className="mt-2 text-[14px] leading-7 text-black/70">
                  {action.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-3">
            <JournalRelatedArticleLink
              href="/media/mens-hair-drying"
              title="メンズの髪の乾かし方を見る"
              description="広がりを抑えてまとまりを作る乾かし方を解説しています。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-hair-wax"
              title="メンズのワックスの付け方を見る"
              description="ベタつかない量と、付ける順番を解説しています。"
            />
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="oil"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NO.3 OIL CONTROL
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            3位：皮脂・テカリ対策（61.8%）
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              3番目は、皮脂やテカリを抑えるケアです。6割を超える診断で選ばれました。額や鼻のテカリは、写真では光の反射として特に目立ちやすく、清潔感の印象を下げる原因になります。
            </p>

            <p className="mt-5">
              テカリが気になると、洗顔の回数を増やしたり、強くこすって洗ったりしがちです。しかし、洗いすぎは肌の乾燥につながることがあります。朝晩の洗顔を丁寧に行い、洗顔後は保湿をする、という基本を整えることが先です。
            </p>

            <p className="mt-5">
              5位の「毛穴・洗顔ケア」（35.3%）も、同じく洗顔の見直しから始められる項目です。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本を見る"
              description="洗顔と保湿の正しい手順を、初心者向けに解説しています。"
            />
          </div>
        </section>

        <section
          id="others"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            OTHERS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            4位以下の結果
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {othersRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col rounded-[18px] border border-black/10 bg-white p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[16px] font-black">
                    {row.label}
                  </h3>

                  <p className="shrink-0 text-[15px] font-black tabular-nums text-[#1677FF]">
                    {row.percent}
                  </p>
                </div>

                <p className="mt-2 flex-1 text-[14px] font-medium leading-7 text-black/70">
                  {row.description}
                </p>

                <a
                  href={row.href}
                  className="mt-3 text-[14px] font-bold text-[#1677FF] transition hover:opacity-70"
                >
                  {row.linkLabel} →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          id="low"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HOW TO READ
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            少なかった項目の読み方
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              「乾燥・保湿ケア」（2.9%）と「髪の乾燥・ダメージケア」（4.4%）は、ほとんど選ばれませんでした。ただし、これは「乾燥している人が少ない」という意味ではありません。
            </p>

            <p className="mt-5">
              肌の乾燥や髪のダメージは、手で触れたときの感触や、時間がたったときのつっぱり感で分かる状態です。顔写真1枚からは判断しにくいため、AIが「写真で確認できない問題を作らない」というルールに従った結果、選ばれにくくなっていると考えられます。
            </p>

            <p className="mt-5">
              つまり、今回のランキングは「写真で見て分かる印象の課題」の順番です。保湿は、写真に写るかどうかにかかわらず、毎日のスキンケアの基本として続けましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-toner-emulsion"
              title="化粧水と乳液の違いを見る"
              description="保湿の基本となる、化粧水と乳液の役割と使い方を解説しています。"
            />
          </div>
        </section>

        <section
          id="priority"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            3 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            結果から考える、最初の3ステップ
          </h2>

          <p className="mt-4 text-[15px] font-medium leading-7 text-black/70">
            集計結果をもとに、AKANUKE JOURNAL編集部が考える改善の順番です。
          </p>

          <div className="mt-8 space-y-5">
            {priorities.map((step) => (
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
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-order"
              title="垢抜けの順番を見る"
              description="髪・眉毛・肌・服装を、どの順番で整えればよいかを解説しています。"
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
            自分に必要なケアを、
            <br />
            顔写真で確認する
          </h2>

          <p className="mt-4 text-[15px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。この記事で紹介した項目のうち、自分にはどれが必要かを確認できます。
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
            診断データについてよくある質問
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
            上位の課題は、毎日のケアで変えられる
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              AKANUKE.AIのAI診断の結果を集計すると、「肌色・色ムラ補正」（86.8%）、「髪のまとまり」（75.0%）、「皮脂・テカリ対策」（61.8%）が、半数以上の診断で必要なケアに選ばれました。
            </p>

            <p className="mt-5">
              これらは、生まれつきの顔立ちではなく、洗顔と保湿、髪の乾かし方、少量の補正やスタイリングで変えられる部分です。まずは肌と髪の土台を整え、必要な人だけ補正を足す。この順番で進めることが、自然に垢抜けるための近道です。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-akanuke-order"
            secondaryLabel="垢抜けの順番を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}
