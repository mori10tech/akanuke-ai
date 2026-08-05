import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "./components/Logo";

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
  | "check";

type AnalysisItem = {
  icon: IconName;
  label: string;
  score: number;
  note: string;
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
    "はい。MVPではAI診断を無料でご利用いただけます。",
  ],
  [
    "写真は保存されますか？",
    "写真の保存方針はサービス仕様に合わせて明示し、削除方法も分かりやすく案内します。",
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
    "男性も利用できますか？",
    "AKANUKE.AIは男性向けに設計された美容AIサービスです。",
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
      <svg {...common}>
        <path d="M9.5 4A3.5 3.5 0 0 0 6 7.5c0 .5.1 1 .3 1.4A3.6 3.6 0 0 0 5 15.8 3.5 3.5 0 0 0 9.5 19V4Zm5 0A3.5 3.5 0 0 1 18 7.5c0 .5-.1 1-.3 1.4a3.6 3.6 0 0 1 1.3 6.9 3.5 3.5 0 0 1-4.5 3.2V4Z" />
        <path d="M9.5 9H7m7.5 2H17m-7.5 4H7m7.5-8H17" />
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

  return (
    <svg {...common}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[#111111]">
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

          <div className="flex items-center gap-4">
            <Link
  href="/login"
  className="hidden text-sm font-bold text-[#1677FF] sm:inline"
>
  ログイン
</Link>
            <Link
              href="/upload"
              className="primary-button compact-button"
            >
              無料で診断をはじめる
            </Link>
          </div>
        </div>
      </header>

      <section id="top" className="hero-section relative overflow-hidden">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <div className="site-container grid min-h-[660px] items-center gap-8 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-4 lg:py-16">
          <div className="relative z-10 max-w-[520px] lg:pb-4">
            <h1 className="text-balance text-[50px] font-semibold leading-[1.08] tracking-[-0.065em] text-[#111111] sm:text-[64px] lg:text-[76px]">
              第一印象は、
              <br />
              変えられる。
            </h1>

          

            <p className="mt-8 text-[25px] font-semibold leading-[1.55] tracking-[-0.035em] sm:text-[30px] lg:text-[33px]">
              
              AIが、あなただけの
              <br />
              垢抜けプランを作成。
            </p>

            <p className="mt-6 text-[15px] font-semibold leading-[2] text-black/60 sm:text-[16px]">
              顔写真をもとに、AIがあなたの魅力を分析。
              <br />
              髪型・眉毛・肌・印象まで、
              <br />
              あなただけの垢抜けプランを作成します。
            </p>

            <Link
              href="/upload"
              className="primary-button mt-8 w-full max-w-[355px]"
            >
              無料で診断をはじめる
              <span aria-hidden="true">›</span>
            </Link>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-black/70">
              <MiniBenefit icon="clock" label="約1分で完了" />
              <MiniBenefit icon="yen" label="完全無料" />
              <MiniBenefit icon="user" label="メンズ専用" />
            </div>
          </div>

          <div className="hero-visual-wrap relative z-0 min-h-[480px] lg:min-h-[585px]">
<div className="hero-person-wrap">
  <Image
    src="/lp/hero-person-v4.png"
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
            <SectionTitle>診断結果のサンプル</SectionTitle>

            <div className="mt-6 grid flex-1 gap-3 rounded-3xl border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_0.7fr]">
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

              <div className="flex flex-col items-center justify-center rounded-2xl bg-[#EEF6FF] p-4 text-center">
                <span className="text-sm font-bold text-black/60">
                  総合スコア
                </span>

                <div className="score-ring mt-2">
                  <span className="-mt-0 block text-3xl font-medium text-[#111111]">
                    78
                  </span>
                  
                </div>
              </div>
            </div>
          </div>

          <div id="flow" className="flex h-full flex-col">
            <SectionTitle>診断の流れ</SectionTitle>

            <div className="mt-6 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
              <FlowStep
                step="STEP 1"
                icon="upload"
                label="顔写真をアップロード"
              />
              <FlowStep
                step="STEP 2"
                icon="brain"
                label="AIがあなたの特徴を分析"
              />
              <FlowStep
                step="STEP 3"
                icon="document"
                label="改善ポイントを提案"
              />
              <FlowStep
                step="STEP 4"
                icon="calendar"
                label="垢抜けプランを作成"
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 rounded-2xl bg-[#EEF6FF] px-5 py-4 text-center text-sm font-bold text-[#1677FF]">
              <span>
                診断時間　
                <strong className="text-xl">約1分</strong>
              </span>
              <span>
                料金　
                <strong className="text-xl">0円</strong>
                （完全無料）
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-border py-16">
        <div className="site-container">
          <div className="text-center">
            <Link
              href="/upload"
              className="primary-button mx-auto mb-6 w-full max-w-sm"
            >
              無料で診断をはじめる
              <span aria-hidden="true">›</span>
            </Link>

            <p className="text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
              BEFORE / AFTER
            </p>

            <SectionTitle centered>
              現在の印象と、目指す理想像
            </SectionTitle>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/60">
              AIが分析した現在の印象と、改善後に目指す理想イメージを比較できます。
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
            <BeforeAfterCard
              image="/lp/before-v2.png"
              label="Before"
              title="現在の印象"
              description="顔写真をもとに、髪型・眉毛・肌・全体の印象をAIが分析します。"
            />

            <BeforeAfterCard
              image="/lp/after.png"
              label="After"
              title="理想の印象"
              description="改善ポイントを反映した、爽やかさと清潔感のある理想像を確認できます。"
              after
            />
          </div>
        </div>
      </section>

      <section className="section-border py-16">
  <div className="site-container grid gap-8 lg:grid-cols-3">
    <RecommendationCard
      title="あなたに合う商品を提案"
      image="/lp/products-v2.png"
      alt="スキンケアやスタイリング商品のイメージ"
    >
      スキンケア・スタイリング剤、診断結果に合わせて必要なアイテムを厳選。
    </RecommendationCard>

    <RecommendationCard
      title="あなたに合うサロンを提案"
      image="/lp/salon-v2.png"
      alt="メンズ美容室や眉毛サロンのイメージ"
    >
      美容室・眉毛サロンなど、位置情報から厳選サロンをご紹介。
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
        <CheckItem>おすすめ商品・サロンをチェック</CheckItem>
        <CheckItem>再診断で変化を可視化</CheckItem>
      </div>
    </div>
  </div>
</section>

      <section id="faq" className="section-border py-16">
        <div className="site-container">
          
          <div className="mx-auto w-full max-w-6xl">
            <SectionTitle>よくある質問</SectionTitle>

            <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
              {faqs.map(([question, answer]) => (
                <details key={question} className="faq-item group">
                  <summary>
                    {question}
                    <span>⌄</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-5 pt-4">
        <div className="site-container overflow-hidden rounded-[28px] bg-gradient-to-r from-[#EEF6FF] via-white to-[#EEF6FF] px-6 py-8 sm:px-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_0.55fr]">
            <div>
              <p className="text-2xl font-bold leading-snug sm:text-3xl">
                変わりたい。その最初の一歩を、
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
              className="primary-button min-w-[280px]"
            >
              無料で診断をはじめる
              <span aria-hidden="true">›</span>
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
            <a href="#">利用規約</a>

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
  return (
    <div
      className={`analysis-score-row ${
        last ? "analysis-score-row-last" : ""
      }`}
    >
      <div className="analysis-score-icon-wrap">
        <Icon
          name={item.icon}
          className="analysis-score-icon"
        />

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
  return (
    <div className="text-center">
      <div className="mx-auto grid aspect-square max-w-24 place-items-center rounded-2xl border border-black/10 bg-white text-[#1677FF] shadow-sm">
        <Icon name={icon} className="h-9 w-9" />
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
    <div className="rounded-2xl bg-[#EEF6FF] p-4">
      <p className="text-sm font-black">{title}</p>

      <ul className="mt-4 space-y-3 text-xs font-semibold text-black/70">
        {items.map((item, index) => (
          <li key={item} className="flex gap-2">
            {checks ? (
              <span className="text-[#1677FF]">✓</span>
            ) : (
              <span className="w-5 font-black text-black/40">
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
}: {
  step: string;
  icon: IconName;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm">
      <p className="text-[10px] font-black text-[#1677FF]">
        {step}
      </p>
      <Icon
        name={icon}
        className="mx-auto mt-4 h-8 w-8 text-[#1677FF]"
      />
      <p className="mt-4 text-xs font-bold leading-5">
        {label}
      </p>
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
    <article
      className={`overflow-hidden rounded-3xl border bg-white text-left shadow-sm ${
        after ? "border-[#FFD400]" : "border-black/10"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF6FF]">
        <Image
          src={image}
          alt={`${label} ${title}`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-black ${
            after
              ? "bg-[#FFD400] text-[#111111]"
              : "bg-[#111111] text-white"
          }`}
        >
          {label}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-black text-[#111111]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-black/60">
          {description}
        </p>
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
      <h3 className="text-xl font-bold">{title}</h3>

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