// import { useGSAP } from '@gsap/react';
// import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap';

// const AnimatedText = ({ text }) => {

//     const textRef = useRef(null);

//     useEffect(() => {
//         gsap.from(".char", {
//             opacity: 0,
//             y: 50,
//             duration: 1,
//             ease: "power2.out",
//             stagger: {
//                 amount: 0.5,
//                 from: "start",
//                 grid: "auto",
//                 each: 0.1
//             }
//         });
//         console.log(textRef.current);

//     }, []);

//     const splitedText = text.split('').map(char => char === ' ' ? '\u00A0' : char).addClassName('char');
//     // console.log(splitedText);

//     return (
//         <>
//             {splitedText.map((char, index) => (
//                 <span key={index} ref={textRef} className="char inline-block">{char}</span>
//             ))}
//         </>
//     )
// }

// export default AnimatedText


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
