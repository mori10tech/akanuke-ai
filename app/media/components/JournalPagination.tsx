import Link from "next/link";

type JournalPaginationProps = {
  currentPage: number;
  totalPages: number;
  category: string | null;
};

const baseClassName =
  "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full px-4 text-[12px] font-bold";

const inactiveClassName =
  "border border-black/10 bg-[#F8FAFC] text-black/75 transition hover:border-[#1677FF]/30 hover:text-[#1677FF]";

function getPageHref(page: number, category: string | null) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/media?${query}` : "/media";
}

export default function JournalPagination({
  currentPage,
  totalPages,
  category,
}: JournalPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="記事一覧のページ送り" className="mt-10 sm:mt-12">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {hasPrev ? (
          <Link
            href={getPageHref(currentPage - 1, category)}
            rel="prev"
            className={`${baseClassName} ${inactiveClassName}`}
          >
            前へ
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`${baseClassName} border border-black/10 bg-[#F8FAFC] text-black/30`}
          >
            前へ
          </span>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={getPageHref(page, category)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`${page}ページ目`}
            className={`${baseClassName} ${page === currentPage ? "bg-[#1677FF] text-white" : inactiveClassName}`}
          >
            {page}
          </Link>
        ))}

        {hasNext ? (
          <Link
            href={getPageHref(currentPage + 1, category)}
            rel="next"
            className={`${baseClassName} ${inactiveClassName}`}
          >
            次へ
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`${baseClassName} border border-black/10 bg-[#F8FAFC] text-black/30`}
          >
            次へ
          </span>
        )}
      </div>
    </nav>
  );
}
