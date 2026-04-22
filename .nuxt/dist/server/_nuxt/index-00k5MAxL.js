import { _ as _sfc_main$1 } from "./AdminPipelineBanner-B8R7ys78.js";
import { _ as __nuxt_component_1 } from "./AdminDataTable-CcSZsN3o.js";
import { defineComponent, ref, reactive, computed, unref, withCtx, createVNode, withModifiers, openBlock, createBlock, createTextVNode, toDisplayString, withDirectives, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport } from "vue/server-renderer";
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
    const advFilter = reactive({ alcaldia: "", tipoEdificio: "", tipoTechoVerde: "", estado: "", visibilidad: "", archivo: "" });
    const hasAdvFilters = computed(() => Object.values(advFilter).some((v) => !!v));
    function clearAdvFilters() {
      Object.assign(advFilter, { alcaldia: "", tipoEdificio: "", tipoTechoVerde: "", estado: "", visibilidad: "", archivo: "" });
    }
    const columns = [
      { key: "id", label: "ID", class: "w-16" },
      { key: "nombre", label: "Nombre" },
      { key: "alcaldia", label: "Alcaldía" },
      { key: "tipoEdificio", label: "Tipo edificio" },
      { key: "tipoTechoVerde", label: "Tipo techo" },
      { key: "superficie", label: "m²", class: "text-right tabular-nums" },
      { key: "estado", label: "Estado" },
      { key: "fechaRegistro", label: "Fecha" },
      { key: "visible", label: "Visible", class: "w-20 text-center" },
      { key: "archivado", label: "Archivado", class: "w-20 text-center" }
    ];
    function toggleVisible(row) {
      const newVal = !(row.visible ?? true);
      store.updateGreenRoof(row.id, { visible: newVal });
    }
    function toggleArchivado(row) {
      store.updateGreenRoof(row.id, { archivado: !row.archivado });
    }
    const rows = computed(
      () => store.greenRoofs.filter((r) => {
        if (advFilter.alcaldia && r.alcaldia !== advFilter.alcaldia) return false;
        if (advFilter.tipoEdificio && r.tipoEdificio !== advFilter.tipoEdificio) return false;
        if (advFilter.tipoTechoVerde && r.tipoTechoVerde !== advFilter.tipoTechoVerde) return false;
        if (advFilter.estado && r.estado !== advFilter.estado) return false;
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
        tipoTechoVerde: r.tipoTechoVerde,
        superficie: r.superficie,
        estado: r.estado,
        fechaRegistro: r.fechaRegistro || "—",
        visible: r.visible,
        archivado: r.archivado,
        _raw: r
      }))
    );
    const showForm = ref(false);
    const editingId = ref(null);
    const form = reactive({
      nombre: "",
      alcaldia: "",
      direccion: "",
      tipoEdificio: "",
      tipoTechoVerde: "extensivo",
      superficie: null,
      estado: "activo",
      lat: 19.4326,
      lng: -99.1332,
      imagen: "",
      descripcion: ""
    });
    function handleEdit(row) {
      const r = row._raw || row;
      editingId.value = r.id;
      Object.assign(form, {
        nombre: r.nombre || "",
        alcaldia: r.alcaldia || "",
        direccion: r.direccion || "",
        tipoEdificio: r.tipoEdificio || "",
        tipoTechoVerde: r.tipoTechoVerde || "extensivo",
        superficie: r.superficie,
        estado: r.estado || "activo",
        lat: r.lat ?? 19.4326,
        lng: r.lng ?? -99.1332,
        imagen: r.imagen || "",
        descripcion: r.descripcion || ""
      });
      showForm.value = true;
    }
    function handleDelete(row) {
      if (confirm(`¿Eliminar "${row.nombre}" del inventario?`)) {
        console.log("Delete:", row.id);
      }
    }
    const tipoTechoLabel = {
      extensivo: "Extensivo",
      intensivo: "Intensivo",
      "semi-intensivo": "Semi-intensivo"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminPipelineBanner = _sfc_main$1;
      const _component_AdminDataTable = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AdminPipelineBanner, {
        "current-step": "inventario",
        description: "Techos verdes existentes e implementados en la CDMX. Estos son los que se muestran en el mapa público del observatorio."
      }, null, _parent));
      _push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-xl font-semibold text-ink sm:text-2xl">Inventario de techos verdes</h2><p class="mt-1 text-sm text-slate-custom">${ssrInterpolate(unref(rows).length)} techos verdes implementados — visibles en el mapa público</p></div><button class="btn-primary flex-shrink-0">+ Agregar</button></div>`);
      _push(ssrRenderComponent(_component_AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(loading),
        "search-placeholder": "Buscar por nombre, alcaldía...",
        onEdit: handleEdit,
        onDelete: handleDelete
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex flex-wrap items-center gap-2"${_scopeId}><select class="select !py-1.5 text-xs max-w-[180px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).tipoTechoVerde) ? ssrLooseContain(unref(advFilter).tipoTechoVerde, "") : ssrLooseEqual(unref(advFilter).tipoTechoVerde, "")) ? " selected" : ""}${_scopeId}>Todos los tipos</option><option value="extensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).tipoTechoVerde) ? ssrLooseContain(unref(advFilter).tipoTechoVerde, "extensivo") : ssrLooseEqual(unref(advFilter).tipoTechoVerde, "extensivo")) ? " selected" : ""}${_scopeId}>Extensivo</option><option value="intensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).tipoTechoVerde) ? ssrLooseContain(unref(advFilter).tipoTechoVerde, "intensivo") : ssrLooseEqual(unref(advFilter).tipoTechoVerde, "intensivo")) ? " selected" : ""}${_scopeId}>Intensivo</option><option value="semi-intensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).tipoTechoVerde) ? ssrLooseContain(unref(advFilter).tipoTechoVerde, "semi-intensivo") : ssrLooseEqual(unref(advFilter).tipoTechoVerde, "semi-intensivo")) ? " selected" : ""}${_scopeId}>Semi-intensivo</option></select><select class="select !py-1.5 text-xs max-w-[160px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estado) ? ssrLooseContain(unref(advFilter).estado, "") : ssrLooseEqual(unref(advFilter).estado, "")) ? " selected" : ""}${_scopeId}>Todos los estados</option><option value="activo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estado) ? ssrLooseContain(unref(advFilter).estado, "activo") : ssrLooseEqual(unref(advFilter).estado, "activo")) ? " selected" : ""}${_scopeId}>Activo</option><option value="en_mantenimiento"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estado) ? ssrLooseContain(unref(advFilter).estado, "en_mantenimiento") : ssrLooseEqual(unref(advFilter).estado, "en_mantenimiento")) ? " selected" : ""}${_scopeId}>En mantenimiento</option><option value="inactivo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estado) ? ssrLooseContain(unref(advFilter).estado, "inactivo") : ssrLooseEqual(unref(advFilter).estado, "inactivo")) ? " selected" : ""}${_scopeId}>Inactivo</option><option value="nuevo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).estado) ? ssrLooseContain(unref(advFilter).estado, "nuevo") : ssrLooseEqual(unref(advFilter).estado, "nuevo")) ? " selected" : ""}${_scopeId}>Nuevo</option></select><select class="select !py-1.5 text-xs max-w-[140px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).visibilidad) ? ssrLooseContain(unref(advFilter).visibilidad, "") : ssrLooseEqual(unref(advFilter).visibilidad, "")) ? " selected" : ""}${_scopeId}>Visibilidad: todos</option><option value="visible"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).visibilidad) ? ssrLooseContain(unref(advFilter).visibilidad, "visible") : ssrLooseEqual(unref(advFilter).visibilidad, "visible")) ? " selected" : ""}${_scopeId}>Solo visibles</option><option value="oculto"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).visibilidad) ? ssrLooseContain(unref(advFilter).visibilidad, "oculto") : ssrLooseEqual(unref(advFilter).visibilidad, "oculto")) ? " selected" : ""}${_scopeId}>Solo ocultos</option></select><select class="select !py-1.5 text-xs max-w-[140px]"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).archivo) ? ssrLooseContain(unref(advFilter).archivo, "") : ssrLooseEqual(unref(advFilter).archivo, "")) ? " selected" : ""}${_scopeId}>Archivo: todos</option><option value="activo"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).archivo) ? ssrLooseContain(unref(advFilter).archivo, "activo") : ssrLooseEqual(unref(advFilter).archivo, "activo")) ? " selected" : ""}${_scopeId}>Solo activos</option><option value="archivado"${ssrIncludeBooleanAttr(Array.isArray(unref(advFilter).archivo) ? ssrLooseContain(unref(advFilter).archivo, "archivado") : ssrLooseEqual(unref(advFilter).archivo, "archivado")) ? " selected" : ""}${_scopeId}>Solo archivados</option></select>`);
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
                  "onUpdate:modelValue": ($event) => unref(advFilter).tipoTechoVerde = $event,
                  class: "select !py-1.5 text-xs max-w-[180px]"
                }, [
                  createVNode("option", { value: "" }, "Todos los tipos"),
                  createVNode("option", { value: "extensivo" }, "Extensivo"),
                  createVNode("option", { value: "intensivo" }, "Intensivo"),
                  createVNode("option", { value: "semi-intensivo" }, "Semi-intensivo")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(advFilter).tipoTechoVerde]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => unref(advFilter).estado = $event,
                  class: "select !py-1.5 text-xs max-w-[160px]"
                }, [
                  createVNode("option", { value: "" }, "Todos los estados"),
                  createVNode("option", { value: "activo" }, "Activo"),
                  createVNode("option", { value: "en_mantenimiento" }, "En mantenimiento"),
                  createVNode("option", { value: "inactivo" }, "Inactivo"),
                  createVNode("option", { value: "nuevo" }, "Nuevo")
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(advFilter).estado]
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
        "cell-tipoTechoVerde": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="rounded bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary"${_scopeId}>${ssrInterpolate(tipoTechoLabel[value] || value)}</span>`);
          } else {
            return [
              createVNode("span", { class: "rounded bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary" }, toDisplayString(tipoTechoLabel[value] || value), 1)
            ];
          }
        }),
        "cell-estado": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([{
              "bg-green-100 text-green-800": value === "activo",
              "bg-yellow-100 text-yellow-800": value === "mantenimiento",
              "bg-red-100 text-red-800": value === "inactivo",
              "bg-blue-100 text-blue-800": value === "nuevo"
            }, "rounded px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(value)}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["rounded px-2 py-0.5 text-xs font-medium", {
                  "bg-green-100 text-green-800": value === "activo",
                  "bg-yellow-100 text-yellow-800": value === "mantenimiento",
                  "bg-red-100 text-red-800": value === "inactivo",
                  "bg-blue-100 text-blue-800": value === "nuevo"
                }]
              }, toDisplayString(value), 3)
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
        "cell-visible": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([row.visible ?? true ? "text-eco hover:bg-eco/10" : "text-gray-300 hover:bg-gray-100", "mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors"])}"${ssrRenderAttr("title", row.visible ?? true ? "Visible — clic para ocultar" : "Oculto — clic para mostrar")}${_scopeId}>`);
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
                class: ["mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors", row.visible ?? true ? "text-eco hover:bg-eco/10" : "text-gray-300 hover:bg-gray-100"],
                title: row.visible ?? true ? "Visible — clic para ocultar" : "Oculto — clic para mostrar"
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
              ], 10, ["onClick", "title"])
            ];
          }
        }),
        "cell-archivado": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([row.archivado ? "text-accent hover:bg-accent/10" : "text-gray-300 hover:bg-gray-100", "mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors"])}"${ssrRenderAttr("title", row.archivado ? "Archivado — clic para restaurar" : "Activo — clic para archivar")}${_scopeId}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", {
                onClick: withModifiers(($event) => toggleArchivado(row), ["stop"]),
                class: ["mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors", row.archivado ? "text-accent hover:bg-accent/10" : "text-gray-300 hover:bg-gray-100"],
                title: row.archivado ? "Archivado — clic para restaurar" : "Activo — clic para archivar"
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
              ], 10, ["onClick", "title"])
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showForm)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"><div class="card max-h-[90vh] w-full max-w-lg animate-scale-in overflow-y-auto p-5 shadow-panel sm:p-6"><h3 class="mb-4 text-lg font-semibold text-ink">${ssrInterpolate(unref(editingId) ? "Editar techo verde" : "Agregar al inventario")}</h3><form class="space-y-3"><div><label class="mb-1 block text-sm font-medium text-ink">Nombre *</label><input${ssrRenderAttr("value", unref(form).nombre)} class="input w-full" required></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-ink">Alcaldía *</label><input${ssrRenderAttr("value", unref(form).alcaldia)} class="input w-full" required></div><div><label class="mb-1 block text-sm font-medium text-ink">Tipo edificio *</label><input${ssrRenderAttr("value", unref(form).tipoEdificio)} class="input w-full" required></div></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-ink">Tipo techo verde *</label><select class="select w-full"><option value="extensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipoTechoVerde) ? ssrLooseContain(unref(form).tipoTechoVerde, "extensivo") : ssrLooseEqual(unref(form).tipoTechoVerde, "extensivo")) ? " selected" : ""}>Extensivo</option><option value="intensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipoTechoVerde) ? ssrLooseContain(unref(form).tipoTechoVerde, "intensivo") : ssrLooseEqual(unref(form).tipoTechoVerde, "intensivo")) ? " selected" : ""}>Intensivo</option><option value="semi-intensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipoTechoVerde) ? ssrLooseContain(unref(form).tipoTechoVerde, "semi-intensivo") : ssrLooseEqual(unref(form).tipoTechoVerde, "semi-intensivo")) ? " selected" : ""}>Semi-intensivo</option></select></div><div><label class="mb-1 block text-sm font-medium text-ink">Superficie (m²) *</label><input${ssrRenderAttr("value", unref(form).superficie)} class="input w-full" type="number" required></div></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-ink">Latitud</label><input${ssrRenderAttr("value", unref(form).lat)} class="input w-full" type="number" step="any"></div><div><label class="mb-1 block text-sm font-medium text-ink">Longitud</label><input${ssrRenderAttr("value", unref(form).lng)} class="input w-full" type="number" step="any"></div></div><div><label class="mb-1 block text-sm font-medium text-ink">Estado</label><select class="select w-full"><option value="activo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "activo") : ssrLooseEqual(unref(form).estado, "activo")) ? " selected" : ""}>Activo</option><option value="mantenimiento"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "mantenimiento") : ssrLooseEqual(unref(form).estado, "mantenimiento")) ? " selected" : ""}>Mantenimiento</option><option value="inactivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "inactivo") : ssrLooseEqual(unref(form).estado, "inactivo")) ? " selected" : ""}>Inactivo</option><option value="nuevo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "nuevo") : ssrLooseEqual(unref(form).estado, "nuevo")) ? " selected" : ""}>Nuevo</option></select></div><div><label class="mb-1 block text-sm font-medium text-ink">Dirección</label><input${ssrRenderAttr("value", unref(form).direccion)} class="input w-full"></div><div><label class="mb-1 block text-sm font-medium text-ink">Descripción</label><textarea class="input w-full" rows="2">${ssrInterpolate(unref(form).descripcion)}</textarea></div><div class="flex justify-end gap-3 pt-2"><button type="button" class="btn-ghost">Cancelar</button><button type="submit" class="btn-primary">${ssrInterpolate(unref(editingId) ? "Actualizar" : "Crear")}</button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/techos-verdes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-00k5MAxL.js.map
