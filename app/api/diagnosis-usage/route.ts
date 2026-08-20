import { NextResponse } from "next/server";

import { createAdminClient } from "../../../lib/supabase/admin";
import { createClient } from "../../../lib/supabase/server";

const MONTHLY_DIAGNOSIS_LIMIT = 3;
const JST_OFFSET_HOURS = 9;

function getMonthlyPeriodJst() {
  const now = new Date();

  const jstNow = new Date(
    now.getTime() +
      JST_OFFSET_HOURS *
        60 *
        60 *
        1000,
  );

  const year = jstNow.getUTCFullYear();
  const month = jstNow.getUTCMonth();

  const startsAt = new Date(
    Date.UTC(
      year,
      month,
      1,
      -JST_OFFSET_HOURS,
    ),
  );

  const resetsAt = new Date(
    Date.UTC(
      year,
      month + 1,
      1,
      -JST_OFFSET_HOURS,
    ),
  );

  return {
    startsAt: startsAt.toISOString(),
    resetsAt: resetsAt.toISOString(),
  };
}

export async function GET() {
  try {
    const supabase = await createClient();

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

    const {
      startsAt,
      resetsAt,
    } = getMonthlyPeriodJst();

    const adminClient =
      createAdminClient();

    const {
      count,
      error: countError,
    } = await adminClient
      .from("diagnoses")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .gte("created_at", startsAt)
      .lt("created_at", resetsAt);

    if (countError) {
      console.error(
        "[AKANUKE.AI] 診断回数取得エラー",
        countError,
      );

      return NextResponse.json(
        {
          error:
            "診断回数を確認できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    const used = count ?? 0;
    const remaining = Math.max(
      0,
      MONTHLY_DIAGNOSIS_LIMIT - used,
    );

    return NextResponse.json({
      limit: MONTHLY_DIAGNOSIS_LIMIT,
      used,
      remaining,
      reached:
        used >= MONTHLY_DIAGNOSIS_LIMIT,
      resetsAt,
    });
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 診断回数取得処理エラー",
      error,
    );

    return NextResponse.json(
      {
        error:
          "診断回数の取得中にエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}