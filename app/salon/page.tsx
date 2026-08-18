"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import AppHeader from "../components/AppHeader";
import AppShell from "../components/AppShell";
import AdSenseAd from "../components/AdSenseAd";

type Salon = {
  id: number;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  matchScore: number;
  priceLabel: string;
  access: string;
  businessHours: string;
  tags: string[];
  image: string;
  imagePosition?: string;
  recommendedReason: string;
  reservationUrl: string;
};

const featuredSalon: Salon = {
  id: 1,
  name: "LIPPS 京都店",
  area: "四条烏丸",
  rating: 4.9,
  reviewCount: 256,
  matchScore: 98,
  priceLabel: "メンズカット ¥5,500〜",
  access: "阪急京都線 烏丸駅 徒歩3分",
  businessHours: "11:00〜21:00",
  tags: ["メンズ専門", "爽やか系", "パーマ対応"],
  image: "/salon/LIPPS.jpg",
  imagePosition: "52% 20%",
  recommendedReason:
    "あなたの輪郭と目指す「爽やか・清潔感」の印象に合うスタイルを得意としています。前髪を軽くしたセンターパートや、サイドを抑えたナチュラルマッシュがおすすめです。",
  reservationUrl: "https://beauty.hotpepper.jp/",
};

const nearbySalons: Salon[] = [
  {
    id: 2,
    name: "fifth 京都店",
    area: "京都河原町",
    rating: 4.8,
    reviewCount: 186,
    matchScore: 95,
    priceLabel: "メンズカット ¥5,000〜",
    access: "阪急 京都河原町駅 徒歩4分",
    businessHours: "10:00〜20:00",
    tags: ["メンズ専門", "パーマ対応", "学生に人気"],
    image: "/salon/fifth.jpg",
    imagePosition: "50% 22%",
    recommendedReason:
      "髪に動きを出しながら、毎朝セットしやすいスタイルを目指したい方におすすめです。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 3,
    name: "OCEAN TOKYO 京都店",
    area: "京都駅",
    rating: 4.7,
    reviewCount: 222,
    matchScore: 93,
    priceLabel: "メンズカット ¥6,000〜",
    access: "JR京都駅 徒歩5分",
    businessHours: "11:00〜20:00",
    tags: ["駅近", "セット相談", "ショートが得意"],
    image: "/salon/ocean.jpg",
    imagePosition: "42% 30%",
    recommendedReason:
      "短髪や動きのあるスタイルを希望し、自宅でのセット方法まで相談したい方に向いています。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 4,
    name: "GOALD 京都店",
    area: "烏丸",
    rating: 4.6,
    reviewCount: 190,
    matchScore: 91,
    priceLabel: "メンズカット ¥5,500〜",
    access: "地下鉄烏丸駅 徒歩4分",
    businessHours: "11:00〜21:00",
    tags: ["爽やか系", "ビジネス対応", "パーマ対応"],
    image: "/salon/GOALD.jpg",
    imagePosition: "67% 20%",
    recommendedReason:
      "清潔感のあるショートスタイルや、仕事でも自然に見える髪型を希望する方におすすめです。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 5,
    name: "MEN'S GROOMING 京都",
    area: "四条烏丸",
    rating: 4.7,
    reviewCount: 118,
    matchScore: 90,
    priceLabel: "メンズカット ¥4,800〜",
    access: "阪急烏丸駅 徒歩5分",
    businessHours: "10:00〜20:00",
    tags: ["初心者向け", "清潔感重視", "相談しやすい"],
    image: "/salon/LIPPS.jpg",
    imagePosition: "45% 18%",
    recommendedReason:
      "美容室でのオーダーに慣れていない方でも、目指す印象から相談しやすいサロンです。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 6,
    name: "BROW MEN 京都駅前",
    area: "京都駅",
    rating: 4.8,
    reviewCount: 164,
    matchScore: 89,
    priceLabel: "メンズカット ¥5,200〜",
    access: "JR京都駅 徒歩3分",
    businessHours: "10:00〜19:00",
    tags: ["駅近", "顔周り提案", "初回相談"],
    image: "/salon/ocean.jpg",
    imagePosition: "58% 24%",
    recommendedReason:
      "顔周りの印象を整えながら、通いやすさも重視したい方に向いています。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 7,
    name: "FIRST STYLE 河原町",
    area: "京都河原町",
    rating: 4.6,
    reviewCount: 96,
    matchScore: 87,
    priceLabel: "メンズカット ¥4,500〜",
    access: "京都河原町駅 徒歩2分",
    businessHours: "11:00〜20:00",
    tags: ["高コスパ", "駅近", "短時間"],
    image: "/salon/fifth.jpg",
    imagePosition: "55% 20%",
    recommendedReason:
      "価格を抑えながら、清潔感のある髪型へ整えたい方におすすめです。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 8,
    name: "KOREAN HAIR LAB 京都",
    area: "京都河原町",
    rating: 4.7,
    reviewCount: 143,
    matchScore: 92,
    priceLabel: "メンズカット ¥5,800〜",
    access: "京都河原町駅 徒歩5分",
    businessHours: "11:00〜21:00",
    tags: ["センターパート", "韓国風", "毛流れ重視"],
    image: "/salon/GOALD.jpg",
    imagePosition: "60% 19%",
    recommendedReason:
      "自然な毛流れや、横の膨らみを抑えたスタイルを希望する方に向いています。",
    reservationUrl: "https://beauty.hotpepper.jp/",
  },
  {
    id: 9,
    name: "PERM STUDIO 烏丸",
    area: "烏丸",
    rating: 4.6,
    reviewCount: 108,
    matchScore: 88,
    priceLabel: "メンズカット ¥5,000〜",
    access: "地下鉄烏丸駅 徒歩6分",
    businessHours: "10:00〜20:00",
    tags: ["セットが簡単", "相談重視", "メンズ対応"],
    image: "/salon/fifth.jpg",
    imagePosition: "48% 20%",
    recommendedReason:
      "朝のヘアセット時間を短くしながら、自然な毛流れを作りたい方におすすめです。",
    reservationUrl: "https://beauty.hotpepper.jp/",
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

    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    train: (
      <>
        <rect x="6" y="3" width="12" height="14" rx="3" />
        <path d="M8 21l2-4" />
        <path d="M16 21l-2-4" />
        <path d="M8 8h8" />
        <circle cx="9" cy="13" r=".8" fill="currentColor" />
        <circle cx="15" cy="13" r=".8" fill="currentColor" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    yen: (
      <>
        <path d="m7 4 5 7 5-7" />
        <path d="M12 11v9" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3c.8 4.1 2.9 6.2 7 7-4.1.8-6.2 2.9-7 7-.8-4.1-2.9-6.2-7-7 4.1-.8 6.2-2.9 7-7Z" />
        <path d="M19 16c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
      </>
    ),
    external: (
      <>
        <path d="M15 4h5v5" />
        <path d="m10 14 10-10" />
        <path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" />
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

function InfoRow({
  icon,
  children,
}: {
  icon: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0 text-[#1677FF]">
        <Icon name={icon} className="h-4 w-4" />
      </span>

      <p className="text-[10px] leading-5 text-black/60">
        {children}
      </p>
    </div>
  );
}

function SalonCard({ salon }: { salon: Salon }) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF6FF]">
        <Image
          src={salon.image}
          alt={`${salon.name}のスタイルイメージ`}
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          style={{
            objectPosition: salon.imagePosition,
          }}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />

        <span className="absolute left-3 top-3 rounded-full bg-[#FFD400] px-3 py-1.5 text-[9px] font-black text-black">
          AI一致度 {salon.matchScore}%
        </span>

        <div className="absolute inset-x-4 bottom-4 text-white">
          <p className="text-[10px] font-bold text-white/70">
            {salon.area}
          </p>

          <h3 className="mt-1 text-[21px] font-black tracking-[-0.035em]">
            {salon.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] tracking-[0.04em] text-[#FFD400]">
              ★★★★★
            </span>

            <span className="text-[11px] font-black">
              {salon.rating}
            </span>

            <span className="text-[8px] text-black/35">
              口コミ{salon.reviewCount}件
            </span>
          </div>

          <span className="text-[11px] font-black text-[#1677FF]">
            {salon.priceLabel}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {salon.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#EEF6FF] px-2 py-1 text-[8px] font-black text-[#1677FF]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2 rounded-[14px] bg-[#F8FAFC] p-3">
          <InfoRow icon="train">
            {salon.access}
          </InfoRow>

          <InfoRow icon="clock">
            {salon.businessHours}
          </InfoRow>

          <InfoRow icon="yen">
            {salon.priceLabel}
          </InfoRow>
        </div>

        <p className="mt-4 text-[10px] leading-5 text-black/55">
          {salon.recommendedReason}
        </p>

        <a
          href={salon.reservationUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#FFD400] px-3 text-[11px] font-black text-black shadow-[0_8px_20px_rgba(255,212,0,0.18)] transition hover:bg-[#FFE04A] active:scale-[0.99]"
        >
          ホットペッパーで詳細・空席を見る

          <Icon
            name="external"
            className="h-4 w-4"
          />
        </a>
      </div>
    </article>
  );
}

export default function SalonPage() {
  return (
    <AppShell>
      <AppHeader
  backHref="/result"
  backMode="history"
  backLabel="前のページへ戻る"
/>
      <div className="px-4 pb-32 pt-6">
        <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
          PERSONAL SALON GUIDE
        </p>

        <h1 className="mt-2 text-[29px] font-black tracking-[-0.045em]">
          あなたに合うおすすめサロン
        </h1>

        <p className="mt-3 text-[11px] leading-5 text-black/50">
          AI診断結果をもとに、現在地周辺で検討しやすいサロンをおすすめ順に整理しました。
        </p>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_16px_46px_rgba(15,23,42,0.07)]">
          <div className="relative aspect-[16/11] overflow-hidden bg-[#EEF6FF]">
            <Image
              src={featuredSalon.image}
              alt={`${featuredSalon.name}のスタイルイメージ`}
              fill
              priority
              sizes="(max-width: 480px) 100vw, 480px"
              style={{
                objectPosition: featuredSalon.imagePosition,
              }}
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-[#FFD400] px-3 py-1.5 text-[9px] font-black text-black">
              AI最優先
            </span>

            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="text-[9px] font-black tracking-[0.12em] text-[#FFD400]">
                BEST MATCH SALON
              </p>

              <h2 className="mt-1 text-[26px] font-black tracking-[-0.04em]">
                {featuredSalon.name}
              </h2>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[12px] text-[#FFD400]">
                  ★★★★★
                </span>

                <span className="text-[11px] font-black">
                  {featuredSalon.rating}
                </span>

                <span className="text-[9px] text-white/55">
                  口コミ{featuredSalon.reviewCount}件
                </span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[15px] bg-[#EEF6FF] p-3">
                <p className="text-[8px] font-black text-[#1677FF]">
                  AI診断一致度
                </p>

                <p className="mt-1 text-[28px] font-black leading-none text-[#1677FF]">
                  {featuredSalon.matchScore}%
                </p>
              </div>

              <div className="rounded-[15px] bg-[#FFF9D9] p-3">
                <p className="text-[8px] font-black text-[#8A6A00]">
                  料金目安
                </p>

                <p className="mt-1 text-[15px] font-black leading-5">
                  {featuredSalon.priceLabel}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {featuredSalon.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#EEF6FF] px-2.5 py-1.5 text-[8px] font-black text-[#1677FF]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-2.5 rounded-[16px] bg-[#F8FAFC] p-4">
              <InfoRow icon="location">
                {featuredSalon.area}
              </InfoRow>

              <InfoRow icon="train">
                {featuredSalon.access}
              </InfoRow>

              <InfoRow icon="clock">
                {featuredSalon.businessHours}
              </InfoRow>

              <InfoRow icon="yen">
                {featuredSalon.priceLabel}
              </InfoRow>
            </div>

            <div className="mt-4 rounded-[16px] border border-[#1677FF]/15 bg-[#F7FAFF] p-4">
              <div className="flex items-center gap-2 text-[#1677FF]">
                <Icon
                  name="sparkle"
                  className="h-5 w-5"
                />

                <p className="text-[11px] font-black">
                  AIからのおすすめ理由
                </p>
              </div>

              <p className="mt-2 text-[10px] leading-5 text-black/55">
                {featuredSalon.recommendedReason}
              </p>
            </div>

            <a
              href={featuredSalon.reservationUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[13px] bg-[#FFD400] px-4 text-[12px] font-black text-black shadow-[0_10px_24px_rgba(255,212,0,0.22)] transition hover:bg-[#FFE04A] active:scale-[0.99]"
            >
              ホットペッパーで詳細・空席を見る

              <Icon
                name="external"
                className="h-4 w-4"
              />
            </a>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-black tracking-[0.15em] text-[#1677FF]">
                NEARBY SALONS
              </p>

              <h2 className="mt-1 text-[22px] font-black tracking-[-0.04em]">
                近くのおすすめサロン
              </h2>
            </div>

            <span className="rounded-full bg-[#EEF6FF] px-3 py-1.5 text-[9px] font-black text-[#1677FF]">
              {nearbySalons.length}件
            </span>
          </div>

          <p className="mt-3 text-[11px] leading-5 text-black/50">
            気になるサロンは、ホットペッパービューティーでメニュー・口コミ・空席状況をご確認ください。
          </p>

          <div className="mt-5 grid gap-5">
            {nearbySalons.map((salon) => (
              <SalonCard
                key={salon.id}
                salon={salon}
              />
            ))}
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section className="mt-10 rounded-[22px] border border-[#1677FF]/15 bg-[#F7FAFF] p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1677FF] shadow-sm">
              <Icon
                name="scissors"
                className="h-5 w-5"
              />
            </span>

            <div>
              <p className="text-[9px] font-black tracking-[0.12em] text-[#1677FF]">
                FIRST SALON GUIDE
              </p>

              <h2 className="mt-1 text-[18px] font-black">
                初めてサロンを予約する方へ
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              "理想に近い髪型の写真を2〜3枚用意する",
              "「爽やかにしたい」など目指す印象を伝える",
              "予約前に料金・所要時間・空席を確認する",
              "自宅でのセット方法も教えてもらう",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[13px] bg-white px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[9px] font-black text-[#1677FF]">
                  {index + 1}
                </span>

                <p className="text-[10px] font-bold leading-5 text-black/60">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <aside className="mt-7 rounded-[14px] bg-[#F8FAFC] px-4 py-4">
          <p className="text-center text-[9px] leading-5 text-black/40">
            ※掲載されている店舗名・料金・営業時間・口コミ数には画面確認用の参考情報が含まれます。
            <br />
            最新情報、メニュー、口コミ、空席状況はホットペッパービューティーでご確認ください。
            <br />
            予約・施術に関する契約は、利用者と各サロンの間で行われます。
          </p>
        </aside>

        <Link
          href="/result"
          className="mt-5 flex min-h-[50px] items-center justify-center rounded-[13px] border border-black/10 bg-white px-5 text-[11px] font-black transition hover:bg-[#F7FAFF]"
        >
          診断結果へ戻る
        </Link>
      </div>
    </AppShell>
  );
}
