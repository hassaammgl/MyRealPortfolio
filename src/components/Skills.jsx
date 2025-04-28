// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { LANGS } from "@/constants";
// import AnimatedText from '@/components/AnimatedText';
// import { ParticlesWrapper } from "@/components/Particles";
// import { Element } from 'react-scroll';

// gsap.registerPlugin(ScrollTrigger, useGSAP);

// const Skills = () => {
//     const containerRef = useRef(null);

//     useGSAP(() => {
//         const cards = gsap.utils.toArray(".card");

//         cards.forEach((card, index) => {
//             const nextCard = cards[index + 1];

//             if (nextCard) {
//                 ScrollTrigger.create({
//                     trigger: card,
//                     start: "top top",
//                     end: "bottom top",
//                     pin: true,
//                     pinSpacing: false,
//                     anticipatePin: 1,
//                 });

//                 ScrollTrigger.create({
//                     trigger: nextCard,
//                     start: "top 80%",
//                     onEnter: () => {
//                         gsap.to(card, {
//                             opacity: 0.3,
//                             scale: 0.95,
//                             duration: 0.3,
//                             ease: "power2.inOut"
//                         });
//                     },
//                     onLeaveBack: () => {
//                         gsap.to(card, {
//                             opacity: 1,
//                             scale: 1,
//                             duration: 0.3,
//                             ease: "power2.inOut"
//                         });
//                     },
//                 });
//             }
//         });

//         return () => {
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, { scope: containerRef });

//     return (
//         <Element name="Skills">
//             <div className="relative w-full z-10 overflow-hidden bg-secondary flex flex-col justify-center items-center">
//                 <h1 className='text-white font-bangers hover:text-accent text-7xl py-8'>
//                     <AnimatedText text={"Skills"} />
//                     <sup>
//                         <AnimatedText className='ml-5 text-sm font-brittany' text={"Some are even useful!"} />
//                     </sup>
//                 </h1>

//                 <div
//                     ref={containerRef}
//                     className="w-full relative"
//                     style={{ height: `${LANGS.length * 60}vh` }}
//                 >
//                     {LANGS.map((data, index) => (
//                         <Cards key={index} data={data} index={index} totalCards={LANGS.length} />
//                     ))}
//                 </div>
//             </div>
//         </Element>
//     );
// };

// const Cards = ({ data, index, totalCards }) => {
//     const cardRef = useRef(null);

//     return (
//         <div
//             ref={cardRef}
//             className={`card absolute top-0 left-0 w-full h-[60vh] flex items-center justify-center
//         ${index === totalCards - 1 ? 'sticky' : ''}`}
//             style={{
//                 zIndex: index + 10,
//                 top: `${index * 60}vh`,
//             }}
//         >
//             <div className="border-2 rounded-xl w-4/5 h-4/5 flex items-center justify-center bg-primary">
//                 <h2 className="text-4xl font-bold text-white">{data.name}</h2>
//             </div>
//         </div>
//     );
// };


// export default Skills;

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LANGS } from "@/constants";
import AnimatedText from '@/components/AnimatedText';
import { ParticlesWrapper } from "@/components/Particles";
import { Element } from 'react-scroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".card");

        cards.forEach((card, index) => {
            const nextCard = cards[index + 1];

            if (nextCard) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                });

                ScrollTrigger.create({
                    trigger: nextCard,
                    start: "top 80%",
                    onEnter: () => {
                        gsap.to(card, {
                            opacity: 0.3,
                            scale: 0.95,
                            duration: 0.3,
                            ease: "power2.inOut"
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(card, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.inOut"
                        });
                    },
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, { scope: containerRef });

    return (
        <Element name="Skills">
            <div className="relative w-full z-10 overflow-hidden bg-secondary flex flex-col justify-center items-center py-12">
                <h1 className='text-white font-bangers hover:text-accent text-7xl py-8 text-center'>
                    <AnimatedText text={"Skills"} />
                    <sup className="ml-2">
                        <AnimatedText className='text-xl md:text-2xl font-brittany' text={"Some are even useful!"} />
                    </sup>
                </h1>

                <div
                    ref={containerRef}
                    className="w-full relative"
                    style={{ height: `${LANGS.length * 100}vh` }}
                >
                    {LANGS.map((data, index) => (
                        <Cards key={index} data={data} index={index} totalCards={LANGS.length} />
                    ))}
                </div>
            </div>
        </Element>
    );
};

const Cards = ({ data, index, totalCards }) => {
    const cardRef = useRef(null);

    return (
        <div
            ref={cardRef}
            className={`card absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center
                ${index === totalCards - 1 ? 'sticky' : ''}`}
            style={{
                zIndex: totalCards - index, // Reverse z-index so first cards are on top
                top: `${index * 100}vh`,
            }}
        >
            <div className="border-2 border-accent rounded-xl w-11/12 md:w-4/5 h-4/5 flex flex-col items-center justify-center bg-primary backdrop-blur-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{data.name}</h2>
                {data.description && (
                    <p className="text-white/80 text-lg md:text-xl text-center max-w-2xl">
                        {data.description}
                    </p>
                )}
                {data.icon && (
                    <div className="mt-8 text-6xl">
                        {data.icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Skills;