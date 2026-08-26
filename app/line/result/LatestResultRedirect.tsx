"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DiagnosisRow } from "../../../lib/diagnoses/types";

const IMAGE_STORAGE_KEY =
  "akanukeImage";

const RESULT_STORAGE_KEY =
  "akanukeAnalysisResult";

const DIAGNOSIS_ID_STORAGE_KEY =
  "akanukeDiagnosisId";

const RESULT_BACK_HREF_STORAGE_KEY =
  "akanukeResultBackHref";

const SAVED_AFTER_IMAGE_STORAGE_KEY =
  "akanukeSavedAfterImageUrl";

type LatestResultRedirectProps = {
  diagnosisId: string;
};

export default function LatestResultRedirect({
  diagnosisId,
}: LatestResultRedirectProps) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadLatestDiagnosis() {
      try {
        const response = await fetch(
          `/api/diagnoses/${diagnosisId}`,
          {
            cache: "no-store",
          },
        );

        const data =
          (await response.json()) as {
            diagnosis?: DiagnosisRow;
            error?: string;
          };

        if (
          !response.ok ||
          !data.diagnosis
        ) {
          throw new Error(
            data.error ??
              "診断結果を取得できませんでした。",
          );
        }

        const diagnosis =
          data.diagnosis;

        window.sessionStorage.setItem(
          RESULT_STORAGE_KEY,
          JSON.stringify(
            diagnosis.analysis,
          ),
        );

        window.sessionStorage.setItem(
          DIAGNOSIS_ID_STORAGE_KEY,
          diagnosis.id,
        );

        window.sessionStorage.setItem(
          RESULT_BACK_HREF_STORAGE_KEY,
          "/dashboard",
        );

        if (
          diagnosis.beforeImageUrl
        ) {
          window.sessionStorage.setItem(
            IMAGE_STORAGE_KEY,
            diagnosis.beforeImageUrl,
          );
        } else {
          window.sessionStorage.removeItem(
            IMAGE_STORAGE_KEY,
          );
        }

        if (
          diagnosis.afterImageUrl
        ) {
          window.sessionStorage.setItem(
            SAVED_AFTER_IMAGE_STORAGE_KEY,
            diagnosis.afterImageUrl,
          );
        } else {
          window.sessionStorage.removeItem(
            SAVED_AFTER_IMAGE_STORAGE_KEY,
          );
        }

        router.replace("/result");
      } catch (error) {
        console.error(
          "[AKANUKE.AI] LINE診断結果読み込みエラー:",
          error,
        );

        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "診断結果を取得できませんでした。",
        );
      }
    }

    loadLatestDiagnosis();

    return () => {
      isMounted = false;
    };
  }, [diagnosisId, router]);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center border-x border-black/5 bg-white px-6">
        <div className="w-full text-center">
          {errorMessage ? (
            <>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[22px] text-red-500">
                !
              </span>

              <h1 className="mt-5 text-[18px] font-black">
                診断結果を読み込めませんでした
              </h1>

              <p className="mt-3 text-[12px] leading-6 text-black/50">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() =>
                  router.replace(
                    "/history",
                  )
                }
                className="mt-6 min-h-[50px] w-full rounded-[13px] bg-[#1677FF] px-5 text-[13px] font-black text-white"
              >
                診断履歴を確認する
              </button>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-[20px] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
  <Image
    src="/icon-512.png"
    alt="AKANUKE.AI"
    width={80}
    height={80}
    priority
    className="h-full w-full object-cover"
  />
</div>

              <p className="mt-5 text-[11px] font-black tracking-[0.14em] text-[#1677FF]">
                LOADING RESULT
              </p>

              <h1 className="mt-2 text-[19px] font-black">
                最新の診断結果を読み込んでいます
              </h1>

              <p className="mt-3 text-[11px] leading-5 text-black/45">
                そのまま少しお待ちください。
              </p>

              <div className="mx-auto mt-6 h-6 w-6 animate-spin rounded-full border-2 border-[#1677FF]/20 border-t-[#1677FF]" />
            </>
          )}
        </div>
      </div>
    </main>
  );
}