import Link from "next/link";

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

type AuthHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export default function AuthHeader({
  backHref = "/",
  backLabel = "トップページへ戻る",
}: AuthHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
      <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
        <Link
          href={backHref}
          aria-label={backLabel}
          className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#EEF6FF] active:scale-95"
        >
          <ArrowLeftIcon />
        </Link>

        <Link
          href="/"
          className="text-center text-[20px] font-black tracking-[-0.03em]"
        >
          AKANUKE.AI
        </Link>

        <div aria-hidden="true" />
      </div>
    </header>
  );
}