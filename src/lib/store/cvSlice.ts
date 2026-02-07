import { StateCreator } from 'zustand';
import { CVData, CVWorkHistoryEntry, CVLicenseEntry } from '@/types/resume';

export interface CVSlice {
  cvData: CVData;
  updateCVSummary: (summary: string) => void;
  updateCVWorkHistory: (entries: CVWorkHistoryEntry[]) => void;
  updateCVSkills: (skills: string) => void;
  updateCVLicenses: (entries: CVLicenseEntry[]) => void;
  updateCVSelfPromotion: (selfPromotion: string) => void;
  updateCVDate: (date: string) => void;
}

const today = new Date();
const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

const initialCVData: CVData = {
  submissionDate: dateStr,
  summary: '',
  workHistory: [],
  skills: '',
  licenses: [],
  selfPromotion: '',
};

export const createCVSlice: StateCreator<CVSlice> = (set) => ({
  cvData: initialCVData,
  updateCVSummary: (summary) =>
    set((state) => ({
      cvData: { ...state.cvData, summary },
    })),
  updateCVWorkHistory: (entries) =>
    set((state) => ({
      cvData: { ...state.cvData, workHistory: entries },
    })),
  updateCVSkills: (skills) =>
    set((state) => ({
      cvData: { ...state.cvData, skills },
    })),
  updateCVLicenses: (entries) =>
    set((state) => ({
      cvData: { ...state.cvData, licenses: entries },
    })),
  updateCVSelfPromotion: (selfPromotion) =>
    set((state) => ({
      cvData: { ...state.cvData, selfPromotion },
    })),
  updateCVDate: (date) =>
    set((state) => ({
      cvData: { ...state.cvData, submissionDate: date },
    })),
});
