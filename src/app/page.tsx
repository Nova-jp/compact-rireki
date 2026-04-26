import Link from 'next/link';
import { FileText, Briefcase, CheckCircle2, Shield, Zap, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "かんたん履歴書 | 登録不要・ブラウザで完結する履歴書・職務経歴書作成サービス",
  description: "個人情報の保存なしで安心。スマホ・PCから項目を埋めるだけで、美しいレイアウトの履歴書と職務経歴書が作成できます。PDF出力も即座に対応。",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "かんたん履歴書",
    "operatingSystem": "Any",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": APP_CONFIG.PAYMENT.AMOUNT.toString(),
      "priceCurrency": "JPY"
    },
    "description": "登録不要、ブラウザで完結。JIS規格の履歴書やモダンな職務経歴書を簡単に作成・PDFダウンロードできるサービスです。",
    "url": "https://compact-rireki.com",
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <Link className="flex items-center gap-2 hover:opacity-80 transition-opacity" href="/">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
            <FileText className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg lg:text-xl tracking-tighter text-slate-900 text-nowrap">かんたん履歴書</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/resume" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">履歴書作成</Link>
          <Link href="/cv" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">職務経歴書作成</Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-40 lg:pb-52 px-6 text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white opacity-70"></div>
          
          <div className="max-w-4xl mx-auto relative animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-6">
              <Zap className="w-3 h-3" />
              <span>登録不要、ブラウザで完結</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.2] lg:leading-[1.1]">
              日本の履歴書・職務経歴書を<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">もっと簡単に、美しく。</span>
            </h1>
            
            <p className="text-base lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 lg:mb-12 leading-relaxed">
              ブラウザ完結。個人情報は保存されません。<br className="hidden sm:block"/>
              JIS規格の履歴書と、モダンな職務経歴書を今すぐ作成できます。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/resume" className="w-full sm:w-auto group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-10 font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-200 active:scale-95">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  履歴書を作成
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/cv" className="w-full sm:w-auto group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-10 font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-200 active:scale-95">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  職務経歴書を作成
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
            
            <p className="mt-8 text-xs lg:text-sm text-slate-400">
              基本利用無料・PDF出力時に都度払い（¥{APP_CONFIG.PAYMENT.AMOUNT}〜）
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 lg:py-32 bg-white px-6 border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-4">選ばれる3つの理由</h2>
              <div className="w-12 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">個人情報保護</h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  入力データはあなたのブラウザ内にのみ一時保存されます。サーバーへの送信・保存は一切行わないため、セキュリティ面も安心です。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">面倒な登録なし</h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  アカウント作成やログインは不要です。サイトを開いてすぐに書き始めることができ、PDF出力までスムーズに完結します。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center group sm:col-span-2 lg:col-span-1 max-w-md mx-auto lg:max-w-none">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">美しいレイアウト</h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  採用担当者が見慣れたJIS規格準拠の履歴書と、読みやすさを重視したモダンな職務経歴書テンプレートを採用しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-slate-900 text-white px-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">今すぐ作成を始めましょう</h2>
            <p className="text-slate-400 text-lg mb-10 lg:mb-12">
              あなたのキャリアを、もっとも魅力的な形で表現するために。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resume" className="h-14 inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-10 font-bold hover:bg-blue-700 transition-all active:scale-95">
                履歴書を作成
              </Link>
              <Link href="/cv" className="h-14 inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-10 font-bold hover:bg-blue-700 transition-all active:scale-95">
                職務経歴書を作成
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 lg:py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center">
                <FileText className="text-slate-500 w-4 h-4" />
              </div>
              <span className="font-bold text-slate-700">かんたん履歴書</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs text-center md:text-left">
              日本の転職活動を、テクノロジーの力でよりシンプルに。
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-6 text-sm font-medium text-slate-500">
               <Link href="/resume" className="hover:text-blue-600 transition-colors">履歴書</Link>
               <Link href="/cv" className="hover:text-blue-600 transition-colors">職務経歴書</Link>
               <Link href="/contact" className="hover:text-blue-600 transition-colors">ご意見・ご要望</Link>
             </div>
             <div className="flex items-center gap-4 text-xs text-slate-400">
               <Link href="/legal" className="hover:text-slate-600 transition-colors">特定商取引法に基づく表記</Link>
               <p>© 2026 かんたん履歴書. All rights reserved.</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}