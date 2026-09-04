import OpenAI from "openai";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createClient,
} from "../../../lib/supabase/server";

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

type ClaimDiagnosisUsageRow = {
  allowed: boolean;
  exempt: boolean;
  used: number;
  remaining: number;
  resets_at: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MONTHLY_DIAGNOSIS_LIMIT = 3;

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
    } =
      await supabase.auth.getUser();

    if (
      userError ||
      !user
    ) {
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

    /*
     * APIキー設定不備では
     * 診断回数を消費させないため、
     * 利用枠確保より先に確認します。
     */
    if (
      !process.env
        .OPENAI_API_KEY
    ) {
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

    /*
     * 不正なリクエストでは
     * 診断回数を消費させません。
     */
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

    /*
     * PostgreSQL側で診断枠を原子的に確保します。
     *
     * 同じユーザーから同時に複数リクエストが来ても、
     * DB側で順番に処理されるため、
     * 月3回の上限を超えてOpenAIを実行しません。
     *
     * diagnosis_limit_exemptionsに登録されたユーザーは
     * RPC側で制限対象外になります。
     */
    const {
      data: claimData,
      error: claimError,
    } =
      await supabase.rpc(
        "claim_diagnosis_usage",
      );

    if (claimError) {
      console.error(
        "[AKANUKE.AI] 診断利用枠確保エラー:",
        claimError,
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

    const claim =
      Array.isArray(
        claimData,
      ) &&
      claimData.length > 0
        ? (claimData[0] as ClaimDiagnosisUsageRow)
        : null;

    if (
      !claim ||
      typeof claim.allowed !==
        "boolean" ||
      typeof claim.exempt !==
        "boolean" ||
      typeof claim.used !==
        "number" ||
      typeof claim.remaining !==
        "number" ||
      typeof claim.resets_at !==
        "string"
    ) {
      console.error(
        "[AKANUKE.AI] 診断利用枠確保RPCのレスポンス形式が不正です:",
        claimData,
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

    if (!claim.allowed) {
      return NextResponse.json(
        {
          error:
            "今月のAI診断上限に達しました。翌月から再び診断できます。",
          code:
            "DIAGNOSIS_LIMIT_REACHED",
          limit:
            MONTHLY_DIAGNOSIS_LIMIT,
          exempt:
            claim.exempt,
          used:
            claim.used,
          remaining:
            claim.remaining,
          resetsAt:
            claim.resets_at,
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
        used:
          claim.used,
        remaining:
          claim.remaining,
        limit:
          MONTHLY_DIAGNOSIS_LIMIT,
        exempt:
          claim.exempt,
      },
    );

    /*
     * 診断利用枠を確保できた場合だけ
     * OpenAIを実行します。
     */
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

        max_output_tokens: 2500,

        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text:
                  ANALYSIS_SYSTEM_PROMPT,
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
                image_url:
                  imageDataUrl,
                detail: "auto",
              },
            ],
          },
        ],

        text: {
          format: {
            type: "json_schema",
            name:
              "akanuke_analysis",
            strict: true,
            schema:
              akanukeAnalysisJsonSchema,
          },
        },
      });

    if (
      !response.output_text
    ) {
      throw new Error(
        "OpenAIから診断結果が返されませんでした。",
      );
    }

    const parsed =
      JSON.parse(
        response.output_text,
      ) as AkanukeAnalysis;

    const normalizedResult: AkanukeAnalysis =
      {
        ...parsed,

        progress:
          Math.max(
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
      Date.now() -
      startedAt;

    console.log(
      "[AKANUKE.AI] AI診断完了:",
      {
        userId:
          user.id,
        durationMs,
        used:
          claim.used,
        remaining:
          claim.remaining,
        exempt:
          claim.exempt,
      },
    );

    return NextResponse.json(
      normalizedResult,
      {
        status: 200,
      },
    );
  } catch (error) {
    const durationMs =
      Date.now() -
      startedAt;

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

    /*
     * OpenAI実行開始後のエラーについては、
     * 確保済みの診断回数を戻しません。
     *
     * 月3回制限をOpenAI実行回数の
     * コスト制御として確実に機能させるためです。
     */
    return NextResponse.json(
      {
        error:
          process.env
              .NODE_ENV ===
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