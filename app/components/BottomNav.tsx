"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconProps = {
  className?: string;
};

function ResultIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" />
      <path d="M8.5 3.5 10 5" />
      <path d="m15.5 3.5-1.5 1.5" />
    </svg>
  );
}

function HistoryIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="4" width="14" height="16" rx="2.5" />
      <path d="M8 8h8" />
      <path d="M8 12h5" />
      <path d="m8 16 1.5 1.5L13 14" />
    </svg>
  );
}

function SalonIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="7" r="3" />
      <circle cx="6" cy="17" r="3" />

      <path d="M8.7 8.3 19 3" />
      <path d="M8.7 15.7 19 21" />

      <path d="M8.7 8.3 12 12" />
      <path d="M8.7 15.7 12 12" />
    </svg>
  );
}

function ProductIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

const navigationItems = [
  {
    name: "診断結果",
    href: "/result",
    icon: ResultIcon,
  },
  {
    name: "垢抜けプラン",
    href: "/history",
    icon: HistoryIcon,
  },
  {
    name: "サロン",
    href: "/salon",
    icon: SalonIcon,
  },
  {
    name: "商品",
    href: "/products",
    icon: ProductIcon,
  },
  {
    name: "マイページ",
    href: "/dashboard",
    icon: UserIcon,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="メインナビゲーション"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
    >
      <div className="mx-auto grid w-full max-w-[480px] grid-cols-5 px-2">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-[10px] px-1 py-1.5 transition ${
                isActive
                  ? "text-[#111111]"
                  : "text-black/40 hover:text-[#1677FF]"
              }`}
            >
              <Icon className="h-[21px] w-[21px]" />

              <span
                className={`max-w-full truncate text-[8px] leading-none ${
                  isActive ? "font-black" : "font-bold"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}