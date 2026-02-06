# XML Converter

> XMLファイルをブラウザで変換・プレビュー・PDF出力できるWebアプリケーション

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)

## 概要

XSLTスタイルシートを使用してXMLファイルをHTML形式に変換し、リアルタイムプレビューとPDF出力が可能なシングルページアプリケーションです。すべての処理がブラウザ上で完結するため、サーバーへのファイルアップロードは不要で、安全に利用できます。

### 主な機能

- **XML/XSLT変換**: XSLTスタイルシートによるXML変換とリアルタイムプレビュー
- **PDF出力**: 変換結果を高品質なPDFファイルとして保存
- **ZIP対応**: ZIPファイルから複数のXML/XSLファイルを選択して一括処理
- **ドラッグ&ドロップ**: 直感的なファイルアップロード操作
- **クライアントサイド処理**: すべての処理がブラウザ内で完結し、プライバシーを保護

## セットアップ

### 必要な環境

- Node.js 20 以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:3000` でアプリケーションが起動します。

## 使い方

1. **XMLファイルのアップロード**: サイドバーからXMLファイルをアップロードまたはドラッグ&ドロップ
2. **XSLTファイルの選択（オプション）**: 変換用のXSLTスタイルシートを指定
3. **プレビュー確認**: 変換結果が自動的にプレビューエリアに表示されます
4. **PDF出力**: 必要に応じて「PDFをダウンロード」ボタンでエクスポート

## コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# コードチェック
npm run lint

# 自動修正
npm run lint:fix

# Dockerイメージのビルド
npm run docker:build

# Dockerコンテナのヘルスチェック
npm run docker:test
```

## プロジェクト構成

```
xml-converter/
├── src/
│   ├── components/        # Reactコンポーネント
│   ├── hooks/             # カスタムフック
│   ├── utils/             # ユーティリティ関数
│   └── types/             # TypeScript型定義
├── .github/workflows/     # CI/CDパイプライン
├── Dockerfile             # コンテナ設定
├── nginx.conf             # Webサーバー設定
└── vite.config.ts         # ビルド設定
```

## 技術スタック

- **React 19** - UIフレームワーク
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - スタイリング
- **html2canvas + jsPDF** - PDF生成
- **jszip** - ZIPファイル処理
- **lucide-react** - アイコンライブラリ

## デプロイ

### GitHub Actions

`main`ブランチへのプッシュで自動的にGoogle Cloud Runへデプロイされます。詳細は [SETUP-GITHUB-ACTIONS.md](./SETUP-GITHUB-ACTIONS.md) を参照してください。

### Docker

```bash
docker build -t xml-converter .
docker run -p 8080:8080 xml-converter
```

詳細は [README.cloud-run.md](./README.cloud-run.md) を参照してください。

## 開発ガイドライン

このプロジェクトでは以下のコーディング規約を採用しています：

- `any`型の使用禁止
- `console.log`/`console.error`の代わりに`logger.ts`を使用
- Tailwind CSSによるスタイリング（CSSファイル・インラインスタイル禁止）
- 既存コンポーネントの再利用を優先

詳細は [.cursor/rules/ai-workflow.mdc](.cursor/rules/ai-workflow.mdc) を参照してください。

## ライセンス

Private
