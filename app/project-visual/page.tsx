import Image from "next/image";

const analysisItems = [
  {
    label: "HAIR STYLE",
    score: 82,
    icon: "/icons/analysis-hair.png",
  },
  {
    label: "EYEBROW",
    score: 78,
    icon: "/icons/analysis-eyebrow.png",
  },
  {
    label: "SKIN",
    score: 76,
    icon: "/icons/analysis-skin.png",
  },
  {
    label: "IMPRESSION",
    score: 86,
    icon: "/icons/analysis-impression.png",
  },
];

export default function ProjectVisualPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#ECECEC] p-8">
      <div className="relative h-[285px] w-[380px] overflow-hidden rounded-[12px] bg-white">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FBFF] to-[#E9F3FF]" />

        {/* AI blue glow */}
        <div className="absolute -right-[155px] -top-[125px] h-[280px] w-[280px] rounded-full bg-[#1677FF]/[0.10]" />

        <div className="absolute -bottom-[130px] -left-[100px] h-[235px] w-[235px] rounded-full bg-[#1677FF]/[0.07]" />

        {/* Logo */}
        <div className="absolute left-[18px] top-[17px] z-30">
          <Image
            src="/akanuke-ai-horizontal-logo-v2.png"
            alt="AKANUKE.AI"
            width={220}
            height={52}
            priority
            className="h-auto w-[220px]"
          />
        </div>

        {/* Soft light behind model */}
        <div className="absolute bottom-[-55px] left-[52px] z-0 h-[270px] w-[230px] rounded-full bg-white/80 blur-[26px]" />

        {/* Person */}
        <div className="absolute bottom-[-11px] left-[47px] z-10 h-[247px] w-[210px]">
          <Image
            src="/lp/hero-person-v6.png"
            alt=""
            fill
            priority
            sizes="210px"
            className="object-contain object-bottom"
          />
        </div>

        {/* Analysis panel */}
<div className="absolute right-[10px] top-[60px] z-30 w-[145px] overflow-hidden rounded-[19px] border border-white/90 bg-white/[0.94] px-[12px] py-[13px] shadow-[0_16px_40px_rgba(22,119,255,0.14)] backdrop-blur-xl">
  {/* Panel header */}
  <div className="mb-[7px]">
    <p className="text-[10px] font-black tracking-[0.04em] text-[#1677FF]">
      AI ANALYSIS
    </p>

    <p className="mt-[2px] text-[5px] font-bold tracking-[0.08em] text-black/35">
      BEAUTY DIAGNOSIS
    </p>
  </div>

  {/* Analysis scores */}
  <div>
    {analysisItems.map((item, index) => (
      <div
        key={item.label}
        className={`grid grid-cols-[30px_minmax(0,1fr)] items-center gap-[5px] py-[6px] ${
          index !== analysisItems.length - 1
            ? "border-b border-black/[0.07]"
            : ""
        }`}
      >
        <div className="flex h-[27px] w-[27px] items-center justify-center">
          <Image
            src={item.icon}
            alt=""
            width={27}
            height={27}
            className="h-[27px] w-[27px] object-contain"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[6px] font-black leading-none tracking-[0.06em] text-[#1677FF]">
            {item.label}
          </p>

          <div className="mt-[3px] flex items-end gap-[1px]">
            <span className="text-[16px] font-black leading-none tracking-[-0.01em] text-[#1677FF]">
              {item.score}
            </span>

            <span className="pb-[1px] text-[5px] font-black text-[#1677FF]">
              /100
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 right-0 z-0 h-[75px] w-[185px] bg-gradient-to-tl from-[#1677FF]/[0.05] to-transparent" />
      </div>
    </main>
  );
}