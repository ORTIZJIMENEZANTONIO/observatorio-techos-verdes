import { _ as _sfc_main$1 } from './PaginationControls-BAcytpD9.mjs';
import { defineComponent, ref, computed, watch, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminDataTable",
  __ssrInlineRender: true,
  props: {
    columns: {},
    rows: {},
    loading: { type: Boolean },
    searchPlaceholder: {},
    defaultPerPage: { default: 15 }
  },
  emits: ["edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const search = ref("");
    const currentPage = ref(1);
    const perPage = ref(props.defaultPerPage);
    const sortCol = ref("");
    const sortDir = ref("desc");
    const filtered = computed(() => {
      if (!search.value) return props.rows;
      const q = search.value.toLowerCase();
      return props.rows.filter(
        (row) => props.columns.some((col) => {
          const val = row[col.key];
          return val && String(val).toLowerCase().includes(q);
        })
      );
    });
    const sorted = computed(() => {
      const data = [...filtered.value];
      if (!sortCol.value) return data;
      const dir = sortDir.value === "asc" ? 1 : -1;
      return data.sort((a, b) => {
        const va = a[sortCol.value];
        const vb = b[sortCol.value];
        if (va == null && vb == null) return 0;
        if (va == null) return dir;
        if (vb == null) return -dir;
        if (typeof va === "number" && typeof vb === "number") return dir * (va - vb);
        return dir * String(va).localeCompare(String(vb));
      });
    });
    const totalPages = computed(() => Math.ceil(sorted.value.length / perPage.value) || 1);
    const paginated = computed(() => sorted.value.slice((currentPage.value - 1) * perPage.value, currentPage.value * perPage.value));
    watch([search, () => props.rows, perPage], () => {
      currentPage.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginationControls = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-38bc9c8d><div class="mb-4 flex flex-wrap items-center gap-3" data-v-38bc9c8d><div class="relative w-full sm:max-w-xs sm:flex-1" data-v-38bc9c8d><svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-38bc9c8d><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-38bc9c8d></path></svg><input${ssrRenderAttr("value", unref(search))} type="text"${ssrRenderAttr("placeholder", __props.searchPlaceholder || "Buscar...")} class="input w-full pl-9 transition-shadow duration-200 focus:ring-2 focus:ring-primary/20" data-v-38bc9c8d></div><span class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-slate-custom" data-v-38bc9c8d><span class="tabular-nums font-semibold text-ink" data-v-38bc9c8d>${ssrInterpolate(unref(filtered).length)}</span><span data-v-38bc9c8d>${ssrInterpolate(unref(filtered).length === 1 ? "registro" : "registros")}</span></span><div class="ml-auto flex items-center gap-1.5" data-v-38bc9c8d><label class="text-xs text-slate-custom whitespace-nowrap" data-v-38bc9c8d>Por p\xE1gina:</label><select class="select !py-1 !pl-2 !pr-7 text-xs w-[70px]" data-v-38bc9c8d><option${ssrRenderAttr("value", 10)} data-v-38bc9c8d${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 10) : ssrLooseEqual(unref(perPage), 10)) ? " selected" : ""}>10</option><option${ssrRenderAttr("value", 15)} data-v-38bc9c8d${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 15) : ssrLooseEqual(unref(perPage), 15)) ? " selected" : ""}>15</option><option${ssrRenderAttr("value", 25)} data-v-38bc9c8d${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 25) : ssrLooseEqual(unref(perPage), 25)) ? " selected" : ""}>25</option><option${ssrRenderAttr("value", 50)} data-v-38bc9c8d${ssrIncludeBooleanAttr(Array.isArray(unref(perPage)) ? ssrLooseContain(unref(perPage), 50) : ssrLooseEqual(unref(perPage), 50)) ? " selected" : ""}>50</option></select></div></div>`);
      ssrRenderSlot(_ctx.$slots, "filters", {}, null, _push, _parent);
      _push(`<div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-lg border border-gray-200" data-v-38bc9c8d><table class="table-base w-full min-w-[640px]" data-v-38bc9c8d><thead data-v-38bc9c8d><tr class="bg-gray-50" data-v-38bc9c8d><!--[-->`);
      ssrRenderList(__props.columns, (col) => {
        _push(`<th class="${ssrRenderClass([col.class, "cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap"])}" data-v-38bc9c8d>${ssrInterpolate(col.label)}<span class="ml-0.5 text-[10px] opacity-60 inline-block w-3 text-center" data-v-38bc9c8d>${ssrInterpolate(unref(sortCol) === col.key ? unref(sortDir) === "asc" ? "\u2191" : "\u2193" : "")}</span></th>`);
      });
      _push(`<!--]--><th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500" data-v-38bc9c8d> Acciones </th></tr></thead><tbody class="divide-y divide-gray-100" data-v-38bc9c8d>`);
      if (__props.loading) {
        _push(`<tr data-v-38bc9c8d><td${ssrRenderAttr("colspan", __props.columns.length + 1)} class="px-4 py-12 text-center" data-v-38bc9c8d><div class="flex flex-col items-center gap-3" data-v-38bc9c8d><svg class="h-8 w-8 animate-spin text-primary/40" fill="none" viewBox="0 0 24 24" data-v-38bc9c8d><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-38bc9c8d></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-v-38bc9c8d></path></svg><span class="text-sm text-gray-400" data-v-38bc9c8d>Cargando registros...</span></div></td></tr>`);
      } else if (unref(filtered).length === 0) {
        _push(`<tr data-v-38bc9c8d><td${ssrRenderAttr("colspan", __props.columns.length + 1)} class="px-4 py-12 text-center" data-v-38bc9c8d><div class="flex flex-col items-center gap-3" data-v-38bc9c8d><div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100" data-v-38bc9c8d><svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-38bc9c8d><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-38bc9c8d></path></svg></div><div data-v-38bc9c8d><p class="text-sm font-medium text-gray-500" data-v-38bc9c8d>Sin resultados</p>`);
        if (unref(search)) {
          _push(`<p class="mt-0.5 text-xs text-gray-400" data-v-38bc9c8d>Intenta con otro termino de busqueda</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(paginated), (row) => {
        _push(`<tr class="group transition-colors duration-150 hover:bg-primary-50/30" data-v-38bc9c8d><!--[-->`);
        ssrRenderList(__props.columns, (col) => {
          _push(`<td class="${ssrRenderClass([col.class, "px-4 py-3 text-sm text-ink"])}" data-v-38bc9c8d>`);
          ssrRenderSlot(_ctx.$slots, `cell-${col.key}`, {
            row,
            value: row[col.key]
          }, () => {
            var _a;
            _push(`${ssrInterpolate((_a = row[col.key]) != null ? _a : "\u2014")}`);
          }, _push, _parent);
          _push(`</td>`);
        });
        _push(`<!--]--><td class="px-4 py-3 text-right" data-v-38bc9c8d><div class="flex items-center justify-end gap-1 opacity-100 sm:opacity-60 transition-opacity duration-150 group-hover:opacity-100" data-v-38bc9c8d><button class="rounded-md p-2.5 sm:p-1.5 text-gray-400 transition-all duration-150 hover:bg-primary-50 hover:text-primary hover:shadow-sm" title="Editar" data-v-38bc9c8d><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-38bc9c8d><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-38bc9c8d></path></svg></button><button class="rounded-md p-2.5 sm:p-1.5 text-gray-400 transition-all duration-150 hover:bg-red-50 hover:text-red-600 hover:shadow-sm" title="Eliminar" data-v-38bc9c8d><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-38bc9c8d><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-38bc9c8d></path></svg></button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-4" data-v-38bc9c8d>`);
      _push(ssrRenderComponent(_component_CommonPaginationControls, {
        "current-page": unref(currentPage),
        "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
        "total-pages": unref(totalPages),
        "total-items": unref(sorted).length,
        "per-page": unref(perPage)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminDataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38bc9c8d"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=AdminDataTable-CcSZsN3o.mjs.map
