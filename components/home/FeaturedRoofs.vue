<template>
  <section class="section-padding bg-white">
    <div class="container-wide">
      <CommonSectionTitle
        tag="Destacados"
        title="Sitios candidatos prioritarios"
        subtitle="Edificaciones con mayor potencial para la implementación de techos verdes según nuestro modelo de aptitud."
        centered
      />

      <div ref="roofGrid" class="stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="roof in featuredRoofs"
          :key="roof.name"
          class="card-interactive flex flex-col overflow-hidden reveal"
        >
          <!-- Header with score -->
          <div class="relative bg-gradient-to-br from-primary-50 to-eco/10 px-5 pb-8 pt-5">
            <span class="badge-primary mb-2 text-[10px]">
              {{ roof.type }}
            </span>
            <h3 class="text-sm font-semibold text-ink">
              {{ roof.name }}
            </h3>
            <p class="mt-0.5 text-xs text-slate-custom">
              {{ roof.alcaldia }}
            </p>

            <!-- Score circle -->
            <div class="absolute -bottom-5 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card-hover ring-2 ring-white">
              <span
                class="text-sm font-bold"
                :class="roof.score >= 85 ? 'text-primary' : roof.score >= 80 ? 'text-eco-dark' : 'text-accent-dark'"
              >
                {{ roof.score }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col gap-3 px-5 pb-5 pt-7">
            <!-- Score bar -->
            <div>
              <div class="mb-1 flex items-center justify-between">
                <span class="text-[10px] font-medium uppercase tracking-wider text-slate-custom">
                  Puntuación de aptitud
                </span>
                <span class="text-xs font-semibold text-ink">{{ roof.score }}/100</span>
              </div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :class="roof.score >= 85 ? 'bg-primary' : roof.score >= 80 ? 'bg-eco' : 'bg-accent'"
                  :style="{ width: `${roof.score}%` }"
                />
              </div>
            </div>

            <!-- Area -->
            <div class="flex items-center gap-1.5 text-xs text-slate-custom">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
              <span>{{ roof.area.toLocaleString('es-MX') }} m²</span>
            </div>

            <!-- CTA -->
            <button class="mt-auto flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-light">
              Ver detalle
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { revealRef: roofGrid } = useScrollReveal({ stagger: true })

const featuredRoofs = [
  {
    name: 'Hospital General',
    alcaldia: 'Cuauhtémoc',
    type: 'Salud',
    score: 92,
    area: 4500,
  },
  {
    name: 'Mercado de Jamaica',
    alcaldia: 'Venustiano Carranza',
    type: 'Comercial',
    score: 87,
    area: 3200,
  },
  {
    name: 'Centro Comercial Perisur',
    alcaldia: 'Coyoacán',
    type: 'Comercial',
    score: 85,
    area: 8700,
  },
  {
    name: 'Bodega Aurrera Iztapalapa',
    alcaldia: 'Iztapalapa',
    type: 'Comercial',
    score: 78,
    area: 2100,
  },
]
</script>
