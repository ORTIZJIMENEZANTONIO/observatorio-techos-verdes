/**
 * Composable for scroll-triggered reveal animations using IntersectionObserver.
 *
 * Usage:
 *   const { revealRef } = useScrollReveal()
 *   <div ref="revealRef" class="reveal"> ... </div>
 *
 * Or for a container with staggered children:
 *   const { revealRef } = useScrollReveal({ stagger: true })
 *   <div ref="revealRef" class="stagger-children">
 *     <div class="reveal">child 1</div>
 *     <div class="reveal">child 2</div>
 *   </div>
 */
interface ScrollRevealOptions {
  /** Intersection threshold (0–1). Default: 0.15 */
  threshold?: number
  /** Root margin. Default: '0px 0px -60px 0px' (triggers slightly before element is in view) */
  rootMargin?: string
  /** If true, observes children with .reveal class inside the container */
  stagger?: boolean
  /** Only animate once. Default: true */
  once?: boolean
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    stagger = false,
    once = true,
  } = options

  const revealRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    const el = revealRef.value
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (stagger) {
              // Reveal all .reveal children inside the container
              const children = el.querySelectorAll('.reveal')
              children.forEach((child) => child.classList.add('is-visible'))
            } else {
              entry.target.classList.add('is-visible')
            }

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            if (stagger) {
              const children = el.querySelectorAll('.reveal')
              children.forEach((child) => child.classList.remove('is-visible'))
            } else {
              entry.target.classList.remove('is-visible')
            }
          }
        }
      },
      { threshold, rootMargin },
    )

    if (stagger) {
      observer.observe(el)
    } else {
      // If the element itself has .reveal, observe it
      if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right') || el.classList.contains('reveal-scale')) {
        observer.observe(el)
      }
      // Also observe any .reveal descendants
      el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((child) => {
        observer.observe(child)
      })
    }

    onUnmounted(() => {
      observer.disconnect()
    })
  })

  return { revealRef }
}
