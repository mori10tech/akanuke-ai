import Link from "next/link";

import Logo from "../../components/Logo";

export default function JournalFooter() {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-5 px-5 text-center sm:flex-row sm:text-left">
        <div className="shrink-0">
  <Logo href="/" />
</div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] font-medium text-black/65">
          <Link
            href="/"
            className="transition hover:text-[#1677FF]"
          >
            トップページ
          </Link>

          <Link
            href="/media"
            scroll={true}
            className="transition hover:text-[#1677FF]"
          >
            記事一覧
          </Link>

          <Link
            href="/terms"
            className="transition hover:text-[#1677FF]"
          >
            利用規約
          </Link>

          <Link
  href="/privacy"
  className="transition hover:text-[#1677FF]"
>
  個人情報の取扱い
</Link>

          <Link
  href="/contact"
  className="transition hover:text-[#1677FF]"
>
  お問い合わせ
</Link>

          <a
            href="https://www.raygence.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#1677FF]"
          >
            運営会社
          </a>
        </div>

        <p className="text-[10px] text-black/55">
          © AKANUKE.AI All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}