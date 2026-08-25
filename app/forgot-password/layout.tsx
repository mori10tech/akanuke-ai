import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "パスワード再設定｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type ForgotPasswordLayoutProps = {
  children: ReactNode;
};

export default function ForgotPasswordLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return <>{children}</>;
}