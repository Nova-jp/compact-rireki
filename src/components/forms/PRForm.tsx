'use client';

import { useResumeStore } from '@/lib/store';

export function PRForm() {
  const { data, updateField } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateField(name as any, value);
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";
  const sectionClass = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6";

  return (
    <div className="space-y-8 pb-20">
      <div className={sectionClass}>
        <div>
          <label className={labelClass}>志望の動機、自己PRなど</label>
          <textarea
            name="motivation"
            value={data.motivation}
            onChange={handleChange}
            placeholder="これまでの経験をどのように貴社で活かせるか、応募の動機を記入してください。"
            className={`${inputClass} min-h-[200px] resize-y`}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">その他</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>通勤時間</label>
            <input
              type="text"
              name="commuteTime"
              value={data.commuteTime}
              onChange={handleChange}
              placeholder="約 45 分"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>扶養家族数（配偶者を除く）</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="dependents"
                value={data.dependents}
                onChange={handleChange}
                placeholder="0"
                className={`${inputClass} text-center`}
              />
              <span className="text-slate-500 text-sm">人</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>配偶者</label>
            <select name="spouse" value={data.spouse} onChange={handleChange} className={inputClass}>
              <option value="無">無</option>
              <option value="有">有</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>配偶者の扶養義務</label>
            <select name="spouseSupport" value={data.spouseSupport} onChange={handleChange} className={inputClass}>
              <option value="無">無</option>
              <option value="有">有</option>
            </select>
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <div>
          <label className={labelClass}>本人希望記入欄</label>
          <p className="text-xs text-slate-500 mb-3">
            特に給料・職種・勤務時間・勤務地その他に対して希望があれば記入してください。
          </p>
          <textarea
            name="requests"
            value={data.requests}
            onChange={handleChange}
            placeholder="勤務地：東京都内を希望します。&#10;勤務時間：貴社規定に従います。"
            className={`${inputClass} min-h-[120px] resize-y`}
          />
        </div>
      </div>
    </div>
  );
}
