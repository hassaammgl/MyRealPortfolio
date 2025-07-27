// import { useRef, useEffect } from 'react'
// import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
// import { useAnimationStore } from '@/store/index'

// const animationsMap = {
//     idle: '/3d/animations/normal-idle.fbx',
//     side_stand: '/3d/animations/male-standing-pose-side.fbx',
//     front_stand: '/3d/animations/male-standing-pose.fbx',
//     back_relax: '/3d/animations/rest-from-back.fbx',
//     elbow: '/3d/animations/standing-with-elbow.fbx',
//     idle_stand: '/3d/animations/standing-idle.fbx',
// }

// export default function Person() {
//     const ref = useRef()
//     const { animationName } = useAnimationStore()
//     const { scene } = useGLTF('/3d/3d.glb')
//     const fbx = useFBX(animationsMap[animationName] || animationsMap.idle)
//     fbx.animations[0].name = 'current'
//     const { actions, mixer } = useAnimations(fbx.animations, ref)

//     useEffect(() => {
//         if (actions?.current) {
//             actions.current.reset().fadeIn(1).play()
//         }

//         return () => {
//             Object.values(actions).forEach((a) => a?.fadeOut(0.2))
//         }
//     }, [actions, animationName])


//     useEffect(() => {
//         if (ref.current) {
//             ref.current.position.set(0, -1, 0)
//         }
//     }, [])
//     useFrame((state, delta) => {
//         mixer?.update(delta)
//     })

//     return <primitive ref={ref} object={scene} />
// }

// useGLTF.preload('/3d/3d.glb')
// Object.values(animationsMap).forEach(useFBX.preload)


import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAnimationStore } from '@/store/index';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const animationsMap = {
    idle: '/3d/animations/normal-idle.fbx',
    side_stand: '/3d/animations/male-standing-pose-side.fbx',
    front_stand: '/3d/animations/male-standing-pose.fbx',
    back_relax: '/3d/animations/rest-from-back.fbx',
    elbow: '/3d/animations/standing-with-elbow.fbx',
    idle_stand: '/3d/animations/standing-idle.fbx',
};

// Animation cache
const animationCache = {};

export default function Person() {
    const ref = useRef();
    const { animationName } = useAnimationStore();
    const { scene } = useGLTF('/3d/3d.glb');
    const mixer = useRef(new THREE.AnimationMixer());
    const prevAction = useRef(null);
    const currentAction = useRef(null);

    // Load and play animations
    useEffect(() => {
        let isMounted = true;
        let animationLoader = null;

        const loadAndPlay = async () => {
            if (!animationName || !mixer.current) return;

            // Try to get from cache
            let clip = animationCache[animationName];

            // Load if not cached
            if (!clip) {
                try {
                    const loader = new FBXLoader();
                    const fbx = await loader.loadAsync(animationsMap[animationName]);
                    clip = fbx.animations[0];
                    animationCache[animationName] = clip;
                } catch (error) {
                    console.error('Animation load error:', error);
                    return;
                }
            }

            if (!isMounted) return;

            // Stop if same animation is already playing
            if (currentAction.current?.clip === clip) return;

            const action = mixer.current.clipAction(clip);
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;

            // Stop previous action
            if (prevAction.current) {
                prevAction.current.stop();
            }

            // Smooth transition
            if (currentAction.current) {
                prevAction.current = currentAction.current;
                prevAction.current.fadeOut(0.3);
            }

            action.reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(0.3)
                .play();

            currentAction.current = action;
        };

        loadAndPlay();

        return () => {
            isMounted = false;
            if (animationLoader) {
                animationLoader.abort();
            }
        };
    }, [animationName]);

    useFrame((_, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return <primitive ref={ref} object={scene} position={[0, -1, 0]} />;
}

// Preload essential assets
useGLTF.preload('/3d/3d.glb');

// Preload animations in background
const preloadAnimations = () => {
    const loader = new FBXLoader();
    Object.entries(animationsMap).forEach(([key, url]) => {
        if (!animationCache[key]) {
            loader.load(url, (fbx) => {
                animationCache[key] = fbx.animations[0];
            });
        }
    });
};

preloadAnimations();