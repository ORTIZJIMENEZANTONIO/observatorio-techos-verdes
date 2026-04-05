import { _ as _sfc_main$2 } from './SectionTitle-Di4BE9k7.mjs';
import { _ as _sfc_main$3 } from './DataDisclaimer-Bsqs480u.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { u as useValidationStore } from './validation-Bc71ZNpI.mjs';
import { _ as _sfc_main$4 } from './DataSourceBadge-Dtt3IyCj.mjs';
import { _ as _sfc_main$5 } from './PaginationControls-BAcytpD9.mjs';
import { u as useFormatters } from './useFormatters-BCDq8oux.mjs';
import { u as useHead } from './server.mjs';
import './useDataSource-CcCLLLin.mjs';
import 'pinia';
import './mock-source-DMDe05Bu.mjs';
import './mock-roofs-D-tdE7ed.mjs';
import './mock-candidates-Cvvvd8Mv.mjs';
import './mock-validations-qSEi_ZEz.mjs';
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
import 'vue-router';

function useVisionAI() {
  const analyzing = ref(false);
  const lastResult = ref(null);
  const error = ref(null);
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  async function analyzeRoof(options) {
    var _a;
    analyzing.value = true;
    error.value = null;
    lastResult.value = null;
    try {
      const response = await $fetch("/api/ai/analyze-roof", {
        method: "POST",
        body: {
          imageBase64: options.imageBase64,
          mimeType: options.mimeType || "image/jpeg",
          buildingName: options.buildingName,
          buildingType: options.buildingType,
          alcaldia: options.alcaldia,
          superficie: options.superficie
        }
      });
      if (response.ok && response.analysis) {
        lastResult.value = response.analysis;
        return response.analysis;
      } else {
        error.value = response.error || "Error desconocido en el an\xE1lisis.";
        return null;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error de conexi\xF3n con el servidor.";
      if (typeof e === "object" && e !== null && "data" in e) {
        const nitroErr = e;
        error.value = ((_a = nitroErr.data) == null ? void 0 : _a.statusMessage) || msg;
      } else {
        error.value = msg;
      }
      return null;
    } finally {
      analyzing.value = false;
    }
  }
  async function analyzeFromFile(file, context) {
    const base64 = await fileToBase64(file);
    return analyzeRoof({
      imageBase64: base64,
      mimeType: file.type || "image/jpeg",
      ...context
    });
  }
  return {
    analyzing,
    lastResult,
    error,
    analyzeRoof,
    analyzeFromFile,
    fileToBase64
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AIAnalysisPanel",
  __ssrInlineRender: true,
  setup(__props) {
    const { analyzing, lastResult, error } = useVisionAI();
    useValidationStore();
    ref(null);
    ref(null);
    const previewUrl = ref(null);
    const isDragging = ref(false);
    const buildingName = ref("");
    const buildingType = ref("");
    const alcaldia = ref("");
    const superficie = ref(void 0);
    const addedToTable = ref(false);
    const addedRecordId = ref(null);
    const alcaldias = [
      "\xC1lvaro Obreg\xF3n",
      "Azcapotzalco",
      "Benito Ju\xE1rez",
      "Coyoac\xE1n",
      "Cuajimalpa",
      "Cuauht\xE9moc",
      "Gustavo A. Madero",
      "Iztacalco",
      "Iztapalapa",
      "Magdalena Contreras",
      "Miguel Hidalgo",
      "Milpa Alta",
      "Tl\xE1huac",
      "Tlalpan",
      "Venustiano Carranza",
      "Xochimilco"
    ];
    const confianzaBadge = computed(() => {
      if (!lastResult.value) return "";
      const map = {
        alta: "bg-eco/10 text-eco-dark",
        media: "bg-accent/10 text-accent-dark",
        baja: "bg-alert/10 text-alert"
      };
      return map[lastResult.value.confianza] || "";
    });
    const scoreColor = computed(() => {
      if (!lastResult.value) return "text-ink";
      const s = lastResult.value.aptitudTechoVerde;
      if (s >= 70) return "text-eco";
      if (s >= 40) return "text-accent";
      return "text-alert";
    });
    const scoreBarColor = computed(() => {
      if (!lastResult.value) return "bg-gray-300";
      const s = lastResult.value.aptitudTechoVerde;
      if (s >= 70) return "bg-eco";
      if (s >= 40) return "bg-accent";
      return "bg-alert";
    });
    function formatMaterial(m) {
      const map = {
        losa_concreto: "Losa de concreto",
        losacero: "Losacero",
        vigueta_bovedilla: "Vigueta y bovedilla",
        lamina_metalica: "Lamina metalica",
        lamina_asbesto: "Lamina de asbesto",
        madera_teja: "Madera/teja",
        desconocido: "No determinado"
      };
      return map[m] || m;
    }
    function formatTipo(t) {
      const map = {
        extensivo: "Extensivo (TVLE)",
        "semi-intensivo": "Semi-intensivo",
        intensivo: "Intensivo",
        no_apto: "No apto"
      };
      return map[t] || t;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card overflow-hidden" }, _attrs))}><div class="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-secondary/5 to-eco/5 px-6 py-4"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg></div><div><h3 class="text-base font-semibold text-ink">Analizar imagen con IA</h3><p class="text-xs text-slate-custom">Gemini Vision evalua la aptitud del techo para TVLE</p></div></div><div class="p-6">`);
      if (!unref(previewUrl)) {
        _push(`<div class="${ssrRenderClass([{ "border-secondary bg-secondary/5": unref(isDragging) }, "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 transition-colors hover:border-secondary/40 hover:bg-secondary/5"])}"><svg xmlns="http://www.w3.org/2000/svg" class="mb-3 h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-sm font-medium text-ink">Arrastra una imagen o haz clic para seleccionar</p><p class="mt-1 text-xs text-slate-custom">JPG, PNG o WebP \u2014 imagen aerea, satelital o foto de azotea</p><input type="file" accept="image/jpeg,image/png,image/webp" class="hidden"></div>`);
      } else {
        _push(`<div class="space-y-4"><div class="relative overflow-hidden rounded-xl border border-gray-100"><img${ssrRenderAttr("src", unref(previewUrl))} alt="Imagen a analizar" class="h-48 w-full object-cover"><button class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors" title="Quitar imagen"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-xs font-medium text-slate-custom">Nombre del edificio</label><input${ssrRenderAttr("value", unref(buildingName))} type="text" class="input" placeholder="Ej. Hospital General de Mexico"></div><div><label class="mb-1 block text-xs font-medium text-slate-custom">Tipo de edificio</label><select class="select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "") : ssrLooseEqual(unref(buildingType), "")) ? " selected" : ""}>Seleccionar...</option><option value="hospital"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "hospital") : ssrLooseEqual(unref(buildingType), "hospital")) ? " selected" : ""}>Hospital</option><option value="mercado"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "mercado") : ssrLooseEqual(unref(buildingType), "mercado")) ? " selected" : ""}>Mercado</option><option value="oficinas"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "oficinas") : ssrLooseEqual(unref(buildingType), "oficinas")) ? " selected" : ""}>Oficinas</option><option value="educativo"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "educativo") : ssrLooseEqual(unref(buildingType), "educativo")) ? " selected" : ""}>Educativo</option><option value="gobierno"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "gobierno") : ssrLooseEqual(unref(buildingType), "gobierno")) ? " selected" : ""}>Gobierno</option><option value="residencial"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "residencial") : ssrLooseEqual(unref(buildingType), "residencial")) ? " selected" : ""}>Residencial</option><option value="industrial"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "industrial") : ssrLooseEqual(unref(buildingType), "industrial")) ? " selected" : ""}>Industrial</option><option value="comercial"${ssrIncludeBooleanAttr(Array.isArray(unref(buildingType)) ? ssrLooseContain(unref(buildingType), "comercial") : ssrLooseEqual(unref(buildingType), "comercial")) ? " selected" : ""}>Comercial</option></select></div><div><label class="mb-1 block text-xs font-medium text-slate-custom">Alcaldia</label><select class="select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(alcaldia)) ? ssrLooseContain(unref(alcaldia), "") : ssrLooseEqual(unref(alcaldia), "")) ? " selected" : ""}>Seleccionar...</option><!--[-->`);
        ssrRenderList(alcaldias, (a) => {
          _push(`<option${ssrRenderAttr("value", a)}${ssrIncludeBooleanAttr(Array.isArray(unref(alcaldia)) ? ssrLooseContain(unref(alcaldia), a) : ssrLooseEqual(unref(alcaldia), a)) ? " selected" : ""}>${ssrInterpolate(a)}</option>`);
        });
        _push(`<!--]--></select></div><div><label class="mb-1 block text-xs font-medium text-slate-custom">Superficie aprox. (m\xB2)</label><input${ssrRenderAttr("value", unref(superficie))} type="number" class="input" placeholder="500" min="0"></div></div><button class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(analyzing)) ? " disabled" : ""}>`);
        if (unref(analyzing)) {
          _push(`<span class="flex items-center justify-center gap-2"><svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75"></path></svg> Analizando con Gemini Vision... </span>`);
        } else {
          _push(`<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg> Analizar con IA </span>`);
        }
        _push(`</button></div>`);
      }
      if (unref(error)) {
        _push(`<div class="mt-4 rounded-lg border border-alert/20 bg-alert/5 p-4"><p class="text-sm font-medium text-alert">Error en el analisis</p><p class="mt-1 text-xs text-alert/80">${ssrInterpolate(unref(error))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(lastResult)) {
        _push(`<div class="mt-6 space-y-4"><div class="flex items-center gap-2"><div class="h-1 w-1 rounded-full bg-eco"></div><h4 class="text-sm font-semibold text-ink">Resultado del analisis</h4><span class="${ssrRenderClass(["badge ml-auto", unref(confianzaBadge)])}">${ssrInterpolate(unref(lastResult).confianza.charAt(0).toUpperCase() + unref(lastResult).confianza.slice(1))} (${ssrInterpolate(unref(lastResult).porcentajeConfianza)}%) </span></div><div><div class="flex items-end justify-between"><span class="text-xs font-medium text-slate-custom">Aptitud para techo verde</span><span class="${ssrRenderClass([unref(scoreColor), "text-lg font-bold"])}">${ssrInterpolate(unref(lastResult).aptitudTechoVerde)}</span></div><div class="mt-1 h-2.5 overflow-hidden rounded-full bg-gray-100"><div class="${ssrRenderClass([unref(scoreBarColor), "h-full rounded-full transition-all duration-700"])}" style="${ssrRenderStyle({ width: `${unref(lastResult).aptitudTechoVerde}%` })}"></div></div></div><div class="grid grid-cols-2 gap-3"><div class="rounded-lg bg-gray-50 p-3"><p class="text-xs text-slate-custom">Techo plano</p><p class="${ssrRenderClass([unref(lastResult).techoPlano ? "text-eco" : "text-alert", "mt-0.5 text-sm font-semibold"])}">${ssrInterpolate(unref(lastResult).techoPlano ? "Si" : "No")}</p></div><div class="rounded-lg bg-gray-50 p-3"><p class="text-xs text-slate-custom">Material estimado</p><p class="mt-0.5 text-sm font-semibold text-ink">${ssrInterpolate(formatMaterial(unref(lastResult).materialEstimado))}</p></div><div class="rounded-lg bg-gray-50 p-3"><p class="text-xs text-slate-custom">Vegetacion existente</p><p class="${ssrRenderClass([unref(lastResult).vegetacionExistente ? "text-eco" : "text-slate-custom", "mt-0.5 text-sm font-semibold"])}">${ssrInterpolate(unref(lastResult).vegetacionExistente ? `Si (${unref(lastResult).porcentajeVegetacion}%)` : "No detectada")}</p></div><div class="rounded-lg bg-gray-50 p-3"><p class="text-xs text-slate-custom">Area util estimada</p><p class="mt-0.5 text-sm font-semibold text-ink">${ssrInterpolate(unref(lastResult).areaUtilEstimadaPct)}%</p></div><div class="rounded-lg bg-gray-50 p-3"><p class="text-xs text-slate-custom">Tipo recomendado</p><p class="mt-0.5 text-sm font-semibold text-secondary">${ssrInterpolate(formatTipo(unref(lastResult).tipoRecomendado))}</p></div>`);
        if (unref(lastResult).obstrucciones.length > 0) {
          _push(`<div class="rounded-lg bg-gray-50 p-3"><p class="text-xs text-slate-custom">Obstrucciones</p><p class="mt-0.5 text-sm font-medium text-accent">${ssrInterpolate(unref(lastResult).obstrucciones.join(", "))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="rounded-lg border border-eco/20 bg-eco/5 p-4"><p class="text-sm leading-relaxed text-ink">${ssrInterpolate(unref(lastResult).prediccion)}</p></div>`);
        if (unref(lastResult).observaciones.length > 0) {
          _push(`<div><p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">Observaciones</p><ul class="space-y-1"><!--[-->`);
          ssrRenderList(unref(lastResult).observaciones, (obs, i) => {
            _push(`<li class="flex items-start gap-2 text-sm text-slate-custom"><span class="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/40"></span> ${ssrInterpolate(obs)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="btn-eco w-full"> Agregar a tabla de validacion (pendiente de revision humana) </button>`);
        if (unref(addedToTable)) {
          _push(`<p class="text-center text-xs text-eco"> Registro #${ssrInterpolate(unref(addedRecordId))} agregado a la tabla de validacion. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/validation/AIAnalysisPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const perPage = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatConfianza, formatEstadoValidacion, confianzaBadgeClass, estadoValidacionBadgeClass: estadoBadgeClass } = useFormatters();
    const validationStore = useValidationStore();
    useHead({
      title: "Validaci\xF3n IA | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Sistema de validaci\xF3n asistida por inteligencia artificial para detecci\xF3n de techos verdes en la Ciudad de M\xE9xico." }
      ]
    });
    const filterConfianza = ref("");
    const filterEstado = ref("");
    const currentPage = ref(1);
    const filteredRecords = computed(() => {
      return validationStore.records.filter((r) => {
        if (filterConfianza.value && r.confianza !== filterConfianza.value) return false;
        if (filterEstado.value && r.estado !== filterEstado.value) return false;
        return true;
      });
    });
    const totalPages = computed(() => Math.ceil(filteredRecords.value.length / perPage) || 1);
    const paginatedRecords = computed(() => filteredRecords.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));
    watch([filterConfianza, filterEstado], () => {
      currentPage.value = 1;
    });
    const stats = computed(() => {
      const records = validationStore.records;
      return {
        pendientes: records.filter((r) => r.estado === "pendiente").length,
        confirmados: records.filter((r) => r.estado === "confirmado").length,
        rechazados: records.filter((r) => r.estado === "rechazado").length,
        indeterminados: records.filter((r) => r.estado === "indeterminado").length,
        pendientesConciliacion: records.filter((r) => r.estado === "pendiente_conciliacion").length
      };
    });
    function formatOrigen(origen) {
      const map = {
        satelital: "Satelital",
        catastral: "Catastral",
        reporte_ciudadano: "Reporte ciudadano",
        ia_automatica: "IA autom\xE1tica"
      };
      return map[origen] || origen;
    }
    function origenBadgeClass(origen) {
      const map = {
        satelital: "bg-secondary/10 text-secondary-dark",
        catastral: "bg-primary-50 text-primary",
        reporte_ciudadano: "bg-accent/10 text-accent-dark",
        ia_automatica: "bg-eco/10 text-eco-dark"
      };
      return map[origen] || "bg-gray-100 text-ink-muted";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonSectionTitle = _sfc_main$2;
      const _component_CommonDataDisclaimer = _sfc_main$3;
      const _component_ValidationAIAnalysisPanel = _sfc_main$1;
      const _component_CommonDataSourceBadge = _sfc_main$4;
      const _component_CommonPaginationControls = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))}><section class="bg-white py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Validaci\xF3n Asistida por IA",
        subtitle: "Revisi\xF3n y validaci\xF3n de detecciones de techos verdes",
        tag: "IA Validaci\xF3n"
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonDataDisclaimer, { class: "mt-6" }, null, _parent));
      _push(`<div class="mt-8">`);
      _push(ssrRenderComponent(_component_ValidationAIAnalysisPanel, null, null, _parent));
      _push(`</div><div class="mt-6 rounded-card border border-secondary/20 bg-secondary/5 p-4"><div class="flex gap-3"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg></div><div><h4 class="text-sm font-semibold text-secondary-dark">Sobre la validaci\xF3n con IA</h4><p class="mt-1 text-sm leading-relaxed text-slate-custom"> La inteligencia artificial apoya la detecci\xF3n visual. Los resultados requieren validaci\xF3n humana y no reemplazan dict\xE1menes t\xE9cnicos. </p></div></div></div><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5"><div class="kpi-card"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div></div><p class="mt-2 text-2xl font-bold text-accent">${ssrInterpolate(unref(stats).pendientes)}</p><p class="text-xs text-slate-custom">Pendientes</p></div><div class="kpi-card"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-eco/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></div></div><p class="mt-2 text-2xl font-bold text-eco">${ssrInterpolate(unref(stats).confirmados)}</p><p class="text-xs text-slate-custom">Confirmados</p></div><div class="kpi-card"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-alert/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div></div><p class="mt-2 text-2xl font-bold text-alert">${ssrInterpolate(unref(stats).rechazados)}</p><p class="text-xs text-slate-custom">Rechazados</p></div><div class="kpi-card"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-custom/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-custom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg></div></div><p class="mt-2 text-2xl font-bold text-slate-custom">${ssrInterpolate(unref(stats).indeterminados)}</p><p class="text-xs text-slate-custom">Indeterminados</p></div><div class="kpi-card"><div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div></div><p class="mt-2 text-2xl font-bold text-secondary">${ssrInterpolate(unref(stats).pendientesConciliacion)}</p><p class="text-xs text-slate-custom">Pend. conciliaci\xF3n</p></div></div><div class="mt-6 flex flex-wrap items-center gap-3"><span class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Filtrar:</span><select class="select !w-auto"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterConfianza)) ? ssrLooseContain(unref(filterConfianza), "") : ssrLooseEqual(unref(filterConfianza), "")) ? " selected" : ""}>Confianza: Todas</option><option value="alta"${ssrIncludeBooleanAttr(Array.isArray(unref(filterConfianza)) ? ssrLooseContain(unref(filterConfianza), "alta") : ssrLooseEqual(unref(filterConfianza), "alta")) ? " selected" : ""}>Alta</option><option value="media"${ssrIncludeBooleanAttr(Array.isArray(unref(filterConfianza)) ? ssrLooseContain(unref(filterConfianza), "media") : ssrLooseEqual(unref(filterConfianza), "media")) ? " selected" : ""}>Media</option><option value="baja"${ssrIncludeBooleanAttr(Array.isArray(unref(filterConfianza)) ? ssrLooseContain(unref(filterConfianza), "baja") : ssrLooseEqual(unref(filterConfianza), "baja")) ? " selected" : ""}>Baja</option></select><select class="select !w-auto"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "") : ssrLooseEqual(unref(filterEstado), "")) ? " selected" : ""}>Estado: Todos</option><option value="pendiente"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "pendiente") : ssrLooseEqual(unref(filterEstado), "pendiente")) ? " selected" : ""}>Pendiente</option><option value="confirmado"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "confirmado") : ssrLooseEqual(unref(filterEstado), "confirmado")) ? " selected" : ""}>Confirmado</option><option value="rechazado"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "rechazado") : ssrLooseEqual(unref(filterEstado), "rechazado")) ? " selected" : ""}>Rechazado</option><option value="indeterminado"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "indeterminado") : ssrLooseEqual(unref(filterEstado), "indeterminado")) ? " selected" : ""}>Indeterminado</option><option value="pendiente_conciliacion"${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "pendiente_conciliacion") : ssrLooseEqual(unref(filterEstado), "pendiente_conciliacion")) ? " selected" : ""}>Pendiente de conciliaci\xF3n</option></select>`);
      if (unref(filterConfianza) || unref(filterEstado)) {
        _push(`<button class="btn-ghost btn-sm"> Limpiar </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="py-12"><div class="container-wide"><div class="table-container"><table class="table-base"><thead><tr><th>ID</th><th>Nombre</th><th>Predicci\xF3n</th><th>Origen</th><th>Confianza</th><th>Estado</th><th>Fuente</th><th>Revisado por</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(paginatedRecords), (record) => {
        _push(`<tr><td class="font-mono text-xs">${ssrInterpolate(record.id)}</td><td><div class="max-w-[200px]"><p class="truncate text-sm font-medium text-ink">${ssrInterpolate(record.nombre)}</p></div></td><td class="text-sm text-slate-custom">${ssrInterpolate(record.prediccion)}</td><td>`);
        if (record.origenDeteccion) {
          _push(`<span class="${ssrRenderClass(["badge", origenBadgeClass(record.origenDeteccion)])}">${ssrInterpolate(formatOrigen(record.origenDeteccion))}</span>`);
        } else {
          _push(`<span class="text-xs text-ink-muted">-</span>`);
        }
        _push(`</td><td><div class="flex items-center gap-2"><span class="${ssrRenderClass([
          "badge",
          unref(confianzaBadgeClass)(record.confianza)
        ])}">${ssrInterpolate(unref(formatConfianza)(record.confianza))}</span><span class="text-xs text-ink-muted">${ssrInterpolate(record.porcentajeConfianza)}%</span></div></td><td><span class="${ssrRenderClass([
          "badge",
          unref(estadoBadgeClass)(record.estado)
        ])}">${ssrInterpolate(unref(formatEstadoValidacion)(record.estado))}</span></td><td>`);
        _push(ssrRenderComponent(_component_CommonDataSourceBadge, {
          "source-name": record._source.sourceName,
          "last-updated": record._source.lastUpdated
        }, null, _parent));
        _push(`</td><td class="text-xs text-slate-custom">${ssrInterpolate(record.revisadoPor || "-")}</td><td>`);
        if (record.estado === "pendiente") {
          _push(`<div class="flex gap-1"><button class="flex h-7 w-7 items-center justify-center rounded-lg bg-eco/10 text-eco hover:bg-eco/20 transition-colors" title="Confirmar"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg></button><button class="flex h-7 w-7 items-center justify-center rounded-lg bg-alert/10 text-alert hover:bg-alert/20 transition-colors" title="Rechazar"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><button class="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-ink-muted hover:bg-gray-200 transition-colors" title="Indeterminado"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button></div>`);
        } else {
          _push(`<span class="text-xs text-ink-muted">${ssrInterpolate(record.fechaRevision || "-")}</span>`);
        }
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-6">`);
      _push(ssrRenderComponent(_component_CommonPaginationControls, {
        "current-page": unref(currentPage),
        "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
        "total-pages": unref(totalPages),
        "total-items": unref(filteredRecords).length,
        "per-page": perPage
      }, null, _parent));
      _push(`</div>`);
      if (unref(filteredRecords).length === 0) {
        _push(`<div class="flex flex-col items-center justify-center py-16 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg></div><h3 class="text-lg font-semibold text-ink">Sin registros</h3><p class="mt-2 text-sm text-slate-custom">No hay registros de validaci\xF3n con los filtros actuales.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ia-validacion/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-maDbInQD.mjs.map
