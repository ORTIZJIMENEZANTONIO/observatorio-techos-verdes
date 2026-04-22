import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaginationControls",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {},
    totalItems: {},
    perPage: {}
  },
  emits: ["update:currentPage"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const startItem = computed(() => (props.currentPage - 1) * props.perPage + 1);
    const endItem = computed(() => Math.min(props.currentPage * props.perPage, props.totalItems));
    const visiblePages = computed(() => {
      const pages = [];
      const total = props.totalPages;
      const current = props.currentPage;
      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        if (current > 3) pages.push(-1);
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (current < total - 2) pages.push(-1);
        pages.push(total);
      }
      return pages;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.totalPages > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center gap-3 sm:flex-row sm:justify-between" }, _attrs))}><p class="text-xs text-slate-custom"> Mostrando <span class="font-semibold text-ink tabular-nums">${ssrInterpolate(unref(startItem))}-${ssrInterpolate(unref(endItem))}</span> de <span class="font-semibold text-ink tabular-nums">${ssrInterpolate(__props.totalItems)}</span></p><nav class="flex items-center gap-1" aria-label="Paginación"><button class="${ssrRenderClass([__props.currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-ink-muted hover:bg-gray-100", "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors"])}"${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""} aria-label="Página anterior"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page, idx) => {
          _push(`<!--[-->`);
          if (page === -1) {
            _push(`<span class="px-1 text-xs text-gray-400">...</span>`);
          } else {
            _push(`<button class="${ssrRenderClass([page === __props.currentPage ? "bg-primary text-white" : "text-ink-muted hover:bg-gray-100", "flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-colors"])}">${ssrInterpolate(page)}</button>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><button class="${ssrRenderClass([__props.currentPage === __props.totalPages ? "text-gray-300 cursor-not-allowed" : "text-ink-muted hover:bg-gray-100", "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors"])}"${ssrIncludeBooleanAttr(__props.currentPage === __props.totalPages) ? " disabled" : ""} aria-label="Página siguiente"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></nav></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/PaginationControls.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=PaginationControls-BAcytpD9.js.map
