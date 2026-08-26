"use client";

/* eslint-disable react-hooks/set-state-in-effect -- sessionStorageとIndexedDBの状態を初回表示時に復元するため */

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import AppShell from "../components/AppShell";
import AdSenseAd from "../components/AdSenseAd";
import type { AkanukeAnalysis } from "../../lib/openai/schemas";
import {
  loadAfterImage,
  saveAfterImage,
} from "../../lib/client/afterImageStore";
import AppHeader from "../components/AppHeader";

import ShareResultButton from "./ShareResultButton";

const IMAGE_STORAGE_KEY = "akanukeImage";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";
const PROGRESS_ANIMATION_STORAGE_KEY = "akanukeProgressAnimationResult";
const DIAGNOSIS_ID_STORAGE_KEY = "akanukeDiagnosisId";
const RESULT_BACK_HREF_STORAGE_KEY = "akanukeResultBackHref";
const SAVED_AFTER_IMAGE_STORAGE_KEY = "akanukeSavedAfterImageUrl";

function createResultAnimationId(
  rawResult: string,
) {
  let hash = 0;

  for (
    let index = 0;
    index < rawResult.length;
    index += 1
  ) {
    hash =
      (hash * 31 +
        rawResult.charCodeAt(index)) |
      0;
  }

  return `${rawResult.length}:${hash}`;
}

const GOAL_PROGRESS = 100;

const priorityLabels = [
  "最優先",
  "効果が高い",
  "継続改善",
] as const;

const AFTER_PROGRESS_MAX_BEFORE_COMPLETE = 94;

function getAfterGenerationProgress(
  elapsedSeconds: number,
) {
  if (elapsedSeconds < 5) {
    return 6 + elapsedSeconds * 2;
  }

  if (elapsedSeconds < 15) {
    return 16 + (elapsedSeconds - 5) * 1.7;
  }

  if (elapsedSeconds < 30) {
    return 33 + (elapsedSeconds - 15) * 1.4;
  }

  if (elapsedSeconds < 50) {
    return 54 + (elapsedSeconds - 30) * 0.95;
  }

  if (elapsedSeconds < 75) {
    return 73 + (elapsedSeconds - 50) * 0.56;
  }

  return Math.min(
    AFTER_PROGRESS_MAX_BEFORE_COMPLETE,
    87 +
    Math.floor(
      (elapsedSeconds - 75) / 10,
    ),
  );
}

function getAfterGenerationStage(
  elapsedSeconds: number,
) {
  if (elapsedSeconds < 8) {
    return "元写真と診断内容を確認しています";
  }

  if (elapsedSeconds < 20) {
    return "あなたに合う髪型・眉を設計しています";
  }

  if (elapsedSeconds < 40) {
    return "肌・青ヒゲ・清潔感を整えています";
  }

  if (elapsedSeconds < 65) {
    return "本人らしさを保ちながら仕上げています";
  }

  return "Afterイメージを最終調整しています";
}


function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
        <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" />
        <path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    scissors: (
      <>
        <circle cx="6" cy="7" r="2.5" />
        <circle cx="6" cy="17" r="2.5" />
        <path d="m8.2 8.2 11.3 8.3" />
        <path d="m8.2 15.8 11.3-8.3" />
      </>
    ),
    calendar: (
      <>
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
        />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function CircularProgress({
  progress,
}: {
  progress: number;
}) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-[112px] w-[112px]">
      <svg
        viewBox="0 0 104 104"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
        />

        <circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke="#1677FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-end gap-0.5">
          <span className="text-[34px] font-black leading-none tracking-[-0.06em] text-[#1677FF]">
            {progress}
          </span>

          <span className="pb-0.5 text-[10px] font-black text-[#1677FF]">
            %
          </span>
        </div>

        <span className="mt-1 text-[7px] font-bold tracking-[0.12em] text-black/35">
          CURRENT
        </span>
      </div>
    </div>
  );
}

function AnalysisDetail({
  title,
  observation,
  advice,
}: {
  title: string;
  observation: string;
  advice: string;
}) {
  return (
    <article className="rounded-[18px] border border-black/10 bg-white p-4">
      <h3 className="text-[13px] font-black text-[#111111]">
        {title}
      </h3>

      <div className="mt-3">
        <p className="text-[9px] font-black tracking-[0.1em] text-black/35">
          CURRENT
        </p>

        <p className="mt-1 text-[12px] leading-6 text-black/65">
          {observation}
        </p>
      </div>

      <div className="mt-3 rounded-[12px] bg-[#EEF6FF] p-3">
        <p className="text-[9px] font-black tracking-[0.1em] text-[#1677FF]">
          ADVICE
        </p>

        <p className="mt-1 text-[12px] leading-6 text-black/70">
          {advice}
        </p>
      </div>
    </article>
  );
}

export default function ResultPage() {
  const afterRequestStartedRef = useRef(false);

  const afterProgressTimerRef =
    useRef<number | null>(null);

  const afterProgressValueRef =
    useRef(0);

  const [image, setImage] =
    useState<string | null>(null);

  const [analysis, setAnalysis] =
    useState<AkanukeAnalysis | null>(null);

  const [rawAnalysisResult, setRawAnalysisResult] =
    useState("");

  const [afterImage, setAfterImage] =
    useState<string | null>(null);

  const [
    hasCheckedSavedAfter,
    setHasCheckedSavedAfter,
  ] = useState(false);

  const [isGeneratingAfter, setIsGeneratingAfter] =
    useState(false);

  const [
    afterGenerationProgress,
    setAfterGenerationProgress,
  ] = useState(0);

  const [
    afterElapsedSeconds,
    setAfterElapsedSeconds,
  ] = useState(0);

  const [afterError, setAfterError] =
    useState("");

  const [afterRetryCount, setAfterRetryCount] =
    useState(0);

  const [
    displayProgress,
    setDisplayProgress,
  ] = useState(0);

  const [isReady, setIsReady] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  const [isHistoryView, setIsHistoryView] =
    useState(false);

  useEffect(() => {
    const savedImage =
      window.sessionStorage.getItem(
        IMAGE_STORAGE_KEY,
      );

    const rawResult =
      window.sessionStorage.getItem(
        RESULT_STORAGE_KEY,
      );

    const savedAfterImageUrl =
      window.sessionStorage.getItem(
        SAVED_AFTER_IMAGE_STORAGE_KEY,
      );

    const savedBackHref =
      window.sessionStorage.getItem(
        RESULT_BACK_HREF_STORAGE_KEY,
      );

    if (savedAfterImageUrl) {
      setAfterImage(savedAfterImageUrl);
    }

    if (savedBackHref === "/history") {
      setIsHistoryView(true);
    }

    if (!rawResult) {
      setImage(savedImage);

      setLoadError(
        "診断結果が見つかりません。もう一度AI診断を実行してください。",
      );

      setIsReady(true);
      return;
    }

    try {
      const parsed =
        JSON.parse(
          rawResult,
        ) as AkanukeAnalysis;

      setImage(savedImage);
      setAnalysis(parsed);
      setRawAnalysisResult(rawResult);
      setIsReady(true);

      const targetProgress =
        Math.max(
          0,
          Math.min(
            100,
            Math.round(
              parsed.progress,
            ),
          ),
        );

      const animationResultId =
        createResultAnimationId(rawResult);

      const previousAnimationResultId =
        window.sessionStorage.getItem(
          PROGRESS_ANIMATION_STORAGE_KEY,
        );

            if (
        previousAnimationResultId ===
        animationResultId
      ) {
        setDisplayProgress(targetProgress);
        return;
      }

      /*
       * 初回表示では0%から診断結果まで
       * AKANUKE PROGRESSをアニメーションさせます。
       *
       * 表示済み判定はアニメーション完了後に保存します。
       * 開始前に保存すると、React Strict Modeで
       * useEffectが再実行された際に初回でも
       * 「表示済み」と判定されるためです。
       */
      setDisplayProgress(0);

      const duration = 1400;
      const startedAt = performance.now();

      let frame = 0;

      const animate = (now: number) => {
        const progress = Math.min(
          (now - startedAt) / duration,
          1,
        );

        const eased =
          1 - Math.pow(1 - progress, 3);

        setDisplayProgress(
          Math.round(
            targetProgress * eased,
          ),
        );

        if (progress < 1) {
          frame =
            window.requestAnimationFrame(
              animate,
            );

          return;
        }

        /*
         * アニメーションを最後まで表示した時点で
         * この診断結果を「表示済み」とします。
         *
         * 次回同じ診断結果を開いた場合は、
         * アニメーションせず最終値を固定表示します。
         */
        window.sessionStorage.setItem(
          PROGRESS_ANIMATION_STORAGE_KEY,
          animationResultId,
        );

        setDisplayProgress(
          targetProgress,
        );
      };

      frame =
        window.requestAnimationFrame(
          animate,
        );

      return () => {
        window.cancelAnimationFrame(
          frame,
        );
      };

    } catch (error) {
      console.error(
        "Result parse error:",
        error,
      );

      setImage(savedImage);

      setLoadError(
        "診断結果を読み込めませんでした。もう一度AI診断を実行してください。",
      );

      setIsReady(true);
    }
  }, []);

  /*
* 同じ診断結果のAfter画像がIndexedDBに保存されている場合は、
* 保存済み画像を復元してAPIの再実行を防ぎます。
*/
  useEffect(() => {
    if (
      !isReady ||
      !rawAnalysisResult
    ) {
      return;
    }

    let isCancelled = false;

    async function restoreSavedAfterImage() {
      try {
        const savedAfterImage =
          await loadAfterImage(
            rawAnalysisResult,
          );

        if (isCancelled) {
          return;
        }

        if (savedAfterImage) {
          setAfterImage(
            savedAfterImage,
          );

          afterProgressValueRef.current =
            100;

          setAfterGenerationProgress(
            100,
          );
        }
      } catch (error) {
        console.warn(
          "[AKANUKE.AI] 保存済みAfter画像を復元できませんでした:",
          error,
        );
      } finally {
        if (!isCancelled) {
          setHasCheckedSavedAfter(
            true,
          );
        }
      }
    }

    void restoreSavedAfterImage();

    return () => {
      isCancelled = true;
    };
  }, [
    isReady,
    rawAnalysisResult,
  ]);

  const stopAfterProgressTimer = useCallback(() => {
    if (
      afterProgressTimerRef.current !== null
    ) {
      window.clearInterval(
        afterProgressTimerRef.current,
      );

      afterProgressTimerRef.current = null;
    }
  }, []);

  const startAfterProgressTimer = useCallback(() => {
    stopAfterProgressTimer();

    const startedAt = Date.now();

    /*
     * 最初から0%ではなく6%で開始。
     * 「処理が始まった」ことをすぐ伝えます。
     */
    setAfterElapsedSeconds(0);

    afterProgressValueRef.current = 6;
    setAfterGenerationProgress(6);

    afterProgressTimerRef.current =
      window.setInterval(() => {
        const elapsedSeconds =
          Math.floor(
            (Date.now() -
              startedAt) /
            1000,
          );

        setAfterElapsedSeconds(
          elapsedSeconds,
        );

        const nextProgress =
          Math.round(
            getAfterGenerationProgress(
              elapsedSeconds,
            ),
          );

        setAfterGenerationProgress(
          (current) => {
            const updatedProgress =
              Math.max(
                current,
                nextProgress,
              );

            afterProgressValueRef.current =
              updatedProgress;

            return updatedProgress;
          },
        );
      }, 1000);
  }, [stopAfterProgressTimer]);


  /*
 * 診断結果と元画像が揃ったら、
 * After画像を1回だけ自動生成します。
 *
 * IndexedDBに同じ診断結果のAfter画像がある場合は、
 * 保存済み画像を復元してAPIを再実行しません。
 */
  useEffect(() => {
    if (
      !isReady ||
      !hasCheckedSavedAfter ||
      isHistoryView ||
      !image ||
      !analysis ||
      afterImage ||
      afterRequestStartedRef.current
    ) {
      return;
    }

    let isCancelled = false;
    async function generateAfterImage() {
      if (
        isCancelled ||
        afterRequestStartedRef.current
      ) {
        return;
      }

      afterRequestStartedRef.current = true;

      setAfterError("");
      setAfterElapsedSeconds(0);
      setIsGeneratingAfter(true);

      startAfterProgressTimer();

      try {
        console.log(
          "[AKANUKE.AI] Result画面からAfter画像生成を開始します",
        );

        const diagnosisId =
  window.sessionStorage.getItem(
    DIAGNOSIS_ID_STORAGE_KEY,
  );

if (!diagnosisId) {
  throw new Error(
    "診断IDを確認できませんでした。",
  );
}

const response =
  await fetch(
    "/api/generate-after",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        diagnosisId,
        imageDataUrl: image,
        analysis,
      }),
    },
  );

const data =
  (await response.json()) as {
    afterImageDataUrl?: string;
    afterImageUrl?: string;
    reused?: boolean;
    error?: string;
  };

if (!response.ok) {
  throw new Error(
    typeof data.error === "string"
      ? data.error
      : "After画像を生成できませんでした。",
  );
}

const resolvedAfterImage =
  data.afterImageDataUrl ??
  data.afterImageUrl;

if (!resolvedAfterImage) {
  throw new Error(
    "After画像を取得できませんでした。",
  );
}

        if (isCancelled) {
          return;
        }

        stopAfterProgressTimer();

        /*
         * After画像の生成完了後、
         * 現在の進捗から100%まで滑らかに進めます。
         */
        const completionStartedAt =
          performance.now();

        const completionStartProgress =
          afterProgressValueRef.current;

        const completionDurationMs = 3200;

        await new Promise<void>(
          (resolve) => {
            const animateCompletion = (
              now: number,
            ) => {
              if (isCancelled) {
                resolve();
                return;
              }

              const elapsed =
                now - completionStartedAt;

              const ratio =
                Math.min(
                  1,
                  elapsed /
                  completionDurationMs,
                );

              /*
               * 最初と最後を緩やかにして、
               * 急加速して見えないようにします。
               */
              const easedRatio =
                ratio < 0.5
                  ? 2 * ratio * ratio
                  : 1 -
                  Math.pow(
                    -2 * ratio + 2,
                    2,
                  ) / 2;

              const nextProgress =
                Math.min(
                  100,
                  Math.round(
                    completionStartProgress +
                    (100 -
                      completionStartProgress) *
                    easedRatio,
                  ),
                );

              afterProgressValueRef.current =
                nextProgress;

              setAfterGenerationProgress(
                nextProgress,
              );

              if (ratio < 1) {
                window.requestAnimationFrame(
                  animateCompletion,
                );
                return;
              }

              afterProgressValueRef.current =
                100;

              setAfterGenerationProgress(
                100,
              );

              resolve();
            };

            window.requestAnimationFrame(
              animateCompletion,
            );
          },
        );

        if (isCancelled) {
          return;
        }

        setAfterImage(
  resolvedAfterImage,
);  

        if (
  !data.reused &&
  data.afterImageDataUrl
) {
  try {
    const saveImageResponse =
      await fetch(
        `/api/diagnoses/${diagnosisId}/image`,
        {
          method: "PUT",
          cache: "no-store",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            kind: "after",
            imageDataUrl:
              data.afterImageDataUrl,
          }),
        },
      );

    if (!saveImageResponse.ok) {
      console.warn(
        "[AKANUKE.AI] After画像を診断履歴へ保存できませんでした:",
        saveImageResponse.status,
      );
    }
  } catch (saveImageError) {
    console.warn(
      "[AKANUKE.AI] After画像の履歴保存をスキップしました:",
      saveImageError,
    );
  }
}

        if (
  !data.reused &&
  data.afterImageDataUrl
) {
  try {
    await saveAfterImage({
      sourceResult:
        rawAnalysisResult,
      imageDataUrl:
        data.afterImageDataUrl,
    });
  } catch (storageError) {
    console.warn(
      "[AKANUKE.AI] After画像をIndexedDBへ保存できませんでした:",
      storageError,
    );
  }
}

        console.log(
          "[AKANUKE.AI] Result画面へのAfter画像表示が完了しました",
        );
      } catch (error) {
        console.error(
          "[AKANUKE.AI] After generation error:",
          error,
        );

        if (isCancelled) {
          return;
        }

        stopAfterProgressTimer();

        setAfterError(
          error instanceof Error
            ? error.message
            : "After画像の生成中にエラーが発生しました。",
        );

        setAfterGenerationProgress(0);

      } finally {
        if (!isCancelled) {
          setIsGeneratingAfter(false);
        }
      }
    }

    /*
     * Next.js開発モードでEffectが検証のため再実行されても、
     * GPT Image 2を二重実行しないよう少し遅延して開始します。
     */
    const startTimer =
      window.setTimeout(() => {
        void generateAfterImage();
      }, 100);

    return () => {
      isCancelled = true;

      if (startTimer) {
        window.clearTimeout(
          startTimer,
        );
      }

      stopAfterProgressTimer();
    };
  }, [
    isReady,
    hasCheckedSavedAfter,
    isHistoryView,
    image,
    analysis,
    afterImage,
    afterRetryCount,
    rawAnalysisResult,
    startAfterProgressTimer,
    stopAfterProgressTimer,
  ]);

  const handleRetryAfter = () => {
    stopAfterProgressTimer();

    afterRequestStartedRef.current = false;

    setAfterError("");

    afterProgressValueRef.current = 0;
    setAfterGenerationProgress(0);

    setAfterElapsedSeconds(0);

    setAfterRetryCount(
      (current) => current + 1,
    );
  };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-black/10 border-t-[#1677FF]" />
      </main>
    );
  }

  if (!analysis || loadError) {
    return (
      <AppShell background="white">
        <div className="min-h-screen bg-white px-5 py-16">
          <div className="mx-auto max-w-[420px] rounded-[22px] border border-red-200 bg-red-50 p-5">
            <p className="text-[14px] font-black text-red-600">
              診断結果を表示できません
            </p>

            <p className="mt-2 text-[11px] leading-5 text-red-600/80">
              {loadError}
            </p>

            <Link
              href="/upload"
              className="mt-5 flex min-h-[48px] items-center justify-center rounded-[12px] bg-[#111111] text-[12px] font-black text-white"
            >
              AI診断をやり直す
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const afterSummary = analysis.afterSummary ?? {
    headline: analysis.targetImpression,
    body:
      "AIが分析した改善ポイントをもとに、髪型・眉・肌・身だしなみを整えたAfterイメージです。",
    changes: [
      analysis.afterDirection.hair,
      analysis.afterDirection.eyebrows,
      analysis.afterDirection.skin,
      analysis.afterDirection.grooming,
    ],
  };

  return (
  <AppShell background="white">
    <div className="overflow-x-clip bg-white">
      {isHistoryView ? (
        <AppHeader
          backHref="/history"
          backLabel="診断履歴へ戻る"
        />
      ) : (
        <AppHeader />
      )}

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <p className="mt-4 text-[10px] font-black tracking-[0.18em] text-[#1677FF]">
              PERSONAL BEAUTY REPORT
            </p>

            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              あなたの診断結果
            </h1>

            <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-black/55">
              Afterイメージを目標として、
              今の状態から優先して整えたいポイントをAIが分析しました。
            </p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] border border-[#1677FF]/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="grid grid-cols-[48%_52%]">
              <div className="relative min-h-[250px] overflow-hidden bg-[#F7F9FC]">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt="今回診断した顔写真"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[250px] items-center justify-center px-4 text-center text-black/40">
                    <p className="text-[11px] font-bold">
                      写真が見つかりません
                    </p>
                  </div>
                )}

                {image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[8px] font-black text-[#111111] shadow-sm">
                      <Icon
                        name="check"
                        className="h-3 w-3 text-[#1677FF]"
                      />
                      AI解析済み
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center justify-center bg-[#EEF6FF] px-3 py-4">
                <p className="mb-1 text-[7px] font-black tracking-[0.14em] text-[#1677FF]">
                  AKANUKE PROGRESS
                </p>

                <CircularProgress
                  progress={displayProgress}
                />

                <div className="mt-3 w-full rounded-[13px] border border-[#1677FF]/10 bg-white px-3 py-2.5">
                  <p className="text-[7px] font-bold tracking-[0.1em] text-black/35">
                    AFTER GOAL
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="text-[18px] font-black tracking-[-0.04em] text-[#1677FF]">
                      {GOAL_PROGRESS}%
                    </p>

                    <span className="rounded-full bg-[#FFD400] px-2 py-1 text-[8px] font-black text-[#111111]">
                      GOAL
                    </span>
                  </div>

                  <p className="mt-1 text-[8px] leading-4 text-black/40">
                    AIが提案するAfterへの目標状態
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 bg-white px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[7px] font-black tracking-[0.12em] text-black/35">
                    CURRENT
                  </p>

                  <p className="mt-1 text-[12px] font-black text-[#1677FF]">
                    現在 {analysis.progress}%
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-[#EEF6FF]">
                    <div
                      className="h-full rounded-full bg-[#1677FF]"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            analysis.progress,
                          ),
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[7px] font-black tracking-[0.12em] text-black/35">
                    AFTER
                  </p>

                  <p className="mt-1 text-[12px] font-black text-[#1677FF]">
                    100%
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[9px] leading-4 text-black/55">
                ※容姿を採点するものではありません。
                今回のAfterイメージに近づくための目安です。
              </p>
            </div>
          </section>

          <section className="mx-4 mt-5 rounded-[20px] border border-[#FFD400]/40 bg-[#FFF9D9] p-5">
            <div className="flex items-center gap-2 text-[#1677FF]">
              <Icon name="sparkle" />

              <p className="text-[12px] font-black">
                AI総合コメント
              </p>
            </div>

            <h2 className="mt-3 text-[20px] font-black leading-[1.5] tracking-[-0.03em]">
              {analysis.summary.headline}
            </h2>

            <p className="mt-3 text-[12px] leading-6 text-black/55">
              {analysis.summary.body}
            </p>

            <div className="mt-4 rounded-[14px] bg-white/70 px-4 py-3">
              <p className="text-[9px] font-black tracking-[0.1em] text-[#1677FF]">
                TARGET
              </p>

              <p className="mt-1 text-[12px] font-black text-[#111111]">
                {analysis.targetImpression}
              </p>
            </div>
          </section>

          <section className="mx-4 mt-5 rounded-[24px] border border-[#1677FF]/10 bg-[#EEF6FF] p-5">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              SHARE YOUR RESULT
            </p>

            <h2 className="mt-2 text-[18px] font-black tracking-[-0.03em] text-[#111111]">
              診断結果をシェア
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              診断結果の文章とAKANUKE.AIのURLをXへシェアできます。
            </p>

            <div className="mt-5">
              <ShareResultButton
                progress={analysis.progress}
                targetImpression={
                  analysis.targetImpression
                }
                priorities={
                  analysis.priorities
                }
              />
            </div>

            <p className="mt-3 text-center text-[10px] leading-5 text-black/50">
              顔写真やAfter画像は投稿されません
            </p>
          </section>

          <AdSenseAd
            className="mx-4 mt-7"
            format="rectangle"
          />

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI ANALYSIS
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              パーツ別診断
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              写真から確認できる内容をもとに、
              改善しやすいポイントを整理しています。
            </p>

            <div className="mt-4 grid gap-3">
              <AnalysisDetail
                title="髪型"
                observation={
                  analysis.hair.observation
                }
                advice={
                  analysis.hair.advice
                }
              />

              <AnalysisDetail
                title="眉毛"
                observation={
                  analysis.eyebrows.observation
                }
                advice={
                  analysis.eyebrows.advice
                }
              />

              <AnalysisDetail
                title="肌"
                observation={
                  analysis.skin.observation
                }
                advice={
                  analysis.skin.advice
                }
              />

              <AnalysisDetail
                title="清潔感・身だしなみ"
                observation={
                  analysis.grooming.observation
                }
                advice={
                  analysis.grooming.advice
                }
              />
            </div>
          </section>

                    <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              BEFORE / AFTER
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              理想イメージ
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              現在の状態と、
              AIが提案する改善後のイメージを比較できます。
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white">
                <div className="relative aspect-[4/5] bg-[#F7F9FC]">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt="Before"
                      className="h-full w-full object-cover"
                    />
                  ) : null}

                  <span className="absolute left-3 top-3 rounded-full bg-[#111111] px-2.5 py-1 text-[9px] font-black text-white">
                    Before
                  </span>
                </div>

                <div className="p-3">
                  <p className="text-[11px] font-black">
                    現在の印象
                  </p>

                  <p className="mt-1 text-[12px] leading-6 text-black/70">
                    {analysis.currentImpression}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-[#FFD400]/60 bg-[#FFF9D9]">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#EEF6FF] via-white to-[#FFF9D9]">
                  {afterImage ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={afterImage}
                        alt="AIが生成したAfterイメージ"
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-[#FFD400] px-2.5 py-1 text-[9px] font-black text-[#111111] shadow-sm">
                        After
                      </span>
                    </>
                  ) : isGeneratingAfter ? (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden p-2 sm:p-3">
                      <div className="w-full min-w-0 max-w-[170px] text-center">
                        <span className="relative mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_6px_20px_rgba(15,23,42,0.05)] sm:h-14 sm:w-14">
                          <span className="absolute inset-0 animate-ping rounded-full border border-[#1677FF]/20" />

                          <span className="absolute inset-[5px] animate-pulse rounded-full bg-[#EEF6FF] sm:inset-[7px]" />

                          <Icon
                            name="sparkle"
                            className="relative z-10 h-4 w-4 sm:h-6 sm:w-6"
                          />
                        </span>

                        <p className="mt-2 truncate text-[7px] font-black tracking-[0.04em] text-[#1677FF] sm:mt-4 sm:text-[9px]">
                          AFTER GENERATING
                        </p>

                        <div className="mt-1 flex items-end justify-center gap-0.5 sm:mt-2">
                          <span className="text-[20px] font-black leading-none tracking-[-0.05em] text-[#1677FF] sm:text-[24px]">
                            {afterGenerationProgress}
                          </span>

                          <span className="pb-0.5 text-[8px] font-black text-[#1677FF] sm:text-[9px]">
                            %
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-2 min-h-[24px] break-words text-[8px] font-bold leading-3 text-[#111111]/65 sm:mt-3 sm:min-h-[32px] sm:text-[9px] sm:leading-4">
                          {getAfterGenerationStage(afterElapsedSeconds)}
                        </p>

                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/5 sm:mt-3 sm:h-1.5">
                          <div
                            className="h-full rounded-full bg-[#1677FF] transition-[width] duration-1000 ease-out"
                            style={{
                              width: `${afterGenerationProgress}%`,
                            }}
                          />
                        </div>

                        <p className="mt-1.5 whitespace-nowrap text-[7px] font-bold text-black/35 sm:mt-2">
                          経過 {afterElapsedSeconds}秒
                        </p>

                        <p className="mt-3 hidden text-[7px] leading-3.5 text-black/35 sm:block">
                          高品質なAfterを生成しているため、
                          <br />
                          少し時間がかかる場合があります
                        </p>
                      </div>
                    </div>
                  ) : afterError ? (
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-[10px] font-black text-red-500">
                          After画像を生成できませんでした
                        </p>

                        <p className="mt-2 line-clamp-4 text-[8px] leading-4 text-black/40">
                          {afterError}
                        </p>

                        <button
                          type="button"
                          onClick={handleRetryAfter}
                          className="mt-4 rounded-[10px] bg-[#111111] px-4 py-2.5 text-[9px] font-black text-white"
                        >
                          もう一度生成
                        </button>
                      </div>
                    </div>
                  ) : isHistoryView ? (
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="text-center">
                        <Icon
                          name="sparkle"
                          className="mx-auto h-6 w-6 text-black/25"
                        />

                        <p className="mt-3 text-[9px] font-black text-black/35">
                          After画像が保存されていません
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="text-center">
                        <Icon
                          name="sparkle"
                          className="mx-auto h-6 w-6 text-[#1677FF]"
                        />

                        <p className="mt-3 text-[9px] font-black text-[#1677FF]">
                          After準備中
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <p className="text-[11px] font-black">
                    理想の印象
                  </p>

                  <p className="mt-1 text-[9px] font-bold leading-4 text-[#1677FF]">
                    {afterSummary.headline}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-[18px] border border-[#1677FF]/10 bg-[#EEF6FF]">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                    <Icon
                      name="sparkle"
                      className="h-[18px] w-[18px]"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-black tracking-[0.12em] text-[#1677FF]">
                      YOUR AFTER
                    </p>

                    <h3 className="mt-1.5 text-[16px] font-black leading-[1.5] tracking-[-0.025em] text-[#111111]">
                      {afterSummary.headline}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-black/70">
                  {afterSummary.body}
                </p>
              </div>

              <div className="border-t border-[#1677FF]/10 bg-white p-4">
                <p className="text-[9px] font-black tracking-[0.1em] text-black/35">
                  主な変更
                </p>

                <div className="mt-3 space-y-2.5">
                  {afterSummary.changes.map(
                    (change, index) => (
                      <div
                        key={`${index}-${change}`}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                          <Icon
                            name="check"
                            className="h-3 w-3"
                          />
                        </span>

                        <p className="min-w-0 flex-1 text-[12px] leading-6 text-black/70">                          {change}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-[9px] leading-4 text-black/60">
              ※AfterはAIが改善の方向性を可視化した参考イメージです。
              実際の変化を保証するものではありません。
            </p>
          </section>

          <AdSenseAd
            className="mx-4 mt-7"
            format="rectangle"
          />
          
          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              PRIORITY
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              改善優先順位
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              Afterに近づくために、
              優先して取り組みたい項目から整理しています。
            </p>

            <div className="mt-4 space-y-3">
              {analysis.priorities.map(
                (item, index) => (
                  <article
                    key={`${item.rank}-${item.title}`}
                    className="rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_10px_34px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#EEF6FF] text-[17px] font-black text-[#1677FF]">
                        {item.rank}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[16px] font-black">
                          {item.title}
                        </h3>

                        <span className="mt-1.5 inline-flex rounded-full bg-[#FFF9D9] px-2.5 py-1 text-[8px] font-black text-[#1677FF]">
                          {priorityLabels[index] ??
                            "改善項目"}
                        </span>

                        <p className="mt-3 text-[12px] leading-6 text-black/65">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>

          <section className="mx-4 mt-7">
  <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
    AFTER DIRECTION
  </p>

  <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
    Afterの設計方針
  </h2>

  <p className="mt-2 text-[12px] leading-6 text-black/60">
    AIがAfter画像に反映した改善方針です。
  </p>

  <div className="mt-4 overflow-hidden rounded-[18px] border border-black/10 bg-white">
    {[
      [
        "髪型",
        analysis.afterDirection.hair,
      ],
      [
        "眉毛",
        analysis.afterDirection.eyebrows,
      ],
      [
        "肌",
        analysis.afterDirection.skin,
      ],
      [
        "身だしなみ",
        analysis.afterDirection.grooming,
      ],
      [
        "スタイリング",
        analysis.afterDirection.styling,
      ],
    ].map(
      ([label, value]) => (
        <div
          key={label}
          className="border-b border-black/10 px-4 py-4 last:border-b-0"
        >
          <p className="text-[10px] font-black text-[#1677FF]">
            {label}
          </p>

          <p className="mt-1 text-[12px] leading-6 text-black/65">
            {value}
          </p>
        </div>
      ),
    )}
  </div>
</section>

          <section className="mx-4 mb-8 mt-8 overflow-hidden rounded-[26px] border border-[#1677FF]/20 bg-gradient-to-br from-[#EEF6FF] via-white to-[#FFF9D9] shadow-[0_16px_48px_rgba(22,119,255,0.12)]">
  <div className="px-5 pb-5 pt-6">
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <Icon
          name="sparkle"
          className="h-5 w-5"
        />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-black tracking-[0.16em] text-[#1677FF]">
          NEXT ACTION
        </p>

        <h2 className="mt-1.5 text-[21px] font-black tracking-[-0.04em] text-[#111111]">
          診断結果を、行動に変えよう。
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-black/55">
          あなたの改善ポイントは整理できました。
          次は、優先順位に沿って少しずつ垢抜けを進めていきましょう。
        </p>
      </div>
    </div>

    {/* 最優先CTA */}
    <Link
      href="/plan"
      className="mt-6 flex min-h-[64px] w-full items-center gap-3 rounded-[16px] bg-[#FFD400] px-4 text-[#111111] shadow-[0_10px_28px_rgba(255,212,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#FFCF00] active:scale-[0.99]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white/75 text-[#111111]">
        <Icon
          name="calendar"
          className="h-5 w-5"
        />
      </span>

      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-black">
            垢抜けプランを見る
          </p>        
        </div>

        <p className="mt-1 text-[9px] font-bold text-black/55">
          優先順位に沿って改善を始める
        </p>
      </div>

      <span
        aria-hidden="true"
        className="shrink-0 text-[20px] font-black text-[#111111]"
      >
        →
      </span>
    </Link>

    {/* 商品CTA */}
    <Link
      href="/products"
      className="mt-3 flex min-h-[60px] w-full items-center gap-3 rounded-[16px] border border-[#1677FF]/25 bg-[#EEF6FF] px-4 text-[#111111] shadow-[0_6px_18px_rgba(22,119,255,0.06)] transition hover:-translate-y-0.5 hover:bg-[#E4F1FF] active:scale-[0.99]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white text-[#1677FF]">
        <Icon
          name="bag"
          className="h-5 w-5"
        />
      </span>

      <div className="min-w-0 flex-1 text-left">
        <p className="text-[13px] font-black">
          おすすめ商品を見る
        </p>

        <p className="mt-1 text-[9px] font-medium text-black/50">
          今のあなたに必要なアイテムを確認
        </p>
      </div>

      <span
        aria-hidden="true"
        className="shrink-0 text-[20px] font-black text-[#1677FF]"
      >
        →
      </span>
    </Link>
  </div>
</section>

<Link
  href="/dashboard"
  className="mx-4 mt-5 flex min-h-[54px] items-center justify-center gap-2 rounded-[14px] bg-[#1677FF] px-5 text-[12px] font-black text-white shadow-[0_8px_24px_rgba(22,119,255,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0F6FEF] active:scale-[0.99]"
>
  マイページへ

  <span
    aria-hidden="true"
    className="text-[16px] font-black"
  >
    →
  </span>
</Link>

          <Link
            href="/upload"
            className="mx-4 mt-5 flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-black/10 bg-white px-4 text-[11px] font-black transition hover:bg-[#F7F9FC]"
          >
            <Icon
              name="refresh"
              className="h-4 w-4"
            />

            別の写真で診断し直す
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
