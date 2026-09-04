"use client";

import {
  useEffect,
} from "react";

export default function AuthHistoryGuard() {
  useEffect(() => {
    function handlePageShow(
      event: PageTransitionEvent,
    ) {
      /*
       * Safari / Chromeなどで、
       * ログアウト前の保護ページがBFCacheから
       * 復元された場合はサーバーへ再アクセスします。
       *
       * これによりproxy.tsで現在の認証状態が
       * 再確認されます。
       */
      if (event.persisted) {
        window.location.reload();
      }
    }

    window.addEventListener(
      "pageshow",
      handlePageShow,
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow,
      );
    };
  }, []);

  return null;
}