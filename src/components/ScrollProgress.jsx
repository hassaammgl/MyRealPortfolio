import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollProgress = () => {
    const barRef = useRef(null)

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover)').matches
        if (!canHover) return

        const st = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                gsap.set(barRef.current, { scaleY: self.progress })
            },
        })

        return () => st.kill()
    }, [])

    return (
        <div
            className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[45] hidden md:flex flex-col items-center gap-3 pointer-events-none"
            aria-hidden
        >
            <span className="font-syne-mono text-[9px] tracking-[0.2em] uppercase text-white/35 rotate-90 origin-center mb-6">
                scroll
            </span>
            <div className="h-28 w-px bg-white/15 relative overflow-hidden">
                <div
                    ref={barRef}
                    className="absolute left-0 top-0 w-full h-full bg-accent origin-top"
                    style={{ transform: "scaleY(0)" }}
                />
            </div>
        </div>
    )
}

export default ScrollProgress
