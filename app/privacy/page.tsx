import Link from "next/link";

export const metadata = {
  title: "個人情報の取扱い | AKANUKE.AI",
  description:
    "AKANUKE.AIにおける顔画像、診断データ、After画像等の取扱いについてご案内します。",
};

const sections = [
  {
    title: "1. 本ページについて",
    content: (
      <>
        <p>
          本ページは、株式会社レイジェンスが提供する「AKANUKE.AI」における、顔画像、診断データ、AI生成画像その他の個人情報の取扱いについて、サービス固有の内容を補足するものです。
        </p>

        <p>
          当社の個人情報保護に関する基本方針については、株式会社レイジェンスのプライバシーポリシーをご確認ください。
        </p>

        <div className="rounded-[14px] border border-black/10 bg-[#F8FAFC] px-4 py-3">
          <p className="text-[12px] font-bold text-black/55">
            株式会社レイジェンスのプライバシーポリシー
          </p>

          <p className="mt-1 text-[11px] leading-5 text-black/45">
            ※ 現在、掲載ページを準備中です。公開後、本ページからリンクします。
          </p>
        </div>
      </>
    ),
  },
  {
    title: "2. 顔画像の利用目的",
    content: (
      <>
        <p>
          AKANUKE.AIでは、ユーザーがアップロードした顔画像を、以下の目的で利用します。
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            AIによる髪型、眉毛、肌、印象その他の美容・身だしなみに関する分析
          </li>
          <li>
            ユーザーに応じた改善ポイント、垢抜けプランその他の提案の生成
          </li>
          <li>
            Before画像をもとにしたAfterイメージの生成
          </li>
          <li>
            診断履歴および関連する画像をユーザー本人へ表示するため
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. 保存する情報",
    content: (
      <>
        <p>
          本サービスでは、診断履歴を提供するため、以下の情報を保存する場合があります。
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>ユーザーがアップロードした顔画像（Before画像）</li>
          <li>AIにより生成されたAfter画像</li>
          <li>AIによる診断結果</li>
          <li>垢抜けプランおよびその進捗情報</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. 保存場所",
    content: (
      <>
        <p>
          顔画像、After画像、診断データその他の本サービスに必要な情報は、当社が利用するクラウドサービス上で適切に管理します。
        </p>

        <p>
          画像はSupabase Storage、診断データその他の関連情報はSupabase Database等を利用して保存します。
        </p>
      </>
    ),
  },
  {
    title: "5. 保存期間および削除",
    content: (
      <>
        <p>
          本サービスでは、診断履歴として最新3件を保持します。4件目以降の古い診断履歴および関連するBefore画像・After画像は順次削除します。
        </p>

        <p>
          また、最終ログインから1年間ログインがないユーザーについては、保存されている診断データ、Before画像およびAfter画像を削除します。
        </p>

        <p>
          その後再度本サービスへログインした場合でも、削除済みの診断履歴や画像を復元することはできません。
        </p>
      </>
    ),
  },
  {
    title: "6. 退会時の取扱い",
    content: (
      <>
        <p>
          ユーザーが所定の手続きによりAKANUKE.AIを退会した場合、当該アカウントに紐づく診断データ、Before画像、After画像その他当社が削除対象として定める情報を削除します。
        </p>

        <p>
          ただし、法令上保存が必要な情報その他正当な理由により保持が必要な情報については、必要な期間に限り保存する場合があります。
        </p>
      </>
    ),
  },
  {
    title: "7. After画像の取扱い",
    content: (
      <>
        <p>
          After画像は、ユーザー本人の顔画像をもとにAIが生成する画像であり、本人の顔を含む個人情報として、Before画像と同様に取り扱います。
        </p>

        <p>
          After画像についても、最新3件の診断履歴に関連する範囲で保存し、最終ログインから1年間ログインがない場合または退会した場合には、対象となる画像を削除します。
        </p>
      </>
    ),
  },
  {
    title: "8. 外部AIサービスへの送信",
    content: (
      <>
        <p>
          AKANUKE.AIでは、AI診断およびAfter画像生成等の処理を行うため、必要な範囲でユーザーが提供した顔画像その他の情報を外部AIサービスであるOpenAIのサービスへ送信します。
        </p>

        <p>
          この処理は、本サービス提供に必要な業務の委託として行うものです。
        </p>

        <p>
          送信された情報は、国外で取り扱われる場合があります。
        </p>
      </>
    ),
  },
  {
    title: "9. AI学習への利用",
    content: (
      <>
        <p>
          株式会社レイジェンスは、ユーザーがAKANUKE.AIへアップロードした顔画像を、本サービスの提供とは無関係な独自AIモデルの学習を目的として利用しません。
        </p>

        <p>
          また、AKANUKE.AIで利用しているOpenAIの組織設定では、APIの入力・出力等をOpenAIのモデル改善のために共有する設定を無効にしています。
        </p>
      </>
    ),
  },
  {
    title: "10. 未成年者の利用",
    content: (
      <>
        <p>
          13歳未満の方はAKANUKE.AIを利用できません。
        </p>

        <p>
          18歳未満の方は、親権者その他の法定代理人の同意を得た上で利用してください。
        </p>
      </>
    ),
  },
  {
    title: "11. お問い合わせ",
    content: (
      <>
        <p>
          本サービスにおける個人情報の取扱いに関するお問い合わせは、AKANUKE.AIのお問い合わせページからご連絡ください。
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-bold text-[#1677FF] transition-opacity hover:opacity-70"
        >
          お問い合わせページ
          <span aria-hidden="true">→</span>
        </Link>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="border-b border-black/10">
        <div className="mx-auto flex h-[68px] w-full max-w-[760px] items-center px-5 sm:px-8">
          <Link
            href="/"
            className="text-[18px] font-black tracking-[-0.03em] text-[#111111] transition-opacity hover:opacity-70"
          >
            AKANUKE.AI
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <div className="border-b border-black/10 pb-10">
          <p className="text-[11px] font-black tracking-[0.18em] text-[#1677FF]">
            PRIVACY
          </p>

          <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] sm:text-[36px]">
            個人情報の取扱い
          </h1>

          <p className="mt-5 text-[14px] leading-7 text-black/55">
            AKANUKE.AIで取り扱う顔画像、診断データ、After画像等について、サービス固有の取扱いをご案内します。
          </p>
        </div>

        <div className="divide-y divide-black/10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="py-9 sm:py-10"
            >
              <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
                {section.title}
              </h2>

              <div className="mt-5 space-y-3 text-[14px] leading-7 text-black/65">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-4 border-t border-black/10 pt-8">
          <p className="text-[13px] leading-7 text-black/50">
            制定日：2026年9月10日
          </p>

          <p className="mt-1 text-[13px] leading-7 text-black/50">
            株式会社レイジェンス
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1677FF] transition-opacity hover:opacity-70"
          >
            <span aria-hidden="true">←</span>
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}