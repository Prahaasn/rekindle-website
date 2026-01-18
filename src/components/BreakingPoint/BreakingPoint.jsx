import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './BreakingPoint.scss'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  'You miss them.',
  'More than you\'d admit.',
  'And somewhere...',
  'they miss you too.',
]

const BreakingPoint = () => {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const lineElements = gsap.utils.toArray('.breaking-point__line')

    // Create sticky section with progress-based reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: stickyRef.current,
        scrub: 1,
      },
    })

    // Animate each line sequentially
    lineElements.forEach((line, index) => {
      const startProgress = index * 0.2
      const endProgress = startProgress + 0.15

      tl.fromTo(
        line,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.2,
          ease: 'power2.out',
        },
        startProgress
      )

      // Add glow effect
      if (index === 0) {
        tl.to(
          line,
          {
            textShadow: '0 0 30px rgba(249, 115, 22, 0.3)',
            duration: 0.1,
          },
          startProgress + 0.1
        )
      }
    })

    // Background color transition
    gsap.to(section, {
      backgroundColor: '#292524',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.pin === stickyRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="breaking-point">
      <div ref={stickyRef} className="breaking-point__sticky">
        <div className="breaking-point__content">
          {lines.map((line, index) => (
            <p
              key={index}
              className="breaking-point__line"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BreakingPoint
