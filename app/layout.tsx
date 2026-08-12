import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        sizes: "180x180",
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
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}