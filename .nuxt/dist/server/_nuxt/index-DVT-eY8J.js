import { _ as __nuxt_component_0 } from "./HeroSection-BqPnfiNV.js";
import { _ as _sfc_main$1 } from "./PaginationControls-BAcytpD9.js";
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createVNode, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import { g as greenRoofs } from "./mock-roofs-D-tdE7ed.js";
import { u as useFormatters } from "./useFormatters-BCDq8oux.js";
import { u as useScrollReveal } from "./useScrollReveal-V7xkZpXD.js";
import { u as useHead, _ as _export_sfc } from "../server.mjs";
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
const perPage = 15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatTipoEdificio, formatTipoTecho, formatEstadoTecho: formatEstado, estadoTechoBadgeClass: estadoBadgeClass } = useFormatters();
    useScrollReveal({ stagger: true });
    useHead({
      title: "Inventario | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Inventario de 57 techos verdes registrados en la Ciudad de México. Consulta información detallada de cada instalación." }
      ]
    });
    const searchQuery = ref("");
    const filterAlcaldia = ref("");
    const filterTipoEdificio = ref("");
    const filterTipoTecho = ref("");
    const filterEstado = ref("");
    const selectedRoof = ref(null);
    const sortBy = ref("nombre_asc");
    const currentPage = ref(1);
    const alcaldias = computed(() => {
      const set = new Set(greenRoofs.map((r) => r.alcaldia));
      return Array.from(set).sort();
    });
    const tiposEdificio = computed(() => {
      const set = new Set(greenRoofs.map((r) => r.tipoEdificio));
      return Array.from(set).sort();
    });
    const tiposTecho = computed(() => {
      const set = new Set(greenRoofs.map((r) => r.tipoTechoVerde));
      return Array.from(set).sort();
    });
    const estados = computed(() => {
      const set = new Set(greenRoofs.map((r) => r.estado));
      return Array.from(set).sort();
    });
    const hasActiveFilters = computed(() => {
      return searchQuery.value || filterAlcaldia.value || filterTipoEdificio.value || filterTipoTecho.value || filterEstado.value;
    });
    const filteredRoofs = computed(() => {
      return greenRoofs.filter((r) => {
        if (filterAlcaldia.value && r.alcaldia !== filterAlcaldia.value) return false;
        if (filterTipoEdificio.value && r.tipoEdificio !== filterTipoEdificio.value) return false;
        if (filterTipoTecho.value && r.tipoTechoVerde !== filterTipoTecho.value) return false;
        if (filterEstado.value && r.estado !== filterEstado.value) return false;
        if (searchQuery.value) {
          const q = searchQuery.value.toLowerCase();
          const match = r.nombre.toLowerCase().includes(q) || r.direccion.toLowerCase().includes(q) || r.alcaldia.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      });
    });
    const sortedRoofs = computed(() => {
      const arr = [...filteredRoofs.value];
      switch (sortBy.value) {
        case "nombre_asc":
          return arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case "nombre_desc":
          return arr.sort((a, b) => b.nombre.localeCompare(a.nombre));
        case "superficie_desc":
          return arr.sort((a, b) => (b.superficie || 0) - (a.superficie || 0));
        case "superficie_asc":
          return arr.sort((a, b) => (a.superficie || 0) - (b.superficie || 0));
        case "alcaldia_asc":
          return arr.sort((a, b) => a.alcaldia.localeCompare(b.alcaldia));
        case "fecha_desc":
          return arr.sort((a, b) => (b.fechaRegistro || "").localeCompare(a.fechaRegistro || ""));
        case "fecha_asc":
          return arr.sort((a, b) => (a.fechaRegistro || "").localeCompare(b.fechaRegistro || ""));
        default:
          return arr;
      }
    });
    const totalPages = computed(() => Math.ceil(sortedRoofs.value.length / perPage) || 1);
    const paginatedRoofs = computed(() => sortedRoofs.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));
    watch([searchQuery, filterAlcaldia, filterTipoEdificio, filterTipoTecho, filterEstado, sortBy], () => {
      currentPage.value = 1;
    });
    const totalFilteredArea = computed(() => {
      return filteredRoofs.value.reduce((sum, r) => sum + (r.superficie || 0), 0);
    });
    const activeCount = computed(() => {
      return filteredRoofs.value.filter((r) => r.estado === "activo").length;
    });
    const alcaldiaCount = computed(() => {
      return new Set(filteredRoofs.value.map((r) => r.alcaldia)).size;
    });
    const CATEGORY_FALLBACKS = {
      hospital: "/img/roofs/_fallback-hospital.jpg",
      gobierno: "/img/roofs/_fallback-gobierno.jpg",
      oficinas: "/img/roofs/_fallback-oficinas.jpg",
      educativo: "/img/roofs/_fallback-educativo.jpg",
      residencial: "/img/roofs/_fallback-residencial.jpg",
      industrial: "/img/roofs/_fallback-industrial.jpg",
      centro_comercial: "/img/roofs/_fallback-comercial.jpg",
      supermercado: "/img/roofs/_fallback-comercial.jpg",
      mercado: "/img/roofs/_fallback-comercial.jpg",
      cultural: "/img/roofs/_fallback-gobierno.jpg"
    };
    function roofImageSrc(roof) {
      if (roof.imagen) return roof.imagen;
      return CATEGORY_FALLBACKS[roof.tipoEdificio] || "/img/roofs/_fallback-comercial.jpg";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonHeroSection = __nuxt_component_0;
      const _component_CommonPaginationControls = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))} data-v-3773a9fe>`);
      _push(ssrRenderComponent(_component_CommonHeroSection, { compact: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-3xl font-extrabold text-white md:text-4xl" data-v-3773a9fe${_scopeId}>Inventario de techos verdes</h1><p class="mt-2 text-base text-white/80" data-v-3773a9fe${_scopeId}>57 techos verdes registrados en la Ciudad de México</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-3xl font-extrabold text-white md:text-4xl" }, "Inventario de techos verdes"),
              createVNode("p", { class: "mt-2 text-base text-white/80" }, "57 techos verdes registrados en la Ciudad de México")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="bg-white py-16" data-v-3773a9fe><div class="container-wide" data-v-3773a9fe><div class="mt-6 space-y-4" data-v-3773a9fe><div class="relative" data-v-3773a9fe><svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3773a9fe><circle cx="11" cy="11" r="8" data-v-3773a9fe></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-3773a9fe></line></svg><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Buscar por nombre, dirección o alcaldía..." class="input pl-10" data-v-3773a9fe></div><div class="flex flex-wrap gap-3" data-v-3773a9fe><select class="select !w-auto min-w-[160px]" data-v-3773a9fe><option value="" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterAlcaldia)) ? ssrLooseContain(unref(filterAlcaldia), "") : ssrLooseEqual(unref(filterAlcaldia), "")) ? " selected" : ""}>Alcaldía: Todas</option><!--[-->`);
      ssrRenderList(unref(alcaldias), (a) => {
        _push(`<option${ssrRenderAttr("value", a)} data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterAlcaldia)) ? ssrLooseContain(unref(filterAlcaldia), a) : ssrLooseEqual(unref(filterAlcaldia), a)) ? " selected" : ""}>${ssrInterpolate(a)}</option>`);
      });
      _push(`<!--]--></select><select class="select !w-auto min-w-[160px]" data-v-3773a9fe><option value="" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterTipoEdificio)) ? ssrLooseContain(unref(filterTipoEdificio), "") : ssrLooseEqual(unref(filterTipoEdificio), "")) ? " selected" : ""}>Tipo edificio: Todos</option><!--[-->`);
      ssrRenderList(unref(tiposEdificio), (t) => {
        _push(`<option${ssrRenderAttr("value", t)} data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterTipoEdificio)) ? ssrLooseContain(unref(filterTipoEdificio), t) : ssrLooseEqual(unref(filterTipoEdificio), t)) ? " selected" : ""}>${ssrInterpolate(unref(formatTipoEdificio)(t))}</option>`);
      });
      _push(`<!--]--></select><select class="select !w-auto min-w-[160px]" data-v-3773a9fe><option value="" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterTipoTecho)) ? ssrLooseContain(unref(filterTipoTecho), "") : ssrLooseEqual(unref(filterTipoTecho), "")) ? " selected" : ""}>Techo: Todos</option><!--[-->`);
      ssrRenderList(unref(tiposTecho), (t) => {
        _push(`<option${ssrRenderAttr("value", t)} data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterTipoTecho)) ? ssrLooseContain(unref(filterTipoTecho), t) : ssrLooseEqual(unref(filterTipoTecho), t)) ? " selected" : ""}>${ssrInterpolate(unref(formatTipoTecho)(t))}</option>`);
      });
      _push(`<!--]--></select><select class="select !w-auto min-w-[140px]" data-v-3773a9fe><option value="" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), "") : ssrLooseEqual(unref(filterEstado), "")) ? " selected" : ""}>Estado: Todos</option><!--[-->`);
      ssrRenderList(unref(estados), (e) => {
        _push(`<option${ssrRenderAttr("value", e)} data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(filterEstado)) ? ssrLooseContain(unref(filterEstado), e) : ssrLooseEqual(unref(filterEstado), e)) ? " selected" : ""}>${ssrInterpolate(unref(formatEstado)(e))}</option>`);
      });
      _push(`<!--]--></select><select class="select !w-auto min-w-[180px]" data-v-3773a9fe><option value="nombre_asc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "nombre_asc") : ssrLooseEqual(unref(sortBy), "nombre_asc")) ? " selected" : ""}>Nombre (A-Z)</option><option value="nombre_desc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "nombre_desc") : ssrLooseEqual(unref(sortBy), "nombre_desc")) ? " selected" : ""}>Nombre (Z-A)</option><option value="superficie_desc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "superficie_desc") : ssrLooseEqual(unref(sortBy), "superficie_desc")) ? " selected" : ""}>Superficie (mayor)</option><option value="superficie_asc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "superficie_asc") : ssrLooseEqual(unref(sortBy), "superficie_asc")) ? " selected" : ""}>Superficie (menor)</option><option value="alcaldia_asc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "alcaldia_asc") : ssrLooseEqual(unref(sortBy), "alcaldia_asc")) ? " selected" : ""}>Alcaldía (A-Z)</option><option value="fecha_desc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "fecha_desc") : ssrLooseEqual(unref(sortBy), "fecha_desc")) ? " selected" : ""}>Fecha (reciente)</option><option value="fecha_asc" data-v-3773a9fe${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "fecha_asc") : ssrLooseEqual(unref(sortBy), "fecha_asc")) ? " selected" : ""}>Fecha (antiguo)</option></select>`);
      if (unref(hasActiveFilters)) {
        _push(`<button class="btn-ghost btn-sm" data-v-3773a9fe> Limpiar filtros </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-8 stagger-children grid grid-cols-2 gap-4 md:grid-cols-4" data-v-3773a9fe><div class="kpi-card reveal" data-v-3773a9fe><p class="text-2xl font-bold text-primary" data-v-3773a9fe>${ssrInterpolate(unref(filteredRoofs).length)}</p><p class="text-xs text-slate-custom" data-v-3773a9fe>Techos encontrados</p></div><div class="kpi-card reveal" data-v-3773a9fe><p class="text-2xl font-bold text-eco" data-v-3773a9fe>${ssrInterpolate(unref(totalFilteredArea).toLocaleString())}</p><p class="text-xs text-slate-custom" data-v-3773a9fe>Superficie total (m2)</p></div><div class="kpi-card reveal" data-v-3773a9fe><p class="text-2xl font-bold text-secondary" data-v-3773a9fe>${ssrInterpolate(unref(activeCount))}</p><p class="text-xs text-slate-custom" data-v-3773a9fe>Techos activos</p></div><div class="kpi-card reveal" data-v-3773a9fe><p class="text-2xl font-bold text-accent" data-v-3773a9fe>${ssrInterpolate(unref(alcaldiaCount))}</p><p class="text-xs text-slate-custom" data-v-3773a9fe>Alcaldías</p></div></div></div></section><section class="py-12" data-v-3773a9fe><div class="container-wide" data-v-3773a9fe>`);
      if (unref(filteredRoofs).length > 0) {
        _push(`<!--[--><div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-v-3773a9fe><!--[-->`);
        ssrRenderList(unref(paginatedRoofs), (roof) => {
          _push(`<div class="card-interactive overflow-hidden animate-fade-in"${ssrRenderAttr("data-tipo", roof.tipoEdificio)} data-v-3773a9fe><div class="relative h-36 overflow-hidden bg-gradient-to-br from-primary-50 to-eco/10" data-v-3773a9fe><img${ssrRenderAttr("src", roofImageSrc(roof))}${ssrRenderAttr("alt", roof.nombre)} class="h-full w-full object-cover" loading="lazy" data-v-3773a9fe><span class="${ssrRenderClass([
            "absolute right-3 top-3 badge",
            unref(estadoBadgeClass)(roof.estado)
          ])}" data-v-3773a9fe>${ssrInterpolate(unref(formatEstado)(roof.estado))}</span></div><div class="p-4" data-v-3773a9fe><div class="mb-2 flex flex-wrap items-center gap-1.5" data-v-3773a9fe><span class="badge-primary" data-v-3773a9fe>${ssrInterpolate(unref(formatTipoTecho)(roof.tipoTechoVerde))}</span><span class="badge-secondary" data-v-3773a9fe>${ssrInterpolate(unref(formatTipoEdificio)(roof.tipoEdificio))}</span></div><h4 class="text-sm font-semibold text-ink leading-tight" data-v-3773a9fe>${ssrInterpolate(roof.nombre)}</h4><p class="mt-1 text-xs text-slate-custom" data-v-3773a9fe>${ssrInterpolate(roof.alcaldia)}</p><div class="mt-3 flex items-center justify-between border-t border-gray-50 pt-3" data-v-3773a9fe><div class="flex items-center gap-1 text-xs text-ink-muted" data-v-3773a9fe><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3773a9fe><rect x="3" y="3" width="18" height="18" rx="2" data-v-3773a9fe></rect></svg> ${ssrInterpolate(roof.superficie?.toLocaleString())} m2 </div><div class="flex items-center gap-1 text-xs text-ink-muted" data-v-3773a9fe><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3773a9fe><circle cx="12" cy="12" r="10" data-v-3773a9fe></circle><polyline points="12 6 12 12 16 14" data-v-3773a9fe></polyline></svg> ${ssrInterpolate(roof.fechaRegistro)}</div></div></div></div>`);
        });
        _push(`<!--]--></div><div class="mt-8" data-v-3773a9fe>`);
        _push(ssrRenderComponent(_component_CommonPaginationControls, {
          "current-page": unref(currentPage),
          "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
          "total-pages": unref(totalPages),
          "total-items": unref(filteredRoofs).length,
          "per-page": perPage
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-20 text-center" data-v-3773a9fe><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100" data-v-3773a9fe><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-3773a9fe><circle cx="11" cy="11" r="8" data-v-3773a9fe></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-3773a9fe></line></svg></div><h3 class="text-lg font-semibold text-ink" data-v-3773a9fe>Sin resultados</h3><p class="mt-2 max-w-sm text-sm text-slate-custom" data-v-3773a9fe> No se encontraron techos verdes con los filtros seleccionados. Intenta ajustar los criterios de búsqueda. </p><button class="btn-outline mt-4" data-v-3773a9fe>Limpiar filtros</button></div>`);
      }
      _push(`</div></section><section class="border-t border-gray-100 bg-white py-6" data-v-3773a9fe><div class="container-wide" data-v-3773a9fe><p class="text-[10px] leading-relaxed text-slate-custom" data-v-3773a9fe> Fotografías de edificios: Wikimedia Commons (CC BY-SA 2.0/3.0/4.0, CC BY 2.0/3.0/4.0, CC0). Autores: Gideonximi, Thelmadatter, Carlos Adampol, keizers, Pequeno mar, Ehecatl Cabrera, ProtoplasmaKid, Umarina, Isaacvp, AlejandroLinaresGarcia, Serge Saint, J.L.Escalante, Sebastianwsk, Tbhotch, Nacasma, CharlhyeMartinez, TonyTheTiger, Emmanuel Berrod/WIPO, Antony-22, Lamiot, SylvieShang, NNECAPA, Jamain. Imágenes genéricas de techos verdes: Wikimedia Commons (CC BY-SA 3.0/4.0, CC BY 2.0/4.0). Foto CIIEMAD: Cervantes Najera (2025), tesis doctoral CIIEMAD-IPN. </p></div></section>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(selectedRoof)) {
          _push2(`<div class="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm" data-v-3773a9fe></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (unref(selectedRoof)) {
          _push2(`<div class="fixed right-0 top-0 z-[101] h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl" data-v-3773a9fe><div class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4" data-v-3773a9fe><h3 class="text-base font-semibold text-ink" data-v-3773a9fe>Detalle del techo verde</h3><button class="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100" data-v-3773a9fe><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-3773a9fe><line x1="18" y1="6" x2="6" y2="18" data-v-3773a9fe></line><line x1="6" y1="6" x2="18" y2="18" data-v-3773a9fe></line></svg></button></div><div class="p-6" data-v-3773a9fe><div class="h-48 overflow-hidden rounded-card bg-gradient-to-br from-primary-50 to-eco/10" data-v-3773a9fe><img${ssrRenderAttr("src", roofImageSrc(unref(selectedRoof)))}${ssrRenderAttr("alt", unref(selectedRoof).nombre)} class="h-full w-full object-cover" data-v-3773a9fe></div><div class="mt-6" data-v-3773a9fe><div class="flex flex-wrap gap-2" data-v-3773a9fe><span class="badge-primary" data-v-3773a9fe>${ssrInterpolate(unref(formatTipoTecho)(unref(selectedRoof).tipoTechoVerde))}</span><span class="badge-secondary" data-v-3773a9fe>${ssrInterpolate(unref(formatTipoEdificio)(unref(selectedRoof).tipoEdificio))}</span><span class="${ssrRenderClass(["badge", unref(estadoBadgeClass)(unref(selectedRoof).estado)])}" data-v-3773a9fe>${ssrInterpolate(unref(formatEstado)(unref(selectedRoof).estado))}</span></div><h2 class="mt-4 text-xl font-bold text-ink" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).nombre)}</h2><p class="mt-1 text-sm text-slate-custom" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).direccion)}</p></div><div class="mt-6 grid grid-cols-2 gap-4" data-v-3773a9fe><div class="rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>Superficie</p><p class="text-lg font-bold text-ink" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).superficie?.toLocaleString())} m2</p></div><div class="rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>Alcaldía</p><p class="text-lg font-bold text-ink" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).alcaldia)}</p></div><div class="rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>Retención de agua</p><p class="text-lg font-bold text-secondary" data-v-3773a9fe>${ssrInterpolate((unref(selectedRoof).retencion_agua_litros || 0).toLocaleString())} L</p></div><div class="rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>CO2 capturado/año</p><p class="text-lg font-bold text-eco" data-v-3773a9fe>${ssrInterpolate((unref(selectedRoof).co2_capturado_kg_anual || 0).toLocaleString())} kg</p></div><div class="rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>Reducción temp.</p><p class="text-lg font-bold text-accent" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).reduccion_temperatura_c)}°C</p></div><div class="rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>Fecha instalación</p><p class="text-lg font-bold text-ink" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).fechaRegistro)}</p></div></div>`);
          if (unref(selectedRoof).especies_vegetales?.length) {
            _push2(`<div class="mt-6" data-v-3773a9fe><h4 class="text-sm font-semibold text-ink" data-v-3773a9fe>Especies vegetales</h4><div class="mt-2 flex flex-wrap gap-1.5" data-v-3773a9fe><!--[-->`);
            ssrRenderList(unref(selectedRoof).especies_vegetales, (sp) => {
              _push2(`<span class="badge bg-eco/10 text-eco-dark italic" data-v-3773a9fe>${ssrInterpolate(sp)}</span>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(selectedRoof).responsable) {
            _push2(`<div class="mt-6" data-v-3773a9fe><h4 class="text-sm font-semibold text-ink" data-v-3773a9fe>Responsable</h4><p class="mt-1 text-sm text-slate-custom" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).responsable)}</p></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(selectedRoof).notas) {
            _push2(`<div class="mt-6" data-v-3773a9fe><h4 class="text-sm font-semibold text-ink" data-v-3773a9fe>Notas</h4><p class="mt-1 text-sm leading-relaxed text-slate-custom" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).notas)}</p></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="mt-6 rounded-card bg-surface p-3" data-v-3773a9fe><p class="text-xs text-slate-custom" data-v-3773a9fe>Coordenadas</p><p class="text-sm font-mono text-ink" data-v-3773a9fe>${ssrInterpolate(unref(selectedRoof).lat)}, ${ssrInterpolate(unref(selectedRoof).lng)}</p></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/inventario/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3773a9fe"]]);
export {
  index as default
};
//# sourceMappingURL=index-DVT-eY8J.js.map
