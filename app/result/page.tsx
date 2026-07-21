"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BottomNav from "../components/BottomNav";

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

type Impression = {
  id: ImpressionId;
  label: string;
  shortLabel: string;
  icon: string;
};

type ResultMessage = {
  eyebrow: string;
  hairstyle: string;
  skin: string;
  headline: string;
  description: string;
};

type AnalysisPoint = {
  key: "eyebrow" | "hairstyle" | "skin";
  label: string;
  shortLabel: string;
  icon: string;
  title: string;
};

type PriorityItem = {
  rank: number;
  title: string;
  category: string;
  effectLabel: string;
  effectScore: number;
  scoreUp: string;
  time: string;
  cost: string;
  description: string;
};

const IMPRESSIONS: Impression[] = [
  {
    id: "fresh",
    label: "爽やか",
    shortLabel: "爽やか",
    icon: "🌿",
  },
  {
    id: "mature",
    label: "大人っぽい",
    shortLabel: "大人っぽい",
    icon: "🖤",
  },
  {
    id: "clean",
    label: "清潔感",
    shortLabel: "清潔感",
    icon: "✨",
  },
  {
    id: "attractive",
    label: "異性ウケ",
    shortLabel: "異性ウケ",
    icon: "💎",
  },
  {
    id: "business",
    label: "ビジネス向き",
    shortLabel: "ビジネス",
    icon: "💼",
  },
  {
    id: "korean",
    label: "韓国系",
    shortLabel: "韓国系",
    icon: "🪩",
  },
  {
    id: "masculine",
    label: "男らしい",
    shortLabel: "男らしい",
    icon: "🔥",
  },
  {
    id: "gentle",
    label: "優しそう",
    shortLabel: "優しそう",
    icon: "☁️",
  },
  {
    id: "intelligent",
    label: "知的・スマート",
    shortLabel: "知的",
    icon: "🧠",
  },
  {
    id: "ai-recommend",
    label: "AIにおすすめしてもらう",
    shortLabel: "AIおすすめ",
    icon: "✦",
  },
];

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

const scores = [
  {
    label: "眉毛",
    score: 82,
  },
  {
    label: "髪型",
    score: 76,
  },
  {
    label: "肌の清潔感",
    score: 71,
  },
  {
    label: "表情",
    score: 74,
  },
];

const analysisItems = [
  {
    label: "眉毛",
    description: "眉の形と左右差",
  },
  {
    label: "髪型",
    description: "前髪と輪郭の相性",
  },
  {
    label: "肌",
    description: "清潔感と明るさ",
  },
  {
    label: "表情",
    description: "親しみやすさ",
  },
];

const analysisPoints: AnalysisPoint[] = [
  {
    key: "eyebrow",
    label: "眉毛",
    shortLabel: "眉",
    icon: "01",
    title: "眉まわりの輪郭が少しぼやけています",
  },
  {
    key: "hairstyle",
    label: "髪型",
    shortLabel: "髪",
    icon: "02",
    title: "前髪によって目元が隠れやすい状態です",
  },
  {
    key: "skin",
    label: "肌",
    shortLabel: "肌",
    icon: "03",
    title: "肌の明るさと質感をさらに整えられます",
  },
];

const priorities: PriorityItem[] = [
  {
    rank: 1,
    title: "眉毛の形を整える",
    category: "眉毛",
    effectLabel: "効果：非常に高い",
    effectScore: 5,
    scoreUp: "+6点",
    time: "約30分",
    cost: "4,000〜6,000円",
    description:
      "眉下と眉間の余分な毛を処理し、眉尻を少し細く整えます。顔の輪郭がはっきりし、短時間でも清潔感を出しやすい改善です。",
  },
  {
    rank: 2,
    title: "前髪を軽くして額を見せる",
    category: "髪型",
    effectLabel: "効果：非常に高い",
    effectScore: 5,
    scoreUp: "+5点",
    time: "約60分",
    cost: "5,000〜8,000円",
    description:
      "前髪の量を軽くし、額が少し見える髪型へ変更します。目元が明るくなり、幼く見えやすい印象を抑えられます。",
  },
  {
    rank: 3,
    title: "基本のスキンケアを毎日続ける",
    category: "肌",
    effectLabel: "効果：高い",
    effectScore: 4,
    scoreUp: "+3点",
    time: "朝夜3分",
    cost: "月2,000〜4,000円",
    description:
      "洗顔・保湿・日焼け止めの3つを習慣にします。テカリと乾燥の両方を抑え、肌の清潔感を安定させます。",
  },
];

const DEFAULT_RESULT_MESSAGE: ResultMessage = {
  headline:
    "眉毛と前髪を変えるだけで、第一印象は大きく変わります。",
  description:
    "現在は少し幼く見えやすい印象です。最初に眉毛を整え、その後に髪型を変えることで、短期間でも清潔感を高められます。",
  eyebrow:
    "眉毛そのものの形は自然ですが、眉下と眉尻の輪郭が少し曖昧です。余分な毛を整理すると、目元がすっきり見えます。",
  hairstyle:
    "前髪にやや重さがあり、目元と額が隠れやすい状態です。顔まわりに軽さを出すと、表情が明るく見えます。",
  skin: "大きな肌荒れは目立ちませんが、光の当たり方によってテカリや色むらが見えやすい状態です。保湿と紫外線対策で印象を整えられます。",
};

const RESULT_MESSAGES: Partial<Record<ImpressionId, ResultMessage>> = {
  fresh: {
    headline:
      "爽やかさを引き出すだけで、第一印象はもっと明るくなります。",
    description:
      "眉毛の輪郭を整え、前髪に軽さを出すスタイルがおすすめです。額を少し見せて肌の清潔感を高めることで、自然体のまま好印象を作れます。",
    eyebrow:
      "現在の眉毛は自然な太さがありますが、眉下に細かな毛が残っているため、輪郭が少しぼやけて見えます。眉下を整えると、目元の爽やかさが強まります。",
    hairstyle:
      "前髪に重さがあり、額と目元が隠れやすい状態です。前髪へ束感と隙間を作ると、顔全体が明るく爽やかに見えます。",
    skin: "肌状態は比較的安定していますが、部分的なテカリによって清潔感が弱く見えることがあります。保湿と皮脂対策を両立すると、爽やかさを高められます。",
  },
  mature: {
    headline:
      "落ち着きのある大人っぽさを、眉と髪型から引き出せます。",
    description:
      "眉尻をすっきり整え、前髪を上げるか横へ流すことで、幼く見えやすい印象を抑えられます。色数を抑えた服装との相性も良い方向性です。",
    eyebrow:
      "眉の太さは十分ありますが、眉尻の輪郭が柔らかいため、少し幼く見えやすい状態です。眉尻を整えると落ち着いた印象になります。",
    hairstyle:
      "前髪が額を覆っているため、顔立ちが柔らかく見えています。額を見せることで、骨格が際立ち大人っぽさが強まります。",
    skin: "肌のツヤが部分的に強く見えるため、ややカジュアルな印象になっています。テカリを抑えると、落ち着いた雰囲気へ近づきます。",
  },
  clean: {
    headline:
      "清潔感を最優先に整えることで、顔全体の印象が安定します。",
    description:
      "眉まわり、前髪、肌の3点を丁寧に整えることが最も効果的です。派手な変化よりも、細かな身だしなみの積み重ねが垢抜けにつながります。",
    eyebrow:
      "眉間と眉下に細かな毛が残っているため、近くで見たときに輪郭がぼやけやすい状態です。左右差も整えると、より清潔に見えます。",
    hairstyle:
      "前髪が目元へ近く、髪のまとまりによって少し重く見えています。耳まわりと前髪をすっきりさせると清潔感が高まります。",
    skin: "大きな肌トラブルは目立ちませんが、乾燥とテカリが混在して見えます。洗顔後の保湿を安定させると、肌全体が整って見えます。",
  },
  attractive: {
    headline:
      "親しみやすさと清潔感を整えると、魅力がさらに伝わります。",
    description:
      "作り込みすぎるより、自然な眉毛、軽さのある髪型、健康的な肌を意識するのがおすすめです。表情も含めて柔らかい印象を作りましょう。",
    eyebrow:
      "眉毛は自然で親しみやすい一方、輪郭が少し曖昧なため、目元の印象が弱く見えます。自然な太さを残して周囲だけ整えるのが適しています。",
    hairstyle:
      "前髪にまとまりがありますが、顔まわりの動きが少ないため、少し平面的に見えています。軽い束感を作ると華やかさが増します。",
    skin: "肌は比較的落ち着いていますが、乾燥やテカリがあると健康的な印象が弱くなります。水分感のある肌状態を目指すのがおすすめです。",
  },
  business: {
    headline:
      "爽やかさと信頼感を両立できる顔立ちです。",
    description:
      "眉毛を整えて前髪に軽さを出すことで、仕事の場でも信頼されやすい印象になります。派手さよりも、輪郭の整った清潔なスタイルが適しています。",
    eyebrow:
      "眉毛の形は自然ですが、眉尻と眉下の輪郭が少し曖昧です。左右差を整えると、誠実で安定感のある印象になります。",
    hairstyle:
      "前髪が目元に近いため、ややカジュアルに見えています。額を少し見せ、サイドを整えると仕事向きの印象が強まります。",
    skin: "部分的なテカリや疲れた印象が見えやすい状態です。皮脂を抑えながら保湿すると、健康的で信頼感のある肌に見えます。",
  },
  korean: {
    headline:
      "韓国系スタイルを取り入れると、洗練された印象を作れます。",
    description:
      "前髪の束感、自然に整えた平行眉、肌の透明感が重要です。髪型と眉毛を同時に変えることで、スタイル全体に統一感が生まれます。",
    eyebrow:
      "現在の眉毛には自然な太さがありますが、形に少し角度があります。輪郭を整えて平行に近づけると、韓国系の雰囲気が強まります。",
    hairstyle:
      "前髪のまとまりが強く、束感が少ない状態です。センターパートや軽いマッシュへ寄せると、洗練された印象になります。",
    skin: "肌の明るさはありますが、質感に少しばらつきが見えます。保湿と日焼け止めを続けると、透明感を演出しやすくなります。",
  },
  masculine: {
    headline:
      "骨格を活かした、力強く清潔なスタイルが似合います。",
    description:
      "眉の存在感を適度に残し、髪型は顔まわりをすっきり見せるのがおすすめです。無骨になりすぎないよう、肌と身だしなみの清潔感も同時に整えます。",
    eyebrow:
      "眉毛の太さは顔立ちに合っていますが、輪郭が少し曖昧です。細くしすぎず周囲を整えると、力強さが際立ちます。",
    hairstyle:
      "トップとサイドの差が小さいため、顔の輪郭が柔らかく見えています。サイドを締めてトップに高さを出すと、男らしく見えます。",
    skin: "ヒゲや皮脂の見え方によっては、少し無骨な印象が強くなります。肌とヒゲを整えることで、力強さと清潔感を両立できます。",
  },
  gentle: {
    headline:
      "柔らかさを活かすことで、自然に親しみやすい印象になります。",
    description:
      "眉毛の角度を強くしすぎず、髪型にも丸みと軽さを残すのがおすすめです。表情と肌の清潔感を整えることで、優しい雰囲気がより伝わります。",
    eyebrow:
      "眉毛の自然な太さが優しい印象につながっています。一方で眉尻が少し曖昧なため、輪郭だけを整えると柔らかさを保ったまま洗練されます。",
    hairstyle:
      "髪型には丸みがありますが、前髪が少し重く見えます。丸みを残しつつ軽さを出すと、親しみやすい印象になります。",
    skin: "肌に乾燥や赤みが見えると、疲れた印象につながります。刺激の少ない保湿を続けることで、穏やかな印象を保てます。",
  },
  intelligent: {
    headline:
      "顔まわりを整理すると、知的でスマートな印象が際立ちます。",
    description:
      "眉の輪郭を整え、額や目元が見える髪型にすることで、すっきりとした知的な雰囲気になります。シンプルで端正なスタイルが適しています。",
    eyebrow:
      "眉毛の輪郭が少し柔らかいため、目元の印象がぼやけています。眉尻を整えて直線的に見せると、知的さが強まります。",
    hairstyle:
      "前髪によって目元と額が隠れ、顔全体が柔らかく見えています。前髪を整理すると、すっきりした印象になります。",
    skin: "目元の疲れや部分的なテカリが見えると、スマートさが弱まります。保湿と皮脂対策で均一な肌印象を作るのがおすすめです。",
  },
  "ai-recommend": {
    headline:
      "AI分析では、清潔感を軸に爽やかさを伸ばす方向がおすすめです。",
    description:
      "顔全体のバランスを見ると、最初に眉毛と前髪を整えることで大きな変化が期待できます。その後、肌と表情を整える順番が効率的です。",
    eyebrow:
      "現在の眉毛には自然な太さがありますが、眉下と眉尻の輪郭が少し曖昧です。周囲を整えるだけでも目元がはっきり見えます。",
    hairstyle:
      "前髪の重さによって目元が隠れやすく、顔全体が少し暗く見えています。軽さを作ると明るい印象になります。",
    skin: "大きな肌トラブルは目立ちませんが、部分的な乾燥やテカリがあります。基本のケアを安定させると清潔感が高まります。",
  },
};

function normalizeImpressionValue(
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
      .map(normalizeImpressionValue)
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
      .map(normalizeImpressionValue)
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

function getImpressionById(id: ImpressionId): Impression {
  return (
    IMPRESSIONS.find(
      (impression) => impression.id === id,
    ) ?? IMPRESSIONS[IMPRESSIONS.length - 1]
  );
}

function createCombinedMessage(
  impressionIds: ImpressionId[],
): ResultMessage {
  if (impressionIds.length === 0) {
    return DEFAULT_RESULT_MESSAGE;
  }

  if (impressionIds.includes("ai-recommend")) {
    return (
      RESULT_MESSAGES["ai-recommend"] ??
      DEFAULT_RESULT_MESSAGE
    );
  }

  const primaryId = impressionIds[0];
  const secondaryId = impressionIds[1];

  const primaryMessage =
    RESULT_MESSAGES[primaryId] ??
    DEFAULT_RESULT_MESSAGE;

  if (!secondaryId) {
    return primaryMessage;
  }

  const secondaryMessage =
    RESULT_MESSAGES[secondaryId] ??
    DEFAULT_RESULT_MESSAGE;

  const primaryImpression = getImpressionById(primaryId);
  const secondaryImpression =
    getImpressionById(secondaryId);

  return {
    headline: `${primaryImpression.shortLabel}さと${secondaryImpression.shortLabel}さを両立することで、あなたらしい好印象を作れます。`,
    description: `${primaryMessage.description} あわせて「${secondaryImpression.label}」の要素も取り入れ、眉毛・髪型・肌のバランスを調整すると、希望する印象へさらに近づけます。`,
    eyebrow: primaryMessage.eyebrow,
    hairstyle: secondaryMessage.hairstyle,
    skin:
      secondaryId === "clean" ||
      primaryId === "clean"
        ? RESULT_MESSAGES.clean?.skin ??
          primaryMessage.skin
        : primaryMessage.skin,
  };
}

function getAnalysisDescription(
  key: AnalysisPoint["key"],
  resultMessage: ResultMessage,
) {
  switch (key) {
    case "eyebrow":
      return resultMessage.eyebrow;

    case "hairstyle":
      return resultMessage.hairstyle;

    case "skin":
      return resultMessage.skin;

    default:
      return "";
  }
}

function EffectStars({
  score,
}: {
  score: number;
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`効果 ${score}段階`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={
            index < score
              ? "text-amber-400"
              : "text-slate-200"
          }
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ResultPage() {
  const [image, setImage] = useState<string | null>(null);
  const [impressionIds, setImpressionIds] = useState<
    ImpressionId[]
  >([]);
  const [isDataLoaded, setIsDataLoaded] =
    useState(false);

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

  const selectedImpressions = useMemo(
    () => impressionIds.map(getImpressionById),
    [impressionIds],
  );

  const resultMessage = useMemo(
    () => createCombinedMessage(impressionIds),
    [impressionIds],
  );

  const desiredImpressionText = useMemo(() => {
    if (selectedImpressions.length === 0) {
      return "清潔感を軸にAIが最適化";
    }

    return selectedImpressions
      .map((impression) => impression.label)
      .join(" × ");
  }, [selectedImpressions]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-28 pt-8">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              AI診断レポート
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              診断結果
            </h1>
          </div>

          <span className="shrink-0 rounded-full bg-green-100 px-3 py-2 text-xs font-bold text-green-700">
            診断完了
          </span>
        </div>

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold tracking-[0.16em] text-blue-300">
                YOUR DESIRED IMPRESSION
              </p>

              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-bold text-slate-200 backdrop-blur">
                希望を反映済み
              </span>
            </div>

            <p className="mt-4 text-sm font-bold text-slate-400">
              あなたが目指す印象
            </p>

            <h2 className="mt-2 text-2xl font-black leading-9 tracking-tight">
              {desiredImpressionText}
            </h2>

            {selectedImpressions.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedImpressions.map(
                  (impression) => (
                    <span
                      key={impression.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur"
                    >
                      <span aria-hidden="true">
                        {impression.icon}
                      </span>

                      {impression.label}
                    </span>
                  ),
                )}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm leading-6 text-slate-300">
                  希望する印象が保存されていなかったため、清潔感と爽やかさを軸に診断しています。
                </p>
              </div>
            )}

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-black">
                AI
              </span>

              <p className="text-sm leading-6 text-slate-300">
                選択した印象を優先しながら、顔全体のバランスを分析して改善順を決定しました。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="p-5">
            <p className="text-sm font-bold text-slate-500">
              今回診断した写真
            </p>
          </div>

          {!isDataLoaded ? (
            <div className="flex min-h-64 items-center justify-center bg-slate-100 px-6 text-center">
              <p className="text-sm font-bold text-slate-400">
                写真を読み込んでいます...
              </p>
            </div>
          ) : image ? (
            <>
              <div className="relative w-full overflow-hidden bg-slate-100">
                <img
                  src={image}
                  alt="診断した顔写真"
                  className="block h-auto w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                <div className="pointer-events-none absolute left-4 top-[32%] rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
                  眉毛を分析
                </div>

                <div className="pointer-events-none absolute right-4 top-[14%] rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
                  前髪を分析
                </div>

                <div className="pointer-events-none absolute bottom-[12%] right-4 rounded-full border border-white/70 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur">
                  肌の清潔感
                </div>
              </div>

              <div className="border-t border-slate-100 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      解析項目
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      顔の印象を4項目で確認しました
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-600 px-3 py-2 text-xs font-bold text-white">
                    解析済み
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {analysisItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-600">
                          ✓
                        </span>

                        <p className="text-sm font-bold text-slate-800">
                          {item.label}
                        </p>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-64 items-center justify-center bg-slate-100 px-6 py-10 text-center">
              <div>
                <p className="font-bold text-slate-700">
                  写真が見つかりませんでした
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  写真アップロード画面から、もう一度診断してください。
                </p>

                <Link
                  href="/upload"
                  className="mt-5 inline-block rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                >
                  写真を選び直す
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="mt-4 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
          <p className="text-sm font-bold text-slate-300">
            現在の垢抜けスコア
          </p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-7xl font-black">68</span>

            <span className="pb-2 text-lg font-bold text-slate-400">
              / 100
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-blue-500" />
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4">
            <div>
              <p className="text-xs text-slate-400">
                4週間後の目標
              </p>

              <p className="mt-1 text-2xl font-bold">
                84点
              </p>
            </div>

            <div className="rounded-full bg-blue-500 px-4 py-2 text-sm font-bold">
              ＋16点
            </div>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">
              AI
            </span>

            <p className="text-sm font-bold text-blue-700">
              あなた専用の総合コメント
            </p>
          </div>

          <h2 className="mt-4 text-xl font-bold leading-8 text-slate-950">
            {resultMessage.headline}
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {resultMessage.description}
          </p>

          <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs font-bold tracking-[0.12em] text-blue-600">
              PERSONALIZED FOR YOU
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              「{desiredImpressionText}
              」を基準に、変化を実感しやすい順番で改善プランを作成しています。
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-950">
            項目別スコア
          </h2>

          <div className="mt-4 space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            {scores.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700">
                    {item.label}
                  </span>

                  <span className="font-bold text-slate-950">
                    {item.score}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-blue-600">
              AI FACE ANALYSIS
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              AIが顔を分析した結果
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              現在の顔写真から、印象に影響しているポイントを分析しました。
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {analysisPoints.map((item) => (
              <article
                key={item.key}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xs font-black text-blue-600">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                        {item.label}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold leading-7 text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {getAnalysisDescription(
                        item.key,
                        resultMessage,
                      )}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-blue-600">
                YOUR ACTION PLAN
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-950">
                まず改善すべき3つ
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                変化を実感しやすい順に、具体的な行動へ落とし込みました。
              </p>
            </div>

            <p className="shrink-0 pb-1 text-xs text-slate-400">
              効果が高い順
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {priorities.map((item) => (
              <article
                key={item.rank}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-100">
                      {item.rank}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                          {item.category}
                        </span>

                        {item.rank === 1 ? (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                            AIおすすめ No.1
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-3 text-lg font-bold leading-7 text-slate-950">
                        {item.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <EffectStars score={item.effectScore} />

                        <span className="text-xs font-bold text-amber-700">
                          {item.effectLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50">
                  <div className="px-2 py-4 text-center">
                    <p className="text-[10px] font-bold text-slate-400">
                      期待スコア
                    </p>

                    <p className="mt-1 text-sm font-black text-blue-600">
                      {item.scoreUp}
                    </p>
                  </div>

                  <div className="px-2 py-4 text-center">
                    <p className="text-[10px] font-bold text-slate-400">
                      所要時間
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {item.time}
                    </p>
                  </div>

                  <div className="px-2 py-4 text-center">
                    <p className="text-[10px] font-bold text-slate-400">
                      目安費用
                    </p>

                    <p className="mt-1 text-xs font-bold leading-5 text-slate-800">
                      {item.cost}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-sm">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
            ✨
          </span>

          <p className="mt-4 text-xs font-bold tracking-[0.16em] text-blue-600">
            NEXT STEP
          </p>

          <h2 className="mt-2 text-xl font-bold leading-8 text-slate-950">
            次は、4週間後の自分を
            <br />
            確認してみましょう。
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            今回の改善プランを続けた場合、どのように変わっていくのかを週ごとに確認できます。
          </p>

          <Link
            href="/preview"
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            4週間後の自分を見る
            <span className="ml-2">→</span>
          </Link>
        </section>

        <Link
          href="/preferences"
          className="mt-3 block py-3 text-center text-sm font-bold text-blue-600"
        >
          なりたい印象を変更する
        </Link>

        <Link
          href="/upload"
          className="block py-3 text-center text-sm font-bold text-slate-500"
        >
          別の写真で診断し直す
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}