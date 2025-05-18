import { useRef, useState, useEffect, useCallback } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/AnimatedText';
import Load from '@/components/Load';
import { IMAGES } from '@/constants';
import { SocialLinks, Stats } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

const IMAGE_TRANSITION_DURATION = 1;
const AUTO_PLAY_INTERVAL = 7000;

const Hero = () => {
    const [onLoadComplete, setOnLoadComplete] = useState(false);
    const sectionRef = useRef(null);

    return (
        <Element name="Home">
            <section
                ref={sectionRef}
                className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover overflow-hidden"
            >
                <Load setOnLoadComplete={setOnLoadComplete} />

            </section>
        </Element>
    );
};

export default Hero;
