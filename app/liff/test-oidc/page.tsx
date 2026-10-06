"use client";

import {
  useEffect,
  useState,
} from "react";
import liff from "@line/liff";

import {
  createClient,
} from "../../../lib/supabase/client";

type TestStatus =
  | "initializing"
  | "ready"
  | "testing"
  | "success"
  | "error";

type SafeTokenInfo = {
  issuer: string | null;
  audience: string | null;
  subjectMasked: string | null;
  hasNonce: boolean;
};

function maskSubject(
  subject: string | undefined,
) {
  if (!subject) {
    return null;
  }

  if (subject.length <= 12) {
    return subject;
  }

  return `${subject.slice(
    0,
    6,
  )}...${subject.slice(-6)}`;
}

export default function LiffOidcTestPage() {
  const [
    status,
    setStatus,
  ] =
    useState<TestStatus>(
      "initializing",
    );

  const [
    message,
    setMessage,
  ] =
    useState(
      "LIFFを初期化しています...",
    );

  const [
    tokenInfo,
    setTokenInfo,
  ] =
    useState<SafeTokenInfo | null>(
      null,
    );

  const [
    beforeUserId,
    setBeforeUserId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    afterUserId,
    setAfterUserId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    provider,
    setProvider,
  ] =
    useState<string | null>(
      null,
    );

  useEffect(() => {
    async function initialize() {
      try {
        const liffId =
          process.env
            .NEXT_PUBLIC_LINE_LIFF_ID;

        if (!liffId) {
          throw new Error(
            "LIFF IDが設定されていません。",
          );
        }

        await liff.init({
          liffId,
        });

        /*
         * 今回は「LINEアプリ内で
         * LINE Login画面を出さずに
         * Supabase Authへ接続できるか」
         * を確認する検証なので、
         * 外部ブラウザでは実行しない。
         */
        if (!liff.isInClient()) {
          throw new Error(
            "この検証はLINEアプリ内のLIFFブラウザから実行してください。",
          );
        }

        if (!liff.isLoggedIn()) {
          throw new Error(
            "LIFFのLINEログイン状態を確認できませんでした。",
          );
        }

        const idToken =
          liff.getIDToken();

        const decoded =
          liff.getDecodedIDToken();

        if (
          !idToken ||
          !decoded
        ) {
          throw new Error(
            "LINE ID Tokenを取得できませんでした。LIFFのopenidスコープを確認してください。",
          );
        }

        /*
         * 生のID Tokenは画面やログへ出さない。
         * 検証に必要な安全な情報だけ表示する。
         */
        setTokenInfo({
          issuer:
            typeof decoded.iss ===
            "string"
              ? decoded.iss
              : null,

          audience:
            typeof decoded.aud ===
            "string"
              ? decoded.aud
              : null,

          subjectMasked:
            typeof decoded.sub ===
            "string"
              ? maskSubject(
                  decoded.sub,
                )
              : null,

          hasNonce:
            typeof decoded.nonce ===
              "string" &&
            decoded.nonce.length >
              0,
        });

        const supabase =
          createClient();

        const {
          data: {
            user,
          },
        } =
          await supabase.auth.getUser();

        setBeforeUserId(
          user?.id ?? null,
        );

        setMessage(
          "準備できました。「OIDC接続をテスト」を押してSupabase Authとの橋渡しを確認します。",
        );

        setStatus(
          "ready",
        );
      } catch (error) {
        console.error(
          "LIFF OIDC test initialization error:",
          error,
        );

        setMessage(
          error instanceof Error
            ? error.message
            : "LIFFの初期化に失敗しました。",
        );

        setStatus(
          "error",
        );
      }
    }

    void initialize();
  }, []);

  async function runOidcTest() {
    if (
      status !==
      "ready"
    ) {
      return;
    }

    setStatus(
      "testing",
    );

    setMessage(
      "LINE ID Tokenを使ってSupabase Authへ接続しています...",
    );

    try {
      const idToken =
        liff.getIDToken();

      const accessToken =
        liff.getAccessToken();

      if (!idToken) {
        throw new Error(
          "LINE ID Tokenを取得できませんでした。",
        );
      }

      const supabase =
        createClient();

      const {
        data,
        error,
      } =
        await supabase.auth.signInWithIdToken(
          {
            provider:
              "custom:line-oidc",

            token:
              idToken,

            ...(accessToken
              ? {
                  access_token:
                    accessToken,
                }
              : {}),
          },
        );

      if (error) {
        throw error;
      }

      const user =
        data.user;

      if (!user) {
        throw new Error(
          "Supabaseユーザーを取得できませんでした。",
        );
      }

      setAfterUserId(
        user.id,
      );

      setProvider(
        typeof user
          .app_metadata
          ?.provider ===
          "string"
          ? user
              .app_metadata
              .provider
          : null,
      );

      setMessage(
        "成功しました。LIFFのLINE ID TokenだけでSupabase Authセッションを作成できました。",
      );

      setStatus(
        "success",
      );
    } catch (error) {
      console.error(
        "LIFF OIDC sign-in test error:",
        error,
      );

      setMessage(
        error instanceof Error
          ? `接続に失敗しました: ${error.message}`
          : "Supabase Authへの接続に失敗しました。",
      );

      setStatus(
        "error",
      );
    }
  }

  return (
    <main className="min-h-screen bg-white px-5 py-10 text-[#111111]">
      <div className="mx-auto w-full max-w-[520px]">
        <p className="text-[12px] font-bold tracking-[0.12em] text-[#1677FF]">
          INTERNAL TEST
        </p>

        <h1 className="mt-2 text-[28px] font-black tracking-[-0.04em]">
          LIFF →
          Supabase OIDC検証
        </h1>

        <p className="mt-4 text-[14px] leading-7 text-black/60">
          {message}
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-[13px] leading-6">
          <div>
            <span className="font-bold">
              LINE issuer：
            </span>
            {tokenInfo?.issuer ??
              "-"}
          </div>

          <div>
            <span className="font-bold">
              LINE audience：
            </span>
            {tokenInfo?.audience ??
              "-"}
          </div>

          <div>
            <span className="font-bold">
              LINE sub：
            </span>
            {tokenInfo
              ?.subjectMasked ??
              "-"}
          </div>

          <div>
            <span className="font-bold">
              nonce：
            </span>
            {tokenInfo
              ? tokenInfo.hasNonce
                ? "あり"
                : "なし"
              : "-"}
          </div>

          <div>
            <span className="font-bold">
              テスト前Supabase user_id：
            </span>
            {beforeUserId ??
              "未ログイン"}
          </div>

          <div>
            <span className="font-bold">
              テスト後Supabase user_id：
            </span>
            {afterUserId ??
              "-"}
          </div>

          <div>
            <span className="font-bold">
              Supabase provider：
            </span>
            {provider ??
              "-"}
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            void runOidcTest()
          }
          disabled={
            status !==
            "ready"
          }
          className="mt-6 min-h-12 w-full rounded-full bg-[#1677FF] px-5 py-3 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status ===
          "testing"
            ? "接続確認中..."
            : "OIDC接続をテスト"}
        </button>

{status === "success" && (
  <a
    href="/dashboard"
    className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full border border-[#1677FF] px-5 py-3 text-[15px] font-bold text-[#1677FF]"
  >
    ダッシュボードを開く
  </a>
)}


        <p className="mt-5 text-[12px] leading-6 text-black/45">
          このページは認証方式の検証専用です。
          既存の /liff や
          /login
          の処理は変更していません。
        </p>
      </div>
    </main>
  );
}