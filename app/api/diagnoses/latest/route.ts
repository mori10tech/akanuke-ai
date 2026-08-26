import {
  NextResponse,
} from "next/server";

import {
  createClient,
} from "../../../../lib/supabase/server";

export async function GET() {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          hasDiagnosis: false,
          diagnosisId: null,
        },
        {
          status: 401,
        },
      );
    }

    const {
      data: latestDiagnosis,
      error,
    } =
      await supabase
        .from("diagnoses")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

    if (error) {
      console.error(
        "[AKANUKE.AI] 最新診断確認エラー:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "診断履歴を確認できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        hasDiagnosis:
          Boolean(latestDiagnosis),
        diagnosisId:
          latestDiagnosis?.id ?? null,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 最新診断確認エラー:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "診断履歴を確認できませんでした。",
      },
      {
        status: 500,
      },
    );
  }
}