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

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                start: "top 65%",
                end: "top 20%",
                scrub: 1.2,
            },
        })

        tl.fromTo(
            ".about-copy",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
        )
            .fromTo(
                ".about-img-wrap",
                { scale: 1.08, opacity: 0.6 },
                { scale: 1, opacity: 1, duration: 1 },
                "<",
            )
            .fromTo(
                "#code-img-1",
                { y: 120, opacity: 0, rotate: 6 },
                { y: 0, opacity: 1, rotate: -3, duration: 1 },
                "-=0.4",
            )
            .fromTo(
                "#code-img-2",
                { y: -120, opacity: 0, rotate: -6 },
                { y: 0, opacity: 1, rotate: 4, duration: 1 },
                "<",
            )
            .fromTo(
                ".about-chip",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
                "-=0.6",
            )

        return () => tl.kill()
    }, { scope: section })

    return (
        <Element name="About">
            <AnimatedMarquee />
            <section ref={section} className="relative w-screen z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(141,86,204,0.18),transparent_55%)] pointer-events-none" />

                <div className="px-6 md:px-12 pt-12 md:pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
                    <div className="about-copy w-full lg:w-[48%] px-6 md:px-12 py-10 md:py-16 flex flex-col justify-center gap-8">
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

                    <div className="about-img-wrap w-full lg:w-[52%] relative overflow-hidden min-h-[70vh] lg:min-h-screen">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-transparent z-10 pointer-events-none hidden lg:block" />

                        <img
                            data-cursor-hover
                            loading="lazy"
                            src="https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337391/portfolio/about_ts5fqu.png"
                            alt="Portrait"
                            className="about-img absolute inset-0 h-full w-full object-cover scale-105"
                        />

                        <div className="absolute top-6 left-6 z-20 font-syne-mono text-[10px] tracking-[0.25em] uppercase text-white/70 border border-white/20 bg-black/30 backdrop-blur-md px-3 py-2">
                            Available for work
                        </div>

                        <div
                            id="code-img-1"
                            className="absolute bottom-10 right-6 md:right-10 w-40 h-28 md:w-52 md:h-36 z-20 overflow-hidden border border-white/20 shadow-2xl shadow-black/50 -rotate-3"
                        >
                            <img
                                src="https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337805/portfolio/portfolio/code_peehjo.png"
                                data-cursor-hover
                                alt="code"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div
                            id="code-img-2"
                            className="absolute top-24 left-6 md:left-10 w-40 h-28 md:w-52 md:h-36 z-20 overflow-hidden border border-white/20 shadow-2xl shadow-black/50 rotate-3"
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
