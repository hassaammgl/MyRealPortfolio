import { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const imgs = [
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

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);

    const nextIndex = (currentIndex + 1) % imgs.length;

    useGSAP(() => {
        gsap.from('img', {
            scale: 0,
            transformOrigin: "center center",
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.from('#bgimg', {
            transformOrigin: "center center",
            scale: 0,
            duration: 1,
            ease: "power2.inOut",
        });
    });
    useGSAP(() => {
        const img = document.querySelector("#preview-img");

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                const y = self.progress * 50 - 25; // from -25 to +25
                gsap.to(img, {
                    y,
                    ease: "none",
                    overwrite: true,
                });
            },
        });
    });

    const handleImgs = () => {
        const next = (currentIndex + 1) % imgs.length;

        // Animate background transition
        gsap.set("#bgimg", { scale: 0 });
        gsap.to("#bgimg", {
            scale: 1,
            duration: 1,
            ease: "power1.inOut",
        });

        // Animate preview image
        gsap.set("img", { scale: 0 });
        gsap.to("img", {
            scale: 1,
            transformOrigin: "center center",
            duration: 1,
            ease: "power1.inOut",
        });

        // Set new index after small delay to allow animation
        setTimeout(() => {
            setCurrentIndex(next);
        }, 200);
    };

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xOffset = e.clientX - (rect.left + rect.width / 2);
        const yOffset = e.clientY - (rect.top + rect.height / 2);
        const x = (xOffset / rect.width) * 100;
        const y = (yOffset / rect.height) * 100;
        const img = document.querySelector('img');
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.3s ease-in-out';
        img.style.transformOrigin = `${x}% ${y}%`;
    };

    const handleMouseLeave = () => {
        const img = document.querySelector('img');
        img.style.transform = 'scale(1)';
    };

    // 🔁 Auto-play logic
    useEffect(() => {
        const interval = setInterval(() => {
            handleImgs();
        }, 7000); // change every 7 seconds
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <Element name="Home">
            <section
                ref={sectionRef}
                className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${imgs[currentIndex].bg_img})` }}
            >
                {/* Hidden BG animation layer */}
                <div
                    id="bgimg"
                    className="absolute top-0 left-0 h-full w-full bg-cover bg-center scale-0"
                    style={{ backgroundImage: `url(${imgs[nextIndex].bg_img})` }}
                />

                {/* Preview image (next one) */}
                <div
                    onMouseMove={handleMouse}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouse}
                    className="relative flex h-screen w-full items-center justify-center"
                >
                    <img
                        id="preview-img"
                        src={imgs[nextIndex].preview}
                        alt={imgs[nextIndex].alt}
                        onClick={handleImgs}
                        className="object-cover h-96 w-64 transition-all duration-1000 ease-in-out cursor-pointer"
                    />
                </div>
            </section>
        </Element>
    );
};

export default Hero;
