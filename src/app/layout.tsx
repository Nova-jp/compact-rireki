import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

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
    default: "かんたん履歴書 | 登録不要でブラウザから即作成",
    template: "%s | かんたん履歴書"
  },
  description: "登録不要、ブラウザで完結。JIS規格の履歴書やモダンな職務経歴書を簡単に作成・PDFダウンロードできるサービスです。",
  keywords: ["履歴書作成", "職務経歴書作成", "無料", "登録不要", "転職", "PDF作成"],
  openGraph: {
    title: "かんたん履歴書",
    description: "登録不要、ブラウザで完結。JIS規格の履歴書やモダンな職務経歴書を簡単に作成・PDFダウンロードできるサービスです。",
    url: "https://compact-rireki.com",
    siteName: "かんたん履歴書",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "かんたん履歴書",
    description: "登録不要、ブラウザで完結。JIS規格の履歴書やモダンな職務経歴書を簡単に作成・PDFダウンロードできるサービスです。",
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
    </html>
  );
}
