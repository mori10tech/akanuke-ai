# AKANUKE.AI COLOR SYSTEM

Version: 1.0
Last Updated: 2026-08-06

---

# Design Philosophy

AKANUKE.AIでは、色を増やさない。

ユーザーは色で画面を覚える。

新しいページを作っても、
「AKANUKE.AIらしい」
と感じられる統一感を最優先とする。

---

# Brand Colors

## Brand Blue

HEX

```text
#1677FF
```

用途

- ブランドカラー
- AI
- リンク
- アイコン
- アクティブ状態
- AI一致度
- 英字ラベル
- 選択状態

使用例

```tsx
text-[#1677FF]
bg-[#1677FF]
border-[#1677FF]/15
```

---

## Brand Yellow

HEX

```text
#FFD400
```

用途

- 最重要CTA
- 無料診断
- AIおすすめ
- 外部導線
- 完了
- 強調

使用例

```tsx
bg-[#FFD400]
```

1画面内で黄色CTAを増やしすぎない。

---

# Neutral

## White

```text
#FFFFFF
```

用途

ページ背景

カード背景

ヘッダー

---

## Black

```text
#111111
```

用途

本文

タイトル

Amazonボタン

限定的な黒カード

黒背景を多用しない。

---

# Supporting Colors

## Soft Blue

```text
#EEF6FF
```

用途

AIカード

アイコン背景

タグ

ホバー

情報整理

---

## Surface

```text
#F7F9FC
```

用途

Secondary Button

カード内カード

説明エリア

補助情報

---

## Soft Yellow

```text
#FFF9D9
```

用途

POINT

AIコメント

注意

ヒント

---

# Text Colors

Primary

```tsx
text-[#111111]
```

Secondary

```tsx
text-black/55
```

Body Subtle

```tsx
text-black/50
```

Caption

```tsx
text-black/35
```

Disabled

```tsx
text-black/20
```

Dark Background

Primary

```tsx
text-white
```

Secondary

```tsx
text-white/55
```

---

# Border

Default

```tsx
border-black/10
```

AI

```tsx
border-[#1677FF]/15
```

Yellow

```tsx
border-[#FFD400]/40
```

Dark

```tsx
border-white/10
```

新しいBorder Colorは原則追加しない。

---

# Color Rules

## AI

必ず青。

黄色は禁止。

---

## CTA

最重要CTAは黄色。

青をPrimary CTAとして使わない。

---

## Success

黄色または青で表現する。

緑を追加しない。

---

## Error

現在は未定義。

今後必要になった場合のみ追加する。

---

## Tags

基本

```tsx
bg-[#EEF6FF]
text-[#1677FF]
```

---

## Score

数字

黒

ラベル

青

---

## Header

背景

白

文字

黒

---

## Bottom Navigation

通常

黒35%

選択中

Brand Blue

---

## Cards

背景

白

Border

border-black/10

---

# Prohibited

以下を勝手に追加しない。

・新しい青

・新しい黄色

・紫

・赤

・オレンジ

・緑

・派手なグラデーション

・虹色

・ネオンカラー

---

# Before adding a new color

以下を確認する。

・Brand Blueで表現できないか

・Brand Yellowで表現できないか

・Soft Blueで表現できないか

・Surfaceで表現できないか

それでも不足する場合のみDesign Systemへ追加する。

---

END