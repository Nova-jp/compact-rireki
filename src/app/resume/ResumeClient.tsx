'use client';

import { useCallback } from 'react';
import { useResumeStore } from '@/lib/store';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { EducationForm } from '@/components/forms/resume/EducationForm';
import { WorkHistoryForm } from '@/components/forms/resume/WorkHistoryForm';
import { LicenseForm } from '@/components/forms/resume/LicenseForm';
import { PRForm } from '@/components/forms/resume/PRForm';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { DocumentEditorLayout } from '@/components/DocumentEditorLayout';
import { User, GraduationCap, Briefcase, Award } from 'lucide-react';

const tabs = [
  { id: 'personal', label: '基本情報', icon: User },
  { id: 'history', label: '学歴・職歴', icon: GraduationCap },
  { id: 'licenses', label: '資格', icon: Award },
  { id: 'pr', label: '自己PR', icon: Briefcase },
];

export default function ResumeClient() {
  const { data, hasHydrated } = useResumeStore();

  const buildPdfBody = useCallback((sid: string) => ({
    name: data.personalInfo.name || 'resume',
    sessionId: sid,
    data,
  }), [data]);

  return (
    <DocumentEditorLayout
      tabs={tabs}
      renderTabContent={(activeTab) => (
        <>
          {activeTab === 'personal' && <PersonalInfoForm />}
          {activeTab === 'history' && <><EducationForm /><WorkHistoryForm /></>}
          {activeTab === 'licenses' && <LicenseForm />}
          {activeTab === 'pr' && <PRForm />}
        </>
      )}
      PreviewComponent={ResumePreview}
      headerTitle="かんたん履歴書"
      checkoutEmail={data.personalInfo.email}
      checkoutType="resume"
      buildPdfBody={buildPdfBody}
      downloadFilename={`履歴書_${data.personalInfo.name || 'unsigned'}.pdf`}
      redirectPath="/resume"
      hasHydrated={hasHydrated}
    />
  );
}
