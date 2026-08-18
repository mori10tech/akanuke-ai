"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DiagnosisRow } from "../../lib/diagnoses/types";

const IMAGE_STORAGE_KEY = "akanukeImage";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";
const DIAGNOSIS_ID_STORAGE_KEY = "akanukeDiagnosisId";
const RESULT_BACK_HREF_STORAGE_KEY = "akanukeResultBackHref";
const SAVED_AFTER_IMAGE_STORAGE_KEY = "akanukeSavedAfterImageUrl";

type HistoryResultButtonProps = {
  diagnosisId: string;
};

export default function HistoryResultButton({
  diagnosisId,
}: HistoryResultButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleClick() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/diagnoses/${diagnosisId}`, {
        cache: "no-store",
      });

      const data = (await response.json()) as {
        diagnosis?: DiagnosisRow;
        error?: string;
      };

      if (!response.ok || !data.diagnosis) {
        throw new Error(
          data.error ?? "診断結果を取得できませんでした。",
        );
      }

      window.sessionStorage.setItem(
        RESULT_STORAGE_KEY,
        JSON.stringify(data.diagnosis.analysis),
      );
      window.sessionStorage.setItem(
        DIAGNOSIS_ID_STORAGE_KEY,
        data.diagnosis.id,
      );
      window.sessionStorage.setItem(
        RESULT_BACK_HREF_STORAGE_KEY,
        "/history",
      );

      if (data.diagnosis.beforeImageUrl) {
        window.sessionStorage.setItem(
          IMAGE_STORAGE_KEY,
          data.diagnosis.beforeImageUrl,
        );
      } else {
        window.sessionStorage.removeItem(IMAGE_STORAGE_KEY);
      }

      if (data.diagnosis.afterImageUrl) {
        window.sessionStorage.setItem(
          SAVED_AFTER_IMAGE_STORAGE_KEY,
          data.diagnosis.afterImageUrl,
        );
      } else {
        window.sessionStorage.removeItem(
          SAVED_AFTER_IMAGE_STORAGE_KEY,
        );
      }

      router.push("/result");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "診断結果を取得できませんでした。",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="flex min-h-[46px] w-full items-center justify-between rounded-[12px] border border-black/10 bg-white px-4 text-[12px] font-black transition hover:border-[#1677FF] hover:bg-[#EEF6FF] disabled:cursor-wait disabled:opacity-60"
      >
        {isLoading ? "読み込み中…" : "診断結果を詳しく見る"}
        <span aria-hidden="true" className="text-lg">
          ›
        </span>
      </button>

      {errorMessage && (
        <p className="mt-2 text-[10px] font-bold text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
