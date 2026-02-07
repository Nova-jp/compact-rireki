'use client';

import { useResumeStore } from '@/lib/store';

export function CVSummaryForm() {
  const { cvData, updateCVSummary } = useResumeStore();
  
  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">職務要約</h3>
        <p className="text-xs text-slate-500 mb-2">
            これまでの職務経歴の概略を記入してください（200〜300文字程度推奨）。
        </p>
        <textarea
            value={cvData.summary}
            onChange={(e) => updateCVSummary(e.target.value)}
            className="w-full h-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            placeholder="例：大学卒業後、株式会社〇〇に入社。営業職として..."
        />
      </div>
    </div>
  );
}
