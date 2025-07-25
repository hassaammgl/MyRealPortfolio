import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Person from './Person'
import { OrbitControls } from '@react-three/drei'

const Three = () => {
  return (
    <div className="w-full hidden lg:w-1/3  lg:flex items-center justify-center h-[80vh] relative">
      <Canvas camera={{ position: [0, 1, 5], fov: 30 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        {/* <OrbitControls enableZoom={false} /> */}
        <Suspense fallback={null}>
          <Person />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Three
