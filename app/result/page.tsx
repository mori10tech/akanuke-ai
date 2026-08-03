"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import BottomNav from "../components/BottomNav";

const IMAGE_STORAGE_KEY = "akanukeImage";
const IMPRESSION_STORAGE_KEY = "akanukeDesiredImpressions";
const CURRENT_SCORE = 68;
const GOAL_SCORE = 84;

const priorities = [
  {
    rank: 1,
    title: "髪型を変える",
    point: 8,
    impact: "最優先",
    description:
      "前髪を少し軽くし、額を自然に見せることで、幼く見えやすい印象を抑えられます。サイドの膨らみも整えると、輪郭がよりシャープに見えます。",
  },
  {
    rank: 2,
    title: "眉毛を整える",
    point: 5,
    impact: "効果が高い",
    description:
      "眉下の余分な毛を整え、眉尻を少し細くすると、目元が引き締まります。太さを残しながら輪郭を整えるのがポイントです。",
  },
  {
    rank: 3,
    title: "肌の基本ケアを始める",
    point: 3,
    impact: "毎日改善",
    description:
      "洗顔・保湿・日焼け止めの3ステップを続けることで、テカリや乾燥を抑え、均一で清潔感のある肌印象を目指せます。",
  },
] as const;

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrowLeft: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    sparkle: <><path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" /><path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    refresh: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" /><path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function CircularScore({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-[144px] w-[144px]">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <circle cx="64" cy="64" r={radius} fill="none" stroke="url(#scoreGradient)" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-[stroke-dashoffset] duration-1000 ease-out" />
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="128" y2="128">
            <stop offset="0%" stopColor="#f2d782" />
            <stop offset="100%" stopColor="#bd8214" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex items-end gap-1">
          <span className="text-[44px] font-black leading-none tracking-[-0.07em]">{score}</span>
          <span className="pb-1 text-[11px] font-bold text-white/45">/100</span>
        </div>
        <span className="mt-1 text-[9px] font-bold tracking-[0.12em] text-white/55">CURRENT SCORE</span>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const [image, setImage] = useState<string | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [impressions, setImpressions] = useState<string[]>([]);

  useEffect(() => {
    const savedImage = window.sessionStorage.getItem(IMAGE_STORAGE_KEY);
    const rawImpressions = window.sessionStorage.getItem(IMPRESSION_STORAGE_KEY);

    window.setTimeout(() => {
      setImage(savedImage);
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
    }, 0);

    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(CURRENT_SCORE * eased));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const impressionLabel = useMemo(
    () => (impressions.length > 0 ? impressions.join("・") : "爽やか・清潔感"),
    [impressions],
  );

  if (!isReady) {
    return <main className="flex min-h-screen items-center justify-center bg-white"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#b88323]" /></main>;
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-hidden bg-white shadow-[0_0_50px_rgba(22,22,18,0.09)]">
        <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[44px_1fr_44px] items-center px-4">
            <Link href="/upload" aria-label="写真選択へ戻る" className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/[0.05] active:scale-95"><Icon name="arrowLeft" className="h-[21px] w-[21px]" /></Link>
            <Link href="/" className="text-center text-[20px] font-black tracking-[-0.035em] text-black">AKANUKE.AI</Link>
            <div aria-hidden="true" />
          </div>
        </header>

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d8af] bg-[#fff8e8] text-[#ae7714]"><Icon name="sparkle" className="h-[22px] w-[22px]" /></div>
            <p className="mt-4 text-[10px] font-black tracking-[0.18em] text-[#a97212]">PERSONAL BEAUTY REPORT</p>
            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">あなたの診断結果</h1>
            <p className="mx-auto mt-2 max-w-[320px] text-[12px] leading-5 text-neutral-500">現在の印象と理想像を比較し、改善効果の高い順番をAIが整理しました。</p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] bg-[#11110f] shadow-[0_18px_45px_rgba(17,17,15,0.22)]">
            <div className="grid grid-cols-[42%_58%]">
              <div className="relative min-h-[282px] overflow-hidden bg-neutral-800">
                {image ? <img src={image} alt="今回診断した顔写真" className="h-full w-full object-cover" /> : <div className="flex h-full min-h-[282px] items-center justify-center px-4 text-center text-white/60"><div><p className="text-[11px] font-bold">写真が見つかりません</p><Link href="/upload" className="mt-2 inline-block text-[10px] font-black text-[#e3c368]">選び直す</Link></div></div>}
                {image && <><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" /><span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[8px] font-black text-black"><Icon name="check" className="h-3 w-3" />AI解析済み</span></>}
              </div>
              <div className="flex flex-col items-center justify-center px-3 py-5">
                <CircularScore score={displayScore} />
                <div className="mt-2 w-full rounded-[15px] border border-white/10 bg-white/[0.06] px-3 py-3 text-white">
                  <p className="text-[8px] font-bold tracking-[0.1em] text-white/40">GOAL SCORE</p>
                  <div className="mt-1 flex items-center justify-between gap-2"><p className="text-[22px] font-black tracking-[-0.04em]">{GOAL_SCORE}点</p><span className="rounded-full bg-[#d5a63c] px-2.5 py-1.5 text-[9px] font-black text-black">+{GOAL_SCORE - CURRENT_SCORE}</span></div>
                  <p className="mt-1 text-[9px] text-white/45">自分のペースで目指す理想値</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-4 mt-5 rounded-[20px] border border-[#eadfbd] bg-[#fff9e9] p-5">
            <div className="flex items-center gap-2 text-[#b77c00]"><Icon name="sparkle" /><p className="text-[12px] font-black">AI総合コメント</p></div>
            <h2 className="mt-3 text-[20px] font-black leading-[1.5] tracking-[-0.03em]">髪型と眉毛を整えるだけで、第一印象は大きく変わります。</h2>
            <p className="mt-3 text-[12px] leading-6 text-neutral-700">現在は親しみやすく柔らかい印象です。一方で、前髪と眉毛の形によって少し幼く見えやすい傾向があります。目指す印象は「{impressionLabel}」。髪型・眉毛・肌の順に整えるのがおすすめです。</p>
          </section>

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#a97212]">BEFORE / AFTER</p>
            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">理想イメージ</h2>
            <p className="mt-2 text-[11px] leading-5 text-neutral-500">現在の状態と、改善後に目指す印象を比較できます。</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-[18px] border border-[#dedede] bg-white">
                <div className="relative aspect-[4/5] bg-neutral-100">{image ? <img src={image} alt="Before" className="h-full w-full object-cover" /> : null}<span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[9px] font-black text-white">Before</span></div>
                <div className="p-3"><p className="text-[11px] font-black">現在の印象</p><p className="mt-1 text-[9px] leading-4 text-neutral-500">親しみやすい一方、髪型と眉毛に改善余地があります。</p></div>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-[#d9bb70] bg-[#fffaf0]">
                <div className="relative aspect-[4/5] bg-neutral-100">{image ? <img src={image} alt="Afterイメージ" className="h-full w-full scale-[1.03] object-cover brightness-[1.06] contrast-[1.04] saturate-[0.92]" /> : null}<div className="absolute inset-0 bg-gradient-to-t from-[#c99416]/15 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-[#c99416] px-2.5 py-1 text-[9px] font-black text-white">After</span></div>
                <div className="p-3"><p className="text-[11px] font-black">理想の印象</p><p className="mt-1 text-[9px] leading-4 text-neutral-500">爽やかさと清潔感が自然に伝わる状態を目指します。</p></div>
              </div>
            </div>
            <p className="mt-3 text-center text-[9px] leading-4 text-neutral-400">※Afterは改善の方向性を示す参考イメージです。実際の変化を保証するものではありません。</p>
          </section>

          <section className="mx-4 mt-7">
            <p className="text-[10px] font-black tracking-[0.16em] text-[#a97212]">PRIORITY</p>
            <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">改善優先順位</h2>
            <div className="mt-4 space-y-3">
              {priorities.map((item) => <article key={item.rank} className="rounded-[18px] border border-[#dedede] bg-white p-4 shadow-[0_6px_22px_rgba(15,23,42,0.04)]"><div className="flex items-start gap-3"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-[17px] font-black ${item.rank === 1 ? "bg-black text-white" : "bg-[#f1f1f1] text-black"}`}>{item.rank}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h3 className="text-[16px] font-black">{item.title}</h3><span className="mt-1.5 inline-flex rounded-full bg-[#fff4d8] px-2.5 py-1 text-[8px] font-black text-[#b77c00]">{item.impact}</span></div><p className="shrink-0 text-[17px] font-black text-[#b77c00]">+{item.point}点</p></div><p className="mt-3 text-[11px] leading-5 text-neutral-600">{item.description}</p></div></div></article>)}
            </div>
          </section>

          <section className="mx-4 mt-7 rounded-[22px] bg-[#11110f] p-5 text-white">
            <p className="text-[9px] font-black tracking-[0.16em] text-[#dfc16d]">YOUR PERSONAL PLAN</p>
            <h2 className="mt-2 text-[23px] font-black tracking-[-0.04em]">自分のペースで進める<br />垢抜けプラン</h2>
            <p className="mt-3 text-[11px] leading-5 text-white/55">週ごとの期限はありません。優先順位の高い項目から、自分のタイミングで進められます。</p>
            <Link href="/plan" className="mt-5 flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[13px] font-black text-black transition hover:bg-[#f2f0e9] active:scale-[0.99]">垢抜けプランを見る<span aria-hidden="true">→</span></Link>
          </section>

          <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
            <Link href="/products" className="rounded-[16px] border border-[#dedede] bg-white p-4"><p className="text-[12px] font-black">おすすめ商品</p><p className="mt-1 text-[9px] leading-4 text-neutral-500">改善内容に合う商品を見る</p></Link>
            <Link href="/salon" className="rounded-[16px] border border-[#dedede] bg-white p-4"><p className="text-[12px] font-black">おすすめサロン</p><p className="mt-1 text-[9px] leading-4 text-neutral-500">髪型・眉毛の相談先を見る</p></Link>
          </div>

          <Link href="/upload" className="mx-4 mt-4 flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-[#dedede] bg-white px-4 text-[11px] font-black"><Icon name="refresh" className="h-4 w-4" />別の写真で診断し直す</Link>
        </div>
        <BottomNav />
      </div>
    </main>
  );
}