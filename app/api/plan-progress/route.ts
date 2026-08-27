import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createClient,
} from "../../../lib/supabase/server";

type SavePlanProgressBody = {
  diagnosisId?: string;
  completedTaskIds?: string[];
};

export async function GET(
  request: NextRequest,
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
          error:
            "ログイン情報を確認できません。",
        },
        {
          status: 401,
        },
      );
    }

    const diagnosisId =
      request.nextUrl.searchParams.get(
        "diagnosisId",
      );

    if (!diagnosisId) {
      return NextResponse.json(
        {
          error:
            "診断IDが指定されていません。",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * 指定された診断が
     * ログインユーザー本人のものか確認
     */
    const {
      data: diagnosis,
      error: diagnosisError,
    } = await supabase
      .from("diagnoses")
      .select("id")
      .eq("id", diagnosisId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (diagnosisError) {
      console.error(
        "[AKANUKE.AI] 診断確認エラー:",
        diagnosisError,
      );

      return NextResponse.json(
        {
          error:
            "診断情報を確認できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    if (!diagnosis) {
      return NextResponse.json(
        {
          error:
            "診断情報が見つかりません。",
        },
        {
          status: 404,
        },
      );
    }

    const {
      data: progress,
      error: progressError,
    } = await supabase
      .from(
        "diagnosis_plan_progress",
      )
      .select(
        "completed_task_ids, updated_at",
      )
      .eq(
        "diagnosis_id",
        diagnosisId,
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (progressError) {
      console.error(
        "[AKANUKE.AI] プラン進捗取得エラー:",
        progressError,
      );

      return NextResponse.json(
        {
          error:
            "プランの進捗を取得できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        completedTaskIds:
          progress?.completed_task_ids ??
          [],
        updatedAt:
          progress?.updated_at ?? null,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] プラン進捗取得処理エラー:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "プランの進捗取得中にエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
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
          error:
            "ログイン情報を確認できません。",
        },
        {
          status: 401,
        },
      );
    }

    const body =
      (await request.json()) as SavePlanProgressBody;

    const diagnosisId =
      body.diagnosisId?.trim();

    const completedTaskIds =
      Array.isArray(
        body.completedTaskIds,
      )
        ? body.completedTaskIds.filter(
            (
              taskId,
            ): taskId is string =>
              typeof taskId ===
                "string" &&
              taskId.trim().length > 0,
          )
        : [];

    if (!diagnosisId) {
      return NextResponse.json(
        {
          error:
            "診断IDが指定されていません。",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * 同じタスクIDが重複して送られても
     * DBには1件だけ保存する
     */
    const uniqueCompletedTaskIds =
      Array.from(
        new Set(completedTaskIds),
      );

    /*
     * 指定された診断が
     * ログインユーザー本人のものか確認
     */
    const {
      data: diagnosis,
      error: diagnosisError,
    } = await supabase
      .from("diagnoses")
      .select("id")
      .eq("id", diagnosisId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (diagnosisError) {
      console.error(
        "[AKANUKE.AI] 診断確認エラー:",
        diagnosisError,
      );

      return NextResponse.json(
        {
          error:
            "診断情報を確認できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    if (!diagnosis) {
      return NextResponse.json(
        {
          error:
            "診断情報が見つかりません。",
        },
        {
          status: 404,
        },
      );
    }

    const updatedAt =
      new Date().toISOString();

    const {
      data: progress,
      error: progressError,
    } = await supabase
      .from(
        "diagnosis_plan_progress",
      )
      .upsert(
        {
          diagnosis_id:
            diagnosisId,
          user_id: user.id,
          completed_task_ids:
            uniqueCompletedTaskIds,
          updated_at:
            updatedAt,
        },
        {
          onConflict:
            "diagnosis_id",
        },
      )
      .select(
        "completed_task_ids, updated_at",
      )
      .single();

    if (progressError) {
      console.error(
        "[AKANUKE.AI] プラン進捗保存エラー:",
        progressError,
      );

      return NextResponse.json(
        {
          error:
            "プランの進捗を保存できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        completedTaskIds:
          progress.completed_task_ids,
        updatedAt:
          progress.updated_at,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] プラン進捗保存処理エラー:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "プランの進捗保存中にエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}