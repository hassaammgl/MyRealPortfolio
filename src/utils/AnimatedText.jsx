import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedText = ({
    text,
    className = '',
    style = {},
    splitByWords = false,
    hoverClass = '',
    duration = 1,
    revert = false,
    start = 'top 80%',
    // y motion overlaps wrapped lines — off by default for word splits
    move = !splitByWords,
}) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.char', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start,
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                ...(move ? { y: revert ? -40 : 40 } : {}),
                duration,
                ease: 'power3.out',
                stagger: 0.04,
                clearProps: move ? 'transform' : '',
            })
        }, containerRef)

        return () => ctx.revert()
    }, [start, duration, revert, move])

    const renderText = () => {
        if (splitByWords) {
            return text.split(/(\s+)/).map((part, idx) => {
                if (part === ' ' || part === '' || /^\s+$/.test(part)) {
                    return <span key={idx}>{' '}</span>
                }
                return (
                    <span
                        key={idx}
                        className={`char inline-block ${hoverClass}`}
                    >
                        {part}
                    </span>
                )
            })
        }

        return text.split(/(\s+)/).map((part, idx) => {
            if (/^\s+$/.test(part) || part === '') {
                return <span key={idx}>{' '}</span>
            }

            return (
                <span key={idx} className="inline-block whitespace-nowrap">
                    {part.split('').map((char, charIdx) => (
                        <span key={charIdx} className={`char inline-block ${hoverClass}`}>
                            {char}
                        </span>
                    ))}
                </span>
            )
        })
    }

    return (
        <span ref={containerRef} className={className} style={style}>
            {renderText()}
        </span>
    )
}

export default AnimatedText
