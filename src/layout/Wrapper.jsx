import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

const Wrapper = ({ children, className }) => {
    const lenisRef = useRef()
    useLenis()

    useEffect(() => {
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }
        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        const lenis = lenisRef.current?.lenis
        const onScroll = () => ScrollTrigger.update()
        lenis?.on?.('scroll', onScroll)

        return () => {
            gsap.ticker.remove(update)
            lenis?.off?.('scroll', onScroll)
        }
    }, [])

    return (
        <ReactLenis
            options={{
                autoRaf: false,
                lerp: 0.1,
                smoothWheel: true,
                wheelMultiplier: 0.92,
                touchMultiplier: 1.15,
            }}
            ref={lenisRef}
            root
        >
            <div className={className}>
                {children}
            </div>
        </ReactLenis>
    )
}

export default Wrapper
