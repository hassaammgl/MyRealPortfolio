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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const bgImgRef = useRef(null);
    const containerRef = useRef(null);

    const nextIndex = useCallback(() => (currentIndex + 1) % IMAGES.length, [currentIndex]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(bgImgRef.current, {
                scale: 0,
                duration: IMAGE_TRANSITION_DURATION,
                ease: "power2.inOut",
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const y = (self.progress - 0.5) * 50;
                    gsap.to(imgRef.current, {
                        y,
                        ease: "none",
                    });
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleImageTransition = useCallback(() => {
        const next = nextIndex();

        const tl = gsap.timeline();
        tl.to(bgImgRef.current, {
            scale: 0,
            duration: IMAGE_TRANSITION_DURATION / 2,
            ease: "power2.inOut",
        }).add(() => {
            setCurrentIndex(next);
        }).to(bgImgRef.current, {
            scale: 1,
            duration: IMAGE_TRANSITION_DURATION / 2,
            ease: "power2.inOut",
        });
    }, [nextIndex]);

    const handleMouseMove = useCallback((e) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (imgRef.current) {
            imgRef.current.style.transform = `scale(1.05)`;
            imgRef.current.style.transformOrigin = `${x}% ${y}%`;
        }

        if (window.innerWidth > 768) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const tiltX = (e.clientY - centerY) / (rect.height / 2);
            const tiltY = (e.clientX - centerX) / (rect.width / 2);

            setTilt({ x: tiltX * -8, y: tiltY * 8 });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (imgRef.current) imgRef.current.style.transform = 'scale(1)';
        setTilt({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        const interval = setInterval(handleImageTransition, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [handleImageTransition]);

    return (
        <Element name="Home">
            <section
                ref={sectionRef}
                className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover overflow-hidden"
                style={{ backgroundImage: `url(${IMAGES[currentIndex].bg_img})` }}
            >
                <Load setOnLoadComplete={setOnLoadComplete} />
                <div
                    ref={bgImgRef}
                    className="absolute top-0 left-0 h-full w-full bg-cover bg-center scale-0"
                    style={{ backgroundImage: `url(${IMAGES[nextIndex()].bg_img})` }}
                />

                {onLoadComplete && <SocialLinks />}

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex h-dvh w-full items-center justify-center"
                    style={{
                        transform: window.innerWidth > 768
                            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                            : 'none',
                        transition: 'transform 0.2s ease-out',
                    }}
                >
                    <img
                        ref={imgRef}
                        src={IMAGES[nextIndex()].preview}
                        alt={IMAGES[nextIndex()].alt}
                        onClick={handleImageTransition}
                        className="object-cover h-[60vw] w-[40vw] max-h-96 max-w-64 md:h-96 md:w-64 transition-transform duration-300 ease-in-out cursor-pointer rounded-lg shadow-lg"
                    />

                    {
                        onLoadComplete && <div className="font-whisper font-light leading-tight absolute flex flex-col text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] w-xs sm:w-md md:w-lg lg:w-xl xl:w-2xl 2xl:w-4xl pointer-events-none">
                            <AnimatedText className="text-white font-bold " text="Welcome" />
                            <AnimatedText
                                hoverClass="hover:text-white"
                                style={{ WebkitTextStroke: "1px white" }}
                                className="text-transparent text-center font-bangers"
                                text="I'm Hassaam"
                            />
                            <AnimatedText className="text-white text-end font-brittany" text="Mughal" />
                        </div>
                    }
                </div>

                {onLoadComplete && <Stats />}
            </section>
        </Element>
    );
};

export default Hero;

