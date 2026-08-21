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

  imagePath?: string;
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

    imagePath:
  "/products/fancl-deep-clear-washing-powder.webp",
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

    badges: ["クレンジング", "オイル"],
    recommendedFor: ["BBクリーム", "メイクオフ", "毛穴汚れ"],
    needTags: ["makeupRemoval"],

    amazon: {
      url: "https://amzn.to/4gFYv7C",
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
    needTags: ["hairHold", "hairFlow"],
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
    needTags: [
      "hairManageability",
      "hairRepair",
    ],

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

    amazon: {
      url: "https://amzn.to/3SD4a5j",
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

    amazon: {
      url: "https://amzn.to/4cOgshX",
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

    amazon: {
      url: "https://amzn.to/4zr0Omy",
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

    amazon: {
      url: "https://amzn.to/3SnEoBM",
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
