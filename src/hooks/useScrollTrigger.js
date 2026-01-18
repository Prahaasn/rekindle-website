import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for creating GSAP ScrollTrigger animations
 * @param {Function} animation - Animation function that receives the element ref
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {React.RefObject} - Ref to attach to the element
 */
export const useScrollTrigger = (animation, dependencies = []) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      animation(ref.current)
    }, ref)

    // Cleanup on unmount
    return () => ctx.revert()
  }, dependencies)

  return ref
}

/**
 * Hook for simple fade-in on scroll
 */
export const useFadeIn = (options = {}) => {
  const {
    y = 30,
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
  } = options

  return useScrollTrigger((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    )
  })
}

/**
 * Hook for parallax effect
 */
export const useParallax = (speed = 0.5) => {
  return useScrollTrigger((element) => {
    gsap.to(element, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

/**
 * Hook for pinned sections
 */
export const usePinned = (options = {}) => {
  const {
    endTrigger = null,
    end = '+=100%',
    pinSpacing = true,
  } = options

  return useScrollTrigger((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end,
      endTrigger,
      pin: true,
      pinSpacing,
    })
  })
}

export default useScrollTrigger
