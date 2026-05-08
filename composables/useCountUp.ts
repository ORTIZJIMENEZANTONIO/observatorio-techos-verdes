/**
 * Animated count-up for KPI numbers.
 *
 * Usage:
 *   const target = ref(57)
 *   const { display, start } = useCountUp(target, { duration: 1500 })
 *   onMounted(start)
 *   <span>{{ Math.round(display) }}</span>
 *
 * Respects prefers-reduced-motion (jumps straight to target).
 */
interface UseCountUpOptions {
  duration?: number
  delay?: number
}

export function useCountUp(
  target: MaybeRef<number>,
  options: UseCountUpOptions = {},
) {
  const { duration = 1500, delay = 0 } = options

  const display = ref(0)
  let rafId: number | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

  const stop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const start = () => {
    stop()
    const finalValue = unref(target)

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      display.value = finalValue
      return
    }

    const begin = () => {
      const startValue = display.value
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(elapsed / duration, 1)
        display.value = startValue + (finalValue - startValue) * easeOutExpo(t)
        if (t < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          rafId = null
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    if (delay > 0) {
      timeoutId = setTimeout(begin, delay)
    } else {
      begin()
    }
  }

  watch(
    () => unref(target),
    () => start(),
  )

  onUnmounted(stop)

  return { display, start, stop }
}
