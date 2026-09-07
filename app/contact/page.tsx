"use client";

import AppHeader from "../components/AppHeader";
import AppShell from "../components/AppShell";

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
  return (
    <AppShell background="gray">
      <AppHeader
        backHref="/"
        backLabel="トップページへ戻る"
      />

      <main className="px-4 pb-12 pt-6">
        <section>
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            CONTACT
          </p>

          <h1 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#111111]">
            お問い合わせ
          </h1>

          <p className="mt-3 text-[12px] leading-5 text-black/55">
            AKANUKE.AIに関するご質問や不具合などは、
            以下のフォームからお問い合わせください。
          </p>
        </section>

        <form
          className="mt-6 rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
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
              className="mt-2 h-[50px] w-full rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 text-[14px] text-[#111111] outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
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
              className="mt-2 h-[50px] w-full rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 text-[14px] text-[#111111] outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
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

            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="mt-2 h-[50px] w-full appearance-none rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 text-[14px] text-[#111111] outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
            >
              <option value="" disabled>
                選択してください
              </option>

              {inquiryTypes.map(
                (inquiryType) => (
                  <option
                    key={inquiryType}
                    value={inquiryType}
                  >
                    {inquiryType}
                  </option>
                ),
              )}
            </select>
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
              className="mt-2 w-full resize-none rounded-[14px] border border-black/10 bg-[#F7F9FC] px-4 py-3 text-[14px] leading-6 text-[#111111] outline-none transition focus:border-[#1677FF] focus:bg-white focus:ring-2 focus:ring-[#1677FF]/10"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#F7F9FC] p-4">
            <input
              type="checkbox"
              name="privacyConsent"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#1677FF]"
            />

            <span className="text-[11px] leading-5 text-black/60">
              個人情報の取扱いについて確認し、
              お問い合わせ対応のために入力した情報が
              利用されることに同意します。
            </span>
          </label>

          <button
            type="submit"
            disabled
            className="mt-6 flex min-h-[52px] w-full cursor-not-allowed items-center justify-center rounded-[14px] bg-[#1677FF] px-5 text-[13px] font-black text-white opacity-45"
          >
            送信する
          </button>

          <p className="mt-3 text-center text-[10px] leading-4 text-black/45">
            メール送信機能は現在準備中です。
          </p>
        </form>

        <section className="mt-5 rounded-[20px] border border-black/10 bg-white p-5">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
            EMAIL
          </p>

          <h2 className="mt-1 text-[15px] font-black text-[#111111]">
            メールでのお問い合わせ
          </h2>

          <p className="mt-2 text-[11px] leading-5 text-black/55">
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
      </main>
    </AppShell>
  );
}