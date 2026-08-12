import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useProjectHoverStore } from '@/store'
import { GoArrowUpRight } from "react-icons/go"

const AnimatedCursor = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const mouse = useRef({ x: -100, y: -100 })
    const pos = useRef({ x: -100, y: -100 })
    const ringPos = useRef({ x: -100, y: -100 })

    const { isHoverOnProjects } = useProjectHoverStore()

    useGSAP(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        // Touch / coarse pointer: keep native cursor
        if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
            return
        }

        document.documentElement.classList.add('custom-cursor-active')

        gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

        const onMove = (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
        }

        const tick = () => {
            const d = 1 - Math.pow(1 - 0.45, gsap.ticker.deltaRatio())
            const r = 1 - Math.pow(1 - 0.18, gsap.ticker.deltaRatio())

            pos.current.x += (mouse.current.x - pos.current.x) * d
            pos.current.y += (mouse.current.y - pos.current.y) * d
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * r
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * r

            gsap.set(dot, { x: pos.current.x, y: pos.current.y })
            gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y })
        }

        const isInteractive = (el) =>
            !!el?.closest?.('a, button, [data-cursor-hover], input, textarea, summary')

        const onOver = (e) => {
            if (useProjectHoverStore.getState().isHoverOnProjects) return
            if (!isInteractive(e.target)) return
            gsap.to(dot, { scale: 0.4, duration: 0.25, ease: 'power2.out' })
            gsap.to(ring, {
                scale: 2.4,
                opacity: 1,
                borderColor: 'rgba(141, 86, 204, 1)',
                backgroundColor: 'rgba(141, 86, 204, 0.15)',
                duration: 0.3,
                ease: 'power2.out',
            })
        }

        const onOut = (e) => {
            if (useProjectHoverStore.getState().isHoverOnProjects) return
            if (!isInteractive(e.target)) return
            // Don't reset if moving between interactive children
            if (isInteractive(e.relatedTarget)) return
            gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' })
            gsap.to(ring, {
                scale: 1,
                opacity: 0.85,
                borderColor: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                duration: 0.3,
                ease: 'power2.out',
            })
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        document.addEventListener('mouseover', onOver)
        document.addEventListener('mouseout', onOut)
        gsap.ticker.add(tick)

        return () => {
            document.documentElement.classList.remove('custom-cursor-active')
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            document.removeEventListener('mouseout', onOut)
            gsap.ticker.remove(tick)
        }
    }, [])

    useGSAP(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        if (isHoverOnProjects) {
            gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 })
            gsap.to(ring, {
                scale: 3.2,
                opacity: 1,
                borderColor: 'rgba(141, 86, 204, 0.9)',
                backgroundColor: 'rgba(141, 86, 204, 0.9)',
                duration: 0.3,
                ease: 'power2.out',
            })
        } else {
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 })
            gsap.to(ring, {
                scale: 1,
                opacity: 0.85,
                borderColor: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }, [isHoverOnProjects])

    return (
        <div className="cursor-root hidden md:block" aria-hidden>
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none size-9 rounded-full border border-white/70 mix-blend-difference flex items-center justify-center"
            >
                {isHoverOnProjects && (
                    <GoArrowUpRight className="text-white text-base mix-blend-normal" />
                )}
            </div>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none size-1.5 rounded-full bg-white mix-blend-difference"
            />
        </div>
    )
}

export default AnimatedCursor
