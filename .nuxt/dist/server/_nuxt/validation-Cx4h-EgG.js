import { defineStore } from "pinia";
import { g as getMockValidations } from "./mock-source-DMDe05Bu.js";
import { b as useRuntimeConfig } from "../server.mjs";
async function fetchValidationRecords(dataMode) {
  if (dataMode === "official") {
    try {
      console.warn("[validation-repository] Modo oficial solicitado pero adaptador no implementado. Usando datos mock.");
    } catch (e) {
      console.warn("[validation-repository] Error en fuente oficial, fallback a mock:", e);
    }
  }
  return getMockValidations();
}
const VR_STORAGE_KEY = "obs-techos-verdes-validation-overrides";
function loadOverrides() {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(VR_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveOverrides(overrides) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(VR_STORAGE_KEY, JSON.stringify(overrides));
}
function applyOverrides(items) {
  const ov = loadOverrides();
  return items.map((item) => {
    const o = ov[item.id];
    return o ? { ...item, ...o } : item;
  });
}
const useValidationStore = defineStore("validation", {
  state: () => ({
    records: [],
    currentRecord: null,
    filterEstado: null,
    loading: false
  }),
  getters: {
    /** Public records (exclude archived/hidden) */
    publicRecords(state) {
      return state.records.filter((r) => !r.archivado && r.visible !== false);
    },
    /** Number of records still awaiting human review. */
    pendingCount(state) {
      return state.records.filter((r) => r.estado === "pendiente").length;
    },
    /** Records filtered by the current estado filter (public only). */
    filteredRecords(state) {
      return state.records.filter((r) => {
        if (r.archivado) return false;
        if (r.visible === false) return false;
        if (state.filterEstado && r.estado !== state.filterEstado) return false;
        return true;
      });
    },
    /** Breakdown of records by confianza level. */
    statsByConfianza(state) {
      const levels = ["alta", "media", "baja"];
      const result = {};
      for (const nivel of levels) {
        const subset = state.records.filter((r) => r.confianza === nivel);
        result[nivel] = {
          total: subset.length,
          confirmados: subset.filter((r) => r.estado === "confirmado").length,
          rechazados: subset.filter((r) => r.estado === "rechazado").length,
          pendientes: subset.filter((r) => r.estado === "pendiente").length
        };
      }
      return result;
    }
  },
  actions: {
    /** Load data from the repository (official-first, mock fallback). */
    async loadRecords() {
      this.loading = true;
      try {
        const dataMode = typeof useRuntimeConfig !== "undefined" ? useRuntimeConfig().public.dataMode : "mock";
        this.records = applyOverrides(await fetchValidationRecords(dataMode));
      } finally {
        this.loading = false;
      }
    },
    /** Replace records (from backend) with overrides applied. */
    setRecords(items) {
      this.records = applyOverrides(items);
    },
    /** Update a record and persist visible/archivado to localStorage. */
    updateRecord(id, data) {
      const idx = this.records.findIndex((r) => r.id === id);
      if (idx === -1) return;
      this.records[idx] = { ...this.records[idx], ...data };
      if ("visible" in data || "archivado" in data) {
        const overrides = loadOverrides();
        overrides[id] = { ...overrides[id], ...data.visible !== void 0 ? { visible: data.visible } : {}, ...data.archivado !== void 0 ? { archivado: data.archivado } : {} };
        saveOverrides(overrides);
      }
    },
    confirmRecord(id, reviewer) {
      const record = this.records.find((r) => r.id === id);
      if (!record) return;
      record.estado = "confirmado";
      record.revisadoPor = reviewer;
      record.fechaRevision = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    },
    rejectRecord(id, reviewer) {
      const record = this.records.find((r) => r.id === id);
      if (!record) return;
      record.estado = "rechazado";
      record.revisadoPor = reviewer;
      record.fechaRevision = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    },
    markIndeterminate(id, reviewer) {
      const record = this.records.find((r) => r.id === id);
      if (!record) return;
      record.estado = "indeterminado";
      record.revisadoPor = reviewer;
      record.fechaRevision = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    },
    setFilterEstado(estado) {
      this.filterEstado = estado;
    },
    setCurrentRecord(record) {
      this.currentRecord = record;
    },
    addAIRecord(analysis, buildingName) {
      const maxId = this.records.reduce((max, r) => Math.max(max, r.id), 0);
      const aiSource = {
        sourceType: "derivado",
        sourceName: "Calculado",
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        confidenceLevel: analysis.porcentajeConfianza / 100,
        validationStatus: "sin_verificar"
      };
      const newRecord = {
        id: maxId + 1,
        candidatoId: 0,
        nombre: buildingName || "Imagen subida por usuario",
        imagen: "",
        prediccion: analysis.prediccion,
        confianza: analysis.confianza,
        porcentajeConfianza: analysis.porcentajeConfianza,
        estado: "pendiente",
        origenDeteccion: "ia_automatica",
        _source: aiSource
      };
      this.records.unshift(newRecord);
      return newRecord;
    }
  }
});
export {
  useValidationStore as u
};
//# sourceMappingURL=validation-Cx4h-EgG.js.map
