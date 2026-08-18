import type { AkanukeAnalysis } from "../openai/schemas";

export type DiagnosisRow = {
  id: string;
  target_impression: string;
  overall_progress: number;
  analysis: AkanukeAnalysis;
  created_at: string;
  before_image_path?: string | null;
  after_image_path?: string | null;
  beforeImageUrl?: string | null;
  afterImageUrl?: string | null;
};

export function isAkanukeAnalysis(
  value: unknown,
): value is AkanukeAnalysis {
  if (!value || typeof value !== "object") {
    return false;
  }

  const analysis = value as Partial<AkanukeAnalysis>;

  return (
    typeof analysis.progress === "number" &&
    Number.isFinite(analysis.progress) &&
    analysis.progress >= 0 &&
    analysis.progress <= 100 &&
    typeof analysis.currentImpression === "string" &&
    typeof analysis.targetImpression === "string" &&
    Boolean(analysis.summary) &&
    typeof analysis.summary?.headline === "string" &&
    typeof analysis.summary?.body === "string" &&
    Boolean(analysis.afterSummary) &&
    typeof analysis.afterSummary?.headline === "string" &&
    typeof analysis.afterSummary?.body === "string" &&
    Array.isArray(analysis.afterSummary?.changes) &&
    Boolean(analysis.hair) &&
    typeof analysis.hair?.observation === "string" &&
    typeof analysis.hair?.advice === "string" &&
    Boolean(analysis.eyebrows) &&
    typeof analysis.eyebrows?.observation === "string" &&
    typeof analysis.eyebrows?.advice === "string" &&
    Boolean(analysis.skin) &&
    typeof analysis.skin?.observation === "string" &&
    typeof analysis.skin?.advice === "string" &&
    Boolean(analysis.grooming) &&
    typeof analysis.grooming?.observation === "string" &&
    typeof analysis.grooming?.advice === "string" &&
    Array.isArray(analysis.priorities) &&
    analysis.priorities.length === 3 &&
    Boolean(analysis.afterDirection) &&
    typeof analysis.afterDirection?.hair === "string" &&
    typeof analysis.afterDirection?.eyebrows === "string" &&
    typeof analysis.afterDirection?.skin === "string" &&
    typeof analysis.afterDirection?.grooming === "string" &&
    typeof analysis.afterDirection?.styling === "string"
  );
}
