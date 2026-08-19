export const productNeeds = [
  "oilControl",
  "poreCare",
  "moisturizing",
  "uvProtection",
  "skinToneCorrection",
  "beardShadowCover",
  "makeupRemoval",
  "hairHold",
  "hairFlow",
  "hairShine",
  "hairRepair",
  "hairManageability",
] as const;

export type ProductNeed =
  (typeof productNeeds)[number];

export const productNeedLabels: Record<
  ProductNeed,
  string
> = {
  oilControl: "皮脂・テカリ対策",
  poreCare: "毛穴・洗顔ケア",
  moisturizing: "乾燥・保湿ケア",
  uvProtection: "紫外線対策",
  skinToneCorrection: "肌色・色ムラ補正",
  beardShadowCover: "青ヒゲ・ヒゲ影補正",
  makeupRemoval: "BBクリーム・メイクオフ",
  hairHold: "髪型のキープ",
  hairFlow: "毛流れ・前髪セット",
  hairShine: "自然なツヤ感",
  hairRepair: "髪の乾燥・ダメージケア",
  hairManageability: "髪のまとまり",
};