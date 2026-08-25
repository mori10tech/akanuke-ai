import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "おすすめ商品｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({
  children,
}: ProductsLayoutProps) {
  return <>{children}</>;
}