import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Possibility.scss'

gsap.registerPlugin(ScrollTrigger)

const Possibility = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const blobs = gsap.utils.toArray('.possibility__blob')
    const texts = gsap.utils.toArray('.possibility__text')

    // Parallax for blobs at different speeds
    blobs.forEach((blob, index) => {
      const speed = [0.3, 0.5, 0.7, 0.4][index] || 0.5

      gsap.to(blob, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Text fade in
    texts.forEach((text, index) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="possibility">
      <div className="possibility__background">
        <div className="possibility__blob possibility__blob--1" />
        <div className="possibility__blob possibility__blob--2" />
        <div className="possibility__blob possibility__blob--3" />
        <div className="possibility__blob possibility__blob--4" />
      </div>

      <div className="possibility__content">
        <div className="possibility__text possibility__text--1">
          <h2>But what if</h2>
          <p>it's not too late?</p>
        </div>

        <div className="possibility__text possibility__text--2">
          <h2>What if 7 days</h2>
          <p>could change everything?</p>
        </div>
      </div>
    </section>
  )
}

export default Possibility
