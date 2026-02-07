'use client';

import { useResumeStore } from '@/lib/store';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function CVLicensesForm() {
  const { cvData, updateCVLicenses } = useResumeStore();
  const licenses = cvData.licenses || [];

  const addEntry = () => {
    updateCVLicenses([
      ...licenses,
      { id: uuidv4(), date: '', name: '' }
    ]);
  };

  const removeEntry = (id: string) => {
    updateCVLicenses(licenses.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: 'date' | 'name', value: string) => {
    updateCVLicenses(
      licenses.map(e => e.id === id ? { ...e, [field]: value } : e)
    );
  };

  const inputClass = "px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">保有資格・免許</h3>
          <p className="text-xs text-slate-500">
            業務に関連する資格を中心に、取得年月とともに記入します。
          </p>
        </div>

        <div className="space-y-3">
          {licenses.map((entry) => (
            <div key={entry.id} className="flex gap-2 items-start group">
              <div className="w-32 flex-shrink-0">
                <input
                  type="text"
                  placeholder="例: 2023年5月"
                  value={entry.date}
                  onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                  className={`${inputClass} w-full`}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="応用情報技術者試験 合格"
                  value={entry.name}
                  onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                  className={`${inputClass} w-full`}
                />
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {licenses.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-4">
              資格情報は登録されていません。
            </p>
          )}
        </div>

        <button
          onClick={addEntry}
          className="mt-4 w-full py-2 flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-lg text-sm font-bold text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all"
        >
          <Plus className="w-4 h-4" /> 資格を追加
        </button>
      </div>
    </div>
  );
}
