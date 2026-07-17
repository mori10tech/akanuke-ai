"use client";

import { useEffect, useState } from "react";

const steps = [
  "顔の輪郭を解析しています...",
  "眉毛を解析しています...",
  "髪型を解析しています...",
  "肌を解析しています...",
  "おすすめプランを生成しています...",
];

export default function AnalyzePage() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = sessionStorage.getItem("akanukeImage");

    if (!savedImage) {
      window.location.href = "/upload";
      return;
    }

    setImage(savedImage);

    const timer = window.setInterval(() => {
      setProgress((previousProgress) => {
        const nextProgress = previousProgress + 4;

        if (nextProgress >= 100) {
          window.clearInterval(timer);

          window.setTimeout(() => {
            window.location.href = "/result";
          }, 500);

          return 100;
        }

        setStep(
          Math.min(
            Math.floor(nextProgress / 20),
            steps.length - 1,
          ),
        );

        return nextProgress;
      });
    }, 120);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-center text-sm font-bold tracking-[0.3em] text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-6 text-center text-3xl font-bold text-slate-950">
          AI診断中
        </h1>

        <p className="mt-3 text-center text-slate-500">
          数秒で診断が完了します。
        </p>

        {image && (
          <div className="relative mx-auto mt-8 w-full overflow-hidden rounded-3xl bg-slate-100">
            <img
              src={image}
              alt="解析中の顔写真"
              className="block h-auto w-full"
            />

            <div className="scan-area">
              <div className="scan-line" />
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 rounded-3xl border-4 border-blue-500/70" />
          </div>
        )}

        <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-center text-lg font-bold text-blue-600">
          {progress}%
        </p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">
          {steps.map((item, index) => (
            <div
              key={item}
              className="mb-3 flex items-center gap-3 last:mb-0"
            >
              {index < step ? (
                <span>✅</span>
              ) : index === step ? (
                <span>🔄</span>
              ) : (
                <span>⚪</span>
              )}

              <span className="text-slate-700">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}