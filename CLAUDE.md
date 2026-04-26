# かんたん履歴書 — プロジェクト概要

## サービス概要
compact-rireki.com — 日本語の履歴書・職務経歴書をブラウザ上で作成・PDF出力できるWebサービス。
- 登録不要・個人情報はサーバーに保存しない・ブラウザ完結
- PDF出力のみ有料（¥100/回、Stripe決済）

---

## ローカル開発

```bash
# 依存関係インストール
npm install

# Next.js + PDFサーバーを同時起動（推奨）
npm run dev:all

# 個別起動
npm run dev        # Next.js (port 3000)
npm run dev:pdf    # PDFサーバー (port 3001)
```

`.env.example` をコピーして `.env.local` を作成し、Stripe APIキーを設定すること。

---

## アーキテクチャ：マイクロサービス構成
Next.js（Web/決済）と Express（PDF生成）を分離し、Cloud Run の 2 サービス体制。

- **Webサーバー** (`Dockerfile.web`): 常時起動（min-instances: 1）。UIとStripe決済を担当。
- **PDFサーバー** (`Dockerfile.pdfserver`): オンデマンド起動（min-instances: 0）。Puppeteer/JSXレンダリングを担当。

```
src/
  app/
    api/checkout/   - Stripe checkout session作成
    api/pdf/        - 決済検証 → PDFサーバーへプロキシ
    api/webhook/    - Stripe webhook（将来のDB連携用プレースホルダー）
    cv/             - page.tsx（SSR/metadata） + CVClient.tsx（CSR）
    resume/         - page.tsx（SSR/metadata） + ResumeClient.tsx（CSR）
    legal/          - 特定商取引法に基づく表記
  components/
    forms/
      PersonalInfoForm.tsx   - 履歴書・CV共用
      resume/                - 履歴書専用フォーム群
      cv/                    - 職務経歴書専用フォーム群
    preview/        - プレビューコンポーネント（Web表示・PDF生成共用）
    pdf/            - PDFレイアウト（Puppeteer向けHTML）
  lib/
    store/          - Zustand store（resumeSlice + cvSlice）
    store.ts        - re-exportバレル
    constants.ts    - APP_CONFIG（金額等）
    stripe.ts
  pdf-server/
    server.tsx      - Express + Puppeteerサーバー
  types/
    resume.ts       - 全型定義（ResumeData・CVData両方）
```

---

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `STRIPE_SECRET_KEY` | Stripe秘密鍵 |
| `BASE_URL` | リダイレクト先のベースURL（例: https://compact-rireki.com） |
| `PDF_SERVER_URL` | PDFサーバーのエンドポイント（例: http://localhost:3001/generate） |
| `PDF_SERVER_API_KEY` | Web→PDF間の認証キー |
| `STRIPE_WEBHOOK_SECRET` | StripeWebhook署名検証用（将来利用） |

---

## 設計上の重要事項

- **データ保存なし**: ユーザーの入力データはブラウザのlocalStorageのみに保存。サーバーへの永続化は行わない。
- **SEO構成**: メタデータ管理のため、`cv`・`resume` ページは `page.tsx`（SSR）と `Client.tsx`（CSR）に分割。
- **PDF生成**: `src/pdf-server` に隔離。Next.js側からは `PDF_SERVER_URL` 経由で呼び出す。
- **決済検証**: `stripe.checkout.sessions.retrieve` による同期検証。セキュリティ上はこれで完結している。
- **DB方針**: ログイン機能がないため、購入情報の永続化が必要になった段階で Firestore 等を導入検討する。
- **APIキー**: Web/PDF間の通信は `PDF_SERVER_API_KEY` ヘッダーで認可。

---

## 今後の課題

1. **PDFサーバーのブラウザプール化**: 現在はリクエスト毎に起動。`puppeteer-cluster` 等で改善可能。
2. **OGP画像**: `public/ogp-image.png` 配置後に `layout.tsx` のメタデータへ画像パスを追加すること。
3. **Webhook + DB**: ブラウザ切断時の救済や再ダウンロード対応が必要になれば導入検討。
