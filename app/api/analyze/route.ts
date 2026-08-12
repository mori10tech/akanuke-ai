import { NextRequest, NextResponse } from "next/server";
import type { AkanukeAnalysis } from "../../../lib/openai/schemas";

type AnalyzeRequestBody = {
  imageDataUrl?: string;
  targetImpression?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;

    const imageDataUrl = body.imageDataUrl?.trim();
    const targetImpression = body.targetImpression?.trim();

    if (!imageDataUrl) {
      return NextResponse.json(
        {
          error: "診断する画像がありません。",
        },
        {
          status: 400,
        },
      );
    }

    if (!targetImpression) {
      return NextResponse.json(
        {
          error: "なりたい印象が指定されていません。",
        },
        {
          status: 400,
        },
      );
    }

    const testResult: AkanukeAnalysis = {
      progress: 60,

      currentImpression: "現在の印象を分析中です。",
      targetImpression,

      summary: {
        headline: "OpenAI接続前のテスト結果です。",
        body: "画像と希望印象をAPIで受け取れる状態まで実装できています。",
      },

      hair: {
        observation: "テスト",
        advice: "テスト",
      },

      eyebrows: {
        observation: "テスト",
        advice: "テスト",
      },

      skin: {
        observation: "テスト",
        advice: "テスト",
      },

      grooming: {
        observation: "テスト",
        advice: "テスト",
      },

      priorities: [
        {
          rank: 1,
          title: "テスト1",
          description: "テスト",
        },
        {
          rank: 2,
          title: "テスト2",
          description: "テスト",
        },
        {
          rank: 3,
          title: "テスト3",
          description: "テスト",
        },
      ],

      afterDirection: {
        hair: "テスト",
        eyebrows: "テスト",
        skin: "テスト",
        grooming: "テスト",
        styling: "テスト",
      },
    };

    return NextResponse.json(testResult, {
      status: 200,
    });
  } catch (error) {
    console.error("Analyze API error:", error);

    return NextResponse.json(
      {
        error: "診断処理中にエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}