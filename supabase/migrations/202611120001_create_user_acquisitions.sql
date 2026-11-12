-- 新規ユーザーの流入元（初回訪問時の参照元）を記録するテーブル
-- LIFFログインで新規ユーザーが作成された直後に、app/api/acquisition から1ユーザー1行だけ書き込む
-- 管理画面（/admin/stats）の「流入元別の新規登録数」に使う
-- 退会（auth.users の削除）時は、この記録も自動で削除される

create table public.user_acquisitions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  -- 流入元（例：ig / google / chatgpt.com / (direct)）。取得できなかった場合は null
  source text,
  -- メディア（例：social / organic / ai-assistant / referral / (none)）
  medium text,
  -- UTMのキャンペーン名（例：profile）
  campaign text,
  -- 最初に開いたページのパス（例：/、/media/xxx）
  landing_path text,
  -- 初回訪問日時（同じブラウザで登録した場合のみ）
  first_visit_at timestamptz,
  created_at timestamptz not null default now()
);

create index user_acquisitions_created_at_idx
  on public.user_acquisitions (created_at);

-- サーバー側（Secret key）からのみ読み書きする
-- RLSを有効にし、ポリシーは作らない（anon・authenticated からは一切アクセス不可）
alter table public.user_acquisitions enable row level security;

revoke all on table public.user_acquisitions from anon, authenticated;

-- サーバー側（Secret key = service_role）からの読み書きを許可する
grant select, insert on table public.user_acquisitions to service_role;
