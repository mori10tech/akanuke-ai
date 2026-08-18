"use client";

import { useEffect, useRef } from "react";

type AdSenseAdProps = {
  className?: string;
  format?: "horizontal" | "rectangle";
  slot?: string;
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? "";

const HORIZONTAL_SLOT =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL?.trim() ?? "";

const RECTANGLE_SLOT =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE?.trim() ?? "";

function isValidClient(value: string) {
  return /^ca-pub-\d{16}$/.test(value);
}

function isValidSlot(value: string) {
  return /^\d+$/.test(value);
}

function DevelopmentPlaceholder({
  format,
}: {
  format: "horizontal" | "rectangle";
}) {
  return (
    <div
      className={`flex items-center justify-center bg-[#F7F9FC] px-4 text-center ${
        format === "rectangle" ? "min-h-[250px]" : "min-h-[118px]"
      }`}
    >
      <div>
        <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
          GOOGLE ADSENSE
        </p>

        <p className="mt-2 text-[11px] leading-5 text-black/45">
          環境変数を設定すると、ここに広告が表示されます。
        </p>
      </div>
    </div>
  );
}

export default function AdSenseAd({
  className = "",
  format = "horizontal",
  slot,
}: AdSenseAdProps) {
  const hasRequestedAd = useRef(false);
  const resolvedSlot =
    slot?.trim() ||
    (format === "rectangle" ? RECTANGLE_SLOT : HORIZONTAL_SLOT);

  const isConfigured =
    isValidClient(ADSENSE_CLIENT) && isValidSlot(resolvedSlot);

  const canRequestAd =
    process.env.NODE_ENV === "production" && isConfigured;

  useEffect(() => {
    if (!canRequestAd || hasRequestedAd.current) {
      return;
    }

    hasRequestedAd.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.warn("[AKANUKE.AI] AdSense広告を読み込めませんでした:", error);
    }
  }, [canRequestAd]);

  if (!isConfigured && process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <aside
      aria-label="スポンサーリンク"
      className={`overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] ${className}`}
    >
      <div className="border-b border-black/5 px-4 py-2.5">
        <p className="text-center text-[9px] font-bold tracking-[0.08em] text-black/35">
          スポンサーリンク
        </p>
      </div>

      {canRequestAd ? (
        <ins
          className="adsbygoogle block"
          style={{
            display: "block",
            minHeight: format === "rectangle" ? 250 : 100,
          }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={resolvedSlot}
          data-ad-format={format === "rectangle" ? "rectangle" : "auto"}
          data-full-width-responsive="true"
        />
      ) : (
        <DevelopmentPlaceholder format={format} />
      )}
    </aside>
  );
}
