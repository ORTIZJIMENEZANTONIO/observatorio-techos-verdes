import { defineStore } from 'pinia'
import type { MapFilters, GreenRoof, CandidateRoof } from '~/types'

// ---------------------------------------------------------------------------
// Store state shape
// ---------------------------------------------------------------------------
interface MapState {
  center: [number, number]
  zoom: number
  activeLayer: MapFilters['capa']
  filters: MapFilters
  selectedMarker: GreenRoof | CandidateRoof | null
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
const DEFAULT_CENTER: [number, number] = [19.4326, -99.1332]
const DEFAULT_ZOOM = 11

function defaultFilters(): MapFilters {
  return {
    alcaldia: '',
    tipoEdificio: '',
    estatus: '',
    nivelAptitud: '',
    capa: 'existentes',
  }
}

// ---------------------------------------------------------------------------
// Store definition
// ---------------------------------------------------------------------------
export const useMapStore = defineStore('map', {
  state: (): MapState => ({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    activeLayer: 'existentes',
    filters: defaultFilters(),
    selectedMarker: null,
  }),

  getters: {
    /**
     * Whether any filter is currently active.
     */
    hasActiveFilters(state): boolean {
      return !!(
        state.filters.alcaldia ||
        state.filters.tipoEdificio ||
        state.filters.estatus ||
        state.filters.nivelAptitud
      )
    },

    /**
     * Current center as a Leaflet-compatible LatLng tuple.
     */
    latLng(state): [number, number] {
      return state.center
    },
  },

  actions: {
    /**
     * Pan the map to a new center position.
     */
    setCenter(lat: number, lng: number): void {
      this.center = [lat, lng]
    },

    /**
     * Change the zoom level.
     */
    setZoom(zoom: number): void {
      this.zoom = Math.max(1, Math.min(zoom, 18))
    },

    /**
     * Switch the active thematic layer.
     */
    setLayer(layer: MapFilters['capa']): void {
      this.activeLayer = layer
      this.filters.capa = layer
    },

    /**
     * Update a single map filter value.
     */
    setFilter<K extends keyof MapFilters>(key: K, value: MapFilters[K]): void {
      this.filters[key] = value
    },

    /**
     * Reset all map filters and restore the default view.
     */
    clearFilters(): void {
      this.filters = defaultFilters()
      this.filters.capa = this.activeLayer // preserve current layer
    },

    /**
     * Select a marker on the map (triggers popup / detail panel).
     */
    selectMarker(marker: GreenRoof | CandidateRoof | null): void {
      this.selectedMarker = marker
      if (marker) {
        this.center = [marker.lat, marker.lng]
      }
    },

    /**
     * Reset the map view to the CDMX default center and zoom.
     */
    resetView(): void {
      this.center = DEFAULT_CENTER
      this.zoom = DEFAULT_ZOOM
    },
  },
})
