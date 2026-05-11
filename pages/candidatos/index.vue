<template>
  <div class="bg-surface">
    <CommonHeroSection compact>
      <h1 class="text-3xl font-extrabold text-white md:text-4xl">Techos candidatos priorizados</h1>
      <p class="mt-2 text-base text-white/80">60 sitios identificados para potencial intervención verde</p>
    </CommonHeroSection>

    <!-- Content -->
    <section class="bg-white py-16">
      <div class="container-wide">
        <!-- Data disclaimer -->
        <CommonDataDisclaimer class="mt-6" />

        <!-- View toggle -->
        <div class="mt-6 flex items-center justify-between">
          <div class="flex gap-2">
            <button
              :class="[
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-ink-muted hover:bg-gray-200'
              ]"
              @click="viewMode = 'list'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 -mt-0.5 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Lista
            </button>
            <button
              :class="[
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                viewMode === 'map' ? 'bg-primary text-white' : 'bg-gray-100 text-ink-muted hover:bg-gray-200'
              ]"
              @click="viewMode = 'map'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 -mt-0.5 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              </svg>
              Mapa
            </button>
          </div>

          <!-- Sort -->
          <select v-model="sortBy" class="select !w-auto">
            <option value="score_desc">Score (mayor)</option>
            <option value="score_asc">Score (menor)</option>
            <option value="nombre_asc">Nombre (A-Z)</option>
            <option value="nombre_desc">Nombre (Z-A)</option>
            <option value="superficie_desc">Superficie (mayor)</option>
            <option value="superficie_asc">Superficie (menor)</option>
            <option value="alcaldia_asc">Alcaldía (A-Z)</option>
            <option value="estatus_asc">Estatus (A-Z)</option>
          </select>
        </div>

        <!-- Filters -->
        <div class="mt-4 space-y-3">
          <!-- Building type tabs -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in buildingTabs"
              :key="tab.value"
              :class="[
                'rounded-badge px-4 py-1.5 text-xs font-medium transition-all duration-200',
                filterTipoEdificio === tab.value
                  ? 'bg-primary text-white scale-[1.02]'
                  : 'bg-gray-100 text-ink-muted hover:bg-gray-200 active:scale-95'
              ]"
              @click="filterTipoEdificio = tab.value"
            >
              {{ tab.label }}
              <span
                v-if="tab.count > 0"
                :class="[
                  'ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold',
                  filterTipoEdificio === tab.value ? 'bg-white/20 text-white' : 'bg-gray-200 text-ink-muted'
                ]"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>

          <!-- Status filter -->
          <div class="flex flex-wrap gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-custom self-center mr-2">Estatus:</span>
            <button
              v-for="st in statusFilters"
              :key="st.value"
              :class="[
                'rounded-badge px-3 py-1 text-xs font-medium transition-colors',
                filterEstatus === st.value
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-ink-muted hover:bg-gray-200'
              ]"
              @click="filterEstatus = st.value"
            >
              {{ st.label }}
            </button>
          </div>
        </div>

        <!-- Results count -->
        <p class="mt-4 text-sm text-slate-custom">
          {{ sortedCandidates.length }} candidatos encontrados
        </p>
      </div>
    </section>

    <!-- List view -->
    <section v-if="viewMode === 'list'" class="pb-16">
      <div class="container-wide">
        <template v-if="sortedCandidates.length > 0">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="candidate in paginatedCandidates"
              :key="candidate.id"
              class="card-interactive overflow-hidden animate-fade-in"
            >
              <!-- Vista satelital (OSM static — gratis, sin API key) -->
              <div
                v-if="candidate.lat && candidate.lng"
                class="relative h-32 overflow-hidden bg-gradient-to-br from-primary-50 to-secondary/10"
              >
                <img
                  :src="`https://staticmap.openstreetmap.de/staticmap.php?center=${candidate.lat},${candidate.lng}&zoom=18&size=600x300&maptype=mapnik&markers=${candidate.lat},${candidate.lng},red-pushpin`"
                  :alt="`Vista satelital de ${candidate.nombre}`"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
                <!-- Score badge encima del mapa -->
                <span
                  class="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur"
                  :style="{ color: scoreColor(candidate.scoreAptitud) }"
                >
                  {{ candidate.scoreAptitud }}
                </span>
                <!-- Crédito OSM -->
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="absolute bottom-1 right-1 rounded-sm bg-white/80 px-1.5 py-0.5 text-[8px] font-medium text-ink hover:bg-white"
                  @click.stop
                >
                  © OpenStreetMap
                </a>
              </div>

              <div class="p-5">
                <!-- Header row -->
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex flex-wrap gap-1.5">
                      <span class="badge-secondary">{{ formatTipoEdificio(candidate.tipoEdificio) }}</span>
                      <span :class="['badge', estatusBadgeClass(candidate.estatus)]">
                        {{ formatEstatus(candidate.estatus) }}
                      </span>
                    </div>
                    <p class="mt-2 text-sm font-semibold text-ink leading-tight">{{ candidate.nombre }}</p>
                    <p class="mt-0.5 text-xs text-slate-custom">{{ candidate.direccion }}</p>
                    <p class="mt-0.5 text-xs text-slate-custom">{{ candidate.alcaldia }}</p>
                  </div>
                </div>

                <!-- Source badge -->
                <div class="mt-2">
                  <CommonDataSourceBadge :source-name="candidate._source.sourceName" :last-updated="candidate._source.lastUpdated" />
                </div>

                <!-- Score bar -->
                <div class="mt-4">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-slate-custom">Score de aptitud</span>
                    <span class="text-lg font-bold" :style="{ color: scoreColor(candidate.scoreAptitud) }">
                      {{ candidate.scoreAptitud }}
                    </span>
                  </div>
                  <div class="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      class="h-full rounded-full"
                      :style="{
                        width: `${candidate.scoreAptitud}%`,
                        backgroundColor: scoreColor(candidate.scoreAptitud),
                        animation: 'progressFill 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both',
                      }"
                    />
                  </div>
                </div>

                <!-- Details row -->
                <div class="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                  <div class="flex items-center gap-1 text-xs text-ink-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    {{ candidate.superficie?.toLocaleString() }} m2
                  </div>
                  <div class="flex items-center gap-1 text-xs text-ink-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Confianza: {{ formatConfianza(candidate.confianzaIA) }}
                  </div>
                </div>

                <!-- Cadastral data -->
                <div v-if="candidate.datosCatastrales" class="mt-3 rounded-lg bg-gray-50 p-3">
                  <p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-custom">Datos catastrales</p>
                  <div class="grid grid-cols-3 gap-2">
                    <div v-if="candidate.datosCatastrales.supTerreno">
                      <p class="text-[10px] text-slate-custom">Sup. terreno</p>
                      <p class="text-xs font-semibold text-ink">{{ candidate.datosCatastrales.supTerreno.toLocaleString() }} m2</p>
                    </div>
                    <div v-if="candidate.datosCatastrales.supConstruccion">
                      <p class="text-[10px] text-slate-custom">Sup. construcción</p>
                      <p class="text-xs font-semibold text-ink">{{ candidate.datosCatastrales.supConstruccion.toLocaleString() }} m2</p>
                    </div>
                    <div v-if="candidate.datosCatastrales.anioConstruccion">
                      <p class="text-[10px] text-slate-custom">Año construcción</p>
                      <p class="text-xs font-semibold text-ink">{{ candidate.datosCatastrales.anioConstruccion }}</p>
                    </div>
                  </div>
                </div>

                <!-- Pre-feasibility panel -->
                <div v-if="candidate.datosCatastrales?.datosEstructurales" class="mt-3 rounded-lg border border-primary/20 bg-primary-50 p-3">
                  <p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Pre-factibilidad estructural</p>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <p class="text-[10px] text-slate-custom">Estructura</p>
                      <p class="text-xs font-semibold text-ink">{{ formatTipoEstructura(candidate.datosCatastrales.datosEstructurales.tipoEstructura) }}</p>
                    </div>
                    <div>
                      <p class="text-[10px] text-slate-custom">Zona sísmica</p>
                      <p class="text-xs font-semibold text-ink">{{ candidate.datosCatastrales.datosEstructurales.zonaSismica }}</p>
                    </div>
                    <div>
                      <p class="text-[10px] text-slate-custom">Dictamen post-sismo</p>
                      <p class="text-xs font-semibold text-ink">{{ formatEstadoEstructural(candidate.datosCatastrales.datosEstructurales.estadoEstructural) }}</p>
                    </div>
                    <div>
                      <p class="text-[10px] text-slate-custom">Techumbre</p>
                      <p class="text-xs font-semibold text-ink">{{ formatMaterialTechumbre(candidate.datosCatastrales.datosEstructurales.materialTechumbre) }}</p>
                    </div>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <span
                      :class="['badge text-[10px]', prefactibilidadBadgeClass(getPrefactibilidad(candidate).nivel)]"
                    >
                      {{ formatNivelPrefactibilidad(getPrefactibilidad(candidate).nivel) }}
                    </span>
                    <span class="text-xs font-bold" :style="{ color: getPrefactibilidad(candidate).score >= 65 ? '#79C141' : getPrefactibilidad(candidate).score >= 40 ? '#F2A81D' : '#D9363E' }">
                      {{ getPrefactibilidad(candidate).score }}/100
                    </span>
                  </div>
                  <div v-if="getPrefactibilidad(candidate).factoresRiesgo.length > 0" class="mt-1.5">
                    <p class="text-[9px] text-slate-custom">
                      Factores: {{ getPrefactibilidad(candidate).factoresRiesgo.join(', ') }}
                    </p>
                  </div>
                </div>

                <!-- Verificación visual: links a Google Maps / Street View / Earth -->
                <div v-if="candidate.lat && candidate.lng" class="mt-3 rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                  <p class="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Verificación visual de campo
                  </p>
                  <div class="flex flex-wrap gap-1.5">
                    <a
                      :href="`https://www.google.com/maps?q=&layer=c&cbll=${candidate.lat},${candidate.lng}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-secondary-dark shadow-sm transition-colors hover:bg-secondary hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2C7 7 7 12 12 22c5-10 5-15 0-20z" />
                      </svg>
                      Street View
                    </a>
                    <a
                      :href="`https://earth.google.com/web/@${candidate.lat},${candidate.lng},150a,500d,30y,0h,60t,0r`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-secondary-dark shadow-sm transition-colors hover:bg-secondary hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
                      </svg>
                      Google Earth
                    </a>
                    <a
                      :href="`https://www.google.com/maps/place/${candidate.lat},${candidate.lng}/@${candidate.lat},${candidate.lng},19z`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-secondary-dark shadow-sm transition-colors hover:bg-secondary hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                      </svg>
                      Maps
                    </a>
                  </div>
                  <p class="mt-2 text-[9px] text-ink-muted">
                    Imágenes © Google · imágenes satelitales y de calle se cargan desde el
                    servicio de Google sin almacenarse en el observatorio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <CommonPaginationControls
              v-model:current-page="currentPage"
              :total-pages="totalPages"
              :total-items="sortedCandidates.length"
              :per-page="perPage"
            />
          </div>
        </template>

        <!-- Empty state -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-ink">Sin resultados</h3>
          <p class="mt-2 max-w-sm text-sm text-slate-custom">
            No se encontraron candidatos con los filtros seleccionados.
          </p>
          <button class="btn-outline mt-4" @click="resetFilters">Limpiar filtros</button>
        </div>
      </div>
    </section>

    <!-- Map view -->
    <section v-else class="pb-16">
      <div class="container-wide">
        <div class="flex h-[500px] items-center justify-center overflow-hidden rounded-card bg-gradient-to-br from-primary-50 to-secondary/10 shadow-panel">
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-card">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-ink">Vista de mapa</h3>
            <p class="mt-2 text-sm text-slate-custom">{{ sortedCandidates.length }} candidatos visibles</p>
            <NuxtLink to="/mapa" class="btn-primary btn-sm mt-4">
              Abrir mapa completo
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computeScorePrefactibilidad } from '~/composables/useStatisticalAnalysis'

const {
  formatTipoEdificio, formatEstatus, formatConfianza, scoreColor, estatusBadgeClass,
  formatTipoEstructura, formatEstadoEstructural, formatMaterialTechumbre,
  formatNivelPrefactibilidad, prefactibilidadBadgeClass,
} = useFormatters()
const roofsStore = useRoofsStore()

useHead({
  title: 'Candidatos priorizados | Observatorio de Techos Verdes CDMX',
  meta: [
    { name: 'description', content: '60 sitios candidatos priorizados para potencial intervención con techos verdes en la Ciudad de México.' },
  ],
})

onMounted(() => {
  if (roofsStore.candidateRoofs.length === 0) {
    roofsStore.loadRoofs()
  }
})

const viewMode = ref<'list' | 'map'>('list')
const sortBy = ref('score_desc')
const filterTipoEdificio = ref('')
const filterEstatus = ref('')
const currentPage = ref(1)
const perPage = 15

const buildingTabs = computed(() => {
  const all = roofsStore.candidateRoofs.length
  const tipos: Record<string, string> = {
    hospital: 'Hospital',
    mercado: 'Mercado',
    supermercado: 'Supermercado',
    centro_comercial: 'Centro comercial',
    oficinas: 'Oficinas',
    residencial: 'Residencial',
    educativo: 'Educativo',
    gobierno: 'Gobierno',
    cultural: 'Cultural',
    industrial: 'Industrial',
  }
  const tabs = [
    { value: '', label: 'Todos', count: all },
  ]
  for (const [key, label] of Object.entries(tipos)) {
    const count = roofsStore.candidateRoofs.filter(c => c.tipoEdificio === key).length
    if (count > 0) {
      tabs.push({ value: key, label, count })
    }
  }
  return tabs
})

const statusFilters = [
  { value: '', label: 'Todos' },
  { value: 'candidato', label: 'Candidato' },
  { value: 'validado_visualmente', label: 'Validado visualmente' },
  { value: 'factibilidad_pendiente', label: 'Factibilidad pendiente' },
  { value: 'piloto', label: 'Piloto' },
  { value: 'implementado', label: 'Implementado' },
]

const filteredCandidates = computed(() => {
  return roofsStore.candidateRoofs.filter(c => {
    if (filterTipoEdificio.value && c.tipoEdificio !== filterTipoEdificio.value) return false
    if (filterEstatus.value && c.estatus !== filterEstatus.value) return false
    return true
  })
})

const sortedCandidates = computed(() => {
  const arr = [...filteredCandidates.value]
  switch (sortBy.value) {
    case 'score_desc': return arr.sort((a, b) => b.scoreAptitud - a.scoreAptitud)
    case 'score_asc': return arr.sort((a, b) => a.scoreAptitud - b.scoreAptitud)
    case 'nombre_asc': return arr.sort((a, b) => a.nombre.localeCompare(b.nombre))
    case 'nombre_desc': return arr.sort((a, b) => b.nombre.localeCompare(a.nombre))
    case 'superficie_desc': return arr.sort((a, b) => b.superficie - a.superficie)
    case 'superficie_asc': return arr.sort((a, b) => a.superficie - b.superficie)
    case 'alcaldia_asc': return arr.sort((a, b) => a.alcaldia.localeCompare(b.alcaldia))
    case 'estatus_asc': return arr.sort((a, b) => a.estatus.localeCompare(b.estatus))
    default: return arr
  }
})

const totalPages = computed(() => Math.ceil(sortedCandidates.value.length / perPage) || 1)
const paginatedCandidates = computed(() => sortedCandidates.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))

watch([filterTipoEdificio, filterEstatus, sortBy], () => { currentPage.value = 1 })

function resetFilters() {
  filterTipoEdificio.value = ''
  filterEstatus.value = ''
}

function getPrefactibilidad(candidate: (typeof sortedCandidates.value)[0]) {
  const de = candidate.datosCatastrales?.datosEstructurales
  if (!de) return { score: 0, nivel: 'no_recomendado' as const, factoresRiesgo: [] as string[], detalleComponentes: {} as Record<string, number> }
  return computeScorePrefactibilidad({
    tipoEstructura: de.tipoEstructura,
    zonaSismica: de.zonaSismica,
    anioConstruccion: candidate.datosCatastrales?.anioConstruccion ?? 1990,
    niveles: de.niveles,
    estadoEstructural: de.estadoEstructural,
    materialTechumbre: de.materialTechumbre,
  })
}

</script>
