import OpenAI from "openai";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createAdminClient } from "../../../lib/supabase/admin";
import { createClient } from "../../../lib/supabase/server";

import {
  ANALYSIS_SYSTEM_PROMPT,
} from "../../../lib/openai/prompts";

import {
  akanukeAnalysisJsonSchema,
  type AkanukeAnalysis,
} from "../../../lib/openai/schemas";

type AnalyzeRequestBody = {
  imageDataUrl?: string;
  targetImpression?: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  const year =
    jstNow.getUTCFullYear();

  const month =
    jstNow.getUTCMonth();

  const periodStart = new Date(
    Date.UTC(
      year,
      month,
      1,
      -JST_OFFSET_HOURS,
    ),
  );

  const nextPeriodStart = new Date(
    Date.UTC(
      year,
      month + 1,
      1,
      -JST_OFFSET_HOURS,
    ),
  );

  return {
    periodStart:
      periodStart.toISOString(),
    nextPeriodStart:
      nextPeriodStart.toISOString(),
  };
}

export async function POST(
  request: NextRequest,
) {
  const startedAt = Date.now();

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
            "AI診断を利用するにはLINEログインが必要です。",
          code:
            "AUTHENTICATION_REQUIRED",
        },
        {
          status: 401,
        },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OpenAI APIキーが設定されていません。",
        },
        {
          status: 500,
        },
      );
    }

    const body =
      (await request.json()) as AnalyzeRequestBody;

    const imageDataUrl =
      body.imageDataUrl?.trim();

    const targetImpression =
      body.targetImpression?.trim();

    if (!imageDataUrl) {
      return NextResponse.json(
        {
          error:
            "診断する画像がありません。",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !imageDataUrl.startsWith(
        "data:image/",
      )
    ) {
      return NextResponse.json(
        {
          error:
            "画像データの形式が正しくありません。",
        },
        {
          status: 400,
        },
      );
    }

    if (!targetImpression) {
      return NextResponse.json(
        {
          error:
            "なりたい印象が指定されていません。",
        },
        {
          status: 400,
        },
      );
    }

        const {
      periodStart,
      nextPeriodStart,
    } = getMonthlyPeriodJst();

        const adminClient =
      createAdminClient();

    /*
     * 診断上限の対象外として登録された
     * テストアカウントか確認します。
     */
    const {
      data: exemption,
      error: exemptionError,
    } = await adminClient
      .from(
        "diagnosis_limit_exemptions",
      )
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (exemptionError) {
      console.error(
        "[AKANUKE.AI] 診断上限除外確認エラー",
        exemptionError,
      );

      return NextResponse.json(
        {
          error:
            "診断上限の設定を確認できませんでした。時間をおいて再度お試しください。",
        },
        {
          status: 500,
        },
      );
    }

    const isExempt =
      Boolean(exemption);

    const {
      count: diagnosisCount,
      error: countError,
    } = await adminClient
      .from("diagnoses")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .gte(
        "created_at",
        periodStart,
      )
      .lt(
        "created_at",
        nextPeriodStart,
      );

    if (countError) {
      console.error(
        "[AKANUKE.AI] 診断回数取得エラー",
        countError,
      );

      return NextResponse.json(
        {
          error:
            "診断回数を確認できませんでした。時間をおいて再度お試しください。",
        },
        {
          status: 500,
        },
      );
    }

    const usedCount =
      diagnosisCount ?? 0;

        if (
      !isExempt &&
      usedCount >=
        MONTHLY_DIAGNOSIS_LIMIT
    ) {
      return NextResponse.json(
        {
          error:
            "今月のAI診断上限に達しました。翌月から再び診断できます。",
          code:
            "DIAGNOSIS_LIMIT_REACHED",
          limit:
            MONTHLY_DIAGNOSIS_LIMIT,
                    exempt: isExempt,
          used: usedCount,
          remaining: 0,
          resetsAt:
            nextPeriodStart,
        },
        {
          status: 429,
        },
      );
    }

    console.log(
      "[AKANUKE.AI] AI診断開始",
      {
        userId: user.id,
        used: usedCount,
        limit:
          MONTHLY_DIAGNOSIS_LIMIT,
      },
    );

    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_ANALYSIS_MODEL ??
          "gpt-5.4-nano",

        store: false,

        reasoning: {
          effort: "none",
        },

        /*
         * 診断結果は構造化JSONなので、
         * 不必要に長い出力を生成させません。
         *
         * After生成に必要な情報量は維持しつつ、
         * レスポンス生成時間を抑えます。
         */
        max_output_tokens: 2500,

        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: ANALYSIS_SYSTEM_PROMPT,
              },
            ],
          },

          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `
ユーザーが希望するAfterイメージ：
「${targetImpression}」

提供された写真を分析してください。

写真で実際に確認できる内容だけを根拠にしてください。

改善優先順位は必ず3件とし、
rankは1、2、3の順にしてください。

AKANUKE PROGRESSは、
容姿の点数ではなく、
希望するAfterイメージへの現在の到達度として算出してください。

【回答量】 
スマートフォンで短時間に理解できることを最優先してください。

文章は必要最小限にし、
前置き・一般論・同じ内容の言い換えは不要です。

文字数上限まで埋める必要はありません。
短く伝わる場合は、より短く回答してください。

- currentImpression：60文字以内
- summary.headline：30文字以内
- summary.body：90文字以内
- afterSummary.headline：30文字以内
- afterSummary.body：90文字以内
- afterSummary.changes：3〜4件、各35文字以内

- hair.observation：60文字以内
- hair.advice：85文字以内

- eyebrows.observation：60文字以内
- eyebrows.advice：85文字以内

- skin.observation：60文字以内
- skin.advice：85文字以内

- grooming.observation：60文字以内
- grooming.advice：85文字以内

- priorities.description：各70文字以内

- afterDirection.hair：70文字以内
- afterDirection.eyebrows：70文字以内
- afterDirection.skin：70文字以内
- afterDirection.grooming：70文字以内
- afterDirection.styling：70文字以内

【各項目の役割】
- currentImpression：現在の印象を短く要約する
- observation：写真から確認できる現在の状態だけを書く
- advice：具体的に何を変えるべきかを書く
- priorities.description：なぜその項目を優先するかを書く
- afterDirection：After画像でどのように見た目を変えるかを書く

各項目で同じ内容を繰り返さないでください。

afterDirectionはAfter画像生成に使用するため、
短くしても髪型・眉・肌・身だしなみ・スタイリングの
具体的な視覚変更内容は必ず残してください。
                `.trim(),
              },

              {
                type: "input_image",
                image_url: imageDataUrl,
                detail: "auto",
              },
            ],
          },
        ],

        text: {
          format: {
            type: "json_schema",
            name: "akanuke_analysis",
            strict: true,
            schema:
              akanukeAnalysisJsonSchema,
          },
        },
      });

    if (!response.output_text) {
      throw new Error(
        "OpenAIから診断結果が返されませんでした。",
      );
    }

    const parsed =
      JSON.parse(
        response.output_text,
      ) as AkanukeAnalysis;

    const normalizedResult: AkanukeAnalysis = {
      ...parsed,

      progress: Math.max(
        0,
        Math.min(
          100,
          Math.round(
            parsed.progress,
          ),
        ),
      ),

      targetImpression,

      priorities: [
        {
          ...parsed.priorities[0],
          rank: 1,
        },
        {
          ...parsed.priorities[1],
          rank: 2,
        },
        {
          ...parsed.priorities[2],
          rank: 3,
        },
      ],
    };

    const durationMs =
      Date.now() - startedAt;

    console.log(
      "[AKANUKE.AI] AI診断完了:",
      `${durationMs}ms`,
    );

    return NextResponse.json(
      normalizedResult,
      {
        status: 200,
      },
    );
  } catch (error) {
    const durationMs =
      Date.now() - startedAt;

    const errorMessage =
      error instanceof Error
        ? error.message
        : "不明なエラーが発生しました。";

    console.error(
      "[AKANUKE.AI] AI診断エラー:",
      {
        durationMs,
        error,
      },
    );

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV ===
          "development"
            ? errorMessage
            : "AI診断中にエラーが発生しました。時間をおいてもう一度お試しください。",
      },
      {
        status: 500,
      },
    );
  }
}