#!/bin/bash

# GCP Project ID and Config
PROJECT_ID="kantan-rireki"
REGION="asia-northeast1"
REPO_NAME="kantan-rireki-repo"
WEB_SERVICE="kantan-rireki-web"
PDF_SERVICE="kantan-rireki-pdf"
PDF_API_KEY="kantan-rireki-secret-key-2025"

echo "🚀 Starting deployment to: $WEB_SERVICE"

# 1. Build images on Cloud Build
echo "📦 Building images on Cloud Build..."
gcloud builds submit --tag "asia-northeast1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$PDF_SERVICE" -f Dockerfile.pdf .
gcloud builds submit --tag "asia-northeast1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$WEB_SERVICE" -f Dockerfile.web .

# 2. Deploy PDF Server (On-demand)
echo "📄 Deploying PDF Server (min-instances: 0)..."
gcloud run deploy "$PDF_SERVICE" \
    --image "asia-northeast1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$PDF_SERVICE" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --timeout 300 \
    --min-instances 0 \
    --port 3001 \
    --set-env-vars "PDF_SERVER_API_KEY=$PDF_API_KEY" \
    --project "$PROJECT_ID"

# Get PDF Server URL
PDF_URL=$(gcloud run services describe "$PDF_SERVICE" --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')/generate

# 3. Deploy Web Server (Always-on)
echo "🌐 Updating Web Server: $WEB_SERVICE (min-instances: 1)..."
gcloud run deploy "$WEB_SERVICE" \
    --image "asia-northeast1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$WEB_SERVICE" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --min-instances 1 \
    --update-env-vars "PDF_SERVER_URL=$PDF_URL,PDF_SERVER_API_KEY=$PDF_API_KEY" \
    --project "$PROJECT_ID"

# Get Web Server URL
WEB_URL=$(gcloud run services describe "$WEB_SERVICE" --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')

echo "--------------------------------------------------"
echo "✅ Deployment Successful!"
echo "Service: $WEB_SERVICE"
echo "URL: $WEB_URL"
echo "--------------------------------------------------"
