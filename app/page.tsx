"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useState,
  type ReactNode,
} from "react";
import Logo from "./components/Logo";
import { getAllArticles } from "../data/articles";

type IconName =
  | "clock"
  | "yen"
  | "user"
  | "hair"
  | "brow"
  | "skin"
  | "spark"
  | "upload"
  | "brain"
  | "document"
  | "calendar"
  | "bag"
  | "check";

type AnalysisItem = {
  icon: IconName;
  label: string;
  score: number;
  note: string;
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AKANUKE.AI",
  alternateName: "メンズ垢抜けAI診断",
  url: "https://akanukeai.com/",
  description:
    "AIがあなたの魅力を分析し、髪型・眉毛・肌・印象から、あなただけの垢抜けプランを提案する男性向け美容AIサービス。",
  image:
    "https://akanukeai.com/seo/akanuke-ai-search.png",
};

const analysisItems: AnalysisItem[] = [
  {
    icon: "hair",
    label: "HAIR STYLE",
    score: 82,
    note: "清潔感のある爽やかなスタイルが似合います",
  },
  {
    icon: "brow",
    label: "EYEBROW",
    score: 78,
    note: "眉の形を整えると印象がさらにUP",
  },
  {
    icon: "skin",
    label: "SKIN",
    score: 76,
    note: "保湿ケアで肌の透明感を引き出せます",
  },
  {
    icon: "spark",
    label: "OVERALL IMPRESSION",
    score: 86,
    note: "爽やかで誠実な印象をさらに洗練",
  },
];

const faqs = [
  [
    "診断は無料ですか？",
    "はい。AI診断は無料でご利用いただけます。",
  ],
  [
    "診断結果は他人に見られますか？",
    "本人以外に公開されることはありません。",
  ],
  [
    "どのような写真を使えばいいですか？",
    "正面を向き、顔全体が明るく写っている写真がおすすめです。",
  ],
  [
    "診断にはどのくらい時間がかかりますか？",
    "目安は約1分です。",
  ],
  [
    "女性も利用できますか？",
    "AKANUKE.AIは男性向けに特化したサービスのため、女性の方はご利用いただけません。女性向けサービスをご希望の方は、ぜひご意見をお寄せください。",
  ],
  [
    "診断結果はどこで確認できますか？",
    "診断後の結果画面と、登録後のマイページから確認できます。",
  ],
];

function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "yen") {
    return (
      <svg {...common}>
        <path d="m7 4 5 7 5-7" />
        <path d="M8 12h8M8 16h8M12 11v9" />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </svg>
    );
  }

  if (name === "hair") {
  return (
    <svg {...common}>
      <path d="M5 12.5V10a7 7 0 0 1 14 0v2.5" />
      <path d="M6.5 10.5c1.1-3.2 3.3-5 6.2-5.3 2.4-.2 4.5.8 5.8 2.8" />
      <path d="M7.5 9.5c1.4-.3 2.6-1.1 3.5-2.3" />
      <path d="M11 7.2c1.2 1 2.8 1.5 4.6 1.4" />
      <path d="M7.5 12.5v5" />
      <path d="M16.5 12.5v5" />
      <path d="M9 20h6" />
    </svg>
  );
}

  if (name === "brow") {
    return (
      <svg {...common}>
        <path d="M4 12c2.4-3 5.1-4.2 8-3.6 3.2.6 5.6 2 8 4.6" />
        <path d="M6 15c4 1.6 8 1.6 12 0" />
      </svg>
    );
  }

  if (name === "skin") {
    return (
      <svg {...common}>
        <path d="M12 3c3.4 4.3 5.5 7 5.5 10.2A5.5 5.5 0 0 1 6.5 13.2C6.5 10 8.6 7.3 12 3Z" />
        <path d="M9.5 14.5c.8 1 2 1.5 3.4 1.3" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
        <path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
      </svg>
    );
  }

  if (name === "upload") {
    return (
      <svg {...common}>
        <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
        <path d="M5 15v4h14v-4" />
      </svg>
    );
  }

 if (name === "brain") {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* AIを囲む円 */}
      <circle
        cx="11.5"
        cy="12"
        r="7"
      />

      {/* AI */}
      <text
        x="11.5"
        y="12.4"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        stroke="none"
        fontSize="6"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        AI
      </text>
    </svg>
  );
}

  if (name === "document") {
    return (
      <svg {...common}>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4m8-4v4M4 10h16" />
      </svg>
    );
  }

  if (name === "bag") {
  return (
    <svg {...common}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

  return (
    <svg {...common}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

type FaqItemProps = {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  idPrefix: string;
};

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  idPrefix,
}: FaqItemProps) {
  const answerId = `${idPrefix}-faq-answer-${index}`;

  return (
    <article
      className={`overflow-hidden rounded-[18px] border bg-white transition duration-300 ${
        isOpen
          ? "border-[#1677FF]/30 shadow-[0_10px_34px_rgba(15,23,42,0.05)]"
          : "border-black/10"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#F7F9FC]"
      >
        <span className="text-[14px] font-black leading-6 text-[#111111]">
          {question}
        </span>

        <span
          aria-hidden="true"
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 10 5 5 5-5" />
          </svg>
        </span>
      </button>

      <div
        id={answerId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-black/5 px-5 pb-5 pt-4 text-[13px] leading-7 text-black/85">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] =
    useState<number | null>(null);

    const featuredArticles =
  getAllArticles().slice(0, 3);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) =>
      current === index ? null : index,
    );
  };

  const leftFaqs = faqs
    .map((faq, index) => ({
      faq,
      index,
    }))
    .filter(({ index }) => index % 2 === 0);

  const rightFaqs = faqs
    .map((faq, index) => ({
      faq,
      index,
    }))
    .filter(({ index }) => index % 2 === 1);

  return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteStructuredData),
      }}
    />

    <main className="overflow-x-clip bg-white text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="site-container flex h-18 items-center justify-between gap-4">
        <Logo href="/" />

          <nav className="hidden items-center gap-8 text-sm font-semibold text-black/70 lg:flex">
            <a className="nav-link" href="#about">
              サービスについて
            </a>
            <a className="nav-link" href="#flow">
              診断の流れ
            </a>
            <a className="nav-link" href="#features">
              できること
            </a>
            <a className="nav-link" href="#faq">
              FAQ
            </a>
          </nav>

          <div className="flex items-center">
  <Link
    href="/upload"
    prefetch={false}
    className="primary-button header-diagnosis-button"
  >
    <span>無料で診断をはじめる</span>

    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
    >
      ›
    </span>
  </Link>
</div>
        </div>
      </header>

      <section id="top" className="hero-section relative overflow-hidden">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <div className="site-container grid min-h-[660px] items-center gap-3 py-8 md:gap-8 md:py-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-4 lg:py-16">
  <div className="relative z-10 max-w-[520px] lg:pb-4">
    <h1 className="text-balance text-[38px] font-semibold leading-[1.1] tracking-[-0.055em] text-[#111111] sm:text-[64px] lg:text-[76px]">
  第一印象は、
  <br />
  変えられる。
</h1>

    <p className="mt-5 text-[18px] font-semibold leading-[1.6] tracking-[-0.025em] text-[#111111] md:mt-8 md:text-[30px] lg:text-[33px]">
  AIが、あなただけの
  <br className="hidden md:block" />
  垢抜けプランを作成。
</p>

    {/* PC・タブレットのみ表示 */}
    <div className="hidden md:block">
      <p className="mt-6 text-[15px] font-semibold leading-[2] text-black/60 md:text-[16px]">
        顔写真をもとに、AIがあなたの魅力を分析。
        <br />
        髪型・眉毛・肌・印象まで、
        <br />
        あなただけの垢抜けプランを作成します。
      </p>

      <Link
  href="/upload"
  prefetch={false}
  className="primary-button mt-8 w-full max-w-[355px]"
>
  <span>無料で診断をはじめる</span>

  <span
    aria-hidden="true"
    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
  >
    ›
  </span>
</Link>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-black/70">
        <MiniBenefit
          icon="clock"
          label="約1分で完了"
        />
        <MiniBenefit
          icon="yen"
          label="完全無料"
        />
        <MiniBenefit
          icon="user"
          label="メンズ専用"
        />
      </div>
    </div>
  </div>

  {/* 男性モデル ＋ AI ANALYSIS */}
  <div className="hero-visual-wrap relative z-0 min-h-[480px] lg:min-h-[585px]">
    <div className="hero-person-wrap">
      <Image
        src="/lp/hero-person-v6.png"
        alt="AKANUKE.AIで垢抜けた男性のイメージ"
        width={1536}
        height={2048}
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 70vw, 48vw"
        className="hero-person-image"
      />
    </div>

    <HeroAnalysisCard />
  </div>

  {/* スマホのみ表示 */}
  <div className="md:hidden">
    

    <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-[12px] font-bold text-black/70">
      <MiniBenefit
        icon="clock"
        label="約1分で完了"
      />
      <MiniBenefit
        icon="yen"
        label="完全無料"
      />
      <MiniBenefit
        icon="user"
        label="メンズ専用"
      />
    </div>
  </div>
</div>
      </section>

      <section id="about" className="section-border py-14">
        <div className="site-container grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle>
              こんなお悩み、ありませんか？
            </SectionTitle>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "自分に似合う髪型が分からない",
                "眉毛の整え方が分からない",
                "スキンケア用品を選べない",
                "服装を変えても垢抜けない",
                "客観的なアドバイスがほしい",
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
          </div>

          <div id="features">
            <SectionTitle>AKANUKE.AIで分かること</SectionTitle>

            <div className="mt-6 grid grid-cols-4 gap-3">
              <FeatureIcon icon="hair" label="髪型" />
              <FeatureIcon icon="brow" label="眉毛" />
              <FeatureIcon icon="skin" label="肌" />
              <FeatureIcon icon="spark" label="印象・バランス" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-border py-16">
  <div className="site-container grid items-stretch gap-10 lg:grid-cols-2">
    <div className="flex h-full flex-col">
      <SectionTitle>診断結果</SectionTitle>

      <div className="mt-6 grid flex-1 gap-3 rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[0.9fr_1.1fr]">
        <ResultList
          title="あなたの改善優先度"
          items={[
            "髪型 82/100",
            "眉毛 78/100",
            "肌 76/100",
            "印象・バランス 72/100",
          ]}
        />

        <ResultList
          title="あなたがやること"
          items={[
            "髪型の方向性を整える",
            "眉の形を整える",
            "肌の保湿ケアを徹底する",
            "印象をより洗練させる",
          ]}
          checks
        />     
      </div>
    </div>

    <div
  id="flow"
  className="flex h-full flex-col"
>
  <SectionTitle>
    診断の流れ
  </SectionTitle>
  
  <div className="mt-5 overflow-hidden rounded-[22px] border border-black/[0.07] bg-white px-4 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:grid sm:flex-1 sm:grid-cols-4 sm:gap-0 sm:px-0">
    <FlowStep
  step="01"
  icon="upload"
  label="顔写真をアップロード"
  description="正面から撮影した顔写真を1枚選びます。"
  first
/>

<FlowStep
  step="02"
  icon="brain"
  label="AIがあなたの特徴を分析"
  description="髪型・眉毛・肌・全体の印象をAIが分析します。"
/>

<FlowStep
  step="03"
  icon="calendar"
  label="垢抜けプランを作成"
  description="診断結果をもとに、改善プランを作成します。"
/>

<FlowStep
  step="04"
  icon="bag"
  label="あなたに合う商品を提案"
  description="必要なケア・スタイリング商品を提案します。"
  last
/>
  </div>

  <div className="mt-3 flex items-center justify-center divide-x divide-[#1677FF]/15 rounded-[16px] bg-[#EEF6FF] px-4 py-3.5">
    <div className="flex flex-1 items-center justify-center gap-2">
      <Icon
        name="clock"
        className="h-4 w-4 text-[#1677FF]"
      />

      <span className="text-[10px] font-bold text-black/45">
        診断時間
      </span>

      <strong className="text-[15px] font-black text-[#1677FF]">
        約1分
      </strong>
    </div>

    <div className="flex flex-1 items-center justify-center gap-2">
      <Icon
        name="yen"
        className="h-4 w-4 text-[#1677FF]"
      />

      <span className="text-[10px] font-bold text-black/45">
        料金
      </span>

      <strong className="text-[15px] font-black text-[#1677FF]">
        完全無料
      </strong>
    </div>
  </div>
</div>
  </div>
</section>

      {/* 診断フロー後のCTA */}
<div className="-mt-7 flex justify-center px-4 pb-8 sm:-mt-5 sm:pb-10">
  <Link
    href="/upload"
    prefetch={false}
    className="primary-button w-full max-w-[355px]"
  >
    <span>無料で診断をはじめる</span>

    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
    >
      ›
    </span>
  </Link>
</div>

{/* BEFORE / AFTER */}
<section className="section-border pb-10 pt-8 sm:pb-16 sm:pt-12">
  <div className="site-container">
    <div className="text-center">
      <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF] sm:text-[11px]">
        BEFORE / AFTER
      </p>

      <SectionTitle centered>
        現在の印象と、目指す理想像
      </SectionTitle>

      <p className="mx-auto mt-3 max-w-2xl text-[12px] leading-6 text-black/60 sm:mt-4 sm:text-sm sm:leading-7">
        AIが分析した現在の印象と、
        改善後に目指す理想イメージを比較できます。
      </p>
    </div>

    <div className="mx-auto mt-6 flex w-full max-w-4xl gap-3 sm:mt-8 sm:gap-5">
      <div className="min-w-0 flex-1">
        <BeforeAfterCard
          image="/lp/before-v3.png"
          label="Before"
          title="現在の印象"
          description="顔写真をもとに、髪型・眉毛・肌・全体の印象をAIが分析します。"
        />
      </div>

      <div className="min-w-0 flex-1">
        <BeforeAfterCard
          image="/lp/after-v3.png"
          label="After"
          title="理想の印象"
          description="改善ポイントを反映した、爽やかさと清潔感のある理想像を確認できます。"
          after
        />
      </div>
    </div>
  </div>
</section>

      <section className="pb-8 pt-10 sm:py-16">
  <div className="site-container grid gap-8 lg:grid-cols-3">
    <RecommendationCard
      title="あなた専用の垢抜けプラン"
      image="/lp/plan-v3.png"
      alt="あなた専用の垢抜けプランのイメージ"
    >
      AI診断結果から、優先して取り組むことを具体的なアクションに整理。
    </RecommendationCard>

    <RecommendationCard
      title="あなたに合う商品を提案"
      image="/lp/products-v3.png"
      alt="スキンケアやスタイリング商品のイメージ"
    >
      スキンケア・スタイリング剤など、診断結果に合わせて必要なアイテムを厳選。
    </RecommendationCard>

    <div className="rounded-3xl bg-gradient-to-br from-[#EEF6FF] to-white p-6">
      <p className="text-2xl font-bold leading-snug">
        いつでもどこでも、
        <br />
        あなたのポケットにAIを。
      </p>

      <div className="mt-6 grid gap-3 text-sm font-semibold text-black/70">
        <CheckItem>診断結果をいつでも確認</CheckItem>
        <CheckItem>やることリストの進捗を管理</CheckItem>
        <CheckItem>あなたに合う商品をチェック</CheckItem>
        <CheckItem>再診断で変化を可視化</CheckItem>
      </div>
    </div>
  </div>
</section>

<div className="flex justify-center px-4 pb-10 pt-2 sm:-mt-4 sm:pb-14 sm:pt-4">
  <Link
    href="/upload"
    prefetch={false}
    className="primary-button w-full max-w-[355px]"
  >
    <span>無料で診断をはじめる</span>

    <span
      aria-hidden="true"
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
    >
      ›
    </span>
  </Link>
</div>

<section
  id="faq"
  className="section-border pb-14 pt-8 sm:py-16"
>
  <div className="site-container">
    <div className="mx-auto w-full max-w-6xl">
      <SectionTitle>よくある質問</SectionTitle>

      {/* スマホ */}
      <div className="mt-6 space-y-4 md:hidden">
        {faqs.map(([question, answer], index) => (
          <FaqItem
            key={question}
            question={question}
            answer={answer}
            index={index}
            isOpen={openFaqIndex === index}
            onToggle={toggleFaq}
            idPrefix="mobile"
          />
        ))}
      </div>

      {/* PC */}
      <div className="mt-10 hidden grid-cols-2 items-start gap-4 md:grid">
        <div className="space-y-4">
          {leftFaqs.map(
            ({ faq: [question, answer], index }) => (
              <FaqItem
                key={question}
                question={question}
                answer={answer}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={toggleFaq}
                idPrefix="desktop-left"
              />
            ),
          )}
        </div>

        <div className="space-y-4">
          {rightFaqs.map(
            ({ faq: [question, answer], index }) => (
              <FaqItem
                key={question}
                question={question}
                answer={answer}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={toggleFaq}
                idPrefix="desktop-right"
              />
            ),
          )}
        </div>
      </div>
    </div>
  </div>
</section>

<section className="border-t border-black/10 bg-[#F7F9FC] px-4 py-14 sm:py-18">
  <div className="site-container">
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-black tracking-[0.18em] text-[#1677FF]">
          AKANUKE JOURNAL
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          垢抜けのヒント
        </h2>

        <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-black/55">
          髪型・眉毛・スキンケアなど、
          今日から実践できるメンズ美容情報を紹介します。
        </p>
      </div>
    </div>

    <div
      className={`mt-8 grid gap-5 ${
        featuredArticles.length > 1
          ? "md:grid-cols-2 lg:grid-cols-3"
          : "max-w-[520px]"
      }`}
    >
      {featuredArticles.map((article) => (
        <Link
  key={article.slug}
  href={`/media/${article.slug}`}
  scroll={true}
  className="group overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(15,23,42,0.09)]"
>
          <div className="relative aspect-[1200/630] overflow-hidden bg-[#EEF6FF]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 767px) 100vw, 380px"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-black/35">
              <span>{article.category}</span>
              <span aria-hidden="true">•</span>
              <span>{article.readingTime}</span>
            </div>

            <h3 className="mt-3 text-[18px] font-semibold leading-7 tracking-[-0.03em] text-[#111111]">
              {article.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-[12px] leading-6 text-black/55">
              {article.description}
            </p>

            <div className="mt-5 flex min-h-[46px] items-center justify-between rounded-[12px] border border-[#1677FF]/10 bg-[#EEF6FF] px-4 text-[12px] font-black text-[#1677FF] transition group-hover:border-[#1677FF]/25 group-hover:bg-[#E5F1FF]">
  <span>記事を読む</span>
  <span className="text-[16px]" aria-hidden="true">
    →
  </span>
</div>
          </div>
        </Link>
      ))}
    </div>

    <Link
  href="/media"
  scroll={true}
  className="mt-6 flex min-h-[50px] w-full items-center justify-center rounded-[12px] border border-[#1677FF]/30 bg-white px-5 text-[13px] font-black text-[#1677FF] shadow-[0_6px_18px_rgba(22,119,255,0.06)] transition hover:-translate-y-0.5 hover:border-[#1677FF]/50 hover:bg-[#EEF6FF] sm:max-w-[320px]"
>
  垢抜け記事をもっと見る
  <span className="ml-3 text-[16px]" aria-hidden="true">
    →
  </span>
</Link>
  </div>
</section>

      <section className="px-4 pb-5 pt-4">
        <div className="site-container overflow-hidden rounded-[28px] bg-gradient-to-r from-[#EEF6FF] via-white to-[#EEF6FF] px-6 py-8 sm:px-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_0.55fr]">
            <div>
              <p className="text-2xl font-bold leading-snug sm:text-3xl">
                変わりたい。最初の一歩を、
                <br />
                AKANUKE.AIと始めよう。
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-black/60">
                <MiniBenefit icon="clock" label="約1分で完了" />
                <MiniBenefit icon="yen" label="完全無料" />
                <MiniBenefit icon="user" label="メンズ専用" />
              </div>
            </div>

            <Link
  href="/upload"
  prefetch={false}
  className="primary-button w-full max-w-[355px]"
>
  <span>無料で診断をはじめる</span>

  <span
    aria-hidden="true"
    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
  >
    ›
  </span>
</Link>

            <Image
              src="/lp/hero-man-v2.png"
              width={390}
              height={470}
              alt="AKANUKE.AIを始める男性"
              className="hidden h-40 w-full object-cover object-top mix-blend-multiply lg:block"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 py-8">
        <div className="site-container flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <p className="font-black tracking-[0.14em]">
              AKANUKE.AI
            </p>
            <p className="text-[8px] font-bold tracking-[0.25em] text-[#1677FF]">
              MEN&apos;S AI BEAUTY
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-medium text-black/60">
  
  <Link
  href="/media"
  scroll={true}
>
  垢抜け記事
</Link>

  <Link href="/terms">
    利用規約
  </Link>

  <a
    href="https://www.leafworks.jp/doc/privacy.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    個人情報保護方針
  </a>

  <a
    href="https://www.leafworks.jp/contact/"
    target="_blank"
    rel="noopener noreferrer"
  >
    お問い合わせ
  </a>

  <a
    href="https://www.leafworks.jp/"
    target="_blank"
    rel="noopener noreferrer"
  >
    運営会社
  </a>

  <Link href="/login">
    ログイン
  </Link>
</div>

          <p className="text-[11px] text-black/40">
            © AKANUKE.AI All Rights Reserved.
          </p>
        </div>
            </footer>
    </main>
  </>
  );
}

function HeroAnalysisCard() {
  return (
    <aside
      className="analysis-panel"
      aria-label="AI分析結果のイメージ"
    >
      <div className="analysis-panel-header">
        <div>
          <p className="analysis-panel-title">
            AI ANALYSIS
          </p>

          <p className="analysis-panel-subtitle">
            BEAUTY DIAGNOSIS
          </p>
        </div>

        <span className="analysis-panel-spark">
          <Icon name="spark" className="h-4 w-4" />
        </span>
      </div>

      <div className="analysis-panel-list">
        {analysisItems.map((item, index) => (
          <AnalysisScoreRow
            key={item.label}
            item={item}
            last={index === analysisItems.length - 1}
          />
        ))}
      </div>
    </aside>
  );
}

function AnalysisScoreRow({
  item,
  last,
}: {
  item: AnalysisItem;
  last: boolean;
}) {
  const customIconSrc =
    item.icon === "hair"
      ? "/icons/hair.svg"
      : item.icon === "brow"
        ? "/icons/brow.svg"
        : null;

  return (
    <div
      className={`analysis-score-row ${
        last ? "analysis-score-row-last" : ""
      }`}
    >
      <div className="analysis-score-icon-wrap">
        {customIconSrc ? (
          <Image
            src={customIconSrc}
            alt=""
            width={32}
            height={32}
            className="analysis-score-icon object-contain"
          />
        ) : (
          <Icon
            name={item.icon}
            className="analysis-score-icon"
          />
        )}

        <span className="analysis-score-icon-line" />
      </div>

      <div className="analysis-score-content">
        <p className="analysis-score-label">
          {item.label}
        </p>

        <p className="analysis-score-number">
          {item.score}
          <span>/100</span>
        </p>

        <p className="analysis-score-note">
          {item.note}
        </p>
      </div>
    </div>
  );
}

function MiniBenefit({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-full border border-[#1677FF] text-[#1677FF]">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      {label}
    </span>
  );
}

function SectionTitle({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <h2
      className={`text-2xl font-bold tracking-[-0.03em] sm:text-3xl ${
        centered ? "text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-start gap-2.5">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#1677FF] text-[#1677FF]">
        <Icon name="check" className="h-3 w-3" />
      </span>
      <span>{children}</span>
    </span>
  );
}

function FeatureIcon({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  const customIconSrc =
    icon === "hair"
      ? "/icons/hair.svg"
      : icon === "brow"
        ? "/icons/brow.svg"
        : null;

  return (
    <div className="text-center">
      <div className="mx-auto grid aspect-square max-w-24 place-items-center rounded-2xl border border-[#1677FF]/10 bg-[#F7FAFF] text-[#1677FF]">
        {customIconSrc ? (
          <Image
            src={customIconSrc}
            alt=""
            width={48}
            height={48}
            className="h-9 w-9 object-contain"
          />
        ) : (
          <Icon
            name={icon}
            className="h-9 w-9"
          />
        )}
      </div>

      <p className="mt-3 text-xs font-bold sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function ResultList({
  title,
  items,
  checks = false,
}: {
  title: string;
  items: string[];
  checks?: boolean;
}) {
  return (
    <div className="rounded-[18px] bg-[#EEF6FF] p-4 sm:p-5">
      <p className="text-sm font-black lg:text-[16px]">
        {title}
      </p>

      <ul className="mt-4 space-y-3 text-xs font-semibold text-black/70 lg:text-[14px]">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-2"
          >
            {checks ? (
              <span className="text-[#1677FF]">
                ✓
              </span>
            ) : (
              <span className="w-5 shrink-0 font-black text-black/40">
                0{index + 1}
              </span>
            )}

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowStep({
  step,
  icon,
  label,
  description,
  first = false,
  last = false,
}: {
  step: string;
  icon: IconName;
  label: string;
  description: string;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`relative flex gap-4 py-4 sm:flex-col sm:items-center sm:px-3 sm:py-5 sm:text-center ${
        !last
          ? "border-b border-black/[0.07] sm:border-b-0 sm:border-r"
          : ""
      }`}
    >
      {/* スマホでは縦ラインで手順を表現 */}
      {!last && (
        <span
          aria-hidden="true"
          className="absolute bottom-[-12px] left-[19px] top-[52px] w-px bg-[#1677FF]/20 sm:hidden"
        />
      )}

      {/* STEP番号 */}
      <div className="relative z-10 shrink-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[11px] font-black text-[#1677FF]">
          {step}
        </span>
      </div>

      <div className="min-w-0 flex-1 sm:flex sm:flex-col sm:items-center">
        <div className="flex items-center gap-3 sm:flex-col">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#1677FF] sm:h-10 sm:w-10">
            <Icon
  name={icon}
  className={
    icon === "brain"
      ? "h-8 w-8 sm:h-9 sm:w-9"
      : "h-6 w-6 sm:h-7 sm:w-7"
  }
/>
          </span>

          <p className="text-[13px] font-black leading-5 text-[#111111] sm:text-[12px]">
            {label}
          </p>
        </div>

        <p className="mt-1.5 max-w-[270px] text-[11px] font-medium leading-5 text-black/60 sm:mt-3">
  {description}
</p>
      </div>

      {first && (
        <span className="sr-only">
          診断開始
        </span>
      )}
    </div>
  );
}

function BeforeAfterCard({
  image,
  label,
  title,
  description,
  after = false,
}: {
  image: string;
  label: "Before" | "After";
  title: string;
  description: string;
  after?: boolean;
}) {
  return (
    <article className="min-w-0 text-left">
      <div className="mb-2 flex justify-center sm:mb-3 sm:justify-start">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black sm:px-3 sm:py-1.5 sm:text-[11px] ${
            after
              ? "bg-[#FFD400] text-[#111111]"
              : "bg-[#111111] text-white"
          }`}
        >
          {label}
        </span>
      </div>

      <div
        className={`overflow-hidden rounded-[18px] border bg-white shadow-sm sm:rounded-3xl ${
          after
            ? "border-[#FFD400]"
            : "border-black/10"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF6FF]">
          <Image
            src={image}
            alt={`${label} ${title}`}
            fill
            quality={100}
            sizes="(max-width: 767px) 50vw, 440px"
            className="object-cover"
          />
        </div>

        <div className="p-3 sm:p-6">
          <h3 className="text-[13px] font-black leading-5 text-[#111111] sm:text-lg">
            {title}
          </h3>

          <p className="mt-1.5 text-[9px] leading-[1.7] text-black/55 sm:mt-3 sm:text-sm sm:leading-7">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

function RecommendationCard({
  title,
  image,
  alt,
  children,
}: {
  title: string;
  image: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article>
      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <div className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <Image
          src={image}
          alt={alt}
          width={285}
          height={120}
          className="h-44 w-full object-cover"
        />

        <p className="p-5 text-sm leading-7 text-black/60">
          {children}
        </p>
      </div>
    </article>
  );
}