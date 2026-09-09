import Link from "next/link";

type JournalRelatedArticleLinkProps = {
  href: string;
  title: string;
  description?: string;
};

export default function JournalRelatedArticleLink({
  href,
  title,
  description,
}: JournalRelatedArticleLinkProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[148px] flex-col rounded-[18px] border border-[#1677FF]/20 bg-[#F7FBFF] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1677FF]/35 hover:bg-[#EEF6FF] hover:shadow-[0_10px_28px_rgba(22,119,255,0.10)] active:scale-[0.99]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-black tracking-[0.08em] text-[#1677FF]">
          RELATED ARTICLE
        </p>

        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1677FF] text-[15px] font-black text-white transition-transform duration-200 group-hover:translate-x-1"
        >
          <span className="-translate-y-px">
            →
          </span>
        </span>
      </div>

      <p className="mt-4 text-[15px] font-black leading-6 text-[#111111]">
        {title}
      </p>

      {description && (
        <p className="mt-2 text-[11px] font-medium leading-5 text-black/60">
          {description}
        </p>
      )}

      <p className="mt-auto pt-4 text-[11px] font-black text-[#1677FF]">
        記事を読む
      </p>
    </Link>
  );
}