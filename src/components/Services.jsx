// import { Element } from 'react-scroll'
// import AnimatedText from "@/utils/AnimatedText"
// import { SERVICES } from '@/constants'
// import { useGSAP } from "@gsap/react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useRef, useEffect } from "react"

// gsap.registerPlugin(ScrollTrigger)

// const Services = () => {
//     const containerRef = useRef(null)
//     const wrapperRef = useRef(null)
//     const cardsRef = useRef([])
//     const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false

//     useGSAP(() => {
//         const cards = cardsRef.current
//         const totalWidth = (SERVICES.length - 1) * window.innerWidth

//         // Horizontal scroll animation with snap points
//         const horizontalScroll = gsap.to(wrapperRef.current, {
//             x: -totalWidth,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: containerRef.current,
//                 start: "top top",
//                 end: () => `+=${totalWidth + window.innerWidth}`,
//                 scrub: 1,
//                 pin: true,
//                 snap: {
//                     snapTo: (value) => {
//                         // Calculate snap points based on number of cards
//                         const snapPoints = SERVICES.map((_, i) => i / (SERVICES.length - 1))
//                         return gsap.utils.snap(snapPoints, value)
//                     },
//                     duration: { min: 0.2, max: 0.6 },
//                     ease: "power1.inOut"
//                 },
//                 invalidateOnRefresh: true
//             }
//         })

//         // Card entrance animations
//         cards.forEach((card, i) => {
//             gsap.from(card, {
//                 scrollTrigger: {
//                     trigger: card,
//                     start: "left center",
//                     end: "right center",
//                     scrub: true,
//                     containerAnimation: horizontalScroll
//                 },
//                 opacity: 0,
//                 y: 50,
//                 scale: 0.9,
//                 duration: 1
//             })
//         })

//         // Handle window resize
//         const onResize = () => {
//             ScrollTrigger.update()
//             ScrollTrigger.refresh()
//         }
//         window.addEventListener('resize', onResize)
//         return () => window.removeEventListener('resize', onResize)
//     }, { scope: containerRef })

//     return (
//         <Element name="Services">
//             <section ref={containerRef} className="relative h-fit w-screen bg-accent overflow-hidden">
//                 <div className="text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-4 md:p-9 flex justify-start items-center gap-4">
//                     <AnimatedText className='uppercase text-4xl md:text-[7vw] text-center hover:text-black transition-all ease-in-out duration-500'
//                         text={"How can i help you!"} splitByWords />
//                 </div>

//                 <div ref={wrapperRef} className="flex  items-center relative snap-mandatory snap-x">
//                     {SERVICES.map((data, index) => (
//                         <ServiceCard
//                             key={index}
//                             data={data}
//                             index={index}
//                             ref={el => cardsRef.current[index] = el}
//                             isFirst={index === 0}
//                         />
//                     ))}
//                 </div>
//             </section>
//         </Element>
//     )
// }

// const ServiceCard = ({ data, isFirst, index }) => {
//     const cardRef = useRef(null)
//     const headRef = useRef(null)
//     const contentRef = useRef(null)

//     useGSAP(() => { 
//         gsap.from(headRef.current, {
//             scrollTrigger: {
//                 trigger: headRef.current,
//                 start: "top center",
//                 end: "bottom center",
//                 scrub: true
//             },
//             opacity: 0,
//             y: 50,
//             duration: 1
//         })

//         gsap.from(contentRef.current, {
//             scrollTrigger: {
//                 trigger: contentRef.current,
//                 start: "top center",
//                 end: "bottom center",
//                 scrub: true
//             },
//             opacity: 0,
//             y: 50,
//             duration: 1
//         })
//     }, { scope: cardRef })


//     return (
//         <div ref={cardRef} className="relative service-card w-screen h-[80vh] flex-shrink-0 snap-always snap-center flex flex-col md:flex-row items-center justify-center p-8">
//             {!isFirst && (
//                 <img
//                     src={`/services/${index}.jpg`}
//                     alt={data.name}
//                     className="absolute top-0 left-0 object-cover h-full w-full"
//                 />
//             )}

//             <div className={`${isFirst ? 'w-full' : 'w-full md:w-1/2'} h-full p-4 md:p-8 flex flex-col  relative z-20`}>
//                 {isFirst ? (
//                     <ServicesTop />
//                 ) : (
//                     <>
//                         <h3 ref={headRef} className="text-3xl font-bold text-white mb-4 font-boldonse">{data.name}</h3>
//                         <p ref={contentRef} className="text-lg text-white mb-4 font-roboto">{data.description}</p>
//                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-roboto">
//                             {data.features.map((feature, index) => (
//                                 <li key={index} className="text-white text-lg p-4 bg-tertiary/50 rounded-xl">
//                                     {feature}
//                                 </li>
//                             ))}
//                         </ul>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }

// const ServicesTop = () => {
//     return (
//         <div className='flex flex-col lg:flex-row font-roboto justify-end items-start text-white'>
//             <h4 className="text-end md:mr-8 font-extrabold uppercase text-white overflow-hidden">
//                 <AnimatedText text={"( Services )"} />
//             </h4>

//             <div className='w-full lg:w-1/3 text-lg md:text-xl text-white mt-8 lg:mt-0'>
//                 <p className='font-bold'>
//                     Your brand deserves more than a <span className='text-white font-bold'>generic website</span> —
//                     it deserves a <span className='text-white font-bold'>digital home</span> that truly captures its essence.
//                 </p>
//                 <p className='font-extralight mt-4'>
//                     If your current website feels <span className='text-white font-normal'>outdated</span>,
//                     <span className='text-white font-normal'>disconnected</span>, or simply <span className='text-white font-normal'>"not you"</span>,
//                     it's time for a change. I design <span className='text-white font-normal'>high-end</span>,
//                     thoughtful web experiences that reflect <span className='text-white font-normal'>who you are</span>,
//                     tell your story <span className='text-white font-normal'>authentically</span>, and help you build real
//                     <span className='text-white font-normal'>momentum</span>.
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default Services

import { useEffect, useRef } from 'react'
import { Observer } from 'gsap/Observer'
import { SplitText } from 'gsap/SplitText'
import { SERVICES } from '@/constants'
import { Element } from 'react-scroll'
import gsap from "gsap"

gsap.registerPlugin(Observer, SplitText)

const VerticalServices = () => {
    const sectionsRef = useRef([])
    const imagesRef = useRef([])
    const headingsRef = useRef([])
    const outerRef = useRef([])
    const innerRef = useRef([])

    const currentIndex = useRef(-1)
    const animating = useRef(false)
    const observerInstance = useRef(null)

    useEffect(() => {
        const splitHeadings = headingsRef.current.map((heading) => {
            return new SplitText(heading, { type: 'chars,words,lines', linesClass: 'clip-text' })
        })

        // Start all sections invisible except the first
        gsap.set(sectionsRef.current, { autoAlpha: 0, pointerEvents: 'none' })
        gsap.set(sectionsRef.current[0], { autoAlpha: 1, pointerEvents: 'auto' })

        // Setup initial positions for outer/inner containers
        gsap.set(outerRef.current, { yPercent: 100 })
        gsap.set(innerRef.current, { yPercent: -100 })

        const gotoSection = (index, direction) => {
            if (index < 0 || index >= SERVICES.length || index === currentIndex.current) return
            animating.current = true

            const fromTop = direction === -1
            const dFactor = fromTop ? -1 : 1

            const tl = gsap.timeline({
                defaults: { duration: 1.25, ease: 'power1.inOut' },
                onComplete: () => {
                    animating.current = false
                    // Enable pointer events only on visible section
                    sectionsRef.current.forEach((sec, i) => {
                        gsap.set(sec, { pointerEvents: i === index ? 'auto' : 'none' })
                    })
                },
            })

            if (currentIndex.current >= 0) {
                gsap.set(sectionsRef.current[currentIndex.current], { zIndex: 0 })
                tl.to(imagesRef.current[currentIndex.current], { yPercent: -15 * dFactor })
                    .set(sectionsRef.current[currentIndex.current], { autoAlpha: 0 })
            }

            gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 })
            tl.fromTo(
                [outerRef.current[index], innerRef.current[index]],
                { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
                { yPercent: 0 },
                0
            )
                .fromTo(imagesRef.current[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
                .fromTo(
                    splitHeadings[index].chars,
                    { autoAlpha: 0, yPercent: 150 * dFactor },
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1,
                        ease: 'power2',
                        stagger: {
                            each: 0.02,
                            from: 'random',
                        },
                    },
                    0.2
                )

            currentIndex.current = index
        }

        observerInstance.current = Observer.create({
            type: 'wheel,touch,pointer',
            wheelSpeed: -1,
            onDown: () => !animating.current && gotoSection(currentIndex.current - 1, -1),
            onUp: () => !animating.current && gotoSection(currentIndex.current + 1, 1),
            tolerance: 10,
            preventDefault: true,
        })

        gotoSection(0, 1)

        return () => {
            observerInstance.current && observerInstance.current.kill()
            splitHeadings.forEach(s => s.revert())
        }
    }, [])

    return (
        <Element name="Services" className='relative'>

            {SERVICES.map((service, index) => (
                <section
                    key={service.name}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    className="relative top-0 left-0 text-white font-Audiowide uppercase w-screen h-screen"
                    style={{ overflow: 'hidden' }}
                >
                    <div
                        className="outer w-full h-full overflow-hidden"
                        ref={(el) => (outerRef.current[index] = el)}
                    >
                        <div
                            className="inner w-full h-full overflow-hidden"
                            ref={(el) => (innerRef.current[index] = el)}
                        >
                            <div
                                className="relative w-full h-full flex flex-col items-center justify-center text-center bg-cover bg-center px-6 md:px-20 py-12"
                                ref={(el) => (imagesRef.current[index] = el)}
                                style={{
                                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${service.img})`,
                                }}
                            >
                                <h2
                                    className="section-heading text-[clamp(1.5rem,4vw,4rem)] tracking-[0.2em] mb-6"
                                    ref={(el) => (headingsRef.current[index] = el)}
                                >
                                    {service.name}
                                </h2>
                                <p className="max-w-3xl text-lg text-white/90 mb-6 font-roboto">{service.description}</p>
                                <ul className="grid gap-4 text-white/80 font-light text-sm md:text-lg max-w-4xl w-full grid-cols-1 md:grid-cols-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="bg-black/30 p-4 rounded-xl">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </Element>
    )
}

export default VerticalServices
