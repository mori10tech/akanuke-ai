"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import BottomNav from "../components/BottomNav";

const STORAGE_KEY = "akanukePlanCompletedTasks";

type PlanTask = {
  id: string;
  priority: number;
  category: string;
  title: string;
  reason: string;
  effect: string;
  howTo: string;
  href?: string;
  hrefLabel?: string;
};

const planTasks: PlanTask[] = [
  {
    id: "hair-salon",
    priority: 1,
    category: "髪型",
    title: "美容室で髪型を整える",
    reason: "髪型は顔全体の印象を最も大きく変えやすい項目です。",
    effect: "前髪とサイドが整い、輪郭がすっきり見えます。",
    howTo: "額が少し見える軽めの前髪と、サイドを抑えた爽やかなスタイルを相談しましょう。",
    href: "/salon",
    hrefLabel: "おすすめサロンを見る",
  },
  {
    id: "eyebrow",
    priority: 2,
    category: "眉毛",
    title: "眉毛の輪郭を整える",
    reason: "眉毛を整えると目元が引き締まり、清潔感が短時間で上がります。",
    effect: "左右差が目立ちにくくなり、目元がはっきりします。",
    howTo: "眉下の余分な毛を処理し、太さを残した自然な形を目指しましょう。",
    href: "/salon",
    hrefLabel: "眉毛対応サロンを見る",
  },
  {
    id: "sunscreen",
    priority: 3,
    category: "肌",
    title: "毎朝、日焼け止めを使う",
    reason: "紫外線対策は肌の清潔感を守るための基本です。",
    effect: "乾燥・赤み・くすみの予防につながります。",
    howTo: "外出前に顔全体へ薄く均一に塗り、汗をかいた日は塗り直しましょう。",
    href: "/products",
    hrefLabel: "おすすめ商品を見る",
  },
  {
    id: "moisturize",
    priority: 4,
    category: "肌",
    title: "洗顔後に保湿する",
    reason: "肌の乾燥と過剰な皮脂を抑えるために、保湿は欠かせません。",
    effect: "テカリとカサつきが目立ちにくくなります。",
    howTo: "朝晩の洗顔後、化粧水またはオールインワンを顔全体になじませましょう。",
    href: "/products",
    hrefLabel: "スキンケア商品を見る",
  },
  {
    id: "hair-set",
    priority: 5,
    category: "髪型",
    title: "自分に合うヘアセットを覚える",
    reason: "美容室直後だけでなく、普段も理想の髪型を再現するためです。",
    effect: "毎日の印象が安定し、清潔感を維持できます。",
    howTo: "ドライヤーで根元を立ち上げ、少量のワックスで毛流れを整えましょう。",
    href: "/products",
    hrefLabel: "スタイリング商品を見る",
  },
  {
    id: "grooming",
    priority: 6,
    category: "身だしなみ",
    title: "ヒゲ・鼻毛・爪を整える",
    reason: "細部の手入れは、近距離で見たときの清潔感に直結します。",
    effect: "丁寧に手入れされた印象になります。",
    howTo: "外出前に鏡で確認し、気になったときにすぐ整えられる道具を用意しましょう。",
  },
];

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrowLeft: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    reset: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" /><path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ProgressRing({ progress }: { progress: number }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return <div className="relative h-[126px] w-[126px]"><svg viewBox="0 0 112 112" className="h-full w-full -rotate-90" aria-hidden="true"><circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" /><circle cx="56" cy="56" r={radius} fill="none" stroke="url(#planProgressGradient)" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-[stroke-dashoffset] duration-700 ease-out" /><defs><linearGradient id="planProgressGradient" x1="0" y1="0" x2="112" y2="112"><stop offset="0%" stopColor="#f0d47e" /><stop offset="100%" stopColor="#bd8214" /></linearGradient></defs></svg><div className="absolute inset-0 flex flex-col items-center justify-center text-white"><span className="text-[34px] font-black leading-none">{progress}%</span><span className="mt-1 text-[8px] font-bold tracking-[0.12em] text-white/45">PROGRESS</span></div></div>;
}

export default function PlanPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [openedId, setOpenedId] = useState<string | null>(planTasks[0].id);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    window.setTimeout(() => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setCompletedIds(parsed.filter((id): id is string => typeof id === "string"));
        } catch {
          setCompletedIds([]);
        }
      }
      setLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
  }, [completedIds, loaded]);

  const completedCount = completedIds.length;
  const progress = useMemo(() => Math.round((completedCount / planTasks.length) * 100), [completedCount]);

  const toggleCompleted = (id: string) => {
    setCompletedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  if (!loaded) return <main className="flex min-h-screen items-center justify-center bg-white"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#b88323]" /></main>;

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] overflow-hidden bg-white shadow-[0_0_50px_rgba(22,22,18,0.09)]">
        <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl"><div className="grid h-[68px] grid-cols-[44px_1fr_44px] items-center px-4"><Link href="/result" aria-label="診断結果へ戻る" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/[0.05]"><Icon name="arrowLeft" className="h-[21px] w-[21px]" /></Link><Link href="/" className="text-center text-[20px] font-black tracking-[-0.035em]">AKANUKE.AI</Link><div aria-hidden="true" /></div></header>

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center"><p className="text-[10px] font-black tracking-[0.18em] text-[#a97212]">PERSONAL AKANUKE PLAN</p><h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">あなた専用の垢抜けプラン</h1><p className="mx-auto mt-2 max-w-[340px] text-[12px] leading-5 text-neutral-500">期限や週区切りはありません。優先順位の高い項目から、自分のペースで進めてください。</p></section>

          <section className="mx-4 rounded-[24px] bg-[#11110f] p-5 text-white shadow-[0_18px_45px_rgba(17,17,15,0.22)]"><div className="flex items-center gap-5"><ProgressRing progress={progress} /><div className="min-w-0 flex-1"><p className="text-[9px] font-black tracking-[0.13em] text-[#dfc16d]">CURRENT STATUS</p><h2 className="mt-2 text-[22px] font-black">{completedCount} / {planTasks.length} 完了</h2><p className="mt-2 text-[10px] leading-5 text-white/55">すべて一度に行う必要はありません。できる項目から進めましょう。</p></div></div></section>

          <section className="mx-4 mt-7"><div className="flex items-end justify-between"><div><p className="text-[10px] font-black tracking-[0.16em] text-[#a97212]">ACTION LIST</p><h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">やることリスト</h2></div><p className="text-[9px] font-bold text-neutral-400">優先度順</p></div>
            <div className="mt-4 space-y-3">
              {planTasks.map((task) => {
                const completed = completedIds.includes(task.id);
                const opened = openedId === task.id;
                return <article key={task.id} className={`overflow-hidden rounded-[18px] border bg-white ${completed ? "border-[#d8bd77]" : "border-[#dedede]"}`}><div className="flex items-start gap-3 p-4"><button type="button" onClick={() => toggleCompleted(task.id)} aria-label={`${task.title}を${completed ? "未完了" : "完了"}にする`} className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${completed ? "border-black bg-black text-white" : "border-neutral-300 bg-white text-transparent"}`}><Icon name="check" className="h-4 w-4" /></button><button type="button" onClick={() => setOpenedId(opened ? null : task.id)} className="min-w-0 flex-1 text-left"><div className="flex items-start justify-between gap-3"><div><p className="text-[9px] font-black text-[#b77c00]">優先度 {task.priority}・{task.category}</p><h3 className={`mt-1 text-[15px] font-black ${completed ? "text-neutral-400 line-through" : "text-black"}`}>{task.title}</h3></div><span className={`mt-1 transition ${opened ? "rotate-90" : ""}`}><Icon name="chevron" /></span></div></button></div>{opened && <div className="border-t border-[#eeeeee] bg-[#fafafa] px-4 py-4"><div className="space-y-3 text-[11px] leading-5"><div><p className="font-black">なぜ必要？</p><p className="mt-1 text-neutral-600">{task.reason}</p></div><div><p className="font-black">期待できる変化</p><p className="mt-1 text-neutral-600">{task.effect}</p></div><div><p className="font-black">具体的なやり方</p><p className="mt-1 text-neutral-600">{task.howTo}</p></div></div>{task.href && <Link href={task.href} className="mt-4 flex min-h-11 items-center justify-between rounded-[11px] bg-black px-4 text-[11px] font-black text-white">{task.hrefLabel}<Icon name="chevron" /></Link>}</div>}</article>;
              })}
            </div>
          </section>

          <section className="mx-4 mt-7 grid grid-cols-2 gap-3"><Link href="/products" className="rounded-[18px] border border-[#dedede] bg-white p-4"><p className="text-[13px] font-black">おすすめ商品</p><p className="mt-2 text-[10px] leading-5 text-neutral-500">肌ケア・ヘアセットに必要な商品を見る</p></Link><Link href="/salon" className="rounded-[18px] border border-[#dedede] bg-white p-4"><p className="text-[13px] font-black">おすすめサロン</p><p className="mt-2 text-[10px] leading-5 text-neutral-500">髪型・眉毛を相談できるサロンを見る</p></Link></section>

          {progress === 100 && <section className="mx-4 mt-6 rounded-[20px] border border-[#d8bd77] bg-[#fff9e9] p-5 text-center"><p className="text-[10px] font-black tracking-[0.14em] text-[#a97212]">PLAN COMPLETE</p><h2 className="mt-2 text-[21px] font-black">すべてのタスクが完了しました</h2><p className="mt-2 text-[11px] leading-5 text-neutral-600">同じ条件で写真を撮り直し、Before / Afterを確認しましょう。</p><Link href="/upload" className="mt-4 flex min-h-12 items-center justify-center rounded-[12px] bg-black text-[12px] font-black text-white">もう一度診断する</Link></section>}

          <button type="button" onClick={() => setCompletedIds([])} className="mx-auto mt-6 flex items-center gap-2 text-[10px] font-black text-neutral-400"><Icon name="reset" className="h-4 w-4" />チェック状況をリセット</button>
        </div>
        <BottomNav />
      </div>
    </main>
  );
}