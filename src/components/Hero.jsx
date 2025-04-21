import { useRef, useState } from 'react';
import { Element } from 'react-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const imgs = [
    { preview: "/hero/pr-1.jpg", alt: "Hero", bg_img: "/hero/bg-1.jpg" },
    { preview: "/hero/pr-2.jpg", alt: "Hero", bg_img: "/hero/bg-2.jpg" },
    { preview: "/hero/pr-3.jpg", alt: "Hero", bg_img: "/hero/bg-3.jpg" },
    { preview: "/hero/pr-4.jpg", alt: "Hero", bg_img: "/hero/bg-4.jpg" },
    { preview: "/hero/pr-5.jpg", alt: "Hero", bg_img: "/hero/bg-5.jpg" },
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const bgRef = useRef(null);

    const nextIndex = (currentIndex + 1) % imgs.length;

    useGSAP(() => {
        gsap.from(imgRef.current, {
            scale: 0,
            transformOrigin: "center center",
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.from(bgRef.current, {
            scale: 0,
            transformOrigin: "center center",
            duration: 1,
            ease: "power2.inOut",
        });
    }, []);

    useGSAP(() => {
        gsap.set(sectionRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
        });

        gsap.to(sectionRef.current, {
            borderRadius: "0% 0% 40% 10%",
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    }, []);

    const handleImgs = () => {
        setCurrentIndex((prev) => (prev + 1) % imgs.length);

        gsap.fromTo(bgRef.current, { scale: 0 }, {
            scale: 1,
            duration: 1,
            ease: "power1.inOut",
            transformOrigin: "center center",
        });

        gsap.fromTo(imgRef.current, { scale: 0 }, {
            scale: 1,
            duration: 1,
            ease: "power1.inOut",
            transformOrigin: "center center",
        });
    };

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xOffset = e.clientX - (rect.left + rect.width / 2);
        const yOffset = e.clientY - (rect.top + rect.height / 2);
        const x = (xOffset / rect.width) * 100;
        const y = (yOffset / rect.height) * 100;

        imgRef.current.style.transform = 'scale(1.1)';
        imgRef.current.style.transition = 'transform 0.3s ease-in-out';
        imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    const handleMouseLeave = () => {
        imgRef.current.style.transform = 'scale(1)';
    };

    return (
        <Element name="Home">
            <section
                ref={sectionRef}
                className="relative h-dvh w-screen flex justify-center items-center bg-center bg-cover"
                style={{ backgroundImage: `url(${imgs[nextIndex].bg_img})` }}
            >
                <div
                    ref={bgRef}
                    id="bgimg"
                    className="absolute top-0 left-0 h-dvh w-full scale-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgs[currentIndex].bg_img})` }}
                />
                <div
                    onMouseMove={handleMouse}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouse}
                    className="relative flex h-screen w-full items-center justify-center"
                >
                    <img
                        ref={imgRef}
                        src={imgs[nextIndex].preview}
                        alt={imgs[currentIndex].alt}
                        onClick={handleImgs}
                        className="object-cover h-96 w-64 transition-transform duration-1000 ease-in-out"
                    />
                </div>
            </section>
        </Element>
    );
};

export default Hero;


{/* <div className="">
<div className="">
    <div className="" />
    <img
        src=""
        alt="Hero"
        className=""
    />
</div>
<h1 className="">
    HELLO <br />
    I'M HABIBI <br />
    SHEKA
</h1>
</div>
<div className="">
<p className="">
    I explore a vibrant world of creativity where every brush-stroke tells a story
</p>
<p className="">
    An artist based in Ireland
</p>
</div> */}