"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください。");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("10MB以下の画像を選択してください。");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result as string;

      setPreview(imageData);
      sessionStorage.setItem("akanukeImage", imageData);
    };

    reader.readAsDataURL(file);
  };

  const handleDiagnosis = () => {
    if (!preview) {
      alert("顔写真を選択してください。");
      return;
    }

    router.push("/analyzing");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          AKANUKE.AI
        </p>

        <h1 className="mt-5 text-3xl font-bold text-slate-950">
          顔写真をアップロード
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          正面から撮影した、顔全体が分かる写真を1枚選択してください。
        </p>

        <label className="mt-8 block cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50">
          {preview ? (
            <img
              src={preview}
              alt="選択した顔写真"
              className="block h-auto w-full"
            />
          ) : (
            <div className="flex min-h-72 items-center justify-center px-6 text-center">
              <div>
                <p className="text-lg font-bold text-slate-700">
                  タップして写真を選択
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  JPG・PNG・WEBP／最大10MB
                </p>
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              sessionStorage.removeItem("akanukeImage");
            }}
            className="mt-3 w-full py-2 text-sm font-bold text-slate-500"
          >
            別の写真を選ぶ
          </button>
        )}

        <section className="mt-5 rounded-2xl bg-blue-50 p-5">
          <p className="text-sm font-bold text-blue-700">
            撮影のポイント
          </p>

          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>・明るい場所で正面を向く</li>
            <li>・帽子、マスク、サングラスを外す</li>
            <li>・加工していない写真を使用する</li>
          </ul>
        </section>

        <button
          type="button"
          onClick={handleDiagnosis}
          disabled={!preview}
          className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          この写真で診断する
        </button>
      </div>
    </main>
  );
}