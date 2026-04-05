<template>
  <section class="section-padding bg-white">
    <div class="container-wide">
      <CommonSectionTitle
        tag="Proceso"
        title="¿Cómo funciona?"
        subtitle="Desde la recolección de datos hasta la priorización de sitios, un flujo integral para impulsar la infraestructura verde."
        centered
      />

      <div class="relative mx-auto max-w-4xl">
        <!-- Connecting line (desktop) -->
        <div class="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent lg:block" />

        <!-- Steps -->
        <div ref="stepsContainer" class="stagger-children grid gap-8 md:gap-10 lg:grid-cols-1">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="reveal relative flex flex-col items-start gap-4 sm:flex-row sm:gap-6"
            :class="index % 2 === 1 ? 'lg:flex-row-reverse lg:text-right' : ''"
          >
            <!-- Number circle -->
            <div class="relative z-10 flex shrink-0">
              <div
                :class="[
                  'flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg',
                  step.bgColor,
                ]"
              >
                {{ index + 1 }}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <div class="rounded-card bg-surface p-5 shadow-card">
                <!-- Icon + Title -->
                <div
                  class="mb-2 flex items-center gap-2"
                  :class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''"
                >
                  <div :class="['flex h-8 w-8 items-center justify-center rounded-lg', step.iconBg]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      :class="step.iconColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      v-html="step.iconPath"
                    />
                  </div>
                  <h3 class="text-base font-semibold text-ink">
                    {{ step.title }}
                  </h3>
                </div>
                <p
                  class="text-sm leading-relaxed text-slate-custom"
                  :class="index % 2 === 1 ? 'lg:text-right' : ''"
                >
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { revealRef: stepsContainer } = useScrollReveal({ stagger: true })

const steps = [
  {
    title: 'Recolección de datos',
    description: 'Integración de datos satelitales, catastrales y ambientales de la CDMX para construir una base geoespacial robusta.',
    bgColor: 'bg-primary',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary',
    iconPath: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  },
  {
    title: 'Análisis territorial',
    description: 'Modelado multicriterio con 8 variables para evaluar la aptitud de zonas urbanas mediante el Proceso Analítico Jerárquico (AHP).',
    bgColor: 'bg-secondary',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    iconPath: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  },
  {
    title: 'Validación IA',
    description: 'Revisión asistida por inteligencia artificial de detecciones en techos, con análisis de imágenes satelitales de alta resolución.',
    bgColor: 'bg-eco',
    iconBg: 'bg-eco/10',
    iconColor: 'text-eco-dark',
    iconPath: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  },
  {
    title: 'Priorización',
    description: 'Identificación de sitios prioritarios para intervención verde basada en puntuación compuesta y necesidad territorial.',
    bgColor: 'bg-accent',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent-dark',
    iconPath: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  },
]
</script>
