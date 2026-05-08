/**
 * Composable for scroll-triggered reveal animations using IntersectionObserver.
 *
 * Revisión 2: ahora cada `.reveal` se observa individualmente con threshold
 * cercano a 0 y rootMargin neutral, de modo que aparece tan pronto como cualquier
 * pixel del elemento entra al viewport. Se mantiene compatibilidad con
 * `stagger: true` (ahora atajo: añade `.is-visible` a todos los hermanos cuando
 * el primero entra). Se añade un fail-safe que revela todo después de 1.5s
 * por si el observer no dispara (e.g., bloqueado por una transición de página).
 *
 * Usage:
 *   const { revealRef } = useScrollReveal()
 *   <div ref="revealRef" class="reveal"> ... </div>
 *
 * Para contenedores con muchos hijos:
 *   const { revealRef } = useScrollReveal()
 *   <div ref="revealRef" class="stagger-children">
 *     <div class="reveal">child 1</div>
 *     <div class="reveal">child 2</div>
 *   </div>
 *   El stagger viene del CSS (`.stagger-children > .reveal:nth-child(N)`).
 */
interface ScrollRevealOptions {
  /** IntersectionObserver threshold. Default: 0 (cualquier pixel visible). */
  threshold?: number
  /** Root margin. Default: '0px 0px -10% 0px' — dispara un poco antes del fondo. */
  rootMargin?: string
  /** Si true, al primer elemento que entra revela TODOS los hermanos a la vez. */
  stagger?: boolean
  /** Solo animar una vez. Default: true. */
  once?: boolean
  /** Fail-safe en ms. Si transcurre y nada se reveló, revela todo. Default: 1500. */
  failSafeMs?: number
}

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale'

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0,
    rootMargin = '0px 0px -10% 0px',
    stagger = false,
    once = true,
    failSafeMs = 1500,
  } = options

  const revealRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    // Resuelve el DOM Element subyacente, ya sea Element directo o instancia
    // de componente Vue (e.g., NuxtLink, custom component).
    const raw = revealRef.value as unknown
    let el: HTMLElement | null = null
    if (raw instanceof HTMLElement) {
      el = raw
    } else if (raw && typeof raw === 'object') {
      const inst = raw as { $el?: unknown }
      if (inst.$el instanceof HTMLElement) el = inst.$el
    }
    if (!el) return

    // Targets a observar
    const targets: Element[] = []
    if (el.matches(REVEAL_SELECTOR)) targets.push(el)
    el.querySelectorAll(REVEAL_SELECTOR).forEach((c) => targets.push(c))

    if (targets.length === 0) return

    // Helper: revela un elemento (o todos sus hermanos cuando stagger=true)
    const reveal = (target: Element) => {
      if (stagger) {
        const parent = target.parentElement || el
        parent
          .querySelectorAll(REVEAL_SELECTOR)
          .forEach((sibling) => sibling.classList.add('is-visible'))
      } else {
        target.classList.add('is-visible')
      }
    }

    const unreveal = (target: Element) => {
      if (stagger) {
        const parent = target.parentElement || el
        parent
          .querySelectorAll(REVEAL_SELECTOR)
          .forEach((sibling) => sibling.classList.remove('is-visible'))
      } else {
        target.classList.remove('is-visible')
      }
    }

    // SSR / no-IntersectionObserver fallback: revelar todo de inmediato
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((t) => t.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            unreveal(entry.target)
          }
        }
      },
      { threshold, rootMargin },
    )

    targets.forEach((t) => observer.observe(t))

    // Fail-safe: si pasaron failSafeMs y algo sigue invisible, revélalo.
    // Esto cubre transiciones de página o bugs raros del observer.
    const failSafeTimer = window.setTimeout(() => {
      targets.forEach((t) => {
        if (!t.classList.contains('is-visible')) {
          t.classList.add('is-visible')
        }
      })
    }, failSafeMs)

    onUnmounted(() => {
      observer.disconnect()
      window.clearTimeout(failSafeTimer)
    })
  })

  return { revealRef }
}
