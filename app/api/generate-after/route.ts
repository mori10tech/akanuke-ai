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
  createAdminClient,
} from "../../../lib/supabase/admin";

import {
  DIAGNOSIS_IMAGE_BUCKET,
} from "../../../lib/diagnoses/images";

import {
  isAkanukeAnalysis,
} from "../../../lib/diagnoses/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_REQUEST_BYTES =
  14 * 1024 * 1024;

const AFTER_SIGNED_URL_SECONDS =
  60 * 60;

const OPENAI_IMAGE_ENDPOINT =
  "https://api.openai.com/v1/images/edits";

const OPENAI_MAX_ATTEMPTS = 2;

const OPENAI_RETRY_DELAY_MS =
  1200;

const OPENAI_RETRY_START_LIMIT_MS =
  12_000;

const AFTER_RATE_LIMIT_REQUESTS =
  5;

const AFTER_RATE_LIMIT_WINDOW_SECONDS =
  60;  

const RETRYABLE_OPENAI_STATUSES =
  new Set([
    429,
    500,
    502,
    503,
    504,
  ]);

type GenerateAfterRequestBody = {
  diagnosisId?: string;
};

type OpenAIImageResponse = {
  data?: Array<{
    b64_json?: string;
  }>;
  error?: {
    message?: string;
  };
};

type OpenAIImageGenerationResult = {
  data: OpenAIImageResponse;
  attempt: number;
};

type AfterGenerationUsageClaim = {
  allowed: boolean;
  exempt: boolean;
  used: number;
  remaining: number;
  resets_at: string;
};

type ApiRateLimitRow = {
  allowed: boolean;
  used: number;
  remaining: number;
  retry_after_seconds: number;
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

  if (normalized === "image/png") {
    return {
      mimeType: "image/png",
      extension: "png" as const,
    };
  }

  if (normalized === "image/webp") {
    return {
      mimeType: "image/webp",
      extension: "webp" as const,
    };
  }

  return null;
}

function wait(
  milliseconds: number,
) {
  return new Promise<void>(
    (resolve) => {
      setTimeout(
        resolve,
        milliseconds,
      );
    },
  );
}

function createOpenAIFormData({
  buffer,
  mimeType,
  extension,
  analysis,
}: {
  buffer: Buffer;
  mimeType: string;
  extension:
    | "jpg"
    | "png"
    | "webp";
  analysis: AkanukeAnalysis;
}) {
  const imageArrayBuffer =
    new ArrayBuffer(
      buffer.byteLength,
    );

  const imageBytes =
    new Uint8Array(
      imageArrayBuffer,
    );

  imageBytes.set(buffer);

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

  return formData;
}

async function readOpenAIResponse(
  response: Response,
): Promise<OpenAIImageResponse> {
  const responseText =
    await response.text();

  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(
      responseText,
    ) as OpenAIImageResponse;
  } catch {
    return {
      error: {
        message:
          response.ok
            ? "OpenAIから画像生成結果を読み込めませんでした。"
            : `OpenAI画像生成APIでエラーが発生しました。（HTTP ${response.status}）`,
      },
    };
  }
}

async function generateAfterWithRetry({
  apiKey,
  buffer,
  mimeType,
  extension,
  analysis,
  userId,
  diagnosisId,
}: {
  apiKey: string;
  buffer: Buffer;
  mimeType: string;
  extension:
    | "jpg"
    | "png"
    | "webp";
  analysis: AkanukeAnalysis;
  userId: string;
  diagnosisId: string;
}): Promise<OpenAIImageGenerationResult> {
  const retryWindowStartedAt =
    Date.now();

  for (
    let attempt = 1;
    attempt <= OPENAI_MAX_ATTEMPTS;
    attempt += 1
  ) {
    const attemptStartedAt =
      Date.now();

    console.log(
      "[AKANUKE.AI] OpenAI After画像生成リクエスト:",
      {
        userId,
        diagnosisId,
        attempt,
        maxAttempts:
          OPENAI_MAX_ATTEMPTS,
      },
    );

    const formData =
      createOpenAIFormData({
        buffer,
        mimeType,
        extension,
        analysis,
      });

    let response: Response;

    try {
      response =
        await fetch(
          OPENAI_IMAGE_ENDPOINT,
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${apiKey}`,
            },
            body: formData,
          },
        );
    } catch (error) {
      const elapsedMs =
        Date.now() -
        retryWindowStartedAt;

      const canRetry =
        attempt <
          OPENAI_MAX_ATTEMPTS &&
        elapsedMs <
          OPENAI_RETRY_START_LIMIT_MS;

      console.error(
        "[AKANUKE.AI] OpenAI After画像生成通信エラー:",
        {
          userId,
          diagnosisId,
          attempt,
          elapsedMs,
          canRetry,
          error,
        },
      );

      if (!canRetry) {
        throw error;
      }

      console.warn(
        "[AKANUKE.AI] OpenAI一時通信エラーのためAfter生成を自動再試行します:",
        {
          userId,
          diagnosisId,
          nextAttempt:
            attempt + 1,
          retryAfterMs:
            OPENAI_RETRY_DELAY_MS,
        },
      );

      await wait(
        OPENAI_RETRY_DELAY_MS,
      );

      continue;
    }

    const data =
      await readOpenAIResponse(
        response,
      );

    const attemptDurationMs =
      Date.now() -
      attemptStartedAt;

    if (response.ok) {
      console.log(
        "[AKANUKE.AI] OpenAI After画像生成リクエスト成功:",
        {
          userId,
          diagnosisId,
          attempt,
          durationMs:
            attemptDurationMs,
        },
      );

      return {
        data,
        attempt,
      };
    }

    const elapsedMs =
      Date.now() -
      retryWindowStartedAt;

    const isRetryableStatus =
      RETRYABLE_OPENAI_STATUSES.has(
        response.status,
      );

    const canRetry =
      isRetryableStatus &&
      attempt <
        OPENAI_MAX_ATTEMPTS &&
      elapsedMs <
        OPENAI_RETRY_START_LIMIT_MS;

    console.error(
      "[AKANUKE.AI] After image OpenAI error:",
      {
        userId,
        diagnosisId,
        attempt,
        status:
          response.status,
        durationMs:
          attemptDurationMs,
        elapsedMs,
        isRetryableStatus,
        canRetry,
        error:
          data.error,
      },
    );

    if (!canRetry) {
      throw new Error(
        data.error?.message ??
          `After画像を生成できませんでした。（HTTP ${response.status}）`,
      );
    }

    console.warn(
      "[AKANUKE.AI] OpenAI一時エラーのためAfter生成を自動再試行します:",
      {
        userId,
        diagnosisId,
        status:
          response.status,
        nextAttempt:
          attempt + 1,
        retryAfterMs:
          OPENAI_RETRY_DELAY_MS,
      },
    );

    await wait(
      OPENAI_RETRY_DELAY_MS,
    );
  }

  throw new Error(
    "After画像を生成できませんでした。",
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

    const adminClient =
      createAdminClient();

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
            "After画像を生成できませんでした。",
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

    /*
     * 必ず本人の診断だけを取得します。
     * analysis / Before画像パスはクライアントから受け取りません。
     */
    const {
      data: diagnosis,
      error: diagnosisError,
    } =
      await supabase
        .from("diagnoses")
        .select(
          "id, analysis, before_image_path, after_image_path",
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

    if (
      !isAkanukeAnalysis(
        diagnosis.analysis,
      )
    ) {
      console.error(
        "[AKANUKE.AI] After生成対象の診断データ形式が不正です:",
        {
          userId:
            user.id,
          diagnosisId,
        },
      );

      return NextResponse.json(
        {
          error:
            "After生成に使用する診断結果を確認できませんでした。",
        },
        {
          status: 422,
        },
      );
    }

    const analysis =
      diagnosis.analysis;

    if (
      !diagnosis.before_image_path
    ) {
      return NextResponse.json(
        {
          error:
            "After生成に使用する元画像を確認できませんでした。",
        },
        {
          status: 422,
        },
      );
    }

    /*
     * 保存済みAfterがある場合は最優先で再利用します。
     *
     * この処理を回数枠確保より先に行うことで、
     * 結果画面の再表示では利用回数を消費しません。
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

      /*
       * DBにAfterパスがあるのにStorageから取得できない場合、
       * 勝手に再生成すると追加課金につながるためfail-closedにします。
       */
      console.error(
        "[AKANUKE.AI] 保存済みAfter画像の取得に失敗:",
        signedError,
      );

      return NextResponse.json(
        {
          error:
            "保存済みのAfter画像を取得できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

/*
     * =====================================================
     * APIレート制限
     * =====================================================
     *
     * 保存済みAfterの再表示ではなく、
     * 新しくAfterを生成する場合だけ
     * 短時間のAPI連打を制限します。
     */
    const {
      data: rateRows,
      error: rateError,
    } =
      await adminClient.rpc(
        "claim_api_rate_limit",
        {
          p_rate_key:
            `generate-after:user:${user.id}`,
          p_limit:
            AFTER_RATE_LIMIT_REQUESTS,
          p_window_seconds:
            AFTER_RATE_LIMIT_WINDOW_SECONDS,
        },
      );

    if (rateError) {
      console.error(
        "[AKANUKE.AI] After生成レート制限確認エラー:",
        {
          userId:
            user.id,
          diagnosisId,
          error:
            rateError,
        },
      );

      return NextResponse.json(
        {
          error:
            "After画像の生成準備に失敗しました。時間をおいてもう一度お試しください。",
          code:
            "RATE_LIMIT_CHECK_FAILED",
        },
        {
          status: 503,
        },
      );
    }

    const rate =
      Array.isArray(rateRows)
        ? (
            rateRows[0] as
              | ApiRateLimitRow
              | undefined
          )
        : undefined;

    if (
      !rate ||
      typeof rate.allowed !==
        "boolean" ||
      typeof rate.used !==
        "number" ||
      typeof rate.remaining !==
        "number" ||
      typeof rate.retry_after_seconds !==
        "number"
    ) {
      console.error(
        "[AKANUKE.AI] After生成レート制限レスポンス形式が不正です:",
        {
          userId:
            user.id,
          diagnosisId,
          rateRows,
        },
      );

      return NextResponse.json(
        {
          error:
            "After画像の生成準備に失敗しました。時間をおいてもう一度お試しください。",
          code:
            "RATE_LIMIT_CHECK_FAILED",
        },
        {
          status: 503,
        },
      );
    }

    if (!rate.allowed) {
      console.warn(
        "[AKANUKE.AI] After生成レート制限に到達:",
        {
          userId:
            user.id,
          diagnosisId,
          used:
            rate.used,
          remaining:
            rate.remaining,
        },
      );

      return NextResponse.json(
        {
          error:
            "短時間にAfter画像生成リクエストが集中しています。少し待ってからもう一度お試しください。",
          code:
            "RATE_LIMIT_REACHED",
        },
        {
          status: 429,
          headers: {
            "Retry-After":
              String(
                rate.retry_after_seconds,
              ),
          },
        },
      );
    }  

    /*
     * Before画像が実際に取得可能か確認してから
     * 有料のAfter生成枠を確保します。
     */
    const {
      data: beforeImageBlob,
      error: beforeImageError,
    } =
      await supabase.storage
        .from(
          DIAGNOSIS_IMAGE_BUCKET,
        )
        .download(
          diagnosis.before_image_path,
        );

    if (
      beforeImageError ||
      !beforeImageBlob
    ) {
      console.error(
        "[AKANUKE.AI] Before画像取得エラー:",
        beforeImageError,
      );

      return NextResponse.json(
        {
          error:
            "After生成に使用する元画像を取得できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    const mimeType =
      beforeImageBlob.type ||
      "image/jpeg";

    const imageType =
      normalizeImageMimeType(
        mimeType,
      );

    if (!imageType) {
      return NextResponse.json(
        {
          error:
            "保存されている元画像の形式に対応していません。",
        },
        {
          status: 422,
        },
      );
    }

    const beforeArrayBuffer =
      await beforeImageBlob.arrayBuffer();

    const buffer =
      Buffer.from(
        beforeArrayBuffer,
      );

    if (
      buffer.byteLength === 0
    ) {
      return NextResponse.json(
        {
          error:
            "After生成に使用する元画像を読み込めませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    const extension =
      imageType.extension;

    /*
     * =====================================================
     * After生成枠をDBで原子的に確保
     * =====================================================
     *
     * RPC失敗時はOpenAIを呼びません。
     * 制限処理が壊れた際に課金だけ発生することを防ぎます。
     */
    const {
      data: usageRows,
      error: usageError,
    } =
      await supabase.rpc(
        "claim_after_generation_usage",
        {
          p_diagnosis_id:
            diagnosisId,
        },
      );

    if (usageError) {
      console.error(
        "[AKANUKE.AI] After生成利用枠の確保に失敗:",
        {
          userId:
            user.id,
          diagnosisId,
          error:
            usageError,
        },
      );

      return NextResponse.json(
        {
          error:
            "After画像の生成準備に失敗しました。時間をおいてもう一度お試しください。",
          code:
            "AFTER_USAGE_CHECK_FAILED",
        },
        {
          status: 503,
        },
      );
    }

    const usage =
      Array.isArray(usageRows)
        ? (
            usageRows[0] as
              | AfterGenerationUsageClaim
              | undefined
          )
        : undefined;

    if (!usage) {
      console.error(
        "[AKANUKE.AI] After生成利用枠の結果が空です:",
        {
          userId:
            user.id,
          diagnosisId,
        },
      );

      return NextResponse.json(
        {
          error:
            "After画像の生成準備に失敗しました。時間をおいてもう一度お試しください。",
          code:
            "AFTER_USAGE_CHECK_FAILED",
        },
        {
          status: 503,
        },
      );
    }

    if (!usage.allowed) {
      console.warn(
        "[AKANUKE.AI] After生成上限に到達:",
        {
          userId:
            user.id,
          diagnosisId,
          used:
            usage.used,
          remaining:
            usage.remaining,
          resetsAt:
            usage.resets_at,
        },
      );

      return NextResponse.json(
        {
          error:
            "今月のAfter画像生成回数の上限に達しました。",
          code:
            "AFTER_GENERATION_LIMIT_REACHED",
          used:
            usage.used,
          remaining:
            usage.remaining,
          resetsAt:
            usage.resets_at,
        },
        {
          status: 429,
        },
      );
    }

    console.log(
      "[AKANUKE.AI] After生成利用枠を確保:",
      {
        userId:
          user.id,
        diagnosisId,
        exempt:
          usage.exempt,
        used:
          usage.used,
        remaining:
          usage.remaining,
      },
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
        quality:
          "medium",
      },
    );

    const generationStartedAt =
      Date.now();

    const {
      data,
      attempt:
        successfulAttempt,
    } =
      await generateAfterWithRetry(
        {
          apiKey,
          buffer,
          mimeType,
          extension,
          analysis,
          userId:
            user.id,
          diagnosisId,
        },
      );

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
        successfulAttempt,
        durationMs:
          generationDurationMs,
        outputBytes:
          afterBuffer.byteLength,
      },
    );

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

    const {
      error: updateError,
    } =
      await adminClient
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

    /*
     * OpenAI等の内部エラーメッセージは
     * 本番ブラウザへそのまま返しません。
     */
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV ===
            "development" &&
          error instanceof Error
            ? error.message
            : "After画像の生成中にエラーが発生しました。時間をおいてもう一度お試しください。",
      },
      {
        status: 500,
      },
    );
  }
}