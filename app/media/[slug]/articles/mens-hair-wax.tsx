import Image from "next/image";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensHairWaxArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "before", label: "ワックスを付ける前に" },
  { id: "types", label: "スタイリング剤の種類と選び方" },
  { id: "amount", label: "量の目安と考え方" },
  { id: "steps", label: "基本の付け方7ステップ" },
  { id: "mistakes", label: "よくある失敗と直し方" },
  { id: "wash", label: "ワックスの落とし方" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const stylingTypes = [
  {
    name: "ワックス（マット）",
    finish: "ツヤを抑えた自然な仕上がり",
    suited: "ショート〜ミディアム、毛束感や動きを出したい人",
    note: "セット力の強さは製品によって違います。初めてなら、中程度のものが扱いやすいでしょう。",
  },
  {
    name: "ワックス（ツヤ）",
    finish: "適度なツヤのある仕上がり",
    suited: "センターパートなど、まとまりのある髪型",
    note: "付けすぎると、ベタついて見えやすくなります。",
  },
  {
    name: "バーム",
    finish: "しっとりとした、ぬれたような質感",
    suited: "パーマ、毛先の動きを出したい人",
    note: "セット力は控えめなものが多く、立ち上げる髪型には向きにくい傾向があります。",
  },
  {
    name: "ジェル・グリース",
    finish: "強いツヤと、まとまり",
    suited: "かっちりとした、きれいめの髪型",
    note: "ぬれた質感が強く出るため、自然な雰囲気にしたい場合は量を控えます。",
  },
];

const waxSteps = [
  {
    number: "01",
    title: "髪を乾かして形を作る",
    description:
      "ワックスは、作った形を保つためのものです。根元まで乾かして、ドライヤーで大まかな形を作ってから付けます。形ができていない状態で付けても、思った髪型にはなりません。",
    point:
      "ぬれた髪に使う製品もあるため、使い方は製品の表示を確認しましょう。",
  },
  {
    number: "02",
    title: "少量を手のひら全体に伸ばす",
    description:
      "少量を取り、両手のひらをこすり合わせて、指の間まで均一に伸ばします。手のひらに白いかたまりが見えなくなるまで伸ばすのが目安です。",
    point:
      "伸ばし方が足りないと、一部分にだけ多く付いて、ベタついたり束が太くなったりします。",
  },
  {
    number: "03",
    title: "後頭部とトップの内側から付ける",
    description:
      "最初は、手のひらに一番多く付いている状態です。この量を、ボリュームを出したい後頭部やトップの内側から付けていきます。髪の内側に指を入れ、もみ込むようになじませます。",
    point:
      "サイドは膨らみやすいため、付けすぎないようにします。",
  },
  {
    number: "04",
    title: "中間から毛先を中心になじませる",
    description:
      "根元に多く付けると、髪が重くなってつぶれやすくなります。髪の中間から毛先を中心に、手で軽く握るようにしてなじませます。",
    point:
      "頭皮に直接付かないように注意しましょう。",
  },
  {
    number: "05",
    title: "トップを立ち上げ、全体の形を整える",
    description:
      "トップの根元を指で持ち上げ、ドライヤーで作った形に沿って整えます。全体のシルエットを、正面と横から確認します。",
    point:
      "形が決まらない場合は、ワックスを足す前に、乾かし方を見直すほうが効果的です。",
  },
  {
    number: "06",
    title: "前髪は最後に、指に残った量で",
    description:
      "前髪は顔に近く、付けすぎが最も目立つ部分です。新しく取らず、指先に残っているワックスだけで、毛先を軽くつまんで整えます。",
    point:
      "前髪から付け始めると、量が多くなりすぎて重く見えます。",
  },
  {
    number: "07",
    title: "毛束を作り、横と後ろを確認する",
    description:
      "指先で毛先を少量ずつつまみ、軽くねじって毛束を作ります。最後に、合わせ鏡やスマホのカメラで横と後ろを確認し、つぶれている部分や浮いている部分を整えます。",
    point:
      "自分から見えない後頭部は、形が崩れていても気づきにくい部分です。",
  },
];

const mistakes = [
  {
    title: "付けすぎてベタつく",
    description:
      "ティッシュで髪を挟み、余分なワックスを軽く吸い取ります。それでも重い場合は、ドライヤーの温風を軽く当てて手ぐしでほぐすと、なじみやすくなることがあります。どうしても直らない場合は、一度洗い流してやり直すのが確実です。",
  },
  {
    title: "時間がたつとつぶれる",
    description:
      "ワックスの量より、乾かし方が原因のことが多いものです。根元を立ち上げて乾かせているか、冷風で形を固定しているかを見直しましょう。髪がやわらかい人は、セット力の強い製品を試すのも一つの方法です。",
  },
  {
    title: "前髪だけ束が太くなる",
    description:
      "前髪に付ける量が多すぎます。前髪は最後に、手に残った量だけで整えるようにします。",
  },
  {
    title: "白く残る・かたまりができる",
    description:
      "手のひらで十分に伸ばせていないことが原因です。付ける前に、手のひら全体に均一に伸ばしましょう。",
  },
];

const faqs = [
  {
    question: "ワックスはどのくらいの量を使えばいいですか？",
    answer:
      "髪の長さや量、製品によって違います。最初は製品の表示より少なめの量から始め、足りない場合に少しずつ足していきましょう。多すぎた量を減らすのは難しいためです。",
  },
  {
    question: "ワックスは毎日使っても大丈夫ですか？",
    answer:
      "製品の使い方に従い、その日のうちにシャンプーでしっかり落とせば問題ありません。頭皮に直接付けないように注意しましょう。頭皮にかゆみや赤みが出た場合は使用を中止し、続く場合は皮膚科に相談してください。",
  },
  {
    question: "ワックスを付けずに髪型を作ることはできますか？",
    answer:
      "乾かし方を工夫すれば、ワックスなしでも形を作ることはできます。ただし、時間がたつと崩れやすくなります。美容室で「ワックスなしでもまとまる髪型にしたい」と相談するのも一つの方法です。",
  },
  {
    question: "ワックスとヘアオイルは一緒に使えますか？",
    answer:
      "一緒に使うことで、ツヤやまとまりを調整する方法もあります。ただし、量が増えるとベタつきやすくなるため、両方とも少量にとどめましょう。",
  },
  {
    question: "どのワックスを選べばいいか分かりません",
    answer:
      "初めての場合は、ツヤを抑えた、セット力が中程度のワックスが扱いやすいでしょう。美容室でカットしたときに使ってもらった製品を聞いておくのも確実な方法です。",
  },
];

export default function MensHairWaxArticle({
  article,
}: MensHairWaxArticleProps) {
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
            「ワックスを付けるとベタベタになる」「付けても時間がたつとつぶれてしまう」と悩んでいませんか？
          </p>

          <p className="mt-5">
            ワックスの失敗の多くは、量と付ける順番が原因です。特に、前髪から付け始めると、顔に近い部分に一番多く付いてしまい、重く見える原因になります。
          </p>

          <p className="mt-5">
            この記事では、スタイリング剤の種類と選び方、量の考え方、失敗しにくい付け方7ステップ、よくある失敗の直し方、落とし方を解説します。
          </p>
        </section>

        <section
          id="before"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BEFORE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ワックスを付ける前に｜形はドライヤーで作る
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/80">
            <p>
              ワックスは、髪型を「作る」ものではなく、ドライヤーで作った形を「保つ」ためのものです。乾かし方で形ができていないと、ワックスをいくら足しても思った髪型にはならず、量が増えてベタつくだけになりがちです。
            </p>

            <p className="mt-5">
              ワックスでうまくいかないと感じている場合は、まず乾かし方を見直しましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-hair-drying"
              title="メンズの髪の乾かし方を見る"
              description="髪型の土台を作る、根元を中心にした乾かし方を解説しています。"
            />
          </div>
        </section>

        <section
          id="types"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TYPES
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            スタイリング剤の種類と選び方
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            スタイリング剤は、仕上がりの質感とセット力で選びます。作りたい髪型に合わせて選びましょう。
          </p>

          <div className="mt-7 space-y-3">
            {stylingTypes.map((type) => (
              <div
                key={type.name}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <h3 className="text-[16px] font-black">
                  {type.name}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[10px] font-bold text-[#1677FF]">
                    仕上がり：{type.finish}
                  </span>
                </div>

                <p className="mt-3 text-[12px] font-bold leading-6 text-black/70">
                  向いている人：{type.suited}
                </p>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/60">
                  {type.note}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] leading-6 text-black/60">
            ※分類や名称は製品によって異なります。セット力やツヤの程度は、パッケージの表示で確認しましょう。
          </p>
        </section>

        <section
          id="amount"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            AMOUNT
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            量の目安と考え方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              適量は、髪の長さや量、製品のかたさによって違います。まずは製品の表示を確認し、それより少なめの量から始めましょう。
            </p>

            <p className="mt-5">
              ワックスは、足りなければ後から少しずつ足せますが、付けすぎた分を減らすのは難しいものです。「少なめに付けて、足りなければ足す」を基本にすると、ベタつきを防げます。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              自分の適量を見つける方法
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              少なめの量で1日過ごし、夕方に形が崩れていないかを確認します。崩れていれば、次の日は少しだけ増やします。数日続けると、自分の髪に合った量が分かります。
            </p>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            7 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズのワックスの付け方7ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            付ける順番は「後頭部・トップの内側 → 中間から毛先 → 前髪」です。手に一番多く付いている状態で、目立たない部分から付けるのがポイントです。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-hair-wax/mens-hair-wax-order.webp"
              alt="ワックスを後頭部とトップの内側、中間から毛先、前髪の順に付けることを示した図解"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              手に一番多く付いている状態で後頭部とトップの内側から付け、前髪は最後に整えます。
            </figcaption>
          </figure>

          <div className="mt-8 space-y-5">
            {waxSteps.map((step) => (
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
                      <p className="text-[11px] font-bold leading-6 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          POINT
                        </span>

                        {step.point}
                      </p>
                    </div>
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
          id="mistakes"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TROUBLESHOOTING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            よくある失敗と直し方
          </h2>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-hair-wax/mens-hair-wax-hands.webp"
              alt="ワックスが手のひらにかたまりで残った状態と、指の間まで均一に伸ばした状態の比較"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              付ける前に、手のひらから指の間まで、かたまりが見えなくなるまで伸ばします。
            </figcaption>
          </figure>

          <div className="mt-7 space-y-4">
            {mistakes.map((mistake, index) => (
              <div
                key={mistake.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1677FF]">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {mistake.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {mistake.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="wash"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WASH
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ワックスの落とし方
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ワックスを付けた日は、その日のうちにシャンプーで落とします。シャンプーの前に、ぬるま湯で髪と頭皮をしっかりすすいでおくと、泡立ちがよくなり落としやすくなります。
            </p>

            <p className="mt-5">
              セット力の強いワックスや、量を多く使った日は、1回では落としきれないことがあります。洗い上がりに髪がきしむ、ベタつきが残るといった場合は、2回に分けて洗いましょう。
            </p>
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-hairstyle"
              title="メンズが垢抜ける髪型の選び方を見る"
              description="自分に似合う髪型の決め方と、美容室での頼み方を解説しています。"
            />
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[26px] border border-[#1677FF]/15 bg-gradient-to-br from-[#F7FBFF] via-white to-[#EEF6FF] px-6 py-9 shadow-[0_16px_40px_rgba(22,119,255,0.08)] sm:px-9">
          <div className="inline-flex items-center rounded-full bg-[#EEF6FF] px-3 py-1.5">
            <span className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
              AI BEAUTY DIAGNOSIS
            </span>
          </div>

          <h2 className="mt-4 text-[22px] font-semibold sm:text-[26px] leading-[1.45] tracking-[-0.04em] text-[#111111]">
            髪型だけでなく、
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ワックスの付け方についてよくある質問
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

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ワックスは「少なめ」と「付ける順番」がすべて
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              ワックスは、ドライヤーで作った形を保つためのものです。まず乾かし方で形を作り、作りたい髪型に合ったスタイリング剤を、少なめの量から使いましょう。
            </p>

            <p className="mt-5">
              手のひら全体に伸ばしてから、後頭部やトップの内側、中間から毛先の順に付け、前髪は最後に指に残った量で整えます。この順番を守るだけで、ベタつきや重さはかなり防げます。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-hair-drying"
            secondaryLabel="髪の乾かし方を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}