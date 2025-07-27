// import { Canvas } from '@react-three/fiber'
// import { Suspense, useRef } from 'react'
// import Person from './Person'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useAnimationStore } from '@/store'

// gsap.registerPlugin(ScrollTrigger)

// const steps = [
//   {
//     animation: 'idle',
//     transform: {
//       xPercent: 0,
//       yPercent: 10,
//       duration: 1,
//       opacity: 0
//     },
//   },
//   {
//     animation: 'elbow',
//     transform: {
//       xPercent: -120,
//       yPercent: 10,
//       duration: 1,
//       opacity: 1,
//     },
//   },
//   {
//     animation: 'back_relax',
//     transform: {
//       yPercent: 10,
//       xPercent: 120,
//       duration: 1
//     },
//   },
//   {
//     animation: 'side_stand',
//     transform: {
//       xPercent: -120,
//       yPercent: 10,
//       duration: 1
//     },
//   },
//   {
//     animation: 'front_stand',
//     transform: {
//       yPercent: 10,
//       xPercent: 120,
//       duration: 1
//     },
//   },
//   {
//     animation: 'idle_stand',
//     transform: {
//       xPercent: -120,
//       yPercent: 10,
//       duration: 1
//     },
//   },
// ]

// const Three = () => {
//   const { setAnimationName } = useAnimationStore()
//   const canvas = useRef(null)

//   useGSAP(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: canvas.current,
//         start: 'top top',
//         end: `+=${steps.length * 100}%`,
//         scrub: 1,
//         pin: true,
//         markers: true,
//       },
//       opacity: 0
//     })

//     steps.forEach((step, i) => {
//       tl.to(canvas.current, {
//         ...step.transform,
//         ease: 'power1.inOut',
//         onStart: () => {
//           console.log(`Step ${i + 1} start:`, step.animation)
//           setAnimationName(step.animation)
//         },
//         onComplete: () => {
//           console.log(`Step ${i + 1} complete`)
//         },
//       })
//     })
//   }, [])

//   return (
//     <div
//       ref={canvas}
//       id="canvas"
//       className="relative hidden w-full lg:w-1/5 h-[90vh] z-[100] mx-auto lg:flex items-center justify-center"
//     >
//       <Canvas camera={{ position: [0, 1, 5], fov: 30 }}>
//         <ambientLight intensity={1.5} />
//         <directionalLight position={[5, 5, 5]} />
//         <Suspense fallback={null}>
//           <Person />
//         </Suspense>
//       </Canvas>
//     </div>
//   )
// }

// export default Three


import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import Person from './Person';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimationStore } from '@/store';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { animation: 'idle' },
  { animation: 'elbow' },
  { animation: 'back_relax' },
  { animation: 'side_stand' },
  { animation: 'front_stand' },
  { animation: 'idle_stand' },
];

const Three = () => {
  const { setAnimationName } = useAnimationStore();
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const lastAnimation = useRef('');
  const progressRef = useRef(0);

  // Preload animations before starting
  useEffect(() => {
    const preload = async () => {
      // Minimum load time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsReady(true);
    };
    preload();
  }, []);

  useGSAP(() => {
    if (!isReady) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${steps.length * 100}%`,
        scrub: 0.7,
        pin: true,
        markers: false,
        onUpdate: (self) => {
          // Track scroll progress
          progressRef.current = self.progress;

          // Calculate current step based on scroll position
          const stepIndex = Math.min(
            Math.floor(self.progress * steps.length),
            steps.length - 1
          );

          const targetAnim = steps[stepIndex].animation;

          // Only update if animation changes
          if (lastAnimation.current !== targetAnim) {
            setAnimationName(targetAnim);
            lastAnimation.current = targetAnim;
          }
        },
        onRefresh: () => {
          // Recalculate on resize/refresh
          const stepIndex = Math.min(
            Math.floor(progressRef.current * steps.length),
            steps.length - 1
          );
          setAnimationName(steps[stepIndex].animation);
          lastAnimation.current = steps[stepIndex].animation;
        }
      }
    });

    // Create smooth movement path
    const positions = [
      { xPercent: 0, yPercent: 10 },
      { xPercent: -120, yPercent: 10 },
      { xPercent: 120, yPercent: 10 },
      { xPercent: -120, yPercent: 10 },
      { xPercent: 120, yPercent: 10 },
      { xPercent: -120, yPercent: 10 },
    ];

    // Create continuous animation path
    tl.to(containerRef.current, {
      motionPath: {
        path: positions,
        align: positions,
        autoRotate: false,
      },
      ease: "power1.inOut",
      duration: steps.length * 0.5,
    });
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className="relative hidden w-full lg:w-1/5 h-[90vh] z-[100] mx-auto lg:flex items-center justify-center"
    >
      <Canvas camera={{ position: [0, 1, 5], fov: 30 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<LoadingFallback />}>
          {isReady ? <Person /> : <LoadingFallback />}
        </Suspense>
      </Canvas>
    </div>
  );
};

const LoadingFallback = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#cccccc" transparent opacity={0.5} />
  </mesh>
);

export default Three;