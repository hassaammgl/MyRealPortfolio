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
    const stageRef = useRef(null)
    const portraitRef = useRef(null)
    const portraitImgRef = useRef(null)
    const nameRef = useRef(null)
    const contentRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })

    useGSAP(() => {
        if (!onLoadComplete || !stageRef.current) return

        gsap.set(portraitRef.current, { clipPath: "inset(42% 38% 42% 38%)" })
        gsap.set(contentRef.current?.children || [], { opacity: 0, y: 36 })

        const intro = gsap.timeline()
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

        // Light parallax only — no pin, no fade-out mess
        const parallax = gsap.to(portraitImgRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
                trigger: stageRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })

        const nameParallax = gsap.to(nameRef.current, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
                trigger: stageRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })

        return () => {
            intro.kill()
            parallax.scrollTrigger?.kill()
            parallax.kill()
            nameParallax.scrollTrigger?.kill()
            nameParallax.kill()
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
                x: mouse.current.x * 14,
                duration: 1.1,
                ease: "power3.out",
                overwrite: "auto",
            })
            gsap.to(nameRef.current, {
                x: mouse.current.x * -8,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
            })
        }

        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [onLoadComplete])

    const date = `${Months[new Date().getMonth()]}' ${new Date().getDate()}`

    return (
        <Element name="Home">
            <section
                id="hero"
                ref={stageRef}
                className="relative h-dvh w-full max-w-[100vw] overflow-hidden bg-primary"
            >
                <Load setOnLoadComplete={setOnLoadComplete} />

                {onLoadComplete && (
                    <>
                        <div
                            ref={portraitRef}
                            className="absolute inset-0 z-0 overflow-hidden"
                            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        >
                            <img
                                ref={portraitImgRef}
                                src="/hero/hero-dark.png"
                                alt="Portrait of Hassaam"
                                className="h-[115%] w-full object-cover object-[center_18%] -mt-[5%] will-change-transform opacity-70 lg:opacity-80"
                            />
                            <div className="absolute inset-0 bg-primary/35 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/25 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/65 via-transparent to-primary/45 pointer-events-none" />
                        </div>

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

                        <div
                            ref={contentRef}
                            className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 md:px-10 pb-8 md:pb-12"
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
                        </div>
                    </>
                )}
            </section>
        </Element>
    )
}

export default Hero
