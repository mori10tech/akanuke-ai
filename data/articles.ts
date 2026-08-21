export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  image: string;
  keywords: string[];
};

export const articles: Article[] = [
  {
  slug: "mens-akanuke-hairstyle",
  title:
    "メンズが垢抜ける髪型｜似合う髪型の選び方と美容室での頼み方",
  description:
    "垢抜けたい男性向けに、似合う髪型の選び方や美容室で失敗しにくい頼み方を解説。顔型・髪質・清潔感を意識した髪型選びのポイントを初心者向けに紹介します。",
  category: "髪型",
  publishedAt: "2026-08-21",
  readingTime: "約8分",
  image: "/media/mens-akanuke-hairstyle-v2.png",
  keywords: [
    "メンズ 垢抜け 髪型",
    "男 垢抜け 髪型",
    "似合う髪型 メンズ",
    "美容室 頼み方 メンズ",
    "髪型 垢抜け 男",
  ],
},
  {
    slug: "akanukenai-man-features",
    title:
      "垢抜けない男の特徴10選｜なぜ変わらない？改善ポイントも解説",
    description:
      "垢抜けたいのになぜか変わらない男性に共通しやすい特徴を10個紹介。髪型・眉毛・肌・服装・清潔感など、今日から見直せる改善ポイントを初心者向けに解説します。",
    category: "メンズ垢抜け",
    publishedAt: "2026-08-21",
    readingTime: "約8分",
    image: "/media/akanukenai-man-features-v2.png",
    keywords: [
      "垢抜けない 男",
      "垢抜けない 男 特徴",
      "垢抜けない 原因 男",
      "垢抜けない人 特徴 男",
      "男 垢抜ける 方法",
    ],
  },
  {
    slug: "mens-akanuke-guide",
    title:
      "【2026年版】メンズ垢抜け完全ガイド",
    description:
      "男性が垢抜けるために必要な髪型・眉毛・スキンケア・心象改善までを初心者向けに分かりやすく解説します。",
    category: "メンズ垢抜け",
    publishedAt: "2026-08-05",
    readingTime: "約10分",
    image: "/media/mens-akanuke-guide.jpg",
    keywords: [
      "メンズ 垢抜け",
      "男性 垢抜け 方法",
      "メンズ 美容",
      "清潔感 男性",
      "垢抜けたい 男",
    ],
  },
];

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(
  slug: string,
): Article | undefined {
  return articles.find((article) => article.slug === slug);
}