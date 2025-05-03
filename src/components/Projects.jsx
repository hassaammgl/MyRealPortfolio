import React, { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from './AnimatedText'
import { useProjectHoverStore } from "@/store"
import { PROJECTS } from "@/constants"

const Projects = () => {
  return (
    <Element name="Projects">
      <section className="relative h-fit w-screen ">
        <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-center gap-4'>
          <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"What i build!"} splitByWords />
        </div>
        <div className="w-full bg-amber-200">
        </div>
      </section>
    </Element>
  )
}

const ProjectCard = ({ className }) => {
  const { setIsHoverOnProjects } = useProjectHoverStore()

  const cardRef = useRef(null)

  useEffect(() => {
    const projCard = cardRef.current
    projCard.addEventListener('mouseenter', () => {
      setIsHoverOnProjects(true)
    })
    projCard.addEventListener('mouseleave', () => setIsHoverOnProjects(false))

    return () => {
      projCard.removeEventListener('mouseenter', () => { })
      projCard.removeEventListener('mouseleave', () => { })
    }
  }, [])

  return (
    <div ref={cardRef} className={className}>
    </div>
  )
}

export default Projects
