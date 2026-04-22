import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SectionTitle",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {},
    centered: { type: Boolean, default: false },
    tag: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["mb-8 md:mb-10", __props.centered ? "text-center" : ""]
      }, _attrs))}>`);
      if (__props.tag) {
        _push(`<span class="mb-3 inline-flex items-center rounded-badge bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in">${ssrInterpolate(__props.tag)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="text-balance animate-slide-up delay-75">${ssrInterpolate(__props.title)}</h2>`);
      if (__props.subtitle) {
        _push(`<p class="${ssrRenderClass([
          "mt-3 text-base leading-relaxed text-slate-custom md:text-lg animate-slide-up delay-150",
          __props.centered ? "mx-auto max-w-2xl" : "max-w-3xl"
        ])}">${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/SectionTitle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SectionTitle-Di4BE9k7.mjs.map
