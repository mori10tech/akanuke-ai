import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { createClient } from "../../../../lib/supabase/server";

type DeleteAccountRequest = {
  confirmation?: unknown;
};

type DiagnosisImagePaths = {
  before_image_path: string | null;
  after_image_path: string | null;
};

const DELETE_CONFIRMATION_TEXT =
  "削除する";

const STORAGE_BUCKET =
  "diagnosis-images";

const ACCOUNT_DELETE_RATE_LIMIT_REQUESTS =
  3;

const ACCOUNT_DELETE_RATE_LIMIT_WINDOW_SECONDS =
  60;

type ApiRateLimitRow = {
  allowed: boolean;
  used: number;
  remaining: number;
  retry_after_seconds: number;
};

export async function DELETE(
  request: Request,
) {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          message:
            "ログイン情報を確認できません。もう一度ログインしてください。",
        },
        {
          status: 401,
        },
      );
    }

    let requestBody: DeleteAccountRequest;

    try {
      requestBody =
        (await request.json()) as DeleteAccountRequest;
    } catch {
      return NextResponse.json(
        {
          message:
            "送信された内容を確認できません。",
        },
        {
          status: 400,
        },
      );
    }

    const confirmation =
      typeof requestBody.confirmation ===
      "string"
        ? requestBody.confirmation.trim()
        : "";

    if (
      confirmation !==
      DELETE_CONFIRMATION_TEXT
    ) {
      return NextResponse.json(
        {
          message:
            "確認欄に「削除する」と入力してください。",
        },
        {
          status: 400,
        },
      );
    }

    const adminClient =
      createAdminClient();

    /*
     * アカウント削除は破壊的な管理者権限処理のため、
     * ユーザー単位で短時間の連続実行を制限します。
     */
    const {
      data: rateRows,
      error: rateError,
    } =
      await adminClient.rpc(
        "claim_api_rate_limit",
        {
          p_rate_key:
            `account-delete:user:${user.id}`,
          p_limit:
            ACCOUNT_DELETE_RATE_LIMIT_REQUESTS,
          p_window_seconds:
            ACCOUNT_DELETE_RATE_LIMIT_WINDOW_SECONDS,
        },
      );

    if (rateError) {
      console.error(
        "[AKANUKE.AI] アカウント削除レート制限確認エラー",
        {
          userId:
            user.id,
          error:
            rateError,
        },
      );

      return NextResponse.json(
        {
          message:
            "アカウント削除の準備に失敗しました。時間をおいて再度お試しください。",
        },
        {
          status: 503,
        },
      );
    }

    const rate =
      Array.isArray(rateRows)
        ? (
            rateRows[0] as
              | ApiRateLimitRow
              | undefined
          )
        : undefined;

    if (
      !rate ||
      typeof rate.allowed !==
        "boolean" ||
      typeof rate.used !==
        "number" ||
      typeof rate.remaining !==
        "number" ||
      typeof rate.retry_after_seconds !==
        "number"
    ) {
      console.error(
        "[AKANUKE.AI] アカウント削除レート制限レスポンス形式が不正です",
        {
          userId:
            user.id,
          rateRows,
        },
      );

      return NextResponse.json(
        {
          message:
            "アカウント削除の準備に失敗しました。時間をおいて再度お試しください。",
        },
        {
          status: 503,
        },
      );
    }

    if (!rate.allowed) {
      console.warn(
        "[AKANUKE.AI] アカウント削除レート制限に到達",
        {
          userId:
            user.id,
          used:
            rate.used,
          remaining:
            rate.remaining,
        },
      );

      return NextResponse.json(
        {
          message:
            "短時間にアカウント削除リクエストが集中しています。少し待ってからもう一度お試しください。",
        },
        {
          status: 429,
          headers: {
            "Retry-After":
              String(
                rate.retry_after_seconds,
              ),
          },
        },
      );
    }

    /*
     * Authユーザーを削除する前に、
     * 診断履歴から画像パスを取得します。
     */
    const {
      data: diagnoses,
      error: diagnosesError,
    } = await adminClient
      .from("diagnoses")
      .select(
        "before_image_path, after_image_path",
      )
      .eq("user_id", user.id)
      .returns<DiagnosisImagePaths[]>();

    if (diagnosesError) {
      console.error(
        "[AKANUKE.AI] 診断画像パス取得エラー",
        diagnosesError,
      );

      return NextResponse.json(
        {
          message:
            "保存データを確認できませんでした。時間をおいて再度お試しください。",
        },
        {
          status: 500,
        },
      );
    }

    const imagePaths = Array.from(
      new Set(
        (diagnoses ?? []).flatMap(
          (diagnosis) =>
            [
              diagnosis.before_image_path,
              diagnosis.after_image_path,
            ].filter(
              (
                path,
              ): path is string =>
                typeof path === "string" &&
                path.length > 0,
            ),
        ),
      ),
    );

    /*
     * Storage APIの負荷を抑えるため、
     * 100件ずつ画像を削除します。
     */
    for (
      let index = 0;
      index < imagePaths.length;
      index += 100
    ) {
      const paths =
        imagePaths.slice(
          index,
          index + 100,
        );

      const { error: storageError } =
        await adminClient.storage
          .from(STORAGE_BUCKET)
          .remove(paths);

      if (storageError) {
        console.error(
          "[AKANUKE.AI] 診断画像削除エラー",
          storageError,
        );

        return NextResponse.json(
          {
            message:
              "保存画像を削除できませんでした。時間をおいて再度お試しください。",
          },
          {
            status: 500,
          },
        );
      }
    }

    /*
     * Authユーザーを削除します。
     * diagnosesはON DELETE CASCADEで
     * 自動削除されます。
     */
    const { error: deleteError } =
      await adminClient.auth.admin
        .deleteUser(user.id);

    if (deleteError) {
      console.error(
        "[AKANUKE.AI] アカウント削除エラー",
        deleteError,
      );

      return NextResponse.json(
        {
          message:
            "アカウントを削除できませんでした。時間をおいて再度お試しください。",
        },
        {
          status: 500,
        },
      );
    }

    await supabase.auth.signOut();

    return NextResponse.json(
      {
        success: true,
        message:
          "アカウントを削除しました。",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] アカウント削除処理エラー",
      error,
    );

    return NextResponse.json(
      {
        message:
          "アカウント削除処理でエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}