import type { MetadataRoute } from "next";

const BASE_URL = "https://akanukeai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/media",
        "/media/",
      ],
      disallow: [
        "/upload",
        "/analyzing",
        "/result",
        "/dashboard",
        "/history",
        "/plan",
        "/products",
        "/login",
        "/forgot-password",
        "/auth",
        "/api",
      ],
    },

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}