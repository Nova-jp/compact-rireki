'use client';

import { useResumeStore } from '@/lib/store';
import { CVPreviewContent } from '@/components/preview/CVPreviewContent';

export function CVPreview() {
  const { data, cvData } = useResumeStore();
  return <CVPreviewContent data={cvData} personalInfo={data.personalInfo} />;
}
