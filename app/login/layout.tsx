import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ログイン｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginLayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({
  children,
}: LoginLayoutProps) {
  return <>{children}</>;
}