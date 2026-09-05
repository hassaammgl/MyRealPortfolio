import { useRef } from 'react'
import AnimatedText from '@/utils/AnimatedText'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    prefersReducedMotion,
    revealIn,
    killTweens,
    scrubSoft,
} from '@/utils/scrollMotion'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
    const footerRef = useRef(null)
    const markRef = useRef(null)
    const barRef = useRef(null)

    useGSAP(() => {
        if (!footerRef.current) return

        const reduceMotion = prefersReducedMotion()
        const tweens = []

        tweens.push(
            revealIn(markRef.current, {
                filter: reduceMotion ? 'none' : 'blur(12px)',
                scale: reduceMotion ? 1 : 0.92,
                duration: reduceMotion ? 0.35 : 1.2,
            }, { trigger: footerRef.current, start: 'top 92%' }),
        )

        tweens.push(
            revealIn(barRef.current, {
                y: reduceMotion ? 0 : 20,
                duration: 0.75,
                delay: 0.18,
                ease: 'power2.out',
            }, { trigger: footerRef.current, start: 'top 88%' }),
        )

        if (!reduceMotion) {
            tweens.push(
                gsap.fromTo(
                    markRef.current,
                    { y: 48, scale: 0.96 },
                    {
                        y: -56,
                        scale: 1.04,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: scrubSoft,
                        },
                    },
                ),
            )
        }

        return () => killTweens(tweens)
    }, { scope: footerRef })

    return (
        <footer ref={footerRef} className="text-white font-Audiowide overflow-hidden">
            <h1
                ref={markRef}
                className="text-[15vw] font-ruslan text-center font-light mt-10 uppercase leading-48 will-change-transform"
            >
                <AnimatedText start="top 100%" className="text-tertiary" text={"HASSAAM"} />
            </h1>
            <div
                ref={barRef}
                className="bg-accent text-white text-sm py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <p>Copyright © hassaammgl {new Date().getFullYear()}</p>
                <p>📍 PAKISTAN |🇵🇰| PUNJAB</p>
                <div className="flex gap-4 underline">
                    <a href="#">Github</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
