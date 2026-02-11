'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResumeStore } from '@/lib/store';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { WorkHistoryForm } from '@/components/forms/WorkHistoryForm';
import { LicenseForm } from '@/components/forms/LicenseForm';
import { PRForm } from '@/components/forms/PRForm';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { toast } from 'react-hot-toast';
import { User, GraduationCap, Briefcase, Award, FileText, ChevronLeft, ChevronRight, CreditCard, CheckCircle2, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { APP_CONFIG } from '@/lib/constants';

type Tab = 'personal' | 'history' | 'licenses' | 'pr';

function ResumePageContent() {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { data, hasHydrated } = useResumeStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (sessionId && !isPaid && hasHydrated) {
      handleDownload(sessionId);
    }
  }, [sessionId, hasHydrated]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.personalInfo.email }) 
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        throw new Error(`サーバーエラーが発生しました (${response.status})`);
      }
      
      if (!response.ok) {
        console.error('Checkout API Error:', responseData);
        throw new Error(responseData.error || `APIエラー (${response.status})`);
      }

      const { url } = responseData;
      console.log('Checkout URL received:', url);
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('決済ページへのURLが見つかりませんでした。');
      }
    } catch (error: any) {
      console.error('handleCheckout error:', error);
      toast.error(`決済の準備に失敗しました: ${error.message}`);
      setIsProcessing(false);
    }
  };

  const handleDownload = async (sid: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: data.personalInfo.name || 'resume',
          sessionId: sid,
          data: data // Send data for server-side generation
        }),
      });

      if (!response.ok) throw new Error('Payment verification failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `履歴書_${data.personalInfo.name || 'unsigned'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setIsPaid(true);
      router.replace('/resume');
      toast.success('ダウンロードを開始しました');
    } catch (error) {
      console.error(error);
      toast.error('PDFの生成または支払いの確認に失敗しました。');
    } finally {
      setIsProcessing(false);
    }
  };

  const tabs = [
    { id: 'personal', label: '基本情報', icon: User },
    { id: 'history', label: '学歴・職歴', icon: GraduationCap },
    { id: 'licenses', label: '資格', icon: Award },
    { id: 'pr', label: '自己PR', icon: Briefcase },
  ];

  const currentIndex = tabs.findIndex(t => t.id === activeTab);
  const goToNext = () => currentIndex < tabs.length - 1 && setActiveTab(tabs[currentIndex + 1].id as Tab);
  const goToPrev = () => currentIndex > 0 && setActiveTab(tabs[currentIndex - 1].id as Tab);

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] text-slate-900">
      <header className="flex-none flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shadow-sm z-20">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
            <FileText className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">かんたん履歴書</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { if(confirm('入力したデータをすべて消去しますか？')) { localStorage.clear(); window.location.reload(); } }}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="データを消去"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {isPaid ? (
            <div className="flex items-center gap-2 px-6 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-full font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> 支払い済み
            </div>
          ) : (
            <button 
              className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center gap-2 disabled:opacity-50"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {isProcessing ? '処理中...' : '支払ってダウンロード'}
              {!isProcessing && <span className="bg-slate-700 px-2 py-0.5 rounded-full text-[10px] tracking-wide ml-1">¥{APP_CONFIG.PAYMENT.AMOUNT.toLocaleString()}</span>}
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="w-[45%] bg-white border-r border-slate-200 flex flex-col relative z-10">
          <div className="flex-none bg-white border-b border-slate-100 px-6 pt-6 shadow-sm z-10">
            <div className="flex gap-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={clsx(
                      "flex items-center gap-2 pb-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 mb-[-1px]",
                      isActive ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
                    )}
                  >
                    <Icon className={clsx("w-4 h-4", isActive && "stroke-[2.5px]")} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-8 pb-32 max-w-xl mx-auto space-y-8">
              {activeTab === 'personal' && <PersonalInfoForm />}
              {activeTab === 'history' && <><EducationForm /><WorkHistoryForm /></>}
              {activeTab === 'licenses' && <LicenseForm />}
              {activeTab === 'pr' && <PRForm />}
            </div>
          </div>

          <div className="flex-none bg-white border-t border-slate-100 p-4 px-8 flex justify-between items-center shadow-md z-20">
            <button onClick={goToPrev} disabled={currentIndex === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> 前へ
            </button>
            <button onClick={goToNext} disabled={currentIndex === tabs.length - 1} className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold bg-blue-600 text-white disabled:opacity-30">
              {currentIndex === tabs.length - 1 ? "完了" : "次へ"}
              {currentIndex < tabs.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="w-[55%] overflow-y-auto bg-slate-800 p-12 flex justify-center scrollbar-thin">
          <div className="shadow-2xl origin-top transform scale-[0.6] xl:scale-[0.75] 2xl:scale-90">
            <ResumePreview />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">読み込み中...</div>}>
      <ResumePageContent />
    </Suspense>
  );
}