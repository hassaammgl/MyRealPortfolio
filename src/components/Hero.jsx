import { useRef, useState, useEffect, useCallback } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';
import AnimatedCounter from './AnimatedCounter';
import { FiLinkedin, FiGithub, FiYoutube } from "react-icons/fi";
import axios from 'axios';


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
                className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover transition-all duration-1000 ease-in-out"
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
                    className="relative flex h-dvh top-0 left-0 w-full items-center justify-center bg-transparent backdrop-blur-xs"
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
                    <div className='font-whisper font-light leading-tight absolute flex w-xs sm:w-md md:w-lg lg:w-xl xl:w-2xl 2xl:w-4xl pointer-events-none flex-col text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw]'>
                        <AnimatedText containerClass='text-white font-bold ' text={"Welcome"} />
                        <AnimatedText
                            hover={"hover:text-white"}
                            style={{ WebkitTextStroke: "1px white" }}
                            containerClass='text-transparent text-center font-bangers'
                            text={"I'm Hassaam"}
                        />
                        <AnimatedText containerClass='text-white text-end font-brittany' text={"Mughal"} />
                    </div>
                </div>
                <Stats />
            </section>
        </Element>
    );
};

export default Hero;

const LINKS = [
    {
        name: "LinkedIn",
        icon: <FiLinkedin />,
        url: "https://www.linkedin.com/in/m-hassaam-mughal-91668a256/",
    },
    {
        name: "GitHub",
        icon: <FiGithub />,
        url: "https://github.com/hassaammgl/"
    },
    {
        name: "Youtube",
        icon: <FiYoutube />,
        url: "https://www.youtube.com/@coderglitchx03"
    }
];


const SocialLinks = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const links = containerRef.current.querySelectorAll('a');

        // Set initial state
        gsap.set(links, {
            opacity: 0,
            y: -30,
            scale: 0.7
        });

        // Create name elements for each link
        links.forEach(link => {
            const name = document.createElement('span');
            name.className = 'link-name absolute left-full ml-2 px-2 py-1 rounded-md text-sm whitespace-nowrap';
            name.style.backgroundColor = 'rgba(138, 43, 226, 0.3)';
            name.style.backdropFilter = 'blur(12px)';
            name.style.border = '1px solid rgba(255, 255, 255, 0.18)';
            name.style.opacity = 0;
            name.textContent = link.getAttribute('data-name');
            link.appendChild(name);
        });

        // Animate entrance
        gsap.to(links, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)"
        });

        // Add hover effects
        links.forEach(link => {
            const name = link.querySelector('.link-name');

            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.15,
                    duration: 0.15,
                    ease: "power2.out",
                    y: -3
                });

                gsap.to(name, {
                    opacity: 1,
                    x: 10,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out",
                    y: 0
                });

                gsap.to(name, {
                    opacity: 0,
                    x: 0,
                    duration: 0.15,
                    ease: "power2.in"
                });
            });
        });

        return () => {
            links.forEach(link => {
                const name = link.querySelector('.link-name');
                if (name) link.removeChild(name);

                link.removeEventListener('mouseenter', () => { });
                link.removeEventListener('mouseleave', () => { });
            });
        };
    }, []);

    return (
        <div ref={containerRef}
            className='absolute text-white z-10 top-16 right-4'>
            <div className='flex flex-col gap-3'>
                {LINKS.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='p-3 rounded-full text-white text-2xl hover:text-accent relative'
                        style={{
                            background: 'rgba(138, 43, 226, 0.15)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
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
            .then((res) => {
                setRepos(res.data.public_repos);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    return (
        <div
            style={{
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}
            className='p-7  group absolute bottom-10 left-1/2 sm:left-36 rounded-lg transform -translate-x-1/2 flex gap-5'>
            <div className='flex transition-all duration-500 ease-in-out group-hover:scale-110 flex-col items-center'>
                <AnimatedCounter
                    value={repos}
                    prefix='+'
                    duration={2}
                    className='text-white text-7xl sm:text-9xl font-ruslan'
                />
                <span className='text-white font-roboto font-extralight'>Repos</span>
            </div>
        </div>
    )
}