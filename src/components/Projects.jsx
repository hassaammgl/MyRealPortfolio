import React, { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from './AnimatedText'
import { useProjectHoverStore } from "@/store"
import { PROJECTS } from "@/constants"

const Projects = () => {

  const projects1 = PROJECTS.slice(0, 3)
  const projects2 = PROJECTS.slice(3)

  return (
    <Element name="Projects">
      <section className="relative h-fit w-screen ">
        <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-start flex-col gap-4'>
          <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"Selected"} />
          <AnimatedText className=' text-end w-1/3 font-extralight font-brittany text-[9vw] hover:text-accent transition-all ease-in-out duration-500' text={"Cases"} />
        </div>
        <div className="w-full p-12 flex">
          <div className="w-1/2 flex justify-start gap-72 items-center flex-col px-9">
            {projects1.map((value) => (
              <ProjectCard
                key={value._id}
                name={value.name}
                tech={value.tech}
                githublink={value.githublink}
                livelink={value.livelink}
              />
            ))}
          </div>
          <div className="w-1/2 mt-48 flex justify-start gap-72 items-center flex-col">
            {projects2.map((value) => (
              <ProjectCard
                key={value._id}
                name={value.name}
                tech={value.tech}
                githublink={value.githublink}
                livelink={value.livelink}
              />
            ))}
          </div>
        </div>
      </section>
    </Element>
  )
}

const ProjectCard = ({ name, tech, githublink, livelink }) => {
  const { setIsHoverOnProjects } = useProjectHoverStore()

  const cardRef = useRef(null)

  useEffect(() => {
    const projCard = cardRef.current
    projCard.addEventListener('mouseenter', () => setIsHoverOnProjects(true))
    projCard.addEventListener('mouseleave', () => setIsHoverOnProjects(false))

    return () => {
      projCard.removeEventListener('mouseenter', () => setIsHoverOnProjects(true))
      projCard.removeEventListener('mouseleave', () => setIsHoverOnProjects(false))
    }
  }, [])

  return (
    <div ref={cardRef} className={`w-full group border-red-800 border-2 relative overflow-hidden`}>
      <div className="relative w-full overflow-hidden">
        <img src="/projects/testbg.jpg" className='w-full group-hover:scale-150 group-hover:rotate-12 transition-all duration-700 ease-in-out ' alt={name} />
        <video src="/projects/testbg.mp4"
          autoPlay
          muted
          playsInline
          loop
          className='w-1/2 absolute inset-0 m-auto'></video>
      </div>
      <div className='w-ful bg-emerald-500'>
        {tech?.map((t, i) => (<Tech key={i} name={t} />))}
      </div>
    </div>
  )
}

export default Projects

const Tech = () => {
  return (<span className='bg-red-400'>
    1.
  </span>)
} 