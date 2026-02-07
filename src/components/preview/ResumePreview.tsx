'use client';

import { useResumeStore } from '@/lib/store';
import { ResumePreviewContent } from '@/components/preview/ResumePreviewContent';

export function ResumePreview() {
  const { data } = useResumeStore();
  return <ResumePreviewContent data={data} />;
}