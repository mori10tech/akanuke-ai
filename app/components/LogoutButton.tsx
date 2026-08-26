export default function LogoutButton() {
  return (
    <form
      action="/auth/signout"
      method="post"
      className="mt-6"
    >
      <button
        type="submit"
        className="flex min-h-[48px] w-full items-center justify-center rounded-[12px] border border-black/10 bg-[#F7F9FC] text-[12px] font-black text-black/55 shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition duration-150 hover:bg-[#EEF6FF] active:scale-[0.97] active:bg-[#E9EEF5] active:text-black/75 active:shadow-none"
      >
        ログアウト
      </button>
    </form>
  );
}