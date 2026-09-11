import Image from "next/image";

const analysisItems = [
  {
    label: "HAIR STYLE",
    score: 82,
    note: "清潔感のある爽やかな\nスタイルが似合います",
    icon: "/icons/analysis-hair.png",
  },
  {
    label: "EYEBROW",
    score: 78,
    note: "眉の形を整えると\n印象がさらにUP",
    icon: "/icons/analysis-eyebrow.png",
  },
  {
    label: "SKIN",
    score: 76,
    note: "保湿ケアで肌の透明感を\n引き出せます",
    icon: "/icons/analysis-skin.png",
  },
  {
    label: "OVERALL IMPRESSION",
    score: 86,
    note: "爽やかで誠実な印象を\nさらに洗練",
    icon: "/icons/analysis-impression.png",
  },
];

export default function OgpCardPreviewPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDEDED] p-8">
      <div className="relative h-[285px] w-[380px] overflow-hidden bg-white">
        {/* Background */}
        <div className="absolute inset-0 bg-[#F3F8FF]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_42%,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.88)_32%,rgba(239,247,255,0.72)_68%,rgba(226,239,255,0.82)_100%)]" />

        {/* Logo */}
        <div className="absolute left-[11px] top-[15px] z-30">
          <Image
            src="/akanuke-ai-horizontal-logo-v2.png"
            alt="AKANUKE.AI"
            width={150}
            height={26}
            priority
            className="h-auto w-[150px]"
          />

          <p className="ml-[1px] mt-[2px] text-[8px] font-black tracking-[0.18em] text-[#1677FF]">
            MEN&apos;S AI BEAUTY
          </p>
        </div>

        {/* Main Copy */}
        <div className="absolute left-[11px] top-[68px] z-30 w-[300px]">
          <h1 className="whitespace-nowrap text-[28px] font-semibold leading-[1.28] tracking-[-0.06em] text-[#111111]">
            第一印象は、
            <br />
            変えられる。
          </h1>

          <p className="mt-[5px] text-[12px] font-bold leading-[1.45] tracking-[-0.03em] text-[#111111]">
            AIが、あなただけの
            <br />
            垢抜けプランを作成。
          </p>
        </div>

        {/* Person */}
<div className="pointer-events-none absolute bottom-[8px] right-[60px] z-10 h-[230px] w-[200px]">
  <Image
    src="/lp/hero-person-v6.png"
    alt=""
    fill
    priority
    sizes="205px"
    className="object-contain object-bottom"
  />

  {/* 人物下部を背景になじませるフェード */}
  <div className="absolute inset-x-0 bottom-0 z-10 h-[20px] bg-gradient-to-b from-[#F3F8FF]/0 via-[#F3F8FF]/60 to-[#F3F8FF]" />
</div>

        {/* Analysis Card */}
        <div className="absolute right-[8px] top-[50px] z-30 w-[240px] scale-[0.45] origin-top-right rounded-[20px] border border-[#1677FF]/[0.16] bg-white/[0.98] px-[20px] py-[30px] shadow-[0_26px_68px_rgba(22,119,255,0.14),0_6px_20px_rgba(17,17,17,0.05)] backdrop-blur-[18px]">
          <div>
            <p className="text-[14px] font-extrabold leading-none text-[#1677FF]">
              AI ANALYSIS
            </p>

            <p className="mt-[5px] text-[9px] font-bold text-black/40">
              BEAUTY DIAGNOSIS
            </p>
          </div>

          <div className="mt-[8px]">
            {analysisItems.map((item, index) => {
              const isBrow =
                item.label === "EYEBROW";

              return (
                <div
                  key={item.label}
                  className={`grid grid-cols-[68px_minmax(0,1fr)] items-center gap-[6px] py-[8px] ${
                    index !==
                    analysisItems.length - 1
                      ? "border-b border-black/10"
                      : ""
                  }`}
                >
                  <div className="flex h-[64px] w-[68px] shrink-0 items-center justify-center">
                    <Image
                      src={item.icon}
                      alt=""
                      width={
                        isBrow ? 48 : 64
                      }
                      height={
                        isBrow ? 48 : 64
                      }
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

                    <p className="mt-[7px] whitespace-pre-line text-[9px] font-medium leading-[1.6] text-black/[0.68]">
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