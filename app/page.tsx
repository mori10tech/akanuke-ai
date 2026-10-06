"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Logo from "./components/Logo";
import { getAllArticles } from "../data/articles";
import AdSenseAd from "./components/AdSenseAd";

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

const DIAGNOSIS_LIFF_URL =
  "https://liff.line.me/2011169942-wf6MoEy4?next=%2Fupload";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AKANUKE.AI",
  alternateName: "メンズ垢抜けAI診断",
  url: "https://akanuke.ai/",
  description:
    "AIがあなたの魅力を分析し、髪型・眉毛・肌・印象から、あなただけの垢抜けプランを提案する男性向け美容AIサービス。",
  image:
    "https://akanuke.ai/seo/akanuke-ai-search.png",
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

type AppFeature = {
  number: string;
  title: string;
  description: string;
  desktopDescription: string[];
  mobileDescription: string;
  image: string;
  alt: string;
};

const appFeatures: AppFeature[] = [
  {
    number: "01",
    title: "マイページ",
    description:
      "診断結果・垢抜けプラン・おすすめ商品など、AKANUKE.AIの各機能へまとめてアクセスできます。",
  
    desktopDescription: [
      "診断結果・垢抜けプラン・おすすめ商品など、",
      "AKANUKE.AIの各機能へまとめてアクセスできます。",
],
    mobileDescription:
      "診断結果・プラン・おすすめ商品など、各機能へまとめてアクセスできます。",
    image: "/lp/feature-mypage.png",
    alt: "AKANUKE.AIのマイページ画面",
  },
  {
    number: "02",
    title: "顔印象分析",
    description:
      "顔写真をもとに、髪型・眉毛・肌・全体の印象などをAIが順番に分析します。",
    
    desktopDescription: [
      "顔写真をもとに、髪型・眉毛・肌・全体の印象などを",
  "AIが順番に分析します。",
],
    mobileDescription:
  　　"顔写真から、髪型・眉毛・肌・印象をAIが分析します。",
    image: "/lp/feature-analysis.png",
    alt: "AKANUKE.AIのAI分析画面",
  },
  {
    number: "03",
    title: "診断結果",
    description:
      "現在の印象や垢抜けスコア、改善できるポイントを確認。自分がどこから整えるべきかが分かります。",
    desktopDescription: [
      "現在の印象や垢抜けスコア、改善できるポイントを確認。",
  "自分がどこから整えるべきかが分かります。",
],
    mobileDescription:
  　　 "今の印象やスコア、優先して改善したいポイントが分かります。",
    image: "/lp/feature-result.png",
    alt: "AKANUKE.AIの診断結果画面",
  },
  {
    number: "04",
    title: "Before / After",
    description:
      "現在の状態と、AIが提案する改善後のイメージを比較。これから目指す方向を視覚的に確認できます。",
    desktopDescription: [
      "現在の状態と、AIが提案する改善後のイメージを比較。",
  "これから目指す方向を視覚的に確認できます。",
],
    mobileDescription:
      "現在と改善後のイメージを比較し、目指す方向を確認できます。",
    image: "/lp/feature-after.png",
    alt: "AKANUKE.AIのBefore After画面",
  },
  {
    number: "05",
    title: "垢抜けプラン",
    description:
      "診断結果をもとに、優先順位の高い改善項目をやることリストとして整理。進捗も管理できます。",
    desktopDescription: [
      "診断結果をもとに、優先順位の高い改善項目を",
  "やることリストとして整理。進捗も管理できます。",
],
    mobileDescription:
  　　 "診断結果から、優先して取り組むことをリストで確認できます。",
    image: "/lp/feature-plan.png",
    alt: "AKANUKE.AIの垢抜けプラン画面",
  },
  {
    number: "06",
    title: "おすすめ商品",
    description:
      "診断結果に合わせて、スタイリング・ヘアケア・スキンケアなどカテゴリ別におすすめ商品を紹介します。",
    desktopDescription: [
      "診断結果に合わせて、スタイリング・スキンケアなど",
  "カテゴリ別におすすめ商品を紹介します。",
],
    mobileDescription:
   　 "診断結果に合わせて、あなたに合う商品をカテゴリ別に紹介します。",
    image: "/lp/feature-products.png",
    alt: "AKANUKE.AIのおすすめ商品画面",
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
    "AKANUKE.AIは男性向けに診断内容を最適化しています。女性の方が利用された場合、適切な診断結果が得られない場合があります。",
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

  const [isDiagnosisQrOpen, setIsDiagnosisQrOpen] =
    useState(false);

    useEffect(() => {
    if (window.location.hash) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const featuredArticles =
    getAllArticles().slice(0, 3);

    const handleDiagnosisStart = () => {
  const isDesktop =
    window.matchMedia("(min-width: 768px)").matches;

  if (isDesktop) {
    setIsDiagnosisQrOpen(true);
    return;
  }

  window.location.href = DIAGNOSIS_LIFF_URL;
};

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
  <a className="nav-link" href="#features">
    サービスについて
  </a>

  <a className="nav-link" href="#faq">
    FAQ
  </a>

  <a className="nav-link" href="#journal">
    AKANUKE JOURNAL
  </a>
</nav>

          <div className="flex items-center">
  <button
  type="button"
  onClick={handleDiagnosisStart}
  className="primary-button header-diagnosis-button"
>
    <span>無料で診断をはじめる</span>

    <span
  aria-hidden="true"
  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
>
  <span className="-translate-y-px">
    ›
  </span>
</span>
  </button>
</div>
        </div>
      </header>

      <section id="top" className="hero-section relative overflow-hidden">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <div className="site-container grid min-h-0 items-center gap-1 pb-0 pt-5 md:min-h-[660px] md:gap-8 md:py-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-4 lg:py-16">
  <div className="relative z-10 max-w-[520px] lg:pb-4">
    <h1 className="whitespace-nowrap text-[clamp(29px,7.9vw,33px)] font-[900] leading-none tracking-[-0.075em] text-[#111111] sm:whitespace-normal sm:text-[64px] sm:font-semibold sm:leading-[1.1] sm:tracking-[-0.055em] lg:text-[76px]">
  第一印象は、
  <br className="hidden sm:block" />
  変えられる。
</h1>

    <p className="mt-3 text-[18px] font-semibold leading-[1.6] tracking-[-0.025em] text-[#111111] md:mt-8 md:text-[30px] lg:text-[33px]">
  AIが、あなただけの
  <br className="hidden md:block" />
  垢抜けプランを作成。
</p>

    {/* PC・タブレットのみ表示 */}
    <div className="hidden md:block">
      <p className="mt-6 text-[15px] font-semibold leading-[2] text-black/70 md:text-[16px]">
        顔写真をもとに、AIがあなたの魅力を分析。
        <br />
        髪型・眉毛・肌・印象まで、
        <br />
        あなただけの垢抜けプランを作成します。
      </p>

      <button
  type="button"
  onClick={handleDiagnosisStart}
  className="primary-button header-diagnosis-button"
>
  <span>無料で診断をはじめる</span>

  <span
  aria-hidden="true"
  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
>
  <span className="-translate-y-px">
    ›
  </span>
</span>
</button>

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
  <div className="hero-visual-wrap relative z-0 h-[335px] min-h-0 overflow-hidden md:h-auto md:min-h-[480px] lg:min-h-[585px]">
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
<div className="flex items-center justify-center py-4 md:hidden">
  <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-[12px] font-bold text-black/70">
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

      <section
        id="about"
        className="section-border py-10 sm:py-16"
      >
        <div className="site-container">
          <div className="mx-auto max-w-5xl">
            <SectionTitle centered>
              こんなお悩み、ありませんか？
            </SectionTitle>

            <div className="mx-auto mt-6 grid w-fit gap-3 sm:mt-8 sm:w-full sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4 lg:grid-cols-3">
              {[
                "自分に似合う髪型が分からない",
                "眉毛の整え方が分からない",
                "スキンケア用品を選べない",
                "服装を変えても垢抜けない",
                "客観的なアドバイスがほしい",
                "何から始めればいいか分からない",
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
  id="features"
  className="scroll-mt-24 section-border overflow-hidden bg-[#F7FAFF] pt-6 pb-5 sm:pt-12 sm:pb-0"
>
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">

            <h2 className="mt-3 whitespace-nowrap text-2xl font-bold tracking-[0.05em] text-[#111111] sm:text-3xl">
  AKANUKE.AIについて
</h2>

            <p className="mx-auto mt-4 max-w-2xl text-[13px] font-medium leading-7 text-black/8S sm:text-[15px]">
  AI診断から改善プラン・おすすめ商品まで。
  <br />
  あなたの垢抜けを、診断して終わらせずサポートします。
</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {appFeatures.map((feature) => (
              <AppFeatureCard
  key={feature.number}
  feature={feature}
/>
            ))}
          </div>
        </div>
      </section>


      {/* 機能紹介後のCTA */}
<div className="flex justify-center px-4 pb-8 pt-8 sm:py-10">
  <button
  type="button"
  onClick={handleDiagnosisStart}
  className="primary-button header-diagnosis-button"
>
    <span>無料で診断をはじめる</span>

    <span
  aria-hidden="true"
  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
>
  <span className="-translate-y-px">
    ›
  </span>
</span>
  </button>
</div>

<section
  id="faq"
  className="scroll-mt-24 section-border pb-10 pt-8 sm:py-16"
>
  <div className="site-container">
    <div className="mx-auto w-full max-w-6xl">
      <div className="text-center">
  <SectionTitle>よくある質問</SectionTitle>
</div>

      {/* スマホ */}
      <div className="mt-5 space-y-3 md:hidden">
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

<section
  id="journal"
  className="scroll-mt-24 border-t border-black/10 bg-[#F7F9FC] px-4 pb-10 pt-6 sm:pb-18 sm:pt-10"
>
  <div className="site-container">
    <div className="text-center">
  <p className="mt-3 whitespace-nowrap text-2xl font-bold tracking-[0.05em] text-black sm:text-3xl">
    AKANUKE JOURNAL
  </p>

  <p className="mx-auto mt-4 max-w-2xl text-[13px] font-medium leading-7 text-black/85 sm:text-[15px]">
    髪型・眉毛・スキンケアなど、
    <br className="sm:hidden" />
    今日から実践できる美容情報を紹介します。
  </p>
</div>

    <div
      className={`mt-6 grid gap-4 sm:mt-8 sm:gap-5 ${
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
            <div className="flex items-center gap-2 text-[10px] font-bold text-black/60">
              <span>{article.category}</span>
              <span aria-hidden="true">•</span>
              <span>{article.readingTime}</span>
            </div>

            <h3 className="mt-3 text-[18px] font-semibold leading-7 tracking-[-0.03em] text-[#111111]">
              {article.title}
            </h3>

            <p className="mt-3 line-clamp-2 text-[12px] leading-6 text-black/70">
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

{/* トップページ AdSense */}
<section className="border-t border-black/10 bg-white px-4 py-8 sm:py-10">
  <div className="site-container">
    <AdSenseAd />
  </div>
</section>

      <section className="px-4 pb-5 pt-4">
        <div className="site-container overflow-hidden rounded-[28px] bg-gradient-to-r from-[#EEF6FF] via-white to-[#EEF6FF] px-6 py-8 sm:px-10">
                    <div className="grid items-center gap-6 lg:mx-auto lg:max-w-[1050px] lg:grid-cols-[minmax(0,1fr)_355px] lg:gap-10">
            <div>
              <p className="font-bold leading-snug">
  <span className="block whitespace-nowrap text-[clamp(18px,5.2vw,24px)] sm:text-3xl">
    変わりたい。最初の一歩を、
  </span>

  <span className="block whitespace-nowrap text-[clamp(18px,5.2vw,24px)] sm:text-3xl">
    AKANUKE.AIと始めよう。
  </span>
</p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-black/70">
                <MiniBenefit icon="clock" label="約1分で完了" />
                <MiniBenefit icon="yen" label="完全無料" />
                <MiniBenefit icon="user" label="メンズ専用" />
              </div>
            </div>

            <button
  type="button"
  onClick={handleDiagnosisStart}
  className="primary-button header-diagnosis-button"
>
              <span>無料で診断をはじめる</span>

              <span
  aria-hidden="true"
  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/10 text-[16px] leading-none"
>
  <span className="-translate-y-px">
    ›
  </span>
</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 py-8">
        <div className="site-container flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <Logo href="/" />

          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-medium text-black/70">
  
  <Link
  href="/media"
  scroll={true}
>
  垢抜け記事
</Link>

  <Link href="/terms">
    利用規約
  </Link>

  <Link href="/privacy">
  個人情報の取扱い
</Link>

  <Link href="/contact">
  お問い合わせ
</Link>

<a
  href="https://www.raygence.co.jp/"
  target="_blank"
  rel="noopener noreferrer"
>
  運営会社
</a>

  <Link href="/login">
    ログイン
  </Link>
</div>

          <p className="text-[11px] text-black/60">
            © AKANUKE.AI All Rights Reserved.
          </p>
        </div>
            </footer>
    </main>

{isDiagnosisQrOpen && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-labelledby="diagnosis-qr-title"
    onClick={() => setIsDiagnosisQrOpen(false)}
  >
    <div
      className="relative w-full max-w-[460px] rounded-[28px] bg-white px-8 py-9 text-center shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="閉じる"
        onClick={() => setIsDiagnosisQrOpen(false)}
        className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-black/[0.05] text-[22px] font-medium text-black/60 transition hover:bg-black/10"
      >
        ×
      </button>

      <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-[14px] shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
        <Image
          src="/icon-512.png"
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </div>

      <h2
        id="diagnosis-qr-title"
        className="mt-5 text-[24px] font-black leading-[1.4] tracking-[-0.04em] text-[#111111]"
      >
        診断はスマートフォンから
        <br />
        ご利用ください
      </h2>

      <p className="mt-4 text-[14px] font-medium leading-7 text-black/60">
        QRコードをスマートフォンで読み取ると、
        <br />
        LINEからすぐに診断を開始できます。
      </p>

      <div className="mx-auto mt-7 w-fit rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <Image
          src="/akanuke-liff-diagnosis-qr.png"
          alt="AKANUKE.AIの診断をスマートフォンで開くQRコード"
          width={220}
          height={220}
          className="h-[220px] w-[220px]"
        />
      </div>

      <p className="mt-5 text-[12px] font-medium leading-6 text-black/45">
        LINEアプリがインストールされた
        <br />
        スマートフォンで読み取ってください。
      </p>
    </div>
  </div>
)}

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
      ? "/icons/analysis-hair.png"
      : item.icon === "brow"
        ? "/icons/analysis-eyebrow.png"
        : item.icon === "skin"
          ? "/icons/analysis-skin.png"
          : item.icon === "spark"
            ? "/icons/analysis-impression.png"
            : null;

  const isBrow = item.icon === "brow";

  return (
    <div
      className={`grid grid-cols-[64px_minmax(0,1fr)] items-center gap-1.5 py-1.5 sm:grid-cols-[68px_minmax(0,1fr)] sm:py-2 ${
        last ? "" : "border-b border-black/10"
      }`}
    >
      <div className="flex h-[60px] w-[64px] shrink-0 items-center justify-center sm:h-[64px] sm:w-[68px]">
        {customIconSrc ? (
          <Image
            src={customIconSrc}
            alt=""
           width={isBrow ? 48 : 64}
           height={isBrow ? 48 : 64}
            className={
  isBrow
    ? "h-[46px] w-[46px] object-contain sm:h-12 sm:w-12"
    : "h-[60px] w-[60px] object-contain sm:h-[64px] sm:w-[64px]"
}
          />
        ) : (
          <Icon
            name={item.icon}
            className={
              isBrow
                ? "h-12 w-12"
                : "h-16 w-16"
            }
          />
        )}
      </div>

      <div className="min-w-0">
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
      <span className="font-[440]">{children}</span>
    </span>
  );
}

function AppFeatureCard({
  feature,
}: {
  feature: AppFeature;
}) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-black/[0.12] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:rounded-[22px]">
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
        <p className="text-[20px] font-black leading-none tracking-[-0.04em] text-[#1677FF] sm:text-[24px]">
  {feature.number}
</p>

        <h3 className="mt-3 text-[16px] font-black leading-tight tracking-[-0.04em] text-[#111111] sm:text-[20px]">
          {feature.title}
        </h3>

        <p className="mt-2 text-[11px] font-semibold leading-[1.65] text-black/70 sm:hidden">
  {feature.mobileDescription}
</p>

<p className="mt-3 hidden min-h-[46px] text-[13px] font-semibold leading-[1.75] text-black/70 sm:block">
  {feature.desktopDescription.map((line, index) => (
    <span key={line}>
      {line}
      {index < feature.desktopDescription.length - 1 && <br />}
    </span>
  ))}
</p>
      </div>

      <div className="flex justify-center bg-gradient-to-b from-[#F8FBFF] to-[#EEF6FF] px-3 pt-4 sm:px-5 sm:pt-5">
  <div
  className="w-full overflow-hidden rounded-t-[14px] border border-black/[0.14] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.09)] sm:rounded-t-[18px]"
  style={{ aspectRatio: "628 / 1200" }}
>
    <Image
      src={feature.image}
      alt={feature.alt}
      width={628}
      height={1200}
      unoptimized
      className="h-full w-full object-cover object-top"
    />
  </div>
</div>
    </article>
  );
}