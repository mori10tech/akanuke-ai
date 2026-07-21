"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "診断結果",
    href: "/result",
    icon: "📊",
  },
  {
    name: "4週間",
    href: "/preview",
    icon: "✨",
  },
  {
    name: "美容院",
    href: "/salon",
    icon: "✂️",
  },
  {
    name: "商品",
    href: "/products",
    icon: "🛍️",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-md justify-around py-3">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center transition-all duration-200 ${
                active
                  ? "scale-105 font-semibold text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="mb-1 text-xl">{item.icon}</span>
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}