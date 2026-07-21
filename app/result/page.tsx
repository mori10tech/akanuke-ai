"use client";

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
  { label: "眉毛", score: 82 },
  { label: "髪型", score: 76 },
  { label: "肌の清潔感", score: 71 },
  { label: "表情", score: 74 },
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

const priorities = [
  {
    rank: 1,
    title: "眉毛",
    impact: "効果：非常に高い",
    description:
      "眉下の余分な毛を整え、眉尻を少し細くすると、顔全体の清潔感が大きく上がります。",
    href: "/salon",
    action: "眉毛サロンを確認する",
  },
  {
    rank: 2,
    title: "髪型",
    impact: "効果：非常に高い",
    description:
      "前髪を軽くして額を少し見せると、幼い印象が抑えられ、爽やかに見えます。",
    href: "/salon",
    action: "美容室用オーダーを見る",
  },
  {
    rank: 3,
    title: "肌の清潔感",
    impact: "効果：高い",
    description:
      "洗顔と日焼け止めを毎日続けることで、テカリや肌の印象を整えやすくなります。",
    href: "/products",
    action: "おすすめ商品を見る",
  },
];

const DEFAULT_RESULT_MESSAGE: ResultMessage = {
  headline: "眉毛と前髪を変えるだけで、第一印象は大きく変わります。",
  description:
    "現在は少し幼く見えやすい印象です。最初に眉毛を整え、その後に髪型を変えることで、短期間でも清潔感を高められます。",
  eyebrow: "自然な太さを残しながら眉下を整え、清潔感のある形を目指します。",
  hairstyle:
    "前髪に軽さを作り、額を少し見せることで顔全体を明るく見せます。",
  skin: "洗顔・保湿・日焼け止めを基本に、肌の清潔感を整えます。",
};

const RESULT_MESSAGES: Partial<Record<ImpressionId, ResultMessage>> = {
  fresh: {
    headline: "爽やかさを引き出すだけで、第一印象はもっと明るくなります。",
    description:
      "眉毛の輪郭を整え、前髪に軽さを出すスタイルがおすすめです。額を少し見せて肌の清潔感を高めることで、自然体のまま好印象を作れます。",
    eyebrow:
      "眉下の余分な毛を整え、直線的すぎない自然な眉にすると爽やかさが高まります。",
    hairstyle:
      "重い前髪を避け、束感と軽さを作って額を少し見せるスタイルがおすすめです。",
    skin: "テカリを抑えながら明るさを保つことで、清潔で爽やかな印象になります。",
  },

  mature: {
    headline: "落ち着きのある大人っぽさを、眉と髪型から引き出せます。",
    description:
      "眉尻をすっきり整え、前髪を上げるか横へ流すことで、幼く見えやすい印象を抑えられます。色数を抑えた服装との相性も良い方向性です。",
    eyebrow:
      "眉尻を少しシャープに整え、輪郭を明確にすると大人っぽく見えます。",
    hairstyle:
      "額を見せるアップバングや、横へ流す前髪で落ち着きを演出します。",
    skin: "過度なツヤを抑え、均一で落ち着いた肌印象を目指します。",
  },

  clean: {
    headline: "清潔感を最優先に整えることで、顔全体の印象が安定します。",
    description:
      "眉まわり、前髪、肌の3点を丁寧に整えることが最も効果的です。派手な変化よりも、細かな身だしなみの積み重ねが垢抜けにつながります。",
    eyebrow:
      "眉間と眉下の余分な毛を処理し、左右差を整えることを優先します。",
    hairstyle:
      "耳まわりと襟足をすっきりさせ、前髪が目にかからない状態を保ちます。",
    skin: "洗顔・保湿・日焼け止めを習慣化し、テカリと乾燥の両方を防ぎます。",
  },

  attractive: {
    headline: "親しみやすさと清潔感を整えると、魅力がさらに伝わります。",
    description:
      "作り込みすぎるより、自然な眉毛、軽さのある髪型、健康的な肌を意識するのがおすすめです。表情も含めて柔らかい印象を作りましょう。",
    eyebrow:
      "角度をつけすぎず、自然な太さを残すことで親しみやすさを作ります。",
    hairstyle:
      "顔まわりに軽い動きを出し、清潔感と自然な華やかさを両立させます。",
    skin: "乾燥やテカリを抑え、健康的で触れたくなるような肌印象を目指します。",
  },

  business: {
    headline: "爽やかさと信頼感を両立できる顔立ちです。",
    description:
      "眉毛を整えて前髪に軽さを出すことで、仕事の場でも信頼されやすい印象になります。派手さよりも、輪郭の整った清潔なスタイルが適しています。",
    eyebrow:
      "眉尻を整え、左右差を減らすことで誠実で安定感のある印象を作ります。",
    hairstyle:
      "額を少し見せ、サイドをすっきりまとめることでビジネス向きになります。",
    skin: "テカリを抑え、疲れて見えにくい明るく均一な肌状態を目指します。",
  },

  korean: {
    headline: "韓国系スタイルを取り入れると、洗練された印象を作れます。",
    description:
      "前髪の束感、自然に整えた平行眉、肌の透明感が重要です。髪型と眉毛を同時に変えることで、スタイル全体に統一感が生まれます。",
    eyebrow:
      "角度を抑えた自然な平行眉に整えると、韓国系の雰囲気に近づきます。",
    hairstyle:
      "センターパートや軽いマッシュをベースに、前髪へ束感を作ります。",
    skin: "保湿と日焼け止めを重視し、明るく均一な肌の見え方を目指します。",
  },

  masculine: {
    headline: "骨格を活かした、力強く清潔なスタイルが似合います。",
    description:
      "眉の存在感を適度に残し、髪型は顔まわりをすっきり見せるのがおすすめです。無骨になりすぎないよう、肌と身だしなみの清潔感も同時に整えます。",
    eyebrow:
      "細くしすぎず、眉尻と輪郭だけを整えて力強さを残します。",
    hairstyle:
      "サイドを締め、トップに高さを出すことで輪郭を男らしく見せます。",
    skin: "ヒゲやテカリを整え、清潔感のある健康的な肌印象を作ります。",
  },

  gentle: {
    headline: "柔らかさを活かすことで、自然に親しみやすい印象になります。",
    description:
      "眉毛の角度を強くしすぎず、髪型にも丸みと軽さを残すのがおすすめです。表情と肌の清潔感を整えることで、優しい雰囲気がより伝わります。",
    eyebrow:
      "角を作りすぎず、自然なカーブを残して柔らかい印象に整えます。",
    hairstyle:
      "顔まわりに丸みを残しつつ、重く見えないよう適度な軽さを作ります。",
    skin: "保湿を重視し、乾燥や赤みが目立ちにくい穏やかな肌状態を目指します。",
  },

  intelligent: {
    headline: "顔まわりを整理すると、知的でスマートな印象が際立ちます。",
    description:
      "眉の輪郭を整え、額や目元が見える髪型にすることで、すっきりとした知的な雰囲気になります。シンプルで端正なスタイルが適しています。",
    eyebrow:
      "眉尻を丁寧に整え、少し直線的な形にすると知的な印象になります。",
    hairstyle:
      "額と目元が見えるように前髪を整理し、シルエットをコンパクトにします。",
    skin: "目元の疲れやテカリを抑え、均一で整った肌の見え方を作ります。",
  },

  "ai-recommend": {
    headline: "AI分析では、清潔感を軸に爽やかさを伸ばす方向がおすすめです。",
    description:
      "顔全体のバランスを見ると、最初に眉毛と前髪を整えることで大きな変化が期待できます。その後、肌と表情を整える順番が効率的です。",
    eyebrow:
      "現在の形を活かしながら眉下と眉尻を整え、左右差を抑えます。",
    hairstyle:
      "顔型とのバランスを見ながら、前髪に軽さを作って明るく見せます。",
    skin: "基本の洗顔・保湿・日焼け止めから始め、清潔感を安定させます。",
  },
};

function normalizeImpressionValue(value: unknown): ImpressionId | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return IMPRESSION_ALIASES[normalizedValue] ?? null;
}

function parseSavedImpressions(savedValue: string | null): ImpressionId[] {
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
      .filter((value): value is ImpressionId => value !== null)
      .filter((value, index, array) => array.indexOf(value) === index)
      .slice(0, 2);
  } catch {
    return savedValue
      .split(",")
      .map(normalizeImpressionValue)
      .filter((value): value is ImpressionId => value !== null)
      .filter((value, index, array) => array.indexOf(value) === index)
      .slice(0, 2);
  }
}

function getImpressionById(id: ImpressionId): Impression {
  return (
    IMPRESSIONS.find((impression) => impression.id === id) ??
    IMPRESSIONS[IMPRESSIONS.length - 1]
  );
}

function createCombinedMessage(
  impressionIds: ImpressionId[],
): ResultMessage {
  if (impressionIds.length === 0) {
    return DEFAULT_RESULT_MESSAGE;
  }

  if (impressionIds.includes("ai-recommend")) {
    return RESULT_MESSAGES["ai-recommend"] ?? DEFAULT_RESULT_MESSAGE;
  }

  const primaryId = impressionIds[0];
  const secondaryId = impressionIds[1];

  const primaryMessage =
    RESULT_MESSAGES[primaryId] ?? DEFAULT_RESULT_MESSAGE;

  if (!secondaryId) {
    return primaryMessage;
  }

  const secondaryMessage =
    RESULT_MESSAGES[secondaryId] ?? DEFAULT_RESULT_MESSAGE;

  const primaryImpression = getImpressionById(primaryId);
  const secondaryImpression = getImpressionById(secondaryId);

  return {
    headline: `${primaryImpression.shortLabel}さと${secondaryImpression.shortLabel}さを両立することで、あなたらしい好印象を作れます。`,
    description: `${primaryMessage.description} あわせて「${secondaryImpression.label}」の要素も取り入れ、眉毛・髪型・肌のバランスを調整すると、希望する印象へさらに近づけます。`,
    eyebrow: primaryMessage.eyebrow,
    hairstyle: secondaryMessage.hairstyle,
    skin:
      secondaryId === "clean" || primaryId === "clean"
        ? RESULT_MESSAGES.clean?.skin ?? primaryMessage.skin
        : primaryMessage.skin,
  };
}

export default function ResultPage() {
  const [image, setImage] = useState<string | null>(null);
  const [impressionIds, setImpressionIds] = useState<ImpressionId[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const savedImage = window.sessionStorage.getItem("akanukeImage");
    const savedImpressions = window.sessionStorage.getItem(
      "akanukeDesiredImpressions",
    );

    setImage(savedImage);
    setImpressionIds(parseSavedImpressions(savedImpressions));
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
            <p className="text-sm text-slate-500">AI診断レポート</p>

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
                {selectedImpressions.map((impression) => (
                  <span
                    key={impression.id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur"
                  >
                    <span aria-hidden="true">{impression.icon}</span>
                    {impression.label}
                  </span>
                ))}
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

                <a
                  href="/upload"
                  className="mt-5 inline-block rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
                >
                  写真を選び直す
                </a>
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
              <p className="text-xs text-slate-400">4週間後の目標</p>
              <p className="mt-1 text-2xl font-bold">84点</p>
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
              「{desiredImpressionText}」を基準に、変化を実感しやすい順番で改善プランを作成しています。
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
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div>
            <p className="text-sm font-bold text-blue-600">
              PERSONAL ANALYSIS
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              希望の印象に近づくポイント
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            <article className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg">
                  眉
                </span>

                <div>
                  <h3 className="font-bold text-slate-950">眉毛</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {resultMessage.eyebrow}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg">
                  髪
                </span>

                <div>
                  <h3 className="font-bold text-slate-950">髪型</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {resultMessage.hairstyle}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg">
                  肌
                </span>

                <div>
                  <h3 className="font-bold text-slate-950">肌</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {resultMessage.skin}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-blue-600">
                PRIORITY
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-950">
                最初に改善する3項目
              </h2>
            </div>

            <p className="shrink-0 text-xs text-slate-400">
              効果が高い順
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {priorities.map((item) => (
              <article
                key={item.rank}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
                    {item.rank}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <span className="mt-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      {item.impact}
                    </span>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <a
                      href={item.href}
                      className="mt-4 block w-full rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                    >
                      {item.action} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <a
          href="/preview"
          className="mt-8 block rounded-2xl bg-blue-600 px-6 py-4 text-center text-lg font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          4週間後の変化を見る
        </a>

        <a
          href="/preferences"
          className="mt-3 block py-3 text-center text-sm font-bold text-blue-600"
        >
          なりたい印象を変更する
        </a>

        <a
          href="/upload"
          className="block py-3 text-center text-sm font-bold text-slate-500"
        >
          別の写真で診断し直す
        </a>
      </div>

      <BottomNav />
    </main>
  );
}