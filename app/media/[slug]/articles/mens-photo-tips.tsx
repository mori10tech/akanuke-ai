import Image from "next/image";
import Link from "next/link";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensPhotoTipsArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "why", label: "写真だと実物より悪く見える理由" },
  { id: "distance", label: "距離：近すぎる自撮りは顔がゆがむ" },
  { id: "light", label: "光：顔の正面から自然光を当てる" },
  { id: "angle", label: "角度：カメラは目の高さに" },
  { id: "pose", label: "姿勢と表情のコツ" },
  { id: "before", label: "撮る前に整えておく3つのこと" },
  { id: "situation", label: "場面別のポイント" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const reasons = [
  {
    title: "カメラが顔に近すぎる",
    description:
      "スマートフォンの内側のカメラで自撮りをすると、どうしても顔とカメラの距離が近くなります。距離が近いほど、カメラに近い鼻や顔の中心が大きく写り、顔の形がゆがんで見えます。",
  },
  {
    title: "光が上から当たっている",
    description:
      "室内の照明は、多くの場合、真上にあります。上からの光は目の下や鼻の下に影を作り、クマや肌の凹凸を強調して、疲れた印象に見せてしまいます。",
  },
  {
    title: "左右が反転して見慣れていない",
    description:
      "鏡で見る自分の顔は、左右が反転しています。写真は他人から見た向きで写るため、見慣れない顔に感じて、違和感を覚えることがあります。",
  },
];

const distanceSteps = [
  {
    title: "自撮りは腕をしっかり伸ばす",
    description:
      "顔の近くで構えず、腕をいっぱいに伸ばして撮ります。それでも近く感じる場合は、自撮り棒を使う方法もあります。",
  },
  {
    title: "人に撮ってもらうときは、離れてズームする",
    description:
      "撮る人に1.5mほど離れてもらい、カメラのズーム（2倍程度）で顔の大きさを調整してもらいます。近づいて撮るより、顔の形が自然に写ります。",
  },
  {
    title: "タイマーと台を使う",
    description:
      "1人で撮る場合は、スマートフォンを棚や三脚に置き、タイマー機能を使うと、離れた距離から撮影できます。",
  },
];

const lightPoints = [
  {
    title: "窓に向かって立つ",
    description:
      "日中であれば、窓に顔を向けて立つのが最も簡単です。顔の正面から自然光が当たり、影が少なく、肌がなめらかに写ります。",
  },
  {
    title: "真上の照明の下を避ける",
    description:
      "天井の照明の真下に立つと、目の下と鼻の下に影ができます。室内では、照明の位置から少しずれて、顔の正面が明るくなる場所を探しましょう。",
  },
  {
    title: "逆光は避ける",
    description:
      "窓を背にすると、顔が暗く写ります。背景を明るくしたい場合でも、顔に光が当たっていることを優先します。",
  },
  {
    title: "直射日光は強すぎる",
    description:
      "晴れた日の屋外で直射日光が当たると、影が濃くなり、まぶしさで目も細くなります。屋外では、建物の陰など、明るい日陰で撮るときれいに写ります。",
  },
];

const anglePoints = [
  {
    title: "カメラは目の高さか、少し上に",
    description:
      "カメラが目の高さより下にあると、あごの下や鼻の穴が写り、顔が大きく見えます。目の高さか、それより少し上から撮るのが基本です。",
  },
  {
    title: "真上から撮りすぎない",
    description:
      "高い位置から見下ろすように撮ると、顔は小さく見えますが、不自然な印象になります。少し上から、程度にとどめましょう。",
  },
  {
    title: "顔はほんの少し斜めに",
    description:
      "真正面よりも、顔を少しだけ斜めに向けると、立体感が出ます。証明写真や、AI診断用の写真のように正面が必要な場合は、まっすぐ向きます。",
  },
];

const posePoints = [
  {
    title: "あごを軽く前に出して、少し引く",
    description:
      "あごを引きすぎると、首の下にたるみができて、二重あごのように写ります。首を少し前に出してから、あごを軽く引くと、フェイスラインがすっきり写ります。",
  },
  {
    title: "肩をカメラに対して少し斜めに",
    description:
      "肩をカメラに対して真正面に向けると、体が大きく見えます。体を少し斜めにして、顔だけをカメラに向けると、すっきりとした印象になります。",
  },
  {
    title: "笑顔は「目」から作る",
    description:
      "口だけで笑うと、作り笑いに見えやすくなります。楽しいことを思い浮かべ、目元が少しゆるむくらいの表情を意識しましょう。",
  },
  {
    title: "撮る直前にまばたきをする",
    description:
      "撮影の直前にまばたきを1回すると、目が自然に開いた状態で写りやすくなります。目を大きく見開こうとすると、緊張した表情になります。",
  },
];

const beforeChecks = [
  {
    title: "皮脂を押さえる",
    description:
      "額や鼻のテカリは、写真では光の反射として目立ちます。撮る前に、あぶらとり紙やティッシュで軽く押さえておきましょう。",
    href: "/media/mens-oily-skin",
    linkLabel: "テカリを抑える方法を見る",
  },
  {
    title: "髪を整える",
    description:
      "写真では、寝ぐせや浮いた毛が意外と目立ちます。前髪と、横・後ろの浮きを鏡で確認します。",
    href: "/media/mens-hair-wax",
    linkLabel: "ワックスの付け方を見る",
  },
  {
    title: "眉と口元を確認する",
    description:
      "眉の周りの余分な毛や、唇の乾燥、ひげの剃り残しは、写真に写ると気になりやすい部分です。",
    href: "/media/mens-akanuke-eyebrows",
    linkLabel: "眉毛の整え方を見る",
  },
];

const situations = [
  {
    title: "マッチングアプリ・SNSのプロフィール",
    description:
      "人に1.5mほど離れて撮ってもらうのが理想です。自然光の入る場所で、少し斜めを向いた写真が、自然で親しみやすい印象になります。加工しすぎた写真は、実際に会ったときの印象とのずれにつながります。",
  },
  {
    title: "仕事用・証明写真",
    description:
      "正面を向き、あごを軽く引いて、口角を少し上げる程度の表情にします。髪とひげを整え、襟元のしわも確認しましょう。",
  },
  {
    title: "AI診断など、顔を分析するための写真",
    description:
      "明るい場所で正面を向き、帽子・マスク・サングラスを外します。加工やフィルターは使わず、そのままの状態で撮影します。照明の色や強い影は、肌の色や髪の見え方の判定に影響します。",
  },
];

const faqs = [
  {
    question: "自撮りだと、鼻が大きく見えるのはなぜですか？",
    answer:
      "カメラと顔の距離が近いと、カメラに近い鼻が大きく写るためです。2018年に発表された研究では、約30cmの距離で撮った自撮りは、約1.5mの距離で撮った写真に比べて、鼻の付け根の幅が約30%広く見えると報告されています。",
  },
  {
    question: "写真に写る顔と、鏡で見る顔、どちらが本当の顔ですか？",
    answer:
      "鏡の顔は左右が反転していて、写真はカメラの距離やレンズの影響を受けます。他人が実際に見ている顔に近いのは、1.5m程度離れて撮った、反転していない写真です。",
  },
  {
    question: "写真を加工するのはだめですか？",
    answer:
      "明るさの調整程度であれば問題ありません。ただし、顔の形や肌を大きく変える加工は、実際の印象とずれる原因になります。まずは距離・光・角度を整えるだけで、写真写りは大きく変わります。",
  },
  {
    question: "夜に室内で撮るときは、どうすればいいですか？",
    answer:
      "天井の照明の真下を避け、顔の正面が明るくなる位置を探します。デスクライトなどを顔の正面から少し離して当てると、影が少なくなります。",
  },
  {
    question: "写真を撮られるのが苦手で、表情が硬くなります",
    answer:
      "1枚で決めようとせず、連続で何枚か撮ってもらい、自然な表情のものを選ぶ方法がおすすめです。撮る直前に、軽く深呼吸をしてから、まばたきを1回すると力が抜けやすくなります。",
  },
];

export default function MensPhotoTipsArticle({
  article,
}: MensPhotoTipsArticleProps) {
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
            「写真に写った自分の顔が、鏡で見るより老けて見える」「自撮りをすると、なぜか顔が大きく写る」と感じたことはありませんか？
          </p>

          <p className="mt-5">
            写真写りが悪い原因の多くは、顔そのものではなく、カメラとの距離、光の当たり方、カメラの角度にあります。この3つを変えるだけで、同じ顔でも写り方は大きく変わります。
          </p>

          <p className="mt-5">
            この記事では、写真だと実物より悪く見える理由と、距離・光・角度の整え方、姿勢と表情のコツ、撮る前に整えておくこと、場面別のポイントを解説します。
          </p>
        </section>

        <section
          id="why"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WHY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            写真だと実物より悪く見える理由
          </h2>

          <div className="mt-7 space-y-3">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  REASON {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {reason.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="distance"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DISTANCE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            距離：近すぎる自撮りは顔がゆがむ
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              2018年に医学誌『JAMA Facial Plastic Surgery』に掲載された研究では、顔から約30cmの距離で撮った自撮りは、約1.5mの距離で撮った写真と比べて、鼻の付け根の幅が約30%広く写ると報告されています。
            </p>

            <p className="mt-5">
              つまり、自撮りで「鼻が大きい」「顔が丸い」と感じても、それは実際の顔ではなく、カメラが近すぎることによる写り方の問題である可能性があります。研究では、顔の形を自然に写す標準的な距離として、約1.5mが挙げられています。
            </p>
          </div>

          <div className="mt-7 space-y-3">
            {distanceSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[16px] border border-black/10 bg-white p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  TIP {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {step.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[11px] font-medium leading-6 text-black/50">
            参考：
            <a
              href="https://www.sciencedaily.com/releases/2018/03/180301115349.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-[#1677FF]"
            >
              ScienceDaily「Distortive effects of short distance photographs on nasal appearance: The selfie effect」（2018年3月1日。JAMA Facial Plastic Surgery掲載の研究を紹介）
            </a>
          </p>
        </section>

        <section
          id="light"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            LIGHT
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            光：顔の正面から自然光を当てる
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            光の当たり方は、肌の質感や顔の立体感に大きく影響します。基本は、顔の正面から、やわらかい光を当てることです。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-photo-tips/mens-photo-tips-setup.webp"
              alt="窓の方を向いて立ち、やわらかい自然光が顔に当たっている男性"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              窓に顔を向けると、自然光が顔の正面に当たり、目の下や鼻の下に濃い影ができにくくなります。
            </figcaption>
          </figure>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {lightPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[15px] font-black">
                  {point.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="angle"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            ANGLE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            角度：カメラは目の高さに
          </h2>

          <div className="mt-7 space-y-3">
            {anglePoints.map((point, index) => (
              <div
                key={point.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  POINT {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {point.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="pose"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            POSE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            姿勢と表情のコツ
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {posePoints.map((point) => (
              <div
                key={point.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[15px] font-black">
                  {point.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="before"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BEFORE SHOOTING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            撮る前に整えておく3つのこと
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            写真は、肉眼よりも細かい部分まではっきり写します。撮る前の1分で、次の3つを確認しましょう。
          </p>

          <div className="mt-7 space-y-3">
            {beforeChecks.map((check) => (
              <div
                key={check.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[15px] font-black">
                  {check.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {check.description}
                </p>

                <Link
                  href={check.href}
                  className="mt-3 inline-block text-[12px] font-bold text-[#1677FF] transition hover:opacity-70"
                >
                  {check.linkLabel} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          id="situation"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SITUATION
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            場面別のポイント
          </h2>

          <div className="mt-7 space-y-3">
            {situations.map((situation) => (
              <div
                key={situation.title}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[13px] font-bold">
                  {situation.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {situation.description}
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
            撮った写真で、
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
            写真写りについてよくある質問
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
            写真写りは、距離・光・角度で変わる
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              写真写りが悪いと感じる原因の多くは、顔そのものではなく撮り方にあります。カメラは約1.5m離してズームで調整し、窓に顔を向けて正面から光を当て、カメラを目の高さか少し上に構えましょう。
            </p>

            <p className="mt-5">
              あごを軽く前に出してから引き、肩を少し斜めにすると、すっきりと写ります。撮る前に皮脂を押さえ、髪と眉を整えておけば、同じ顔でも印象は大きく変わります。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/akanukenai-man-features"
            secondaryLabel="垢抜けない男の特徴を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}
