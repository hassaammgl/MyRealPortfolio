import { Element } from 'react-scroll'
import { AnimatedMarquee } from '@/utils/About'
import AnimatedText from "@/components/AnimatedText"

const About = () => {
  return (
    <Element name="About">
      <section className="relative h-fit w-screen ">
        <AnimatedMarquee />

        <div className="flex flex-col md:flex-row bg-primary text-white h-screen w-full">
          <div className="w-full md:w-1/2 p-6 flex items-center">
            <h1 className=" text-[7vw]  font-bold leading-tight uppercase">
              <AnimatedText wordType='f' hover={"hover:text-accent"} text={"I'm a full-stack developer who thrives on turning complex challenges into seamless web experiences. From React to Node.js, I craft scalable apps with precision, always learning and adapting to stay ahead of the curve."} />
            </h1>
          </div>

          <div className="w-full md:w-1/2 relative overflow-hidden">
            <img
              src="/about.png"
              alt="Portrait photography scene"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-10 right-10 w-52 h-36  bg-opacity-50 rounded">
              <img
                src="/code.png"
                alt="code motivation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  )
}



export default About

