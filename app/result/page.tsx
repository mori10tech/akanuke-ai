"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

const scores = [
  { label: "眉毛", score: 82 },
  { label: "髪型", score: 76 },
  { label: "肌の清潔感", score: 71 },
  { label: "表情", score: 74 },
];

const analysisItems = [
  {
    label: "眉毛",
    description: "眉の形と左右差",
  },
  {
    label: "髪型",
    description: "前髪と輪郭の相性",
  },
  {
    label: "肌",
    description: "清潔感と明るさ",
  },
  {
    label: "表情",
    description: "親しみやすさ",
  },
];

const priorities = [
  {
    rank: 1,
    title: "眉毛",
    impact: "効果：非常に高い",
    description:
      "眉下の余分な毛を整え、眉尻を少し細くすると、顔全体の清潔感が大きく上がります。",
    href: "/salon",
    action: "眉毛サロンを確認する",
  },
  {
    rank: 2,
    title: "髪型",
    impact: "効果：非常に高い",
    description:
      "前髪を軽くして額を少し見せると、幼い印象が抑えられ、爽やかに見えます。",
    href: "/salon",
    action: "美容室用オーダーを見る",
  },
  {
    rank: 3,
    title: "肌の清潔感",
    impact: "効果：高い",
    description:
      "洗顔と日焼け止めを毎日続けることで、テカリや肌の印象を整えやすくなります。",
    href: "/products",
    action: "おすすめ商品を見る",
  },
];

export default function ResultPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const savedImage = window.sessionStorage.getItem("akanukeImage");

    setImage(savedImage);
    setIsImageLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-28 pt-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">AI診断レポート</p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              診断結果
            </h1>
          </div>

          <span className="shrink-0 rounded-full bg-green-100 px-3 py-2 text-xs font-bold text-green-700">
            診断完了
          </span>
        </div>

        <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="p-5">
            <p className="text-sm font-bold text-slate-500">
              今回診断した写真
            </p>
          </div>

          {!isImageLoaded ? (
            <div className="flex min-h-64 items-center justify-center bg-slate-100 px-6 text-center">
              <p className="text-sm font-bold text-slate-400">
                写真を読み込んでいます...
              </p>
            </div>
          ) : image ? (
            <>
              <div className="relative w-full overflow-hidden bg-slate-100">
                <img
                  src={image}
                  alt="診断した顔写真"
                  className="block h-auto w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                <div className="pointer-events-none absolute left-4 top-[32%] rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
                  眉毛を分析
                </div>

                <div className="pointer-events-none absolute right-4 top-[14%] rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
                  前髪を分析
                </div>

                <div className="pointer-events-none absolute bottom-[12%] right-4 rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
                  肌の清潔感
                </div>
              </div>

              <div className="border-t border-slate-100 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      解析項目
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      顔の印象を4項目で確認しました
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-600 px-3 py-2 text-xs font-bold text-white">
                    解析済み
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {analysisItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-600">
                          ✓
                        </span>

                        <p className="text-sm font-bold text-slate-800">
                          {item.label}
                        </p>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-64 items-center justify-center bg-slate-100 px-6 text-center">
              <div>
                <p className="font-bold text-slate-700">
                  写真が見つかりませんでした
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  写真アップロード画面から、もう一度診断してください。
                </p>

                <a
                  href="/upload"
                  className="mt-5 inline-block rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                >
                  写真を選び直す
                </a>
              </div>
            </div>
          )}
        </section>

        <section className="mt-4 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
          <p className="text-sm font-bold text-slate-300">
            現在の垢抜けスコア
          </p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-7xl font-black">68</span>

            <span className="pb-2 text-lg font-bold text-slate-400">
              / 100
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-blue-500" />
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4">
            <div>
              <p className="text-xs text-slate-400">4週間後の目標</p>
              <p className="mt-1 text-2xl font-bold">84点</p>
            </div>

            <div className="rounded-full bg-blue-500 px-4 py-2 text-sm font-bold">
              ＋16点
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-bold text-blue-700">
            AI総合コメント
          </p>

          <h2 className="mt-3 text-xl font-bold leading-8 text-slate-950">
            眉毛と前髪を変えるだけで、
            <br />
            第一印象は大きく変わります。
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            現在は少し幼く見えやすい印象です。最初に眉毛を整え、その後に髪型を変えることで、短期間でも清潔感を高められます。
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-950">
            項目別スコア
          </h2>

          <div className="mt-4 space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            {scores.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700">
                    {item.label}
                  </span>

                  <span className="font-bold text-slate-950">
                    {item.score}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-blue-600">
                PRIORITY
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-950">
                最初に改善する3項目
              </h2>
            </div>

            <p className="shrink-0 text-xs text-slate-400">
              効果が高い順
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {priorities.map((item) => (
              <article
                key={item.rank}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
                    {item.rank}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <span className="mt-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      {item.impact}
                    </span>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <a
                      href={item.href}
                      className="mt-4 block w-full rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                    >
                      {item.action} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <a
          href="/preview"
          className="mt-8 block rounded-2xl bg-blue-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          4週間後の変化を見る
        </a>

        <a
          href="/upload"
          className="mt-3 block py-4 text-center text-sm font-bold text-slate-500"
        >
          別の写真で診断し直す
        </a>
      </div>

      <BottomNav />
    </main>
  );
}