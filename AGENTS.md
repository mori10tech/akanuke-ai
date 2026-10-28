<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AKANUKE.AI 開発ルール

公式URL: https://akanuke.ai
このルールは「過去に決定した運用方針」と「コードで確認できる実装」の両方を含む。
実装と食い違う場合は、コードを勝手に直さず、相違点を報告して指示を待つ。

## 1. 作業の基本

- 現在の作業ツリーと、確認済みの最新仕様を基準にする。記憶や過去の会話より実ファイルを優先する。
- 依頼されていないコード・機能・デザイン・文言は変更しない。気づいた改善点は提案にとどめる。
- 変更前に、関連する画面・API・DB・認証への影響を確認する。
- 既存の未コミット変更を破棄・上書きしない（reset / checkout / clean / stash を含む）。
- commit・push・pull・デプロイ・本番DB操作・Supabase / Vercel の設定変更は、毎回事前に許可を得る。
- 記録が確認できない廃止・却下仕様を推測で扱わない。不明な点は作業前に質問する。

## 2. 認証（LINE / LIFF / Supabase Auth）

決定事項（2026-10-06 時点）:
- 標準認証は Supabase Custom OIDC の `custom:line-oidc`（LIFF の ID Token でログイン）。
- 旧 `custom:line` を標準認証に戻さない。
- 旧 `custom:line` のセッション切り替え処理や `/auth/callback` などの互換処理は、残っている場合、依存関係を確認するまで削除しない。
- 通常ブラウザと LINE アプリ内の両方の認証フローを維持する。
- ログイン済みユーザーを不要に LINE アプリへ強制遷移させない。
- 旧ドメイン akanukeai.com を Web サイトの正規 URL として使わない。

関連ファイル: `proxy.ts`（ページ / API の保護・Basic 認証）、`app/liff/`、`app/login/`、`lib/supabase/`
- 認証フローを変える場合は、既存ユーザーと診断履歴への影響を説明し、承認を得てから行う。
- `app/liff/test-oidc/` は検証用ページ。削除・変更は依頼があった場合のみ。

## 3. データ保護・セキュリティ

- API キー・トークン・パスワード、`.env.local` の実際の値を、チャット・コード・ログ・Git に出力しない。
- `.env.example` には空欄またはダミー値のみを書く。
- 次の項目を保護し、変更は事前承認を得てから行う:
  診断履歴（`diagnoses` テーブル / `diagnosis-images` Storage）、RLS、Storage のアクセス制御、
  利用回数・レート制限、退会処理（`app/api/account/delete/`）、自動削除 Cron（`app/api/cron/`）。
- データの削除やアクセス制御の変更は、事前承認なしに実行しない。
- DB 構造の変更は、`supabase/migrations/` の SQL ファイルと `docs/supabase-diagnoses-setup.md` の手順（SQL Editor で手動実行）を確認してから行う。

## 4. デザイン

- 配色・禁止事項は `docs/design-system.md` を最優先する。新しい色を勝手に追加しない。
- 英字の基本フォントは Geist Sans（`app/layout.tsx`）。
- 日本語は Web フォントを読み込まず、`app/globals.css` の font-family の候補（ブラウザ任せ）を使う。この候補の並びを勝手に変えない。
- Noto Sans JP は画像・SNS 動画制作用の基準。Web アプリ全体への読み込み追加はしない。
- 承認済みのフォント・配色・余白・共通コンポーネントを不用意に変更しない。
- 方針は「高級感・先進性・シンプル・使いやすさ」。モバイル表示を優先して確認する。

## 5. AKANUKE JOURNAL

構成（公開 URL は `/media/[slug]`）:
- `data/articles.ts`: 記事メタデータ
- `app/media/[slug]/articleRegistry.ts`: 記事の登録
- `app/media/[slug]/articles/<slug>.tsx`: 本文（ファイル名と slug を一致させる）
- `app/media/components/`: 共通コンポーネント（CTA・関連記事・フッターナビ）
- 画像: `public/media/`
- `app/articles/[slug]/` は旧 URL（noindex）。新しい記事を追加しない。削除も依頼があった場合のみ。

制作・修正のルール:
- 既存記事のデザイン・共通コンポーネント・文字サイズ・行間・文字色・余白を維持する。
- 検索意図に合った、具体的で実践できる内容にする。記事単体で読者に価値があることを優先する。
- 架空の体験談・根拠のない断定・他記事との重複を避ける。
- 目次・FAQ・関連記事・AI 診断 CTA は、既存記事の実装に合わせる。
- CTA の認証導線（LIFF URL）を独断で変更しない。
- AdSense は `AdSenseAd` の既存配置を確認し、依頼されていない広告位置を変更しない。
- サムネイルの基準は 1730×910（既存素材を確認してから決める）。本文画像は既存の素材と命名に合わせる。
- 画像は理解を助ける位置にだけ置く。すべての見出しに機械的に入れない。
- 新しい画像の生成は、明示的に依頼された場合のみ行う。

## 6. お問い合わせメールアドレス

- お問い合わせメールアドレスは `info@akanukeai.com` を使う。Web サイトの公式 URL（https://akanuke.ai）とメールのドメインは別のものとして扱う。
- このメールアドレスは、変更の指示があるまで修正しない。

## 7. 報告

- 作業後は「変更したファイル」「変更内容」「検証内容と結果」「未確認事項」を報告する。
- 実行していない検証（`npm run lint`、`npm run build`、画面確認など）を実行済みと書かない。
- 「確認した事実」と「推測・未確認」を分けて書く。
- ユーザーはプログラミングの専門家ではない。手作業が必要な場合は、画面操作やコマンドを1手順ずつ具体的に説明する。
- コミットメッセージは日本語で書く。
