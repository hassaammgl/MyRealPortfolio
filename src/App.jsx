import React, { lazy, Suspense, useState, useEffect } from 'react'
import Wrapper from '@/layout/Wrapper'
import Load from '@/layout/Load'
import AnimatedCursor from '@/utils/Cursor';
import Navbar from '@/layout/Navbar'
import Footer from '@/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'

const Hero = lazy(() => import('@/components/Hero'))
const About = lazy(() => import('@/components/About'))
const Services = lazy(() => import('@/components/Services'))
const Projects = lazy(() => import('@/components/Projects'))
const Contact = lazy(() => import('@/components/Contact'))

const App = () => {
  const [ready, setReady] = useState(false)

  // Warm chunks while the intro loader plays
  useEffect(() => {
    import('@/components/Hero')
    import('@/components/About')
    import('@/components/Services')
    import('@/components/Projects')
    import('@/components/Contact')
  }, [])

  return (
    <Wrapper className={`w-full bg-primary font-poppins min-h-dvh ${ready ? '' : 'h-dvh overflow-hidden'}`}>
      {!ready && <Load onComplete={() => setReady(true)} />}

      {ready && (
        <>
          <Navbar />
          <AnimatedCursor />
          <ScrollProgress />
          <Suspense fallback={<div className="h-dvh w-full bg-primary" aria-hidden />}>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
            <Footer />
          </Suspense>
        </>
      )}
    </Wrapper>
  )
}

export default App
