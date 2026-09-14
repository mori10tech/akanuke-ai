import fs from "node:fs";

const filePath = "data/products.ts";
const EXPECTED_PRODUCT_COUNT = 128;

const source = fs.readFileSync(
  filePath,
  "utf8",
);

if (
  source.includes(
    "export type ProductType =",
  ) ||
  source.includes(
    "productType: ProductType;",
  )
) {
  console.error(
    "productTypeはすでに追加されています。処理を中止しました。",
  );

  process.exit(1);
}

const typeDefinition = `export type ProductType =
  // スキンケア
  | "faceWash"
  | "toner"
  | "emulsionCream"
  | "serum"
  | "cleansing"
  | "allInOne"
  | "poreCare"

  // UVケア
  | "uvEssence"
  | "uvGel"
  | "uvMilk"
  | "uvCream"
  | "uvSpray"

  // スタイリング
  | "wax"
  | "gel"
  | "grease"
  | "balm"
  | "gelBalm"
  | "hairCream"
  | "hairMist"
  | "styling"

  // ヘアケア
  | "shampoo"
  | "hairMilk"
  | "hairOil"
  | "hairMask"
  | "hairTreatment"
  | "hairSerum"

  // メンズメイク
  | "bbCream"
  | "concealer"
  | "foundation"
  | "makeupBase"
  | "bbSpray"

  // その他
  | "fragrance"
  | "oralCare"
  | "lipCare"
  | "handCare"
  | "bodyCare";

export const productTypeLabels: Record<
  ProductType,
  string
> = {
  faceWash: "洗顔",
  toner: "化粧水",
  emulsionCream: "乳液・クリーム",
  serum: "美容液",
  cleansing: "クレンジング",
  allInOne: "オールインワン",
  poreCare: "毛穴ケア",

  uvEssence: "UVエッセンス",
  uvGel: "UVジェル",
  uvMilk: "UVミルク",
  uvCream: "UVクリーム",
  uvSpray: "UVスプレー・ミスト",

  wax: "ヘアワックス",
  gel: "ヘアジェル",
  grease: "ヘアグリース",
  balm: "ヘアバーム",
  gelBalm: "ジェルバーム",
  hairCream: "ヘアクリーム",
  hairMist: "ヘアミスト",
  styling: "スタイリング剤",

  shampoo: "シャンプー",
  hairMilk: "ヘアミルク",
  hairOil: "ヘアオイル",
  hairMask: "ヘアマスク",
  hairTreatment: "トリートメント",
  hairSerum: "ヘアセラム",

  bbCream: "BBクリーム",
  concealer: "コンシーラー",
  foundation: "ファンデーション",
  makeupBase: "化粧下地",
  bbSpray: "BBスプレー",

  fragrance: "フレグランス",
  oralCare: "オーラルケア",
  lipCare: "リップケア",
  handCare: "ハンドケア",
  bodyCare: "ボディケア",
};

`;

function getProductType({
  id,
  name,
  shortName,
  category,
  block,
}) {
  const text = [
    id,
    name,
    shortName,
    block,
  ]
    .join(" ")
    .toLowerCase();

  switch (category) {
    case "skincare": {
      if (
        shortName.includes(
          "クレンジング",
        )
      ) {
        return "cleansing";
      }

      if (
        shortName.includes(
          "オールインワン",
        )
      ) {
        return "allInOne";
      }

      if (
        shortName.includes(
          "美容液",
        )
      ) {
        return "serum";
      }

      if (
        shortName.includes(
          "化粧水",
        )
      ) {
        return "toner";
      }

      if (
        shortName.includes("乳液") ||
        shortName.includes(
          "保湿クリーム",
        )
      ) {
        return "emulsionCream";
      }

      if (
        shortName.includes(
          "毛穴ケア",
        )
      ) {
        return "poreCare";
      }

      if (
        shortName.includes("洗顔")
      ) {
        return "faceWash";
      }

      break;
    }

    case "sunscreen": {
      if (
        shortName.includes(
          "スプレー",
        ) ||
        shortName.includes(
          "ミスト",
        ) ||
        text.includes("スプレー") ||
        text.includes("ミスト")
      ) {
        return "uvSpray";
      }

      if (
        text.includes("ジェル")
      ) {
        return "uvGel";
      }

      if (
        text.includes("ミルク")
      ) {
        return "uvMilk";
      }

      if (
        text.includes("クリーム")
      ) {
        return "uvCream";
      }

      return "uvEssence";
    }

    case "hairStyling": {
      if (
        shortName.includes(
          "ジェルバーム",
        )
      ) {
        return "gelBalm";
      }

      if (
        shortName.includes(
          "ワックス",
        )
      ) {
        return "wax";
      }

      if (
        shortName.includes(
          "グリース",
        )
      ) {
        return "grease";
      }

      if (
        shortName.includes(
          "バーム",
        )
      ) {
        return "balm";
      }

      if (
        shortName.includes(
          "ミスト",
        )
      ) {
        return "hairMist";
      }

      if (
        shortName.includes(
          "クリーム",
        )
      ) {
        return "hairCream";
      }

      if (
        shortName.includes(
          "ジェル",
        )
      ) {
        return "gel";
      }

      if (
        shortName.includes(
          "スタイリング剤",
        )
      ) {
        return "styling";
      }

      break;
    }

    case "hairCare": {
      if (
        shortName.includes(
          "ヘアミルク",
        )
      ) {
        return "hairMilk";
      }

      if (
        shortName.includes(
          "ヘアオイル",
        )
      ) {
        return "hairOil";
      }

      if (
        shortName.includes(
          "ヘアマスク",
        )
      ) {
        return "hairMask";
      }

      if (
        shortName.includes(
          "ヘアセラム",
        )
      ) {
        return "hairSerum";
      }

      if (
        shortName.includes(
          "トリートメント",
        )
      ) {
        return "hairTreatment";
      }

      if (
        shortName.includes(
          "シャンプー",
        )
      ) {
        return "shampoo";
      }

      break;
    }

    case "mensMakeup": {
      if (
        shortName.includes(
          "BBスプレー",
        )
      ) {
        return "bbSpray";
      }

      if (
        shortName.includes(
          "BBクリーム",
        )
      ) {
        return "bbCream";
      }

      if (
        shortName.includes(
          "コンシーラー",
        )
      ) {
        return "concealer";
      }

      if (
        shortName.includes(
          "ファンデーション",
        )
      ) {
        return "foundation";
      }

      if (
        shortName.includes(
          "化粧下地",
        )
      ) {
        return "makeupBase";
      }

      break;
    }

    case "other": {
      if (
        shortName.includes("香水")
      ) {
        return "fragrance";
      }

      if (
        shortName.includes(
          "マウスウォッシュ",
        ) ||
        shortName.includes(
          "歯磨き粉",
        )
      ) {
        return "oralCare";
      }

      if (
        shortName.includes("リップ")
      ) {
        return "lipCare";
      }

      if (
        shortName.includes(
          "ハンドクリーム",
        )
      ) {
        return "handCare";
      }

      if (
        shortName.includes(
          "ボディソープ",
        )
      ) {
        return "bodyCare";
      }

      break;
    }
  }

  return null;
}

const productsMarker =
  "export const products: Product[] = [";

const categoriesMarker =
  "export const categories:";

const productsStart =
  source.indexOf(
    productsMarker,
  );

const categoriesStart =
  source.indexOf(
    categoriesMarker,
  );

if (
  productsStart === -1 ||
  categoriesStart === -1 ||
  categoriesStart <= productsStart
) {
  console.error(
    "products配列の範囲を特定できませんでした。",
  );

  process.exit(1);
}

const productsSource =
  source.slice(
    productsStart,
    categoriesStart,
  );

const idPattern =
  /^\s*id:\s*"([^"]+)",/gm;

const idMatches = [
  ...productsSource.matchAll(
    idPattern,
  ),
];

console.log(
  `検出した商品ID数: ${idMatches.length}件`,
);

if (
  idMatches.length !==
  EXPECTED_PRODUCT_COUNT
) {
  console.error(
    `商品IDを${EXPECTED_PRODUCT_COUNT}件検出できませんでした。検出件数: ${idMatches.length}件`,
  );

  console.error(
    "products.tsは変更していません。",
  );

  process.exit(1);
}

const ids = idMatches.map(
  (match) => match[1],
);

const uniqueIds = new Set(ids);

if (
  uniqueIds.size !==
  EXPECTED_PRODUCT_COUNT
) {
  console.error(
    "商品IDに重複があります。",
  );

  console.error(
    "products.tsは変更していません。",
  );

  process.exit(1);
}

const classifications = [];
const unknownProducts = [];

for (
  let index = 0;
  index < idMatches.length;
  index += 1
) {
  const current =
    idMatches[index];

  const next =
    idMatches[index + 1];

  const blockStart =
    current.index;

  const blockEnd =
    next
      ? next.index
      : productsSource.length;

  const block =
    productsSource.slice(
      blockStart,
      blockEnd,
    );

  const id = current[1];

  const nameMatch =
    block.match(
      /^\s*name:\s*"([^"]+)",/m,
    );

  const shortNameMatch =
    block.match(
      /^\s*shortName:\s*"([^"]+)",/m,
    );

  const categoryMatch =
    block.match(
      /^\s*category:\s*"([^"]+)",/m,
    );

  if (
    !nameMatch ||
    !shortNameMatch ||
    !categoryMatch
  ) {
    unknownProducts.push({
      id,
      reason:
        "name / shortName / category を取得できませんでした",
    });

    continue;
  }

  const name =
    nameMatch[1];

  const shortName =
    shortNameMatch[1];

  const category =
    categoryMatch[1];

  const productType =
    getProductType({
      id,
      name,
      shortName,
      category,
      block,
    });

  if (!productType) {
    unknownProducts.push({
      id,
      name,
      shortName,
      category,
      reason:
        "productTypeを分類できませんでした",
    });

    continue;
  }

  classifications.push({
    id,
    category,
    productType,
  });
}

if (
  unknownProducts.length > 0
) {
  console.error(
    "分類できない商品がありました。",
  );

  console.table(
    unknownProducts,
  );

  console.error(
    "products.tsは変更していません。",
  );

  process.exit(1);
}

if (
  classifications.length !==
  EXPECTED_PRODUCT_COUNT
) {
  console.error(
    `分類件数が${EXPECTED_PRODUCT_COUNT}件ではありません: ${classifications.length}件`,
  );

  process.exit(1);
}

const categoryCounts =
  classifications.reduce(
    (result, product) => {
      result[product.category] =
        (result[product.category] ?? 0) +
        1;

      return result;
    },
    {},
  );

console.log(
  "カテゴリ別商品数:",
);

console.table(
  categoryCounts,
);

const productTypeCounts =
  classifications.reduce(
    (result, product) => {
      result[product.productType] =
        (result[product.productType] ?? 0) +
        1;

      return result;
    },
    {},
  );

console.log(
  "商品種類別件数:",
);

console.table(
  productTypeCounts,
);

let updated = source;

const visualTypeMarker =
  "export type ProductVisualType =";

if (
  !updated.includes(
    visualTypeMarker,
  )
) {
  console.error(
    "ProductVisualTypeの定義が見つかりません。",
  );

  process.exit(1);
}

updated = updated.replace(
  visualTypeMarker,
  `${typeDefinition}${visualTypeMarker}`,
);

const productFieldMarker =
  "  shortName: string;";

if (
  !updated.includes(
    productFieldMarker,
  )
) {
  console.error(
    "Product型のshortNameが見つかりません。",
  );

  process.exit(1);
}

updated = updated.replace(
  productFieldMarker,
  `${productFieldMarker}
  productType: ProductType;`,
);

for (const {
  id,
  productType,
} of classifications) {
  const escapedId =
    id.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

  const pattern =
    new RegExp(
      `(id:\\s*"${escapedId}",[\\s\\S]*?shortName:\\s*"[^"]+",)`,
    );

  if (!pattern.test(updated)) {
    console.error(
      `productType追加対象が見つかりません: ${id}`,
    );

    process.exit(1);
  }

  updated = updated.replace(
    pattern,
    `$1
    productType: "${productType}",`,
  );
}

const newProductsStart =
  updated.indexOf(
    productsMarker,
  );

const newCategoriesStart =
  updated.indexOf(
    categoriesMarker,
  );

const newProductsSource =
  updated.slice(
    newProductsStart,
    newCategoriesStart,
  );

const addedTypes = [
  ...newProductsSource.matchAll(
    /^\s*productType:\s*"([^"]+)",/gm,
  ),
];

console.log(
  `追加されたproductType数: ${addedTypes.length}件`,
);

if (
  addedTypes.length !==
  EXPECTED_PRODUCT_COUNT
) {
  console.error(
    `productTypeが${EXPECTED_PRODUCT_COUNT}件追加されていません。`,
  );

  console.error(
    "products.tsへの保存を中止しました。",
  );

  process.exit(1);
}

fs.writeFileSync(
  filePath,
  updated,
  "utf8",
);

console.log(
  `productTypeを${EXPECTED_PRODUCT_COUNT}商品へ追加しました。`,
);

console.log(
  "ProductType型と日本語ラベルを追加しました。",
);

console.log(
  "products.tsの更新が完了しました。",
);