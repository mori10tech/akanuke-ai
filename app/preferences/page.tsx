"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ImpressionOption = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

const MAX_SELECTIONS = 2;
const RECOMMENDED_OPTION_ID = "ai-recommended";
const STORAGE_KEY = "akanukeDesiredImpressions";

const impressionOptions: ImpressionOption[] = [
  {
    id: "fresh",
    label: "爽やか",
    description: "明るく、清潔で好印象な雰囲気",
    icon: "🌿",
  },
  {
    id: "mature",
    label: "大人っぽい",
    description: "落ち着きがあり、洗練された印象",
    icon: "🕴️",
  },
  {
    id: "clean",
    label: "清潔感",
    description: "髪・眉・肌を整えた万人受けする印象",
    icon: "✨",
  },
  {
    id: "attractive",
    label: "異性ウケ",
    description: "親しみやすさと魅力を高める方向",
    icon: "❤️",
  },
  {
    id: "business",
    label: "ビジネス向き",
    description: "仕事で信頼されやすい誠実な印象",
    icon: "💼",
  },
  {
    id: "korean",
    label: "韓国系",
    description: "透明感とトレンド感のあるスタイル",
    icon: "🇰🇷",
  },
  {
    id: "masculine",
    label: "男らしい",
    description: "力強く、頼りがいのある印象",
    icon: "💪",
  },
  {
    id: "gentle",
    label: "優しそう",
    description: "柔らかく、話しかけやすい雰囲気",
    icon: "😊",
  },
  {
    id: "smart",
    label: "知的・スマート",
    description: "理性的で、すっきり洗練された印象",
    icon: "🧠",
  },
  {
    id: RECOMMENDED_OPTION_ID,
    label: "AIにおすすめしてもらう",
    description: "顔立ちをもとに、似合う方向をAIに任せる",
    icon: "✦",
  },
];

export default function PreferencesPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const image = window.sessionStorage.getItem("akanukeImage");

    if (!image) {
      router.replace("/upload");
      return;
    }

    const savedSelections = window.sessionStorage.getItem(STORAGE_KEY);

    if (savedSelections) {
      try {
        const parsedSelections = JSON.parse(savedSelections) as string[];

        const validSelections = parsedSelections.filter((id) =>
          impressionOptions.some((option) => option.id === id),
        );

        window.setTimeout(() => {
          setSelectedIds(validSelections.slice(0, MAX_SELECTIONS));
        }, 0);
      } catch {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    window.setTimeout(() => {
      setIsReady(true);
    }, 0);
  }, [router]);

  const selectedLabels = useMemo(
    () =>
      selectedIds
        .map(
          (selectedId) =>
            impressionOptions.find((option) => option.id === selectedId)?.label,
        )
        .filter((label): label is string => Boolean(label)),
    [selectedIds],
  );

  const toggleSelection = (optionId: string) => {
    setNotice(null);

    if (optionId === RECOMMENDED_OPTION_ID) {
      setSelectedIds((currentIds) =>
        currentIds.includes(RECOMMENDED_OPTION_ID)
          ? []
          : [RECOMMENDED_OPTION_ID],
      );

      return;
    }

    setSelectedIds((currentIds) => {
      const withoutRecommended = currentIds.filter(
        (id) => id !== RECOMMENDED_OPTION_ID,
      );

      if (withoutRecommended.includes(optionId)) {
        return withoutRecommended.filter((id) => id !== optionId);
      }

      if (withoutRecommended.length >= MAX_SELECTIONS) {
        setNotice("選択できるのは最大2つまでです。");
        return withoutRecommended;
      }

      return [...withoutRecommended, optionId];
    });
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) {
      setNotice("なりたい印象を1つ以上選択してください。");
      return;
    }

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(selectedIds),
    );

    router.push("/analyzing");
  };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-32 pt-8">
      <div className="mx-auto max-w-md">
        <header>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-slate-700 shadow-sm transition active:scale-95"
              aria-label="前の画面へ戻る"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              <span className="h-2 w-8 rounded-full bg-blue-600" />
              <span className="h-2 w-8 rounded-full bg-slate-200" />
            </div>

            <div className="h-11 w-11" aria-hidden="true" />
          </div>

          <p className="mt-8 text-sm font-black tracking-[0.2em] text-blue-600">
            AKANUKE.AI
          </p>

          <p className="mt-5 text-xs font-black tracking-[0.16em] text-slate-400">
            STEP 1 OF 2
          </p>

          <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950">
            どんな印象に
            <br />
            なりたいですか？
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            理想に近いものを最大2つ選んでください。回答は髪型・眉毛・肌の提案内容に反映されます。
          </p>
        </header>

        <section className="mt-7 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg text-white shadow-lg shadow-blue-200">
              ✦
            </span>

            <div>
              <p className="text-sm font-black text-slate-900">
                あなた専用の提案に調整します
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                例えば「爽やか × ビジネス向き」なら、職場でも取り入れやすい清潔感のある提案を優先します。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3">
          {impressionOptions.map((option) => {
            const isSelected = selectedIds.includes(option.id);
            const selectionNumber = selectedIds.indexOf(option.id) + 1;
            const isRecommended =
              option.id === RECOMMENDED_OPTION_ID;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleSelection(option.id)}
                aria-pressed={isSelected}
                className={`relative min-h-44 rounded-3xl border p-4 text-left transition duration-200 active:scale-[0.98] ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200"
                    : isRecommended
                      ? "border-slate-800 bg-slate-950 text-white shadow-lg"
                      : "border-slate-200 bg-white text-slate-950 shadow-sm hover:border-blue-200"
                }`}
              >
                {isSelected && (
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-blue-600 shadow-sm">
                    {selectionNumber}
                  </span>
                )}

                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${
                    isSelected
                      ? "bg-white/15"
                      : isRecommended
                        ? "bg-white/10"
                        : "bg-slate-100"
                  }`}
                >
                  {option.icon}
                </span>

                <p className="mt-4 text-base font-black leading-6">
                  {option.label}
                </p>

                <p
                  className={`mt-2 text-xs leading-5 ${
                    isSelected || isRecommended
                      ? "text-white/70"
                      : "text-slate-500"
                  }`}
                >
                  {option.description}
                </p>
              </button>
            );
          })}
        </section>

        <div className="mt-5 min-h-6 text-center">
          {notice ? (
            <p className="text-sm font-bold text-red-500">
              {notice}
            </p>
          ) : selectedLabels.length > 0 ? (
            <p className="text-sm font-bold text-blue-600">
              選択中：{selectedLabels.join(" × ")}
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              1〜2つ選択してください
            </p>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/90 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleContinue}
            disabled={selectedIds.length === 0}
            className="w-full rounded-2xl bg-blue-600 py-4 text-base font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            この内容で診断する
          </button>

          <p className="mt-2 text-center text-xs font-bold text-slate-400">
            {selectedIds.length} / {MAX_SELECTIONS} 選択中
          </p>
        </div>
      </div>
    </main>
  );
}