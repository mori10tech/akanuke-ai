import Link from "next/link";
import AppLogo from "./AppLogo";

type AppHeaderProps = {
  backHref?: string;
  backLabel?: string;
  sticky?: boolean;
};

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[21px] w-[21px]"
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

export default function AppHeader({
  backHref,
  backLabel = "前のページへ戻る",
  sticky = true,
}: AppHeaderProps) {
  return (
    <header
      className={`${
        sticky ? "sticky top-0" : "relative"
      } z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl`}
    >
      <div className="mx-auto grid h-[68px] w-full max-w-[480px] grid-cols-[44px_1fr_44px] items-center px-4">
        {backHref ? (
          <Link
            href={backHref}
            aria-label={backLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EEF6FF] active:scale-95"
          >
            <ArrowLeftIcon />
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}

        <div className="flex justify-center">
          <AppLogo />
        </div>

        <div aria-hidden="true" />
      </div>
    </header>
  );
}
