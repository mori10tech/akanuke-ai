import OpenAI from "openai";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createClient,
} from "../../../lib/supabase/server";

import {
  createAdminClient,
} from "../../../lib/supabase/admin";

import {
  ANALYSIS_SYSTEM_PROMPT,
} from "../../../lib/openai/prompts";

import {
  akanukeAnalysisJsonSchema,
  type AkanukeAnalysis,
} from "../../../lib/openai/schemas";

import {
  DIAGNOSIS_IMAGE_BUCKET,
  parseImageDataUrl,
} from "../../../lib/diagnoses/images";

import {
  isAkanukeAnalysis,
} from "../../../lib/diagnoses/types";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES =
  14 * 1024 * 1024;

const MAX_ANALYSIS_BYTES =
  100_000;

const MAX_SAVED_DIAGNOSES =
  3;

const MONTHLY_DIAGNOSIS_LIMIT =
  3;

const ANALYZE_RATE_LIMIT_REQUESTS =
  5;

const ANALYZE_RATE_LIMIT_WINDOW_SECONDS =
  60;

const ALLOWED_IMPRESSION_LABELS:
  readonly string[] = [
    "爽やか",
    "大人っぽい",
    "清潔感",
    "異性ウケ",
    "ビジネス向き",
    "韓国系",
    "男らしい",
    "優しそう",
    "知的・スマート",
  ];

const AI_RECOMMENDED_TARGET =
  "AIにおまかせ。写真から本人に似合う垢抜け方向を判断してください。";

function isAllowedTargetImpression(
  value: string,
) {
  if (
    value ===
    AI_RECOMMENDED_TARGET
  ) {
    return true;
  }

  const labels =
    value.split("・");

  if (
    labels.length < 1 ||
    labels.length > 2
  ) {
    return false;
  }

  const uniqueLabels =
    new Set(labels);

  if (
    uniqueLabels.size !==
    labels.length
  ) {
    return false;
  }

  return labels.every(
    (label) =>
      ALLOWED_IMPRESSION_LABELS.includes(
        label,
      ),
  );
}  

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

type ApiRateLimitRow = {
  allowed: boolean;
  used: number;
  remaining: number;
  retry_after_seconds: number;
};

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

export async function POST(
  request: NextRequest,
) {
  const startedAt =
    Date.now();

  try {
    /*
     * =====================================================
     * 認証
     * =====================================================
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
     * =====================================================
     * リクエストサイズ確認
     * =====================================================
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

    /*
     * APIキー設定不備では
     * 診断回数を消費させません。
     */
    if (
      !process.env
        .OPENAI_API_KEY
    ) {
      return NextResponse.json(
        {
          error:
            "AI診断を開始できませんでした。",
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
 * 月3回制限とは別に、
 * 短時間のAPI連打を防止します。
 */
const {
  data: rateRows,
  error: rateError,
} =
  await adminClient.rpc(
    "claim_api_rate_limit",
    {
      p_rate_key:
        `analyze:user:${user.id}`,
      p_limit:
        ANALYZE_RATE_LIMIT_REQUESTS,
      p_window_seconds:
        ANALYZE_RATE_LIMIT_WINDOW_SECONDS,
    },
  );

if (rateError) {
  console.error(
    "[AKANUKE.AI] AI診断レート制限確認エラー:",
    {
      userId:
        user.id,
      error:
        rateError,
    },
  );

  return NextResponse.json(
    {
      error:
        "AI診断の利用状況を確認できませんでした。時間をおいて再度お試しください。",
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
    "[AKANUKE.AI] AI診断レート制限レスポンス形式が不正です:",
    {
      userId:
        user.id,
      rateRows,
    },
  );

  return NextResponse.json(
    {
      error:
        "AI診断の利用状況を確認できませんでした。時間をおいて再度お試しください。",
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
    "[AKANUKE.AI] AI診断レート制限に到達:",
    {
      userId:
        user.id,
      used:
        rate.used,
      remaining:
        rate.remaining,
    },
  );

  return NextResponse.json(
    {
      error:
        "短時間に診断リクエストが集中しています。少し待ってからもう一度お試しください。",
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

    /*
     * parseImageDataUrl()を使って、
     * JPEG / PNG / WebPかつ既定サイズ内の画像だけ許可します。
     *
     * SVGなどの任意image/*は受け付けません。
     */
    let parsedImage:
      ReturnType<
        typeof parseImageDataUrl
      >;

    try {
      parsedImage =
        parseImageDataUrl(
          imageDataUrl,
        );
    } catch (imageError) {
      console.warn(
        "[AKANUKE.AI] AI診断画像の検証エラー:",
        imageError,
      );

      return NextResponse.json(
        {
          error:
            "画像データの形式またはサイズが正しくありません。",
        },
        {
          status: 400,
        },
      );
    }

    if (
  !targetImpression ||
  !isAllowedTargetImpression(
    targetImpression,
  )
) {
  console.warn(
    "[AKANUKE.AI] 許可されていないなりたい印象を拒否しました:",
    {
      userId: user.id,
      targetImpression:
        targetImpression
          ?.slice(0, 100),
    },
  );

  return NextResponse.json(
    {
      error:
        "なりたい印象の指定が正しくありません。",
    },
    {
      status: 400,
    },
  );
}

    /*
     * =====================================================
     * 月3回の診断枠を原子的に確保
     * =====================================================
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
        ? (
            claimData[0] as
              ClaimDiagnosisUsageRow
          )
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
        userId:
          user.id,
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
     * =====================================================
     * OpenAI診断
     * =====================================================
     */
    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_ANALYSIS_MODEL ??
          "gpt-5.4-nano",

        store: false,

        reasoning: {
          effort:
            "none",
        },

        max_output_tokens:
          2500,

        input: [
          {
            role:
              "system",
            content: [
              {
                type:
                  "input_text",
                text:
                  ANALYSIS_SYSTEM_PROMPT,
              },
            ],
          },

          {
            role:
              "user",
            content: [
              {
                type:
                  "input_text",
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
                type:
                  "input_image",
                image_url:
                  imageDataUrl,
                detail:
                  "auto",
              },
            ],
          },
        ],

        text: {
          format: {
            type:
              "json_schema",
            name:
              "akanuke_analysis",
            strict:
              true,
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
      ) as unknown;

    /*
     * OpenAIレスポンスも実データ検証します。
     */
    if (
      !isAkanukeAnalysis(
        parsed,
      )
    ) {
      throw new Error(
        "AI診断結果の形式が正しくありません。",
      );
    }

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
            ...parsed
              .priorities[0],
            rank: 1,
          },
          {
            ...parsed
              .priorities[1],
            rank: 2,
          },
          {
            ...parsed
              .priorities[2],
            rank: 3,
          },
        ],
      };

    const serializedAnalysis =
      JSON.stringify(
        normalizedResult,
      );

    if (
      serializedAnalysis.length >
      MAX_ANALYSIS_BYTES
    ) {
      throw new Error(
        "AI診断結果のデータサイズが大きすぎます。",
      );
    }

    /*
     * =====================================================
     * 診断結果をサーバー側で直接保存
     * =====================================================
     *
     * クライアントへanalysisを返してから
     * 再POSTさせることはしません。
     */
    const {
      data: diagnosis,
      error: diagnosisError,
    } =
      await adminClient
        .from(
          "diagnoses",
        )
        .insert({
          user_id:
            user.id,

          target_impression:
            normalizedResult
              .targetImpression
              .slice(
                0,
                200,
              ),

          overall_progress:
            normalizedResult
              .progress,

          analysis:
            normalizedResult,
        })
        .select(
          "id",
        )
        .single();

    if (
      diagnosisError ||
      !diagnosis
    ) {
      console.error(
        "[AKANUKE.AI] AI診断結果DB保存エラー:",
        diagnosisError,
      );

      throw new Error(
        "診断結果を保存できませんでした。",
      );
    }

    /*
     * =====================================================
     * Before画像を非公開Storageへ保存
     * =====================================================
     */
    const beforeImagePath =
      `${user.id}/${diagnosis.id}/before.${parsedImage.extension}`;

    const {
      error: beforeUploadError,
    } =
      await adminClient.storage
        .from(
          DIAGNOSIS_IMAGE_BUCKET,
        )
        .upload(
          beforeImagePath,
          parsedImage.buffer,
          {
            contentType:
              parsedImage.contentType,
            cacheControl:
              "3600",
            upsert:
              true,
          },
        );

    if (
      beforeUploadError
    ) {
      console.error(
        "[AKANUKE.AI] Before画像保存エラー:",
        beforeUploadError,
      );

      /*
       * Before画像が保存できない診断は
       * After生成不能になるため、
       * 不完全な診断レコードを残しません。
       */
      const {
        error:
          rollbackDiagnosisError,
      } =
        await adminClient
          .from(
            "diagnoses",
          )
          .delete()
          .eq(
            "id",
            diagnosis.id,
          )
          .eq(
            "user_id",
            user.id,
          );

      if (
        rollbackDiagnosisError
      ) {
        console.error(
          "[AKANUKE.AI] 診断保存ロールバックエラー:",
          rollbackDiagnosisError,
        );
      }

      throw new Error(
        "診断画像を保存できませんでした。",
      );
    }

    const {
      error:
        beforePathUpdateError,
    } =
      await adminClient
        .from(
          "diagnoses",
        )
        .update({
          before_image_path:
            beforeImagePath,
        })
        .eq(
          "id",
          diagnosis.id,
        )
        .eq(
          "user_id",
          user.id,
        );

    if (
      beforePathUpdateError
    ) {
      console.error(
        "[AKANUKE.AI] Before画像パス保存エラー:",
        beforePathUpdateError,
      );

      const {
        error:
          rollbackStorageError,
      } =
        await adminClient.storage
          .from(
            DIAGNOSIS_IMAGE_BUCKET,
          )
          .remove([
            beforeImagePath,
          ]);

      if (
        rollbackStorageError
      ) {
        console.error(
          "[AKANUKE.AI] Before画像ロールバックエラー:",
          rollbackStorageError,
        );
      }

      const {
        error:
          rollbackDiagnosisError,
      } =
        await adminClient
          .from(
            "diagnoses",
          )
          .delete()
          .eq(
            "id",
            diagnosis.id,
          )
          .eq(
            "user_id",
            user.id,
          );

      if (
        rollbackDiagnosisError
      ) {
        console.error(
          "[AKANUKE.AI] 診断保存ロールバックエラー:",
          rollbackDiagnosisError,
        );
      }

      throw new Error(
        "診断結果の保存情報を更新できませんでした。",
      );
    }

    /*
     * =====================================================
     * 最新3件だけ残す
     * =====================================================
     */
    try {
      const {
        data:
          oldDiagnoses,
        error:
          oldDiagnosesError,
      } =
        await adminClient
          .from(
            "diagnoses",
          )
          .select(
            "id, before_image_path, after_image_path, created_at",
          )
          .eq(
            "user_id",
            user.id,
          )
          .order(
            "created_at",
            {
              ascending:
                false,
            },
          )
          .range(
            MAX_SAVED_DIAGNOSES,
            999,
          );

      if (
        oldDiagnosesError
      ) {
        throw oldDiagnosesError;
      }

      if (
        oldDiagnoses &&
        oldDiagnoses.length >
          0
      ) {
        const storagePaths =
          oldDiagnoses.flatMap(
            (
              oldDiagnosis,
            ) => {
              const paths:
                string[] = [];

              if (
                oldDiagnosis
                  .before_image_path
              ) {
                paths.push(
                  oldDiagnosis
                    .before_image_path,
                );
              }

              if (
                oldDiagnosis
                  .after_image_path
              ) {
                paths.push(
                  oldDiagnosis
                    .after_image_path,
                );
              }

              return paths;
            },
          );

        if (
          storagePaths.length >
          0
        ) {
          const {
            error:
              storageDeleteError,
          } =
            await adminClient
              .storage
              .from(
                DIAGNOSIS_IMAGE_BUCKET,
              )
              .remove(
                storagePaths,
              );

          if (
            storageDeleteError
          ) {
            console.error(
              "[AKANUKE.AI] 古い診断画像の削除に失敗:",
              storageDeleteError,
            );
          }
        }

        const oldDiagnosisIds =
          oldDiagnoses.map(
            (
              oldDiagnosis,
            ) =>
              oldDiagnosis.id,
          );

        const {
          error:
            diagnosisDeleteError,
        } =
          await adminClient
            .from(
              "diagnoses",
            )
            .delete()
            .eq(
              "user_id",
              user.id,
            )
            .in(
              "id",
              oldDiagnosisIds,
            );

        if (
          diagnosisDeleteError
        ) {
          throw diagnosisDeleteError;
        }
      }
    } catch (
      cleanupError
    ) {
      /*
       * 最新診断自体は正常保存されているため、
       * 古い履歴整理の失敗で診断全体を失敗扱いにしません。
       */
      console.error(
        "[AKANUKE.AI] 古い診断履歴の整理に失敗:",
        cleanupError,
      );
    }

    const durationMs =
      Date.now() -
      startedAt;

    console.log(
      "[AKANUKE.AI] AI診断完了:",
      {
        userId:
          user.id,
        diagnosisId:
          diagnosis.id,
        durationMs,
        used:
          claim.used,
        remaining:
          claim.remaining,
        exempt:
          claim.exempt,
      },
    );

    /*
     * Result表示用analysisと、
     * サーバーが作成したdiagnosisIdのみ返します。
     */
    return NextResponse.json(
      {
        analysis:
          normalizedResult,

        diagnosisId:
          diagnosis.id,

        beforeImageSaved:
          true,
      },
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