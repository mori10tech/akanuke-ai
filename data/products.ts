export type ProductCategory =
  | "uv"
  | "skincare"
  | "hair"
  | "eyebrow"
  | "shaving";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  recommendedFor: string;
  amazonUrl: string;
};

export const products: Product[] = [
  {
    id: "mens-biore-one-bb-uv",
    name: "メンズビオレONE BB&UVクリーム",
    brand: "メンズビオレ",
    category: "uv",
    description:
      "UV対策をしながら、肌を自然にきれいに見せたい男性向けのBB&UVクリーム。",
    recommendedFor:
      "紫外線対策と肌印象をまとめて整えたい人に",
    amazonUrl: "https://amzn.to/3TyfKyS",
  },
  {
    id: "biore-uv-aqua-rich-watery-essence",
    name: "ビオレUV アクアリッチ ウォータリーエッセンス",
    brand: "ビオレUV",
    category: "uv",
    description:
      "毎日の紫外線対策に取り入れやすい、定番のUVケアアイテム。",
    recommendedFor:
      "まずは毎日のUV対策を習慣にしたい人に",
    amazonUrl: "https://amzn.to/4wRs9wE",
  },
  {
    id: "anessa-perfect-uv-skincare-milk-na",
    name: "アネッサ UV スキンケアミルク NA",
    brand: "アネッサ",
    category: "uv",
    description:
      "しっかり紫外線対策をしたい日に取り入れやすいUVケアアイテム。",
    recommendedFor:
      "屋外で過ごす時間が長く、UV対策を重視したい人に",
    amazonUrl: "https://amzn.to/4bU8ovZ",
  },
];