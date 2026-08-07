export type ProductCategory =
  | "skincare"
  | "sunscreen"
  | "hairStyling"
  | "hairCare"
  | "mensMakeup"
  | "other";

export type ProductVisualType =
  | "sunscreen"
  | "lotion"
  | "cleanser"
  | "wax"
  | "hairOil"
  | "dryer"
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

  rating: string | null;
  reviewCount: string | null;

  visualType: ProductVisualType;

  badges: string[];
  recommendedFor: string[];

  amazon: {
    url: string;
    asin?: string;
  };

  isActive: boolean;
};

export type CategorySection = {
  id: ProductCategory;
  label: string;
  englishLabel: string;
  description: string;
  advice: string;
};

export const products: Product[] = [
  // =========================================================
  // スキンケア
  // =========================================================

  {
    id: "fancl-deep-clear-washing-powder",
    rank: 1,
    name: "ディープクリア 洗顔パウダー",
    shortName: "洗顔",
    brand: "FANCL",
    description:
      "毛穴汚れや皮脂が気になるときの洗顔に取り入れやすいパウダータイプの洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    badges: ["洗顔", "毛穴ケア"],
    recommendedFor: ["皮脂", "毛穴", "洗顔"],

    amazon: {
      url: "https://amzn.to/4hjHtNB",
    },

    isActive: true,
  },

  {
    id: "hada-labo-shirojyun-premium",
    rank: 2,
    name: "白潤プレミアム 薬用浸透美白化粧水",
    shortName: "化粧水",
    brand: "肌ラボ",
    description:
      "毎日のスキンケアに取り入れやすい薬用化粧水です。洗顔後の肌を整える基本ケアとして使えます。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["化粧水", "毎日ケア"],
    recommendedFor: ["保湿", "肌ケア", "化粧水"],

    amazon: {
      url: "https://amzn.to/45en6tT",
    },

    isActive: true,
  },

  {
    id: "ihada-medicated-emulsion",
    rank: 3,
    name: "薬用エマルジョン",
    shortName: "乳液",
    brand: "IHADA",
    description:
      "化粧水のあとに使いやすい乳液です。乾燥を防ぎながら肌のうるおいを保つケアに向いています。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["乳液", "保湿"],
    recommendedFor: ["乾燥", "保湿", "肌ケア"],

    amazon: {
      url: "https://amzn.to/4q4FTBs",
    },

    isActive: true,
  },

  {
    id: "attenir-skin-clear-cleanse-oil",
    rank: 4,
    name: "スキンクリア クレンズ オイル",
    shortName: "クレンジング",
    brand: "Attenir",
    description:
      "BBクリームやメイクアイテムを使用した日のクレンジングに使いやすいオイルタイプです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["クレンジング", "メイクオフ"],
    recommendedFor: ["BBクリーム", "メイクオフ", "洗浄"],

    amazon: {
      url: "https://amzn.to/4hpBzKV",
    },

    isActive: true,
  },

  // =========================================================
  // UVケア
  // =========================================================

  {
    id: "anessa-uv-skincare-milk",
    rank: 1,
    name: "UV スキンケアミルク",
    shortName: "日焼け止め",
    brand: "ANESSA",
    description:
      "屋外で過ごす時間が長い日など、しっかり紫外線対策をしたいときに取り入れやすいUVケアアイテムです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVケア", "屋外"],
    recommendedFor: ["紫外線対策", "屋外", "毎日ケア"],

    amazon: {
      url: "https://amzn.to/45HA8Ae",
    },

    isActive: true,
  },

  {
    id: "minon-uv-mild-milk",
    rank: 2,
    name: "UVマイルドミルク",
    shortName: "日焼け止め",
    brand: "MINON",
    description:
      "毎日のUVケアに取り入れやすいミルクタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVケア", "毎日ケア"],
    recommendedFor: ["紫外線対策", "肌ケア", "日常使い"],

    amazon: {
      url: "https://amzn.to/45HAabk",
    },

    isActive: true,
  },

  {
    id: "biore-uv-aqua-rich-watery-essence",
    rank: 3,
    name: "アクアリッチ ウォータリーエッセンス",
    shortName: "日焼け止め",
    brand: "Bioré UV",
    description:
      "毎日の紫外線対策を習慣化したい人に取り入れやすいUVケアアイテムです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVケア", "日常使い"],
    recommendedFor: ["紫外線対策", "毎日ケア", "肌"],

    amazon: {
      url: "https://amzn.to/4whE6u5",
    },

    isActive: true,
  },

  // =========================================================
  // スタイリング
  // =========================================================

  {
    id: "loretta-hard-jelly",
    rank: 1,
    name: "ハードゼリー",
    shortName: "スタイリングジェル",
    brand: "Loretta",
    description:
      "髪型をしっかりキープしたいときに使いやすいジェルタイプのスタイリング剤です。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ジェル", "セット力"],
    recommendedFor: ["キープ力", "毛流れ", "スタイリング"],

    amazon: {
      url: "https://amzn.to/4whEfxD",
    },

    isActive: true,
  },

  {
    id: "kantan-series-urutsuya",
    rank: 2,
    name: "カンタンシリーズ うるつや",
    shortName: "スタイリング剤",
    brand: "カンタンシリーズ",
    description:
      "髪に自然なツヤ感を出しながら、日常のスタイリングに取り入れやすいアイテムです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ツヤ感", "スタイリング"],
    recommendedFor: ["ツヤ", "毛流れ", "髪型"],

    amazon: {
      url: "https://amzn.to/3TYzkEs",
    },

    isActive: true,
  },

  {
    id: "lipps-gloss-move-wax",
    rank: 3,
    name: "グロスムーブ ワックス",
    shortName: "ヘアワックス",
    brand: "LIPPS",
    description:
      "毛流れを作りながら、ツヤのあるスタイルを目指したいときに使いやすいワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ワックス", "ツヤ感"],
    recommendedFor: ["毛流れ", "ツヤ", "スタイリング"],

    amazon: {
      url: "https://amzn.to/4wMT6BB",
    },

    isActive: true,
  },

  // =========================================================
  // ヘアケア
  // =========================================================

  {
    id: "yolu-calm-night-repair-shampoo",
    rank: 1,
    name: "カームナイトリペア シャンプー",
    shortName: "シャンプー",
    brand: "YOLU",
    description:
      "髪のダメージや乾燥が気になるときの毎日のヘアケアに取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "ダメージケア"],
    recommendedFor: ["乾燥", "ダメージ", "ヘアケア"],

    amazon: {
      url: "https://amzn.to/4qlVFrX",
    },

    isActive: true,
  },

  {
    id: "plus-eau-mellow-shampoo",
    rank: 2,
    name: "シャンプー メロウ",
    shortName: "シャンプー",
    brand: "plus eau",
    description:
      "髪を扱いやすい状態へ整えたい人の毎日のヘアケアに取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "まとまり"],
    recommendedFor: ["まとまり", "髪質", "ヘアケア"],

    amazon: {
      url: "https://amzn.to/4w8FdfT",
    },

    isActive: true,
  },

  {
    id: "straine-shampoo",
    rank: 3,
    name: "シャンプー",
    shortName: "シャンプー",
    brand: "Straine",
    description:
      "髪のコンディションを整え、日々のスタイリングをしやすくするためのヘアケアアイテムです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "毎日ケア"],
    recommendedFor: ["髪質", "まとまり", "ヘアケア"],

    amazon: {
      url: "https://amzn.to/3TyjoJ4",
    },

    isActive: true,
  },

  // =========================================================
  // メンズメイク
  // =========================================================

  {
    id: "the-future-color-change-bb-cream",
    rank: 1,
    name: "カラーチェンジBBクリーム",
    shortName: "BBクリーム",
    brand: "THE FUTURE",
    description:
      "肌の色ムラや気になる部分を自然に補正し、清潔感のある肌印象を目指したい男性向けのBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["BBクリーム", "男性向け"],
    recommendedFor: ["肌補正", "清潔感", "第一印象"],

    amazon: {
      url: "https://amzn.to/4z1F4NV",
    },

    isActive: true,
  },

  {
    id: "la-roche-posay-uvidea",
    rank: 2,
    name: "UVイデア",
    shortName: "化粧下地",
    brand: "La Roche-Posay",
    description:
      "UVケアをしながら、肌を自然に整えて見せたいときに取り入れやすいアイテムです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["化粧下地", "UVケア"],
    recommendedFor: ["肌補正", "UV対策", "肌印象"],

    amazon: {
      url: "https://amzn.to/4fIiNx1",
    },

    isActive: true,
  },

  {
    id: "null-bb-cream",
    rank: 3,
    name: "BBクリーム",
    shortName: "BBクリーム",
    brand: "NULL",
    description:
      "男性の肌になじみやすい自然な仕上がりを目指したいときに使いやすいBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["BBクリーム", "男性向け"],
    recommendedFor: ["肌補正", "ニキビ跡", "清潔感"],

    amazon: {
      url: "https://amzn.to/3UiotoV",
    },

    isActive: true,
  },

  // =========================================================
  // その他
  // =========================================================

  {
    id: "maison-margiela-fragrance",
    rank: 1,
    name: "フレグランス",
    shortName: "香水",
    brand: "Maison Margiela",
    description:
      "香りから清潔感や印象を整えたいときに取り入れるフレグランスアイテムです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    badges: ["フレグランス", "香り"],
    recommendedFor: ["香り", "清潔感", "印象"],

    amazon: {
      url: "https://amzn.to/4hkDTCS",
    },

    isActive: true,
  },

  {
    id: "marvis-whitening-mint",
    rank: 2,
    name: "ホワイト・ミント歯磨き粉",
    shortName: "歯磨き粉",
    brand: "MARVIS",
    description:
      "口元の清潔感を意識した毎日のオーラルケアに取り入れやすい歯磨き粉です。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    badges: ["オーラルケア", "口元"],
    recommendedFor: ["歯", "口元", "清潔感"],

    amazon: {
      url: "https://amzn.to/45dcfQR",
    },

    isActive: true,
  },

  {
    id: "loccitane-shea-hand-cream",
    rank: 3,
    name: "カリテコンフォート シア ハンドクリーム",
    shortName: "ハンドクリーム",
    brand: "L'OCCITANE",
    description:
      "手元の乾燥をケアし、細かな部分まで清潔感を整えたいときに使いやすいハンドクリームです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["ハンドケア", "保湿"],
    recommendedFor: ["手元", "乾燥", "清潔感"],

    amazon: {
      url: "https://amzn.to/45dauTK",
    },

    isActive: true,
  },
];

export const categories: CategorySection[] = [
  {
    id: "skincare",
    label: "スキンケア",
    englishLabel: "SKIN CARE",
    description:
      "洗顔・化粧水・乳液・クレンジングなど、肌のコンディションを整えるアイテムです。",
    advice:
      "最初からすべて揃える必要はありません。自分の肌悩みに合わせて必要なケアから始めるのがおすすめです。",
  },

  {
    id: "sunscreen",
    label: "UVケア",
    englishLabel: "UV CARE",
    description:
      "毎日の紫外線対策に取り入れやすいアイテムを紹介します。",
    advice:
      "外出する日はUVケアを習慣にして、肌を紫外線から守ることを意識しましょう。",
  },

  {
    id: "hairStyling",
    label: "スタイリング",
    englishLabel: "STYLING",
    description:
      "ワックスやジェルなど、髪型を整えるためのスタイリングアイテムです。",
    advice:
      "作りたい髪型や髪質に合わせて、セット力・ツヤ・質感の違いから選ぶのがおすすめです。",
  },

  {
    id: "hairCare",
    label: "ヘアケア",
    englishLabel: "HAIR CARE",
    description:
      "毎日のシャンプーなど、髪のコンディションを整えるためのアイテムです。",
    advice:
      "スタイリングだけでなく日々のヘアケアも整えることで、髪型を作りやすい状態を目指せます。",
  },

  {
    id: "mensMakeup",
    label: "メンズメイク",
    englishLabel: "MEN'S MAKEUP",
    description:
      "BBクリームや化粧下地など、肌を自然に補正して見せるためのアイテムです。",
    advice:
      "初めてならBBクリームなど、変化が自然で簡単に使いやすいアイテムから試すのがおすすめです。",
  },

  {
    id: "other",
    label: "その他",
    englishLabel: "OTHER",
    description:
      "香り・口元・手元など、細かな身だしなみを整えるためのアイテムです。",
    advice:
      "肌や髪を整えたあとに、必要なものだけ取り入れると全体の清潔感をさらに高めやすくなります。",
  },
];

export const activeProducts = products.filter(
  (product) => product.isActive,
);