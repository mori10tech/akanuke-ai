import type { User } from "@supabase/supabase-js";

import { createAdminClient } from "../supabase/admin";

/*
 * 管理者用の利用状況集計（サーバー側でのみ使う）
 * 日付の区切りはすべて日本時間（Asia/Tokyo）
 */

const USERS_PER_PAGE = 1000;
const DIAGNOSES_PER_PAGE = 1000;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const TREND_DAYS = 30;
const NEVER_DIAGNOSED_LIMIT = 10;

const PRODUCTION_PROVIDER =
  "custom:line-oidc";
const LEGACY_LINE_PROVIDER =
  "custom:line";
const EMAIL_PROVIDER = "email";

type UserCategory =
  | "production"
  | "legacyLine"
  | "email"
  | "other";

type DiagnosisRow = {
  user_id: string;
  created_at: string;
};

export type PeriodCount = {
  today: number;
  yesterday: number;
  last7Days: number;
  previous7Days: number;
  total: number;
};

export type DailyTrendRow = {
  date: string;
  signups: number;
  diagnoses: number;
};

export type NeverDiagnosedUser = {
  name: string;
  createdAt: string;
};

export type ReferenceCount = {
  users: number;
  diagnoses: number;
};

export type AdminStats = {
  generatedAt: string;
  todayKey: string;
  signups: PeriodCount;
  diagnoses: PeriodCount;
  diagnosedUsers: PeriodCount;
  returningUsers: number;
  trend: DailyTrendRow[];
  neverDiagnosedUsers: NeverDiagnosedUser[];
  neverDiagnosedTotal: number;
  reference: {
    legacyLine: ReferenceCount;
    email: ReferenceCount;
    other: ReferenceCount;
  };
  otherProviders: Array<{
    provider: string;
    users: number;
  }>;
};

/*
 * 日本時間の日付キー（YYYY-MM-DD）
 */
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

function shiftDateKey(
  dateKey: string,
  days: number,
) {
  const time =
    new Date(
      `${dateKey}T00:00:00Z`,
    ).getTime() +
    days * DAY_MS;

  return new Date(time)
    .toISOString()
    .slice(0, 10);
}

/*
 * identities に加えて、既存のログイン処理（app/liff）が見ている
 * app_metadata.provider / providers も判定に使う
 */
function getUserProviders(user: User) {
  const providers = new Set<string>();

  for (const identity of user.identities ?? []) {
    if (identity.provider) {
      providers.add(identity.provider);
    }
  }

  const appMetadata =
    user.app_metadata ?? {};

  if (
    typeof appMetadata.provider ===
    "string"
  ) {
    providers.add(appMetadata.provider);
  }

  if (
    Array.isArray(appMetadata.providers)
  ) {
    for (const provider of appMetadata.providers) {
      if (typeof provider === "string") {
        providers.add(provider);
      }
    }
  }

  return [...providers];
}

function getUserCategory(
  user: User,
): UserCategory {
  const providers =
    getUserProviders(user);

  if (
    providers.includes(
      PRODUCTION_PROVIDER,
    )
  ) {
    return "production";
  }

  if (
    providers.includes(
      LEGACY_LINE_PROVIDER,
    )
  ) {
    return "legacyLine";
  }

  if (
    providers.includes(EMAIL_PROVIDER)
  ) {
    return "email";
  }

  return "other";
}

/*
 * 表示用の名前（dashboard/account と同じ優先順）
 */
function getDisplayName(user: User) {
  const metadata =
    user.user_metadata ?? {};

  if (typeof metadata.name === "string") {
    return metadata.name;
  }

  if (
    typeof metadata.display_name ===
    "string"
  ) {
    return metadata.display_name;
  }

  if (
    typeof metadata.line_name ===
    "string"
  ) {
    return metadata.line_name;
  }

  return "（名前なし）";
}

async function fetchAllUsers() {
  const adminClient =
    createAdminClient();

  const users: User[] = [];
  let page = 1;

  while (true) {
    const { data, error } =
      await adminClient.auth.admin.listUsers(
        {
          page,
          perPage: USERS_PER_PAGE,
        },
      );

    if (error) {
      throw error;
    }

    const pageUsers =
      data.users ?? [];

    users.push(...pageUsers);

    if (
      pageUsers.length <
      USERS_PER_PAGE
    ) {
      break;
    }

    page += 1;
  }

  return users;
}

async function fetchAllDiagnoses() {
  const adminClient =
    createAdminClient();

  const diagnoses: DiagnosisRow[] = [];
  let from = 0;

  while (true) {
    const { data, error } =
      await adminClient
        .from("diagnoses")
        .select("user_id, created_at")
        .order("created_at", {
          ascending: true,
        })
        .order("id", {
          ascending: true,
        })
        .range(
          from,
          from +
            DIAGNOSES_PER_PAGE -
            1,
        );

    if (error) {
      throw error;
    }

    const rows =
      (data ?? []) as DiagnosisRow[];

    diagnoses.push(...rows);

    if (
      rows.length <
      DIAGNOSES_PER_PAGE
    ) {
      break;
    }

    from += DIAGNOSES_PER_PAGE;
  }

  return diagnoses;
}

function createPeriodCounter(
  todayKey: string,
) {
  const yesterdayKey = shiftDateKey(
    todayKey,
    -1,
  );

  const last7StartKey = shiftDateKey(
    todayKey,
    -6,
  );

  const previous7StartKey =
    shiftDateKey(todayKey, -13);

  return function getPeriod(
    dateKey: string,
  ) {
    return {
      today: dateKey === todayKey,
      yesterday:
        dateKey === yesterdayKey,
      last7Days:
        dateKey >= last7StartKey &&
        dateKey <= todayKey,
      previous7Days:
        dateKey >= previous7StartKey &&
        dateKey < last7StartKey,
    };
  };
}

function emptyPeriodCount(): PeriodCount {
  return {
    today: 0,
    yesterday: 0,
    last7Days: 0,
    previous7Days: 0,
    total: 0,
  };
}

export async function getAdminStats(): Promise<AdminStats> {
  const [users, diagnoses] =
    await Promise.all([
      fetchAllUsers(),
      fetchAllDiagnoses(),
    ]);

  const now = new Date();
  const todayKey = toJstDateKey(now);
  const getPeriod =
    createPeriodCounter(todayKey);

  const userCategoryById = new Map<
    string,
    UserCategory
  >();

  const reference = {
    legacyLine: {
      users: 0,
      diagnoses: 0,
    },
    email: {
      users: 0,
      diagnoses: 0,
    },
    other: {
      users: 0,
      diagnoses: 0,
    },
  };

  /*
   * 直近30日の日別推移（古い日付 → 新しい日付）
   */
  const trendByDate = new Map<
    string,
    DailyTrendRow
  >();

  for (
    let offset = TREND_DAYS - 1;
    offset >= 0;
    offset--
  ) {
    const date = shiftDateKey(
      todayKey,
      -offset,
    );

    trendByDate.set(date, {
      date,
      signups: 0,
      diagnoses: 0,
    });
  }

  const signups = emptyPeriodCount();
  const productionUsers: User[] = [];

  /*
   * 「その他・不明」の provider 名ごとの人数（原因確認用）
   */
  const otherProviderCounts = new Map<
    string,
    number
  >();

  for (const user of users) {
    const category =
      getUserCategory(user);

    userCategoryById.set(
      user.id,
      category,
    );

    if (category !== "production") {
      reference[category].users += 1;

      if (category === "other") {
        const providerLabel =
          getUserProviders(user).join(
            ", ",
          ) || "（provider なし）";

        otherProviderCounts.set(
          providerLabel,
          (otherProviderCounts.get(
            providerLabel,
          ) ?? 0) + 1,
        );
      }

      continue;
    }

    productionUsers.push(user);

    const dateKey = toJstDateKey(
      user.created_at,
    );

    const period = getPeriod(dateKey);

    signups.total += 1;
    if (period.today) signups.today += 1;
    if (period.yesterday)
      signups.yesterday += 1;
    if (period.last7Days)
      signups.last7Days += 1;
    if (period.previous7Days)
      signups.previous7Days += 1;

    const trendRow =
      trendByDate.get(dateKey);

    if (trendRow) {
      trendRow.signups += 1;
    }
  }

  const diagnosisCounts =
    emptyPeriodCount();

  const diagnosedUserSets = {
    today: new Set<string>(),
    yesterday: new Set<string>(),
    last7Days: new Set<string>(),
    previous7Days: new Set<string>(),
    total: new Set<string>(),
  };

  const diagnosisDatesByUser = new Map<
    string,
    Set<string>
  >();

  for (const diagnosis of diagnoses) {
    const category =
      userCategoryById.get(
        diagnosis.user_id,
      ) ?? "other";

    if (category !== "production") {
      reference[category].diagnoses += 1;
      continue;
    }

    const dateKey = toJstDateKey(
      diagnosis.created_at,
    );

    const period = getPeriod(dateKey);
    const userId = diagnosis.user_id;

    diagnosisCounts.total += 1;
    diagnosedUserSets.total.add(userId);

    if (period.today) {
      diagnosisCounts.today += 1;
      diagnosedUserSets.today.add(userId);
    }

    if (period.yesterday) {
      diagnosisCounts.yesterday += 1;
      diagnosedUserSets.yesterday.add(
        userId,
      );
    }

    if (period.last7Days) {
      diagnosisCounts.last7Days += 1;
      diagnosedUserSets.last7Days.add(
        userId,
      );
    }

    if (period.previous7Days) {
      diagnosisCounts.previous7Days += 1;
      diagnosedUserSets.previous7Days.add(
        userId,
      );
    }

    const trendRow =
      trendByDate.get(dateKey);

    if (trendRow) {
      trendRow.diagnoses += 1;
    }

    const dates =
      diagnosisDatesByUser.get(userId) ??
      new Set<string>();

    dates.add(dateKey);
    diagnosisDatesByUser.set(
      userId,
      dates,
    );
  }

  /*
   * 再訪ユーザー：日本時間で別の日に2回以上診断したユーザー
   */
  let returningUsers = 0;

  for (const dates of diagnosisDatesByUser.values()) {
    if (dates.size >= 2) {
      returningUsers += 1;
    }
  }

  const neverDiagnosed =
    productionUsers
      .filter(
        (user) =>
          !diagnosedUserSets.total.has(
            user.id,
          ),
      )
      .sort(
        (a, b) =>
          new Date(
            b.created_at,
          ).getTime() -
          new Date(
            a.created_at,
          ).getTime(),
      );

  return {
    generatedAt: now.toISOString(),
    todayKey,
    signups,
    diagnoses: diagnosisCounts,
    diagnosedUsers: {
      today:
        diagnosedUserSets.today.size,
      yesterday:
        diagnosedUserSets.yesterday.size,
      last7Days:
        diagnosedUserSets.last7Days.size,
      previous7Days:
        diagnosedUserSets.previous7Days
          .size,
      total:
        diagnosedUserSets.total.size,
    },
    returningUsers,
    trend: [
      ...trendByDate.values(),
    ].reverse(),
    neverDiagnosedUsers: neverDiagnosed
      .slice(0, NEVER_DIAGNOSED_LIMIT)
      .map((user) => ({
        name: getDisplayName(user),
        createdAt: user.created_at,
      })),
    neverDiagnosedTotal:
      neverDiagnosed.length,
    reference,
    otherProviders: [
      ...otherProviderCounts.entries(),
    ]
      .map(([provider, users]) => ({
        provider,
        users,
      }))
      .sort((a, b) => b.users - a.users),
  };
}
