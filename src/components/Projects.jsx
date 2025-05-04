// import React, { useEffect, useRef } from 'react'
// import { Element } from 'react-scroll'
// import AnimatedText from './AnimatedText'
// import { useProjectHoverStore } from "@/store"
// import { PROJECTS } from "@/constants"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { FaGithub } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger)

// const Projects = () => {
//   const projectsSectionRef = useRef(null)
//   const column1Ref = useRef(null)
//   const column2Ref = useRef(null)
//   const projects1 = PROJECTS.slice(0, 3)
//   const projects2 = PROJECTS.slice(3)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Column animations
//       gsap.fromTo([column1Ref.current, column2Ref.current],
//         {
//           x: (index) => index === 0 ? -100 : 100,
//           opacity: 0
//         },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 1.5,
//           ease: "power4.out",
//           scrollTrigger: {
//             trigger: projectsSectionRef.current,
//             start: "top 80%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse"
//           },
//           stagger: 0.3
//         }
//       )

//       // Project card animations
//       gsap.utils.toArray(".project-card").forEach((card, i) => {
//         gsap.fromTo(card,
//           { y: 50, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "back.out(1.7)",
//             scrollTrigger: {
//               trigger: card,
//               start: "top 90%",
//               toggleActions: "play none none none"
//             },
//             delay: i * 0.1
//           }
//         )
//       })
//     }, projectsSectionRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <Element name="Projects">
//       <section ref={projectsSectionRef} className="relative h-fit w-screen">
//         <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-start flex-col gap-4'>
//           <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"Selected"} />
//           <AnimatedText className=' text-end w-1/3 font-extralight font-brittany text-[9vw] hover:text-accent transition-all ease-in-out duration-500' text={"Cases"} />
//         </div>
//         <div className="w-full p-12 flex">
//           <div ref={column1Ref} className="w-1/2 flex justify-start gap-72 items-center flex-col px-9">
//             {projects1.map((value) => (
//               <ProjectCard key={value._id} {...value} />
//             ))}
//           </div>
//           <div ref={column2Ref} className="w-1/2 mt-48 flex justify-start gap-72 items-center flex-col">
//             {projects2.map((value) => (
//               <ProjectCard key={value._id} {...value} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </Element>
//   )
// }

// const ProjectCard = ({ name, tech, image, livelink, preview }) => {
//   const { setIsHoverOnProjects } = useProjectHoverStore()
//   const cardRef = useRef(null)
//   const previewRef = useRef(null)

//   useEffect(() => {
//     const projCard = cardRef.current
//     const previewImg = previewRef.current

//     // Mouse enter/leave for project hover state
//     projCard.addEventListener('mouseenter', () => setIsHoverOnProjects(true))
//     projCard.addEventListener('mouseleave', () => setIsHoverOnProjects(false))

//     // Tilt animation setup
//     let tiltAnimation
//     if (previewImg) {
//       tiltAnimation = gsap.to(previewImg, {
//         rotateX: 0,
//         rotateY: 0,
//         scale: 1.05,
//         transformPerspective: 1000,
//         ease: "power2.out",
//         duration: 0.5,
//         paused: true
//       })

//       // Mouse move handler
//       const handleMouseMove = (e) => {
//         const rect = previewImg.getBoundingClientRect()
//         const centerX = rect.left + rect.width / 2
//         const centerY = rect.top + rect.height / 2
//         const offsetX = (e.clientX - centerX) / rect.width
//         const offsetY = (e.clientY - centerY) / rect.height

//         gsap.to(previewImg, {
//           duration: 0.5,
//           rotateX: offsetY * -15, // Invert Y axis
//           rotateY: offsetX * 15,
//           ease: "power2.out"
//         })
//       }

//       // Reset animation
//       const handleMouseLeave = () => {
//         gsap.to(previewImg, {
//           duration: 0.7,
//           rotateX: 0,
//           rotateY: 0,
//           scale: 1,
//           ease: "elastic.out(1, 0.5)"
//         })
//       }

//       previewImg.addEventListener('mousemove', handleMouseMove)
//       previewImg.addEventListener('mouseleave', handleMouseLeave)

//       return () => {
//         previewImg.removeEventListener('mousemove', handleMouseMove)
//         previewImg.removeEventListener('mouseleave', handleMouseLeave)
//         tiltAnimation?.kill()
//       }
//     }
//   }, [])

//   return (
//     <div ref={cardRef} className="project-card flex flex-col gap-4 group cursor-none">
//       {/* Project Image */}
//       <div className="overflow-hidden rounded-md shadow-lg relative">
//         <img
//           src={image}
//           alt={name}
//           className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         <img
//           ref={previewRef}
//           src={preview}
//           alt={`${name} Preview`}
//           className="absolute inset-0 rounded-2xl border-2 h-2/3 object-cover m-auto w-1/2 transition-transform duration-300 transform-style-preserve-3d" // Add this class
//         />
//       </div>

//       {/* Roles */}
//       <p className="text-sm italic font-boldonse text-accent ">
//         {tech?.join(" ● ")}
//       </p>

//       {/* Project Title */}
//       <h4 className="text-2xl font-boldonse font-semibold text-accent">{name}</h4>

//       {/* View Button */}
//       <div className='flex gap-2'>

//         {livelink && (
//           <a
//             href={livelink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex justify-center items-center w-fit  text-accent border border-accent px-4 py-1 rounded-full text-sm hover:bg-accent hover:text-white transition"
//           >
//             View
//           </a>
//         )}
//         {livelink && (
//           <a
//             href={livelink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block  text-accent border border-accent p-3 rounded-full text-sm hover:bg-accent hover:text-white transition"
//           >
//             <FaGithub />
//           </a>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Projects

import React, { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from './AnimatedText'
import { useProjectHoverStore } from "@/store"
import { PROJECTS } from "@/constants"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaGithub } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const projectsSectionRef = useRef(null)
  const column1Ref = useRef(null)
  const column2Ref = useRef(null)
  const projects1 = PROJECTS.slice(0, 3)
  const projects2 = PROJECTS.slice(3)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([column1Ref.current, column2Ref.current],
        { x: (index) => index === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.5, ease: "power4.out",
          scrollTrigger: { trigger: projectsSectionRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" },
          stagger: 0.3
        }
      )

      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
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
            {projects1.map((value) => <ProjectCard key={value._id} {...value} />)}
          </div>
          <div ref={column2Ref} className="w-1/2 mt-48 flex justify-start gap-72 items-center flex-col">
            {projects2.map((value) => <ProjectCard key={value._id} {...value} />)}
          </div>
        </div>
      </section>
    </Element>
  )
}

const ProjectCard = ({ name, tech, image, livelink, preview }) => {
  const { setIsHoverOnProjects } = useProjectHoverStore()
  const cardRef = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    const projCard = cardRef.current
    const previewImg = previewRef.current

    projCard.addEventListener('mouseenter', () => setIsHoverOnProjects(true))
    projCard.addEventListener('mouseleave', () => setIsHoverOnProjects(false))

    const handleMouseMove = (e) => {
      const rect = previewImg.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const centerX = x - 0.5
      const centerY = y - 0.5

      gsap.to(previewImg, {
        rotationY: centerX * 20,
        rotationX: centerY * -20,
        transformPerspective: 1000,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: 0.5
      })
    }

    const handleMouseLeave = () => {
      gsap.to(previewImg, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      })
    }

    previewImg.addEventListener('mousemove', handleMouseMove)
    previewImg.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      previewImg.removeEventListener('mousemove', handleMouseMove)
      previewImg.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className="project-card flex flex-col gap-4 group ">
      <div className="overflow-hidden rounded-md shadow-lg relative">
        <img src={image} alt={name} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <img
          ref={previewRef}
          src={preview}
          alt={`${name} Preview`}
          className="absolute inset-0 rounded-2xl border-2 h-2/3 object-cover m-auto w-1/2 transition-all duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        />
      </div>
      <p className="text-sm italic font-boldonse text-accent">{tech?.join(" ● ")}</p>
      <h4 className="text-2xl font-boldonse font-semibold text-accent">{name}</h4>
      <div className='flex gap-2'>
        {livelink && (
          <>
            <a href={livelink} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-fit text-accent border border-accent px-4 py-1 rounded-full text-sm hover:bg-accent hover:text-white transition">
              View
            </a>
            <a href={livelink} target="_blank" rel="noopener noreferrer" className="inline-block text-accent border border-accent p-3 rounded-full text-sm hover:bg-accent hover:text-white transition">
              <FaGithub />
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default Projects