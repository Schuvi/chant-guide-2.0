import { create } from "zustand";

type TabType = 'line' | 'word' | null;

interface NavState {
    currentNav: TabType;
    setCurrentNav: (tab: TabType) => void;
    resetNav: () => void;
}

export const useNavStore = create<NavState>((set) => ({
    currentNav: null,
    setCurrentNav: (tab) => set({currentNav: tab}),
    resetNav: () => set(() => ({
        currentNav: null,
    }))
}))