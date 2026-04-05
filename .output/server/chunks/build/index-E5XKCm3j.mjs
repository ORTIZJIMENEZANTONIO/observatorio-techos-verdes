import { _ as _sfc_main$2 } from './SectionTitle-Di4BE9k7.mjs';
import { u as useHead, a as __nuxt_component_1$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './DataSourceBadge-Dtt3IyCj.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { a as aptitudPesos, b as aptitudPesosOriginal } from './aptitud-pesos-B4e-CPf1.mjs';
import { a as APTITUD_LEVELS } from './constants-CRBjnGpz.mjs';
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
import './useDataSource-CcCLLLin.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OfficialSourcesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const sources = [
      {
        name: "SIGCDMX",
        sourceName: "SIGCDMX",
        description: "Sistema de Informaci\xF3n Geogr\xE1fica de la CDMX. Proporciona capas catastrales, uso de suelo, predios y equipamiento urbano v\xEDa servicios WFS/WMS.",
        format: "GeoJSON / GML",
        protocol: "WFS 2.0",
        url: "sig.cdmx.gob.mx/geoserver/ows",
        color: "#0E5E3A"
      },
      {
        name: "SEDEMA",
        sourceName: "SEDEMA",
        description: "Secretar\xEDa del Medio Ambiente de la CDMX. Inventario de \xE1reas verdes, programas ambientales y registro de azoteas verdes.",
        format: "CSV / JSON",
        protocol: "REST API",
        url: "datos.cdmx.gob.mx",
        color: "#79C141"
      },
      {
        name: "SIMAT",
        sourceName: "SIMAT",
        description: "Sistema de Monitoreo Atmosf\xE9rico. Datos en tiempo real e hist\xF3ricos de calidad del aire de la red de estaciones RAMA.",
        format: "CSV / JSON",
        protocol: "REST API",
        url: "datosabiertos.aire.cdmx.gob.mx",
        color: "#18A5E3"
      },
      {
        name: "Datos Abiertos CDMX",
        sourceName: "DatosAbiertos",
        description: "Portal de datos abiertos del Gobierno de la Ciudad de M\xE9xico. Conjuntos de datos tabulares y geoespaciales de m\xFAltiples dependencias.",
        format: "CSV / GeoJSON / XLSX",
        protocol: "CKAN API",
        url: "datos.cdmx.gob.mx",
        color: "#F2A81D"
      },
      {
        name: "INEGI",
        sourceName: "INEGI",
        description: "Instituto Nacional de Estad\xEDstica y Geograf\xEDa. Datos censales de poblaci\xF3n, vivienda y marco geoestad\xEDstico nacional.",
        format: "CSV / SHP / GeoJSON",
        protocol: "REST API / WFS",
        url: "inegi.org.mx",
        color: "#6366F1"
      },
      {
        name: "Aire CDMX",
        sourceName: "SIMAT",
        description: "Plataforma complementaria del SIMAT con visualizaciones y datos hist\xF3ricos procesados de la red de monitoreo atmosf\xE9rico.",
        format: "JSON / CSV",
        protocol: "REST API",
        url: "aire.cdmx.gob.mx",
        color: "#06B6D4"
      },
      {
        name: "CONABIO",
        sourceName: "CONABIO",
        description: "Comisi\xF3n Nacional para el Conocimiento y Uso de la Biodiversidad. Sistema Nacional de Informaci\xF3n sobre Biodiversidad (SNIB) con registros de especies e \xEDndices bi\xF3ticos.",
        format: "CSV / GeoJSON / SHP",
        protocol: "REST API / WMS",
        url: "snib.mx",
        color: "#059669"
      },
      {
        name: "CONAGUA",
        sourceName: "CONAGUA",
        description: "Comisi\xF3n Nacional del Agua. Servicio Meteorol\xF3gico Nacional (SMN) con datos climatol\xF3gicos, pluviom\xE9tricos y de estaciones de monitoreo hidrol\xF3gico.",
        format: "CSV / JSON / XML",
        protocol: "REST API",
        url: "smn.conagua.gob.mx",
        color: "#0284C7"
      },
      {
        name: "SEMARNAT",
        sourceName: "SEMARNAT",
        description: "Secretar\xEDa de Medio Ambiente y Recursos Naturales. Registros ambientales federales, normatividad y datos de \xE1reas naturales protegidas.",
        format: "CSV / PDF / SHP",
        protocol: "REST API",
        url: "datos.semarnat.gob.mx",
        color: "#7C3AED"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonDataSourceBadge = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="text-xl font-semibold text-ink">Fuentes oficiales de datos</h3><p class="mt-2 text-sm text-slate-custom max-w-3xl"> El observatorio est\xE1 dise\xF1ado para integrar datos de las siguientes fuentes oficiales de la Ciudad de M\xE9xico y de instituciones federales. </p><div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(sources, (source) => {
        _push(`<div class="card p-5"><div class="flex items-start justify-between"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg" style="${ssrRenderStyle({ backgroundColor: source.color + "15" })}"><div class="h-4 w-4 rounded-full" style="${ssrRenderStyle({ backgroundColor: source.color })}"></div></div><div><p class="text-sm font-semibold text-ink">${ssrInterpolate(source.name)}</p>`);
        _push(ssrRenderComponent(_component_CommonDataSourceBadge, {
          "source-name": source.sourceName
        }, null, _parent));
        _push(`</div></div></div><p class="mt-3 text-xs leading-relaxed text-slate-custom">${ssrInterpolate(source.description)}</p><div class="mt-3 space-y-1"><div class="flex items-center gap-2 text-[10px] text-ink-muted"><span class="font-semibold uppercase tracking-wider">Formato:</span><span>${ssrInterpolate(source.format)}</span></div><div class="flex items-center gap-2 text-[10px] text-ink-muted"><span class="font-semibold uppercase tracking-wider">Protocolo:</span><span>${ssrInterpolate(source.protocol)}</span></div><div class="flex items-center gap-2 text-[10px] text-ink-muted"><span class="font-semibold uppercase tracking-wider">URL:</span><span class="truncate">${ssrInterpolate(source.url)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/OfficialSourcesSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Metodolog\xEDa | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Metodolog\xEDa del Observatorio de Techos Verdes CDMX. Modelo multicriterio, variables, pesos, aptitud territorial y fuentes de datos." }
      ]
    });
    const useEnhanced = ref(true);
    const pesos = computed(() => useEnhanced.value ? aptitudPesos : aptitudPesosOriginal);
    const numVariables = computed(() => pesos.value.length);
    const maxWeight = computed(() => Math.max(...pesos.value.map((p) => p.peso)));
    computed(() => pesos.value.map((p) => p.variable.replace(/\s*\(.*\)/, "")));
    computed(() => pesos.value.map((p) => p.peso));
    computed(() => pesos.value.map((p) => p.variable.replace(/\s*\(.*\)/, "")));
    computed(() => [
      {
        label: "Peso (%)",
        data: pesos.value.map((p) => p.peso),
        backgroundColor: pesos.value.map((p) => p.color),
        borderRadius: 4
      }
    ]);
    computed(() => pesos.value.map((p) => p.variable.replace(/\s*\(.*\)/, "")));
    computed(() => pesos.value.map((p) => p.peso));
    computed(() => pesos.value.map((p) => p.color));
    const methodologySteps = [
      {
        number: 1,
        title: "Recopilaci\xF3n de datos geoespaciales",
        description: "Integraci\xF3n de m\xFAltiples fuentes de datos espaciales, incluyendo im\xE1genes satelitales, datos censales y estaciones de monitoreo.",
        details: [
          "Im\xE1genes Landsat y MODIS para temperatura superficial",
          "Datos del INEGI para poblaci\xF3n y \xE1rea urbanizada",
          "Estaciones RAMA para calidad del aire",
          "Coberturas de uso de suelo de SEDEMA"
        ]
      },
      {
        number: 2,
        title: "Construcci\xF3n del \xEDndice de aptitud",
        description: "Normalizaci\xF3n y ponderaci\xF3n de variables en un \xEDndice multicriterio de aptitud territorial.",
        details: [
          "Normalizaci\xF3n 0-100 por variable",
          "Ponderaci\xF3n por Proceso Anal\xEDtico Jer\xE1rquico (AHP)",
          "Validaci\xF3n cruzada con expertos",
          "Clasificaci\xF3n en 5 niveles de aptitud"
        ]
      },
      {
        number: 3,
        title: "Detecci\xF3n y validaci\xF3n con IA",
        description: "Modelos de visi\xF3n por computadora para detectar techos verdes en im\xE1genes a\xE9reas, con validaci\xF3n humana integrada.",
        details: [
          "Redes neuronales convolucionales (CNN)",
          "Im\xE1genes a\xE9reas de alta resoluci\xF3n",
          "Sistema humano-en-el-bucle",
          "Nivel de confianza por predicci\xF3n"
        ]
      },
      {
        number: 4,
        title: "Priorizaci\xF3n territorial",
        description: "Integraci\xF3n de resultados del modelo de aptitud con las detecciones de IA para identificar y priorizar sitios candidatos.",
        details: [
          "Cruce de aptitud con inventario existente",
          "Identificaci\xF3n de zonas de alta prioridad",
          "Generaci\xF3n de fichas por candidato",
          "Datos abiertos para consulta p\xFAblica"
        ]
      }
    ];
    const limitations = [
      "Los datos de calidad del aire corresponden a promedios anuales y no reflejan variaciones estacionales ni episodios de contingencia.",
      "La resoluci\xF3n espacial de las im\xE1genes satelitales (30m Landsat) limita la precisi\xF3n del an\xE1lisis a nivel de predio individual.",
      "El modelo no incorpora variables estructurales de los edificios (carga, estado de impermeabilizaci\xF3n, accesos).",
      "La ponderaci\xF3n de variables se bas\xF3 en consulta a expertos y puede ser sensible a la composici\xF3n del panel.",
      "Los datos poblacionales se derivan del Censo 2020 y pueden no reflejar cambios recientes en la distribuci\xF3n de poblaci\xF3n.",
      "El modelo de IA para detecci\xF3n tiene una precisi\xF3n del 87% y puede generar falsos positivos y falsos negativos.",
      "Los datos de densidad vial no distinguen entre vialidades primarias y secundarias.",
      "No se consideraron variables econ\xF3micas, normativas ni de gobernanza en el \xEDndice de aptitud."
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonSectionTitle = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_CommonOfficialSourcesSection = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))}><section class="bg-white py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Metodolog\xEDa y Aptitud Territorial",
        subtitle: "Documentaci\xF3n t\xE9cnica del modelo multicriterio, variables, fuentes de datos y el \xEDndice de aptitud territorial.",
        tag: "Metodolog\xEDa"
      }, null, _parent));
      _push(`<div class="mt-8 max-w-3xl"><p class="text-base leading-relaxed text-slate-custom"> El Observatorio de Techos Verdes CDMX utiliza un modelo de an\xE1lisis multicriterio para evaluar la aptitud territorial de las distintas zonas de la Ciudad de M\xE9xico. Este modelo integra variables ambientales, urbanas y de calidad del aire, ponderadas seg\xFAn su relevancia para la implementaci\xF3n de infraestructura verde en azoteas. </p><p class="mt-4 text-base leading-relaxed text-slate-custom"> El enfoque combina sistemas de informaci\xF3n geogr\xE1fica (SIG), datos de sensores remotos, estad\xEDsticas de calidad del aire y t\xE9cnicas de inteligencia artificial para detectar, clasificar y priorizar sitios candidatos. </p></div><div class="mt-6 rounded-card border border-accent/30 bg-accent/5 p-4"><div class="flex gap-3"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div><div><h4 class="text-sm font-semibold text-accent-dark">Aviso sobre aptitud territorial</h4><p class="mt-1 text-sm leading-relaxed text-slate-custom"> Este \xEDndice muestra aptitud territorial, no factibilidad estructural del inmueble. Los resultados reflejan condiciones ambientales y urbanas. Consulte dict\xE1menes t\xE9cnicos para implementaci\xF3n. </p></div></div></div></div></section><section class="py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Flujo del modelo",
        subtitle: "Cuatro etapas principales que componen el proceso anal\xEDtico del observatorio.",
        centered: true
      }, null, _parent));
      _push(`<div class="relative"><div class="absolute left-1/2 top-14 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-eco lg:block"></div><div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(methodologySteps, (step) => {
        _push(`<div class="card p-6 text-center"><div class="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg"><span class="text-lg font-bold">${ssrInterpolate(step.number)}</span></div><h4 class="text-base font-semibold text-ink">${ssrInterpolate(step.title)}</h4><p class="mt-3 text-sm leading-relaxed text-slate-custom">${ssrInterpolate(step.description)}</p>`);
        if (step.details) {
          _push(`<ul class="mt-4 space-y-1 text-left"><!--[-->`);
          ssrRenderList(step.details, (detail) => {
            _push(`<li class="flex items-start gap-2 text-xs text-slate-custom"><span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40"></span> ${ssrInterpolate(detail)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></section><section class="bg-white py-16"><div class="container-wide"><div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: `Variables del modelo (${unref(numVariables)})`,
        subtitle: "Cada variable se normaliza y pondera seg\xFAn su relevancia para la implementaci\xF3n de techos verdes."
      }, null, _parent));
      _push(`<div class="flex items-center gap-2"><button class="${ssrRenderClass([
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        !unref(useEnhanced) ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
      ])}"> Original (8 var) </button><button class="${ssrRenderClass([
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        unref(useEnhanced) ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
      ])}"> Ambiental (11 var) </button></div></div><p class="mt-2 text-xs text-slate-custom">${ssrInterpolate(unref(useEnhanced) ? "Modelo ampliado con indicadores bi\xF3ticos e h\xEDdricos por alcald\xEDa." : "Modelo original con 8 variables de temperatura, urbanizaci\xF3n y calidad del aire.")}</p><div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(pesos), (peso) => {
        _push(`<div class="card p-5"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg" style="${ssrRenderStyle({ backgroundColor: peso.color + "15" })}"><div class="h-4 w-4 rounded-full" style="${ssrRenderStyle({ backgroundColor: peso.color })}"></div></div><div><p class="text-sm font-semibold text-ink leading-tight">${ssrInterpolate(peso.variable)}</p><p class="text-xs font-mono text-slate-custom">${ssrInterpolate(peso.codigo)}</p></div></div><div class="mt-4"><div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Peso</span><span class="font-bold" style="${ssrRenderStyle({ color: peso.color })}">${ssrInterpolate(peso.peso.toFixed(1))}%</span></div><div class="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100"><div class="h-full rounded-full" style="${ssrRenderStyle({
          width: `${peso.peso / unref(maxWeight) * 100}%`,
          backgroundColor: peso.color
        })}"></div></div></div><p class="mt-4 text-xs leading-relaxed text-slate-custom">${ssrInterpolate(peso.descripcion)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="container-wide"><h3 class="text-xl font-semibold text-ink">Pesos del modelo</h3><p class="mt-1 text-sm text-slate-custom">Visualizaci\xF3n de la distribuci\xF3n de pesos entre las ${ssrInterpolate(unref(numVariables))} variables (suman 100%)</p><div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"><div class="panel p-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></section><section class="bg-white py-12"><div class="container-wide"><h3 class="text-xl font-semibold text-ink">Leyenda del mapa de aptitud</h3><p class="mt-1 text-sm text-slate-custom">Clasificaci\xF3n de las zonas seg\xFAn su \xEDndice de aptitud territorial</p><div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5"><!--[-->`);
      ssrRenderList(unref(APTITUD_LEVELS), (level) => {
        _push(`<div class="flex items-center gap-3 rounded-card border p-4" style="${ssrRenderStyle({ borderColor: level.color + "40" })}"><span class="h-6 w-10 rounded" style="${ssrRenderStyle({ backgroundColor: level.color })}"></span><div><p class="text-sm font-semibold text-ink">${ssrInterpolate(level.label)}</p><p class="text-xs text-slate-custom">${ssrInterpolate(level.range)} pts</p></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="container-wide"><div class="grid grid-cols-1 gap-8 lg:grid-cols-2"><div class="rounded-card bg-primary-50 p-6 lg:p-8"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div><h3 class="text-lg font-semibold text-primary">Qu\xE9 significa aptitud territorial</h3></div><p class="mt-4 text-sm leading-relaxed text-primary-dark/80"> La aptitud territorial indica qu\xE9 tan favorable es una zona para la implementaci\xF3n de techos verdes, con base en variables ambientales, urbanas y de calidad del aire. Un \xEDndice alto no significa que un inmueble espec\xEDfico sea apto, sino que la zona en la que se encuentra presenta condiciones que hacen prioritaria la intervenci\xF3n con infraestructura verde. </p></div><div class="rounded-card border border-accent/20 bg-accent/5 p-6 lg:p-8"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div><h3 class="text-lg font-semibold text-accent-dark">Qu\xE9 NO significa</h3></div><ul class="mt-4 space-y-3"><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No indica factibilidad estructural del inmueble. </li><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No sustituye dict\xE1menes t\xE9cnicos profesionales. </li><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No garantiza viabilidad econ\xF3mica ni normativa. </li><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No eval\xFAa la condici\xF3n actual del techo ni la capacidad de carga del edificio. </li></ul></div></div></div></section><section class="py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonOfficialSourcesSection, null, null, _parent));
      _push(`<div class="mt-8 rounded-card border border-primary/20 bg-primary-50 p-5"><h4 class="text-sm font-semibold text-primary">Jerarqu\xEDa de datos</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom"> El observatorio prioriza datos de fuentes oficiales verificadas. Cuando los datos oficiales no est\xE1n disponibles, se utilizan datos derivados (calculados a partir de fuentes primarias) o datos de demostraci\xF3n (mock). Cada registro muestra su origen mediante una etiqueta de procedencia. </p><div class="mt-4 flex flex-wrap gap-3"><div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-eco"></span><span class="text-slate-custom"><strong class="text-ink">Oficial:</strong> Datos verificados de fuentes gubernamentales</span></div><div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-secondary"></span><span class="text-slate-custom"><strong class="text-ink">Derivado:</strong> Datos calculados a partir de fuentes primarias</span></div><div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-slate-custom"></span><span class="text-slate-custom"><strong class="text-ink">Demostraci\xF3n:</strong> Datos simulados para el MVP</span></div></div></div></div></section><section class="bg-white py-16"><div class="container-wide"><h3 class="text-xl font-semibold text-ink">Limitaciones del estudio</h3><p class="mt-2 text-sm text-slate-custom max-w-3xl"> Como todo modelo anal\xEDtico, este estudio tiene limitaciones que deben considerarse al interpretar los resultados. </p><div class="mt-6 max-w-3xl"><ul class="space-y-3"><!--[-->`);
      ssrRenderList(limitations, (limit) => {
        _push(`<li class="flex items-start gap-3 text-sm text-slate-custom"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/50"></span> ${ssrInterpolate(limit)}</li>`);
      });
      _push(`<!--]--></ul></div></div></section><section class="py-12"><div class="container-wide"><div class="card p-6"><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg></div><div><p class="text-base font-semibold text-ink">Documento de metodolog\xEDa</p><p class="text-sm text-slate-custom">Descripci\xF3n t\xE9cnica completa del modelo, variables y fuentes de datos.</p><p class="mt-1 text-xs text-ink-muted">PDF, ~2.5 MB, Actualizado dic. 2024</p></div></div><button class="btn-primary shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Descargar PDF </button></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/metodologia/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-E5XKCm3j.mjs.map
