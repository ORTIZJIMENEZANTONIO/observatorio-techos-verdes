import { defineStore } from "pinia";
import { a as getMockGreenRoofs, b as getMockCandidates } from "./mock-source-DMDe05Bu.js";
import { b as useRuntimeConfig } from "../server.mjs";
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
const GR_STORAGE_KEY = "obs-techos-verdes-overrides";
const CR_STORAGE_KEY = "obs-techos-verdes-candidates-overrides";
function loadOverrides(key) {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}
function saveOverrides(key, overrides) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(overrides));
}
function applyOverrides(items, key) {
  const overrides = loadOverrides(key);
  return items.map((item) => {
    const ov = overrides[item.id];
    return ov ? { ...item, ...ov } : item;
  });
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
    /** Public green roofs (exclude archived/hidden) */
    publicGreenRoofs(state) {
      return state.greenRoofs.filter((r) => !r.archivado && r.visible !== false);
    },
    /** Public candidates (exclude archived/hidden) */
    publicCandidateRoofs(state) {
      return state.candidateRoofs.filter((r) => !r.archivado && r.visible !== false);
    },
    /** Green roofs filtered by the current filter criteria (public only). */
    filteredGreenRoofs(state) {
      return state.greenRoofs.filter((roof) => {
        if (roof.archivado) return false;
        if (roof.visible === false) return false;
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
    /** Candidate roofs filtered by the current filter criteria (public only). */
    filteredCandidates(state) {
      return state.candidateRoofs.filter((roof) => {
        if (roof.archivado) return false;
        if (roof.visible === false) return false;
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
    /** Group public green roofs by alcaldia */
    roofsByAlcaldia() {
      const map = {};
      for (const roof of this.publicGreenRoofs) {
        if (!map[roof.alcaldia]) {
          map[roof.alcaldia] = { count: 0, superficie: 0 };
        }
        map[roof.alcaldia].count++;
        map[roof.alcaldia].superficie += roof.superficie;
      }
      return map;
    },
    /** Total superficie (m2) across public green roofs. */
    totalSuperficie() {
      return this.publicGreenRoofs.reduce((sum, r) => sum + r.superficie, 0);
    },
    /** Aggregated stats — public counts for dashboard. */
    stats() {
      const pub = this.publicGreenRoofs;
      return {
        totalExistentes: pub.length,
        totalCandidatos: this.publicCandidateRoofs.length,
        totalSuperficie: pub.reduce((s, r) => s + r.superficie, 0),
        activos: pub.filter((r) => r.estado === "activo").length,
        enMantenimiento: pub.filter((r) => r.estado === "en_mantenimiento").length,
        inactivos: pub.filter((r) => r.estado === "inactivo").length,
        nuevos: pub.filter((r) => r.estado === "nuevo").length
      };
    }
  },
  actions: {
    /** Load data from the repository (official-first, mock fallback). */
    async loadRoofs() {
      this.loading = true;
      try {
        const dataMode = typeof useRuntimeConfig !== "undefined" ? useRuntimeConfig().public.dataMode : "mock";
        const [roofs, candidates] = await Promise.all([
          fetchGreenRoofs(dataMode),
          fetchCandidates(dataMode)
        ]);
        this.greenRoofs = applyOverrides(roofs, GR_STORAGE_KEY);
        this.candidateRoofs = applyOverrides(candidates, CR_STORAGE_KEY);
      } finally {
        this.loading = false;
      }
    },
    /** Replace green roofs (from backend) with overrides applied. */
    setGreenRoofs(items) {
      this.greenRoofs = applyOverrides(items, GR_STORAGE_KEY);
    },
    /** Replace candidates (from backend) with overrides applied. */
    setCandidateRoofs(items) {
      this.candidateRoofs = applyOverrides(items, CR_STORAGE_KEY);
    },
    /** Update a green roof and persist visible/archivado to localStorage. */
    updateGreenRoof(id, data) {
      const idx = this.greenRoofs.findIndex((r) => r.id === id);
      if (idx === -1) return;
      this.greenRoofs[idx] = { ...this.greenRoofs[idx], ...data };
      if ("visible" in data || "archivado" in data) {
        const overrides = loadOverrides(GR_STORAGE_KEY);
        overrides[id] = { ...overrides[id], ...data.visible !== void 0 ? { visible: data.visible } : {}, ...data.archivado !== void 0 ? { archivado: data.archivado } : {} };
        saveOverrides(GR_STORAGE_KEY, overrides);
      }
    },
    /** Update a candidate and persist visible/archivado to localStorage. */
    updateCandidate(id, data) {
      const idx = this.candidateRoofs.findIndex((r) => r.id === id);
      if (idx === -1) return;
      this.candidateRoofs[idx] = { ...this.candidateRoofs[idx], ...data };
      if ("visible" in data || "archivado" in data) {
        const overrides = loadOverrides(CR_STORAGE_KEY);
        overrides[id] = { ...overrides[id], ...data.visible !== void 0 ? { visible: data.visible } : {}, ...data.archivado !== void 0 ? { archivado: data.archivado } : {} };
        saveOverrides(CR_STORAGE_KEY, overrides);
      }
    },
    setFilter(key, value) {
      this.filters[key] = value;
    },
    clearFilters() {
      this.filters = {
        alcaldia: null,
        tipoEdificio: null,
        tipoTechoVerde: null,
        estado: null,
        search: ""
      };
    },
    selectRoof(roof) {
      this.selectedRoof = roof;
    }
  }
});
export {
  useRoofsStore as u
};
//# sourceMappingURL=roofs-DoyVCM_d.js.map
