# Google Analytics 4（GA4）設定

## ローカル環境

`.env.local` に以下を追加してください：

```
NEXT_PUBLIC_GA_ID=G-700E30Q26F
```

## Vercel 本番環境

1. [Vercel ダッシュボード](https://vercel.com/dashboard) を開く
2. プロジェクト `time-category-app-next` を選択
3. **Settings** タブをクリック
4. 左メニューから **Environment Variables** を選択
5. **Add New** をクリック
6. 以下を入力：
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-700E30Q26F`
7. **Environment** で Production / Preview / Development を選択（すべてチェック推奨）
8. **Save** をクリック
9. 変更を反映するため、再デプロイを実行

## 動作確認

ローカルで `npm run dev` を起動し、ブラウザのデベロッパーツール → Network タブで
`google-analytics.com` へのリクエストが発生していることを確認してください。
