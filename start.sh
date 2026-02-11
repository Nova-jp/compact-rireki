#!/bin/bash

# .env.local があるか確認
if [ ! -f .env.local ]; then
  echo "⚠️ .env.local が見つかりません。作成してください。"
  exit 1
fi

echo "🚀 開発サーバーを起動します (http://localhost:3000)..."
npm run dev
