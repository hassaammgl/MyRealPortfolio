import { create } from 'zustand'

export const useProjectHoverStore = create((set) => ({
    isHoverOnProjects: false,
    setIsHoverOnProjects: (value) => {
        set(() => ({
            isHoverOnProjects: value,
        }))
    },
}))



export const useAnimationStore = create((set) => ({
    animationName: 'idle',
    setAnimationName: (name) => set({ animationName: name }),
}));
