import { redirect } from "next/navigation";

import LatestResultRedirect from "./LatestResultRedirect";

export const dynamic =
  "force-dynamic";

type LineResultPageProps = {
  searchParams: Promise<{
    diagnosisId?: string;
  }>;
};

export default async function LineResultPage({
  searchParams,
}: LineResultPageProps) {
  const params =
    await searchParams;

  const diagnosisId =
    params.diagnosisId?.trim();

  /*
   * /uploadですでに最新診断IDを取得しているため、
   * ここではSupabaseへ同じ検索を繰り返しません。
   *
   * diagnosisIdがない場合のみ、
   * 診断履歴から選び直してもらいます。
   */
  if (!diagnosisId) {
    redirect("/history");
  }

  return (
    <LatestResultRedirect
      diagnosisId={diagnosisId}
    />
  );
}