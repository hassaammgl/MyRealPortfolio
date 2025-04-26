import { Element } from 'react-scroll'
import { AnimatedMarquee } from '@/utils/About'

const About = () => {
  return (
    <Element name="About">
      <section className="relative h-dvh w-screen ">
        <AnimatedMarquee />

      </section>
    </Element>
  )
}



export default About
