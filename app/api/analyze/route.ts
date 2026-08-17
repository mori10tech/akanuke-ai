import OpenAI from "openai";
import {
  NextRequest,
  NextResponse,
} from "next/server";

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

export async function POST(
  request: NextRequest,
) {
  const startedAt = Date.now();

  try {
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

    console.log(
      "[AKANUKE.AI] AI診断開始",
    );

console.log(
  "[AKANUKE.AI] AI診断開始",
);


    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_ANALYSIS_MODEL ??
          "gpt-5.4-nano",

        store: false,

        reasoning: {
          effort: "minimal",
        },

        /*
         * 診断結果は構造化JSONなので、
         * 不必要に長い出力を生成させません。
         *
         * After生成に必要な情報量は維持しつつ、
         * レスポンス生成時間を抑えます。
         */
        max_output_tokens: 1800,

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
診断速度を優先するため、
必要な情報を簡潔かつ具体的に回答してください。

- currentImpression：2文以内
- summary.headline：1文
- summary.body：3文以内
- afterSummary.headline：1文
- afterSummary.body：3文以内
- afterSummary.changes：3〜5件
- hair.observation：2文以内
- hair.advice：3文以内
- eyebrows.observation：2文以内
- eyebrows.advice：3文以内
- skin.observation：2文以内
- skin.advice：3文以内
- grooming.observation：2文以内
- grooming.advice：3文以内
- priorities.description：各3文以内
- afterDirection：各項目2〜3文以内

afterDirectionはAfter画像生成に使用するため、
短くしても具体的な視覚変更内容は必ず残してください。

同じ内容の言い換えや重複説明は不要です。
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