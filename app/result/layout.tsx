import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "診断結果｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type ResultLayoutProps = {
  children: ReactNode;
};

export default function ResultLayout({
  children,
}: ResultLayoutProps) {
  return <>{children}</>;
}