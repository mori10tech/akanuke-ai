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

type DiagnosisUsage = {
  limit: number;
  used: number;
  remaining: number;
  reached: boolean;
  resetsAt: string;
};

const MAX_SELECTIONS = 2;
const RECOMMENDED_OPTION_ID = "ai-recommended";
const IMAGE_STORAGE_KEY = "akanukeImage";
const IMPRESSION_STORAGE_KEY = "akanukeDesiredImpressions";
const TARGET_STORAGE_KEY = "akanukeTargetImpression";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";
const RESULT_BACK_HREF_STORAGE_KEY = "akanukeResultBackHref";
const MAX_IMAGE_FILE_SIZE =
  10 * 1024 * 1024;

const MAX_IMAGE_DIMENSION = 1600;

const IMAGE_JPEG_QUALITY = 0.85;

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

function loadImage(
  dataUrl: string,
): Promise<HTMLImageElement> {
  return new Promise(
    (resolve, reject) => {
      const image =
        new window.Image();

      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        reject(
          new Error(
            "画像を読み込めませんでした。",
          ),
        );
      };

      image.src = dataUrl;
    },
  );
}

function readFileAsDataUrl(
  file: File,
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        if (
          typeof reader.result !==
          "string"
        ) {
          reject(
            new Error(
              "画像データを読み込めませんでした。",
            ),
          );

          return;
        }

        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(
          new Error(
            "画像の読み込みに失敗しました。",
          ),
        );
      };

      reader.readAsDataURL(file);
    },
  );
}

async function resizeImage(
  file: File,
): Promise<string> {
  const originalDataUrl =
    await readFileAsDataUrl(file);

  const image =
    await loadImage(
      originalDataUrl,
    );

  const originalWidth =
    image.naturalWidth;

  const originalHeight =
    image.naturalHeight;

  if (
    originalWidth <= 0 ||
    originalHeight <= 0
  ) {
    throw new Error(
      "画像サイズを取得できませんでした。",
    );
  }

  const longestSide =
    Math.max(
      originalWidth,
      originalHeight,
    );

  /*
   * 長辺1600px以内なら、
   * 不要な拡大は行いません。
   */
  const scale =
    Math.min(
      1,
      MAX_IMAGE_DIMENSION /
        longestSide,
    );

  const resizedWidth =
    Math.max(
      1,
      Math.round(
        originalWidth * scale,
      ),
    );

  const resizedHeight =
    Math.max(
      1,
      Math.round(
        originalHeight * scale,
      ),
    );

  const canvas =
    document.createElement(
      "canvas",
    );

  canvas.width =
    resizedWidth;

  canvas.height =
    resizedHeight;

  const context =
    canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "画像処理を開始できませんでした。",
    );
  }

  /*
   * JPEG化するため背景を白にします。
   * PNGの透過部分が黒くなることを防ぎます。
   */
  context.fillStyle =
    "#FFFFFF";

  context.fillRect(
    0,
    0,
    resizedWidth,
    resizedHeight,
  );

  context.imageSmoothingEnabled =
    true;

  context.imageSmoothingQuality =
    "high";

  context.drawImage(
    image,
    0,
    0,
    resizedWidth,
    resizedHeight,
  );

  const resizedDataUrl =
    canvas.toDataURL(
      "image/jpeg",
      IMAGE_JPEG_QUALITY,
    );

  if (
    !resizedDataUrl.startsWith(
      "data:image/jpeg",
    )
  ) {
    throw new Error(
      "画像の変換に失敗しました。",
    );
  }

  return resizedDataUrl;
}

export default function UploadPage() {
  const router = useRouter();
  const preferenceSectionRef = useRef<HTMLElement | null>(null);

  const cameraInputRef =
    useRef<HTMLInputElement | null>(null);

  const libraryInputRef =
    useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

    const [
    diagnosisUsage,
    setDiagnosisUsage,
  ] = useState<DiagnosisUsage | null>(
    null,
  );

  const [
    isUsageLoading,
    setIsUsageLoading,
  ] = useState(true);

  const [
    usageError,
    setUsageError,
  ] = useState<string | null>(null);

  const [
    hasPreviousResult,
    setHasPreviousResult,
  ] = useState(false);

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

useEffect(() => {
  let isActive = true;

  async function checkPreviousResult() {
    try {
      const response = await fetch(
        "/api/diagnoses/latest",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!response.ok) {
        return;
      }

      const data =
        (await response.json()) as {
          hasDiagnosis?: boolean;
        };

      if (isActive) {
        setHasPreviousResult(
          data.hasDiagnosis === true,
        );
      }
    } catch (error) {
      console.error(
        "[AKANUKE.AI] 診断履歴確認エラー",
        error,
      );
    }
  }

  void checkPreviousResult();

  return () => {
    isActive = false;
  };
}, []);

    useEffect(() => {
    let isActive = true;

    async function loadDiagnosisUsage() {
      try {
        const response = await fetch(
          "/api/diagnosis-usage",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "診断回数を取得できませんでした。",
          );
        }

        const result =
          (await response.json()) as DiagnosisUsage;

        if (isActive) {
          setDiagnosisUsage(result);
          setUsageError(null);
        }
      } catch (error) {
        console.error(
          "[AKANUKE.AI] 診断回数取得エラー",
          error,
        );

        if (isActive) {
          setUsageError(
            "診断回数を確認できませんでした。",
          );
        }
      } finally {
        if (isActive) {
          setIsUsageLoading(false);
        }
      }
    }

    void loadDiagnosisUsage();

    return () => {
      isActive = false;
    };
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

  const handleImage = async (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file =
    event.target.files?.[0];

  if (!file) {
    return;
  }

  if (
    !file.type.startsWith(
      "image/",
    )
  ) {
    setNotice(
      "画像ファイルを選択してください。",
    );

    event.target.value = "";

    return;
  }

  if (
    ![
      "image/jpeg",
      "image/png",
      "image/webp",
    ].includes(file.type)
  ) {
    setNotice(
      "JPG・PNG・WEBP形式の画像を選択してください。",
    );

    event.target.value = "";

    return;
  }

  if (
    file.size >
    MAX_IMAGE_FILE_SIZE
  ) {
    setNotice(
      "画像の容量が大きすぎます。10MB以下の写真を選択してください。",
    );

    event.target.value = "";

    return;
  }

  try {
    setNotice(
      "写真を診断用に最適化しています...",
    );

    const optimizedImage =
      await resizeImage(file);

    /*
     * 先にsessionStorageへ保存して、
     * 容量超過などが発生しないことを確認します。
     */
    window.sessionStorage.setItem(
      IMAGE_STORAGE_KEY,
      optimizedImage,
    );

    setPreview(
      optimizedImage,
    );

    setNotice(null);

    window.setTimeout(() => {
      preferenceSectionRef.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "start",
        },
      );
    }, 250);
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 画像最適化エラー",
      error,
    );

    setPreview(null);

    window.sessionStorage.removeItem(
      IMAGE_STORAGE_KEY,
    );

    setNotice(
      "写真を読み込めませんでした。別の写真を選択して、もう一度お試しください。",
    );
  } finally {
    /*
     * 同じ写真をもう一度選択した場合でも
     * onChangeが発火できるようにします。
     */
    event.target.value = "";
  }
};

  const handleResetImage = () => {
    setPreview(null);
    setSelectedIds([]);
    setNotice(null);

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

  const isDiagnosisLimitReached =
    diagnosisUsage?.reached ?? false;

  const cannotStartDiagnosis =
    isUsageLoading ||
    Boolean(usageError) ||
    isDiagnosisLimitReached ||
    !preview ||
    selectedIds.length === 0;

  const handleReturnToResult = () => {
  router.push("/line/result");
};

    const handleDiagnosis = () => {
    if (
      isUsageLoading ||
      usageError ||
      isDiagnosisLimitReached
    ) {
      return;
    }

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

              <div className="overflow-hidden rounded-[16px] border border-dashed border-black/20 bg-white">
  {preview ? (
    <div className="relative bg-[#EEF6FF]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={preview}
        alt="選択した顔写真"
        className="block max-h-[500px] min-h-[320px] w-full object-contain"
      />
    </div>
  ) : (
    <div className="flex min-h-[230px] items-center justify-center px-6 text-center">
      <div>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg">
          <CameraIcon />
        </span>

        <p className="mt-5 text-[17px] font-black text-[#111111]">
          顔写真を用意してください
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
</div>

<div className="mt-3 grid grid-cols-2 gap-2.5">
  <button
    type="button"
    onClick={() =>
      cameraInputRef.current?.click()
    }
    className="flex min-h-[52px] items-center justify-center rounded-[12px] bg-[#1677FF] px-3 text-[13px] font-black text-white shadow-[0_6px_18px_rgba(22,119,255,0.18)] transition active:scale-[0.98]"
  >
    写真を撮る
  </button>

  <button
    type="button"
    onClick={() =>
      libraryInputRef.current?.click()
    }
    className="flex min-h-[52px] items-center justify-center rounded-[12px] border border-[#1677FF]/20 bg-[#EEF6FF] px-3 text-[13px] font-black text-[#1677FF] transition active:scale-[0.98]"
  >
    写真を選ぶ
  </button>
</div>

<input
  ref={cameraInputRef}
  type="file"
  accept="image/*"
  capture="user"
  onChange={handleImage}
  className="hidden"
/>

<input
  ref={libraryInputRef}
  type="file"
  accept="image/jpeg,image/png,image/webp"
  onChange={handleImage}
  className="hidden"
/>

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

        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t border-black/10 bg-white/95 px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
  <div className="mx-auto w-full max-w-[448px]">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold text-black/45">
                今月のAI診断
              </p>

              {diagnosisUsage ? (
                <p
                  className={`text-[11px] font-black ${
                    isDiagnosisLimitReached
                      ? "text-[#111111]"
                      : "text-[#1677FF]"
                  }`}
                >
                  {diagnosisUsage.used} / {diagnosisUsage.limit}回
                </p>
              ) : (
                <p className="text-[10px] text-black/35">
                  確認中…
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleDiagnosis}
              disabled={cannotStartDiagnosis}
              className="min-h-[52px] w-full rounded-[11px] bg-black px-4 text-[14px] font-black text-white shadow-lg transition hover:bg-black/85 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/40 disabled:shadow-none"
            >
              {isUsageLoading
                ? "診断回数を確認中…"
                : usageError
                  ? "ページを再読み込みしてください"
                  : isDiagnosisLimitReached
                    ? "今月の診断上限に達しました"
                    : "AI診断をはじめる"}

              {!cannotStartDiagnosis ? (
                <span
                  className="ml-2"
                  aria-hidden="true"
                >
                  →
                </span>
              ) : null}
            </button>

            <p className="mt-2 text-center text-[9px] font-bold text-black/35">
              {isDiagnosisLimitReached
                ? "翌月1日に利用回数がリセットされます"
                : "月3回まで利用できます"}
            </p>
          </div>         
        </div>
      </div>
    </main>
  );
}
