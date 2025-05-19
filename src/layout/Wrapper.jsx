import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react'


const Wrapper = ({ children, className }) => {

    const lenisRef = useRef()
    useLenis()
    useEffect(() => {
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }
        gsap.ticker.add(update)
        return () => gsap.ticker.remove(update)
    }, [])

    return (
        <ReactLenis options={{ autoRaf: false, }} ref={lenisRef} root>
            <div className={className}>
                {children}
            </div>
        </ReactLenis>
    )
}

export default Wrapper