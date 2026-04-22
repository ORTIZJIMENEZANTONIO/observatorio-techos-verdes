import { _ as __nuxt_component_0 } from "./HeroSection-BqPnfiNV.js";
import { _ as _sfc_main$1 } from "./DataDisclaimer-Bsqs480u.js";
import { _ as _sfc_main$2 } from "./DataSourceBadge-Dtt3IyCj.js";
import { _ as _sfc_main$3 } from "./PaginationControls-BAcytpD9.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-BhPJ81xP.js";
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { c as computeScorePrefactibilidad } from "./useStatisticalAnalysis-Cht9jiYj.js";
import { u as useFormatters } from "./useFormatters-BCDq8oux.js";
import { u as useRoofsStore } from "./roofs-DoyVCM_d.js";
import { u as useHead } from "../server.mjs";
import "./useDataSource-CcCLLLin.js";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ufo/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/defu/dist/defu.mjs";
import "pinia";
import "./mock-source-DMDe05Bu.js";
import "./mock-roofs-D-tdE7ed.js";
import "./mock-candidates-Cvvvd8Mv.js";
import "./mock-validations-qSEi_ZEz.js";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/hookable/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/unctx/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/klona/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/@unhead/vue/dist/index.mjs";
const perPage = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      formatTipoEdificio,
      formatEstatus,
      formatConfianza,
      scoreColor,
      estatusBadgeClass,
      formatTipoEstructura,
      formatEstadoEstructural,
      formatMaterialTechumbre,
      formatNivelPrefactibilidad,
      prefactibilidadBadgeClass
    } = useFormatters();
    const roofsStore = useRoofsStore();
    useHead({
      title: "Candidatos priorizados | Observatorio de Techos Verdes CDMX",
      meta: [
        { name: "description", content: "60 sitios candidatos priorizados para potencial intervención con techos verdes en la Ciudad de México." }
      ]
    });
    const viewMode = ref("list");
    const sortBy = ref("score_desc");
    const filterTipoEdificio = ref("");
    const filterEstatus = ref("");
    const currentPage = ref(1);
    const buildingTabs = computed(() => {
      const all = roofsStore.candidateRoofs.length;
      const tipos = {
        hospital: "Hospital",
        mercado: "Mercado",
        supermercado: "Supermercado",
        centro_comercial: "Centro comercial",
        oficinas: "Oficinas",
        residencial: "Residencial",
        educativo: "Educativo",
        gobierno: "Gobierno",
        cultural: "Cultural",
        industrial: "Industrial"
      };
      const tabs = [
        { value: "", label: "Todos", count: all }
      ];
      for (const [key, label] of Object.entries(tipos)) {
        const count = roofsStore.candidateRoofs.filter((c) => c.tipoEdificio === key).length;
        if (count > 0) {
          tabs.push({ value: key, label, count });
        }
      }
      return tabs;
    });
    const statusFilters = [
      { value: "", label: "Todos" },
      { value: "candidato", label: "Candidato" },
      { value: "validado_visualmente", label: "Validado visualmente" },
      { value: "factibilidad_pendiente", label: "Factibilidad pendiente" },
      { value: "piloto", label: "Piloto" },
      { value: "implementado", label: "Implementado" }
    ];
    const filteredCandidates = computed(() => {
      return roofsStore.candidateRoofs.filter((c) => {
        if (filterTipoEdificio.value && c.tipoEdificio !== filterTipoEdificio.value) return false;
        if (filterEstatus.value && c.estatus !== filterEstatus.value) return false;
        return true;
      });
    });
    const sortedCandidates = computed(() => {
      const arr = [...filteredCandidates.value];
      switch (sortBy.value) {
        case "score_desc":
          return arr.sort((a, b) => b.scoreAptitud - a.scoreAptitud);
        case "score_asc":
          return arr.sort((a, b) => a.scoreAptitud - b.scoreAptitud);
        case "nombre_asc":
          return arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case "nombre_desc":
          return arr.sort((a, b) => b.nombre.localeCompare(a.nombre));
        case "superficie_desc":
          return arr.sort((a, b) => b.superficie - a.superficie);
        case "superficie_asc":
          return arr.sort((a, b) => a.superficie - b.superficie);
        case "alcaldia_asc":
          return arr.sort((a, b) => a.alcaldia.localeCompare(b.alcaldia));
        case "estatus_asc":
          return arr.sort((a, b) => a.estatus.localeCompare(b.estatus));
        default:
          return arr;
      }
    });
    const totalPages = computed(() => Math.ceil(sortedCandidates.value.length / perPage) || 1);
    const paginatedCandidates = computed(() => sortedCandidates.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));
    watch([filterTipoEdificio, filterEstatus, sortBy], () => {
      currentPage.value = 1;
    });
    function getPrefactibilidad(candidate) {
      const de = candidate.datosCatastrales?.datosEstructurales;
      if (!de) return { score: 0, nivel: "no_recomendado", factoresRiesgo: [], detalleComponentes: {} };
      return computeScorePrefactibilidad({
        tipoEstructura: de.tipoEstructura,
        zonaSismica: de.zonaSismica,
        anioConstruccion: candidate.datosCatastrales?.anioConstruccion ?? 1990,
        niveles: de.niveles,
        estadoEstructural: de.estadoEstructural,
        materialTechumbre: de.materialTechumbre
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonHeroSection = __nuxt_component_0;
      const _component_CommonDataDisclaimer = _sfc_main$1;
      const _component_CommonDataSourceBadge = _sfc_main$2;
      const _component_CommonPaginationControls = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CommonHeroSection, { compact: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-3xl font-extrabold text-white md:text-4xl"${_scopeId}>Techos candidatos priorizados</h1><p class="mt-2 text-base text-white/80"${_scopeId}>60 sitios identificados para potencial intervención verde</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-3xl font-extrabold text-white md:text-4xl" }, "Techos candidatos priorizados"),
              createVNode("p", { class: "mt-2 text-base text-white/80" }, "60 sitios identificados para potencial intervención verde")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="bg-white py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonDataDisclaimer, { class: "mt-6" }, null, _parent));
      _push(`<div class="mt-6 flex items-center justify-between"><div class="flex gap-2"><button class="${ssrRenderClass([
        "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        unref(viewMode) === "list" ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 -mt-0.5 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> Lista </button><button class="${ssrRenderClass([
        "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        unref(viewMode) === "map" ? "bg-primary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 -mt-0.5 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon></svg> Mapa </button></div><select class="select !w-auto"><option value="score_desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "score_desc") : ssrLooseEqual(unref(sortBy), "score_desc")) ? " selected" : ""}>Score (mayor)</option><option value="score_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "score_asc") : ssrLooseEqual(unref(sortBy), "score_asc")) ? " selected" : ""}>Score (menor)</option><option value="nombre_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "nombre_asc") : ssrLooseEqual(unref(sortBy), "nombre_asc")) ? " selected" : ""}>Nombre (A-Z)</option><option value="nombre_desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "nombre_desc") : ssrLooseEqual(unref(sortBy), "nombre_desc")) ? " selected" : ""}>Nombre (Z-A)</option><option value="superficie_desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "superficie_desc") : ssrLooseEqual(unref(sortBy), "superficie_desc")) ? " selected" : ""}>Superficie (mayor)</option><option value="superficie_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "superficie_asc") : ssrLooseEqual(unref(sortBy), "superficie_asc")) ? " selected" : ""}>Superficie (menor)</option><option value="alcaldia_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "alcaldia_asc") : ssrLooseEqual(unref(sortBy), "alcaldia_asc")) ? " selected" : ""}>Alcaldía (A-Z)</option><option value="estatus_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "estatus_asc") : ssrLooseEqual(unref(sortBy), "estatus_asc")) ? " selected" : ""}>Estatus (A-Z)</option></select></div><div class="mt-4 space-y-3"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(buildingTabs), (tab) => {
        _push(`<button class="${ssrRenderClass([
          "rounded-badge px-4 py-1.5 text-xs font-medium transition-all duration-200",
          unref(filterTipoEdificio) === tab.value ? "bg-primary text-white scale-[1.02]" : "bg-gray-100 text-ink-muted hover:bg-gray-200 active:scale-95"
        ])}">${ssrInterpolate(tab.label)} `);
        if (tab.count > 0) {
          _push(`<span class="${ssrRenderClass([
            "ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold",
            unref(filterTipoEdificio) === tab.value ? "bg-white/20 text-white" : "bg-gray-200 text-ink-muted"
          ])}">${ssrInterpolate(tab.count)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div><div class="flex flex-wrap gap-2"><span class="text-xs font-semibold uppercase tracking-wider text-slate-custom self-center mr-2">Estatus:</span><!--[-->`);
      ssrRenderList(statusFilters, (st) => {
        _push(`<button class="${ssrRenderClass([
          "rounded-badge px-3 py-1 text-xs font-medium transition-colors",
          unref(filterEstatus) === st.value ? "bg-secondary text-white" : "bg-gray-100 text-ink-muted hover:bg-gray-200"
        ])}">${ssrInterpolate(st.label)}</button>`);
      });
      _push(`<!--]--></div></div><p class="mt-4 text-sm text-slate-custom">${ssrInterpolate(unref(sortedCandidates).length)} candidatos encontrados </p></div></section>`);
      if (unref(viewMode) === "list") {
        _push(`<section class="pb-16"><div class="container-wide">`);
        if (unref(sortedCandidates).length > 0) {
          _push(`<!--[--><div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(paginatedCandidates), (candidate) => {
            _push(`<div class="card-interactive overflow-hidden animate-fade-in"><div class="p-5"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex flex-wrap gap-1.5"><span class="badge-secondary">${ssrInterpolate(unref(formatTipoEdificio)(candidate.tipoEdificio))}</span><span class="${ssrRenderClass(["badge", unref(estatusBadgeClass)(candidate.estatus)])}">${ssrInterpolate(unref(formatEstatus)(candidate.estatus))}</span></div><p class="mt-2 text-sm font-semibold text-ink leading-tight">${ssrInterpolate(candidate.nombre)}</p><p class="mt-0.5 text-xs text-slate-custom">${ssrInterpolate(candidate.direccion)}</p><p class="mt-0.5 text-xs text-slate-custom">${ssrInterpolate(candidate.alcaldia)}</p></div></div><div class="mt-2">`);
            _push(ssrRenderComponent(_component_CommonDataSourceBadge, {
              "source-name": candidate._source.sourceName,
              "last-updated": candidate._source.lastUpdated
            }, null, _parent));
            _push(`</div><div class="mt-4"><div class="flex items-center justify-between"><span class="text-xs font-medium text-slate-custom">Score de aptitud</span><span class="text-lg font-bold" style="${ssrRenderStyle({ color: unref(scoreColor)(candidate.scoreAptitud) })}">${ssrInterpolate(candidate.scoreAptitud)}</span></div><div class="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100"><div class="h-full rounded-full" style="${ssrRenderStyle({
              width: `${candidate.scoreAptitud}%`,
              backgroundColor: unref(scoreColor)(candidate.scoreAptitud),
              animation: "progressFill 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both"
            })}"></div></div></div><div class="mt-4 flex items-center justify-between border-t border-gray-50 pt-3"><div class="flex items-center gap-1 text-xs text-ink-muted"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg> ${ssrInterpolate(candidate.superficie?.toLocaleString())} m2 </div><div class="flex items-center gap-1 text-xs text-ink-muted"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Confianza: ${ssrInterpolate(unref(formatConfianza)(candidate.confianzaIA))}</div></div>`);
            if (candidate.datosCatastrales) {
              _push(`<div class="mt-3 rounded-lg bg-gray-50 p-3"><p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-custom">Datos catastrales</p><div class="grid grid-cols-3 gap-2">`);
              if (candidate.datosCatastrales.supTerreno) {
                _push(`<div><p class="text-[10px] text-slate-custom">Sup. terreno</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(candidate.datosCatastrales.supTerreno.toLocaleString())} m2</p></div>`);
              } else {
                _push(`<!---->`);
              }
              if (candidate.datosCatastrales.supConstruccion) {
                _push(`<div><p class="text-[10px] text-slate-custom">Sup. construcción</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(candidate.datosCatastrales.supConstruccion.toLocaleString())} m2</p></div>`);
              } else {
                _push(`<!---->`);
              }
              if (candidate.datosCatastrales.anioConstruccion) {
                _push(`<div><p class="text-[10px] text-slate-custom">Año construcción</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(candidate.datosCatastrales.anioConstruccion)}</p></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            } else {
              _push(`<!---->`);
            }
            if (candidate.datosCatastrales?.datosEstructurales) {
              _push(`<div class="mt-3 rounded-lg border border-primary/20 bg-primary-50 p-3"><p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Pre-factibilidad estructural</p><div class="grid grid-cols-2 gap-2"><div><p class="text-[10px] text-slate-custom">Estructura</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(unref(formatTipoEstructura)(candidate.datosCatastrales.datosEstructurales.tipoEstructura))}</p></div><div><p class="text-[10px] text-slate-custom">Zona sísmica</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(candidate.datosCatastrales.datosEstructurales.zonaSismica)}</p></div><div><p class="text-[10px] text-slate-custom">Dictamen post-sismo</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(unref(formatEstadoEstructural)(candidate.datosCatastrales.datosEstructurales.estadoEstructural))}</p></div><div><p class="text-[10px] text-slate-custom">Techumbre</p><p class="text-xs font-semibold text-ink">${ssrInterpolate(unref(formatMaterialTechumbre)(candidate.datosCatastrales.datosEstructurales.materialTechumbre))}</p></div></div><div class="mt-2 flex items-center gap-2"><span class="${ssrRenderClass(["badge text-[10px]", unref(prefactibilidadBadgeClass)(getPrefactibilidad(candidate).nivel)])}">${ssrInterpolate(unref(formatNivelPrefactibilidad)(getPrefactibilidad(candidate).nivel))}</span><span class="text-xs font-bold" style="${ssrRenderStyle({ color: getPrefactibilidad(candidate).score >= 65 ? "#79C141" : getPrefactibilidad(candidate).score >= 40 ? "#F2A81D" : "#D9363E" })}">${ssrInterpolate(getPrefactibilidad(candidate).score)}/100 </span></div>`);
              if (getPrefactibilidad(candidate).factoresRiesgo.length > 0) {
                _push(`<div class="mt-1.5"><p class="text-[9px] text-slate-custom"> Factores: ${ssrInterpolate(getPrefactibilidad(candidate).factoresRiesgo.join(", "))}</p></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div><div class="mt-8">`);
          _push(ssrRenderComponent(_component_CommonPaginationControls, {
            "current-page": unref(currentPage),
            "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
            "total-pages": unref(totalPages),
            "total-items": unref(sortedCandidates).length,
            "per-page": perPage
          }, null, _parent));
          _push(`</div><!--]-->`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center py-20 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><h3 class="text-lg font-semibold text-ink">Sin resultados</h3><p class="mt-2 max-w-sm text-sm text-slate-custom"> No se encontraron candidatos con los filtros seleccionados. </p><button class="btn-outline mt-4">Limpiar filtros</button></div>`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<section class="pb-16"><div class="container-wide"><div class="flex h-[500px] items-center justify-center overflow-hidden rounded-card bg-gradient-to-br from-primary-50 to-secondary/10 shadow-panel"><div class="text-center"><div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-card"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg></div><h3 class="text-lg font-semibold text-ink">Vista de mapa</h3><p class="mt-2 text-sm text-slate-custom">${ssrInterpolate(unref(sortedCandidates).length)} candidatos visibles</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/mapa",
          class: "btn-primary btn-sm mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Abrir mapa completo `);
            } else {
              return [
                createTextVNode(" Abrir mapa completo ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/candidatos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CtEnMSY9.js.map
