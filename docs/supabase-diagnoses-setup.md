# Supabase 診断履歴セットアップ

## 実行するSQL

Supabase Dashboardの「SQL Editor」を開き、次のファイルの内容を実行します。

```text
supabase/migrations/202608180001_create_diagnoses.sql
supabase/migrations/202608180002_add_diagnosis_images.sql
```

上から順番に1ファイルずつ実行してください。すでに1つ目を実行済みの場合は、2つ目だけ実行します。

## 確認項目

1. Table Editorに`diagnoses`テーブルが表示される
2. Authenticationでログインできる
3. ログイン状態でAI診断を完了する
4. `diagnoses`に1件追加される
5. `/history`に実際の診断履歴が表示される
6. 「診断結果を詳しく見る」から結果を再表示できる
7. 履歴一覧と過去の診断結果にBefore・After画像が表示される
8. 過去の診断結果から戻ると`/history`へ戻る

## 保存対象

- AI診断結果のJSON
- AKANUKE PROGRESS
- 目標印象
- 診断日時
- Before画像の非公開Storageパス
- After画像の非公開Storageパス

Before画像とAfter画像は非公開のSupabase Storageへ保存します。画面表示時だけ、ログイン本人向けの期限付きURLを発行します。

## セキュリティ

Row Level Security（RLS）を有効化し、ログインユーザー本人の診断結果だけを閲覧・追加・削除できる構成です。

StorageもユーザーID単位でアクセスを制限し、他ユーザーの画像は取得できません。
