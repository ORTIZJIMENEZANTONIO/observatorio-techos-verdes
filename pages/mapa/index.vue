<template>
  <div class="flex flex-col" style="height: calc(100vh - 4rem);">
    <!-- Disclaimer banner -->
    <div class="border-b border-accent/20 bg-accent/5 px-4 py-2">
      <div class="flex items-center gap-2 text-xs text-accent-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>Aptitud territorial, no factibilidad estructural. Consulte dictámenes técnicos para implementación.</span>
      </div>
    </div>

    <div class="relative flex flex-1 overflow-hidden">
      <!-- Sidebar (desktop) / Bottom sheet (mobile) -->
      <aside
        :class="[
          'z-10 flex-shrink-0 overflow-y-auto bg-white shadow-panel transition-all duration-300',
          sidebarOpen
            ? 'fixed inset-x-0 bottom-0 top-auto h-[60vh] rounded-t-2xl lg:relative lg:inset-auto lg:h-auto lg:w-80 lg:rounded-none'
            : 'fixed -bottom-full lg:relative lg:bottom-auto lg:w-80'
        ]"
      >
        <!-- Mobile handle -->
        <div class="flex justify-center py-2 lg:hidden" @click="sidebarOpen = !sidebarOpen">
          <span class="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <div class="p-4">
          <h3 class="text-base font-semibold text-ink">Filtros</h3>

          <!-- Layer toggle -->
          <div class="mt-4">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Capa</label>
            <div class="mt-2 flex gap-1">
              <button
                v-for="layer in layers"
                :key="layer.id"
                :class="[
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  activeLayer === layer.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-ink-muted hover:bg-gray-200',
                ]"
                @click="activeLayer = layer.id"
              >
                {{ layer.label }}
              </button>
            </div>
          </div>

          <!-- Alcaldia filter -->
          <div class="mt-5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Alcaldía</label>
            <select v-model="filterAlcaldia" class="select mt-1.5">
              <option value="">Todas las alcaldías</option>
              <option v-for="a in alcaldias" :key="a" :value="a">{{ a }}</option>
            </select>
          </div>

          <!-- Building type filter -->
          <div class="mt-4">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Tipo de edificio</label>
            <select v-model="filterTipoEdificio" class="select mt-1.5">
              <option value="">Todos los tipos</option>
              <option v-for="t in tiposEdificio" :key="t" :value="t">{{ formatTipoEdificio(t) }}</option>
            </select>
          </div>

          <!-- Status filter for candidatos -->
          <div v-if="activeLayer === 'candidatos'" class="mt-4">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Estatus</label>
            <select v-model="filterEstatus" class="select mt-1.5">
              <option value="">Todos los estatus</option>
              <option value="candidato">Candidato</option>
              <option value="validado_visualmente">Validado visualmente</option>
              <option value="factibilidad_pendiente">Factibilidad pendiente</option>
              <option value="piloto">Piloto</option>
              <option value="implementado">Implementado</option>
            </select>
          </div>

          <!-- Environmental layer selector (aptitud layer only) -->
          <div v-if="activeLayer === 'aptitud'" class="mt-4">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Capa ambiental</label>
            <select v-model="capaAmbiental" class="select mt-1.5">
              <option value="">Aptitud general (score)</option>
              <optgroup label="Indicadores bióticos">
                <option value="indiceBiodiversidad">Índice de biodiversidad</option>
                <option value="coberturaVegetal">Cobertura vegetal</option>
                <option value="riquezaEspecies">Riqueza de especies</option>
                <option value="indiceShannonWiener">Shannon H'</option>
                <option value="indiceSimpson">Simpson 1-D</option>
              </optgroup>
              <optgroup label="Indicadores hídricos">
                <option value="captacionPluvial">Captación pluvial</option>
                <option value="precipitacionMediaAnual">Precipitación media anual</option>
                <option value="eficienciaRetencion">Eficiencia de retención</option>
                <option value="escorrentiaEvitada">Escorrentía evitada</option>
              </optgroup>
            </select>
          </div>

          <!-- Stats summary -->
          <div class="mt-6 rounded-card bg-surface p-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Resumen</p>
            <div class="mt-3 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-ink">Marcadores visibles</span>
                <span class="text-sm font-bold text-primary">{{ mapMarkers.length }}</span>
              </div>
              <div v-if="activeLayer === 'existentes'" class="flex items-center justify-between">
                <span class="text-sm text-ink">Superficie total</span>
                <span class="text-sm font-bold text-primary">{{ totalArea.toLocaleString() }} m&sup2;</span>
              </div>
              <div v-if="activeLayer === 'candidatos'" class="flex items-center justify-between">
                <span class="text-sm text-ink">Score promedio</span>
                <span class="text-sm font-bold text-primary">{{ avgScore.toFixed(1) }}</span>
              </div>
              <!-- Environmental metric stats -->
              <template v-if="activeLayer === 'aptitud' && capaAmbiental && envStats">
                <div class="mt-2 border-t border-gray-200 pt-2">
                  <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-custom">{{ envMetricConfig?.label }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-ink">Promedio</span>
                  <span class="text-sm font-bold text-primary">{{ envStats.promedio.toFixed(1) }} {{ envMetricConfig?.unidad }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-ink">Min</span>
                  <span class="text-sm font-bold text-slate-custom">{{ envStats.min.toFixed(1) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-ink">Max</span>
                  <span class="text-sm font-bold text-slate-custom">{{ envStats.max.toFixed(1) }}</span>
                </div>
              </template>
            </div>
          </div>

          <!-- Reset filters -->
          <button
            class="btn-ghost mt-4 w-full text-xs"
            @click="resetFilters"
          >
            Limpiar filtros
          </button>

          <!-- Selected marker detail panel -->
          <div v-if="selectedDetail" class="mt-6 rounded-card border border-primary/20 bg-primary/5 p-4">
            <div class="flex items-start justify-between">
              <p class="text-xs font-semibold uppercase tracking-wider text-primary">Detalle</p>
              <button class="text-xs text-slate-custom hover:text-ink" @click="selectedMarkerId = null">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <h4 class="mt-2 text-sm font-semibold text-ink">{{ selectedDetail.nombre }}</h4>
            <p class="mt-1 text-xs text-slate-custom">{{ selectedDetail.direccion }}</p>
            <div class="mt-3 space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-custom">Alcaldía</span>
                <span class="font-medium text-ink">{{ selectedDetail.alcaldia }}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-custom">Tipo</span>
                <span class="font-medium text-ink">{{ formatTipoEdificio(selectedDetail.tipoEdificio) }}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-custom">Superficie</span>
                <span class="font-medium text-ink">{{ selectedDetail.superficie.toLocaleString() }} m&sup2;</span>
              </div>
              <div v-if="selectedDetail.tipo === 'candidato' && selectedDetail.scoreAptitud !== undefined" class="flex items-center justify-between text-xs">
                <span class="text-slate-custom">Score aptitud</span>
                <span class="font-bold" :style="{ color: scoreColor(selectedDetail.scoreAptitud) }">
                  {{ selectedDetail.scoreAptitud }}
                </span>
              </div>
              <div v-if="selectedDetail.tipo === 'existente' && selectedDetail.tipoTechoVerde" class="flex items-center justify-between text-xs">
                <span class="text-slate-custom">Tipo techo</span>
                <span class="font-medium text-ink capitalize">{{ selectedDetail.tipoTechoVerde }}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Map area -->
      <div class="relative flex-1">
        <ClientOnly>
          <MapPanel
            :markers="mapMarkers"
            :center="mapCenter"
            :zoom="mapZoom"
            :show-heat-overlay="activeLayer === 'aptitud'"
            :selected-marker-id="selectedMarkerId"
            :alcaldia-overlay-data="overlayData"
            :overlay-label="envMetricConfig?.label ?? ''"
            :overlay-unit="envMetricConfig?.unidad ?? ''"
            :overlay-color-scale="envMetricConfig?.colorScale ?? 'heat'"
            :overlay-raw-data="overlayRawData"
            @marker-click="onMarkerClick"
            @map-move="onMapMove"
          />
          <template #fallback>
            <div class="flex h-full w-full items-center justify-center bg-surface">
              <div class="text-center">
                <div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p class="text-sm text-slate-custom">Cargando mapa...</p>
              </div>
            </div>
          </template>
        </ClientOnly>

        <!-- Suitability Legend overlay -->
        <div class="absolute bottom-4 right-4 z-[500] rounded-card bg-white/95 p-3 shadow-panel backdrop-blur-sm">
          <p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-custom">
            {{ activeLayer === 'aptitud' && capaAmbiental ? envMetricConfig?.label : 'Leyenda' }}
          </p>
          <div class="space-y-1">
            <div v-if="activeLayer === 'existentes'" class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full border-2 border-white shadow-sm" style="background: #0E5E3A;" />
              <span class="text-xs text-ink">Techo verde existente</span>
            </div>
            <div v-if="activeLayer === 'candidatos'" class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full border-2 border-white shadow-sm" style="background: #F2A81D;" />
              <span class="text-xs text-ink">Candidato priorizado</span>
            </div>
            <template v-if="activeLayer === 'aptitud'">
              <div v-for="level in activeLegendItems" :key="level.label" class="flex items-center gap-2">
                <span class="h-3 w-6 rounded-sm" :style="{ backgroundColor: level.color }" />
                <span class="text-xs text-ink">{{ level.label }}</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Mobile sidebar toggle -->
        <button
          class="absolute bottom-4 left-4 z-[500] flex items-center gap-2 rounded-card bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-panel lg:hidden"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'
import { candidateRoofs } from '~/data/mock-candidates'
import type { GreenRoof, CandidateRoof } from '~/types'
import { useAlcaldiaEnvironmental, metricasAmbientales } from '~/composables/useAlcaldiaEnvironmental'
import type { MetricaAmbiental } from '~/composables/useAlcaldiaEnvironmental'

const { formatTipoEdificio, scoreColor } = useFormatters()

useHead({
  title: 'Mapa | Observatorio Techos Verdes CDMX',
  meta: [
    { name: 'description', content: 'Mapa interactivo de techos verdes y candidatos priorizados en la Ciudad de México.' },
  ],
})

definePageMeta({
  layout: 'default',
})

const sidebarOpen = ref(false)
const activeLayer = ref<'existentes' | 'candidatos' | 'aptitud'>('existentes')
const filterAlcaldia = ref('')
const filterTipoEdificio = ref('')
const filterEstatus = ref('')
const capaAmbiental = ref('')
const selectedMarkerId = ref<number | null>(null)
const mapCenter = ref<[number, number]>([19.4326, -99.1332])
const mapZoom = ref(11)

const { getAlcaldiaMetric, getAlcaldiaMetricNormalized, getMetricConfig, getMetricStats } = useAlcaldiaEnvironmental()

const layers = [
  { id: 'existentes' as const, label: 'Existentes' },
  { id: 'candidatos' as const, label: 'Candidatos' },
  { id: 'aptitud' as const, label: 'Aptitud' },
]

const alcaldias = computed(() => {
  const set = new Set<string>()
  greenRoofs.forEach(r => set.add(r.alcaldia))
  candidateRoofs.forEach(r => set.add(r.alcaldia))
  return Array.from(set).sort()
})

const tiposEdificio = computed(() => {
  const set = new Set<string>()
  greenRoofs.forEach(r => set.add(r.tipoEdificio))
  candidateRoofs.forEach(r => set.add(r.tipoEdificio))
  return Array.from(set).sort()
})

// Build popup HTML for green roofs
function buildGreenRoofPopup(r: GreenRoof): string {
  const descripcionHtml = r.descripcion
    ? `<div class="popup-divider"></div><div style="font-size:11px;color:#64748B;line-height:1.4;margin-top:4px;">${r.descripcion}</div>`
    : ''
  return `
    <div class="popup-card">
      <div class="popup-title">${r.nombre}</div>
      <span class="popup-badge popup-badge-existente">Techo verde</span>
      <div class="popup-meta">
        <div class="popup-meta-row">
          <span class="popup-meta-label">Alcaldía</span>
          <span class="popup-meta-value">${r.alcaldia}</span>
        </div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Tipo</span>
          <span class="popup-meta-value" style="text-transform:capitalize;">${r.tipoTechoVerde}</span>
        </div>
        <div class="popup-divider"></div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Superficie</span>
          <span class="popup-meta-value">${r.superficie.toLocaleString()} m&sup2;</span>
        </div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Estado</span>
          <span class="popup-meta-value" style="text-transform:capitalize;">${r.estado.replace(/_/g, ' ')}</span>
        </div>
        ${descripcionHtml}
      </div>
    </div>
  `
}

// Build popup HTML for candidate roofs
function buildCandidatePopup(r: CandidateRoof): string {
  const scoreHtml = `<span style="color:${scoreColor(r.scoreAptitud)};font-weight:700;">${r.scoreAptitud}</span>`
  return `
    <div class="popup-card">
      <div class="popup-title">${r.nombre}</div>
      <span class="popup-badge popup-badge-candidato">Candidato</span>
      <div class="popup-meta">
        <div class="popup-meta-row">
          <span class="popup-meta-label">Alcaldía</span>
          <span class="popup-meta-value">${r.alcaldia}</span>
        </div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Estatus</span>
          <span class="popup-meta-value" style="text-transform:capitalize;">${r.estatus.replace(/_/g, ' ')}</span>
        </div>
        <div class="popup-divider"></div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Superficie</span>
          <span class="popup-meta-value">${r.superficie.toLocaleString()} m&sup2;</span>
        </div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Score aptitud</span>
          <span class="popup-meta-value">${scoreHtml}</span>
        </div>
      </div>
    </div>
  `
}

// Interface for marker data used by MapPanel
interface MapMarker {
  id: number
  lat: number
  lng: number
  nombre: string
  tipo: 'existente' | 'candidato'
  color: string
  popupHtml: string
  alcaldia?: string
  scoreAptitud?: number
}

// Filtered green roofs
const filteredGreenRoofs = computed(() => {
  return greenRoofs.filter(r => {
    if (filterAlcaldia.value && r.alcaldia !== filterAlcaldia.value) return false
    if (filterTipoEdificio.value && r.tipoEdificio !== filterTipoEdificio.value) return false
    return true
  })
})

// Filtered candidate roofs
const filteredCandidateRoofs = computed(() => {
  return candidateRoofs.filter(r => {
    if (filterAlcaldia.value && r.alcaldia !== filterAlcaldia.value) return false
    if (filterTipoEdificio.value && r.tipoEdificio !== filterTipoEdificio.value) return false
    if (filterEstatus.value && r.estatus !== filterEstatus.value) return false
    return true
  })
})

// Build map markers from filtered data
const mapMarkers = computed<MapMarker[]>(() => {
  if (activeLayer.value === 'existentes') {
    return filteredGreenRoofs.value.map(r => ({
      id: r.id,
      lat: r.lat,
      lng: r.lng,
      nombre: r.nombre,
      tipo: 'existente' as const,
      color: '#0E5E3A',
      popupHtml: buildGreenRoofPopup(r),
      alcaldia: r.alcaldia,
    }))
  }

  if (activeLayer.value === 'candidatos') {
    return filteredCandidateRoofs.value.map(r => ({
      id: r.id,
      lat: r.lat,
      lng: r.lng,
      nombre: r.nombre,
      tipo: 'candidato' as const,
      color: '#F2A81D',
      popupHtml: buildCandidatePopup(r),
      alcaldia: r.alcaldia,
      scoreAptitud: r.scoreAptitud,
    }))
  }

  // Aptitud layer: show both with color coded by score for candidates
  const existentes = filteredGreenRoofs.value.map(r => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    nombre: r.nombre,
    tipo: 'existente' as const,
    color: '#0E5E3A',
    popupHtml: buildGreenRoofPopup(r),
    alcaldia: r.alcaldia,
  }))

  const candidatos = filteredCandidateRoofs.value.map(r => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    nombre: r.nombre,
    tipo: 'candidato' as const,
    color: scoreColor(r.scoreAptitud),
    popupHtml: buildCandidatePopup(r),
    alcaldia: r.alcaldia,
    scoreAptitud: r.scoreAptitud,
  }))

  return [...existentes, ...candidatos]
})

// Stats
const totalArea = computed(() => {
  if (activeLayer.value === 'existentes') {
    return filteredGreenRoofs.value.reduce((sum, r) => sum + (r.superficie || 0), 0)
  }
  return 0
})

const avgScore = computed(() => {
  const filtered = filteredCandidateRoofs.value
  if (filtered.length === 0) return 0
  return filtered.reduce((sum, r) => sum + r.scoreAptitud, 0) / filtered.length
})

// Selected detail
interface SelectedDetail {
  nombre: string
  direccion: string
  alcaldia: string
  tipoEdificio: string
  superficie: number
  tipo: 'existente' | 'candidato'
  scoreAptitud?: number
  tipoTechoVerde?: string
}

const selectedDetail = computed<SelectedDetail | null>(() => {
  if (selectedMarkerId.value === null) return null

  const gr = greenRoofs.find(r => r.id === selectedMarkerId.value)
  if (gr) {
    return {
      nombre: gr.nombre,
      direccion: gr.direccion,
      alcaldia: gr.alcaldia,
      tipoEdificio: gr.tipoEdificio,
      superficie: gr.superficie,
      tipo: 'existente',
      tipoTechoVerde: gr.tipoTechoVerde,
    }
  }

  const cr = candidateRoofs.find(r => r.id === selectedMarkerId.value)
  if (cr) {
    return {
      nombre: cr.nombre,
      direccion: cr.direccion,
      alcaldia: cr.alcaldia,
      tipoEdificio: cr.tipoEdificio,
      superficie: cr.superficie,
      tipo: 'candidato',
      scoreAptitud: cr.scoreAptitud,
    }
  }

  return null
})

// Environmental overlay data
const overlayData = computed<Map<string, number> | null>(() => {
  if (!capaAmbiental.value) return null
  return getAlcaldiaMetricNormalized(capaAmbiental.value as MetricaAmbiental)
})

const overlayRawData = computed<Map<string, number> | null>(() => {
  if (!capaAmbiental.value) return null
  return getAlcaldiaMetric(capaAmbiental.value as MetricaAmbiental)
})

const envMetricConfig = computed(() => {
  if (!capaAmbiental.value) return null
  return getMetricConfig(capaAmbiental.value as MetricaAmbiental)
})

const envStats = computed(() => {
  if (!capaAmbiental.value) return null
  return getMetricStats(capaAmbiental.value as MetricaAmbiental)
})

const legendItems = [
  { label: 'Muy alta (80-100)', color: '#0E5E3A' },
  { label: 'Alta (60-80)', color: '#79C141' },
  { label: 'Media (40-60)', color: '#F2A81D' },
  { label: 'Baja (20-40)', color: '#F97316' },
  { label: 'Muy baja (0-20)', color: '#D9363E' },
]

const greenLegendItems = [
  { label: 'Muy alto (80-100)', color: '#064E3B' },
  { label: 'Alto (60-80)', color: '#059669' },
  { label: 'Medio (40-60)', color: '#34D399' },
  { label: 'Bajo (20-40)', color: '#A7F3D0' },
  { label: 'Muy bajo (0-20)', color: '#ECFDF5' },
]

const blueLegendItems = [
  { label: 'Muy alto (80-100)', color: '#1E3A5F' },
  { label: 'Alto (60-80)', color: '#2563EB' },
  { label: 'Medio (40-60)', color: '#60A5FA' },
  { label: 'Bajo (20-40)', color: '#BFDBFE' },
  { label: 'Muy bajo (0-20)', color: '#EFF6FF' },
]

const activeLegendItems = computed(() => {
  if (!capaAmbiental.value) return legendItems
  const config = envMetricConfig.value
  if (!config) return legendItems
  return config.colorScale === 'green' ? greenLegendItems : blueLegendItems
})

function onMarkerClick(marker: MapMarker) {
  selectedMarkerId.value = marker.id
}

function onMapMove(center: [number, number], zoom: number) {
  mapCenter.value = center
  mapZoom.value = zoom
}

function resetFilters() {
  filterAlcaldia.value = ''
  filterTipoEdificio.value = ''
  filterEstatus.value = ''
  capaAmbiental.value = ''
  selectedMarkerId.value = null
}

// Clear selection and environmental layer when switching layers
watch(activeLayer, () => {
  selectedMarkerId.value = null
  capaAmbiental.value = ''
})
</script>
