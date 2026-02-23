# Tap4 アイコンの反映方法

Claude で作成したアイコンを Tap4 に反映する手順です。

## 必要なアイコンファイル

| 配置場所 | ファイル名 | 推奨サイズ | 用途 |
|----------|------------|------------|------|
| `src/app/` | `icon.png` | 512×512 以上 | ブラウザタブのファビコン |
| `public/` | `icon-192.png` | 192×192 | PWA・ホーム画面追加用 |
| `public/` | `icon-512.png` | 512×512 | PWA・ホーム画面追加用 |

## 手順

### 1. アイコン画像を準備する

Claude で作成したアイコンを **PNG形式** で保存します。

### 2. ファイルを配置する

#### ブラウザタブのアイコン

1. 保存したアイコンを **`icon.png`** という名前に変更（またはコピー）
2. 次のフォルダに置く：
   ```
   c:\projects\time_category_app_next\src\app\icon.png
   ```

#### PWA用（携帯のホーム画面など）

1. 同じアイコンを **`icon-512.png`** としてコピー
2. **`icon-192.png`** 用に 192×192 にリサイズしたものを作成
   - 画像編集ソフト、または [tinypng.com](https://tinypng.com) などでリサイズ可能
   - 512px の画像をそのまま使っても動作するが、192px があると見た目が良くなる
3. 次のフォルダに置く：
   ```
   c:\projects\time_category_app_next\public\icon-512.png
   c:\projects\time_category_app_next\public\icon-192.png
   ```

### 3. サイズが 1 つだけの場合

512×512 の画像が 1 つだけある場合：

- `icon.png` と `icon-512.png` は同じ画像でよい
- `icon-192.png` は、512 の画像を 192×192 にリサイズして作成  
  または、512 の画像をそのまま `icon-192.png` として置いても動く（画質はやや落ちる）

### 4. 反映の確認

1. 開発サーバーを再起動：`npm run dev`
2. ブラウザで http://localhost:3000 を開く
3. タブに新しいアイコンが表示されるか確認
4. Vercel にデプロイしている場合は、再デプロイして確認

## フォルダ構成の例

```
time_category_app_next/
├── src/
│   └── app/
│       ├── icon.png          ← ここに置く（ファビコン）
│       ├── layout.tsx
│       └── ...
└── public/
    ├── icon-192.png          ← ここに置く（PWA用）
    ├── icon-512.png          ← ここに置く（PWA用）
    └── manifest.json         ← すでに作成済み
```
