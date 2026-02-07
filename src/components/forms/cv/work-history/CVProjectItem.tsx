'use client';

import { Trash2 } from 'lucide-react';
import { CVProject } from '@/types/resume';

interface CVProjectItemProps {
  project: CVProject;
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
}

const inputClass = "px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
const labelClass = "block text-xs font-bold text-slate-500 mb-1";

export function CVProjectItem({ project, onUpdate, onRemove }: CVProjectItemProps) {
  return (
    <div className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 relative group">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <label className={labelClass}>期間</label>
          <input
            type="text"
            placeholder="2021/04 - 2022/03"
            value={project.period}
            onChange={(e) => onUpdate('period', e.target.value)}
            className={`${inputClass} w-full text-xs`}
          />
        </div>
        <div className="col-span-9">
          <label className={labelClass}>プロジェクト名・業務名</label>
          <input
            type="text"
            placeholder="基幹システムのリプレイスプロジェクト"
            value={project.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className={`${inputClass} w-full text-xs font-bold`}
          />
        </div>
        <div className="col-span-12">
          <label className={labelClass}>具体的な業務内容</label>
          <textarea
            placeholder="・要件定義から基本設計までを担当&#13;&#10;・チームリーダーとして5名のマネジメント"
            value={project.content}
            onChange={(e) => onUpdate('content', e.target.value)}
            className={`${inputClass} w-full h-24 text-xs resize-none`}
          />
        </div>
        
        <div className="col-span-3">
          <label className={labelClass}>チーム人数・規模</label>
          <input
            type="text"
            placeholder="10名 (リーダー)"
            value={project.teamSize || ''}
            onChange={(e) => onUpdate('teamSize', e.target.value)}
            className={`${inputClass} w-full text-xs`}
          />
        </div>
        <div className="col-span-3">
          <label className={labelClass}>役割</label>
          <input
            type="text"
            placeholder="PL / PM"
            value={project.role}
            onChange={(e) => onUpdate('role', e.target.value)}
            className={`${inputClass} w-full text-xs`}
          />
        </div>
        <div className="col-span-6">
          <label className={labelClass}>開発環境 (言語・OS・ツール)</label>
          <input
            type="text"
            placeholder="Java, Spring Boot, AWS (EC2, RDS)"
            value={project.environment || ''}
            onChange={(e) => onUpdate('environment', e.target.value)}
            className={`${inputClass} w-full text-xs`}
          />
        </div>

        <div className="col-span-12">
          <label className={labelClass}>実績・成果</label>
          <textarea
            placeholder="納期を1ヶ月短縮、XX賞を受賞"
            value={project.performance}
            onChange={(e) => onUpdate('performance', e.target.value)}
            className={`${inputClass} w-full h-12 text-xs resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
