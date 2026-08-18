import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const adsenseClient =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? "";

const hasValidAdsenseClient =
  /^ca-pub-\d{16}$/.test(adsenseClient);

const canLoadAdsense =
  process.env.NODE_ENV === "production" && hasValidAdsenseClient;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akanukeai.com"),

  title: {
    default: "AKANUKE.AI",
    template: "%s | AKANUKE.AI",
  },

  description:
    "AIがあなたの魅力を分析し、垢抜けるための改善ポイントを提案する男性向け美容AIサービス。",

  applicationName: "AKANUKE.AI",

  appleWebApp: {
    capable: true,
    title: "AKANUKE.AI",
    statusBarStyle: "default",
  },

  icons: {
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {hasValidAdsenseClient && (
          <meta
            name="google-adsense-account"
            content={adsenseClient}
          />
        )}
      </head>

      <body className="flex min-h-full flex-col">
        {children}

        {canLoadAdsense && (
          <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}
