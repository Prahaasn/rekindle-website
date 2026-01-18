import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Custom hook for detecting when an element is in viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - Ref and isInView state
 */
export const useInView = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
  } = options

  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting

        if (inView) {
          setIsInView(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

/**
 * Hook for tracking scroll progress within an element
 * @returns {[React.RefObject, number]} - Ref and progress (0-1)
 */
export const useScrollProgress = () => {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = element.offsetHeight

      // Calculate progress from when element enters viewport to when it leaves
      const start = windowHeight
      const end = -elementHeight
      const current = rect.top

      const rawProgress = (start - current) / (start - end)
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))

      setProgress(clampedProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [ref, progress]
}

/**
 * Hook for triggering callback when element enters view
 */
export const useOnEnterView = (callback, options = {}) => {
  const hasTriggered = useRef(false)
  const [ref, isInView] = useInView({ ...options, triggerOnce: true })

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true
      callback()
    }
  }, [isInView, callback])

  return ref
}

export default useInView
