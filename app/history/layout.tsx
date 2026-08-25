import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "診断履歴｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type HistoryLayoutProps = {
  children: ReactNode;
};

export default function HistoryLayout({
  children,
}: HistoryLayoutProps) {
  return <>{children}</>;
}