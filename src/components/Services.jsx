import { Element } from 'react-scroll'
import AnimatedText from "@/utils/AnimatedText"
import { SERVICES } from '@/constants'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useState, useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

// Toggle to restore the previous stacked-card Services UI
const SHOW_OLD_SERVICES = false

const Services = () => {
    const containerRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const active = SERVICES[activeIndex]

    useGSAP(() => {
        if (SHOW_OLD_SERVICES) return

        gsap.fromTo(
            ".service-list-item",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            }
        )
    }, { scope: containerRef })

    if (SHOW_OLD_SERVICES) {
        return <OldServicesDesign />
    }

    return (
        <Element name="Services">
            <section
                ref={containerRef}
                className="relative w-screen bg-primary text-white py-20 md:py-28 px-6 md:px-12 lg:px-20"
            >
                <div className="mb-12 md:mb-16">
                    <h2
                        data-cursor-hover
                        className="font-boldonse uppercase text-4xl md:text-[6vw] leading-none hover:text-accent transition-colors duration-500"
                    >
                        <AnimatedText text="How can i help you!" splitByWords />
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-28">
                        <p className="font-syne-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/40 mb-4">
                            ( Services )
                        </p>
                        <p className="font-roboto text-sm md:text-base text-white/55 leading-relaxed max-w-sm">
                            <span className="text-white font-medium">I build production backends</span>
                            {" "}— APIs, data models, payments, integrations, and systems you can keep shipping on.
                        </p>
                        <div className="mt-8 md:mt-10 border-l border-white/15 pl-4">
                            <p className="font-boldonse text-lg md:text-2xl text-accent mb-3 uppercase tracking-wide">
                                {active.name.replace(/\n/g, " ")}
                            </p>
                            <p className="font-roboto text-sm md:text-base text-white/70 leading-relaxed">
                                {active.description}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col">
                        {SERVICES.map((service, index) => {
                            const isActive = index === activeIndex
                            const label = service.name.replace(/\n/g, " ")

                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                    className="service-list-item group grid grid-cols-[auto_1fr] gap-3 md:gap-5 items-center text-left py-2 md:py-1 border-0 bg-transparent cursor-pointer"
                                >
                                    <span
                                        className={`font-syne-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                                            isActive ? "text-accent" : "text-white/30 group-hover:text-accent"
                                        }`}
                                    >
                                        Service
                                    </span>
                                    <span
                                        data-cursor-hover
                                        className={`font-boldonse uppercase text-[9vw] md:text-[5.5vw] lg:text-[4.2vw] leading-[0.95] transition-colors duration-300 ${
                                            isActive ? "text-accent" : "text-white/85 group-hover:text-accent"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="hidden lg:flex lg:col-span-1 justify-end pt-4">
                        <div className="flex items-end gap-1 h-8 text-accent">
                            <span className="w-1 bg-current h-3 rounded-sm" />
                            <span className="w-1 bg-current h-6 rounded-sm" />
                            <span className="w-1 bg-current h-4 rounded-sm" />
                        </div>
                    </div>
                </div>
            </section>
        </Element>
    )
}

/* ── OLD SERVICES DESIGN (hidden via SHOW_OLD_SERVICES = false) ── */
const OldServicesDesign = () => {
    const containerRef = useRef(null)
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false

    useGSAP(() => {
        const cards = gsap.utils.toArray(".service-card")

        cards.forEach((card, i) => {
            const offset = i * (isMobile ? 25 : 50)
            const startPos = isMobile ? "top 90%" : "top bottom-=10%"
            const endPos = isMobile ? "top 50%" : "top 30%"

            gsap.fromTo(card,
                {
                    y: (isMobile ? 100 : 200) + offset,
                    scale: 0.85,
                    rotation: isMobile ? -2 : -5,
                    opacity: 0,
                    zIndex: 1
                },
                {
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    zIndex: i + 2,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: card,
                        start: startPos,
                        end: endPos,
                        scrub: 1.5,
                        markers: false,
                        invalidateOnRefresh: true,
                        onEnter: () => gsap.to(card, { zIndex: SERVICES.length + 1 }),
                        onLeaveBack: () => gsap.to(card, { zIndex: 1 })
                    }
                }
            )
        })

        const onResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, { scope: containerRef })

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])

    return (
        <Element name="Services">
            <section ref={containerRef} className="relative h-fit w-screen bg-accent rounded-4xl p-5 md:p-10 overflow-x-clip scroll-snap-type-y mandatory">
                <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-4 md:p-9 flex justify-start items-center gap-4'>
                    <AnimatedText className='uppercase text-4xl md:text-[7vw] text-center hover:text-black transition-all ease-in-out duration-500' text={"How can i help you!"} splitByWords />
                </div>

                <div className='flex flex-col md:flex-row font-roboto justify-end items-start text-white mx-4 md:m-16 relative'>
                    <Svg className="m-0 size-8 md:size-16 absolute -top-4 left-0 md:static md:mr-4" />

                    <h4 className="text-end md:mr-8 font-extrabold uppercase text-white overflow-hidden mt-4 md:mt-0">
                        <AnimatedText text={"( Services )"} />
                    </h4>

                    <div className='w-full md:w-1/3 text-lg md:text-xl text-white mt-8 md:mt-0'>
                        <p className='font-bold'>
                            Your product needs more than a <span className='text-white font-bold'>pretty UI</span> — it needs a <span className='text-white font-bold'>reliable backend</span> that can handle real business logic.
                        </p>
                        <p className='font-extralight mt-4'>
                            I help founders and teams design, build, improve, and maintain <span className='text-white font-normal'>production-oriented systems</span> — APIs, databases, payments, integrations, background jobs, and admin workflows. Whether you are launching a SaaS, fixing a fragile backend, or connecting third-party services, I focus on <span className='text-white font-normal'>correctness</span>, <span className='text-white font-normal'>data consistency</span>, and architecture you can keep shipping on.
                        </p>
                    </div>
                </div>

                <div className='w-full h-fit text-white relative'>
                    {SERVICES.map((data, index) => (
                        <ServiceCard key={index} index={index} data={data} />
                    ))}
                </div>
            </section>
        </Element>
    )
}

const ServiceCard = ({ data, index }) => {
    const cardRef = useRef(null)
    const contentRef = useRef(null)
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false

    useGSAP(() => {
        const triggerConfig = {
            trigger: cardRef.current,
            start: isMobile ? "top 85%" : "top center+=10%",
            end: "+=250",
            scrub: 1,
            markers: false,
            invalidateOnRefresh: true
        }

        const tl = gsap.timeline({
            scrollTrigger: triggerConfig
        })

        tl.fromTo(contentRef.current,
            { y: isMobile ? 30 : 100, opacity: 0 },
            { y: 0, opacity: 1 }
        ).fromTo(".card-feature",
            { x: isMobile ? -15 : -50, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1 },
            0.2
        )

        return () => tl.kill()
    }, { scope: cardRef })

    return (
        <div
            ref={cardRef}
            className="service-card mt-8 min-h-[80dvh]  md:h-screen w-full p-5 md:p-10 flex flex-col lg:flex-row items-center justify-between relative"
            style={{ zIndex: index + 1 }}
        >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl transition-all duration-500 hover:bg-white/40 hover:shadow-2xl" />
            {(index + 1) % 2 === 0 ? (
                <>
                    <div ref={contentRef} className="w-full  lg:w-1/2 h-full flex flex-col justify-center relative z-10 p-4 md:p-8">
                        <p className="text-lg md:text-2xl mb-4 md:mb-8 font-roboto font-light opacity-90">{data.description}</p>
                        <div className="space-y-2 md:space-y-4">
                            {data.features?.map((feat, i) => (
                                <div key={i} className="card-feature border-l-2 md:border-l-4 border-white pl-2 md:pl-4 py-1 md:py-2">
                                    <span className="text-base md:text-lg font-medium">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-[30vh]  lg:w-1/2 md:h-full flex items-center justify-center relative z-10 px-4 overflow-visible">
                        <ServiceTitle name={data.name} />
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full h-[30vh]  lg:w-1/2 md:h-full flex items-center justify-center relative z-10 px-4 overflow-visible">
                        <ServiceTitle name={data.name} />
                    </div>

                    <div ref={contentRef} className="w-full  lg:w-1/2 h-full flex flex-col justify-center relative z-10 p-4 md:p-8">
                        <p className="text-lg md:text-2xl mb-4 md:mb-8 font-roboto font-light opacity-90">{data.description}</p>
                        <div className="space-y-2 md:space-y-4">
                            {data.features?.map((feat, i) => (
                                <div key={i} className="card-feature border-l-2 md:border-l-4 border-white pl-2 md:pl-4 py-1 md:py-2">
                                    <span className="text-base md:text-lg font-medium">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const ServiceTitle = ({ name }) => {
    const lines = name.split("\n")

    return (
        <h2 className="flex flex-col items-center justify-center gap-3 md:gap-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-boldonse -rotate-3 lg:-rotate-6">
            {lines.map((line) => (
                <span key={line} className="text-outline text-center leading-none whitespace-nowrap px-2">
                    {line}
                </span>
            ))}
        </h2>
    )
}

const Svg = ({ className }) => {
    return (
        <svg stroke="currentColor" fill="none" strokeWidth="1.25" viewBox="6 6 12 12" strokeLinecap="round" strokeLinejoin="round" className={className} color="#fff" style={{ color: "#fff" }} height="1em" width="1em">
            <line x1="7" y1="7" x2="17" y2="17"></line>
            <polyline points="17 7 17 17 7 17"></polyline>
        </svg>
    )
}

export default Services
