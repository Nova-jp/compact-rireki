'use client';

import { useCallback } from 'react';
import { useResumeStore } from '@/lib/store';
import { CVPersonalInfoForm } from '@/components/forms/cv/CVPersonalInfoForm';
import { CVSummaryForm } from '@/components/forms/cv/CVSummaryForm';
import { CVWorkHistoryForm } from '@/components/forms/cv/CVWorkHistoryForm';
import { CVSkillsForm } from '@/components/forms/cv/CVSkillsForm';
import { CVLicensesForm } from '@/components/forms/cv/CVLicensesForm';
import { CVSelfPRForm } from '@/components/forms/cv/CVSelfPRForm';
import { CVPreview } from '@/components/preview/CVPreview';
import { DocumentEditorLayout } from '@/components/DocumentEditorLayout';
import { User, Briefcase, Award, FileText } from 'lucide-react';

const tabs = [
  { id: 'personal', label: '基本情報', icon: User },
  { id: 'summary', label: '要約', icon: FileText },
  { id: 'work-history', label: '詳細職歴', icon: Briefcase },
  { id: 'licenses', label: '資格', icon: Award },
  { id: 'skills', label: 'スキル', icon: Award },
  { id: 'self-pr', label: '自己PR', icon: User },
];

export default function CVClient() {
  const { data, cvData, hasHydrated } = useResumeStore();

  const buildPdfBody = useCallback((sid: string) => ({
    name: data.personalInfo.name || 'cv',
    sessionId: sid,
    cvData,
    personalInfo: data.personalInfo,
  }), [data.personalInfo, cvData]);

  return (
    <DocumentEditorLayout
      tabs={tabs}
      renderTabContent={(activeTab) => (
        <>
          {activeTab === 'personal' && <CVPersonalInfoForm />}
          {activeTab === 'summary' && <CVSummaryForm />}
          {activeTab === 'work-history' && <CVWorkHistoryForm />}
          {activeTab === 'licenses' && <CVLicensesForm />}
          {activeTab === 'skills' && <CVSkillsForm />}
          {activeTab === 'self-pr' && <CVSelfPRForm />}
        </>
      )}
      PreviewComponent={CVPreview}
      headerTitle={
        <>
          <span className="hidden sm:inline">かんたん履歴書 </span>
          <span className="text-slate-500 sm:text-slate-400 font-medium sm:font-normal">職務経歴書</span>
        </>
      }
      checkoutEmail={data.personalInfo.email}
      checkoutType="cv"
      buildPdfBody={buildPdfBody}
      downloadFilename={`職務経歴書_${data.personalInfo.name || 'unsigned'}.pdf`}
      redirectPath="/cv"
      hasHydrated={hasHydrated}
    />
  );
}
