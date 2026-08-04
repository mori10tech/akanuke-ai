import Image from "next/image";
import Link from "next/link";
import BottomNav from "../components/BottomNav";

type Salon = {
  id: number;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  tag: string;
  image: string;
  imagePosition?: string;
};

const recommendedSalon = {
  name: "LIPPS 京都店",
  score: 98,
  rating: 4.9,
  reviewCount: 256,
  address: "京都府京都市下京区四条通〇〇〇〇",
  access: "阪急京都線 烏丸駅 徒歩3分",
  businessHours: "11:00〜21:00",
  price: "メンズカット ¥5,500〜",
  tags: ["メンズ専門", "眉毛対応", "爽やか系が得意"],
  image: "/lp/hero-man.png",
};

const otherSalons: Salon[] = [
  {
    id: 1,
    name: "fifth 京都店",
    area: "京都河原町",
    rating: 4.8,
    reviewCount: 86,
    tag: "メンズ専門",
    image: "/lp/hero-man.png",
    imagePosition: "50% 22%",
  },
  {
    id: 2,
    name: "OCEAN TOKYO 京都店",
    area: "京都駅",
    rating: 4.7,
    reviewCount: 122,
    tag: "眉毛対応",
    image: "/lp/hero-visual.png",
    imagePosition: "42% 30%",
  },
  {
    id: 3,
    name: "GOALD 京都店",
    area: "烏丸",
    rating: 4.6,
    reviewCount: 90,
    tag: "爽やか系",
    image: "/lp/hero-man.png",
    imagePosition: "67% 20%",
  },
];

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function TrainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="3" width="12" height="14" rx="3" />
      <path d="M8 21l2-4" />
      <path d="M16 21l-2-4" />
      <path d="M8 8h8" />
      <circle cx="9" cy="13" r=".8" fill="currentColor" />
      <circle cx="15" cy="13" r=".8" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4h5v5" />
      <path d="m10 14 10-10" />
      <path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
      <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function SalonPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#111111]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-[#fafafa] shadow-[0_0_40px_rgba(15,23,42,0.08)]">
        <header className="sticky top-0 z-30 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-xl">
          <div className="grid h-[68px] grid-cols-[48px_1fr_48px] items-center px-3">
            <Link
              href="/result"
              aria-label="診断結果へ戻る"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-neutral-100 active:scale-95"
            >
              <ArrowLeftIcon />
            </Link>

            <Link
              href="/"
              className="text-center text-[21px] font-black tracking-[-0.03em]"
            >
              AKANUKE.AI
            </Link>

            <button
              type="button"
              aria-label="メニューを開く"
              className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-neutral-100 active:scale-95"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        <div className="px-4 pb-32 pt-5">
          <p className="text-[15px] font-black">
            あなたにおすすめのサロン
          </p>

          <section className="mt-4 overflow-hidden rounded-[18px] border border-[#dedede] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.05)]">
            <div className="grid grid-cols-[45%_55%]">
              <div className="relative min-h-[235px] overflow-hidden bg-[#EEF6FF]">
                <Image
                  src={recommendedSalon.image}
                  alt={`${recommendedSalon.name}のスタイルイメージ`}
                  fill
                  priority
                  sizes="(max-width: 480px) 45vw, 216px"
                  className="object-cover object-[52%_20%]"
                />
              </div>

              <div className="px-3.5 py-4">
                <span className="inline-flex rounded-md bg-black px-2 py-1 text-[10px] font-black text-white">
                  AIおすすめ度
                </span>

                <div className="mt-2 flex items-end gap-1">
                  <span className="text-[38px] font-black leading-none text-[#FFD400]">
                    {recommendedSalon.score}
                  </span>
                  <span className="pb-1 text-lg font-black text-[#FFD400]">
                    %
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-1.5">
                  <span
                    className="text-[13px] tracking-[0.05em] text-[#FFD400]"
                    aria-label="星5つ"
                  >
                    ★★★★★
                  </span>

                  <span className="text-[11px] font-black">
                    {recommendedSalon.rating}
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-neutral-500">
                  （{recommendedSalon.reviewCount}件の口コミ）
                </p>

                <h1 className="mt-3 text-[22px] font-black leading-tight tracking-[-0.04em]">
                  {recommendedSalon.name}
                </h1>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {recommendedSalon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[#EEF6FF] px-2 py-1 text-[9px] font-black text-[#1677FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-black/10 px-4 py-4 text-[11px] text-black/70">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">
                  <LocationIcon />
                </span>
                <p>{recommendedSalon.address}</p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">
                  <TrainIcon />
                </span>
                <p>{recommendedSalon.access}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="shrink-0">
                  <ClockIcon />
                </span>
                <p>{recommendedSalon.businessHours}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="shrink-0">
                  <LinkIcon />
                </span>
                <p>{recommendedSalon.price}</p>
              </div>
            </div>

            <div className="px-4 pb-4">
              <div className="rounded-[14px] bg-[#FFF9D9] p-4">
                <div className="flex items-center gap-2 text-[#1677FF]">
                  <SparkleIcon />

                  <h2 className="text-[13px] font-black">
                    AIからのおすすめ理由
                  </h2>
                </div>

                <p className="mt-2 text-[11px] leading-[1.75] text-black/70">
                  あなたの輪郭や髪質、目指す「爽やか」な印象に最も近づけられる
                  スタイルを得意とするサロンです。センターパートや自然な
                  マッシュが特におすすめです。
                </p>
              </div>

              <a
                href="https://beauty.hotpepper.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-black px-4 text-[14px] font-black text-white transition hover:bg-neutral-800 active:scale-[0.99]"
              >
                このサロンを予約する
                <ExternalLinkIcon />
              </a>
            </div>
          </section>

          <section className="mt-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-black">
                その他のおすすめサロン
              </h2>

              <button
                type="button"
                aria-label="その他のサロンを表示"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500"
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {otherSalons.map((salon) => (
                <article
                  key={salon.id}
                  className="min-w-0 overflow-hidden rounded-[14px] border border-black/10 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.03)]"
                >
                  <div className="relative h-[116px] overflow-hidden bg-[#EEF6FF]">
                    <Image
                      src={salon.image}
                      alt={`${salon.name}のスタイルイメージ`}
                      fill
                      sizes="(max-width: 480px) 31vw, 145px"
                      style={{
                        objectPosition: salon.imagePosition,
                      }}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-2.5">
                    <h3 className="line-clamp-2 min-h-8 text-[11px] font-black leading-4">
                      {salon.name}
                    </h3>

                    <p className="mt-1 truncate text-[9px] text-neutral-500">
                      {salon.area}
                    </p>

                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-[8px] tracking-[-0.05em] text-[#FFD400]">
                        ★★★★★
                      </span>

                      <span className="text-[8px] font-black">
                        {salon.rating}
                      </span>
                    </div>

                    <p className="mt-1 text-[7px] text-neutral-400">
                      （{salon.reviewCount}件）
                    </p>

                    <div className="mt-2">
                      <span className="inline-flex rounded bg-[#EEF6FF] px-1.5 py-1 text-[8px] font-bold text-[#1677FF] ">
                        {salon.tag}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mt-3 min-h-9 w-full rounded-lg border border-black/10 bg-white px-1 text-[9px] font-black transition hover:bg-neutral-50 active:scale-[0.98]"
                    >
                      詳細を見る
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="mt-6 rounded-[12px] bg-[#EEF6FF] px-4 py-3">
            <p className="text-center text-[9px] leading-4 text-neutral-600">
              ※予約ボタンを押すと、外部の予約サイト
              （ホットペッパービューティー等）へ移動します。
            </p>
          </aside>
        </div>

        <BottomNav />
      </div>
    </main>
  );
}