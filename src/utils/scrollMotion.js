import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Soft lag that pairs well with Lenis */
export const scrubSoft = 0.65
export const scrubMed = 0.9

/**
 * One-shot enter reveal (not scrubbed).
 * Prefer opacity / clip / x — leave y free for parallax.
 */
export function revealIn(targets, vars = {}, st = {}) {
  return gsap.from(targets, {
    opacity: 0,
    duration: 0.95,
    ease: 'expo.out',
    clearProps: 'filter',
    ...vars,
    scrollTrigger: {
      start: 'top 82%',
      toggleActions: 'play none none none',
      ...st,
    },
  })
}

/** Continuous parallax while the trigger is in view */
export function parallaxY(target, fromY, toY, trigger, extra = {}) {
  return gsap.fromTo(
    target,
    { y: fromY },
    {
      y: toY,
      ease: 'none',
      ...extra,
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrubMed,
        ...(extra.scrollTrigger || {}),
      },
    },
  )
}

export function killTweens(tweens) {
  tweens.forEach((t) => {
    t?.scrollTrigger?.kill()
    t?.kill?.()
  })
}
