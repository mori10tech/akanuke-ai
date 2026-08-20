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

    const xShareUrl =
      new URL(
        "https://x.com/intent/post",
      );

    xShareUrl.searchParams.set(
      "text",
      shareText,
    );

    window.location.assign(
      xShareUrl.toString(),
    );
  }

  return (
    <button
      type="button"
      onClick={handleXShare}
      className="flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-[#111111] px-5 text-[13px] font-black text-white transition hover:opacity-90 active:scale-[0.99]"
    >
      診断結果をXでシェア
    </button>
  );
}