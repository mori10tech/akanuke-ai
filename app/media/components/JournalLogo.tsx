"use client";

import Link from "next/link";

/*
 * AKANUKE JOURNAL のヘッダー用ロゴ
 * JOURNAL 内にいることを示し、JOURNAL トップ（/media）へ戻る導線にする
 * 「AKANUKE JOURNAL」を1行で表示する（文字色は黒）
 * JOURNAL トップ表示中に押した場合は、AKANUKE.AI の Logo と同じくページ上部へスクロールする
 * （カテゴリ・ページ番号の指定がある場合は、通常どおり /media へ移動する）
 */
export default function JournalLogo() {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      window.location.pathname === "/media" &&
      window.location.search === ""
    ) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link
      href="/media"
      onClick={handleClick}
      aria-label="AKANUKE JOURNAL トップへ"
      className="whitespace-nowrap text-[13px] text-[#111111] font-black leading-none tracking-[0.05em] sm:text-[18px] sm:tracking-[0.12em]"
    >
      AKANUKE JOURNAL
    </Link>
  );
}
