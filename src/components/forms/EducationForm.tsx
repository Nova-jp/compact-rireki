'use client';

import { useResumeStore } from '@/lib/store';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function EducationForm() {
  const { data, updateEducation } = useResumeStore();
  const education = data.education;

  const addEntry = () => {
    updateEducation([
      ...education,
      { id: uuidv4(), year: '', month: '', content: '' }
    ]);
  };

  const removeEntry = (id: string) => {
    updateEducation(education.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: 'year' | 'month' | 'content', value: string) => {
    updateEducation(
      education.map(e => e.id === id ? { ...e, [field]: value } : e)
    );
  };

  const inputClass = "px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">学歴</h3>
          <p className="text-xs text-slate-500">
            古い順（中学校卒業、または高校入学から）記入するのが一般的です。
          </p>
        </div>

        <div className="space-y-3">
          {education.map((entry) => (
            <div key={entry.id} className="flex gap-2 items-start group">
              <div className="w-20 flex-shrink-0">
                <input
                  type="text"
                  placeholder="年"
                  value={entry.year}
                  onChange={(e) => updateEntry(entry.id, 'year', e.target.value)}
                  className={`${inputClass} w-full text-center`}
                />
              </div>
              <div className="w-16 flex-shrink-0">
                <input
                  type="text"
                  placeholder="月"
                  value={entry.month}
                  onChange={(e) => updateEntry(entry.id, 'month', e.target.value)}
                  className={`${inputClass} w-full text-center`}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="学校名、学部・学科、卒業・入学など"
                  value={entry.content}
                  onChange={(e) => updateEntry(entry.id, 'content', e.target.value)}
                  className={`${inputClass} w-full`}
                />
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addEntry}
          className="mt-4 w-full py-2 flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-lg text-sm font-bold text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all"
        >
          <Plus className="w-4 h-4" /> 学歴を追加
        </button>
      </div>
    </div>
  );
}
