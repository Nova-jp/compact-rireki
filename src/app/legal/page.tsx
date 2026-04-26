import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "かんたん履歴書の特定商取引法に基づく表記に関する情報を掲載しています。",
};

export default function LegalPage() {
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

      <main className="max-w-3xl mx-auto px-6 pt-12 lg:pt-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <h1 className="text-2xl lg:text-3xl font-bold mb-10 border-b border-slate-200 pb-4">特定商取引法に基づく表記</h1>

        <div className="space-y-10 bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">運営責任者</h2>
            <p className="text-slate-800">西原寛人</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">所在地</h2>
            <p className="text-slate-800">〒103-0026 東京都中央区日本橋兜町 17-2 兜町第6葉山ビル 4F</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">お問い合わせ</h2>
            <p className="text-slate-800">
              X（旧Twitter）:{' '}
              <a
                href="https://x.com/Prod103kanre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @Prod103kanre
              </a>
            </p>
            <p className="text-sm text-slate-500 mt-2">
              ご意見・ご要望はXのDMにてお気軽にお送りください。
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">販売価格</h2>
            <p className="text-slate-800 text-lg font-bold">PDF1件ダウンロードにつき100円〜（税込）</p>
            <p className="text-sm text-slate-500 mt-1">※各作成画面の決済ボタンに表示される金額が適用されます。</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">商品代金以外の必要料金</h2>
            <p className="text-slate-800">当サイトの閲覧、コンテンツのダウンロード等に必要なインターネット接続料金、通信料金等は、お客様のご負担となります。</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">代金の支払時期と支払方法</h2>
            <p className="text-slate-800 font-bold mb-2">支払方法</p>
            <p className="text-slate-800 mb-4">クレジットカード、PayPay</p>
            <p className="text-slate-800 font-bold mb-2">支払時期</p>
            <p className="text-slate-800">商品注文確定時に決済が完了します。</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">商品の引き渡し時期</h2>
            <p className="text-slate-800">決済完了後、即時にPDFファイルが生成され、ダウンロードが可能となります。</p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">返品・キャンセルに関する特約</h2>
            <p className="text-slate-800">デジタルコンテンツという商品の性質上、決済完了後のキャンセル・返品・返金には応じられません。</p>
            <p className="text-slate-800 mt-2 text-sm">※万が一、システム上の不具合によりダウンロードができなかった場合は、XのDMよりご連絡ください。</p>
          </section>
        </div>
      </main>
    </div>
  );
}
