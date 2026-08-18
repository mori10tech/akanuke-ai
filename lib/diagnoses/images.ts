const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const SUPPORTED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export function parseImageDataUrl(dataUrl: string) {
  const match = dataUrl.match(
    /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/,
  );

  if (!match) {
    throw new Error("対応していない画像形式です。");
  }

  const contentType = match[1] as keyof typeof SUPPORTED_IMAGE_TYPES;
  const buffer = Buffer.from(match[2], "base64");

  if (buffer.byteLength === 0 || buffer.byteLength > MAX_IMAGE_BYTES) {
    throw new Error("画像のデータサイズが正しくありません。");
  }

  return {
    buffer,
    contentType,
    extension: SUPPORTED_IMAGE_TYPES[contentType],
  };
}

export const DIAGNOSIS_IMAGE_BUCKET = "diagnosis-images";
