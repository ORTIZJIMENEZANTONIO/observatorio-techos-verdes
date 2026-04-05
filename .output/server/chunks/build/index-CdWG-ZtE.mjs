import { _ as _sfc_main$1 } from './AdminPipelineBanner-B8R7ys78.mjs';
import { _ as _sfc_main$2 } from './AdminDataTable-KYyoGSZR.mjs';
import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useValidationStore } from './validation-Bc71ZNpI.mjs';
import './PaginationControls-BAcytpD9.mjs';
import 'pinia';
import './mock-source-DMDe05Bu.mjs';
import './mock-roofs-D-tdE7ed.mjs';
import './mock-candidates-Cvvvd8Mv.mjs';
import './mock-validations-qSEi_ZEz.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const validationStore = useValidationStore();
    const loading = ref(true);
    const filterEstado = ref("");
    const columns = [
      { key: "id", label: "ID", class: "w-12" },
      { key: "nombre", label: "Edificio candidato" },
      { key: "estado", label: "Resultado" },
      { key: "confianza", label: "Confianza IA" },
      { key: "porcentajeConfianza", label: "% conf.", class: "text-right tabular-nums w-16" },
      { key: "prediccion", label: "Predicci\xF3n IA" },
      { key: "revisadoPor", label: "Revisado por" },
      { key: "fechaRevision", label: "Fecha" }
    ];
    const rows = computed(() => {
      let data = validationStore.records;
      if (filterEstado.value) {
        data = data.filter((r) => r.estado === filterEstado.value);
      }
      return data.map((r) => {
        var _a;
        return {
          id: r.id,
          nombre: r.nombre,
          prediccion: ((_a = r.prediccion) == null ? void 0 : _a.length) > 50 ? r.prediccion.substring(0, 50) + "..." : r.prediccion || "\u2014",
          confianza: r.confianza,
          porcentajeConfianza: r.porcentajeConfianza,
          estado: r.estado,
          revisadoPor: r.revisadoPor || "\u2014",
          fechaRevision: r.fechaRevision || "\u2014",
          _raw: r
        };
      });
    });
    const estadoOptions = ["pendiente", "confirmado", "rechazado", "indeterminado", "pendiente_reconciliacion"];
    const estadoLabel = {
      pendiente: "Pendiente",
      confirmado: "Confirmado",
      rechazado: "Rechazado",
      indeterminado: "Indeterminado",
      pendiente_reconciliacion: "Reconciliaci\xF3n"
    };
    const stats = computed(() => {
      const r = validationStore.records;
      return {
        total: r.length,
        pendientes: r.filter((v) => v.estado === "pendiente").length,
        confirmados: r.filter((v) => v.estado === "confirmado").length,
        rechazados: r.filter((v) => v.estado === "rechazado").length
      };
    });
    function handleEdit(row) {
      console.log("Edit validation:", row.id);
    }
    function handleDelete(row) {
      if (confirm(`\xBFEliminar validaci\xF3n #${row.id}?`)) {
        console.log("Delete validation:", row.id);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminPipelineBanner = _sfc_main$1;
      const _component_AdminDataTable = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AdminPipelineBanner, {
        "current-step": "validacion",
        description: "Registros de validaci\xF3n t\xE9cnica (IA con Gemini Vision y revisi\xF3n manual) sobre los candidatos. Confirma o rechaza la viabilidad de cada sitio para techo verde."
      }, null, _parent));
      _push(`<div class="mb-6"><h2 class="text-xl font-semibold text-ink sm:text-2xl">Validaciones</h2><p class="mt-1 text-sm text-slate-custom">Control de calidad: revisi\xF3n IA y manual de candidatos antes de implementaci\xF3n</p></div><div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Total</p><p class="text-lg font-bold tabular-nums text-ink">${ssrInterpolate(unref(stats).total)}</p></div><div class="rounded-lg border-l-4 border-l-yellow-400 border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Pendientes</p><p class="text-lg font-bold tabular-nums text-yellow-700">${ssrInterpolate(unref(stats).pendientes)}</p></div><div class="rounded-lg border-l-4 border-l-green-400 border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Confirmados</p><p class="text-lg font-bold tabular-nums text-green-700">${ssrInterpolate(unref(stats).confirmados)}</p></div><div class="rounded-lg border-l-4 border-l-red-400 border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Rechazados</p><p class="text-lg font-bold tabular-nums text-red-700">${ssrInterpolate(unref(stats).rechazados)}</p></div></div><div class="mb-4 flex flex-wrap gap-2"><button class="${ssrRenderClass([!unref(filterEstado) ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3 py-1.5 text-xs font-medium transition-all"])}"> Todos (${ssrInterpolate(unref(stats).total)}) </button><!--[-->`);
      ssrRenderList(estadoOptions, (est) => {
        _push(`<button class="${ssrRenderClass([unref(filterEstado) === est ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3 py-1.5 text-xs font-medium transition-all"])}">${ssrInterpolate(estadoLabel[est] || est)}</button>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(loading),
        "search-placeholder": "Buscar por edificio o revisor...",
        onEdit: handleEdit,
        onDelete: handleDelete
      }, {
        "cell-estado": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([{
              "bg-green-100 text-green-800": value === "confirmado",
              "bg-yellow-100 text-yellow-800": value === "pendiente",
              "bg-red-100 text-red-800": value === "rechazado",
              "bg-purple-100 text-purple-800": value === "pendiente_reconciliacion",
              "bg-gray-100 text-gray-700": value === "indeterminado"
            }, "rounded px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(estadoLabel[value] || value)}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["rounded px-2 py-0.5 text-xs font-medium", {
                  "bg-green-100 text-green-800": value === "confirmado",
                  "bg-yellow-100 text-yellow-800": value === "pendiente",
                  "bg-red-100 text-red-800": value === "rechazado",
                  "bg-purple-100 text-purple-800": value === "pendiente_reconciliacion",
                  "bg-gray-100 text-gray-700": value === "indeterminado"
                }]
              }, toDisplayString(estadoLabel[value] || value), 3)
            ];
          }
        }),
        "cell-confianza": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (value) {
              _push2(`<span class="${ssrRenderClass([{ "text-green-700": value === "alta", "text-yellow-700": value === "media", "text-red-600": value === "baja" }, "inline-flex items-center gap-1 text-xs font-medium"])}"${_scopeId}><span class="${ssrRenderClass([{ "bg-green-500": value === "alta", "bg-yellow-500": value === "media", "bg-red-500": value === "baja" }, "h-2 w-2 rounded-full"])}"${_scopeId}></span> ${ssrInterpolate(value)}</span>`);
            } else {
              _push2(`<span class="text-xs text-gray-400"${_scopeId}>\u2014</span>`);
            }
          } else {
            return [
              value ? (openBlock(), createBlock("span", {
                key: 0,
                class: ["inline-flex items-center gap-1 text-xs font-medium", { "text-green-700": value === "alta", "text-yellow-700": value === "media", "text-red-600": value === "baja" }]
              }, [
                createVNode("span", {
                  class: ["h-2 w-2 rounded-full", { "bg-green-500": value === "alta", "bg-yellow-500": value === "media", "bg-red-500": value === "baja" }]
                }, null, 2),
                createTextVNode(" " + toDisplayString(value), 1)
              ], 2)) : (openBlock(), createBlock("span", {
                key: 1,
                class: "text-xs text-gray-400"
              }, "\u2014"))
            ];
          }
        }),
        "cell-porcentajeConfianza": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (value != null) {
              _push2(`<span class="tabular-nums"${_scopeId}>${ssrInterpolate(value)}%</span>`);
            } else {
              _push2(`<span class="text-gray-400"${_scopeId}>\u2014</span>`);
            }
          } else {
            return [
              value != null ? (openBlock(), createBlock("span", {
                key: 0,
                class: "tabular-nums"
              }, toDisplayString(value) + "%", 1)) : (openBlock(), createBlock("span", {
                key: 1,
                class: "text-gray-400"
              }, "\u2014"))
            ];
          }
        }),
        "cell-prediccion": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xs text-slate-custom"${ssrRenderAttr("title", value)}${_scopeId}>${ssrInterpolate(value)}</span>`);
          } else {
            return [
              createVNode("span", {
                class: "text-xs text-slate-custom",
                title: value
              }, toDisplayString(value), 9, ["title"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/validaciones/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CdWG-ZtE.mjs.map
