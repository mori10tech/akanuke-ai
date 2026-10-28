import Link from "next/link";
import type { Article } from "../../../../data/articles";
import AdSenseAd from "../../../components/AdSenseAd";
import JournalDiagnosisCta from "../../components/JournalDiagnosisCta";
import JournalRelatedArticleLink from "../../components/JournalRelatedArticleLink";
import JournalArticleFooterNav from "../../components/JournalArticleFooterNav";

type MensAkanukeOrderArticleProps = {
  article: Article;
};

type Step = {
  number: string;
  title: string;
  why: string;
  action: string;
  timing: string;
  cost: string;
  href?: string;
  linkLabel?: string;
};

const tableOfContents = [
  {
    id: "rules",
    label: "順番を決める3つの基準",
  },
  {
    id: "steps",
    label: "メンズが垢抜ける7ステップ",
  },
  {
    id: "plan",
    label: "4週間で進めるスケジュール例",
  },
  {
    id: "exceptions",
    label: "順番を変えたほうがいいケース",
  },
  {
    id: "budget",
    label: "費用で考える進め方",
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

const rules = [
  {
    number: "01",
    title: "人から見える面積が大きいものを先に",
    description:
      "会話中の相手は、まず顔周りを見ます。髪型は顔の輪郭を囲む面積が大きいため、変えたときの印象の差が出やすい部分です。小物や香水のように目に入りにくいものは、後回しで構いません。",
  },
  {
    number: "02",
    title: "ほかの工程の前提になるものを先に",
    description:
      "前髪の長さや分け目によって、眉の見え方は変わります。髪型が決まる前に眉の形を整えると、カット後に印象がずれることがあります。このように、後の工程に影響するものから順に整えると、やり直しを減らせます。",
  },
  {
    number: "03",
    title: "時間がかかるものは早めに始める",
    description:
      "髪型や眉は1回の作業で変わりますが、肌の状態は数週間単位でしか変わりません。順番としては3番目でも、毎日の習慣は1日目から始めておくと、ほかの改善と同じ時期に変化を感じやすくなります。",
  },
];

const steps: Step[] = [
  {
    number: "01",
    title: "髪型を整える",
    why:
      "顔周りで最も面積が大きく、眉の見え方など、後の工程の前提にもなるためです。",
    action:
      "前髪が目にかかる、耳周りがはねる、襟足が襟に触れるなど、形が崩れていればカットを予約します。美容室では「朝のセットは5分以内」など、普段の手入れ時間を伝えましょう。",
    timing: "1回の来店で変わる",
    cost: "美容室の料金",
    href: "/media/mens-akanuke-hairstyle",
    linkLabel: "似合う髪型の選び方と頼み方を見る",
  },
  {
    number: "02",
    title: "眉毛を整える",
    why:
      "髪型が決まった後のほうが、前髪とのバランスを見ながら整えられるためです。",
    action:
      "カット後の髪型で鏡を見て、眉間と眉下のはみ出した毛、長すぎる毛だけを処理します。形を大きく変えたい場合は、眉毛サロンで相談するのも一つの方法です。",
    timing: "1回の手入れで変わる",
    cost: "ほぼ0円（眉用ハサミなど）",
    href: "/media/mens-akanuke-eyebrows",
    linkLabel: "失敗しない眉毛の整え方を見る",
  },
  {
    number: "03",
    title: "肌を整える",
    why:
      "変化に時間がかかるため、順番は3番目でも、習慣は1日目から並行して始めます。",
    action:
      "洗顔・保湿・日焼け止めの3つから始めます。使い始めてから2週間ほどは商品を変えずに続け、刺激や赤みが出た場合は使用を中止します。",
    timing: "数週間かけて変わる",
    cost: "消耗品の費用",
    href: "/media/mens-skincare-beginner",
    linkLabel: "スキンケアの基本3ステップを見る",
  },
  {
    number: "04",
    title: "ヒゲ・ムダ毛を整える",
    why:
      "口元や鼻は会話中に視線が向く位置で、髪や肌を整えた後は特に目立ちやすくなるためです。",
    action:
      "あご下の剃り残しと、外から見える鼻毛を確認します。ヒゲを残す場合は、長さと輪郭をそろえます。",
    timing: "毎日の手入れ",
    cost: "ほぼ0円（今ある道具）",
    href: "/media/mens-beard-grooming",
    linkLabel: "清潔感を出すヒゲの整え方を見る",
  },
  {
    number: "05",
    title: "服のサイズと状態を見直す",
    why:
      "顔周りが整った後に見直すと、髪型と服の雰囲気を合わせやすくなるためです。",
    action:
      "まず手持ちの服のサイズと状態（毛玉・首元の伸び・靴の汚れ）を確認します。買い足すのは、その後で構いません。",
    timing: "買い物のタイミングで変わる",
    cost: "手持ちの見直しは0円",
  },
  {
    number: "06",
    title: "姿勢を整える",
    why:
      "髪や服が整っていても、猫背やうつむきがちな姿勢では印象が変わりにくいためです。",
    action:
      "スマホの画面を目の高さに近づけ、うつむく時間を減らします。人と話すときは、少し顔を上げることを意識します。",
    timing: "習慣で少しずつ変わる",
    cost: "0円",
  },
  {
    number: "07",
    title: "写真で比べて、次の改善を決める",
    why:
      "1〜6を進めたあとの状態を確かめ、次に何をするかを決めるためです。",
    action:
      "始める前と同じ場所・同じ明るさで写真を撮り、比べます。変化が少ない部分があれば、次の改善候補にします。",
    timing: "1か月ごとが目安",
    cost: "0円",
    href: "/media/akanukenai-man-features",
    linkLabel: "写真3枚でできるセルフチェックを見る",
  },
];

const weeklyPlan = [
  {
    week: "1週目",
    title: "現状を記録して、習慣を始める",
    items: [
      "始める前の写真を撮っておく（後で比べるため）",
      "美容室を予約する",
      "洗顔・保湿・日焼け止めを始める",
      "ヒゲの剃り残しと鼻毛を確認する",
    ],
  },
  {
    week: "2週目",
    title: "髪を切り、眉を整える",
    items: [
      "美容室でカットし、乾かし方とセット方法を聞く",
      "カット後の髪型に合わせて眉を整える",
      "スキンケアは商品を変えずに続ける",
    ],
  },
  {
    week: "3週目",
    title: "服を見直す",
    items: [
      "手持ちの服のサイズと状態を確認する",
      "状態の悪い服を部屋着にする、または処分する",
      "必要なものだけ買い足す",
    ],
  },
  {
    week: "4週目",
    title: "姿勢を意識し、比べる",
    items: [
      "うつむく時間を減らす工夫をする",
      "1週目と同じ条件で写真を撮り、比べる",
      "次の1か月で取り組むことを1つ決める",
    ],
  },
];

const exceptions = [
  {
    title: "すでに髪型が整っている",
    description:
      "最近美容室で切ったばかりで形が崩れていなければ、眉毛またはヒゲから始めて構いません。",
  },
  {
    title: "肌荒れやニキビが強い",
    description:
      "肌の悩みが一番気になる場合は、スキンケアと並行して早めに皮膚科を受診するのがおすすめです。自己判断で商品を増やすと、かえって悪化することがあります。",
  },
  {
    title: "職場や学校で髪型に制限がある",
    description:
      "髪型を大きく変えられない場合は、長さを変えずにできる「襟足や耳周りを整える」程度にとどめ、眉・ヒゲ・服の改善を優先します。",
  },
  {
    title: "近いうちに大事な予定がある",
    description:
      "切った直後の髪型は見慣れないことがあるため、カットは予定の数日前にしておくと安心です。眉も同じ考え方で、前日に大きく形を変えるのは避けましょう。",
  },
];

const budgetLevels = [
  {
    title: "費用がほとんどかからないこと",
    description:
      "眉間の毛の処理、鼻毛の確認、服や靴の手入れ、姿勢の意識、写真での記録。今日から始められます。",
  },
  {
    title: "消耗品で済むこと",
    description:
      "洗顔料・保湿剤・日焼け止め・眉用ハサミなど。使い切ってから次を買えばよく、最初から複数そろえる必要はありません。",
  },
  {
    title: "サービスを利用すること",
    description:
      "美容室・眉毛サロンなど。費用はかかりますが、自分では判断しにくい部分をプロに見てもらえるため、迷ったときほど効果的です。",
  },
];

const faqs = [
  {
    question: "メンズが垢抜けるには何から始めるのが一番ですか？",
    answer:
      "迷った場合は髪型からがおすすめです。顔周りで最も面積が大きく、眉の見え方など、後の工程の前提にもなるためです。ただし、肌の習慣は時間がかかるため、髪型と同時に始めておきましょう。",
  },
  {
    question: "眉毛は髪を切る前と後、どちらに整えるべきですか？",
    answer:
      "髪を切った後がおすすめです。前髪の長さや分け目によって眉の見え方が変わるため、髪型が決まってから整えるほうがバランスを取りやすくなります。",
  },
  {
    question: "服装から変えるのはダメですか？",
    answer:
      "服から始めても問題ありません。ただし、髪型や眉など顔周りが整っていないと、服を変えた効果を感じにくい場合があります。顔周りを整えてから服を選ぶと、雰囲気も合わせやすくなります。",
  },
  {
    question: "垢抜けるまでどのくらいかかりますか？",
    answer:
      "髪型や眉毛は1回の手入れで変わります。一方、肌や姿勢は数週間から数か月かけて変わるものです。この記事の4週間の例のように、1か月を一区切りにして写真で比べると、変化を確認しやすくなります。",
  },
  {
    question: "全部同時に始めてはいけませんか？",
    answer:
      "可能ですが、費用と時間がかかり、何が効果的だったのか分かりにくくなります。1回で終わる作業（カットなど）と毎日の習慣（スキンケアなど）を分け、習慣は1〜2個に絞るのが続けるコツです。",
  },
];

export default function MensAkanukeOrderArticle({
  article,
}: MensAkanukeOrderArticleProps) {
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
            「垢抜けたいけれど、髪型・眉毛・肌・服装のどこから変えればいいか分からない」と悩んでいませんか？
          </p>

          <p className="mt-5">
            垢抜けるための作業は、順番によって効率が変わります。たとえば眉は、髪を切る前に整えると、前髪とのバランスが変わってやり直しになることがあります。肌のように時間がかかるものは、後回しにすると変化を感じるまでが長くなります。
          </p>

          <p className="mt-5">
            この記事では、順番を決める3つの基準と、それに沿った7つのステップ、4週間で進めるスケジュール例を紹介します。
          </p>
        </section>

        <section
          id="rules"
          className="scroll-mt-24 pt-14"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            3 RULES
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            順番を決める3つの基準
          </h2>

          <p className="mt-6 text-[14px] leading-8 text-black/80">
            この記事で紹介する順番は、次の3つの基準で決めています。基準を知っておくと、自分の状況に合わせて順番を入れ替えるときにも判断しやすくなります。
          </p>

          <div className="mt-7 space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.number}
                className="rounded-[16px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  RULE {rule.number}
                </p>

                <p className="mt-2 text-[13px] font-bold">
                  {rule.title}
                </p>

                <p className="mt-2 text-[12px] leading-7 text-black/70">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#1677FF]/15 bg-[#EEF6FF] p-5">
            <p className="text-[12px] font-black text-[#1677FF]">
              おすすめの基本順序
            </p>

            <p className="mt-3 text-[12px] font-bold leading-6 text-black/65">
              髪型 → 眉毛 → 肌 → ヒゲ・ムダ毛 → 服装 → 姿勢 → 写真で比べる
            </p>

            <p className="mt-2 text-[11px] font-medium leading-6 text-black/60">
              ※肌の習慣は、順番に関係なく1日目から並行して始めます。
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
            メンズが垢抜けるおすすめの順番
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-7 text-black/70">
            すでに整っている項目は飛ばして構いません。各ステップの「この順番の理由」を参考に、自分に必要なものから進めてください。
          </p>

          <div className="mt-8 space-y-5">
            {steps.map((step) => (
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
                      <span className="mr-2 font-black text-[#1677FF]">
                        この順番の理由
                      </span>

                      {step.why}
                    </p>

                    <div className="mt-4 rounded-[14px] bg-[#FFF9D9] px-4 py-3">
                      <p className="text-[11px] font-bold leading-6 text-black/65">
                        <span className="mr-2 font-black text-[#9A7800]">
                          やること
                        </span>

                        {step.action}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-black/10 bg-[#F8FAFC] px-3 py-1 text-[10px] font-bold text-black/60">
                        {step.timing}
                      </span>

                      <span className="rounded-full border border-black/10 bg-[#F8FAFC] px-3 py-1 text-[10px] font-bold text-black/60">
                        費用：{step.cost}
                      </span>
                    </div>

                    {step.href && step.linkLabel && (
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
          id="plan"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            4 WEEKS PLAN
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            4週間で進めるスケジュール例
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            7つのステップを1か月で進める場合の例です。1回で終わる作業と、毎日続ける習慣を組み合わせています。予定に合わせて、週をずらしても問題ありません。
          </p>

          <div className="mt-7 space-y-3">
            {weeklyPlan.map((week) => (
              <div
                key={week.week}
                className="rounded-[20px] border border-black/10 bg-[#F8FAFC] p-5 sm:p-6"
              >
                <p className="text-[10px] font-black tracking-[0.12em] text-[#1677FF]">
                  {week.week}
                </p>

                <h3 className="mt-1 text-[16px] font-bold">
                  {week.title}
                </h3>

                <ul className="mt-4 space-y-2 text-[13px] leading-7 text-black/75">
                  {week.items.map((item) => (
                    <li key={item}>□ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] leading-6 text-black/60">
            ※1週目の写真は、4週目に同じ場所・同じ明るさで撮り直して比べるために使います。
          </p>
        </section>

        <section
          id="exceptions"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            EXCEPTIONS
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            順番を変えたほうがいいケース
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            紹介した順番は、多くの人に当てはまりやすい目安です。次のような場合は、順番を入れ替えて構いません。
          </p>

          <div className="mt-7 space-y-4">
            {exceptions.map((exception, index) => (
              <article
                key={exception.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[10px] font-black text-[#1677FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-[15px] font-black">
                      {exception.title}
                    </h3>

                    <p className="mt-2 text-[12px] font-medium leading-6 text-black/70">
                      {exception.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="budget"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            BUDGET
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            費用で考える進め方
          </h2>

          <p className="mt-5 text-[14px] leading-8 text-black/80">
            垢抜けに必要なことは、費用の面から3つに分けられます。予算が限られている場合は、上から順に取り組みましょう。
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {budgetLevels.map((level) => (
              <article
                key={level.title}
                className="rounded-[18px] border border-black/10 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-[15px] font-black">
                  {level.title}
                </h3>

                <p className="mt-3 text-[12px] font-medium leading-6 text-black/70">
                  {level.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <JournalRelatedArticleLink
              href="/media/akanukenai-man-features"
              title="垢抜けない男の特徴10選"
              description="自分がどこでつまずいているのか、原因のタイプから確認できます。"
            />

            <JournalRelatedArticleLink
              href="/media/mens-skincare-beginner"
              title="メンズスキンケアの基本"
              description="1日目から始めたい洗顔・保湿・日焼け止めの基本を確認できます。"
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
            自分は何から変えるべき？
          </h2>

          <p className="mt-4 text-[13px] font-medium leading-6 text-black/70">
            AKANUKE.AIでは、顔写真をもとに髪型・眉毛・肌・全体の印象をAIが分析し、あなたに合った垢抜けプランを提案します。
          </p>

          <JournalDiagnosisCta audienceLabel="メンズ専用" />
        </section>

        <section
          id="faq"
          className="scroll-mt-24 pt-16"
        >
          <p className="text-[10px] font-black tracking-[0.16em] text-[#1677FF]">
            FAQ
          </p>

          <h2 className="mt-2 text-[22px] font-semibold sm:text-[26px] tracking-[-0.04em]">
            メンズの垢抜ける順番についてよくある質問
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
            順番の理由が分かれば、自分に合わせて組み替えられる
          </h2>

          <div className="mt-5 text-[14px] leading-8 text-black/80">
            <p>
              垢抜ける順番は、「見える面積が大きいもの」「ほかの工程の前提になるもの」「時間がかかるもの」を先にするのが基本です。この基準に沿うと、髪型、眉毛、肌、ヒゲ、服装、姿勢の順になります。
            </p>

            <p className="mt-5">
              ただし、肌の習慣は1日目から並行して始めましょう。すでに整っている項目は飛ばし、1か月ごとに写真で比べながら、次の改善を1つずつ決めていくのがおすすめです。
            </p>
          </div>

          <JournalArticleFooterNav
            secondaryHref="/media/akanukenai-man-features"
            secondaryLabel="垢抜けない男の特徴を見る"
          />

          <p className="sr-only">
            {article.title}
          </p>
        </section>
      </div>
    </div>
  );
}