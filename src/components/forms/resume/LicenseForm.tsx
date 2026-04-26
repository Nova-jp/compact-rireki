'use client';

import { useResumeStore } from '@/lib/store';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function LicenseForm() {
  const { data, updateLicenses } = useResumeStore();
  const licenses = data.licenses;

  const addEntry = () => {
    updateLicenses([
      ...licenses,
      { id: uuidv4(), year: '', month: '', content: '' }
    ]);
  };

  const removeEntry = (id: string) => {
    updateLicenses(licenses.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: 'year' | 'month' | 'content', value: string) => {
    updateLicenses(
      licenses.map(e => e.id === id ? { ...e, [field]: value } : e)
    );
  };

  const inputClass = "px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 lg:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <h3 className="text-lg font-bold text-slate-800">免許・資格</h3>
          <p className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
            取得年月順に、正式名称で記入します。
          </p>
        </div>

        <div className="space-y-4 lg:space-y-3">
          {licenses.map((entry) => (
            <div key={entry.id} className="relative group bg-slate-50/50 sm:bg-transparent p-4 sm:p-0 rounded-lg border border-slate-100 sm:border-transparent flex flex-col sm:flex-row gap-3 items-start">
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="w-20 flex-shrink-0">
                  <input
                    type="text"
                    placeholder="年"
                    value={entry.year}
                    onChange={(e) => updateEntry(entry.id, 'year', e.target.value)}
                    className={`${inputClass} w-full text-center h-11 sm:h-auto`}
                  />
                </div>
                <div className="w-16 flex-shrink-0">
                  <input
                    type="text"
                    placeholder="月"
                    value={entry.month}
                    onChange={(e) => updateEntry(entry.id, 'month', e.target.value)}
                    className={`${inputClass} w-full text-center h-11 sm:h-auto`}
                  />
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <input
                  type="text"
                  placeholder="資格・免許の正式名称"
                  value={entry.content}
                  onChange={(e) => updateEntry(entry.id, 'content', e.target.value)}
                  className={`${inputClass} w-full h-11 sm:h-auto pr-10 sm:pr-3`}
                />
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="sm:hidden absolute right-1 top-1 p-2 text-slate-400 hover:text-red-500"
                  title="削除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="hidden sm:block p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors lg:opacity-0 lg:group-hover:opacity-100"
                title="削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addEntry}
          className="mt-6 w-full py-3 flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-lg text-sm font-bold text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" /> 資格を追加
        </button>
      </div>
    </div>
  );
}
