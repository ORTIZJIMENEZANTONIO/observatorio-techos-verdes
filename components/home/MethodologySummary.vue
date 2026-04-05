<template>
  <section class="section-padding">
    <div class="container-wide">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- Left: description -->
        <div ref="methoLeft" class="reveal-left">
          <CommonSectionTitle
            tag="Metodología"
            title="Modelo de aptitud territorial"
            subtitle="8 variables, pesos derivados del Proceso Analítico Jerárquico (AHP)"
          />

          <p class="mb-6 text-sm leading-relaxed text-slate-custom">
            El modelo integra variables ambientales, urbanas y de infraestructura para generar un índice de aptitud que permite priorizar zonas de la ciudad para la implementación de techos verdes.
          </p>

          <NuxtLink to="/metodologia" class="btn-outline">
            Conocer la metodología completa
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: variable bars -->
        <div ref="methoRight" class="card p-6 reveal-right">
          <h4 class="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-custom">
            Pesos de las variables (AHP)
          </h4>

          <div class="space-y-3.5">
            <div
              v-for="variable in variables"
              :key="variable.name"
              class="group"
            >
              <div class="mb-1 flex items-center justify-between">
                <span class="text-sm font-medium text-ink">{{ variable.name }}</span>
                <span class="text-xs font-semibold tabular-nums" :class="variable.textColor">
                  {{ variable.weight.toFixed(2) }}%
                </span>
              </div>
              <div class="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full"
                  style="animation: progressFill 1s cubic-bezier(0.22, 1, 0.36, 1) both;"
                  :class="variable.barColor"
                  :style="{ width: `${(variable.weight / maxWeight) * 100}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { revealRef: methoLeft } = useScrollReveal()
const { revealRef: methoRight } = useScrollReveal()

const variables = [
  { name: 'LST (temperatura superficial)', weight: 34.31, barColor: 'bg-primary', textColor: 'text-primary' },
  { name: 'Área urbanizada', weight: 19.70, barColor: 'bg-primary-light', textColor: 'text-primary-light' },
  { name: 'Población', weight: 15.12, barColor: 'bg-secondary', textColor: 'text-secondary' },
  { name: 'NDVI', weight: 10.86, barColor: 'bg-eco', textColor: 'text-eco-dark' },
  { name: 'O₃ (ozono)', weight: 7.03, barColor: 'bg-accent', textColor: 'text-accent-dark' },
  { name: 'Densidad vial', weight: 5.27, barColor: 'bg-accent-light', textColor: 'text-accent-dark' },
  { name: 'CO (monóxido de carbono)', weight: 4.35, barColor: 'bg-alert', textColor: 'text-alert' },
  { name: 'NO₂ (dióxido de nitrógeno)', weight: 3.36, barColor: 'bg-alert-light', textColor: 'text-alert' },
]

const maxWeight = Math.max(...variables.map(v => v.weight))
</script>
