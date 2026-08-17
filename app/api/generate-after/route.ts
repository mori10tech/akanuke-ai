import {
  NextRequest,
  NextResponse,
} from "next/server";

import type { AkanukeAnalysis } from "../../../lib/openai/schemas";
import { createAfterImagePrompt } from "../../../lib/openai/afterPrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

type GenerateAfterRequestBody = {
  imageDataUrl?: string;
  analysis?: AkanukeAnalysis;
};

type OpenAIImageResponse = {
  data?: Array<{
    b64_json?: string;
  }>;
  error?: {
    message?: string;
  };
};

function parseImageDataUrl(
  dataUrl: string,
) {
  const match = dataUrl.match(
    /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/,
  );

  if (!match) {
    throw new Error(
      "対応していない画像形式です。",
    );
  }

  const mimeType = match[1];
  const base64 = match[2];

  const extension =
    mimeType === "image/jpeg"
      ? "jpg"
      : mimeType === "image/png"
        ? "png"
        : "webp";

  return {
    mimeType,
    extension,
    buffer: Buffer.from(
      base64,
      "base64",
    ),
  };
}

export async function POST(
  request: NextRequest,
) {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
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
      (await request.json()) as GenerateAfterRequestBody;

    const imageDataUrl =
      body.imageDataUrl?.trim();

    const analysis =
      body.analysis;

    if (!imageDataUrl) {
      return NextResponse.json(
        {
          error:
            "After生成に使用する元画像がありません。",
        },
        {
          status: 400,
        },
      );
    }

    if (!analysis) {
      return NextResponse.json(
        {
          error:
            "After生成に使用する診断結果がありません。",
        },
        {
          status: 400,
        },
      );
    }

    const {
      mimeType,
      extension,
      buffer,
    } = parseImageDataUrl(
      imageDataUrl,
    );

    const formData =
      new FormData();

    const imageBlob =
      new Blob(
        [buffer],
        {
          type: mimeType,
        },
      );

    formData.append(
      "image",
      imageBlob,
      `before.${extension}`,
    );

    formData.append(
      "model",
      process.env.OPENAI_IMAGE_MODEL ??
        "gpt-image-2",
    );

    formData.append(
      "prompt",
      createAfterImagePrompt(
        analysis,
      ),
    );

    /*
     * 本人らしさを維持することを
     * AKANUKE.AIでは最優先にします。
     */
    formData.append(
      "input_fidelity",
      "high",
    );

    /*
     * 初回検証では品質優先。
     */
    formData.append(
      "quality",
      "high",
    );

    /*
     * 顔写真・Before/After表示に合う
     * 縦長サイズを使用します。
     */
    formData.append(
      "size",
      "1024x1536",
    );

    /*
     * PNGよりデータ量を抑えやすく、
     * ブラウザ表示にも適した形式。
     */
    formData.append(
      "output_format",
      "webp",
    );

    console.log(
      "[AKANUKE.AI] After画像生成を開始します",
    );

    const response =
      await fetch(
        "https://api.openai.com/v1/images/edits",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${apiKey}`,
          },

          body: formData,
        },
      );

    const data =
      (await response.json()) as OpenAIImageResponse;

    if (!response.ok) {
      console.error(
        "[AKANUKE.AI] After image OpenAI error:",
        data,
      );

      throw new Error(
        data.error?.message ??
          "After画像を生成できませんでした。",
      );
    }

    const base64Image =
      data.data?.[0]?.b64_json;

    if (!base64Image) {
      throw new Error(
        "OpenAIからAfter画像が返されませんでした。",
      );
    }

    const afterImageDataUrl =
      `data:image/webp;base64,${base64Image}`;

    console.log(
      "[AKANUKE.AI] After画像生成が完了しました",
    );

    return NextResponse.json(
      {
        afterImageDataUrl,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] Generate After error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "After画像の生成中にエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}