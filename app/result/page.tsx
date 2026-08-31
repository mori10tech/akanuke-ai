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

import AppHeader from "../components/AppHeader";

import ShareResultButton from "./ShareResultButton";

const IMAGE_STORAGE_KEY = "akanukeImage";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";
const PROGRESS_ANIMATION_STORAGE_KEY =
  "akanukeProgressAnimationResult";
const DIAGNOSIS_ID_STORAGE_KEY =
  "akanukeDiagnosisId";
const RESULT_BACK_HREF_STORAGE_KEY =
  "akanukeResultBackHref";
const SAVED_AFTER_IMAGE_STORAGE_KEY =
  "akanukeSavedAfterImageUrl";

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

const AFTER_PROGRESS_MAX_BEFORE_COMPLETE =
  99;

function getAfterGenerationProgress(
  elapsedSeconds: number,
) {
  if (elapsedSeconds < 5) {
    return 6 + elapsedSeconds * 3;
  }

  if (elapsedSeconds < 10) {
    return (
      21 +
      (elapsedSeconds - 5) * 3
    );
  }

  if (elapsedSeconds < 20) {
    return (
      36 +
      (elapsedSeconds - 10) * 2
    );
  }

  if (elapsedSeconds < 30) {
    return (
      56 +
      (elapsedSeconds - 20) * 1.4
    );
  }

  if (elapsedSeconds < 45) {
    return (
      70 +
      (elapsedSeconds - 30) * 0.8
    );
  }

  if (elapsedSeconds < 60) {
    return (
      82 +
      (elapsedSeconds - 45) * 0.4
    );
  }

  if (elapsedSeconds < 75) {
    return (
      88 +
      (elapsedSeconds - 60) * 0.2
    );
  }

  if (elapsedSeconds < 90) {
    return (
      91 +
      (elapsedSeconds - 75) * 0.13
    );
  }

  if (elapsedSeconds < 120) {
    return (
      93 +
      (elapsedSeconds - 90) * 0.1
    );
  }

  if (elapsedSeconds < 150) {
    return (
      96 +
      (elapsedSeconds - 120) * 0.06
    );
  }

  return AFTER_PROGRESS_MAX_BEFORE_COMPLETE;
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
  const paths: Record<
    string,
    ReactNode
  > = {
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
    check: (
      <path d="m5 12 4 4L19 6" />
    ),
    chevron: (
      <path d="m9 18 6-6-6-6" />
    ),
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

export default function ResultPage() {
  const afterRequestStartedRef =
    useRef(false);

  const afterProgressTimerRef =
    useRef<number | null>(null);

  const afterProgressValueRef =
    useRef(0);

  const [image, setImage] =
    useState<string | null>(
      null,
    );

  const [analysis, setAnalysis] =
    useState<AkanukeAnalysis | null>(
      null,
    );

  const [
    afterImage,
    setAfterImage,
  ] = useState<string | null>(
    null,
  );

  const [
    isGeneratingAfter,
    setIsGeneratingAfter,
  ] = useState(false);

  const [
    afterGenerationProgress,
    setAfterGenerationProgress,
  ] = useState(0);

  const [
    afterElapsedSeconds,
    setAfterElapsedSeconds,
  ] = useState(0);

  const [
    afterError,
    setAfterError,
  ] = useState("");

  const [
    afterRetryCount,
    setAfterRetryCount,
  ] = useState(0);

  const [
    displayProgress,
    setDisplayProgress,
  ] = useState(0);

  const [
    isReady,
    setIsReady,
  ] = useState(false);

  const [
    loadError,
    setLoadError,
  ] = useState("");

  const [
    isHistoryView,
    setIsHistoryView,
  ] = useState(false);

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
      setAfterImage(
        savedAfterImageUrl,
      );
    }

    if (
      savedBackHref ===
      "/history"
    ) {
      setIsHistoryView(
        true,
      );
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
        createResultAnimationId(
          rawResult,
        );

      const previousAnimationResultId =
        window.sessionStorage.getItem(
          PROGRESS_ANIMATION_STORAGE_KEY,
        );

      if (
        previousAnimationResultId ===
        animationResultId
      ) {
        setDisplayProgress(
          targetProgress,
        );

        return;
      }

      setDisplayProgress(0);

      const duration = 1400;
      const startedAt =
        performance.now();

      let frame = 0;

      const animate = (
        now: number,
      ) => {
        const progress =
          Math.min(
            (now -
              startedAt) /
              duration,
            1,
          );

        const eased =
          1 -
          Math.pow(
            1 - progress,
            3,
          );

        setDisplayProgress(
          Math.round(
            targetProgress *
              eased,
          ),
        );

        if (progress < 1) {
          frame =
            window.requestAnimationFrame(
              animate,
            );

          return;
        }

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

  const stopAfterProgressTimer =
    useCallback(() => {
      if (
        afterProgressTimerRef.current !==
        null
      ) {
        window.clearInterval(
          afterProgressTimerRef.current,
        );

        afterProgressTimerRef.current =
          null;
      }
    }, []);

  const startAfterProgressTimer =
    useCallback(() => {
      stopAfterProgressTimer();

      const startedAt =
        Date.now();

      setAfterElapsedSeconds(
        0,
      );

      afterProgressValueRef.current =
        6;

      setAfterGenerationProgress(
        6,
      );

      afterProgressTimerRef.current =
        window.setInterval(
          () => {
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
          },
          1000,
        );
    }, [
      stopAfterProgressTimer,
    ]);

  useEffect(() => {
    if (
      !isReady ||
      isHistoryView ||
      !image ||
      !analysis ||
      afterImage ||
      afterRequestStartedRef.current
    ) {
      return;
    }

    let isCancelled =
      false;

    async function generateAfterImage() {
      if (
        isCancelled ||
        afterRequestStartedRef.current
      ) {
        return;
      }

      afterRequestStartedRef.current =
        true;

      setAfterError("");
      setAfterElapsedSeconds(
        0,
      );
      setIsGeneratingAfter(
        true,
      );

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
              body: JSON.stringify(
                {
                  diagnosisId,
                  imageDataUrl:
                    image,
                  analysis,
                },
              ),
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
            typeof data.error ===
              "string"
              ? data.error
              : "After画像を生成できませんでした。",
          );
        }

        const resolvedAfterImage =
          data.afterImageDataUrl ??
          data.afterImageUrl;

        if (
          !resolvedAfterImage
        ) {
          throw new Error(
            "After画像を取得できませんでした。",
          );
        }

        if (isCancelled) {
          return;
        }

        stopAfterProgressTimer();

        const completionStartedAt =
          performance.now();

        const completionStartProgress =
          afterProgressValueRef.current;

        const completionDurationMs =
          3200;

        await new Promise<void>(
          (resolve) => {
            const animateCompletion =
              (
                now: number,
              ) => {
                if (
                  isCancelled
                ) {
                  resolve();

                  return;
                }

                const elapsed =
                  now -
                  completionStartedAt;

                const ratio =
                  Math.min(
                    1,
                    elapsed /
                      completionDurationMs,
                  );

                const easedRatio =
                  ratio < 0.5
                    ? 2 *
                      ratio *
                      ratio
                    : 1 -
                      Math.pow(
                        -2 *
                          ratio +
                          2,
                        2,
                      ) /
                        2;

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

                if (
                  ratio < 1
                ) {
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

        setAfterGenerationProgress(
          0,
        );
      } finally {
        if (!isCancelled) {
          setIsGeneratingAfter(
            false,
          );
        }
      }
    }

    const startTimer =
      window.setTimeout(
        () => {
          void generateAfterImage();
        },
        100,
      );

    return () => {
      isCancelled = true;

      window.clearTimeout(
        startTimer,
      );

      stopAfterProgressTimer();
    };
  }, [
    isReady,
    isHistoryView,
    image,
    analysis,
    afterImage,
    afterRetryCount,
    startAfterProgressTimer,
    stopAfterProgressTimer,
  ]);

  const handleRetryAfter =
    () => {
      stopAfterProgressTimer();

      afterRequestStartedRef.current =
        false;

      setAfterError("");

      afterProgressValueRef.current =
        0;

      setAfterGenerationProgress(
        0,
      );

      setAfterElapsedSeconds(
        0,
      );

      setAfterRetryCount(
        (current) =>
          current + 1,
      );
    };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-black/10 border-t-[#1677FF]" />
      </main>
    );
  }

  if (
    !analysis ||
    loadError
  ) {
    return (
      <AppShell background="white">
        <div className="min-h-screen bg-white px-5 py-16">
          <div className="mx-auto max-w-[420px] rounded-[22px] border border-red-200 bg-red-50 p-5">
            <p className="text-[14px] font-black text-red-600">
              診断結果を表示できません
            </p>

            <p className="mt-2 text-[12px] leading-5 text-red-600/80">
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

  const afterSummary =
    analysis.afterSummary ?? {
      headline:
        analysis.targetImpression,
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
            <p className="text-[10px] font-black tracking-[0.18em] text-[#1677FF]">
              PERSONAL BEAUTY REPORT
            </p>

            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              あなたの診断結果
            </h1>

            <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-black/70">
              今の印象と改善ポイントを確認して、
              あなた専用の垢抜けプランを見つけましょう。
            </p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] border border-[#1677FF]/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="grid grid-cols-[42%_58%]">
              <div className="relative min-h-[230px] overflow-hidden bg-[#F7F9FC]">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt="今回診断した顔写真"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[230px] items-center justify-center px-4 text-center text-black/60">
                    <p className="text-[12px] font-bold">
                      写真が見つかりません
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center bg-[#EEF6FF] px-4 py-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
                    AKANUKE SCORE
                  </p>

                  <span className="rounded-full border border-[#1677FF]/10 bg-white px-2 py-1 text-[9px] font-bold text-[#1677FF]">
                    解析完了
                  </span>
                </div>

                <p className="mt-5 text-[11px] font-bold text-black/70">
                  現在の垢抜けスコア
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-[46px] font-bold leading-none tracking-[-0.055em] text-[#1677FF]">
                    {displayProgress}
                  </span>

                  <span className="pb-1 text-[13px] font-bold text-[#1677FF]/70">
                    %
                  </span>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-black/80">
                  改善できるポイントをAIが分析しました。
                </p>
              </div>
            </div>

            <div className="border-t border-black/10 bg-white px-4 py-4">
              <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                TARGET
              </p>

              <p className="mt-1.5 text-[14px] font-black leading-6 text-[#111111]">
                {analysis.targetImpression}
              </p>

              <p className="mt-2 text-[11px] leading-5 text-black/80">
                この印象を目指して、髪・眉・肌・身だしなみを整えていきます。
              </p>

              <p className="mt-3 border-t border-black/5 pt-3 text-[10px] leading-5 text-black/60">
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

            <h2 className="mt-3 text-[16px] font-black leading-[1.5] tracking-[-0.03em]">
              {analysis.summary.headline}
            </h2>

            <p className="mt-3 text-[13px] leading-6 text-black/75">
              {analysis.summary.body}
            </p>

            <div className="mt-4 rounded-[14px] bg-white/70 px-4 py-3">
              <p className="text-[10px] font-black tracking-[0.1em] text-[#1677FF]">
                TARGET
              </p>

              <p className="mt-1 text-[12px] font-black text-[#111111]">
                {analysis.targetImpression}
              </p>
            </div>
          </section>

          {!isHistoryView && (
            <section className="mx-4 mt-5 overflow-hidden rounded-[22px] border border-[#1677FF]/15 bg-gradient-to-br from-[#EEF6FF] via-white to-white shadow-[0_10px_30px_rgba(22,119,255,0.07)]">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
                    <Icon
                      name="sparkle"
                      className="h-5 w-5"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
                      BEFORE / AFTER
                    </p>

                    <h2 className="mt-1 text-[17px] font-black leading-6 tracking-[-0.03em] text-[#111111]">
                      {isGeneratingAfter &&
                      !afterImage
                        ? "Afterイメージをこの下で生成中です"
                        : "Before / Afterはこの下で確認できます"}
                    </h2>

                    <p className="mt-2 text-[12px] leading-6 text-black/75">
                      {isGeneratingAfter &&
                      !afterImage
                        ? "完成まで少し時間がかかる場合があります。待っている間に診断結果をチェックしたり、Xへシェアしてみましょう。"
                        : "このまま下へスクロールすると、BeforeとAfterを比較できます。診断結果はXへシェアすることもできます。"}
                    </p>
                  </div>
                </div>

                {isGeneratingAfter &&
                !afterImage ? (
                  <div className="mt-4 rounded-[14px] bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black text-[#1677FF]">
                          AFTER GENERATING
                        </p>

                        <p className="mt-1 text-[11px] font-bold text-black/70">
                          {getAfterGenerationStage(
                            afterElapsedSeconds,
                          )}
                        </p>
                      </div>

                      <div className="flex items-end gap-0.5">
                        <span className="text-[22px] font-black leading-none text-[#1677FF]">
                          {
                            afterGenerationProgress
                          }
                        </span>

                        <span className="pb-0.5 text-[10px] font-black text-[#1677FF]">
                          %
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF6FF]">
                      <div
                        className="h-full rounded-full bg-[#1677FF] transition-[width] duration-1000 ease-out"
                        style={{
                          width: `${afterGenerationProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : null}

                <div className="mt-4">
                  <ShareResultButton
                    progress={
                      analysis.progress
                    }
                    targetImpression={
                      analysis.targetImpression
                    }
                    priorities={
                      analysis.priorities
                    }
                  />
                </div>

                <p className="mt-2.5 text-center text-[10px] leading-5 text-black/60">
                  顔写真やAfter画像は投稿されません
                </p>

                <div className="mt-5 flex flex-col items-center">
                  <p className="text-[10px] font-bold tracking-[0.04em] text-black/55">
                    下にスクロールして Before / After をチェック
                  </p>

                  <span
                    aria-hidden="true"
                    className="mt-1 animate-bounce text-[18px] font-black leading-none text-[#1677FF]"
                  >
                    ↓
                  </span>
                </div>
              </div>
            </section>
          )}

          <section className="mx-4 mt-5 overflow-hidden rounded-[24px] border border-[#1677FF]/10 bg-white p-4 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  BEFORE / AFTER
                </p>

                <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
                  変化イメージをチェック
                </h2>
              </div>

              {isGeneratingAfter &&
              !afterImage ? (
                <span className="shrink-0 rounded-full bg-[#EEF6FF] px-2.5 py-1.5 text-[9px] font-black text-[#1677FF]">
                  生成中
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-[12px] leading-6 text-black/75">
              現在の状態と、AIが提案する改善後のイメージを比較できます。
            </p>

            <div className="mt-4 grid grid-cols-2 items-stretch gap-3">
              <div className="flex h-full flex-col">
                <p className="mb-2 text-center text-[11px] font-black tracking-[0.08em] text-black/60">
                  Before
                </p>

                <div className="flex flex-1 flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white">
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#F7F9FC]">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt="Before"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-[11px] font-black">
                      現在の印象
                    </p>

                    <p className="mt-1 text-[12px] leading-6 text-black/75">
                      {
                        analysis.currentImpression
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col">
                <p className="mb-2 text-center text-[11px] font-black tracking-[0.08em] text-[#1677FF]">
                  After
                </p>

                <div className="flex flex-1 flex-col overflow-hidden rounded-[18px] border border-[#FFD400]/60 bg-[#FFF9D9]">
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#EEF6FF] via-white to-[#FFF9D9]">
                    {afterImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          afterImage
                        }
                        alt="AIが生成したAfterイメージ"
                        className="h-full w-full object-cover"
                      />
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

                          <p className="mt-2 truncate text-[9px] font-black tracking-[0.04em] text-[#1677FF] sm:mt-4 sm:text-[10px]">
                            AFTER GENERATING
                          </p>

                          <div className="mt-1 flex items-end justify-center gap-0.5 sm:mt-2">
                            <span className="text-[20px] font-black leading-none tracking-[-0.05em] text-[#1677FF] sm:text-[24px]">
                              {
                                afterGenerationProgress
                              }
                            </span>

                            <span className="pb-0.5 text-[9px] font-black text-[#1677FF] sm:text-[10px]">
                              %
                            </span>
                          </div>

                          <p className="mt-2 line-clamp-2 min-h-[24px] break-words text-[9px] font-bold leading-4 text-[#111111]/70 sm:mt-3 sm:min-h-[32px] sm:text-[10px] sm:leading-4">
                            {getAfterGenerationStage(
                              afterElapsedSeconds,
                            )}
                          </p>

                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/5 sm:mt-3 sm:h-1.5">
                            <div
                              className="h-full rounded-full bg-[#1677FF] transition-[width] duration-1000 ease-out"
                              style={{
                                width: `${afterGenerationProgress}%`,
                              }}
                            />
                          </div>

                          <p className="mt-1.5 whitespace-nowrap text-[9px] font-bold text-black/55 sm:mt-2">
                            経過{" "}
                            {
                              afterElapsedSeconds
                            }
                            秒
                          </p>
                        </div>
                      </div>
                    ) : afterError ? (
                      <div className="flex h-full w-full items-center justify-center p-4">
                        <div className="text-center">
                          <p className="text-[10px] font-black text-red-500">
                            After画像を生成できませんでした
                          </p>

                          <p className="mt-2 line-clamp-4 text-[9px] leading-4 text-black/60">
                            {
                              afterError
                            }
                          </p>

                          <button
                            type="button"
                            onClick={
                              handleRetryAfter
                            }
                            className="mt-4 rounded-[10px] bg-[#111111] px-4 py-2.5 text-[10px] font-black text-white"
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
                            className="mx-auto h-6 w-6 text-black/30"
                          />

                          <p className="mt-3 text-[10px] font-black text-black/55">
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

                          <p className="mt-3 text-[10px] font-black text-[#1677FF]">
                            After準備中
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-[11px] font-black">
                      理想の印象
                    </p>

                    <p className="mt-1 text-[12px] font-bold leading-6 text-[#1677FF]">
                      {
                        afterSummary.headline
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] leading-5 text-black/65">
              ※AIが生成した参考イメージです。変化を保証するものではありません。
            </p>

            <div className="mt-5 border-t border-black/[0.06] pt-5">
              <div>
                <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
                  NEXT STEP
                </p>

                <h3 className="mt-1.5 text-[17px] font-black leading-6 tracking-[-0.03em] text-[#111111]">
                  このAfterに近づくために、次の一歩へ。
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-black/75">
                  あなた専用の改善プランと必要な商品を確認できます。
                </p>
              </div>

              <Link
                href="/plan"
                className="mt-4 flex min-h-[58px] w-full items-center gap-3 rounded-[15px] bg-[#FFD400] px-4 text-[#111111] shadow-[0_8px_24px_rgba(255,212,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFCF00] active:scale-[0.99]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white/75 text-[#111111]">
                  <Icon
                    name="calendar"
                    className="h-[18px] w-[18px]"
                  />
                </span>

                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[12px] font-black">
                    このAfterに近づくプランを見る
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-black/65">
                    あなた専用の改善ステップを確認
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-[19px] font-black"
                >
                  →
                </span>
              </Link>

              <Link
                href="/products"
                className="mt-2.5 flex min-h-[54px] w-full items-center gap-3 rounded-[15px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[#111111] transition hover:bg-[#E4F1FF] active:scale-[0.99]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#1677FF]">
                  <Icon
                    name="bag"
                    className="h-[17px] w-[17px]"
                  />
                </span>

                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[12px] font-black">
                    おすすめ商品を見る
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-black/65">
                    今のあなたに必要な商品を確認
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-[18px] font-black text-[#1677FF]"
                >
                  →
                </span>
              </Link>
            </div>
          </section>

          <AdSenseAd
            className="mx-4 mt-7"
            format="rectangle"
          />

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              YOUR IMPROVEMENTS
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              今回の主な改善ポイント
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-black/75">
              AIが今回のAfterに反映した、特に重要なポイントをまとめました。
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
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 border-b border-black/10 px-4 py-5 last:border-b-0"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                      <Icon
                        name="check"
                        className="h-4 w-4"
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-black text-[#111111]">
                        {label}
                      </p>

                      <p className="mt-1.5 text-[13px] leading-6 text-black/80">
                        {value}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="mx-4 mb-8 mt-8 overflow-hidden rounded-[24px] border border-[#1677FF]/15 bg-gradient-to-br from-[#EEF6FF] via-white to-[#FFF9D9] shadow-[0_12px_36px_rgba(22,119,255,0.10)]">
            <div className="px-5 pb-5 pt-5">
              <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
                NEXT ACTION
              </p>

              <h2 className="mt-1.5 text-[19px] font-black leading-7 tracking-[-0.035em] text-[#111111]">
                診断結果を、行動に変えよう。
              </h2>

              <p className="mt-2 text-[12px] leading-6 text-black/75">
                あなたの改善ポイントは整理できました。
                次は、垢抜けプランに沿って少しずつ改善を進めていきましょう。
              </p>

              <Link
                href="/plan"
                className="mt-4 flex min-h-[60px] w-full items-center gap-3 rounded-[15px] bg-[#FFD400] px-4 text-[#111111] shadow-[0_8px_24px_rgba(255,212,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#FFCF00] active:scale-[0.99]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white/75 text-[#111111]">
                  <Icon
                    name="calendar"
                    className="h-[18px] w-[18px]"
                  />
                </span>

                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[12px] font-black">
                    垢抜けプランを見る
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-black/65">
                    あなた専用の改善ステップを確認
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-[19px] font-black"
                >
                  →
                </span>
              </Link>

              <Link
                href="/products"
                className="mt-2.5 flex min-h-[54px] w-full items-center gap-3 rounded-[15px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[#111111] transition hover:bg-[#E4F1FF] active:scale-[0.99]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#1677FF]">
                  <Icon
                    name="bag"
                    className="h-[17px] w-[17px]"
                  />
                </span>

                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[12px] font-black">
                    おすすめ商品を見る
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-black/65">
                    今のあなたに必要な商品を確認
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-[18px] font-black text-[#1677FF]"
                >
                  →
                </span>
              </Link>
            </div>
          </section>

          <AdSenseAd
            className="mx-4 mt-7"
            format="rectangle"
          />

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
            className="mx-4 mt-5 flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-black/10 bg-white px-4 text-[12px] font-black transition hover:bg-[#F7F9FC]"
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