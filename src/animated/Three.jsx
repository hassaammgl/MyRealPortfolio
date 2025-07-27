import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import Person from './Person'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimationStore } from '@/store'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    animation: 'idle',
    transform: {
      xPercent: 0,
      yPercent: 10,
      duration: 1
    },
  },
  {
    animation: 'elbow',
    transform: {
      xPercent: -120,
      yPercent: 10,
      duration: 1
    },
  },
  {
    animation: 'back',
    transform: {
      yPercent: 10,
      xPercent: 120,
      duration: 1
    },
  },
  {
    animation: 'stand2',
    transform: {
      xPercent: -120,
      yPercent: 10,
      duration: 1
    },
  },
  {
    animation: 'stand',
    transform: {
      yPercent: 10,
      xPercent: 120,
      duration: 1
    },
  },
  {
    animation: 'stand',
    transform: {
      xPercent: -120,
      yPercent: 10,
      duration: 1
    },
  },
]

const Three = () => {
  const { setAnimationName } = useAnimationStore()
  const canvas = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: canvas.current,
        start: 'top top',
        end: `+=${steps.length * 100}%`,
        scrub: 1,
        pin: true,
        markers: true,
      },
    })

    steps.forEach((step, i) => {
      tl.to(canvas.current, {
        ...step.transform,
        ease: 'power2.inOut',
        onStart: () => {
          console.log(`Step ${i + 1} start:`, step.animation)
          setAnimationName(step.animation)
        },
        onComplete: () => {
          console.log(`Step ${i + 1} complete`)
        },
      })
    })
  }, [])

  return (
    <div
      ref={canvas}
      id="canvas"
      className="relative hidden w-full lg:w-1/5 h-[90vh] z-[100] mx-auto lg:flex items-center justify-center"
    >
      <Canvas camera={{ position: [0, 1, 5], fov: 30 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Person />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Three
