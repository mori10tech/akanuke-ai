export default function HistoryLoading() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
          <div className="h-11 w-11" />

          <div className="mx-auto h-5 w-28 animate-pulse rounded-full bg-black/10" />

          <div />
        </div>
      </header>

      <div className="mx-auto w-full max-w-[480px] px-4 pb-12 pt-6">
        <div className="h-3 w-32 animate-pulse rounded-full bg-[#1677FF]/15" />

        <div className="mt-3 h-8 w-28 animate-pulse rounded-[8px] bg-black/10" />

        <div className="mt-3 h-4 w-48 animate-pulse rounded-full bg-black/5" />

        <div className="mt-6 h-[52px] w-full animate-pulse rounded-[13px] bg-[#FFD400]/35" />

        <div className="mt-6 space-y-4">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-black/5 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
            >
              <div className="flex gap-4">
                <div className="aspect-[3/4] w-[92px] shrink-0 animate-pulse rounded-[16px] bg-[#EEF6FF]" />

                <div className="flex-1">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-black/10" />

                  <div className="mt-3 h-8 w-16 animate-pulse rounded-[8px] bg-black/10" />

                  <div className="mt-5 h-3 w-16 animate-pulse rounded-full bg-[#1677FF]/15" />

                  <div className="mt-2 h-4 w-full animate-pulse rounded-full bg-black/10" />
                </div>
              </div>

              <div className="mt-5 h-10 w-full animate-pulse rounded-[12px] bg-black/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}