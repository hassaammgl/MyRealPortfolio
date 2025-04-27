import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// const AnimatedText = ({ text, containerClass = "", style, hover, wordType = "s" }) => {
//     const containerRef = useRef(null)

//     useGSAP(() => {
//         const chars = containerRef.current.querySelectorAll(".char")

//         gsap.from(chars, {
//             opacity: 0,
//             y: 70,
//             duration: 1,
//             ease: "power3.out",
//             stagger: {
//                 each: 0.05,
//                 from: "start"
//             },
//             scrollTrigger: {
//                 trigger: containerRef.current,
//                 start: "top 90%",
//                 end: "bottom 60%",
//                 toggleActions: "play none none reverse"
//             }
//         })
//     }, { scope: containerRef })

//     return (
//         <span style={style} ref={containerRef} className={`animated-text ${containerClass}`}>
//             {text.split(wordType === "s" ? "" : " ").map((char, index) => (
//                 <span key={index} className={`char inline-block ${hover}`}>
//                     {char === ' ' ? '\u00A0' : char}
//                 </span>
//             ))}
//         </span>
//     )
// }

// export default AnimatedText

const AnimatedText = ({ text, containerClass = "", style, hover, wordType = "s" }) => {
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

    // Fixed splitting logic
    const renderContent = () => {
        if (wordType === "s") {
            // Character splitting
            return text.split("").map((char, index) => (
                <span key={index} className={`char inline-block ${hover}`}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))
        } else {
            // Word splitting (preserves spaces)
            return text.split(/(\s+)/).map((word, index) => {
                if (word.match(/\s+/)) {
                    // Render spaces as non-breaking spaces
                    return '\u00A0'.repeat(word.length)
                }
                return (
                    <span key={index} className={`char inline-block ${hover}`}>
                        {word}
                    </span>
                )
            })
        }
    }

    return (
        <span style={style} ref={containerRef} className={`animated-text ${containerClass}`}>
            {renderContent()}
        </span>
    )
}
export default AnimatedText