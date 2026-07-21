"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BottomNav from "../components/BottomNav";
import FinalCTA from "../components/preview/FinalCTA";
import PreviewHero from "../components/preview/PreviewHero";
import WeekCard, {
  type WeekData,
} from "../components/preview/WeekCard";
import WeeklySummary, {
  type WeeklySummaryItem,
} from "../components/preview/WeeklySummary";

type ImpressionId =
  | "fresh"
  | "mature"
  | "clean"
  | "attractive"
  | "business"
  | "korean"
  | "masculine"
  | "gentle"
  | "intelligent"
  | "ai-recommend";

const IMPRESSION_LABELS: Record<ImpressionId, string> = {
  fresh: "爽やか",
  mature: "大人っぽい",
  clean: "清潔感",
  attractive: "異性ウケ",
  business: "ビジネス向き",
  korean: "韓国系",
  masculine: "男らしい",
  gentle: "優しそう",
  intelligent: "知的・スマート",
  "ai-recommend": "AIおすすめ",
};

const IMPRESSION_ALIASES: Record<string, ImpressionId> = {
  fresh: "fresh",
  爽やか: "fresh",

  mature: "mature",
  大人っぽい: "mature",

  clean: "clean",
  cleanliness: "clean",
  清潔感: "clean",

  attractive: "attractive",
  dating: "attractive",
  異性ウケ: "attractive",

  business: "business",
  ビジネス向き: "business",

  korean: "korean",
  韓国系: "korean",

  masculine: "masculine",
  manly: "masculine",
  男らしい: "masculine",

  gentle: "gentle",
  優しそう: "gentle",

  intelligent: "intelligent",
  smart: "intelligent",
  知的スマート: "intelligent",
  "知的・スマート": "intelligent",

  ai: "ai-recommend",
  recommend: "ai-recommend",
  "ai-recommend": "ai-recommend",
  "AIにおすすめしてもらう": "ai-recommend",
};

const WEEK_DATA: WeekData[] = [
  {
    week: 1,
    label: "清潔感の土台を作る",
    subtitle: "スキンケア・眉毛・生活習慣",
    previousScore: 68,
    score: 72,
    progress: 25,
    accentLabel: "土台づくり",
    imageFilter: "brightness(1.015) contrast(1.01) saturate(0.98)",
    aiComment:
      "最初の1週間は、大きく変えすぎず、毎日の清潔感を安定させる期間です。小さな習慣だけでも、顔色と目元の印象が整い始めます。",
    impressionChange:
      "肌のトーンが少し明るくなり、清潔感のある印象へ。",
    actions: [
      "朝晩の洗顔・保湿を習慣化する",
      "眉下の余分な毛だけを自然に整える",
      "睡眠時間と水分補給を意識する",
    ],
  },
  {
    week: 2,
    label: "顔まわりを整える",
    subtitle: "眉毛・前髪・ヘアスタイル",
    previousScore: 72,
    score: 77,
    progress: 50,
    accentLabel: "顔まわり改善",
    imageFilter: "brightness(1.03) contrast(1.025) saturate(0.97)",
    aiComment:
      "2週目は、第一印象に最も影響しやすい眉毛と髪型を整えます。前髪に軽さが出ることで、顔全体がすっきり見え始めます。",
    impressionChange:
      "顔全体がすっきりして、爽やかで軽やかな印象へ。",
    actions: [
      "眉の左右差を整えて自然な形に近づける",
      "前髪を軽くし、額を少し見せる",
      "サイドと襟足を清潔に整える",
    ],
  },
  {
    week: 3,
    label: "魅力を定着させる",
    subtitle: "肌・質感・表情",
    previousScore: 77,
    score: 81,
    progress: 75,
    accentLabel: "周囲が気づく変化",
    imageFilter: "brightness(1.045) contrast(1.035) saturate(0.96)",
    aiComment:
      "3週目には、眉毛・髪型・肌のバランスが整い、周囲から変化に気づかれやすくなります。自然な表情も意識しましょう。",
    impressionChange:
      "垢抜け感が増し、周囲から変化に気づかれる印象へ。",
    actions: [
      "保湿と日焼け止めを継続して肌を安定させる",
      "ヘアワックスで自然な束感を作る",
      "口元を緩め、自然な表情を意識する",
    ],
  },
  {
    week: 4,
    label: "理想の印象を完成させる",
    subtitle: "眉・髪・肌・表情の最終調整",
    previousScore: 81,
    score: 84,
    progress: 100,
    accentLabel: "完成イメージ",
    imageFilter: "brightness(1.06) contrast(1.045) saturate(0.95)",
    aiComment:
      "4週間の積み重ねにより、清潔感・髪型・眉毛・表情のバランスが整います。無理な変化ではなく、あなたらしさを残した理想形です。",
    impressionChange:
      "清潔感・好印象・自信が自然にそろった理想の状態へ。",
    actions: [
      "自分に似合う髪型とセット方法を定着させる",
      "眉毛とスキンケアを無理なく継続する",
      "服装と姿勢まで含めて全体の印象を整える",
    ],
    isFinal: true,
  },
];

function normalizeImpression(
  value: unknown,
): ImpressionId | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return IMPRESSION_ALIASES[normalizedValue] ?? null;
}

function parseSavedImpressions(
  savedValue: string | null,
): ImpressionId[] {
  if (!savedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(savedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map(normalizeImpression)
      .filter(
        (value): value is ImpressionId => value !== null,
      )
      .filter(
        (value, index, array) =>
          array.indexOf(value) === index,
      )
      .slice(0, 2);
  } catch {
    return savedValue
      .split(",")
      .map(normalizeImpression)
      .filter(
        (value): value is ImpressionId => value !== null,
      )
      .filter(
        (value, index, array) =>
          array.indexOf(value) === index,
      )
      .slice(0, 2);
  }
}

export default function PreviewPage() {
  const [image, setImage] = useState<string | null>(null);
  const [impressionIds, setImpressionIds] = useState<
    ImpressionId[]
  >([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const weekSectionRefs = useRef<
    Record<number, HTMLElement | null>
  >({});

  useEffect(() => {
    const savedImage =
      window.sessionStorage.getItem("akanukeImage");

    const savedImpressions =
      window.sessionStorage.getItem(
        "akanukeDesiredImpressions",
      );

    setImage(savedImage);
    setImpressionIds(
      parseSavedImpressions(savedImpressions),
    );
    setIsDataLoaded(true);
  }, []);

  const desiredImpression = useMemo(() => {
    if (impressionIds.length === 0) {
      return "清潔感 × 爽やか";
    }

    if (impressionIds.includes("ai-recommend")) {
      return "AIおすすめ：清潔感 × 爽やか";
    }

    return impressionIds
      .map((id) => IMPRESSION_LABELS[id])
      .join(" × ");
  }, [impressionIds]);

  const summaryItems = useMemo<WeeklySummaryItem[]>(
    () =>
      WEEK_DATA.map((week) => ({
        week: week.week,
        label: week.accentLabel,
        score: week.score,
        progress: week.progress,
        imageFilter: week.imageFilter,
        isFinal: week.isFinal,
      })),
    [],
  );

  const handleSelectWeek = (week: number) => {
    const target = weekSectionRefs.current[week];

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-32 pt-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link
            href="/result"
            className="inline-flex min-h-10 items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-100"
          >
            ← 診断結果
          </Link>

          <p className="text-sm font-bold tracking-[0.18em] text-blue-600">
            AKANUKE.AI
          </p>
        </div>

        <PreviewHero
          desiredImpression={desiredImpression}
          currentScore={68}
          targetScore={84}
        />

        {!isDataLoaded ? (
          <section className="mt-6 flex min-h-72 items-center justify-center rounded-[32px] bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm font-bold text-slate-500">
                4週間の変化を準備しています
              </p>
            </div>
          </section>
        ) : !image ? (
          <section className="mt-6 flex min-h-72 items-center justify-center rounded-[32px] bg-white px-6 text-center shadow-sm">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                📷
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-950">
                診断した写真が見つかりません
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                写真アップロード画面から、もう一度診断を開始してください。
              </p>

              <Link
                href="/upload"
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
              >
                写真をアップロードする
              </Link>
            </div>
          </section>
        ) : (
          <>
            <WeeklySummary
              image={image}
              items={summaryItems}
              onSelectWeek={handleSelectWeek}
            />

            <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-800">
                  i
                </span>

                <div>
                  <p className="text-sm font-bold text-amber-950">
                    現在は表示確認用の変化予測です
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-800/80">
                    各週の眉毛・髪型・肌を実際に変化させた画像は、画像生成API接続後に生成されます。
                  </p>
                </div>
              </div>
            </div>

            <section className="mt-10">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
                  WEEKLY DETAILS
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  週ごとの変化と行動
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  一度に大きく変えるのではなく、毎週の小さな行動を積み重ねて理想の印象へ近づきます。
                </p>
              </div>

              <div className="mt-5 space-y-6">
                {WEEK_DATA.map((week) => (
                  <div
                    key={week.week}
                    ref={(element) => {
                      weekSectionRefs.current[week.week] =
                        element;
                    }}
                  >
                    <WeekCard
                      data={week}
                      image={image}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
                IMPORTANT POINT
              </p>

              <h2 className="mt-2 text-xl font-bold leading-8 text-slate-950">
                大きく変えるのではなく、
                <br />
                小さな積み重ねで自然に垢抜ける。
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                無理な加工や別人のような変化ではなく、現在の魅力を活かしながら、清潔感・髪型・眉毛・表情を順番に整えることがポイントです。
              </p>
            </section>

            <FinalCTA
              desiredImpression={desiredImpression}
            />
          </>
        )}
      </div>

      <BottomNav />
    </main>
  );
}