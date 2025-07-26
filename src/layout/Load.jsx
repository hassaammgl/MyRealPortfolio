import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Load = ({ setOnLoadComplete }) => {
    const containerRef = useRef(null);
    const innerContainerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const innerContainer = innerContainerRef.current;

        return () => {
            gsap.killTweensOf([container, innerContainer, ".load"]);
        };
    }, []);


    useGSAP(() => {
        gsap.set(".load", {
            opacity: 0,
            x: 300
        });

        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
                setOnLoadComplete(true);
            }
        });

        tl.to(".load", {
            duration: 0.5,
            x: 0,
            opacity: 1,
            stagger: 0.1,
        })
            .to(innerContainerRef.current, {
                clipPath: "inset(0 0 100% 0)",
                duration: 1,
                delay: 0.8,
            }, ">")
            .to(containerRef.current, {
                clipPath: "inset(0 0 100% 0)",
                duration: 1,
                delay: -0.4,
            }, ">")
            .set(containerRef.current, {
                display: "none",
            })

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full h-dvh flex items-center justify-center bg-accent z-50"
        >
            <div
                ref={innerContainerRef}
                style={{
                    clipPath: "inset(0 0 0 0)",
                    WebkitClipPath: "inset(0 0 0 0)"
                }}
                className='bg-primary font-ruslan text-[6vw] gap-9 text-white w-full h-full flex items-center justify-center'
            >
                <span className='load'>Yo</span>
                <span className='load'>Its,</span>
                <span className='text-accent font-brittany load'>Hassaam</span>
                <span className='load'>Mgl.</span>
            </div>
        </div>
    );
}

export default Load;
