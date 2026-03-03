# infra-stream-temp

## 利用想定
- 大規模配信のインフラ的最適化の演習
- 動画配信サイト開発の雛形

## 基本設定
### パッケージ導入
backendにて
```bash
go mod tidy
```

frontendにて
```bash
npm install
```

### 環境変数
frontend・backendともに
`.env.example` があるので、コピーして`.env`に改名して使ってください。

### 起動方法
```bash
docker compose up -d
```

## インフラ演習として使う
1. テンプレートリポジトリなので、右上のUseより自分のリポジトリに複製。
2. 色々いじってみましょう。
   （コンテナのリソース制限が異常に厳しいのは、スケールアウトの演習を目的としているためです）


