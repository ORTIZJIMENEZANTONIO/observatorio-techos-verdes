import { _ as _sfc_main$1 } from './AdminPipelineBanner-B8R7ys78.mjs';
import { defineComponent, ref, watch, reactive, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport } from 'vue/server-renderer';
import { b as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './useApi-c2WXwWRZ.mjs';
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
import './auth-5u7f_0sK.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { apiFetch } = useApi();
    const config = useRuntimeConfig();
    const observatory = config.public.observatory;
    const activeTab = ref("cola");
    const prospects = ref([]);
    const loadingProspects = ref(true);
    const filter = ref("pendiente");
    async function loadProspects() {
      loadingProspects.value = true;
      try {
        const res = await apiFetch(
          `/observatory/${observatory}/admin/prospectos?status=${filter.value}`
        );
        prospects.value = res.items || [];
      } catch {
        prospects.value = [];
      }
      loadingProspects.value = false;
    }
    watch(filter, loadProspects);
    const rejectNotes = ref("");
    const rejectingId = ref(null);
    const allResults = ref([]);
    const selected = ref(/* @__PURE__ */ new Set());
    const loadingDetector = ref(false);
    const submitting = ref(false);
    const detectorPhase = ref("config");
    const showFilters = ref(true);
    const expandedRow = ref(null);
    const showMethodology = ref(false);
    const showConfigMethodology = ref(false);
    const minArea = ref(200);
    const maxArea = ref(5e4);
    const minScore = ref(30);
    const bbox = reactive({ south: 19.42, west: -99.15, north: 19.44, east: -99.12 });
    const detectorPage = ref(1);
    const perPage = ref(25);
    const detectorFilters = reactive({
      search: "",
      tipoEdificio: "",
      scoreMin: 0,
      scoreMax: 100,
      areaMin: 0,
      areaMax: 999999,
      ndviMin: 0,
      carga: "",
      zonaSismica: "",
      sortBy: "score",
      sortDir: "desc"
    });
    const columns = [
      { key: "indices.refId", label: "Ref", align: "left", tip: "Identificador \xFAnico del edificio en OpenStreetMap (Way ID). Permite rastrear y verificar el edificio en osm.org." },
      { key: "nombre", label: "Nombre", align: "left", tip: "Nombre del edificio seg\xFAn OSM, o identificador gen\xE9rico con tipo + OSM ID si no tiene nombre." },
      { key: "tipo", label: "Tipo", align: "left", tip: "Clasificaci\xF3n del edificio en OSM (commercial, hospital, school, etc.). Los tipos institucional/comercial reciben mayor puntaje por mayor probabilidad de techo plano y capacidad estructural." },
      { key: "score", label: "Score", align: "right", tip: "Puntaje compuesto (0-100) de 6 criterios: superficie (m\xE1x 25), rectangularidad (m\xE1x 20), tipo edificio (m\xE1x 15), material techo (m\xE1x 15), niveles (m\xE1x 10), identificaci\xF3n (m\xE1x 5). Click en \u25B6 para ver desglose." },
      { key: "areaM2", label: "m\xB2", align: "right", tip: "Superficie de la huella del edificio en metros cuadrados. Calculada geom\xE9tricamente con Turf.js sobre el pol\xEDgono OSM. Edificios m\xE1s grandes tienen mayor potencial de impacto ambiental." },
      { key: "indices.ndviPotencial", label: "NDVI pot.", align: "right", tip: "\xCDndice de Vegetaci\xF3n Normalizado potencial (0-1). NO es NDVI satelital. Es un proxy que estima viabilidad de vegetaci\xF3n en azotea: base 0.3 + techo concreto/plano (+0.3) + carga apta (+0.2) + \xE1rea >=500m\xB2 (+0.1). Para NDVI real se requiere Sentinel-2 v\xEDa GEE." },
      { key: "indices.rectangularidad", label: "Rect.", align: "right", tip: "Rectangularidad: area_poligono / area_bounding_box (0-100%). Techos planos son t\xEDpicamente rectangulares. >=85% indica geometr\xEDa ideal para instalaci\xF3n modular de TVLE. Calculado con turf.area() y turf.bbox()." },
      { key: "indices.compacidad", label: "Comp.", align: "right", tip: "\xCDndice Polsby-Popper: 4*PI*area/per\xEDmetro\xB2 (0-100%). Mide regularidad geom\xE9trica. 100%=c\xEDrculo perfecto. Valores altos = forma regular = menor costo de instalaci\xF3n perimetral. Ref: Polsby & Popper (1991)." },
      { key: "indices.cargaEstimada", label: "Carga", align: "left", tip: 'Viabilidad estructural estimada. "apta": tipo comercial/industrial <=8 niv. "requiere_evaluacion": residencial 4-6 niv. "no_recomendado": >6 niv residencial. Ref: NTC-CDMX 2017, carga m\xEDn TVLE: 100 kg/m\xB2. Requiere dictamen real.' },
      { key: "indices.zonaSismica", label: "Zona", align: "left", tip: "Zona s\xEDsmica CDMX estimada por latitud. I (>=19.45\xB0, firme), IIa (19.40-19.45\xB0), IIIa (19.35-19.40\xB0, transici\xF3n), IIIb (19.28-19.35\xB0, lacustre), IIIc (<19.28\xB0). Ref: Atlas de Riesgos CDMX, SGIRPC." },
      { key: "indices.reduccionCO2", label: "CO\u2082 t/a", align: "right", tip: "Captura estimada de CO\u2082 (toneladas/a\xF1o). F\xF3rmula: superficie_m\xB2 \xD7 0.968 kg/m\xB2/a\xF1o / 1000. Ref: Cervantes N\xE1jera (2021), CIIEMAD-IPN, mediciones en TVLE experimental." },
      { key: "indices.captacionPluvial", label: "Capt. L/a", align: "right", tip: "Captaci\xF3n pluvial estimada (litros/a\xF1o). F\xF3rmula: superficie_m\xB2 \xD7 800mm (precipitaci\xF3n media anual CDMX). Coef. escurrimiento simplificado a 1.0; real depende de sustrato (0.3-0.7)." },
      { key: "indices.niveles", label: "Niv.", align: "right", tip: "Pisos del edificio (tag building:levels en OSM). 0 = no disponible. Menos niveles = menor riesgo s\xEDsmico y mayor facilidad de refuerzo estructural para soportar TVLE." }
    ];
    const scoreComponents = [
      { key: "superficie", label: "Superficie", max: 25, desc: ">=1,000 m\xB2 = 25 pts | >=500 m\xB2 = 20 pts | >=200 m\xB2 = 10 pts", why: "Azoteas m\xE1s grandes permiten mayor impacto ambiental (CO\u2082, isla de calor, captaci\xF3n pluvial) y mejor retorno de inversi\xF3n por econom\xEDa de escala en instalaci\xF3n." },
      { key: "rectangularidad", label: "Rectangularidad", max: 20, desc: ">=85% = 20 pts | >=70% = 12 pts | <70% = 5 pts", why: "Los techos rectangulares facilitan la instalaci\xF3n modular de charolas TVLE, reducen desperdicio de material y simplifican el dise\xF1o de drenaje." },
      { key: "tipo", label: "Tipo de edificio", max: 15, desc: "commercial/industrial/public/hospital/school = 15 pts | apartments = 8 pts", why: "Edificios institucionales y comerciales tienen mayor probabilidad de techo plano de concreto, mejor mantenimiento y mayor visibilidad como caso demostrativo." },
      { key: "techo", label: "Material de techo", max: 15, desc: "concrete o flat (tag roof:material/roof:shape en OSM) = 15 pts", why: "Losa de concreto armado es el sustrato ideal para TVLE: soporta >=100 kg/m\xB2 (NTC-CDMX 2017), es impermeable y no requiere refuerzo adicional en la mayor\xEDa de casos." },
      { key: "niveles", label: "Niveles", max: 10, desc: "1-5 niveles = 10 pts | 6-10 = 5 pts | >10 = 0 pts", why: "Edificios de baja y mediana altura tienen mejor ratio de \xE1rea de azotea vs huella, menor riesgo s\xEDsmico, y acceso m\xE1s f\xE1cil para instalaci\xF3n y mantenimiento." },
      { key: "nombre", label: "Identificaci\xF3n", max: 5, desc: "Edificio con nombre en OSM = 5 pts", why: "Edificios nombrados son generalmente edificaciones significativas (gobierno, comercio, educaci\xF3n) con mayor probabilidad de ser candidatos viables y replicables." }
    ];
    function estimateComponentScore(r, key) {
      const idx = r.indices;
      if (!idx) return 0;
      switch (key) {
        case "superficie":
          return r.areaM2 >= 1e3 ? 25 : r.areaM2 >= 500 ? 20 : 10;
        case "rectangularidad":
          return idx.rectangularidad >= 0.85 ? 20 : idx.rectangularidad >= 0.7 ? 12 : 5;
        case "tipo": {
          const good = ["commercial", "industrial", "warehouse", "office", "retail", "public", "civic", "government", "hospital", "school", "university"];
          return good.includes(r.tipo) ? 15 : r.tipo === "apartments" || r.tipo === "yes" ? 8 : 0;
        }
        case "techo":
          return idx.materialTecho === "concrete" || idx.materialTecho === "flat" ? 15 : 0;
        case "niveles":
          return idx.niveles > 0 && idx.niveles <= 5 ? 10 : idx.niveles > 5 && idx.niveles <= 10 ? 5 : 0;
        case "nombre":
          return r.nombre && !r.nombre.startsWith("Edificio ") ? 5 : 0;
        default:
          return 0;
      }
    }
    const filtered = computed(() => {
      let rows = allResults.value;
      const q = detectorFilters.search.toLowerCase();
      if (q) rows = rows.filter((r) => {
        var _a, _b;
        return r.nombre.toLowerCase().includes(q) || ((_b = (_a = r.indices) == null ? void 0 : _a.refId) == null ? void 0 : _b.toLowerCase().includes(q));
      });
      if (detectorFilters.tipoEdificio) rows = rows.filter((r) => r.tipo === detectorFilters.tipoEdificio);
      if (detectorFilters.scoreMin > 0) rows = rows.filter((r) => r.score >= detectorFilters.scoreMin);
      if (detectorFilters.scoreMax < 100) rows = rows.filter((r) => r.score <= detectorFilters.scoreMax);
      if (detectorFilters.areaMin > 0) rows = rows.filter((r) => r.areaM2 >= detectorFilters.areaMin);
      if (detectorFilters.areaMax < 999999) rows = rows.filter((r) => r.areaM2 <= detectorFilters.areaMax);
      if (detectorFilters.ndviMin > 0) rows = rows.filter((r) => {
        var _a, _b;
        return ((_b = (_a = r.indices) == null ? void 0 : _a.ndviPotencial) != null ? _b : 0) >= detectorFilters.ndviMin;
      });
      if (detectorFilters.carga) rows = rows.filter((r) => {
        var _a;
        return ((_a = r.indices) == null ? void 0 : _a.cargaEstimada) === detectorFilters.carga;
      });
      if (detectorFilters.zonaSismica) rows = rows.filter((r) => {
        var _a;
        return ((_a = r.indices) == null ? void 0 : _a.zonaSismica) === detectorFilters.zonaSismica;
      });
      const dir = detectorFilters.sortDir === "asc" ? 1 : -1;
      rows = [...rows].sort((a, b) => {
        var _a, _b;
        const k = detectorFilters.sortBy;
        const va = k.includes(".") ? (_a = a.indices) == null ? void 0 : _a[k.split(".")[1]] : a[k];
        const vb = k.includes(".") ? (_b = b.indices) == null ? void 0 : _b[k.split(".")[1]] : b[k];
        if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
        return String(va || "").localeCompare(String(vb || "")) * dir;
      });
      return rows;
    });
    const totalPages = computed(() => Math.ceil(filtered.value.length / perPage.value) || 1);
    const paginated = computed(() => filtered.value.slice((detectorPage.value - 1) * perPage.value, detectorPage.value * perPage.value));
    const uniqueTipos = computed(() => [...new Set(allResults.value.map((r) => r.tipo))].filter(Boolean).sort());
    const uniqueZonas = computed(() => [...new Set(allResults.value.map((r) => {
      var _a;
      return (_a = r.indices) == null ? void 0 : _a.zonaSismica;
    }))].filter(Boolean).sort());
    watch([detectorFilters], () => {
      detectorPage.value = 1;
    }, { deep: true });
    function sortIcon(col) {
      return detectorFilters.sortBy !== col ? "\u2195" : detectorFilters.sortDir === "asc" ? "\u2191" : "\u2193";
    }
    function scoreClass(s) {
      return s >= 70 ? "bg-green-100 text-green-800" : s >= 40 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";
    }
    function cargaClass(c) {
      return c === "apta" ? "bg-green-100 text-green-800" : c === "requiere_evaluacion" ? "bg-yellow-100 text-yellow-800" : c === "no_recomendado" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-500";
    }
    function barWidth(val, max) {
      return `${Math.round(val / max * 100)}%`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminPipelineBanner = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-4"><h2 class="text-2xl font-semibold text-ink">Prospectos</h2><p class="mt-1 text-sm text-slate-custom">Deteccion geoespacial y cola de aprobacion de candidatos a techo verde</p></div>`);
      _push(ssrRenderComponent(_component_AdminPipelineBanner, {
        "current-step": "prospectos",
        description: "El detector identifica edificios candidatos via OpenStreetMap. Los prospectos pendientes esperan tu revision para pasar a candidatos."
      }, null, _parent));
      _push(`<div class="sticky top-0 z-30 -mx-4 border-b border-gray-200 bg-white/95 px-4 backdrop-blur-sm lg:-mx-6 lg:px-6"><nav class="flex gap-1 overflow-x-auto py-2 scrollbar-hide"><button class="${ssrRenderClass([unref(activeTab) === "cola" ? "bg-primary text-white shadow-sm scale-[1.02]" : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95", "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"])}"><svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Cola de aprobaci\xF3n </button><button class="${ssrRenderClass([unref(activeTab) === "detector" ? "bg-primary text-white shadow-sm scale-[1.02]" : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95", "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"])}"><svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg> Detector </button></nav></div><div class="pt-4" style="${ssrRenderStyle(unref(activeTab) === "cola" ? null : { display: "none" })}"><div class="mb-4 flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(["pendiente", "aprobado", "rechazado"], (f) => {
        _push(`<button class="${ssrRenderClass([unref(filter) === f ? "bg-primary text-white shadow-sm scale-[1.02]" : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95", "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"])}">${ssrInterpolate(f.charAt(0).toUpperCase() + f.slice(1))}s </button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(loadingProspects)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="card animate-pulse p-4"><div class="h-4 w-48 rounded bg-gray-200"></div><div class="mt-2 h-3 w-full rounded bg-gray-100"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(prospects).length === 0) {
        _push(`<div class="card p-12 text-center"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">`);
        if (unref(filter) === "pendiente") {
          _push(`<svg class="h-8 w-8 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        } else if (unref(filter) === "aprobado") {
          _push(`<svg class="h-8 w-8 text-eco/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        } else {
          _push(`<svg class="h-8 w-8 text-alert/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        }
        _push(`</div><p class="mt-4 text-lg font-medium text-gray-500">No hay prospectos ${ssrInterpolate(unref(filter))}s</p><p class="mt-1 text-sm text-gray-400">`);
        if (unref(filter) === "pendiente") {
          _push(`<!--[-->Ejecuta el detector para encontrar nuevos candidatos<!--]-->`);
        } else if (unref(filter) === "aprobado") {
          _push(`<!--[-->Los prospectos aprobados aparecer\xE1n aqu\xED<!--]-->`);
        } else {
          _push(`<!--[-->Los prospectos rechazados aparecer\xE1n aqu\xED<!--]-->`);
        }
        _push(`</p>`);
        if (unref(filter) === "pendiente") {
          _push(`<button class="btn-primary mt-4 inline-flex items-center gap-2"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg> Ir al detector </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs({
          name: "slide-up",
          class: "space-y-3"
        })}>`);
        ssrRenderList(unref(prospects), (p) => {
          _push(`<div class="card p-4 transition-shadow duration-200 hover:shadow-card-hover"><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"><div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2"><span class="font-semibold text-ink">#${ssrInterpolate(p.id)}</span><span class="${ssrRenderClass([{
            "!bg-yellow-100 !text-yellow-800": p.status === "pendiente",
            "!bg-green-100 !text-green-800": p.status === "aprobado",
            "!bg-red-100 !text-red-800": p.status === "rechazado"
          }, "badge-primary text-xs"])}">${ssrInterpolate(p.status)}</span>`);
          if (p.source) {
            _push(`<span class="text-xs text-slate-custom"> via ${ssrInterpolate(p.source)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (p.confianzaDetector) {
            _push(`<span class="text-xs text-slate-custom"> (confianza: ${ssrInterpolate(p.confianzaDetector)}) </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><pre class="mt-2 max-h-40 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-700">${ssrInterpolate(JSON.stringify(p.data, null, 2))}</pre>`);
          if (p.notasAdmin) {
            _push(`<p class="mt-2 text-sm text-slate-custom"><strong>Notas:</strong> ${ssrInterpolate(p.notasAdmin)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="mt-1 text-xs text-gray-400">${ssrInterpolate(new Date(p.createdAt).toLocaleDateString("es-MX", { dateStyle: "medium" }))}</p></div>`);
          if (p.status === "pendiente") {
            _push(`<div class="flex flex-shrink-0 gap-2"><button class="btn-eco text-sm">Aprobar</button><button class="btn-outline text-sm !border-red-300 !text-red-600 hover:!bg-red-50"> Rechazar </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`</div>`);
      }
      _push(`</div><div class="pt-4" style="${ssrRenderStyle(unref(activeTab) === "detector" ? null : { display: "none" })}"><div class="mb-4"><div class="flex flex-wrap items-center justify-between gap-3"><div><h3 class="text-lg font-semibold text-ink">Detector de Techos Verdes</h3><p class="mt-0.5 text-sm text-slate-custom">An\xE1lisis geoespacial multicriterio \u2014 OpenStreetMap (Overpass API) + Turf.js</p></div>`);
      if (unref(detectorPhase) === "results") {
        _push(`<button class="btn-ghost text-sm">\u2190 Nueva b\xFAsqueda</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(detectorPhase) === "config") {
        _push(`<div class="space-y-5"><div class="rounded-lg border border-primary/20 bg-primary-50 p-4"><h3 class="flex items-center gap-2 font-semibold text-primary-dark"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> C\xF3mo funciona el detector </h3><p class="mt-1 text-sm text-primary-dark/80"> El detector consulta edificios de <strong>OpenStreetMap</strong> en el \xE1rea seleccionada, calcula \xEDndices geom\xE9tricos con <strong>Turf.js</strong> y asigna un score multicriterio (0-100) basado en 6 factores. Los candidatos con mayor score tienen mayor potencial para techo verde. Los resultados se pueden enviar a la <strong>cola de prospectos</strong> para revisi\xF3n y aprobaci\xF3n. </p></div><div class="card p-5"><h3 class="mb-3 font-semibold text-ink">\xC1rea de b\xFAsqueda</h3><div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"><div><label class="mb-1 block text-xs text-slate-custom">Sur (lat)</label><input${ssrRenderAttr("value", unref(bbox).south)} class="input w-full" type="number" step="0.001"></div><div><label class="mb-1 block text-xs text-slate-custom">Oeste (lng)</label><input${ssrRenderAttr("value", unref(bbox).west)} class="input w-full" type="number" step="0.001"></div><div><label class="mb-1 block text-xs text-slate-custom">Norte (lat)</label><input${ssrRenderAttr("value", unref(bbox).north)} class="input w-full" type="number" step="0.001"></div><div><label class="mb-1 block text-xs text-slate-custom">Este (lng)</label><input${ssrRenderAttr("value", unref(bbox).east)} class="input w-full" type="number" step="0.001"></div></div><p class="mt-2 text-xs text-slate-custom">~${ssrInterpolate(((unref(bbox).north - unref(bbox).south) * 111).toFixed(1))} x ${ssrInterpolate(((unref(bbox).east - unref(bbox).west) * 85).toFixed(1))} km (auto-limitado a m\xE1x 5x5 km por Overpass API)</p><div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3"><div><label class="mb-1 block text-xs text-slate-custom">M\xEDn m\xB2</label><input${ssrRenderAttr("value", unref(minArea))} class="input w-full" type="number"></div><div><label class="mb-1 block text-xs text-slate-custom">M\xE1x m\xB2</label><input${ssrRenderAttr("value", unref(maxArea))} class="input w-full" type="number"></div><div><label class="mb-1 block text-xs text-slate-custom">Score m\xEDn (0-100)</label><input${ssrRenderAttr("value", unref(minScore))} class="input w-full" type="number" min="0" max="100"></div></div></div><button class="btn-primary w-full py-3 text-lg"${ssrIncludeBooleanAttr(unref(loadingDetector)) ? " disabled" : ""}>`);
        if (unref(loadingDetector)) {
          _push(`<svg class="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(loadingDetector) ? "Consultando Overpass API (puede tardar 15-60s)..." : "Ejecutar detecci\xF3n")}</button><div><button class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-3.5 text-left transition-colors hover:bg-gray-50"><span class="flex items-center gap-2"><svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg><span class="text-sm font-semibold text-ink">Metodolog\xEDa, \xEDndices y referencias</span></span><svg class="${ssrRenderClass([unref(showConfigMethodology) ? "rotate-180" : "", "h-5 w-5 text-gray-400 transition-transform duration-200"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>`);
        if (unref(showConfigMethodology)) {
          _push(`<div class="mt-2 space-y-5"><div class="card p-5"><h3 class="mb-3 font-semibold text-ink">Composici\xF3n del score (0-100 puntos)</h3><p class="mb-3 text-sm text-slate-custom">Suma ponderada de 6 factores derivados de geometr\xEDa (Turf.js) y metadatos (OpenStreetMap). Total m\xE1ximo te\xF3rico: 90 pts (no todos los factores se cumplen simult\xE1neamente).</p><div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b text-left text-xs uppercase text-gray-500"><th class="py-2 pr-3">Factor</th><th class="py-2 pr-3 text-center">M\xE1x</th><th class="py-2 pr-3">Criterio</th><th class="py-2">Justificaci\xF3n</th></tr></thead><tbody><!--[-->`);
          ssrRenderList(scoreComponents, (c) => {
            _push(`<tr class="border-b border-gray-100"><td class="py-2 pr-3 font-medium whitespace-nowrap">${ssrInterpolate(c.label)}</td><td class="py-2 pr-3 text-center font-bold tabular-nums text-primary">${ssrInterpolate(c.max)}</td><td class="py-2 pr-3 text-xs text-slate-custom">${ssrInterpolate(c.desc)}</td><td class="py-2 text-xs text-slate-custom/80">${ssrInterpolate(c.why)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div></div><div class="card p-5"><h3 class="mb-3 font-semibold text-ink">Glosario de \xEDndices t\xE9cnicos</h3><p class="mb-3 text-sm text-slate-custom">Cada columna de la tabla de resultados corresponde a un \xEDndice calculado. Hover sobre el encabezado de columna para ver descripci\xF3n r\xE1pida.</p><dl class="divide-y divide-gray-100"><!--[-->`);
          ssrRenderList(columns, (col) => {
            _push(`<div class="py-2.5 sm:grid sm:grid-cols-[140px_1fr] sm:gap-3"><dt class="text-sm font-semibold text-ink">${ssrInterpolate(col.label)}</dt><dd class="mt-0.5 text-sm text-slate-custom sm:mt-0">${ssrInterpolate(col.tip)}</dd></div>`);
          });
          _push(`<!--]--></dl></div><div class="card p-5"><h3 class="mb-3 font-semibold text-ink">Pipeline de detecci\xF3n</h3><ol class="space-y-2"><li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</span><span class="text-slate-custom"><strong class="text-ink">Overpass API</strong> \u2014 Consulta edificios significativos (nombrados, comerciales, p\xFAblicos, con niveles) en el bounding box. Solo pol\xEDgonos (ways) con tag <code>building=*</code>.</span></li><li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">2</span><span class="text-slate-custom"><strong class="text-ink">Turf.js</strong> \u2014 Calcula \xE1rea (m\xB2), per\xEDmetro, centroide, bounding box, rectangularidad y compacidad Polsby-Popper por edificio.</span></li><li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span><span class="text-slate-custom"><strong class="text-ink">Scoring</strong> \u2014 Aplica 6 criterios ponderados. Estima NDVI potencial, carga estructural, zona s\xEDsmica, reducci\xF3n CO\u2082 y captaci\xF3n pluvial.</span></li><li class="flex gap-3 text-sm"><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">4</span><span class="text-slate-custom"><strong class="text-ink">Ranking</strong> \u2014 Ordena por score, retorna max 200 candidatos. Admin filtra, selecciona y envia a cola de prospectos.</span></li></ol></div><div class="card p-5"><div class="grid gap-5 md:grid-cols-2"><div><h3 class="mb-2 font-semibold text-ink">Fuentes de datos</h3><ul class="space-y-1 text-sm text-slate-custom"><li><strong>OpenStreetMap</strong> \u2014 Huellas de edificios, tipo, niveles, material techo. Licencia ODbL. Datos colaborativos, cobertura variable.</li><li><strong>Turf.js v7</strong> \u2014 Librer\xEDa JS de an\xE1lisis geoespacial. MIT License.</li><li><strong>NTC-CDMX 2017</strong> \u2014 Normas T\xE9cnicas Complementarias, Cap. 6. Carga m\xEDn TVLE: 100 kg/m\xB2.</li><li><strong>Cervantes N\xE1jera (2021)</strong> \u2014 Tesis maestr\xEDa CIIEMAD-IPN. CO\u2082: 0.968 kg/m\xB2/a\xF1o.</li><li><strong>Cervantes N\xE1jera (2025)</strong> \u2014 Tesis doctoral CIIEMAD-IPN. Captaci\xF3n: 19.5 L/m\xB2/a\xF1o.</li><li><strong>Atlas de Riesgos CDMX</strong> \u2014 SGIRPC. Zonificaci\xF3n s\xEDsmica simplificada.</li></ul></div><div><h3 class="mb-2 font-semibold text-ink">Limitaciones</h3><ul class="space-y-1 text-sm text-slate-custom"><li>No utiliza im\xE1genes satelitales. NDVI potencial es un <strong>proxy morfol\xF3gico</strong>, no \xEDndice espectral real.</li><li>Datos OSM pueden ser incompletos (edificios sin nombre, sin niveles, sin material de techo).</li><li>Zona s\xEDsmica es aproximaci\xF3n por latitud, no consulta al mapa de microzonificaci\xF3n real.</li><li>Carga estructural requiere <strong>dictamen de ingeniero estructurista</strong> para validaci\xF3n.</li><li>Bbox limitado a ~5\xD75 km por restricciones de Overpass API p\xFAblica.</li><li>Costo: <strong>$0</strong> \u2014 OSM y Overpass son gratuitos. Para NDVI real se requiere Google Earth Engine (tambi\xE9n gratuito con cuenta).</li></ul></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(detectorPhase) === "results") {
        _push(`<div><div class="mb-3 flex flex-wrap items-center gap-2"><span class="text-sm text-slate-custom">${ssrInterpolate(unref(filtered).length)} de ${ssrInterpolate(unref(allResults).length)} resultados</span>`);
        if (unref(selected).size) {
          _push(`<span class="text-sm font-medium text-primary">| ${ssrInterpolate(unref(selected).size)} seleccionados</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="w-full sm:ml-auto sm:w-auto flex flex-wrap gap-2"><button class="btn-outline text-xs">${ssrInterpolate(unref(showFilters) ? "Ocultar" : "Mostrar")} filtros</button><button class="btn-outline text-xs">Sel. p\xE1gina</button><button class="btn-eco text-xs"${ssrIncludeBooleanAttr(!unref(selected).size || unref(submitting)) ? " disabled" : ""}>${ssrInterpolate(unref(submitting) ? "..." : `Enviar ${unref(selected).size} a prospectos`)}</button></div></div>`);
        if (unref(showFilters)) {
          _push(`<div class="card mb-4 p-4"><div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"><div><label class="mb-1 block text-xs text-slate-custom">Buscar</label><input${ssrRenderAttr("value", unref(detectorFilters).search)} class="input w-full text-sm" placeholder="Nombre o ref..."></div><div><label class="mb-1 block text-xs text-slate-custom">Tipo edificio</label><select class="select w-full text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).tipoEdificio) ? ssrLooseContain(unref(detectorFilters).tipoEdificio, "") : ssrLooseEqual(unref(detectorFilters).tipoEdificio, "")) ? " selected" : ""}>Todos</option><!--[-->`);
          ssrRenderList(unref(uniqueTipos), (t) => {
            _push(`<option${ssrRenderAttr("value", t)}${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).tipoEdificio) ? ssrLooseContain(unref(detectorFilters).tipoEdificio, t) : ssrLooseEqual(unref(detectorFilters).tipoEdificio, t)) ? " selected" : ""}>${ssrInterpolate(t)}</option>`);
          });
          _push(`<!--]--></select></div><div><label class="mb-1 block text-xs text-slate-custom">Score m\xEDn</label><input${ssrRenderAttr("value", unref(detectorFilters).scoreMin)} class="input w-full text-sm" type="number" min="0" max="100"></div><div><label class="mb-1 block text-xs text-slate-custom">NDVI pot. m\xEDn</label><input${ssrRenderAttr("value", unref(detectorFilters).ndviMin)} class="input w-full text-sm" type="number" min="0" max="1" step="0.1"></div><div><label class="mb-1 block text-xs text-slate-custom">Carga estruct.</label><select class="select w-full text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).carga) ? ssrLooseContain(unref(detectorFilters).carga, "") : ssrLooseEqual(unref(detectorFilters).carga, "")) ? " selected" : ""}>Todas</option><option value="apta"${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).carga) ? ssrLooseContain(unref(detectorFilters).carga, "apta") : ssrLooseEqual(unref(detectorFilters).carga, "apta")) ? " selected" : ""}>Apta</option><option value="requiere_evaluacion"${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).carga) ? ssrLooseContain(unref(detectorFilters).carga, "requiere_evaluacion") : ssrLooseEqual(unref(detectorFilters).carga, "requiere_evaluacion")) ? " selected" : ""}>Req. eval.</option><option value="no_recomendado"${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).carga) ? ssrLooseContain(unref(detectorFilters).carga, "no_recomendado") : ssrLooseEqual(unref(detectorFilters).carga, "no_recomendado")) ? " selected" : ""}>No recom.</option><option value="sin_datos"${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).carga) ? ssrLooseContain(unref(detectorFilters).carga, "sin_datos") : ssrLooseEqual(unref(detectorFilters).carga, "sin_datos")) ? " selected" : ""}>Sin datos</option></select></div><div><label class="mb-1 block text-xs text-slate-custom">Zona s\xEDsmica</label><select class="select w-full text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).zonaSismica) ? ssrLooseContain(unref(detectorFilters).zonaSismica, "") : ssrLooseEqual(unref(detectorFilters).zonaSismica, "")) ? " selected" : ""}>Todas</option><!--[-->`);
          ssrRenderList(unref(uniqueZonas), (z) => {
            _push(`<option${ssrRenderAttr("value", z)}${ssrIncludeBooleanAttr(Array.isArray(unref(detectorFilters).zonaSismica) ? ssrLooseContain(unref(detectorFilters).zonaSismica, z) : ssrLooseEqual(unref(detectorFilters).zonaSismica, z)) ? " selected" : ""}>${ssrInterpolate(z)}</option>`);
          });
          _push(`<!--]--></select></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-lg border border-gray-200"><table class="w-full min-w-[1200px] text-sm"><thead class="bg-gray-50 text-xs uppercase text-gray-500"><tr><th class="w-10 px-3 py-2"><input type="checkbox"></th><th class="w-8 px-1 py-2"></th><!--[-->`);
        ssrRenderList(columns, (col) => {
          _push(`<th class="${ssrRenderClass([col.align === "right" ? "text-right" : "text-left", "cursor-pointer select-none px-3 py-2"])}"${ssrRenderAttr("title", col.tip)}><span class="border-b border-dashed border-gray-400">${ssrInterpolate(col.label)}</span><span class="ml-0.5 text-gray-400">${ssrInterpolate(sortIcon(col.key))}</span></th>`);
        });
        _push(`<!--]--></tr></thead><tbody class="divide-y divide-gray-100">`);
        if (unref(paginated).length === 0) {
          _push(`<tr><td${ssrRenderAttr("colspan", columns.length + 2)} class="px-4 py-8 text-center text-gray-400">Sin resultados</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(paginated), (r) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
          _push(`<!--[--><tr class="${ssrRenderClass([unref(selected).has(unref(allResults).indexOf(r)) ? "bg-primary-50/40" : "", "cursor-pointer transition-colors hover:bg-gray-50"])}"><td class="px-3 py-2"><input type="checkbox"${ssrIncludeBooleanAttr(unref(selected).has(unref(allResults).indexOf(r))) ? " checked" : ""}></td><td class="px-1 py-2"><button class="rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-ink" title="Ver desglose del score y datos t\xE9cnicos"><svg class="${ssrRenderClass([unref(expandedRow) === unref(allResults).indexOf(r) ? "rotate-90" : "", "h-4 w-4 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></button></td><td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-slate-custom">${ssrInterpolate((_a = r.indices) == null ? void 0 : _a.refId)}</td><td class="max-w-[180px] truncate px-3 py-2 font-medium text-ink"${ssrRenderAttr("title", r.nombre)}>${ssrInterpolate(r.nombre)}</td><td class="whitespace-nowrap px-3 py-2 text-xs">${ssrInterpolate(r.tipo)}</td><td class="px-3 py-2 text-right"><span class="${ssrRenderClass(["rounded-full px-2 py-0.5 text-xs font-bold", scoreClass(r.score)])}">${ssrInterpolate(r.score)}</span></td><td class="whitespace-nowrap px-3 py-2 text-right tabular-nums">${ssrInterpolate((_b = r.areaM2) == null ? void 0 : _b.toLocaleString("es-MX"))}</td><td class="px-3 py-2 text-right tabular-nums">${ssrInterpolate((_d = (_c = r.indices) == null ? void 0 : _c.ndviPotencial) == null ? void 0 : _d.toFixed(2))}</td><td class="px-3 py-2 text-right tabular-nums">${ssrInterpolate((_f = ((_e = r.indices) == null ? void 0 : _e.rectangularidad) * 100) == null ? void 0 : _f.toFixed(0))}%</td><td class="px-3 py-2 text-right tabular-nums">${ssrInterpolate((_h = ((_g = r.indices) == null ? void 0 : _g.compacidad) * 100) == null ? void 0 : _h.toFixed(0))}%</td><td class="px-3 py-2"><span class="${ssrRenderClass(["whitespace-nowrap rounded px-1.5 py-0.5 text-xs", cargaClass((_i = r.indices) == null ? void 0 : _i.cargaEstimada)])}">${ssrInterpolate((_k = (_j = r.indices) == null ? void 0 : _j.cargaEstimada) == null ? void 0 : _k.replace(/_/g, " "))}</span></td><td class="px-3 py-2 text-xs">${ssrInterpolate((_l = r.indices) == null ? void 0 : _l.zonaSismica)}</td><td class="px-3 py-2 text-right tabular-nums">${ssrInterpolate((_m = r.indices) == null ? void 0 : _m.reduccionCO2)}</td><td class="whitespace-nowrap px-3 py-2 text-right tabular-nums">${ssrInterpolate((_o = (_n = r.indices) == null ? void 0 : _n.captacionPluvial) == null ? void 0 : _o.toLocaleString("es-MX"))}</td><td class="px-3 py-2 text-right tabular-nums">${ssrInterpolate(((_p = r.indices) == null ? void 0 : _p.niveles) || "\u2014")}</td></tr>`);
          if (unref(expandedRow) === unref(allResults).indexOf(r)) {
            _push(`<tr><td${ssrRenderAttr("colspan", columns.length + 2)} class="border-l-4 border-l-primary bg-gray-50 px-5 py-4"><div class="grid gap-5 lg:grid-cols-2"><div><h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Desglose del Score: ${ssrInterpolate(r.score)}/100</h4><div class="space-y-2"><!--[-->`);
            ssrRenderList(scoreComponents, (comp) => {
              _push(`<div><div class="flex items-center gap-2"><span class="w-20 flex-shrink-0 text-xs font-medium text-ink sm:w-28">${ssrInterpolate(comp.label)}</span><div class="h-4 flex-1 overflow-hidden rounded-full bg-gray-200"><div class="${ssrRenderClass([estimateComponentScore(r, comp.key) >= comp.max * 0.7 ? "bg-green-500" : estimateComponentScore(r, comp.key) > 0 ? "bg-yellow-500" : "bg-gray-300", "flex h-full items-center rounded-full pl-1 text-[10px] font-bold text-white transition-all"])}" style="${ssrRenderStyle({ width: barWidth(Math.max(estimateComponentScore(r, comp.key), 1), comp.max) })}">${ssrInterpolate(estimateComponentScore(r, comp.key) > 0 ? estimateComponentScore(r, comp.key) : "")}</div></div><span class="w-10 flex-shrink-0 text-right text-xs tabular-nums text-slate-custom">/${ssrInterpolate(comp.max)}</span></div><p class="ml-0 text-[11px] text-gray-400 sm:ml-[7.5rem]">${ssrInterpolate(comp.desc)}</p></div>`);
            });
            _push(`<!--]--></div></div><div><h4 class="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Datos t\xE9cnicos completos</h4><dl class="grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-2"><dt class="text-slate-custom">Ref OSM</dt><dd class="font-mono font-medium">${ssrInterpolate((_q = r.indices) == null ? void 0 : _q.refId)}</dd><dt class="text-slate-custom">Per\xEDmetro</dt><dd class="font-medium tabular-nums">${ssrInterpolate((_s = (_r = r.indices) == null ? void 0 : _r.perimetroM) == null ? void 0 : _s.toLocaleString("es-MX"))} m</dd><dt class="text-slate-custom">Orientaci\xF3n</dt><dd class="font-medium tabular-nums">${ssrInterpolate((_u = (_t = r.indices) == null ? void 0 : _t.orientacion) == null ? void 0 : _u.toFixed(0))}\xB0</dd><dt class="text-slate-custom">Isla de calor</dt><dd class="font-medium tabular-nums">${ssrInterpolate((_w = ((_v = r.indices) == null ? void 0 : _v.islaTerApprox) * 100) == null ? void 0 : _w.toFixed(2))}% del ref. 79,584 m\xB2</dd><dt class="text-slate-custom">Material techo</dt><dd class="font-medium">${ssrInterpolate((_x = r.indices) == null ? void 0 : _x.materialTecho)}</dd><dt class="text-slate-custom">Coordenadas</dt><dd class="font-medium tabular-nums">${ssrInterpolate((_y = r.lat) == null ? void 0 : _y.toFixed(6))}, ${ssrInterpolate((_z = r.lng) == null ? void 0 : _z.toFixed(6))}</dd></dl>`);
            if ((_A = r.reasons) == null ? void 0 : _A.length) {
              _push(`<div class="mt-3"><h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">Razones del puntaje</h4><ul class="list-inside list-disc space-y-0.5 text-xs text-slate-custom"><!--[-->`);
              ssrRenderList(r.reasons, (reason, ri) => {
                _push(`<li>${ssrInterpolate(reason)}</li>`);
              });
              _push(`<!--]--></ul></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></tbody></table></div><div class="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-custom"><div class="flex items-center gap-2"><span>Filas:</span><select class="select text-sm"><option${ssrRenderAttr("value", 10)}${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 10) : ssrLooseEqual(unref(perPage), 10)) ? " selected" : ""}>10</option><option${ssrRenderAttr("value", 25)}${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 25) : ssrLooseEqual(unref(perPage), 25)) ? " selected" : ""}>25</option><option${ssrRenderAttr("value", 50)}${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 50) : ssrLooseEqual(unref(perPage), 50)) ? " selected" : ""}>50</option><option${ssrRenderAttr("value", 100)}${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 100) : ssrLooseEqual(unref(perPage), 100)) ? " selected" : ""}>100</option></select></div><div class="flex items-center gap-1"><button class="rounded px-2 py-1 hover:bg-gray-100 disabled:opacity-30"${ssrIncludeBooleanAttr(unref(detectorPage) <= 1) ? " disabled" : ""}>\xAB</button><span class="tabular-nums">${ssrInterpolate(unref(detectorPage))} / ${ssrInterpolate(unref(totalPages))}</span><button class="rounded px-2 py-1 hover:bg-gray-100 disabled:opacity-30"${ssrIncludeBooleanAttr(unref(detectorPage) >= unref(totalPages)) ? " disabled" : ""}>\xBB</button></div></div><div class="mt-6"><button class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-3 text-left text-sm font-semibold text-ink hover:bg-gray-50"> Justificaci\xF3n y metodolog\xEDa <svg class="${ssrRenderClass([unref(showMethodology) ? "rotate-180" : "", "h-5 w-5 text-gray-400 transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>`);
        if (unref(showMethodology)) {
          _push(`<div class="card mt-2 space-y-4 p-5 text-sm"><div><h4 class="mb-2 font-semibold text-ink">Composici\xF3n del score</h4><table class="w-full text-xs"><thead><tr class="border-b text-left text-gray-500"><th class="py-1.5 pr-3">Factor</th><th class="py-1.5 pr-3 text-center">M\xE1x</th><th class="py-1.5 pr-3">Criterio</th><th class="py-1.5">Justificaci\xF3n</th></tr></thead><tbody><!--[-->`);
          ssrRenderList(scoreComponents, (c) => {
            _push(`<tr class="border-b border-gray-100"><td class="py-1.5 pr-3 font-medium whitespace-nowrap">${ssrInterpolate(c.label)}</td><td class="py-1.5 pr-3 text-center font-bold tabular-nums">${ssrInterpolate(c.max)}</td><td class="py-1.5 pr-3 text-slate-custom">${ssrInterpolate(c.desc)}</td><td class="py-1.5 text-slate-custom/80">${ssrInterpolate(c.why)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div><div><h4 class="mb-2 font-semibold text-ink">Glosario de columnas</h4><dl class="divide-y divide-gray-100 text-xs"><!--[-->`);
          ssrRenderList(columns, (col) => {
            _push(`<div class="py-2 sm:grid sm:grid-cols-[120px_1fr] sm:gap-3"><dt class="font-semibold text-ink">${ssrInterpolate(col.label)}</dt><dd class="mt-0.5 text-slate-custom sm:mt-0">${ssrInterpolate(col.tip)}</dd></div>`);
          });
          _push(`<!--]--></dl></div><div><h4 class="mb-1 font-semibold text-ink">Fuentes</h4><ul class="list-inside list-disc text-xs text-slate-custom"><li>OpenStreetMap (Overpass API) \u2014 ODbL</li><li>Turf.js v7 \u2014 MIT</li><li>NTC-CDMX 2017 \u2014 carga m\xEDn TVLE: 100 kg/m\xB2</li><li>Cervantes N\xE1jera (2021, 2025) \u2014 CIIEMAD-IPN</li><li>Atlas de Riesgos CDMX \u2014 SGIRPC</li></ul></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(rejectingId)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"><div class="card w-full max-w-md p-6 shadow-panel animate-scale-in"><h3 class="mb-3 text-lg font-semibold text-ink">Rechazar prospecto #${ssrInterpolate(unref(rejectingId))}</h3><label class="mb-1 block text-sm font-medium text-ink">Motivo del rechazo</label><textarea class="input w-full" rows="3" placeholder="Describe el motivo...">${ssrInterpolate(unref(rejectNotes))}</textarea><div class="mt-4 flex justify-end gap-3"><button class="btn-ghost">Cancelar</button><button class="btn-primary !bg-red-600 hover:!bg-red-700"${ssrIncludeBooleanAttr(!unref(rejectNotes)) ? " disabled" : ""}> Confirmar rechazo </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/prospectos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-PpiMjfnL.mjs.map
