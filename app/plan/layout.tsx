import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "垢抜けプラン｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type PlanLayoutProps = {
  children: ReactNode;
};

export default function PlanLayout({
  children,
}: PlanLayoutProps) {
  return <>{children}</>;
}