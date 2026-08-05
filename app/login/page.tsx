import Link from "next/link";
import AuthHeader from "../components/AuthHeader";

function MailIcon() {
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
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
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
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#EEF6FF] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-white shadow-[0_0_40px_rgba(15,23,42,0.08)]">
        <AuthHeader />

        <div className="px-5 pb-12 pt-10">
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#EEF6FF] text-[25px] text-[#1677FF] shadow-sm">
              ✦
            </span>

            <p className="mt-6 text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
              WELCOME BACK
            </p>

            <h1 className="mt-3 text-[30px] font-black tracking-[-0.04em]">
              ログイン
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-black/55">
              保存した診断結果と、
              <br />
              あなた専用の垢抜けプランを確認できます。
            </p>
          </div>

          <section className="mt-8 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_10px_36px_rgba(15,23,42,0.06)]">
            <div>
              <label
                htmlFor="login-email"
                className="text-[12px] font-black text-black/70"
              >
                メールアドレス
              </label>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F8FAFC] px-4 transition focus-within:border-[#1677FF] focus-within:bg-white">
                <span className="text-black/35">
                  <MailIcon />
                </span>

                <input
                  id="login-email"
                  type="email"
                  placeholder="example@akanuke.ai"
                  className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-black/30"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="text-[12px] font-black text-black/70"
                >
                  パスワード
                </label>

                <button
                  type="button"
                  className="text-[10px] font-bold text-[#1677FF]"
                >
                  パスワードを忘れた方
                </button>
              </div>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F8FAFC] px-4 transition focus-within:border-[#1677FF] focus-within:bg-white">
                <span className="text-black/35">
                  <LockIcon />
                </span>

                <input
                  id="login-password"
                  type="password"
                  placeholder="パスワードを入力"
                  className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-black/30"
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#1677FF]"
              />

              <span className="text-[11px] text-black/55">
                ログイン状態を保持する
              </span>
            </label>

            <Link
              href="/dashboard"
              className="mt-6 flex min-h-[54px] w-full items-center justify-center rounded-[13px] bg-[#111111] px-5 text-[14px] font-black text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-black/85"
            >
              ログイン
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <p className="mt-3 text-center text-[9px] text-black/35">
              現在はUI確認用のため、認証処理は行われません。
            </p>
          </section>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-black/10" />
            <span className="text-[10px] font-bold text-black/30">
              初めてご利用の方
            </span>
            <span className="h-px flex-1 bg-black/10" />
          </div>

          <Link
            href="/signup"
            className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] border border-[#1677FF] bg-white px-5 text-[13px] font-black text-[#1677FF] transition hover:bg-[#EEF6FF]"
          >
            無料アカウントを作成
          </Link>

          <Link
            href="/upload"
            className="mt-5 block text-center text-[11px] font-bold text-black/45"
          >
            登録せずに診断を試す
          </Link>
        </div>
      </div>
    </main>
  );
}