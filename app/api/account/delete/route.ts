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