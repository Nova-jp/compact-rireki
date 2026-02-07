'use client';

import { Trash2, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { CVWorkHistoryEntry } from '@/types/resume';
import { CVProjectItem } from './CVProjectItem';
import clsx from 'clsx';

interface CVCompanyItemProps {
  entry: CVWorkHistoryEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  onAddProject: () => void;
  onUpdateProject: (projectId: string, field: string, value: string) => void;
  onRemoveProject: (projectId: string) => void;
}

const inputClass = "px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
const labelClass = "block text-xs font-bold text-slate-500 mb-1";

export function CVCompanyItem({
  entry,
  index,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  onAddProject,
  onUpdateProject,
  onRemoveProject
}: CVCompanyItemProps) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all">
      {/* Header */}
      <div 
        className={clsx(
          "px-5 py-4 flex items-center justify-between cursor-pointer transition-colors",
          isExpanded ? "bg-slate-50 border-b border-slate-200" : "hover:bg-slate-50"
        )}
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
            {index + 1}
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{entry.company || '名称未設定の会社'}</h4>
            <p className="text-xs text-slate-500">{entry.periodStart || '----'} 〜 {entry.periodEnd || '----'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>会社名</label>
              <input
                type="text"
                placeholder="株式会社〇〇"
                value={entry.company}
                onChange={(e) => onUpdate('company', e.target.value)}
                className={`${inputClass} w-full font-bold`}
              />
            </div>
            <div>
              <label className={labelClass}>期間 (開始)</label>
              <input
                type="text"
                placeholder="2020年4月"
                value={entry.periodStart}
                onChange={(e) => onUpdate('periodStart', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className={labelClass}>期間 (終了)</label>
              <input
                type="text"
                placeholder="現在 / 2023年3月"
                value={entry.periodEnd}
                onChange={(e) => onUpdate('periodEnd', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>事業内容</label>
              <input
                type="text"
                placeholder="ITソリューションの提供、システム受託開発"
                value={entry.businessContent || ''}
                onChange={(e) => onUpdate('businessContent', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className={labelClass}>資本金</label>
              <input
                type="text"
                placeholder="1,000万円"
                value={entry.capital || ''}
                onChange={(e) => onUpdate('capital', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className={labelClass}>売上高</label>
              <input
                type="text"
                placeholder="50億円"
                value={entry.revenue || ''}
                onChange={(e) => onUpdate('revenue', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className={labelClass}>従業員数</label>
              <input
                type="text"
                placeholder="100名"
                value={entry.employees || ''}
                onChange={(e) => onUpdate('employees', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className={labelClass}>役職</label>
              <input
                type="text"
                placeholder="プロジェクトマネージャー"
                value={entry.position}
                onChange={(e) => onUpdate('position', e.target.value)}
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className={labelClass}>雇用形態</label>
              <select
                value={entry.employmentType}
                onChange={(e) => onUpdate('employmentType', e.target.value)}
                className={`${inputClass} w-full`}
              >
                <option value="正社員">正社員</option>
                <option value="契約社員">契約社員</option>
                <option value="派遣社員">派遣社員</option>
                <option value="業務委託">業務委託</option>
                <option value="アルバイト・パート">アルバイト・パート</option>
              </select>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
                業務詳細・プロジェクト
              </h5>
              <button
                onClick={onAddProject}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> プロジェクトを追加
              </button>
            </div>

            <div className="space-y-4">
              {entry.projects.map((project) => (
                <CVProjectItem
                  key={project.id}
                  project={project}
                  onUpdate={(field, value) => onUpdateProject(project.id, field, value)}
                  onRemove={() => onRemoveProject(project.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
