# Google AdSense セットアップ

## 1. 環境変数

`.env.local`とVercelのEnvironment Variablesへ、次の3項目を追加します。

```text
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=xxxxxxxxxx
```

- `NEXT_PUBLIC_ADSENSE_CLIENT`: AdSenseのパブリッシャーID
- `NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL`: 横長レスポンシブ広告の広告枠ID
- `NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE`: レクタングル広告の広告枠ID

設定後は開発サーバーを再起動してください。

## 2. 実装済みページ

- 診断結果
- 商品一覧
- サロン一覧
- 記事一覧
- 記事詳細

環境変数未設定時は、開発環境だけ確認用の広告枠を表示します。本番環境では未設定の広告枠を表示しません。

## 3. ads.txt

パブリッシャーIDを設定すると、次のURLへGoogle指定形式のads.txtを自動表示します。

```text
https://akanukeai.com/ads.txt
```

## 4. AdSense側の確認

1. AdSenseの「サイト」で`akanukeai.com`を登録する
2. サイトの所有権確認を行う
3. 広告ユニットを2つ作成する
4. 「プライバシーとメッセージ」でGoogleのCMPを設定する
5. サイト審査を申請する

広告はAdSenseの承認後に配信されます。localhostでは実広告が表示されない場合があります。
