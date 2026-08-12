"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AppHeader from "../components/AppHeader";
import { createClient } from "../../lib/supabase/client";

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

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMessage(
        "メールアドレスとパスワードを入力してください。",
      );
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        setErrorMessage(
          "メールアドレスまたはパスワードが正しくありません。",
        );
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        "ログイン処理中にエラーが発生しました。時間をおいてもう一度お試しください。",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] border-x border-black/5 bg-white">
        <AppHeader
          backHref="/"
          backLabel="トップページへ戻る"
        />

        <div className="px-5 pb-12 pt-10">
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#EEF6FF] text-[25px] text-[#1677FF] shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
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

          <form
            onSubmit={handleLogin}
            className="mt-8 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]"
          >
            <div>
              <label
                htmlFor="login-email"
                className="text-[12px] font-black text-black/55"
              >
                メールアドレス
              </label>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 transition focus-within:border-[#1677FF]/30 focus-within:bg-white">
                <span className="text-black/35">
                  <MailIcon />
                </span>

                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@akanuke.ai"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-black/20"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="text-[12px] font-black text-black/55"
                >
                  パスワード
                </label>

                <span className="text-[10px] font-black text-black/30">
                  パスワードを忘れた方
                </span>
              </div>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 transition focus-within:border-[#1677FF]/30 focus-within:bg-white">
                <span className="text-black/35">
                  <LockIcon />
                </span>

                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="パスワードを入力"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-black/20"
                />
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mt-5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3"
              >
                <p className="text-[11px] font-bold leading-5 text-red-600">
                  {errorMessage}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex min-h-[54px] w-full items-center justify-center rounded-[12px] bg-[#111111] px-5 text-[14px] font-black text-white shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLoading ? "ログイン中..." : "ログイン"}

              {!isLoading && (
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-black/10" />

            <span className="text-[10px] font-bold text-black/35">
              初めてご利用の方
            </span>

            <span className="h-px flex-1 bg-black/10" />
          </div>

          <Link
            href="/signup"
            className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[12px] border border-[#1677FF]/15 bg-white px-5 text-[13px] font-black text-[#1677FF] transition hover:bg-[#EEF6FF] active:scale-[0.99]"
          >
            無料アカウントを作成
          </Link>

          <Link
            href="/upload"
            className="mt-5 block text-center text-[11px] font-bold text-black/50"
          >
            登録せずに診断を試す
          </Link>
        </div>
      </div>
    </main>
  );
}