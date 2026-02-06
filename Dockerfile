# マルチステージビルドでイメージサイズを最小化
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係のインストール（キャッシュ最適化）
COPY package.json package-lock.json* ./
RUN npm ci

# ソースコードのコピーとビルド
COPY . .

RUN npm run build

# 本番用イメージ（nginx）
FROM nginx:1.25-alpine

# nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/nginx.conf

# ビルドした静的ファイルをnginxのドキュメントルートにコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Runのポート要件（環境変数PORTを使用）
ENV PORT=8080
EXPOSE 8080

# nginxを起動（ポートを動的に設定）
CMD sed -i "s/listen 8080;/listen ${PORT};/g" /etc/nginx/nginx.conf && nginx -g 'daemon off;'
