import Link from "next/link";
import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";

type MensAkanukeHairstyleArticleProps = {
  article: Article;
};

const tableOfContents = [
  {
    id: "importance",
    label: "垢抜けたい男性は、まず髪型を変えるべき？",
  },
  {
    id: "points",
    label: "メンズが垢抜ける髪型のポイント5つ",
  },
  {
    id: "face-shape",
    label: "顔型別｜似合いやすい髪型の考え方",
  },
  {
    id: "hairstyles",
    label: "垢抜けたい男性におすすめの髪型",
  },
  {
    id: "salon-order",
    label: "美容室で失敗しにくい頼み方",
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

const points = [
  {
    number: "01",
    title: "清潔感がある",
    description:
      "垢抜けを目指すなら、まず重視したいのが清潔感です。寝ぐせが残っている、前髪が目にかかりすぎている、サイドや襟足が伸びっぱなしといった状態は、髪型そのものがおしゃれでも整って見えにくくなります。",
    tip:
      "サイド・襟足・前髪を定期的に整え、スタイリングしていない日でも清潔に見える状態を目指しましょう。",
  },
  {
    number: "02",
    title: "顔型に合っている",
    description:
      "同じ髪型でも、顔の縦横比や輪郭によって見え方は変わります。人気の髪型だからという理由だけで選ぶより、自分の顔型とのバランスを考えることが重要です。",
    tip:
      "丸顔なら縦のライン、面長なら横のボリュームなど、輪郭とのバランスを美容師に相談してみましょう。",
  },
  {
    number: "03",
    title: "髪質に合っている",
    description:
      "直毛・くせ毛・軟毛・剛毛など、髪質によって再現しやすいスタイルは異なります。写真では格好よく見えても、自分の髪質では毎朝のセットが難しいこともあります。",
    tip:
      "希望の写真を見せたうえで、自分の髪質でも再現できるか美容師に確認するのがおすすめです。",
  },
  {
    number: "04",
    title: "自分でセットしやすい",
    description:
      "美容室を出た直後だけ格好よくても、自宅で再現できなければ維持するのは難しくなります。特にヘアセットに慣れていない男性は、扱いやすさも重要な判断基準です。",
    tip:
      "美容師にセット方法を聞き、使用するワックスやオイルの量まで教えてもらいましょう。",
  },
  {
    number: "05",
    title: "サイド・襟足が整っている",
    description:
      "正面だけでなく、横や後ろから見た印象も髪型の清潔感に影響します。サイドが膨らみすぎたり、襟足が伸びすぎたりすると全体のシルエットが崩れやすくなります。",
    tip:
      "自分では確認しにくい部分だからこそ、定期的に美容室で整えることが大切です。",
  },
];

const faceShapes = [
  {
    name: "丸顔",
    description:
      "顔の縦幅と横幅の差が比較的小さく、輪郭に丸みがあるタイプです。",
    recommendation:
      "トップに高さを出したり、前髪に隙間を作ったりして縦方向を意識すると、全体のバランスを取りやすくなります。",
  },
  {
    name: "面長",
    description:
      "顔の横幅に対して縦幅が長く見えやすいタイプです。",
    recommendation:
      "トップを高くしすぎず、サイドに適度なボリュームを残すなど、縦長を強調しすぎないシルエットを意識します。",
  },
  {
    name: "ベース型",
    description:
      "エラやフェイスラインが比較的しっかりして見えるタイプです。",
    recommendation:
      "トップや前髪に動きをつけて視線を上へ誘導したり、顔周りに柔らかい毛流れを作ったりするとバランスを取りやすくなります。",
  },
  {
    name: "逆三角形",
    description:
      "額側に比べて顎周りがシャープに見えやすいタイプです。",
    recommendation:
      "トップだけにボリュームを集中させず、顔周りに適度な動きを残すことで自然なバランスを作りやすくなります。",
  },
];

const hairstyles = [
  {
    name: "センターパート",
    description:
      "前髪を中央付近で分けるスタイル。額が見えることで顔周りがすっきりし、大人っぽい印象を作りやすい髪型です。",
    suitable:
      "きれいめ・大人っぽい雰囲気を目指したい人",
  },
  {
    name: "ナチュラルマッシュ",
    description:
      "丸みのあるシルエットをベースにした定番スタイル。強く作り込みすぎなければ、柔らかく自然な印象を作れます。",
    suitable:
      "初めて髪型を大きく変える人・柔らかい印象を目指す人",
  },
  {
    name: "ショート",
    description:
      "耳周りや襟足をすっきりさせた短めのスタイル。清潔感を出しやすく、日々の手入れも比較的シンプルです。",
    suitable:
      "清潔感を最優先したい人・セット時間を短くしたい人",
  },
  {
    name: "アップバング",
    description:
      "前髪を上げて額を見せるスタイル。顔全体が明るく見えやすく、爽やかな印象を作りやすいのが特徴です。",
    suitable:
      "爽やかさ・活発な印象を出したい人",
  },
  {
    name: "ナチュラルパーマ",
    description:
      "髪に自然な動きを加えるスタイル。直毛で動きを作りにくい場合などに、スタイリングを補助する選択肢になります。",
    suitable:
      "髪に動きが出にくい人・毎日のセットを楽にしたい人",
  },
];

const faqs = [
  {
    question: "垢抜けたい男性は、まず髪型を変えるべきですか？",
    answer:
      "髪型は顔周りの大きな面積を占めるため、第一印象を変えやすいポイントの一つです。何から始めるか迷っている場合は、髪型から見直すのがおすすめです。",
  },
  {
    question: "自分に似合う髪型が分かりません",
    answer:
      "顔型だけでなく、髪質・毛量・普段の服装・セットにかけられる時間なども関係します。写真を数枚用意し、美容師に自分の条件に合う形へ調整してもらう方法がおすすめです。",
  },
  {
    question: "美容室では写真を見せても大丈夫ですか？",
    answer:
      "問題ありません。言葉だけで説明するより、希望する雰囲気を共有しやすくなります。ただし完全に同じ髪型にするのではなく、自分の顔型や髪質に合わせて調整できるか相談しましょう。",
  },
  {
    question: "美容室にはどれくらいの頻度で行けばいいですか？",
    answer:
      "髪の長さやスタイルによって異なりますが、シルエットが崩れてきたタイミングで整えることが重要です。短いスタイルほどサイドや襟足の伸びが目立ちやすくなります。",
  },
  {
    question: "ワックスを使わないと垢抜けませんか？",
    answer:
      "必須ではありません。乾かし方だけでもシルエットは変えられます。スタイリング剤を使う場合も、多く付けることより自分の髪質や髪型に合ったものを適量使うことが大切です。",
  },
];

export default function MensAkanukeHairstyleArticle({
  article,
}: MensAkanukeHairstyleArticleProps) {
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
                  className="flex gap-3 text-[11px] leading-5 text-black/55 transition hover:text-[#1677FF]"
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
        <section className="text-[14px] leading-8 text-black/70">
          <p>
            「垢抜けたいけれど、どんな髪型にすればいいか分からない」と悩む男性は少なくありません。
          </p>

          <p className="mt-5">
            髪型は顔周りの大きな面積を占めるため、第一印象を左右しやすいポイントです。ただし、人気の髪型をそのまま真似すれば必ず垢抜けるわけではありません。
          </p>

          <p className="mt-5">
            大切なのは、顔型・髪質・毛量・普段の雰囲気などを踏まえて、自分に似合う形へ調整することです。
          </p>

          <p className="mt-5">
            この記事では、垢抜けやすい髪型の考え方から、顔型別のポイント、美容室で失敗しにくい頼み方まで初心者向けに解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section id="importance" className="scroll-mt-24 pt-14">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FIRST STEP
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            垢抜けたい男性は、まず髪型を変えるべき？
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/70">
            <p>
              垢抜けるために見直せるポイントは、眉毛・肌・服装・姿勢などさまざまです。その中でも髪型は、比較的変化を実感しやすいポイントです。
            </p>

            <p className="mt-5">
              特に「何年も同じ髪型」「伸びたら短くするだけ」という場合は、現在の顔立ちや雰囲気に合う髪型へ変えることで印象が大きく変わる可能性があります。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              人気より「自分に似合うか」を優先
            </p>

            <p className="mt-3 text-[12px] leading-6 text-black/60">
              SNSで人気の髪型でも、顔型や髪質によって見え方は変わります。「この髪型にしたい」だけでなく「自分に似合う形に調整してほしい」と美容師へ相談するのがおすすめです。
            </p>
          </div>
        </section>

        <section id="points" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            5 POINTS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズが垢抜ける髪型のポイント5つ
          </h2>

          <div className="mt-8 space-y-5">
            {points.map((point) => (
              <section
                key={point.number}
                className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#1677FF] text-[12px] font-black text-white">
                    {point.number}
                  </span>

                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                      {point.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/65">
                      {point.description}
                    </p>

                    <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                      <p className="text-[11px] font-bold leading-6 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          POINT
                        </span>
                        {point.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <AdSenseAd className="mt-10" format="rectangle" />

        <section id="face-shape" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FACE SHAPE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            顔型別｜似合いやすい髪型の考え方
          </h2>

          <p className="mt-5 text-[13px] leading-7 text-black/55">
            顔型は髪型選びの参考になります。ただし、同じ顔型でもパーツや髪質は異なるため、あくまで一つの目安として考えましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {faceShapes.map((face) => (
              <div
                key={face.name}
                className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[18px] font-black">{face.name}</h3>

                <p className="mt-3 text-[12px] leading-6 text-black/55">
                  {face.description}
                </p>

                <p className="mt-4 border-t border-black/5 pt-4 text-[12px] font-bold leading-6 text-black/70">
                  {face.recommendation}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="hairstyles" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HAIRSTYLE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            垢抜けたい男性におすすめの髪型
          </h2>

          <p className="mt-5 text-[13px] leading-7 text-black/55">
            ここでは代表的なスタイルを紹介します。特定の髪型を正解と考えるのではなく、自分に合う方向性を探す参考にしてください。
          </p>

          <div className="mt-7 space-y-4">
            {hairstyles.map((hairstyle, index) => (
              <div
                key={hairstyle.name}
                className="rounded-[20px] border border-black/10 bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black text-[#1677FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-[18px] font-black">
                    {hairstyle.name}
                  </h3>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-black/60">
                  {hairstyle.description}
                </p>

                <div className="mt-4 rounded-[12px] bg-[#EEF6FF] px-4 py-3">
                  <p className="text-[11px] font-bold leading-5 text-[#1677FF]">
                    向いている人：{hairstyle.suitable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="salon-order" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SALON ORDER
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            美容室で失敗しにくい頼み方
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/70">
            美容室では、髪型の名前だけを伝えるより「どんな印象になりたいか」「普段どのくらいセットできるか」まで共有すると、美容師も提案しやすくなります。
          </p>

          <div className="mt-7 rounded-[22px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6">
            <p className="text-[12px] font-black text-[#1677FF]">
              そのまま使えるオーダー例
            </p>

            <p className="mt-4 text-[14px] font-bold leading-8 text-[#111111]">
              「垢抜けた清潔感のある髪型にしたいです。この写真の雰囲気が好きなのですが、自分の顔型と髪質に合うように調整してもらえますか？普段あまりセットに慣れていないので、自分でも再現しやすい形がいいです。」
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "希望する髪型の写真を2〜3枚用意する",
              "清潔感・大人っぽい・爽やかなど、なりたい印象を伝える",
              "普段セットにかけられる時間を伝える",
              "自分の髪質でも再現できるか確認する",
              "最後にセット方法を教えてもらう",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[14px] border border-black/10 bg-white px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                  {index + 1}
                </span>

                <p className="text-[12px] font-bold leading-6 text-black/65">
                  {item}
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

          <h2 className="mt-4 text-[26px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#111111]">
            自分に似合う方向性を
            <br />
            AIで確認してみませんか？
          </h2>

          <p className="mt-4 text-[12px] leading-6 text-black/55">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析します。自分がどこから改善すればいいか分からない方にもおすすめです。
          </p>

          <Link
  href="/upload"
  className="group mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_24px_rgba(255,212,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,212,0,0.3)] active:scale-[0.98]"
>
  <span>
    無料で診断をはじめる
  </span>

  <span
    aria-hidden="true"
    className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
  >
    ›
  </span>
</Link>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-bold text-black/40">
            <span>約1分で完了</span>
            <span>無料で利用可能</span>
            <span>メンズ向け</span>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 pt-16">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FAQ
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズの垢抜け髪型についてよくある質問
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

                <p className="border-t border-black/5 px-5 py-4 text-[12px] leading-6 text-black/60">
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
            垢抜ける髪型は「自分に似合うこと」が重要
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/70">
            <p>
              メンズが髪型で垢抜けるためには、流行だけでなく顔型・髪質・清潔感・セットのしやすさまで考えることが大切です。
            </p>

            <p className="mt-5">
              自分だけで正解を決める必要はありません。希望する雰囲気の写真を用意して、美容師に「自分に似合うように調整してほしい」と相談してみましょう。
            </p>

            <p className="mt-5">
              髪型以外にも眉毛・肌・服装などを含めて改善したい場合は、メンズ垢抜け完全ガイドも参考にしてください。
            </p>
            <p className="mt-5">
  「髪型以外にも垢抜けない原因があるかもしれない」と感じる方は、
  <Link
    href="/media/akanukenai-man-features"
    className="font-bold text-[#1677FF] underline decoration-[#1677FF]/30 underline-offset-4 transition hover:decoration-[#1677FF]"
  >
    垢抜けない男の特徴10選
  </Link>
  もチェックしてみてください。
</p>
          </div>

          <Link
            href="/media/mens-akanuke-guide"
            className="mt-7 flex min-h-[50px] items-center justify-between rounded-[13px] bg-[#EEF6FF] px-5 text-[12px] font-black text-[#1677FF]"
          >
            <span>メンズ垢抜け完全ガイドを読む</span>
            <span aria-hidden="true">→</span>
          </Link>

          <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
            <Link
              href="/media"
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] border border-black/10 bg-white px-5 text-[12px] font-black"
            >
              記事一覧へ戻る
            </Link>

            <Link
  href="/upload"
  className="group flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[12px] font-black text-[#111111] shadow-[0_8px_20px_rgba(255,212,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(255,212,0,0.26)] active:scale-[0.98]"
>
  <span>
    無料で診断をはじめる
  </span>

  <span
    aria-hidden="true"
    className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
  >
    ›
  </span>
</Link>
          </div>

          <p className="sr-only">{article.title}</p>
        </section>
      </div>
    </div>
  );
}