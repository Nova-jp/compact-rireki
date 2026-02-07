import Link from 'next/link';
import { FileText, Briefcase, CheckCircle2, Shield, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <Link className="flex items-center gap-2 hover:opacity-80 transition-opacity" href="/">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
            <FileText className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-slate-900">かんたん履歴書</span>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-40 lg:pb-52 px-6 text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white opacity-70"></div>
          
          <div className="max-w-4xl mx-auto relative animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1] pt-12">
              日本の履歴書・職務経歴書を<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">もっと簡単に、美しく。</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              登録不要、ブラウザ完結。個人情報は保存されません。<br/>
              JIS規格の履歴書と、自由度の高い職務経歴書を今すぐ作成できます。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/resume" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-200">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  履歴書を作成
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/cv" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-200">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  職務経歴書を作成
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-slate-400">
              基本利用無料・PDF出力時に都度払い
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white px-6 border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">個人情報保護</h3>
                <p className="text-slate-500 leading-relaxed">
                  入力データはあなたのブラウザ内にのみ一時保存されます。サーバーへの送信・保存は一切行わないため、セキュリティ面も安心です。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">面倒な登録なし</h3>
                <p className="text-slate-500 leading-relaxed">
                  アカウント作成やログインは不要です。サイトを開いてすぐに書き始めることができ、PDF出力までスムーズに完結します。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">美しいレイアウト</h3>
                <p className="text-slate-500 leading-relaxed">
                  採用担当者が見慣れたJIS規格準拠の履歴書と、読みやすさを重視したモダンな職務経歴書テンプレートを採用しています。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center">
              <FileText className="text-slate-500 w-4 h-4" />
            </div>
            <span className="font-bold text-slate-700">かんたん履歴書</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 かんたん履歴書. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}