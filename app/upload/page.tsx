import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";

import UploadClient from "./UploadClient";

type UploadPageProps = {
  searchParams: Promise<{
    mode?: string | string[];
  }>;
};

export default async function UploadPage({
  searchParams,
}: UploadPageProps) {
  const params = await searchParams;

  const mode = Array.isArray(params.mode)
    ? params.mode[0]
    : params.mode;

  const isRetryMode = mode === "retry";

  /*
   * 明示的な再診断の場合は、
   * 過去の診断有無に関係なくUpload画面を表示します。
   */
  if (isRetryMode) {
    return <UploadClient />;
  }

  /*
   * 通常の /upload アクセスでは、
   * Upload画面を表示する前に診断済みか確認します。
   */
  const supabase = await createClient();

  const {
    data: latestDiagnosis,
    error: diagnosisError,
  } = await supabase
    .from("diagnoses")
    .select("id")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (diagnosisError) {
    console.error(
      "[AKANUKE.AI] Upload diagnosis check error:",
      diagnosisError,
    );
  }

  /*
   * 診断済みユーザーが通常の /upload を開いた場合は、
   * マイページへ戻します。
   */
  if (latestDiagnosis) {
    redirect("/dashboard");
  }

  return <UploadClient />;
}