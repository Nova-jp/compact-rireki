import { Suspense } from 'react';
import { Metadata } from 'next';
import ResumeClient from './ResumeClient';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: "履歴書を作成 | かんたん履歴書",
  description: `会員登録不要で使える履歴書作成ツール。入力した情報はサーバーに送信されません。転職エージェントへの誘導も一切なし。PDF出力¥${APP_CONFIG.PAYMENT.AMOUNT}、プレビューは何度でも無料。`,
  keywords: ["履歴書作成", "履歴書 登録不要", "履歴書 個人情報不要", "転職 履歴書", "就活 履歴書", "アルバイト 履歴書", "スマホ 履歴書作成"],
};

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">読み込み中...</div>}>
      <ResumeClient />
    </Suspense>
  );
}
