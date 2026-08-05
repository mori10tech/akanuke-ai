import Link from "next/link";

type LogoProps = {
  href?: string;
};

export default function Logo({
  href = "/",
}: LogoProps) {
  return (
    <Link href={href} className="leading-none">
      <span className="block text-[18px] font-black tracking-[0.14em]">
        AKANUKE.AI
      </span>

      <span className="mt-1 block text-[8px] font-bold tracking-[0.28em] text-[#1677FF]">
        MEN&apos;S AI BEAUTY
      </span>
    </Link>
  );
}