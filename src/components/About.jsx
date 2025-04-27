import { Element } from 'react-scroll'
import { AnimatedMarquee } from '@/utils/About'

const About = () => {
  return (
    <Element name="About">
      <section className="relative h-fit w-screen ">
        <AnimatedMarquee />
        <div className='text-white min-h-screen w-full relative flex flex-col lg:flex-row items-center justify-between bg-secondary'>
          {/* Content Section */}
          <div className='relative z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center p-6 md:p-10 order-2 lg:order-1'>
            <img
              src="/arrow-down.svg"
              className='invert w-10 md:w-16 mb-8 lg:mb-14 hidden lg:block'
              alt="Scroll indicator"
            />
            <h1 className='text-3xl md:text-4xl font-whisper font-bold text-center lg:text-right w-full'>
              About Me
            </h1>
            <p className='font-roboto mt-5 font-light text-center lg:text-right max-w-2xl text-sm'>
              I'm a full-stack developer who thrives on turning complex challenges into seamless web experiences. From React to Node.js, I craft scalable apps with precision, always learning and adapting to stay ahead of the curve.
            </p>
            <a href="mailto:h455a4mmehtab@gmail.com">
              <button className='mt-8 px-6 py-3 border-accent hover:bg-accent  border-2 text-white  font-medium hover:bg-opacity-90 transition-all'>
                Contact Me
              </button>
            </a>
          </div>

          {/* Image Section */}
          <div className='w-full lg:w-1/2 h-64 md:h-96 lg:h-full relative order-1 lg:order-2'>
            <img
              src="/about.png"
              alt="Profile"
              className='w-full h-full object-cover object-center'
            />
            <img
              className='absolute w-32 md:w-48 lg:w-[20vw] -left-10 md:-left-16 lg:-left-32 top-10 md:top-20 lg:top-36'
              src="/code.png"
              alt="Code snippets"
            />
            <img
              className='absolute w-32 md:w-48 lg:w-[20vw] right-3 md:right-7 bottom-10 md:bottom-20 lg:bottom-36'
              src="/code-2.png"
              alt="More code snippets"
            />
          </div>
        </div>
      </section>
    </Element>
  )
}



export default About

