import { createAdminClient } from "../../../lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { isAkanukeAnalysis } from "../../../lib/diagnoses/types";
import {
  DIAGNOSIS_IMAGE_BUCKET,
  parseImageDataUrl,
} from "../../../lib/diagnoses/images";
import { createClient } from "../../../lib/supabase/server";
export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 14 * 1024 * 1024;
const MAX_SAVED_DIAGNOSES = 3;

type CreateDiagnosisRequest = {
  analysis?: unknown;
  beforeImageDataUrl?: string;
};

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(
      request.headers.get("content-length") ?? 0,
    );

    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        {
          error: "診断結果のデータサイズが大きすぎます。",
        },
        {
          status: 413,
        },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "診断結果を保存するにはログインが必要です。",
        },
        {
          status: 401,
        },
      );
    }

    const body =
      (await request.json()) as CreateDiagnosisRequest;

    if (!isAkanukeAnalysis(body.analysis)) {
      return NextResponse.json(
        {
          error:
            "診断結果の形式が正しくありません。",
        },
        {
          status: 400,
        },
      );
    }

    const analysis = body.analysis;
    const serializedAnalysis =
      JSON.stringify(analysis);

    if (serializedAnalysis.length > 100_000) {
      return NextResponse.json(
        {
          error:
            "診断結果のデータサイズが大きすぎます。",
        },
        {
          status: 413,
        },
      );
    }

    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        user_id: user.id,
        target_impression:
          analysis.targetImpression.slice(
            0,
            200,
          ),
        overall_progress: Math.round(
          analysis.progress,
        ),
        analysis,
      })
      .select("id")
      .single();

    if (error) {
      console.error(
        "[AKANUKE.AI] 診断結果の保存に失敗:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "診断結果を保存できませんでした。",
        },
        {
          status: 500,
        },
      );
    }

    let beforeImagePath: string | null =
      null;

    if (body.beforeImageDataUrl) {
      try {
        const image =
          parseImageDataUrl(
            body.beforeImageDataUrl,
          );

        beforeImagePath =
          `${user.id}/${data.id}/before.${image.extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from(
              DIAGNOSIS_IMAGE_BUCKET,
            )
            .upload(
              beforeImagePath,
              image.buffer,
              {
                contentType:
                  image.contentType,
                cacheControl: "3600",
                upsert: true,
              },
            );

        if (uploadError) {
          throw uploadError;
        }

        const { error: updateError } =
          await supabase
            .from("diagnoses")
            .update({
              before_image_path:
                beforeImagePath,
            })
            .eq("id", data.id)
            .eq("user_id", user.id);

        if (updateError) {
          throw updateError;
        }
      } catch (imageError) {
        beforeImagePath = null;

        console.error(
          "[AKANUKE.AI] Before画像の保存に失敗:",
          imageError,
        );
      }
    }

    /*
 * 最新3件だけ残し、
 * 4件目以降の診断と画像を削除します。
 */
try {
  const adminClient =
    createAdminClient();

  const {
    data: oldDiagnoses,
    error: oldDiagnosesError,
  } = await adminClient
    .from("diagnoses")
    .select(
      "id, before_image_path, after_image_path, created_at",
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    })
    .range(
      MAX_SAVED_DIAGNOSES,
      999,
    );

  if (oldDiagnosesError) {
    throw oldDiagnosesError;
  }

  if (
    oldDiagnoses &&
    oldDiagnoses.length > 0
  ) {
    const storagePaths =
      oldDiagnoses.flatMap(
        (diagnosis) => {
          const paths: string[] = [];

          if (
            diagnosis.before_image_path
          ) {
            paths.push(
              diagnosis.before_image_path,
            );
          }

          if (
            diagnosis.after_image_path
          ) {
            paths.push(
              diagnosis.after_image_path,
            );
          }

          return paths;
        },
      );

    if (storagePaths.length > 0) {
      const {
        error: storageDeleteError,
      } = await adminClient.storage
        .from(
          DIAGNOSIS_IMAGE_BUCKET,
        )
        .remove(storagePaths);

      if (storageDeleteError) {
        console.error(
          "[AKANUKE.AI] 古い診断画像の削除に失敗:",
          storageDeleteError,
        );
      }
    }

    const oldDiagnosisIds =
      oldDiagnoses.map(
        (diagnosis) =>
          diagnosis.id,
      );

    const {
      error: diagnosisDeleteError,
    } = await adminClient
      .from("diagnoses")
      .delete()
      .eq("user_id", user.id)
      .in(
        "id",
        oldDiagnosisIds,
      );

    if (diagnosisDeleteError) {
      throw diagnosisDeleteError;
    }

    console.log(
      "[AKANUKE.AI] 古い診断履歴を削除:",
      {
        userId: user.id,
        deletedCount:
          oldDiagnosisIds.length,
      },
    );
  }
} catch (cleanupError) {
  /*
   * 新しい診断自体は保存できているため、
   * 古い履歴の削除失敗だけで
   * 診断全体を失敗扱いにはしません。
   */
  console.error(
    "[AKANUKE.AI] 古い診断履歴の整理に失敗:",
    cleanupError,
  );
}

return NextResponse.json(
  {
    id: data.id,
    saved: true,
    beforeImageSaved:
      Boolean(beforeImagePath),
  },
  {
    status: 201,
  },
);
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 診断結果保存APIエラー:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "診断結果の保存中にエラーが発生しました。",
      },
      {
        status: 500,
      },
    );
  }
}