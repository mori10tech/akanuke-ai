"use client";

import Image from "next/image";
import { useState } from "react";

const DIAGNOSIS_LIFF_URL =
  "https://liff.line.me/2011169942-wf6MoEy4?next=%2Fupload";

type JournalDiagnosisCtaProps = {
  audienceLabel?: string;
};

export default function JournalDiagnosisCta({
  audienceLabel = "メンズ向け",
}: JournalDiagnosisCtaProps) {
  const [isDiagnosisQrOpen, setIsDiagnosisQrOpen] =
    useState(false);

  const handleDiagnosisStart = () => {
    const isDesktop =
      window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop) {
      setIsDiagnosisQrOpen(true);
      return;
    }

    window.location.href = DIAGNOSIS_LIFF_URL;
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDiagnosisStart}
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
      </button>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-black/60">
        <span>約1分で完了</span>
        <span>無料で利用可能</span>
        <span>{audienceLabel}</span>
      </div>

      {isDiagnosisQrOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="journal-diagnosis-qr-title"
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
              id="journal-diagnosis-qr-title"
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