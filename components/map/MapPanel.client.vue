<template>
  <div ref="mapContainer" class="h-full w-full relative" />
</template>

<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface MapMarker {
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

interface Props {
  markers?: MapMarker[]
  center?: [number, number]
  zoom?: number
  geojsonUrl?: string
  showHeatOverlay?: boolean
  selectedMarkerId?: number | null
  alcaldiaOverlayData?: Map<string, number> | null
  overlayLabel?: string
  overlayUnit?: string
  overlayColorScale?: 'green' | 'blue' | 'heat'
  overlayRawData?: Map<string, number> | null
}

const props = withDefaults(defineProps<Props>(), {
  markers: () => [],
  center: () => [19.4326, -99.1332] as [number, number],
  zoom: 11,
  geojsonUrl: '/geojson/cdmx-alcaldias.geojson',
  showHeatOverlay: false,
  selectedMarkerId: null,
  alcaldiaOverlayData: null,
  overlayLabel: '',
  overlayUnit: '',
  overlayColorScale: 'heat',
  overlayRawData: null,
})

const emit = defineEmits<{
  'marker-click': [marker: MapMarker]
  'map-move': [center: [number, number], zoom: number]
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markerLayer: L.LayerGroup | null = null
let geojsonLayer: L.GeoJSON | null = null
let geojsonData: GeoJSON.FeatureCollection | null = null
let suppressMoveEmit = false

const CDMX_BOUNDS: L.LatLngBoundsExpression = [[19.12, -99.36], [19.59, -98.94]]

// Color utilities
function scoreToColor(score: number): string {
  if (score >= 80) return '#0E5E3A'
  if (score >= 60) return '#79C141'
  if (score >= 40) return '#F2A81D'
  if (score >= 20) return '#F97316'
  return '#D9363E'
}

function scoreToFillOpacity(score: number): number {
  return 0.15 + (score / 100) * 0.4
}

// Environmental overlay color scales
function greenScaleColor(normalized: number): string {
  if (normalized >= 80) return '#064E3B'
  if (normalized >= 60) return '#059669'
  if (normalized >= 40) return '#34D399'
  if (normalized >= 20) return '#A7F3D0'
  return '#ECFDF5'
}

function blueScaleColor(normalized: number): string {
  if (normalized >= 80) return '#1E3A5F'
  if (normalized >= 60) return '#2563EB'
  if (normalized >= 40) return '#60A5FA'
  if (normalized >= 20) return '#BFDBFE'
  return '#EFF6FF'
}

function overlayColor(normalized: number, scale: 'green' | 'blue' | 'heat'): string {
  if (scale === 'green') return greenScaleColor(normalized)
  if (scale === 'blue') return blueScaleColor(normalized)
  return scoreToColor(normalized)
}

// Create circle marker icon
function createCircleIcon(color: string, isSelected: boolean = false): L.DivIcon {
  const size = isSelected ? 20 : 14
  const borderWidth = isSelected ? 3 : 2.5
  const pulse = isSelected
    ? `animation: pulse-marker 1.5s ease-in-out infinite;`
    : ''

  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      border: ${borderWidth}px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ${pulse}
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

// Compute average score per alcaldia from markers
function computeAlcaldiaScores(): Map<string, number> {
  const scores = new Map<string, { sum: number; count: number }>()

  props.markers.forEach((m) => {
    if (m.scoreAptitud !== undefined && m.alcaldia) {
      const existing = scores.get(m.alcaldia) || { sum: 0, count: 0 }
      existing.sum += m.scoreAptitud
      existing.count += 1
      scores.set(m.alcaldia, existing)
    }
  })

  const result = new Map<string, number>()
  scores.forEach((val, key) => {
    result.set(key, val.sum / val.count)
  })
  return result
}

// Style function for GeoJSON features
function getFeatureStyle(
  feature: GeoJSON.Feature | undefined,
  isHeat: boolean,
  alcaldiaScores: Map<string, number>
): L.PathOptions {
  // Check if we have custom overlay data
  const hasOverlay = props.alcaldiaOverlayData && props.alcaldiaOverlayData.size > 0

  if ((!isHeat && !hasOverlay) || !feature?.properties?.nombre) {
    return {
      color: '#0E5E3A',
      weight: 1.5,
      opacity: 0.5,
      fillColor: '#0E5E3A',
      fillOpacity: 0.03,
    }
  }

  const nombre = feature.properties.nombre as string

  // Use custom overlay data if provided
  if (hasOverlay) {
    const normalized = props.alcaldiaOverlayData!.get(nombre)
    if (normalized === undefined) {
      return {
        color: '#94a3b8',
        weight: 1,
        opacity: 0.4,
        fillColor: '#94a3b8',
        fillOpacity: 0.05,
      }
    }
    const fillColor = overlayColor(normalized, props.overlayColorScale)
    return {
      color: fillColor,
      weight: 2,
      opacity: 0.7,
      fillColor,
      fillOpacity: scoreToFillOpacity(normalized),
    }
  }

  // Default heat overlay using marker scores
  const score = alcaldiaScores.get(nombre)

  if (score === undefined) {
    return {
      color: '#94a3b8',
      weight: 1,
      opacity: 0.4,
      fillColor: '#94a3b8',
      fillOpacity: 0.05,
    }
  }

  return {
    color: scoreToColor(score),
    weight: 2,
    opacity: 0.7,
    fillColor: scoreToColor(score),
    fillOpacity: scoreToFillOpacity(score),
  }
}

// Fetch GeoJSON data
async function fetchGeoJSON(): Promise<GeoJSON.FeatureCollection | null> {
  try {
    const response = await fetch(props.geojsonUrl)
    if (!response.ok) return null
    return await response.json()
  } catch {
    console.warn('Failed to load GeoJSON from:', props.geojsonUrl)
    return null
  }
}

// Render alcaldia boundaries
function renderGeoJSON() {
  if (!map || !geojsonData) return

  if (geojsonLayer) {
    map.removeLayer(geojsonLayer)
    geojsonLayer = null
  }

  const alcaldiaScores = computeAlcaldiaScores()

  const hasOverlay = props.alcaldiaOverlayData && props.alcaldiaOverlayData.size > 0

  geojsonLayer = L.geoJSON(geojsonData, {
    style: (feature) => getFeatureStyle(feature, props.showHeatOverlay, alcaldiaScores),
    onEachFeature: (feature, layer) => {
      if (feature.properties?.nombre) {
        const nombre = feature.properties.nombre

        let tooltipContent = `<strong>${nombre}</strong>`

        if (hasOverlay && props.overlayRawData) {
          const rawVal = props.overlayRawData.get(nombre)
          if (rawVal !== undefined) {
            const label = props.overlayLabel || 'Valor'
            const unit = props.overlayUnit || ''
            const formatted = rawVal >= 1000 ? rawVal.toLocaleString('es-MX') : rawVal.toFixed(rawVal < 10 ? 2 : 1)
            tooltipContent += `<br><span style="font-size:11px;color:#64748b;">${label}: <strong>${formatted}</strong> ${unit}</span>`
          }
        } else {
          const score = alcaldiaScores.get(nombre)
          if (score !== undefined) {
            tooltipContent += `<br><span style="font-size:11px;color:#64748b;">Score promedio: <strong>${score.toFixed(1)}</strong></span>`
          }
        }

        layer.bindTooltip(tooltipContent, {
          sticky: true,
          className: 'alcaldia-tooltip',
        })
      }
    },
  }).addTo(map)
}

// Render markers
function renderMarkers() {
  if (!map || !markerLayer) return

  markerLayer.clearLayers()

  props.markers.forEach((marker) => {
    const isSelected = props.selectedMarkerId === marker.id
    const icon = createCircleIcon(marker.color, isSelected)

    const m = L.marker([marker.lat, marker.lng], { icon })

    if (marker.popupHtml) {
      m.bindPopup(marker.popupHtml, {
        maxWidth: 320,
        minWidth: 220,
        className: 'observatorio-popup',
      })
    }

    m.on('click', () => {
      emit('marker-click', marker)
    })

    m.addTo(markerLayer!)
  })
}

// Initialize the map
async function initMap() {
  if (!mapContainer.value || map) return

  map = L.map(mapContainer.value, {
    center: props.center,
    zoom: props.zoom,
    zoomControl: true,
    attributionControl: true,
    maxBounds: CDMX_BOUNDS,
    maxBoundsViscosity: 0.8,
    minZoom: 10,
    maxZoom: 18,
  })

  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
    subdomains: 'abcd',
  }).addTo(map)

  markerLayer = L.layerGroup().addTo(map)

  // Listen for map moves (suppress when triggered by programmatic setView/setZoom)
  map.on('moveend', () => {
    if (!map) return
    if (suppressMoveEmit) {
      suppressMoveEmit = false
      return
    }
    const c = map.getCenter()
    emit('map-move', [c.lat, c.lng], map.getZoom())
  })

  // Load GeoJSON
  geojsonData = await fetchGeoJSON()
  renderGeoJSON()
  renderMarkers()
}

// Watchers
watch(() => props.markers, () => {
  renderMarkers()
  if (props.showHeatOverlay) {
    renderGeoJSON()
  }
}, { deep: true })

watch(() => props.showHeatOverlay, () => {
  renderGeoJSON()
})

watch(() => props.selectedMarkerId, () => {
  renderMarkers()
})

watch([() => props.alcaldiaOverlayData, () => props.overlayColorScale, () => props.overlayRawData], () => {
  renderGeoJSON()
}, { deep: true })

watch(() => props.center, (newCenter) => {
  if (!map || !newCenter) return
  const c = map.getCenter()
  if (Math.abs(c.lat - newCenter[0]) < 0.0001 && Math.abs(c.lng - newCenter[1]) < 0.0001) return
  suppressMoveEmit = true
  map.setView(newCenter, props.zoom)
})

watch(() => props.zoom, (newZoom) => {
  if (!map || !newZoom || map.getZoom() === newZoom) return
  suppressMoveEmit = true
  map.setZoom(newZoom)
})

watch(() => props.geojsonUrl, async (newUrl) => {
  if (newUrl) {
    geojsonData = await fetchGeoJSON()
    renderGeoJSON()
  }
})

onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
  markerLayer = null
  geojsonLayer = null
  geojsonData = null
})
</script>

<style>
.custom-map-marker {
  background: transparent !important;
  border: none !important;
}

@keyframes pulse-marker {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: scale(1.3);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
}

/* Popup styling */
.observatorio-popup .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 0;
  overflow: hidden;
}

.observatorio-popup .leaflet-popup-content {
  margin: 0;
  min-width: 220px;
}

.observatorio-popup .leaflet-popup-tip {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.observatorio-popup .leaflet-popup-close-button {
  top: 8px !important;
  right: 8px !important;
  color: #64748b !important;
  font-size: 18px !important;
  width: 24px !important;
  height: 24px !important;
}

/* Popup inner content classes */
.popup-card {
  padding: 16px;
}

.popup-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.3;
  margin-bottom: 8px;
  padding-right: 16px;
}

.popup-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 10px;
}

.popup-badge-existente {
  background: #ecfdf5;
  color: #0E5E3A;
}

.popup-badge-candidato {
  background: #fef3c7;
  color: #92400e;
}

.popup-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.popup-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.popup-meta-label {
  color: #64748b;
}

.popup-meta-value {
  font-weight: 600;
  color: #1e293b;
}

.popup-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

/* Alcaldia tooltip styling */
.alcaldia-tooltip {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  font-family: inherit !important;
  font-size: 13px !important;
  color: #1e293b !important;
}

.alcaldia-tooltip::before {
  border-top-color: #e2e8f0 !important;
}
</style>
