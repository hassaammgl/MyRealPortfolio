import React, { Suspense, lazy, useEffect, useRef } from 'react'
import Loader from "./components/Loader";
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react'
const Hero = lazy(() => import("./components/Hero"))
const About = lazy(() => import("./components/About"))
const WhoIAm = lazy(() => import("./components/WhoIAm"))

const App = () => {
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
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      <div className='w-full h-fit overflow-x-hidden bg-[#f9f9f7] font-poppins'>
        {/* <Navbar /> */}
        <Suspense fallback={<Loader />} >
          <Hero />
          <About />
          <WhoIAm />
        </Suspense>
      </div>
    </ReactLenis>
  )
}

export default App
