import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Testimonials.scss'

const testimonials = [
  {
    id: 1,
    quote: "We hadn't talked in 3 years. Now we talk every week.",
    names: 'Sarah & James',
    location: 'Portland, OR',
    relationship: 'Former best friends',
  },
  {
    id: 2,
    quote: "I finally told my dad what I'd been holding back for a decade.",
    names: 'Marcus',
    location: 'Chicago, IL',
    relationship: 'Father & Son',
  },
  {
    id: 3,
    quote: '7 days changed a 7 year silence.',
    names: 'Priya & Ananya',
    location: 'San Francisco, CA',
    relationship: 'Sisters',
  },
  {
    id: 4,
    quote: "I didn't think she'd respond. She did on Day 1.",
    names: 'Tyler',
    location: 'Austin, TX',
    relationship: 'Ex-partner',
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const nextTestimonial = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const goToTestimonial = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, [nextTestimonial])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__content">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="testimonials__item"
            >
              <blockquote className="testimonials__quote">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="testimonials__attribution">
                <span className="testimonials__names">
                  — {testimonials[current].names}
                </span>
                <span className="testimonials__location">
                  {testimonials[current].location}
                </span>
                <span className="testimonials__relationship">
                  {testimonials[current].relationship}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="testimonials__nav">
          <button
            className="testimonials__arrow testimonials__arrow--prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="testimonials__dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonials__dot ${index === current ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="testimonials__arrow testimonials__arrow--next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
