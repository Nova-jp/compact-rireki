#!/bin/bash
# GCP CI/CD初期設定スクリプト（一回のみ実行）

PROJECT_ID="kantan-rireki"
REPO="Nova-jp/compact-rireki"
SA_NAME="github-actions-sa"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "=== Step 1: Workload Identity Pool 作成 ==="
gcloud iam workload-identity-pools create "github-pool" \
  --project="$PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions Pool"

echo "=== Step 2: Workload Identity Provider 作成 ==="
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='${REPO}'"

echo "=== Step 3: サービスアカウント作成 ==="
gcloud iam service-accounts create "$SA_NAME" \
  --project="$PROJECT_ID" \
  --display-name="GitHub Actions SA"

echo "=== Step 4: 権限付与 ==="
for ROLE in roles/run.admin roles/artifactregistry.writer roles/iam.serviceAccountUser roles/storage.objectAdmin; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="$ROLE"
done

echo "=== Step 5: WIF とサービスアカウントを紐付け ==="
POOL_ID=$(gcloud iam workload-identity-pools describe "github-pool" \
  --project="$PROJECT_ID" --location="global" \
  --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.repository/${REPO}"

echo ""
echo "=== GitHub Secrets に登録する値 ==="
echo "GCP_SERVICE_ACCOUNT: ${SA_EMAIL}"
echo "GCP_WORKLOAD_IDENTITY_PROVIDER:"
gcloud iam workload-identity-pools providers describe "github-provider" \
  --workload-identity-pool="github-pool" \
  --location="global" \
  --project="$PROJECT_ID" \
  --format="value(name)"
