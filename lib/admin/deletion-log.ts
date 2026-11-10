import type {
  SupabaseClient,
  User,
} from "@supabase/supabase-js";

import { createAdminClient } from "../supabase/admin";
import { getUserCategory } from "./user-category";

/*
 * 退会・自動削除の件数記録（usage_deletion_logs）
 * 管理画面の「累計」に削除済みの分を足し戻すために使う
 * ユーザーID・名前などの個人を特定できる情報は保存しない
 */

const TABLE = "usage_deletion_logs";
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const LOGS_PER_PAGE = 1000;

export type DeletionReason =
  | "account_deleted"
  | "inactive_cleanup";

function toJstDateKey(
  value: string | Date,
) {
  const time =
    new Date(value).getTime() +
    JST_OFFSET_MS;

  return new Date(time)
    .toISOString()
    .slice(0, 10);
}

/*
 * 削除の記録を1行追加する
 * 記録に失敗しても、呼び出し元の削除処理は止めない（エラーはログに出すだけ）
 */
export async function recordDeletion(
  adminClient: SupabaseClient,
  params: {
    reason: DeletionReason;
    user: User;
    diagnosisCreatedAts: string[];
  },
) {
  const { reason, user, diagnosisCreatedAts } =
    params;

  try {
    const diagnosisDays = new Set(
      diagnosisCreatedAts.map((value) =>
        toJstDateKey(value),
      ),
    );

    const { error } = await adminClient
      .from(TABLE)
      .insert({
        reason,
        user_category:
          getUserCategory(user),
        user_created_date:
          user.created_at
            ? toJstDateKey(
                user.created_at,
              )
            : null,
        diagnosis_count:
          diagnosisCreatedAts.length,
        diagnosis_day_count:
          diagnosisDays.size,
      });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 削除記録の保存に失敗",
      {
        reason,
        error,
      },
    );
  }
}

export type DeletionTotals = {
  // 退会したユーザー数
  deletedUsers: number;
  // 削除された診断数（退会＋自動削除）
  deletedDiagnoses: number;
  // 削除時点で診断していたユーザー数（退会＋自動削除）
  deletedDiagnosedUsers: number;
  // 削除時点で別の日に2回以上診断していたユーザー数（退会＋自動削除）
  deletedReturningUsers: number;
  // 記録テーブルを読めたか（SQL未実行などで読めない場合は false）
  available: boolean;
};

type DeletionLogRow = {
  reason: DeletionReason;
  diagnosis_count: number;
  diagnosis_day_count: number;
};

/*
 * 本番ユーザー（production）の削除記録を合計する
 */
export async function fetchDeletionTotals(): Promise<DeletionTotals> {
  const adminClient =
    createAdminClient();

  const totals: DeletionTotals = {
    deletedUsers: 0,
    deletedDiagnoses: 0,
    deletedDiagnosedUsers: 0,
    deletedReturningUsers: 0,
    available: true,
  };

  let from = 0;

  while (true) {
    const { data, error } =
      await adminClient
        .from(TABLE)
        .select(
          "reason, diagnosis_count, diagnosis_day_count",
        )
        .eq(
          "user_category",
          "production",
        )
        .order("id", {
          ascending: true,
        })
        .range(
          from,
          from + LOGS_PER_PAGE - 1,
        );

    /*
     * 記録テーブルが読めなくても管理画面は表示する
     * （この場合、累計は削除分を含まない数字になる）
     */
    if (error) {
      console.error(
        "[AKANUKE.AI] 削除記録の取得に失敗",
        error,
      );

      return {
        deletedUsers: 0,
        deletedDiagnoses: 0,
        deletedDiagnosedUsers: 0,
        deletedReturningUsers: 0,
        available: false,
      };
    }

    const rows =
      (data ?? []) as DeletionLogRow[];

    for (const row of rows) {
      if (
        row.reason ===
        "account_deleted"
      ) {
        totals.deletedUsers += 1;
      }

      totals.deletedDiagnoses +=
        row.diagnosis_count;

      if (row.diagnosis_count > 0) {
        totals.deletedDiagnosedUsers += 1;
      }

      if (
        row.diagnosis_day_count >= 2
      ) {
        totals.deletedReturningUsers += 1;
      }
    }

    if (rows.length < LOGS_PER_PAGE) {
      break;
    }

    from += LOGS_PER_PAGE;
  }

  return totals;
}
