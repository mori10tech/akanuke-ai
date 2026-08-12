"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AppShell from "../components/AppShell";
import DummyAd from "../components/DummyAd";
import AppLogo from "../components/AppLogo";
import type { AkanukeAnalysis } from "../../lib/openai/schemas";

const IMAGE_STORAGE_KEY = "akanukeImage";
const RESULT_STORAGE_KEY = "akanukeAnalysisResult";

const GOAL_PROGRESS = 100;

const priorityLabels = [
  "最優先",
  "効果が高い",
  "継続改善",
] as const;

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
        <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" />
        <path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    scissors: (
      <>
        <circle cx="6" cy="7" r="2.5" />
        <circle cx="6" cy="17" r="2.5" />
        <path d="m8.2 8.2 11.3 8.3" />
        <path d="m8.2 15.8 11.3-8.3" />
      </>
    ),
    calendar: (
      <>
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
        />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
  };

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
      {paths[name]}
    </svg>
  );
}

function CircularProgress({
  progress,
}: {
  progress: number;
}) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div className="relative h-[112px] w-[112px]">
      <svg
        viewBox="0 0 104 104"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
        />

        <circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke="#1677FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-end gap-0.5">
          <span className="text-[34px] font-black leading-none tracking-[-0.06em] text-[#1677FF]">
            {progress}
          </span>

          <span className="pb-0.5 text-[10px] font-black text-[#1677FF]">
            %
          </span>
        </div>

        <span className="mt-1 text-[7px] font-bold tracking-[0.12em] text-black/35">
          CURRENT
        </span>
      </div>
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: "bag" | "scissors";
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[104px] items-center gap-3 rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#1677FF]/30 hover:shadow-[0_14px_32px_rgba(22,119,255,0.10)] active:scale-[0.99]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF] transition group-hover:bg-[#1677FF] group-hover:text-white">
        <Icon
          name={icon}
          className="h-6 w-6"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black tracking-[-0.02em]">
          {title}
        </span>

        <span className="mt-1 block text-[9px] leading-4 text-black/55">
          {description}
        </span>
      </span>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F9FC] text-[#1677FF] transition group-hover:translate-x-0.5 group-hover:bg-[#EEF6FF]">
        <Icon
          name="chevron"
          className="h-4 w-4"
        />
      </span>
    </Link>
  );
}

function AnalysisDetail({
  title,
  observation,
  advice,
}: {
  title: string;
  observation: string;
  advice: string;
}) {
  return (
    <article className="rounded-[18px] border border-black/10 bg-white p-4">
      <h3 className="text-[13px] font-black text-[#111111]">
        {title}
      </h3>

      <div className="mt-3">
        <p className="text-[9px] font-black tracking-[0.1em] text-black/35">
          CURRENT
        </p>

        <p className="mt-1 text-[11px] leading-5 text-black/55">
          {observation}
        </p>
      </div>

      <div className="mt-3 rounded-[12px] bg-[#EEF6FF] p-3">
        <p className="text-[9px] font-black tracking-[0.1em] text-[#1677FF]">
          ADVICE
        </p>

        <p className="mt-1 text-[11px] leading-5 text-black/60">
          {advice}
        </p>
      </div>
    </article>
  );
}

export default function ResultPage() {
  const [image, setImage] =
    useState<string | null>(null);

  const [analysis, setAnalysis] =
    useState<AkanukeAnalysis | null>(null);

  const [
    displayProgress,
    setDisplayProgress,
  ] = useState(0);

  const [isReady, setIsReady] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  useEffect(() => {
    const savedImage =
      window.sessionStorage.getItem(
        IMAGE_STORAGE_KEY,
      );

    const rawResult =
      window.sessionStorage.getItem(
        RESULT_STORAGE_KEY,
      );

    if (!rawResult) {
      setImage(savedImage);
      setLoadError(
        "診断結果が見つかりません。もう一度AI診断を実行してください。",
      );
      setIsReady(true);
      return;
    }

    try {
      const parsed =
        JSON.parse(
          rawResult,
        ) as AkanukeAnalysis;

      setImage(savedImage);
      setAnalysis(parsed);
      setIsReady(true);

      const targetProgress =
        Math.max(
          0,
          Math.min(
            100,
            Math.round(
              parsed.progress,
            ),
          ),
        );

      const duration = 1400;
      const startedAt =
        performance.now();

      let frame = 0;

      const animate = (
        now: number,
      ) => {
        const progress =
          Math.min(
            (now - startedAt) /
              duration,
            1,
          );

        const eased =
          1 -
          Math.pow(
            1 - progress,
            3,
          );

        setDisplayProgress(
          Math.round(
            targetProgress *
              eased,
          ),
        );

        if (progress < 1) {
          frame =
            window.requestAnimationFrame(
              animate,
            );
        }
      };

      frame =
        window.requestAnimationFrame(
          animate,
        );

      return () => {
        window.cancelAnimationFrame(
          frame,
        );
      };
    } catch (error) {
      console.error(
        "Result parse error:",
        error,
      );

      setImage(savedImage);

      setLoadError(
        "診断結果を読み込めませんでした。もう一度AI診断を実行してください。",
      );

      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-black/10 border-t-[#1677FF]" />
      </main>
    );
  }

  if (!analysis || loadError) {
    return (
      <AppShell background="white">
        <div className="min-h-screen bg-white px-5 py-16">
          <div className="mx-auto max-w-[420px] rounded-[22px] border border-red-200 bg-red-50 p-5">
            <p className="text-[14px] font-black text-red-600">
              診断結果を表示できません
            </p>

            <p className="mt-2 text-[11px] leading-5 text-red-600/80">
              {loadError}
            </p>

            <Link
              href="/upload"
              className="mt-5 flex min-h-[48px] items-center justify-center rounded-[12px] bg-[#111111] text-[12px] font-black text-white"
            >
              AI診断をやり直す
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell background="white">
      <div className="overflow-hidden bg-white">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[44px_1fr_44px] items-center px-4">
            <Link
              href="/upload"
              aria-label="写真選択へ戻る"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EEF6FF] active:scale-95"
            >
              <Icon
                name="arrowLeft"
                className="h-[21px] w-[21px]"
              />
            </Link>

            <div className="flex justify-center">
              <AppLogo />
            </div>

            <div aria-hidden="true" />
          </div>
        </header>

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <p className="mt-4 text-[10px] font-black tracking-[0.18em] text-[#1677FF]">
              PERSONAL BEAUTY REPORT
            </p>

            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              あなたの診断結果
            </h1>

            <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-black/55">
              Afterイメージを目標として、
              今の状態から優先して整えたいポイントをAIが分析しました。
            </p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] border border-[#1677FF]/10 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div className="grid grid-cols-[48%_52%]">
              <div className="relative min-h-[250px] overflow-hidden bg-[#F7F9FC]">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt="今回診断した顔写真"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[250px] items-center justify-center px-4 text-center text-black/40">
                    <p className="text-[11px] font-bold">
                      写真が見つかりません
                    </p>
                  </div>
                )}

                {image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[8px] font-black text-[#111111] shadow-sm">
                      <Icon
                        name="check"
                        className="h-3 w-3 text-[#1677FF]"
                      />
                      AI解析済み
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center justify-center bg-[#EEF6FF] px-3 py-4">
                <p className="mb-1 text-[7px] font-black tracking-[0.14em] text-[#1677FF]">
                  AKANUKE PROGRESS
                </p>

                <CircularProgress
                  progress={
                    displayProgress
                  }
                />

                <div className="mt-3 w-full rounded-[13px] border border-[#1677FF]/10 bg-white px-3 py-2.5">
                  <p className="text-[7px] font-bold tracking-[0.1em] text-black/35">
                    AFTER GOAL
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="text-[18px] font-black tracking-[-0.04em] text-[#1677FF]">
                      {GOAL_PROGRESS}%
                    </p>

                    <span className="rounded-full bg-[#FFD400] px-2 py-1 text-[8px] font-black text-[#111111]">
                      GOAL
                    </span>
                  </div>

                  <p className="mt-1 text-[8px] leading-4 text-black/40">
                    AIが提案するAfterへの目標状態
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 bg-white px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[7px] font-black tracking-[0.12em] text-black/35">
                    CURRENT
                  </p>

                  <p className="mt-1 text-[12px] font-black text-[#1677FF]">
                    現在 {analysis.progress}%
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-[#EEF6FF]">
                    <div
                      className="h-full rounded-full bg-[#1677FF]"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            analysis.progress,
                          ),
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[7px] font-black tracking-[0.12em] text-black/35">
                    AFTER
                  </p>

                  <p className="mt-1 text-[12px] font-black text-[#1677FF]">
                    100%
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[8px] leading-4 text-black/35">
                ※AKANUKE PROGRESSは容姿を採点するものではありません。
                今回のAfterイメージに近づくための目安です。
              </p>
            </div>
          </section>

          <section className="mx-4 mt-5 rounded-[20px] border border-[#FFD400]/40 bg-[#FFF9D9] p-5">
            <div className="flex items-center gap-2 text-[#1677FF]">
              <Icon name="sparkle" />

              <p className="text-[12px] font-black">
                AI総合コメント
              </p>
            </div>

            <h2 className="mt-3 text-[20px] font-black leading-[1.5] tracking-[-0.03em]">
              {analysis.summary.headline}
            </h2>

            <p className="mt-3 text-[12px] leading-6 text-black/55">
              {analysis.summary.body}
            </p>

            <div className="mt-4 rounded-[14px] bg-white/70 px-4 py-3">
              <p className="text-[9px] font-black tracking-[0.1em] text-[#1677FF]">
                TARGET
              </p>

              <p className="mt-1 text-[12px] font-black text-[#111111]">
                {analysis.targetImpression}
              </p>
            </div>
          </section>

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI ANALYSIS
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              パーツ別診断
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              写真から確認できる内容をもとに、
              改善しやすいポイントを整理しています。
            </p>

            <div className="mt-4 grid gap-3">
              <AnalysisDetail
                title="髪型"
                observation={
                  analysis.hair
                    .observation
                }
                advice={
                  analysis.hair.advice
                }
              />

              <AnalysisDetail
                title="眉毛"
                observation={
                  analysis.eyebrows
                    .observation
                }
                advice={
                  analysis.eyebrows
                    .advice
                }
              />

              <AnalysisDetail
                title="肌"
                observation={
                  analysis.skin
                    .observation
                }
                advice={
                  analysis.skin.advice
                }
              />

              <AnalysisDetail
                title="清潔感・身だしなみ"
                observation={
                  analysis.grooming
                    .observation
                }
                advice={
                  analysis.grooming
                    .advice
                }
              />
            </div>
          </section>

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              BEFORE / AFTER
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              目指す方向性
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              現在の印象と、
              AIが提案するAfterの方向性です。
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white">
                <div className="relative aspect-[4/5] bg-[#F7F9FC]">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt="Before"
                      className="h-full w-full object-cover"
                    />
                  ) : null}

                  <span className="absolute left-3 top-3 rounded-full bg-[#111111] px-2.5 py-1 text-[9px] font-black text-white">
                    Before
                  </span>
                </div>

                <div className="p-3">
                  <p className="text-[11px] font-black">
                    現在の印象
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-black/55">
                    {
                      analysis.currentImpression
                    }
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-[#FFD400]/40 bg-[#FFF9D9]">
                <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-[#EEF6FF] via-white to-[#FFF9D9] p-4">
                  <div className="text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
                      <Icon
                        name="sparkle"
                        className="h-6 w-6"
                      />
                    </span>

                    <p className="mt-3 text-[10px] font-black text-[#1677FF]">
                      AFTER IMAGE
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-black/45">
                      AI After画像は
                      <br />
                      次の工程で生成します
                    </p>
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-[11px] font-black">
                    目標の印象
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-black/55">
                    {
                      analysis.targetImpression
                    }
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              PRIORITY
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              改善優先順位
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              Afterに近づくために、
              優先して取り組みたい項目から整理しています。
            </p>

            <div className="mt-4 space-y-3">
              {analysis.priorities.map(
                (item, index) => (
                  <article
                    key={`${item.rank}-${item.title}`}
                    className="rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_10px_34px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#EEF6FF] text-[17px] font-black text-[#1677FF]">
                        {item.rank}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[16px] font-black">
                          {item.title}
                        </h3>

                        <span className="mt-1.5 inline-flex rounded-full bg-[#FFF9D9] px-2.5 py-1 text-[8px] font-black text-[#1677FF]">
                          {
                            priorityLabels[
                              index
                            ] ??
                            "改善項目"
                          }
                        </span>

                        <p className="mt-3 text-[11px] leading-5 text-black/55">
                          {
                            item.description
                          }
                        </p>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AFTER DIRECTION
            </p>

            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
              Afterの設計方針
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-black/55">
              次に生成するAfter画像では、
              この方向性を反映します。
            </p>

            <div className="mt-4 overflow-hidden rounded-[18px] border border-black/10 bg-white">
              {[
                [
                  "髪型",
                  analysis.afterDirection
                    .hair,
                ],
                [
                  "眉毛",
                  analysis.afterDirection
                    .eyebrows,
                ],
                [
                  "肌",
                  analysis.afterDirection
                    .skin,
                ],
                [
                  "身だしなみ",
                  analysis.afterDirection
                    .grooming,
                ],
                [
                  "スタイリング",
                  analysis.afterDirection
                    .styling,
                ],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="border-b border-black/10 px-4 py-4 last:border-b-0"
                  >
                    <p className="text-[10px] font-black text-[#1677FF]">
                      {label}
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-black/55">
                      {value}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>

          <DummyAd
            className="mx-4 mt-7"
            format="rectangle"
          />

          <section className="mx-4 mt-7 overflow-hidden rounded-[24px] border border-[#1677FF]/10 bg-gradient-to-br from-white via-white to-[#EEF6FF] shadow-[0_14px_40px_rgba(22,119,255,0.08)]">
            <div className="relative px-5 pb-5 pt-6">
              <div className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                <Icon
                  name="calendar"
                  className="h-8 w-8"
                />
              </div>

              <p className="pr-20 text-[9px] font-black tracking-[0.16em] text-[#1677FF]">
                YOUR PERSONAL PLAN
              </p>

              <h2 className="mt-3 max-w-[290px] text-[24px] font-black leading-[1.45] tracking-[-0.04em]">
                100%に近づくための
                <br />
                垢抜けプラン
              </h2>

              <p className="mt-3 max-w-[340px] text-[11px] leading-5 text-black/55">
                優先順位の高い項目から、
                自分のタイミングで無理なく進められます。
              </p>

              <Link
                href="/plan"
                className="mt-6 flex min-h-[56px] items-center justify-center gap-3 rounded-[15px] bg-[#FFD400] px-5 text-[14px] font-black text-[#111111] shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 active:scale-[0.99]"
              >
                垢抜けプランを見る

                <span
                  aria-hidden="true"
                  className="text-[18px]"
                >
                  →
                </span>
              </Link>
            </div>
          </section>

          <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
            <ActionCard
              href="/products"
              icon="bag"
              title="おすすめ商品"
              description="改善内容に合う商品を見る"
            />

            <ActionCard
              href="/salon"
              icon="scissors"
              title="おすすめサロン"
              description="髪型・眉毛の相談先を見る"
            />
          </div>

          <Link
            href="/upload"
            className="mx-4 mt-5 flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-black/10 bg-white px-4 text-[11px] font-black transition hover:bg-[#F7F9FC]"
          >
            <Icon
              name="refresh"
              className="h-4 w-4"
            />

            別の写真で診断し直す
          </Link>
        </div>
      </div>
    </AppShell>
  );
}