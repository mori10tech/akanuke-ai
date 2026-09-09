import Link from "next/link";

type JournalArticleFooterNavProps = {
  secondaryHref: string;
  secondaryLabel: string;
  secondaryVariant?: "article" | "diagnosis";
};

export default function JournalArticleFooterNav({
  secondaryHref,
  secondaryLabel,
  secondaryVariant = "article",
}: JournalArticleFooterNavProps) {
  const isDiagnosis =
    secondaryVariant === "diagnosis";

  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
      <Link
        href="/media"
        className="group flex min-h-[52px] flex-1 items-center justify-center rounded-[13px] border border-black/10 bg-white px-5 text-[12px] font-black text-[#111111] shadow-[0_6px_18px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] active:translate-y-0 active:scale-[0.98]"
      >
        <span
          aria-hidden="true"
          className="mr-2 transition-transform duration-200 group-hover:-translate-x-1"
        >
          ←
        </span>

        <span>
          記事一覧へ戻る
        </span>
      </Link>

      <Link
        href={secondaryHref}
        className={
          isDiagnosis
            ? "group flex min-h-[52px] flex-1 items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[12px] font-black text-[#111111] shadow-[0_8px_22px_rgba(255,212,0,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,212,0,0.28)] active:translate-y-0 active:scale-[0.98]"
            : "group flex min-h-[52px] flex-1 items-center justify-center rounded-[13px] bg-[#1677FF] px-5 text-[12px] font-black text-white shadow-[0_8px_22px_rgba(22,119,255,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(22,119,255,0.28)] active:translate-y-0 active:scale-[0.98]"
        }
      >
        <span>
          {secondaryLabel}
        </span>

        <span
          aria-hidden="true"
          className={
            isDiagnosis
              ? "ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 group-hover:translate-x-1"
              : "ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-1"
          }
        >
          <span className="-translate-y-px">
  →
</span>
        </span>
      </Link>
    </div>
  );
}