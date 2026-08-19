"use client";

import {
  FormEvent,
  useState,
} from "react";

type DeleteAccountResponse = {
  success?: boolean;
  message?: string;
};

export default function DeleteAccountForm() {
  const [password, setPassword] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isDeleting, setIsDeleting] =
    useState(false);

  const canDelete =
    password.length > 0 &&
    !isDeleting;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!canDelete) {
      return;
    }

    const isConfirmed =
      window.confirm(
        "アカウントを完全に削除します。この操作は取り消せません。本当に削除しますか？",
      );

    if (!isConfirmed) {
      return;
    }

    setErrorMessage("");
    setIsDeleting(true);

    try {
      const response = await fetch(
        "/api/account/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        },
      );

      const result =
        (await response.json()) as DeleteAccountResponse;

      if (
        !response.ok ||
        !result.success
      ) {
        setErrorMessage(
          result.message ??
            "アカウントを削除できませんでした。",
        );

        return;
      }

      /*
       * 削除後は履歴を残さず、
       * トップページへ移動します。
       */
      window.location.replace(
        "/?accountDeleted=1",
      );
    } catch {
      setErrorMessage(
        "通信に失敗しました。インターネット接続を確認して、もう一度お試しください。",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5"
    >
      <div>
        <label
          htmlFor="delete-account-password"
          className="block text-[12px] font-black text-[#111111]"
        >
          現在のパスワード
        </label>

        <input
          id="delete-account-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(
              event.target.value,
            );

            if (errorMessage) {
              setErrorMessage("");
            }
          }}
          disabled={isDeleting}
          className="mt-2 min-h-[48px] w-full rounded-[12px] border border-black/10 bg-white px-4 text-[16px] text-[#111111] outline-none transition placeholder:text-black/20 focus:border-[#1677FF]/40 focus:ring-4 focus:ring-[#EEF6FF] disabled:cursor-not-allowed disabled:bg-[#F7F9FC]"
          placeholder="現在のパスワードを入力"
        />
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="mt-4 rounded-[12px] border border-[#FFD400]/40 bg-[#FFF9D9] px-4 py-3"
        >
          <p className="text-[11px] font-bold leading-5 text-[#111111]">
            {errorMessage}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canDelete}
        className="mt-6 flex min-h-[50px] w-full items-center justify-center rounded-[12px] bg-[#111111] px-5 text-[13px] font-black text-white transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/25"
      >
        {isDeleting
          ? "アカウントを削除しています…"
          : "アカウントを完全に削除"}
      </button>

      <p className="mt-3 text-center text-[9px] leading-4 text-black/35">
        削除したアカウントは復元できません
      </p>
    </form>
  );
}