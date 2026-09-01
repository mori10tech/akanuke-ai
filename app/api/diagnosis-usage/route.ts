import {
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../lib/supabase/admin";

import {
  createClient,
} from "../../../lib/supabase/server";

const MONTHLY_DIAGNOSIS_LIMIT =
  3;

const JST_OFFSET_HOURS = 9;

function getMonthlyPeriodJst() {
  const now =
    new Date();

  const jstNow =
    new Date(
      now.getTime() +
        JST_OFFSET_HOURS *
          60 *
          60 *
          1000,
    );

  const year =
    jstNow.getUTCFullYear();

  const month =
    jstNow.getUTCMonth();

  const monthNumber =
    String(
      month + 1,
    ).padStart(
      2,
      "0",
    );

  const periodStart =
    `${year}-${monthNumber}-01`;

  const resetsAt =
    new Date(
      Date.UTC(
        year,
        month + 1,
        1,
        -JST_OFFSET_HOURS,
      ),
    );

  return {
    periodStart,
    resetsAt:
      resetsAt.toISOString(),
  };
}

export async function GET() {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (
      userError ||
      !user
    ) {
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
      periodStart,
      resetsAt,
    } =
      getMonthlyPeriodJst();

    const adminClient =
      createAdminClient();

    /*
     * テスター等の診断上限除外設定を確認します。
     */
    const {
      data: exemption,
      error: exemptionError,
    } =
      await adminClient
        .from(
          "diagnosis_limit_exemptions",
        )
        .select(
          "user_id",
        )
        .eq(
          "user_id",
          user.id,
        )
        .maybeSingle();

    if (
      exemptionError
    ) {
      console.error(
        "[AKANUKE.AI] 診断上限除外確認エラー",
        exemptionError,
      );

      return NextResponse.json(
        {
          error:
            "診断上限の設定を確認できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    const isExempt =
      Boolean(
        exemption,
      );

    /*
     * 新しい月次利用回数テーブルを正として確認します。
     *
     * diagnosesの件数から利用回数を逆算しません。
     * OpenAI診断開始時に確保された利用枠を表示します。
     */
    const {
      data: usage,
      error: usageError,
    } =
      await adminClient
        .from(
          "diagnosis_monthly_usage",
        )
        .select(
          "used_count",
        )
        .eq(
          "user_id",
          user.id,
        )
        .eq(
          "period_start",
          periodStart,
        )
        .maybeSingle();

    if (
      usageError
    ) {
      console.error(
        "[AKANUKE.AI] 診断利用回数取得エラー",
        usageError,
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

    const used =
      typeof usage
        ?.used_count ===
        "number"
        ? usage.used_count
        : 0;

    const remaining =
      isExempt
        ? MONTHLY_DIAGNOSIS_LIMIT
        : Math.max(
            0,
            MONTHLY_DIAGNOSIS_LIMIT -
              used,
          );

    return NextResponse.json(
      {
        limit:
          MONTHLY_DIAGNOSIS_LIMIT,

        used,

        remaining,

        reached:
          isExempt
            ? false
            : used >=
              MONTHLY_DIAGNOSIS_LIMIT,

        resetsAt,

        exempt:
          isExempt,
      },
      {
        status: 200,
      },
    );
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