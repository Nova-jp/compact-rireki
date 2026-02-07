'use client';

import { useResumeStore } from '@/lib/store';

export function CVSelfPRForm() {
  const { cvData, updateCVSelfPromotion } = useResumeStore();
  
  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">自己PR</h3>
        <p className="text-xs text-slate-500 mb-2">
            強みや意気込みなどを記入してください。
        </p>
        <textarea
            value={cvData.selfPromotion}
            onChange={(e) => updateCVSelfPromotion(e.target.value)}
            className="w-full h-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            placeholder="私の強みは..."
        />
      </div>
    </div>
  );
}
