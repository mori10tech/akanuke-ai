"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/*
 * トップページのスマホ・タブレット用メニュー（lg 未満で表示）
 * PC のヘッダーナビと同じ「サービスについて／FAQ／AKANUKE JOURNAL」を開閉式で表示する
 */
const MENU_ITEMS = [
  { label: "サービスについて", href: "#features", isPage: false },
  { label: "FAQ", href: "#faq", isPage: false },
  { label: "AKANUKE JOURNAL", href: "/media", isPage: true },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="grid h-10 w-9 shrink-0 place-items-center rounded-[10px] text-[#111111] transition hover:bg-black/5"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {isOpen ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <nav
          id="mobile-menu-panel"
          className="absolute inset-x-0 top-full border-b border-black/10 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
        >
          <ul className="site-container py-2">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.href}
                className="border-b border-black/5 last:border-b-0"
              >
                {item.isPage ? (
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-[52px] items-center justify-between text-[14px] font-semibold text-[#111111] transition hover:text-[#1677FF]"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-black/40">
                      ›
                    </span>
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex min-h-[52px] items-center justify-between text-[14px] font-semibold text-[#111111] transition hover:text-[#1677FF]"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-black/40">
                      ›
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
