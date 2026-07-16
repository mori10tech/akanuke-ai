"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "結果", href: "/result", icon: "📊" },
  { name: "プラン", href: "/plan", icon: "📅" },
  { name: "サロン", href: "/salon", icon: "✂️" },
  { name: "商品", href: "/products", icon: "🛍️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="mx-auto flex max-w-md justify-around py-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-sm ${
              pathname === item.href
                ? "text-blue-600 font-bold"
                : "text-gray-400"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}