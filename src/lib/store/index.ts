import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ResumeSlice, createResumeSlice } from './resumeSlice';
import { CVSlice, createCVSlice } from './cvSlice';

interface RootState extends ResumeSlice, CVSlice {
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useResumeStore = create<RootState>()(
  persist(
    (set, get, api) => ({
      ...createResumeSlice(set, get, api),
      ...createCVSlice(set, get, api),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
