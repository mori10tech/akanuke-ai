export default function LatestReportLoading() {
  return (
    <section className="mt-7 rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="h-2.5 w-24 rounded-full bg-black/10" />

            <div className="mt-3 h-5 w-36 rounded-full bg-black/10" />
          </div>

          <div className="h-6 w-14 rounded-full bg-[#EEF6FF]" />
        </div>

        <div className="mt-5 h-[126px] rounded-[20px] bg-[#EEF6FF]" />

        <div className="mt-5">
          <div className="h-3 w-20 rounded-full bg-black/10" />

          <div className="mt-4 space-y-3">
            <div className="h-10 rounded-[12px] bg-[#F7F9FC]" />
            <div className="h-10 rounded-[12px] bg-[#F7F9FC]" />
            <div className="h-10 rounded-[12px] bg-[#F7F9FC]" />
          </div>
        </div>
      </div>
    </section>
  );
}