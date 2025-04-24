import React, { Suspense, lazy, useEffect, useRef } from 'react'
import Loader from "./components/Loader";
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import ResponsiveTester from './components/ResponsiveTester';
import GitHubStats from './components/GithubStats';

const Hero = lazy(() => import("./components/Hero"))
const About = lazy(() => import("./components/About"))
const Skills = lazy(() => import("./components/Skills"))
const Hobby = lazy(() => import("./components/Hobby"))
const Reads = lazy(() => import("./components/Reads"))
const Projects = lazy(() => import("./components/Projects"))
const Contact = lazy(() => import("./components/Contact"))

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
      <div className='w-full h-fit overflow-x-hidden bg-primary font-poppins'>
        <Navbar />
        <Suspense fallback={<Loader />} >
          <Hero />
          <GitHubStats />
          <ResponsiveTester />
          <About />
          <Skills />
          <Hobby />
          <Reads />
          <Projects />
          <Contact />
        </Suspense>
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
