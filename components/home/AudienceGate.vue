<script setup lang="ts">
const { funPaths, funStyle } = useFunPalette()

interface Gate {
  tag: string
  title: string
  description: string
  to: string
  ctaLabel: string
  icono: string
  color: string
}

defineProps<{
  gates: Gate[]
}>()
</script>

<template>
  <section class="bg-white py-12 md:py-16">
    <div class="container-wide">
      <div class="mb-8 text-center">
        <span class="inline-flex items-center gap-2 rounded-badge bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          ¿Qué te trae aquí?
        </span>
        <h2 class="mt-3 text-2xl font-bold text-ink md:text-3xl">
          Elige tu camino en el observatorio
        </h2>
        <p class="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-custom md:text-base">
          Hicimos esta plataforma para tres audiencias distintas. Te llevamos directo al contenido que más te sirve.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="gate in gates"
          :key="gate.title"
          :to="gate.to"
          class="fun-card fun-card-link"
          :style="funStyle(gate.color)"
          :aria-label="`${gate.title} — ${gate.description}`"
        >
          <span class="fun-card-hint">{{ gate.tag }}</span>
          <div class="fun-card-icon-wrap" aria-hidden="true">
            <span class="fun-card-icon-halo" />
            <span class="fun-card-icon-bubble" />
            <svg
              class="fun-card-icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path v-for="(d, i) in funPaths(gate.icono)" :key="i" :d="d" />
            </svg>
            <span class="fun-card-spark fun-card-spark--1" />
            <span class="fun-card-spark fun-card-spark--2" />
            <span class="fun-card-spark fun-card-spark--3" />
          </div>
          <h3 class="fun-card-label">{{ gate.title }}</h3>
          <p class="fun-card-desc">{{ gate.description }}</p>
          <span class="fun-card-cta">
            {{ gate.ctaLabel }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-1.5 h-3 w-3"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
