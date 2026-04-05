import { _ as _sfc_main$1 } from './AdminPipelineBanner-B8R7ys78.mjs';
import { _ as _sfc_main$2 } from './AdminDataTable-KYyoGSZR.mjs';
import { defineComponent, ref, computed, unref, withCtx, openBlock, createBlock, toDisplayString, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { u as useRoofsStore } from './roofs-CmJAoess.mjs';
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
    const store = useRoofsStore();
    const loading = ref(true);
    const columns = [
      { key: "id", label: "ID", class: "w-12" },
      { key: "nombre", label: "Nombre" },
      { key: "alcaldia", label: "Alcald\xEDa" },
      { key: "tipoEdificio", label: "Tipo" },
      { key: "scoreAptitud", label: "Score AHP", class: "text-right tabular-nums" },
      { key: "superficie", label: "m\xB2", class: "text-right tabular-nums" },
      { key: "estatus", label: "Estatus" },
      { key: "confianzaIA", label: "Confianza" },
      { key: "fechaPriorizacion", label: "Priorizado" }
    ];
    const rows = computed(
      () => store.candidateRoofs.map((r) => ({
        id: r.id,
        nombre: r.nombre,
        alcaldia: r.alcaldia,
        tipoEdificio: r.tipoEdificio,
        scoreAptitud: r.scoreAptitud,
        superficie: r.superficie,
        estatus: r.estatus,
        confianzaIA: r.confianzaIA,
        fechaPriorizacion: r.fechaPriorizacion || "\u2014",
        _raw: r
      }))
    );
    const estatusLabel = {
      candidato: "Candidato",
      validado_visualmente: "Validado visual",
      factibilidad_pendiente: "Factib. pendiente",
      piloto: "Piloto",
      implementado: "Implementado"
    };
    function handleEdit(row) {
      console.log("Edit candidate:", row.id);
    }
    function handleDelete(row) {
      if (confirm(`\xBFEliminar candidato "${row.nombre}"?`)) {
        console.log("Delete candidate:", row.id);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminPipelineBanner = _sfc_main$1;
      const _component_AdminDataTable = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AdminPipelineBanner, {
        "current-step": "candidatos",
        description: "Sitios aprobados del detector + candidatos priorizados por an\xE1lisis multicriterio (AHP, 8 variables). Pendientes de validaci\xF3n t\xE9cnica antes de implementaci\xF3n."
      }, null, _parent));
      _push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-xl font-semibold text-ink sm:text-2xl">Candidatos</h2><p class="mt-1 text-sm text-slate-custom">${ssrInterpolate(unref(rows).length)} sitios priorizados \u2014 score AHP de 0 a 100 basado en 8 variables ambientales</p></div><button class="btn-primary flex-shrink-0">+ Agregar</button></div><div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Score promedio</p><p class="text-lg font-bold tabular-nums text-primary">${ssrInterpolate(unref(rows).length ? (unref(rows).reduce((s, r) => s + (r.scoreAptitud || 0), 0) / unref(rows).length).toFixed(1) : "\u2014")}</p></div><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Score &gt;= 70</p><p class="text-lg font-bold tabular-nums text-eco">${ssrInterpolate(unref(rows).filter((r) => r.scoreAptitud >= 70).length)}</p></div><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Superficie total</p><p class="text-lg font-bold tabular-nums text-ink">${ssrInterpolate(unref(rows).reduce((s, r) => s + (r.superficie || 0), 0).toLocaleString("es-MX"))} m\xB2</p></div><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Confianza alta</p><p class="text-lg font-bold tabular-nums text-secondary">${ssrInterpolate(unref(rows).filter((r) => r.confianzaIA === "alta").length)}</p></div></div>`);
      _push(ssrRenderComponent(_component_AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(loading),
        "search-placeholder": "Buscar candidato...",
        onEdit: handleEdit,
        onDelete: handleDelete
      }, {
        "cell-scoreAptitud": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><div class="h-2 w-12 overflow-hidden rounded-full bg-gray-200"${_scopeId}><div class="${ssrRenderClass([value >= 70 ? "bg-green-500" : value >= 40 ? "bg-yellow-500" : "bg-red-400", "h-full rounded-full"])}" style="${ssrRenderStyle({ width: `${value}%` })}"${_scopeId}></div></div><span class="${ssrRenderClass([value >= 70 ? "text-eco" : value >= 40 ? "text-accent" : "text-alert", "font-semibold tabular-nums"])}"${_scopeId}>${ssrInterpolate(value)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode("div", { class: "h-2 w-12 overflow-hidden rounded-full bg-gray-200" }, [
                  createVNode("div", {
                    class: ["h-full rounded-full", value >= 70 ? "bg-green-500" : value >= 40 ? "bg-yellow-500" : "bg-red-400"],
                    style: { width: `${value}%` }
                  }, null, 6)
                ]),
                createVNode("span", {
                  class: ["font-semibold tabular-nums", value >= 70 ? "text-eco" : value >= 40 ? "text-accent" : "text-alert"]
                }, toDisplayString(value), 3)
              ])
            ];
          }
        }),
        "cell-superficie": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(value ? Number(value).toLocaleString("es-MX") : "\u2014")}`);
          } else {
            return [
              createTextVNode(toDisplayString(value ? Number(value).toLocaleString("es-MX") : "\u2014"), 1)
            ];
          }
        }),
        "cell-estatus": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([{
              "bg-blue-100 text-blue-800": value === "candidato",
              "bg-cyan-100 text-cyan-800": value === "validado_visualmente",
              "bg-yellow-100 text-yellow-800": value === "factibilidad_pendiente",
              "bg-purple-100 text-purple-800": value === "piloto",
              "bg-green-100 text-green-800": value === "implementado"
            }, "rounded px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(estatusLabel[value] || value)}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["rounded px-2 py-0.5 text-xs font-medium", {
                  "bg-blue-100 text-blue-800": value === "candidato",
                  "bg-cyan-100 text-cyan-800": value === "validado_visualmente",
                  "bg-yellow-100 text-yellow-800": value === "factibilidad_pendiente",
                  "bg-purple-100 text-purple-800": value === "piloto",
                  "bg-green-100 text-green-800": value === "implementado"
                }]
              }, toDisplayString(estatusLabel[value] || value), 3)
            ];
          }
        }),
        "cell-confianzaIA": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (value) {
              _push2(`<span class="${ssrRenderClass([{
                "bg-green-50 text-green-700": value === "alta",
                "bg-yellow-50 text-yellow-700": value === "media",
                "bg-red-50 text-red-700": value === "baja"
              }, "rounded px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(value)}</span>`);
            } else {
              _push2(`<span class="text-xs text-gray-400"${_scopeId}>\u2014</span>`);
            }
          } else {
            return [
              value ? (openBlock(), createBlock("span", {
                key: 0,
                class: ["rounded px-2 py-0.5 text-xs font-medium", {
                  "bg-green-50 text-green-700": value === "alta",
                  "bg-yellow-50 text-yellow-700": value === "media",
                  "bg-red-50 text-red-700": value === "baja"
                }]
              }, toDisplayString(value), 3)) : (openBlock(), createBlock("span", {
                key: 1,
                class: "text-xs text-gray-400"
              }, "\u2014"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/candidatos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-yXqXmyKk.mjs.map
