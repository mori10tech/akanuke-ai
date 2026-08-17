const DB_NAME = "akanuke-ai";
const DB_VERSION = 1;
const STORE_NAME = "after-images";
const AFTER_IMAGE_KEY = "latest-after-image";

type StoredAfterImage = {
  sourceResult: string;
  imageDataUrl: string;
  savedAt: number;
};

function openDatabase() {
  return new Promise<IDBDatabase>(
    (resolve, reject) => {
      const request =
        window.indexedDB.open(
          DB_NAME,
          DB_VERSION,
        );

      request.onupgradeneeded = () => {
        const database =
          request.result;

        if (
          !database.objectStoreNames.contains(
            STORE_NAME,
          )
        ) {
          database.createObjectStore(
            STORE_NAME,
          );
        }
      };

      request.onsuccess = () => {
        resolve(
          request.result,
        );
      };

      request.onerror = () => {
        reject(
          request.error ??
            new Error(
              "After画像保存用データベースを開けませんでした。",
            ),
        );
      };
    },
  );
}

export async function saveAfterImage({
  sourceResult,
  imageDataUrl,
}: {
  sourceResult: string;
  imageDataUrl: string;
}) {
  const database =
    await openDatabase();

  try {
    await new Promise<void>(
      (resolve, reject) => {
        const transaction =
          database.transaction(
            STORE_NAME,
            "readwrite",
          );

        const store =
          transaction.objectStore(
            STORE_NAME,
          );

        const value: StoredAfterImage = {
          sourceResult,
          imageDataUrl,
          savedAt: Date.now(),
        };

        store.put(
          value,
          AFTER_IMAGE_KEY,
        );

        transaction.oncomplete =
          () => {
            resolve();
          };

        transaction.onerror =
          () => {
            reject(
              transaction.error ??
                new Error(
                  "After画像を保存できませんでした。",
                ),
            );
          };

        transaction.onabort =
          () => {
            reject(
              transaction.error ??
                new Error(
                  "After画像の保存が中断されました。",
                ),
            );
          };
      },
    );
  } finally {
    database.close();
  }
}

export async function loadAfterImage(
  sourceResult: string,
) {
  const database =
    await openDatabase();

  try {
    const stored =
      await new Promise<
        StoredAfterImage | undefined
      >((resolve, reject) => {
        const transaction =
          database.transaction(
            STORE_NAME,
            "readonly",
          );

        const store =
          transaction.objectStore(
            STORE_NAME,
          );

        const request =
          store.get(
            AFTER_IMAGE_KEY,
          );

        request.onsuccess = () => {
          resolve(
            request.result as
              | StoredAfterImage
              | undefined,
          );
        };

        request.onerror = () => {
          reject(
            request.error ??
              new Error(
                "After画像を読み込めませんでした。",
              ),
          );
        };
      });

    if (!stored) {
      return null;
    }

    if (
      stored.sourceResult !==
      sourceResult
    ) {
      return null;
    }

    return stored.imageDataUrl;
  } finally {
    database.close();
  }
}

export async function clearAfterImage() {
  const database =
    await openDatabase();

  try {
    await new Promise<void>(
      (resolve, reject) => {
        const transaction =
          database.transaction(
            STORE_NAME,
            "readwrite",
          );

        const store =
          transaction.objectStore(
            STORE_NAME,
          );

        store.delete(
          AFTER_IMAGE_KEY,
        );

        transaction.oncomplete =
          () => {
            resolve();
          };

        transaction.onerror =
          () => {
            reject(
              transaction.error ??
                new Error(
                  "After画像を削除できませんでした。",
                ),
            );
          };
      },
    );
  } finally {
    database.close();
  }
}