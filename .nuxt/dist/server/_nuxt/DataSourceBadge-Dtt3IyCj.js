import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { u as useDataSource } from "./useDataSource-CcCLLLin.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DataSourceBadge",
  __ssrInlineRender: true,
  props: {
    sourceName: {},
    lastUpdated: {}
  },
  setup(__props) {
    const props = __props;
    const { getSourceLabel, getSourceColor } = useDataSource();
    const label = computed(() => {
      const labels = {
        SIGCDMX: "SIGCDMX",
        SEDEMA: "SEDEMA",
        SIMAT: "SIMAT",
        INEGI: "INEGI",
        DatosAbiertos: "Datos Abiertos",
        CONABIO: "CONABIO",
        CONAGUA: "CONAGUA",
        SEMARNAT: "SEMARNAT",
        Mock: "Demo",
        Calculado: "Calculado"
      };
      return labels[props.sourceName] || props.sourceName;
    });
    const color = computed(() => getSourceColor(props.sourceName));
    const tooltipText = computed(() => {
      let text = getSourceLabel(props.sourceName);
      if (props.lastUpdated) {
        text += ` | Actualizado: ${props.lastUpdated}`;
      }
      return text;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: "inline-flex items-center gap-1.5 rounded-badge px-2 py-0.5 text-[10px] font-medium",
        style: { backgroundColor: unref(color) + "15", color: unref(color) },
        title: unref(tooltipText)
      }, _attrs))}><span class="h-1.5 w-1.5 rounded-full" style="${ssrRenderStyle({ backgroundColor: unref(color) })}"></span> ${ssrInterpolate(unref(label))}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/DataSourceBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=DataSourceBadge-Dtt3IyCj.js.map
