import { NextRequest, NextResponse } from "next/server";
import { isAkanukeAnalysis } from "../../../lib/diagnoses/types";
import {
  DIAGNOSIS_IMAGE_BUCKET,
  parseImageDataUrl,
} from "../../../lib/diagnoses/images";
import { createClient } from "../../../lib/supabase/server";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 14 * 1024 * 1024;

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
        { error: "診断結果のデータサイズが大きすぎます。" },
        { status: 413 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "診断結果を保存するにはログインが必要です。" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as CreateDiagnosisRequest;

    if (!isAkanukeAnalysis(body.analysis)) {
      return NextResponse.json(
        { error: "診断結果の形式が正しくありません。" },
        { status: 400 },
      );
    }

    const analysis = body.analysis;
    const serializedAnalysis = JSON.stringify(analysis);

    if (serializedAnalysis.length > 100_000) {
      return NextResponse.json(
        { error: "診断結果のデータサイズが大きすぎます。" },
        { status: 413 },
      );
    }

    const { data, error } = await supabase
      .from("diagnoses")
      .insert({
        user_id: user.id,
        target_impression: analysis.targetImpression.slice(0, 200),
        overall_progress: Math.round(analysis.progress),
        analysis,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[AKANUKE.AI] 診断結果の保存に失敗:", error);

      return NextResponse.json(
        { error: "診断結果を保存できませんでした。" },
        { status: 500 },
      );
    }

    let beforeImagePath: string | null = null;

    if (body.beforeImageDataUrl) {
      try {
        const image = parseImageDataUrl(body.beforeImageDataUrl);
        beforeImagePath = `${user.id}/${data.id}/before.${image.extension}`;

        const { error: uploadError } = await supabase.storage
          .from(DIAGNOSIS_IMAGE_BUCKET)
          .upload(beforeImagePath, image.buffer, {
            contentType: image.contentType,
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { error: updateError } = await supabase
          .from("diagnoses")
          .update({ before_image_path: beforeImagePath })
          .eq("id", data.id);

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

    return NextResponse.json(
      {
        id: data.id,
        saved: true,
        beforeImageSaved: Boolean(beforeImagePath),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[AKANUKE.AI] 診断結果保存APIエラー:", error);

    return NextResponse.json(
      { error: "診断結果の保存中にエラーが発生しました。" },
      { status: 500 },
    );
  }
}
