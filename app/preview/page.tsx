"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

type PreviewMode = "before" | "after";

const changes = [
  {
    number: "01",
    category: "EYEBROW",
    title: "眉毛を自然に整える",
    description:
      "眉下の余分な毛を整え、眉尻を少し細くすることで、目元がすっきりした印象になります。",
    score: "+6",
  },
  {
    number: "02",
    category: "HAIR",
    title: "前髪を軽くする",
    description:
      "額を少し見せることで、幼い印象を抑えながら爽やかさを引き出します。",
    score: "+5",
  },
  {
    number: "03",
    category: "SKIN",
    title: "肌の清潔感を整える",
    description:
      "テカリや乾燥を抑え、肌全体を自然で明るい印象へ近づけます。",
    score: "+5",
  },
];

const scoreItems = [
  {
    label: "眉毛",
    before: 62,
    after: 82,
  },
  {
    label: "髪型",
    before: 65,
    after: 81,
  },
  {
    label: "肌の清潔感",
    before: 71,
    after: 84,
  },
  {
    label: "総合印象",
    before: 68,
    after: 84,
  },
];

export default function PreviewPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("before");

  useEffect(() => {
    const savedImage = window.sessionStorage.getItem("akanukeImage");

    setImage(savedImage);
    setIsImageLoaded(true);
  }, []);

  const isAfter = previewMode === "after";

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-32 pt-8">
      <div className="mx-auto max-w-md">
        <header>
          <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
            AKANUKE.AI
          </p>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-500">
                4週間後の変化予測
              </p>

              <h1 className="mt-1 text-3xl font-bold leading-tight text-slate-950">
                Before
                <span className="mx-2 text-blue-600">→</span>
                After
              </h1>
            </div>

            <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
              AI PREVIEW
            </span>
          </div>

          <p className="mt-4 leading-7 text-slate-500">
            診断結果に沿って行動した場合の、4週間後の印象変化を確認できます。
          </p>
        </header>

        <section className="mt-7 overflow-hidden rounded-[32px] bg-white shadow-sm">
          <div className="p-3">
            <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setPreviewMode("before")}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  previewMode === "before"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-400"
                }`}
              >
                BEFORE
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode("after")}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  previewMode === "after"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400"
                }`}
              >
                AFTER
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-100">
            {!isImageLoaded ? (
              <div className="flex min-h-96 items-center justify-center px-6 text-center">
                <div>
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="mt-4 text-sm font-bold text-slate-500">
                    写真を読み込んでいます
                  </p>
                </div>
              </div>
            ) : image ? (
              <>
                <img
                  src={image}
                  alt={
                    isAfter
                      ? "4週間後の変化予測プレビュー"
                      : "診断時の写真"
                  }
                  className="block h-auto w-full transition-all duration-700"
                  style={
                    isAfter
                      ? {
                          filter:
                            "brightness(1.05) contrast(1.04) saturate(0.94)",
                        }
                      : {
                          filter: "none",
                        }
                  }
                />

                {isAfter && (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-blue-50/10" />

                    <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between">
                      <span className="rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                        4週間後予測
                      </span>

                      <span className="rounded-full border border-white/70 bg-blue-600/90 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                        +16 POINT
                      </span>
                    </div>

                    <div className="pointer-events-none absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-slate-950/65 p-4 text-white shadow-xl backdrop-blur-md">
                      <p className="text-xs font-bold tracking-[0.15em] text-blue-200">
                        AFTER IMAGE
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        眉・前髪・肌の清潔感を改善したイメージ
                      </p>
                    </div>
                  </>
                )}

                {!isAfter && (
                  <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                    現在の写真
                  </div>
                )}
              </>
            ) : (
              <div className="flex min-h-96 items-center justify-center px-6 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl">
                    📷
                  </div>

                  <p className="mt-4 font-bold text-slate-800">
                    写真が見つかりませんでした
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    写真アップロード画面から、もう一度診断してください。
                  </p>

                  <Link
                    href="/upload"
                    className="mt-5 inline-block rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                  >
                    写真をアップロードする
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 p-5">
            <div className="flex items-center justify-between gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-[0.15em] text-slate-400">
                  {isAfter ? "AFTER SCORE" : "CURRENT SCORE"}
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span
                    className={`text-5xl font-black ${
                      isAfter ? "text-blue-600" : "text-slate-950"
                    }`}
                  >
                    {isAfter ? "84" : "68"}
                  </span>

                  <span className="pb-1 text-sm font-bold text-slate-400">
                    / 100
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400">
                →
              </div>

              <div className="flex-1 text-right">
                <p className="text-xs font-bold tracking-[0.15em] text-blue-500">
                  IMPROVEMENT
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  +16
                </p>
              </div>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isAfter ? "w-[84%] bg-blue-600" : "w-[68%] bg-slate-800"
                }`}
              />
            </div>
          </div>
        </section>

        <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm">
              i
            </span>

            <div>
              <p className="text-sm font-bold text-amber-900">
                現在は表示確認用のプレビューです
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800/80">
                実際の眉毛や髪型を反映したAfter画像は、画像生成API接続後に生成されます。
              </p>
            </div>
          </div>
        </div>

        <section className="mt-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-[0.15em] text-blue-600">
                CHANGE POINTS
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                変化する3つのポイント
              </h2>
            </div>

            <p className="shrink-0 text-xs font-bold text-slate-400">
              合計 +16点
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {changes.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                    {item.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-bold tracking-[0.15em] text-blue-600">
                        {item.category}
                      </p>

                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {item.score}点
                      </span>
                    </div>

                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <p className="text-sm font-bold tracking-[0.15em] text-blue-600">
            SCORE COMPARISON
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            項目別の変化予測
          </h2>

          <div className="mt-5 space-y-6 rounded-3xl bg-white p-6 shadow-sm">
            {scoreItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-slate-700">
                    {item.label}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold">
                    <span className="text-slate-400">
                      {item.before}
                    </span>

                    <span className="text-slate-300">
                      →
                    </span>

                    <span className="text-blue-600">
                      {item.after}
                    </span>
                  </div>
                </div>

                <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-slate-300"
                    style={{ width: `${item.before}%` }}
                  />

                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-blue-600/70"
                    style={{ width: `${item.after}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
          <p className="text-sm font-bold tracking-[0.15em] text-blue-300">
            NEXT ACTION
          </p>

          <h2 className="mt-3 text-2xl font-bold leading-9">
            この変化を、
            <br />
            4週間で現実に。
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            眉毛・髪型・スキンケアを、効果が出やすい順番で進めるプランを確認しましょう。
          </p>

          <Link
            href="/plan"
            className="mt-6 block rounded-2xl bg-blue-600 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-blue-700"
          >
            4週間プランを確認する
          </Link>
        </section>

        <Link
          href="/result"
          className="mt-3 block py-4 text-center text-sm font-bold text-slate-500"
        >
          診断結果に戻る
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}