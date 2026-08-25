import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "無料AI診断｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type UploadLayoutProps = {
  children: ReactNode;
};

export default function UploadLayout({
  children,
}: UploadLayoutProps) {
  return <>{children}</>;
}