import { useState, useRef, useEffect } from 'react'
import { Element } from 'react-scroll'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from '@/utils/AnimatedText'
import Load from '@/layout/Load'
import { FiArrowDownRight } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const Months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const Hero = () => {
    const [onLoadComplete, setOnLoadComplete] = useState(false)
    const pinRef = useRef(null)
    const stageRef = useRef(null)
    const portraitRef = useRef(null)
    const portraitImgRef = useRef(null)
    const nameRef = useRef(null)
    const contentRef = useRef(null)
    const veilRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })

    useGSAP(() => {
        if (!onLoadComplete || !pinRef.current) return

        const intro = gsap.timeline()
        gsap.set(portraitRef.current, { clipPath: "inset(42% 38% 42% 38%)" })
        gsap.set(contentRef.current?.children || [], { opacity: 0, y: 36 })

        intro
            .from(nameRef.current, {
                y: 80,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
            })
            .to(portraitRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.35,
                ease: "power3.inOut",
            }, "-=0.7")
            .to(contentRef.current?.children || [], {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.55")

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: pinRef.current,
                start: "top top",
                end: "+=140%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        })

        scrollTl
            .to(portraitImgRef.current, {
                scale: 1.25,
                ease: "none",
            }, 0)
            .to(veilRef.current, {
                opacity: 0.55,
                ease: "none",
            }, 0)
            .to(nameRef.current, {
                y: -120,
                opacity: 0.15,
                scale: 0.92,
                ease: "none",
            }, 0)
            .to(contentRef.current, {
                y: 80,
                opacity: 0,
                ease: "none",
            }, 0)

        return () => {
            scrollTl.scrollTrigger?.kill()
            scrollTl.kill()
            intro.kill()
        }
    }, { dependencies: [onLoadComplete], scope: stageRef })

    useEffect(() => {
        if (!onLoadComplete) return
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        if (!canHover || !portraitImgRef.current) return

        const onMove = (e) => {
            const { innerWidth, innerHeight } = window
            mouse.current.x = (e.clientX / innerWidth - 0.5) * 2
            mouse.current.y = (e.clientY / innerHeight - 0.5) * 2
            gsap.to(portraitImgRef.current, {
                x: mouse.current.x * 18,
                y: mouse.current.y * 12,
                duration: 1.1,
                ease: "power3.out",
            })
            gsap.to(nameRef.current, {
                x: mouse.current.x * -10,
                duration: 1.2,
                ease: "power3.out",
            })
        }

        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [onLoadComplete])

    const date = `${Months[new Date().getMonth()]}' ${new Date().getDate()}`

    return (
        <Element name="Home">
            <div ref={pinRef} className="relative w-full">
                <section
                    id="hero"
                    ref={stageRef}
                    className="relative h-dvh w-full max-w-[100vw] overflow-hidden bg-primary"
                >
                    <Load setOnLoadComplete={setOnLoadComplete} />

                    {onLoadComplete && (
                        <>
                            {/* cinematic portrait layer */}
                            <div
                                ref={portraitRef}
                                className="absolute inset-0 z-0 overflow-hidden"
                                style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                            >
                                <img
                                    ref={portraitImgRef}
                                    src="/hero/hero-dark.png"
                                    alt="Portrait of Hassaam"
                                    className="h-full w-full object-cover object-[center_20%] scale-110 will-change-transform opacity-70 lg:opacity-80"
                                />
                                <div
                                    ref={veilRef}
                                    className="absolute inset-0 bg-primary/40 opacity-20 pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-primary/50 pointer-events-none" />
                            </div>

                            {/* giant brand name */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
                                <h1
                                    ref={nameRef}
                                    data-cursor-hover
                                    className="pointer-events-auto font-boldonse uppercase text-white text-center text-[13vw] sm:text-[11vw] md:text-[9.5vw] leading-[0.85] mix-blend-difference will-change-transform"
                                >
                                    <AnimatedText
                                        revert
                                        text="Hassaammgl"
                                        hoverClass="hover:text-accent transition-colors duration-500"
                                    />
                                </h1>
                            </div>

                            {/* immersive HUD / content */}
                            <div
                                ref={contentRef}
                                className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 md:px-10 pb-8 md:pb-12 pt-24"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-t border-white/15 pt-6 md:pt-8">
                                    <div className="max-w-md">
                                        <FiArrowDownRight className="text-white text-2xl md:text-3xl mb-3" />
                                        <p className="font-Audiowide text-sm sm:text-base md:text-xl leading-relaxed text-white/80 mb-5">
                                            I help growing brands and startups gain an unfair advantage
                                            through premium, results driven websites.
                                        </p>
                                        <a href="tel:+923268821210" data-cursor-hover>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-6 py-3 md:px-8 md:py-3.5 bg-stone-800 text-white rounded-full hover:bg-accent transition-colors text-sm"
                                            >
                                                BOOK A CALL
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </a>
                                    </div>

                                    <div className="lg:text-right">
                                        <p className="font-syne-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-1">
                                            Available for work
                                        </p>
                                        <p className="font-boldonse text-3xl sm:text-4xl md:text-5xl text-white">
                                            {date}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-4">
                                    <p className="font-syne-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
                                        Scroll to explore
                                    </p>
                                    <div className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                    <span className="font-syne-mono text-[10px] tracking-[0.2em] uppercase text-accent">
                                        Immersive
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </Element>
    )
}

export default Hero
