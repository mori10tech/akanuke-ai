import Image from "next/image";

import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensHairDryingArticleProps = {
  article: Article;
};

const tableOfContents = [
  { id: "why", label: "髪型は乾かし方で決まる理由" },
  { id: "prepare", label: "乾かす前の準備" },
  { id: "steps", label: "基本の乾かし方6ステップ" },
  { id: "styles", label: "髪型別の乾かし方のポイント" },
  { id: "trouble", label: "悩み別の乾かし方" },
  { id: "mistakes", label: "よくある失敗" },
  { id: "faq", label: "よくある質問" },
  { id: "summary", label: "まとめ" },
];

const dryingSteps = [
  {
    number: "01",
    title: "前髪から乾かす",
    description:
      "前髪は量が少なく、最初に乾きやすい部分です。ほかの部分を乾かしている間に自然に乾いてしまうと、そのときのくせがついたまま固まります。最初に、作りたい形に向けて乾かしておきましょう。",
    point:
      "分け目を作りたい場合は、分けたい位置を中心に、左右から交互に風を当てると、きれいに分かれやすくなります。",
  },
  {
    number: "02",
    title: "根元から乾かす",
    description:
      "指を頭皮に当てて髪を軽くかき分けながら、根元に風を当てます。根元が乾くと、髪の立ち上がりと全体の形が決まります。毛先は根元を乾かしている間にもある程度乾くため、後回しで構いません。",
    point:
      "ドライヤーは頭から少し離し、同じ場所に当て続けないよう、小刻みに動かします。",
  },
  {
    number: "03",
    title: "ボリュームを出したい部分は、毛の流れと逆から当てる",
    description:
      "トップなど、ふんわりさせたい部分は、普段髪が流れる向きと逆の方向から根元に風を当てます。根元が立ち上がった状態で乾くと、つぶれにくくなります。",
    point:
      "反対に、サイドなど膨らませたくない部分は、上から下に向かって風を当てて抑えます。",
  },
  {
    number: "04",
    title: "最後に、流したい方向から当てて形を整える",
    description:
      "根元が乾いたら、仕上げたい髪型の方向に向けて風を当て、全体の流れを整えます。手ぐしで髪を軽く引っぱりながら当てると、形が決まりやすくなります。",
    point:
      "ここで形を作っておくと、ワックスを使う量を減らせます。",
  },
  {
    number: "05",
    title: "毛先を乾かす",
    description:
      "最後に、まだ湿っている毛先を乾かします。毛先は傷みやすい部分なので、温風を当てすぎないようにしましょう。",
    point:
      "毛先がはねやすい人は、内側に向けて手で軽く押さえながら乾かします。",
  },
  {
    number: "06",
    title: "冷風で形を固定する",
    description:
      "全体が乾いたら、冷風に切り替えて全体に当てます。温かい髪が冷えるときに形が落ち着くため、作った形が崩れにくくなります。",
    point:
      "冷風機能がないドライヤーの場合は、乾かし終えてから少し時間を置き、髪が冷めてから触るようにします。",
  },
];

const hairstyleTips = [
  {
    name: "センターパート",
    tip: "前髪を最初に、分け目を中心に左右から交互に乾かします。分け目の根元が立ち上がると、前髪がぺたんとせず、自然なカーブが出ます。",
  },
  {
    name: "マッシュ",
    tip: "後頭部から前に向かって、髪の表面をなでるように風を当てると、丸みのあるシルエットになります。サイドは上から下に当てて、膨らみを抑えます。",
  },
  {
    name: "アップバング",
    tip: "前髪を指で上に持ち上げながら、根元に下から風を当てます。根元がしっかり立ち上がってからワックスを付けると、時間がたっても下がりにくくなります。",
  },
  {
    name: "ショート",
    tip: "短い髪は乾くのが早いため、根元の立ち上がりを意識して全体を乾かします。トップを毛の流れと逆から乾かすと、頭の形がきれいに見えます。",
  },
];

const troubles = [
  {
    title: "つむじの周りが浮く・割れる",
    description:
      "つむじの周りは、髪が放射状に生えているため割れやすい部分です。つむじを指で押さえながら、左右から交互に風を当てて根元を寝かせるように乾かします。",
  },
  {
    title: "サイドが膨らむ",
    description:
      "髪の量が多い人や、くせが出やすい人に多い悩みです。サイドは根元から上から下に向かって風を当て、手のひらで髪を頭に沿わせるように押さえながら乾かします。",
  },
  {
    title: "トップがつぶれる",
    description:
      "髪がやわらかい人や、直毛の人に多い悩みです。トップの根元を指で持ち上げ、毛の流れと逆方向から風を当てて立ち上げます。最後に冷風を当てると、つぶれにくくなります。",
  },
  {
    title: "くせ毛で広がる",
    description:
      "くせは、髪が乾くときにそのまま固まります。根元から手ぐしで軽く引っぱりながら乾かし、湿った部分が残らないようにします。生乾きの部分があると、そこからくせが出やすくなります。",
  },
];

const mistakes = [
  {
    title: "自然乾燥のまま寝る・出かける",
    description:
      "生えぐせや寝ぐせがそのまま固まり、毎朝のセットに時間がかかる原因になります。",
  },
  {
    title: "毛先から乾かす",
    description:
      "形を決める根元が最後まで湿ったままになり、立ち上がりのないつぶれた仕上がりになりやすくなります。",
  },
  {
    title: "ドライヤーを近づけすぎる",
    description:
      "頭皮や髪に熱が集中し、乾燥や傷みの原因になります。製品の使い方を確認しながら、近づけすぎずに動かして使いましょう。",
  },
  {
    title: "タオルで強くこする",
    description:
      "ぬれた髪は傷みやすい状態です。こすらずに押さえて水分を取りましょう。",
  },
];

const faqs = [
  {
    question: "髪は自然乾燥ではだめですか？",
    answer:
      "髪は乾くときの形で固まるため、自然乾燥では生えぐせや寝ぐせがそのまま残りやすくなります。思いどおりの髪型にしたい場合は、ドライヤーで形を作りながら乾かすのがおすすめです。",
  },
  {
    question: "朝の寝ぐせはどうやって直せばいいですか？",
    answer:
      "寝ぐせのついた部分を、毛先だけでなく根元までしっかりぬらしてから、もう一度乾かします。根元が乾いたときの形が残るため、毛先だけをぬらしても直りにくくなります。",
  },
  {
    question: "夜にお風呂に入った後も乾かすべきですか？",
    answer:
      "はい。ぬれたまま寝ると、寝ぐせがつきやすくなるうえ、翌朝の直しに時間がかかります。夜も根元までしっかり乾かしましょう。",
  },
  {
    question: "ドライヤーにかける時間を短くするには？",
    answer:
      "タオルで水分をしっかり取ることと、根元から乾かすことが効果的です。毛先から乾かすと、全体が乾くまでに時間がかかります。",
  },
  {
    question: "ワックスは乾かしてから付けるべきですか？",
    answer:
      "多くのワックスは、髪を乾かして形を作った後に付けるものです。ただし、ぬれた髪に使う製品もあるため、使い方は製品の表示を確認しましょう。",
  },
];

export default function MensHairDryingArticle({
  article,
}: MensHairDryingArticleProps) {
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
            「美容室ではきれいだったのに、自分ではどうしても同じ髪型にならない」「ワックスを付けても、すぐにつぶれてしまう」と悩んでいませんか？
          </p>

          <p className="mt-5">
            その原因は、ワックスの付け方ではなく、乾かし方にあることがほとんどです。美容師が仕上げに時間をかけるのも、髪型の形の大部分がドライヤーで決まるからです。
          </p>

          <p className="mt-5">
            この記事では、髪型が乾かし方で決まる理由と、乾かす前の準備、基本の乾かし方6ステップ、髪型別・悩み別のポイントを解説します。
          </p>
        </section>

        <section
          id="why"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            WHY
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            髪型は乾かし方で決まる理由
          </h2>

          <div className="mt-6 text-[14px] leading-8 text-black/80">
            <p>
              髪には、水にぬれると形を保つ結びつきの一部が切れ、乾くときにその形のまま固まる性質があります。寝ぐせが水でぬらすと直るのも、この性質によるものです。
            </p>

            <p className="mt-5">
              つまり、髪が乾く瞬間にどんな形になっているかで、その日の髪型の土台が決まります。自然に乾かすと、生えぐせや寝ていたときの形がそのまま残ります。ドライヤーで形を作りながら乾かせば、ワックスに頼らなくても、髪型の大部分を作ることができます。
            </p>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              ポイントは「根元」
            </p>

            <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
              髪の立ち上がりや流れる方向は、根元が乾くときに決まります。毛先ではなく、根元の乾かし方を意識しましょう。
            </p>
          </div>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-hair-drying/mens-hair-drying-root.webp"
              alt="自然乾燥でトップがつぶれた髪と、根元から乾かして立ち上がった髪を比較した画像"
              width={1602}
              height={981}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              根元が寝たまま乾くとトップがつぶれ、根元を立ち上げて乾かすとボリュームが出ます。※画像はイメージです。
            </figcaption>
          </figure>
        </section>

        <section
          id="prepare"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            PREPARE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            乾かす前の準備
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              まず、タオルで髪の水分をしっかり取ります。頭皮をタオルで包むようにして指の腹で押さえ、毛先はタオルで挟んで軽く押さえます。ゴシゴシこすると、ぬれて傷みやすい髪に負担がかかります。
            </p>

            <p className="mt-5">
              水分をしっかり取っておくと、ドライヤーの時間を短くでき、熱による髪の傷みも減らせます。洗い流さないタイプのトリートメントを使う場合は、このタイミングで毛先を中心に付けましょう。
            </p>
          </div>
        </section>

        <section
          id="steps"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            6 STEPS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズの基本の乾かし方6ステップ
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            順番は「前髪 → 根元 → 毛先 → 冷風」です。慣れるまでは、鏡を見ながら1つずつ確認しましょう。
          </p>

          <figure className="mt-7 overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC]">
            <Image
              src="/media/articles/mens-hair-drying/mens-hair-drying-steps.webp"
              alt="前髪、根元、トップ、全体の流れ、毛先、冷風の順に髪を乾かす6つの手順"
              width={1672}
              height={941}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-[11px] font-medium leading-5 text-black/65">
              前髪から始め、根元、トップ、全体の流れ、毛先の順に乾かし、最後に冷風で形を固定します。
            </figcaption>
          </figure>

          <div className="mt-8 space-y-5">
            {dryingSteps.map((step) => (
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
          id="styles"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BY HAIRSTYLE
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            髪型別の乾かし方のポイント
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            基本の手順に加えて、髪型ごとに意識したいポイントがあります。美容室で教わった乾かし方がある場合は、そちらを優先してください。
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {hairstyleTips.map((item) => (
              <div
                key={item.name}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {item.name}
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-akanuke-hairstyle"
              title="メンズが垢抜ける髪型の選び方を見る"
              description="自分に似合う髪型の決め方と、美容室での頼み方を解説しています。"
            />
          </div>
        </section>

        <section
          id="trouble"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            TROUBLESHOOTING
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            悩み別の乾かし方
          </h2>

          <div className="mt-7 space-y-4">
            {troubles.map((trouble, index) => (
              <div
                key={trouble.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {trouble.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {trouble.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="mistakes"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            NG POINTS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            ドライヤーでよくある4つの失敗
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {mistake.title}
                </h3>

                <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                  {mistake.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <JournalRelatedArticleLink
              href="/media/mens-hair-wax"
              title="メンズのワックスの付け方を見る"
              description="乾かして作った形を、ワックスで仕上げる方法を解説しています。"
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
            髪の乾かし方についてよくある質問
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
            髪型の土台は、根元の乾かし方で決まる
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              髪は乾くときの形で固まるため、髪型の大部分はドライヤーで決まります。タオルで水分をしっかり取り、前髪から、根元を中心に乾かしましょう。
            </p>

            <p className="mt-5">
              ボリュームを出したい部分は毛の流れと逆から、抑えたい部分は上から風を当て、最後に冷風で形を固定します。乾かし方が整えば、ワックスの量が少なくても髪型がまとまりやすくなります。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/mens-hair-wax"
            secondaryLabel="ワックスの付け方を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}