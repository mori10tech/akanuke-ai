import { NextRequest, NextResponse } from "next/server";
import { DIAGNOSIS_IMAGE_BUCKET } from "../../../../lib/diagnoses/images";
import { createClient } from "../../../../lib/supabase/server";

type DiagnosisRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: DiagnosisRouteContext,
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "ログインが必要です。" },
        { status: 401 },
      );
    }

    const { id } = await context.params;
    const { data, error } = await supabase
      .from("diagnoses")
      .select(
        "id, target_impression, overall_progress, analysis, created_at, before_image_path, after_image_path",
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "診断結果が見つかりません。" },
        { status: 404 },
      );
    }

    async function createSignedImageUrl(path: string | null) {
      if (!path) {
        return null;
      }

      const { data: signedData, error: signedError } =
        await supabase.storage
          .from(DIAGNOSIS_IMAGE_BUCKET)
          .createSignedUrl(path, 60 * 60);

      if (signedError) {
        console.warn(
          "[AKANUKE.AI] 診断画像URLを作成できませんでした:",
          signedError,
        );
        return null;
      }

      return signedData.signedUrl;
    }

    const [beforeImageUrl, afterImageUrl] = await Promise.all([
      createSignedImageUrl(data.before_image_path),
      createSignedImageUrl(data.after_image_path),
    ]);

    return NextResponse.json({
      diagnosis: {
        ...data,
        beforeImageUrl,
        afterImageUrl,
      },
    });
  } catch (error) {
    console.error("[AKANUKE.AI] 診断結果取得APIエラー:", error);

    return NextResponse.json(
      { error: "診断結果を取得できませんでした。" },
      { status: 500 },
    );
  }
}
