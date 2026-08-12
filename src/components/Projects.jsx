import { useEffect, useRef } from 'react'
import { Element } from 'react-scroll'
import AnimatedText from '@/utils/AnimatedText'
import { useProjectHoverStore } from "@/store"
import { PROJECTS } from "@/constants"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6"

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const projectsSectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".project-row").forEach((row) => {
                const media = row.querySelector(".project-media")
                const content = row.querySelector(".project-content")
                const indexEl = row.querySelector(".project-index")

                gsap.fromTo(
                    [indexEl, media, content],
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                )
            })
        }, projectsSectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <Element name="Projects">
            <section ref={projectsSectionRef} className="relative w-screen overflow-hidden pb-24 md:pb-32">
                <div className="w-full px-6 md:px-12 pt-10 md:pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div data-cursor-hover className="text-white font-boldonse font-extrabold overflow-hidden flex flex-col gap-1 md:gap-2">
                        <AnimatedText
                            className="uppercase text-[12vw] md:text-[7vw] leading-none hover:text-accent transition-colors duration-500"
                            text="Selected"
                        />
                        <AnimatedText
                            className="font-extralight font-brittany text-[12vw] md:text-[6vw] leading-none text-accent"
                            text="Cases"
                        />
                    </div>
                    <p className="max-w-xs font-roboto text-white/60 text-sm md:text-base md:text-right pb-2">
                        A mix of shipped products and focused builds — hover to explore.
                    </p>
                </div>

                <div className="mt-12 md:mt-20 border-t border-white/10">
                    {PROJECTS.map((project, index) => (
                        <ProjectRow
                            key={project._id}
                            index={index}
                            {...project}
                        />
                    ))}
                </div>
            </section>
        </Element>
    )
}

const ProjectRow = ({ name, tech, image, livelink, preview, githublink, index }) => {
    const { setIsHoverOnProjects } = useProjectHoverStore()
    const rowRef = useRef(null)
    const previewRef = useRef(null)
    const mediaRef = useRef(null)
    const isReversed = index % 2 === 1
    const number = String(index + 1).padStart(2, "0")

    useEffect(() => {
        const row = rowRef.current
        const previewImg = previewRef.current
        const media = mediaRef.current
        if (!row || !previewImg || !media) return

        const onEnter = () => setIsHoverOnProjects(true)
        const onLeave = () => {
            setIsHoverOnProjects(false)
            gsap.to(previewImg, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                opacity: 0,
                duration: 0.55,
                ease: "power3.out",
            })
            gsap.to(media.querySelector(".project-gif"), {
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
            })
        }

        const onMove = (e) => {
            const rect = media.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5

            gsap.to(previewImg, {
                rotationY: x * 18,
                rotationX: y * -14,
                scale: 1.05,
                opacity: 1,
                transformPerspective: 900,
                transformOrigin: "center center",
                duration: 0.35,
                ease: "power2.out",
            })

            gsap.to(media.querySelector(".project-gif"), {
                scale: 1.06,
                duration: 0.6,
                ease: "power2.out",
            })
        }

        row.addEventListener("mouseenter", onEnter)
        row.addEventListener("mouseleave", onLeave)
        media.addEventListener("mousemove", onMove)

        return () => {
            row.removeEventListener("mouseenter", onEnter)
            row.removeEventListener("mouseleave", onLeave)
            media.removeEventListener("mousemove", onMove)
        }
    }, [setIsHoverOnProjects])

    return (
        <article
            ref={rowRef}
            className={`project-row group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center px-6 md:px-12 py-14 md:py-20 border-b border-white/10 ${
                isReversed ? "lg:[direction:rtl]" : ""
            }`}
        >
            <span
                className={`project-index pointer-events-none absolute top-6 ${
                    isReversed ? "left-6 md:left-12" : "right-6 md:right-12"
                } font-boldonse text-[18vw] md:text-[9vw] leading-none text-outline opacity-30 select-none lg:[direction:ltr]`}
            >
                {number}
            </span>

            <div
                ref={mediaRef}
                className="project-media relative lg:col-span-7 h-[42vh] md:h-[56vh] overflow-hidden rounded-2xl lg:[direction:ltr]"
            >
                <img
                    src={image}
                    alt={name}
                    className="project-gif h-full w-full object-cover will-change-transform"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80" />
                <img
                    ref={previewRef}
                    src={preview}
                    alt={`${name} preview`}
                    className="pointer-events-none absolute inset-0 m-auto h-2/3 w-[55%] rounded-xl object-cover opacity-0 shadow-2xl shadow-black/50 border border-white/20"
                    style={{ transformStyle: "preserve-3d" }}
                />
            </div>

            <div className="project-content lg:col-span-5 flex flex-col gap-5 lg:[direction:ltr] relative z-10">
                <p className="font-syne-mono text-xs md:text-sm tracking-[0.2em] uppercase text-accent/90">
                    {tech?.join(" / ")}
                </p>

                <h3
                    data-cursor-hover
                    className="font-boldonse text-3xl md:text-5xl lg:text-6xl text-white leading-[1.05] group-hover:text-accent transition-colors duration-500"
                >
                    <AnimatedText text={name} />
                </h3>

                <div className="flex items-center gap-6 pt-2">
                    {livelink && (
                        <a
                            href={livelink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-roboto text-sm md:text-base text-white border-b border-white/40 pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
                        >
                            Live demo
                            <FaArrowUpRightFromSquare className="text-xs" />
                        </a>
                    )}
                    {githublink && (
                        <a
                            href={githublink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-roboto text-sm md:text-base text-white/70 hover:text-white transition-colors duration-300"
                        >
                            <FaGithub className="text-lg" />
                            Code
                        </a>
                    )}
                </div>
            </div>
        </article>
    )
}

export default Projects
