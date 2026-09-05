import { useRef, useEffect, useState, useCallback } from 'react'
import { Element } from 'react-scroll'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from '@/utils/AnimatedText'
import ThemeMorphImage from '@/utils/ThemeMorphImage'
import { FiArrowDownRight } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const Months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const Hero = () => {
    const trackRef = useRef(null)
    const stageRef = useRef(null)
    const portraitRef = useRef(null)
    const portraitImgRef = useRef(null)
    const veilRef = useRef(null)
    const nameRef = useRef(null)
    const contentRef = useRef(null)
    const copyRef = useRef(null)
    const dateRef = useRef(null)
    const mouse = useRef({ x: 0 })
    const [theme, setTheme] = useState('dark')

    const onThemeChange = useCallback((next) => {
        setTheme(next)
    }, [])

    useEffect(() => {
        if (!veilRef.current) return
        gsap.to(veilRef.current, {
            opacity: theme === 'light' ? 0.35 : 1,
            duration: 0.9,
            ease: 'power2.out',
        })
    }, [theme])

    useGSAP(() => {
        if (!trackRef.current || !stageRef.current) return

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const tweens = []

        gsap.set(portraitRef.current, { clipPath: "inset(42% 38% 42% 38%)" })
        gsap.set([copyRef.current, dateRef.current].filter(Boolean), { opacity: 0, y: 36 })

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
            .to([copyRef.current, dateRef.current].filter(Boolean), {
                y: 0,
                opacity: 1,
                stagger: 0.14,
                duration: 0.85,
                ease: "power3.out",
            }, "-=0.55")

        if (reduceMotion) {
            return () => intro.kill()
        }

        const scrub = {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.25,
        }

        tweens.push(
            gsap.fromTo(
                portraitImgRef.current,
                { yPercent: -18, scale: 1 },
                {
                    yPercent: -2,
                    scale: 1.08,
                    ease: "none",
                    scrollTrigger: { ...scrub },
                },
            ),
        )

        tweens.push(
            gsap.to(nameRef.current, {
                yPercent: -28,
                scale: 1.08,
                ease: "none",
                scrollTrigger: { ...scrub },
            }),
        )

        tweens.push(
            gsap.to(copyRef.current, {
                y: 70,
                ease: "none",
                scrollTrigger: { ...scrub },
            }),
        )

        tweens.push(
            gsap.to(dateRef.current, {
                y: 100,
                ease: "none",
                scrollTrigger: { ...scrub },
            }),
        )

        tweens.push(
            gsap.to(contentRef.current, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: trackRef.current,
                    start: "60% top",
                    end: "85% top",
                    scrub: 1,
                },
            }),
        )

        return () => {
            intro.kill()
            tweens.forEach((t) => {
                t.scrollTrigger?.kill()
                t.kill()
            })
        }
    }, { scope: trackRef })

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!canHover || reduceMotion || !portraitImgRef.current) return

        const onMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
            gsap.to(portraitImgRef.current, {
                x: mouse.current.x * 16,
                duration: 1.15,
                ease: "power3.out",
                overwrite: "auto",
            })
            gsap.to(nameRef.current, {
                x: mouse.current.x * -10,
                duration: 1.25,
                ease: "power3.out",
                overwrite: "auto",
            })
        }

        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    const date = `${Months[new Date().getMonth()]}' ${new Date().getDate()}`

    return (
        <Element name="Home">
            <section
                id="hero"
                ref={trackRef}
                className="relative h-[170vh] w-full max-w-[100vw] bg-primary"
            >
                <div
                    ref={stageRef}
                    className="sticky top-0 h-dvh w-full overflow-hidden bg-primary"
                >
                    <div
                        ref={portraitRef}
                        className="absolute inset-0 z-0 overflow-hidden"
                        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    >
                        <ThemeMorphImage
                            ref={portraitImgRef}
                            srcA="/hero/hero-dark.png"
                            srcB="/hero/hero-light.png"
                            alt="Portrait of Hassaam"
                            onThemeChange={onThemeChange}
                            className="absolute left-0 top-0 h-[160%] w-full will-change-transform origin-center"
                            imgClassName="object-[center_18%]"
                        />
                        <div
                            ref={veilRef}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <div className="absolute inset-0 bg-primary/25" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary from-5% via-primary/30 via-35% to-transparent to-70%" />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/25" />
                        </div>
                    </div>

                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
                        <h1
                            ref={nameRef}
                            data-cursor-hover
                            className="pointer-events-auto font-boldonse uppercase text-white text-center text-[13vw] sm:text-[11vw] md:text-[9.5vw] leading-[0.85] mix-blend-difference will-change-transform origin-center"
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
                        className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 md:px-10 pb-8 md:pb-12 will-change-transform"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pt-6 md:pt-8 border-t border-white/10">
                            <div ref={copyRef} className="max-w-md will-change-transform">
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

                            <div ref={dateRef} className="lg:text-right will-change-transform">
                                <p className="font-syne-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-1">
                                    Available for work
                                </p>
                                <p className="font-boldonse text-3xl sm:text-4xl md:text-5xl text-white">
                                    {date}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Element>
    )
}

export default Hero
