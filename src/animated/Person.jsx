import { useRef, useEffect } from 'react'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useAnimationStore } from '@/store/index'

const animationsMap = {
    idle: '/3d/animations/normal-idle.fbx',
    stand: '/3d/animations/male-standing-pose-side.fbx',
    stand2: '/3d/animations/male-standing-pose.fbx',
    back: '/3d/animations/rest-from-back.fbx',
    elbow: '/3d/animations/standing-with-elbow.fbx',
    idle2: '/3d/animations/standing-idle.fbx',
}

export default function Person() {
    const ref = useRef()
    const { animationName } = useAnimationStore()
    const { scene } = useGLTF('/3d/3d.glb')
    const fbx = useFBX(animationsMap[animationName] || animationsMap.idle)
    fbx.animations[0].name = 'current'
    const { actions, mixer } = useAnimations(fbx.animations, ref)

    useEffect(() => {
        if (actions?.current) {
            actions.current.reset().fadeIn(0.5).play()
        }

        return () => {
            Object.values(actions).forEach((a) => a?.fadeOut(0.2))
        }
    }, [actions, animationName])


    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(0, -1, 0)
        }
    }, [])
    useFrame((state, delta) => {
        mixer?.update(delta)
    })

    return <primitive ref={ref} object={scene} />
}

useGLTF.preload('/3d/3d.glb')
Object.values(animationsMap).forEach(useFBX.preload)