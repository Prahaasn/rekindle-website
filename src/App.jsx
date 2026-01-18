import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import BreakingPoint from './components/BreakingPoint'
import Possibility from './components/Possibility'
import ProductReveal from './components/ProductReveal'
import Testimonials from './components/Testimonials'
import Urgency from './components/Urgency'
import WaitlistForm from './components/WaitlistForm'
import Footer from './components/Footer'

import './App.scss'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="app">
      <ScrollProgress />

      <main className="app__main">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: The Problem - Horizontal Scroll */}
        <ProblemSection />

        {/* Section 3: Breaking Point - Text Reveal */}
        <BreakingPoint />

        {/* Section 4: The Possibility - Parallax */}
        <Possibility />

        {/* Section 5: Product Reveal - 3D Phone */}
        <ProductReveal />

        {/* Section 6: Testimonials - Carousel */}
        <Testimonials />

        {/* Section 7: Urgency - Counter */}
        <Urgency />

        {/* Section 8: Waitlist Form - Email Capture */}
        <WaitlistForm />

        {/* Section 9: Footer */}
        <Footer />
      </main>
    </div>
  )
}

export default App
