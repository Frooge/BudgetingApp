import { create } from 'zustand';

interface FABStore {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useFABStore = create<FABStore>((set) => ({
  isVisible: false,
  setVisible: (visible: boolean) => set({ isVisible: visible }),
}));
