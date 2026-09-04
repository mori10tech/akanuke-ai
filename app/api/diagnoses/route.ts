import {
  NextResponse,
} from "next/server";

/*
 * 診断結果の保存は /api/analyze 内で
 * サーバー側からのみ行います。
 *
 * クライアントから任意のanalysisを
 * 保存できないよう、この旧POST APIは無効化しています。
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "このAPIから診断結果を保存することはできません。",
    },
    {
      status: 405,
    },
  );
}