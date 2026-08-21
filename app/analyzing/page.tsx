"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AppHeader from "../components/AppHeader";

const IMAGE_STORAGE_KEY = "akanukeImage";
const TARGET_STORAGE_KEY = "akanukeTargetImpression";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";
const DIAGNOSIS_ID_STORAGE_KEY = "akanukeDiagnosisId";
const RESULT_BACK_HREF_STORAGE_KEY = "akanukeResultBackHref";
const SAVED_AFTER_IMAGE_STORAGE_KEY = "akanukeSavedAfterImageUrl";

const REDIRECT_DELAY_MS = 700;

const analysisSteps = [
  {
    label: "顔まわり",
    description: "全体の印象とスタイリングを確認",
    start: 0,
    end: 22,
  },
  {
    label: "眉毛",
    description: "形・太さ・左右バランスを確認",
    start: 22,
    end: 42,
  },
  {
    label: "髪型",
    description: "目標の印象に合う方向性を分析",
    start: 42,
    end: 62,
  },
  {
    label: "肌・清潔感",
    description: "見た目の清潔感とケアポイントを分析",
    start: 62,
    end: 82,
  },
  {
    label: "垢抜けプラン",
    description: "改善ポイントの優先順位を生成",
    start: 82,
    end: 100,
  },
];

/*
 * OpenAI APIから実際の進捗率は取得できないため、
 * 経過時間に応じた「進捗の目安」を表示します。
 *
 * 前半はテンポよく進み、
 * 後半は徐々にゆっくり進みます。
 *
 * API完了前は最大99%まで。
 * 100%は本当に診断が完了したときだけ表示します。
 */
function getAnalyzingProgress(
  elapsedSeconds: number,
) {
  if (elapsedSeconds < 5) {
    return 5 + elapsedSeconds * 4;
  }

  if (elapsedSeconds < 10) {
    return 25 + (elapsedSeconds - 5) * 3;
  }

  if (elapsedSeconds < 20) {
    return 40 + (elapsedSeconds - 10) * 2;
  }

  if (elapsedSeconds < 30) {
    return 60 + (elapsedSeconds - 20) * 1.5;
  }

  if (elapsedSeconds < 40) {
    return 75 + (elapsedSeconds - 30);
  }

  if (elapsedSeconds < 50) {
    return 85 + (elapsedSeconds - 40) * 0.5;
  }

  if (elapsedSeconds < 65) {
    return 90 + (elapsedSeconds - 50) * 0.2;
  }

  if (elapsedSeconds < 85) {
    return 93 + (elapsedSeconds - 65) * 0.1;
  }

  if (elapsedSeconds < 110) {
    return 95 + (elapsedSeconds - 85) * 0.08;
  }

  /*
   * 110秒を超えても完全停止させず、
   * 30秒ごとに1%ずつ進めます。
   *
   * ただしAPI完了前は99%を超えません。
   */
  return Math.min(
    99,
    97 +
      Math.floor(
        (elapsedSeconds - 110) / 30,
      ),
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function AdPlaceholder() {
  return (
    <aside
      aria-label="広告"
      className="mt-5 overflow-hidden rounded-[18px] border border-black/10 bg-[#F7F9FC]"
    >
      <div className="flex min-h-[96px] items-center justify-center px-5 py-5">
        <div className="text-center">
          <p className="text-[9px] font-bold tracking-[0.16em] text-black/35">
            ADVERTISEMENT
          </p>

          <p className="mt-2 text-[11px] leading-5 text-black/35">
            広告掲載スペース
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function AnalyzingPage() {
  const router = useRouter();

  const hasStartedRef = useRef(false);
const progressRef = useRef(0);

const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;
    let progressTimer: number | undefined;
    let redirectTimer: number | undefined;

    async function runAnalysis() {
      if (
        isCancelled ||
        hasStartedRef.current
      ) {
        return;
      }

      hasStartedRef.current = true;

      const savedImage =
        window.sessionStorage.getItem(
          IMAGE_STORAGE_KEY,
        );

      if (!savedImage) {
        router.replace("/upload");
        return;
      }

      const savedTarget =
        window.sessionStorage.getItem(
          TARGET_STORAGE_KEY,
        ) ??
        "清潔感のある爽やかな印象";

      setImage(savedImage);
      setErrorMessage("");
      window.sessionStorage.setItem(
        RESULT_BACK_HREF_STORAGE_KEY,
        "/upload",
      );
      window.sessionStorage.removeItem(
        SAVED_AFTER_IMAGE_STORAGE_KEY,
      );
      window.sessionStorage.removeItem(
        DIAGNOSIS_ID_STORAGE_KEY,
      );

      /*
 * 診断開始直後から5%を表示して、
 * 処理が始まっていることを明確にします。
 */
progressRef.current = 5;
setProgress(5);

const startedAt = Date.now();

      const updateProgress = () => {
        const elapsedSeconds =
          Math.floor(
            (Date.now() - startedAt) / 1000,
          );

        const nextProgress =
          Math.min(
            99,
            Math.round(
              getAnalyzingProgress(
                elapsedSeconds,
              ),
            ),
          );

        if (!isCancelled) {
  const updatedProgress =
    Math.max(
      progressRef.current,
      nextProgress,
    );

  progressRef.current =
    updatedProgress;

  setProgress(
    updatedProgress,
  );
}
      };

      updateProgress();

      /*
       * 1秒ごとに進捗の目安を更新します。
       */
      progressTimer =
        window.setInterval(
          updateProgress,
          1000,
        );

      try {
        console.log(
          "[AKANUKE.AI] AI診断APIを開始します",
        );

        const response =
          await fetch(
            "/api/analyze",
            {
              method: "POST",
              cache: "no-store",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                imageDataUrl:
                  savedImage,
                targetImpression:
                  savedTarget,
              }),
            },
          );

        console.log(
          "[AKANUKE.AI] AI診断APIレスポンス:",
          response.status,
        );

        const data =
          (await response.json()) as {
            error?: string;
            [key: string]:
              unknown;
          };

        if (!response.ok) {
          throw new Error(
            typeof data.error ===
              "string"
              ? data.error
              : "AI診断に失敗しました。",
          );
        }

        if (isCancelled) {
          return;
        }

        if (progressTimer) {
          window.clearInterval(
            progressTimer,
          );
        }

        window.sessionStorage.setItem(
          RESULT_STORAGE_KEY,
          JSON.stringify(data),
        );

        /*
         * ログイン中の場合だけ診断結果をSupabaseへ保存します。
         * 未ログイン（401）や保存失敗でも、今回の診断結果表示は続行します。
         */
        try {
          const saveResponse = await fetch(
            "/api/diagnoses",
            {
              method: "POST",
              cache: "no-store",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                analysis: data,
                beforeImageDataUrl:
                  savedImage,
              }),
            },
          );

          if (saveResponse.ok) {
            const savedDiagnosis =
              (await saveResponse.json()) as {
                id?: string;
              };

            if (savedDiagnosis.id) {
              window.sessionStorage.setItem(
                DIAGNOSIS_ID_STORAGE_KEY,
                savedDiagnosis.id,
              );
            }
          } else if (saveResponse.status !== 401) {
            console.warn(
              "[AKANUKE.AI] 診断結果を履歴へ保存できませんでした:",
              saveResponse.status,
            );
          }
        } catch (saveError) {
          console.warn(
            "[AKANUKE.AI] 診断結果の履歴保存をスキップしました:",
            saveError,
          );
        }

       /*
 * API完了後は現在の進捗から100%まで
 * なだらかに進めてからResult画面へ移動します。
 */
const completionStartedAt =
  performance.now();

const completionStartProgress =
  progressRef.current;

const completionDurationMs = 2500;

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
       * ease-outで終盤ほど自然に減速します。
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

      progressRef.current =
        nextProgress;

      setProgress(
        nextProgress,
      );

      if (ratio < 1) {
        window.requestAnimationFrame(
          animateCompletion,
        );
        return;
      }

      progressRef.current = 100;
      setProgress(100);
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

redirectTimer =
  window.setTimeout(() => {
    router.push(
      "/result",
    );
  }, REDIRECT_DELAY_MS);

      } catch (error) {
        console.error(
          "[AKANUKE.AI] Analysis error:",
          error,
        );

        if (progressTimer) {
          window.clearInterval(
            progressTimer,
          );
        }

        if (isCancelled) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "AI診断中にエラーが発生しました。",
        );
      }
    }

    /*
     * Next.js開発モードのEffect再実行対策。
     *
     * 初回の検証用Effectではタイマーがcleanupされ、
     * 実際に有効なEffectだけがrunAnalysisを開始します。
     * OpenAI APIの二重実行も防ぎます。
     */
    const startTimer =
      window.setTimeout(() => {
        void runAnalysis();
      }, 100);

    return () => {
      isCancelled = true;

      if (startTimer) {
        window.clearTimeout(
          startTimer,
        );
      }

      if (progressTimer) {
        window.clearInterval(
          progressTimer,
        );
      }

      if (redirectTimer) {
        window.clearTimeout(
          redirectTimer,
        );
      }
    };
  }, [router]);

  const activeStepIndex =
    useMemo(() => {
      const index =
        analysisSteps.findIndex(
          (step) =>
            progress >=
              step.start &&
            progress < step.end,
        );

      return index === -1
        ? analysisSteps.length - 1
        : index;
    }, [progress]);

  const activeStep =
    analysisSteps[
      activeStepIndex
    ];

  return (
    <main className="min-h-screen bg-[#EEF6FF] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-white shadow-[0_0_40px_rgba(15,23,42,0.08)]">
        <AppHeader
          backHref="/upload"
          backLabel="写真選択画面へ戻る"
        />

        <div className="px-4 pb-10 pt-6">
          <div className="text-center">
            <p className="mt-4 text-[11px] font-black tracking-[0.15em] text-[#1677FF]">
              AI BEAUTY ANALYSIS
            </p>

            <h1 className="mt-2 text-[28px] font-black tracking-[-0.04em]">
              AIがあなたを分析中
            </h1>

            <p className="mt-2 text-[12px] leading-5 text-black/55">
              顔立ちとなりたい印象から、
              あなた専用の
              <br />
              垢抜けプランを作成しています。
            </p>
          </div>

          <section className="mt-6 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F9FC]">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="AIが解析している顔写真"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full animate-pulse bg-black/10" />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />

              <div className="pointer-events-none absolute inset-[7%] rounded-[24px] border border-white/70">
                <span className="absolute -left-px -top-px h-8 w-8 rounded-tl-[24px] border-l-2 border-t-2 border-[#FFD400]" />
                <span className="absolute -right-px -top-px h-8 w-8 rounded-tr-[24px] border-r-2 border-t-2 border-[#FFD400]" />
                <span className="absolute -bottom-px -left-px h-8 w-8 rounded-bl-[24px] border-b-2 border-l-2 border-[#FFD400]" />
                <span className="absolute -bottom-px -right-px h-8 w-8 rounded-br-[24px] border-b-2 border-r-2 border-[#FFD400]" />
              </div>

              <div className="pointer-events-none absolute left-[7%] right-[7%] top-[7%] bottom-[24%] z-10 overflow-hidden rounded-t-[24px]">
  <div className="akanuke-scan-line absolute inset-x-0 top-0 h-px bg-[#FFD400] shadow-[0_0_18px_rgba(255,212,0,0.9)]" />
</div>

              <div className="absolute inset-x-4 bottom-4 rounded-[14px] border border-white/25 bg-black/60 px-4 py-3 text-white backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-white/60">
                      現在の解析項目
                    </p>

                    <p className="mt-0.5 text-[14px] font-black">
                      {errorMessage
                        ? "診断を中断しました"
                        : activeStep.label}
                    </p>
                  </div>

                  <span className="shrink-0 text-[25px] font-black tracking-[-0.04em] text-[#FFD400]">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="h-2 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-[#1677FF] transition-[width] duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[11px] font-black text-[#1677FF]">
                  {errorMessage
                    ? "AI診断でエラーが発生しました"
                    : progress ===
                        100
                      ? "分析が完了しました"
                      : activeStep.description}
                </p>

                {!errorMessage && (
                  <p className="shrink-0 text-[10px] text-black/35">
                    {progress >= 95
                      ? "最終調整中"
                      : "AI解析中"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {errorMessage && (
            <section
              role="alert"
              className="mt-5 rounded-[18px] border border-red-200 bg-red-50 px-4 py-4"
            >
              <p className="text-[12px] font-black text-red-600">
                診断を完了できませんでした
              </p>

              <p className="mt-2 text-[11px] leading-5 text-red-600/80">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() => {
                  router.replace(
                    "/upload",
                  );
                }}
                className="mt-4 flex min-h-[46px] w-full items-center justify-center rounded-[12px] bg-[#111111] px-4 text-[12px] font-black text-white"
              >
                写真選択へ戻る
              </button>
            </section>
          )}

          <AdPlaceholder />

          <section className="mt-5 overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="border-b border-black/10 px-4 py-4">
              <h2 className="text-[15px] font-black">
                解析ステータス
              </h2>

              <p className="mt-1 text-[10px] text-black/55">
                5つの観点から順番に分析しています
              </p>
            </div>

            <div className="px-4 py-2">
              {analysisSteps.map(
                (step, index) => {
                  const isComplete =
                    progress >=
                    step.end;

                  const isActive =
                    index ===
                      activeStepIndex &&
                    progress <
                      100 &&
                    !errorMessage;

                  return (
                    <div
                      key={
                        step.label
                      }
                      className="flex items-center gap-3 border-b border-black/10 py-3.5 last:border-b-0"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-colors ${
                          isComplete
                            ? "bg-[#111111] text-white"
                            : isActive
                              ? "bg-[#EEF6FF] text-[#1677FF]"
                              : "bg-[#F7F9FC] text-black/35"
                        }`}
                      >
                        {isComplete ? (
                          <CheckIcon />
                        ) : isActive ? (
                          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#1677FF]" />
                        ) : (
                          index + 1
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p
                            className={`text-[12px] font-black ${
                              isActive ||
                              isComplete
                                ? "text-[#111111]"
                                : "text-black/35"
                            }`}
                          >
                            {
                              step.label
                            }
                          </p>

                          <p
                            className={`shrink-0 text-[9px] font-black ${
                              isComplete
                                ? "text-[#111111]"
                                : isActive
                                  ? "text-[#1677FF]"
                                  : "text-black/20"
                            }`}
                          >
                            {isComplete
                              ? "完了"
                              : isActive
                                ? "解析中"
                                : "待機中"}
                          </p>
                        </div>

                        <p className="mt-1 truncate text-[10px] text-black/35">
                          {
                            step.description
                          }
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </section>      
          
          <p className="mt-5 text-center text-[10px] leading-5 text-black/35">
            {errorMessage ? (
              <>
                写真選択へ戻り、
                <br />
                もう一度お試しください。
              </>
            ) : (
              <>
                画面を閉じずにそのままお待ちください。
                <br />
                完了すると診断結果へ自動で移動します。
              </>
            )}
          </p>
        </div>
      </div>
            <style jsx global>{`
        @keyframes akanuke-scan {
          0% {
            top: 0%;
          }

          50% {
            top: 100%;
          }

          100% {
            top: 0%;
          }
        }

        .akanuke-scan-line {
          animation:
            akanuke-scan 3.2s
            ease-in-out infinite;
          will-change: top;
        }

        @media (prefers-reduced-motion: reduce) {
          .akanuke-scan-line {
            animation: none;
            top: 50%;
          }
        }
      `}</style>
    </main>
  );
}
