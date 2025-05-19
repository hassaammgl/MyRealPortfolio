
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
        if (!revert) {
            const ctx = gsap.context(() => {
                gsap.from('.char', {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: start,
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 50,
                    duration: duration,
                    ease: 'power3.out',
                    stagger: 0.05,
                })
            }, containerRef)

            return () => ctx.revert()
        } else {
            const ctx = gsap.context(() => {
                gsap.from('.char', {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: -50,
                    duration: duration,
                    ease: 'power3.out',
                    stagger: 0.05,
                })
            }, containerRef)

            return () => ctx.revert()
        }
    }, [])

    const renderText = () => {
        const parts = splitByWords ? text.split(/(\s+)/) : text.split('')
        return parts.map((part, idx) => (
            <span key={idx} className={`char inline-block ${hoverClass}`}>
                {part === ' ' ? '\u00A0' : part}
            </span>
        ))
    }

    return (
        <span ref={containerRef} className={className} style={style}>
            {renderText()}
        </span>
    )
}

export default AnimatedText
