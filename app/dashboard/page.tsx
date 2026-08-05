import Link from "next/link";
import AppShell from "../components/AppShell";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function ProductIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const scoreItems = [
  { label: "髪型", score: 82 },
  { label: "眉毛", score: 78 },
  { label: "肌", score: 76 },
];

export default function DashboardPage() {
  return (
    <AppShell>
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="flex h-[68px] items-center justify-between gap-4 px-5">
            <Link
              href="/"
              className="text-[19px] font-black tracking-[-0.03em]"
            >
              AKANUKE.AI
            </Link>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                <UserIcon />
              </span>
            </div>
          </div>
        </header>

        <div className="px-4 pb-28 pt-6">
          <section className="overflow-hidden rounded-[22px] bg-gradient-to-br from-[#1677FF] to-[#76B7FF] p-5 text-white shadow-[0_14px_38px_rgba(22,119,255,0.22)]">
            <p className="text-[11px] font-bold text-white/70">
              おはようございます
            </p>

            <h1 className="mt-1 text-[24px] font-black">
              森さん
            </h1>

            <p className="mt-3 text-[12px] leading-5 text-white/75">
              今日も自分のペースで、
              <br />
              理想の第一印象に近づきましょう。
            </p>

            <Link
              href="/upload"
              className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-sm"
            >
              新しくAI診断する
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </section>

          <section className="mt-5 rounded-[22px] border border-black/5 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold text-black/40">
                  最新の診断結果
                </p>

                <h2 className="mt-1 text-[18px] font-black">
                  2026年8月5日の診断
                </h2>
              </div>

              <span className="rounded-full bg-[#EEF6FF] px-3 py-1.5 text-[10px] font-black text-[#1677FF]">
                保存済み
              </span>
            </div>

            <div className="mt-5 grid grid-cols-[112px_1fr] items-center gap-5">
              <div className="flex aspect-square flex-col items-center justify-center rounded-full border-[10px] border-[#1677FF] bg-white text-center shadow-sm">
                <span className="text-[34px] font-black leading-none">
                  78
                </span>
                <span className="mt-1 text-[9px] font-bold text-black/35">
                  総合スコア
                </span>
              </div>

              <div className="space-y-3">
                {scoreItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-black/60">
                        {item.label}
                      </span>

                      <span className="font-black text-[#1677FF]">
                        {item.score}
                      </span>
                    </div>

                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF6FF]">
                      <div
                        className="h-full rounded-full bg-[#1677FF]"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/result"
              className="mt-5 flex min-h-[46px] items-center justify-center rounded-[12px] border border-black/10 bg-white text-[12px] font-black transition hover:bg-[#EEF6FF]"
            >
              診断結果を詳しく見る
            </Link>
          </section>

          

          <section className="mt-5">
            <h2 className="px-1 text-[16px] font-black">
              マイメニュー
            </h2>

            <div className="mt-3 overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
              <Link
                href="/history"
                className="flex items-center gap-4 border-b border-black/5 px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                  <CameraIcon />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-black">
                    診断履歴
                  </span>
                  <span className="mt-0.5 block text-[10px] text-black/40">
                    過去の診断結果を確認
                  </span>
                </span>

                <ChevronRightIcon />
              </Link>

              <Link
                href="/products"
                className="flex items-center gap-4 border-b border-black/5 px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                  <ProductIcon />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-black">
                    おすすめ商品
                  </span>
                  <span className="mt-0.5 block text-[10px] text-black/40">
                    AIがおすすめする商品を見る
                  </span>
                </span>

                <ChevronRightIcon />
              </Link>

              <Link
                href="/"
                className="flex items-center gap-4 px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                  <HomeIcon />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-black">
                    トップページ
                  </span>
                  <span className="mt-0.5 block text-[10px] text-black/40">
                    AKANUKE.AIのトップへ戻る
                  </span>
                </span>

                <ChevronRightIcon />
              </Link>
            </div>
          </section>

          <Link
            href="/"
            className="mt-6 flex min-h-[48px] items-center justify-center rounded-[13px] border border-black/10 bg-white text-[12px] font-black text-black/55"
          >
            ログアウト
          </Link>

          <p className="mt-3 text-center text-[9px] text-black/30">
            現在はUI確認用のため、ログイン状態は保存されません。
          </p>
        </div>

    </AppShell>
  );
}