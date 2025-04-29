import React from 'react'
import { Element } from 'react-scroll'
import AnimatedText from "@/components/AnimatedText"

const Services = () => {
    return (
        <Element name="Services">
            <section className="relative h-fit w-screen bg-accent rounded-4xl p-10">
                <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-center gap-4'>
                    <AnimatedText className='uppercase text-[7vw] text-center hover:text-black transition-all ease-in-out duration-500' text={"How can i help you!"} />

                </div>

                <div className='flex font-roboto justify-end items-start  text-white m-16 relative '>
                    <Svg className={"m-0 size-4 p-0 md:size-16 bottom-0 absolute left-0"} />

                    <h4 className="text-end mr-8 font-extrabold uppercase text-white/60 overflow-hidden"><AnimatedText text={"( Services )"} /></h4>
                    <div className='w-1/3 text-xl text-white/70'>
                    
                        <p className='font-bold'>
                            Your brand deserves more than a <span className='text-white font-bold'>generic website</span> — it deserves a <span className='text-white font-bold'>digital home</span> that truly captures its essence.
                        </p>
                        <p className='font-extralight'>
                            If your current website feels <span className='text-white font-normal'>outdated</span>, <span className='text-white font-normal'>disconnected</span>, or simply <span className='text-white font-normal'>"not you"</span>, it's time for a change. I design <span className='text-white font-normal'>high-end</span>, thoughtful web experiences that reflect <span className='text-white font-normal'>who you are</span>, tell your story <span className='text-white font-normal'>authentically</span>, and help you build real <span className='text-white font-normal'>momentum</span>. Together, we'll create a website that's not just <span className='text-white font-normal'>beautiful</span>, but <span className='text-white font-normal'>strategic</span> — a true <span className='text-white font-normal'>asset</span> to your brand's <span className='text-white font-normal'>growth</span> and <span className='text-white font-normal'>success</span>.
                        </p>

                    </div>
                </div>
            </section>
        </Element >
    )
}

export default Services


const Svg = ({ className }) => {
    return (
        <svg stroke="currentColor" fill="none" strokeWidth="1.25" viewBox="6 6 12 12" strokeLinecap="round" strokeLinejoin="round" className={className} color="#fff" style={{ color: "#fff" }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="7" y1="7" x2="17" y2="17"></line>
            <polyline points="17 7 17 17 7 17"></polyline>
        </svg>
    )
}