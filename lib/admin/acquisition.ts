import { createAdminClient } from "../supabase/admin";

/*
 * 流入元別の新規登録数（user_acquisitions）
 * 管理画面の集計用（サーバー側でのみ使う）
 */

const TABLE = "user_acquisitions";
const ROWS_PER_PAGE = 1000;

export type AcquisitionRow = {
  user_id: string;
  source: string | null;
  medium: string | null;
  created_at: string;
};

export type AcquisitionBreakdownRow = {
  // 表示名（例：ig / social）
  label: string;
  last7Days: number;
  total: number;
};

export type AcquisitionBreakdown = {
  // テーブルが未作成などで取得できなかった場合は false
  available: boolean;
  // 記録開始日時（最初の1件の作成日時）
  since: string | null;
  rows: AcquisitionBreakdownRow[];
  last7DaysTotal: number;
  total: number;
};

/*
 * user_acquisitions を全件取得する
 * 取得に失敗した場合は null（管理画面の他の集計は止めない）
 */
export async function fetchAcquisitionRows(): Promise<
  AcquisitionRow[] | null
> {
  try {
    const adminClient =
      createAdminClient();

    const rows: AcquisitionRow[] = [];
    let from = 0;

    while (true) {
      const { data, error } =
        await adminClient
          .from(TABLE)
          .select(
            "user_id, source, medium, created_at",
          )
          .order("created_at", {
            ascending: true,
          })
          .range(
            from,
            from + ROWS_PER_PAGE - 1,
          );

      if (error) {
        console.error(
          "[AKANUKE.AI] 流入元の取得エラー:",
          error,
        );

        return null;
      }

      const pageRows =
        (data ?? []) as AcquisitionRow[];

      rows.push(...pageRows);

      if (
        pageRows.length <
        ROWS_PER_PAGE
      ) {
        break;
      }

      from += ROWS_PER_PAGE;
    }

    return rows;
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 流入元の取得エラー:",
      error,
    );

    return null;
  }
}

function getLabel(row: AcquisitionRow) {
  if (!row.source) {
    return "不明（取得できず）";
  }

  return row.medium
    ? `${row.source} / ${row.medium}`
    : row.source;
}

/*
 * 流入元ごとに集計する
 * isTarget：集計対象のユーザーか（本番ユーザーのみ）
 * isLast7Days：日付が直近7日に含まれるか
 */
export function buildAcquisitionBreakdown(
  rows: AcquisitionRow[] | null,
  isTarget: (userId: string) => boolean,
  isLast7Days: (createdAt: string) => boolean,
): AcquisitionBreakdown {
  if (!rows) {
    return {
      available: false,
      since: null,
      rows: [],
      last7DaysTotal: 0,
      total: 0,
    };
  }

  const byLabel = new Map<
    string,
    AcquisitionBreakdownRow
  >();

  let since: string | null = null;
  let last7DaysTotal = 0;
  let total = 0;

  for (const row of rows) {
    if (!isTarget(row.user_id)) {
      continue;
    }

    if (
      !since ||
      row.created_at < since
    ) {
      since = row.created_at;
    }

    const label = getLabel(row);

    const entry =
      byLabel.get(label) ?? {
        label,
        last7Days: 0,
        total: 0,
      };

    entry.total += 1;
    total += 1;

    if (isLast7Days(row.created_at)) {
      entry.last7Days += 1;
      last7DaysTotal += 1;
    }

    byLabel.set(label, entry);
  }

  return {
    available: true,
    since,
    rows: [...byLabel.values()].sort(
      (a, b) =>
        b.total - a.total ||
        b.last7Days - a.last7Days ||
        a.label.localeCompare(b.label),
    ),
    last7DaysTotal,
    total,
  };
}
