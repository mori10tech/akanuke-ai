import Link from "next/link";

/*
 * AKANUKE JOURNAL のヘッダー用ロゴ
 * JOURNAL 内にいることを示し、JOURNAL トップ（/media）へ戻る導線にする
 * 「AKANUKE JOURNAL」を1行で表示する（文字色は黒）
 */
export default function JournalLogo() {
  return (
    <Link
      href="/media"
      aria-label="AKANUKE JOURNAL トップへ"
      className="whitespace-nowrap text-[13px] text-[#111111] font-black leading-none tracking-[0.05em] sm:text-[18px] sm:tracking-[0.12em]"
    >
      AKANUKE JOURNAL
    </Link>
  );
}
