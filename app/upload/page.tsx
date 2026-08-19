"use client";

/* eslint-disable react-hooks/set-state-in-effect -- sessionStorageの状態を初回表示時に復元するため */

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";

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
const TARGET_STORAGE_KEY = "akanukeTargetImpression";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";
const RESULT_BACK_HREF_STORAGE_KEY = "akanukeResultBackHref";

const impressionOptions: ImpressionOption[] = [
  {
    id: "fresh",
    label: "爽やか",
    description: "明るく清潔感のある、好印象な雰囲気",
    icon: "🌿",
  },
  {
    id: "mature",
    label: "大人っぽい",
    description: "落ち着きがあり、洗練された印象",
    icon: "♟",
  },
  {
    id: "clean",
    label: "清潔感",
    description: "髪・眉・肌を整えた万人受けする印象",
    icon: "✦",
  },
  {
    id: "attractive",
    label: "異性ウケ",
    description: "親しみやすさと魅力を高める方向",
    icon: "♡",
  },
  {
    id: "business",
    label: "ビジネス向き",
    description: "仕事で信頼されやすい誠実な印象",
    icon: "▣",
  },
  {
    id: "korean",
    label: "韓国系",
    description: "透明感とトレンド感のあるスタイル",
    icon: "◇",
  },
  {
    id: "masculine",
    label: "男らしい",
    description: "力強く、頼りがいのある印象",
    icon: "◆",
  },
  {
    id: "gentle",
    label: "優しそう",
    description: "柔らかく、話しかけやすい雰囲気",
    icon: "◡",
  },
  {
    id: "smart",
    label: "知的・スマート",
    description: "理性的で、すっきり洗練された印象",
    icon: "◎",
  },
  {
    id: RECOMMENDED_OPTION_ID,
    label: "AIにおまかせ",
    description: "顔立ちをもとに、似合う方向をAIが判断",
    icon: "✦",
  },
];

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
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

export default function UploadPage() {
  const router = useRouter();
  const preferenceSectionRef = useRef<HTMLElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [
    hasPreviousResult,
    setHasPreviousResult,
  ] = useState(false);

  useEffect(() => {
    const savedImage = window.sessionStorage.getItem(IMAGE_STORAGE_KEY);
    const savedResult =
      window.sessionStorage.getItem(
        RESULT_STORAGE_KEY,
      );
    setHasPreviousResult(Boolean(savedResult));

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
    setHasPreviousResult(false);

    window.sessionStorage.removeItem(IMAGE_STORAGE_KEY);
    window.sessionStorage.removeItem(IMPRESSION_STORAGE_KEY);
    window.sessionStorage.removeItem(TARGET_STORAGE_KEY);
    window.sessionStorage.removeItem(RESULT_STORAGE_KEY);
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

  const handleReturnToResult = () => {
    window.sessionStorage.removeItem(
      RESULT_BACK_HREF_STORAGE_KEY,
    );

    router.push("/result");
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

    const isAiRecommended =
      selectedIds.includes(RECOMMENDED_OPTION_ID);

    const targetImpression = isAiRecommended
      ? "AIにおまかせ。写真から本人に似合う垢抜け方向を判断してください。"
      : selectedLabels.join("・");

    window.sessionStorage.setItem(
      TARGET_STORAGE_KEY,
      targetImpression,
    );

    /*
     * 前回の診断結果が残っている場合に、
     * 新しい診断結果と混ざらないよう削除します。
     */
    window.sessionStorage.removeItem(
      RESULT_STORAGE_KEY,
    );
    window.sessionStorage.removeItem(
      RESULT_BACK_HREF_STORAGE_KEY,
    );

    setHasPreviousResult(false);

    router.push("/analyzing");
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EEF6FF]">
        <div
          className="h-9 w-9 animate-spin rounded-full border-[3px] border-black/10 text-[#1677FF]"
          aria-label="読み込み中"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEF6FF] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)]">
        <AppHeader
  backHref="/"
  backLabel="前のページへ戻る"
  backMode="history"
/>

        <div className="px-4 pb-36 pt-5">
          <div        >
            <div>
              <p className="text-[11px] font-black tracking-[0.14em] text-[#1677FF]">
                AI BEAUTY DIAGNOSIS
              </p>

              <h1 className="mt-2 text-[28px] font-black leading-[1.25] tracking-[-0.04em]">
                写真をもとに、
                <br />
                あなたの魅力を分析。
              </h1>
            </div>

          </div>

          <p className="mt-4 text-[13px] leading-6 text-black/60">
            顔写真となりたい印象をもとに、髪型・眉毛・肌・全体の印象をAIが分析します。
          </p>
          
          {hasPreviousResult && (
  <div className="mt-5 rounded-[18px] border border-[#FFD400]/40 bg-[#FFF9D9] p-4">
    <p className="text-[11px] font-black text-[#111111]">
      診断済みの方
    </p>

    <p className="mt-1 text-[10px] leading-5 text-black/55">
      再診断せず、保存されている結果を確認できます。
    </p>

    <button
      type="button"
      onClick={handleReturnToResult}
      className="mt-3 flex min-h-[52px] w-full items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 active:scale-[0.99]"
    >
      診断結果に戻る

      <span
        className="ml-3"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  </div>
)}

          <div className="mt-5 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full text-[#1677FF]" />
            <div
              className={`h-1.5 flex-1 rounded-full transition-colors ${preview ? "text-[#1677FF]" : "bg-neutral-200"
                }`}
            />
          </div>

          <section className="mt-5 overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_6px_22px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 border-b border-black/10 px-4 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[12px] font-black text-white">
                1
              </span>

              <div>
                <h2 className="text-[16px] font-black">顔写真を選択</h2>
                <p className="mt-0.5 text-[10px] text-black/60">
                  JPG・PNG・WEBP／最大10MB
                </p>
              </div>
            </div>

            <div className="p-4">
              <label className="block cursor-pointer overflow-hidden rounded-[16px] border border-dashed border-black/20 bg-white transition text-[#1677FF]">
                {preview ? (
                  <div className="relative bg-[#EEF6FF]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview}
                      alt="選択した顔写真"
                      className="block max-h-[500px] min-h-[320px] w-full object-contain"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-16">
                      <p className="text-center text-[12px] font-black text-white">
                        タップして写真を変更
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
                    <div>
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg">
                        <CameraIcon />
                      </span>

                      <p className="mt-5 text-[17px] font-black text-[#111111]">
                        タップして写真を選択
                      </p>

                      <p className="mt-2 text-[12px] leading-5 text-black/60">
                        顔全体がはっきり見える
                        <br />
                        正面の写真がおすすめです
                      </p>

                      <span className="mt-5 inline-flex rounded-full bg-[#FFF9D9] px-3 py-1.5 text-[10px] font-black text-[#1677FF]">
                        写真は診断以外には使用しません
                      </span>
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
                  className="mt-3 w-full rounded-[10px] border border-black/10 py-3 text-[12px] font-black transition hover:bg-[#EEF6FF]"
                >
                  写真を削除して選び直す
                </button>
              )}

              <div className="mt-4 rounded-[14px] bg-[#FFF9D9] p-4">
                <p className="text-[12px] font-black text-[#1677FF]">
                  きれいに診断するためのポイント
                </p>

                <ul className="mt-3 space-y-2.5">
                  {[
                    "明るい場所で正面を向く",
                    "帽子・マスク・サングラスを外す",
                    "加工やフィルターを使用しない",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[11px] text-black/70"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#1677FF]">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {preview && (
            <section
              ref={preferenceSectionRef}
              className="scroll-mt-24 pt-5"
            >
              <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_6px_22px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 border-b border-black/10 px-4 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[12px] font-black text-white">
                    2
                  </span>

                  <div>
                    <h2 className="text-[16px] font-black">
                      なりたい印象を選択
                    </h2>
                    <p className="mt-0.5 text-[10px] text-black/60">
                      最大2つまで選択できます
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="rounded-[14px] bg-[#FFF9D9] p-4">
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-sm">
                        <SparkleIcon />
                      </span>

                      <div>
                        <p className="text-[12px] font-black text-[#1677FF]">
                          AIからのアドバイス
                        </p>
                        <p className="mt-1 text-[11px] leading-5 text-black/70">
                          選んだ印象を、髪型・眉毛・肌・商品・サロンの提案内容に反映します。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {impressionOptions.map((option) => {
                      const isSelected = selectedIds.includes(option.id);
                      const selectionNumber =
                        selectedIds.indexOf(option.id) + 1;
                      const isRecommended =
                        option.id === RECOMMENDED_OPTION_ID;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleSelection(option.id)}
                          aria-pressed={isSelected}
                          className={`relative min-h-[130px] rounded-[14px] border p-3.5 text-left transition duration-200 active:scale-[0.98] ${isSelected
                            ? "border-2 border-[#1677FF] bg-[#FCFDFF] text-[#111111] shadow-[0_8px_24px_rgba(22,119,255,0.08)] -translate-y-0.5"
                            : isRecommended
                              ? "border-[#FFD400] bg-[#FFF9D9] text-[#111111]"
                              : "border-black/10 bg-white text-[#111111] hover:border-[#1677FF]"
                            }`}
                        >
                          {isSelected && (
                            <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE35A] text-[10px] font-black text-[#111111]">
                              {selectionNumber}
                            </span>
                          )}

                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF6FF] text-[17px] text-[#1677FF]">
                            {option.icon}
                          </span>

                          <p className="mt-3 text-[13px] font-black text-[#111111]">
                            {option.label}
                          </p>

                          <p className="mt-1.5 text-[10px] leading-4 text-black/60">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 min-h-6 text-center">
                    {notice ? (
                      <p className="text-[11px] font-black text-red-500">
                        {notice}
                      </p>
                    ) : selectedLabels.length > 0 ? (
                      <p className="text-[11px] font-black text-[#1677FF]">
                        選択中：{selectedLabels.join(" × ")}
                      </p>
                    ) : (
                      <p className="text-[11px] text-black/40">
                        1〜2つ選択してください
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
          <div className="mx-auto w-full max-w-[448px]">
            <button
              type="button"
              onClick={handleDiagnosis}
              disabled={!preview || selectedIds.length === 0}
              className="min-h-[52px] w-full rounded-[11px] bg-black px-4 text-[14px] font-black text-white shadow-lg transition hover:bg-black/85 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/40 disabled:shadow-none"
            >
              無料でAI診断をはじめる
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </button>

            <p className="mt-2 text-center text-[9px] font-bold text-black/40">
              約1分・完全無料
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
