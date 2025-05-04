import React, { Suspense, lazy } from 'react'
import Loader from "@/components/Loader";

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import ResponsiveTester from '@/components/ResponsiveTester';
import Wrapper from '@/components/Wrapper';
import AnimatedCursor from '@/utils/Cursor';
// import GitHubStats from './components/GithubStats';

const Hero = lazy(() => import("@/components/Hero"))
const About = lazy(() => import("@/components/About"))
const Services = lazy(() => import("@/components/Services"))
const Projects = lazy(() => import("@/components/Projects"))
const Contact = lazy(() => import("@/components/Contact"))
import CanvasParticles from './components/Particles';

const App = () => {
  return (
    <Wrapper className='w-full h-fit overflow-x-hidden bg-primary font-poppins'>
      <Navbar />
      <AnimatedCursor />
      <CanvasParticles />
      <Suspense fallback={<Loader />} >
        <Hero />
        <About />
        <Services />
        <Projects />
        <ResponsiveTester />
        <Contact />
      </Suspense>
      <Footer />
    </Wrapper>
  )
}

export default App