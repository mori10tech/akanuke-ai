import Link from "next/link";
import AppShell from "../components/AppShell";
import DummyAd from "../components/DummyAd";

type ProductCategory = "skincare" | "hair" | "eyebrow" | "grooming";

type ProductVisualType =
  | "sunscreen"
  | "lotion"
  | "cleanser"
  | "wax"
  | "hairOil"
  | "dryer"
  | "eyebrowShaver"
  | "eyebrowPencil"
  | "tweezers"
  | "fragrance"
  | "lip"
  | "toothbrush";

type Product = {
  id: string;
  rank: number;
  name: string;
  shortName: string;
  brand: string;
  description: string;
  category: ProductCategory;
  price: number;
  score: number;
  matchScore: number;
  rating: string;
  reviewCount: string;
  visualType: ProductVisualType;
  badges: string[];
  recommendedFor: string[];
  affiliateLinks: {
    amazon: string;
    rakuten: string;
    yahoo: string;
  };
};

type CategorySection = {
  id: ProductCategory;
  label: string;
  englishLabel: string;
  priority: number;
  description: string;
  advice: string;
  icon: "drop" | "hair" | "brow" | "sparkle";
};

function createAffiliateLinks(productName: string) {
  const encodedName = encodeURIComponent(productName);

  return {
    amazon: `https://www.amazon.co.jp/s?k=${encodedName}`,
    rakuten: `https://search.rakuten.co.jp/search/mall/${encodedName}/`,
    yahoo: `https://shopping.yahoo.co.jp/search?p=${encodedName}`,
  };
}

const products: Product[] = [
  {
    id: "allie-uv",
    rank: 1,
    name: "クロノビューティ ジェルUV EX",
    shortName: "日焼け止め",
    brand: "ALLIE",
    description: "紫外線から肌を守り、清潔感のある印象を維持しやすくします。",
    category: "skincare",
    price: 2310,
    score: 15,
    matchScore: 98,
    rating: "4.6",
    reviewCount: "1,234件",
    visualType: "sunscreen",
    badges: ["AI最優先", "初心者向け"],
    recommendedFor: ["肌", "清潔感", "第一印象"],
    affiliateLinks: createAffiliateLinks("ALLIE クロノビューティ ジェルUV EX"),
  },
  {
    id: "nivea-lotion",
    rank: 2,
    name: "メン スキンコンディショナーバーム",
    shortName: "化粧水",
    brand: "NIVEA MEN",
    description: "肌のうるおいを整え、乾燥によるくすみやカサつきを防ぎます。",
    category: "skincare",
    price: 1320,
    score: 8,
    matchScore: 94,
    rating: "4.5",
    reviewCount: "656件",
    visualType: "lotion",
    badges: ["毎日ケア", "高コスパ"],
    recommendedFor: ["乾燥", "肌荒れ", "保湿"],
    affiliateLinks: createAffiliateLinks("NIVEA MEN スキンコンディショナーバーム"),
  },
  {
    id: "uno-cleanser",
    rank: 3,
    name: "ホイップウォッシュ ブラック",
    shortName: "洗顔料",
    brand: "UNO",
    description: "皮脂や毛穴汚れを落とし、ベタつきの少ない肌を目指します。",
    category: "skincare",
    price: 550,
    score: 6,
    matchScore: 91,
    rating: "4.4",
    reviewCount: "892件",
    visualType: "cleanser",
    badges: ["皮脂対策", "高コスパ"],
    recommendedFor: ["テカリ", "毛穴", "皮脂"],
    affiliateLinks: createAffiliateLinks("UNO ホイップウォッシュ ブラック"),
  },
  {
    id: "n-homme-balm",
    rank: 1,
    name: "ナチュラルバーム",
    shortName: "ヘアバーム",
    brand: "N. HOMME",
    description: "自然な毛流れとツヤを作り、爽やかなヘアスタイルへ整えます。",
    category: "hair",
    price: 2200,
    score: 10,
    matchScore: 96,
    rating: "4.7",
    reviewCount: "633件",
    visualType: "wax",
    badges: ["AIおすすめ", "自然な仕上がり"],
    recommendedFor: ["髪型", "毛流れ", "清潔感"],
    affiliateLinks: createAffiliateLinks("N. HOMME ナチュラルバーム"),
  },
  {
    id: "napla-hair-oil",
    rank: 2,
    name: "エヌドット ポリッシュオイル",
    shortName: "ヘアオイル",
    brand: "N.",
    description: "髪の広がりを抑え、まとまりと自然なツヤを与えます。",
    category: "hair",
    price: 3740,
    score: 7,
    matchScore: 92,
    rating: "4.6",
    reviewCount: "2,103件",
    visualType: "hairOil",
    badges: ["乾燥対策", "ツヤ感"],
    recommendedFor: ["パサつき", "広がり", "ツヤ"],
    affiliateLinks: createAffiliateLinks("N. ポリッシュオイル"),
  },
  {
    id: "panasonic-dryer",
    rank: 3,
    name: "ヘアードライヤー イオニティ",
    shortName: "ドライヤー",
    brand: "Panasonic",
    description: "髪を乾かしながら、まとまりやすい状態へ整えます。",
    category: "hair",
    price: 5980,
    score: 5,
    matchScore: 87,
    rating: "4.5",
    reviewCount: "3,421件",
    visualType: "dryer",
    badges: ["時短", "毎日使える"],
    recommendedFor: ["寝ぐせ", "毛流れ", "まとまり"],
    affiliateLinks: createAffiliateLinks("Panasonic ヘアードライヤー イオニティ"),
  },
  {
    id: "panasonic-eyebrow-shaver",
    rank: 1,
    name: "マユシェーバーキット",
    shortName: "眉毛シェーバー",
    brand: "Panasonic",
    description: "眉毛の長さや眉間の余分な毛を、安全に整えやすくします。",
    category: "eyebrow",
    price: 2480,
    score: 9,
    matchScore: 97,
    rating: "4.5",
    reviewCount: "1,078件",
    visualType: "eyebrowShaver",
    badges: ["AI最優先", "初心者向け"],
    recommendedFor: ["眉毛", "目元", "清潔感"],
    affiliateLinks: createAffiliateLinks("Panasonic マユシェーバーキット"),
  },
  {
    id: "kate-eyebrow-pencil",
    rank: 2,
    name: "アイブロウペンシルZ",
    shortName: "眉ペンシル",
    brand: "KATE",
    description: "眉尻や薄い部分を自然に補い、目元を引き締めます。",
    category: "eyebrow",
    price: 605,
    score: 5,
    matchScore: 90,
    rating: "4.4",
    reviewCount: "945件",
    visualType: "eyebrowPencil",
    badges: ["自然な補正", "高コスパ"],
    recommendedFor: ["眉尻", "左右差", "目元"],
    affiliateLinks: createAffiliateLinks("KATE アイブロウペンシルZ"),
  },
  {
    id: "kai-tweezers",
    rank: 3,
    name: "先斜め毛抜き",
    shortName: "毛抜き",
    brand: "貝印",
    description: "眉間や眉下など、不要な毛を細かく整えるときに使用します。",
    category: "eyebrow",
    price: 880,
    score: 3,
    matchScore: 84,
    rating: "4.3",
    reviewCount: "428件",
    visualType: "tweezers",
    badges: ["細部ケア", "定番"],
    recommendedFor: ["眉間", "眉下", "細部"],
    affiliateLinks: createAffiliateLinks("貝印 先斜め毛抜き"),
  },
  {
    id: "shiro-fragrance",
    rank: 1,
    name: "サボン オードパルファン",
    shortName: "香水",
    brand: "SHIRO",
    description: "清潔感を感じやすい、自然で爽やかな香りを加えます。",
    category: "grooming",
    price: 4180,
    score: 4,
    matchScore: 89,
    rating: "4.6",
    reviewCount: "1,542件",
    visualType: "fragrance",
    badges: ["清潔感", "人気"],
    recommendedFor: ["香り", "清潔感", "印象"],
    affiliateLinks: createAffiliateLinks("SHIRO サボン オードパルファン"),
  },
  {
    id: "uno-lip",
    rank: 2,
    name: "オールインワンリップクリエイター",
    shortName: "リップ",
    brand: "UNO",
    description: "乾燥しやすい唇を保湿し、自然な血色感を整えます。",
    category: "grooming",
    price: 880,
    score: 3,
    matchScore: 86,
    rating: "4.3",
    reviewCount: "378件",
    visualType: "lip",
    badges: ["口元ケア", "持ち歩き"],
    recommendedFor: ["乾燥", "口元", "血色感"],
    affiliateLinks: createAffiliateLinks("UNO オールインワンリップクリエイター"),
  },
  {
    id: "oralb-toothbrush",
    rank: 3,
    name: "すみずみクリーン",
    shortName: "電動歯ブラシ",
    brand: "Oral-B",
    description: "毎日の歯磨きを補助し、口元の清潔感を維持します。",
    category: "grooming",
    price: 2980,
    score: 4,
    matchScore: 83,
    rating: "4.5",
    reviewCount: "2,618件",
    visualType: "toothbrush",
    badges: ["口元ケア", "毎日使える"],
    recommendedFor: ["歯", "口元", "清潔感"],
    affiliateLinks: createAffiliateLinks("Oral-B すみずみクリーン"),
  },
];

const categories: CategorySection[] = [
  {
    id: "skincare",
    label: "スキンケア",
    englishLabel: "SKIN CARE",
    priority: 1,
    description: "乾燥・テカリ・紫外線対策を整え、清潔感のある印象を目指します。",
    advice: "最初は洗顔・保湿・日焼け止めの3つだけで十分です。",
    icon: "drop",
  },
  {
    id: "hair",
    label: "ヘアケア",
    englishLabel: "HAIR CARE",
    priority: 2,
    description: "髪の広がりや寝ぐせを整え、顔立ちに合うシルエットを作ります。",
    advice: "スタイリング剤の前に、ドライヤーで毛流れを整えるのがおすすめです。",
    icon: "hair",
  },
  {
    id: "eyebrow",
    label: "眉毛ケア",
    englishLabel: "EYEBROW CARE",
    priority: 3,
    description: "眉毛の長さや輪郭を整え、目元をすっきり見せます。",
    advice: "細くしすぎず、余分な毛と長さだけを整えるのが失敗しにくい方法です。",
    icon: "brow",
  },
  {
    id: "grooming",
    label: "身だしなみ",
    englishLabel: "GROOMING",
    priority: 4,
    description: "香り・口元・唇など、細かい部分の清潔感を補います。",
    advice: "髪型・眉毛・肌を整えたあとに追加すると、全体の完成度が高まります。",
    icon: "sparkle",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("ja-JP").format(price);
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4h5v5" />
      <path d="m10 14 10-10" />
      <path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

function SparkleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
  );
}

function CategoryIcon({ type }: { type: CategorySection["icon"] }) {
  if (type === "drop") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3S6 9.2 6 14a6 6 0 0 0 12 0c0-4.8-6-11-6-11Z" />
      </svg>
    );
  }

  if (type === "hair") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 18c1.5-4 3.5-6 6-6 2 0 3.6 1.1 4.8 3.1" />
        <path d="M6 10c1.4-4.4 4-6.6 7.7-6.6 3.2 0 5.4 1.7 6.3 5.1" />
        <path d="M4 14c.8-2.1 2-3.4 3.6-4" />
      </svg>
    );
  }

  if (type === "brow") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 14c4-4 8-4 12 0" />
        <path d="M9 14c4-4 8-4 12 0" />
      </svg>
    );
  }

  return <SparkleIcon className="h-5 w-5" />;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function getVisualSettings(type: ProductVisualType) {
  const settings: Record<ProductVisualType, { label: string; subLabel: string; bodyClass: string; shapeClass: string }> = {
    sunscreen: { label: "UV", subLabel: "SPF 50+", bodyClass: "border-stone-200 bg-gradient-to-br from-white via-stone-50 to-stone-100", shapeClass: "h-[76%] w-[44%] rounded-b-[16px] rounded-t-[7px]" },
    lotion: { label: "MEN", subLabel: "LOTION", bodyClass: "border-blue-900/20 bg-gradient-to-r from-blue-950 via-blue-700 to-blue-950 text-white", shapeClass: "h-[72%] w-[40%] rounded-b-[12px] rounded-t-[7px]" },
    cleanser: { label: "WASH", subLabel: "CLEAN", bodyClass: "border-neutral-700 bg-gradient-to-br from-neutral-800 to-black text-white", shapeClass: "h-[70%] w-[45%] rounded-b-[14px] rounded-t-[8px]" },
    wax: { label: "N.", subLabel: "BALM", bodyClass: "border-neutral-700 bg-gradient-to-br from-neutral-600 via-neutral-900 to-black text-white", shapeClass: "h-[45%] w-[60%] rounded-[15px]" },
    hairOil: { label: "OIL", subLabel: "HAIR", bodyClass: "border-amber-800/20 bg-gradient-to-r from-amber-800 via-amber-500 to-amber-800 text-white", shapeClass: "h-[72%] w-[36%] rounded-b-[12px] rounded-t-[5px]" },
    dryer: { label: "ION", subLabel: "DRYER", bodyClass: "border-slate-300 bg-gradient-to-br from-white to-slate-200", shapeClass: "h-[46%] w-[64%] rounded-[22px]" },
    eyebrowShaver: { label: "眉", subLabel: "SHAVER", bodyClass: "border-slate-300 bg-gradient-to-b from-white to-slate-200", shapeClass: "h-[78%] w-[22%] rounded-full" },
    eyebrowPencil: { label: "BROW", subLabel: "PENCIL", bodyClass: "border-stone-700 bg-gradient-to-b from-stone-700 to-stone-950 text-white", shapeClass: "h-[82%] w-[12%] rounded-full" },
    tweezers: { label: "CARE", subLabel: "TOOL", bodyClass: "border-slate-300 bg-gradient-to-b from-white to-slate-300", shapeClass: "h-[76%] w-[18%] rotate-6 rounded-full" },
    fragrance: { label: "SAVON", subLabel: "EAU", bodyClass: "border-sky-100 bg-gradient-to-br from-white to-sky-100", shapeClass: "h-[60%] w-[46%] rounded-[10px]" },
    lip: { label: "LIP", subLabel: "CARE", bodyClass: "border-neutral-700 bg-gradient-to-b from-neutral-800 to-black text-white", shapeClass: "h-[72%] w-[22%] rounded-[7px]" },
    toothbrush: { label: "ORAL", subLabel: "CARE", bodyClass: "border-blue-100 bg-gradient-to-b from-white to-blue-100", shapeClass: "h-[78%] w-[20%] rounded-full" },
  };

  return settings[type];
}

function ProductVisual({ type, size = "normal" }: { type: ProductVisualType; size?: "small" | "normal" | "large" }) {
  const wrapperSize = size === "large" ? "h-44 w-32" : size === "small" ? "h-16 w-12" : "h-28 w-20";
  const settings = getVisualSettings(type);

  return (
    <div className={`relative flex items-end justify-center ${wrapperSize}`}>
      <div className={`relative flex items-center justify-center border shadow-[0_14px_28px_rgba(15,23,42,0.12)] ${settings.bodyClass} ${settings.shapeClass}`}>
        <div className="text-center">
          <p className="text-[7px] font-black tracking-[0.08em]">{settings.label}</p>
          <p className="mt-0.5 text-[4px] font-bold opacity-60">{settings.subLabel}</p>
        </div>
      </div>
    </div>
  );
}

function AffiliateButtons({ product }: { product: Product }) {
  const baseClass = "flex min-h-10 items-center justify-center gap-1 rounded-[10px] px-1 text-[8px] font-black text-white transition active:scale-[0.98]";

  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <a href={product.affiliateLinks.amazon} target="_blank" rel="noreferrer sponsored" className={`${baseClass} bg-black`}>
        Amazon
        <ExternalLinkIcon />
      </a>
      <a href={product.affiliateLinks.rakuten} target="_blank" rel="noreferrer sponsored" className={`${baseClass} bg-[#BF0000]`}>
        楽天
        <ExternalLinkIcon />
      </a>
      <a href={product.affiliateLinks.yahoo} target="_blank" rel="noreferrer sponsored" className={`${baseClass} bg-[#FF0033]`}>
        Yahoo!
        <ExternalLinkIcon />
      </a>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="grid grid-cols-[118px_1fr] border-b border-black/5">
        <div className="relative flex min-h-[170px] items-center justify-center bg-gradient-to-b from-white to-[#F7FAFF]">
          <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFD400] text-[10px] font-black text-black">
            {product.rank}
          </span>
          <ProductVisual type={product.visualType} size="normal" />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-black tracking-[0.08em] text-black/35">{product.brand}</p>
              <h3 className="mt-1 text-[15px] font-black leading-6">{product.name}</h3>
            </div>

            <div className="shrink-0 rounded-[12px] bg-[#EEF6FF] px-2.5 py-2 text-right">
              <p className="text-[7px] font-black text-[#1677FF]">AI一致度</p>
              <p className="mt-0.5 text-[18px] font-black leading-none text-[#1677FF]">{product.matchScore}%</p>
            </div>
          </div>

          <p className="mt-2 text-[10px] leading-5 text-black/50">{product.description}</p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] text-[#F4B400]">★ {product.rating}</p>
              <p className="mt-0.5 text-[8px] text-black/35">{product.reviewCount}</p>
            </div>
            <p className="text-[18px] font-black">¥{formatPrice(product.price)}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-[#FFF7CC] px-2 py-1 text-[8px] font-black text-[#846600]">
              {badge}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[8px] font-black text-black/35">改善できる項目</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.recommendedFor.map((item) => (
            <span key={item} className="flex items-center gap-1 rounded-full bg-[#EEF6FF] px-2 py-1 text-[8px] font-black text-[#1677FF]">
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>

        <AffiliateButtons product={product} />
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const primaryProduct = products[0];

  return (
    <AppShell>
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
          <Link href="/result" aria-label="診断結果へ戻る" className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-[#EEF6FF] active:scale-95">
            <ArrowLeftIcon />
          </Link>

          <Link href="/" className="text-center text-[21px] font-black tracking-[-0.03em]">
            AKANUKE.AI
          </Link>

          <button type="button" aria-label="メニューを開く" className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-[#EEF6FF] active:scale-95">
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className="px-4 pb-32 pt-6">
        <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">PERSONAL PRODUCT GUIDE</p>

        <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
          あなた専用のおすすめ商品
        </h1>

        <p className="mt-3 text-[11px] leading-5 text-black/50">
          AI診断結果をもとに、改善効果が期待できる順番で商品を整理しました。
        </p>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_16px_46px_rgba(15,23,42,0.07)]">
          <div className="grid grid-cols-[44%_56%]">
            <div className="relative flex min-h-[260px] items-center justify-center border-r border-black/5 bg-gradient-to-br from-white to-[#EEF6FF]">
              <span className="absolute left-3 top-3 rounded-full bg-[#FFD400] px-3 py-1.5 text-[9px] font-black text-black">
                AI最優先
              </span>
              <ProductVisual type={primaryProduct.visualType} size="large" />
            </div>

            <div className="flex flex-col justify-center px-4 py-6">
              <p className="text-[8px] font-black tracking-[0.14em] text-[#1677FF]">BEST MATCH</p>
              <h2 className="mt-2 text-[23px] font-black tracking-[-0.04em]">{primaryProduct.shortName}</h2>
              <p className="mt-3 text-[10px] leading-5 text-black/50">
                現在の診断では、紫外線対策を優先すると肌の清潔感を維持しやすくなります。
              </p>

              <div className="mt-5 rounded-[16px] border border-[#1677FF]/15 bg-[#F7FAFF] p-3.5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[8px] font-black text-[#1677FF]">AI診断一致度</p>
                    <p className="mt-1 text-[31px] font-black leading-none text-[#1677FF]">{primaryProduct.matchScore}%</p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] font-black text-black/35">改善スコア</p>
                    <p className="mt-1 text-[22px] font-black leading-none text-[#1677FF]">
                      +{primaryProduct.score}
                      <span className="ml-0.5 text-[10px]">点</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-black/5 p-4">
            <div className="flex gap-3 rounded-[16px] border border-[#1677FF]/15 bg-[#F7FAFF] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1677FF] text-white">
                <SparkleIcon />
              </span>
              <div>
                <p className="text-[11px] font-black text-[#1677FF]">AIからのアドバイス</p>
                <p className="mt-1 text-[10px] leading-5 text-black/55">
                  最初からすべて揃える必要はありません。まずは日焼け止め、眉毛シェーバー、ヘアバームの3点から始めるのがおすすめです。
                </p>
              </div>
            </div>
          </div>
        </section>

        <nav aria-label="商品カテゴリー" className="mt-5 grid grid-cols-4 gap-2">
          {categories.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="flex min-h-[70px] flex-col items-center justify-center rounded-[15px] border border-black/10 bg-white px-1 text-center shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition hover:border-[#1677FF]/40 hover:bg-[#F7FAFF]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                <CategoryIcon type={category.icon} />
              </span>
              <span className="mt-2 text-[9px] font-black">{category.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {categories.map((category, categoryIndex) => {
            const categoryProducts = products.filter((product) => product.category === category.id);

            return (
              <div key={category.id}>
                <section id={category.id} className="scroll-mt-24">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-black tracking-[0.14em] text-[#1677FF]">PRIORITY {category.priority}</p>
                      <h2 className="mt-1 text-[23px] font-black tracking-[-0.04em]">{category.label}</h2>
                    </div>

                    <span className="rounded-full bg-[#EEF6FF] px-3 py-1.5 text-[9px] font-black text-[#1677FF]">
                      {categoryProducts.length}商品
                    </span>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-black/50">{category.description}</p>

                  <div className="mt-4 flex gap-3 rounded-[16px] border border-[#1677FF]/15 bg-[#F7FAFF] p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-sm">
                      <SparkleIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black text-[#1677FF]">AIカテゴリコメント</p>
                      <p className="mt-1 text-[10px] leading-5 text-black/55">{category.advice}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>

                {categoryIndex === 2 && <DummyAd className="mt-10" format="rectangle" />}
              </div>
            );
          })}
        </div>

        <aside className="mt-9 rounded-[16px] bg-[#F8FAFC] px-4 py-4">
          <p className="text-center text-[9px] leading-5 text-black/40">
            ※価格・レビュー数は画面確認用の参考表示です。
            <br />
            実際の価格や在庫状況は各販売サイトでご確認ください。
          </p>
        </aside>

        <Link href="/result" className="mt-5 flex min-h-[50px] items-center justify-center rounded-[13px] border border-black/10 bg-white px-5 text-[11px] font-black transition hover:bg-[#F7FAFF]">
          診断結果へ戻る
        </Link>
      </div>
    </AppShell>
  );
}