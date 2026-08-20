"use client";

type SharePriority = {
  rank: number;
  title: string;
};

type ShareResultButtonProps = {
  progress: number;
  targetImpression: string;
  priorities: SharePriority[];
};

const SHARE_URL =
  "https://akanukeai.com/";

const X_WEB_SHARE_URL =
  "https://x.com/intent/post";

export default function ShareResultButton({
  progress,
}: ShareResultButtonProps) {
  function handleXShare() {
    const shareText =
      `AKANUKE AIで、\n` +
      `今の印象を診断してもらった！\n\n` +
      `理想のイメージへの到達度は：${progress}%\n` +
      `あなたは何％か試してみよう！\n` +
      `${SHARE_URL}\n\n` +
      `#AKANUKEAI #AI垢抜け診断 #メンズ美容`;

    const webShareUrl =
      new URL(X_WEB_SHARE_URL);

    webShareUrl.searchParams.set(
      "text",
      shareText,
    );

    const isIPhoneOrIPad =
      /iPhone|iPad|iPod/i.test(
        window.navigator.userAgent,
      );

    /*
     * PC・Androidでは、従来どおり
     * XのWeb投稿画面を開きます。
     */
    if (!isIPhoneOrIPad) {
      window.location.assign(
        webShareUrl.toString(),
      );

      return;
    }

    /*
     * iPhoneでは最初にXアプリを開きます。
     * アプリを開けなかった場合は、
     * Web版Xの投稿画面へ切り替えます。
     */
    let appOpened = false;

    const detectAppOpen = () => {
      if (
        document.visibilityState ===
        "hidden"
      ) {
        appOpened = true;
      }
    };

    document.addEventListener(
      "visibilitychange",
      detectAppOpen,
      {
        once: true,
      },
    );

    window.addEventListener(
      "pagehide",
      () => {
        appOpened = true;
      },
      {
        once: true,
      },
    );

    const appShareUrl =
      `twitter://post?message=${encodeURIComponent(
        shareText,
      )}`;

    window.location.href =
      appShareUrl;

    window.setTimeout(() => {
      if (!appOpened) {
        window.location.assign(
          webShareUrl.toString(),
        );
      }
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleXShare}
      className="flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-[#111111] px-5 text-[13px] font-black text-white transition hover:opacity-90 active:scale-[0.99]"
    >
      Ｘで診断結果をシェア
    </button>
  );
}