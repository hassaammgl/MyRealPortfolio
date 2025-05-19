import React from 'react'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import ResponsiveTester from '@/components/ResponsiveTester';
import Wrapper from '@/components/Wrapper';
import AnimatedCursor from '@/utils/Cursor';
// import GitHubStats from './components/GithubStats';

import CanvasParticles from './components/Particles';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const App = () => {
  return (
    <Wrapper className='w-full bg-primary font-poppins'>
      <Navbar />
      <AnimatedCursor />
      <CanvasParticles />
      <ResponsiveTester />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </Wrapper>
  )
}

export default App