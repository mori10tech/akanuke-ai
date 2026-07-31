"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const IMAGE_STORAGE_KEY = "akanukeImage";
const ANALYSIS_DURATION_MS = 7200;
const REDIRECT_DELAY_MS = 700;

const analysisSteps = [
  {
    label: "顔の輪郭",
    description: "骨格とフェイスラインを確認",
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
    description: "顔型に合うシルエットを分析",
    start: 42,
    end: 62,
  },
  {
    label: "肌印象",
    description: "清潔感とケアポイントを分析",
    start: 62,
    end: 82,
  },
  {
    label: "垢抜けプラン",
    description: "優先順位を整理して提案を生成",
    start: 82,
    end: 100,
  },
];

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

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function SparkleIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
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
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
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
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function AnalyzingPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage =
      window.sessionStorage.getItem(IMAGE_STORAGE_KEY);

    if (!savedImage) {
      router.replace("/upload");
      return;
    }

    const imageTimer = window.setTimeout(() => {
      setImage(savedImage);
    }, 0);

    const startedAt = Date.now();

    let redirectTimer: number | undefined;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;

      const nextProgress = Math.min(
        100,
        Math.round(
          (elapsed / ANALYSIS_DURATION_MS) * 100,
        ),
      );

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(progressTimer);

        redirectTimer = window.setTimeout(() => {
          router.push("/result");
        }, REDIRECT_DELAY_MS);
      }
    }, 80);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(imageTimer);

      if (redirectTimer) {
        window.clearTimeout(redirectTimer);
      }
    };
  }, [router]);

  const activeStepIndex = useMemo(() => {
    const index = analysisSteps.findIndex(
      (step) =>
        progress >= step.start &&
        progress < step.end,
    );

    return index === -1
      ? analysisSteps.length - 1
      : index;
  }, [progress]);

  const activeStep =
    analysisSteps[activeStepIndex];

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-[#fafafa] shadow-[0_0_40px_rgba(15,23,42,0.08)]">
        <header className="sticky top-0 z-40 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
            <Link
              href="/upload"
              aria-label="写真選択へ戻る"
              className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-neutral-100 active:scale-95"
            >
              <ArrowLeftIcon />
            </Link>

            <Link
              href="/"
              className="text-center text-[21px] font-black tracking-[-0.03em]"
            >
              AKANUKE.AI
            </Link>

            <button
              type="button"
              aria-label="メニューを開く"
              className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-neutral-100 active:scale-95"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        <div className="px-4 pb-10 pt-6">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#eadfbd] bg-[#fff9e9] text-[#bd8205]">
              <SparkleIcon className="h-6 w-6" />
            </div>

            <p className="mt-4 text-[11px] font-black tracking-[0.15em] text-[#b77c00]">
              AI BEAUTY ANALYSIS
            </p>

            <h1 className="mt-2 text-[28px] font-black tracking-[-0.04em]">
              AIがあなたを分析中
            </h1>

            <p className="mt-2 text-[12px] leading-5 text-neutral-500">
              顔立ちとなりたい印象から、
              あなた専用の
              <br />
              垢抜けプランを作成しています。
            </p>
          </div>

          <section className="mt-6 overflow-hidden rounded-[20px] border border-[#dedede] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e9edf0]">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="AIが解析している顔写真"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full animate-pulse bg-neutral-200" />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45" />

              <div className="pointer-events-none absolute inset-[7%] rounded-[24px] border border-white/70">
                <span className="absolute -left-px -top-px h-8 w-8 rounded-tl-[24px] border-l-2 border-t-2 border-[#d6a11d]" />

                <span className="absolute -right-px -top-px h-8 w-8 rounded-tr-[24px] border-r-2 border-t-2 border-[#d6a11d]" />

                <span className="absolute -bottom-px -left-px h-8 w-8 rounded-bl-[24px] border-b-2 border-l-2 border-[#d6a11d]" />

                <span className="absolute -bottom-px -right-px h-8 w-8 rounded-br-[24px] border-b-2 border-r-2 border-[#d6a11d]" />
              </div>

              <div
                className="pointer-events-none absolute inset-x-[7%] z-10 h-px bg-gradient-to-r from-transparent via-[#f0c65a] to-transparent shadow-[0_0_18px_rgba(240,198,90,0.9)] transition-[top] duration-100 ease-linear"
                style={{
                  top: `${
                    10 + ((progress * 0.8) % 80)
                  }%`,
                }}
              />

              <div className="absolute inset-x-4 bottom-4 rounded-[14px] border border-white/25 bg-black/60 px-4 py-3 text-white backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-white/60">
                      現在の解析項目
                    </p>

                    <p className="mt-0.5 text-[14px] font-black">
                      {activeStep.label}
                    </p>
                  </div>

                  <span className="shrink-0 text-[25px] font-black tracking-[-0.04em] text-[#f0c65a]">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="h-2 overflow-hidden rounded-full bg-[#ececec]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#b77c00] to-[#e0b342] transition-[width] duration-200 ease-out"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[11px] font-black text-[#b77c00]">
                  {progress === 100
                    ? "分析が完了しました"
                    : activeStep.description}
                </p>

                <p className="shrink-0 text-[10px] text-neutral-400">
                  約1分
                </p>
              </div>
            </div>
          </section>

          <section className="mt-5 overflow-hidden rounded-[18px] border border-[#dedede] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
            <div className="border-b border-[#eeeeee] px-4 py-4">
              <h2 className="text-[15px] font-black">
                解析ステータス
              </h2>

              <p className="mt-1 text-[10px] text-neutral-500">
                5つの観点から順番に分析しています
              </p>
            </div>

            <div className="px-4 py-2">
              {analysisSteps.map(
                (step, index) => {
                  const isComplete =
                    progress >= step.end;

                  const isActive =
                    index === activeStepIndex &&
                    progress < 100;

                  return (
                    <div
                      key={step.label}
                      className="flex items-center gap-3 border-b border-[#f0f0f0] py-3.5 last:border-b-0"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-colors ${
                          isComplete
                            ? "bg-black text-white"
                            : isActive
                              ? "bg-[#fff3d2] text-[#b77c00]"
                              : "bg-[#f3f3f3] text-neutral-400"
                        }`}
                      >
                        {isComplete ? (
                          <CheckIcon />
                        ) : isActive ? (
                          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#c99416]" />
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
                                ? "text-black"
                                : "text-neutral-400"
                            }`}
                          >
                            {step.label}
                          </p>

                          <p
                            className={`shrink-0 text-[9px] font-black ${
                              isComplete
                                ? "text-black"
                                : isActive
                                  ? "text-[#b77c00]"
                                  : "text-neutral-300"
                            }`}
                          >
                            {isComplete
                              ? "完了"
                              : isActive
                                ? "解析中"
                                : "待機中"}
                          </p>
                        </div>

                        <p className="mt-1 truncate text-[10px] text-neutral-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </section>

          <aside className="mt-5 rounded-[14px] bg-[#fff9e9] px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#bd8205] shadow-sm">
                <LockIcon />
              </span>

              <div>
                <p className="text-[12px] font-black text-[#b77c00]">
                  写真は安全に処理されます
                </p>

                <p className="mt-1 text-[10px] leading-5 text-neutral-600">
                  アップロードした写真は診断のためだけに使用し、解析後は安全に取り扱います。
                </p>
              </div>
            </div>
          </aside>

          <p className="mt-5 text-center text-[10px] leading-5 text-neutral-400">
            画面を閉じずにそのままお待ちください。
            <br />
            完了すると診断結果へ自動で移動します。
          </p>
        </div>
      </div>
    </main>
  );
}