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
     * GA4送信後、
     * login_complete=1 をURLから削除する。
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