<template>
  <section class="section-padding">
    <div class="container-wide">
      <CommonSectionTitle
        tag="Mapa interactivo"
        title="Explora la ciudad"
        subtitle="Visualiza techos verdes existentes, candidatos y la aptitud territorial de cada zona en un mapa interactivo."
        centered
      />

      <div ref="mapCard" class="card overflow-hidden reveal-scale">
        <!-- Real Leaflet map preview -->
        <div class="relative h-80 md:h-96">
          <ClientOnly>
            <MapPanel
              :markers="previewMarkers"
              :center="[19.3900, -99.1500]"
              :zoom="11"
              :show-heat-overlay="false"
              :selected-marker-id="null"
            />
            <template #fallback>
              <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 via-surface to-eco/5">
                <div class="text-center">
                  <div class="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p class="text-sm text-slate-custom">Cargando mapa...</p>
                </div>
              </div>
            </template>
          </ClientOnly>

          <!-- Filter chips overlay -->
          <div class="pointer-events-none absolute bottom-4 left-4 z-[500] flex flex-wrap gap-2">
            <span
              v-for="chip in filterChips"
              :key="chip.label"
              :class="[
                'pointer-events-auto inline-flex items-center gap-1.5 rounded-badge px-3 py-1.5 text-xs font-medium shadow-sm',
                chip.active ? 'bg-primary text-white' : 'border border-gray-200 bg-white text-ink',
              ]"
            >
              <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: chip.dotHex }" />
              {{ chip.label }}
            </span>
          </div>
        </div>

        <!-- Bottom CTA bar -->
        <div class="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
          <p class="text-sm text-slate-custom">
            Datos georreferenciados de las 16 alcaldias de la CDMX
          </p>
          <NuxtLink to="/mapa" class="btn-primary btn-sm">
            Abrir mapa
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'

const { revealRef: mapCard } = useScrollReveal()

interface PreviewMarker {
  id: number
  lat: number
  lng: number
  nombre: string
  tipo: 'existente' | 'candidato'
  color: string
  popupHtml: string
}

const previewMarkers = computed<PreviewMarker[]>(() => {
  return greenRoofs.slice(0, 10).map(r => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    nombre: r.nombre,
    tipo: 'existente' as const,
    color: '#0E5E3A',
    popupHtml: `
      <div class="popup-card">
        <div class="popup-title">${r.nombre}</div>
        <span class="popup-badge popup-badge-existente">Techo verde</span>
        <div class="popup-meta">
          <div class="popup-meta-row">
            <span class="popup-meta-label">Alcaldia</span>
            <span class="popup-meta-value">${r.alcaldia}</span>
          </div>
          <div class="popup-meta-row">
            <span class="popup-meta-label">Superficie</span>
            <span class="popup-meta-value">${r.superficie.toLocaleString()} m&sup2;</span>
          </div>
        </div>
      </div>
    `,
  }))
})

const filterChips = [
  { label: 'Techos existentes', dotHex: '#0E5E3A', active: true },
  { label: 'Candidatos', dotHex: '#F2A81D', active: false },
  { label: 'Aptitud territorial', dotHex: '#79C141', active: false },
]
</script>
