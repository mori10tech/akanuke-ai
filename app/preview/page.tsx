"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import BottomNav from "../components/BottomNav";

const IMAGE_STORAGE_KEY = "akanukeImage";
const IMPRESSION_STORAGE_KEY = "akanukeImpressions";
const CURRENT_SCORE = 68;
const TARGET_SCORE = 84;

const weeks = [
  {
    week: "現在",
    shortWeek: "NOW",
    day: "DAY 1",
    score: 68,
    category: "START",
    title: "改善前の現在地を記録",
    summary: "まずは今の印象を基準として残します。",
    description:
      "眉毛と前髪を整えることで変化が出やすい状態です。同じ場所・明るさ・角度で写真を残し、4週間後に比較できる基準をつくります。",
    changes: ["現在の印象を客観的に確認", "改善効果が高い項目を特定"],
    tasks: ["現在の顔写真を保存する", "眉毛サロン・美容室の候補を探す"],
    focus: "現状把握",
  },
  {
    week: "1週間後",
    shortWeek: "WEEK 1",
    day: "DAY 7",
    score: 72,
    category: "EYEBROW",
    title: "目元が整い、清潔感がアップ",
    summary: "眉毛の輪郭が整い、目元がすっきりします。",
    description:
      "眉下の余分な毛と眉尻を整えることで、目元のぼんやり感が減ります。洗顔も習慣化し始め、第一印象に清潔感が表れます。",
    changes: ["眉毛の左右差が目立ちにくくなる", "目元がはっきりして清潔感が上がる"],
    tasks: ["眉毛の輪郭を整える", "朝晩の洗顔を7日間続ける"],
    focus: "眉毛・目元",
  },
  {
    week: "2週間後",
    shortWeek: "WEEK 2",
    day: "DAY 14",
    score: 76,
    category: "HAIR",
    title: "髪型が変わり、爽やかな印象へ",
    summary: "前髪と横幅が整い、輪郭がすっきり見えます。",
    description:
      "前髪を軽くして額を自然に見せ、サイドの膨らみを抑えることで、幼く見えやすい印象が改善します。顔全体の縦ラインも強調されます。",
    changes: ["顔まわりが軽く見える", "幼い印象から爽やかな印象へ近づく"],
    tasks: ["美容室で髪型を整える", "毎朝5分のヘアセットを練習する"],
    focus: "髪型・輪郭",
  },
  {
    week: "3週間後",
    shortWeek: "WEEK 3",
    day: "DAY 21",
    score: 80,
    category: "SKIN",
    title: "肌と身だしなみが安定",
    summary: "肌のコンディションが整い、全体の完成度が上がります。",
    description:
      "洗顔・保湿・日焼け止めが習慣になり、乾燥やテカリを抑えやすくなります。ヒゲや爪などの細部も整い、近距離で見た清潔感が高まります。",
    changes: ["肌の乾燥・テカリが目立ちにくくなる", "細部まで手入れされた印象になる"],
    tasks: ["保湿と日焼け止めを毎日続ける", "ヒゲ・鼻毛・爪を週2回確認する"],
    focus: "肌・身だしなみ",
  },
  {
    week: "4週間後",
    shortWeek: "WEEK 4",
    day: "DAY 28",
    score: 84,
    category: "GOAL",
    title: "整った第一印象が完成",
    summary: "髪・眉・肌が揃い、好印象を持たれやすい状態へ。",
    description:
      "眉毛・髪型・肌・身だしなみの改善が一つの印象としてまとまります。最初と同じ条件で再撮影し、変化を確認して次の目標を設定します。",
    changes: ["爽やかさと清潔感が自然に伝わる", "自分に合う美容習慣が定着する"],
    tasks: ["DAY 1と同じ条件で再撮影する", "Before／Afterを比較して次の目標を決める"],
    focus: "第一印象の完成",
  },
] as const;

const milestones = [
  { label: "眉毛", week: "1週目", point: "+4" },
  { label: "髪型", week: "2週目", point: "+4" },
  { label: "肌", week: "3週目", point: "+4" },
  { label: "総合", week: "4週目", point: "+4" },
] as const;

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
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
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M3 10h18" />
      </>
    ),
    camera: (
      <>
        <path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3h5Z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4 6v5c0 5.2 3.4 8.5 8 10 4.6-1.5 8-4.8 8-10V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
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

function ScoreGauge({ score }: { score: number }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-[128px] w-[128px]">
      <svg viewBox="0 0 112 112" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="url(#previewScoreGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="previewScoreGradient" x1="0" y1="0" x2="112" y2="112">
            <stop offset="0%" stopColor="#f3db8b" />
            <stop offset="100%" stopColor="#b47a16" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex items-end gap-1">
          <span className="text-[38px] font-black leading-none tracking-[-0.07em]">{score}</span>
          <span className="pb-1 text-[10px] font-bold text-white/40">/100</span>
        </div>
        <span className="mt-1 text-[8px] font-black tracking-[0.14em] text-white/45">TARGET</span>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const [image, setImage] = useState<string | null>(null);
  const [impressions, setImpressions] = useState<string[]>([]);
  const [displayScore, setDisplayScore] = useState(CURRENT_SCORE);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frame = 0;
    let animationFrame = 0;

    frame = window.requestAnimationFrame(() => {
      setImage(window.sessionStorage.getItem(IMAGE_STORAGE_KEY));

      const rawImpressions = window.sessionStorage.getItem(IMPRESSION_STORAGE_KEY);
      if (rawImpressions) {
        try {
          const parsed = JSON.parse(rawImpressions);
          if (Array.isArray(parsed)) {
            setImpressions(parsed.filter((item): item is string => typeof item === "string"));
          }
        } catch {
          setImpressions([]);
        }
      }

      setIsReady(true);

      const duration = 1500;
      const start = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayScore(Math.round(CURRENT_SCORE + (TARGET_SCORE - CURRENT_SCORE) * eased));

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animate);
        }
      };

      animationFrame = window.requestAnimationFrame(animate);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const impressionLabel = useMemo(
    () => (impressions.length > 0 ? impressions.join("・") : "爽やか・清潔感"),
    [impressions],
  );

  const selected = weeks[selectedWeek];
  const previousScore = selectedWeek === 0 ? CURRENT_SCORE : weeks[selectedWeek - 1].score;

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#b88323]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-hidden bg-white shadow-[0_0_50px_rgba(22,22,18,0.09)]">
        <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
          <div className="grid h-[66px] grid-cols-[44px_1fr_44px] items-center px-3">
            <Link
              href="/result"
              aria-label="診断結果へ戻る"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/[0.05] active:scale-95"
            >
              <Icon name="arrowLeft" className="h-[21px] w-[21px]" />
            </Link>

            <Link href="/" className="text-center text-[19px] font-black tracking-[-0.035em]">
              AKANUKE.AI
            </Link>

            <div aria-hidden="true" />
          </div>
        </header>

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d8af] bg-[#fff8e8] text-[#ae7714]">
              <Icon name="sparkle" className="h-[22px] w-[22px]" />
            </div>
            <p className="mt-4 text-[10px] font-black tracking-[0.18em] text-[#a97212]">4 WEEKS TRANSFORMATION</p>
            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              1週間ずつ、
              <br />
              第一印象を変えていく。
            </h1>
            <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-neutral-500">
              それぞれの週に起こる変化と、やるべきことを順番に確認できます。
            </p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] bg-[#11110f] shadow-[0_18px_45px_rgba(17,17,15,0.22)]">
            <div className="grid grid-cols-[42%_58%]">
              <div className="relative min-h-[272px] overflow-hidden bg-neutral-800">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="診断に使用した顔写真" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full min-h-[272px] items-center justify-center px-4 text-center text-white/60">
                    <div>
                      <Icon name="camera" className="mx-auto h-6 w-6" />
                      <p className="mt-2 text-[10px] font-bold">写真が見つかりません</p>
                      <Link href="/upload" className="mt-2 inline-block text-[9px] font-black text-[#e3c368]">
                        写真を選ぶ
                      </Link>
                    </div>
                  </div>
                )}

                {image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1.5 text-[8px] font-black text-white backdrop-blur">
                      BEFORE
                    </span>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[8px] font-bold tracking-[0.1em] text-white/50">TARGET IMPRESSION</p>
                      <p className="mt-1 text-[11px] font-black text-white">{impressionLabel}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center justify-center px-3 py-5">
                <ScoreGauge score={displayScore} />
                <div className="mt-2 w-full rounded-[15px] border border-white/10 bg-white/[0.06] px-3 py-3 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[8px] font-bold tracking-[0.1em] text-white/40">CURRENT</p>
                      <p className="mt-1 text-[18px] font-black">{CURRENT_SCORE}点</p>
                    </div>
                    <span className="text-[#dfc16d]">→</span>
                    <div className="text-right">
                      <p className="text-[8px] font-bold tracking-[0.1em] text-[#dfc16d]">4 WEEKS</p>
                      <p className="mt-1 text-[18px] font-black text-[#f0d47d]">{TARGET_SCORE}点</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[8px] font-bold tracking-[0.11em] text-white/35">EXPECTED GROWTH</p>
                  <p className="mt-1 text-[13px] font-black text-white">4週間で +16点</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#dfc16d]/25 bg-[#dfc16d]/10 px-3 py-2 text-[#e6c66e]">
                  <Icon name="trend" className="h-4 w-4" />
                  <span className="text-[9px] font-black">成長予測</span>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-[#9f6b10] via-[#d2a13f] to-[#f0d47d]" />
              </div>
            </div>
          </section>

          <section className="mt-6 px-4">
            <div className="grid grid-cols-4 gap-2">
              {milestones.map((item) => (
                <div key={item.label} className="rounded-[15px] border border-black/[0.06] bg-white px-2 py-3 text-center shadow-[0_5px_18px_rgba(20,20,17,0.04)]">
                  <p className="text-[8px] font-bold text-neutral-400">{item.week}</p>
                  <p className="mt-1 text-[10px] font-black">{item.label}</p>
                  <p className="mt-1 text-[12px] font-black text-[#a97212]">{item.point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 px-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">WEEKLY CHANGE VIEWER</p>
                <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">1週間ごとの変化</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <Icon name="eye" className="h-[19px] w-[19px]" />
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-neutral-500">
              週を選ぶと、その時点で見込まれる変化と行動内容を確認できます。
            </p>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {weeks.map((item, index) => (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => setSelectedWeek(index)}
                  className={`min-w-[78px] rounded-[14px] border px-3 py-3 text-left transition active:scale-[0.98] ${
                    selectedWeek === index
                      ? "border-black bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                      : "border-black/[0.07] bg-white text-black"
                  }`}
                >
                  <p className={`text-[8px] font-black tracking-[0.08em] ${selectedWeek === index ? "text-[#e4c66e]" : "text-neutral-400"}`}>
                    {item.shortWeek}
                  </p>
                  <p className="mt-1 text-[17px] font-black">{item.score}</p>
                  <p className={`mt-1 text-[8px] font-bold ${selectedWeek === index ? "text-white/55" : "text-neutral-400"}`}>{item.day}</p>
                </button>
              ))}
            </div>

            <article className="mt-2 overflow-hidden rounded-[22px] border border-black/[0.07] bg-white shadow-[0_10px_32px_rgba(20,20,17,0.07)]">
              <div className="grid grid-cols-[37%_63%]">
                <div className="relative min-h-[235px] overflow-hidden bg-neutral-100">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={`${selected.week}の変化イメージ`}
                      className={`h-full w-full object-cover transition duration-500 ${
                        selectedWeek >= 3 ? "brightness-[1.04] contrast-[1.03]" : selectedWeek >= 2 ? "brightness-[1.02]" : ""
                      }`}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-neutral-400">
                      <Icon name="camera" className="h-6 w-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[8px] font-black tracking-[0.12em] text-[#efd277]">{selected.shortWeek}</p>
                    <p className="mt-1 text-[25px] font-black">{selected.score}点</p>
                    <p className="mt-1 text-[9px] font-bold text-white/60">{selected.focus}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[8px] font-black tracking-[0.13em] text-[#a97212]">{selected.category}</p>
                      <p className="mt-1 text-[11px] font-black text-neutral-400">{selected.day}・{selected.week}</p>
                    </div>
                    <span className="rounded-full bg-[#fff4d8] px-2.5 py-1.5 text-[8px] font-black text-[#9b6810]">
                      {selectedWeek === 0 ? "基準" : `前週 +${selected.score - previousScore}`}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[17px] font-black leading-6 tracking-[-0.025em]">{selected.title}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-neutral-600">{selected.summary}</p>

                  <div className="mt-3 space-y-2">
                    {selected.changes.map((change) => (
                      <div key={change} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#b88323] text-white">
                          <Icon name="check" className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[9px] leading-4 text-neutral-600">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-black/[0.06] bg-[#faf9f6] p-4">
                <p className="text-[8px] font-black tracking-[0.13em] text-neutral-400">THIS WEEK ACTION</p>
                <div className="mt-3 grid gap-2">
                  {selected.tasks.map((task) => (
                    <div key={task} className="flex items-center gap-3 rounded-[13px] bg-white px-3 py-3 shadow-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[10px] font-bold text-neutral-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="mt-8 px-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">FULL ROADMAP</p>
                <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">4週間の全体ロードマップ</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <Icon name="calendar" className="h-[19px] w-[19px]" />
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-neutral-500">
              変化の順番と毎週の行動を、最初から最後まで一覧で確認できます。
            </p>

            <div className="relative mt-5">
              <div className="absolute bottom-8 left-[22px] top-8 w-px bg-gradient-to-b from-black via-[#c9a34f] to-[#c9a34f]" />
              <div className="space-y-4">
                {weeks.map((item, index) => (
                  <article key={item.day} className="relative ml-14">
                    <button
                      type="button"
                      onClick={() => setSelectedWeek(index)}
                      className={`absolute -left-[54px] top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border-[4px] border-[#fbfaf7] text-[11px] font-black shadow-sm transition active:scale-95 ${
                        index === weeks.length - 1 ? "bg-[#b88323] text-white" : index === 0 ? "bg-black text-white" : "bg-white text-black"
                      }`}
                      aria-label={`${item.week}の詳細を表示`}
                    >
                      {item.score}
                    </button>

                    <div className={`overflow-hidden rounded-[21px] border shadow-[0_8px_26px_rgba(20,20,17,0.05)] ${index === weeks.length - 1 ? "border-[#d9bc72] bg-[#fff9eb]" : "border-black/[0.07] bg-white"}`}>
                      <button type="button" onClick={() => setSelectedWeek(index)} className="w-full p-4 text-left">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[8px] font-black tracking-[0.14em] text-[#a97212]">{item.category}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <p className="text-[12px] font-black text-neutral-500">{item.day}</p>
                              <span className="h-1 w-1 rounded-full bg-neutral-300" />
                              <p className="text-[12px] font-black">{item.week}</p>
                            </div>
                          </div>
                          <span className={`rounded-full px-2.5 py-1.5 text-[8px] font-black ${index === weeks.length - 1 ? "bg-[#b88323] text-white" : "bg-[#f2f1ed] text-neutral-600"}`}>
                            {index === weeks.length - 1 ? "GOAL" : item.focus}
                          </span>
                        </div>
                        <h3 className="mt-4 text-[18px] font-black leading-7 tracking-[-0.025em]">{item.title}</h3>
                        <p className="mt-2 text-[11px] leading-5 text-neutral-600">{item.description}</p>

                        <div className="mt-4 rounded-[14px] bg-[#f7f6f2] p-3">
                          <p className="text-[8px] font-black tracking-[0.12em] text-neutral-400">EXPECTED CHANGE</p>
                          <div className="mt-2 space-y-2">
                            {item.changes.map((change) => (
                              <div key={change} className="flex items-start gap-2">
                                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b88323]" />
                                <span className="text-[9px] leading-4 text-neutral-600">{change}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 space-y-2">
                          {item.tasks.map((task) => (
                            <div key={task} className="flex items-center gap-3 rounded-[13px] bg-[#f7f6f2] px-3 py-3">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                <Icon name="check" className="h-3.5 w-3.5" />
                              </span>
                              <span className="text-[10px] font-bold text-neutral-700">{task}</span>
                            </div>
                          ))}
                        </div>
                      </button>

                      <div className="flex items-center justify-between border-t border-black/[0.06] bg-[#faf9f6] px-4 py-3">
                        <p className="text-[8px] font-bold tracking-[0.08em] text-neutral-400">SCORE</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-neutral-400">{index === 0 ? "現在" : `前週 +${item.score - weeks[index - 1].score}`}</span>
                          <span className="text-[16px] font-black text-[#a97212]">{item.score}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-4 mt-8 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_10px_32px_rgba(20,20,17,0.06)]">
            <div className="px-5 pb-4 pt-5">
              <p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">BEFORE / AFTER</p>
              <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">4週間後に目指す状態</h2>
              <p className="mt-2 text-[11px] leading-5 text-neutral-500">
                顔そのものを変えるのではなく、髪型・眉毛・肌・身だしなみを整え、あなたの魅力を引き出します。
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-black/[0.06]">
              <div className="relative min-h-[210px] overflow-hidden border-r border-black/[0.06] bg-neutral-100">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="現在の印象" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-400"><Icon name="camera" className="h-6 w-6" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[8px] font-bold tracking-[0.1em] text-white/55">BEFORE</p>
                  <p className="mt-1 text-[20px] font-black">68点</p>
                </div>
              </div>

              <div className="relative min-h-[210px] overflow-hidden bg-[#171714]">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt="4週間後の目標イメージ" className="h-full w-full scale-[1.04] object-cover brightness-[1.04] contrast-[1.03] saturate-[0.92]" />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/40"><Icon name="sparkle" className="h-6 w-6" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-[#c5952b]/5 to-[#f5d77d]/10" />
                <span className="absolute right-3 top-3 rounded-full bg-[#d0a13a] px-2.5 py-1.5 text-[8px] font-black text-black">TARGET</span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[8px] font-bold tracking-[0.1em] text-[#efd277]">4 WEEKS LATER</p>
                  <p className="mt-1 text-[20px] font-black">84点</p>
                </div>
              </div>
            </div>

            <div className="border-t border-black/[0.06] bg-[#fff9eb] px-4 py-3.5">
              <div className="flex items-start gap-2.5 text-[#8f6211]">
                <Icon name="sparkle" className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-[9px] leading-4">右側は変化の方向性を示すイメージです。実際の見た目やスコアを保証するものではありません。</p>
              </div>
            </div>
          </section>

          <section className="mx-4 mt-8 overflow-hidden rounded-[24px] bg-[#11110f] p-5 text-white shadow-[0_18px_40px_rgba(17,17,15,0.18)]">
            <p className="text-[9px] font-black tracking-[0.16em] text-[#dfc16d]">START YOUR 4 WEEKS</p>
            <h2 className="mt-2 text-[22px] font-black tracking-[-0.04em]">今日から、変化を始める。</h2>
            <p className="mt-2 text-[11px] leading-5 text-white/55">あなた専用のプランでは、毎週やることを迷わないように、具体的な行動へ落とし込んでいます。</p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[{ label: "期間", value: "28日" }, { label: "改善項目", value: "4項目" }, { label: "目標", value: "+16点" }].map((item) => (
                <div key={item.label} className="rounded-[14px] border border-white/10 bg-white/[0.06] px-2 py-3 text-center">
                  <p className="text-[8px] font-bold text-white/35">{item.label}</p>
                  <p className="mt-1 text-[12px] font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <Link href="/plan" className="mt-5 flex min-h-[54px] items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[13px] font-black text-black transition hover:bg-[#f2f0e9] active:scale-[0.99]">
              4週間プランを開始する
              <Icon name="chevron" className="h-4 w-4" />
            </Link>
          </section>

          <div className="px-4 pt-4">
            <Link href="/result" className="flex min-h-12 items-center justify-center gap-2 rounded-[14px] border border-black/[0.08] bg-white px-4 text-[11px] font-black transition hover:bg-neutral-50">
              <Icon name="arrowLeft" className="h-4 w-4" />
              診断結果に戻る
            </Link>

            <aside className="mt-4 flex items-start gap-2.5 rounded-[14px] bg-white px-4 py-3 text-neutral-500">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-[9px] leading-4">このページの変化予測は、診断結果から作成した参考情報です。生活習慣や施術内容により、実際の変化には個人差があります。</p>
            </aside>
          </div>
        </div>

        <BottomNav />
      </div>
    </main>
  );
}