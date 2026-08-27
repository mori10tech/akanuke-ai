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
   * diagnosisIdがURLに付いている場合は、
   * その診断結果をそのまま読み込みます。
   */
  if (diagnosisId) {
    return (
      <LatestResultRedirect
        diagnosisId={
          diagnosisId
        }
      />
    );
  }

  /*
   * LINEリッチメニューから開いた場合は
   * diagnosisIdが付いていないため、
   * クライアント側で最新診断を取得します。
   */
  return (
    <LatestResultRedirect />
  );
}