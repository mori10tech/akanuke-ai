import Image from "next/image";

const analysisItems = [
  {
    label: "HAIR STYLE",
    score: 82,
    note: "清潔感のある爽やかなスタイルが似合います",
    icon: "/icons/analysis-hair.png",
  },
  {
    label: "EYEBROW",
    score: 78,
    note: "眉の形を整えると印象がさらにUP",
    icon: "/icons/analysis-eyebrow.png",
  },
  {
    label: "SKIN",
    score: 76,
    note: "保湿ケアで肌の透明感を引き出せます",
    icon: "/icons/analysis-skin.png",
  },
  {
    label: "OVERALL IMPRESSION",
    score: 86,
    note: "爽やかで誠実な印象をさらに洗練",
    icon: "/icons/analysis-impression.png",
  },
];

export default function OgpPreviewPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDEDED] p-8">
      <div className="relative h-[630px] w-[1200px] overflow-hidden bg-white">
       
{/* Background */}
<div className="absolute inset-0 bg-gradient-to-r from-white via-[#F7FBFF] to-[#EAF4FF]" />

        {/* Logo */}
        <div className="absolute left-[52px] top-[48px] z-30">
          <Image
            src="/akanuke-ai-horizontal-logo-v2.png"
            alt="AKANUKE.AI"
            width={320}
            height={59}
            priority
            className="h-auto w-[320px]"
          />

          <p className="mt-[5px] ml-[2px] text-[13px] font-black tracking-[0.22em] text-[#1677FF]">
            MEN&apos;S AI BEAUTY
          </p>
        </div>

        {/* Main copy */}
        <div className="absolute left-[50px] top-[168px] z-30 w-[470px]">
          <h1 className="text-[73px] font-semibold leading-[1.32] tracking-[-0.065em] text-[#111111]">
            第一印象は、
            <br />
            変えられる。
          </h1>

          <p className="mt-[28px] text-[30px] font-bold leading-[1.5] tracking-[-0.035em] text-[#111111]">
            AIが、あなただけの
            <br />
            垢抜けプランを作成。
          </p>

        </div>

        {/* Person glow */}
        <div className="absolute bottom-[-80px] left-[390px] z-0 h-[620px] w-[460px] rounded-full bg-white/70 blur-[52px]" />

{/* Person */}
<div className="absolute bottom-[-6px] right-[160px] z-10 h-[790px] w-[720px] pointer-events-none">
  <Image
    src="/lp/hero-person-v6.png"
    alt=""
    fill
    priority
    sizes="720px"
    className="object-contain object-bottom scale-[0.76] origin-bottom"
  />
</div>


        {/* Analysis Card */}
<div className="absolute right-[50px] top-[60px] z-30 w-[320px] rounded-[20px] border border-[#1677FF]/[0.16] bg-white/[0.98] px-[20px] py-[30px] shadow-[0_26px_68px_rgba(22,119,255,0.14),0_6px_20px_rgba(17,17,17,0.05)] backdrop-blur-[18px]">  <div>
    <p className="text-[14px] font-extrabold leading-none text-[#1677FF]">
      AI ANALYSIS
    </p>

    <p className="mt-[5px] text-[9px] font-bold text-black/40">
      BEAUTY DIAGNOSIS
    </p>
  </div>

  <div className="mt-[8px]">
    {analysisItems.map((item, index) => {
      const isBrow = item.label === "EYEBROW";

      return (
        <div
          key={item.label}
          className={`grid grid-cols-[68px_minmax(0,1fr)] items-center gap-[6px] py-[8px] ${
            index !== analysisItems.length - 1
              ? "border-b border-black/10"
              : ""
          }`}
        >
          <div className="flex h-[64px] w-[68px] shrink-0 items-center justify-center">
            <Image
              src={item.icon}
              alt=""
              width={isBrow ? 48 : 64}
              height={isBrow ? 48 : 64}
              className={
                isBrow
                  ? "h-[48px] w-[48px] object-contain"
                  : "h-[64px] w-[64px] object-contain"
              }
            />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-extrabold leading-[1.3] tracking-[0.03em] text-[#1677FF]">
              {item.label}
            </p>

            <p className="mt-[4px] text-[27px] font-extrabold leading-none text-[#1677FF]">
              {item.score}
              <span className="ml-[4px] text-[9px] font-bold">
                /100
              </span>
            </p>

            <p className="mt-[7px] text-[9px] font-medium leading-[1.6] text-black/[0.68]">
              {item.note}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>
      </div>
    </main>
  );
}