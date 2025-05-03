import React from 'react'
import { Element } from 'react-scroll'
import AnimatedText from './AnimatedText'

const Projects = () => {
  return (
    <Element name="Projects">
      <section className="relative h-fit w-screen ">
        <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-center gap-4'>
          <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"What i build!"} splitByWords />
        </div>
        <div className="w-full h-fit">

        </div>
      </section>
    </Element>
  )
}

const ProjectCard = ({ className, bgImg, frontImg, name, techStack, repoLink, liveLink = null, description, isVideo = false, videoLink }) => {
  return (
    <div className={className}>

      <div className={"flex justify-center items-center flex-col bg-accent rounded-lg overflow-hidden"}>
        {isVideo && <video autoPlay
          loop
          muted
          src={videoLink}
          className="inset-0 w-full h-full object-cover absolute hover:scale-110 transition-all ease-in-out duration-700 " />}
        {!isVideo && <img src={bgImg} alt='bgimg' className='absolute w-full h-full object-cover hover:scale-110 transition-all ease-in-out duration-700 ' />}
        <div className='w-[70%] relative z-10 h-[80%] bg-amber-200'>
          <img src={frontImg} alt='frontimg' className='absolute w-full h-full object-cover hover:scale-110 transition-all ease-in-out duration-700 ' />
        </div>
      </div>
      <div>
        <a className='' href={repoLink}>Live</a>

      </div>
    </div>
  )
}

export default Projects