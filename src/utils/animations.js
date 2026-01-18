import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ===========================================
// GSAP ANIMATION UTILITIES
// ===========================================

/**
 * Animate text word by word
 */
export const animateTextReveal = (element, options = {}) => {
  const {
    trigger = null,
    start = 'top 80%',
    stagger = 0.05,
    duration = 0.8,
    y = 40,
    useScrollTrigger = true,
  } = options

  const words = element.querySelectorAll('.word')

  const animation = {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration,
    ease: 'power3.out',
    stagger,
  }

  if (useScrollTrigger) {
    animation.scrollTrigger = {
      trigger: trigger || element,
      start,
      toggleActions: 'play none none reverse',
    }
  }

  return gsap.fromTo(
    words,
    { opacity: 0, y, rotateX: -15 },
    animation
  )
}

/**
 * Create horizontal scroll section
 */
export const createHorizontalScroll = (container, panels, options = {}) => {
  const {
    scrub = 1,
    snap = true,
    ease = 'none',
  } = options

  const panelElements = gsap.utils.toArray(panels)
  const totalWidth = container.scrollWidth

  return gsap.to(panelElements, {
    xPercent: -100 * (panelElements.length - 1),
    ease,
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub,
      snap: snap ? 1 / (panelElements.length - 1) : false,
      end: () => '+=' + totalWidth,
    },
  })
}

/**
 * Create parallax effect
 */
export const createParallax = (element, options = {}) => {
  const {
    speed = 0.5,
    direction = 'y',
  } = options

  const props = {}
  props[direction === 'y' ? 'yPercent' : 'xPercent'] = -30 * speed

  return gsap.to(element, {
    ...props,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Animate counter up
 */
export const animateCounter = (element, options = {}) => {
  const {
    endValue = 0,
    duration = 2,
    start = 'top 80%',
    prefix = '',
    suffix = '',
  } = options

  return gsap.fromTo(
    element,
    { innerText: 0 },
    {
      innerText: endValue,
      duration,
      ease: 'power2.out',
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
      onUpdate: function () {
        element.innerText = prefix + Math.round(this.targets()[0].innerText).toLocaleString() + suffix
      },
    }
  )
}

/**
 * Create sticky section with progress-based reveals
 */
export const createStickyReveal = (trigger, items, options = {}) => {
  const {
    start = 'top top',
    end = '+=300%',
    staggerAmount = 0.25,
  } = options

  const itemElements = gsap.utils.toArray(items)
  const totalItems = itemElements.length

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      pin: true,
      scrub: 1,
    },
  })

  itemElements.forEach((item, index) => {
    const startProgress = index * staggerAmount
    const endProgress = startProgress + staggerAmount

    tl.fromTo(
      item,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      startProgress
    )

    // Keep visible until the next item appears
    if (index < totalItems - 1) {
      tl.to(item, { opacity: 1, duration: staggerAmount }, endProgress)
    }
  })

  return tl
}

/**
 * Create 3D rotation on scroll
 */
export const create3DRotation = (element, options = {}) => {
  const {
    rotateX = 15,
    rotateY = -15,
    start = 'top bottom',
    end = 'center center',
  } = options

  return gsap.fromTo(
    element,
    { rotateX, rotateY, transformPerspective: 1000 },
    {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: 1,
      },
    }
  )
}

/**
 * Split text into words for animation
 */
export const splitTextIntoWords = (text) => {
  return text.split(' ').map((word, index) => ({
    word,
    key: `word-${index}`,
  }))
}

/**
 * Batch animation for multiple elements
 */
export const batchFadeIn = (elements, options = {}) => {
  const {
    y = 30,
    stagger = 0.1,
    duration = 0.6,
    start = 'top 85%',
  } = options

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Refresh all ScrollTriggers (useful after dynamic content loads)
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh()
}

/**
 * Kill all ScrollTriggers (cleanup)
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export default {
  animateTextReveal,
  createHorizontalScroll,
  createParallax,
  animateCounter,
  createStickyReveal,
  create3DRotation,
  splitTextIntoWords,
  batchFadeIn,
  refreshScrollTriggers,
  killAllScrollTriggers,
}
