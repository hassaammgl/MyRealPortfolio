import React, { Suspense, lazy, useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import Loader from "./components/Loader";
import "./App.css"
const Hero = lazy(() => import("./components/Hero"))
const About = lazy(() => import("./components/About"))
const WhoIAm = lazy(() => import("./components/WhoIAm"))

const App = () => {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider options={{ smooth: true }}
      watch={[]}
      containerRef={containerRef}>
      <div data-scroll-container ref={containerRef} className='w-full h-fit overflow-x-hidden bg-[#f9f9f7]'>
        {/* <Navbar /> */}
        <Suspense fallback={<Loader />} >
          <Hero />
          <About />
          <WhoIAm />
        </Suspense>
      </div>
    </LocomotiveScrollProvider>
  )
}

export default App
