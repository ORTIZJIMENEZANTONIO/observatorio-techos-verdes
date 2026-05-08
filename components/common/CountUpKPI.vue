<script setup lang="ts">
/**
 * Tarjeta KPI con número animado (count-up) y opción de hacerse clickeable
 * para llevar a la fuente referenciada.
 *
 * Si se proporciona `target` numérico, anima desde 0 al valor cuando entra al
 * viewport. Si `target` no es numérico (ej. "75 %", "7 M"), muestra el valor
 * directo sin animar el número pero con un fade-in.
 *
 * Si se proporciona `href`, el card se renderiza como <a> y abre la fuente.
 */
interface Props {
  /** Valor numérico a animar. Si se omite, se muestra `display` directo. */
  target?: number
  /** Sufijo del número (ej. " ODS", " %", " M"). */
  suffix?: string
  /** Valor pre-formateado cuando target no es número (ej. "75 %"). */
  display?: string
  /** Etiqueta secundaria (debajo del número). */
  unidad?: string
  /** Texto descriptivo. */
  detalle: string
  /** Texto de la fuente. */
  fuente: string
  /** URL externa o interna. Si está presente, el card es clickeable. */
  href?: string
  /** Color del número (clase Tailwind). Default: text-primary. */
  numberClass?: string
  /** Decimales a mostrar (default 0). */
  decimals?: number
  /** Duración del count-up en ms (default 1500). */
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  numberClass: 'text-primary',
  decimals: 0,
  duration: 1500,
})

// El ref puede apuntar a un Element (<a>, <div>) o a la instancia del
// componente <NuxtLink>. Tipamos como `unknown` y resolvemos el DOM en runtime.
const cardRef = ref<unknown>(null)
const hasNumeric = computed(() => typeof props.target === 'number')
const targetRef = computed(() => props.target ?? 0)
const { display: counter, start } = useCountUp(targetRef, { duration: props.duration })

const formatted = computed(() => {
  if (!hasNumeric.value) return props.display ?? ''
  const n = counter.value
  if (props.decimals > 0) return n.toFixed(props.decimals)
  return Math.round(n).toLocaleString('es-MX')
})

const isExternal = computed(() => !!props.href && /^https?:\/\//.test(props.href))
const isHash = computed(() => !!props.href && props.href.startsWith('#'))

/** Resuelve el DOM Element subyacente, ya sea que el ref apunte a un Element
 *  directamente o a una instancia de componente Vue (e.g. <NuxtLink>). */
function resolveEl(r: unknown): Element | null {
  if (!r) return null
  if (r instanceof Element) return r
  // Componente Vue: intenta .$el (instancia pública) o .vnode.el
  const anyR = r as { $el?: unknown; vnode?: { el?: unknown } }
  const el = anyR.$el ?? anyR.vnode?.el
  return el instanceof Element ? el : null
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined' || !hasNumeric.value) {
    return
  }
  const el = resolveEl(cardRef.value)
  if (!el) return

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          start()
          obs.disconnect()
        }
      }
    },
    { threshold: 0.2 },
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

const cardClass = computed(() =>
  props.href
    ? 'kpi-card group relative cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card-hover'
    : 'kpi-card group relative',
)
</script>

<template>
  <!-- Externa: <a target="_blank"> -->
  <a
    v-if="href && isExternal"
    ref="cardRef"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="cardClass"
  >
    <span
      class="absolute right-3 top-3 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </span>
    <p class="text-3xl font-bold tabular-nums" :class="numberClass">
      <span>{{ formatted }}</span><span v-if="suffix">{{ suffix }}</span>
    </p>
    <p v-if="unidad" class="text-xs font-semibold uppercase tracking-wider text-eco-dark">{{ unidad }}</p>
    <p class="mt-1 text-sm text-slate-custom">{{ detalle }}</p>
    <p class="mt-2 text-[10px] italic text-ink-muted group-hover:text-primary transition-colors">
      {{ fuente }}
      <span class="ml-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">→</span>
    </p>
  </a>

  <!-- Ancla en la misma página: <a href="#..."> (NuxtLink no maneja anclas SSR limpiamente) -->
  <a
    v-else-if="href && isHash"
    ref="cardRef"
    :href="href"
    :class="cardClass"
  >
    <span
      class="absolute right-3 top-3 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
    <p class="text-3xl font-bold tabular-nums" :class="numberClass">
      <span>{{ formatted }}</span><span v-if="suffix">{{ suffix }}</span>
    </p>
    <p v-if="unidad" class="text-xs font-semibold uppercase tracking-wider text-eco-dark">{{ unidad }}</p>
    <p class="mt-1 text-sm text-slate-custom">{{ detalle }}</p>
    <p class="mt-2 text-[10px] italic text-ink-muted group-hover:text-primary transition-colors">
      {{ fuente }}
      <span class="ml-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">↓</span>
    </p>
  </a>

  <!-- Ruta interna: <NuxtLink> -->
  <NuxtLink
    v-else-if="href"
    ref="cardRef"
    :to="href"
    :class="cardClass"
  >
    <span
      class="absolute right-3 top-3 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </span>
    <p class="text-3xl font-bold tabular-nums" :class="numberClass">
      <span>{{ formatted }}</span><span v-if="suffix">{{ suffix }}</span>
    </p>
    <p v-if="unidad" class="text-xs font-semibold uppercase tracking-wider text-eco-dark">{{ unidad }}</p>
    <p class="mt-1 text-sm text-slate-custom">{{ detalle }}</p>
    <p class="mt-2 text-[10px] italic text-ink-muted group-hover:text-primary transition-colors">
      {{ fuente }}
      <span class="ml-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">→</span>
    </p>
  </NuxtLink>

  <!-- Sin link: <div> estático -->
  <div v-else ref="cardRef" :class="cardClass">
    <p class="text-3xl font-bold tabular-nums" :class="numberClass">
      <span>{{ formatted }}</span><span v-if="suffix">{{ suffix }}</span>
    </p>
    <p v-if="unidad" class="text-xs font-semibold uppercase tracking-wider text-eco-dark">{{ unidad }}</p>
    <p class="mt-1 text-sm text-slate-custom">{{ detalle }}</p>
    <p class="mt-2 text-[10px] italic text-ink-muted">{{ fuente }}</p>
  </div>
</template>
