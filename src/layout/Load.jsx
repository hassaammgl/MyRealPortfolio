import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Load = ({ onComplete }) => {
    const containerRef = useRef(null)
    const innerContainerRef = useRef(null)

    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
            gsap.killTweensOf([containerRef.current, innerContainerRef.current, '.load'])
        }
    }, [])

    useGSAP(() => {
        gsap.set('.load', { opacity: 0, x: 300 })

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: () => {
                onComplete?.()
            },
        })

        tl.to('.load', {
            duration: 0.5,
            x: 0,
            opacity: 1,
            stagger: 0.1,
        })
            .to(innerContainerRef.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 1,
                delay: 0.8,
            }, '>')
            .to(containerRef.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 1,
                delay: -0.4,
            }, '>')
    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-accent"
            aria-busy="true"
            aria-label="Loading"
        >
            <div
                ref={innerContainerRef}
                style={{
                    clipPath: 'inset(0 0 0 0)',
                    WebkitClipPath: 'inset(0 0 0 0)',
                }}
                className="bg-primary font-ruslan text-[7vw] sm:text-[6vw] gap-3 sm:gap-6 md:gap-9 text-white w-full h-full flex flex-wrap items-center justify-center px-4"
            >
                <span className="load">Yo</span>
                <span className="load">Its,</span>
                <span className="text-accent font-brittany load">Hassaam</span>
                <span className="load">Mgl.</span>
            </div>
        </div>
    )
}

export default Load
