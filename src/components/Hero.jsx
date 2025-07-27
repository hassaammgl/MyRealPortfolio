import { useState, memo } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/utils/AnimatedText';
import Load from '@/layout/Load';
import BottomSection from '@/utils/BottomSection';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [onLoadComplete, setOnLoadComplete] = useState(false);

    return (
        <Element name="Home">
            <section
                id='hero'
                className="relative min-h-screen w-screen flex justify-center items-center bg-center bg-cover overflow-hidden px-4 md:px-8"
            >
                <Load setOnLoadComplete={setOnLoadComplete} />
                {onLoadComplete && (
                    <div className='w-full px-4 md:px-8'>
                        <TopSection />
                        <BottomSection onLoadComplete={onLoadComplete} />
                    </div>
                )}
            </section>
        </Element>
    );
};

export default Hero;

const TopSection = memo(() => {
    return <h1 className=" h-[50vh] text-[11vw] lg:text-[12vw] flex justify-center items-center text-white font-boldonse z-10">
        <AnimatedText
            revert={true}
            text={"Hassaammgl"}
            className="text-center relative z-10"
            hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
        />
    </h1>
})
