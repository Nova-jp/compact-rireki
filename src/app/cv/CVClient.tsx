'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResumeStore } from '@/lib/store';
import { CVPersonalInfoForm } from '@/components/forms/cv/CVPersonalInfoForm';
import { CVSummaryForm } from '@/components/forms/cv/CVSummaryForm';
import { CVWorkHistoryForm } from '@/components/forms/cv/CVWorkHistoryForm';
import { CVSkillsForm } from '@/components/forms/cv/CVSkillsForm';
import { CVLicensesForm } from '@/components/forms/cv/CVLicensesForm';
import { CVSelfPRForm } from '@/components/forms/cv/CVSelfPRForm';
import { CVPreview } from '@/components/preview/CVPreview';

import { toast } from 'react-hot-toast';
import { User, Briefcase, Award, FileText, ChevronLeft, ChevronRight, CreditCard, CheckCircle2, Trash2, Eye, Edit3 } from 'lucide-react';
import clsx from 'clsx';
import { APP_CONFIG } from '@/lib/constants';

type Tab = 'personal' | 'summary' | 'work-history' | 'licenses' | 'skills' | 'self-pr';

export default function CVClient() {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const { data, cvData, hasHydrated } = useResumeStore();
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
        body: JSON.stringify({ 
          email: data.personalInfo.email,
          type: 'cv' 
        }) 
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
          name: data.personalInfo.name || 'cv',
          sessionId: sid,
          cvData: cvData,
          personalInfo: data.personalInfo
        }),
      });

      if (!response.ok) throw new Error('Payment verification failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `職務経歴書_${data.personalInfo.name || 'unsigned'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setIsPaid(true);
      router.replace('/cv');
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
    { id: 'summary', label: '要約', icon: FileText },
    { id: 'work-history', label: '詳細職歴', icon: Briefcase },
    { id: 'licenses', label: '資格', icon: Award },
    { id: 'skills', label: 'スキル', icon: Award },
    { id: 'self-pr', label: '自己PR', icon: User },
  ];

  const currentIndex = tabs.findIndex(t => t.id === activeTab);
  const goToNext = () => currentIndex < tabs.length - 1 && setActiveTab(tabs[currentIndex + 1].id as Tab);
  const goToPrev = () => currentIndex > 0 && setActiveTab(tabs[currentIndex - 1].id as Tab);

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
      <header className="flex-none flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4 bg-white border-b border-slate-200 shadow-sm z-30">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
            <FileText className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg lg:text-xl font-bold tracking-tight">
            <span className="hidden sm:inline">かんたん履歴書 </span>
            <span className="text-slate-500 sm:text-slate-400 font-medium sm:font-normal">職務経歴書</span>
          </h1>
        </Link>
        
        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={() => { if(confirm('入力したデータをすべて消去しますか？')) { localStorage.removeItem('resume-storage'); window.location.reload(); } }}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="データを消去"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {isPaid ? (
            <div className="flex items-center gap-2 px-4 lg:px-6 py-2 bg-green-50 text-green-700 border border-green-200 rounded-full font-bold text-xs lg:text-sm">
              <CheckCircle2 className="w-4 h-4" /> <span className="hidden sm:inline">支払い済み</span>
            </div>
          ) : (
            <button 
              className="px-4 lg:px-6 py-2 lg:py-2.5 text-xs lg:text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center gap-2 disabled:opacity-50"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isProcessing ? '処理中...' : '支払ってダウンロード'}</span>
              <span className="sm:hidden">{isProcessing ? '...' : '保存'}</span>
              {!isProcessing && <span className="bg-slate-700 px-2 py-0.5 rounded-full text-[10px] tracking-wide ml-1">¥{APP_CONFIG.PAYMENT.AMOUNT.toLocaleString()}</span>}
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Form Column */}
        <div className={clsx(
          "w-full lg:w-[45%] bg-white border-r border-slate-200 flex flex-col relative z-10 transition-all duration-300 ease-in-out",
          viewMode === 'preview' ? "opacity-0 invisible lg:opacity-100 lg:visible -translate-x-full lg:translate-x-0 absolute lg:relative" : "opacity-100 visible translate-x-0"
        )}>
          <div className="flex-none bg-white border-b border-slate-100 px-4 lg:px-6 pt-4 lg:pt-6 shadow-sm z-10">
            <div className="flex gap-4 lg:gap-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={clsx(
                      "flex items-center gap-2 pb-3 lg:pb-4 text-xs lg:text-sm font-medium whitespace-nowrap transition-all border-b-2 mb-[-1px]",
                      isActive ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
                    )}
                  >
                    <Icon className={clsx("w-3.5 h-3.5 lg:w-4 lg:h-4", isActive && "stroke-[2.5px]")} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8 pb-32 max-w-xl mx-auto space-y-6 lg:space-y-8">
              {activeTab === 'personal' && <CVPersonalInfoForm />}
              {activeTab === 'summary' && <CVSummaryForm />}
              {activeTab === 'work-history' && <CVWorkHistoryForm />}
              {activeTab === 'licenses' && <CVLicensesForm />}
              {activeTab === 'skills' && <CVSkillsForm />}
              {activeTab === 'self-pr' && <CVSelfPRForm />}
            </div>
          </div>

          <div className="flex-none bg-white border-t border-slate-100 p-4 px-6 lg:px-8 flex justify-between items-center shadow-lg z-20">
            <button onClick={goToPrev} disabled={currentIndex === 0} className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">前へ</span>
            </button>
            <div className="lg:hidden flex items-center gap-1">
              {tabs.map((_, i) => (
                <div key={i} className={clsx("w-1.5 h-1.5 rounded-full", i === currentIndex ? "bg-blue-600" : "bg-slate-200")} />
              ))}
            </div>
            <button onClick={goToNext} disabled={currentIndex === tabs.length - 1} className="flex items-center gap-2 px-5 lg:px-6 py-2 rounded-full text-sm font-bold bg-blue-600 text-white shadow-md active:scale-95 disabled:opacity-30">
              {currentIndex === tabs.length - 1 ? "完了" : (
                <>
                  <span className="hidden sm:inline">次へ</span>
                  <span className="sm:hidden">次へ</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className={clsx(
          "w-full lg:w-[55%] overflow-y-auto overflow-x-hidden bg-slate-800 p-4 lg:p-12 flex justify-center scrollbar-thin transition-all duration-300 ease-in-out absolute lg:relative inset-0 lg:inset-auto z-0 lg:z-auto",
          viewMode === 'edit' ? "opacity-0 invisible lg:opacity-100 lg:visible translate-x-full lg:translate-x-0" : "opacity-100 visible translate-x-0"
        )}>
          <div className="shadow-2xl origin-top transform scale-[0.42] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.6] xl:scale-[0.75] 2xl:scale-90 max-w-none">
            <CVPreview />
          </div>
        </div>

        {/* Floating Action Button for Mobile Preview Toggle */}
        <button
          onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
          className="lg:hidden fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-2xl active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {viewMode === 'edit' ? (
            <>
              <Eye className="w-5 h-5" />
              <span className="text-sm font-bold">プレビュー確認</span>
            </>
          ) : (
            <>
              <Edit3 className="w-5 h-5" />
              <span className="text-sm font-bold">編集に戻る</span>
            </>
          )}
        </button>
      </main>
    </div>
  );
}
