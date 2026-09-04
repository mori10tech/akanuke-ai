import { createClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DebugUserPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-white px-5 py-10 text-[#111111]">
      <div className="mx-auto w-full max-w-[480px]">
        <p className="text-[11px] font-black tracking-[0.12em] text-[#1677FF]">
          DEBUG
        </p>

        <h1 className="mt-2 text-[24px] font-black">
          ログインユーザー確認
        </h1>

        <div className="mt-6 rounded-[18px] border border-black/10 bg-[#F7F9FC] p-5">
          {error ? (
            <>
              <p className="text-[12px] font-black text-red-500">
                ユーザー情報の取得に失敗しました
              </p>

              <p className="mt-3 break-all text-[11px] leading-6 text-black/50">
                {error.message}
              </p>
            </>
          ) : user ? (
            <>
              <p className="text-[11px] font-bold text-black/45">
                Supabase User ID
              </p>

              <p className="mt-2 break-all text-[14px] font-black leading-6">
                {user.id}
              </p>

              <div className="my-5 h-px bg-black/10" />

              <p className="text-[11px] font-bold text-black/45">
                Provider
              </p>

              <p className="mt-2 text-[14px] font-black">
                {user.app_metadata.provider ?? "不明"}
              </p>

              <div className="my-5 h-px bg-black/10" />

              <p className="text-[11px] font-bold text-black/45">
                LINE Provider ID
              </p>

              <p className="mt-2 break-all text-[14px] font-black leading-6">
                {user.identities?.[0]?.identity_data?.sub ??
                  user.identities?.[0]?.id ??
                  "取得できませんでした"}
              </p>
            </>
          ) : (
            <>
              <p className="text-[14px] font-black">
                ログインしていません
              </p>

              <p className="mt-2 text-[11px] leading-6 text-black/45">
                このブラウザにはSupabaseのログインセッションがありません。
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}