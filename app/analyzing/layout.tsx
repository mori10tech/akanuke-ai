import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI診断中｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type AnalyzingLayoutProps = {
  children: ReactNode;
};

export default function AnalyzingLayout({
  children,
}: AnalyzingLayoutProps) {
  return <>{children}</>;
}