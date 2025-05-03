import React, { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from './AnimatedText'
import { useProjectHoverStore } from "@/store"

const Projects = () => {
  return (
    <Element name="Projects">
      <section className="relative h-fit w-screen ">
        <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-center gap-4'>
          <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"What i build!"} splitByWords />
        </div>
        <div className="w-full bg-amber-200">
          <div className="p-7 h-screen flex gap-7">
            <ProjectCard className={"w-1/3 h-96 bg-accent rounded-xl"} />
            <ProjectCard className={"w-2/3 h-full bg-accent rounded-xl"} />
          </div>
          <div className="p-7 h-screen flex gap-7">
            <ProjectCard className={"w-full h-full bg-accent rounded-xl"} />
          </div>
          <div className="p-7 h-screen flex gap-7">
            <ProjectCard className={"w-1/3 h-96 bg-accent rounded-xl"} />
            <ProjectCard className={"w-2/3 h-full bg-accent rounded-xl"} />
          </div>
        </div>
      </section>
    </Element>
  )
}

const ProjectCard = ({ className, bgImg, frontImg, name, techStack, repoLink = "https://github.com/hassaammgl/zentry-awwards-game-website", liveLink = null, description, isVideo = false, videoLink }) => {
  const { setIsHoverOnProjects, isHoverOnProjects, setProjectLink } = useProjectHoverStore()

  const cardRef = useRef(null)

  useEffect(() => {
    const projCard = cardRef.current
    projCard.addEventListener('mouseenter', () => {
      setIsHoverOnProjects(true)
      setProjectLink(repoLink)
    })
    projCard.addEventListener('mouseleave', () => setIsHoverOnProjects(false))

    return () => {
      projCard.removeEventListener('mouseenter', () => { })
      projCard.removeEventListener('mouseleave', () => { })
    }
  }, [])

  return (
    <div ref={cardRef} className={className}>
      {isHoverOnProjects ? "Hovered" : "leaved"}
      {repoLink.substring(0, 4)}
    </div>
  )
}

export default Projects