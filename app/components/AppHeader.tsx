"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import AppLogo from "./AppLogo";

type AppHeaderProps = {
  backHref?: string;
  backLabel?: string;
  sticky?: boolean;

  /*
   * "href"
   * → backHrefで指定した安全なページへ戻る
   *
   * "history"
   * → 実際のブラウザ履歴へ戻る
   *    履歴がない場合はbackHrefへ戻る
   */
  backMode?: "href" | "history";
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

const backButtonClassName =
  "flex h-10 w-10 items-center justify-center rounded-full text-[#111111] transition-[transform,background-color,color] duration-150 ease-out hover:bg-[#EEF6FF] active:scale-[0.94] active:bg-[#DCEBFF] active:text-[#1677FF]";

export default function AppHeader({
  backHref,
  backLabel = "前のページへ戻る",
  sticky = true,
  backMode = "href",
}: AppHeaderProps) {
  const router = useRouter();

  const handleHistoryBack = () => {
    /*
     * 履歴がある場合は、
     * 実際にユーザーが来たページへ戻します。
     */
    if (window.history.length > 1) {
      router.back();
      return;
    }

    /*
     * 直接URLを開いた場合など、
     * 戻れる履歴がない場合の安全な戻り先です。
     */
    if (backHref) {
      router.push(backHref);
    }
  };

  const backButton =
    !backHref && backMode === "href" ? (
      <div aria-hidden="true" />
    ) : backMode === "history" ? (
      <button
        type="button"
        onClick={handleHistoryBack}
        aria-label={backLabel}
        className={backButtonClassName}
      >
        <ArrowLeftIcon />
      </button>
    ) : (
      <Link
        href={backHref ?? "/"}
        aria-label={backLabel}
        className={backButtonClassName}
      >
        <ArrowLeftIcon />
      </Link>
    );

  return (
    <header
      className={`${
        sticky
          ? "sticky top-0"
          : "relative"
      } z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl`}
    >
      <div className="mx-auto grid h-[68px] w-full max-w-[480px] grid-cols-[44px_1fr_44px] items-center px-4">
        {backButton}

        <div className="flex justify-center">
          <AppLogo />
        </div>

        <div aria-hidden="true" />
      </div>
    </header>
  );
}