"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const inquiryTypes = [
  "サービスの使い方について",
  "AI診断について",
  "Afterイメージについて",
  "ログイン・LINE連携について",
  "アカウント・データについて",
  "不具合について",
  "その他",
];

export default function ContactPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const contactFormEnabled =
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactFormEnabled || isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          category: formData.get("category"),
          message: formData.get("message"),
          privacyConsent: formData.get("privacyConsent") === "on",
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(
          data.message ??
            "お問い合わせの送信に失敗しました。",
        );
      }

      form.reset();

      setIsSuccess(true);
      setStatusMessage(
        data.message ?? "お問い合わせを送信しました。",
      );
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "お問い合わせの送信に失敗しました。時間をおいてもう一度お試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="border-b border-black/10">
        <div className="mx-auto flex h-[68px] w-full max-w-[760px] items-center px-5 sm:px-8">
          <Link
            href="/"
            className="text-[18px] font-black tracking-[-0.03em] text-[#111111] transition-opacity hover:opacity-70"
          >
            AKANUKE.AI
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <section className="border-b border-black/10 pb-10">
          <p className="text-[11px] font-black tracking-[0.18em] text-[#1677FF]">
            CONTACT
          </p>

          <h1 className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#111111]">
            お問い合わせ
          </h1>

          <p className="mt-3 text-[12px] font-bold leading-6 text-black/60">
            AKANUKE.AIに関するご質問や不具合などは、
            以下のフォームからお問い合わせください。
          </p>
        </section>

        <form
          className="mt-10 rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)] sm:p-6"
          onSubmit={handleSubmit}
        >
<div
  aria-hidden="true"
  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
>
  <label htmlFor="website">
    Website
  </label>

  <input
    id="website"
    name="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
  />
</div>

          <div>
            <label
              htmlFor="name"
              className="text-[12px] font-black text-[#111111]"
            >
              お名前
              <span className="ml-1 text-[#1677FF]">
                *
              </span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="例：山田 太郎"
              className="mt-2 h-[50px] w-full rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 text-[14px] font-bold text-[#111111] outline-none transition placeholder:text-black/30 focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-[12px] font-black text-[#111111]"
            >
              メールアドレス
              <span className="ml-1 text-[#1677FF]">
                *
              </span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="example@email.com"
              className="mt-2 h-[50px] w-full rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 text-[14px] font-bold text-[#111111] outline-none transition placeholder:text-black/30 focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="category"
              className="text-[12px] font-black text-[#111111]"
            >
              お問い合わせ種別
              <span className="ml-1 text-[#1677FF]">
                *
              </span>
            </label>

            <div className="relative mt-2">
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="h-[50px] w-full appearance-none rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 pr-12 text-[14px] font-bold text-[#111111] invalid:text-black/45 outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
              >
                <option
  value=""
  disabled
  className="text-black/45"
>
  選択してください
</option>

                {inquiryTypes.map((inquiryType) => (
  <option
    key={inquiryType}
    value={inquiryType}
    className="font-bold text-[#111111]"
  >
    {inquiryType}
  </option>
))}
              </select>

              <span
  aria-hidden="true"
  className="pointer-events-none absolute right-5 top-1/2 h-2 w-2 -translate-y-[65%] rotate-45 border-b-[1.5px] border-r-[1.5px] border-black"
/>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="text-[12px] font-black text-[#111111]"
            >
              お問い合わせ内容
              <span className="ml-1 text-[#1677FF]">
                *
              </span>
            </label>

            <textarea
              id="message"
              name="message"
              required
              maxLength={3000}
              rows={7}
              placeholder="お問い合わせ内容をご入力ください"
              className="mt-2 w-full resize-none rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 py-3 text-[14px] font-bold leading-6 text-[#111111] outline-none transition placeholder:text-black/30 focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#F7F9FC] p-4">
            <input
              type="checkbox"
              name="privacyConsent"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#1677FF]"
            />

            <span className="text-[11px] font-bold leading-5 text-black/65">
              個人情報の取扱いについて確認し、
              お問い合わせ対応のために入力した情報が
              利用されることに同意します。
            </span>
          </label>

          {isSuccess ? (
  <div className="mt-6 rounded-[18px] border border-[#1677FF]/15 bg-[#F3F8FF] px-5 py-6 text-center">
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1677FF] text-[18px] font-black text-white">
      ✓
    </div>

    <p className="mt-3 text-[15px] font-black text-[#111111]">
      お問い合わせを送信しました
    </p>

    <p className="mt-2 text-[11px] font-bold leading-5 text-black/55">
      内容を確認のうえ、担当者よりご連絡いたします。
    </p>
  </div>
) : (
  <>
    <button
      type="submit"
      disabled={!contactFormEnabled || isSubmitting}
      className={`mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-[#1677FF] px-5 text-[13px] font-black text-white transition ${
        !contactFormEnabled || isSubmitting
          ? "cursor-not-allowed opacity-45"
          : "active:scale-[0.99]"
      }`}
    >
      {isSubmitting ? "送信中..." : "送信する"}
    </button>

    {statusMessage ? (
      <p className="mt-3 text-center text-[11px] font-bold leading-5 text-red-600">
        {statusMessage}
      </p>
    ) : !contactFormEnabled ? (
      <p className="mt-3 text-center text-[10px] font-bold leading-4 text-black/50">
        メール送信機能は現在準備中です。
      </p>
    ) : null}
  </>
)}

        </form>

        <section className="mt-5 rounded-[20px] border border-black/[0.07] bg-white p-5">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
            EMAIL
          </p>

          <h2 className="mt-1 text-[15px] font-black text-[#111111]">
            メールでのお問い合わせ
          </h2>

          <p className="mt-2 text-[11px] font-bold leading-5 text-black/60">
            お急ぎの場合やフォームを利用できない場合は、
            以下のメールアドレスからお問い合わせいただけます。
          </p>

          <a
            href="mailto:info@akanukeai.com"
            className="mt-4 flex min-h-[48px] items-center justify-center rounded-[14px] bg-[#EEF6FF] px-4 text-[13px] font-black text-[#1677FF] transition active:scale-[0.98]"
          >
            info@akanukeai.com
          </a>
        </section>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1677FF] transition-opacity hover:opacity-70"
          >
            <span aria-hidden="true">←</span>
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}