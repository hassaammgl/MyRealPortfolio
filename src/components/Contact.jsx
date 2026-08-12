import { useRef } from 'react'
import { Element } from 'react-scroll'
import { FaArrowRight } from "react-icons/fa6"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTACTS } from '@/constants'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const sectionRef = useRef(null)
    const splashRef = useRef(null)
    const listRef = useRef(null)

    useGSAP(() => {
        gsap.set(".contact-load", { opacity: 0, x: 120 })
        gsap.set(splashRef.current, { clipPath: "inset(100% 0 0 0)" })

        const splashTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        })

        splashTl
            .to(splashRef.current, {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.9,
                ease: "power3.inOut",
            })
            .to(".contact-load", {
                opacity: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power2.out",
            }, "-=0.35")

        if (listRef.current) {
            gsap.fromTo(
                listRef.current.querySelectorAll(".contact-row"),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            )
        }
    }, { scope: sectionRef })

    return (
        <Element name="Contact">
            <section ref={sectionRef} className="relative w-screen text-white overflow-hidden">
                <div className="bg-accent px-4 py-6 md:px-8 md:py-10">
                    <div
                        ref={splashRef}
                        className="bg-primary w-full min-h-[28vh] md:min-h-[36vh] flex flex-col items-center justify-center gap-4 md:gap-6 rounded-2xl px-4"
                        style={{ clipPath: "inset(100% 0 0 0)" }}
                    >
                        <div className="font-ruslan text-[8vw] md:text-[5vw] text-white flex flex-wrap items-center justify-center gap-3 md:gap-6">
                            <span className="contact-load">Yo,</span>
                            <span className="contact-load">let's</span>
                            <span className="contact-load text-accent font-brittany font-normal text-[12vw] md:text-[7vw]">
                                talk
                            </span>
                            <span className="contact-load">.</span>
                        </div>
                        <p className="contact-load font-roboto text-white/55 text-sm md:text-base text-center max-w-md">
                            Got a backend, product, or system that needs work? Reach out.
                        </p>
                    </div>
                </div>

                <div className="px-6 md:px-16 lg:px-28 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
                        <h3 className="font-boldonse uppercase text-3xl md:text-5xl lg:text-6xl hover:text-accent transition-colors duration-500">
                            Connect
                        </h3>
                        <p className="font-roboto text-white/50 text-sm md:text-base md:text-right max-w-xs">
                            Email, socials, or freelance platforms — pick what works.
                        </p>
                    </div>

                    <div ref={listRef} className="border-t border-white/10">
                        {CONTACTS.map((data, idx) => (
                            <ContactRow
                                key={data.name}
                                name={data.name}
                                url={data.url}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Element>
    )
}

const ContactRow = ({ name, url, index }) => {
    const number = String(index + 1).padStart(2, "0")

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-row group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 py-5 md:py-7 border-b border-white/10 hover:bg-white/[0.03] transition-colors duration-300 px-1 md:px-3"
        >
            <span className="font-syne-mono text-xs md:text-sm text-white/35 group-hover:text-accent transition-colors duration-300">
                {number}
            </span>
            <span className="font-boldonse uppercase text-xl md:text-3xl lg:text-4xl group-hover:text-accent transition-colors duration-300">
                {name}
            </span>
            <span className="text-xl md:text-2xl text-white/50 group-hover:text-accent group-hover:-rotate-45 transition-all duration-300">
                <FaArrowRight />
            </span>
        </a>
    )
}

export default Contact
