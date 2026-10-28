"use client";

import { useSyncExternalStore } from "react";

import AdSenseAd from "../../components/AdSenseAd";

const DESKTOP_QUERY = "(min-width: 768px)";

type JournalResponsiveAdProps = {
  device: "mobile" | "desktop";
  className?: string;
};

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);

  mediaQuery.addEventListener("change", onChange);

  return () => {
    mediaQuery.removeEventListener("change", onChange);
  };
}

function getSnapshot(): "mobile" | "desktop" {
  return window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile";
}

function getServerSnapshot() {
  return null;
}

// 画面幅に合う側だけ AdSenseAd を描画する。
// CSS で隠すのではなく描画しないため、対象外の広告枠にはリクエストが送られない
export default function JournalResponsiveAd({
  device,
  className,
}: JournalResponsiveAdProps) {
  const currentDevice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (currentDevice !== device) {
    return null;
  }

  // グリッド内に空のセルを残さないよう、ラッパーごと出し分ける
  return (
    <div className="min-w-0 md:col-span-2">
      <AdSenseAd className={className} />
    </div>
  );
}
