"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ImpressionOption = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

const MAX_SELECTIONS = 2;
const RECOMMENDED_OPTION_ID = "ai-recommended";
const IMAGE_STORAGE_KEY = "akanukeImage";
const IMPRESSION_STORAGE_KEY = "akanukeDesiredImpressions";

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
    label: "AIにおまかせ",
    description: "顔立ちをもとに、似合う方向をAIが判断",
    icon: "✦",
  },
];

export default function UploadPage() {
  const router = useRouter();
  const preferenceSectionRef = useRef<HTMLElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedImage = window.sessionStorage.getItem(IMAGE_STORAGE_KEY);
    const savedImpressions = window.sessionStorage.getItem(
      IMPRESSION_STORAGE_KEY,
    );

    if (savedImage) {
      setPreview(savedImage);
    }

    if (savedImpressions) {
      try {
        const parsedSelections = JSON.parse(savedImpressions) as string[];

        const validSelections = parsedSelections.filter((id) =>
          impressionOptions.some((option) => option.id === id),
        );

        setSelectedIds(validSelections.slice(0, MAX_SELECTIONS));
      } catch {
        window.sessionStorage.removeItem(IMPRESSION_STORAGE_KEY);
      }
    }

    setIsLoaded(true);
  }, []);

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

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください。");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("10MB以下の画像を選択してください。");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setPreview(reader.result);
      setNotice(null);

      window.sessionStorage.setItem(IMAGE_STORAGE_KEY, reader.result);

      window.setTimeout(() => {
        preferenceSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);
    };

    reader.onerror = () => {
      alert("画像の読み込みに失敗しました。別の画像を選択してください。");
    };

    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    setPreview(null);
    setSelectedIds([]);
    setNotice(null);

    window.sessionStorage.removeItem(IMAGE_STORAGE_KEY);
    window.sessionStorage.removeItem(IMPRESSION_STORAGE_KEY);
  };

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
        setNotice("選択できる印象は最大2つまでです。");
        return withoutRecommended;
      }

      return [...withoutRecommended, optionId];
    });
  };

  const handleDiagnosis = () => {
    if (!preview) {
      setNotice("顔写真を選択してください。");
      return;
    }

    if (selectedIds.length === 0) {
      setNotice("なりたい印象を1つ以上選択してください。");

      preferenceSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.sessionStorage.setItem(
      IMPRESSION_STORAGE_KEY,
      JSON.stringify(selectedIds),
    );

    router.push("/analyzing");
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
          aria-label="読み込み中"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-36 pt-6 sm:px-6 sm:pt-10">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-7">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-bold text-slate-700 shadow-sm transition active:scale-95"
            aria-label="トップページへ戻る"
          >
            ←
          </button>

          <p className="mt-7 text-sm font-black tracking-[0.22em] text-blue-600">
            AKANUKE.AI
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-10 rounded-full bg-blue-600" />
            <span
              className={`h-2 w-10 rounded-full transition-colors ${
                preview ? "bg-blue-600" : "bg-slate-200"
              }`}
            />
          </div>

          <p className="mt-5 text-xs font-black tracking-[0.16em] text-slate-400">
            AI BEAUTY DIAGNOSIS
          </p>

          <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
            写真をもとに、
            <br />
            あなたの魅力を分析。
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            正面から撮影した顔写真を選択し、なりたい印象を教えてください。
            髪型・眉毛・肌・全体の印象をAIが分析します。
          </p>
        </header>

        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              1
            </span>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                顔写真を選択
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                JPG・PNG・WEBP／最大10MB
              </p>
            </div>
          </div>

          <label className="mt-5 block cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-blue-300 hover:bg-blue-50/30">
            {preview ? (
              <div className="relative bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="選択した顔写真"
                  className="block max-h-[520px] min-h-80 w-full object-contain"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-4 pb-4 pt-14">
                  <p className="text-center text-sm font-bold text-white">
                    タップして写真を変更
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-80 items-center justify-center px-6 text-center">
                <div>
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl">
                    📷
                  </span>

                  <p className="mt-5 text-lg font-black text-slate-800">
                    タップして写真を選択
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    顔全体がはっきり見える
                    <br />
                    正面の写真がおすすめです
                  </p>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              className="hidden"
            />
          </label>

          {preview && (
            <button
              type="button"
              onClick={handleResetImage}
              className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
            >
              写真を削除して選び直す
            </button>
          )}

          <div className="mt-5 rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-black text-blue-700">
              きれいに診断するためのポイント
            </p>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li className="flex gap-2">
                <span className="font-black text-blue-600">✓</span>
                明るい場所で正面を向く
              </li>

              <li className="flex gap-2">
                <span className="font-black text-blue-600">✓</span>
                帽子・マスク・サングラスを外す
              </li>

              <li className="flex gap-2">
                <span className="font-black text-blue-600">✓</span>
                加工やフィルターを使用していない写真
              </li>
            </ul>
          </div>
        </section>

        {preview && (
          <section
            ref={preferenceSectionRef}
            className="scroll-mt-6 pt-7"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                  2
                </span>

                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    なりたい印象を選択
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    最大2つまで選択できます
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg text-white shadow-lg shadow-blue-200">
                    ✦
                  </span>

                  <div>
                    <p className="text-sm font-black text-slate-900">
                      提案内容をあなた向けに調整
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      選んだ印象を、髪型・眉毛・肌・商品の提案内容に反映します。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
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
                      className={`relative min-h-40 rounded-3xl border p-4 text-left transition duration-200 active:scale-[0.98] ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200"
                          : isRecommended
                            ? "border-slate-900 bg-slate-950 text-white shadow-lg"
                            : "border-slate-200 bg-white text-slate-950 shadow-sm hover:border-blue-300 hover:bg-blue-50/30"
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
              </div>

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
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={handleDiagnosis}
            disabled={!preview || selectedIds.length === 0}
            className="w-full rounded-2xl bg-yellow-400 py-4 text-base font-black text-slate-950 shadow-lg shadow-yellow-200/70 transition hover:bg-yellow-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            無料でAI診断をはじめる
            <span className="ml-2" aria-hidden="true">
              ›
            </span>
          </button>

          <p className="mt-2 text-center text-xs font-bold text-slate-400">
            約1分・完全無料
          </p>
        </div>
      </div>
    </main>
  );
}