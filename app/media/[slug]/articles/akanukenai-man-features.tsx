import Link from "next/link";
import { Fragment } from "react";

import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type AkanukenaiManFeaturesArticleProps = {
  article: Article;
};

type FeatureType = "手入れ不足" | "選び方のずれ" | "進め方";

type Feature = {
  number: string;
  type: FeatureType;
  title: string;
  reason: string;
  check: string;
  improvement: string;
  caution: string;
  href?: string;
  linkLabel?: string;
};

const tableOfContents = [
  {
    id: "types",
    label: "垢抜けない原因は3つのタイプに分かれる",
  },
  {
    id: "features",
    label: "垢抜けない男の特徴10選",
  },
  {
    id: "why-no-change",
    label: "努力しても変わらない3つのパターン",
  },
  {
    id: "self-check",
    label: "写真3枚でできるセルフチェック",
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

const featureTypes = [
  {
    type: "手入れ不足",
    title: "手入れ不足タイプ",
    description:
      "眉毛・ヒゲ・肌・服の状態など、整える作業が足りていない状態です。費用をあまりかけずに、短期間で変えやすいのが特徴です。",
  },
  {
    type: "選び方のずれ",
    title: "選び方のずれタイプ",
    description:
      "髪型や服のサイズなど、選んだもの自体が今の自分に合っていない状態です。手入れを頑張っても変わりにくく、選び直しが必要です。",
  },
  {
    type: "進め方",
    title: "進め方タイプ",
    description:
      "改善の順番や続け方に原因がある状態です。見た目そのものより、取り組み方を見直すことで結果が変わります。",
  },
];

const features: Feature[] = [
  {
    number: "01",
    type: "選び方のずれ",
    title: "髪型を何年も変えていない",
    reason:
      "髪は伸びると重さが下にたまり、サイドが膨らんだり襟足がはねたりして、輪郭がぼやけて見えやすくなります。また、学生時代と同じ髪型のままだと、年齢や服装の変化と合わなくなっていることがあります。",
    check:
      "寝ぐせを直しただけの状態で正面と横から写真を撮り、「前髪が目にかかっている」「耳周りの髪が外にはねている」「襟足がシャツの襟に触れている」のどれかに当てはまるかを確認します。当てはまる場合は、形が崩れているサインです。",
    improvement:
      "美容室では髪型の名前だけで頼まず、「朝のセットは5分以内」「ワックスは少量だけ使う」など、普段の手入れ時間と条件を伝えます。参考写真がある場合は、自分の髪質で再現できるかも確認しましょう。",
    caution:
      "SNSで人気の髪型でも、髪のくせや量によって仕上がりは大きく変わります。写真と同じにならなくても失敗とは限りません。",
    href: "/media/mens-akanuke-hairstyle",
    linkLabel: "似合う髪型の選び方と頼み方を見る",
  },
  {
    number: "02",
    type: "手入れ不足",
    title: "眉毛をほとんど整えていない",
    reason:
      "眉毛は目元の「枠」のような役割があります。眉間や眉の下に毛が散らばっていると輪郭がはっきりせず、目元が重く見えやすくなります。",
    check:
      "明るい場所で鏡を見て、眉頭の間（眉間）に毛があるか、眉の下からまぶたにかけて細かい毛が多いか、極端に長い毛が飛び出していないかを確認します。",
    improvement:
      "最初は形を変えず、長すぎる毛を眉用ハサミで切り、眉間と眉下の明らかにはみ出した毛だけを処理します。1か所整えるたびに、鏡から少し離れて全体を確認しましょう。",
    caution:
      "眉の上側を剃る、細く整えすぎるなど、形を大きく変えると不自然になりやすく、元に戻るまで時間がかかります。迷ったら眉毛サロンで相談するのも一つの方法です。",
    href: "/media/mens-akanuke-eyebrows",
    linkLabel: "失敗しない眉毛の整え方を見る",
  },
  {
    number: "03",
    type: "手入れ不足",
    title: "スキンケアをしていない",
    reason:
      "肌の乾燥による粉ふき、皮脂によるテカリ、赤みなどの色ムラは、顔全体の清潔感に影響しやすいポイントです。特に写真では、テカリが光を反射して実際より目立つことがあります。",
    check:
      "洗顔後に何もつけずに過ごしたとき、頬や口周りがつっぱるか、昼過ぎに額や鼻がテカるかを確認します。自分の肌が乾燥しやすいのか、皮脂が出やすいのかを知るだけでも、選ぶ商品が変わります。",
    improvement:
      "最初は洗顔・保湿・日焼け止めの3つに絞ります。テカリが気になる人も保湿は省かず、さっぱりした使用感のものを選ぶと続けやすくなります。",
    caution:
      "使用後に赤み・かゆみ・ひりつきが出た場合は使用を中止してください。ニキビや肌荒れが続く場合は、自己判断で商品を増やさず皮膚科に相談しましょう。",
    href: "/media/mens-skincare-beginner",
    linkLabel: "スキンケアの基本3ステップを見る",
  },
  {
    number: "04",
    type: "手入れ不足",
    title: "ヒゲ・鼻毛など細かい部分を放置している",
    reason:
      "口元や鼻は顔の中心にあり、会話中に相手の視線が向きやすい位置です。面積は小さくても、剃り残しや見えている鼻毛は「手入れをしていない」という印象につながりやすくなります。",
    check:
      "明るい場所で、鏡から30cmほど離れて正面と少し下からの角度で見ます。鼻の穴から毛先が見えていないか、あご下や首に剃り残しがないかを確認しましょう。",
    improvement:
      "鼻毛は専用のハサミやトリマーで、外から見える部分だけを短くします。ヒゲは剃るか残すかを決め、残す場合は長さと輪郭をそろえます。",
    caution:
      "鼻毛を抜くと炎症の原因になることがあります。ヒゲを深剃りしすぎて肌が荒れる場合は、シェービング剤や電気シェーバーの使用を検討しましょう。",
    href: "/media/mens-beard-grooming",
    linkLabel: "清潔感を出すヒゲの整え方を見る",
  },
  {
    number: "05",
    type: "選び方のずれ",
    title: "服のサイズ感が合っていない",
    reason:
      "大きすぎる服は肩が落ち、袖や裾が余ってシワやたるみが出るため、だらしなく見えやすくなります。小さすぎる服は窮屈に見えます。服の値段やブランドよりも、サイズの影響が大きいこともあります。",
    check:
      "手持ちの服を着て、「肩の縫い目が肩の先から大きくずれていないか」「袖が手の甲を半分以上覆っていないか」「パンツの裾が靴の上で何重にもたまっていないか」を確認します。",
    improvement:
      "手持ちの服のうち一番しっくりくるものを選び、着丈・身幅・袖丈を測って控えておきます。ネットで服を買うときは、表記サイズではなくこの実寸と比べると失敗しにくくなります。",
    caution:
      "ゆったりしたシルエットが前提のデザインもあります。大きめの服がすべて悪いわけではなく、意図したシルエットに見えているかで判断しましょう。",
  },
  {
    number: "06",
    type: "手入れ不足",
    title: "服や靴の状態より「新しいもの」を優先している",
    reason:
      "新しい服やアクセサリーを足しても、首元が伸びたTシャツ、毛玉のあるニット、汚れた靴などが残っていると、全体の印象は整いにくくなります。おしゃれさより先に、状態の悪さが目に入るためです。",
    check:
      "よく着る服を並べて、襟元の伸び、黄ばみ、毛玉、色あせを確認します。靴は、かかとのすり減りとつま先の汚れを見ましょう。",
    improvement:
      "「襟元が伸びたら部屋着にする」など、自分なりの買い替え基準を決めます。買い足す前に、よく着る服の状態を整えるほうが印象は変わりやすくなります。",
    caution:
      "香水は距離が近い相手には強く感じられることがあります。付ける場合は少量にとどめましょう。",
  },
  {
    number: "07",
    type: "選び方のずれ",
    title: "髪型も服も自己流だけで選んでいる",
    reason:
      "鏡に映る自分の顔は左右が反転しており、他人が見ている顔とは少し違います。また、毎日見ている自分の顔は変化に気づきにくく、似合っていないことを自分で判断するのは難しいものです。",
    check:
      "髪型や眉について、最後に人へ相談したのがいつかを思い出してみましょう。スマホのインカメラで撮った反転したままの写真ではなく、左右が反転していない写真で見ると、印象の違いに気づくことがあります。",
    improvement:
      "美容師には「似合う髪型」と漠然と聞くより、「今の髪型で気になっている点」と「普段の手入れ時間」を伝えるほうが、具体的な提案をもらいやすくなります。",
    caution:
      "SNSで見かける意見の多くは、ほかの人に向けた一般論です。自分の顔立ちや髪質を直接見た人の意見を優先しましょう。",
  },
  {
    number: "08",
    type: "進め方",
    title: "姿勢や表情を意識していない",
    reason:
      "猫背で首が前に出ると顔が下を向き、目元に影ができやすくなります。表情がこわばっていると、髪型や服装を整えていても暗い印象や近寄りにくい印象を与えることがあります。",
    check:
      "横向きの全身写真を撮り、耳が肩より大きく前に出ていないかを確認します。会話中の写真や動画があれば、口元がこわばっていないかも見てみましょう。",
    improvement:
      "スマホを見るときは画面を目の高さに近づけ、うつむく時間を減らします。人と話すときは、相手の顔を見るために少し顔を上げることを意識するだけでも印象は変わります。",
    caution:
      "無理に笑顔を作る必要はありません。首や肩、腰に痛みがある場合は、自己流で矯正しようとせず医療機関に相談してください。",
  },
  {
    number: "09",
    type: "進め方",
    title: "一度に全部変えようとして続かない",
    reason:
      "髪型・眉毛・スキンケア・服・筋トレを同時に始めると、費用と時間がかかり途中で止まりやすくなります。また、何を変えたことで印象が良くなったのかも分からなくなります。",
    check:
      "この1か月で始めたことが3つ以上あり、そのうち2週間以上続いているものが1つもなければ、このタイプに当てはまります。",
    improvement:
      "取り組むことを1つに絞り、2週間続けてから次へ進みます。美容室の予約のように1回で済むことと、保湿のように毎日続けることは、分けて考えると計画が立てやすくなります。",
    caution:
      "肌や体型のように変化に時間がかかるものは、数日で効果を判断しないようにしましょう。",
  },
  {
    number: "10",
    type: "進め方",
    title: "自分の改善ポイントを把握していない",
    reason:
      "垢抜けない原因は人によって違います。髪型を変えるべき人もいれば、眉毛を整えるだけで印象が変わる人もいます。他人の成功例は前提となる顔立ちや髪質が違うため、そのまま真似しても同じ結果になるとは限りません。",
    check:
      "この記事の10項目のうち、当てはまったものを書き出します。そのうえで、後半の「写真3枚でできるセルフチェック」で、実際に人から見える状態を確認しましょう。",
    improvement:
      "当てはまった項目を、上で紹介した3つのタイプに分けます。手入れ不足タイプは今日から、選び方のずれタイプは美容師などへの相談から、進め方タイプは取り組む数を減らすことから始めます。",
    caution:
      "当てはまる項目が多くても、顔立ちや人としての価値が低いという意味ではありません。整える順番が分かっていないだけの場合がほとんどです。",
    href: "/media/mens-akanuke-order",
    linkLabel: "垢抜ける順番を7ステップで見る",
  },
];

const noChangePatterns = [
  {
    number: "01",
    title: "原因のタイプと対策が合っていない",
    description:
      "サイズが合っていないことが原因なのに、同じサイズのまま新しい服を買い足しても印象は変わりません。髪型が合っていないのに、ワックスの量やセット方法だけを工夫しても限界があります。まず、自分の原因が手入れ不足なのか、選び方のずれなのかを見分けることが大切です。",
  },
  {
    number: "02",
    title: "自分が見ている距離と、人に見られる距離が違う",
    description:
      "自分の顔は、鏡で近くから正面を見ることがほとんどです。一方で、周りの人は1〜2mほど離れた距離から、斜めや横の角度も含めて全身を見ています。眉の細かな形にこだわっても、服のサイズや姿勢が崩れていれば、人から見た印象は変わりにくくなります。",
  },
  {
    number: "03",
    title: "変化を判断するタイミングがずれている",
    description:
      "髪型は切った直後が最も整っていて、数週間から数か月たつと少しずつ形が崩れていきます。反対に、スキンケアは数日では変化を感じにくいものです。すぐに効果が出ないからとやめてしまったり、カット直後の状態を基準にしたりすると、正しく判断できません。",
  },
];

const photoChecks = [
  {
    title: "1枚目：正面の顔（約1m）",
    items: [
      "前髪が目にかかっていないか",
      "眉間や眉下に余分な毛がないか",
      "鼻毛や剃り残しが見えていないか",
      "テカリや乾燥が目立っていないか",
    ],
  },
  {
    title: "2枚目：横顔（約1m）",
    items: [
      "耳周りや襟足の髪がはねていないか",
      "あご下や首に剃り残しがないか",
      "首が前に出すぎていないか",
    ],
  },
  {
    title: "3枚目：普段着の全身（約2m）",
    items: [
      "肩・袖・裾のサイズが合っているか",
      "服のシワ・毛玉・汚れが目立っていないか",
      "靴の汚れや傷みが目立っていないか",
      "背中が丸まっていないか",
    ],
  },
];

const faqs = [
  {
    question: "垢抜けない原因は顔立ちですか？",
    answer:
      "顔立ちだけで決まるわけではありません。この記事で紹介した10項目は、いずれも髪型・手入れ・服の選び方・習慣など、自分で変えられる部分です。顔立ちは変えなくても、整える部分を変えることで印象は改善できます。",
  },
  {
    question: "髪型や服を変えたのに垢抜けないのはなぜですか？",
    answer:
      "原因のタイプと対策が合っていない可能性があります。たとえば眉毛やヒゲなどの手入れ不足が残っていると、髪型や服を変えても全体の印象は整いにくくなります。セルフチェックで、人から見える状態を確認してみましょう。",
  },
  {
    question: "お金をかけないと垢抜けるのは難しいですか？",
    answer:
      "必ずしも高額な費用は必要ありません。眉間の毛を整える、鼻毛を処理する、服や靴の状態を整える、姿勢を意識するなど、手入れ不足タイプの多くはほとんど費用をかけずに改善できます。",
  },
  {
    question: "何歳からでも垢抜けることはできますか？",
    answer:
      "年齢に関係なく、髪型・肌・服装・身だしなみを見直すことはできます。若い世代の流行をそのまま取り入れるより、年齢や生活に合った自然な整え方を選ぶことが大切です。",
  },
  {
    question: "自分では改善点が分からないときはどうすればいいですか？",
    answer:
      "左右が反転していない写真で、自分を人から見える状態で確認するのがおすすめです。そのうえで、髪型は美容師、眉毛は眉毛サロンなど、直接見てもらえる人に相談すると優先順位を決めやすくなります。",
  },
];

export default function AkanukenaiManFeaturesArticle({
  article,
}: AkanukenaiManFeaturesArticleProps) {
  return (
    <>
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
              「髪を切った」「新しい服を買った」。それなのに、なぜか印象が変わらないと感じていませんか？
            </p>

            <p className="mt-5">
              垢抜けない原因の多くは、顔立ちではなく、手入れの不足や、髪型・服の選び方のずれ、改善の進め方にあります。努力しているのに変わらない場合は、原因に合っていない対策をしている可能性があります。
            </p>

            <p className="mt-5">
              この記事では、垢抜けない男性に共通しやすい10の特徴を、原因の種類ごとに整理して解説します。それぞれの特徴について、なぜそう見えるのか、自分が当てはまるかの確認方法、改善方法、やりすぎに注意したい点を紹介します。
            </p>
          </section>

          <section
            id="types"
            className="scroll-mt-24 pt-14"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              3 TYPES
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けない原因は3つのタイプに分かれる
            </h2>

            <div className="mt-6 text-[14px] leading-8 text-black/80">
              <p>
                垢抜けない特徴は、大きく3つのタイプに分けられます。タイプによって、効果のある対策が異なります。
              </p>
            </div>

            <div className="mt-7 space-y-3">
              {featureTypes.map((featureType) => (
                <div
                  key={featureType.type}
                  className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
                >
                  <p className="text-[13px] font-bold">
                    {featureType.title}
                  </p>

                  <p className="mt-2 text-[12px] leading-7 text-black/70">
                    {featureType.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
              <p className="text-[12px] font-black text-[#1677FF]">
                タイプを見分けると、無駄な努力を減らせる
              </p>

              <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                手入れ不足が原因なのに新しい服を買ったり、選び方が原因なのに手入れの時間を増やしたりしても、印象は変わりにくくなります。各特徴に付いているタイプを参考に、自分の原因を見分けてみましょう。
              </p>
            </div>
          </section>

          <section
            id="features"
            className="scroll-mt-24 pt-16"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              10 FEATURES
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              垢抜けない男の特徴10選
            </h2>

            <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
              当てはまる項目があっても、すべてを一度に直す必要はありません。「確認方法」で当てはまるかを判断してから、改善に取り組みましょう。
            </p>

            <div className="mt-8 space-y-5">
              {features.map((feature, index) => (
                <Fragment key={feature.number}>
                  <section className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                        {feature.number}
                      </span>

                      <div className="min-w-0">
                        <p className="text-[10px] font-black tracking-[0.08em] text-[#1677FF]">
                          {feature.type}タイプ
                        </p>

                        <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.035em]">
                          {feature.title}
                        </h3>

                        <p className="mt-3 text-[13px] leading-7 text-black/75">
                          {feature.reason}
                        </p>

                        <div className="mt-4 rounded-[14px] border border-black/10 bg-[#F8FAFC] px-4 py-3">
                          <p className="text-[11px] font-bold leading-6 text-black/65">
                            <span className="mr-2 font-black text-[#1677FF]">
                              確認方法
                            </span>

                            {feature.check}
                          </p>
                        </div>

                        <div className="mt-3 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                          <p className="text-[11px] font-bold leading-6 text-black/65">
                            <span className="mr-2 font-black text-[#9A7800]">
                              改善ポイント
                            </span>

                            {feature.improvement}
                          </p>
                        </div>

                        <p className="mt-3 text-[11px] leading-6 text-black/60">
                          <span className="mr-2 font-black text-black/70">
                            注意
                          </span>

                          {feature.caution}
                        </p>

                        {feature.href && feature.linkLabel && (
                          <Link
                            href={feature.href}
                            className="mt-4 inline-flex items-center gap-2 text-[11px] font-black text-[#1677FF] transition hover:opacity-70"
                          >
                            {feature.linkLabel}
                            <span aria-hidden="true">→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </section>

                  {index === 4 && (
                    <AdSenseAd
                      className="my-8"
                      format="rectangle"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </section>

          <section
            id="why-no-change"
            className="scroll-mt-24 pt-16"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              WHY NO CHANGE
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              努力しても変わらない3つのパターン
            </h2>

            <p className="mt-5 text-[14px] leading-8 text-black/80">
              髪型や服を変えたのに印象が変わらない場合、次の3つのどれかに当てはまっていることがあります。
            </p>

            <div className="mt-7 space-y-3">
              {noChangePatterns.map((pattern) => (
                <div
                  key={pattern.number}
                  className="rounded-[16px] border border-black/10 p-5"
                >
                  <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                    PATTERN {pattern.number}
                  </p>

                  <p className="mt-2 text-[13px] font-bold">
                    {pattern.title}
                  </p>

                  <p className="mt-2 text-[12px] leading-7 text-black/70">
                    {pattern.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="self-check" className="scroll-mt-24 pt-16">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              SELF CHECK
            </p>

            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">
              写真3枚でできるセルフチェック
            </h2>

            <p className="mt-5 text-[14px] leading-8 text-black/80">
              鏡で見る自分は、近い距離から正面を見た姿で、しかも左右が反転しています。人から見える状態を確認するには、写真を使うのが手軽です。
            </p>

            <p className="mt-5 text-[14px] leading-8 text-black/80">
              スマホのタイマー機能などを使い、窓の近くなど明るい場所で、普段の髪型と服装のまま次の3枚を撮影します。インカメラを使う場合は、左右が反転しない設定にしておきましょう。
            </p>

            <div className="mt-6 space-y-3">
              {photoChecks.map((photoCheck) => (
                <div
                  key={photoCheck.title}
                  className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6"
                >
                  <h3 className="text-[16px] font-bold">
                    {photoCheck.title}
                  </h3>

                  <ul className="mt-4 space-y-3 text-[13px] leading-7 text-black/75">
                    {photoCheck.items.map((item) => (
                      <li key={item}>□ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] leading-6 text-black/60">
              ※これは医学的な診断や外見の点数付けではなく、身だしなみを見直すための任意のチェックです。
            </p>

            <h3 className="mt-9 text-[17px] font-bold">チェックが付いた項目の進め方</h3>

            <p className="mt-4 text-[13px] leading-7 text-black/75">
              チェックが付いた項目を、特徴10選のタイプに当てはめます。手入れ不足タイプの項目は今日から、選び方のずれタイプの項目は次の美容室や買い物のタイミングで見直します。複数ある場合は、1つを2週間続けてから次へ進みましょう。
            </p>

            <div className="mt-8">
              <p className="text-[13px] font-black">
                どこから始めるか迷ったら
              </p>

              <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                改善に取り組む順番は、次の記事で詳しく解説しています。
              </p>

              <div className="mt-4">
                <JournalRelatedArticleLink
                  href="/media/mens-akanuke-order"
                  title="メンズが垢抜ける順番｜初心者が最初にやるべき7ステップ"
                  description="髪型・眉毛・肌・服装など、何から取り組むと効率的かを7ステップで確認できます。"
                />
              </div>
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
            <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
              <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                AI BEAUTY DIAGNOSIS
              </span>
            </div>

            <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
              自分はどこから変えるべき？
            </h2>

            <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
              AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。あなたが優先して改善したいポイントを整理します。
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
              垢抜けない男性についてよくある質問
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
              原因のタイプを見分けることが、最初の一歩
            </h2>

            <div className="mt-5 text-[14px] leading-8 text-black/80">
              <p>
                垢抜けない原因は、手入れ不足、選び方のずれ、進め方の3つのタイプに分けられます。努力しても変わらないときは、原因と対策のタイプが合っていない可能性があります。
              </p>

              <p className="mt-5">
                まずは写真3枚で人から見える状態を確認し、当てはまった項目の中から1つを選んで取り組みましょう。手入れ不足タイプの項目なら、今日からでも始められます。
              </p>

              <p className="mt-5">
                自分では判断しにくい髪型や眉の形は、美容師や眉毛サロンなど、直接見てもらえる人に相談するのが確実です。
              </p>
            </div>

            <JournalArticleFooterNav
              secondaryHref="/upload"
              secondaryLabel="無料で診断をはじめる"
              secondaryVariant="diagnosis"
            />
          </section>

          <p className="sr-only">
            {article.title}
          </p>
        </div>
      </div>
    </>
  );
}
