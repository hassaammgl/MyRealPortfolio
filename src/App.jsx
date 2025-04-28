import React, { Suspense, lazy } from 'react'
import Loader from "@/components/Loader";

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import ResponsiveTester from '@/components/ResponsiveTester';
import Wrapper from '@/components/Wrapper';
import AnimatedCursor from '@/utils/Cursor';
// import GitHubStats from './components/GithubStats';

const Hero = lazy(() => import("./components/Hero"))
const About = lazy(() => import("./components/About"))
const Skills = lazy(() => import("./components/Skills"))
const Hobby = lazy(() => import("./components/Hobby"))
const Reads = lazy(() => import("./components/Reads"))
const Projects = lazy(() => import("./components/Projects"))
const Contact = lazy(() => import("./components/Contact"))

const App = () => {


  return (
    <Wrapper className='w-full h-fit overflow-x-hidden bg-primary font-poppins'>
      <Navbar />
      <AnimatedCursor />
      <Suspense fallback={<Loader />} >
        <Hero />
        {/* <GitHubStats /> */}
        <About />
        <Skills />
        <ResponsiveTester />
        <Hobby />
        <Reads />
        <Projects />
        <Contact />
      </Suspense>
      <Footer />
    </Wrapper>
  )
}

export default App