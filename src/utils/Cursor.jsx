import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AnimatedCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });
    const speed = 0.2;

    useGSAP(() => {
        if (!cursorRef.current || !followerRef.current) return;

        // Set initial positions
        gsap.set([cursorRef.current, followerRef.current], {
            xPercent: -50,
            yPercent: -50,
        });

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);

        // GSAP animation loop
        const animate = () => {
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

            pos.current.x += (mouse.current.x - pos.current.x) * dt;
            pos.current.y += (mouse.current.y - pos.current.y) * dt;

            gsap.set(cursorRef.current, { x: pos.current.x, y: pos.current.y });
            gsap.set(followerRef.current, { x: pos.current.x, y: pos.current.y, delay: 0.1 });

            requestAnimationFrame(animate);
        };

        animate();

        // Hover effects
        const handleHover = () => {
            gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 });
            gsap.to(followerRef.current, { scale: 3, duration: 0.3 });
        };

        const handleUnhover = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
            gsap.to(followerRef.current, { scale: 1, duration: 0.3 });
        };

        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, [data-cursor-hover]'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed w-2.5 h-2.5 bg-black dark:bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Follower circle */}
            <div
                ref={followerRef}
                className="fixed w-8 h-8 border-2 border-black dark:border-white rounded-full pointer-events-none z-[9998] mix-blend-difference opacity-70 transform -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
};

export default AnimatedCursor;