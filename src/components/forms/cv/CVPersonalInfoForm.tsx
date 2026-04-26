'use client';

import { useResumeStore } from '@/lib/store';
import { Calendar, User } from 'lucide-react';

export function CVPersonalInfoForm() {
  const { data, cvData, updatePersonalInfo, updateCVDate } = useResumeStore();
  const info = data.personalInfo;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split('-');
    updateCVDate(`${y}年${parseInt(m)}月${parseInt(d)}日`);
  };

  const getDateValue = () => {
    const match = cvData.submissionDate.match(/(\d+)年(\d+)月(\d+)日/);
    if (match) {
      return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
    }
    return '';
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 ease-in-out";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2";
  const sectionClass = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6";

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className={sectionClass}>
        <div>
          <label className={labelClass}><Calendar className="w-4 h-4 text-blue-500" />提出日</label>
          <input
            type="date"
            value={getDateValue()}
            onChange={handleDateChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />氏名
        </h3>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>ふりがな</label>
            <input
              type="text"
              name="kana"
              value={info.kana}
              onChange={handleNameChange}
              placeholder="やまだ たろう"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>氏名</label>
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={handleNameChange}
              placeholder="山田 太郎"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
