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

    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_ANALYSIS_MODEL ??
          "gpt-5-mini",

        store: false,

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

改善案は、この写真で実際に確認できる内容だけを根拠にしてください。

改善優先順位は必ず3件とし、
rankは1、2、3の順にしてください。

AKANUKE PROGRESSは、
容姿そのものの点数ではなく、
希望するAfterイメージへの現在の到達度として算出してください。
                `.trim(),
              },

              {
                type: "input_image",
                image_url: imageDataUrl,
                detail: "high",
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
          Math.round(parsed.progress),
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

    return NextResponse.json(
      normalizedResult,
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "OpenAI analyze error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "AI診断中にエラーが発生しました。時間をおいてもう一度お試しください。",
      },
      {
        status: 500,
      },
    );
  }
}