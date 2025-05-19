// import { useRef, useState, } from 'react';
// import { Element } from 'react-scroll';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import AnimatedText from '@/components/AnimatedText';
// import Load from '@/components/Load';
// import { useGSAP } from '@gsap/react';
// import { FiArrowDownRight } from 'react-icons/fi';

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//     const [onLoadComplete, setOnLoadComplete] = useState(false);
//     const sectionRef = useRef(null);
//     const buttonref = useRef(null);
//     const heroref = useRef(null);

//     useGSAP(() => {
//         if (heroref.current) {
//             gsap.set(buttonref.current, {
//                 x: -400,
//                 opacity: 0,
//             });

//             gsap.set("#arrow", {
//                 x: -100,
//                 y: -100,
//                 opacity: 0,
//             });

//             gsap.set(heroref.current, {
//                 y: 700,
//                 clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
//             });

//             gsap.to(buttonref.current, {
//                 x: 0,
//                 opacity: 1,
//                 duration: 1,
//                 ease: "power3.inOut",
//             });

//             gsap.to("#arrow", {
//                 x: 0,
//                 y: 0,
//                 opacity: 1,
//                 duration: 1,
//                 ease: "power3.inOut",
//             });
//             gsap.to(heroref.current, {
//                 clipPath: "inset(0 0 0 0)",
//                 y: 0,
//                 duration: 1,
//                 ease: "power3.inOut",
//             });
//         }
//     }, {
//         scope: sectionRef,
//         dependencies: [onLoadComplete]
//     });

//     return (
//         <Element name="Home">
//             <section
//                 ref={sectionRef}
//                 className="relative h-screen w-screen flex justify-center items-center bg-center bg-cover overflow-hidden"
//             >
//                 <Load setOnLoadComplete={setOnLoadComplete} />
//                 {onLoadComplete && (
//                     <div className='flex flex-col items-stretch justify-center w-full'>
//                         <h1
//                             className="text-[13vw] h-[60vh] flex justify-center items-center text-white font-boldonse overflow-hidden pb-4 md:pb-8 z-10"
//                         >
//                             <AnimatedText
//                                 revert={true}
//                                 text={"Hassaammgl"}
//                                 className="text-center"
//                                 hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//                             />
//                         </h1>
//                         <div className="flex items-start justify-between relative font-Audiowide ">
//                             <div className="w-1/3 px-10">
//                                 <FiArrowDownRight id='arrow' className='text-white text-5xl' />
//                                 <p className="text-xl md:text-2xl mb-8 leading-relaxed text-stone-200">
//                                     <AnimatedText
//                                         text={"I help growing brands and startups"}
//                                         className="text-center"
//                                         splitByWords
//                                         hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//                                     />
//                                     <br />
//                                     <AnimatedText
//                                         text={"gain an unfair advantage through premium, results driven websites."}
//                                         className="text-start"
//                                         splitByWords
//                                         hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//                                     />
//                                     <br />
//                                 </p>

//                                 <button ref={buttonref}
//                                     className="inline-flex items-center px-8 py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
//                                 >
//                                     BOOK A CALL
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             <div ref={heroref} className="w-1/3">
//                                 <img
//                                     src="/hero/hero.png"
//                                     alt="Portrait photo of hassaam"
//                                     className="absolute -top-72 object-cover"
//                                 />
//                             </div>

//                             <div className="w-1/3 text-right px-20 h-full  mt-auto">
//                                 <div className='text-white '>
//                                     <p className="text-stone-600 text-sm mb-1">AVAILABLE FOR WORK</p>
//                                     <h3 className="text-5xl md:text-6xl font-bold tracking-tighter">{Months[new Date().getMonth()]}' {new Date().getDate()}</h3>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )
//                 }
//             </section>
//         </Element>
//     );
// };

// export default Hero;

// const Months = {
//     0: "Jan",
//     1: "Feb",
//     2: "Mar",
//     3: "Apr",
//     4: "May",
//     5: "Jun",
//     6: "Jul",
//     7: "Aug",
//     8: "Sep",
//     9: "Oct",
//     10: "Nov",
//     11: "Dec",
// }


import { useRef, useState } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/AnimatedText';
import Load from '@/components/Load';
import { useGSAP } from '@gsap/react';
import { FiArrowDownRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [onLoadComplete, setOnLoadComplete] = useState(false);
    const sectionRef = useRef(null);
    const buttonref = useRef(null);
    const heroRef = useRef(null);

    useGSAP(() => {
        if (buttonref.current) {
            gsap.set(buttonref.current, {
                x: -400,
                opacity: 0,
            });

            gsap.set("#arrow", {
                x: -100,
                y: -100,
                opacity: 0,
            });

            gsap.set(heroRef.current, {
                y: 600,
                opacity: 0,
            });

            const tl = gsap.timeline();

            tl
                .to(buttonref.current, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                }, 0.2)
                .to("#arrow", {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                }, 0.2)
                .to(heroRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.inOut",
                }, 0.2);
        }
    }, {
        scope: sectionRef,
        dependencies: [onLoadComplete]
    });

    const date = `${Months[new Date().getMonth()]}' ${new Date().getDate()}`

    return (
        <Element name="Home">
            <section
                ref={sectionRef}
                className="relative h-[110vh] w-screen flex justify-center items-center bg-center bg-cover overflow-hidden"
            >
                <Load setOnLoadComplete={setOnLoadComplete} />
                {onLoadComplete && (
                    <div className='flex flex-col items-stretch justify-center w-full'>
                        <h1 className="text-[13vw] h-[60vh] flex justify-center items-center text-white font-boldonse overflow-hidden pb-4 md:pb-8 z-10 ">
                            <AnimatedText
                                revert={true}
                                text={"Hassaammgl"}
                                className="text-center"
                                hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
                            />
                        </h1>
                        <div className="flex items-start justify-between relative font-Audiowide">
                            <div className="w-1/3 px-10">
                                <FiArrowDownRight id='arrow' className='text-white text-5xl mb-4' />
                                <p className="text-xl md:text-2xl mb-8 leading-relaxed text-stone-200">
                                    <AnimatedText
                                        text={"I help growing brands and startups gain an unfair advantage through premium, results driven websites."}
                                        className="text-center"
                                        splitByWords
                                        hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
                                    />
                                </p>
                                <button
                                    ref={buttonref}
                                    className="inline-flex items-center px-8 py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
                                >
                                    BOOK A CALL
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-1/3 relative ">
                                <img
                                    ref={heroRef}
                                    src="/hero/hero.png"
                                    alt="Portrait photo of hassaam"
                                    className="absolute object-cover -top-72"
                                />
                            </div>
                            <div className="w-1/3 text-right px-20 h-full mt-auto">
                                <div className='text-white'>
                                    <p className=" text-stone-600 text-sm mb-1"><AnimatedText start='top bottom' text={"AVAILABLE FOR WORK"} /></p>
                                    <h3 className=" text-5xl md:text-6xl font-bold tracking-tighter">
                                        <AnimatedText start='top bottom' text={date} />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Element>
    );
};

export default Hero;

const Months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
];
