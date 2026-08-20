"use client";

import {
  useState,
} from "react";

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
  "https://akanukeai.com";

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const characters =
    Array.from(text);

  let line = "";
  let currentY = y;

  characters.forEach((character) => {
    const testLine =
      `${line}${character}`;

    if (
      context.measureText(testLine)
        .width > maxWidth &&
      line
    ) {
      context.fillText(
        line,
        x,
        currentY,
      );

      line = character;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    context.fillText(
      line,
      x,
      currentY,
    );
  }
}

async function createShareImage({
  progress,
  targetImpression,
  priorities,
}: ShareResultButtonProps) {
  const canvas =
    document.createElement("canvas");

  canvas.width = 1200;
  canvas.height = 675;

  const context =
    canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "シェア画像を作成できませんでした。",
    );
  }

  context.fillStyle = "#FFFFFF";
  context.fillRect(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  context.fillStyle = "#EEF6FF";
  context.beginPath();
  context.roundRect(
    54,
    48,
    1092,
    579,
    38,
  );
  context.fill();

  context.fillStyle = "#1677FF";
  context.font =
    "900 22px sans-serif";
  context.fillText(
    "AKANUKE.AI",
    96,
    104,
  );

    context.fillStyle = "#111111";
  context.font =
    "900 38px sans-serif";

  context.fillText(
    "AI垢抜け診断",
    96,
    162,
  );

  context.fillText(
    "結果レポート",
    96,
    210,
  );

  context.fillStyle = "#1677FF";
  context.font =
    "900 112px sans-serif";
  context.fillText(
    `${progress}%`,
    96,
    350,
  );

  context.fillStyle = "#111111";
  context.font =
    "900 24px sans-serif";
  context.fillText(
    "理想イメージへの到達度",
    100,
    425,
  );

  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.roundRect(
    485,
    98,
    601,
    450,
    28,
  );
  context.fill();

  context.fillStyle = "#1677FF";
  context.font =
    "900 18px sans-serif";
  context.fillText(
    "目指す印象",
    530,
    150,
  );

  context.fillStyle = "#111111";
  context.font =
    "900 29px sans-serif";

  drawWrappedText(
    context,
    targetImpression,
    530,
    196,
    500,
    40,
  );

  context.fillStyle = "#1677FF";
  context.font =
    "900 18px sans-serif";
  context.fillText(
    "改善優先順位",
    530,
    290,
  );

  priorities
    .slice(0, 3)
    .forEach((priority, index) => {
      const y =
        342 + index * 58;

      context.fillStyle = "#FFD400";
      context.beginPath();
      context.arc(
        548,
        y - 8,
        18,
        0,
        Math.PI * 2,
      );
      context.fill();

      context.fillStyle = "#111111";
      context.font =
        "900 16px sans-serif";
      context.textAlign = "center";
      context.fillText(
        String(priority.rank),
        548,
        y - 2,
      );

      context.textAlign = "left";
      context.font =
        "900 21px sans-serif";
      context.fillText(
        priority.title,
        582,
        y,
      );
    });

  context.fillStyle = "#111111";
  context.font =
    "700 18px sans-serif";
  context.fillText(
    "akanukeai.com",
    96,
    573,
  );

  return new Promise<Blob>(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
            return;
          }

          reject(
            new Error(
              "シェア画像を作成できませんでした。",
            ),
          );
        },
        "image/png",
      );
    },
  );
}

export default function ShareResultButton(
  props: ShareResultButtonProps,
) {
  const [
    isSharing,
    setIsSharing,
  ] = useState(false);

  const [
    shareMessage,
    setShareMessage,
  ] = useState("");

  async function handleShare() {
    if (isSharing) {
      return;
    }

    setIsSharing(true);
    setShareMessage("");

    try {
      const blob =
        await createShareImage(props);

      const file = new File(
        [blob],
        "akanuke-ai-result.png",
        {
          type: "image/png",
        },
      );

         const shareText =
        `AKANUKE AIに今の印象を診断してもらいました。\n\n` +
        `目指すのは「${props.targetImpression}」\n` +
        `理想イメージへの到達度：${props.progress}%\n\n` +
        `あなたなら何％？\n` +
        `${SHARE_URL}\n\n` +
        `#AKANUKEAI #AI垢抜け診断`;

            const isMobileDevice =
        /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent,
        );

      if (
        isMobileDevice &&
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        await navigator.share({
          text: shareText,
          files: [file],
        });

        return;
      }

      const imageUrl =
        URL.createObjectURL(blob);

      const downloadLink =
        document.createElement("a");

      downloadLink.href = imageUrl;
      downloadLink.download =
        "akanuke-ai-result.png";

      downloadLink.click();

      URL.revokeObjectURL(
        imageUrl,
      );

      const xShareUrl =
        new URL(
          "https://x.com/intent/post",
        );

      xShareUrl.searchParams.set(
        "text",
        shareText,
      );

      window.open(
        xShareUrl.toString(),
        "_blank",
        "noopener,noreferrer",
      );

      setShareMessage(
        "シェア画像を保存しました。Xの投稿画面で画像を添付してください。",
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "Result share error:",
        error,
      );

      setShareMessage(
        "シェアを開始できませんでした。もう一度お試しください。",
      );
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleShare}
        disabled={isSharing}
        className="flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-[#111111] px-5 text-[13px] font-black text-white transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSharing
          ? "シェア画像を作成中…"
          : "診断結果をXでシェア"}
      </button>

      {shareMessage ? (
        <p
          role="status"
          className="mt-3 text-center text-[10px] font-bold leading-5 text-black/50"
        >
          {shareMessage}
        </p>
      ) : null}
    </div>
  );
}