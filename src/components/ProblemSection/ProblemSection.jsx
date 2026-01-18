import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProblemSection.scss'

gsap.registerPlugin(ScrollTrigger)

const panels = [
  {
    id: 1,
    text: '"Remember when you talked for hours?"',
    subtext: 'Before life got in the way.',
  },
  {
    id: 2,
    text: '"The call you didn\'t make."',
    subtext: 'The text you typed but never sent.',
  },
  {
    id: 3,
    text: '"Days turn to months. Months to years."',
    subtext: 'Distance grows in silence.',
  },
  {
    id: 4,
    text: '"Until one day, you realize..."',
    subtext: 'Time keeps moving without them.',
  },
]

const ProblemSection = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const panelElements = gsap.utils.toArray('.problem-panel')

    // Create horizontal scroll animation
    const scrollTween = gsap.to(panelElements, {
      xPercent: -100 * (panelElements.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        snap: 1 / (panelElements.length - 1),
        end: () => '+=' + container.offsetWidth,
      },
    })

    // Animate text within each panel
    panelElements.forEach((panel, index) => {
      const text = panel.querySelector('.problem-panel__text')
      const subtext = panel.querySelector('.problem-panel__subtext')

      gsap.fromTo(
        [text, subtext],
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left center',
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
    <section ref={sectionRef} className="problem-section">
      <div ref={containerRef} className="problem-section__container">
        {panels.map((panel, index) => (
          <div key={panel.id} className="problem-panel">
            <div className="problem-panel__content">
              <p className="problem-panel__text">{panel.text}</p>
              <p className="problem-panel__subtext">{panel.subtext}</p>
            </div>
            <div className="problem-panel__number">{String(index + 1).padStart(2, '0')}</div>
          </div>
        ))}
      </div>

      <div className="problem-section__progress">
        <div className="problem-section__progress-track">
          <div className="problem-section__progress-bar" />
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
