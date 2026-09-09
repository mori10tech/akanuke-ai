import Link from "next/link";

type JournalDiagnosisCtaProps = {
  audienceLabel?: string;
};

export default function JournalDiagnosisCta({
  audienceLabel = "メンズ向け",
}: JournalDiagnosisCtaProps) {
  return (
    <>
      <Link
        href="/upload"
        className="group mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_24px_rgba(255,212,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,212,0,0.3)] active:scale-[0.98]"
      >
        <span>
          無料で診断をはじめる
        </span>

        <span
          aria-hidden="true"
          className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
        >
          <span className="-translate-y-px">
  ›
</span>
        </span>
      </Link>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-black/60">
        <span>約1分で完了</span>
        <span>無料で利用可能</span>
        <span>{audienceLabel}</span>
      </div>
    </>
  );
}