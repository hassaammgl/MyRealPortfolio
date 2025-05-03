import { create } from 'zustand'

export const useProjectHoverStore = create((set) => ({
    isHoverOnProjects: false,
    setIsHoverOnProjects: (value) =>
        set(() => ({
            isHoverOnProjects: value,
        })),
}))
