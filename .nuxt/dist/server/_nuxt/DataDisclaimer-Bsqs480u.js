import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { u as useDataSource } from "./useDataSource-CcCLLLin.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DataDisclaimer",
  __ssrInlineRender: true,
  props: {
    compact: { type: Boolean }
  },
  setup(__props) {
    const { isMock, disclaimerText } = useDataSource();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "rounded-card border p-4",
          __props.compact ? "py-2.5" : "p-4",
          unref(isMock) ? "border-accent/30 bg-accent/5" : "border-eco/30 bg-eco/5"
        ]
      }, _attrs))}><div class="${ssrRenderClass(["flex gap-3", __props.compact ? "items-center" : "items-start"])}"><div class="${ssrRenderClass([
        "flex shrink-0 items-center justify-center rounded-lg",
        __props.compact ? "h-6 w-6" : "h-8 w-8",
        unref(isMock) ? "bg-accent/10" : "bg-eco/10"
      ])}">`);
      if (unref(isMock)) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([__props.compact ? "h-3.5 w-3.5" : "h-4 w-4", "text-accent"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([__props.compact ? "h-3.5 w-3.5" : "h-4 w-4", "text-eco"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`);
      }
      _push(`</div><div>`);
      if (!__props.compact) {
        _push(`<h4 class="${ssrRenderClass([
          "text-sm font-semibold",
          unref(isMock) ? "text-accent-dark" : "text-eco-dark"
        ])}">${ssrInterpolate(unref(isMock) ? "Datos de demostracion" : "Datos oficiales")}</h4>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass([
        "leading-relaxed text-slate-custom",
        __props.compact ? "text-xs" : "mt-1 text-sm"
      ])}">${ssrInterpolate(unref(disclaimerText))}</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/DataDisclaimer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=DataDisclaimer-Bsqs480u.js.map
