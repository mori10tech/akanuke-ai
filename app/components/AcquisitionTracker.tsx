"use client";

import {
  useEffect,
} from "react";

import {
  appendAcquisitionToUrl,
  captureFirstTouch,
  isLiffUrl,
} from "../../lib/acquisition";

/*
 * 流入元の記録（lib/acquisition.ts）
 *
 * - 初回訪問時に流入元をブラウザへ保存する
 * - サイト内のLIFF URLへのリンク（診断ボタンなど）が押されたときに、
 *   遷移の直前でリンク先に流入元のパラメータを付ける
 *
 * リンクの見た目・遷移先・押したときの動作は変えない。
 */
export default function AcquisitionTracker() {
  useEffect(() => {
    captureFirstTouch();

    function handleClick(
      event: MouseEvent,
    ) {
      const target =
        event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor =
        target.closest("a");

      if (
        !anchor ||
        !anchor.href ||
        !isLiffUrl(anchor.href)
      ) {
        return;
      }

      const nextHref =
        appendAcquisitionToUrl(
          anchor.href,
        );

      if (nextHref !== anchor.href) {
        anchor.href = nextHref;
      }
    }

    /*
     * キャプチャ段階で受け取り、
     * ブラウザが遷移する前にリンク先を書き換える
     */
    document.addEventListener(
      "click",
      handleClick,
      true,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick,
        true,
      );
    };
  }, []);

  return null;
}
