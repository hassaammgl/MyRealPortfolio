import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedText = ({ text, containerClass = "", style, hover }) => {
    const containerRef = useRef(null)

    useGSAP(() => {
        const chars = containerRef.current.querySelectorAll(".char")

        gsap.from(chars, {
            opacity: 0,
            y: 70,
            duration: 1,
            ease: "power3.out",
            stagger: {
                each: 0.05,
                from: "start"
            },
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        })
    }, { scope: containerRef })

    return (
        <span style={style} ref={containerRef} className={`animated-text ${containerClass}`}>
            {text.split('').map((char, index) => (
                <span key={index} className={`char inline-block ${hover}`}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    )
}

export default AnimatedText
