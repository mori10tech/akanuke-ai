-- 退会・長期未ログインによる自動削除の件数を残す記録テーブル
-- 管理画面の「累計」に削除済みの分を足し戻すために使う
-- 個人を特定できる情報（ユーザーID・名前・LINE情報）は保存しない

create table public.usage_deletion_logs (
  id bigint generated always as identity primary key,
  -- account_deleted：ユーザー本人による退会
  -- inactive_cleanup：1年以上ログインがないユーザーの診断データ自動削除（ユーザー自体は残る）
  reason text not null check (reason in ('account_deleted', 'inactive_cleanup')),
  -- 管理画面と同じ区分（production：custom:line-oidc ＋ 旧方式 custom:line）
  user_category text not null check (user_category in ('production', 'email', 'other')),
  -- 登録日（日本時間の日付のみ）
  user_created_date date,
  -- 削除した診断の件数
  diagnosis_count integer not null default 0 check (diagnosis_count >= 0),
  -- 削除した診断のうち、診断した日数（日本時間・別の日）
  diagnosis_day_count integer not null default 0 check (diagnosis_day_count >= 0),
  deleted_at timestamptz not null default now()
);

-- サーバー側（Secret key）からのみ読み書きする
-- RLSを有効にし、ポリシーは作らない（anon・authenticated からは一切アクセス不可）
alter table public.usage_deletion_logs enable row level security;

revoke all on table public.usage_deletion_logs from anon, authenticated;
