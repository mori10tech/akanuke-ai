import Image from "next/image";

import type { Article } from "../../../../data/articles";

import AdSenseAd from "../../../components/AdSenseAd";

import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";

import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";

type Props = {

  article: Article;

};

const tableOfContents = [

  {

    id: "what-is",

    label: "メンズコンシーラーとは？",

  },

  {

    id: "bb-cream-difference",

    label: "BBクリームとの違い",

  },

  {

    id: "concerns",

    label: "コンシーラーで隠せる悩み",

  },

  {

    id: "how-to",

    label: "基本的な使い方",

  },

  {

    id: "blue-beard",

    label: "青髭を自然に隠す方法",

  },

  {

    id: "acne",

    label: "ニキビ跡を隠す方法",

  },

  {

    id: "dark-circles",

    label: "クマを隠す方法",

  },

  {

    id: "color",

    label: "色の選び方",

  },

  {

    id: "mistakes",

    label: "よくある失敗",

  },

  {

    id: "order",

    label: "BBクリームと使う順番",

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

const concerns = [

  {

    number: "01",

    title: "青髭",

    description:

      "鼻下やあごなど、髭を剃った後にも残る青みを部分的にカバーしたいときに使えます。",

  },

  {

    number: "02",

    title: "ニキビ・ニキビ跡",

    description:

      "赤みや色素沈着など、顔全体ではなく一部分だけ気になる箇所を目立ちにくくできます。",

  },

  {

    number: "03",

    title: "目の下のクマ",

    description:

      "目元の暗さが気になる場合、必要な部分だけ明るさを整えるために使えます。",

  },

  {

    number: "04",

    title: "シミ・色ムラ",

    description:

      "BBクリームだけでは残る部分的な色ムラを、必要な範囲だけ追加でカバーできます。",

  },

];

const basicSteps = [

  {

    title: "少量だけ取る",

    description:

      "スティックなら先端を直接広く塗らず、清潔な指先に少し取ります。リキッドなら一度手の甲に出し、米粒より少ない量を目安に気になる部分へ点置きします。製品によって伸び方が違うため、足りなければ少しずつ追加します。",

  },

  {

    title: "気になる部分だけに置く",

    description:

      "鏡で色が気になる場所を確認し、最初は小さな範囲に1〜2点だけ置きます。青髭なら鼻下やあごの青みが目立つところ、ニキビ跡なら跡の中心、クマなら特に暗い部分を狙い、周囲まで広げすぎないようにします。",

  },

  {

    title: "指やスポンジで境目をなじませる",

    description:

      "清潔な指の腹や小さなスポンジで、塗った部分の外側を軽くトントンとたたきます。中心を何度もこするとカバーした色が取れやすいため、境目だけを少しずつぼかします。",

  },

  {

    title: "明るい場所で仕上がりを確認する",

    description:

      "鏡を顔から少し離し、正面と斜めの両方から確認します。可能なら窓際など自然光に近い明るさでも見て、塗った部分が白く浮く・厚く見える場合は、清潔なスポンジで軽く押さえて余分な量を取ります。",

  },

];

const mistakes = [

  {

    title: "最初から厚く塗る",

    description:

      "厚塗りすると、笑ったときのしわや毛穴にたまりやすくなります。すでに厚くなった場合は、清潔なスポンジで軽く押さえて余分な量を取り、必要な部分にだけ薄く塗り直します。",

  },

  {

    title: "気になる部分より広く塗る",

    description:

      "青髭を隠そうとして頬まで広げるなど、必要以上に塗ると周囲との色の差が目立ちます。まずは色が気になる部分だけに置き、広い範囲の色ムラはBBクリームなどで薄く整える方法も検討します。",

  },

  {

    title: "色だけで選ぶ",

    description:

      "手の甲と顔では肌色が違う場合があります。可能ならフェイスライン付近で色を確認し、周囲より明るく浮かないかチェックします。青髭の補正色は、オレンジ色が見えすぎないよう上から肌色に近い色で薄く整えます。",

  },

  {

    title: "境目をそのまま残す",

    description:

      "塗った箇所の輪郭が見える場合は、中心を触りすぎず、境目だけを清潔な指やスポンジで軽くたたきます。ぼかしても色が浮くときは、量ではなく色選びを見直します。",

  },

];

const faqs = [

  {

    question: "男性でもコンシーラーを使って大丈夫ですか？",

    answer:

      "もちろん使えます。コンシーラーは性別に関係なく、青髭・ニキビ跡・クマなど部分的な肌悩みをカバーするために使われるアイテムです。",

  },

  {

    question: "コンシーラーを使うとメイクしていると分かりますか？",

    answer:

      "使用量や色選びによって仕上がりは変わります。少量を気になる部分だけに使い、周囲との境目をなじませることで自然に仕上げやすくなります。",

  },

  {

    question: "BBクリームとコンシーラーはどちらを先に使いますか？",

    answer:

      "BBクリームを使う場合は、まず顔全体をBBクリームで薄く整え、その後にまだ気になる部分へコンシーラーを少量追加すると調整しやすくなります。",

  },

  {

    question: "青髭にはどんな色のコンシーラーが合いますか？",

    answer:

      "青みを補正する目的では、オレンジやピーチ寄りの色が使われることがあります。ただし、肌色や青みの強さによって仕上がりは変わるため、少量から試しましょう。",

  },

  {

    question: "ニキビの上にコンシーラーを塗ってもいいですか？",

    answer:

      "肌状態によっては刺激になることがあります。痛み・腫れ・傷などがある場合は無理にカバーせず、肌の状態を優先してください。",

  },

];

export default function MensConcealerArticle({

  article,

}: Props) {

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

            「青髭を隠したい」「ニキビ跡だけ目立たなくしたい」「目の下のクマが気になる」という男性もいるのではないでしょうか。

          </p>

          <p className="mt-5">

            顔全体にファンデーションを塗るほどではないけれど、気になる部分だけ自然に整えたい。そんなときに使いやすいのがコンシーラーです。

          </p>

          <p className="mt-5">

            コンシーラーは、青髭・ニキビ跡・クマ・シミなど、部分的に気になるところをカバーするためのアイテムです。

          </p>

          <p className="mt-5">

            この記事では、メンズコンシーラーの基本的な使い方から、青髭・ニキビ跡・クマを自然に隠す方法、色選び、BBクリームとの使い分けまで初心者向けに解説します。

          </p>

        </section>


        <section

          id="what-is"

          className="scroll-mt-24 pt-14"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            CONCEALER

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            メンズコンシーラーとは？

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              コンシーラーは、顔全体ではなく、肌の気になる部分をピンポイントでカバーするために使うアイテムです。

            </p>

            <p className="mt-5">

              男性の場合は、特に青髭・ニキビ跡・クマなどを目立ちにくくする目的で取り入れやすいでしょう。

            </p>

            <p className="mt-5">

              大切なのは「完全に隠すこと」ではありません。気になる部分だけを少し整え、顔全体として自然に見える状態を目指すことです。

            </p>

          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">

            <p className="text-[12px] font-black text-[#1677FF]">

              初心者が覚えておきたいポイント

            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">

              コンシーラーは「隠したいから多く塗る」のではなく、「必要な部分だけ少量使う」方が自然に仕上げやすくなります。

            </p>

          </div>

        </section>

        <section

          id="bb-cream-difference"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            BB CREAM VS CONCEALER

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            BBクリームとコンシーラーの違い

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              メンズ美容初心者が迷いやすいのが、BBクリームとコンシーラーの違いです。

            </p>

            <p className="mt-5">

              BBクリームは、顔全体へ薄く塗り、肌の色ムラ・毛穴・青髭などをまとめて自然に整えるために使いやすいアイテムです。

            </p>

            <p className="mt-5">

              一方、コンシーラーは、BBクリームを塗っても残る青髭やニキビ跡など、「ここだけもう少し隠したい」という部分をカバーするのに向いています。

            </p>

            <p className="mt-5">

              そのため、初心者は「顔全体はBBクリーム、気になる部分だけコンシーラー」と考えると分かりやすいでしょう。

            </p>

          </div>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-concealer/mens-concealer-bb-comparison.webp"
              alt="BBクリームとコンシーラーの用途の違いを比較した解説画像"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              BBクリームは顔全体、コンシーラーは気になる部分をカバーするためのアイテムです。
            </figcaption>
          </figure>

          <div className="mt-7">

            <JournalRelatedArticleLink

              href="/media/mens-bb-cream"

              title="メンズBBクリームの使い方を見る"

              description="初心者向けに、選び方・塗る順番・自然に仕上げるコツを詳しく解説。"

            />

          </div>

        </section>

        <section

          id="concerns"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            COVER POINTS

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            メンズコンシーラーで隠せる主な悩み

          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            {concerns.map((item) => (

              <article

                key={item.number}

                className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)]"

              >

                <div className="flex items-start gap-4">

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#1677FF] text-[11px] font-black text-white">

                    {item.number}

                  </span>

                  <div>

                    <h3 className="text-[16px] font-black">

                      {item.title}

                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">

                      {item.description}

                    </p>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

        <AdSenseAd

          className="mt-10"

          format="rectangle"

        />

        <section

          id="how-to"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            HOW TO

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            メンズコンシーラーの基本的な使い方

          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">

            初心者は、一度で完璧に隠そうとせず、少量ずつ調整するのがポイントです。

          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            {basicSteps.map((item, index) => (

              <article

                key={item.title}

                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"

              >

                <div className="flex items-start gap-3">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">

                    {String(index + 1).padStart(2, "0")}

                  </span>

                  <div>

                    <h3 className="text-[15px] font-black">

                      {item.title}

                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">

                      {item.description}

                    </p>

                  </div>

                </div>

              </article>

            ))}

          </div>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-concealer/mens-concealer-how-to.webp"
              alt="男性が指でコンシーラーを頬になじませる様子"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              少量を気になる部分に置き、境目をやさしくなじませます。
            </figcaption>
          </figure>

        </section>

        <section

          id="blue-beard"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            BLUE BEARD

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            青髭を自然に隠す方法

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              髭をきれいに剃っても鼻下やあごが青く見える場合、皮膚の下に残っている髭が透けて見えている可能性があります。

            </p>

            <p className="mt-5">

              青髭をカバーするときは、まず髭を整え、必要であればBBクリームで顔全体を薄く整えます。

            </p>

            <p className="mt-5">

              それでも青みが残る鼻下やあごへ、コンシーラーを点置きします。青みが強い場合は、オレンジやピーチ寄りの補正色を薄く仕込み、その上から肌色に近いコンシーラーを重ねる方法もあります。補正色を広く塗るとオレンジ色が目立つため、最初は狭い範囲で試してください。

            </p>

            <p className="mt-5">

              鼻下だけ完全に消そうとして厚く塗ると、口周りだけ色や質感が変わって見えることがあります。塗った後は口を動かしてヨレを確認し、鏡を少し離して見て、顔全体として自然なところで止めましょう。

            </p>

          </div>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-concealer/mens-concealer-beard-shadow.webp"
              alt="青髭をコンシーラーでカバーする前後と使用手順のイメージ"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              青髭のカバー方法を示したAI生成イメージです。仕上がりには個人差があります。
            </figcaption>
          </figure>

          <div className="mt-7">

            <JournalRelatedArticleLink

              href="/media/mens-blue-beard"

              title="メンズの青髭対策を詳しく見る"

              description="青髭が目立つ原因から、髭剃り・BBクリーム・長期的な対策まで詳しく解説。"

            />

          </div>

        </section>

        <section

          id="acne"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            ACNE MARKS

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            ニキビ・ニキビ跡を自然に隠す方法

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              ニキビ跡や赤みなど、一部分だけ色が目立つ場合にもコンシーラーを使えます。

            </p>

            <p className="mt-5">

              赤みや跡の中心に、肌色に近いコンシーラーを清潔な指先で小さく置きます。数秒なじませてから、周囲との境目だけを軽くたたくと、中心のカバー力を残しやすくなります。

            </p>

            <p className="mt-5">

              隠したい部分そのものを強くこすると、せっかくのせたコンシーラーが取れてしまいます。まだ赤みが見える場合も、一度に厚く重ねず、薄い層を少しずつ追加します。

            </p>

            <p className="mt-5">

              なお、赤く腫れている・痛みがある・傷になっているなど肌状態が良くない場合は、見た目を隠すことより肌を刺激しないことを優先してください。

            </p>

          </div>

        </section>

        <section

          id="dark-circles"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            DARK CIRCLES

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            目の下のクマを自然に隠す方法

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              目の下が暗く見えると、実際には疲れていなくても疲れた印象に見えることがあります。

            </p>

            <p className="mt-5">

              コンシーラーを使う場合は、目の下全体を厚く塗らず、特に影が濃い部分に少量置きます。目のきわまで無理に塗り広げず、指の腹で軽くたたいてなじませます。目に入らないよう注意してください。

            </p>

            <p className="mt-5">

              目元は表情によって動きやすく、厚く塗ると細かいしわにたまりやすくなります。笑ったときに筋が出る場合は、スポンジで余分な量を軽く押さえます。なお、骨格による影は色だけでは完全に消せない場合があります。

            </p>

          </div>

        </section>

        <section

          id="color"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            COLOR

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            メンズコンシーラーの色の選び方

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              コンシーラーを自然に見せるためには、塗り方だけでなく色選びも重要です。

            </p>

            <p className="mt-5">

              ニキビ跡やシミなどを隠したい場合は、基本的に自分の肌色に近い色を選びます。店頭で試せるならフェイスライン付近でなじみ方を確認し、顔と首の色の差が大きくならないか見てください。

            </p>

            <p className="mt-5">

              明るすぎるコンシーラーを使うと、隠した部分だけ白く浮いて見えることがあります。反対に暗すぎると、ニキビ跡やクマがかえって目立つ場合があります。

            </p>

            <p className="mt-5">

              青髭など青みを補正したい場合には、オレンジやピーチ系の色が使われることもあります。補正色は青みのある部分だけに薄く置き、必要に応じて肌色に近い色を重ねます。肌色や青みの強さによって合う色は異なるため、少量で試してください。

            </p>

          </div>

          <div className="mt-7 rounded-[20px] border border-[#FFD400]/40 bg-[#FFF9D9] p-5">

            <p className="text-[12px] font-black text-[#111111]">

              色選びで迷ったら

            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">

              まずは肌色に近い色を1色試し、自然光に近い場所で白浮きしないか確認します。青髭だけが残る場合は補正色を検討し、色が目立つなら量を減らして調整しましょう。

            </p>

          </div>

        </section>

        <section

          id="mistakes"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            NG POINTS

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            メンズコンシーラーでよくある4つの失敗

          </h2>

          <div className="mt-7 space-y-4">

            {mistakes.map((item, index) => (

              <div

                key={item.title}

                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"

              >

                <div className="flex items-start gap-3">

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">

                    {index + 1}

                  </span>

                  <div>

                    <h3 className="text-[15px] font-black">

                      {item.title}

                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">

                      {item.description}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        <section

          id="order"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            ORDER

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            BBクリームとコンシーラーを使う順番

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              BBクリームとコンシーラーを一緒に使う場合は、まずBBクリームで顔全体を薄く整えます。

            </p>

            <p className="mt-5">

              その後、まだ気になる青髭・ニキビ跡・クマなどへコンシーラーを少量追加します。

            </p>

            <p className="mt-5">

              先に顔全体を整えることで、どこにコンシーラーが本当に必要なのか判断しやすくなり、厚塗りも防ぎやすくなります。

            </p>

          </div>

          <div className="mt-7 rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5">

            <div className="space-y-3 text-[13px] font-bold text-[#111111]">

              <p>

                <span className="mr-3 text-[#1677FF]">

                  01

                </span>

                スキンケア

              </p>

              <p>

                <span className="mr-3 text-[#1677FF]">

                  02

                </span>

                日焼け止め

              </p>

              <p>

                <span className="mr-3 text-[#1677FF]">

                  03

                </span>

                BBクリーム

              </p>

              <p>

                <span className="mr-3 text-[#1677FF]">

                  04

                </span>

                コンシーラー

              </p>

            </div>

          </div>

        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">

          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">

            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

              AI BEAUTY DIAGNOSIS

            </span>

          </div>

          <h2 className="mt-4 text-[22px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#111111] sm:text-[26px]">

            肌だけでなく、

            <br />

            顔全体の改善ポイントを確認

          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">

            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析。自分はどこから整えるべきかを確認できます。

          </p>

          <JournalDiagnosisCta />

        </section>

        <section

          id="faq"

          className="scroll-mt-24 pt-16"

        >

          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">

            FAQ

          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            メンズコンシーラーについてよくある質問

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

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] sm:text-[26px]">

            コンシーラーは「必要な部分だけ少量」が基本

          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">

            <p>

              コンシーラーは、青髭・ニキビ跡・クマなど、気になる部分だけを自然に整えたい男性に使いやすいアイテムです。最初は狭い範囲に少量置き、境目をぼかすだけでも仕上がりが変わります。

            </p>

            <p className="mt-5">

              初心者は、最初から完全に隠そうとせず、鏡を少し離して見たときに不自然な色の差がない状態を目安にすると判断しやすくなります。

            </p>

            <p className="mt-5">

              BBクリームで顔全体を整えた後に、まだ気になる部分だけコンシーラーを追加すると、厚塗りを防ぎながら自然に仕上げやすくなります。

            </p>

            <p className="mt-5">

              肌だけでなく髪型・眉毛・ヒゲなども含め、顔全体のバランスを整えることが、第一印象を変えていくうえで大切です。

            </p>

          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">

            <JournalRelatedArticleLink

              href="/media/mens-blue-beard"

              title="メンズの青髭対策"

              description="青髭が目立つ原因から、自然に隠す方法・長期的な対策まで詳しく解説。"

            />

            <JournalRelatedArticleLink

              href="/media/mens-bb-cream"

              title="メンズBBクリームの使い方"

              description="青髭・毛穴・肌の色ムラを自然に整える基本の使い方を解説。"

            />

          </div>

          <p className="sr-only">

            {article.title}

          </p>

        </section>

      </div>

    </div>

  );

}