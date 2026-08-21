import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import LatestResultRedirect from "./LatestResultRedirect";

export const dynamic = "force-dynamic";

export default async function LineResultPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?next=/line/result");
  }

  const { data: latestDiagnosis, error } =
    await supabase
      .from("diagnoses")
      .select("id")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (error) {
    console.error(
      "[AKANUKE.AI] LINE診断結果取得エラー:",
      error,
    );

    redirect("/history");
  }

  if (!latestDiagnosis) {
    redirect("/upload");
  }

  return (
    <LatestResultRedirect
      diagnosisId={latestDiagnosis.id}
    />
  );
}