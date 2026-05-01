# かんたん履歴書

登録不要・個人情報の保存なし・明朗会計。  
履歴書と職務経歴書をブラウザで作成してPDF出力できるWebサービス。

**URL**: https://compact-rireki.com

---

## ローカル開発

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、必要な値を設定する。

```bash
cp .env.example .env.local
```

設定が必要な変数:

| 変数 | 説明 |
|------|------|
| `STRIPE_SECRET_KEY` | Stripe シークレットキー（ダッシュボードから取得） |
| `BASE_URL` | ローカルは `http://localhost:3000` |

`PDF_SERVER_URL` / `PDF_SERVER_API_KEY` はローカルではコードのデフォルト値（localhost:3001）が使われるため省略可。

### 3. 開発サーバー起動

```bash
# Next.js（port 3000）と PDF サーバー（port 3001）を同時起動（推奨）
npm run dev:all

# 個別に起動する場合
npm run dev       # Next.js のみ
npm run dev:pdf   # PDF サーバーのみ
```

---

## アーキテクチャ

Web サーバー（Next.js）と PDF サーバー（Express + Puppeteer）を分離した2サービス構成。

```
ブラウザ
  │
  ├─ GET /resume, /cv          → Next.js（Cloud Run）
  │    └─ 入力フォーム / プレビュー（CSR・localStorageのみ保存）
  │
  ├─ POST /api/checkout        → Stripe Checkout セッション作成
  │
  └─ POST /api/pdf             → 決済検証 → PDF サーバーへ転送
       └─ POST /generate       → Express + Puppeteer（Cloud Run）
```

| サービス | Dockerfile | Cloud Run 設定 |
|---------|------------|---------------|
| Web | `Dockerfile.web` | min-instances: 1（常時起動） |
| PDF | `Dockerfile.pdfserver` | min-instances: 0（オンデマンド） |

---

## 技術スタック

| 用途 | 技術 |
|------|------|
| フロントエンド / API | Next.js 15（App Router） |
| 状態管理 | Zustand |
| PDF 生成 | Express + Puppeteer（Chromium） |
| 決済 | Stripe Checkout |
| インフラ | Google Cloud Run |
| コンテナレジストリ | Google Artifact Registry |

---

## デプロイ

### 前提条件

- `gcloud` CLI がインストール済みで `kantan-rireki` プロジェクトへの権限がある

### 実行

```bash
bash deploy.sh
```

Web・PDF 両サービスのビルド・プッシュ・デプロイを自動実行する。

### 本番環境の環境変数（Cloud Run コンソールで管理）

以下の変数は `deploy.sh` では設定されないため、GCP コンソールで手動設定が必要:

| 変数 | 設定先サービス |
|------|-------------|
| `STRIPE_SECRET_KEY` | Web |
| `BASE_URL` | Web |
| `PDF_SERVER_API_KEY` | Web・PDF（両方に同じ値を設定） |
| `STRIPE_WEBHOOK_SECRET` | Web（Webhook 利用時） |

---

## ディレクトリ構成

```
src/
  app/
    api/checkout/   Stripe Checkout セッション作成
    api/pdf/        決済検証 → PDF サーバーへのプロキシ
    api/webhook/    Stripe Webhook ハンドラ
    cv/             職務経歴書ページ（page.tsx: SSR / CVClient.tsx: CSR）
    resume/         履歴書ページ（page.tsx: SSR / ResumeClient.tsx: CSR）
    legal/          特定商取引法ページ
    contact/        お問い合わせページ
  components/
    forms/          入力フォーム群（resume/ と cv/ でサブディレクトリ分割）
    preview/        プレビューコンポーネント（Web 表示・PDF 生成共用）
    pdf/            PDF レイアウト（Puppeteer 向け HTML）
  lib/
    store/          Zustand ストア（resumeSlice / cvSlice）
    constants.ts    APP_CONFIG（金額等）
    stripe.ts       Stripe クライアント
  pdf-server/
    server.tsx      Express + Puppeteer サーバー
  types/
    resume.ts       全型定義（ResumeData・CVData）
```
