import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import {
  getAllArticles,
  getArticleBySlug,
} from "../../../data/articles";

import AdSenseAd from "../../components/AdSenseAd";
import Logo from "../../components/Logo";

import JournalServiceCta from "../components/JournalServiceCta";
import ArticleStructuredData from "./ArticleStructuredData";
import AkanukenaiManFeaturesArticle from "./articles/AkanukenaiManFeaturesArticle";
import MensAkanukeHairstyleArticle from "./articles/MensAkanukeHairstyleArticle";
import JournalFooter from "../components/JournalFooter";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const tableOfContents = [
  {
    id: "meaning",
    label: "メンズが垢抜けるとは？",
  },
  {
    id: "methods",
    label: "メンズが垢抜ける12の方法",
  },
  {
    id: "priority",
    label: "何から始めればいい？",
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

const methods = [
  {
    number: "01",
    title: "髪型を変える",
    description:
      "髪型は顔全体の印象を大きく左右します。まずは寝ぐせや伸びっぱなしの状態を避け、自分の輪郭や髪質に合うスタイルを美容師へ相談しましょう。前髪やサイドのボリュームを整えるだけでも、清潔感は大きく変わります。",
    point:
      "美容室では「清潔感を出したい」「セットしやすい髪型にしたい」と具体的に伝えるのがおすすめです。",
    relatedArticle: {
      href: "/media/mens-akanuke-hairstyle",
      label: "メンズが垢抜ける髪型を詳しく見る",
    },
  },
  {
    number: "02",
    title: "眉毛を整える",
    description:
      "眉毛は目元の印象を決める重要なパーツです。長さや太さを無理に変える必要はありません。眉間・眉下・眉尻周辺の余分な毛を整えるだけでも、顔全体が引き締まって見えます。",
    point:
      "初めての場合は、メンズ眉毛サロンで一度形を整えてもらうと、自宅で維持しやすくなります。",
  },
  {
    number: "03",
    title: "スキンケアを始める",
    description:
      "肌の乾燥・テカリ・毛穴は、清潔感に影響しやすい要素です。最初から多くの商品を使う必要はなく、洗顔・保湿・日焼け止めの3つから始めれば十分です。",
    point:
      "洗顔後に何も付けない状態を避け、化粧水や乳液で保湿する習慣を作りましょう。",
  },
  {
    number: "04",
    title: "ヒゲを整える",
    description:
      "剃り残しや不揃いなヒゲは、疲れた印象や清潔感の低下につながることがあります。ヒゲを残す場合でも、輪郭や長さを揃えることが重要です。",
    point:
      "カミソリ負けしやすい方は、電気シェーバーやシェービング剤を活用してください。",
  },
  {
    number: "05",
    title: "服のサイズ感を見直す",
    description:
      "高価な服を買うよりも、体型に合ったサイズを選ぶことが大切です。肩幅・袖丈・パンツ丈が合っているだけで、全体の印象が整います。",
    point:
      "迷ったら、白・黒・ネイビー・グレーなどのベーシックカラーを中心に組み合わせましょう。",
  },
  {
    number: "06",
    title: "靴と持ち物をきれいにする",
    description:
      "服装が整っていても、靴やバッグが汚れていると清潔感が下がって見えます。定期的に汚れを落とし、傷みが強いものは買い替えを検討しましょう。",
    point:
      "特に白いスニーカーは汚れが目立ちやすいため、こまめな手入れがおすすめです。",
  },
  {
    number: "07",
    title: "姿勢を良くする",
    description:
      "猫背やうつむいた姿勢は、自信がなさそうな印象につながることがあります。胸を張りすぎる必要はありませんが、頭・肩・腰の位置を意識しましょう。",
    point:
      "スマートフォンを見るときも、顔を下げすぎないようにすると自然な姿勢を保ちやすくなります。",
  },
  {
    number: "08",
    title: "香りを整える",
    description:
      "香水を強く付けるよりも、汗・衣類・頭皮などのにおい対策を優先しましょう。柔軟剤や整髪料など、複数の香りを重ねすぎないことも大切です。",
    point:
      "香水を使用する場合は、近づいたときに少し感じる程度を目安にしてください。",
  },
  {
    number: "09",
    title: "口元を清潔に保つ",
    description:
      "歯の汚れや口臭は、会話中の印象に影響します。毎日の歯磨きに加えて、フロスや舌ケアを取り入れると、口元の清潔感を保ちやすくなります。",
    point:
      "歯の色や歯並びが気になる場合は、まず歯科医院で相談するのが安全です。",
  },
  {
    number: "10",
    title: "睡眠と生活習慣を整える",
    description:
      "睡眠不足は、肌荒れ・目の下のクマ・表情の疲れにつながる場合があります。美容アイテムだけでなく、睡眠時間や食生活を見直すことも重要です。",
    point:
      "すべてを一度に変えず、就寝時間を30分早めるなど、小さな改善から始めましょう。",
  },
  {
    number: "11",
    title: "運動を習慣にする",
    description:
      "適度な運動は、姿勢や体型だけでなく、表情や自信にもつながります。必ずしもジムへ通う必要はなく、ウォーキングや自宅での筋トレでも構いません。",
    point:
      "週に2〜3回、無理なく続けられる運動から始めるのがおすすめです。",
  },
  {
    number: "12",
    title: "自分に合う改善点を知る",
    description:
      "垢抜ける方法は多くありますが、必要な改善は人によって異なります。髪型・眉毛・肌・印象など、自分の優先順位を把握すると、効率よく取り組めます。",
    point:
      "他人の正解をそのまま真似するのではなく、自分の顔立ちや雰囲気に合う方向を選びましょう。",
  },
];

const faqs = [
  {
    question: "メンズが垢抜けるには、まず何をすればいいですか？",
    answer:
      "最初は髪型・眉毛・肌の3つを見直すのがおすすめです。顔周りは第一印象への影響が大きく、服をすべて買い替えなくても変化を感じやすい部分です。",
  },
  {
    question: "垢抜けるまでどのくらいかかりますか？",
    answer:
      "髪型や眉毛は比較的すぐに変化を感じられます。肌や体型、生活習慣は数週間から数か月かけて整えていくものです。短期間で全部を変えようとせず、継続できる方法を選びましょう。",
  },
  {
    question: "お金をかけなくても垢抜けられますか？",
    answer:
      "可能です。髪や眉毛を整える、服のサイズ感を見直す、姿勢を良くする、靴をきれいにするなど、費用をほとんどかけずに改善できる項目も多くあります。",
  },
  {
    question: "ファッションに詳しくなくても大丈夫ですか？",
    answer:
      "問題ありません。最初は白・黒・ネイビー・グレーなどの色を中心にし、無地でサイズの合う服を選ぶだけでも整った印象になります。",
  },
  {
    question: "自分に似合う髪型や眉毛が分かりません",
    answer:
      "美容師や眉毛サロンへ相談する方法があります。また、自分の顔写真を客観的に見て、髪型・眉毛・肌のどこから改善するか整理することも有効です。",
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArticleHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-[980px] items-center justify-between gap-4 px-5">
        <Link
          href="/media"
          className="flex items-center gap-2 text-[11px] font-black text-black/55 transition hover:text-[#1677FF]"
        >
          <ArrowLeftIcon />
          記事一覧
        </Link>

        <Logo href="/" />

        <JournalServiceCta />
      </div>
    </header>
  );
}

function ArticleHero({
  article,
}: {
  article: NonNullable<ReturnType<typeof getArticleBySlug>>;
}) {
  return (
    <header className="border-b border-black/10 bg-gradient-to-b from-white to-[#EEF6FF]">
      <div className="mx-auto max-w-[860px] px-5 pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-black text-[#1677FF] shadow-sm">
            {article.category}
          </span>

          <span className="text-[10px] font-bold text-black/35">
            {article.readingTime}
          </span>
        </div>

        <h1 className="mt-5 text-[32px] font-semibold leading-[1.35] tracking-[-0.05em] sm:text-[48px]">
          {article.title}
        </h1>

        <p className="mt-5 max-w-[720px] text-[13px] leading-7 text-black/55 sm:text-[15px]">
          {article.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-black/35">
          <time dateTime={article.publishedAt}>
            公開日：{formatDate(article.publishedAt)}
          </time>

          {article.updatedAt && (
            <time dateTime={article.updatedAt}>
              更新日：{formatDate(article.updatedAt)}
            </time>
          )}
        </div>

        <div className="relative mt-9 aspect-[1200/630] overflow-hidden rounded-[28px] border border-black/5 bg-[#EEF6FF] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 860px"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "記事が見つかりません｜AKANUKE.AI",
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,

    alternates: {
      canonical: `/media/${article.slug}`,
    },

    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: article.image
        ? [
            {
              url: article.image,
              alt: article.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  if (article.slug === "akanukenai-man-features") {
    return (
      <>
        <ArticleStructuredData article={article} />

        <main className="min-h-screen bg-white text-[#111111]">
          <ArticleHeader />

          <article>
            <ArticleHero article={article} />

            <AkanukenaiManFeaturesArticle article={article} />
          </article>

          <JournalFooter />
        </main>
      </>
    );
  }

  if (article.slug === "mens-akanuke-hairstyle") {
    return (
      <>
        <ArticleStructuredData article={article} />

        <main className="min-h-screen bg-white text-[#111111]">
          <ArticleHeader />

          <article>
            <ArticleHero article={article} />

            <MensAkanukeHairstyleArticle article={article} />
          </article>

          <JournalFooter />
        </main>
      </>
    );
  }

  return (
    <>
      <ArticleStructuredData article={article} />

      <main className="min-h-screen bg-white text-[#111111]">
        <ArticleHeader />

        <article>
          <ArticleHero article={article} />

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
                  「垢抜けたいけれど、何から始めればいいか分からない」と感じている男性は少なくありません。
                </p>

                <p className="mt-5">
                  メンズの垢抜けは、生まれつきの顔立ちを大きく変えることではありません。髪型・眉毛・肌・服装・姿勢などを整え、今の自分が持っている魅力を伝わりやすくすることです。
                </p>

                <p className="mt-5">
                  この記事では、美容初心者でも取り組みやすい12の方法を順番に解説します。すべてを一度に行う必要はありません。自分に必要な項目から少しずつ始めてください。
                </p>
              </section>

              <AdSenseAd className="mt-10" />

              <section
                id="meaning"
                className="scroll-mt-24 pt-14"
              >
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  DEFINITION
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                  メンズが垢抜けるとは？
                </h2>

                <div className="mt-6 text-[14px] leading-8 text-black/70">
                  <p>
                    メンズが垢抜けるとは、髪型・眉毛・肌・服装などを自分に合う状態へ整え、清潔感や洗練された印象を高めることです。
                  </p>

                  <p className="mt-5">
                    流行をすべて取り入れたり、高価な服や化粧品を購入したりすることが必須ではありません。大切なのは、現在の印象を客観的に把握し、改善効果の高い部分から整えることです。
                  </p>
                </div>

                <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
                  <p className="text-[12px] font-black text-[#1677FF]">
                    垢抜けの基本
                  </p>

                  <div className="mt-4 grid gap-3">
                    {[
                      "清潔感を保つ",
                      "自分の顔立ちや体型に合うものを選ぶ",
                      "一度に変えず、継続できる方法を選ぶ",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-[12px] font-bold text-black/65"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
                          <CheckIcon />
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="methods"
                className="scroll-mt-24 pt-16"
              >
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  12 METHODS
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                  メンズが垢抜ける12の方法
                </h2>

                <p className="mt-4 text-[13px] leading-7 text-black/55">
                  優先順位は人によって異なります。現在できていない項目や、改善すると印象が変わりやすい項目から進めましょう。
                </p>

                <div className="mt-8 space-y-5">
                  {methods.map((method, index) => (
                    <Fragment key={method.number}>
                      <section className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6">
                        <div className="flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                            {method.number}
                          </span>

                          <div className="min-w-0">
                            <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                              {method.title}
                            </h3>

                            <p className="mt-3 text-[13px] leading-7 text-black/65">
                              {method.description}
                            </p>

                            <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                              <p className="text-[11px] font-bold leading-5 text-black/65">
                                <span className="mr-2 font-black text-[#9A7800]">
                                  POINT
                                </span>

                                {method.point}
                              </p>
                            </div>

                            {"relatedArticle" in method &&
                              method.relatedArticle && (
                                <Link
                                  href={method.relatedArticle.href}
                                  className="mt-4 flex min-h-[44px] items-center justify-between rounded-[12px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[11px] font-black text-[#1677FF] transition hover:bg-[#E3F0FF]"
                                >
                                  <span>
                                    {method.relatedArticle.label}
                                  </span>

                                  <span aria-hidden="true">
                                    →
                                  </span>
                                </Link>
                              )}
                          </div>
                        </div>
                      </section>

                      {index === 5 && (
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
                id="priority"
                className="scroll-mt-24 pt-16"
              >
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  PRIORITY
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                  何から始めればいい？
                </h2>

                <p className="mt-5 text-[14px] leading-8 text-black/70">
                  迷った場合は、まず顔周りから始めるのがおすすめです。髪型・眉毛・肌は、相手が最初に見る部分であり、変化も比較的感じやすいからです。
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      number: "1",
                      label: "髪型",
                      note: "顔全体の印象を整える",
                    },
                    {
                      number: "2",
                      label: "眉毛",
                      note: "目元を引き締める",
                    },
                    {
                      number: "3",
                      label: "肌",
                      note: "清潔感を高める",
                    },
                  ].map((item) => (
                    <div
                      key={item.number}
                      className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
                    >
                      <span className="text-[11px] font-black text-[#1677FF]">
                        STEP {item.number}
                      </span>

                      <p className="mt-2 text-[17px] font-black">
                        {item.label}
                      </p>

                      <p className="mt-2 text-[10px] leading-5 text-black/45">
                        {item.note}
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
                  自分に必要な改善を、
                  <br />
                  AIで確認してみませんか？
                </h2>

                <p className="mt-4 text-[12px] leading-6 text-black/55">
                  AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象を分析します。何から始めればいいか分からない方にもおすすめです。
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

              <section
                id="faq"
                className="scroll-mt-24 pt-16"
              >
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  FAQ
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                  メンズの垢抜けでよくある質問
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

              <section
                id="summary"
                className="scroll-mt-24 pt-16"
              >
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  SUMMARY
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                  メンズの垢抜けは、小さな改善の積み重ね
                </h2>

                <div className="mt-5 text-[14px] leading-8 text-black/70">
                  <p>
                    メンズが垢抜けるために、すべてを一度に変える必要はありません。まずは髪型・眉毛・肌など、第一印象への影響が大きい部分から始めましょう。
                  </p>

                  <p className="mt-5">
                    大切なのは、流行をそのまま真似することではなく、自分に合う方法を見つけて継続することです。できることを一つずつ増やしていけば、印象は少しずつ変わっていきます。
                  </p>
                </div>

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
              </section>
            </div>
          </div>
        </article>

        <JournalFooter />
      </main>
    </>
  );
}