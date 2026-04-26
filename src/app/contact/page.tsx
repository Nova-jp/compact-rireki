import Link from 'next/link';
import { FileText, ArrowLeft, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ご意見・ご要望 | かんたん履歴書",
  description: "かんたん履歴書へのご意見・ご要望はXのDMにてお気軽にお送りください。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="px-6 lg:px-12 h-16 lg:h-20 flex items-center bg-white border-b border-slate-200">
        <Link className="flex items-center gap-2 hover:opacity-80 transition-opacity" href="/">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <FileText className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg lg:text-xl tracking-tighter">かんたん履歴書</span>
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-12 lg:pt-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <h1 className="text-2xl lg:text-3xl font-bold mb-10 border-b border-slate-200 pb-4">ご意見・ご要望</h1>

        <div className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm text-center space-y-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>

          <div className="space-y-3">
            <p className="text-slate-700 leading-relaxed">
              「こんな機能がほしい」「ここが使いにくい」など、<br className="hidden sm:block" />
              どんな小さなご意見もお待ちしています。
            </p>
            <p className="text-sm text-slate-500">
              X（旧Twitter）のDMにてお気軽にご連絡ください。
            </p>
          </div>

          <a
            href="https://x.com/Prod103kanre"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-full transition-all active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @Prod103kanre にDMを送る
          </a>

          <p className="text-xs text-slate-400">
            システム上の不具合が発生した場合もDMにてご連絡ください。
          </p>
        </div>
      </main>
    </div>
  );
}
