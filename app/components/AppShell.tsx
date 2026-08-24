import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
  background?: "white" | "gray";
};

export default function AppShell({
  children,
  background = "gray",
}: AppShellProps) {
  const backgroundClass =
    background === "white"
      ? "bg-white"
      : "bg-[#F8FAFC]";

  return (
    <main className="min-h-screen bg-[#EEF6FF] text-[#111111]">
      <div
        className={`mx-auto min-h-screen w-full max-w-[480px] overflow-x-clip ${backgroundClass} shadow-[0_0_40px_rgba(15,23,42,0.08)]`}
      >
        <div className="min-h-screen pb-24">
          {children}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}