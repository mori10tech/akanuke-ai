type AppLogoProps = {
  className?: string;
};

export default function AppLogo({
  className = "",
}: AppLogoProps) {
  return (
    <div
      aria-label="AKANUKE.AI"
      className={`select-none whitespace-nowrap text-center text-[20px] font-black leading-none tracking-[-0.035em] text-[#111111] ${className}`}
    >
      AKANUKE.AI
    </div>
  );
}
