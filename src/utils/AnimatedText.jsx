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
}) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.char', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start,
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: revert ? -50 : 50,
                duration,
                ease: 'power3.out',
                stagger: 0.05,
            })
        }, containerRef)

        return () => ctx.revert()
    }, [start, duration, revert])

    const renderText = () => {
        if (splitByWords) {
            return text.split(/(\s+)/).map((part, idx) => (
                <span key={idx} className={`char inline-block ${hoverClass}`}>
                    {part === ' ' || part === '' ? '\u00A0' : part}
                </span>
            ))
        }

        // Keep words together so titles don't break mid-word on mobile
        return text.split(/(\s+)/).map((part, idx) => {
            if (/^\s+$/.test(part) || part === '') {
                return <span key={idx}>{'\u00A0'}</span>
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
