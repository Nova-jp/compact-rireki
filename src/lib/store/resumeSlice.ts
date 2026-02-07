import { StateCreator } from 'zustand';
import { ResumeData, PersonalInfo, EducationEntry, ExperienceEntry, LicenseEntry } from '@/types/resume';

export interface ResumeSlice {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateEducation: (entries: EducationEntry[]) => void;
  updateExperience: (entries: ExperienceEntry[]) => void;
  updateLicenses: (entries: LicenseEntry[]) => void;
  updateField: (field: keyof ResumeData, value: string) => void;
}

const today = new Date();
const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

const initialData: ResumeData = {
  submissionDate: dateStr,
  personalInfo: {
    name: '',
    kana: '',
    birthday: '',
    age: '',
    gender: '',
    postalCode: '',
    address: '',
    addressKana: '',
    phone: '',
    mobile: '',
    email: '',
    photo: '',
    altPostalCode: '',
    altAddress: '',
    altAddressKana: '',
    altPhone: '',
  },
  education: [],
  experience: [],
  licenses: [],
  motivation: '',
  selfPromotion: '',
  commuteTime: '',
  dependents: '',
  spouse: '',
  spouseSupport: '',
  requests: '',
};

export const createResumeSlice: StateCreator<ResumeSlice> = (set) => ({
  data: initialData,
  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),
  updateEducation: (entries) =>
    set((state) => ({
      data: { ...state.data, education: entries },
    })),
  updateExperience: (entries) =>
    set((state) => ({
      data: { ...state.data, experience: entries },
    })),
  updateLicenses: (entries) =>
    set((state) => ({
      data: { ...state.data, licenses: entries },
    })),
  updateField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
});
