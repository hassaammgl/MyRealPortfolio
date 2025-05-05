import { Element } from 'react-scroll'
import { AnimatedMarquee } from '@/utils/About'
import AnimatedText from "@/components/AnimatedText"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'


gsap.registerPlugin(ScrollTrigger)

const About = () => {

  const section = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 30%",
        end: "top 50%",
        scrub: 1,
        // pin: true,
        // markers: true,
      }
    })

    tl.fromTo("#code-img-1", { y: 100, opacity: 0 }, { y: -30, opacity: 1, duration: 1 })
      .fromTo("#code-img-2", { y: -100, opacity: 0 }, { y: 30, opacity: 1, duration: 1 }, "<")

    return () => {
      tl.kill()
    }
  }, { scope: section })

  return (
    <Element name="About">

      <AnimatedMarquee />
      <section ref={section} className="h-screen w-screen ">
        <div className="flex flex-col md:flex-row bg-primary text-white sm:h-fit w-full">
          <div className="w-full md:w-1/2 p-6 flex items-center">
            <h1 data-cursor-hover className="text-[6vw] sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight uppercase">
              <AnimatedText splitByWords={true} hoverClass={"hover:text-accent"} className='transition-all ease-in-out duration-500' text={"I'm a full-stack developer who thrives on turning complex challenges into seamless web experiences. From React to Node.js, I craft scalable apps with precision, always learning and adapting to stay ahead of the curve."} />
            </h1>
          </div>

          <div className="w-full md:w-1/2 relative overflow-hidden">
            <img
              data-cursor-hover
              src="/about.png"
              alt="Portrait photography scene"
              className="h-screen w-full object-cover"
            />

            <div id='code-img-1' className="absolute bottom-10 right-10 w-52 h-36  bg-opacity-50 rounded">
              <img
                src="/code.png"
                data-cursor-hover
                alt="code motivation"
                className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
              />
            </div>
            <div id='code-img-2' className="absolute top-10 left-10 w-52 h-36  bg-opacity-50 rounded">
              <img
                src="/code-2.png"
                data-cursor-hover
                alt="code motivation"
                className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  )
}



export default About

