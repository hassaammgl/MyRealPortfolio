// import { useState, memo } from 'react';
// import { Element } from 'react-scroll';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import AnimatedText from '@/utils/AnimatedText';
// import Load from '@/layout/Load';
// import BottomSection from '@/utils/BottomSection';

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//     const [onLoadComplete, setOnLoadComplete] = useState(false);

//     return (
//         <Element name="Home">
//             <section
//                 id='hero'
//                 className="relative min-h-screen w-screen flex justify-center items-center bg-center bg-cover overflow-hidden px-4 md:px-8"
//             >
//                 <Load setOnLoadComplete={setOnLoadComplete} />
//                 {onLoadComplete && (
//                     <div className='w-full px-4 md:px-8'>
//                         <TopSection />
//                         <BottomSection onLoadComplete={onLoadComplete} />
//                     </div>
//                 )}
//             </section>
//         </Element>
//     );
// };

// export default Hero;

// const TopSection = memo(() => {
//     return <h1 className=" h-[50vh] text-[11vw] lg:text-[12vw] flex justify-center items-center text-white font-boldonse z-10">
//         <AnimatedText
//             revert={true}
//             text={"Hassaammgl"}
//             className="text-center relative z-10"
//             hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
//         />
//     </h1>
// })
import { useState, memo } from "react";
import { Element } from "react-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Load from "@/layout/Load";
import AnimatedText from "@/utils/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [onLoadComplete, setOnLoadComplete] = useState(false);

  return (
    <Element name="Home">
      <section
        id="hero"
        className="relative min-h-screen w-screen flex justify-center items-center bg-center bg-cover overflow-hidden px-4 md:px-8"
      >
        <div className="bg-gradient-to-b from-transparent to-black absolute bottom-0 h-40 left-0 w-full z-20" />
        <Load setOnLoadComplete={setOnLoadComplete} />
        {onLoadComplete && (
          <div className="w-full px-4 md:px-8">
            <TopSection />
            <HeroImgs />
          </div>
        )}
      </section>
    </Element>
  );
};

const TopSection = memo(() => {
  return (
    <h1 className=" h-[50vh] text-[14vw] lg:text-[15vw] flex justify-center items-center text-white font-dystopian z-10">
      <AnimatedText
        revert={true}
        text={"Hassaammgl"}
        className="text-center relative z-10"
        hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
      />
    </h1>
  );
});

const HeroImgs = memo(() => {
  return (
    <>
      <img
        src="/hero/NewHero2 (1).png"
        alt="hero"
        className="absolute dark:hidden h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src="/hero/NewHero (1).png"
        alt="hero"
        className="absolute hidden dark:block h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
});

export default Hero;
