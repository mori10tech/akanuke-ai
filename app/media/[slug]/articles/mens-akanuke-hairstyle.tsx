import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensAkanukeHairstyleArticleProps = {
  article: Article;
};

const tableOfContents = [
  {
    id: "conditions",
    label: "似合う髪型を決める4つの条件",
  },
  {
    id: "self-check",
    label: "美容室へ行く前に自分で確認すること",
  },
  {
    id: "face-shape",
    label: "顔型別｜似合いやすい髪型の考え方",
  },
  {
    id: "hairstyles",
    label: "代表的な髪型5つの特徴と向き不向き",
  },
  {
    id: "salon-order",
    label: "美容室で失敗しにくい頼み方",
  },
  {
    id: "after-cut",
    label: "切った後の2週間でやること",
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

const conditions = [
  {
    number: "01",
    title: "顔型",
    description:
      "顔の縦と横の比率や輪郭によって、同じ髪型でも見え方は変わります。ただし顔型はあくまで目安の一つで、これだけで髪型が決まるわけではありません。",
  },
  {
    number: "02",
    title: "髪質と毛量",
    description:
      "直毛かくせ毛か、髪がやわらかいか硬いか、量が多いか少ないかで、再現しやすい髪型は大きく変わります。写真の髪型にならない原因の多くはここにあります。",
  },
  {
    number: "03",
    title: "生えぐせとつむじ",
    description:
      "前髪の分かれやすい位置や、つむじ周りで髪が立ち上がる場所は人によって違います。生えぐせに逆らう髪型は、毎朝のセットに時間がかかりやすくなります。",
  },
  {
    number: "04",
    title: "生活の条件",
    description:
      "朝のセットにかけられる時間、スタイリング剤を使えるか、職場や学校の決まりなども重要です。美容室を出た直後だけ整っていても、毎日再現できなければ意味がありません。",
  },
];

const selfChecks = [
  {
    title: "髪質（直毛・くせ毛）",
    method:
      "髪を洗い、何もつけずにドライヤーで乾かした状態を見ます。うねり・はね・広がりがあれば、くせが出やすい髪質です。",
  },
  {
    title: "毛量",
    method:
      "夕方に鏡を見て、サイドが膨らんでいないか、頭全体が大きく見えていないかを確認します。膨らみやすい場合は、毛量が多い可能性があります。",
  },
  {
    title: "髪のやわらかさ",
    method:
      "ワックスで形を作っても、数時間で下がってしまう場合は、やわらかい髪質の傾向があります。正確な判断は美容師に聞くのが確実です。",
  },
  {
    title: "生えぐせ・つむじ",
    method:
      "髪を濡らしてから何もせずに自然に乾かすと、前髪が分かれる位置や立ち上がる位置が分かります。つむじの位置は、家族に頼むかスマホで後頭部を撮影して確認します。",
  },
  {
    title: "生活の条件",
    method:
      "朝のセットにかけられる時間、ワックスを使えるか、職場や学校で髪の長さや色に決まりがあるか、帽子やヘルメットをかぶるかを書き出します。",
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
    impression: "大人っぽい・きれいめ",
    setting: "ドライヤーで分け目を作る程度",
    description:
      "前髪を中央付近で分けて額を見せるスタイルです。前髪をある程度の長さまで伸ばす必要があり、伸ばしている途中は前髪が目にかかりやすくなります。",
    caution:
      "額の生えぐせによって、きれいに分かれる位置が決まりやすい髪型です。分け目を無理に変えると、時間がたつと元に戻ることがあります。",
  },
  {
    name: "ナチュラルマッシュ",
    impression: "やわらかい・自然",
    setting: "乾かすだけでまとまりやすい",
    description:
      "丸みのあるシルエットが特徴の定番スタイルです。直毛の人は乾かすだけでも形になりやすく、初めて髪型を大きく変える人にも取り入れやすい髪型です。",
    caution:
      "毛量が多い人やくせ毛の人は、横に膨らんで重く見えることがあります。量の調整を美容師に相談しましょう。",
  },
  {
    name: "ショート",
    impression: "清潔感・爽やか",
    setting: "短時間で済みやすい",
    description:
      "耳周りや襟足をすっきりさせた短めのスタイルです。清潔感を出しやすく、毎日の手入れも比較的簡単です。",
    caution:
      "頭の形が出やすく、少し伸びただけでも形の崩れが目立ちます。ほかの髪型より、美容室に行く間隔が短くなりやすい点に注意しましょう。",
  },
  {
    name: "アップバング",
    impression: "活発・明るい",
    setting: "毎朝ドライヤーとスタイリング剤が必要",
    description:
      "前髪を立ち上げて額を見せるスタイルです。顔全体が明るく見えやすい一方、毎朝のセットが前提になります。",
    caution:
      "やわらかい髪は、時間がたつと前髪が下がってきやすい傾向があります。セットに時間をかけたくない人には不向きです。",
  },
  {
    name: "ナチュラルパーマ",
    impression: "動き・こなれ感",
    setting: "セットが楽になる場合がある",
    description:
      "髪に自然な動きを加えるスタイルです。直毛で動きが出にくい人が、毎朝のセットを楽にするための選択肢になります。",
    caution:
      "パーマは時間とともに取れていくため、かけ直しが必要です。カットだけの場合より費用がかかり、髪への負担もあります。",
  },
];

const orderPoints = [
  {
    title: "なりたい印象",
    example: "清潔感があって落ち着いた印象にしたい",
  },
  {
    title: "毎日の条件",
    example: "朝のセットは5分くらい。ワックスは少しなら使える",
  },
  {
    title: "避けたいこと",
    example: "耳が全部出るほど短くはしたくない",
  },
];

const photoTips = [
  "自分と髪質や長さが近いモデルの写真を選ぶ",
  "正面だけでなく、横や後ろから見た写真もあると伝わりやすい",
  "「これは避けたい」という写真を1枚用意する",
  "加工の強い写真や、セットした直後の写真だけで決めない",
];

const afterCutSteps = [
  {
    title: "当日",
    description:
      "美容室で整えてもらった状態を、正面と横から写真に撮っておきます。自分で再現するときの見本になります。",
  },
  {
    title: "翌朝から数日",
    description:
      "教わった乾かし方とセット方法で再現してみます。うまくいかない部分は、どこがどう違うかをメモしておきます。",
  },
  {
    title: "1〜2週間",
    description:
      "どうしてもまとまらない場合は、早めに美容室へ相談します。直しに対応しているかは店によって違うため、事前に確認しましょう。",
  },
  {
    title: "形が崩れてきたら",
    description:
      "前回のカットから何週間で崩れてきたかを記録します。これが自分に合った次回予約の目安になります。",
  },
];

const faqs = [
  {
    question: "自分に似合う髪型が分かりません",
    answer:
      "顔型だけでなく、髪質・毛量・生えぐせ・生活の条件で決まります。この記事の「美容室へ行く前に自分で確認すること」で分かったことを美容師に伝えると、似合う髪型を提案してもらいやすくなります。",
  },
  {
    question: "美容室で写真を見せても大丈夫ですか？",
    answer:
      "問題ありません。言葉だけで説明するより、雰囲気を共有しやすくなります。ただし、自分と髪質が大きく違うモデルの写真は、そのまま再現できないことがあります。自分の髪質に合わせて調整してほしいと伝えましょう。",
  },
  {
    question: "写真と同じ髪型にならないのはなぜですか？",
    answer:
      "髪質・毛量・生えぐせがモデルと違うことが主な原因です。また、写真はプロがセットした直後に撮影されていることが多く、毎朝の状態とは異なります。",
  },
  {
    question: "美容室にはどれくらいの頻度で行けばいいですか？",
    answer:
      "髪型や髪の伸びる速さによって違います。短い髪型ほど、伸びたときの形の崩れが早く目立ちます。前回のカットから何週間で崩れてきたかを記録し、自分の目安を見つけるのがおすすめです。",
  },
  {
    question: "ワックスを使わないと垢抜けませんか？",
    answer:
      "必須ではありません。乾かし方だけでも形は変わります。ワックスを使いたくない場合は、美容室で「ワックスなしでもまとまる髪型にしたい」と最初に伝えておきましょう。",
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
            「写真を見せて切ってもらったのに、思っていた髪型にならない」「美容室では整っていたのに、翌朝は再現できない」という経験はありませんか？
          </p>

          <p className="mt-5">
            髪型は顔周りで最も面積が大きく、第一印象を変えやすい部分です。ただし、人気の髪型を真似するだけでは、自分の髪質や生えぐせに合わず、うまくいかないことがあります。
          </p>

          <p className="mt-5">
            この記事では、似合う髪型を決める4つの条件と、美容室へ行く前に自分で確認する方法、代表的な髪型の向き不向き、美容室での伝え方、切った後に再現するまでの手順を解説します。
          </p>
        </section>

        <section
          id="conditions"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            4 CONDITIONS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            似合う髪型を決める4つの条件
          </h2>

          <p className="mt-6 text-[14px] leading-8 text-black/80">
            「似合う髪型」は、顔型だけで決まるものではありません。次の4つの条件がそろったときに、自分でも毎日再現できる髪型になります。
          </p>

          <div className="mt-8 space-y-5">
            {conditions.map((condition) => (
              <section
                key={condition.number}
                className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#1677FF] text-[12px] font-black text-white">
                    {condition.number}
                  </span>

                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                      {condition.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {condition.description}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              人気より「毎日再現できるか」を優先
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              SNSで人気の髪型でも、髪質や生えぐせが合わなければ、毎朝のセットに苦労します。4つの条件を知ったうえで、美容師に「自分に合う形に調整してほしい」と相談するのがおすすめです。
            </p>
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="self-check"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SELF CHECK
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            美容室へ行く前に自分で確認すること
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            自分の髪の特徴を知っておくと、美容師に伝えられる情報が増え、提案を受けやすくなります。次の5つは、自宅で確認できます。
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {selfChecks.map((check) => (
              <div
                key={check.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[14px] font-bold">
                  {check.title}
                </h3>

                <p className="mt-3 text-[12px] leading-6 text-black/75">
                  {check.method}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] leading-6 text-black/60">
            ※自己判断が難しい項目は、美容室で「自分の髪質はどうですか？」と聞くだけでも十分です。
          </p>
        </section>

        <section
          id="face-shape"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FACE SHAPE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            顔型別｜似合いやすい髪型の考え方
          </h2>

          <p className="mt-5 text-[13px] font-medium leading-7 text-black/70">
            顔型は、前髪を上げて輪郭全体が見える状態で正面から写真を撮ると判断しやすくなります。ただし、同じ顔型でもパーツや髪質は異なるため、あくまで目安として考えましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {faceShapes.map((face) => (
              <div
                key={face.name}
                className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[18px] font-black">
                  {face.name}
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {face.description}
                </p>

                <p className="mt-4 border-t border-black/5 pt-4 text-[12px] font-bold leading-6 text-black/70">
                  {face.recommendation}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="hairstyles"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            HAIRSTYLE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            代表的な髪型5つの特徴と向き不向き
          </h2>

          <p className="mt-5 text-[13px] font-medium leading-7 text-black/70">
            髪型ごとの印象だけでなく、毎朝のセットの手間や注意点も比べて選びましょう。特定の髪型が正解というわけではありません。
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

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[10px] font-bold text-[#1677FF]">
                    印象：{hairstyle.impression}
                  </span>

                  <span className="rounded-full border border-black/10 bg-[#F8FAFC] px-3 py-1 text-[10px] font-bold text-black/60">
                    セット：{hairstyle.setting}
                  </span>
                </div>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {hairstyle.description}
                </p>

                <div className="mt-4 rounded-[12px] bg-[#FFF9D9] px-4 py-3">
                  <p className="text-[11px] font-bold leading-6 text-black/65">
                    <span className="mr-2 font-black text-[#9A7800]">
                      注意点
                    </span>

                    {hairstyle.caution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="salon-order"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SALON ORDER
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            美容室で失敗しにくい頼み方
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            美容室での失敗の多くは、伝える情報が足りないことで起こります。髪型の名前だけでなく、次の3つを伝えると、美容師も提案しやすくなります。
          </p>

          <div className="mt-7 space-y-3">
            {orderPoints.map((point, index) => (
              <div
                key={point.title}
                className="flex items-start gap-3 rounded-[14px] border border-black/10 bg-white px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                  {index + 1}
                </span>

                <p className="text-[12px] font-bold leading-6 text-black/65">
                  {point.title}
                  <span className="block font-medium text-black/60">
                    例：{point.example}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[22px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6">
            <p className="text-[12px] font-black text-[#1677FF]">
              そのまま使えるオーダー例
            </p>

            <p className="mt-4 text-[14px] font-bold leading-8 text-[#111111]">
              「清潔感があって落ち着いた印象にしたいです。朝のセットは5分くらいで、ワックスは少しなら使えます。耳が全部出るほど短くはしたくありません。この写真の雰囲気が好きなのですが、自分の髪質や生えぐせで再現しやすいように調整してもらえますか？」
            </p>
          </div>

          <h3 className="mt-9 text-[17px] font-bold">写真の選び方</h3>

          <ul className="mt-4 space-y-2 text-[13px] leading-7 text-black/75">
            {photoTips.map((tip) => (
              <li key={tip}>・{tip}</li>
            ))}
          </ul>

          <h3 className="mt-9 text-[17px] font-bold">カットの最後に聞いておくこと</h3>

          <p className="mt-4 text-[13px] leading-7 text-black/75">
            「乾かす順番と方向」「スタイリング剤の種類と使う量」「次のカットの目安の時期」の3つを聞いておくと、自宅で再現しやすくなります。スマホでメモを取っても失礼にはあたりません。
          </p>
        </section>

        <section
          id="after-cut"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            AFTER CUT
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            切った後の2週間でやること
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            美容室を出た直後の髪型は、プロが乾かしてセットした状態です。自分で同じ状態を作れるようになるまでが、髪型選びの一部と考えましょう。
          </p>

          <div className="mt-7 space-y-3">
            {afterCutSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-[16px] border border-black/10 p-5"
              >
                <p className="text-[13px] font-bold">
                  {step.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-[13px] font-black">
              髪型の次に整えたいこと
            </p>

            <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
              前髪の長さや分け目が決まったら、それに合わせて眉を整えると、顔周りのバランスがそろいます。
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <JournalRelatedArticleLink
                href="/media/mens-akanuke-eyebrows"
                title="メンズが垢抜ける眉毛の整え方"
                description="髪型に合わせて、眉を自然に整える方法を確認できます。"
              />

              <JournalRelatedArticleLink
                href="/media/mens-akanuke-order"
                title="メンズが垢抜ける順番"
                description="髪型の後に何をすればいいか、全体の進め方を確認できます。"
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
            自分に似合う方向性をAIで確認してみませんか？
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析します。自分がどこから改善すればいいか分からない方にもおすすめです。
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
            垢抜ける髪型は「自分で再現できること」が条件
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              似合う髪型は、顔型・髪質と毛量・生えぐせ・生活の条件の4つで決まります。美容室へ行く前に自分の髪の特徴を確認し、「なりたい印象」「毎日の条件」「避けたいこと」を伝えると、失敗しにくくなります。
            </p>

            <p className="mt-5">
              切った後は、見本の写真を撮り、教わった方法で再現してみましょう。形が崩れてきた時期を記録しておけば、次の予約の目安にもなります。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/upload"
            secondaryLabel="無料で診断をはじめる"
            secondaryVariant="diagnosis"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}