// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { LANGS } from "@/constants";

// gsap.registerPlugin(ScrollTrigger);

// const Skills = () => {
//     const containerRef = useRef(null);
//     const panelsRef = useRef([]);
//     const panelWrapperRef = useRef(null);

//     useGSAP(() => {
//         const ctx = gsap.context(() => {
//             // Vertical pin setup
//             ScrollTrigger.create({
//                 trigger: containerRef.current,
//                 start: "top top",
//                 end: "+=300%",
//                 pin: true,
//                 anticipatePin: 1,
//             });

//             // Panel animations
//             panelsRef.current.forEach((panel, index) => {
//                 gsap.from(panel, {
//                     opacity: 0,
//                     y: 100,
//                     scale: 0.8,
//                     rotateY: 45,
//                     scrollTrigger: {
//                         trigger: panel,
//                         containerAnimation: undefined, // Remove container animation reference
//                         start: "top 80%",
//                         end: "top 30%",
//                         scrub: 1,
//                         toggleActions: "play none none reverse",
//                     },
//                     ease: "power2.out",
//                     duration: 0.8,
//                     delay: index * 0.1,
//                 });
//             });

//             // Horizontal scroll setup
//             const panelsWidth = panelWrapperRef.current?.scrollWidth || 0;
//             const movement = panelsWidth - window.innerWidth;

//             gsap.to(panelWrapperRef.current, {
//                 x: -movement,
//                 ease: "none",
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "+=300%",
//                     scrub: 1,
//                     invalidateOnRefresh: true,
//                 },
//             });
//         }, containerRef);

//         return () => ctx.revert();
//     }, { scope: containerRef });

//     return (
//         <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
//             <div
//                 ref={panelWrapperRef}
//                 className="flex h-screen items-center gap-10 px-4 md:px-20 will-change-transform"
//             >
//                 {LANGS.map((lang, index) => (
//                     <a
//                         key={lang.name}
//                         href={lang.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         ref={el => panelsRef.current[index] = el}
//                         className="flex flex-col items-center justify-center min-w-[300px] md:min-w-[400px] h-[60vh] rounded-3xl bg-white/5 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300 will-change-transform"
//                         style={{
//                             backgroundColor: `${lang.bgcolor}20`,
//                         }}
//                     >
//                         <div
//                             className="text-6xl mb-4"
//                             style={{ color: lang.bgcolor }}
//                         >
//                             {lang.icon}
//                         </div>
//                         <h2 className="text-2xl md:text-3xl font-bold text-white">{lang.name}</h2>
//                     </a>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Skills;

import React from 'react'
import AnimatedText from '@/components/AnimatedText'

const Skills = () => {
    return (
        <div className='relative w-full h-fit overflow-hidden bg-secondary flex justify-center items-center'>
            <h1 className='text-white font-brittany hover:text-accent text-5xl '>
                <AnimatedText text={"Skills"} />
                <sup><AnimatedText className='text-sm' text={"(Some are even useful!)"} /></sup>
            </h1>
        </div>
    )
}

export default Skills
