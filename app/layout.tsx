import type {
  Metadata,
  Viewport,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import Script from "next/script";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://akanukeai.com",
  ),

  title:
    "AKANUKE.AI｜第一印象は、変えられる。",

  description:
    "AIがあなたの魅力を分析し、髪型・眉毛・肌・印象から、あなただけの垢抜けプランを提案する男性向け美容AIサービス。",

  applicationName:
    "AKANUKE.AI",

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
          "/ogp/akanuke-ai-og.png",
        width: 1200,
        height: 630,
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
      "/ogp/akanuke-ai-og.png",
    ],
  },

  appleWebApp: {
    capable: true,
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
  initialScale: 1,
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
        {children}

        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1051975714621683"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}