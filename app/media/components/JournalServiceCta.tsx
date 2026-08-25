import Link from "next/link";

export default function JournalServiceCta() {
  return (
    <Link
      href="/"
      scroll={true}
      className="group flex min-h-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[11px] font-black text-[#111111] shadow-[0_8px_20px_rgba(255,212,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(255,212,0,0.28)] active:scale-[0.98] sm:min-h-[48px] sm:px-6 sm:text-[12px]"
    >
      <span className="whitespace-nowrap">
        AKANUKE.AIを見る
      </span>

      <span
        aria-hidden="true"
        className="ml-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
      >
        ›
      </span>
    </Link>
  );
}