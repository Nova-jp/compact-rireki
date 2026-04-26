'use client';

import { useResumeStore } from '@/lib/store';

export function CVSelfPRForm() {
  const { cvData, updateCVSelfPromotion } = useResumeStore();
  
  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-5 lg:p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">自己PR</h3>
        <p className="text-xs text-slate-500 mb-4 bg-slate-50 px-2 py-1 rounded inline-block">
            強みや意気込みなどを記入してください。
        </p>
        <textarea
            value={cvData.selfPromotion}
            onChange={(e) => updateCVSelfPromotion(e.target.value)}
            className="w-full h-64 lg:h-40 px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            placeholder="私の強みは..."
        />
      </div>
    </div>
  );
}
