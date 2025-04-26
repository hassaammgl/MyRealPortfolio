import { Element } from 'react-scroll'
import { AnimatedMarquee } from '@/utils/About'

const About = () => {
  return (
    <Element name="About">
      <section className="relative h-fit w-screen ">
        <AnimatedMarquee />
        <div className='h-dvh w-full relative flex items-center justify-between bg-secondary'>
          <div className='h-full w-1/2 flex flex-col items-center justify-center p-10'>
            <h1 className='text-4xl font-bold text-primary'>About Me</h1>
            <p className='text-lg text-white mt-5'>
              I am a passionate web developer with a knack for creating dynamic and responsive web applications. My journey in the tech world has been fueled by a love for problem-solving and a desire to learn continuously.
            </p>
            <button>
              Contact Us
            </button>
          </div>
          <div className='h-full w-1/2 relative'>
            <img src="/about.png" alt="me" className='w-full h-full object-cover' />
            <img className='absolute' src="/code.png" alt="img-codes" />
            <img className='absolute' src="/code-2.png" alt="img-codes" />
          </div>
        </div>
      </section>
    </Element>
  )
}



export default About

