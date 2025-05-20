import React, { lazy, Suspense } from 'react'
import Wrapper from '@/layout/Wrapper'
import ResponsiveTester from '@/utils/Tester'
import AnimatedCursor from '@/utils/Cursor';
import CanvasParticles from '@/utils/Particles';
import Navbar from '@/layout/Navbar'
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from './components/Projects';

const Hero = lazy(() => import('@/components/Hero'))

const App = () => {
  return (
    <Wrapper className='w-full bg-primary font-poppins'>
      <Navbar />
      <AnimatedCursor />
      <CanvasParticles />
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-accent">Loading...</div>}>
        <Hero />
        <About />
        {/* <Services /> */}
        <Projects />
      </Suspense>
      <ResponsiveTester />
    </Wrapper>
  )
}

export default App