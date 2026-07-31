"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  icon: "result" | "plan" | "salon" | "product" | "account";
};

const items: NavItem[] = [
  {
    name: "診断結果",
    href: "/result",
    icon: "result",
  },
  {
    name: "4週間プラン",
    href: "/preview",
    icon: "plan",
  },
  {
    name: "サロン",
    href: "/salon",
    icon: "salon",
  },
  {
    name: "商品",
    href: "/products",
    icon: "product",
  },
  {
    name: "マイページ",
    href: "/",
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
        <path d="M9.5 7.5h.01" />
        <path d="M14.5 7.5h.01" />
      </svg>
    );
  }

  if (type === "plan") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }

  if (type === "salon") {
    return (
      <svg {...commonProps}>
        <path d="M6 21v-7" />
        <path d="M18 21v-7" />
        <path d="M4 21h16" />
        <path d="M8 14V8a4 4 0 0 1 8 0v6" />
        <path d="M9 7h6" />
        <path d="M8 11h8" />
      </svg>
    );
  }

  if (type === "product") {
    return (
      <svg
        {...commonProps}
        fill={active ? "currentColor" : "none"}
      >
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#dedede] bg-white/95 pb-[max(7px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-[480px] grid-cols-5 px-1">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1.5 transition active:scale-95 ${
                active
                  ? "font-black text-black"
                  : "font-bold text-neutral-500 hover:text-black"
              }`}
            >
              <NavIcon type={item.icon} active={active} />

              <span className="max-w-full truncate text-[9px]">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}