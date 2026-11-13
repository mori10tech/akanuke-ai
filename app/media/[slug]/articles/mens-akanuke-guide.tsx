import Image from "next/image";
import Link from "next/link";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type Props = {
  article: Article;
};

type Method = {
  number: string;
  title: string;
  description: string;
  action: string;
  effort: string;
  href: string;
  linkLabel: string;
};

type Zone = {
  id: string;
  label: string;
  distance: string;
  title: string;
  description: string;
  methods: Method[];
};

const tableOfContents = [
  { id: "distance", label: "垢抜けて見えるかは「距離」で決まる" },
  { id: "data", label: "データで見る、改善点に挙がりやすい部分" },
  { id: "far", label: "遠くから見える部分の垢抜け方法" },
  { id: "middle", label: "会話の距離で見える部分の垢抜け方法" },
  { id: "near", label: "近くで見える部分の垢抜け方法" },
  { id: "overdo", label: "逆効果になりやすい5つのやりすぎ" },
  { id: "guide", label: "目的別に読みたい記事" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const distanceRows = [
  {
    distance: "約2m",
    scene: "すれ違う、待ち合わせで見つける",
    seen: "髪型のシルエット、服のサイズ、姿勢",
  },
  {
    distance: "約1m",
    scene: "向かい合って話す",
    seen: "髪のまとまり、眉毛、ヒゲ",
  },
  {
    distance: "約50cm",
    scene: "隣に座る、写真に写る",
    seen: "肌の色ムラ、テカリ・毛穴、唇・手元",
  },
];

const dataRows = [
  { label: "肌色・色ムラの補正", percent: "86.8%" },
  { label: "髪のまとまり", percent: "75.0%" },
  { label: "皮脂・テカリ対策", percent: "61.8%" },
  { label: "毛流れ・前髪セット", percent: "52.9%" },
];

const zones: Zone[] = [
  {
    id: "far",
    label: "FAR",
    distance: "約2m",
    title: "遠くから見える部分の垢抜け方法",
    description:
      "遠くからは、顔の細かい部分より、全体の形が先に目に入ります。ここが崩れていると、近くのケアをしても印象が変わりにくいため、最初に見直したい部分です。",
    methods: [
      {
        number: "01",
        title: "髪型を今の自分に合わせて選び直す",
        description:
          "髪型は、遠くから見たときのシルエットを最も大きく左右します。伸びて形が崩れた状態や、何年も同じ髪型のままの状態は、垢抜けない印象につながりやすくなります。",
        action:
          "美容室では髪型の名前だけでなく、「朝のセットにかけられる時間」「ワックスを使えるか」「避けたいこと」を伝えます。",
        effort: "1回の来店で変わる",
        href: "/media/mens-akanuke-hairstyle",
        linkLabel: "似合う髪型の選び方と頼み方",
      },
      {
        number: "02",
        title: "服はブランドより先にサイズを合わせる",
        description:
          "肩が落ちる、袖や裾が余るなど、サイズが合っていない服は、値段にかかわらずだらしなく見えやすくなります。新しい服を買う前に、手持ちの服のサイズと状態を確認しましょう。",
        action:
          "一番しっくりくる手持ちの服の着丈・身幅・袖丈を測っておき、買うときはその数字と比べます。首元が伸びた服や毛玉のある服は、外出用から外します。",
        effort: "手持ちの見直しは0円",
        href: "/media/akanukenai-man-features",
        linkLabel: "垢抜けない原因を3タイプで確認",
      },
      {
        number: "03",
        title: "姿勢を整え、顔を上げる",
        description:
          "猫背で首が前に出ると、顔に影ができやすく、髪型や服を整えても暗い印象に見えることがあります。姿勢は費用をかけずに変えられる部分です。",
        action:
          "スマホを見るときは画面を目の高さに近づけ、うつむく時間を減らします。人と話すときは、少し顔を上げることを意識します。",
        effort: "0円・習慣で変わる",
        href: "/media/mens-photo-tips",
        linkLabel: "写真で姿勢や角度を確認する方法",
      },
    ],
  },
  {
    id: "middle",
    label: "MIDDLE",
    distance: "約1m",
    title: "会話の距離で見える部分の垢抜け方法",
    description:
      "向かい合って話す距離では、顔周りの「手入れされているか」が分かります。髪型が整っていても、毎日のまとまりや眉、ヒゲで差が出る部分です。",
    methods: [
      {
        number: "04",
        title: "髪は根元から乾かして、まとまりを作る",
        description:
          "美容室では整っていたのに自分では再現できない場合、原因の多くは乾かし方です。髪は乾くときの形で固まるため、自然乾燥では生えぐせや寝ぐせが残ります。",
        action:
          "前髪から乾かし始め、指で髪をかき分けながら根元に風を当てます。最後に冷風を当てると、形が崩れにくくなります。ワックスはその後、少量を後ろから付けます。",
        effort: "毎日5〜10分",
        href: "/media/mens-hair-drying",
        linkLabel: "髪の乾かし方6ステップ",
      },
      {
        number: "05",
        title: "眉毛は「輪郭の外」だけを整える",
        description:
          "眉毛は目元の印象を決める部分です。眉間や眉下に毛が散らばっていると、目元がぼやけて重く見えます。一方で、細く整えすぎると不自然になります。",
        action:
          "ペンシルで残す範囲を描き、その外側にある眉間と眉下の毛、長く飛び出した毛だけを処理します。眉の上側と眉本体には手を付けません。",
        effort: "1回15分程度",
        href: "/media/mens-akanuke-eyebrows",
        linkLabel: "失敗しない眉毛の整え方",
      },
      {
        number: "06",
        title: "ヒゲは剃り残しと輪郭を整える",
        description:
          "口元とあごは、会話中に視線が向きやすい位置です。あご下の剃り残しや、昼過ぎに目立つ青ヒゲは、手入れ不足の印象につながりやすくなります。",
        action:
          "明るい場所で顔を少し上に向け、あご下と首の剃り残しを確認します。青ヒゲが気になる場合は、深剃りを繰り返さず、BBクリームやコンシーラーで目立ちにくくする方法もあります。",
        effort: "毎日の手入れ",
        href: "/media/mens-beard-grooming",
        linkLabel: "清潔感を出すヒゲの整え方",
      },
    ],
  },
  {
    id: "near",
    label: "NEAR",
    distance: "約50cm",
    title: "近くで見える部分の垢抜け方法",
    description:
      "隣に座る距離や写真では、肌の状態がはっきり見えます。変化に数週間かかる部分なので、ほかの改善と同時に、早めに習慣を始めておきましょう。",
    methods: [
      {
        number: "07",
        title: "洗顔・保湿・日焼け止めを毎日続ける",
        description:
          "肌の色ムラや乾燥、くすみは、毎日のスキンケアの影響を受けます。高価な商品を何種類もそろえる必要はなく、基本の3つを続けることが出発点です。",
        action:
          "朝は洗顔、ひげ剃り、保湿、日焼け止めの順に、夜は洗顔と保湿を行います。新しい商品は1つずつ試し、同じものを2週間ほど続けて様子を見ます。",
        effort: "朝晩それぞれ5分",
        href: "/media/mens-skincare-beginner",
        linkLabel: "スキンケアの基本3ステップ",
      },
      {
        number: "08",
        title: "テカリと毛穴は「洗いすぎない」で抑える",
        description:
          "テカリや毛穴の黒ずみが気になると、強く洗ったり何度も洗ったりしがちです。しかし、洗いすぎは肌の乾燥を招き、かえって状態を悪化させることがあります。",
        action:
          "洗顔は泡で包むようにやさしく行い、テカる部分も保湿は省かずにさっぱりタイプで調整します。日中は、あぶらとり紙で軽く押さえる程度にとどめます。",
        effort: "毎日の習慣",
        href: "/media/mens-oily-skin",
        linkLabel: "テカリを抑える方法",
      },
      {
        number: "09",
        title: "肌の色ムラは、必要な人だけ薄く整える",
        description:
          "スキンケアを続けても赤みや青ヒゲ、ニキビ跡が気になる場合は、BBクリームやコンシーラーで目立ちにくくする方法があります。目的は隠すことではなく、色をそろえることです。",
        action:
          "首の色に近いBBクリームを少量だけ顔全体に薄く伸ばし、残った部分だけをコンシーラーで整えます。塗った後は、首との色の差と横顔を確認します。",
        effort: "朝3分程度",
        href: "/media/mens-bb-cream",
        linkLabel: "BBクリームの自然な塗り方",
      },
      {
        number: "10",
        title: "唇と手元の乾燥を防ぐ",
        description:
          "唇の皮むけや、爪の汚れ、手荒れは、近い距離で意外と目に入る部分です。顔のケアに比べて見落とされやすく、少しの手間で差が出ます。",
        action:
          "リップクリームを乾燥する前から使い、皮むけは無理にはがさないようにします。爪は短く切りそろえ、指先の汚れも洗い流しておきます。",
        effort: "1日1〜2分",
        href: "/media/mens-lip-care",
        linkLabel: "唇の乾燥・皮むけ対策",
      },
    ],
  },
];

const overdoItems = [
  {
    title: "眉毛を細く整えすぎる",
    description:
      "細くするほど垢抜けるわけではありません。特に眉の上側を剃ると形が大きく変わり、元に戻るまで時間がかかります。",
  },
  {
    title: "BBクリームを厚く塗る",
    description:
      "隠そうとして重ね塗りすると、顔だけが白く浮いて見えます。完全に隠すより、色をそろえるところで止めましょう。",
  },
  {
    title: "流行の髪型を自分の髪質のまま真似する",
    description:
      "写真の髪型が似合うかは、髪質や生えぐせで変わります。美容師に、自分の髪で再現しやすいように調整してもらいましょう。",
  },
  {
    title: "一度に全部を変えようとする",
    description:
      "髪型、眉、スキンケア、服を同時に始めると、費用と時間がかかり続きにくくなります。1回で終わることと、毎日続けることを分けて進めます。",
  },
  {
    title: "香水やスタイリング剤を付けすぎる",
    description:
      "近い距離の相手には、香りや髪のベタつきは強く感じられます。どちらも「少なめ」を基本にしましょう。",
  },
];

const readingGuide = [
  {
    purpose: "何から始めればいいか知りたい",
    title: "メンズが垢抜ける順番｜初心者が最初にやるべき7ステップ",
    href: "/media/mens-akanuke-order",
    description:
      "順番を決める基準と、4週間で進めるスケジュール例を紹介しています。",
  },
  {
    purpose: "努力しても変わらない原因を知りたい",
    title: "垢抜けない男の特徴10選",
    href: "/media/akanukenai-man-features",
    description:
      "原因を3つのタイプに分け、写真3枚でできるセルフチェックを紹介しています。",
  },
  {
    purpose: "多くの人が指摘される改善点を知りたい",
    title: "AI診断のデータで分かった、男性の垢抜けで見直すべきポイント",
    href: "/media/mens-akanuke-diagnosis-data",
    description:
      "AKANUKE.AIの診断結果を集計し、どのケアが多く必要と判定されたかを公開しています。",
  },
];

const faqs = [
  {
    question: "メンズが垢抜けるには何から始めればいいですか？",
    answer:
      "迷った場合は、遠くから見える髪型から見直すのがおすすめです。顔周りで最も面積が大きく、眉の見え方などほかの部分にも影響するためです。ただし、肌のケアは変化に時間がかかるため、髪型と同時に始めておきましょう。",
  },
  {
    question: "お金をかけずに垢抜ける方法はありますか？",
    answer:
      "あります。手持ちの服のサイズと状態の見直し、姿勢、髪の乾かし方、眉間の毛の処理、ヒゲの剃り残しの確認などは、ほとんど費用をかけずに始められます。",
  },
  {
    question: "垢抜けるまでにどのくらいかかりますか？",
    answer:
      "髪型や眉は1回の手入れで変わりますが、肌は数週間から数か月かけて変わります。1か月を一区切りにして、始める前と同じ条件で写真を撮って比べると、変化を確認しやすくなります。",
  },
  {
    question: "顔立ちが良くないと垢抜けませんか？",
    answer:
      "この記事で紹介した10の方法は、いずれも髪型・手入れ・服装・習慣など、顔立ちに関係なく自分で変えられる部分です。顔立ちを変えなくても、整える部分を変えることで印象は改善できます。",
  },
  {
    question: "30代・40代からでも垢抜けられますか？",
    answer:
      "年齢に関係なく取り組めます。若い世代の流行をそのまま取り入れるより、年齢や仕事に合った髪型と、サイズの合った服を選ぶことが大切です。肌のケアは、年齢を重ねるほど差が出やすい部分です。",
  },
];

export default function MensAkanukeGuideArticle({
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
            「垢抜けたいけれど、髪型・眉毛・肌・服装のどれをどう変えればいいのか分からない」と悩んでいませんか？
          </p>

          <p className="mt-5">
            垢抜けるための方法はたくさんありますが、すべてを一度に取り入れる必要はありません。人は相手を見る距離によって、目に入る部分が変わります。どの距離で何が見られているかを知れば、自分に必要な方法を選びやすくなります。
          </p>

          <p className="mt-5">
            この記事では、垢抜けて見えるかを決める3つの距離と、AKANUKE.AIの診断データで改善点に挙がりやすかった部分、距離ごとの具体的な垢抜け方法10個、逆効果になりやすいやりすぎを解説します。
          </p>
        </section>

        <section
          id="distance"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            3 DISTANCES
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            垢抜けて見えるかは「距離」で決まる
          </h2>

          <div className="mt-6 text-[16px] leading-8 text-black/80">
            <p>
              自分の顔は、鏡に近づいて正面から見ることがほとんどです。一方で、周りの人は、離れた場所からの全身、会話中の顔周り、隣に座ったときの肌と、さまざまな距離からあなたを見ています。
            </p>

            <p className="mt-5">
              垢抜けない原因の一つは、自分が見ている距離と、人に見られている距離が違うことです。鏡の前で眉の形にこだわっても、遠くから見たシルエットが崩れていれば、印象は変わりにくくなります。
            </p>
          </div>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-akanuke-guide/mens-akanuke-guide-distance.webp"
              alt="約2m・約1m・約50cmの距離から見た同じ男性の写真と、それぞれの距離で目に入る部分"
              width={1671}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[13px] font-medium leading-6 text-black/65">
              約2mではシルエット、約1mでは髪・眉・ヒゲ、約50cmでは肌が目に入ります。
            </figcaption>
          </figure>

          <div className="mt-7 space-y-3">
            {distanceRows.map((row) => (
              <div
                key={row.distance}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[18px] font-black text-[#1677FF]">
                  {row.distance}
                </p>

                <p className="mt-1 text-[14px] font-medium leading-7 text-black/60">
                  {row.scene}
                </p>

                <p className="mt-2 text-[15px] font-bold leading-6">
                  見られる部分：{row.seen}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[14px] font-black text-[#1677FF]">
              基本は「遠く」から整える
            </p>

            <p className="mt-3 text-[14px] font-medium leading-7 text-black/70">
              遠くから見える部分は面積が大きく、変えたときの印象の差が出やすい部分です。ただし、肌のように変化に時間がかかるものは、遠くの部分と同時に習慣を始めておきましょう。
            </p>
          </div>
        </section>

        <section
          id="data"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DATA
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            データで見る、改善点に挙がりやすい部分
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            AKANUKE.AIでは、顔写真をもとにAIが必要なケアを判定しています。2026年9月14日から11月8日までに行われた診断68件を集計したところ、次の4つが半数以上の診断で選ばれていました。
          </p>

          <div className="mt-7 space-y-3">
            {dataRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 rounded-[14px] border border-black/10 bg-white px-5 py-4"
              >
                <p className="text-[15px] font-bold">
                  {row.label}
                </p>

                <p className="shrink-0 text-[18px] font-black text-[#1677FF]">
                  {row.percent}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[14px] leading-7 text-black/60">
            ※1回の診断につき最大5つのケアが選ばれるため、割合の合計は100%を超えます。AKANUKE.AIの利用者の診断を集計したもので、男性全体の傾向を示すものではありません。また、写真1枚から判定した目安であり、医学的な診断ではありません。
          </p>

          <p className="mt-6 text-[16px] leading-8 text-black/80">
            上位に挙がったのは、肌の色ムラと髪のまとまりという「毎日のケアで変えられる部分」でした。高価な商品を買う前に、洗顔・保湿と、髪の乾かし方を見直す価値があることが分かります。
          </p>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-diagnosis-data"
              title="診断データの詳しい結果を見る"
              description="10項目すべての割合と、結果から考える改善の優先順位を解説しています。"
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
            自分の改善ポイントをAIで確認
          </h2>

          <p className="mt-4 text-[15px] font-medium leading-6 text-black/70">
            多くの人に当てはまる傾向が、自分にも当てはまるとは限りません。AKANUKE.AIなら、顔写真から髪型・眉毛・肌・全体の印象をAIが分析し、あなたが優先して改善したいポイントを確認できます。
          </p>

          <JournalDiagnosisCta placement="middle" />
        </section>

        {zones.map((zone, zoneIndex) => (
          <section
            key={zone.id}
            id={zone.id}
            className="scroll-mt-24 pt-16"
          >
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              {zone.label} ・ {zone.distance}
            </p>

            <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
              {zone.title}
            </h2>

            <p className="mt-5 text-[16px] leading-8 text-black/80">
              {zone.description}
            </p>

            <div className="mt-8 space-y-5">
              {zone.methods.map((method) => (
                <section
                  key={method.number}
                  className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                      {method.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                        {method.title}
                      </h3>

                      <p className="mt-3 text-[15px] leading-7 text-black/75">
                        {method.description}
                      </p>

                      <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                        <p className="text-[13px] font-bold leading-6 text-black/65">
                          <span className="mr-2 font-black text-[#9A7800]">
                            やること
                          </span>

                          {method.action}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-black/10 bg-[#F8FAFC] px-3 py-1 text-[10px] font-bold text-black/60">
                          手間の目安：{method.effort}
                        </span>
                      </div>

                      <Link
                        href={method.href}
                        className="mt-4 flex min-h-[44px] items-center justify-between rounded-[12px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[13px] font-black text-[#1677FF] transition hover:bg-[#E3F0FF]"
                      >
                        <span>{method.linkLabel}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {zoneIndex === 0 && (
              <AdSenseAd
                className="mt-10"
                format="rectangle"
              />
            )}
          </section>
        ))}

        <section
          id="overdo"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NG POINTS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            逆効果になりやすい5つのやりすぎ
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            垢抜けようと頑張るほど、やりすぎて不自然になることがあります。次の5つは、特に失敗しやすいポイントです。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {overdoItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[16px] font-black">
                  {item.title}
                </h3>

                <p className="mt-2 text-[14px] font-medium leading-7 text-black/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="guide"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            READING GUIDE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            目的別に読みたい記事
          </h2>

          <p className="mt-5 text-[16px] leading-8 text-black/80">
            この記事では、垢抜けるための方法を全体から紹介しました。進め方や原因をさらに詳しく知りたい場合は、目的に合わせて次の記事を参考にしてください。
          </p>

          <div className="mt-7 space-y-4">
            {readingGuide.map((item) => (
              <div key={item.href}>
                <p className="mb-2 text-[14px] font-bold text-black/60">
                  {item.purpose}
                </p>

                <JournalRelatedArticleLink
                  href={item.href}
                  title={item.title}
                  description={item.description}
                />
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
            メンズの垢抜け方法についてよくある質問
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
            見られる距離を意識すると、垢抜け方法は選びやすくなる
          </h2>

          <div className="mt-5 text-[16px] leading-8 text-black/80">
            <p>
              垢抜けて見えるかは、遠くから見たシルエット、会話の距離で見える顔周り、近くで見える肌の3つで決まります。まずは髪型・服のサイズ・姿勢を整え、髪のまとまり・眉毛・ヒゲへと進めましょう。
            </p>

            <p className="mt-5">
              肌のケアは変化に時間がかかるため、最初から並行して始めます。どれも「やりすぎない」ことが自然に見せるコツです。1か月ごとに写真で比べながら、自分に必要な方法を1つずつ増やしていきましょう。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-akanuke-order"
            secondaryLabel="垢抜ける順番を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}
