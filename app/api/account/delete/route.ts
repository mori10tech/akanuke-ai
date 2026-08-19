import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { createClient } from "../../../../lib/supabase/server";

type DeleteAccountRequest = {
  password?: unknown;
};

function createVerificationClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (
    !supabaseUrl ||
    !supabasePublishableKey
  ) {
    throw new Error(
      "Supabaseの環境変数が設定されていません。",
    );
  }

  return createSupabaseClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}

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

    if (
      userError ||
      !user ||
      !user.email
    ) {
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

    const password =
      typeof requestBody.password ===
      "string"
        ? requestBody.password
        : "";

    if (!password) {
      return NextResponse.json(
        {
          message:
            "現在のパスワードを入力してください。",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * 現在のパスワードで再認証し、
     * 本人による操作であることを確認します。
     */
    const verificationClient =
      createVerificationClient();

    const {
      data: verificationData,
      error: verificationError,
    } =
      await verificationClient.auth
        .signInWithPassword({
          email: user.email,
          password,
        });

    if (
      verificationError ||
      !verificationData.user
    ) {
      return NextResponse.json(
        {
          message:
            "パスワードが正しくありません。",
        },
        {
          status: 401,
        },
      );
    }

    if (
      verificationData.user.id !==
      user.id
    ) {
      return NextResponse.json(
        {
          message:
            "本人確認に失敗しました。",
        },
        {
          status: 403,
        },
      );
    }

    /*
     * Secret keyを使用する管理者クライアントで、
     * Supabase Authのユーザーを完全削除します。
     */
    const adminClient =
      createAdminClient();

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

    /*
     * ブラウザ側のSupabaseセッションを
     * 破棄するためにログアウトします。
     */
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