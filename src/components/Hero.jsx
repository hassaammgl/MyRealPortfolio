// import { useRef, useState, } from 'react';
// import { Element } from 'react-scroll';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import AnimatedText from '@/components/AnimatedText';
// import Load from '@/components/Load';

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//     const [onLoadComplete, setOnLoadComplete] = useState(false);
//     const sectionRef = useRef(null);

//     return (
//         <Element name="Home">
//             <section
//                 ref={sectionRef}
//                 className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover overflow-hidden"
//             >
//                 <Load setOnLoadComplete={setOnLoadComplete} />
//                 {
//                     onLoadComplete && (
//                         <div className='flex flex-col items-center justify-center w-full'>
//                             <h1 className="text-[13vw] text-white font-boldonse overflow-hidden pb-4 md:pb-8">
//                                 <AnimatedText
//                                     text={"Hassaammgl"}
//                                     className="text-center"
//                                     hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//                                 />
//                             </h1>
//                             <div className="relative max-w-7xl flex flex-col items-center justify-start w-full h-[40vh] md:h-[50vh] rounded-xl md:rounded-2xl">
//                                 <video
//                                     className="w-full h-full object-cover absolute top-0 left-0"
//                                     autoPlay
//                                     loop
//                                     muted
//                                     playsInline
//                                     src="/hero/hero.mp4"
//                                 />
//                                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
//                                 <img src="/hero/hero.png" className="absolute z-10 -top-32 right-6 rounded-2xl" alt="" />
//                             </div>
//                         </div>
//                     )
//                 }
//             </section>
//         </Element>
//     );
// };

// export default Hero;
