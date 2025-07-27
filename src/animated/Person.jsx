// import { useRef, useEffect } from 'react'
// import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
// // import { useAnimationStore } from '@/store'

// export default function Person() {
//     const ref = useRef()
//     // const { animationPathName, setAnimationPathName } = useAnimationStore()
//     const { scene } = useGLTF('/3d/3d.glb')

//     // const animation = useFBX('/3d/animations/male-standing-pose-side.fbx')
//     // const animation = useFBX('/3d/animations/rest-from-back.fbx')
//     const animation = useFBX('/3d/animations/normal-idle.fbx')
//     // const animation = useFBX('/3d/animations/standing-idle.fbx')
//     // const animation = useFBX('/3d/animations/standing-with-elbow.fbx')

//     animation.animations[0].name = 'Standing'

//     const { actions, mixer } = useAnimations(animation.animations, ref)

//     useEffect(() => {
//         if (actions?.Standing) {
//             actions.Standing.reset().fadeIn(0.5).play()
//         }
//     }, [actions])

//     useFrame((state, delta) => {
//         mixer?.update(delta)
//         const head = ref.current.getObjectByName("Head");
//         if (head) {
//             head.lookAt(state.camera.position);
//         }
//     })

//     useEffect(() => {
//         if (ref.current) {
//             ref.current.position.set(0, -1, 0)
//             // ref.current.rotation.set(0, -180, 0)
//         }
//     }, [])

//     return <primitive ref={ref} object={scene} />
// }

// useGLTF.preload('/3d/3d.glb')


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

    useFrame((state, delta) => {
        mixer?.update(delta)
    })

    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(0, -1, 0)
        }
    }, [])

    return <primitive ref={ref} object={scene} />
}

useGLTF.preload('/3d/3d.glb')
