"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import BottomNav from "../components/BottomNav";

const IMAGE_STORAGE_KEY = "akanukeImage";
const IMPRESSION_STORAGE_KEY = "akanukeImpressions";
const CURRENT_SCORE = 68;
const TARGET_SCORE = 84;

const scoreItems = [
  { label: "眉毛", score: 82, change: "+5", note: "形を少し整えるだけで、目元の清潔感がさらに高まります。" },
  { label: "髪型", score: 76, change: "+8", note: "前髪と横幅を調整すると、顔全体がすっきり見えます。" },
  { label: "肌", score: 71, change: "+3", note: "保湿と紫外線対策の継続が、印象改善の近道です。" },
  { label: "表情", score: 74, change: "+2", note: "口角と目元を意識すると、親しみやすさが伸びます。" },
] as const;

const priorities = [
  {
    rank: 1,
    category: "HAIR",
    title: "髪型",
    point: 8,
    impact: "最優先",
    description: "前髪を少し軽くし、額を自然に見せることで、幼く見えやすい印象を抑えられます。サイドの膨らみも整えると、輪郭がよりシャープに見えます。",
    href: "/salon",
    action: "おすすめサロンを見る",
  },
  {
    rank: 2,
    category: "EYEBROW",
    title: "眉毛",
    point: 5,
    impact: "効果が高い",
    description: "眉下の余分な毛を整え、眉尻を少し細くすると、目元が引き締まります。太さを残しながら輪郭を整えるのがポイントです。",
    href: "/salon",
    action: "眉毛サロンを確認する",
  },
  {
    rank: 3,
    category: "SKIN",
    title: "肌の清潔感",
    point: 3,
    impact: "毎日改善",
    description: "洗顔・保湿・日焼け止めの3ステップを続けることで、テカリや乾燥を抑え、均一で清潔感のある肌印象を目指せます。",
    href: "/products",
    action: "おすすめ商品を見る",
  },
] as const;

const nextActions = [
  {
    eyebrow: "3商品を提案",
    title: "おすすめ商品",
    description: "肌状態と改善優先度に合わせて、最初に揃える商品を選びました。",
    href: "/products",
    icon: "product",
  },
  {
    eyebrow: "AIおすすめ度 98%",
    title: "おすすめサロン",
    description: "髪型と眉毛をプロに相談するときの選び方とオーダー内容を確認できます。",
    href: "/salon",
    icon: "salon",
  },
  {
    eyebrow: "全28日間",
    title: "4週間プラン",
    description: "無理なく続けられる順番で、毎週の改善アクションをまとめました。",
    href: "/plan",
    icon: "calendar",
  },
] as const;

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrowLeft: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    sparkle: <><path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" /><path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    chart: <><path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19H2" /></>,
    product: <><path d="M9 3h6" /><path d="M10 3v4l-3 3v10h10V10l-3-3V3" /><path d="M7 13h10" /></>,
    salon: <><circle cx="6" cy="7" r="3" /><circle cx="6" cy="17" r="3" /><path d="m8.5 8.5 11 7" /><path d="m8.5 15.5 11-7" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></>,
    refresh: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" /><path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
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
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
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
    setImage(window.sessionStorage.getItem(IMAGE_STORAGE_KEY));

    const rawImpressions = window.sessionStorage.getItem(IMPRESSION_STORAGE_KEY);
    if (rawImpressions) {
      try {
        const parsed = JSON.parse(rawImpressions);
        if (Array.isArray(parsed)) setImpressions(parsed.filter((item): item is string => typeof item === "string"));
      } catch {
        setImpressions([]);
      }
    }

    setIsReady(true);

    const duration = 1500;
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

  const impressionLabel = useMemo(() => impressions.length > 0 ? impressions.join("・") : "爽やか・清潔感", [impressions]);

  if (!isReady) {
    return <main className="flex min-h-screen items-center justify-center bg-white"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#b88323]" /></main>;
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-hidden bg-white shadow-[0_0_50px_rgba(22,22,18,0.09)]">
        <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
          <div className="grid h-[66px] grid-cols-[44px_1fr_44px] items-center px-3">
            <Link href="/upload" aria-label="写真選択へ戻る" className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/[0.05] active:scale-95"><Icon name="arrowLeft" className="h-[21px] w-[21px]" /></Link>
            <Link href="/" className="text-center text-[19px] font-black tracking-[-0.035em]">AKANUKE.AI</Link>
            <div aria-hidden="true" />
          </div>
        </header>

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d8af] bg-[#fff8e8] text-[#ae7714]"><Icon name="sparkle" className="h-[22px] w-[22px]" /></div>
            <p className="mt-4 text-[10px] font-black tracking-[0.18em] text-[#a97212]">PERSONAL BEAUTY REPORT</p>
            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">あなたの診断結果</h1>
            <p className="mx-auto mt-2 max-w-[320px] text-[12px] leading-5 text-neutral-500">顔写真と理想の印象をもとに、AIが改善効果の高い順番を整理しました。</p>
          </section>

          <section className="mx-4 overflow-hidden rounded-[24px] bg-[#11110f] shadow-[0_18px_45px_rgba(17,17,15,0.22)]">
            <div className="grid grid-cols-[42%_58%]">
              <div className="relative min-h-[282px] overflow-hidden bg-neutral-800">
                {image ? <img src={image} alt="今回診断した顔写真" className="h-full w-full object-cover" /> : <div className="flex h-full min-h-[282px] items-center justify-center px-4 text-center text-white/60"><div><p className="text-[11px] font-bold">写真が見つかりません</p><Link href="/upload" className="mt-2 inline-block text-[10px] font-black text-[#e3c368]">選び直す</Link></div></div>}
                {image && <><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" /><span className="absolute left-2 top-[25%] rounded-full border border-white/20 bg-black/50 px-2 py-1 text-[8px] font-black text-white backdrop-blur">眉</span><span className="absolute right-2 top-[10%] rounded-full border border-white/20 bg-black/50 px-2 py-1 text-[8px] font-black text-white backdrop-blur">髪</span><span className="absolute bottom-[19%] right-2 rounded-full border border-white/20 bg-black/50 px-2 py-1 text-[8px] font-black text-white backdrop-blur">肌</span><div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[8px] font-black text-black backdrop-blur"><Icon name="check" className="h-3 w-3" />AI解析済み</div></>}
              </div>

              <div className="flex flex-col items-center justify-center px-3 py-5">
                <CircularScore score={displayScore} />
                <div className="mt-1 w-full rounded-[15px] border border-white/10 bg-white/[0.06] px-3 py-3 text-white">
                  <div className="flex items-center justify-between gap-2"><div><p className="text-[8px] font-bold tracking-[0.1em] text-white/40">4 WEEKS TARGET</p><p className="mt-1 text-[22px] font-black tracking-[-0.04em]">{TARGET_SCORE}点</p></div><span className="rounded-full bg-[#d5a63c] px-2.5 py-1.5 text-[9px] font-black text-black">+{TARGET_SCORE - CURRENT_SCORE}</span></div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 px-4 py-3.5"><div className="flex items-center justify-between gap-3"><div><p className="text-[8px] font-bold tracking-[0.11em] text-white/35">TARGET IMPRESSION</p><p className="mt-1 text-[12px] font-black text-white">{impressionLabel}</p></div><div className="text-right"><p className="text-[8px] font-bold text-white/35">伸びしろ</p><p className="mt-1 text-[12px] font-black text-[#e6c66e]">高い</p></div></div></div>
          </section>

          <section className="mx-4 mt-4 rounded-[22px] border border-[#e7d9b5] bg-[#fff9eb] p-5 shadow-[0_8px_24px_rgba(161,111,15,0.07)]">
            <div className="flex items-center gap-2 text-[#a97212]"><Icon name="sparkle" className="h-[18px] w-[18px]" /><p className="text-[11px] font-black tracking-[0.08em]">AI TOTAL REVIEW</p></div>
            <h2 className="mt-3 text-[20px] font-black leading-[1.5] tracking-[-0.035em]">髪型と眉毛を整えるだけで、<br />第一印象は大きく変わります。</h2>
            <p className="mt-3 text-[12px] leading-6 text-neutral-650">現在は親しみやすく、柔らかい印象があります。一方で、前髪と眉毛の輪郭によって少し幼く見えやすい傾向があります。</p>
            <p className="mt-2 text-[12px] leading-6 text-neutral-650">最初に髪型と眉毛を整え、その後に基本的な肌ケアを続けることで、爽やかさと清潔感を短期間でも伸ばせます。</p>
            <div className="mt-4 grid grid-cols-3 gap-2">{[{label:"目指す印象",value:"爽やか"},{label:"改善期間",value:"4週間"},{label:"期待値",value:"+16点"}].map((item)=><div key={item.label} className="rounded-[13px] border border-black/[0.04] bg-white px-2 py-3 text-center"><p className="text-[8px] font-bold text-neutral-400">{item.label}</p><p className="mt-1 text-[11px] font-black">{item.value}</p></div>)}</div>
          </section>

          <section className="mt-8 px-4">
            <div className="flex items-end justify-between gap-4"><div><p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">SCORE DETAILS</p><h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">項目別スコア</h2></div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"><Icon name="chart" className="h-[19px] w-[19px]" /></div></div>
            <div className="mt-4 overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_8px_26px_rgba(20,20,17,0.05)]">{scoreItems.map((item,index)=><article key={item.label} className={`p-4 ${index !== scoreItems.length-1 ? "border-b border-black/[0.06]" : ""}`}><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2"><p className="text-[13px] font-black">{item.label}</p><span className="rounded-full bg-[#f7f2e7] px-2 py-1 text-[8px] font-black text-[#9f6b10]">改善 {item.change}</span></div><div className="flex items-end gap-1"><span className="text-[20px] font-black">{item.score}</span><span className="pb-0.5 text-[8px] font-bold text-neutral-400">/100</span></div></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100"><div className="h-full rounded-full bg-gradient-to-r from-[#181816] to-[#6d695f]" style={{width:`${item.score}%`}} /></div><p className="mt-2 text-[10px] leading-5 text-neutral-500">{item.note}</p></article>)}</div>
          </section>

          <section className="mt-8 px-4">
            <div className="flex items-end justify-between gap-4"><div><p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">IMPROVEMENT PRIORITY</p><h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">最初に改善する3項目</h2></div><p className="pb-1 text-[9px] font-bold text-neutral-400">効果が高い順</p></div>
            <div className="mt-4 space-y-3">{priorities.map((item)=><article key={item.rank} className="overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_8px_26px_rgba(20,20,17,0.05)]"><div className="p-4"><div className="flex items-start gap-3"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[17px] font-black ${item.rank===1?"bg-black text-white":"bg-[#f2f1ed] text-black"}`}>{item.rank}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="text-[8px] font-black tracking-[0.13em] text-[#a97212]">{item.category}</p><h3 className="mt-1 text-[18px] font-black">{item.title}</h3><span className="mt-2 inline-flex rounded-full bg-[#fff4d8] px-2.5 py-1 text-[8px] font-black text-[#a97212]">{item.impact}</span></div><div className="shrink-0 text-right"><p className="text-[8px] font-bold text-neutral-400">期待値</p><p className="mt-0.5 text-[20px] font-black text-[#a97212]">+{item.point}</p></div></div><p className="mt-3 text-[11px] leading-5 text-neutral-600">{item.description}</p></div></div></div><Link href={item.href} className="flex min-h-12 items-center justify-between border-t border-black/[0.06] bg-[#faf9f6] px-4 text-[11px] font-black transition hover:bg-neutral-100">{item.action}<Icon name="chevron" className="h-4 w-4" /></Link></article>)}</div>
          </section>

          <section className="mt-8 px-4">
            <div><p className="text-[9px] font-black tracking-[0.16em] text-[#a97212]">YOUR NEXT ACTION</p><h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">次に取り組むこと</h2><p className="mt-2 text-[11px] leading-5 text-neutral-500">診断結果をもとに、必要なアクションだけを確認できます。</p></div>
            <div className="mt-4 space-y-3">{nextActions.map((card)=><Link key={card.href} href={card.href} className="group flex items-center gap-4 rounded-[20px] border border-black/[0.07] bg-white p-4 shadow-[0_8px_26px_rgba(20,20,17,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(20,20,17,0.09)] active:scale-[0.99]"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-black text-white"><Icon name={card.icon} className="h-[21px] w-[21px]" /></span><div className="min-w-0 flex-1"><p className="text-[8px] font-black tracking-[0.1em] text-[#a97212]">{card.eyebrow}</p><h3 className="mt-1 text-[14px] font-black">{card.title}</h3><p className="mt-1 text-[10px] leading-5 text-neutral-500">{card.description}</p></div><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f1ed] text-neutral-500 transition group-hover:bg-black group-hover:text-white"><Icon name="chevron" className="h-4 w-4" /></span></Link>)}</div>
          </section>

          <section className="mx-4 mt-8 overflow-hidden rounded-[24px] bg-[#11110f] p-5 text-white shadow-[0_18px_40px_rgba(17,17,15,0.18)]">
            <p className="text-[9px] font-black tracking-[0.16em] text-[#dfc16d]">4 WEEKS LATER</p>
            <h2 className="mt-2 text-[22px] font-black tracking-[-0.04em]">変化後のイメージを確認</h2>
            <p className="mt-2 text-[11px] leading-5 text-white/55">今回の診断結果をもとに、4週間後に目指す印象と改善の方向性を確認できます。</p>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-3 text-center"><p className="text-[8px] font-bold text-white/40">NOW</p><p className="mt-1 text-[24px] font-black">68</p></div><span className="text-[#dfc16d]">→</span><div className="rounded-[16px] border border-[#dfc16d]/35 bg-[#dfc16d]/10 p-3 text-center"><p className="text-[8px] font-bold text-[#dfc16d]">TARGET</p><p className="mt-1 text-[24px] font-black">84</p></div></div>
            <Link href="/preview" className="mt-5 flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[13px] font-black text-black transition hover:bg-[#f2f0e9] active:scale-[0.99]">4週間後の変化イメージを見る<span aria-hidden="true">→</span></Link>
          </section>

          <div className="px-4 pt-4"><Link href="/upload" className="flex min-h-12 items-center justify-center gap-2 rounded-[14px] border border-black/[0.08] bg-white px-4 text-[11px] font-black transition hover:bg-neutral-50"><Icon name="refresh" className="h-4 w-4" />別の写真で診断し直す</Link><aside className="mt-4 flex items-start gap-2.5 rounded-[14px] bg-white px-4 py-3 text-neutral-500"><Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0" /><p className="text-[9px] leading-4">診断画像は現在のブラウザ内でのみ一時的に保持されます。表示されるスコアや改善効果はAIによる参考情報であり、結果には個人差があります。</p></aside></div>
        </div>

        <BottomNav />
      </div>
    </main>
  );
}