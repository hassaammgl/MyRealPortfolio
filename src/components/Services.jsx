
import { Element } from 'react-scroll'
import AnimatedText from "@/utils/AnimatedText"
import { SERVICES } from '@/constants'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
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

        // Handle window resize
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
            <section ref={containerRef} className="relative h-fit w-screen bg-accent rounded-4xl p-5 md:p-10 overflow-hidden scroll-snap-type-y mandatory">
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
                            Your brand deserves more than a <span className='text-white font-bold'>generic website</span> — it deserves a <span className='text-white font-bold'>digital home</span> that truly captures its essence.
                        </p>
                        <p className='font-extralight mt-4'>
                            If your current website feels <span className='text-white font-normal'>outdated</span>, <span className='text-white font-normal'>disconnected</span>, or simply <span className='text-white font-normal'>"not you"</span>, it's time for a change. I design <span className='text-white font-normal'>high-end</span>, thoughtful web experiences that reflect <span className='text-white font-normal'>who you are</span>, tell your story <span className='text-white font-normal'>authentically</span>, and help you build real <span className='text-white font-normal'>momentum</span>. Together, we'll create a website that's not just <span className='text-white font-normal'>beautiful</span>, but <span className='text-white font-normal'>strategic</span> — a true <span className='text-white font-normal'>asset</span> to your brand's <span className='text-white font-normal'>growth</span> and <span className='text-white font-normal'>success</span>.
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
            <div className="absolute inset-0 bg-tertiary backdrop-blur-lg rounded-3xl" />

            <div className="w-full h-[30vh]  lg:w-1/2 md:h-full flex items-center justify-center relative z-10">
                <h2 className="text-4xl  md:text-6xl lg:text-7xl xl:text-8xl font-boldonse transform -rotate-6 lg:-rotate-12 mix-blend-difference">
                    <span className="text-outline text-center">{data.name}</span>
                </h2>
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
        </div>
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