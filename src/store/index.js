import { create } from 'zustand'

export const useProjectHoverStore = create((set) => ({
    isHoverOnProjects: false,
    projectLink: "",
    setIsHoverOnProjects: (value) =>
        set(() => ({
            isHoverOnProjects: value,
        })),
    setProjectLink: (value) => set(() => ({
        projectLink: value
    }))
}))
