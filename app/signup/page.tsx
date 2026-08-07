import Link from "next/link";
import AppHeader from "../components/AppHeader";

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
      <rect x="3" y="5" width="18" height="14" rx="2" />
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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] border-x border-black/5 bg-white">
        <AppHeader
          backHref="/"
          backLabel="トップページへ戻る"
        />

        <div className="px-5 pb-12 pt-8">
          <div>
            <p className="text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
              CREATE ACCOUNT
            </p>

            <h1 className="mt-3 text-[30px] font-black leading-[1.3] tracking-[-0.04em]">
              診断結果を、
              <br />
              あなた専用に保存。
            </h1>

            <p className="mt-4 text-[13px] leading-6 text-black/55">
              無料アカウントを作成すると、診断履歴や垢抜けプランをいつでも確認できます。
            </p>
          </div>

          <section className="mt-7 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
            <div>
              <label
                htmlFor="signup-name"
                className="text-[12px] font-black text-black/55"
              >
                お名前
              </label>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 transition focus-within:border-[#1677FF]/30 focus-within:bg-white">
                <span className="text-black/35">
                  <UserIcon />
                </span>

                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="例：垢抜 太郎"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-black/20"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="signup-email"
                className="text-[12px] font-black text-black/55"
              >
                メールアドレス
              </label>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 transition focus-within:border-[#1677FF]/30 focus-within:bg-white">
                <span className="text-black/35">
                  <MailIcon />
                </span>

                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@akanuke.ai"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-black/20"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="signup-password"
                className="text-[12px] font-black text-black/55"
              >
                パスワード
              </label>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 transition focus-within:border-[#1677FF]/30 focus-within:bg-white">
                <span className="text-black/35">
                  <LockIcon />
                </span>

                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="8文字以上で入力"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-black/20"
                />
              </div>

              <p className="mt-2 text-[10px] leading-5 text-black/35">
                半角英数字を組み合わせて8文字以上で入力してください。
              </p>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#1677FF]"
              />

              <span className="text-[11px] leading-5 text-black/55">
                <Link
                  href="/terms"
                  className="font-black text-[#1677FF]"
                >
                  利用規約
                </Link>
                と
                <a
                  href="https://www.leafworks.jp/doc/privacy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-[#1677FF]"
                >
                  個人情報保護方針
                </a>
                に同意します。
              </span>
            </label>

            <Link
              href="/dashboard"
              className="mt-6 flex min-h-[54px] w-full items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[14px] font-black text-[#111111] shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 active:scale-[0.99]"
            >
              無料アカウントを作成
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <p className="mt-3 text-center text-[9px] text-black/35">
              現在はUI確認用のため、入力内容は保存されません。
            </p>
          </section>

          <div className="mt-7 rounded-[18px] bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              アカウントでできること
            </p>

            <div className="mt-4 grid gap-3">
              {[
                "診断結果をいつでも確認",
                "プランの進捗を管理",
                "過去の診断結果と変化を比較",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[12px] font-bold text-black/55"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
                    <CheckIcon />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-7 text-center text-[12px] text-black/50">
            すでにアカウントをお持ちですか？
            <Link
              href="/login"
              className="ml-1 font-black text-[#1677FF]"
            >
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}