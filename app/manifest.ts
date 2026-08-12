import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AKANUKE.AI",
    short_name: "AKANUKE.AI",
    description:
      "AIがあなたの魅力を分析し、垢抜けるための改善ポイントを提案する男性向け美容AIサービス。",

    start_url: "/",
    scope: "/",

    display: "standalone",

    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",

    orientation: "portrait",

    icons: [
      {
        src: "/apple-icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}