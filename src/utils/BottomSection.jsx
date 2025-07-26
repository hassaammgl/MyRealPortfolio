import { useGSAP } from '@gsap/react';
import { FiArrowDownRight } from 'react-icons/fi';
import Three from '@/animated/Three';
import { useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/utils/AnimatedText';



const BottomSection = ({ onLoadComplete }) => {

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
        <div ref={sectionRef} className="lg:h-[50vh] flex flex-col font-Audiowide lg:flex-row items-start justify-between gap-8 md:gap-12 w-full">
            {/* Left Column - Content */}
            <div className="w-full lg:w-1/3  px-0 md:px-2 lg:px-4 lg:h-[50vh]">
                <div className='text-white text-start'>
                    <FiArrowDownRight id='arrow' className='text-white text-3xl md:text-4xl lg:text-5xl mb-4' />
                    <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed text-stone-200">
                        <AnimatedText
                            text={"I help growing brands and startups gain an unfair advantage through premium, results driven websites."}
                            className="text-left"
                            splitByWords
                            hoverClass="hover:text-accent transition-colors duration-500 ease-in-out"
                        />
                    </p>
                    <a href="tel:+923268821210">
                        <button
                            ref={buttonref}
                            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors text-sm md:text-base"
                        >
                            BOOK A CALL
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </a>
                </div>
            </div>

            {/* Center Image */}
            {/* <div className="w-full hidden lg:w-1/3  lg:flex items-center justify-center h-[80vh] relative">
                <img
                    ref={heroRef}
                    src="https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337805/portfolio/portfolio/hero/hero_qhtbdd.png"
                    alt="Portrait photo of hassaam"
                    className="absolute object-contain w-full h-full lg:object-cover -top-52"
                />
            </div> */}
            <Three />

            {/* Right Column - Date (aligned bottom on desktop) */}
            <div className="w-full lg:w-1/3 px-0  md:px-2 lg:px-4 lg:flex lg:flex-col lg:justify-end lg:items-end lg:self-stretch lg:h-[50vh]">
                <div className='text-white text-right w-full lg:mt-auto lg:mb-10'>
                    <p className="text-stone-600 text-xs md:text-sm mb-1">
                        <AnimatedText
                            splitByWords
                            start='top bottom'
                            text={"AVAILABLE FOR WORK"}
                        />
                    </p>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                        <AnimatedText
                            start='top bottom'
                            splitByWords
                            text={date}
                        />
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default BottomSection

const Months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
];