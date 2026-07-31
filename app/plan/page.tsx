"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const STORAGE_KEY = "akanukePlanCompletedTasks";
const CURRENT_SCORE = 68;
const TARGET_SCORE = 84;

const weeklyPlans = [
  {
    week: 1,
    label: "WEEK 1",
    days: "DAY 1–7",
    category: "EYEBROW",
    title: "眉毛と目元を整える",
    description:
      "最も印象が変わりやすい眉毛から開始します。輪郭を整え、毎日の洗顔を習慣にする1週間です。",
    score: 72,
    point: 4,
    focus: "眉毛・目元",
    color: "#b78526",
    tasks: [
      {
        id: "w1-salon",
        title: "眉毛サロンの候補を探す",
        detail: "通いやすさ・料金・男性施術例を確認する",
        timing: "DAY 1",
      },
      {
        id: "w1-shape",
        title: "眉下の余分な毛を整える",
        detail: "上側は触りすぎず、眉尻の輪郭を整える",
        timing: "DAY 2",
      },
      {
        id: "w1-wash",
        title: "朝晩の洗顔を7日間続ける",
        detail: "強くこすらず、泡でやさしく洗う",
        timing: "EVERY DAY",
      },
      {
        id: "w1-photo",
        title: "同じ条件で写真を残す",
        detail: "明るさ・角度・表情を揃えて記録する",
        timing: "DAY 7",
      },
    ],
    expectedChanges: [
      "眉毛の左右差が目立ちにくくなる",
      "目元がはっきりし、清潔感が上がる",
      "顔全体のぼんやりした印象が減る",
    ],
    advice:
      "眉毛は細くしすぎないことが重要です。元の太さを生かしながら、眉下と眉尻だけを整えると自然に仕上がります。",
  },
  {
    week: 2,
    label: "WEEK 2",
    days: "DAY 8–14",
    category: "HAIR",
    title: "髪型をアップデート",
    description:
      "前髪とサイドのボリュームを整え、爽やかで輪郭がすっきり見える髪型をつくります。",
    score: 76,
    point: 4,
    focus: "髪型・輪郭",
    color: "#111111",
    tasks: [
      {
        id: "w2-salon",
        title: "美容室を予約する",
        detail: "メンズカットの施術例が多い店舗を選ぶ",
        timing: "DAY 8",
      },
      {
        id: "w2-order",
        title: "オーダーメモを用意する",
        detail: "前髪は軽く、額を自然に見せたいと伝える",
        timing: "DAY 9",
      },
      {
        id: "w2-cut",
        title: "前髪とサイドを整える",
        detail: "横の膨らみを抑え、縦のラインを強調する",
        timing: "DAY 10–12",
      },
      {
        id: "w2-set",
        title: "毎朝5分のセットを練習する",
        detail: "乾かし方と少量のスタイリング剤から始める",
        timing: "EVERY DAY",
      },
    ],
    expectedChanges: [
      "顔まわりが軽く見える",
      "幼い印象から爽やかな印象へ近づく",
      "輪郭がすっきり見えやすくなる",
    ],
    advice:
      "美容師には『毎朝セットしやすいこと』も伝えましょう。見た目だけでなく、再現しやすさを優先すると継続できます。",
  },
  {
    week: 3,
    label: "WEEK 3",
    days: "DAY 15–21",
    category: "SKIN CARE",
    title: "肌と身だしなみを整える",
    description:
      "洗顔・保湿・紫外線対策を定着させ、近距離で見たときの清潔感を高めます。",
    score: 80,
    point: 4,
    focus: "肌・清潔感",
    color: "#7f672a",
    tasks: [
      {
        id: "w3-moisture",
        title: "洗顔後すぐに保湿する",
        detail: "化粧水と乳液を適量、こすらずになじませる",
        timing: "EVERY DAY",
      },
      {
        id: "w3-uv",
        title: "朝に日焼け止めを使う",
        detail: "顔・首までムラなく塗り、外出前に仕上げる",
        timing: "EVERY DAY",
      },
      {
        id: "w3-grooming",
        title: "ヒゲ・鼻毛・爪を確認する",
        detail: "週2回の固定曜日を決めて手入れする",
        timing: "2 TIMES",
      },
      {
        id: "w3-pillow",
        title: "枕カバーを交換する",
        detail: "肌に触れるものを清潔な状態に保つ",
        timing: "DAY 18",
      },
    ],
    expectedChanges: [
      "乾燥やテカリが目立ちにくくなる",
      "肌の印象が均一に見えやすくなる",
      "細部まで手入れされた印象になる",
    ],
    advice:
      "一度に商品を増やさず、洗顔・保湿・日焼け止めの3つを優先してください。続けられるシンプルさが最も重要です。",
  },
  {
    week: 4,
    label: "WEEK 4",
    days: "DAY 22–28",
    category: "FINAL TOUCH",
    title: "第一印象を仕上げる",
    description:
      "髪・眉・肌・表情を一つの印象としてまとめ、4週間の変化を確認します。",
    score: 84,
    point: 4,
    focus: "総合・表情",
    color: "#b78526",
    tasks: [
      {
        id: "w4-clothes",
        title: "清潔感のある服装を選ぶ",
        detail: "サイズ感・シワ・襟元・靴の状態を確認する",
        timing: "DAY 22",
      },
      {
        id: "w4-smile",
        title: "自然な表情を練習する",
        detail: "口角を少し上げ、目元の力を抜く",
        timing: "EVERY DAY",
      },
      {
        id: "w4-maintenance",
        title: "髪型と眉毛を微調整する",
        detail: "伸びた部分だけを整え、形を維持する",
        timing: "DAY 25",
      },
      {
        id: "w4-retake",
        title: "同じ条件で再撮影する",
        detail: "DAY 1の写真と比較し、次の目標を決める",
        timing: "DAY 28",
      },
    ],
    expectedChanges: [
      "爽やかさと清潔感が自然に伝わる",
      "表情まで含めた第一印象が整う",
      "自分に合う美容習慣が定着する",
    ],
    advice:
      "最終日は点数だけでなく、続けやすかった習慣も確認しましょう。4週間後も残す習慣を3つ選ぶと、変化を維持できます。",
  },
] as const;

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    sparkle: (
      <>
        <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
        <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M3 10h18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    reset: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" />
        <path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" />
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

function ProgressRing({ progress }: { progress: number }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-[126px] w-[126px]">
      <svg
        viewBox="0 0 112 112"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="7"
        />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="url(#planProgressGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient
            id="planProgressGradient"
            x1="0"
            y1="0"
            x2="112"
            y2="112"
          >
            <stop offset="0%" stopColor="#f0d47e" />
            <stop offset="100%" stopColor="#b78526" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-[31px] font-black leading-none tracking-[-0.05em]">
          {progress}%
        </span>
        <span className="mt-1 text-[8px] font-bold tracking-[0.14em] text-white/45">
          COMPLETE
        </span>
      </div>
    </div>
  );
}

export default function PlanPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        try {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCompletedTasks(
              parsed.filter((item): item is string => typeof item === "string"),
            );
          }
        } catch {
          setCompletedTasks([]);
        }
      }

      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const selectedPlan = weeklyPlans[activeWeek - 1];
  const allTasks = weeklyPlans.flatMap((plan) => plan.tasks);
  const progress = Math.round(
    (completedTasks.length / allTasks.length) * 100,
  );

  const completedByWeek = useMemo(
    () =>
      weeklyPlans.map((plan) => ({
        week: plan.week,
        completed: plan.tasks.filter((task) => completedTasks.includes(task.id))
          .length,
        total: plan.tasks.length,
      })),
    [completedTasks],
  );

  const toggleTask = (taskId: string) => {
    setCompletedTasks((current) => {
      const next = current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId];

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetProgress = () => {
    setCompletedTasks([]);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#b78526]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-hidden bg-white shadow-[0_0_50px_rgba(22,22,18,0.09)]">
        <AppHeader
          backHref="/preview"
          backLabel="4週間後プレビューへ戻る"
        />

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d8af] bg-[#fff8e8] text-[#ae7714]">
              <Icon name="calendar" className="h-[21px] w-[21px]" />
            </div>
            <p className="mt-4 text-[10px] font-black tracking-[0.18em] text-[#a97212]">
              PERSONAL 4-WEEK PLAN
            </p>
            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              あなた専用の4週間プラン
            </h1>
            <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-neutral-500">
              効果が出やすい順番で、毎週やることを整理しました。
              完了した項目にチェックを入れて進めてください。
            </p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] bg-[#11110f] shadow-[0_18px_45px_rgba(17,17,15,0.22)]">
            <div className="grid grid-cols-[1fr_146px] items-center gap-2 px-5 py-6">
              <div className="text-white">
                <p className="text-[9px] font-black tracking-[0.15em] text-[#dfc26d]">
                  YOUR PROGRESS
                </p>
                <h2 className="mt-2 text-[23px] font-black leading-[1.35] tracking-[-0.04em]">
                  28日間で、
                  <br />
                  第一印象を整える。
                </h2>
                <p className="mt-3 text-[10px] leading-5 text-white/50">
                  {completedTasks.length} / {allTasks.length} タスク完了
                </p>
              </div>

              <div className="flex justify-end">
                <ProgressRing progress={progress} />
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-white/10">
              <div className="px-4 py-3.5 text-center">
                <p className="text-[8px] font-bold tracking-[0.1em] text-white/35">
                  START
                </p>
                <p className="mt-1 text-[16px] font-black text-white">
                  {CURRENT_SCORE}
                </p>
              </div>
              <div className="border-x border-white/10 px-4 py-3.5 text-center">
                <p className="text-[8px] font-bold tracking-[0.1em] text-white/35">
                  TARGET
                </p>
                <p className="mt-1 text-[16px] font-black text-[#e7c86e]">
                  {TARGET_SCORE}
                </p>
              </div>
              <div className="px-4 py-3.5 text-center">
                <p className="text-[8px] font-bold tracking-[0.1em] text-white/35">
                  CHANGE
                </p>
                <p className="mt-1 text-[16px] font-black text-white">
                  +{TARGET_SCORE - CURRENT_SCORE}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-7 px-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">
                  WEEKLY ROADMAP
                </p>
                <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
                  週ごとのプラン
                </h2>
              </div>
              <p className="pb-1 text-[9px] font-bold text-neutral-400">
                タップして切り替え
              </p>
            </div>

            <div className="-mx-4 mt-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2 pb-1">
                {weeklyPlans.map((plan, index) => {
                  const status = completedByWeek[index];
                  const isActive = activeWeek === plan.week;
                  const isComplete = status.completed === status.total;

                  return (
                    <button
                      key={plan.week}
                      type="button"
                      onClick={() => setActiveWeek(plan.week)}
                      className={`w-[112px] rounded-[17px] border px-3 py-3 text-left transition active:scale-[0.98] ${
                        isActive
                          ? "border-black bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                          : "border-black/[0.08] bg-white text-black"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[9px] font-black tracking-[0.1em] ${
                            isActive ? "text-[#e3c66f]" : "text-[#a97212]"
                          }`}
                        >
                          W{plan.week}
                        </span>
                        {isComplete && (
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full ${
                              isActive
                                ? "bg-[#d8b659] text-black"
                                : "bg-black text-white"
                            }`}
                          >
                            <Icon name="check" className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[12px] font-black">
                        {plan.focus}
                      </p>
                      <p
                        className={`mt-1 text-[8px] font-bold ${
                          isActive ? "text-white/45" : "text-neutral-400"
                        }`}
                      >
                        {status.completed}/{status.total} 完了
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mx-4 mt-4 overflow-hidden rounded-[23px] border border-black/[0.08] bg-white shadow-[0_12px_34px_rgba(20,20,18,0.07)]">
            <div className="border-b border-black/[0.06] px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">
                    {selectedPlan.label} · {selectedPlan.days}
                  </p>
                  <h2 className="mt-2 text-[22px] font-black tracking-[-0.04em]">
                    {selectedPlan.title}
                  </h2>
                </div>
                <div className="shrink-0 rounded-[15px] bg-[#f7f4eb] px-3 py-2.5 text-center">
                  <p className="text-[8px] font-bold text-neutral-400">目標</p>
                  <p className="mt-0.5 text-[18px] font-black">
                    {selectedPlan.score}
                    <span className="ml-0.5 text-[9px] text-neutral-400">点</span>
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[12px] leading-6 text-neutral-600">
                {selectedPlan.description}
              </p>

              <div className="mt-4 flex items-center gap-2 rounded-[13px] bg-[#fff8e8] px-3.5 py-3 text-[#9b6b13]">
                <Icon name="trend" className="h-[17px] w-[17px] shrink-0" />
                <p className="text-[10px] font-black">
                  この週の改善見込み：+{selectedPlan.point}点
                </p>
              </div>
            </div>

            <div className="px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-black">今週やること</h3>
                <p className="text-[9px] font-bold text-neutral-400">
                  {
                    selectedPlan.tasks.filter((task) =>
                      completedTasks.includes(task.id),
                    ).length
                  }
                  /{selectedPlan.tasks.length} 完了
                </p>
              </div>

              <div className="mt-3 space-y-2.5">
                {selectedPlan.tasks.map((task) => {
                  const isCompleted = completedTasks.includes(task.id);

                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className={`flex w-full items-start gap-3 rounded-[16px] border px-3.5 py-3.5 text-left transition active:scale-[0.99] ${
                        isCompleted
                          ? "border-[#dbc278] bg-[#fff9e9]"
                          : "border-black/[0.06] bg-[#fafafa]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                          isCompleted
                            ? "border-black bg-black text-white"
                            : "border-neutral-300 bg-white text-transparent"
                        }`}
                      >
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span
                            className={`text-[12px] font-black leading-5 ${
                              isCompleted
                                ? "text-neutral-500 line-through"
                                : "text-black"
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[7px] font-black tracking-[0.08em] text-neutral-400 shadow-sm">
                            {task.timing}
                          </span>
                        </span>
                        <span className="mt-1 block text-[9px] leading-4 text-neutral-500">
                          {task.detail}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mx-4 mt-4 rounded-[22px] border border-[#e8d9b4] bg-[#fff9eb] p-5">
            <div className="flex items-center gap-2 text-[#9d6c12]">
              <Icon name="sparkle" className="h-[18px] w-[18px]" />
              <p className="text-[10px] font-black tracking-[0.12em]">
                AI WEEKLY ADVICE
              </p>
            </div>
            <p className="mt-3 text-[12px] leading-6 text-neutral-700">
              {selectedPlan.advice}
            </p>
          </section>

          <section className="mt-8 px-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">
                  EXPECTED CHANGE
                </p>
                <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
                  今週期待できる変化
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <Icon name="target" className="h-[19px] w-[19px]" />
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
              {selectedPlan.expectedChanges.map((change, index) => (
                <div
                  key={change}
                  className={`flex items-start gap-3 px-4 py-4 ${
                    index !== selectedPlan.expectedChanges.length - 1
                      ? "border-b border-black/[0.06]"
                      : ""
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5eedb] text-[#956712]">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <p className="pt-1 text-[11px] font-bold leading-5 text-neutral-700">
                    {change}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 px-4">
            <div>
              <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">
                FULL ROADMAP
              </p>
              <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
                4週間の全体像
              </h2>
            </div>

            <div className="relative mt-5">
              <div className="absolute bottom-6 left-[19px] top-6 w-px bg-black/[0.09]" />

              <div className="space-y-3">
                {weeklyPlans.map((plan, index) => {
                  const status = completedByWeek[index];
                  const isComplete = status.completed === status.total;
                  const isActive = activeWeek === plan.week;

                  return (
                    <button
                      key={plan.week}
                      type="button"
                      onClick={() => {
                        setActiveWeek(plan.week);
                        window.scrollTo({ top: 500, behavior: "smooth" });
                      }}
                      className="relative flex w-full items-center gap-3 text-left"
                    >
                      <span
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-white text-[11px] font-black shadow-sm ${
                          isComplete
                            ? "bg-black text-white"
                            : isActive
                              ? "bg-[#d6b65c] text-black"
                              : "bg-[#efefec] text-neutral-500"
                        }`}
                      >
                        {isComplete ? (
                          <Icon name="check" className="h-4 w-4" />
                        ) : (
                          plan.week
                        )}
                      </span>

                      <span
                        className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[17px] border px-4 py-3.5 transition ${
                          isActive
                            ? "border-black bg-black text-white"
                            : "border-black/[0.07] bg-white text-black"
                        }`}
                      >
                        <span className="min-w-0">
                          <span
                            className={`block text-[8px] font-black tracking-[0.12em] ${
                              isActive ? "text-[#e1c369]" : "text-[#a97212]"
                            }`}
                          >
                            {plan.label} · {plan.days}
                          </span>
                          <span className="mt-1 block truncate text-[12px] font-black">
                            {plan.title}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span
                            className={`text-[10px] font-black ${
                              isActive ? "text-white/60" : "text-neutral-400"
                            }`}
                          >
                            {status.completed}/{status.total}
                          </span>
                          <Icon name="chevron" className="h-4 w-4" />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mx-4 mt-8 rounded-[23px] bg-[#11110f] px-5 py-6 text-white shadow-[0_16px_38px_rgba(17,17,15,0.18)]">
            <p className="text-[9px] font-black tracking-[0.16em] text-[#dfc26d]">
              DAY 28 GOAL
            </p>
            <h2 className="mt-2 text-[22px] font-black leading-[1.45] tracking-[-0.04em]">
              清潔感のある、
              <br />
              整った第一印象へ。
            </h2>
            <p className="mt-3 text-[11px] leading-5 text-white/55">
              すべてを完璧にする必要はありません。まずは毎週の4タスクを一つずつ完了し、続けられる習慣を残しましょう。
            </p>

            <Link
              href="/upload"
              className="mt-5 flex min-h-[52px] items-center justify-center rounded-[14px] bg-white px-5 text-[13px] font-black text-black transition hover:bg-neutral-100 active:scale-[0.99]"
            >
              4週間後に再診断する
            </Link>
          </section>

          <div className="mt-4 px-4">
            <Link
              href="/result"
              className="flex min-h-[50px] items-center justify-center rounded-[14px] border border-black/[0.1] bg-white px-5 text-[12px] font-black transition hover:bg-neutral-50 active:scale-[0.99]"
            >
              診断結果に戻る
            </Link>

            {completedTasks.length > 0 && (
              <button
                type="button"
                onClick={resetProgress}
                className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 text-[10px] font-bold text-neutral-400 transition hover:text-neutral-600"
              >
                <Icon name="reset" className="h-4 w-4" />
                チェック状況をリセット
              </button>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </main>
  );
}