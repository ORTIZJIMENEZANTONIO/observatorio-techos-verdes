import { _ as _sfc_main$1 } from "./AdminPipelineBanner-B8R7ys78.js";
import { _ as __nuxt_component_1 } from "./AdminDataTable-CcSZsN3o.js";
import { defineComponent, ref, reactive, computed, unref, withCtx, createVNode, withModifiers, openBlock, createBlock, toDisplayString, createTextVNode, withDirectives, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/hookable/dist/index.mjs";
import { u as useRoofsStore } from "./roofs-DoyVCM_d.js";
import "./PaginationControls-BAcytpD9.js";
import "../server.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/unctx/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ufo/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/klona/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/@unhead/vue/dist/index.mjs";
import "./mock-source-DMDe05Bu.js";
import "./mock-roofs-D-tdE7ed.js";
import "./mock-candidates-Cvvvd8Mv.js";
import "./mock-validations-qSEi_ZEz.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useRoofsStore();
    const loading = ref(true);
    const advFilter = reactive({ estatus: "", confianzaIA: "", visibilidad: "", archivo: "" });
    const hasAdvFilters = computed(() => Object.values(advFilter).some((v) => !!v));
    function clearAdvFilters() {
      Object.assign(advFilter, { estatus: "", confianzaIA: "", visibilidad: "", archivo: "" });
    }
    function toggleVisible(row) {
      store.updateCandidate(row.id, { visible: !(row.visible ?? true) });
    }
    function toggleArchivado(row) {
      store.updateCandidate(row.id, { archivado: !row.archivado });
    }
    const columns = [
      { key: "id", label: "ID", class: "w-12" },
      { key: "nombre", label: "Nombre" },
      { key: "alcaldia", label: "Alcaldía" },
      { key: "tipoEdificio", label: "Tipo" },
      { key: "scoreAptitud", label: "Score AHP", class: "text-right tabular-nums" },
      { key: "superficie", label: "m²", class: "text-right tabular-nums" },
      { key: "estatus", label: "Estatus" },
      { key: "confianzaIA", label: "Confianza" },
      { key: "fechaPriorizacion", label: "Priorizado" },
      { key: "visible", label: "Visible", class: "w-20 text-center" },
      { key: "archivado", label: "Archivado", class: "w-20 text-center" }
    ];
    const rows = computed(
      () => store.candidateRoofs.filter((r) => {
        if (advFilter.estatus && r.estatus !== advFilter.estatus) return false;
        if (advFilter.confianzaIA && r.confianzaIA !== advFilter.confianzaIA) return false;
        if (advFilter.visibilidad === "visible" && r.visible === false) return false;
        if (advFilter.visibilidad === "oculto" && r.visible !== false) return false;
        if (advFilter.archivo === "activo" && r.archivado) return false;
        if (advFilter.archivo === "archivado" && !r.archivado) return false;
        return true;
      }).map((r) => ({
        id: r.id,
        nombre: r.nombre,
        alcaldia: r.alcaldia,
        tipoEdificio: r.tipoEdificio,
        scoreAptitud: r.scoreAptitud,
        superficie: r.superficie,
        estatus: r.estatus,
        confianzaIA: r.confianzaIA,
        fechaPriorizacion: r.fechaPriorizacion || "—",
        visible: r.visible,
        archivado: r.archivado,
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
      if (confirm(`¿Eliminar candidato "${row.nombre}"?`)) {
        console.log("Delete candidate:", row.id);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminPipelineBanner = _sfc_main$1;
      const _component_AdminDataTable = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AdminPipelineBanner, {
        "current-step": "candidatos",
        description: "Sitios aprobados del detector + candidatos priorizados por análisis multicriterio (AHP, 8 variables). Pendientes de validación técnica antes de implementación."
      }, null, _parent));
      _push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-xl font-semibold text-ink sm:text-2xl">Candidatos</h2><p class="mt-1 text-sm text-slate-custom">${ssrInterpolate(unref(rows).length)} sitios priorizados — score AHP de 0 a 100 basado en 8 variables ambientales</p></div><button class="btn-primary flex-shrink-0">+ Agregar</button></div><div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Score promedio</p><p class="text-lg font-bold tabular-nums text-primary">${ssrInterpolate(unref(rows).length ? (unref(rows).reduce((s, r) => s + (r.scoreAptitud || 0), 0) / unref(rows).length).toFixed(1) : "—")}</p></div><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Score &gt;= 70</p><p class="text-lg font-bold tabular-nums text-eco">${ssrInterpolate(unref(rows).filter((r) => r.scoreAptitud >= 70).length)}</p></div><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Superficie total</p><p class="text-lg font-bold tabular-nums text-ink">${ssrInterpolate(unref(rows).reduce((s, r) => s + (r.superficie || 0), 0).toLocaleString("es-MX"))} m²</p></div><div class="rounded-lg border border-gray-200 bg-white p-3"><p class="text-xs text-slate-custom">Confianza alta</p><p class="text-lg font-bold tabular-nums text-secondary">${ssrInterpolate(unref(rows).filter((r) => r.confianzaIA === "alta").length)}</p></div></div>`);
      _push(ssrRenderComponent(_component_AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(loading),
        "search-placeholder": "Buscar candidato...",
        onEdit: handleEdit,
        onDelete: handleDelete
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex flex-wrap items-center gap-2"${_scopeId}><select class="select !py-1.5 text-xs max-w-[180px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estatus) ? ssrLooseContain(unref(advFilter).estatus, "") : ssrLooseEqual(unref(advFilter).estatus, "")) ? " selected" : ""}${_scopeId}>Todos los estatus</option><option value="candidato"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estatus) ? ssrLooseContain(unref(advFilter).estatus, "candidato") : ssrLooseEqual(unref(advFilter).estatus, "candidato")) ? " selected" : ""}${_scopeId}>Candidato</option><option value="validado_visualmente"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estatus) ? ssrLooseContain(unref(advFilter).estatus, "validado_visualmente") : ssrLooseEqual(unref(advFilter).estatus, "validado_visualmente")) ? " selected" : ""}${_scopeId}>Validado visual</option><option value="factibilidad_pendiente"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estatus) ? ssrLooseContain(unref(advFilter).estatus, "factibilidad_pendiente") : ssrLooseEqual(unref(advFilter).estatus, "factibilidad_pendiente")) ? " selected" : ""}${_scopeId}>Factib. pendiente</option><option value="piloto"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estatus) ? ssrLooseContain(unref(advFilter).estatus, "piloto") : ssrLooseEqual(unref(advFilter).estatus, "piloto")) ? " selected" : ""}${_scopeId}>Piloto</option><option value="implementado"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estatus) ? ssrLooseContain(unref(advFilter).estatus, "implementado") : ssrLooseEqual(unref(advFilter).estatus, "implementado")) ? " selected" : ""}${_scopeId}>Implementado</option></select><select class="select !py-1.5 text-xs max-w-[140px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).confianzaIA) ? ssrLooseContain(unref(advFilter).confianzaIA, "") : ssrLooseEqual(unref(advFilter).confianzaIA, "")) ? " selected" : ""}${_scopeId}>Confianza: todos</option><option value="alta"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).confianzaIA) ? ssrLooseContain(unref(advFilter).confianzaIA, "alta") : ssrLooseEqual(unref(advFilter).confianzaIA, "alta")) ? " selected" : ""}${_scopeId}>Alta</option><option value="media"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).confianzaIA) ? ssrLooseContain(unref(advFilter).confianzaIA, "media") : ssrLooseEqual(unref(advFilter).confianzaIA, "media")) ? " selected" : ""}${_scopeId}>Media</option><option value="baja"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).confianzaIA) ? ssrLooseContain(unref(advFilter).confianzaIA, "baja") : ssrLooseEqual(unref(advFilter).confianzaIA, "baja")) ? " selected" : ""}${_scopeId}>Baja</option></select><select class="select !py-1.5 text-xs max-w-[140px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).visibilidad) ? ssrLooseContain(unref(advFilter).visibilidad, "") : ssrLooseEqual(unref(advFilter).visibilidad, "")) ? " selected" : ""}${_scopeId}>Visibilidad: todos</option><option value="visible"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).visibilidad) ? ssrLooseContain(unref(advFilter).visibilidad, "visible") : ssrLooseEqual(unref(advFilter).visibilidad, "visible")) ? " selected" : ""}${_scopeId}>Solo visibles</option><option value="oculto"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).visibilidad) ? ssrLooseContain(unref(advFilter).visibilidad, "oculto") : ssrLooseEqual(unref(advFilter).visibilidad, "oculto")) ? " selected" : ""}${_scopeId}>Solo ocultos</option></select><select class="select !py-1.5 text-xs max-w-[140px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).archivo) ? ssrLooseContain(unref(advFilter).archivo, "") : ssrLooseEqual(unref(advFilter).archivo, "")) ? " selected" : ""}${_scopeId}>Archivo: todos</option><option value="activo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).archivo) ? ssrLooseContain(unref(advFilter).archivo, "activo") : ssrLooseEqual(unref(advFilter).archivo, "activo")) ? " selected" : ""}${_scopeId}>Solo activos</option><option value="archivado"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).archivo) ? ssrLooseContain(unref(advFilter).archivo, "archivado") : ssrLooseEqual(unref(advFilter).archivo, "archivado")) ? " selected" : ""}${_scopeId}>Solo archivados</option></select>`);
            if (unref(hasAdvFilters)) {
              _push2(`<button class="btn-ghost !py-1 text-xs"${_scopeId}>Limpiar filtros</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 flex flex-wrap items-center gap-2" }, [
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(advFilter).estatus = $event,
                  class: "select !py-1.5 text-xs max-w-[180px]"
                }, [
                  createVNode("option", { value: "" }, "Todos los estatus"),
                  createVNode("option", { value: "candidato" }, "Candidato"),
                  createVNode("option", { value: "validado_visualmente" }, "Validado visual"),
                  createVNode("option", { value: "factibilidad_pendiente" }, "Factib. pendiente"),
                  createVNode("option", { value: "piloto" }, "Piloto"),
                  createVNode("option", { value: "implementado" }, "Implementado")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(advFilter).estatus]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(advFilter).confianzaIA = $event,
                  class: "select !py-1.5 text-xs max-w-[140px]"
                }, [
                  createVNode("option", { value: "" }, "Confianza: todos"),
                  createVNode("option", { value: "alta" }, "Alta"),
                  createVNode("option", { value: "media" }, "Media"),
                  createVNode("option", { value: "baja" }, "Baja")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(advFilter).confianzaIA]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(advFilter).visibilidad = $event,
                  class: "select !py-1.5 text-xs max-w-[140px]"
                }, [
                  createVNode("option", { value: "" }, "Visibilidad: todos"),
                  createVNode("option", { value: "visible" }, "Solo visibles"),
                  createVNode("option", { value: "oculto" }, "Solo ocultos")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(advFilter).visibilidad]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(advFilter).archivo = $event,
                  class: "select !py-1.5 text-xs max-w-[140px]"
                }, [
                  createVNode("option", { value: "" }, "Archivo: todos"),
                  createVNode("option", { value: "activo" }, "Solo activos"),
                  createVNode("option", { value: "archivado" }, "Solo archivados")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(advFilter).archivo]
                ]),
                unref(hasAdvFilters) ? (openBlock(), createBlock("button", {
                  key: 0,
                  onClick: clearAdvFilters,
                  class: "btn-ghost !py-1 text-xs"
                }, "Limpiar filtros")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
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
            _push2(`${ssrInterpolate(value ? Number(value).toLocaleString("es-MX") : "—")}`);
          } else {
            return [
              createTextVNode(toDisplayString(value ? Number(value).toLocaleString("es-MX") : "—"), 1)
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
              _push2(`<span class="text-xs text-gray-400"${_scopeId}>—</span>`);
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
              }, "—"))
            ];
          }
        }),
        "cell-visible": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([row.visible ?? true ? "text-eco hover:bg-eco/10" : "text-gray-300 hover:bg-gray-100", "mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors"])}"${_scopeId}>`);
            if (row.visible ?? true) {
              _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"${_scopeId}></path></svg>`);
            }
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                onClick: withModifiers(($event) => toggleVisible(row), ["stop"]),
                class: ["mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors", row.visible ?? true ? "text-eco hover:bg-eco/10" : "text-gray-300 hover:bg-gray-100"]
              }, [
                row.visible ?? true ? (openBlock(), createBlock("svg", {
                  key: 0,
                  class: "h-4 w-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  }),
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  })
                ])) : (openBlock(), createBlock("svg", {
                  key: 1,
                  class: "h-4 w-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  })
                ]))
              ], 10, ["onClick"])
            ];
          }
        }),
        "cell-archivado": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([row.archivado ? "text-accent hover:bg-accent/10" : "text-gray-300 hover:bg-gray-100", "mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors"])}"${_scopeId}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", {
                onClick: withModifiers(($event) => toggleArchivado(row), ["stop"]),
                class: ["mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors", row.archivado ? "text-accent hover:bg-accent/10" : "text-gray-300 hover:bg-gray-100"]
              }, [
                (openBlock(), createBlock("svg", {
                  class: "h-4 w-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  })
                ]))
              ], 10, ["onClick"])
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DpjFA1zi.js.map
