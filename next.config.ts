import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/media",
        permanent: true,
      },
      {
        source: "/articles/:path*",
        destination: "/media/:path*",
        permanent: true,
      },
      /*
       * Instagramプロフィールリンク用の短縮URL
       * 流入元をGA4で計測するためUTM付きのトップページへ転送する
       * 転送先を後から変更できるよう一時リダイレクト（307）にする
       */
      {
        source: "/ig",
        destination:
          "/?utm_source=instagram&utm_medium=social&utm_campaign=profile",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value:
              "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;