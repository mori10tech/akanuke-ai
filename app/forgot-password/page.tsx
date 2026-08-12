"use client";

import Link from "next/link";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage(
        "メールアドレスを入力してください。",
      );
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const origin =
        window.location.origin;

      const redirectTo =
        `${origin}/auth/callback?next=/reset-password`;

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          normalizedEmail,
          {
            redirectTo,
          },
        );

      if (error) {
        console.error(
          "Password reset email error:",
          error,
        );

        setErrorMessage(
          "再設定メールを送信できませんでした。時間をおいてもう一度お試しください。",
        );
        return;
      }

      setSuccessMessage(
        "パスワード再設定メールを送信しました。メール内のリンクから新しいパスワードを設定してください。",
      );
    } catch (error) {
      console.error(
        "Password reset error:",
        error,
      );

      setErrorMessage(
        "処理中にエラーが発生しました。時間をおいてもう一度お試しください。",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] border-x border-black/5 bg-white">
        <AppHeader
          backHref="/login"
          backLabel="ログインへ戻る"
        />

        <div className="px-5 pb-12 pt-10">
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#EEF6FF] text-[25px] text-[#1677FF] shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
              ✦
            </span>

            <p className="mt-6 text-[11px] font-black tracking-[0.16em] text-[#1677FF]">
              PASSWORD RESET
            </p>

            <h1 className="mt-3 text-[28px] font-black tracking-[-0.04em]">
              パスワードを再設定
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-black/55">
              登録したメールアドレスへ、
              <br />
              パスワード再設定用のリンクを送ります。
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]"
          >
            <div>
              <label
                htmlFor="forgot-email"
                className="text-[12px] font-black text-black/55"
              >
                メールアドレス
              </label>

              <div className="mt-2 flex min-h-[54px] items-center gap-3 rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 transition focus-within:border-[#1677FF]/30 focus-within:bg-white">
                <span className="text-black/35">
                  <MailIcon />
                </span>

                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="example@akanuke.ai"
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

            {successMessage && (
              <div
                role="status"
                className="mt-5 rounded-[12px] border border-[#1677FF]/10 bg-[#EEF6FF] px-4 py-3"
              >
                <p className="text-[11px] font-bold leading-5 text-[#1677FF]">
                  {successMessage}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={
                isLoading ||
                Boolean(successMessage)
              }
              className="mt-6 flex min-h-[54px] w-full items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[14px] font-black text-[#111111] shadow-[0_10px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLoading
                ? "送信中..."
                : successMessage
                  ? "再設定メールを送信しました"
                  : "再設定メールを送信"}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-6 flex min-h-[48px] items-center justify-center text-[12px] font-black text-[#1677FF]"
          >
            ログイン画面へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}