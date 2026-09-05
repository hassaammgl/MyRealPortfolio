import { Element } from 'react-scroll'
import AnimatedMarquee from '@/utils/AnimatedMarquee'
import AnimatedText from "@/utils/AnimatedText"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const FOCUS = [
    "APIs & Auth",
    "PostgreSQL",
    "Payments",
    "Integrations",
    "Background Jobs",
]

const About = () => {
    const section = useRef(null)
    const headRef = useRef(null)
    const copyRef = useRef(null)
    const imgWrapRef = useRef(null)
    const imgRef = useRef(null)
    const code1Ref = useRef(null)
    const code2Ref = useRef(null)
    const badgeRef = useRef(null)

    useGSAP(() => {
        if (!section.current) return

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const tweens = []

        const killAll = () => {
            tweens.forEach((t) => {
                t.scrollTrigger?.kill()
                t.kill()
            })
        }

        // One-shot reveals — not scrubbed opacity (avoids sticky fade feel)
        const reveal = (targets, vars, st = {}) => {
            const t = gsap.from(targets, {
                ...vars,
                scrollTrigger: {
                    trigger: section.current,
                    start: "top 72%",
                    toggleActions: "play none none none",
                    ...st,
                },
            })
            tweens.push(t)
            return t
        }

        if (reduceMotion) {
            reveal([headRef.current, copyRef.current, imgWrapRef.current].filter(Boolean), {
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "power2.out",
            })
            return killAll
        }

        // Reveals use opacity / x / rotate — parallax owns y (no fights)
        reveal(headRef.current, {
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
        })

        reveal(copyRef.current, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.08,
        })

        reveal(".about-chip", {
            y: 24,
            opacity: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
            delay: 0.22,
        })

        reveal(imgWrapRef.current, {
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
        })

        reveal(badgeRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.35,
        })

        reveal(code1Ref.current, {
            opacity: 0,
            rotate: 8,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.28,
        })

        reveal(code2Ref.current, {
            opacity: 0,
            rotate: -8,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.36,
        })

        // Continuous parallax while scrolling through About
        const scrollRange = {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
        }

        tweens.push(
            gsap.fromTo(
                imgRef.current,
                { yPercent: -8 },
                { yPercent: 12, ease: "none", scrollTrigger: { ...scrollRange } },
            ),
        )

        tweens.push(
            gsap.fromTo(
                code1Ref.current,
                { y: 40 },
                { y: -90, ease: "none", scrollTrigger: { ...scrollRange } },
            ),
        )

        tweens.push(
            gsap.fromTo(
                code2Ref.current,
                { y: -30 },
                { y: 70, ease: "none", scrollTrigger: { ...scrollRange } },
            ),
        )

        tweens.push(
            gsap.fromTo(
                headRef.current,
                { y: 20 },
                { y: -40, ease: "none", scrollTrigger: { ...scrollRange } },
            ),
        )

        return killAll
    }, { scope: section })

    return (
        <Element name="About">
            <AnimatedMarquee />
            <section ref={section} className="relative w-screen z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(141,86,204,0.18),transparent_55%)] pointer-events-none" />

                <div
                    ref={headRef}
                    className="px-6 md:px-12 pt-12 md:pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 will-change-transform"
                >
                    <div data-cursor-hover>
                        <p className="font-syne-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
                            ( About )
                        </p>
                        <h2 className="font-boldonse uppercase text-[12vw] md:text-[7vw] leading-none text-white">
                            <AnimatedText text="Who I am" />
                        </h2>
                        <p className="font-brittany text-accent text-[10vw] md:text-[4.5vw] leading-none mt-2 md:mt-3">
                            in systems
                        </p>
                    </div>
                    <p className="font-roboto text-white/45 text-sm md:text-base max-w-xs md:text-right pb-2">
                        Backend-first engineer building products that stay correct under real load.
                    </p>
                </div>

                <div className="mt-10 md:mt-14 flex flex-col lg:flex-row bg-primary text-white">
                    <div
                        ref={copyRef}
                        className="w-full lg:w-[48%] px-6 md:px-12 py-10 md:py-16 flex flex-col justify-center gap-8"
                    >
                        <h3
                            data-cursor-hover
                            className="font-Audiowide text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-snug uppercase"
                        >
                            <AnimatedText
                                splitByWords
                                hoverClass="hover:text-accent"
                                className="transition-all ease-in-out duration-500"
                                text="I design and ship production backends — APIs, data models, payments, and integrations — then connect the frontend when the product needs it."
                            />
                        </h3>

                        <p className="font-roboto text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
                            Less showcase, more systems: auth, workflows, webhooks, queues, and the boring reliability work that makes software usable for real clients.
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {FOCUS.map((item) => (
                                <span
                                    key={item}
                                    className="about-chip font-syne-mono text-[10px] md:text-xs tracking-[0.15em] uppercase text-white/80 border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={imgWrapRef}
                        className="w-full lg:w-[52%] relative overflow-hidden min-h-[70vh] lg:min-h-screen"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-transparent z-10 pointer-events-none hidden lg:block" />

                        <img
                            ref={imgRef}
                            data-cursor-hover
                            loading="lazy"
                            src="https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337391/portfolio/about_ts5fqu.png"
                            alt="Portrait"
                            className="absolute inset-0 h-[120%] w-full object-cover -top-[10%] will-change-transform"
                        />

                        <div
                            ref={badgeRef}
                            className="absolute top-6 left-6 z-20 font-syne-mono text-[10px] tracking-[0.25em] uppercase text-white/70 border border-white/20 bg-black/30 backdrop-blur-md px-3 py-2"
                        >
                            Available for work
                        </div>

                        <div
                            ref={code1Ref}
                            className="absolute bottom-10 right-6 md:right-10 w-40 h-28 md:w-52 md:h-36 z-20 overflow-hidden border border-white/20 shadow-2xl shadow-black/50 -rotate-3 will-change-transform"
                        >
                            <img
                                src="https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337805/portfolio/portfolio/code_peehjo.png"
                                data-cursor-hover
                                alt="code"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div
                            ref={code2Ref}
                            className="absolute top-24 left-6 md:left-10 w-40 h-28 md:w-52 md:h-36 z-20 overflow-hidden border border-white/20 shadow-2xl shadow-black/50 rotate-3 will-change-transform"
                        >
                            <img
                                src="https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337805/portfolio/portfolio/code-2_qijuqf.png"
                                data-cursor-hover
                                alt="code"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Element>
    )
}

export default About
