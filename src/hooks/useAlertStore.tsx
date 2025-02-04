import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AlertState {
  isOpen: boolean;
  toggleAlert: () => void;
}

export const useAlertStore = create<AlertState>()(
  persist(
    (set) => ({
      isOpen: true,
      toggleAlert: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "alert-storage", // LocalStorage key
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
