import Link from "next/link";

import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";

type MensBeautyBeginnerArticleProps = {
  article: Article;
};

const tableOfContents = [
  {
    id: "start",
    label: "メンズ美容は何から始める？",
  },
  {
    id: "steps",
    label: "初心者がまずやるべき5つ",
  },
  {
    id: "items",
    label: "最低限そろえたいもの",
  },
  {
    id: "mistakes",
    label: "初心者がやりがちな失敗",
  },
  {
    id: "cost",
    label: "メンズ美容にかかる費用",
  },
  {
    id: "priority",
    label: "何から変えるか迷ったら",
  },
  {
    id: "faq",
    label: "よくある質問",
  },
  {
    id: "summary",
    label: "まとめ",
  },
];

const beautySteps = [
  {
    number: "01",
    title: "髪型を整える",
    description:
      "メンズ美容初心者が最初に見直したいのが髪型です。寝ぐせや伸びっぱなしを避けるだけでなく、自分の顔型や髪質に合ったスタイルに整えることで、顔全体の印象が大きく変わります。",
    point:
      "美容室では「清潔感を出したい」「自分に似合う髪型にしたい」と伝えると相談しやすくなります。",
    href: "/media/mens-akanuke-hairstyle",
    linkLabel: "メンズが垢抜ける髪型を詳しく見る",
  },
  {
    number: "02",
    title: "眉毛を整える",
    description:
      "眉毛は目元の印象を左右するパーツです。細くしすぎたり形を大きく変えたりする必要はなく、眉間や眉下の余分な毛を整えるだけでも清潔感が出やすくなります。",
    point:
      "初めて整える場合は、眉毛サロンで一度ベースの形を作ってもらう方法もあります。",
  },
  {
    number: "03",
    title: "スキンケアを始める",
    description:
      "肌を整えるために、最初から多くの化粧品をそろえる必要はありません。まずは洗顔・保湿・日焼け止めの3つを基本にして、毎日続けることを優先しましょう。",
    point:
      "高価な商品よりも、自分の肌に合っていて継続して使える商品を選ぶことが重要です。",
  },
  {
    number: "04",
    title: "ヒゲ・ムダ毛を整える",
    description:
      "ヒゲの剃り残しや鼻毛などは、細かい部分でも清潔感に影響します。ヒゲを残す場合も長さや輪郭を整え、意図して残しているように見える状態を作りましょう。",
    point:
      "肌荒れしやすい場合は、無理に深剃りせず電気シェーバーやシェービング剤を活用しましょう。",
  },
  {
    number: "05",
    title: "清潔感を整える",
    description:
      "髪や肌だけでなく、爪・口元・服・靴・においなども第一印象に関係します。美容を難しく考える前に、日常的な清潔感を整えることが基本です。",
    point:
      "新しいものを買う前に、今使っている服や靴を清潔に保つことから始めても十分です。",
  },
];

const starterItems = [
  {
    title: "洗顔料",
    description:
      "朝や夜に顔の汚れや余分な皮脂を落とします。洗いすぎは乾燥につながるため、強くこすらないことが大切です。",
  },
  {
    title: "化粧水・乳液",
    description:
      "洗顔後の肌を保湿します。最初は複雑な美容液を追加せず、基本的な保湿から始めれば十分です。",
  },
  {
    title: "日焼け止め",
    description:
      "紫外線による乾燥や肌ダメージを防ぐために使用します。季節に関係なく取り入れやすい美容習慣です。",
  },
  {
    title: "整髪料",
    description:
      "髪型を整えて清潔感を保つために使います。自分の髪質やスタイルに合うものを選びましょう。",
  },
  {
    title: "眉毛用ハサミ・シェーバー",
    description:
      "眉毛周辺の余分な毛を整えるために使います。形を大きく変えず、少しずつ整えるのが安全です。",
  },
];

const mistakes = [
  "最初から大量の美容アイテムを買う",
  "SNSで流行している商品をそのまま使う",
  "眉毛を細くしすぎる",
  "スキンケアを数日でやめる",
  "香水を強く付けすぎる",
  "自分に似合うかより流行だけで選ぶ",
];

const faqs = [
  {
    question: "メンズ美容は本当に何から始めればいいですか？",
    answer:
      "まずは髪型・眉毛・スキンケアから始めるのがおすすめです。顔周りは第一印象への影響が大きく、比較的変化を感じやすい部分です。",
  },
  {
    question: "メンズ美容初心者はいくらくらい必要ですか？",
    answer:
      "最初から高額な商品をそろえる必要はありません。洗顔・保湿・日焼け止めなど、必要最低限から始めれば数千円程度でもスタートできます。",
  },
  {
    question: "化粧水や乳液は男性にも必要ですか？",
    answer:
      "男性でも洗顔後に肌が乾燥することがあります。肌状態に合わせて保湿を取り入れることで、乾燥や過度な皮脂を防ぎやすくなります。",
  },
  {
    question: "美容室では何と伝えればいいですか？",
    answer:
      "具体的な髪型が決まっていなくても、「清潔感を出したい」「自分に似合う髪型にしたい」と相談して問題ありません。理想に近い写真があれば一緒に見せると伝わりやすくなります。",
  },
  {
    question: "全部一度に始めた方がいいですか？",
    answer:
      "一度にすべて変える必要はありません。自分にとって改善効果が高そうな項目を1〜2個選び、習慣になってから次へ進む方が継続しやすいです。",
  },
];

export default function MensBeautyBeginnerArticle({
  article,
}: MensBeautyBeginnerArticleProps) {
  return (
    <div className="mx-auto grid max-w-[980px] gap-10 px-5 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-16">
      <aside className="lg:sticky lg:top-[92px] lg:self-start">
        <nav
          aria-label="目次"
          className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5"
        >
          <p className="text-[11px] font-black tracking-[0.12em] text-[#1677FF]">
            CONTENTS
          </p>

          <p className="mt-1 text-[15px] font-black">
            目次
          </p>

          <ol className="mt-4 space-y-3">
            {tableOfContents.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex gap-3 text-[11px] font-medium leading-5 text-black/70 transition hover:text-[#1677FF]"
                >
                  <span className="shrink-0 font-black text-[#1677FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div className="min-w-0">
        <section className="text-[14px] leading-8 text-black/80">
          <p>
            「美容に興味はあるけれど、何から始めればいいか分からない」と感じている男性は少なくありません。
          </p>

          <p className="mt-5">
            メンズ美容というと、たくさんのスキンケア用品やメイク用品が必要なイメージを持つかもしれません。しかし、最初からすべてをそろえる必要はありません。
          </p>

          <p className="mt-5">
            大切なのは、髪型・眉毛・肌・ヒゲ・清潔感など、第一印象への影響が大きい部分から順番に整えることです。この記事では、メンズ美容初心者が最初にやるべきことを分かりやすく解説します。
          </p>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="start"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BEGINNER GUIDE
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容は何から始める？
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/80">
            <p>
              メンズ美容初心者が最初に意識したいのは、「美容アイテムを増やすこと」ではなく「清潔感と第一印象を整えること」です。
            </p>

            <p className="mt-5">
              特に髪型・眉毛・肌は顔周りにあるため、相手から見た印象にも影響しやすい部分です。まずはこの3つを中心に整え、その後ヒゲや服装などへ範囲を広げていくと無理なく続けられます。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              最初に覚えておきたいポイント
            </p>

            <div className="mt-4 space-y-3 text-[12px] font-bold leading-6 text-black/65">
              <p>✓ 高価な商品をそろえる必要はない</p>
              <p>✓ 一度に全部変える必要はない</p>
              <p>✓ 自分に合う方法を継続することが大切</p>
            </div>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            5 STEPS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容初心者がまずやるべき5つ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            何から始めるか迷った場合は、以下の順番を目安にしてください。
          </p>

          <div className="mt-8 space-y-5">
            {beautySteps.map((step) => (
              <section
                key={step.number}
                className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#111111] text-[12px] font-black text-white">
                    {step.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[19px] font-semibold tracking-[-0.035em]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-black/75">
                      {step.description}
                    </p>

                    <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                      <p className="text-[11px] font-bold leading-5 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          POINT
                        </span>

                        {step.point}
                      </p>
                    </div>

                    {"href" in step && step.href && (
                      <Link
                        href={step.href}
                        className="mt-4 flex min-h-[44px] items-center justify-between rounded-[12px] border border-[#1677FF]/15 bg-[#EEF6FF] px-4 text-[11px] font-black text-[#1677FF] transition hover:bg-[#E3F0FF]"
                      >
                        <span>{step.linkLabel}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <AdSenseAd
          className="mt-10"
          format="rectangle"
        />

        <section
          id="items"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            STARTER ITEMS
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容初心者が最低限そろえたいもの
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            最初から多くの商品を買う必要はありません。基本となるアイテムから始めましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {starterItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[16px] font-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <Link
            href="/products"
            className="mt-6 flex min-h-[48px] items-center justify-between rounded-[12px] bg-[#EEF6FF] px-5 text-[12px] font-black text-[#1677FF] transition hover:bg-[#E3F0FF]"
          >
            <span>おすすめ商品を見る</span>
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section
          id="mistakes"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COMMON MISTAKES
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容初心者がやりがちな失敗
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            美容を始めると、さまざまな商品や情報が気になります。しかし、最初からすべてを取り入れると続かなくなることもあります。
          </p>

          <div className="mt-7 space-y-3">
            {mistakes.map((mistake, index) => (
              <div
                key={mistake}
                className="flex items-center gap-4 rounded-[16px] border border-black/10 bg-white px-5 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-[12px] font-bold leading-6 text-black/65">
                  {mistake}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="cost"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            COST
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容にかかる費用の目安
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            メンズ美容は、お金をかければ必ず垢抜けるというものではありません。まずは必要なものだけに絞ることが大切です。
          </p>

          <div className="mt-7 overflow-hidden rounded-[20px] border border-black/10">
            {[
              ["美容室", "4,000〜8,000円程度"],
              ["眉毛ケア", "セルフなら数百〜数千円程度"],
              ["基本スキンケア", "2,000〜5,000円程度から"],
              ["日焼け止め", "1,000〜3,000円程度から"],
              ["整髪料", "1,000〜2,500円程度から"],
            ].map(([label, price]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4 last:border-b-0"
              >
                <span className="text-[12px] font-black">
                  {label}
                </span>

                <span className="text-right text-[11px] font-bold text-black/65">
                  {price}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[10px] font-medium leading-5 text-black/60">
            ※費用は店舗・商品・地域などによって異なります。目安として参考にしてください。
          </p>
        </section>

        <section
          id="priority"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            PRIORITY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            何から変えるか迷ったら？
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              人によって必要な美容ケアは異なります。肌を整えることが優先の人もいれば、髪型を変えるだけで大きく印象が変わる人もいます。
            </p>

            <p className="mt-5">
              自分の改善ポイントが分からない場合は、まず現在の印象を客観的に確認することから始めるのがおすすめです。
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/media/akanukenai-man-features"
              className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/20 hover:bg-[#EEF6FF]"
            >
              <p className="text-[11px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </p>

              <p className="mt-2 text-[15px] font-black leading-6">
                垢抜けない男の特徴10選
              </p>

              <p className="mt-3 text-[11px] font-medium leading-5 text-black/65">
                自分がどこで損をしているのか確認したい方はこちら。
              </p>
            </Link>

            <Link
              href="/media/mens-akanuke-guide"
              className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5 transition hover:border-[#1677FF]/20 hover:bg-[#EEF6FF]"
            >
              <p className="text-[11px] font-black text-[#1677FF]">
                RELATED ARTICLE
              </p>

              <p className="mt-2 text-[15px] font-black leading-6">
                メンズ垢抜け完全ガイド
              </p>

              <p className="mt-3 text-[11px] font-medium leading-5 text-black/65">
                垢抜け全体の方法をまとめて確認したい方はこちら。
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[26px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#111111]">
            自分に必要な美容ケアを、
            <br />
            AIで確認。
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象を分析し、あなたに合った垢抜けプランを提案します。
          </p>

          <Link
            href="/upload"
            className="group mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[13px] bg-[#FFD400] px-5 text-[13px] font-black text-[#111111] shadow-[0_10px_24px_rgba(255,212,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,212,0,0.3)] active:scale-[0.98]"
          >
            <span>無料で診断をはじめる</span>

            <span
              aria-hidden="true"
              className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
            >
              ›
            </span>
          </Link>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-black/60">
            <span>約1分で完了</span>
            <span>無料で利用可能</span>
            <span>メンズ向け</span>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FAQ
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容初心者によくある質問
          </h2>

          <div className="mt-7 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[16px] border border-black/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[13px] font-black">
                  {faq.question}

                  <span className="shrink-0 text-[#1677FF] transition group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <p className="border-t border-black/5 px-5 py-4 text-[12px] font-medium leading-6 text-black/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <AdSenseAd className="mt-10" />

        <section
          id="summary"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            SUMMARY
          </p>

          <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
            メンズ美容は、できることから始めればいい
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              メンズ美容初心者は、最初からたくさんの商品や知識をそろえる必要はありません。まずは髪型・眉毛・肌など、第一印象への影響が大きい部分から始めましょう。
            </p>

            <p className="mt-5">
              大切なのは、一度だけ頑張ることではなく、自分に合う方法を習慣にすることです。少しずつ整えていけば、清潔感や印象の変化につながっていきます。
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
            <Link
              href="/media"
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] border border-black/10 bg-white px-5 text-[12px] font-black"
            >
              記事一覧へ戻る
            </Link>

            <Link
              href="/upload"
              className="group flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] bg-[#FFD400] px-5 text-[12px] font-black text-[#111111] shadow-[0_8px_20px_rgba(255,212,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(255,212,0,0.26)] active:scale-[0.98]"
            >
              <span>無料で診断をはじめる</span>

              <span
                aria-hidden="true"
                className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[15px] font-black leading-none text-[#111111] transition-transform duration-200 group-hover:translate-x-1"
              >
                ›
              </span>
            </Link>
          </div>

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}