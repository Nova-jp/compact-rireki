'use client';

import { useResumeStore } from '@/lib/store';
import { Plus, Briefcase } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { CVCompanyItem } from './work-history/CVCompanyItem';

export function CVWorkHistoryForm() {
  const { cvData, updateCVWorkHistory } = useResumeStore();
  const history = cvData.workHistory;
  const [expandedEntries, setExpandedEntries] = useState<string[]>(history.map(e => e.id));

  const toggleExpand = (id: string) => {
    setExpandedEntries(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addEntry = () => {
    const newId = uuidv4();
    updateCVWorkHistory([
      ...history,
      { 
        id: newId, 
        periodStart: '', 
        periodEnd: '', 
        company: '', 
        businessContent: '',
        capital: '',
        revenue: '',
        employees: '',
        position: '', 
        employmentType: '正社員', 
        projects: [
          { id: uuidv4(), period: '', name: '', content: '', role: '', teamSize: '', environment: '', performance: '' }
        ] 
      }
    ]);
    setExpandedEntries(prev => [...prev, newId]);
  };

  const removeEntry = (id: string) => {
    if (confirm('この職歴を削除してもよろしいですか？')) {
      updateCVWorkHistory(history.filter(e => e.id !== id));
    }
  };

  const updateEntry = (id: string, field: string, value: any) => {
    updateCVWorkHistory(
      history.map(e => e.id === id ? { ...e, [field]: value } : e)
    );
  };

  const addProject = (entryId: string) => {
    const entry = history.find(e => e.id === entryId);
    if (!entry) return;
    
    updateEntry(entryId, 'projects', [
      ...entry.projects,
      { id: uuidv4(), period: '', name: '', content: '', role: '', teamSize: '', environment: '', performance: '' }
    ]);
  };

  const removeProject = (entryId: string, projectId: string) => {
    const entry = history.find(e => e.id === entryId);
    if (!entry) return;
    
    updateEntry(entryId, 'projects', entry.projects.filter(p => p.id !== projectId));
  };

  const updateProject = (entryId: string, projectId: string, field: string, value: string) => {
    const entry = history.find(e => e.id === entryId);
    if (!entry) return;
    
    updateEntry(entryId, 'projects', 
      entry.projects.map(p => p.id === projectId ? { ...p, [field]: value } : p)
    );
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">職務経歴詳細</h3>
            <p className="text-xs text-slate-500 mt-1">
              会社ごとの経歴と、具体的なプロジェクト・業務内容を記入します。
            </p>
          </div>
          <button
            onClick={addEntry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95"
          >
            <Plus className="w-4 h-4" /> 職歴を追加
          </button>
        </div>

        <div className="space-y-8">
          {history.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
              <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">職歴が登録されていません。「職歴を追加」ボタンから入力を開始してください。</p>
            </div>
          )}

          {history.map((entry, index) => (
            <CVCompanyItem
              key={entry.id}
              entry={entry}
              index={index}
              isExpanded={expandedEntries.includes(entry.id)}
              onToggle={() => toggleExpand(entry.id)}
              onUpdate={(field, value) => updateEntry(entry.id, field, value)}
              onRemove={() => removeEntry(entry.id)}
              onAddProject={() => addProject(entry.id)}
              onUpdateProject={(projectId, field, value) => updateProject(entry.id, projectId, field, value)}
              onRemoveProject={(projectId) => removeProject(entry.id, projectId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}