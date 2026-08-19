"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

function subscribeStandalone(
  callback: () => void,
) {
  const mediaQuery = window.matchMedia(
    "(display-mode: standalone)",
  );

  mediaQuery.addEventListener("change", callback);
  window.addEventListener("appinstalled", callback);

  return () => {
    mediaQuery.removeEventListener(
      "change",
      callback,
    );
    window.removeEventListener(
      "appinstalled",
      callback,
    );
  };
}

function getStandaloneSnapshot() {
  const navigatorWithStandalone =
    navigator as NavigatorWithStandalone;

  return (
    window.matchMedia(
      "(display-mode: standalone)",
    ).matches ||
    navigatorWithStandalone.standalone === true
  );
}

function getServerStandaloneSnapshot() {
  return false;
}

function subscribeEnvironment() {
  return () => {};
}

function getIsIosSnapshot() {
  const isAppleMobile =
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isIpadDesktopMode =
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1;

  return isAppleMobile || isIpadDesktopMode;
}

function getServerIsIosSnapshot() {
  return false;
}

function AddIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="3"
      />
      <path d="M12 8v6" />
      <path d="M9 11h6" />
      <path d="M10 18h4" />
    </svg>
  );
}

export default function InstallAppCard() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      null,
    );

  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandaloneSnapshot,
    getServerStandaloneSnapshot,
  );

  const isIos = useSyncExternalStore(
    subscribeEnvironment,
    getIsIosSnapshot,
    getServerIsIosSnapshot,
  );

  useEffect(() => {
    function handleBeforeInstallPrompt(
      event: Event,
    ) {
      event.preventDefault();

      setInstallPrompt(
        event as BeforeInstallPromptEvent,
      );
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
    }

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled,
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled,
      );
    };
  }, []);

  async function handleInstall() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();

    const choice =
      await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
    }
  }

  if (isStandalone) {
    return null;
  }

  return (
    <section className="rounded-[22px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5 shadow-[0_8px_26px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
            ADD TO HOME SCREEN
          </p>

          <h2 className="mt-2 text-[20px] font-black tracking-[-0.03em] text-[#111111]">
            ホーム画面に追加
          </h2>
        </div>

        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
          <AddIcon />
        </span>
      </div>

      <p className="mt-4 text-[12px] leading-6 text-black/55">
        AKANUKE.AIをホーム画面に追加すると、
        アプリのようにすぐ起動できます。
      </p>

      {installPrompt ? (
        <button
          type="button"
          onClick={handleInstall}
          className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] transition hover:-translate-y-0.5 active:scale-[0.99]"
        >
          ホーム画面に追加する
          <span className="ml-3">→</span>
        </button>
      ) : isIos ? (
        <div className="mt-5 rounded-[14px] bg-white px-4 py-4">
          <p className="text-[12px] font-black text-[#111111]">
            iPhoneでの追加方法
          </p>

          <ol className="mt-3 space-y-2 text-[11px] leading-5 text-black/55">
            <li>1. Safari下部の共有ボタンを押す</li>
            <li>2.「ホーム画面に追加」を選ぶ</li>
            <li>3. 右上の「追加」を押す</li>
          </ol>
        </div>
      ) : (
        <div className="mt-5 rounded-[14px] bg-white px-4 py-4">
          <p className="text-[11px] leading-5 text-black/55">
            ブラウザのメニューから
            「ホーム画面に追加」または
            「アプリをインストール」を選んでください。
          </p>
        </div>
      )}
    </section>
  );
}