"use client";

import {
  FormEvent,
  useState,
} from "react";

type DeleteAccountResponse = {
  success?: boolean;
  message?: string;
};

const DELETE_CONFIRMATION_TEXT =
  "削除する";

export default function DeleteAccountForm() {
  const [
    confirmation,
    setConfirmation,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const canDelete =
    confirmation.trim() ===
      DELETE_CONFIRMATION_TEXT &&
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
        "アカウントと保存されたデータを完全に削除します。この操作は取り消せません。本当に削除しますか？",
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
            confirmation:
              confirmation.trim(),
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
      <div className="rounded-[14px] bg-[#FFF9D9] px-4 py-4">
        <p className="text-[12px] font-black text-[#111111]">
          アカウントを削除する前に
        </p>

        <p className="mt-2 text-[11px] font-bold leading-5 text-black/55">
          診断結果などの保存データが削除されます。
          この操作は取り消せません。
        </p>

        <p className="mt-2 text-[10px] leading-5 text-black/45">
          AKANUKE.AIのアカウントを削除しても、
          LINE公式アカウントの友だち登録は解除されません。
        </p>
      </div>

      <div className="mt-5">
        <label
          htmlFor="delete-account-confirmation"
          className="block text-[12px] font-black text-[#111111]"
        >
          確認のため「削除する」と入力
        </label>

        <input
          id="delete-account-confirmation"
          name="confirmation"
          type="text"
          autoComplete="off"
          value={confirmation}
          onChange={(event) => {
            setConfirmation(
              event.target.value,
            );

            if (errorMessage) {
              setErrorMessage("");
            }
          }}
          disabled={isDeleting}
          className="mt-2 min-h-[48px] w-full rounded-[12px] border border-black/10 bg-white px-4 text-[16px] text-[#111111] outline-none transition placeholder:text-black/20 focus:border-[#1677FF]/40 focus:ring-4 focus:ring-[#EEF6FF] disabled:cursor-not-allowed disabled:bg-[#F7F9FC]"
          placeholder="削除する"
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
        削除したアカウントとデータは復元できません
      </p>
    </form>
  );
}