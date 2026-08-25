import type { Metadata } from "next";
import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "マイページ｜AKANUKE.AI",
  robots: {
    index: false,
    follow: false,
  },
};

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <>{children}</>;
}