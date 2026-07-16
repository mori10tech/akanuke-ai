export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">

        <p className="text-center text-sm font-bold tracking-[0.3em] text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-8 text-center text-5xl font-extrabold leading-tight">
          第一印象は、
          <br />
          <span className="text-blue-600">変えられる。</span>
        </h1>

        <p className="mt-8 text-center text-gray-600 leading-8">
          顔写真を1枚アップロードするだけ。
          <br />
          AIがあなた専用の
          <br />
          「4週間垢抜けプラン」を提案します。
        </p>

        <a
  href="/upload"
  className="mt-12 rounded-2xl bg-blue-600 py-4 text-center text-xl font-bold text-white hover:bg-blue-700"
>
  診断スタート
</a>

        <p className="mt-5 text-center text-sm text-gray-400">
          登録不要・完全無料
        </p>

      </div>
    </main>
  );
}