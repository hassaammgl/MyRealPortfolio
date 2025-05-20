import React, { lazy, Suspense } from 'react'
import Wrapper from '@/layout/Wrapper'
import ResponsiveTester from '@/utils/Tester'
import AnimatedCursor from '@/utils/Cursor';
import CanvasParticles from '@/utils/Particles';
import Navbar from '@/layout/Navbar'

const Hero = lazy(() => import('@/components/Hero'))

const App = () => {
  return (
    <Wrapper className='w-full bg-primary font-poppins'>
      <Navbar />
      <AnimatedCursor />
      <CanvasParticles />
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-accent">Loading...</div>}>
        <Hero />
      </Suspense>
      <ResponsiveTester />
    </Wrapper>
  )
}

export default App