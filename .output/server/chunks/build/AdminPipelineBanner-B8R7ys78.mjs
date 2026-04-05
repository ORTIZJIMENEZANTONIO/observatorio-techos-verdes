import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminPipelineBanner",
  __ssrInlineRender: true,
  props: {
    currentStep: {},
    description: {}
  },
  setup(__props) {
    const steps = [
      { id: "detector", label: "Detector" },
      { id: "prospectos", label: "Prospectos" },
      { id: "candidatos", label: "Candidatos" },
      { id: "validacion", label: "Validacion" },
      { id: "inventario", label: "Inventario" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm" }, _attrs))}><div class="flex flex-wrap items-center gap-1.5 text-xs sm:gap-2"><!--[-->`);
      ssrRenderList(steps, (step, i) => {
        _push(`<!--[--><span class="${ssrRenderClass([step.id === __props.currentStep ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-500", "rounded px-2 py-1 font-medium transition-colors"])}">${ssrInterpolate(step.label)}</span>`);
        if (i < steps.length - 1) {
          _push(`<span class="text-gray-300 select-none"> \u2192 </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><p class="mt-2.5 text-sm leading-relaxed text-slate-custom">${ssrInterpolate(__props.description)}</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminPipelineBanner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AdminPipelineBanner-B8R7ys78.mjs.map
