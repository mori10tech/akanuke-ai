"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import {
  trackEvent,
} from "../../lib/analytics";

export default function LoginAnalyticsTracker() {
  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const trackedRef =
    useRef(false);

  useEffect(() => {
    if (
      trackedRef.current ||
      searchParams.get(
        "login_complete",
      ) !== "1"
    ) {
      return;
    }

    trackedRef.current =
      true;

    trackEvent(
      "line_login_complete",
      {
        destination_path:
          pathname,
      },
    );

    /*
     * LIFFログインで新規ユーザーが作成された場合のみ、
     * GA4推奨イベントのsign_upを送信する。
     */
    if (
      searchParams.get(
        "signup",
      ) === "1"
    ) {
      trackEvent(
        "sign_up",
        {
          method:
            "line",
          destination_path:
            pathname,
          /*
           * 初回訪問時の流入元（lib/acquisition.ts）
           * LINEアプリ内ブラウザに切り替わると
           * GA4の流入元が引き継がれないため、別途付ける
           */
          acquisition_source:
            searchParams.get(
              "signup_src",
            ) ?? undefined,
          acquisition_medium:
            searchParams.get(
              "signup_med",
            ) ?? undefined,
        },
      );
    }

    /*
     * GA4送信後、
     * login_complete=1 と signup=1 をURLから削除する。
     *
     * router.replace()を使わず
     * History APIだけでURLを書き換えることで、
     * ページ再読み込みや不要なServer Componentの
     * 再取得を発生させない。
     */
    const url =
      new URL(
        window.location.href,
      );

    url.searchParams.delete(
      "login_complete",
    );

    url.searchParams.delete(
      "signup",
    );

    url.searchParams.delete(
      "signup_src",
    );

    url.searchParams.delete(
      "signup_med",
    );

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [
    pathname,
    searchParams,
  ]);

  return null;
}