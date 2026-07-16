"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const analysisSteps = [
  "顔の輪郭を確認しています",
  "眉毛と髪型を分析しています",
  "肌の清潔感を確認しています",
  "4週間プランを作成しています",
];

export default function AnalyzingPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(10);
  const [stepIndex, setStepIndex] = useState(0);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = sessionStorage.getItem("akanukeImage");

    if (!savedImage) {
      router.replace("/upload");
      return;
    }

    setImage(savedImage);

    const timer = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + 10;

        if (nextProgress >= 100) {
          window.clearInterval(timer);

          window.setTimeout(() => {
            router.push("/result");
          }, 600);

          return 100;
        }

        return nextProgress;
      });

      setStepIndex((currentStep) =>
        Math.min(currentStep + 1, analysisSteps.length - 1),
      );
    }, 500);

    return () => window.clearInterval(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-bold tracking-[0.25em] text-blue-600">
          AI ANALYZING
        </p>

        <h1 className="mt-5 text-3xl font-bold text-slate-950">
          印象を解析中...
        </h1>

        <p className="mt-3 text-slate-500">
          改善効果の高いポイントを整理しています。
        </p>

        {image && (
          <div className="relative mx-auto mt-8 h-56 w-56 overflow-hidden rounded-3xl bg-slate-100">
            <img
              src={image}
              alt="解析中の顔写真"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 border-4 border-blue-500/70" />

            <div className="absolute left-0 right-0 top-0 h-1 bg-blue-500 shadow-[0_0_16px_rgba(37,99,235,0.9)] animate-[scan_2s_ease-in-out_infinite]" />
          </div>
        )}

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 font-bold text-blue-600">
          {progress}%
        </p>

        <div className="mt-8 space-y-3 text-left">
          {analysisSteps.map((step, index) => (
            <div
              key={step}
              className={`rounded-2xl border p-4 ${
                index <= stepIndex
                  ? "border-blue-200 bg-blue-50"
                  : "border-slate-100 bg-white"
              }`}
            >
              <span className="mr-3">
                {index < stepIndex
                  ? "✓"
                  : index === stepIndex
                    ? "●"
                    : "○"}
              </span>

              {step}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}