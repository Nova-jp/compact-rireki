import { Suspense } from 'react';
import { Metadata } from 'next';
import CVClient from './CVClient';

export const metadata: Metadata = {
  title: "職務経歴書を作成 | かんたん履歴書",
  description: "モダンで読みやすい職務経歴書をブラウザ上で作成。項目を埋めるだけで、プロフェッショナルなレイアウトのPDFを即座に生成できます。登録不要・個人情報保護対応。",
  keywords: ["職務経歴書作成", "職務経歴書 テンプレート", "オンライン作成", "転職準備"],
};

export default function CVPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">読み込み中...</div>}>
      <CVClient />
    </Suspense>
  );
}
