import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useProjectHoverStore } from '@/store'
import { GoArrowUpRight } from "react-icons/go"

const AnimatedCursor = () => {
    const cursorRef = useRef(null)
    const ringRef = useRef(null)
    const glowRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })
    const posDot = useRef({ x: 0, y: 0 })
    const posRing = useRef({ x: 0, y: 0 })

    const { isHoverOnProjects } = useProjectHoverStore()

    useGSAP(() => {
        if (!cursorRef.current || !ringRef.current || !glowRef.current) return

        mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        posDot.current = { ...mouse.current }
        posRing.current = { ...mouse.current }

        gsap.set([cursorRef.current, ringRef.current, glowRef.current], {
            xPercent: -50,
            yPercent: -50,
        })

        document.documentElement.classList.add('custom-cursor-active')

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
        }

        const animate = () => {
            const dt = 1 - Math.pow(1 - 0.35, gsap.ticker.deltaRatio())
            const ringDt = 1 - Math.pow(1 - 0.12, gsap.ticker.deltaRatio())

            posDot.current.x += (mouse.current.x - posDot.current.x) * dt
            posDot.current.y += (mouse.current.y - posDot.current.y) * dt
            posRing.current.x += (mouse.current.x - posRing.current.x) * ringDt
            posRing.current.y += (mouse.current.y - posRing.current.y) * ringDt

            gsap.set(cursorRef.current, { x: posDot.current.x, y: posDot.current.y })
            gsap.set(ringRef.current, { x: posRing.current.x, y: posRing.current.y })
            gsap.set(glowRef.current, { x: posRing.current.x, y: posRing.current.y })
        }

        const handleHover = () => {
            if (useProjectHoverStore.getState().isHoverOnProjects) return
            gsap.to(cursorRef.current, {
                scale: 0.35,
                backgroundColor: '#ffffff',
                duration: 0.35,
                ease: 'power2.out',
            })
            gsap.to(ringRef.current, {
                scale: 2.2,
                borderColor: 'rgba(141, 86, 204, 0.9)',
                backgroundColor: 'rgba(141, 86, 204, 0.12)',
                rotate: 45,
                duration: 0.4,
                ease: 'power2.out',
            })
            gsap.to(glowRef.current, {
                scale: 2.6,
                opacity: 0.55,
                duration: 0.4,
            })
        }

        const handleUnhover = () => {
            if (useProjectHoverStore.getState().isHoverOnProjects) return
            gsap.to(cursorRef.current, {
                scale: 1,
                backgroundColor: '#8d56cc',
                duration: 0.35,
                ease: 'power2.out',
            })
            gsap.to(ringRef.current, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.55)',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                rotate: 0,
                duration: 0.4,
                ease: 'power2.out',
            })
            gsap.to(glowRef.current, {
                scale: 1,
                opacity: 0.25,
                duration: 0.4,
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        gsap.ticker.add(animate)

        const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleHover)
            el.addEventListener('mouseleave', handleUnhover)
        })

        return () => {
            document.documentElement.classList.remove('custom-cursor-active')
            gsap.ticker.remove(animate)
            window.removeEventListener('mousemove', onMouseMove)
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHover)
                el.removeEventListener('mouseleave', handleUnhover)
            })
        }
    }, [])

    useGSAP(() => {
        if (!cursorRef.current || !ringRef.current || !glowRef.current) return

        if (isHoverOnProjects) {
            gsap.to(cursorRef.current, {
                width: 56,
                height: 56,
                borderRadius: 999,
                backgroundColor: 'rgba(141, 86, 204, 0.92)',
                duration: 0.35,
            })
            gsap.to(ringRef.current, { opacity: 0, scale: 0.5, duration: 0.3 })
            gsap.to(glowRef.current, { opacity: 0.6, scale: 2.2, duration: 0.35 })
        } else {
            gsap.to(cursorRef.current, {
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: '#8d56cc',
                duration: 0.35,
            })
            gsap.to(ringRef.current, {
                opacity: 1,
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.55)',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                rotate: 0,
                duration: 0.35,
            })
            gsap.to(glowRef.current, { opacity: 0.25, scale: 1, duration: 0.35 })
        }
    }, [isHoverOnProjects])

    return (
        <>
            <div
                ref={glowRef}
                className="fixed pointer-events-none z-[9997] size-16 rounded-full bg-accent/40 blur-xl opacity-25"
            />
            <div
                ref={ringRef}
                className="fixed pointer-events-none z-[9998] size-10 rounded-[4px] border border-white/55"
            />
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] size-2 rounded-full bg-accent shadow-[0_0_12px_rgba(141,86,204,0.9)] flex items-center justify-center overflow-hidden"
            >
                {isHoverOnProjects && (
                    <GoArrowUpRight className="text-white text-xl shrink-0" />
                )}
            </div>
        </>
    )
}

export default AnimatedCursor
