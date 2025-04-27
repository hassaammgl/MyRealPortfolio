
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedText = ({ text, className = '', style = {}, splitByWords = false, hoverClass = '' }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.char', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    // markers: true,
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.05,
            })
        }, containerRef)

        return () => ctx.revert()
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
