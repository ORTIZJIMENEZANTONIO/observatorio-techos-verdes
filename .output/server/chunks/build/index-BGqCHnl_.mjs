import { u as useHead, a as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { g as greenRoofs } from './mock-roofs-D-tdE7ed.mjs';
import { c as candidateRoofs } from './mock-candidates-Cvvvd8Mv.mjs';
import { i as indicesBioticos, a as indicadoresHidricos } from './mock-indicadores-hidricos-CcDAWtmA.mjs';
import { u as useFormatters } from './useFormatters-BCDq8oux.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const metricasAmbientales = [
  { key: "indiceBiodiversidad", label: "Indice de biodiversidad", unidad: "0-100", grupo: "biotico", colorScale: "green" },
  { key: "coberturaVegetal", label: "Cobertura vegetal", unidad: "%", grupo: "biotico", colorScale: "green" },
  { key: "riquezaEspecies", label: "Riqueza de especies", unidad: "spp", grupo: "biotico", colorScale: "green" },
  { key: "indiceShannonWiener", label: "Shannon H'", unidad: "H'", grupo: "biotico", colorScale: "green" },
  { key: "indiceSimpson", label: "Simpson 1-D", unidad: "1-D", grupo: "biotico", colorScale: "green" },
  { key: "captacionPluvial", label: "Captacion pluvial", unidad: "L/m\xB2/a\xF1o", grupo: "hidrico", colorScale: "blue" },
  { key: "precipitacionMediaAnual", label: "Precipitacion media anual", unidad: "mm/a\xF1o", grupo: "hidrico", colorScale: "blue" },
  { key: "eficienciaRetencion", label: "Eficiencia de retencion", unidad: "%", grupo: "hidrico", colorScale: "blue" },
  { key: "escorrentiaEvitada", label: "Escorrentia evitada", unidad: "L/a\xF1o", grupo: "hidrico", colorScale: "blue" }
];
function useAlcaldiaEnvironmental() {
  const bioticaKeys = ["indiceBiodiversidad", "coberturaVegetal", "riquezaEspecies", "indiceShannonWiener", "indiceSimpson"];
  const hidricaKeys = ["captacionPluvial", "precipitacionMediaAnual", "eficienciaRetencion", "escorrentiaEvitada"];
  function getAlcaldiaMetric(metricKey) {
    const result = /* @__PURE__ */ new Map();
    if (bioticaKeys.includes(metricKey)) {
      indicesBioticos.forEach((b) => {
        const val = b[metricKey];
        if (typeof val === "number") {
          result.set(b.alcaldia, val);
        }
      });
    } else if (hidricaKeys.includes(metricKey)) {
      indicadoresHidricos.forEach((h) => {
        const val = h[metricKey];
        if (typeof val === "number") {
          result.set(h.alcaldia, val);
        }
      });
    }
    return result;
  }
  function getAlcaldiaMetricNormalized(metricKey) {
    const raw = getAlcaldiaMetric(metricKey);
    if (raw.size === 0) return raw;
    let min = Infinity;
    let max = -Infinity;
    raw.forEach((v) => {
      if (v < min) min = v;
      if (v > max) max = v;
    });
    const range = max - min;
    if (range === 0) {
      const result2 = /* @__PURE__ */ new Map();
      raw.forEach((_, k) => result2.set(k, 50));
      return result2;
    }
    const result = /* @__PURE__ */ new Map();
    raw.forEach((v, k) => {
      result.set(k, (v - min) / range * 100);
    });
    return result;
  }
  function getMetricConfig(metricKey) {
    return metricasAmbientales.find((m) => m.key === metricKey);
  }
  function getMetricStats(metricKey) {
    const raw = getAlcaldiaMetric(metricKey);
    if (raw.size === 0) return { promedio: 0, min: 0, max: 0 };
    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    raw.forEach((v) => {
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    });
    return {
      promedio: sum / raw.size,
      min,
      max
    };
  }
  return {
    getAlcaldiaMetric,
    getAlcaldiaMetricNormalized,
    getMetricConfig,
    getMetricStats
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatTipoEdificio, scoreColor } = useFormatters();
    useHead({
      title: "Mapa | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Mapa interactivo de techos verdes y candidatos priorizados en la Ciudad de M\xE9xico." }
      ]
    });
    const sidebarOpen = ref(false);
    const activeLayer = ref("existentes");
    const filterAlcaldia = ref("");
    const filterTipoEdificio = ref("");
    const filterEstatus = ref("");
    const capaAmbiental = ref("");
    const selectedMarkerId = ref(null);
    ref([19.4326, -99.1332]);
    ref(11);
    const { getAlcaldiaMetric, getAlcaldiaMetricNormalized, getMetricConfig, getMetricStats } = useAlcaldiaEnvironmental();
    const layers = [
      { id: "existentes", label: "Existentes" },
      { id: "candidatos", label: "Candidatos" },
      { id: "aptitud", label: "Aptitud" }
    ];
    const alcaldias = computed(() => {
      const set = /* @__PURE__ */ new Set();
      greenRoofs.forEach((r) => set.add(r.alcaldia));
      candidateRoofs.forEach((r) => set.add(r.alcaldia));
      return Array.from(set).sort();
    });
    const tiposEdificio = computed(() => {
      const set = /* @__PURE__ */ new Set();
      greenRoofs.forEach((r) => set.add(r.tipoEdificio));
      candidateRoofs.forEach((r) => set.add(r.tipoEdificio));
      return Array.from(set).sort();
    });
    function buildGreenRoofPopup(r) {
      const descripcionHtml = r.descripcion ? `<div class="popup-divider"></div><div style="font-size:11px;color:#64748B;line-height:1.4;margin-top:4px;">${r.descripcion}</div>` : "";
      return `
    <div class="popup-card">
      <div class="popup-title">${r.nombre}</div>
      <span class="popup-badge popup-badge-existente">Techo verde</span>
      <div class="popup-meta">
        <div class="popup-meta-row">
          <span class="popup-meta-label">Alcald\xEDa</span>
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
          <span class="popup-meta-value" style="text-transform:capitalize;">${r.estado.replace(/_/g, " ")}</span>
        </div>
        ${descripcionHtml}
      </div>
    </div>
  `;
    }
    function buildCandidatePopup(r) {
      const scoreHtml = `<span style="color:${scoreColor(r.scoreAptitud)};font-weight:700;">${r.scoreAptitud}</span>`;
      return `
    <div class="popup-card">
      <div class="popup-title">${r.nombre}</div>
      <span class="popup-badge popup-badge-candidato">Candidato</span>
      <div class="popup-meta">
        <div class="popup-meta-row">
          <span class="popup-meta-label">Alcald\xEDa</span>
          <span class="popup-meta-value">${r.alcaldia}</span>
        </div>
        <div class="popup-meta-row">
          <span class="popup-meta-label">Estatus</span>
          <span class="popup-meta-value" style="text-transform:capitalize;">${r.estatus.replace(/_/g, " ")}</span>
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
  `;
    }
    const filteredGreenRoofs = computed(() => {
      return greenRoofs.filter((r) => {
        if (filterAlcaldia.value && r.alcaldia !== filterAlcaldia.value) return false;
        if (filterTipoEdificio.value && r.tipoEdificio !== filterTipoEdificio.value) return false;
        return true;
      });
    });
    const filteredCandidateRoofs = computed(() => {
      return candidateRoofs.filter((r) => {
        if (filterAlcaldia.value && r.alcaldia !== filterAlcaldia.value) return false;
        if (filterTipoEdificio.value && r.tipoEdificio !== filterTipoEdificio.value) return false;
        if (filterEstatus.value && r.estatus !== filterEstatus.value) return false;
        return true;
      });
    });
    const mapMarkers = computed(() => {
      if (activeLayer.value === "existentes") {
        return filteredGreenRoofs.value.map((r) => ({
          id: r.id,
          lat: r.lat,
          lng: r.lng,
          nombre: r.nombre,
          tipo: "existente",
          color: "#0E5E3A",
          popupHtml: buildGreenRoofPopup(r),
          alcaldia: r.alcaldia
        }));
      }
      if (activeLayer.value === "candidatos") {
        return filteredCandidateRoofs.value.map((r) => ({
          id: r.id,
          lat: r.lat,
          lng: r.lng,
          nombre: r.nombre,
          tipo: "candidato",
          color: "#F2A81D",
          popupHtml: buildCandidatePopup(r),
          alcaldia: r.alcaldia,
          scoreAptitud: r.scoreAptitud
        }));
      }
      const existentes = filteredGreenRoofs.value.map((r) => ({
        id: r.id,
        lat: r.lat,
        lng: r.lng,
        nombre: r.nombre,
        tipo: "existente",
        color: "#0E5E3A",
        popupHtml: buildGreenRoofPopup(r),
        alcaldia: r.alcaldia
      }));
      const candidatos = filteredCandidateRoofs.value.map((r) => ({
        id: r.id,
        lat: r.lat,
        lng: r.lng,
        nombre: r.nombre,
        tipo: "candidato",
        color: scoreColor(r.scoreAptitud),
        popupHtml: buildCandidatePopup(r),
        alcaldia: r.alcaldia,
        scoreAptitud: r.scoreAptitud
      }));
      return [...existentes, ...candidatos];
    });
    const totalArea = computed(() => {
      if (activeLayer.value === "existentes") {
        return filteredGreenRoofs.value.reduce((sum, r) => sum + (r.superficie || 0), 0);
      }
      return 0;
    });
    const avgScore = computed(() => {
      const filtered = filteredCandidateRoofs.value;
      if (filtered.length === 0) return 0;
      return filtered.reduce((sum, r) => sum + r.scoreAptitud, 0) / filtered.length;
    });
    const selectedDetail = computed(() => {
      if (selectedMarkerId.value === null) return null;
      const gr = greenRoofs.find((r) => r.id === selectedMarkerId.value);
      if (gr) {
        return {
          nombre: gr.nombre,
          direccion: gr.direccion,
          alcaldia: gr.alcaldia,
          tipoEdificio: gr.tipoEdificio,
          superficie: gr.superficie,
          tipo: "existente",
          tipoTechoVerde: gr.tipoTechoVerde
        };
      }
      const cr = candidateRoofs.find((r) => r.id === selectedMarkerId.value);
      if (cr) {
        return {
          nombre: cr.nombre,
          direccion: cr.direccion,
          alcaldia: cr.alcaldia,
          tipoEdificio: cr.tipoEdificio,
          superficie: cr.superficie,
          tipo: "candidato",
          scoreAptitud: cr.scoreAptitud
        };
      }
      return null;
    });
    computed(() => {
      if (!capaAmbiental.value) return null;
      return getAlcaldiaMetricNormalized(capaAmbiental.value);
    });
    computed(() => {
      if (!capaAmbiental.value) return null;
      return getAlcaldiaMetric(capaAmbiental.value);
    });
    const envMetricConfig = computed(() => {
      if (!capaAmbiental.value) return null;
      return getMetricConfig(capaAmbiental.value);
    });
    const envStats = computed(() => {
      if (!capaAmbiental.value) return null;
      return getMetricStats(capaAmbiental.value);
    });
    const legendItems = [
      { label: "Muy alta (80-100)", color: "#0E5E3A" },
      { label: "Alta (60-80)", color: "#79C141" },
      { label: "Media (40-60)", color: "#F2A81D" },
      { label: "Baja (20-40)", color: "#F97316" },
      { label: "Muy baja (0-20)", color: "#D9363E" }
    ];
    const greenLegendItems = [
      { label: "Muy alto (80-100)", color: "#064E3B" },
      { label: "Alto (60-80)", color: "#059669" },
      { label: "Medio (40-60)", color: "#34D399" },
      { label: "Bajo (20-40)", color: "#A7F3D0" },
      { label: "Muy bajo (0-20)", color: "#ECFDF5" }
    ];
    const blueLegendItems = [
      { label: "Muy alto (80-100)", color: "#1E3A5F" },
      { label: "Alto (60-80)", color: "#2563EB" },
      { label: "Medio (40-60)", color: "#60A5FA" },
      { label: "Bajo (20-40)", color: "#BFDBFE" },
      { label: "Muy bajo (0-20)", color: "#EFF6FF" }
    ];
    const activeLegendItems = computed(() => {
      if (!capaAmbiental.value) return legendItems;
      const config = envMetricConfig.value;
      if (!config) return legendItems;
      return config.colorScale === "green" ? greenLegendItems : blueLegendItems;
    });
    watch(activeLayer, () => {
      selectedMarkerId.value = null;
      capaAmbiental.value = "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex flex-col",
        style: { "height": "calc(100vh - 4rem)" }
      }, _attrs))}><div class="border-b border-accent/20 bg-accent/5 px-4 py-2"><div class="flex items-center gap-2 text-xs text-accent-dark"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>Aptitud territorial, no factibilidad estructural. Consulte dict\xE1menes t\xE9cnicos para implementaci\xF3n.</span></div></div><div class="relative flex flex-1 overflow-hidden"><aside class="${ssrRenderClass([
        "z-10 flex-shrink-0 overflow-y-auto bg-white shadow-panel transition-all duration-300",
        unref(sidebarOpen) ? "fixed inset-x-0 bottom-0 top-auto h-[60vh] rounded-t-2xl lg:relative lg:inset-auto lg:h-auto lg:w-80 lg:rounded-none" : "fixed -bottom-full lg:relative lg:bottom-auto lg:w-80"
      ])}"><div class="flex justify-center py-2 lg:hidden"><span class="h-1 w-10 rounded-full bg-gray-300"></span></div><div class="p-4"><h3 class="text-base font-semibold text-ink">Filtros</h3><div class="mt-4"><label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Capa</label><div class="mt-2 flex gap-1"><!--[-->`);
      ssrRenderList(layers, (layer) => {
        _push(`<button class="${ssrRenderClass([
          "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
          unref(activeLayer) === layer.id ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
        ])}">${ssrInterpolate(layer.label)}</button>`);
      });
      _push(`<!--]--></div></div><div class="mt-5"><label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Alcald\xEDa</label><select class="select mt-1.5"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterAlcaldia)) ? ssrLooseContain(unref(filterAlcaldia), "") : ssrLooseEqual(unref(filterAlcaldia), "")) ? " selected" : ""}>Todas las alcald\xEDas</option><!--[-->`);
      ssrRenderList(unref(alcaldias), (a) => {
        _push(`<option${ssrRenderAttr("value", a)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterAlcaldia)) ? ssrLooseContain(unref(filterAlcaldia), a) : ssrLooseEqual(unref(filterAlcaldia), a)) ? " selected" : ""}>${ssrInterpolate(a)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mt-4"><label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Tipo de edificio</label><select class="select mt-1.5"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterTipoEdificio)) ? ssrLooseContain(unref(filterTipoEdificio), "") : ssrLooseEqual(unref(filterTipoEdificio), "")) ? " selected" : ""}>Todos los tipos</option><!--[-->`);
      ssrRenderList(unref(tiposEdificio), (t) => {
        _push(`<option${ssrRenderAttr("value", t)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterTipoEdificio)) ? ssrLooseContain(unref(filterTipoEdificio), t) : ssrLooseEqual(unref(filterTipoEdificio), t)) ? " selected" : ""}>${ssrInterpolate(unref(formatTipoEdificio)(t))}</option>`);
      });
      _push(`<!--]--></select></div>`);
      if (unref(activeLayer) === "candidatos") {
        _push(`<div class="mt-4"><label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Estatus</label><select class="select mt-1.5"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstatus)) ? ssrLooseContain(unref(filterEstatus), "") : ssrLooseEqual(unref(filterEstatus), "")) ? " selected" : ""}>Todos los estatus</option><option value="candidato"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstatus)) ? ssrLooseContain(unref(filterEstatus), "candidato") : ssrLooseEqual(unref(filterEstatus), "candidato")) ? " selected" : ""}>Candidato</option><option value="validado_visualmente"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstatus)) ? ssrLooseContain(unref(filterEstatus), "validado_visualmente") : ssrLooseEqual(unref(filterEstatus), "validado_visualmente")) ? " selected" : ""}>Validado visualmente</option><option value="factibilidad_pendiente"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstatus)) ? ssrLooseContain(unref(filterEstatus), "factibilidad_pendiente") : ssrLooseEqual(unref(filterEstatus), "factibilidad_pendiente")) ? " selected" : ""}>Factibilidad pendiente</option><option value="piloto"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstatus)) ? ssrLooseContain(unref(filterEstatus), "piloto") : ssrLooseEqual(unref(filterEstatus), "piloto")) ? " selected" : ""}>Piloto</option><option value="implementado"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstatus)) ? ssrLooseContain(unref(filterEstatus), "implementado") : ssrLooseEqual(unref(filterEstatus), "implementado")) ? " selected" : ""}>Implementado</option></select></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeLayer) === "aptitud") {
        _push(`<div class="mt-4"><label class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Capa ambiental</label><select class="select mt-1.5"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "") : ssrLooseEqual(unref(capaAmbiental), "")) ? " selected" : ""}>Aptitud general (score)</option><optgroup label="Indicadores bi\xF3ticos"><option value="indiceBiodiversidad"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "indiceBiodiversidad") : ssrLooseEqual(unref(capaAmbiental), "indiceBiodiversidad")) ? " selected" : ""}>\xCDndice de biodiversidad</option><option value="coberturaVegetal"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "coberturaVegetal") : ssrLooseEqual(unref(capaAmbiental), "coberturaVegetal")) ? " selected" : ""}>Cobertura vegetal</option><option value="riquezaEspecies"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "riquezaEspecies") : ssrLooseEqual(unref(capaAmbiental), "riquezaEspecies")) ? " selected" : ""}>Riqueza de especies</option><option value="indiceShannonWiener"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "indiceShannonWiener") : ssrLooseEqual(unref(capaAmbiental), "indiceShannonWiener")) ? " selected" : ""}>Shannon H&#39;</option><option value="indiceSimpson"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "indiceSimpson") : ssrLooseEqual(unref(capaAmbiental), "indiceSimpson")) ? " selected" : ""}>Simpson 1-D</option></optgroup><optgroup label="Indicadores h\xEDdricos"><option value="captacionPluvial"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "captacionPluvial") : ssrLooseEqual(unref(capaAmbiental), "captacionPluvial")) ? " selected" : ""}>Captaci\xF3n pluvial</option><option value="precipitacionMediaAnual"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "precipitacionMediaAnual") : ssrLooseEqual(unref(capaAmbiental), "precipitacionMediaAnual")) ? " selected" : ""}>Precipitaci\xF3n media anual</option><option value="eficienciaRetencion"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "eficienciaRetencion") : ssrLooseEqual(unref(capaAmbiental), "eficienciaRetencion")) ? " selected" : ""}>Eficiencia de retenci\xF3n</option><option value="escorrentiaEvitada"${ssrIncludeBooleanAttr(Array.isArray(unref(capaAmbiental)) ? ssrLooseContain(unref(capaAmbiental), "escorrentiaEvitada") : ssrLooseEqual(unref(capaAmbiental), "escorrentiaEvitada")) ? " selected" : ""}>Escorrent\xEDa evitada</option></optgroup></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-6 rounded-card bg-surface p-4"><p class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Resumen</p><div class="mt-3 space-y-2"><div class="flex items-center justify-between"><span class="text-sm text-ink">Marcadores visibles</span><span class="text-sm font-bold text-primary">${ssrInterpolate(unref(mapMarkers).length)}</span></div>`);
      if (unref(activeLayer) === "existentes") {
        _push(`<div class="flex items-center justify-between"><span class="text-sm text-ink">Superficie total</span><span class="text-sm font-bold text-primary">${ssrInterpolate(unref(totalArea).toLocaleString())} m\xB2</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeLayer) === "candidatos") {
        _push(`<div class="flex items-center justify-between"><span class="text-sm text-ink">Score promedio</span><span class="text-sm font-bold text-primary">${ssrInterpolate(unref(avgScore).toFixed(1))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeLayer) === "aptitud" && unref(capaAmbiental) && unref(envStats)) {
        _push(`<!--[--><div class="mt-2 border-t border-gray-200 pt-2"><p class="text-[10px] font-semibold uppercase tracking-wider text-slate-custom">${ssrInterpolate((_a = unref(envMetricConfig)) == null ? void 0 : _a.label)}</p></div><div class="flex items-center justify-between"><span class="text-sm text-ink">Promedio</span><span class="text-sm font-bold text-primary">${ssrInterpolate(unref(envStats).promedio.toFixed(1))} ${ssrInterpolate((_b = unref(envMetricConfig)) == null ? void 0 : _b.unidad)}</span></div><div class="flex items-center justify-between"><span class="text-sm text-ink">Min</span><span class="text-sm font-bold text-slate-custom">${ssrInterpolate(unref(envStats).min.toFixed(1))}</span></div><div class="flex items-center justify-between"><span class="text-sm text-ink">Max</span><span class="text-sm font-bold text-slate-custom">${ssrInterpolate(unref(envStats).max.toFixed(1))}</span></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><button class="btn-ghost mt-4 w-full text-xs"> Limpiar filtros </button>`);
      if (unref(selectedDetail)) {
        _push(`<div class="mt-6 rounded-card border border-primary/20 bg-primary/5 p-4"><div class="flex items-start justify-between"><p class="text-xs font-semibold uppercase tracking-wider text-primary">Detalle</p><button class="text-xs text-slate-custom hover:text-ink"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><h4 class="mt-2 text-sm font-semibold text-ink">${ssrInterpolate(unref(selectedDetail).nombre)}</h4><p class="mt-1 text-xs text-slate-custom">${ssrInterpolate(unref(selectedDetail).direccion)}</p><div class="mt-3 space-y-1.5"><div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Alcald\xEDa</span><span class="font-medium text-ink">${ssrInterpolate(unref(selectedDetail).alcaldia)}</span></div><div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Tipo</span><span class="font-medium text-ink">${ssrInterpolate(unref(formatTipoEdificio)(unref(selectedDetail).tipoEdificio))}</span></div><div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Superficie</span><span class="font-medium text-ink">${ssrInterpolate(unref(selectedDetail).superficie.toLocaleString())} m\xB2</span></div>`);
        if (unref(selectedDetail).tipo === "candidato" && unref(selectedDetail).scoreAptitud !== void 0) {
          _push(`<div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Score aptitud</span><span class="font-bold" style="${ssrRenderStyle({ color: unref(scoreColor)(unref(selectedDetail).scoreAptitud) })}">${ssrInterpolate(unref(selectedDetail).scoreAptitud)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedDetail).tipo === "existente" && unref(selectedDetail).tipoTechoVerde) {
          _push(`<div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Tipo techo</span><span class="font-medium text-ink capitalize">${ssrInterpolate(unref(selectedDetail).tipoTechoVerde)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><div class="relative flex-1">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full w-full items-center justify-center bg-surface"${_scopeId}><div class="text-center"${_scopeId}><div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"${_scopeId}></div><p class="text-sm text-slate-custom"${_scopeId}>Cargando mapa...</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full w-full items-center justify-center bg-surface" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
                  createVNode("p", { class: "text-sm text-slate-custom" }, "Cargando mapa...")
                ])
              ])
            ];
          }
        })
      }, _parent));
      _push(`<div class="absolute bottom-4 right-4 z-[500] rounded-card bg-white/95 p-3 shadow-panel backdrop-blur-sm"><p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-custom">${ssrInterpolate(unref(activeLayer) === "aptitud" && unref(capaAmbiental) ? (_c = unref(envMetricConfig)) == null ? void 0 : _c.label : "Leyenda")}</p><div class="space-y-1">`);
      if (unref(activeLayer) === "existentes") {
        _push(`<div class="flex items-center gap-2"><span class="h-3 w-3 rounded-full border-2 border-white shadow-sm" style="${ssrRenderStyle({ "background": "#0E5E3A" })}"></span><span class="text-xs text-ink">Techo verde existente</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeLayer) === "candidatos") {
        _push(`<div class="flex items-center gap-2"><span class="h-3 w-3 rounded-full border-2 border-white shadow-sm" style="${ssrRenderStyle({ "background": "#F2A81D" })}"></span><span class="text-xs text-ink">Candidato priorizado</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeLayer) === "aptitud") {
        _push(`<!--[-->`);
        ssrRenderList(unref(activeLegendItems), (level) => {
          _push(`<div class="flex items-center gap-2"><span class="h-3 w-6 rounded-sm" style="${ssrRenderStyle({ backgroundColor: level.color })}"></span><span class="text-xs text-ink">${ssrInterpolate(level.label)}</span></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><button class="absolute bottom-4 left-4 z-[500] flex items-center gap-2 rounded-card bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-panel lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filtros </button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mapa/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BGqCHnl_.mjs.map
