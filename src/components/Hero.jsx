// import { useRef, useState } from 'react';
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
//     const heroRef = useRef(null);

//     useGSAP(() => {
//         if (buttonref.current) {
//             gsap.set(buttonref.current, {
//                 x: -400,
//                 opacity: 0,
//             });

//             gsap.set("#arrow", {
//                 x: -100,
//                 y: -100,
//                 opacity: 0,
//             });

//             gsap.set(heroRef.current, {
//                 y: 600,
//                 opacity: 0,
//             });

//             const tl = gsap.timeline();

//             tl
//                 .to(buttonref.current, {
//                     x: 0,
//                     opacity: 1,
//                     duration: 1,
//                     ease: "power3.inOut",
//                 }, 0.2)
//                 .to("#arrow", {
//                     x: 0,
//                     y: 0,
//                     opacity: 1,
//                     duration: 1,
//                     ease: "power3.inOut",
//                 }, 0.2)
//                 .to(heroRef.current, {
//                     y: 0,
//                     opacity: 1,
//                     duration: 1,
//                     ease: "power3.inOut",
//                 }, 0.2);
//         }
//     }, {
//         scope: sectionRef,
//         dependencies: [onLoadComplete]
//     });

//     const date = `${Months[new Date().getMonth()]}' ${new Date().getDate()}`

//     return (
//         <Element name="Home">
//             <section
//                 ref={sectionRef}
//                 className="relative min-h-screen w-screen flex justify-center items-center bg-center bg-cover overflow-hidden"
//             >
//                 <Load setOnLoadComplete={setOnLoadComplete} />
//                 {onLoadComplete && (
//                     <div className='flex flex-col items-stretch justify-center w-full px-4 md:px-8'>
//                         <h1 className="text-[12vw] lg:text-[13vw] min-h-[40vh] md:min-h-[50vh] flex justify-center items-center text-white font-boldonse overflow-hidden pb-4 md:pb-8 z-10">
//                             <AnimatedText
//                                 revert={true}
//                                 text={"Hassaammgl"}
//                                 className="text-center"
//                                 hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//                             />
//                         </h1>

//                         <div className="flex flex-col lg:flex-row items-start justify-between relative font-Audiowide gap-8 md:gap-12">
//                             {/* Left Column */}
//                             <div className="w-full lg:w-1/3 px-4 md:px-6 lg:px-8 order-1 lg:order-1">
//                                 <FiArrowDownRight id='arrow' className='text-white text-3xl md:text-4xl lg:text-5xl mb-4' />
//                                 <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed text-stone-200">
//                                     <AnimatedText
//                                         text={"I help growing brands and startups gain an unfair advantage through premium, results driven websites."}
//                                         className="text-center lg:text-left"
//                                         splitByWords
//                                         hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//                                     />
//                                 </p>
//                                 <button
//                                     ref={buttonref}
//                                     className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors text-sm md:text-base"
//                                 >
//                                     BOOK A CALL
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             {/* Center Image */}
//                             <div className="hidden lg:w-1/3 relative order-3 lg:order-2 h-[300px] md:h-[400px] lg:h-auto">
//                                 <img
//                                     ref={heroRef}
//                                     src="/hero/hero.png"
//                                     alt="Portrait photo of hassaam"
//                                     className="absolute object-contain w-full h-full lg:object-cover lg:-top-48 xl:-top-72"
//                                 />
//                             </div>

//                             {/* Right Column */}
//                             {/* <div className="w-full lg:w-1/3 px-4 md:px-8 flex flex-col items-end mt-4 lg:mt-0 border-2 border-accent text-white order-2 lg:order-3">  
//                                 <p className="text-stone-600 text-xs md:text-sm mb-1">
//                                     <AnimatedText splitByWords start='top bottom' text={"AVAILABLE FOR WORK"} />
//                                 </p>
//                                 <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
//                                     <AnimatedText start='top bottom' splitByWords text={date} />
//                                 </h3>
//                             </div> */}
//                             <div className="w-full lg:w-1/3 px-4 md:px-8 lg:mt-auto lg:flex lg:flex-col lg:items-end lg:justify-end">
//                                 <div className='text-white text-right lg:self-end'>
//                                     <p className="text-stone-600 text-xs md:text-sm mb-1">
//                                         <AnimatedText text={"AVAILABLE FOR WORK"} />
//                                     </p>
//                                     <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
//                                         <AnimatedText text={date} />
//                                     </h3>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </section>
//         </Element>
//     );
// };

// export default Hero;

// const Months = [
//     "Jan", "Feb", "Mar",
//     "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep",
//     "Oct", "Nov", "Dec"
// ];

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
                className="relative min-h-screen w-screen flex justify-center items-center bg-center bg-cover overflow-hidden px-4 md:px-8"
            >
                <Load setOnLoadComplete={setOnLoadComplete} />
                {onLoadComplete && (
                    <div className='flex flex-col items-stretch justify-center w-full px-4 md:px-8'>
                        <h1 className="text-[11vw] lg:text-[12vw] flex justify-center items-center text-white font-boldonse z-10">
                            <AnimatedText
                                revert={true}
                                text={"Hassaammgl"}
                                className="text-center"
                                hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
                            />
                        </h1>

                        <div className="flex flex-col font-Audiowide lg:flex-row items-start justify-between gap-8 md:gap-12 w-full">
                            {/* Left Column - Content */}
                            <div className="w-full lg:w-1/3 px-0 md:px-2 lg:px-4">
                                <div className='text-white text-left w-full mt-42 p-4 md:p-6 lg:p-8'>
                                    <FiArrowDownRight id='arrow' className='text-white text-3xl md:text-4xl lg:text-5xl mb-4' />
                                    <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed text-stone-200">
                                        <AnimatedText
                                            text={"I help growing brands and startups gain an unfair advantage through premium, results driven websites."}
                                            className="text-left"
                                            splitByWords
                                            hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
                                        />
                                    </p>
                                    <button
                                        ref={buttonref}
                                        className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors text-sm md:text-base"
                                    >
                                        BOOK A CALL
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Center Image */}
                            <div className="w-full hidden lg:w-1/3 relative h-[300px] md:h-[400px] lg:h-[600px] lg:flex items-center justify-center">
                                <img
                                    ref={heroRef}
                                    src="/hero/hero.png"
                                    alt="Portrait photo of hassaam"
                                    className="absolute object-contain w-full h-full lg:object-cover"
                                />
                            </div>

                            {/* Right Column - Date (aligned bottom on desktop) */}
                            <div className="w-full lg:w-1/3 px-0 md:px-2 lg:px-4 lg:flex lg:flex-col lg:justify-end lg:items-end lg:self-stretch">
                                <div className='text-white text-right w-full lg:mt-auto'>
                                    <p className="text-stone-600 text-xs md:text-sm mb-1">
                                        <AnimatedText
                                            splitByWords
                                            start='top bottom'
                                            text={"AVAILABLE FOR WORK"}
                                        />
                                    </p>
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                                        {/* <AnimatedText
                                            start='top bottom'
                                            splitByWords
                                            text={date}
                                        /> */}
                                        {date}
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