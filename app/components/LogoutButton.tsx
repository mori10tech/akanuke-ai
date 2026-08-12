export default function LogoutButton() {
  return (
    <form
      action="/auth/signout"
      method="post"
      className="mt-6"
    >
      <button
        type="submit"
        className="flex min-h-[48px] w-full items-center justify-center rounded-[12px] border border-black/10 bg-[#F7F9FC] text-[12px] font-black text-black/55 transition hover:bg-[#EEF6FF] active:scale-[0.99]"
      >
        ログアウト
      </button>
    </form>
  );
}