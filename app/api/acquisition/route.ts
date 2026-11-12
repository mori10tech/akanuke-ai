import {
  NextResponse,
} from "next/server";

import { createAdminClient } from "../../../lib/supabase/admin";
import { createClient } from "../../../lib/supabase/server";

/*
 * 新規ユーザーの流入元を保存する（user_acquisitions）
 *
 * - LIFFログインで新規ユーザーが作成された直後に、app/liff/page.tsx から呼ぶ
 * - 1ユーザーにつき1行のみ。すでに保存済みなら何もしない（上書きしない）
 * - 作成から時間が経ったユーザーの記録は受け付けない
 */

const TABLE = "user_acquisitions";
const MAX_VALUE_LENGTH = 100;

/*
 * ユーザー作成からこの時間を過ぎたら記録しない
 * （新規登録の直後以外に書き込まれるのを防ぐ）
 */
const ACCEPT_WINDOW_MS =
  10 * 60 * 1000;

function cleanValue(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.slice(
    0,
    MAX_VALUE_LENGTH,
  );
}

function cleanDate(value: unknown) {
  const text = cleanValue(value);

  if (!text) {
    return null;
  }

  const time = Date.parse(text);

  return Number.isNaN(time)
    ? null
    : new Date(time).toISOString();
}

export async function POST(
  request: Request,
) {
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
          error:
            "ログインが必要です。",
        },
        {
          status: 401,
        },
      );
    }

    const createdAt = Date.parse(
      user.created_at,
    );

    if (
      Number.isNaN(createdAt) ||
      Date.now() - createdAt >
        ACCEPT_WINDOW_MS
    ) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    let body: Record<string, unknown> =
      {};

    try {
      const parsed =
        (await request.json()) as unknown;

      if (
        parsed &&
        typeof parsed === "object"
      ) {
        body =
          parsed as Record<
            string,
            unknown
          >;
      }
    } catch {
      body = {};
    }

    const adminClient =
      createAdminClient();

    /*
     * 流入元が取れなかった場合も、
     * 「不明」として1行残す（登録数との突き合わせのため）
     */
    const { error } =
      await adminClient
        .from(TABLE)
        .upsert(
          {
            user_id: user.id,
            source: cleanValue(
              body.source,
            ),
            medium: cleanValue(
              body.medium,
            ),
            campaign: cleanValue(
              body.campaign,
            ),
            landing_path: cleanValue(
              body.landingPath,
            ),
            first_visit_at: cleanDate(
              body.firstVisitAt,
            ),
          },
          {
            onConflict: "user_id",
            ignoreDuplicates: true,
          },
        );

    if (error) {
      console.error(
        "[AKANUKE.AI] 流入元保存エラー:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "流入元を保存できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 流入元保存エラー:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "流入元を保存できませんでした。",
      },
      {
        status: 500,
      },
    );
  }
}
