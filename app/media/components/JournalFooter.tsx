import Link from "next/link";

export default function JournalFooter() {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-5 px-5 text-center sm:flex-row sm:text-left">
        <Link href="/" className="shrink-0">
          <p className="text-[14px] font-black tracking-[0.14em] text-[#111111]">
            AKANUKE.AI
          </p>

          <p className="mt-1 text-[8px] font-bold tracking-[0.24em] text-[#1677FF]">
            MEN&apos;S AI BEAUTY
          </p>
        </Link>

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

          <a
            href="https://www.leafworks.jp/doc/privacy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#1677FF]"
          >
            個人情報保護方針
          </a>

          <a
            href="https://www.leafworks.jp/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#1677FF]"
          >
            お問い合わせ
          </a>

          <a
            href="https://www.leafworks.jp/"
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