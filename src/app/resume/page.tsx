import { Suspense } from 'react';
import { Metadata } from 'next';
import ResumeClient from './ResumeClient';

export const metadata: Metadata = {
  title: "履歴書を作成 | かんたん履歴書",
  description: "JIS規格準拠の履歴書をオンラインで簡単作成。スマホやPCから情報を入力するだけで、きれいなレイアウトのPDFが完成します。登録不要で今すぐ作成開始。",
  keywords: ["履歴書作成", "履歴書 テンプレート", "JIS規格", "オンライン履歴書", "無料"],
};

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">読み込み中...</div>}>
      <ResumeClient />
    </Suspense>
  );
}
