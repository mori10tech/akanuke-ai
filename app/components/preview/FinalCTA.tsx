import Link from "next/link";

type FinalCTAProps = {
  desiredImpression: string;
};

const actionItems = [
  {
    title: "美容院を探す",
    description:
      "4週間後の髪型に近づくために、カットやスタイリングを相談できる美容院を探します。",
    href: "/salon",
    icon: "✂️",
    badge: "髪型を変える",
  },
  {
    title: "眉毛サロンを探す",
    description:
      "顔立ちや目指す印象に合わせて、眉毛の形をプロに整えてもらえます。",
    href: "/salon",
    icon: "✨",
    badge: "第一印象を変える",
  },
  {
    title: "おすすめ商品を見る",
    description:
      "診断結果と4週間プランに合った、スキンケアやヘアケア商品を確認できます。",
    href: "/products",
    icon: "🛍️",
    badge: "毎日のケア",
  },
];

export default function FinalCTA({
  desiredImpression,
}: FinalCTAProps) {
  return (
    <section className="relative mt-8 overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-200 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold tracking-[0.18em] text-blue-300">
            YOUR NEXT ACTION
          </p>

          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-slate-200 backdrop-blur">
            4週間プラン完成
          </span>
        </div>

        <div className="mt-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl backdrop-blur">
            ✦
          </div>

          <h2 className="mt-5 text-2xl font-black leading-9 tracking-tight sm:text-3xl">
            この変化を、
            <br />
            現実にしていきましょう。
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            あなたが目指す「{desiredImpression}
            」に近づくために、必要な行動をすぐに始められます。
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <p className="text-xs font-bold text-slate-400">
              現在のスコア
            </p>

            <p className="mt-2 text-3xl font-black">
              68
              <span className="ml-1 text-sm text-slate-400">
                点
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/15 p-4 backdrop-blur">
            <p className="text-xs font-bold text-blue-200">
              4週間後の目標
            </p>

            <p className="mt-2 text-3xl font-black">
              84
              <span className="ml-1 text-sm text-blue-200">
                点
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-bold text-white">
            最初の一歩を選ぶ
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            4週間後のイメージを確認したうえで、必要なサービスや商品を選べます。
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {actionItems.map((item) => (
            <Link
              key={`${item.title}-${item.badge}`}
              href={item.href}
              className="group block rounded-3xl border border-white/10 bg-white p-5 text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl transition group-hover:bg-blue-50">
                  {item.icon}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    {item.badge}
                  </span>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <h3 className="font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <span className="shrink-0 text-lg text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                      →
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <Link
            href="/result"
            className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
          >
            診断結果をもう一度確認する
          </Link>

          <Link
            href="/upload"
            className="mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold text-slate-400 transition hover:text-white"
          >
            別の写真で診断し直す
          </Link>
        </div>
      </div>
    </section>
  );
}