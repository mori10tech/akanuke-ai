import { createClient } from "../../../lib/supabase/server";
import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import DeleteAccountForm from "./DeleteAccountForm";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
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

const deletedItems = [
  "会員アカウント",
  "ログイン情報とセッション",
  "診断履歴",
  "After画像",
  "ユーザーに紐づく設定情報",
];

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const lineName =
    typeof user?.user_metadata?.name === "string"
      ? user.user_metadata.name
      : typeof user?.user_metadata?.display_name === "string"
        ? user.user_metadata.display_name
        : typeof user?.user_metadata?.line_name === "string"
          ? user.user_metadata.line_name
          : "LINEユーザー";

  return (
    <AppShell background="gray">
      <AppHeader
        backHref="/dashboard"
        backLabel="マイページへ戻る"
      />

      <div className="px-4 pb-10 pt-6">
        <section>
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            ACCOUNT SETTINGS
          </p>

          <h1 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-[#111111]">
            アカウント設定
          </h1>

          <p className="mt-3 text-[12px] leading-5 text-black/55">
            アカウント情報と退会手続きを管理します。
          </p>
        </section>

        <section className="mt-6 rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
            ACCOUNT INFORMATION
          </p>

          <h2 className="mt-1 text-[17px] font-black tracking-[-0.03em] text-[#111111]">
            登録情報
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-4 rounded-[14px] bg-[#F7F9FC] px-4 py-3">
              <p className="text-[11px] font-bold text-black/45">
                ログイン方法
              </p>

              <p className="text-[12px] font-black text-[#111111]">
                LINE
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-[14px] bg-[#F7F9FC] px-4 py-3">
              <p className="text-[11px] font-bold text-black/45">
                LINE表示名
              </p>

              <p className="min-w-0 truncate text-[12px] font-black text-[#111111]">
                {lineName}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            DELETE ACCOUNT
          </p>

          <h2 className="mt-1 text-[22px] font-black tracking-[-0.04em] text-[#111111]">
            アカウント削除
          </h2>
        </section>     

        <section className="mt-5 rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
            DELETE DATA
          </p>

          <h2 className="mt-1 text-[17px] font-black tracking-[-0.03em] text-[#111111]">
            削除される情報
          </h2>

          <div className="mt-4 space-y-3">
            {deletedItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                  <CheckIcon />
                </span>

                <p className="text-[11px] font-bold leading-5 text-[#111111]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[16px] bg-[#F7F9FC] p-4">
            <p className="text-[10px] leading-5 text-black/50">
              同じLINEアカウントで再登録できますが、削除したデータは引き継がれません。
            </p>
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
            DELETE ACCOUNT
          </p>

          <h2 className="mt-1 text-[17px] font-black tracking-[-0.03em] text-[#111111]">
            退会手続き
          </h2>

          <p className="mt-2 text-[11px] leading-5 text-black/50">
            内容をご確認のうえ、アカウント削除の手続きを進めてください。
          </p>

          <DeleteAccountForm />
        </section>
      </div>
    </AppShell>
  );
}