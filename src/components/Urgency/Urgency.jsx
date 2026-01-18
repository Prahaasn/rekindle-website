import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Urgency.scss'

gsap.registerPlugin(ScrollTrigger)

const Urgency = () => {
  const sectionRef = useRef(null)
  const counterRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const counter = counterRef.current

    // Text reveal animation
    const textElements = section.querySelectorAll('.urgency__text-line')
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Counter animation
    if (!hasAnimated) {
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          setHasAnimated(true)
          gsap.fromTo(
            counter,
            { innerText: 0 },
            {
              innerText: 2847,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate: function () {
                counter.innerText = Math.round(this.targets()[0].innerText).toLocaleString()
              },
            }
          )
        },
      })
    }

    // Box pulse animation
    gsap.to('.urgency__counter-box', {
      boxShadow: '0 0 60px rgba(249, 115, 22, 0.4)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.trigger === counter) {
          trigger.kill()
        }
      })
    }
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="urgency">
      <div className="urgency__background" />

      <div className="urgency__content">
        <div className="urgency__text">
          <p className="urgency__text-line">"Every day you wait</p>
          <p className="urgency__text-line">is another day</p>
          <p className="urgency__text-line urgency__text-line--emphasis">without them."</p>
        </div>

        <div className="urgency__counter-box">
          <span className="urgency__fire">🔥</span>
          <span ref={counterRef} className="urgency__counter">0</span>
          <span className="urgency__counter-label">people already waiting</span>
        </div>
      </div>
    </section>
  )
}

export default Urgency
