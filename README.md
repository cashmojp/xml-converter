# XML Converter

XMLファイルをHTMLに変換してプレビュー表示し、PDF出力できるWebアプリケーションです。XSLTスタイルシートによるカスタム変換にも対応しています。

## 機能

- ✅ XMLファイルのアップロード（ドラッグ&ドロップ対応）
- ✅ XSLTスタイルシートによる変換（オプション）
- ✅ リアルタイムHTMLプレビュー
- ✅ PDF形式でのダウンロード
- ✅ ZIPファイル対応（複数ファイルを一括アップロード）
- ✅ シンプルで直感的なUI

## 技術スタック

- **フレームワーク**: React 19 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **PDF生成**: jsPDF + html2canvas
- **アイコン**: lucide-react
- **その他**: jszip, dompurify

## 開発環境のセットアップ

### 必要な環境

- Node.js 20.x 以上
- npm 9.x 以上

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは `http://localhost:5173` で起動します。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルド（型チェック + ビルド） |
| `npm run preview` | ビルド結果をプレビュー |
| `npm run lint` | ESLintによるコードチェック |
| `npm run lint:fix` | ESLintによる自動修正 |

## Docker

### ローカルでの実行

```bash
# イメージのビルド
npm run docker:build

# コンテナの起動
npm run docker:run
```

アプリケーションは `http://localhost:8080` でアクセスできます。

### ヘルスチェック付きテスト実行

コンテナを起動し、ヘルスチェックエンドポイント（`/health`）の動作を確認後、自動でクリーンアップします。

```bash
npm run docker:test
```

## 使い方

### 基本的な使い方

1. **XMLファイルをアップロード**  
   サイドバーの「XMLファイル選択」ボタンをクリック、またはファイルをドラッグ&ドロップ

2. **プレビュー確認**  
   アップロードしたXMLが自動的にHTMLに変換され、右側のプレビューエリアに表示されます

3. **PDF出力**  
   「PDFダウンロード」ボタンをクリックして、変換結果をPDF形式で保存

### XSLTスタイルシートを使った変換

1. XMLファイルをアップロード後、「XSLTファイル選択」ボタンをクリック
2. XSLTファイル（`.xsl`, `.xslt`）を選択
3. 自動的にXSLT変換が適用されたHTMLがプレビュー表示されます

### ZIPファイルのアップロード

1. サイドバーの「ZIPファイル選択」ボタンをクリック、またはZIPファイルをドラッグ&ドロップ
2. ZIP内のファイル一覧が表示されるので、変換したいXMLとXSLTを選択
3. 「変換開始」ボタンをクリック

## プロジェクト構成

```
xml-converter/
├── src/
│   ├── components/        # Reactコンポーネント
│   │   ├── DocumentPreview.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Icons.tsx
│   │   ├── PreviewSection.tsx
│   │   ├── Sidebar.tsx
│   │   └── ZipSelectionModal.tsx
│   ├── hooks/            # カスタムフック
│   │   ├── useXmlConverter.ts
│   │   └── useZipUpload.ts
│   ├── utils/            # ユーティリティ関数
│   │   ├── logger.ts
│   │   ├── pdfUtils.ts
│   │   └── xmlProcessor.ts
│   ├── types/            # TypeScript型定義
│   │   └── index.ts
│   ├── App.tsx           # メインコンポーネント
│   └── main.tsx          # エントリーポイント
├── .cursor/              # Cursorエディタ設定
│   ├── commands/         # カスタムコマンド
│   └── rules/            # コーディング規約
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── Dockerfile            # Dockerイメージ定義
├── nginx.conf            # Nginx設定
└── package.json
```

## デプロイ

### Google Cloud Run

このプロジェクトはGoogle Cloud Runへの自動デプロイに対応しています。

**必要な設定:**

1. GCPプロジェクトIDを取得
2. サービスアカウントキーを生成
3. GitHub Secretsに以下を設定:
   - `GCP_PROJECT_ID`: GCPプロジェクトID
   - `GCP_SA_KEY`: サービスアカウントキー（JSON）

**デプロイフロー:**

- `main` ブランチへのプッシュで自動デプロイ
- Pull Request作成時はビルド・テストのみ実行
- 手動デプロイも可能（GitHub Actions > Deploy to Cloud Run > Run workflow）

## コーディング規約

### 禁止事項

- ❌ `any` 型の使用 → 適切な型を定義する
- ❌ `console.log` の残置 → デバッグ後は削除
- ❌ `console.error` の使用 → `logError`（logger.ts）を使う
- ❌ 未使用のインポート → 削除する
- ❌ ハードコーディング → `constants.ts` または `config.ts` に定義
- ❌ インラインスタイル → Tailwindを使う
- ❌ CSSファイルの作成 → Tailwindを使う
- ❌ インラインSVG → `Icons.tsx` のコンポーネントを使う

### 推奨事項

- ✅ コメントはWHY（理由）を説明、WHATは不要
- ✅ 変更箇所は最小限に、既存スタイルに合わせる
- ✅ 200行を超えるコンポーネントは分割を検討
- ✅ async/awaitは`try-catch`でエラーハンドリング

### コミットメッセージ規約

**基本方針:**
- 日本語で記述
- 1-2行で簡潔に要点を記載
- 何をしたか（WHAT）を明確に

**プレフィックス（推奨）:**

- `feat:` 新機能追加
- `fix:` バグ修正
- `docs:` ドキュメント更新のみ
- `refactor:` リファクタリング（機能変更なし）
- `chore:` 雑務（依存関係更新、設定変更等）
- `style:` コードスタイル変更（フォーマット、セミコロン等）

**例:**
```
feat: Gemini API連携の証憑解析機能を追加
fix: PDF変換時のメモリリーク修正
docs: README環境構築手順を更新
refactor: useEvidenceQueueフックの状態管理を最適化
chore: ESLint 9 Flat Configへ移行
```

**注意事項:**
- プレフィックスはオプション（必須ではない）
- 重要なのは変更内容が明確であること
- コミットは論理的な単位でまとめる

## トラブルシューティング

### 開発サーバーが起動しない

**Windows (PowerShell):**
```powershell
# node_modulesとキャッシュを削除して再インストール
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npm run dev
```

**Linux/macOS:**
```bash
# node_modulesとキャッシュを削除して再インストール
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Dockerビルドが失敗する

```bash
# Dockerキャッシュをクリアして再ビルド
docker builder prune
npm run docker:build
```

### ESLintエラーが解消されない

```bash
# 自動修正を試す
npm run lint:fix
```
