import type { MetadataRoute } from "next";

import { getAllArticles } from "../data/articles";

const BASE_URL = "https://akanukeai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/media`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map(
    (article) => ({
      url: `${BASE_URL}/media/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  return [...staticPages, ...articlePages];
}