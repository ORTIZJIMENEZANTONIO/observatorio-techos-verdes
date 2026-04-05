<template>
  <section class="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
    <div class="container-wide">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- Left content -->
        <div class="reveal-left" ref="aiLeft">
          <span class="mb-4 inline-flex items-center gap-1.5 rounded-badge bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-eco-light">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Inteligencia Artificial
          </span>

          <h2 class="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Validación asistida por Inteligencia Artificial
          </h2>

          <p class="mt-4 text-base leading-relaxed text-white/70">
            Utilizamos modelos de visión computacional para analizar imágenes satelitales de alta resolución y detectar vegetación en techos de edificaciones. El proceso combina detección automatizada con revisión humana para garantizar la calidad de los datos.
          </p>

          <!-- Key point disclaimer -->
          <div class="mt-5 rounded-lg border border-white/10 bg-white/5 p-4">
            <div class="flex items-start gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p class="text-sm leading-relaxed text-white/80">
                La IA apoya la detección y validación visual. <strong class="text-white">No reemplaza el dictamen técnico profesional.</strong>
              </p>
            </div>
          </div>

          <NuxtLink to="/ia-validacion" class="btn mt-6 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus:ring-white/30">
            Explorar validaciones
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Mini stats -->
        <div ref="aiStats" class="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm reveal"
          >
            <div :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', stat.iconBg]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                :class="stat.iconColor"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="stat.iconPath"
              />
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
              <div class="text-xs font-medium text-white/50">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { revealRef: aiLeft } = useScrollReveal()
const { revealRef: aiStats } = useScrollReveal({ stagger: true })

const stats = [
  {
    value: '1,240',
    label: 'Detecciones procesadas',
    iconBg: 'bg-eco/20',
    iconColor: 'text-eco-light',
    iconPath: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    value: '87.3%',
    label: 'Precisión promedio',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary-light',
    iconPath: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  },
  {
    value: '156',
    label: 'Validaciones pendientes',
    iconBg: 'bg-accent/20',
    iconColor: 'text-accent-light',
    iconPath: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  },
]
</script>
