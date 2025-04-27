// import { Element } from 'react-scroll';
// import React, { useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { LANGS } from '@/constants';
// import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger);

// const Skills = () => {
//     const sectionRef = useRef(null);

//     useGSAP(() => {

//     }, { scope: sectionRef })

//     return (
//         <Element name="Skills">
//             <section
//                 ref={sectionRef}
//                 className="relative h-dvh w-full overflow-hidden"
//             >
//             </section>
//         </Element>
//     );
// };

// export default Skills;


// import { Element } from "react-scroll";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { LANGS } from "@/constants";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// const Skills = () => {
//     const sectionRef = useRef(null);
//     const spheresRef = useRef([]);
//     const textsRef = useRef([]);
//     const particleContainer = useRef(null);

//     useGSAP(() => {
//         const ctx = gsap.context(() => {
//             spheresRef.current.forEach((sphere, index) => {
//                 const text = textsRef.current[index];
//                 const direction = index % 2 === 0 ? 100 : -100;

//                 gsap.fromTo(
//                     sphere,
//                     {
//                         opacity: 0,
//                         scale: 0.5,
//                         x: direction,
//                         y: 100,
//                     },
//                     {
//                         opacity: 1,
//                         scale: 1,
//                         x: 0,
//                         y: 0,
//                         scrollTrigger: {
//                             trigger: sphere,
//                             start: "top 85%",
//                             end: "top 50%",
//                             scrub: true,
//                             toggleActions: "play reverse play reverse",
//                         },
//                         duration: 1.5,
//                         ease: "power4.out",
//                     }
//                 );

//                 gsap.fromTo(
//                     text,
//                     {
//                         opacity: 0,
//                         x: direction / 2,
//                         y: 20,
//                     },
//                     {
//                         opacity: 1,
//                         x: 0,
//                         y: 0,
//                         scrollTrigger: {
//                             trigger: sphere,
//                             start: "top 85%",
//                             end: "top 50%",
//                             scrub: true,
//                             toggleActions: "play reverse play reverse",
//                         },
//                         duration: 1.5,
//                         ease: "power3.out",
//                     }
//                 );

//                 gsap.to(sphere, {
//                     opacity: 0,
//                     scale: 0.5,
//                     y: -100,
//                     scrollTrigger: {
//                         trigger: sphere,
//                         start: "top 50%",
//                         end: "top 20%",
//                         scrub: true,
//                     },
//                     duration: 1.5,
//                     ease: "power4.in",
//                 });

//                 gsap.to(text, {
//                     opacity: 0,
//                     y: -20,
//                     scrollTrigger: {
//                         trigger: sphere,
//                         start: "top 50%",
//                         end: "top 20%",
//                         scrub: true,
//                     },
//                     duration: 1.5,
//                     ease: "power3.in",
//                 });
//             });
//         }, sectionRef);

//         return () => ctx.revert();
//     }, { scope: sectionRef });

//     useEffect(() => {
//         const particleCount = 100;
//         const container = particleContainer.current;

//         for (let i = 0; i < particleCount; i++) {
//             const particle = document.createElement("div");
//             particle.classList.add("particle");
//             particle.style.top = `${Math.random() * 500}vh`;
//             particle.style.left = `${Math.random() * 100}%`;
//             particle.style.animationDuration = `${5 + Math.random() * 10}s`;
//             container.appendChild(particle);
//         }
//     }, []);

//     return (
//         <Element name="Skills">
//             <section
//                 ref={sectionRef}
//                 className="relative min-h-[600vh] w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-start pt-40"
//             >
//                 <div ref={particleContainer} className="particles"></div>

//                 <div className="sticky top-32 flex flex-col items-center justify-center z-10">
//                     {LANGS.map((lang, index) => (
//                         <a
//                             href={lang.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             key={index}
//                             className="flex flex-col items-center justify-center my-20 group cursor-pointer"
//                         >
//                             <div
//                                 ref={(el) => (spheresRef.current[index] = el)}
//                                 className="w-36 h-36 bg-gradient-to-br from-white/20 to-white/5 border border-white/20 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 glow"
//                                 style={{
//                                     perspective: "1000px",
//                                     backdropFilter: "blur(6px)",
//                                     backgroundColor: `${lang.bgcolor}20`,
//                                 }}
//                             >
//                                 <div className="text-5xl text-white">
//                                     {lang.icon}
//                                 </div>
//                             </div>
//                             <div
//                                 ref={(el) => (textsRef.current[index] = el)}
//                                 className="text-white mt-4 text-xl font-semibold opacity-80 tracking-wide group-hover:text-cyan-400 transition-all duration-300 text-center"
//                             >
//                                 {lang.name}
//                                 <div className="text-sm opacity-60 mt-1">
//                                     {lang.percentage}% Skill
//                                 </div>
//                             </div>
//                         </a>
//                     ))}
//                 </div>
//             </section>
//         </Element>
//     );
// };

// export default Skills;

import { Element } from "react-scroll";
import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LANGS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const containerRef = useRef(null);
    const ctx = useRef();
    const hoverTls = useRef([]);

    const handleMouseEnter = useCallback((card, hoverTL) => {
        return () => hoverTL.play();
    }, []);

    const handleMouseLeave = useCallback((hoverTL) => {
        return () => hoverTL.reverse();
    }, []);

    useEffect(() => {
        ctx.current = gsap.context(() => {
            gsap.set(containerRef.current, {
                perspective: 2000,
                transformStyle: "preserve-3d"
            });

            const setupCards = () => {
                const radius = window.innerWidth > 768 ? 400 : 200;
                const angleStep = (Math.PI * 2) / LANGS.length;

                cardsRef.current.forEach((card, index) => {
                    if (!card) return;

                    gsap.set(card, {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotationZ: 0,
                        opacity: 1
                    });

                    const hoverTL = gsap.timeline({ paused: true });
                    hoverTls.current[index] = hoverTL;

                    hoverTL.to(card, {
                        z: 50,
                        scale: 1.1,
                        rotationY: 10,
                        rotationX: 5,
                        duration: 0.3
                    });

                    card.addEventListener("mouseenter", handleMouseEnter(card, hoverTL));
                    card.addEventListener("mouseleave", handleMouseLeave(hoverTL));
                });
            };

            setupCards();

            const resizeHandler = () => {
                ScrollTrigger.refresh();
            };
            window.addEventListener("resize", resizeHandler);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const angle = (index * Math.PI * 2) / LANGS.length;
                const radius = window.innerWidth > 768 ? 400 : 200;

                tl.to(card, {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    rotationZ: angle * (180 / Math.PI),
                    duration: 2,
                    ease: "power4.out",
                    overwrite: true
                }, index * 0.1);
            });

            return () => {
                window.removeEventListener("resize", resizeHandler);
            };
        }, sectionRef);

        return () => {
            ctx.current?.revert();
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    const hoverTL = hoverTls.current[index];
                    card.removeEventListener("mouseenter", handleMouseEnter(card, hoverTL));
                    card.removeEventListener("mouseleave", handleMouseLeave(hoverTL));
                }
            });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [handleMouseEnter, handleMouseLeave]);

    return (
        <Element name="Skills">
            <section
                ref={sectionRef}
                className="relative h-screen w-full overflow-hidden bg-gray-900"
            >
                <div
                    ref={containerRef}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0"
                >
                    {LANGS.map((lang, index) => (
                        <div
                            key={`${lang.name}-${index}`}
                            ref={el => (cardsRef.current[index] = el)}
                            className="absolute w-48 h-48 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 transform-style-preserve-3d shadow-2xl cursor-pointer"
                        >
                            <div className="flex flex-col items-center justify-center h-full transform translate-z-20">
                                <div className="text-4xl mb-4">{lang.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {lang.name}
                                </h3>
                                <div className="text-sm text-white/80">
                                    {lang.percentage}% Mastery
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Element>
    );
};

export default React.memo(Skills);