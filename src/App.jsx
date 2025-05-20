import React, { lazy, Suspense } from 'react'
import Wrapper from '@/layout/Wrapper'
import ResponsiveTester from '@/utils/Tester'
import AnimatedCursor from '@/utils/Cursor';
import CanvasParticles from '@/utils/Particles';
import Navbar from '@/layout/Navbar'
import Footer from '@/layout/Footer';

const Hero = lazy(() => import('@/components/Hero'))
const About = lazy(() => import('@/components/About'))
const Services = lazy(() => import('@/components/Services'))
const Projects = lazy(() => import('@/components/Projects'))
const Contact = lazy(() => import('@/components/Contact'))

const App = () => {
  return (
    <Wrapper className='w-full bg-primary font-poppins'>
      <Navbar />
      <AnimatedCursor />
      <CanvasParticles />
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-accent">Loading...</div>}>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
      <ResponsiveTester />
    </Wrapper>
  )
}

export default App