import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create<any>()(
  persist(
    (set) => ({
      onboarded: false,
      toggleOnboarding: () => set((state) => ({ onboarded: !state.onboarded })),
      profileData: [],
      setProfileData: (data: any) => set({ profileData: data }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
