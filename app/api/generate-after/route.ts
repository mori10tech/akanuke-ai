import {
  NextRequest,
  NextResponse,
} from "next/server";

import type {
  AkanukeAnalysis,
} from "../../../lib/openai/schemas";

import {
  createAfterImagePrompt,
} from "../../../lib/openai/afterPrompt";

import {
  createClient,
} from "../../../lib/supabase/server";

import {
  DIAGNOSIS_IMAGE_BUCKET,
} from "../../../lib/diagnoses/images";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_REQUEST_BYTES =
  14 * 1024 * 1024;

type GenerateAfterRequestBody = {
  diagnosisId?: string;
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
    /*
     * After画像生成はOpenAI APIの
     * コストが発生するため、
     * ログイン済みユーザーだけ許可します。
     */
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
            "After画像を生成するにはLINEログインが必要です。",
          code:
            "AUTHENTICATION_REQUIRED",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * 極端に大きな画像データが
     * APIへ送信されることを防ぎます。
     */
    const contentLength =
      Number(
        request.headers.get(
          "content-length",
        ) ?? 0,
      );

    if (
      contentLength >
      MAX_REQUEST_BYTES
    ) {
      return NextResponse.json(
        {
          error:
            "画像データのサイズが大きすぎます。",
        },
        {
          status: 413,
        },
      );
    }

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

    const diagnosisId =
      body.diagnosisId?.trim();

    const imageDataUrl =
      body.imageDataUrl?.trim();

    const analysis =
      body.analysis;

    if (!diagnosisId) {
      return NextResponse.json(
        {
          error:
            "診断IDを確認できませんでした。",
        },
        {
          status: 400,
        },
      );
    }

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

    /*
     * diagnosisIdがログインユーザー本人の
     * 診断結果であることを確認します。
     *
     * 同時にafter_image_pathを取得し、
     * すでにAfter画像が保存されている場合は
     * OpenAIを再実行しません。
     */
    const {
      data: diagnosis,
      error: diagnosisError,
    } = await supabase
      .from("diagnoses")
      .select(
        "id, after_image_path",
      )
      .eq(
        "id",
        diagnosisId,
      )
      .eq(
        "user_id",
        user.id,
      )
      .maybeSingle();

    if (
      diagnosisError ||
      !diagnosis
    ) {
      console.error(
        "[AKANUKE.AI] After生成対象の診断取得エラー:",
        diagnosisError,
      );

      return NextResponse.json(
        {
          error:
            "診断結果を確認できませんでした。",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * After画像がすでにStorageへ保存されている場合、
     * 署名付きURLを発行して既存画像を返します。
     *
     * これにより同じ診断に対する
     * OpenAI画像生成の二重課金を防ぎます。
     */
    if (
      diagnosis.after_image_path
    ) {
      const {
        data: signedData,
        error: signedError,
      } = await supabase.storage
        .from(
          DIAGNOSIS_IMAGE_BUCKET,
        )
        .createSignedUrl(
          diagnosis.after_image_path,
          60 * 60,
        );

      if (
        !signedError &&
        signedData?.signedUrl
      ) {
        console.log(
          "[AKANUKE.AI] 保存済みAfter画像を再利用:",
          {
            userId: user.id,
            diagnosisId,
          },
        );

        return NextResponse.json(
          {
            afterImageUrl:
              signedData.signedUrl,
            reused: true,
          },
          {
            status: 200,
          },
        );
      }

      /*
       * DBにはパスがあるもののStorageから
       * 取得できない場合は、画像生成へ進みます。
       */
      console.error(
        "[AKANUKE.AI] 保存済みAfter画像の取得に失敗:",
        signedError,
      );
    }

    const {
      mimeType,
      extension,
      buffer,
    } =
      parseImageDataUrl(
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
      process.env
        .OPENAI_IMAGE_MODEL ??
        "gpt-image-2",
    );

    formData.append(
      "prompt",
      createAfterImagePrompt(
        analysis,
      ),
    );

    /*
     * 品質とコストのバランスを考慮して
     * mediumを使用します。
     */
    formData.append(
      "quality",
      "medium",
    );

    /*
     * Before / After比較用の
     * 縦長画像を生成します。
     */
    formData.append(
      "size",
      "1024x1536",
    );

    /*
     * ブラウザで扱うデータ量を抑えるため
     * WebPを使用します。
     */
    formData.append(
      "output_format",
      "webp",
    );

    console.log(
      "[AKANUKE.AI] After画像生成を開始します",
      {
        userId: user.id,
        diagnosisId,
      },
    );

    const generationStartedAt =
      Date.now();

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

    const generationDurationMs =
      Date.now() -
      generationStartedAt;

    console.log(
      "[AKANUKE.AI] After画像生成が完了しました:",
      {
        userId: user.id,
        diagnosisId,
        durationMs:
          generationDurationMs,
      },
    );

    return NextResponse.json(
      {
        afterImageDataUrl,
        reused: false,
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