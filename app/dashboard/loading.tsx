export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#EEF6FF] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-white shadow-[0_0_40px_rgba(15,23,42,0.08)]">
        <header className="h-[68px] border-b border-black/10 bg-white" />

        <div className="px-4 pb-28 pt-6">
          <div className="animate-pulse">
            <div className="h-[168px] rounded-[24px] bg-[#EEF6FF]" />

            <div className="mt-7">
              <div className="h-3 w-14 rounded-full bg-black/10" />
              <div className="mt-2 h-5 w-24 rounded-full bg-black/10" />

              <div className="mt-3 h-[230px] rounded-[20px] bg-[#F7F9FC]" />
            </div>

            <div className="mt-7 h-[280px] rounded-[24px] bg-[#F7F9FC]" />
          </div>
        </div>
      </div>
    </main>
  );
}