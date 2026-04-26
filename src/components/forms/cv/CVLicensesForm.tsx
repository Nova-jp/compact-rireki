'use client';

import { useResumeStore } from '@/lib/store';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

function toMonthInput(val: string): string {
  const m = val.match(/(\d+)年(\d+)月/);
  if (!m) return '';
  return `${m[1]}-${m[2].padStart(2, '0')}`;
}

function fromMonthInput(val: string): string {
  if (!val) return '';
  const [y, m] = val.split('-');
  return `${y}年${parseInt(m)}月`;
}

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
      <div className="bg-white p-5 lg:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <h3 className="text-lg font-bold text-slate-800">保有資格・免許</h3>
          <p className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
            業務に関連する資格を中心に、取得年月とともに記入します。
          </p>
        </div>

        <div className="space-y-4 lg:space-y-3">
          {licenses.map((entry) => (
            <div key={entry.id} className="relative group bg-slate-50/50 sm:bg-transparent p-4 sm:p-0 rounded-lg border border-slate-100 sm:border-transparent flex flex-col sm:flex-row gap-3 items-start">
              <div className="w-full sm:w-40 flex-shrink-0">
                <input
                  type="month"
                  value={toMonthInput(entry.date)}
                  onChange={(e) => updateEntry(entry.id, 'date', fromMonthInput(e.target.value))}
                  className={`${inputClass} w-full h-11 sm:h-auto`}
                />
              </div>
              <div className="flex-1 w-full relative">
                <input
                  type="text"
                  placeholder="応用情報技術者試験 合格"
                  value={entry.name}
                  onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
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
          
          {licenses.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-4 lg:py-8 border border-dashed border-slate-100 rounded-lg">
              資格情報は登録されていません。
            </p>
          )}
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
