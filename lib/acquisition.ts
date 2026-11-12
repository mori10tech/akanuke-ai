/*
 * 流入元（初回訪問時の参照元）の記録
 *
 * 1. 初回訪問時に、UTMパラメータまたはリファラから流入元を判定し、
 *    ブラウザ（localStorage）に保存する
 * 2. 診断ボタン（LIFF URL）を開くときに、流入元をURLパラメータとして引き継ぐ
 *    （スマホではLINEアプリ内ブラウザに切り替わり、localStorageが引き継がれないため）
 * 3. LIFFログインで新規ユーザーが作成されたときに、Supabaseへ保存する
 *
 * 記録するのは「最初に来たときの流入元」のみ（後から上書きしない）。
 */

const STORAGE_KEY =
  "ak_first_touch";

const MAX_VALUE_LENGTH = 100;

/*
 * LIFF URLに付けるパラメータ名
 * 既存の next パラメータと重ならないよう ak_ を付ける
 */
export const ACQUISITION_URL_PARAMS = {
  source: "ak_src",
  medium: "ak_med",
  campaign: "ak_cmp",
  landingPath: "ak_lp",
} as const;

export type Acquisition = {
  source: string;
  medium: string;
  campaign: string | null;
  landingPath: string | null;
  firstVisitAt: string | null;
};

/*
 * 流入元を記録しないページ
 * LIFF・管理画面・認証のコールバックは、実際の流入元ではないため
 */
const EXCLUDED_PATH_PREFIXES = [
  "/liff",
  "/admin",
  "/auth",
];

/*
 * 検索エンジン（リファラのホスト名に含まれる文字列 → source名）
 */
const SEARCH_ENGINES: Array<[string, string]> = [
  ["google.", "google"],
  ["bing.com", "bing"],
  ["search.yahoo.", "yahoo"],
  ["yahoo.co.jp", "yahoo"],
  ["duckduckgo.com", "duckduckgo"],
  ["ecosia.org", "ecosia"],
  ["naver.com", "naver"],
];

/*
 * AIアシスタント（Googleより先に判定する）
 */
const AI_ASSISTANTS: Array<[string, string]> = [
  ["chatgpt.com", "chatgpt.com"],
  ["chat.openai.com", "chatgpt.com"],
  ["perplexity.ai", "perplexity.ai"],
  ["gemini.google.com", "gemini.google.com"],
  ["claude.ai", "claude.ai"],
  ["copilot.microsoft.com", "copilot.microsoft.com"],
];

/*
 * SNS（表記はUTMの命名に合わせる）
 */
const SOCIAL_SITES: Array<[string, string]> = [
  ["instagram.com", "ig"],
  ["tiktok.com", "tiktok"],
  ["t.co", "x"],
  ["x.com", "x"],
  ["twitter.com", "x"],
  ["facebook.com", "facebook"],
  ["youtube.com", "youtube"],
  ["threads.net", "threads"],
  ["threads.com", "threads"],
];

function cleanValue(
  value: string | null | undefined,
) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.slice(
    0,
    MAX_VALUE_LENGTH,
  );
}

function matchHost(
  host: string,
  list: Array<[string, string]>,
) {
  for (const [pattern, name] of list) {
    if (
      host === pattern ||
      host.endsWith(`.${pattern}`) ||
      (pattern.endsWith(".") &&
        host.includes(pattern))
    ) {
      return name;
    }
  }

  return null;
}

/*
 * リファラのホスト名から流入元を判定する
 */
function classifyReferrer(
  referrer: string,
  ownHost: string,
): Pick<Acquisition, "source" | "medium"> {
  let host = "";

  try {
    host = new URL(referrer)
      .hostname
      .toLowerCase();
  } catch {
    host = "";
  }

  if (
    !host ||
    host === ownHost
  ) {
    return {
      source: "(direct)",
      medium: "(none)",
    };
  }

  const ai =
    matchHost(host, AI_ASSISTANTS);

  if (ai) {
    return {
      source: ai,
      medium: "ai-assistant",
    };
  }

  const searchEngine =
    matchHost(host, SEARCH_ENGINES);

  if (searchEngine) {
    return {
      source: searchEngine,
      medium: "organic",
    };
  }

  const social =
    matchHost(host, SOCIAL_SITES);

  if (social) {
    return {
      source: social,
      medium: "social",
    };
  }

  return {
    source: host.replace(/^www\./, ""),
    medium: "referral",
  };
}

function readStored(): Acquisition | null {
  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!raw) {
      return null;
    }

    const parsed =
      JSON.parse(raw) as Partial<Acquisition>;

    const source =
      cleanValue(parsed.source);

    const medium =
      cleanValue(parsed.medium);

    if (!source || !medium) {
      return null;
    }

    return {
      source,
      medium,
      campaign:
        cleanValue(parsed.campaign),
      landingPath:
        cleanValue(parsed.landingPath),
      firstVisitAt:
        cleanValue(parsed.firstVisitAt),
    };
  } catch {
    return null;
  }
}

/*
 * 初回訪問時の流入元を保存する（すでに保存済みなら何もしない）
 */
export function captureFirstTouch() {
  if (typeof window === "undefined") {
    return;
  }

  const pathname =
    window.location.pathname;

  if (
    EXCLUDED_PATH_PREFIXES.some(
      (prefix) =>
        pathname === prefix ||
        pathname.startsWith(
          `${prefix}/`,
        ),
    )
  ) {
    return;
  }

  if (readStored()) {
    return;
  }

  const params =
    new URLSearchParams(
      window.location.search,
    );

  const utmSource =
    cleanValue(
      params.get("utm_source"),
    );

  const fromReferrer =
    classifyReferrer(
      document.referrer,
      window.location.hostname.toLowerCase(),
    );

  const acquisition: Acquisition =
    utmSource
      ? {
          source:
            utmSource.toLowerCase(),
          medium:
            cleanValue(
              params.get("utm_medium"),
            )?.toLowerCase() ??
            "(not set)",
          campaign: cleanValue(
            params.get("utm_campaign"),
          ),
          landingPath:
            cleanValue(pathname),
          firstVisitAt:
            new Date().toISOString(),
        }
      : {
          ...fromReferrer,
          campaign: null,
          landingPath:
            cleanValue(pathname),
          firstVisitAt:
            new Date().toISOString(),
        };

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(acquisition),
    );
  } catch {
    // プライベートブラウズなどで保存できない場合は記録しない
  }
}

/*
 * LIFF URLに流入元のパラメータを付ける
 * 何度呼んでも同じ結果になる（パラメータは上書き）
 */
export function appendAcquisitionToUrl(
  url: string,
) {
  if (typeof window === "undefined") {
    return url;
  }

  const acquisition =
    readStored();

  if (!acquisition) {
    return url;
  }

  try {
    const parsed = new URL(url);

    parsed.searchParams.set(
      ACQUISITION_URL_PARAMS.source,
      acquisition.source,
    );

    parsed.searchParams.set(
      ACQUISITION_URL_PARAMS.medium,
      acquisition.medium,
    );

    if (acquisition.campaign) {
      parsed.searchParams.set(
        ACQUISITION_URL_PARAMS.campaign,
        acquisition.campaign,
      );
    }

    if (acquisition.landingPath) {
      parsed.searchParams.set(
        ACQUISITION_URL_PARAMS.landingPath,
        acquisition.landingPath,
      );
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export function isLiffUrl(url: string) {
  try {
    return (
      new URL(url).hostname ===
      "liff.line.me"
    );
  } catch {
    return false;
  }
}

/*
 * LIFFページで、URLパラメータに付いた流入元を読み取る
 * （LINEアプリ内ブラウザに切り替わった場合はこちらで受け取る）
 */
export function readAcquisitionFromUrl(): Acquisition | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params =
    new URLSearchParams(
      window.location.search,
    );

  const source = cleanValue(
    params.get(
      ACQUISITION_URL_PARAMS.source,
    ),
  );

  const medium = cleanValue(
    params.get(
      ACQUISITION_URL_PARAMS.medium,
    ),
  );

  if (!source || !medium) {
    return null;
  }

  return {
    source,
    medium,
    campaign: cleanValue(
      params.get(
        ACQUISITION_URL_PARAMS.campaign,
      ),
    ),
    landingPath: cleanValue(
      params.get(
        ACQUISITION_URL_PARAMS.landingPath,
      ),
    ),
    firstVisitAt: null,
  };
}

/*
 * 同じブラウザに保存された流入元を読み取る
 * （通常のブラウザのままログインした場合はこちらで受け取る）
 */
export function readStoredAcquisition(): Acquisition | null {
  if (typeof window === "undefined") {
    return null;
  }

  return readStored();
}
