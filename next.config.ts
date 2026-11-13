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
       * utm_sourceはInstagramが自動付与する「ig」に表記を合わせる
       */
      {
        source: "/ig",
        destination:
          "/?utm_source=ig&utm_medium=social&utm_campaign=profile",
        permanent: false,
      },
      /*
       * X（AKANUKE JOURNALアカウント）用の短縮URL
       * 投稿やプロフィールにUTMパラメータが見えないようにする
       * /x は記事一覧（プロフィールリンク用）、/x/記事slug は各記事へ転送する
       * 転送先を後から変更できるよう一時リダイレクト（307）にする
       */
      {
        source: "/x",
        destination:
          "/media?utm_source=x&utm_medium=social&utm_campaign=journal_profile",
        permanent: false,
      },
      {
        source: "/x/:slug",
        destination:
          "/media/:slug?utm_source=x&utm_medium=social&utm_campaign=journal",
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