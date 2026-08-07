export type ProductCategory =
  | "skincare"
  | "hair"
  | "eyebrow"
  | "grooming";

export type ProductVisualType =
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

export type Product = {
  id: string;
  rank: number;
  name: string;
  shortName: string;
  brand: string;
  description: string;
  category: ProductCategory;

  price: number | null;

  matchScore: number;

  rating: string | null;
  reviewCount: string | null;

  visualType: ProductVisualType;

  badges: string[];
  recommendedFor: string[];

  amazon: {
    url: string;
    asin?: string;
  };

  rakuten?: {
    url: string;
  };

  isActive: boolean;
};

export type CategorySection = {
  id: ProductCategory;
  label: string;
  englishLabel: string;
  priority: number;
  description: string;
  advice: string;
  icon: "drop" | "hair" | "brow" | "sparkle";
};

function createRakutenSearchUrl(productName: string) {
  const encodedName = encodeURIComponent(productName);

  return `https://search.rakuten.co.jp/search/mall/${encodedName}/`;
}

export const products: Product[] = [
  {
    id: "mens-biore-one-bb-uv",
    rank: 1,
    name: "メンズビオレONE BB&UVクリーム",
    shortName: "BB&UVクリーム",
    brand: "メンズビオレ",
    description:
      "UV対策をしながら、肌を自然にきれいに見せたい男性向けのBB&UVクリームです。",
    category: "skincare",

    price: null,

    matchScore: 98,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["AI最優先", "男性向け"],
    recommendedFor: ["紫外線対策", "肌印象", "清潔感"],

    amazon: {
      url: "https://amzn.to/3TyfKyS",
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "メンズビオレONE BB&UVクリーム",
      ),
    },

    isActive: true,
  },

  {
    id: "biore-uv-aqua-rich-watery-essence",
    rank: 2,
    name: "ビオレUV アクアリッチ ウォータリーエッセンス",
    shortName: "日焼け止め",
    brand: "ビオレUV",
    description:
      "毎日の紫外線対策に取り入れやすく、UVケアを習慣化したい人向けの日焼け止めです。",
    category: "skincare",

    price: null,

    matchScore: 95,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["毎日ケア", "UV対策"],
    recommendedFor: ["紫外線対策", "毎日ケア", "肌"],

    amazon: {
      url: "https://amzn.to/4wRs9wE",
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "ビオレUV アクアリッチ ウォータリーエッセンス",
      ),
    },

    isActive: true,
  },

  {
    id: "anessa-uv-skincare-milk-na",
    rank: 3,
    name: "アネッサ UV スキンケアミルク NA",
    shortName: "日焼け止め",
    brand: "アネッサ",
    description:
      "屋外で過ごす時間が長い日など、しっかり紫外線対策をしたい人向けのUVケアアイテムです。",
    category: "skincare",

    price: null,

    matchScore: 92,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UV対策", "屋外ケア"],
    recommendedFor: ["紫外線対策", "屋外", "肌"],

    amazon: {
      url: "https://amzn.to/4bU8ovZ",
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "アネッサ UV スキンケアミルク NA",
      ),
    },

    isActive: true,
  },

  {
    id: "n-homme-balm",
    rank: 1,
    name: "ナチュラルバーム",
    shortName: "ヘアバーム",
    brand: "N. HOMME",
    description:
      "自然な毛流れとツヤを作り、爽やかなヘアスタイルへ整えます。",
    category: "hair",

    price: 2200,

    matchScore: 96,

    rating: "4.7",
    reviewCount: "633件",

    visualType: "wax",

    badges: ["AIおすすめ", "自然な仕上がり"],
    recommendedFor: ["髪型", "毛流れ", "清潔感"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "N. HOMME ナチュラルバーム",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "N. HOMME ナチュラルバーム",
      ),
    },

    isActive: true,
  },

  {
    id: "napla-hair-oil",
    rank: 2,
    name: "エヌドット ポリッシュオイル",
    shortName: "ヘアオイル",
    brand: "N.",
    description:
      "髪の広がりを抑え、まとまりと自然なツヤを与えます。",
    category: "hair",

    price: 3740,

    matchScore: 92,

    rating: "4.6",
    reviewCount: "2,103件",

    visualType: "hairOil",

    badges: ["乾燥対策", "ツヤ感"],
    recommendedFor: ["パサつき", "広がり", "ツヤ"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "N. ポリッシュオイル",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "N. ポリッシュオイル",
      ),
    },

    isActive: true,
  },

  {
    id: "panasonic-dryer",
    rank: 3,
    name: "ヘアードライヤー イオニティ",
    shortName: "ドライヤー",
    brand: "Panasonic",
    description:
      "髪を乾かしながら、まとまりやすい状態へ整えます。",
    category: "hair",

    price: 5980,

    matchScore: 87,

    rating: "4.5",
    reviewCount: "3,421件",

    visualType: "dryer",

    badges: ["時短", "毎日使える"],
    recommendedFor: ["寝ぐせ", "毛流れ", "まとまり"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "Panasonic ヘアードライヤー イオニティ",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "Panasonic ヘアードライヤー イオニティ",
      ),
    },

    isActive: true,
  },

  {
    id: "panasonic-eyebrow-shaver",
    rank: 1,
    name: "マユシェーバーキット",
    shortName: "眉毛シェーバー",
    brand: "Panasonic",
    description:
      "眉毛の長さや眉間の余分な毛を、安全に整えやすくします。",
    category: "eyebrow",

    price: 2480,

    matchScore: 97,

    rating: "4.5",
    reviewCount: "1,078件",

    visualType: "eyebrowShaver",

    badges: ["AI最優先", "初心者向け"],
    recommendedFor: ["眉毛", "目元", "清潔感"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "Panasonic マユシェーバーキット",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "Panasonic マユシェーバーキット",
      ),
    },

    isActive: true,
  },

  {
    id: "kate-eyebrow-pencil",
    rank: 2,
    name: "アイブロウペンシルZ",
    shortName: "眉ペンシル",
    brand: "KATE",
    description:
      "眉尻や薄い部分を自然に補い、目元を引き締めます。",
    category: "eyebrow",

    price: 605,

    matchScore: 90,

    rating: "4.4",
    reviewCount: "945件",

    visualType: "eyebrowPencil",

    badges: ["自然な補正", "高コスパ"],
    recommendedFor: ["眉尻", "左右差", "目元"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "KATE アイブロウペンシルZ",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "KATE アイブロウペンシルZ",
      ),
    },

    isActive: true,
  },

  {
    id: "kai-tweezers",
    rank: 3,
    name: "先斜め毛抜き",
    shortName: "毛抜き",
    brand: "貝印",
    description:
      "眉間や眉下など、不要な毛を細かく整えるときに使用します。",
    category: "eyebrow",

    price: 880,

    matchScore: 84,

    rating: "4.3",
    reviewCount: "428件",

    visualType: "tweezers",

    badges: ["細部ケア", "定番"],
    recommendedFor: ["眉間", "眉下", "細部"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "貝印 先斜め毛抜き",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "貝印 先斜め毛抜き",
      ),
    },

    isActive: true,
  },

  {
    id: "shiro-fragrance",
    rank: 1,
    name: "サボン オードパルファン",
    shortName: "香水",
    brand: "SHIRO",
    description:
      "清潔感を感じやすい、自然で爽やかな香りを加えます。",
    category: "grooming",

    price: 4180,

    matchScore: 89,

    rating: "4.6",
    reviewCount: "1,542件",

    visualType: "fragrance",

    badges: ["清潔感", "人気"],
    recommendedFor: ["香り", "清潔感", "印象"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "SHIRO サボン オードパルファン",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "SHIRO サボン オードパルファン",
      ),
    },

    isActive: true,
  },

  {
    id: "uno-lip",
    rank: 2,
    name: "オールインワンリップクリエイター",
    shortName: "リップ",
    brand: "UNO",
    description:
      "乾燥しやすい唇を保湿し、自然な血色感を整えます。",
    category: "grooming",

    price: 880,

    matchScore: 86,

    rating: "4.3",
    reviewCount: "378件",

    visualType: "lip",

    badges: ["口元ケア", "持ち歩き"],
    recommendedFor: ["乾燥", "口元", "血色感"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "UNO オールインワンリップクリエイター",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "UNO オールインワンリップクリエイター",
      ),
    },

    isActive: true,
  },

  {
    id: "oralb-toothbrush",
    rank: 3,
    name: "すみずみクリーン",
    shortName: "電動歯ブラシ",
    brand: "Oral-B",
    description:
      "毎日の歯磨きを補助し、口元の清潔感を維持します。",
    category: "grooming",

    price: 2980,

    matchScore: 83,

    rating: "4.5",
    reviewCount: "2,618件",

    visualType: "toothbrush",

    badges: ["口元ケア", "毎日使える"],
    recommendedFor: ["歯", "口元", "清潔感"],

    amazon: {
      url: `https://www.amazon.co.jp/s?k=${encodeURIComponent(
        "Oral-B すみずみクリーン",
      )}`,
    },

    rakuten: {
      url: createRakutenSearchUrl(
        "Oral-B すみずみクリーン",
      ),
    },

    isActive: true,
  },
];

export const categories: CategorySection[] = [
  {
    id: "skincare",
    label: "スキンケア",
    englishLabel: "SKIN CARE",
    priority: 1,
    description:
      "乾燥・テカリ・紫外線対策を整え、清潔感のある印象を目指します。",
    advice:
      "最初は洗顔・保湿・日焼け止めなど、必要なケアから少しずつ始めるのがおすすめです。",
    icon: "drop",
  },

  {
    id: "hair",
    label: "ヘアケア",
    englishLabel: "HAIR CARE",
    priority: 2,
    description:
      "髪の広がりや寝ぐせを整え、顔立ちに合うシルエットを作ります。",
    advice:
      "スタイリング剤の前に、ドライヤーで毛流れを整えるのがおすすめです。",
    icon: "hair",
  },

  {
    id: "eyebrow",
    label: "眉毛ケア",
    englishLabel: "EYEBROW CARE",
    priority: 3,
    description:
      "眉毛の長さや輪郭を整え、目元をすっきり見せます。",
    advice:
      "細くしすぎず、余分な毛と長さだけを整えるのが失敗しにくい方法です。",
    icon: "brow",
  },

  {
    id: "grooming",
    label: "身だしなみ",
    englishLabel: "GROOMING",
    priority: 4,
    description:
      "香り・口元・唇など、細かい部分の清潔感を補います。",
    advice:
      "髪型・眉毛・肌を整えたあとに追加すると、全体の完成度が高まります。",
    icon: "sparkle",
  },
];

export const activeProducts = products.filter(
  (product) => product.isActive,
);