import Link from "next/link";

type FinalCTAProps = {
  desiredImpression: string;
};

export default function FinalCTA({
  desiredImpression,
}: FinalCTAProps) {
  return (
    <section className="relative mt-8 overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-bold tracking-[0.18em] text-blue-300">
          NEXT ACTION
        </p>

        <h2 className="mt-3 text-2xl font-black leading-9 sm:text-3xl">
          この変化を、
          <br />
          4週間で現実に。
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-300">
          「{desiredImpression}」を目指すための行動を、毎週迷わず実践できる専用プランにまとめました。
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-lg font-black text-blue-300">4</p>

            <p className="mt-1 text-[10px] font-bold text-slate-400">
              WEEKS
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-lg font-black text-blue-300">12</p>

            <p className="mt-1 text-[10px] font-bold text-slate-400">
              ACTIONS
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-lg font-black text-blue-300">+16</p>

            <p className="mt-1 text-[10px] font-bold text-slate-400">
              POINTS
            </p>
          </div>
        </div>

        <Link
          href="/plan"
          className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 active:scale-[0.99]"
        >
          4週間プランを確認する
        </Link>

        <Link
          href="/result"
          className="mt-3 flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-bold text-slate-300 transition hover:bg-white/10"
        >
          診断結果に戻る
        </Link>
      </div>
    </section>
  );
}