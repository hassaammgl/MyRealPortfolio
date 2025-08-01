import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedMarquee = () => {
    const marqueeWrapperRef = useRef(null);
    const tl = useRef(null);

    const items = [
        { emoji: "👋", text: "Full Stack Developer", color: "text-white/90" },
        { emoji: "💻", text: "JavaScript Expert", color: "text-white/90" },
        { emoji: "⚛️", text: "React Specialist", color: "text-white/90" },
        { emoji: "🛠️", text: "Problem Solver", color: "text-white/90" },
        { emoji: "🔧", text: "Clean Code Advocate", color: "text-white/90" },
        { emoji: "🚀", text: "Performance Optimizer", color: "text-white/90" },
        { emoji: "📱", text: "Responsive Design", color: "text-white/90" },
        { emoji: "🤝", text: "Team Player", color: "text-white/90" },
    ];

    useEffect(() => {
        const wrapper = marqueeWrapperRef.current;
        const content = wrapper.querySelector(".marquee-content");
        const clone = content.cloneNode(true);
        clone.classList.add("marquee-clone");
        wrapper.appendChild(clone);

        const totalWidth = content.offsetWidth;

        tl.current = gsap.timeline({ repeat: -1 })
            .fromTo(
                wrapper,
                { x: 0 },
                {
                    x: -totalWidth,
                    duration: 20,
                    ease: "linear"
                }
            );

        gsap.utils.toArray(".marquee-item").forEach((item) => {
            gsap.to(item, {
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
                delay: Math.random() * 2,
            });
        });

        return () => {
            tl.current?.kill();
            gsap.killTweensOf(".marquee-item");
        };
    }, []);

    const handleMouseEnter = () => {
        tl.current?.timeScale(0.3);
        gsap.to(".marquee-item", {
            duration: 0.3,
            stagger: 0.1,
        });
    };

    const handleMouseLeave = () => {
        tl.current?.timeScale(1);
        gsap.to(".marquee-item", {
            duration: 0.5,
            stagger: 0.05,
        });
    };

    return (
        <div className="relative overflow-hidden w-full bg-gradient-to-r from-black to-gray-900 text-white cursor-pointer h-24 md:h-32 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none" />

            <div
                ref={marqueeWrapperRef}
                className="flex h-full whitespace-nowrap will-change-transform"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="font-boldonse flex gap-8 px-4 text-4xl md:text-6xl items-center justify-center h-full marquee-content">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 marquee-item">
                            <span className={`text-5xl mr-6 ${item.color} drop-shadow-lg`}>
                                {item.emoji}
                            </span>
                            <span
                                className={`font-bold ${item.color} `}
                            >
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnimatedMarquee;