type DummyAdProps = {
  className?: string;
  format?: "horizontal" | "rectangle";
};

function AdIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
  );
}

export default function DummyAd({
  className = "",
  format = "horizontal",
}: DummyAdProps) {
  const isRectangle = format === "rectangle";

  return (
    <aside
      aria-label="ダミー広告"
      className={`overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-2.5">
        <p className="text-[9px] font-bold tracking-[0.08em] text-black/35">
          スポンサーリンク
        </p>

        <span className="rounded-full border border-black/10 px-2 py-0.5 text-[8px] font-bold text-black/35">
          AD
        </span>
      </div>

      <div
        className={`flex items-center gap-4 p-4 sm:p-5 ${
          isRectangle
            ? "min-h-[250px] flex-col justify-center text-center"
            : "min-h-[118px]"
        }`}
      >
        <div
          className={`flex shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#EEF6FF] to-[#FFF9D9] text-[#1677FF] ${
            isRectangle ? "h-20 w-20" : "h-[76px] w-[76px]"
          }`}
        >
          <AdIcon />
        </div>

        <div
          className={
            isRectangle ? "max-w-[320px]" : "min-w-0 flex-1"
          }
        >
          <p className="text-[9px] font-black tracking-[0.12em] text-black/30">
            DUMMY ADVERTISEMENT
          </p>

          <p className="mt-1.5 text-[14px] font-black leading-5 tracking-[-0.02em] sm:text-[15px]">
            ここにGoogle広告が表示されます
          </p>

          <p className="mt-1.5 text-[10px] leading-5 text-black/45">
            本番ではGoogle AdSenseのレスポンシブ広告へ置き換えます。
          </p>
        </div>
      </div>
    </aside>
  );
}