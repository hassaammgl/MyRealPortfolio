import React, { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from '@/utils/AnimatedText'
import { useProjectHoverStore } from "@/store"
import { PROJECTS } from "@/constants"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaGithub } from "react-icons/fa"
import { useGSAP } from '@gsap/react'

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
                gsap.fromTo(card, {
                    y: 50, opacity: 0,
                    display: "none"
                },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        display: "flex",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.1,
                    }
                )
            })
        }, projectsSectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <Element name="Projects">
            <section ref={projectsSectionRef} className="relative md:h-fit w-screen">
                <div data-cursor-hover className='text-white font-boldonse h-fit font-extrabold w-full overflow-hidden p-9 flex justify-start items-start flex-col gap-4'>
                    <AnimatedText className='uppercase text-[7vw] hover:text-accent text-center transition-all ease-in-out duration-500' text={"Selected"} />
                    <AnimatedText className=' text-end w-1/3 font-extralight font-brittany text-[9vw] hover:text-accent transition-all ease-in-out duration-500' text={"Cases"} />
                </div>
                <div className="w-full p-4 sm:p-12 flex flex-col lg:flex-row gap-20 ">
                    <div ref={column1Ref} className="lg:w-1/2 w-full flex justify-start gap-20 lg:gap-72 items-center flex-col sm:px-9">
                        {projects1.map((value) => <ProjectCard key={value._id} {...value} />)}
                    </div>
                    <div ref={column2Ref} className=" lg:w-1/2 w-full lg:mt-48 flex justify-start gap-20 lg:gap-72 items-center flex-col sm:px-9">
                        {projects2.map((value) => <ProjectCard key={value._id} {...value} />)}
                    </div>
                </div>
            </section>
        </Element>
    )
}

const ProjectCard = ({ name, tech, image, livelink, preview, githublink }) => {
    const { setIsHoverOnProjects } = useProjectHoverStore()
    const cardRef = useRef(null)
    const previewRef = useRef(null)
    const techs = `${tech?.join(" ● ")}`

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
    }, [setIsHoverOnProjects])

    useGSAP(() => {
        gsap.set("#refLinks", {
            y: -200,
            opacity: 0
        })
        gsap.set("#refLinks", {
            y: 0,
            opacity: 1,
            ease: "power3.inOut",
            duration: 1,
            delay: .9,
            scrollTrigger: {
                trigger: "#refLinks",
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        })
    })

    return (
        <div ref={cardRef} className="project-card flex flex-col gap-4 group w-full  h-fit bg-primary p-6 rounded-lg ">
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
            <p className="text-sm italic font-boldonse text-white hover:text-accent transition-colors ease-in-out duration-500"><AnimatedText text={techs} /></p>
            <h4 className="text-2xl font-boldonse font-semibold text-white hover:text-accent transition-colors ease-in-out duration-500"> <AnimatedText text={name} /> </h4>
            <div className='flex gap-2'>
                {livelink && (
                    <>
                        <a id='refLinks' href={livelink} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-fit text-white border border-accent px-4 py-1 rounded-full text-sm hover:bg-accent hover:text-white transition-colors ease-in-out duration-500">
                            View
                        </a>
                        <a id='refLinks' href={githublink} target="_blank" rel="noopener noreferrer" className="inline-block text-white border border-accent p-3 rounded-full text-sm hover:bg-accent hover:text-white transition-colors ease-in-out duration-500">
                            <FaGithub />
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}

export default Projects