import { Suspense } from 'react';
import { Metadata } from 'next';
import CVClient from './CVClient';

export const metadata: Metadata = {
  title: "職務経歴書を作成 | かんたん履歴書",
  description: "登録不要で使える職務経歴書作成ツール。個人情報はブラウザ外に出ません。転職サービスへの誘導なし、サブスクなし、PDF出力¥100のみ。",
  keywords: ["職務経歴書作成", "職務経歴書 登録不要", "職務経歴書 個人情報不要", "転職 職務経歴書", "スマホ 職務経歴書"],
};

export default function CVPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">読み込み中...</div>}>
      <CVClient />
    </Suspense>
  );
}
