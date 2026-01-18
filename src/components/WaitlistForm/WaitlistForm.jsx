import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './WaitlistForm.scss'

const WaitlistForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setStatus('loading')
    setError('')

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success!
      setStatus('success')

      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F97316', '#FBBF24', '#FB923C', '#FED7AA'],
      })

      // Fire more confetti from sides
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#F97316', '#FBBF24', '#FB923C'],
        })
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#F97316', '#FBBF24', '#FB923C'],
        })
      }, 200)
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Try again?')
    }
  }

  const handleShare = (platform) => {
    const shareText = "I just joined the Rekindle waitlist! 🔥 7 days to reconnect with someone you miss."
    const shareUrl = window.location.href

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      instagram: shareUrl, // Instagram doesn't support direct sharing
      copy: shareUrl,
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied!')
    } else {
      window.open(urls[platform], '_blank')
    }
  }

  return (
    <section className="waitlist">
      <div className="waitlist__container">
        <div className="waitlist__logo">
          <span className="waitlist__logo-text">rekindle</span>
          <div className="waitlist__fire">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="waitlist__flame">🔥</span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="waitlist__form-container"
            >
              <h2 className="waitlist__title">
                Be the first to<br />reconnect.
              </h2>

              <form onSubmit={handleSubmit} className="waitlist__form">
                <div className="waitlist__input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="Enter your email"
                    className="waitlist__input"
                    disabled={status === 'loading'}
                  />
                  {error && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="waitlist__error"
                    >
                      {error}
                    </motion.span>
                  )}
                </div>

                <button
                  type="submit"
                  className="waitlist__button"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="waitlist__loading">
                      <span className="waitlist__spinner" />
                      Joining...
                    </span>
                  ) : (
                    <>Join the Waitlist 🔥</>
                  )}
                </button>
              </form>

              <p className="waitlist__privacy">
                We'll never spam. Pinky promise.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="waitlist__success"
            >
              <span className="waitlist__success-emoji">💝</span>
              <h2 className="waitlist__success-title">You're in.</h2>
              <p className="waitlist__success-text">
                We'll reach out soon.<br />
                In the meantime...
              </p>

              <button className="waitlist__share-button">
                Share with someone you want to reconnect with
              </button>

              <div className="waitlist__social">
                <button onClick={() => handleShare('twitter')}>Twitter</button>
                <button onClick={() => handleShare('instagram')}>Instagram</button>
                <button onClick={() => handleShare('copy')}>Copy Link</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}

export default WaitlistForm
