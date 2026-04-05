import { defineStore } from 'pinia';
import { a as getMockGreenRoofs, b as getMockCandidates } from './mock-source-DMDe05Bu.mjs';
import { b as useRuntimeConfig } from './server.mjs';

async function fetchGreenRoofs(dataMode) {
  if (dataMode === "official") {
    try {
      console.warn("[roofs-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.");
    } catch (e) {
      console.warn("[roofs-repository] Error en fuente oficial, fallback a mock:", e);
    }
  }
  return getMockGreenRoofs();
}
async function fetchCandidates(dataMode) {
  if (dataMode === "official") {
    try {
      console.warn("[roofs-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.");
    } catch (e) {
      console.warn("[roofs-repository] Error en fuente oficial, fallback a mock:", e);
    }
  }
  return getMockCandidates();
}
const useRoofsStore = defineStore("roofs", {
  state: () => ({
    greenRoofs: [],
    candidateRoofs: [],
    selectedRoof: null,
    filters: {
      alcaldia: null,
      tipoEdificio: null,
      tipoTechoVerde: null,
      estado: null,
      search: ""
    },
    loading: false
  }),
  getters: {
    /**
     * Green roofs filtered by the current filter criteria.
     */
    filteredGreenRoofs(state) {
      return state.greenRoofs.filter((roof) => {
        if (state.filters.alcaldia && roof.alcaldia !== state.filters.alcaldia) return false;
        if (state.filters.tipoEdificio && roof.tipoEdificio !== state.filters.tipoEdificio)
          return false;
        if (state.filters.tipoTechoVerde && roof.tipoTechoVerde !== state.filters.tipoTechoVerde)
          return false;
        if (state.filters.estado && roof.estado !== state.filters.estado) return false;
        if (state.filters.search) {
          const q = state.filters.search.toLowerCase();
          const haystack = `${roof.nombre} ${roof.direccion} ${roof.alcaldia}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });
    },
    /**
     * Candidate roofs filtered by the current filter criteria.
     */
    filteredCandidates(state) {
      return state.candidateRoofs.filter((roof) => {
        if (state.filters.alcaldia && roof.alcaldia !== state.filters.alcaldia) return false;
        if (state.filters.tipoEdificio && roof.tipoEdificio !== state.filters.tipoEdificio)
          return false;
        if (state.filters.search) {
          const q = state.filters.search.toLowerCase();
          const haystack = `${roof.nombre} ${roof.direccion} ${roof.alcaldia}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });
    },
    /**
     * Group green roofs by alcaldia with counts and total superficie.
     */
    roofsByAlcaldia(state) {
      const map = {};
      for (const roof of state.greenRoofs) {
        if (!map[roof.alcaldia]) {
          map[roof.alcaldia] = { count: 0, superficie: 0 };
        }
        map[roof.alcaldia].count++;
        map[roof.alcaldia].superficie += roof.superficie;
      }
      return map;
    },
    /**
     * Total superficie (m2) across all green roofs.
     */
    totalSuperficie(state) {
      return state.greenRoofs.reduce((sum, r) => sum + r.superficie, 0);
    },
    /**
     * Aggregated stats for quick dashboard consumption.
     */
    stats(state) {
      const activos = state.greenRoofs.filter((r) => r.estado === "activo").length;
      const enMantenimiento = state.greenRoofs.filter(
        (r) => r.estado === "en_mantenimiento"
      ).length;
      const inactivos = state.greenRoofs.filter((r) => r.estado === "inactivo").length;
      const nuevos = state.greenRoofs.filter((r) => r.estado === "nuevo").length;
      return {
        totalExistentes: state.greenRoofs.length,
        totalCandidatos: state.candidateRoofs.length,
        totalSuperficie: state.greenRoofs.reduce((s, r) => s + r.superficie, 0),
        activos,
        enMantenimiento,
        inactivos,
        nuevos
      };
    }
  },
  actions: {
    /**
     * Load data from the repository (official-first, mock fallback).
     */
    async loadRoofs() {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const dataMode = config.public.dataMode;
        const [roofs, candidates] = await Promise.all([
          fetchGreenRoofs(dataMode),
          fetchCandidates(dataMode)
        ]);
        this.greenRoofs = roofs;
        this.candidateRoofs = candidates;
      } finally {
        this.loading = false;
      }
    },
    /**
     * Set a single filter value. Pass `null` to clear that filter.
     */
    setFilter(key, value) {
      this.filters[key] = value;
    },
    /**
     * Reset all filters to their default (empty) state.
     */
    clearFilters() {
      this.filters = {
        alcaldia: null,
        tipoEdificio: null,
        tipoTechoVerde: null,
        estado: null,
        search: ""
      };
    },
    /**
     * Select a roof (green or candidate) for detail view / map highlight.
     */
    selectRoof(roof) {
      this.selectedRoof = roof;
    }
  }
});

export { useRoofsStore as u };
//# sourceMappingURL=roofs-CmJAoess.mjs.map
