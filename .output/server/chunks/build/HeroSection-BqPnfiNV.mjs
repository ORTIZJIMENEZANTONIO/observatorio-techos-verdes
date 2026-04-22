import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  props: {
    compact: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["hero-section relative overflow-hidden flex items-center", __props.compact ? "py-10 md:py-12" : "py-12 md:py-16"]
      }, _attrs))} data-v-d6560c11><div class="hero-bg" aria-hidden="true" data-v-d6560c11><span class="lava-orb orb--g1" data-v-d6560c11></span><span class="lava-orb orb--g2" data-v-d6560c11></span><span class="lava-orb orb--g3" data-v-d6560c11></span><span class="lava-orb orb--a1" data-v-d6560c11></span></div><div class="container-wide relative z-10" data-v-d6560c11>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/HeroSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6560c11"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=HeroSection-BqPnfiNV.mjs.map
