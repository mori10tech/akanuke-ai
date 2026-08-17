"use client";

import {
  loadAfterImage,
} from "../../lib/client/afterImageStore";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AppLogo from "../components/AppLogo";
import AppShell from "../components/AppShell";

const STORAGE_KEY = "akanukePlanCompletedTasks";

type PlanTask = {
  id: string;
  priority: number;
  category: string;
  title: string;
  reason: string;
  effect: string;
  howTo: string;
  href?: string;
  hrefLabel?: string;
};

const planTasks: PlanTask[] = [
  {
    id: "hair-salon",
    priority: 1,
    category: "髪型",
    title: "美容室で髪型を整える",
    reason:
      "髪型は顔全体の印象を最も大きく変えやすい項目です。",
    effect:
      "前髪とサイドが整い、輪郭がすっきり見えます。",
    howTo:
      "額が少し見える軽めの前髪と、サイドを抑えた爽やかなスタイルを相談しましょう。",
    href: "/salon",
    hrefLabel: "おすすめサロンを見る",
  },
  {
    id: "eyebrow",
    priority: 2,
    category: "眉毛",
    title: "眉毛の輪郭を整える",
    reason:
      "眉毛を整えると目元が引き締まり、清潔感が短時間で上がります。",
    effect:
      "左右差が目立ちにくくなり、目元がはっきりします。",
    howTo:
      "眉下の余分な毛を処理し、太さを残した自然な形を目指しましょう。",
    href: "/salon",
    hrefLabel: "眉毛対応サロンを見る",
  },
  {
    id: "sunscreen",
    priority: 3,
    category: "肌",
    title: "毎朝、日焼け止めを使う",
    reason:
      "紫外線対策は肌の清潔感を守るための基本です。",
    effect:
      "乾燥・赤み・くすみの予防につながります。",
    howTo:
      "外出前に顔全体へ薄く均一に塗り、汗をかいた日は塗り直しましょう。",
    href: "/products",
    hrefLabel: "おすすめ商品を見る",
  },
  {
    id: "moisturize",
    priority: 4,
    category: "肌",
    title: "洗顔後に保湿する",
    reason:
      "肌の乾燥と過剰な皮脂を抑えるために、保湿は欠かせません。",
    effect:
      "テカリとカサつきが目立ちにくくなります。",
    howTo:
      "朝晩の洗顔後、化粧水またはオールインワンを顔全体になじませましょう。",
    href: "/products",
    hrefLabel: "スキンケア商品を見る",
  },
  {
    id: "hair-set",
    priority: 5,
    category: "髪型",
    title: "自分に合うヘアセットを覚える",
    reason:
      "美容室直後だけでなく、普段も理想の髪型を再現するためです。",
    effect:
      "毎日の印象が安定し、清潔感を維持できます。",
    howTo:
      "ドライヤーで根元を立ち上げ、少量のワックスで毛流れを整えましょう。",
    href: "/products",
    hrefLabel: "スタイリング商品を見る",
  },
  {
    id: "grooming",
    priority: 6,
    category: "身だしなみ",
    title: "ヒゲ・鼻毛・爪を整える",
    reason:
      "細部の手入れは、近距離で見たときの清潔感に直結します。",
    effect:
      "丁寧に手入れされた印象になります。",
    howTo:
      "外出前に鏡で確認し、気になったときにすぐ整えられる道具を用意しましょう。",
  },
];

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    reset: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 9a7 7 0 0 1 11.5-2L20 9" />
        <path d="m4 15 2.4 2A7 7 0 0 0 17.9 15" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    scissors: (
      <>
        <circle cx="6" cy="7" r="2.5" />
        <circle cx="6" cy="17" r="2.5" />
        <path d="m8.2 8.2 11.3 8.3" />
        <path d="m8.2 15.8 11.3-8.3" />
      </>
    ),
    brow: (
      <>
        <path d="M4 13c2.6-2.8 5.2-4 8-3.6 3 .4 5.7 1.7 8 4" />
        <path d="M6 16c4 1.2 8 1.2 12 0" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
        <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function ProgressRing({
  progress,
}: {
  progress: number;
}) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div className="relative h-[126px] w-[126px]">
      <svg
        viewBox="0 0 112 112"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="7"
        />

        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="#1677FF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[34px] font-black leading-none tracking-[-0.05em] text-[#1677FF]">
          {progress}%
        </span>

        <span className="mt-1 text-[8px] font-bold tracking-[0.12em] text-black/35">
          PROGRESS
        </span>
      </div>
    </div>
  );
}

function OrderPoint({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-[11px] leading-5 text-black/55">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677FF]" />
      <span>{children}</span>
    </li>
  );
}

function SalonOrderGuide({
  isOpen,
  onToggle,
  afterImage,
}: {
  isOpen: boolean;
  onToggle: () => void;
  afterImage: string | null;
}) {
  return (
    <section className="mx-4 mt-7 overflow-hidden rounded-[24px] border border-[#1677FF]/15 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 bg-gradient-to-br from-[#EEF6FF] via-white to-white px-5 py-5 text-left transition hover:bg-[#F7F9FC]"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
          <Icon
            name="scissors"
            className="h-5 w-5"
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[9px] font-black tracking-[0.16em] text-[#1677FF]">
            SALON ORDER GUIDE
          </span>

          <span className="mt-1 block text-[18px] font-black tracking-[-0.035em] text-[#111111]">
            サロンでこの画面を見せるだけ
          </span>

          <span className="mt-1 block text-[10px] leading-5 text-black/55">
            髪型と眉毛のオーダー内容を確認
          </span>
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF] transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <Icon
            name="chevron"
            className="h-4 w-4"
          />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/10 p-4">
            <div className="overflow-hidden rounded-[18px] border border-black/10 bg-[#F7F9FC]">
              <div className="relative bg-[#EEF6FF]">
                {afterImage ? (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={afterImage}
    alt="AI診断で生成したあなたのAfterイメージ"
    className="h-auto w-full object-contain"
  />
) : (
  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#EEF6FF] px-5 text-center">
    <div>
      <Icon
        name="sparkle"
        className="mx-auto h-7 w-7 text-[#1677FF]"
      />

      <p className="mt-3 text-[11px] font-black text-[#111111]">
        After画像がありません
      </p>

      <p className="mt-1 text-[9px] leading-4 text-black/45">
        診断結果画面でAfter画像を生成すると、
        <br />
        ここにサロン用の参考画像が表示されます。
      </p>
    </div>
  </div>
)}

                <span className="absolute left-3 top-3 rounded-full bg-[#FFD400] px-3 py-1.5 text-[9px] font-black text-[#111111]">
                  AFTER IMAGE
                </span>
              </div>

              <p className="px-4 py-3 text-center text-[9px] leading-4 text-black/35">
  ※AIが生成したAfterイメージをサロンでの相談用に表示しています。
</p>
            </div>

            <div className="mt-4 rounded-[18px] border border-black/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                  <Icon
                    name="scissors"
                    className="h-4 w-4"
                  />
                </span>

                <div>
                  <p className="text-[8px] font-black tracking-[0.14em] text-[#1677FF]">
                    HAIR STYLE
                  </p>

                  <h3 className="mt-0.5 text-[15px] font-black">
                    髪型のオーダー
                  </h3>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                <OrderPoint>
                  額が少し見える、軽めの前髪
                </OrderPoint>

                <OrderPoint>
                  センターパート寄りの自然な毛流れ
                </OrderPoint>

                <OrderPoint>
                  サイドは膨らみすぎないように抑える
                </OrderPoint>

                <OrderPoint>
                  トップには自然な立体感を残す
                </OrderPoint>
              </ul>

              <div className="mt-4 rounded-[14px] bg-[#EEF6FF] p-4">
                <p className="text-[10px] font-black text-[#1677FF]">
                  美容師さんへの伝え方
                </p>

                <p className="mt-2 text-[11px] font-bold leading-6 text-[#111111]">
                  「清潔感のある自然なセンターパート寄りにしたいです。
                  サイドは広がりすぎないように抑えて、前髪は重くしすぎず、
                  額が少し見えるくらいでお願いします。」
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-[18px] border border-black/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF]">
                  <Icon
                    name="brow"
                    className="h-4 w-4"
                  />
                </span>

                <div>
                  <p className="text-[8px] font-black tracking-[0.14em] text-[#1677FF]">
                    EYEBROW
                  </p>

                  <h3 className="mt-0.5 text-[15px] font-black">
                    眉毛のオーダー
                  </h3>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                <OrderPoint>
                  今の自然な太さは残す
                </OrderPoint>

                <OrderPoint>
                  眉間の余分な毛だけ整える
                </OrderPoint>

                <OrderPoint>
                  眉尻を軽く整えて輪郭を出す
                </OrderPoint>

                <OrderPoint>
                  細くしすぎない
                </OrderPoint>
              </ul>

              <div className="mt-4 rounded-[14px] bg-[#FFF9D9] p-4">
                <p className="text-[10px] font-black text-[#1677FF]">
                  眉毛サロンでの伝え方
                </p>

                <p className="mt-2 text-[11px] font-bold leading-6 text-[#111111]">
                  「太さは残したまま、清潔感が出る自然な形に整えてください。
                  細くしすぎず、眉間と眉下の余分な毛を中心に整えたいです。」
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-[14px] bg-[#F7F9FC] px-4 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF]">
                <Icon
                  name="sparkle"
                  className="h-4 w-4"
                />
              </span>

              <p className="text-[10px] leading-5 text-black/55">
                この画面を美容師・眉毛サロンのスタッフに見せて、
                顔立ちや髪質に合わせて最終調整してもらうのがおすすめです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: "bag" | "scissors";
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[104px] items-center gap-3 rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_8px_26px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#1677FF]/30 hover:shadow-[0_14px_32px_rgba(22,119,255,0.10)] active:scale-[0.99]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#1677FF] transition group-hover:bg-[#1677FF] group-hover:text-white">
        <Icon
          name={icon}
          className="h-6 w-6"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black tracking-[-0.02em]">
          {title}
        </span>

        <span className="mt-1 block text-[9px] leading-4 text-black/55">
          {description}
        </span>
      </span>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F9FC] text-[#1677FF] transition group-hover:translate-x-0.5 group-hover:bg-[#EEF6FF]">
        <Icon
          name="chevron"
          className="h-4 w-4"
        />
      </span>
    </Link>
  );
}

export default function PlanPage() {
  const [completedIds, setCompletedIds] =
    useState<string[]>([]);

  const [isSalonGuideOpen, setIsSalonGuideOpen] =
    useState(false);

  const [openedId, setOpenedId] =
    useState<string | null>(null);

  const [
    salonAfterImage,
    setSalonAfterImage,
  ] = useState<string | null>(null);

    const [loaded, setLoaded] =
    useState(false);

  /*
   * Result画面で生成・保存されたAfter画像を
   * IndexedDBから読み込みます。
   */
  useEffect(() => {
    let isCancelled = false;

    async function restoreAfterImage() {
      const rawResult =
        window.sessionStorage.getItem(
          "akanukeAnalysisResult",
        );

      if (!rawResult) {
        return;
      }

      try {
        const savedAfterImage =
          await loadAfterImage(
            rawResult,
          );

        if (
          !isCancelled &&
          savedAfterImage
        ) {
          setSalonAfterImage(
            savedAfterImage,
          );
        }
      } catch (error) {
        console.warn(
          "[AKANUKE.AI] Plan画面でAfter画像を読み込めませんでした:",
          error,
        );
      }
    }

    void restoreAfterImage();

    return () => {
      isCancelled = true;
    };
  }, []);

  /*
   * 垢抜けプランのチェック状態を
   * localStorageから復元します。
   */
  useEffect(() => {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    window.setTimeout(() => {
      if (raw) {
        try {
          const parsed =
            JSON.parse(raw);

          if (Array.isArray(parsed)) {
            setCompletedIds(
              parsed.filter(
                (id): id is string =>
                  typeof id ===
                  "string",
              ),
            );
          }
        } catch {
          setCompletedIds([]);
        }
      }

      setLoaded(true);
    }, 0);
  }, []);

  /*
   * チェック状態が変わったら保存します。
   */
  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          completedIds,
        ),
      );
    }
  }, [
    completedIds,
    loaded,
  ]);

  const completedCount =
    completedIds.length;

  const progress = useMemo(
    () =>
      Math.round(
        (completedCount / planTasks.length) * 100,
      ),
    [completedCount],
  );

  const toggleCompleted = (id: string) => {
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-black/10 border-t-[#1677FF]" />
      </main>
    );
  }

  return (
    <AppShell background="white">
      <div className="overflow-hidden bg-white">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[44px_1fr_44px] items-center px-4">
            <Link
              href="/result"
              aria-label="診断結果へ戻る"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EEF6FF]"
            >
              <Icon
                name="arrowLeft"
                className="h-[21px] w-[21px]"
              />
            </Link>

            <div className="flex justify-center">
              <AppLogo />
            </div>

            <div aria-hidden="true" />
          </div>
        </header>

        <div className="pb-32">
          <section className="px-5 pb-6 pt-7 text-center">
            <p className="text-[10px] font-black tracking-[0.18em] text-[#1677FF]">
              PERSONAL AKANUKE PLAN
            </p>

            <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
              あなた専用の垢抜けプラン
            </h1>

            <p className="mx-auto mt-2 max-w-[340px] text-[12px] leading-5 text-black/55">
              期限や週区切りはありません。優先順位の高い項目から、自分のペースで進めてください。
            </p>
          </section>

          <section className="mx-4 rounded-[24px] border border-[#1677FF]/10 bg-[#EEF6FF] p-5 shadow-[0_10px_34px_rgba(15,23,42,0.05)]">
  <div className="flex items-center gap-5">
    <ProgressRing progress={progress} />

    <div className="min-w-0 flex-1">
      <p className="text-[9px] font-black tracking-[0.13em] text-[#1677FF]">
        CURRENT STATUS
      </p>

      <h2 className="mt-2 text-[22px] font-black tracking-[-0.04em] text-[#111111]">
  <span className="text-[#1677FF]">
    {completedCount} / {planTasks.length}
  </span>{" "}
  完了
</h2>

      <p className="mt-2 text-[10px] leading-5 text-black/45">
        すべて一度に行う必要はありません。
        できる項目から進めましょう。
      </p>
    </div>
  </div>
</section>
          <SalonOrderGuide
  isOpen={isSalonGuideOpen}
  onToggle={() =>
    setIsSalonGuideOpen(
      (current) => !current,
    )
  }
  afterImage={salonAfterImage}
/>

          <section className="mx-4 mt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
                  ACTION LIST
                </p>

                <h2 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
                  やることリスト
                </h2>
              </div>

              <p className="text-[9px] font-bold text-black/35">
                優先度順
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {planTasks.map((task) => {
                const completed =
                  completedIds.includes(task.id);

                const opened =
                  openedId === task.id;

                return (
                  <article
                    key={task.id}
                    className={`overflow-hidden rounded-[18px] border bg-white ${
                      completed
                        ? "border-[#FFD400]/40"
                        : "border-black/10"
                    }`}
                  >
                    <div className="flex items-start gap-3 p-4">
                      <button
                        type="button"
                        onClick={() =>
                          toggleCompleted(task.id)
                        }
                        aria-label={`${task.title}を${
                          completed
                            ? "未完了"
                            : "完了"
                        }にする`}
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                          completed
                            ? "border-[#1677FF] bg-[#1677FF] text-white"
                            : "border-black/10 bg-[#EEF6FF] text-transparent"
                        }`}
                      >
                        <Icon
                          name="check"
                          className="h-4 w-4"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenedId(
                            opened ? null : task.id,
                          )
                        }
                        className="min-w-0 flex-1 text-left"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[9px] font-black text-[#1677FF]">
                              優先度 {task.priority}・
                              {task.category}
                            </p>

                            <h3
                              className={`mt-1 text-[15px] font-black ${
                                completed
                                  ? "text-black/35 line-through"
                                  : "text-[#111111]"
                              }`}
                            >
                              {task.title}
                            </h3>
                          </div>

                          <span
                            className={`mt-1 transition ${
                              opened
                                ? "rotate-90"
                                : ""
                            }`}
                          >
                            <Icon name="chevron" />
                          </span>
                        </div>
                      </button>
                    </div>

                    {opened && (
                      <div className="border-t border-black/10 bg-white px-4 py-4">
                        <div className="space-y-3 text-[11px] leading-5">
                          <div>
                            <p className="font-black">
                              なぜ必要？
                            </p>

                            <p className="mt-1 text-black/55">
                              {task.reason}
                            </p>
                          </div>

                          <div>
                            <p className="font-black">
                              期待できる変化
                            </p>

                            <p className="mt-1 text-black/55">
                              {task.effect}
                            </p>
                          </div>

                          <div>
                            <p className="font-black">
                              具体的なやり方
                            </p>

                            <p className="mt-1 text-black/55">
                              {task.howTo}
                            </p>
                          </div>
                        </div>

                        {task.href && (
                          <Link
                            href={task.href}
                            className="mt-4 flex min-h-11 items-center justify-between rounded-[12px] bg-[#EEF6FF] px-4 text-[11px] font-black text-[#1677FF]"
                          >
                            {task.hrefLabel}

                            <Icon name="chevron" />
                          </Link>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mx-4 mt-7 grid grid-cols-2 gap-3">
            <ActionCard
              href="/products"
              icon="bag"
              title="おすすめ商品"
              description="肌ケア・ヘアセットに必要な商品を見る"
            />

            <ActionCard
              href="/salon"
              icon="scissors"
              title="おすすめサロン"
              description="髪型・眉毛を相談できるサロンを見る"
            />
          </section>

          {progress === 100 && (
            <section className="mx-4 mt-6 rounded-[20px] border border-[#FFD400]/40 bg-[#FFF9D9] p-5 text-center">
              <p className="text-[10px] font-black tracking-[0.14em] text-[#1677FF]">
                PLAN COMPLETE
              </p>

              <h2 className="mt-2 text-[21px] font-black">
                すべてのタスクが完了しました
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-black/55">
                同じ条件で写真を撮り直し、Before / Afterを確認しましょう。
              </p>

              <Link
                href="/upload"
                className="mt-4 flex min-h-12 items-center justify-center rounded-[12px] bg-[#FFD400] text-[12px] font-black text-[#111111]"
              >
                もう一度診断する
              </Link>
            </section>
          )}

          <button
            type="button"
            onClick={() => setCompletedIds([])}
            className="mx-auto mt-6 flex items-center gap-2 text-[10px] font-black text-black/35"
          >
            <Icon
              name="reset"
              className="h-4 w-4"
            />

            チェック状況をリセット
          </button>
        </div>
      </div>
    </AppShell>
  );
}