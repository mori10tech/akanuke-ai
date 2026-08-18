import { NextRequest, NextResponse } from "next/server";
import {
  DIAGNOSIS_IMAGE_BUCKET,
  parseImageDataUrl,
} from "../../../../../lib/diagnoses/images";
import { createClient } from "../../../../../lib/supabase/server";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 14 * 1024 * 1024;

type DiagnosisImageRouteContext = {
  params: Promise<{ id: string }>;
};

type UpdateDiagnosisImageRequest = {
  kind?: "before" | "after";
  imageDataUrl?: string;
};

export async function PUT(
  request: NextRequest,
  context: DiagnosisImageRouteContext,
) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);

    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: "画像のデータサイズが大きすぎます。" },
        { status: 413 },
      );
    }

    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = (await request.json()) as UpdateDiagnosisImageRequest;

    if (!body.imageDataUrl || (body.kind !== "before" && body.kind !== "after")) {
      return NextResponse.json(
        { error: "画像データの形式が正しくありません。" },
        { status: 400 },
      );
    }

    const { data: diagnosis, error: diagnosisError } = await supabase
      .from("diagnoses")
      .select("id")
      .eq("id", id)
      .single();

    if (diagnosisError || !diagnosis) {
      return NextResponse.json(
        { error: "診断結果が見つかりません。" },
        { status: 404 },
      );
    }

    const image = parseImageDataUrl(body.imageDataUrl);
    const imagePath = `${user.id}/${id}/${body.kind}.${image.extension}`;
    const { error: uploadError } = await supabase.storage
      .from(DIAGNOSIS_IMAGE_BUCKET)
      .upload(imagePath, image.buffer, {
        contentType: image.contentType,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const column = body.kind === "before" ? "before_image_path" : "after_image_path";
    const { error: updateError } = await supabase
      .from("diagnoses")
      .update({ [column]: imagePath })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("[AKANUKE.AI] 診断画像保存APIエラー:", error);
    return NextResponse.json(
      { error: "診断画像を保存できませんでした。" },
      { status: 500 },
    );
  }
}
