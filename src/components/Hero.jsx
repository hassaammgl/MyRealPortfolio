// // Hero.jsx
// import { useRef, useState, useEffect, useCallback } from 'react';
// import { Element } from 'react-scroll';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import AnimatedText from './AnimatedText';

// gsap.registerPlugin(ScrollTrigger);

// const IMAGES = [
//     {
//         preview: "/hero/pr-1.jpg",
//         alt: "Hero",
//         bg_img: "/hero/bg-1.jpg",
//     },
//     {
//         preview: "/hero/pr-2.jpg",
//         alt: "Hero",
//         bg_img: "/hero/bg-2.jpg",
//     },
//     {
//         preview: "/hero/pr-3.jpg",
//         alt: "Hero",
//         bg_img: "/hero/bg-3.jpg",
//     },
//     {
//         preview: "/hero/pr-4.jpg",
//         alt: "Hero",
//         bg_img: "/hero/bg-4.jpg",
//     },
//     {
//         preview: "/hero/pr-5.jpg",
//         alt: "Hero",
//         bg_img: "/hero/bg-5.jpg",
//     },
// ];

// const IMAGE_TRANSITION_DURATION = 1;
// const AUTO_PLAY_INTERVAL = 7000;

// const Hero = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [tilt, setTilt] = useState({ x: 0, y: 0 });
//     const [isHovering, setIsHovering] = useState(false);
//     const sectionRef = useRef(null);
//     const imgRef = useRef(null);
//     const bgImgRef = useRef(null);
//     const containerRef = useRef(null);

//     const nextIndex = useCallback(() => (currentIndex + 1) % IMAGES.length, [currentIndex]);

//     // Animation setup
//     useGSAP(() => {
//         gsap.from([bgImgRef.current], {
//             scale: 0,
//             transformOrigin: "center center",
//             duration: IMAGE_TRANSITION_DURATION,
//             ease: "power2.inOut",
//         });

//         ScrollTrigger.create({
//             trigger: sectionRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: true,
//             onUpdate: (self) => {
//                 const y = self.progress * 50 - 25;
//                 gsap.to(imgRef.current, {
//                     y,
//                     ease: "none",
//                     overwrite: true,
//                 });
//             },
//         });
//     }, { scope: sectionRef });

//     const handleImageTransition = useCallback(() => {
//         const next = (currentIndex + 1) % IMAGES.length;

//         // Animate both images simultaneously
//         const tl = gsap.timeline();

//         tl.to([bgImgRef.current], {
//             scale: 0,
//             duration: IMAGE_TRANSITION_DURATION / 2,
//             ease: "power1.inOut",
//         });

//         tl.call(() => setCurrentIndex(next), null, "+=0.1");

//         tl.to([bgImgRef.current], {
//             scale: 1,
//             duration: IMAGE_TRANSITION_DURATION / 2,
//             ease: "power1.inOut",
//         });
//     }, [currentIndex]);

//     const handleMouseMove = useCallback((e) => {
//         if (!imgRef.current || !containerRef.current) return;

//         const rect = containerRef.current.getBoundingClientRect();

//         // For the image hover effect
//         const xOffset = e.clientX - (rect.left + rect.width / 2);
//         const yOffset = e.clientY - (rect.top + rect.height / 2);
//         const x = (xOffset / rect.width) * 100;
//         const y = (yOffset / rect.height) * 100;

//         imgRef.current.style.transform = 'scale(1.1)';
//         imgRef.current.style.transformOrigin = `${x}% ${y}%`;

//         // For the tilt effect
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;

//         // Calculate how far the mouse is from the center (in percentage)
//         const tiltX = (e.clientX - centerX) / (rect.width / 2);
//         const tiltY = (e.clientY - centerY) / (rect.height / 2);

//         // Apply tilt effect (subtle rotation)
//         setTilt({
//             x: tiltY * -8, // Invert Y axis for natural tilt feel
//             y: tiltX * 8   // Adjust these values to control tilt intensity
//         });

//         setIsHovering(true);
//     }, []);

//     const handleMouseLeave = useCallback(() => {
//         if (imgRef.current) {
//             imgRef.current.style.transform = 'scale(1)';
//         }

//         // Reset tilt effect
//         setIsHovering(false);
//         setTilt({ x: 0, y: 0 });
//     }, []);

//     // Auto-play logic
//     useEffect(() => {
//         const interval = setInterval(handleImageTransition, AUTO_PLAY_INTERVAL);
//         return () => clearInterval(interval);
//     }, [handleImageTransition]);

//     return (
//         <Element name="Home">
//             <section
//                 ref={sectionRef}
//                 className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover transition-all duration-1000 ease-in-out"
//                 style={{ backgroundImage: `url(${IMAGES[currentIndex].bg_img})` }}
//             >
//                 <div
//                     ref={bgImgRef}
//                     className="absolute top-0 left-0 h-full w-full bg-cover bg-center scale-0"
//                     style={{ backgroundImage: `url(${IMAGES[nextIndex()].bg_img})` }}
//                 />

//                 <div
//                     ref={containerRef}
//                     onMouseMove={handleMouseMove}
//                     onMouseLeave={handleMouseLeave}
//                     className="relative flex h-screen top-0 left-0 w-full items-center justify-center bg-transparent backdrop-blur-xs"
//                     style={{
//                         transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
//                         transition: 'transform 0.2s ease-out'
//                     }}
//                 >
//                     <img
//                         ref={imgRef}
//                         id="preview-img"
//                         src={IMAGES[nextIndex()].preview}
//                         alt={IMAGES[nextIndex()].alt}
//                         onClick={handleImageTransition}
//                         className="object-cover h-96 w-64 transition-all duration-300 ease-in-out cursor-pointer rounded-lg shadow-lg"
//                         style={{ transition: 'transform 0.3s ease-in-out' }}
//                     />
//                     <div className='font-srisakdi-bold font-light text-[9vw] font- leading-tight absolute flex w-4xl pointer-events-none flex-col '>
//                         <AnimatedText containerClass=' text-white font-bold' text={"Welcome"} />
//                         <AnimatedText hover={"hover:text-white"} style={{ WebkitTextStroke: "1px white" }} containerClass='text-transparent text-center font-bangers' text={"I'm Hassaam"} />
//                         <AnimatedText containerClass=' text-white text-end font-brittany' text={"Mughal"} />
//                     </div>
//                 </div>
//             </section>
//         </Element>
//     );
// };

// export default Hero;

import { useRef, useState, useEffect, useCallback } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    {
        preview: "/hero/pr-1.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-1.jpg",
    },
    {
        preview: "/hero/pr-2.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-2.jpg",
    },
    {
        preview: "/hero/pr-3.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-3.jpg",
    },
    {
        preview: "/hero/pr-4.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-4.jpg",
    },
    {
        preview: "/hero/pr-5.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-5.jpg",
    },
];

const IMAGE_TRANSITION_DURATION = 1;
const AUTO_PLAY_INTERVAL = 7000;

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const bgImgRef = useRef(null);
    const containerRef = useRef(null);

    const nextIndex = useCallback(() => (currentIndex + 1) % IMAGES.length, [currentIndex]);

    // Animation setup
    useGSAP(() => {
        gsap.from([bgImgRef.current], {
            scale: 0,
            transformOrigin: "center center",
            duration: IMAGE_TRANSITION_DURATION,
            ease: "power2.inOut",
        });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                const y = self.progress * 50 - 25;
                gsap.to(imgRef.current, {
                    y,
                    ease: "none",
                    overwrite: true,
                });
            },
        });
    }, { scope: sectionRef });

    const handleImageTransition = useCallback(() => {
        const next = (currentIndex + 1) % IMAGES.length;

        // Animate both images simultaneously
        const tl = gsap.timeline();

        tl.to([bgImgRef.current], {
            scale: 0,
            duration: IMAGE_TRANSITION_DURATION / 2,
            ease: "power1.inOut",
        });

        tl.call(() => setCurrentIndex(next), null, "+=0.1");

        tl.to([bgImgRef.current], {
            scale: 1,
            duration: IMAGE_TRANSITION_DURATION / 2,
            ease: "power1.inOut",
        });
    }, [currentIndex]);

    const handleMouseMove = useCallback((e) => {
        if (!imgRef.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // For the image hover effect
        const xOffset = e.clientX - (rect.left + rect.width / 2);
        const yOffset = e.clientY - (rect.top + rect.height / 2);
        const x = (xOffset / rect.width) * 100;
        const y = (yOffset / rect.height) * 100;

        imgRef.current.style.transform = 'scale(1.05)'; // Reduced scale for mobile friendliness
        imgRef.current.style.transformOrigin = `${x}% ${y}%`;

        // For the tilt effect - only apply on larger screens
        if (window.innerWidth > 768) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const tiltX = (e.clientX - centerX) / (rect.width / 2);
            const tiltY = (e.clientY - centerY) / (rect.height / 2);

            setTilt({
                x: tiltY * -8,
                y: tiltX * 8
            });
        }

        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (imgRef.current) {
            imgRef.current.style.transform = 'scale(1)';
        }

        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
    }, []);

    // Auto-play logic
    useEffect(() => {
        const interval = setInterval(handleImageTransition, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [handleImageTransition]);

    return (
        <Element name="Home">
            <section
                ref={sectionRef}
                className="relative h-[100dvh] w-screen flex justify-center items-center bg-center bg-cover transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${IMAGES[currentIndex].bg_img})` }}
            >
                <div
                    ref={bgImgRef}
                    className="absolute top-0 left-0 h-full w-full bg-cover bg-center scale-0"
                    style={{ backgroundImage: `url(${IMAGES[nextIndex()].bg_img})` }}
                />

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex h-screen top-0 left-0 w-full items-center justify-center bg-transparent backdrop-blur-xs"
                    style={{
                        transform: window.innerWidth > 768 ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
                        transition: 'transform 0.2s ease-out'
                    }}
                >
                    <img
                        ref={imgRef}
                        id="preview-img"
                        src={IMAGES[nextIndex()].preview}
                        alt={IMAGES[nextIndex()].alt}
                        onClick={handleImageTransition}
                        className="object-cover h-[60vw] w-[40vw] max-h-96 max-w-64 md:h-96 md:w-64 transition-all duration-300 ease-in-out cursor-pointer rounded-lg shadow-lg"
                        style={{
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    />
                    {/* <div className='font-srisakdi-bold font-light text-[9vw] md:text-[7vw] leading-tight absolute flex w-4xl pointer-events-none flex-col'> */}
                    <div className='font-srisakdi-bold font-light text-[9vw] leading-tight absolute flex w-xs sm:w-md md:w-lg lg:w-xl xl:w-2xl 2xl:w-4xl pointer-events-none flex-col'>
                        <AnimatedText containerClass='text-white font-bold' text={"Welcome"} />
                        <AnimatedText
                            hover={"hover:text-white"}
                            style={{ WebkitTextStroke: "1px white" }}
                            containerClass='text-transparent text-center font-bangers'
                            text={"I'm Hassaam"}
                        />
                        <AnimatedText containerClass='text-white text-end font-brittany' text={"Mughal"} />
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Hero;