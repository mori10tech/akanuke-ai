import type {
  ProductNeed,
} from "./productNeeds";

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

  imageUrl?: string;
  imageAlt?: string;

  badges: string[];
  recommendedFor: string[];
  needTags: ProductNeed[];

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

    imageUrl:
  "https://m.media-amazon.com/images/I/51QOhnDEycL._AC_SL1000_.jpg",
imageAlt:
  "FANCL ディープクリア 洗顔パウダー",

    badges: ["洗顔", "毛穴ケア"],
    recommendedFor: ["皮脂", "毛穴", "洗顔"],
    needTags: ["poreCare", "oilControl"],

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

    imageUrl:
      "https://m.media-amazon.com/images/I/71K7K2JNdpL._AC_SL1500_.jpg",

    badges: ["化粧水", "毎日ケア"],
    recommendedFor: ["保湿", "肌ケア", "化粧水"],
    needTags: ["moisturizing"],

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

    imageUrl:
      "https://m.media-amazon.com/images/I/61M6GzqOrmL._AC_SL1500_.jpg",

    badges: ["乳液", "保湿"],
    recommendedFor: ["乾燥", "保湿", "肌ケア"],
    needTags: ["moisturizing"],

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

    imageUrl:
      "https://m.media-amazon.com/images/I/41QwW36fXWL._AC_SL1200_.jpg",

    badges: ["クレンジング", "メイクオフ"],
    recommendedFor: ["BBクリーム", "メイクオフ", "洗浄"],
    needTags: ["makeupRemoval"],

    amazon: {
      url: "https://amzn.to/4hpBzKV",
    },

    isActive: true,
  },

  {
    id: "melano-cc-deep-clear-enzyme-face-wash",
    rank: 5,
    name: "ディープクリア酵素洗顔",
    shortName: "洗顔",
    brand: "メラノCC",
    description:
      "毛穴汚れや皮脂が気になるときの毎日の洗顔に取り入れやすい、ペーストタイプの酵素洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/I/51bO3cEhu5L._AC_SL1500_.jpg",

    badges: ["酵素洗顔", "毛穴ケア"],
    recommendedFor: ["毛穴", "皮脂", "洗顔"],
    needTags: ["poreCare", "oilControl"],

    amazon: {
      url: "https://amzn.to/4bWbLCq",
    },

    isActive: true,
  },

  {
    id: "orbis-mr-foaming-wash",
    rank: 6,
    name: "フォーミングウォッシュ",
    shortName: "洗顔",
    brand: "ORBIS Mr.",
    description:
      "皮脂や毛穴汚れをすっきり洗い流しながら、毎日のケアに取り入れやすい男性向け洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/I/51Eupci-leL._AC_SL1500_.jpg",

    badges: ["メンズ洗顔", "毛穴ケア"],
    recommendedFor: ["毛穴", "皮脂", "男性向け"],
    needTags: ["poreCare", "oilControl"],

    amazon: {
      url: "https://amzn.to/468iZjj",
    },

    isActive: true,
  },

  {
    id: "curel-sebum-trouble-care-foaming-wash",
    rank: 7,
    name: "皮脂トラブルケア 泡洗顔料",
    shortName: "泡洗顔",
    brand: "Curél",
    description:
      "皮脂が気になるときに、泡立てる手間なく毎日の洗顔へ取り入れやすい泡タイプの洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/I/71VjUfvZpXL._AC_SL1500_.jpg",

    badges: ["泡洗顔", "皮脂ケア"],
    recommendedFor: ["皮脂", "テカリ", "泡洗顔"],
    needTags: ["oilControl", "poreCare"],

    amazon: {
      url: "https://amzn.to/3SHucnV",
    },

    isActive: true,
  },

  {
    id: "kanebo-scrubbing-mud-wash",
    rank: 8,
    name: "スクラビング マッド ウォッシュ",
    shortName: "洗顔",
    brand: "KANEBO",
    description:
      "皮脂や古い角質による汚れが気になるときのケアに取り入れやすい、ペーストタイプの洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/I/61xCICDabNL._AC_SL1500_.jpg",

    badges: ["洗顔", "角質ケア"],
    recommendedFor: ["毛穴", "皮脂", "角質汚れ"],
    needTags: ["poreCare", "oilControl"],

    amazon: {
      url: "https://amzn.to/4zlAcU5",
    },

    isActive: true,
  },

  {
    id: "muji-sensitive-skin-toning-water-high-moisture",
    rank: 9,
    name: "敏感肌用化粧水 高保湿",
    shortName: "化粧水",
    brand: "無印良品",
    description:
      "洗顔後の乾燥が気になるときに、毎日の保湿ケアへ取り入れやすい高保湿タイプの化粧水です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/I/51-vwbXkskL._AC_SL1500_.jpg",

    badges: ["化粧水", "高保湿"],
    recommendedFor: ["乾燥", "保湿", "毎日ケア"],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/46b9Oi6",
    },

    isActive: true,
  },

  {
    id: "fancl-mild-cleansing-oil",
    rank: 10,
    name: "マイルドクレンジング オイル",
    shortName: "クレンジング",
    brand: "FANCL",
    description:
      "BBクリームやメイクアイテムを使用した日のメイクオフに取り入れやすいオイルタイプのクレンジングです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    imageUrl:
      "https://m.media-amazon.com/images/I/41qObf7auWL._AC_SL1500_.jpg",

    badges: ["クレンジング", "メイクオフ"],
    recommendedFor: ["BBクリーム", "メイクオフ", "洗浄"],
    needTags: ["makeupRemoval"],

    amazon: {
      url: "https://amzn.to/4wAOwW0",
    },

    isActive: true,
  },

  {
    id: "biore-the-cleanse-oil-makeup-remover",
    rank: 11,
    name: "ザクレンズ オイルメイク落とし",
    shortName: "クレンジング",
    brand: "Bioré",
    description:
      "BBクリームなどを使用した日のメイクオフに使いやすい、オイルタイプのクレンジングです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    imageUrl:
      "https://m.media-amazon.com/images/I/71tNJgFSmpL._AC_SL1500_.jpg",

    badges: ["クレンジング", "オイル"],
    recommendedFor: ["BBクリーム", "メイクオフ", "毛穴汚れ"],
    needTags: ["makeupRemoval"],

    amazon: {
      url: "https://amzn.to/4gFYv7C",
    },

    isActive: true,
  },

    {
    id: "bulk-homme-the-face-wash",
    rank: 12,
    name: "THE FACE WASH",
    shortName: "洗顔",
    brand: "BULK HOMME",
    description:
      "毎日の洗顔で皮脂や毛穴汚れをすっきり洗い流し、清潔感のある肌を目指したい人に取り入れやすい男性向け洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/I/81CDN5V5ETL._AC_SL1500_.jpg",
    imageAlt:
      "BULK HOMME THE FACE WASH",

    badges: ["メンズ洗顔", "毛穴ケア"],
    recommendedFor: [
      "皮脂",
      "毛穴",
      "男性向け",
    ],
    needTags: [
      "poreCare",
      "oilControl",
    ],

    amazon: {
      url: "https://amzn.to/4xopeLi",
    },

    isActive: true,
  },

  {
    id: "bulk-homme-the-toner",
    rank: 13,
    name: "THE TONER",
    shortName: "化粧水",
    brand: "BULK HOMME",
    description:
      "洗顔後の肌へうるおいを補い、毎日の保湿ケアを習慣にしたい男性に取り入れやすい化粧水です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71fAb6JVMIL._AC_SL1500_.jpg",
    imageAlt:
      "BULK HOMME THE TONER",

    badges: ["化粧水", "保湿"],
    recommendedFor: [
      "乾燥",
      "保湿",
      "男性向け",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/4AcOerc",
    },

    isActive: true,
  },

  {
    id: "bulk-homme-the-lotion",
    rank: 14,
    name: "THE LOTION",
    shortName: "乳液",
    brand: "BULK HOMME",
    description:
      "化粧水のあとに使い、肌のうるおいを保ちながら乾燥を防ぐ毎日の保湿ケアに取り入れやすい乳液です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/716TFFFdJTL._AC_SL1500_.jpg",
    imageAlt:
      "BULK HOMME THE LOTION",

    badges: ["乳液", "保湿"],
    recommendedFor: [
      "乾燥",
      "保湿",
      "男性向け",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/3T8fwP1",
    },

    isActive: true,
  },

  {
    id: "nivea-men-active-age-lotion",
    rank: 15,
    name: "アクティブエイジローション",
    shortName: "化粧水",
    brand: "NIVEA MEN",
    description:
      "洗顔後の乾燥が気になる男性の毎日のスキンケアに取り入れやすく、肌へうるおいを与える化粧水です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71x6nNoyejL._AC_SL1500_.jpg",
    imageAlt:
      "NIVEA MEN アクティブエイジローション",

    badges: ["メンズ化粧水", "保湿"],
    recommendedFor: [
      "乾燥",
      "保湿",
      "男性向け",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/4gSeCzk",
    },

    isActive: true,
  },

  {
    id: "uno-vital-cream-perfection",
    rank: 16,
    name: "バイタルクリームパーフェクション",
    shortName: "オールインワン",
    brand: "uno",
    description:
      "複数のスキンケアを手軽にまとめたい男性が、洗顔後の保湿ケアとして取り入れやすいオールインワンタイプのクリームです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71uOAQVYSLL._AC_SL1500_.jpg",
    imageAlt:
      "uno バイタルクリームパーフェクション",

    badges: [
      "オールインワン",
      "男性向け",
    ],
    recommendedFor: [
      "保湿",
      "時短ケア",
      "スキンケア初心者",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/4gRZYYT",
    },

    isActive: true,
  },

  {
    id: "gatsby-ex-deep-clear-balm",
    rank: 17,
    name: "EX ディープクリアバーム",
    shortName: "毛穴ケア",
    brand: "GATSBY",
    description:
      "皮脂や毛穴汚れが気になるときに、いつものスキンケアへ毛穴ケアを取り入れたい男性に使いやすいアイテムです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71SkEaKgiZL._AC_SL1500_.jpg",
    imageAlt:
      "GATSBY EX ディープクリアバーム",

    badges: ["毛穴ケア", "男性向け"],
    recommendedFor: [
      "毛穴",
      "皮脂",
      "男性向け",
    ],
    needTags: [
      "poreCare",
      "oilControl",
    ],

    amazon: {
      url: "https://amzn.to/4isGQSu",
    },

    isActive: true,
  },

  {
    id: "dove-men-care-clean-comfort-foaming-face-wash",
    rank: 18,
    name: "クリーンコンフォート泡洗顔",
    shortName: "泡洗顔",
    brand: "Dove MEN+CARE",
    description:
      "泡立てる手間なく使いやすく、毎日の洗顔で皮脂や汚れをすっきり落としたい男性向けの泡タイプ洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71Ty0Et8xBL._AC_SL1500_.jpg",
    imageAlt:
      "Dove MEN+CARE クリーンコンフォート泡洗顔",

    badges: ["泡洗顔", "男性向け"],
    recommendedFor: [
      "皮脂",
      "毎日洗顔",
      "男性向け",
    ],
    needTags: [
      "oilControl",
      "poreCare",
    ],

    amazon: {
      url: "https://amzn.to/4xXqu9c",
    },

    isActive: true,
  },

  {
    id: "null-acne-block-face-wash",
    rank: 19,
    name: "薬用アクネブロックフェイスウォッシュ",
    shortName: "洗顔",
    brand: "NULL",
    description:
      "皮脂や肌荒れが気になる男性が、毎日の洗顔で肌を清潔に保つために取り入れやすい男性向け洗顔料です。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/511rnWxE5dL._AC_SL1500_.jpg",
    imageAlt:
      "NULL 薬用アクネブロックフェイスウォッシュ",

    badges: ["メンズ洗顔", "皮脂ケア"],
    recommendedFor: [
      "皮脂",
      "肌荒れ",
      "男性向け",
    ],
    needTags: [
      "oilControl",
      "poreCare",
    ],

    amazon: {
      url: "https://amzn.to/4iZmy2X",
    },

    isActive: true,
  },

  {
    id: "zigen-all-in-one-face-gel",
    rank: 20,
    name: "オールインワンフェイスジェル",
    shortName: "オールインワン",
    brand: "ZIGEN",
    description:
      "洗顔後の保湿をひとつで済ませたい男性が、毎日のスキンケアへ取り入れやすいオールインワンタイプのフェイスジェルです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51eJ0nF1pVL._AC_SL1500_.jpg",
    imageAlt:
      "ZIGEN オールインワンフェイスジェル",

    badges: [
      "オールインワン",
      "保湿",
    ],
    recommendedFor: [
      "乾燥",
      "時短ケア",
      "男性向け",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/46TZwTV",
    },

    isActive: true,
  },

  {
    id: "kiehls-facial-fuel-moisturizer-for-men",
    rank: 21,
    name: "フェイシャル フュール モイスチャライザー フォー メン",
    shortName: "保湿クリーム",
    brand: "Kiehl's",
    description:
      "洗顔後の乾燥を防ぎながら肌をうるおいのある状態へ整えたい男性の毎日の保湿ケアに取り入れやすいアイテムです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/I/71TTDB4QuyL._AC_SL1500_.jpg",
    imageAlt:
      "Kiehl's フェイシャル フュール モイスチャライザー フォー メン",

    badges: ["保湿", "男性向け"],
    recommendedFor: [
      "乾燥",
      "保湿",
      "男性向け",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/4gSAMkP",
    },

    isActive: true,
  },

  {
    id: "haku-melanofocus-iv",
    rank: 22,
    name: "メラノフォーカスIV",
    shortName: "美容液",
    brand: "HAKU",
    description:
      "毎日のスキンケアに美容液を取り入れ、肌のコンディションをより丁寧に整えたい人向けのアイテムです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41poDZSA+5L._AC_SL1500_.jpg",
    imageAlt:
      "HAKU メラノフォーカスIV",

    badges: ["美容液", "集中ケア"],
    recommendedFor: [
      "美容液",
      "肌ケア",
      "毎日ケア",
    ],
    needTags: [],

    amazon: {
      url: "https://amzn.to/46oSuX5",
    },

    isActive: true,
  },

  {
    id: "namerakahonpo-medicated-wrinkle-serum-white",
    rank: 23,
    name: "薬用リンクル美容液 ホワイト",
    shortName: "美容液",
    brand: "なめらか本舗",
    description:
      "普段のスキンケアに美容液を加え、乾燥を防ぎながら肌をうるおいのある状態へ整えたいときに取り入れやすいアイテムです。",
    category: "skincare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71TDFNurq3L._AC_SL1500_.jpg",
    imageAlt:
      "なめらか本舗 薬用リンクル美容液 ホワイト",

    badges: ["美容液", "保湿"],
    recommendedFor: [
      "乾燥",
      "保湿",
      "肌ケア",
    ],
    needTags: ["moisturizing"],

    amazon: {
      url: "https://amzn.to/4gTxqOI",
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
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/71c3-MeeXQL._AC_SL1500_.jpg",

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
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/71tvzp3-KWL._AC_SL1500_.jpg",

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
    needTags: ["uvProtection"],
    imageUrl:
      "https://m.media-amazon.com/images/I/71P4OIWcuiL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4whE6u5",
    },

    isActive: true,
  },

  {
    id: "biore-uv-aqua-rich-watery-gel",
    rank: 11,
    name: "アクアリッチ ウォータリージェル",
    shortName: "日焼け止め",
    brand: "Bioré UV",
    description:
      "みずみずしい使用感で、毎日の顔や体の紫外線対策に取り入れやすいジェルタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71DfdlaEF9L._AC_SL1500_.jpg",
    imageAlt:
      "ビオレUV アクアリッチ ウォータリージェル",

    badges: ["UVジェル", "日常使い"],
    recommendedFor: [
      "紫外線対策",
      "毎日ケア",
      "顔・体",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/3VsYcot",
    },

    isActive: true,
  },

  {
    id: "anessa-perfect-uv-skincare-spray-na",
    rank: 12,
    name: "パーフェクトUV スキンケアスプレー NA",
    shortName: "UVスプレー",
    brand: "ANESSA",
    description:
      "顔・体・髪の紫外線対策や外出先での塗り直しに取り入れやすいスプレータイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61H+NCza3ZL._AC_SL1500_.jpg",
    imageAlt:
      "ANESSA パーフェクトUV スキンケアスプレー NA",

    badges: ["UVスプレー", "塗り直し"],
    recommendedFor: [
      "紫外線対策",
      "外出先",
      "髪・全身",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4j1JJd0",
    },

    isActive: true,
  },

  {
    id: "suncut-protect-uv-spray",
    rank: 13,
    name: "プロテクトUV スプレー",
    shortName: "UVスプレー",
    brand: "SUNCUT",
    description:
      "顔や体、髪までまとめて紫外線対策したいときに使いやすいスプレータイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41Y9nNXRwGL._AC_SL1500_.jpg",
    imageAlt:
      "SUNCUT プロテクトUV スプレー",

    badges: ["UVスプレー", "全身ケア"],
    recommendedFor: [
      "紫外線対策",
      "髪・全身",
      "塗り直し",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4h31N41",
    },

    isActive: true,
  },

  {
    id: "orbis-wrinkle-bright-uv-protector",
    rank: 14,
    name: "リンクルブライト UVプロテクター",
    shortName: "日焼け止め",
    brand: "ORBIS",
    description:
      "毎日の紫外線対策に取り入れながら、スキンケア感覚で使いやすいクリームタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51eT5IZkVSL._AC_SL1500_.jpg",
    imageAlt:
      "ORBIS リンクルブライト UVプロテクター",

    badges: ["UVケア", "毎日ケア"],
    recommendedFor: [
      "紫外線対策",
      "日常使い",
      "肌ケア",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4hr4z4g",
    },

    isActive: true,
  },

  {
    id: "biore-uv-athlizm-protect-essence",
    rank: 15,
    name: "アスリズム プロテクトエッセンス",
    shortName: "日焼け止め",
    brand: "Bioré UV",
    description:
      "屋外で過ごす時間が長い日や汗をかきやすい場面で、しっかり紫外線対策したいときに取り入れやすい日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/7145QXU7AWL._AC_SL1500_.jpg",
    imageAlt:
      "ビオレUV アスリズム プロテクトエッセンス",

    badges: ["UVケア", "屋外"],
    recommendedFor: [
      "紫外線対策",
      "スポーツ",
      "屋外",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4cETXMz",
    },

    isActive: true,
  },

  {
    id: "biore-uv-aqua-rich-watery-hold-cream",
    rank: 16,
    name: "アクアリッチ ウォータリーホールドクリーム",
    shortName: "日焼け止め",
    brand: "Bioré UV",
    description:
      "毎日の紫外線対策で、肌になじみやすい使用感を重視したい人に取り入れやすいクリームタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71Gbt4VHtPL._AC_SL1500_.jpg",
    imageAlt:
      "ビオレUV アクアリッチ ウォータリーホールドクリーム",

    badges: ["UVケア", "クリーム"],
    recommendedFor: [
      "紫外線対策",
      "毎日ケア",
      "日常使い",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4j7KIbw",
    },

    isActive: true,
  },

  {
    id: "anessa-perfect-uv-skincare-gel-nb",
    rank: 17,
    name: "パーフェクトUV スキンケアジェル NB",
    shortName: "日焼け止め",
    brand: "ANESSA",
    description:
      "みずみずしい使用感で、顔や体の紫外線対策をしっかり行いたい日に使いやすいジェルタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/617KoiJRL9L._AC_SL1500_.jpg",
    imageAlt:
      "ANESSA パーフェクトUV スキンケアジェル NB",

    badges: ["UVジェル", "屋外"],
    recommendedFor: [
      "紫外線対策",
      "顔・体",
      "屋外",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4A69e2V",
    },

    isActive: true,
  },

  {
    id: "allie-chrono-beauty-gel-uv-ex",
    rank: 18,
    name: "クロノビューティ ジェルUV EX",
    shortName: "日焼け止め",
    brand: "ALLIE",
    description:
      "日常から屋外まで幅広い場面で、顔や体の紫外線対策に取り入れやすいジェルタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71PdBau39fL._AC_SL1500_.jpg",
    imageAlt:
      "ALLIE クロノビューティ ジェルUV EX",

    badges: ["UVジェル", "顔・体"],
    recommendedFor: [
      "紫外線対策",
      "毎日ケア",
      "屋外",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4rjTqWn",
    },

    isActive: true,
  },

  {
    id: "nivea-uv-deep-protect-care-gel",
    rank: 19,
    name: "ディープ プロテクト＆ケア ジェル",
    shortName: "日焼け止め",
    brand: "NIVEA UV",
    description:
      "毎日の顔や体の紫外線対策に取り入れやすく、みずみずしい使用感を重視したい人向けのジェルタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/81a8M70Lf7L._AC_SL1500_.jpg",
    imageAlt:
      "ニベアUV ディープ プロテクト＆ケア ジェル",

    badges: ["UVジェル", "日常使い"],
    recommendedFor: [
      "紫外線対策",
      "毎日ケア",
      "顔・体",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/46ov9ox",
    },

    isActive: true,
  },

  {
    id: "nivea-uv-water-gel-ex",
    rank: 20,
    name: "ウォータージェル EX",
    shortName: "日焼け止め",
    brand: "NIVEA UV",
    description:
      "軽い使用感で、毎日の紫外線対策を続けやすくしたい人に取り入れやすいジェルタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71kj2fBi6cL._AC_SL1500_.jpg",
    imageAlt:
      "ニベアUV ウォータージェル EX",

    badges: ["UVジェル", "毎日ケア"],
    recommendedFor: [
      "紫外線対策",
      "日常使い",
      "顔・体",
    ],
    needTags: ["uvProtection"],

    amazon: {
      url: "https://amzn.to/4AcHg5I",
    },

    isActive: true,
  },

  {
    id: "skin-aqua-tone-up-uv-essence",
    rank: 21,
    name: "トーンアップUVエッセンス",
    shortName: "日焼け止め",
    brand: "SKIN AQUA",
    description:
      "紫外線対策をしながら、肌を明るく整えて見せたいときに取り入れやすいトーンアップタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/7163V+2jFQL._AC_SL1500_.jpg",
    imageAlt:
      "スキンアクア トーンアップUVエッセンス",

    badges: ["UVケア", "トーンアップ"],
    recommendedFor: [
      "紫外線対策",
      "肌補正",
      "日常使い",
    ],
    needTags: [
      "uvProtection",
      "skinToneCorrection",
    ],

    amazon: {
      url: "https://amzn.to/3UQTKzL",
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
    needTags: ["hairHold", "hairFlow"],
    imageUrl:
      "https://m.media-amazon.com/images/I/61CbaeJfIBL._AC_SL1030_.jpg",

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
    needTags: [
      "hairShine",
      "hairFlow",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/51WXliIdFlL._AC_SL1000_.jpg",

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
    needTags: [
      "hairFlow",
      "hairShine",
      "hairHold",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/61HETm86RjL._AC_SL1500_.jpg",

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
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/718v+kHWpkL._AC_SL1500_.jpg",

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
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/41Z6UhN1gVL._AC_SL1026_.jpg",

    amazon: {
      url: "https://amzn.to/4w8FdfT",
    },

    isActive: true,
  },

  {
    id: "straine-shampoo",
    rank: 3,
    name: "ストレイン シャンプー ホワイトブロッサムの香り",
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
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/61mvvLMW1aL._AC_SL1500_.jpg",

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
    needTags: [
      "skinToneCorrection",
      "beardShadowCover",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/51WVR6Wof4L._AC_SL1500_.jpg",

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
    needTags: [
      "skinToneCorrection",
      "uvProtection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/715oFJkcn0L._AC_SL1500_.jpg",

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
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/51jaM3FaU9L._AC_SL1130_.jpg",

    amazon: {
      url: "https://amzn.to/3UiotoV",
    },

    isActive: true,
  },

  {
    id: "uno-face-color-creator-natural",
    rank: 4,
    name: "フェイスカラークリエイター（ナチュラル）",
    shortName: "BBクリーム",
    brand: "uno",
    description:
      "青ヒゲや肌の色ムラなどを自然に補正し、清潔感のある肌印象を目指したいときに使いやすい男性向けBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["BBクリーム", "男性向け"],
    recommendedFor: ["青ヒゲ", "肌補正", "UVケア"],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
      "uvProtection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/71JPryuFwxL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4xUeeWJ",
    },

    isActive: true,
  },

  {
    id: "biore-uv-aqua-rich-aqua-protect-mist",
    rank: 4,
    name: "アクアリッチ アクアプロテクトミスト",
    shortName: "UVミスト",
    brand: "Bioré UV",
    description:
      "外出先での塗り直しや、顔・体・髪の紫外線対策に取り入れやすいミストタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVミスト", "塗り直し"],
    recommendedFor: ["紫外線対策", "外出先", "髪・全身"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/71Xpm78HJmL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4zs3obV",
    },

    isActive: true,
  },

  {
    id: "biore-uv-sarasara-perfect-milk",
    rank: 5,
    name: "さらさらパーフェクトミルク",
    shortName: "日焼け止め",
    brand: "Bioré UV",
    description:
      "さらっとした使用感を重視しながら、顔や体の紫外線対策をしたい日に使いやすいミルクタイプです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVケア", "さらさら"],
    recommendedFor: ["紫外線対策", "顔・体", "さらさら"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/81yBlKEUjKL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4xMnOe3",
    },

    isActive: true,
  },

  {
    id: "suncut-perfect-uv-milk",
    rank: 6,
    name: "パーフェクトUV ミルク",
    shortName: "日焼け止め",
    brand: "SUNCUT",
    description:
      "屋外で過ごす日やレジャーなど、しっかり紫外線対策をしたいときに取り入れやすいUVミルクです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVケア", "屋外"],
    recommendedFor: ["紫外線対策", "レジャー", "顔・体"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/71HYz6lMU9L._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4xiEdXN",
    },

    isActive: true,
  },

  {
    id: "nov-uv-shield-ex",
    rank: 7,
    name: "UVシールドEX",
    shortName: "日焼け止め",
    brand: "NOV",
    description:
      "肌への使用感に配慮しながら、日常の紫外線対策へ取り入れやすいクリームタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVケア", "クリーム"],
    recommendedFor: ["紫外線対策", "日常使い", "顔・体"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/51Q4z3PEJzL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4zpGr9j",
    },

    isActive: true,
  },

  {
    id: "shigaisen-yohou-transparent-uv-spray",
    rank: 8,
    name: "透明UVスプレー",
    shortName: "UVスプレー",
    brand: "紫外線予報",
    description:
      "顔・体・髪をまとめて紫外線対策したいときに使いやすい、透明なスプレータイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVスプレー", "髪・全身"],
    recommendedFor: ["紫外線対策", "スポーツ", "髪・全身"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/61lDJW6hCqL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4qrLGRK",
    },

    isActive: true,
  },

  {
    id: "skin-aqua-super-moisture-gel",
    rank: 9,
    name: "スーパーモイスチャージェル",
    shortName: "日焼け止め",
    brand: "SKIN AQUA",
    description:
      "みずみずしい使用感で、毎日の顔や体の紫外線対策へ取り入れやすいジェルタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVジェル", "日常使い"],
    recommendedFor: ["紫外線対策", "毎日ケア", "顔・体"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/51VurWWlsVL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/4gFLDhP",
    },

    isActive: true,
  },

  {
    id: "nivea-uv-deep-protect-care-milk-mist",
    rank: 10,
    name: "ディーププロテクト＆ケア ミルクミスト",
    shortName: "UVミスト",
    brand: "NIVEA UV",
    description:
      "屋外での紫外線対策や日中の塗り直しに取り入れやすい、ミルクミストタイプの日焼け止めです。",
    category: "sunscreen",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["UVミスト", "屋外"],
    recommendedFor: ["紫外線対策", "塗り直し", "レジャー"],
    needTags: ["uvProtection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/81Osm34z+6L._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/45wdYku",
    },

    isActive: true,
  },

  {
    id: "kantan-series-fuwamochi",
    rank: 4,
    name: "カンタンシリーズ ふわもち",
    shortName: "ヘアワックス",
    brand: "カンタンシリーズ",
    description:
      "髪にふんわりした動きと自然な毛流れを作り、やわらかなマット仕上げを目指したいときに使いやすいワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ワックス", "ふんわり"],
    recommendedFor: ["毛流れ", "マット", "ナチュラル"],
    needTags: ["hairFlow", "hairHold"],

    imageUrl:
      "https://m.media-amazon.com/images/I/51SQNrK7TrL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/4wG7ElB",
    },

    isActive: true,
  },

  {
    id: "ocean-trico-over-drive",
    rank: 5,
    name: "オーバードライブ",
    shortName: "ヘアワックス",
    brand: "OCEAN TRICO",
    description:
      "短髪の立ち上げや束感を作り、髪型をしっかりキープしたいときに使いやすいハードワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ハードワックス", "キープ"],
    recommendedFor: ["立ち上げ", "束感", "キープ力"],
    needTags: ["hairHold", "hairFlow"],

    imageUrl:
      "https://m.media-amazon.com/images/I/413G3hSUQ5L._AC_SL1366_.jpg",

    amazon: {
      url: "https://amzn.to/4x3TPyh",
    },

    isActive: true,
  },

  {
    id: "lipps-matte-hard-wax",
    rank: 6,
    name: "マットハードワックス",
    shortName: "ヘアワックス",
    brand: "LIPPS",
    description:
      "髪のツヤを抑えながら、無造作な動きや立体感のあるスタイルを作りたいときに使いやすいワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["マット", "ハード"],
    recommendedFor: ["マット", "束感", "キープ力"],
    needTags: ["hairHold", "hairFlow"],

    imageUrl:
      "https://m.media-amazon.com/images/I/51fegzRr9LL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4bShjhq",
    },

    isActive: true,
  },

  {
    id: "arimino-men-freeze-keep-grease",
    rank: 7,
    name: "フリーズキープ グリース",
    shortName: "ヘアグリース",
    brand: "ARIMINO men",
    description:
      "ツヤのある質感を出しながら、作った毛流れやシルエットをしっかりキープしたいときに使いやすいグリースです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["グリース", "ツヤ感"],
    recommendedFor: ["ツヤ", "濡れ髪", "キープ力"],
    needTags: ["hairShine", "hairHold"],

    imageUrl:
      "https://m.media-amazon.com/images/I/61eAjwhZ3lL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/3UGv1xP",
    },

    isActive: true,
  },

  {
    id: "modenica-art-grease",
    rank: 8,
    name: "グリース",
    shortName: "ヘアグリース",
    brand: "MODENICA ART",
    description:
      "自然なツヤとまとまりを加えながら、パーマや毛流れを活かしたスタイルを作りたいときに使いやすいグリースです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["グリース", "毛流れ"],
    recommendedFor: ["ツヤ", "パーマ", "毛流れ"],
    needTags: ["hairShine", "hairFlow"],

    imageUrl:
      "https://m.media-amazon.com/images/I/41NqlaNfvVL._AC_.jpg",

    amazon: {
      url: "https://amzn.to/3U4YfGC",
    },

    isActive: true,
  },

  {
    id: "kantan-series-nuance",
    rank: 9,
    name: "カンタンニュアンス",
    shortName: "ヘアバーム",
    brand: "カンタンシリーズ",
    description:
      "センターパートなどの自然な毛流れとツヤを作り、固めすぎないスタイルを目指したいときに使いやすいバームです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ヘアバーム", "ナチュラル"],
    recommendedFor: ["センターパート", "毛流れ", "自然なツヤ"],
    needTags: ["hairFlow", "hairShine"],

    imageUrl:
      "https://m.media-amazon.com/images/I/41QaCNWywdL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/3Um69eH",
    },

    isActive: true,
  },

  {
    id: "arimino-men-hard-balm",
    rank: 10,
    name: "ハード バーム",
    shortName: "ヘアバーム",
    brand: "ARIMINO men",
    description:
      "バームらしい自然な質感を残しながら、毛流れやシルエットをキープしたいときに使いやすいスタイリング剤です。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    badges: ["ヘアバーム", "キープ"],
    recommendedFor: ["毛流れ", "ナチュラル", "キープ力"],
    needTags: ["hairFlow", "hairHold"],

    imageUrl:
      "https://m.media-amazon.com/images/I/51O8K0H64ZL._AC_SL1024_.jpg",

    amazon: {
      url: "https://amzn.to/3SD4a5j",
    },

    isActive: true,
  },

    {
    id: "arimino-men-freeze-keep-gel",
    rank: 11,
    name: "フリーズキープ ジェル",
    shortName: "ヘアジェル",
    brand: "ARIMINO men",
    description:
      "髪型をしっかりキープしながら、ツヤのある毛流れや束感を作りたいときに使いやすいジェルタイプのスタイリング剤です。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/31MbCi20gOL._AC_.jpg",
    imageAlt:
      "ARIMINO men フリーズキープ ジェル",

    badges: ["ジェル", "キープ"],
    recommendedFor: [
      "キープ力",
      "毛流れ",
      "ツヤ",
    ],
    needTags: [
      "hairHold",
      "hairFlow",
      "hairShine",
    ],

    amazon: {
      url: "https://amzn.to/4r7hBao",
    },

    isActive: true,
  },

  {
    id: "plus-eau-hydro-mist-n",
    rank: 12,
    name: "ハイドロミストN",
    shortName: "ヘアミスト",
    brand: "plus eau",
    description:
      "スタイリング前の髪を扱いやすい状態へ整え、毛流れやまとまりを作りやすくしたいときに取り入れやすいヘアミストです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51wPOZLnhUL._AC_SL1500_.jpg",
    imageAlt:
      "plus eau ハイドロミストN",

    badges: ["ヘアミスト", "まとまり"],
    recommendedFor: [
      "毛流れ",
      "まとまり",
      "スタイリング前",
    ],
    needTags: [
      "hairFlow",
      "hairManageability",
    ],

    amazon: {
      url: "https://amzn.to/46nPjip",
    },

    isActive: true,
  },

  {
    id: "n-homme-gel-balm",
    rank: 13,
    name: "オム ジェルバーム",
    shortName: "ジェルバーム",
    brand: "N.",
    description:
      "自然なツヤと毛流れを作りながら、固めすぎずにスタイルを整えたいときに使いやすいジェルバームです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/31Z93UGfjJL._AC_.jpg",
    imageAlt:
      "N. オム ジェルバーム",

    badges: ["ジェルバーム", "ツヤ感"],
    recommendedFor: [
      "毛流れ",
      "自然なツヤ",
      "ナチュラル",
    ],
    needTags: [
      "hairFlow",
      "hairShine",
    ],

    amazon: {
      url: "https://amzn.to/3Ty5AhT",
    },

    isActive: true,
  },

  {
    id: "n-homme-shea-cream",
    rank: 14,
    name: "オム シアクリーム",
    shortName: "ヘアクリーム",
    brand: "N.",
    description:
      "やわらかな質感を残しながら毛流れやまとまりを整え、自然なスタイルを作りたいときに使いやすいヘアクリームです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/21jMft9GYXL._AC_.jpg",
    imageAlt:
      "N. オム シアクリーム",

    badges: ["ヘアクリーム", "ナチュラル"],
    recommendedFor: [
      "毛流れ",
      "まとまり",
      "自然な質感",
    ],
    needTags: [
      "hairFlow",
      "hairManageability",
    ],

    amazon: {
      url: "https://amzn.to/4xXrtpU",
    },

    isActive: true,
  },

  {
    id: "kantan-series-yurutaba",
    rank: 15,
    name: "カンタンシリーズ ゆるたば",
    shortName: "ヘアワックス",
    brand: "KANTANSERIES",
    description:
      "自然な束感や毛流れを作りながら、作り込みすぎないスタイルを目指したいときに使いやすいスタイリング剤です。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61882R-evKL._AC_SL1500_.jpg",
    imageAlt:
      "KANTANSERIES カンタンシリーズ ゆるたば",

    badges: ["ワックス", "束感"],
    recommendedFor: [
      "毛流れ",
      "束感",
      "ナチュラル",
    ],
    needTags: [
      "hairFlow",
      "hairHold",
    ],

    amazon: {
      url: "https://amzn.to/4y3SurJ",
    },

    isActive: true,
  },

  {
    id: "deuxer-dry-paste-wax-6",
    rank: 16,
    name: "ドライペーストワックス 6",
    shortName: "ヘアワックス",
    brand: "DEUXER",
    description:
      "ツヤを抑えた質感で、立体感や束感を出しながら髪型をしっかりキープしたいときに使いやすいワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41i8eS9xVAL._AC_SL1000_.jpg",
    imageAlt:
      "DEUXER ドライペーストワックス 6",

    badges: ["ドライワックス", "キープ"],
    recommendedFor: [
      "束感",
      "立ち上げ",
      "キープ力",
    ],
    needTags: [
      "hairHold",
      "hairFlow",
    ],

    amazon: {
      url: "https://amzn.to/3SKa7O5",
    },

    isActive: true,
  },

  {
    id: "gatsby-metalubber-wax-hard",
    rank: 17,
    name: "メタラバー ワックス ハード",
    shortName: "ヘアワックス",
    brand: "GATSBY",
    description:
      "髪に動きや束感をつけながら、作ったスタイルをしっかりキープしたいときに使いやすいハードタイプのワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51JDPMBUvTL._AC_SL1302_.jpg",
    imageAlt:
      "GATSBY メタラバー ワックス ハード",

    badges: ["ハードワックス", "キープ"],
    recommendedFor: [
      "束感",
      "動き",
      "キープ力",
    ],
    needTags: [
      "hairHold",
      "hairFlow",
    ],

    amazon: {
      url: "https://amzn.to/4hq4UUT",
    },

    isActive: true,
  },

  {
    id: "product-hair-wax",
    rank: 18,
    name: "ヘアワックス",
    shortName: "ヘアワックス",
    brand: "product",
    description:
      "自然なツヤとまとまりを加えながら、毛流れを活かしたナチュラルなスタイルを作りたいときに使いやすいヘアワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71PmxKn3U7L._AC_SL1500_.jpg",
    imageAlt:
      "product ザ・プロダクト ヘアワックス",

    badges: ["ヘアワックス", "自然なツヤ"],
    recommendedFor: [
      "毛流れ",
      "ツヤ",
      "まとまり",
    ],
    needTags: [
      "hairFlow",
      "hairShine",
      "hairManageability",
    ],

    amazon: {
      url: "https://amzn.to/4h5gZgX",
    },

    isActive: true,
  },

  {
    id: "cool-grease-g",
    rank: 19,
    name: "クールグリース G",
    shortName: "ヘアグリース",
    brand: "阪本高生堂",
    description:
      "濡れたようなツヤ感を出しながら、毛流れやスタイルを整えたいときに使いやすいグリースタイプのスタイリング剤です。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61lZ22DDIrL._AC_SL1000_.jpg",
    imageAlt:
      "阪本高生堂 クールグリース G",

    badges: ["グリース", "ツヤ感"],
    recommendedFor: [
      "濡れ髪",
      "ツヤ",
      "毛流れ",
    ],
    needTags: [
      "hairShine",
      "hairFlow",
      "hairHold",
    ],

    amazon: {
      url: "https://amzn.to/4rb7ilB",
    },

    isActive: true,
  },

  {
    id: "ocean-trico-hair-styling-wax-air",
    rank: 20,
    name: "ヘアスタイリングワックス エアー",
    shortName: "ヘアワックス",
    brand: "OCEAN TRICO",
    description:
      "ふんわりした動きや軽い束感を作りながら、自然なシルエットへ整えたいときに使いやすいヘアワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41JD0Oo7tNL._AC_SL1000_.jpg",
    imageAlt:
      "OCEAN TRICO ヘアスタイリングワックス エアー",

    badges: ["ワックス", "ふんわり"],
    recommendedFor: [
      "毛流れ",
      "束感",
      "軽い仕上がり",
    ],
    needTags: [
      "hairFlow",
      "hairHold",
    ],

    amazon: {
      url: "https://amzn.to/3UMg3qo",
    },

    isActive: true,
  },

  {
    id: "lipps-hard-active-wax",
    rank: 21,
    name: "ハードアクティブワックス",
    shortName: "ヘアワックス",
    brand: "LIPPS",
    description:
      "髪に動きや立体感を出しながら、作った毛流れや束感をしっかりキープしたいときに使いやすいハードワックスです。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61qLf-qz3kL._AC_SL1500_.jpg",
    imageAlt:
      "LIPPS ハードアクティブワックス",

    badges: ["ハードワックス", "束感"],
    recommendedFor: [
      "キープ力",
      "束感",
      "毛流れ",
    ],
    needTags: [
      "hairHold",
      "hairFlow",
    ],

    amazon: {
      url: "https://amzn.to/3VschCC",
    },

    isActive: true,
  },

  {
    id: "modenica-natural-j",
    rank: 22,
    name: "ナチュラル J",
    shortName: "スタイリング剤",
    brand: "MODENICA",
    description:
      "自然なツヤと毛流れを活かしながら、固めすぎないナチュラルなスタイルへ整えたいときに使いやすいスタイリング剤です。",
    category: "hairStyling",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "wax",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71vv6fV9IDL._AC_SL1500_.jpg",
    imageAlt:
      "MODENICA ナチュラル J",

    badges: ["ナチュラル", "ツヤ感"],
    recommendedFor: [
      "毛流れ",
      "自然なツヤ",
      "ナチュラル",
    ],
    needTags: [
      "hairFlow",
      "hairShine",
    ],

    amazon: {
      url: "https://amzn.to/46oTomr",
    },

    isActive: true,
  },

  // ヘアケア（追加商品）
  {
    id: "the-answer-seasonal-care-ss-shampoo",
    rank: 4,
    name: "シーズナルケア SS スーパーラメラシャンプー",
    shortName: "シャンプー",
    brand: "THE ANSWER",
    description:
      "湿気による髪のうねりや広がりが気になるときに、まとまりやすい髪を目指して取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "うねりケア"],
    recommendedFor: ["うねり", "広がり", "まとまり"],
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/61EzGgjGf9L._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4zpaSwf",
    },

    isActive: true,
  },

  {
    id: "plus-eau-repoir-shampoo",
    rank: 5,
    name: "リポアシャンプー",
    shortName: "シャンプー",
    brand: "plus eau",
    description:
      "ダメージによるパサつきをケアしながら、指通りのよい扱いやすい髪を目指したい人向けのシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "ダメージケア"],
    recommendedFor: ["ダメージ", "パサつき", "指通り"],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/31N+nhZPRwL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/4gE7DcS",
    },

    isActive: true,
  },

  {
    id: "nile-dense-foam-gel-shampoo",
    rank: 6,
    name: "超濃密泡ジェルシャンプー",
    shortName: "シャンプー",
    brand: "NILE",
    description:
      "濃密な泡で髪と頭皮を洗いながら、毎日のヘアケアで髪を扱いやすい状態へ整えたい人向けのシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "濃密泡"],
    recommendedFor: ["毎日ケア", "泡立ち", "まとまり"],
    needTags: ["hairManageability"],

    imageUrl:
      "https://m.media-amazon.com/images/I/61WWjyvfjxL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4qqdnug",
    },

    isActive: true,
  },

  {
    id: "cocone-clay-cream-shampoo",
    rank: 7,
    name: "クレイクリームシャンプー",
    shortName: "クリームシャンプー",
    brand: "cocone",
    description:
      "髪の乾燥やパサつきが気になるときに、まとまりのある髪を目指して取り入れやすいクリームタイプのシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["クリームシャンプー", "まとまり"],
    recommendedFor: ["乾燥", "パサつき", "まとまり"],
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/41HWJ9PGa4L._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/4qtf4qP",
    },

    isActive: true,
  },

  {
    id: "hiritu-balance-repair-shampoo-moist",
    rank: 8,
    name: "バランスリペア シャンプー モイスト",
    shortName: "シャンプー",
    brand: "hiritu",
    description:
      "髪のパサつきや広がりを抑え、しっとりまとまりやすい状態を目指したい人向けのシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "モイスト"],
    recommendedFor: ["パサつき", "広がり", "しっとり"],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/61wRGQZEUXL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4xSobnu",
    },

    isActive: true,
  },

  {
    id: "moroccan-beauty-deep-moist-shampoo",
    rank: 9,
    name: "ディープモイスト シャンプー",
    shortName: "シャンプー",
    brand: "モロッカンビューティ",
    description:
      "乾燥によるパサつきや髪の広がりをケアし、しっとりまとまる髪を目指したい人向けのシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "高保湿"],
    recommendedFor: ["乾燥", "パサつき", "まとまり"],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/615H-DDEAML._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/3UpYzQe",
    },

    isActive: true,
  },

  {
    id: "botanist-botanical-shampoo-damage-care",
    rank: 10,
    name: "ボタニカルシャンプー ダメージケア",
    shortName: "シャンプー",
    brand: "BOTANIST",
    description:
      "髪のダメージやパサつきが気になるときに、なめらかで扱いやすい髪を目指して使いやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "ダメージケア"],
    recommendedFor: ["ダメージ", "パサつき", "指通り"],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/61NM3uT+RYL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4cOgshX",
    },

    isActive: true,
  },

  {
    id: "reden-hybrid-shampoo",
    rank: 11,
    name: "ハイブリッドシャンプー",
    shortName: "シャンプー",
    brand: "REDEN",
    description:
      "毎日の洗髪で髪をすっきり洗いながら、扱いやすい状態へ整えたい人に取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "毎日ケア"],
    recommendedFor: [
      "毎日のヘアケア",
      "まとまり",
      "扱いやすさ",
    ],
    needTags: [
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61majl8a5XL._AC_SL1500_.jpg",
    imageAlt:
      "REDEN ハイブリッドシャンプー",

    amazon: {
      url: "https://amzn.to/3UTFBBR",
    },

    isActive: true,
  },

  {
    id: "maro17-perfect-wash-shampoo-black",
    rank: 12,
    name: "シャンプー パーフェクトウォッシュシャンプー ブラック",
    shortName: "シャンプー",
    brand: "MARO17",
    description:
      "髪をすっきり洗い上げながら、毎日のヘアケアを習慣化したい人に取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "メンズ"],
    recommendedFor: [
      "毎日のヘアケア",
      "洗髪",
      "扱いやすさ",
    ],
    needTags: [
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71rO5uLO73L._AC_SL1500_.jpg",
    imageAlt:
      "MARO17 シャンプー パーフェクトウォッシュシャンプー ブラック",

    amazon: {
      url: "https://amzn.to/3UPUrcE",
    },

    isActive: true,
  },

  {
    id: "bulk-homme-the-shampoo",
    rank: 13,
    name: "THE SHAMPOO",
    shortName: "シャンプー",
    brand: "BULK HOMME",
    description:
      "毎日の洗髪で髪を清潔に保ちながら、まとまりや扱いやすさも意識したい人に取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "メンズ"],
    recommendedFor: [
      "毎日のヘアケア",
      "まとまり",
      "扱いやすさ",
    ],
    needTags: [
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61TB0lzvSPL._AC_SL1500_.jpg",
    imageAlt:
      "BULK HOMME THE SHAMPOO",

    amazon: {
      url: "https://amzn.to/4hp7pqq",
    },

    isActive: true,
  },

  {
    id: "the-public-organic-super-shiny-shampoo",
    rank: 14,
    name: "スーパーシャイニー 精油シャンプー",
    shortName: "シャンプー",
    brand: "THE PUBLIC ORGANIC",
    description:
      "髪のパサつきやまとまりにくさが気になるときに、ツヤのある扱いやすい髪を目指して取り入れやすいシャンプーです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["シャンプー", "ツヤケア"],
    recommendedFor: [
      "パサつき",
      "まとまり",
      "ツヤ",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41qSqdKsC2L._AC_SL1080_.jpg",
    imageAlt:
      "THE PUBLIC ORGANIC スーパーシャイニー 精油シャンプー",

    amazon: {
      url: "https://amzn.to/4gONmBI",
    },

    isActive: true,
  },

  {
    id: "milbon-elujuda-emulsion-plus",
    rank: 15,
    name: "エルジューダ エマルジョン+",
    shortName: "ヘアミルク",
    brand: "ミルボン",
    description:
      "乾燥やパサつきが気になる髪をケアしながら、やわらかくまとまりやすい状態へ整えたいときに使いやすいヘアミルクです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアミルク", "ダメージケア"],
    recommendedFor: [
      "乾燥",
      "パサつき",
      "まとまり",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61eJneWI01L._AC_SL1316_.jpg",
    imageAlt:
      "ミルボン エルジューダ エマルジョン+",

    amazon: {
      url: "https://amzn.to/4iLkoEj",
    },

    isActive: true,
  },

  {
    id: "orbis-essence-in-hair-milk",
    rank: 16,
    name: "エッセンスインヘアミルク",
    shortName: "ヘアミルク",
    brand: "ORBIS",
    description:
      "乾燥やダメージによるパサつきをケアしながら、指通りのよいまとまりやすい髪へ整えたいときに使いやすいヘアミルクです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアミルク", "まとまり"],
    recommendedFor: [
      "ダメージ",
      "パサつき",
      "指通り",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41+UMFS-W3L._AC_SL1500_.jpg",
    imageAlt:
      "ORBIS エッセンスインヘアミルク",

    amazon: {
      url: "https://amzn.to/4rdkk2j",
    },

    isActive: true,
  },

  {
    id: "kerastase-nu-soin-oleo-relax",
    rank: 17,
    name: "NU ソワン オレオ リラックス",
    shortName: "ヘアトリートメント",
    brand: "KERASTASE",
    description:
      "広がりやまとまりにくさが気になる髪を、扱いやすくなめらかな状態へ整えたいときに取り入れやすいヘアトリートメントです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["トリートメント", "まとまり"],
    recommendedFor: [
      "広がり",
      "まとまり",
      "扱いやすさ",
    ],
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71733umr-AL._AC_SL1500_.jpg",
    imageAlt:
      "ケラスターゼ NU ソワン オレオ リラックス",

    amazon: {
      url: "https://amzn.to/4imw2oO",
    },

    isActive: true,
  },

  {
    id: "milbon-deesse-elujuda-mo",
    rank: 18,
    name: "ディーセス エルジューダ MO",
    shortName: "ヘアオイル",
    brand: "ミルボン",
    description:
      "髪の硬さやまとまりにくさが気になるときに、やわらかく扱いやすい状態へ整えたい人に使いやすいヘアオイルです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアオイル", "まとまり"],
    recommendedFor: [
      "まとまり",
      "扱いやすさ",
      "パサつき",
    ],
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61dCSa+-UvL._AC_SL1000_.jpg",
    imageAlt:
      "ミルボン ディーセス エルジューダ MO",

    amazon: {
      url: "https://amzn.to/4rb7QIb",
    },

    isActive: true,
  },

  {
    id: "and-honey-deep-moist-hair-oil-3",
    rank: 19,
    name: "ディープモイスト ヘアオイル 3.0",
    shortName: "ヘアオイル",
    brand: "&honey",
    description:
      "乾燥やパサつきが気になる髪にツヤとまとまりを与え、扱いやすい状態へ整えたいときに使いやすいヘアオイルです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアオイル", "保湿ケア"],
    recommendedFor: [
      "乾燥",
      "パサつき",
      "まとまり",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71YYYGhvMLL._AC_SL1500_.jpg",
    imageAlt:
      "&honey ディープモイスト ヘアオイル 3.0",

    amazon: {
      url: "https://amzn.to/4iLktb5",
    },

    isActive: true,
  },

  {
    id: "fino-premium-touch-hair-mask",
    rank: 20,
    name: "プレミアムタッチ 濃厚美容液ヘアマスク",
    shortName: "ヘアマスク",
    brand: "fino",
    description:
      "髪のダメージやパサつきが気になるときの集中ケアとして、なめらかでまとまりやすい髪を目指して使いやすいヘアマスクです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["ヘアマスク", "集中ケア"],
    recommendedFor: [
      "ダメージ",
      "パサつき",
      "まとまり",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41FtC8LF79L._AC_.jpg",
    imageAlt:
      "フィーノ プレミアムタッチ 濃厚美容液ヘアマスク",

    amazon: {
      url: "https://amzn.to/4xsjCPT",
    },

    isActive: true,
  },

  {
    id: "essential-cuticle-coat-oil",
    rank: 21,
    name: "キューティクルコートオイル",
    shortName: "ヘアオイル",
    brand: "Essential",
    description:
      "毛先のパサつきやまとまりにくさが気になるときに、ツヤのある扱いやすい髪へ整えたい人に取り入れやすいヘアオイルです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアオイル", "ツヤケア"],
    recommendedFor: [
      "毛先",
      "パサつき",
      "まとまり",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/716YRJQNaCL._AC_SL1500_.jpg",
    imageAlt:
      "エッセンシャル キューティクルコートオイル",

    amazon: {
      url: "https://amzn.to/4isIALw",
    },

    isActive: true,
  },

  {
    id: "pantene-miracles-moisture-boost-milk-water-serum",
    rank: 22,
    name: "ミラクルズ うるおいブースト ミルクウォーターセラム",
    shortName: "ヘアセラム",
    brand: "PANTENE",
    description:
      "乾燥やパサつきが気になる髪をケアしながら、まとまりやすく扱いやすい状態へ整えたいときに使いやすいヘアセラムです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアセラム", "うるおい"],
    recommendedFor: [
      "乾燥",
      "パサつき",
      "まとまり",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/510LC3McbML._AC_SL1500_.jpg",
    imageAlt:
      "パンテーン ミラクルズ うるおいブースト ミルクウォーターセラム",

    amazon: {
      url: "https://amzn.to/3Ty6efj",
    },

    isActive: true,
  },

  {
    id: "lucido-l-oil-treatment-ex-hair-oil",
    rank: 23,
    name: "オイルトリートメント #EXヘアオイル",
    shortName: "ヘアオイル",
    brand: "LUCIDO-L",
    description:
      "乾燥やパサつきのある髪にツヤとまとまりを与え、スタイリングしやすい状態へ整えたいときに使いやすいヘアオイルです。",
    category: "hairCare",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "hairOil",

    badges: ["ヘアオイル", "まとまり"],
    recommendedFor: [
      "パサつき",
      "ツヤ",
      "まとまり",
    ],
    needTags: [
      "hairRepair",
      "hairManageability",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51XuuKpGa+L._AC_SL1500_.jpg",
    imageAlt:
      "LUCIDO-L オイルトリートメント #EXヘアオイル",

    amazon: {
      url: "https://amzn.to/3T8hhf5",
    },

    isActive: true,
  },

  // メンズメイク（追加商品）
  {
    id: "objet-natural-cover-foundation",
    rank: 5,
    name: "ナチュラルカバーファンデーション",
    shortName: "ファンデーション",
    brand: "オブジェ",
    description:
      "毛穴や肌の色ムラを自然にカバーし、清潔感のある肌印象へ整えたい人向けのファンデーションです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["ファンデーション", "自然な仕上がり"],
    recommendedFor: ["毛穴", "色ムラ", "自然な肌補正"],
    needTags: ["skinToneCorrection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/61PIHGw8OML._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/3TZY2o9",
    },

    isActive: true,
  },

  {
    id: "bercury-bb-cream",
    rank: 6,
    name: "BBクリーム",
    shortName: "BBクリーム",
    brand: "バーキュリー",
    description:
      "青ひげやニキビ跡、肌の色ムラをまとめて自然に補正したいときに使いやすい男性向けBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["BBクリーム", "男性向け"],
    recommendedFor: ["青ひげ", "ニキビ跡", "肌補正"],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/5100iBwZC3L._AC_SL1270_.jpg",

    amazon: {
      url: "https://amzn.to/4g5B5Zh",
    },

    isActive: true,
  },

  {
    id: "shiseido-men-vibrant-bb-moisturizer",
    rank: 7,
    name: "ヴァイブラント BBモイスチャライザー",
    shortName: "BBクリーム",
    brand: "SHISEIDO MEN",
    description:
      "肌の色ムラやくすみを自然に補正し、明るく健康的な肌印象を目指したい人向けのBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["BBクリーム", "肌補正"],
    recommendedFor: ["色ムラ", "くすみ", "清潔感"],
    needTags: [
      "skinToneCorrection",
      "uvProtection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/51cQCgE6+gL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/4cxVyDJ",
    },

    isActive: true,
  },

  {
    id: "the-saem-cover-perfection-tip-concealer",
    rank: 8,
    name: "カバーパーフェクション チップコンシーラー",
    shortName: "コンシーラー",
    brand: "the SAEM",
    description:
      "ニキビ跡やクマなど、気になる部分をピンポイントで自然にカバーしたいときに使いやすいコンシーラーです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["コンシーラー", "部分カバー"],
    recommendedFor: ["ニキビ跡", "クマ", "部分補正"],
    needTags: ["skinToneCorrection"],

    imageUrl:
      "https://m.media-amazon.com/images/I/51kGSoQv-kL._AC_SL1300_.jpg",

    amazon: {
      url: "https://amzn.to/4gity83",
    },

    isActive: true,
  },

  {
    id: "tirtir-mask-fit-all-cover-dual-concealer",
    rank: 9,
    name: "マスクフィット オールカバー デュアルコンシーラー",
    shortName: "コンシーラー",
    brand: "TIRTIR",
    description:
      "スティックとリキッドを使い分け、青ひげやニキビ跡などを範囲に合わせてカバーできるコンシーラーです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["コンシーラー", "2WAY"],
    recommendedFor: ["青ひげ", "ニキビ跡", "部分補正"],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/71ch4xds+qL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4xbKOTY",
    },

    isActive: true,
  },

  {
    id: "kate-stick-concealer-a",
    rank: 10,
    name: "スティックコンシーラーA",
    shortName: "コンシーラー",
    brand: "KATE",
    description:
      "青ひげやニキビ跡などの気になる部分へ直接塗りやすく、手軽にカバーしたい人向けのスティックコンシーラーです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    badges: ["コンシーラー", "スティック"],
    recommendedFor: ["青ひげ", "ニキビ跡", "初心者"],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    imageUrl:
      "https://m.media-amazon.com/images/I/61ZfVapmBqL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4zr0Omy",
    },

    isActive: true,
  },

  {
    id: "mens-biore-one-bb-uv-cream",
    rank: 11,
    name: "BB&UVクリーム",
    shortName: "BBクリーム",
    brand: "メンズビオレONE",
    description:
      "肌の色ムラや青ヒゲを自然に補正しながら、紫外線対策もまとめて行いたい男性に使いやすいBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/81HzUxm9p4L._AC_SL1500_.jpg",
    imageAlt:
      "メンズビオレONE BB&UVクリーム",

    badges: ["BBクリーム", "UVケア"],
    recommendedFor: [
      "肌補正",
      "青ヒゲ",
      "紫外線対策",
    ],
    needTags: [
      "skinToneCorrection",
      "beardShadowCover",
      "uvProtection",
    ],

    amazon: {
      url: "https://amzn.to/46mvacG",
    },

    isActive: true,
  },

  {
    id: "moist-labo-bb-essence-cream",
    rank: 12,
    name: "BBエッセンスクリーム",
    shortName: "BBクリーム",
    brand: "モイストラボ",
    description:
      "肌の色ムラや気になる部分を自然にカバーしながら、うるおい感のある仕上がりを目指したいときに使いやすいBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41zmCHfMI8L._AC_.jpg",
    imageAlt:
      "モイストラボ BBエッセンスクリーム",

    badges: ["BBクリーム", "肌補正"],
    recommendedFor: [
      "色ムラ",
      "肌補正",
      "自然な仕上がり",
    ],
    needTags: [
      "skinToneCorrection",
      "beardShadowCover",
    ],

    amazon: {
      url: "https://amzn.to/3UNZzhr",
    },

    isActive: true,
  },

  {
    id: "esprique-cool-touch-bb-spray-uv-50",
    rank: 13,
    name: "冷感タッチ BBスプレー UV 50",
    shortName: "BBスプレー",
    brand: "ESPRIQUE",
    description:
      "肌の色ムラを補正しながら紫外線対策も行い、暑い時期にも使いやすいスプレータイプのBBアイテムです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61PpZfqPBeL._AC_SL1500_.jpg",
    imageAlt:
      "ESPRIQUE 冷感タッチ BBスプレー UV 50",

    badges: ["BBスプレー", "UVケア"],
    recommendedFor: [
      "肌補正",
      "紫外線対策",
      "暑い季節",
    ],
    needTags: [
      "skinToneCorrection",
      "uvProtection",
    ],

    amazon: {
      url: "https://amzn.to/4j2FhL3",
    },

    isActive: true,
  },

  {
    id: "orbis-mr-base-color-controller",
    rank: 14,
    name: "ベースカラー コントローラー",
    shortName: "化粧下地",
    brand: "ORBIS Mr.",
    description:
      "肌の色ムラやくすみを自然に整え、メイク感を強く出さずに清潔感のある肌印象を目指したい男性向けの化粧下地です。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41ZOgEnG8ZL._AC_SL1000_.jpg",
    imageAlt:
      "ORBIS Mr. ベースカラー コントローラー",

    badges: ["化粧下地", "男性向け"],
    recommendedFor: [
      "色ムラ",
      "くすみ",
      "自然な肌補正",
    ],
    needTags: [
      "skinToneCorrection",
    ],

    amazon: {
      url: "https://amzn.to/4xZebJE",
    },

    isActive: true,
  },

  {
    id: "menz-basic-bb-cream",
    rank: 15,
    name: "BBクリーム",
    shortName: "BBクリーム",
    brand: "Menz Basic",
    description:
      "青ヒゲやニキビ跡、肌の色ムラなどを自然にカバーし、清潔感のある肌印象へ整えたい男性に使いやすいBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/715gt9FIBrL._AC_SL1500_.jpg",
    imageAlt:
      "Menz Basic BBクリーム",

    badges: ["BBクリーム", "男性向け"],
    recommendedFor: [
      "青ヒゲ",
      "ニキビ跡",
      "肌補正",
    ],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    amazon: {
      url: "https://amzn.to/4hp7D0K",
    },

    isActive: true,
  },

  {
    id: "holo-bell-sunblock-moist-bb",
    rank: 16,
    name: "サンブロック保湿BB",
    shortName: "BBクリーム",
    brand: "HOLO BELL",
    description:
      "肌を自然に補正しながら、紫外線対策と保湿もまとめて行いたい男性に取り入れやすいBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/517DxJc+I7L._AC_SL1000_.jpg",
    imageAlt:
      "HOLO BELL サンブロック保湿BB",

    badges: ["BBクリーム", "UVケア"],
    recommendedFor: [
      "肌補正",
      "紫外線対策",
      "乾燥",
    ],
    needTags: [
      "skinToneCorrection",
      "beardShadowCover",
      "uvProtection",
    ],

    amazon: {
      url: "https://amzn.to/4h6QK9Y",
    },

    isActive: true,
  },

  {
    id: "the-future-skin-cover-concealer",
    rank: 17,
    name: "スキンカバーコンシーラー",
    shortName: "コンシーラー",
    brand: "THE FUTURE",
    description:
      "青ヒゲやニキビ跡など、気になる部分をピンポイントで自然に補正したい男性に使いやすいコンシーラーです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71fHrW7M5aL._AC_SL1500_.jpg",
    imageAlt:
      "THE FUTURE スキンカバーコンシーラー",

    badges: ["コンシーラー", "男性向け"],
    recommendedFor: [
      "青ヒゲ",
      "ニキビ跡",
      "部分補正",
    ],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    amazon: {
      url: "https://amzn.to/3UQ3XMW",
    },

    isActive: true,
  },

  {
    id: "mulc-natural-bb-cream",
    rank: 18,
    name: "ナチュラルBBクリーム",
    shortName: "BBクリーム",
    brand: "MULC",
    description:
      "肌の色ムラや青ヒゲを自然にカバーし、メイク感を抑えながら清潔感のある肌印象へ整えたい男性向けのBBクリームです。",
    category: "mensMakeup",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "sunscreen",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61eyxIvIzlL._AC_SL1500_.jpg",
    imageAlt:
      "MULC ムルク ナチュラルBBクリーム",

    badges: ["BBクリーム", "男性向け"],
    recommendedFor: [
      "青ヒゲ",
      "色ムラ",
      "自然な肌補正",
    ],
    needTags: [
      "beardShadowCover",
      "skinToneCorrection",
    ],

    amazon: {
      url: "https://amzn.to/4rdkuXt",
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
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/61xYQcUSDyL._AC_SL1209_.jpg",

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
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/71YZOFchQRL._AC_SL1500_.jpg",

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
    needTags: [],
    
    imageUrl:
      "https://m.media-amazon.com/images/I/51yLU9NK-VL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/45dauTK",
    },

    isActive: true,
  },

  {
    id: "shiro-savon-eau-de-parfum",
    rank: 4,
    name: "サボン オードパルファン",
    shortName: "香水",
    brand: "SHIRO",
    description:
      "清潔感のある石けんを思わせる香りで、香水を使い慣れていない人の日常使いにも取り入れやすいフレグランスです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    badges: ["フレグランス", "清潔感"],
    recommendedFor: ["石けん系", "日常使い", "香水初心者"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/41-C0fSR7fL._AC_SL1040_.jpg",

    amazon: {
      url: "https://amzn.to/4gEH4nV",
    },

    isActive: true,
  },

  {
    id: "bvlgari-pour-homme-eau-de-toilette",
    rank: 5,
    name: "プールオム オードトワレ",
    shortName: "香水",
    brand: "BVLGARI",
    description:
      "爽やかさと落ち着きを感じる香りで、仕事から休日まで幅広い場面で使いやすいフレグランスです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    badges: ["フレグランス", "爽やか"],
    recommendedFor: ["爽やかな香り", "ビジネス", "日常使い"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/51v1qIgUdFL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/4hIEcrd",
    },

    isActive: true,
  },

  {
    id: "con-cool-f-mouthwash",
    rank: 6,
    name: "コンクールF",
    shortName: "マウスウォッシュ",
    brand: "Con Cool",
    description:
      "口臭や口内の清潔感が気になるときに、毎日の歯磨きと組み合わせて使いやすい希釈タイプのマウスウォッシュです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    badges: ["口臭ケア", "マウスウォッシュ"],
    recommendedFor: ["口臭", "口内ケア", "毎日ケア"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/61GVixG01qL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4zi7142",
    },

    isActive: true,
  },

  {
    id: "nonio-mouthwash-splash-citrus-mint",
    rank: 7,
    name: "マウスウォッシュ スプラッシュシトラスミント",
    shortName: "マウスウォッシュ",
    brand: "NONIO",
    description:
      "口臭を予防しながら口内をすっきり整えたいときに取り入れやすい、シトラスミント風味のマウスウォッシュです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    badges: ["口臭ケア", "爽快感"],
    recommendedFor: ["口臭", "口内ケア", "爽快感"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/618dV2-kXYL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/4g7kVyB",
    },

    isActive: true,
  },

  {
    id: "uno-all-in-one-lip-creator",
    rank: 8,
    name: "オールインワンリップクリエイター",
    shortName: "色付きリップ",
    brand: "uno",
    description:
      "唇の乾燥をケアしながら血色感を自然に補正し、健康的な口元へ整えたい人向けの色付きリップです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lip",

    badges: ["リップケア", "血色補正"],
    recommendedFor: ["唇の乾燥", "血色感", "自然な補正"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/71BJDfOoi-L._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/45wVHnd",
    },

    isActive: true,
  },

  {
    id: "atrix-beauty-charge-unscented",
    rank: 9,
    name: "ビューティーチャージ 無香料",
    shortName: "ハンドクリーム",
    brand: "アトリックス",
    description:
      "手元の乾燥を保湿しながら、香りを気にせず仕事や外出先でも使いやすい無香料のハンドクリームです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    badges: ["ハンドケア", "無香料"],
    recommendedFor: ["手元の乾燥", "ビジネス", "無香料"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/71ss-bcqImL._AC_SL1500_.jpg",

    amazon: {
      url: "https://amzn.to/45F3yiu",
    },

    isActive: true,
  },

  {
    id: "orbis-mr-lip-care-stick",
    rank: 10,
    name: "ミスター リップケア スティック",
    shortName: "リップクリーム",
    brand: "ORBIS Mr.",
    description:
      "唇の乾燥を自然にケアし、ツヤや色を目立たせず清潔感のある口元へ整えたい男性向けリップクリームです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lip",

    badges: ["リップケア", "無色・無香料"],
    recommendedFor: ["唇の乾燥", "自然な仕上がり", "男性向け"],
    needTags: [],

    imageUrl:
      "https://m.media-amazon.com/images/I/41FlzgCruvL._AC_SL1000_.jpg",

    amazon: {
      url: "https://amzn.to/3SnEoBM",
    },

    isActive: true,
  },

  {
    id: "hermes-un-jardin-sur-le-nil-eau-de-toilette",
    rank: 11,
    name: "ナイルの庭 オードトワレ",
    shortName: "香水",
    brand: "HERMÈS",
    description:
      "爽やかでみずみずしい香りを取り入れ、清潔感のある印象を演出したいときに使いやすいフレグランスです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41+JDYk38tL._AC_SL1024_.jpg",
    imageAlt:
      "HERMÈS ナイルの庭 オードトワレ",

    badges: ["フレグランス", "爽やか"],
    recommendedFor: ["爽やかな香り", "清潔感", "日常使い"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4j2yKQw",
    },

    isActive: true,
  },

  {
    id: "reden-fragrance-marine-musk",
    rank: 12,
    name: "フレグランス マリンムスク",
    shortName: "香水",
    brand: "REDEN",
    description:
      "爽やかなマリンムスク系の香りで、日常の身だしなみに自然な香りを取り入れたい人向けのフレグランスです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51jvscUol+L._AC_SL1200_.jpg",
    imageAlt:
      "REDEN フレグランス マリンムスク",

    badges: ["フレグランス", "マリンムスク"],
    recommendedFor: ["爽やかな香り", "日常使い", "清潔感"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4yvFgnq",
    },

    isActive: true,
  },

  {
    id: "chanel-bleu-de-chanel-eau-de-toilette",
    rank: 13,
    name: "ブルー ドゥ シャネル オードゥ トワレット",
    shortName: "香水",
    brand: "CHANEL",
    description:
      "爽やかさと落ち着きを感じる香りで、大人っぽく洗練された印象を演出したいときに取り入れやすいフレグランスです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41-EeivEWmL._AC_.jpg",
    imageAlt:
      "CHANEL ブルー ドゥ シャネル オードゥ トワレット",

    badges: ["フレグランス", "大人向け"],
    recommendedFor: ["大人っぽい香り", "清潔感", "特別な日"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4hp02zo",
    },

    isActive: true,
  },

  {
    id: "dior-sauvage-eau-de-parfum",
    rank: 14,
    name: "ソヴァージュ オードパルファム",
    shortName: "香水",
    brand: "Dior",
    description:
      "存在感のある香りで、大人っぽさや洗練された印象を演出したいときに取り入れやすいフレグランスです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "fragrance",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/41ZCRLySRUL._AC_.jpg",
    imageAlt:
      "Dior ソヴァージュ オードパルファム",

    badges: ["フレグランス", "大人向け"],
    recommendedFor: ["大人っぽい香り", "存在感", "特別な日"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4de6tTo",
    },

    isActive: true,
  },

  {
    id: "mondahmin-night-clear-mouthwash",
    rank: 15,
    name: "ナイトクリア マウスウォッシュ",
    shortName: "マウスウォッシュ",
    brand: "モンダミン",
    description:
      "就寝前のオーラルケアに取り入れ、口内を清潔に保ちたいときに使いやすいマウスウォッシュです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61+Frwk1dGL._AC_SL1500_.jpg",
    imageAlt:
      "モンダミン ナイトクリア マウスウォッシュ",

    badges: ["オーラルケア", "就寝前"],
    recommendedFor: ["口臭", "口内ケア", "就寝前"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4h3mqwJ",
    },

    isActive: true,
  },

  {
    id: "clinica-quick-wash",
    rank: 16,
    name: "クイックウォッシュ",
    shortName: "マウスウォッシュ",
    brand: "クリニカ",
    description:
      "歯磨きが難しい場面でも口内をすっきり整えたいときに取り入れやすいマウスウォッシュです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/719OgesBkkL._AC_SL1500_.jpg",
    imageAlt:
      "クリニカ クイックウォッシュ",

    badges: ["オーラルケア", "手軽"],
    recommendedFor: ["口内ケア", "外出先", "手軽なケア"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4rbcZAd",
    },

    isActive: true,
  },

  {
    id: "the-breath-co-oral-rinse-mild-mint",
    rank: 17,
    name: "オーラルリンス マイルドミント",
    shortName: "マウスウォッシュ",
    brand: "The Breath Co.",
    description:
      "口臭が気になるときの毎日のオーラルケアに取り入れやすい、マイルドミントタイプのマウスウォッシュです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71Ini-puwtL._AC_SL1500_.jpg",
    imageAlt:
      "The Breath Co. オーラルリンス マイルドミント",

    badges: ["口臭ケア", "マウスウォッシュ"],
    recommendedFor: ["口臭", "口内ケア", "毎日ケア"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4gMRa6s",
    },

    isActive: true,
  },

  {
    id: "mondahmin-premium-care-gold-mint",
    rank: 18,
    name: "プレミアムケア ゴールドミント マウスウォッシュ",
    shortName: "マウスウォッシュ",
    brand: "モンダミン",
    description:
      "毎日の口内ケアをまとめて行い、口元の清潔感を意識したい人に取り入れやすいマウスウォッシュです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "toothbrush",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/61R3P2XLY1L._AC_SL1500_.jpg",
    imageAlt:
      "モンダミン プレミアムケア ゴールドミント マウスウォッシュ",

    badges: ["オーラルケア", "毎日ケア"],
    recommendedFor: ["口臭", "口内ケア", "清潔感"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4isGpYa",
    },

    isActive: true,
  },

  {
    id: "avene-medicated-hand-cream",
    rank: 19,
    name: "薬用ハンドクリーム",
    shortName: "ハンドクリーム",
    brand: "Avene",
    description:
      "乾燥しやすい手肌を保湿し、手元まで清潔感のある印象へ整えたいときに取り入れやすいハンドクリームです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51qAmn4sRiL._AC_SL1500_.jpg",
    imageAlt:
      "Avene 薬用ハンドクリーム",

    badges: ["ハンドケア", "保湿"],
    recommendedFor: ["手元の乾燥", "保湿", "清潔感"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4h5LAuG",
    },

    isActive: true,
  },

  {
    id: "yuskin-hana-hand-cream",
    rank: 20,
    name: "hana ハンドクリーム",
    shortName: "ハンドクリーム",
    brand: "ユースキン",
    description:
      "乾燥しやすい手肌を保湿しながら、日常の身だしなみとして手元を整えたいときに使いやすいハンドクリームです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "lotion",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/51KVsPj+7YL._AC_SL1500_.jpg",
    imageAlt:
      "ユースキン hana ハンドクリーム",

    badges: ["ハンドケア", "保湿"],
    recommendedFor: ["手元の乾燥", "保湿", "日常ケア"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/46Vz8Jn",
    },

    isActive: true,
  },

  {
    id: "8-the-thalasso-u-cbd-refreshing-calm-body-soap",
    rank: 21,
    name: "CBD&リフレッシング カーム 美容液ボディソープ",
    shortName: "ボディソープ",
    brand: "8 THE THALASSO u",
    description:
      "毎日のバスタイムで全身を洗いながら、肌の清潔感を整えたい人に取り入れやすいボディソープです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/81Y2mYo7rEL._AC_SL1500_.jpg",
    imageAlt:
      "8 THE THALASSO u CBD&リフレッシング カーム 美容液ボディソープ",

    badges: ["ボディケア", "全身ケア"],
    recommendedFor: ["全身の清潔感", "ボディケア", "毎日ケア"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4xoC1x4",
    },

    isActive: true,
  },

  {
    id: "maro-body-soap",
    rank: 22,
    name: "全身用ボディソープ",
    shortName: "ボディソープ",
    brand: "MARO",
    description:
      "毎日の入浴で全身をすっきり洗い、男性の身だしなみとして清潔感を整えたいときに使いやすいボディソープです。",
    category: "other",

    price: null,

    rating: null,
    reviewCount: null,

    visualType: "cleanser",

    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T2/images/I/71SJiCWiyXL._AC_SL1500_.jpg",
    imageAlt:
      "MARO 全身用ボディソープ",

    badges: ["ボディケア", "男性向け"],
    recommendedFor: ["全身の清潔感", "ボディケア", "男性向け"],
    needTags: [],

    amazon: {
      url: "https://amzn.to/4inZuuF",
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
      "肌のコンディションを整えるアイテムです。",
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
      "髪型を整えるためのスタイリングアイテムです。",
    advice:
      "作りたい髪型や髪質に合わせて、セット力・ツヤ・質感の違いから選ぶのがおすすめです。",
  },

  {
    id: "hairCare",
    label: "ヘアケア",
    englishLabel: "HAIR CARE",
    description:
      "髪のコンディションを整えるためのアイテムです。",
    advice:
      "スタイリングだけでなく日々のヘアケアも整えることで、髪型を作りやすい状態を目指せます。",
  },

  {
    id: "mensMakeup",
    label: "メンズメイク",
    englishLabel: "MEN'S MAKEUP",
    description:
      "肌を自然に補正して見せるためのアイテムです。",
    advice:
      "初めてならBBクリームなど、変化が自然で簡単に使いやすいアイテムから試すのがおすすめです。",
  },

  {
    id: "other",
    label: "その他",
    englishLabel: "OTHER",
    description:
      "細かな身だしなみを整えるためのアイテムです。",
    advice:
      "肌や髪を整えたあとに、必要なものだけ取り入れると全体の清潔感をさらに高めやすくなります。",
  },
];

export const activeProducts = products.filter(
  (product) => product.isActive,
);
