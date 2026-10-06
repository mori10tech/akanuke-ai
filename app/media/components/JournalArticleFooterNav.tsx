"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useState,
  type MouseEvent,
} from "react";

const DIAGNOSIS_LIFF_URL =
  "https://liff.line.me/2011169942-wf6MoEy4?next=%2Fupload";

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
  const [isDiagnosisQrOpen, setIsDiagnosisQrOpen] =
    useState(false);

  const isDiagnosis =
    secondaryVariant === "diagnosis";

  const handleDiagnosisStart = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (!isDiagnosis) {
      return;
    }

    const isDesktop =
      window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop) {
      event.preventDefault();
      setIsDiagnosisQrOpen(true);
    }
  };

  const resolvedSecondaryHref =
    isDiagnosis
      ? DIAGNOSIS_LIFF_URL
      : secondaryHref;

  return (
    <>
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
          href={resolvedSecondaryHref}
          onClick={handleDiagnosisStart}
          prefetch={false}
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

      {isDiagnosisQrOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="journal-footer-diagnosis-qr-title"
          onClick={() => setIsDiagnosisQrOpen(false)}
        >
          <div
            className="relative w-full max-w-[460px] rounded-[28px] bg-white px-8 py-9 text-center shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="閉じる"
              onClick={() => setIsDiagnosisQrOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-black/[0.05] text-[22px] font-medium text-black/60 transition hover:bg-black/10"
            >
              ×
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-[14px] shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
              <Image
                src="/icon-512.png"
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>

            <h2
              id="journal-footer-diagnosis-qr-title"
              className="mt-5 text-[24px] font-black leading-[1.4] tracking-[-0.04em] text-[#111111]"
            >
              診断はスマートフォンから
              <br />
              ご利用ください
            </h2>

            <p className="mt-4 text-[14px] font-medium leading-7 text-black/60">
              QRコードをスマートフォンで読み取ると、
              <br />
              LINEからすぐに診断を開始できます。
            </p>

            <div className="mx-auto mt-7 w-fit rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <Image
                src="/akanuke-liff-diagnosis-qr.png"
                alt="AKANUKE.AIの診断をスマートフォンで開くQRコード"
                width={220}
                height={220}
                className="h-[220px] w-[220px]"
              />
            </div>

            <p className="mt-5 text-[12px] font-medium leading-6 text-black/45">
              LINEアプリがインストールされた
              <br />
              スマートフォンで読み取ってください。
            </p>
          </div>
        </div>
      )}
    </>
  );
}