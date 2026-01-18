import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.scss'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const content = contentRef.current
    const words = title.querySelectorAll('.word')

    // Initial word reveal animation
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 50,
        rotateX: -15,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.3,
      }
    )

    // Scroll indicator fade in
    gsap.fromTo(
      '.hero__scroll-indicator',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' }
    )

    // Fade out and scale on scroll
    gsap.to(content, {
      opacity: 0,
      scale: 1.1,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth) * 100
    const y = (clientY / window.innerHeight) * 100

    document.documentElement.style.setProperty('--mouse-x', `${x}%`)
    document.documentElement.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      className="hero"
      onMouseMove={handleMouseMove}
    >
      <div className="hero__background" />

      <div ref={contentRef} className="hero__content">
        <h1 ref={titleRef} className="hero__title">
          <span className="word">what</span>{' '}
          <span className="word">if</span>{' '}
          <span className="word">you</span>{' '}
          <span className="word">could</span>
          <br />
          <span className="word">go</span>{' '}
          <span className="word">back?</span>
        </h1>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">scroll to begin</span>
        <div className="hero__scroll-arrow">↓</div>
      </div>
    </section>
  )
}

export default Hero
