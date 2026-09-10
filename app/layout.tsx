import type {
  Metadata,
  Viewport,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";

import LoginAnalyticsTracker from "./components/LoginAnalyticsTracker";

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: [
    "latin",
  ],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: [
      "latin",
    ],
  });

const GA_MEASUREMENT_ID =
  process.env
    .NEXT_PUBLIC_GA_MEASUREMENT_ID
    ?.trim() ??
  "";

const ADSENSE_CLIENT =
  process.env
    .NEXT_PUBLIC_ADSENSE_CLIENT
    ?.trim() ??
  "ca-pub-9603801363980131";

export const metadata: Metadata = {
  metadataBase:
    new URL(
      "https://akanukeai.com",
    ),

  title:
    "メンズ垢抜けAI診断｜AKANUKE.AI",

  description:
    "AIがあなたの魅力を分析し、髪型・眉毛・肌・印象から、あなただけの垢抜けプランを提案する男性向け美容AIサービス。",

  keywords: [
    "垢抜け メンズ",
    "メンズ 美容",
    "垢抜け メンズメイク",
    "男性 垢抜け",
    "AI垢抜け診断",
  ],

  applicationName:
    "AKANUKE.AI",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "google-adsense-account":
      ADSENSE_CLIENT,
  },

  openGraph: {
    title:
      "AKANUKE.AI｜第一印象は、変えられる。",

    description:
      "AIが、あなただけの垢抜けプランを提案。男性向け美容AIサービス AKANUKE.AI。",

    url:
      "https://akanukeai.com",

    siteName:
      "AKANUKE.AI",

    locale:
      "ja_JP",

    type:
      "website",

    images: [
      {
        url:
          "/ogp/akanuke-ai-og-v4.png",

        width:
          1200,

        height:
          630,

        alt:
          "AKANUKE.AI｜第一印象は、変えられる。",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "AKANUKE.AI｜第一印象は、変えられる。",

    description:
      "AIが、あなただけの垢抜けプランを提案。男性向け美容AIサービス AKANUKE.AI。",

    images: [
      "/ogp/akanuke-ai-og-v4.png",
    ],
  },

  appleWebApp: {
    capable:
      true,

    title:
      "AKANUKE.AI",

    statusBarStyle:
      "default",
  },

  icons: {
    apple: [
      {
        url:
          "/apple-icon.png",

        sizes:
          "1024x1024",

        type:
          "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  themeColor:
    "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <LoginAnalyticsTracker />
        </Suspense>

        {children}

        {process.env.NODE_ENV ===
          "production" &&
          GA_MEASUREMENT_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />

              <Script
                id="google-analytics"
                strategy="afterInteractive"
              >
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `}
              </Script>
            </>
          )}

        {process.env.NODE_ENV ===
          "production" &&
          ADSENSE_CLIENT && (
            <Script
              id="google-adsense"
              async
              strategy="afterInteractive"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          )}
      </body>
    </html>
  );
}