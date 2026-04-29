import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "かんたん履歴書 | 登録不要・個人情報の保存なし・明朗会計",
    template: "%s | かんたん履歴書"
  },
  description: "登録不要・個人情報の保存なし・転職サービスへの誘導なし。履歴書と職務経歴書をブラウザだけで作成してPDFダウンロード。月額不要、PDF出力のみ¥100の明朗会計。",
  keywords: ["履歴書作成", "職務経歴書作成", "登録不要", "個人情報不要", "転職", "メールアドレス不要", "サブスクなし", "月額なし"],
  openGraph: {
    title: "かんたん履歴書 | 登録不要・個人情報の保存なし・明朗会計",
    description: "登録不要・個人情報の保存なし・転職サービスへの誘導なし。履歴書と職務経歴書をブラウザだけで作成してPDFダウンロード。月額不要、PDF出力のみ¥100の明朗会計。",
    url: "https://compact-rireki.com",
    siteName: "かんたん履歴書",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "かんたん履歴書 | 登録不要・個人情報の保存なし・明朗会計",
    description: "登録不要・個人情報の保存なし・転職サービスへの誘導なし。履歴書と職務経歴書をブラウザだけで作成してPDFダウンロード。月額不要、PDF出力のみ¥100の明朗会計。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
