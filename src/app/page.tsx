import Link from 'next/link';
import { FileText, Briefcase, CheckCircle2, Shield, Zap, ArrowRight, Users, CreditCard, Smartphone } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "かんたん履歴書 | 登録不要・個人情報の保存なし・明朗会計",
  description: "登録不要・個人情報の保存なし・転職サービスへの誘導なし。履歴書と職務経歴書をブラウザだけで作成してPDFダウンロード。月額不要、PDF出力のみ¥100の明朗会計。",
};

const faqs = [
  {
    q: "アカウント登録は必要ですか？",
    a: "不要です。すぐに作成を始められます。",
  },
  {
    q: "入力した個人情報はサーバーに保存されますか？",
    a: "保存されません。入力した内容はお使いのブラウザのみに保存されます。外部サーバーへの送信は行わないため、個人情報が外部に渡ることはありません。",
  },
  {
    q: "転職サービスや求人への誘導はありますか？",
    a: "一切ありません。このサービスは履歴書・職務経歴書の作成だけに特化しており、求人紹介・転職エージェントへの誘導・勧誘メールの送信は行いません。",
  },
  {
    q: `料金はいくらですか？サブスクリプションはありますか？`,
    a: `PDF出力時のみ¥${APP_CONFIG.PAYMENT.AMOUNT}（税込）の都度払いです。月額料金・サブスクリプション・隠れた追加料金は一切ありません。プレビューまでは何度でも無料です。`,
  },
  {
    q: "スマホからでも使えますか？",
    a: "使えます。ブラウザのみで完結するためアプリのインストールは不要です。PCとスマートフォン、どちらからでもご利用いただけます。",
  },
  {
    q: "何度も使えますか？",
    a: `何度でも使えます。PDF出力のたびに¥${APP_CONFIG.PAYMENT.AMOUNT}が発生しますが、入力・編集・プレビューは何度でも無料です。`,
  },
];

export default function Home() {
  const softwareAppJsonLd = {
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
    "description": "登録不要・個人情報の保存なし・転職サービスへの誘導なし。履歴書と職務経歴書をブラウザだけで作成してPDFダウンロードできます。",
    "url": "https://compact-rireki.com",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              登録不要・個人情報の保存なし。<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">履歴書と職務経歴書を、
              <br/>かんたん作成。</span>
            </h1>

            <p className="text-base lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 lg:mb-12 leading-relaxed">
              入力データはサーバーに保存されません。<br className="hidden sm:block"/>
              転職サービスへの誘導も一切なし。PDF出力¥{APP_CONFIG.PAYMENT.AMOUNT}のみ、サブスクなし。
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
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">個人情報をとらない</h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  入力データはあなたのブラウザ内にのみ保存されます。サーバーへの保存は一切行わないため、個人情報が外部に渡ることはありません。
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">登録・ログイン不要</h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  アカウント作成やメールアドレスの登録は不要です。サイトを開いてすぐに書き始められ、PDF出力までスムーズに完結します。
                </p>
              </div>

              <div className="flex flex-col items-center text-center group sm:col-span-2 lg:col-span-1 max-w-md mx-auto lg:max-w-none">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">明朗会計・サブスクなし</h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  月額料金・サブスクリプションは存在しません。PDF出力時のみ¥{APP_CONFIG.PAYMENT.AMOUNT}の都度払い。転職サービスへの誘導も一切ありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-20 lg:py-32 bg-slate-50 px-6 border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-4">こんな方に使われています</h2>
              <div className="w-12 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex gap-5">
                <div className="w-12 h-12 shrink-0 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">転職活動中の方</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    履歴書も職務経歴書も、登録なしでその場で作成できます。転職エージェントへの誘導は一切ありません。
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex gap-5">
                <div className="w-12 h-12 shrink-0 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">個人情報の扱いが心配な方</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    入力データはサーバーに送信されません。勧誘メールが届くこともありません。
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex gap-5">
                <div className="w-12 h-12 shrink-0 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">月額課金に縛られたくない方</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    PDF出力¥{APP_CONFIG.PAYMENT.AMOUNT}のみ。サブスクリプション・月額料金は存在しません。必要な時だけ使えます。
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex gap-5">
                <div className="w-12 h-12 shrink-0 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">スマホからすぐ作りたい方</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    アプリ不要。ブラウザを開いてすぐ作成開始。スマホ・PCどちらでも使えます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-32 bg-white px-6 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-4">よくある質問</h2>
              <div className="w-12 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="divide-y divide-slate-100">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span className="font-semibold text-slate-800 text-sm lg:text-base">{faq.q}</span>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-lg font-light group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="mt-3 text-slate-500 text-sm lg:text-base leading-relaxed pl-0">{faq.a}</p>
                </details>
              ))}
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
