import { create } from 'zustand'

export const useNavStore = create((set) => ({
    isNavAnimated: false,
    toggleNavAnimation: () => set((state) => ({
        isNavAnimated: !state.isNavAnimated
    })),
}))
