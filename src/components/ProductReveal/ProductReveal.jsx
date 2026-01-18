import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductReveal.scss'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 1,
    title: 'One prompt per day',
    description: 'Thoughtful questions designed to rebuild connection.',
    screen: 'Day 1: What do you miss about us?',
  },
  {
    id: 2,
    title: 'Share your link',
    description: 'Send an invite to the person you want to reconnect with.',
    screen: 'Share your Rekindle journey',
  },
  {
    id: 3,
    title: 'They respond',
    description: 'Each of you answers privately, then reveals together.',
    screen: 'New response from Sarah',
  },
  {
    id: 4,
    title: '7 days later',
    description: 'A foundation rebuilt. A conversation restarted.',
    screen: 'Journey Complete 🔥',
  },
]

const ProductReveal = () => {
  const sectionRef = useRef(null)
  const phoneRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const phone = phoneRef.current
    const featureElements = gsap.utils.toArray('.product-reveal__feature')

    // 3D phone rotation on scroll
    gsap.fromTo(
      phone,
      {
        rotateX: 15,
        rotateY: -15,
        scale: 0.9,
      },
      {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      }
    )

    // Create scroll trigger for each feature
    featureElements.forEach((feature, index) => {
      ScrollTrigger.create({
        trigger: feature,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveFeature(index),
        onEnterBack: () => setActiveFeature(index),
      })
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
    <section ref={sectionRef} className="product-reveal">
      <div className="product-reveal__header">
        <div className="product-reveal__logo">
          <span className="product-reveal__logo-text">rekindle</span>
          <div className="product-reveal__fire">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="product-reveal__flame">🔥</span>
            ))}
          </div>
        </div>
        <p className="product-reveal__tagline">7 days. 7 questions. No hiding.</p>
      </div>

      <div className="product-reveal__container">
        <div className="product-reveal__features">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`product-reveal__feature ${activeFeature === index ? 'active' : ''}`}
            >
              <div className="product-reveal__feature-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="product-reveal__feature-title">{feature.title}</h3>
              <p className="product-reveal__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="product-reveal__phone-container">
          <div ref={phoneRef} className="product-reveal__phone">
            <div className="product-reveal__phone-frame">
              <div className="product-reveal__phone-notch" />
              <div className="product-reveal__phone-screen">
                <div className="product-reveal__screen-content">
                  <div className="product-reveal__app-header">
                    <span className="product-reveal__day">Day {activeFeature + 1}</span>
                  </div>
                  <div className="product-reveal__app-body">
                    <p className="product-reveal__prompt">
                      {features[activeFeature].screen}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReveal
