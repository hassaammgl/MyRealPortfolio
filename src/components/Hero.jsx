import { useRef, useState, useEffect, useCallback } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '@/components/AnimatedText';
import AnimatedCounter from '@/components/AnimatedCounter';
import axios from 'axios';
import { IMAGES, LINKS } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

const IMAGE_TRANSITION_DURATION = 1;
const AUTO_PLAY_INTERVAL = 7000;

const Hero = () => {
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
                <div
                    ref={bgImgRef}
                    className="absolute top-0 left-0 h-full w-full bg-cover bg-center scale-0"
                    style={{ backgroundImage: `url(${IMAGES[nextIndex()].bg_img})` }}
                />

                <SocialLinks />

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

                    <div className="font-whisper font-light leading-tight absolute flex flex-col text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] w-xs sm:w-md md:w-lg lg:w-xl xl:w-2xl 2xl:w-4xl pointer-events-none">
                        <AnimatedText containerClass="text-white font-bold" text="Welcome" />
                        <AnimatedText
                            hover="hover:text-white"
                            style={{ WebkitTextStroke: "1px white" }}
                            containerClass="text-transparent text-center font-bangers"
                            text="I'm Hassaam"
                        />
                        <AnimatedText containerClass="text-white text-end font-brittany" text="Mughal" />
                    </div>
                </div>

                <Stats />
            </section>
        </Element>
    );
};

const SocialLinks = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const links = containerRef.current.querySelectorAll('a');

        gsap.set(links, { opacity: 0, y: -30, scale: 0.7 });

        links.forEach(link => {
            const name = document.createElement('span');
            name.className = 'link-name absolute left-full ml-2 px-2 py-1 rounded-md text-sm whitespace-nowrap';
            name.style.backgroundColor = 'rgba(138,43,226,0.3)';
            name.style.backdropFilter = 'blur(12px)';
            name.style.border = '1px solid rgba(255,255,255,0.18)';
            name.style.opacity = 0;
            name.textContent = link.getAttribute('data-name');
            link.appendChild(name);
        });

        gsap.to(links, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "elastic.out(1,0.5)"
        });

        links.forEach(link => {
            const name = link.querySelector('.link-name');

            link.addEventListener('mouseenter', () => {
                gsap.to(link, { scale: 1.15, y: -3, duration: 0.15 });
                gsap.to(name, { opacity: 1, x: 10, duration: 0.2 });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, { scale: 1, y: 0, duration: 0.2 });
                gsap.to(name, { opacity: 0, x: 0, duration: 0.15 });
            });
        });

        return () => {
            links.forEach(link => {
                const name = link.querySelector('.link-name');
                if (name) link.removeChild(name);
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute text-white z-10 top-16 right-7">
            <div className="flex flex-col gap-3">
                {LINKS.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-name={link.name}
                        className="p-3 rounded-full text-white text-2xl hover:text-accent relative"
                        style={{
                            background: 'rgba(138,43,226,0.15)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            boxShadow: '0 8px 32px rgba(31,38,135,0.15)'
                        }}
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

const Stats = () => {
    const [repos, setRepos] = useState(0);

    useEffect(() => {
        axios.get('https://api.github.com/users/hassaammgl')
            .then(res => setRepos(res.data.public_repos))
            .catch(console.error);
    }, []);

    return (
        <div
            className="p-7 group absolute bottom-10 left-1/2 sm:left-36 rounded-lg transform -translate-x-1/2 flex gap-5"
            style={{
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px rgba(31,38,135,0.15)',
            }}
        >
            <div className="flex transition-all duration-500 group-hover:scale-110 flex-col items-center">
                <AnimatedCounter
                    value={repos}
                    prefix="+"
                    duration={2}
                    className="text-white text-7xl sm:text-9xl font-ruslan"
                />
                <span className="text-white font-roboto font-extralight">Repos</span>
            </div>
        </div>
    );
};

const Load = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="loader"></div>
        </div>
    );
}

export default Hero;
