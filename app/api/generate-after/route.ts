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

const AFTER_SIGNED_URL_SECONDS =
  60 * 60;

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

type ParsedImage = {
  mimeType: string;
  extension: "jpg" | "png" | "webp";
  buffer: Buffer;
};

function normalizeImageMimeType(
  mimeType: string,
) {
  const normalized =
    mimeType
      .split(";")[0]
      .trim()
      .toLowerCase();

  if (
    normalized === "image/jpeg" ||
    normalized === "image/jpg"
  ) {
    return {
      mimeType: "image/jpeg",
      extension: "jpg" as const,
    };
  }

  if (
    normalized === "image/png"
  ) {
    return {
      mimeType: "image/png",
      extension: "png" as const,
    };
  }

  if (
    normalized === "image/webp"
  ) {
    return {
      mimeType: "image/webp",
      extension: "webp" as const,
    };
  }

  return null;
}

function parseDataUrl(
  imageSource: string,
): ParsedImage | null {
  const match =
    imageSource.match(
      /^data:([^;,]+);base64,([\s\S]+)$/,
    );

  if (!match) {
    return null;
  }

  const imageType =
    normalizeImageMimeType(
      match[1],
    );

  if (!imageType) {
    throw new Error(
      "対応していない画像形式です。JPEG・PNG・WebP形式の画像をご利用ください。",
    );
  }

  const base64 =
    match[2].replace(
      /\s/g,
      "",
    );

  const buffer =
    Buffer.from(
      base64,
      "base64",
    );

  if (
    buffer.length === 0
  ) {
    throw new Error(
      "画像データを読み込めませんでした。",
    );
  }

  return {
    mimeType:
      imageType.mimeType,
    extension:
      imageType.extension,
    buffer,
  };
}

async function fetchRemoteImage(
  imageUrl: string,
): Promise<ParsedImage> {
  let parsedUrl: URL;

  try {
    parsedUrl =
      new URL(imageUrl);
  } catch {
    throw new Error(
      "画像データの形式が正しくありません。",
    );
  }

  if (
    parsedUrl.protocol !==
      "https:" &&
    parsedUrl.protocol !==
      "http:"
  ) {
    throw new Error(
      "画像データの形式が正しくありません。",
    );
  }

  const response =
    await fetch(
      imageUrl,
      {
        cache: "no-store",
      },
    );

  if (!response.ok) {
    throw new Error(
      "元画像を取得できませんでした。",
    );
  }

  const contentType =
    response.headers.get(
      "content-type",
    ) ?? "";

  const imageType =
    normalizeImageMimeType(
      contentType,
    );

  if (!imageType) {
    throw new Error(
      "対応していない画像形式です。JPEG・PNG・WebP形式の画像をご利用ください。",
    );
  }

  const arrayBuffer =
    await response.arrayBuffer();

  const buffer =
    Buffer.from(
      arrayBuffer,
    );

  if (
    buffer.length === 0
  ) {
    throw new Error(
      "元画像を取得できませんでした。",
    );
  }

  return {
    mimeType:
      imageType.mimeType,
    extension:
      imageType.extension,
    buffer,
  };
}

async function parseImageSource(
  imageSource: string,
): Promise<ParsedImage> {
  const dataUrlImage =
    parseDataUrl(
      imageSource,
    );

  if (dataUrlImage) {
    return dataUrlImage;
  }

  if (
    imageSource.startsWith(
      "https://",
    ) ||
    imageSource.startsWith(
      "http://",
    )
  ) {
    return fetchRemoteImage(
      imageSource,
    );
  }

  throw new Error(
    "画像データの形式が正しくありません。",
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    /*
     * After画像生成はコストが発生するため、
     * ログインユーザーのみ許可します。
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
     * 極端に大きなリクエストを防止します。
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

    const imageSource =
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

    if (!imageSource) {
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
     * ログインユーザー本人の診断か確認します。
     */
    const {
      data: diagnosis,
      error: diagnosisError,
    } =
      await supabase
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
     * すでにAfter画像が保存されている場合は、
     * OpenAIで再生成せずStorageの画像を再利用します。
     */
    if (
      diagnosis.after_image_path
    ) {
      const {
        data: signedData,
        error: signedError,
      } =
        await supabase.storage
          .from(
            DIAGNOSIS_IMAGE_BUCKET,
          )
          .createSignedUrl(
            diagnosis.after_image_path,
            AFTER_SIGNED_URL_SECONDS,
          );

      if (
        !signedError &&
        signedData?.signedUrl
      ) {
        console.log(
          "[AKANUKE.AI] 保存済みAfter画像を再利用:",
          {
            userId:
              user.id,
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

      console.error(
        "[AKANUKE.AI] 保存済みAfter画像の取得に失敗:",
        signedError,
      );
    }

    /*
     * 新規診断ではData URL、
     * 履歴では署名URLが入る可能性があるため
     * 両方に対応します。
     */
    const {
      mimeType,
      extension,
      buffer,
    } =
      await parseImageSource(
        imageSource,
      );

    const imageArrayBuffer =
      new ArrayBuffer(
        buffer.byteLength,
      );

    const imageBytes =
      new Uint8Array(
        imageArrayBuffer,
      );

    imageBytes.set(
      buffer,
    );

    const imageBlob =
      new Blob(
        [imageArrayBuffer],
        {
          type: mimeType,
        },
      );

    const formData =
      new FormData();

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

    formData.append(
      "quality",
      "medium",
    );

    formData.append(
      "size",
      "1024x1536",
    );

    formData.append(
      "output_format",
      "webp",
    );

    console.log(
      "[AKANUKE.AI] After画像生成を開始します",
      {
        userId:
          user.id,
        diagnosisId,
        inputMimeType:
          mimeType,
        inputBytes:
          buffer.byteLength,
      },
    );

    const generationStartedAt =
      Date.now();

    /*
     * OpenAIでAfter画像を生成します。
     *
     * ここはVercelのmaxDuration=60秒以内に
     * 完了する必要があります。
     */
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

    const generationDurationMs =
      Date.now() -
      generationStartedAt;

    /*
     * OpenAIから受け取ったBase64を
     * WebPバイナリへ変換します。
     */
    const afterBuffer =
      Buffer.from(
        base64Image,
        "base64",
      );

    if (
      afterBuffer.byteLength === 0
    ) {
      throw new Error(
        "生成されたAfter画像を読み込めませんでした。",
      );
    }

    console.log(
      "[AKANUKE.AI] After画像生成が完了しました:",
      {
        userId:
          user.id,
        diagnosisId,
        durationMs:
          generationDurationMs,
        outputBytes:
          afterBuffer.byteLength,
      },
    );

    /*
     * ユーザー単位・診断単位で
     * After画像をStorageへ永続保存します。
     */
    const afterImagePath =
      `${user.id}/${diagnosisId}/after.webp`;

    const {
      error: uploadError,
    } =
      await supabase.storage
        .from(
          DIAGNOSIS_IMAGE_BUCKET,
        )
        .upload(
          afterImagePath,
          afterBuffer,
          {
            contentType:
              "image/webp",
            upsert: true,
          },
        );

    if (uploadError) {
      console.error(
        "[AKANUKE.AI] After画像Storage保存エラー:",
        uploadError,
      );

      throw new Error(
        "After画像の保存に失敗しました。",
      );
    }

    /*
     * diagnosesテーブルへStorageパスを保存します。
     * これにより履歴からAfterを再表示できます。
     */
    const {
      error: updateError,
    } =
      await supabase
        .from("diagnoses")
        .update({
          after_image_path:
            afterImagePath,
        })
        .eq(
          "id",
          diagnosisId,
        )
        .eq(
          "user_id",
          user.id,
        );

    if (updateError) {
      console.error(
        "[AKANUKE.AI] After画像パスDB保存エラー:",
        updateError,
      );

      /*
       * DB保存に失敗した場合は、
       * 孤立したStorageファイルを残さないよう削除します。
       */
      const {
        error: cleanupError,
      } =
        await supabase.storage
          .from(
            DIAGNOSIS_IMAGE_BUCKET,
          )
          .remove([
            afterImagePath,
          ]);

      if (cleanupError) {
        console.error(
          "[AKANUKE.AI] After画像クリーンアップエラー:",
          cleanupError,
        );
      }

      throw new Error(
        "After画像の保存情報を更新できませんでした。",
      );
    }

    /*
     * 非公開Bucketなので、
     * ブラウザ表示用の署名URLを発行します。
     */
    const {
      data: signedData,
      error: signedError,
    } =
      await supabase.storage
        .from(
          DIAGNOSIS_IMAGE_BUCKET,
        )
        .createSignedUrl(
          afterImagePath,
          AFTER_SIGNED_URL_SECONDS,
        );

    if (
      signedError ||
      !signedData?.signedUrl
    ) {
      console.error(
        "[AKANUKE.AI] After画像署名URL生成エラー:",
        signedError,
      );

      throw new Error(
        "After画像の表示URLを作成できませんでした。",
      );
    }

    console.log(
      "[AKANUKE.AI] After画像の保存が完了しました:",
      {
        userId:
          user.id,
        diagnosisId,
        afterImagePath,
      },
    );

    /*
     * 巨大なBase64画像は返さず、
     * 軽量な署名URLだけをブラウザへ返します。
     */
    return NextResponse.json(
      {
        afterImageUrl:
          signedData.signedUrl,
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