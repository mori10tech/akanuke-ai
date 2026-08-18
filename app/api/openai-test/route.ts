import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        message: "OPENAI_API_KEYが設定されていません。",
      },
      {
        status: 500,
      },
    );
  }

  try {
    const openai = new OpenAI({
      apiKey,
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input:
        "「AKANUKE.AIのOpenAI API接続に成功しました」と日本語でそのまま返してください。",
    });

    return NextResponse.json({
      success: true,
      message: response.output_text,
    });
  } catch (error: unknown) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "OpenAI APIへの接続中にエラーが発生しました。";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
