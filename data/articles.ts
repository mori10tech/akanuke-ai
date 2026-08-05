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
    slug: "mens-akanuke-guide",
    title:
      "【2026年版】メンズ垢抜け完全ガイド｜今日からできる12の方法",
    description:
      "男性が垢抜けるために必要な髪型・眉毛・スキンケア・ヒゲ・服装・姿勢など、今日から実践できる方法を初心者向けに解説します。",
    category: "メンズ垢抜け",
    publishedAt: "2026-08-05",
    readingTime: "約10分",
    image: "/articles/mens-akanuke-guide.jpg",
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