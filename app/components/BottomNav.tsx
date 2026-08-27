"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  icon:
    | "result"
    | "plan"
    | "product"
    | "account";
};

const items: NavItem[] = [
  {
    name: "診断結果",
    href: "/result",
    icon: "result",
  },
  {
    name: "垢抜けプラン",
    href: "/plan",
    icon: "plan",
  },
  {
    name: "商品",
    href: "/products",
    icon: "product",
  },
  {
    name: "マイページ",
    href: "/dashboard",
    icon: "account",
  },
];

function NavIcon({
  type,
  active,
}: {
  type: NavItem["icon"];
  active: boolean;
}) {
  const commonProps = {
    viewBox: "0 0 24 24",
    className: "h-[22px] w-[22px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "result") {
    return (
      <svg {...commonProps}>
        <path d="M8 20h8" />
        <path d="M12 16v4" />
        <circle cx="12" cy="9" r="6" />
        <path d="M9 10.5c.7.8 1.7 1.2 3 1.2s2.3-.4 3-1.2" />
      </svg>
    );
  }

  if (type === "plan") {
    return (
      <svg {...commonProps}>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3"
        />
        <path d="m8 10 2 2 5-5" />
        <path d="M8 16h8" />
      </svg>
    );
  }

  if (type === "product") {
    return (
      <svg
        {...commonProps}
        fill={
          active
            ? "currentColor"
            : "none"
        }
      >
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle
        cx="12"
        cy="8"
        r="4"
      />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname =
    usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#dedede] bg-white pb-[max(7px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_18px_rgba(15,23,42,0.04)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-[100px] bg-white"
      />

      <div className="relative mx-auto grid w-full max-w-[480px] grid-cols-4 px-1">
        {items.map(
          (item) => {
            const active =
              pathname ===
              item.href;

            return (
              <Link
                key={
                  item.name
                }
                href={
                  item.href
                }
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1.5 transition duration-150 active:scale-[0.95] ${
                  active
                    ? "font-black text-[#1677FF]"
                    : "font-bold text-neutral-500 hover:text-black"
                }`}
              >
                <NavIcon
                  type={
                    item.icon
                  }
                  active={
                    active
                  }
                />

                <span className="max-w-full truncate text-[9px]">
                  {
                    item.name
                  }
                </span>
              </Link>
            );
          },
        )}
      </div>
    </nav>
  );
}