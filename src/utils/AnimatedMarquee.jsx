import { useEffect, useRef } from "react"
import gsap from "gsap"

const AnimatedMarquee = () => {
    const marqueeWrapperRef = useRef(null)
    const tl = useRef(null)

    const items = [
        "Backend Systems",
        "REST APIs",
        "PostgreSQL",
        "Auth & RBAC",
        "Payments",
        "Webhooks",
        "Queues & Jobs",
        "Integrations",
        "Production Fixes",
        "Docker",
    ]

    useEffect(() => {
        const wrapper = marqueeWrapperRef.current
        const content = wrapper.querySelector(".marquee-content")
        const clone = content.cloneNode(true)
        clone.classList.add("marquee-clone")
        wrapper.appendChild(clone)

        const totalWidth = content.offsetWidth

        tl.current = gsap.timeline({ repeat: -1 }).fromTo(
            wrapper,
            { x: 0 },
            {
                x: -totalWidth,
                duration: 28,
                ease: "linear",
            },
        )

        return () => {
            tl.current?.kill()
        }
    }, [])

    const handleMouseEnter = () => tl.current?.timeScale(0.35)
    const handleMouseLeave = () => tl.current?.timeScale(1)

    return (
        <div className="relative overflow-hidden w-full bg-primary border-y border-white/10 text-white h-20 md:h-28">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/15 via-transparent to-accent/15 pointer-events-none" />

            <div
                ref={marqueeWrapperRef}
                className="flex h-full whitespace-nowrap will-change-transform"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="font-boldonse flex gap-10 md:gap-14 px-4 text-3xl md:text-5xl items-center h-full marquee-content uppercase">
                    {items.map((text) => (
                        <div key={text} className="flex items-center gap-10 md:gap-14 marquee-item">
                            <span className="text-white/85 hover:text-accent transition-colors duration-300">
                                {text}
                            </span>
                            <span className="text-accent text-lg md:text-2xl">/</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AnimatedMarquee
