import { _ as __nuxt_component_0 } from "./HeroSection-BqPnfiNV.js";
import { _ as _sfc_main$3 } from "./SectionTitle-Di4BE9k7.js";
import { u as useHead, a as __nuxt_component_1 } from "../server.mjs";
import { _ as _sfc_main$2 } from "./DataSourceBadge-Dtt3IyCj.js";
import { defineComponent, useSSRContext, ref, computed, mergeProps, withCtx, createVNode, unref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import { a as aptitudPesos, b as aptitudPesosOriginal } from "./aptitud-pesos-B4e-CPf1.js";
import { a as APTITUD_LEVELS } from "./constants-CRBjnGpz.js";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/hookable/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/unctx/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ufo/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/klona/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/@unhead/vue/dist/index.mjs";
import "./useDataSource-CcCLLLin.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OfficialSourcesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const sources = [
      {
        name: "SIGCDMX",
        sourceName: "SIGCDMX",
        description: "Sistema de Información Geográfica de la CDMX. Proporciona capas catastrales, uso de suelo, predios y equipamiento urbano vía servicios WFS/WMS.",
        format: "GeoJSON / GML",
        protocol: "WFS 2.0",
        url: "sig.cdmx.gob.mx/geoserver/ows",
        color: "#0E5E3A"
      },
      {
        name: "SEDEMA",
        sourceName: "SEDEMA",
        description: "Secretaría del Medio Ambiente de la CDMX. Inventario de áreas verdes, programas ambientales y registro de azoteas verdes.",
        format: "CSV / JSON",
        protocol: "REST API",
        url: "datos.cdmx.gob.mx",
        color: "#79C141"
      },
      {
        name: "SIMAT",
        sourceName: "SIMAT",
        description: "Sistema de Monitoreo Atmosférico. Datos en tiempo real e históricos de calidad del aire de la red de estaciones RAMA.",
        format: "CSV / JSON",
        protocol: "REST API",
        url: "datosabiertos.aire.cdmx.gob.mx",
        color: "#18A5E3"
      },
      {
        name: "Datos Abiertos CDMX",
        sourceName: "DatosAbiertos",
        description: "Portal de datos abiertos del Gobierno de la Ciudad de México. Conjuntos de datos tabulares y geoespaciales de múltiples dependencias.",
        format: "CSV / GeoJSON / XLSX",
        protocol: "CKAN API",
        url: "datos.cdmx.gob.mx",
        color: "#F2A81D"
      },
      {
        name: "INEGI",
        sourceName: "INEGI",
        description: "Instituto Nacional de Estadística y Geografía. Datos censales de población, vivienda y marco geoestadístico nacional.",
        format: "CSV / SHP / GeoJSON",
        protocol: "REST API / WFS",
        url: "inegi.org.mx",
        color: "#6366F1"
      },
      {
        name: "Aire CDMX",
        sourceName: "SIMAT",
        description: "Plataforma complementaria del SIMAT con visualizaciones y datos históricos procesados de la red de monitoreo atmosférico.",
        format: "JSON / CSV",
        protocol: "REST API",
        url: "aire.cdmx.gob.mx",
        color: "#06B6D4"
      },
      {
        name: "CONABIO",
        sourceName: "CONABIO",
        description: "Comisión Nacional para el Conocimiento y Uso de la Biodiversidad. Sistema Nacional de Información sobre Biodiversidad (SNIB) con registros de especies e índices bióticos.",
        format: "CSV / GeoJSON / SHP",
        protocol: "REST API / WMS",
        url: "snib.mx",
        color: "#059669"
      },
      {
        name: "CONAGUA",
        sourceName: "CONAGUA",
        description: "Comisión Nacional del Agua. Servicio Meteorológico Nacional (SMN) con datos climatológicos, pluviométricos y de estaciones de monitoreo hidrológico.",
        format: "CSV / JSON / XML",
        protocol: "REST API",
        url: "smn.conagua.gob.mx",
        color: "#0284C7"
      },
      {
        name: "SEMARNAT",
        sourceName: "SEMARNAT",
        description: "Secretaría de Medio Ambiente y Recursos Naturales. Registros ambientales federales, normatividad y datos de áreas naturales protegidas.",
        format: "CSV / PDF / SHP",
        protocol: "REST API",
        url: "datos.semarnat.gob.mx",
        color: "#7C3AED"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonDataSourceBadge = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="text-xl font-semibold text-ink">Fuentes oficiales de datos</h3><p class="mt-2 text-sm text-slate-custom max-w-3xl"> El observatorio está diseñado para integrar datos de las siguientes fuentes oficiales de la Ciudad de México y de instituciones federales. </p><div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
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
      title: "Metodología | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Metodología del Observatorio de Techos Verdes CDMX. Modelo multicriterio, variables, pesos, aptitud territorial y fuentes de datos." }
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
        title: "Recopilación de datos geoespaciales",
        description: "Integración de múltiples fuentes de datos espaciales, incluyendo imágenes satelitales, datos censales y estaciones de monitoreo.",
        details: [
          "Imágenes Landsat y MODIS para temperatura superficial",
          "Datos del INEGI para población y área urbanizada",
          "Estaciones RAMA para calidad del aire",
          "Coberturas de uso de suelo de SEDEMA"
        ]
      },
      {
        number: 2,
        title: "Construcción del índice de aptitud",
        description: "Normalización y ponderación de variables en un índice multicriterio de aptitud territorial.",
        details: [
          "Normalización 0-100 por variable",
          "Ponderación por Proceso Analítico Jerárquico (AHP)",
          "Validación cruzada con expertos",
          "Clasificación en 5 niveles de aptitud"
        ]
      },
      {
        number: 3,
        title: "Detección y validación con IA",
        description: "Modelos de visión por computadora para detectar techos verdes en imágenes aéreas, con validación humana integrada.",
        details: [
          "Redes neuronales convolucionales (CNN)",
          "Imágenes aéreas de alta resolución",
          "Sistema humano-en-el-bucle",
          "Nivel de confianza por predicción"
        ]
      },
      {
        number: 4,
        title: "Priorización territorial",
        description: "Integración de resultados del modelo de aptitud con las detecciones de IA para identificar y priorizar sitios candidatos.",
        details: [
          "Cruce de aptitud con inventario existente",
          "Identificación de zonas de alta prioridad",
          "Generación de fichas por candidato",
          "Datos abiertos para consulta pública"
        ]
      }
    ];
    const limitations = [
      "Los datos de calidad del aire corresponden a promedios anuales y no reflejan variaciones estacionales ni episodios de contingencia.",
      "La resolución espacial de las imágenes satelitales (30m Landsat) limita la precisión del análisis a nivel de predio individual.",
      "El modelo no incorpora variables estructurales de los edificios (carga, estado de impermeabilización, accesos).",
      "La ponderación de variables se basó en consulta a expertos y puede ser sensible a la composición del panel.",
      "Los datos poblacionales se derivan del Censo 2020 y pueden no reflejar cambios recientes en la distribución de población.",
      "El modelo de IA para detección tiene una precisión del 87% y puede generar falsos positivos y falsos negativos.",
      "Los datos de densidad vial no distinguen entre vialidades primarias y secundarias.",
      "No se consideraron variables económicas, normativas ni de gobernanza en el índice de aptitud."
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonHeroSection = __nuxt_component_0;
      const _component_CommonSectionTitle = _sfc_main$3;
      const _component_ClientOnly = __nuxt_component_1;
      const _component_CommonOfficialSourcesSection = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CommonHeroSection, { compact: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-3xl font-extrabold text-white md:text-4xl"${_scopeId}>Metodología y aptitud territorial</h1><p class="mt-2 text-base text-white/80"${_scopeId}>Documentación técnica del modelo multicriterio, variables, fuentes de datos y el índice de aptitud territorial</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-3xl font-extrabold text-white md:text-4xl" }, "Metodología y aptitud territorial"),
              createVNode("p", { class: "mt-2 text-base text-white/80" }, "Documentación técnica del modelo multicriterio, variables, fuentes de datos y el índice de aptitud territorial")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="bg-white py-16"><div class="container-wide"><div class="mt-8 max-w-3xl"><p class="text-base leading-relaxed text-slate-custom"> El Observatorio de Techos Verdes CDMX utiliza un modelo de análisis multicriterio para evaluar la aptitud territorial de las distintas zonas de la Ciudad de México. Este modelo integra variables ambientales, urbanas y de calidad del aire, ponderadas según su relevancia para la implementación de infraestructura verde en azoteas. </p><p class="mt-4 text-base leading-relaxed text-slate-custom"> El enfoque combina sistemas de información geográfica (SIG), datos de sensores remotos, estadísticas de calidad del aire y técnicas de inteligencia artificial para detectar, clasificar y priorizar sitios candidatos. </p></div><div class="mt-6 rounded-card border border-accent/30 bg-accent/5 p-4"><div class="flex gap-3"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div><div><h4 class="text-sm font-semibold text-accent-dark">Aviso sobre aptitud territorial</h4><p class="mt-1 text-sm leading-relaxed text-slate-custom"> Este índice muestra aptitud territorial, no factibilidad estructural del inmueble. Los resultados reflejan condiciones ambientales y urbanas. Consulte dictámenes técnicos para implementación. </p></div></div></div></div></section><section class="py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Flujo del modelo",
        subtitle: "Cuatro etapas principales que componen el proceso analítico del observatorio.",
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
        subtitle: "Cada variable se normaliza y pondera según su relevancia para la implementación de techos verdes."
      }, null, _parent));
      _push(`<div class="flex items-center gap-2"><button class="${ssrRenderClass([
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        !unref(useEnhanced) ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
      ])}"> Original (8 var) </button><button class="${ssrRenderClass([
        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        unref(useEnhanced) ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
      ])}"> Ambiental (11 var) </button></div></div><p class="mt-2 text-xs text-slate-custom">${ssrInterpolate(unref(useEnhanced) ? "Modelo ampliado con indicadores bióticos e hídricos por alcaldía." : "Modelo original con 8 variables de temperatura, urbanización y calidad del aire.")}</p><div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(pesos), (peso) => {
        _push(`<div class="card p-5"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg" style="${ssrRenderStyle({ backgroundColor: peso.color + "15" })}"><div class="h-4 w-4 rounded-full" style="${ssrRenderStyle({ backgroundColor: peso.color })}"></div></div><div><p class="text-sm font-semibold text-ink leading-tight">${ssrInterpolate(peso.variable)}</p><p class="text-xs font-mono text-slate-custom">${ssrInterpolate(peso.codigo)}</p></div></div><div class="mt-4"><div class="flex items-center justify-between text-xs"><span class="text-slate-custom">Peso</span><span class="font-bold" style="${ssrRenderStyle({ color: peso.color })}">${ssrInterpolate(peso.peso.toFixed(1))}%</span></div><div class="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100"><div class="h-full rounded-full" style="${ssrRenderStyle({
          width: `${peso.peso / unref(maxWeight) * 100}%`,
          backgroundColor: peso.color
        })}"></div></div></div><p class="mt-4 text-xs leading-relaxed text-slate-custom">${ssrInterpolate(peso.descripcion)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="container-wide"><h3 class="text-xl font-semibold text-ink">Pesos del modelo</h3><p class="mt-1 text-sm text-slate-custom">Visualización de la distribución de pesos entre las ${ssrInterpolate(unref(numVariables))} variables (suman 100%)</p><div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"><div class="panel p-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></section><section class="bg-white py-12"><div class="container-wide"><h3 class="text-xl font-semibold text-ink">Leyenda del mapa de aptitud</h3><p class="mt-1 text-sm text-slate-custom">Clasificación de las zonas según su índice de aptitud territorial</p><div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5"><!--[-->`);
      ssrRenderList(unref(APTITUD_LEVELS), (level) => {
        _push(`<div class="flex items-center gap-3 rounded-card border p-4" style="${ssrRenderStyle({ borderColor: level.color + "40" })}"><span class="h-6 w-10 rounded" style="${ssrRenderStyle({ backgroundColor: level.color })}"></span><div><p class="text-sm font-semibold text-ink">${ssrInterpolate(level.label)}</p><p class="text-xs text-slate-custom">${ssrInterpolate(level.range)} pts</p></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="container-wide"><div class="grid grid-cols-1 gap-8 lg:grid-cols-2"><div class="rounded-card bg-primary-50 p-6 lg:p-8"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div><h3 class="text-lg font-semibold text-primary">Qué significa aptitud territorial</h3></div><p class="mt-4 text-sm leading-relaxed text-primary-dark/80"> La aptitud territorial indica qué tan favorable es una zona para la implementación de techos verdes, con base en variables ambientales, urbanas y de calidad del aire. Un índice alto no significa que un inmueble específico sea apto, sino que la zona en la que se encuentra presenta condiciones que hacen prioritaria la intervención con infraestructura verde. </p></div><div class="rounded-card border border-accent/20 bg-accent/5 p-6 lg:p-8"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div><h3 class="text-lg font-semibold text-accent-dark">Qué NO significa</h3></div><ul class="mt-4 space-y-3"><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No indica factibilidad estructural del inmueble. </li><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No sustituye dictámenes técnicos profesionales. </li><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No garantiza viabilidad económica ni normativa. </li><li class="flex items-start gap-2 text-sm text-slate-custom"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> No evalúa la condición actual del techo ni la capacidad de carga del edificio. </li></ul></div></div></div></section><section class="py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonOfficialSourcesSection, null, null, _parent));
      _push(`<div class="mt-8 rounded-card border border-primary/20 bg-primary-50 p-5"><h4 class="text-sm font-semibold text-primary">Jerarquía de datos</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom"> El observatorio prioriza datos de fuentes oficiales verificadas. Cuando los datos oficiales no están disponibles, se utilizan datos derivados (calculados a partir de fuentes primarias) o datos de demostración (mock). Cada registro muestra su origen mediante una etiqueta de procedencia. </p><div class="mt-4 flex flex-wrap gap-3"><div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-eco"></span><span class="text-slate-custom"><strong class="text-ink">Oficial:</strong> Datos verificados de fuentes gubernamentales</span></div><div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-secondary"></span><span class="text-slate-custom"><strong class="text-ink">Derivado:</strong> Datos calculados a partir de fuentes primarias</span></div><div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-slate-custom"></span><span class="text-slate-custom"><strong class="text-ink">Demostración:</strong> Datos simulados para el MVP</span></div></div></div></div></section><section class="bg-white py-16"><div class="container-wide"><h3 class="text-xl font-semibold text-ink">Limitaciones del estudio</h3><p class="mt-2 text-sm text-slate-custom max-w-3xl"> Como todo modelo analítico, este estudio tiene limitaciones que deben considerarse al interpretar los resultados. </p><div class="mt-6 max-w-3xl"><ul class="space-y-3"><!--[-->`);
      ssrRenderList(limitations, (limit) => {
        _push(`<li class="flex items-start gap-3 text-sm text-slate-custom"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/50"></span> ${ssrInterpolate(limit)}</li>`);
      });
      _push(`<!--]--></ul></div></div></section><section class="py-12"><div class="container-wide"><div class="card p-6"><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg></div><div><p class="text-base font-semibold text-ink">Documento de metodología</p><p class="text-sm text-slate-custom">Descripción técnica completa del modelo, variables y fuentes de datos.</p><p class="mt-1 text-xs text-ink-muted">PDF, ~2.5 MB, Actualizado dic. 2024</p></div></div><button class="btn-primary shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Descargar PDF </button></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/metodologia/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-mFnBZF3H.js.map
