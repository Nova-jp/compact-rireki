#!/bin/bash

# 設定
PROJECT_ID="kantan-rireki"
REGION="asia-northeast1"
REPO_NAME="kantan-rireki-repo"
WEB_SERVICE="kantan-rireki-web"
PDF_SERVICE="kantan-rireki-pdf"
PDF_API_KEY="kantan-rireki-secret-key-2025"

# 画像のフルパスを定義
PDF_IMAGE="asia-northeast1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$PDF_SERVICE"
WEB_IMAGE="asia-northeast1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$WEB_SERVICE"

echo "🚀 デプロイを開始します: $PROJECT_ID"

# 1. PDFサーバーのビルド
echo "📦 PDFサーバーをビルド中..."
gcloud builds submit . \
    --project "$PROJECT_ID" \
    --config=<(cat <<EOF
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', '$PDF_IMAGE', '-f', 'Dockerfile.pdfserver', '.']
images:
- '$PDF_IMAGE'
EOF
)

# 2. Webサーバーのビルド
echo "📦 Webサーバーをビルド中..."
gcloud builds submit . \
    --project "$PROJECT_ID" \
    --config=<(cat <<EOF
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', '$WEB_IMAGE', '-f', 'Dockerfile.web', '.']
images:
- '$WEB_IMAGE'
EOF
)

# 3. PDFサーバーのデプロイ
echo "📄 PDFサーバーをデプロイ中 (Cloud Run)..."
gcloud run deploy "$PDF_SERVICE" \
    --image "$PDF_IMAGE" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --min-instances 0 \
    --port 3001 \
    --set-env-vars "PDF_SERVER_API_KEY=$PDF_API_KEY" \
    --project "$PROJECT_ID"

# 最新のPDFサーバーURLを取得
PDF_URL=$(gcloud run services describe "$PDF_SERVICE" --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')/generate
echo "🔗 PDF Server URL: $PDF_URL"

# 4. Webサーバーのデプロイ
echo "🌐 Webサーバーをデプロイ中 (Cloud Run)..."
gcloud run deploy "$WEB_SERVICE" \
    --image "$WEB_IMAGE" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --min-instances 1 \
    --update-env-vars "PDF_SERVER_URL=$PDF_URL,PDF_SERVER_API_KEY=$PDF_API_KEY" \
    --project "$PROJECT_ID"

echo "--------------------------------------------------"
echo "✅ デプロイ完了！"
echo "Web URL: $(gcloud run services describe "$WEB_SERVICE" --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')"
echo "--------------------------------------------------"
