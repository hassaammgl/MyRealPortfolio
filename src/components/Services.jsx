import { Element } from 'react-scroll'
import AnimatedText from "@/utils/AnimatedText"
import { SERVICES } from '@/constants'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, } from "react"

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
    const containerRef = useRef(null)

    return (
        <Element name="Services">
            <section ref={containerRef} className="relative h-fit w-screen bg-accent overflow-hidden">
                <div className="text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-4 md:p-9 flex justify-start items-center gap-4">
                    <AnimatedText className='uppercase text-4xl md:text-[7vw] text-center hover:text-black transition-all ease-in-out duration-500'
                        text={"How can i help you!"} splitByWords />
                </div>
                <ServicesTop />
            </section>
        </Element>
    )
}

const ServicesTop = () => {
    return (
        <div className='flex flex-col lg:flex-row font-roboto justify-end items-start text-white'>
            <h4 className="text-end md:mr-8 font-extrabold uppercase text-white overflow-hidden">
                <AnimatedText text={"( Services )"} />
            </h4>

            <div className='w-full lg:w-1/3 text-lg md:text-xl text-white mt-8 lg:mt-0'>
                <p className='font-bold'>
                    Your brand deserves more than a <span className='text-white font-bold'>generic website</span> —
                    it deserves a <span className='text-white font-bold'>digital home</span> that truly captures its essence.
                </p>
                <p className='font-extralight mt-4'>
                    If your current website feels <span className='text-white font-normal'>outdated</span>,
                    <span className='text-white font-normal'>disconnected</span>, or simply <span className='text-white font-normal'>"not you"</span>,
                    it's time for a change. I design <span className='text-white font-normal'>high-end</span>,
                    thoughtful web experiences that reflect <span className='text-white font-normal'>who you are</span>,
                    tell your story <span className='text-white font-normal'>authentically</span>, and help you build real
                    <span className='text-white font-normal'>momentum</span>.
                </p>
            </div>
        </div>
    )
}

export default Services
