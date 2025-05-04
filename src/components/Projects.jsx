import React, { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from './AnimatedText'
import { useProjectHoverStore } from "@/store"
import { PROJECTS } from "@/constants"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const projectsSectionRef = useRef(null)
  const column1Ref = useRef(null)
  const column2Ref = useRef(null)
  const projects1 = PROJECTS.slice(0, 3)
  const projects2 = PROJECTS.slice(3)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Column animations
      gsap.fromTo([column1Ref.current, column2Ref.current],
        {
          x: (index) => index === 0 ? -100 : 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          stagger: 0.3
        }
      )

      // Project card animations
      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            delay: i * 0.1
          }
        )
      })
    }, projectsSectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Element name="Projects">
      <section ref={projectsSectionRef} className="relative h-fit w-screen">
        <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-start flex-col gap-4'>
          <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"Selected"} />
          <AnimatedText className=' text-end w-1/3 font-extralight font-brittany text-[9vw] hover:text-accent transition-all ease-in-out duration-500' text={"Cases"} />
        </div>
        <div className="w-full p-12 flex">
          <div ref={column1Ref} className="w-1/2 flex justify-start gap-72 items-center flex-col px-9">
            {projects1.map((value) => (
              <ProjectCard key={value._id} {...value} />
            ))}
          </div>
          <div ref={column2Ref} className="w-1/2 mt-48 flex justify-start gap-72 items-center flex-col">
            {projects2.map((value) => (
              <ProjectCard key={value._id} {...value} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  )
}

const ProjectCard = ({ name, tech, image, livelink, preview }) => {
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
    <div ref={cardRef} className="project-card flex flex-col gap-4 group cursor-none">
      {/* Project Image */}
      <div className="overflow-hidden rounded-md shadow-lg relative">
        <img
          src={image}
          alt={name}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <img
          src={preview}
          alt={name}
          className="absolute inset-0 rounded-2xl border-2 h-2/3 object-cover m-auto w-1/2 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Roles */}
      <p className="text-sm italic font-boldonse text-accent ">
        {tech?.join(" ● ")}
      </p>

      {/* Project Title */}
      <h4 className="text-2xl font-boldonse font-semibold text-accent">{name}</h4>

      {/* View Button */}
      <div className='flex gap-2'>

        {livelink && (
          <a
            href={livelink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-fit  text-accent border border-accent px-4 py-1 rounded-full text-sm hover:bg-accent hover:text-white transition"
          >
            View
          </a>
        )}
        {livelink && (
          <a
            href={livelink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block  text-accent border border-accent p-3 rounded-full text-sm hover:bg-accent hover:text-white transition"
          >
            <FaGithub />
          </a>
        )}
      </div>
    </div>
  )
}

export default Projects