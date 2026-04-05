import { _ as _sfc_main$1 } from './AdminPipelineBanner-B8R7ys78.mjs';
import { _ as _sfc_main$2 } from './AdminDataTable-KYyoGSZR.mjs';
import { defineComponent, ref, computed, reactive, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
      { key: "id", label: "ID", class: "w-16" },
      { key: "nombre", label: "Nombre" },
      { key: "alcaldia", label: "Alcald\xEDa" },
      { key: "tipoEdificio", label: "Tipo edificio" },
      { key: "tipoTechoVerde", label: "Tipo techo" },
      { key: "superficie", label: "m\xB2", class: "text-right tabular-nums" },
      { key: "estado", label: "Estado" },
      { key: "fechaRegistro", label: "Fecha" }
    ];
    const rows = computed(
      () => store.greenRoofs.map((r) => ({
        id: r.id,
        nombre: r.nombre,
        alcaldia: r.alcaldia,
        tipoEdificio: r.tipoEdificio,
        tipoTechoVerde: r.tipoTechoVerde,
        superficie: r.superficie,
        estado: r.estado,
        fechaRegistro: r.fechaRegistro || "\u2014",
        // keep full object for edit
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
      var _a, _b;
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
        lat: (_a = r.lat) != null ? _a : 19.4326,
        lng: (_b = r.lng) != null ? _b : -99.1332,
        imagen: r.imagen || "",
        descripcion: r.descripcion || ""
      });
      showForm.value = true;
    }
    function handleDelete(row) {
      if (confirm(`\xBFEliminar "${row.nombre}" del inventario?`)) {
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
      const _component_AdminDataTable = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AdminPipelineBanner, {
        "current-step": "inventario",
        description: "Techos verdes existentes e implementados en la CDMX. Estos son los que se muestran en el mapa p\xFAblico del observatorio."
      }, null, _parent));
      _push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-xl font-semibold text-ink sm:text-2xl">Inventario de techos verdes</h2><p class="mt-1 text-sm text-slate-custom">${ssrInterpolate(unref(rows).length)} techos verdes implementados \u2014 visibles en el mapa p\xFAblico</p></div><button class="btn-primary flex-shrink-0">+ Agregar</button></div>`);
      _push(ssrRenderComponent(_component_AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(loading),
        "search-placeholder": "Buscar por nombre, alcald\xEDa...",
        onEdit: handleEdit,
        onDelete: handleDelete
      }, {
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
            _push2(`${ssrInterpolate(value ? Number(value).toLocaleString("es-MX") : "\u2014")}`);
          } else {
            return [
              createTextVNode(toDisplayString(value ? Number(value).toLocaleString("es-MX") : "\u2014"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showForm)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"><div class="card max-h-[90vh] w-full max-w-lg animate-scale-in overflow-y-auto p-5 shadow-panel sm:p-6"><h3 class="mb-4 text-lg font-semibold text-ink">${ssrInterpolate(unref(editingId) ? "Editar techo verde" : "Agregar al inventario")}</h3><form class="space-y-3"><div><label class="mb-1 block text-sm font-medium text-ink">Nombre *</label><input${ssrRenderAttr("value", unref(form).nombre)} class="input w-full" required></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-ink">Alcald\xEDa *</label><input${ssrRenderAttr("value", unref(form).alcaldia)} class="input w-full" required></div><div><label class="mb-1 block text-sm font-medium text-ink">Tipo edificio *</label><input${ssrRenderAttr("value", unref(form).tipoEdificio)} class="input w-full" required></div></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-ink">Tipo techo verde *</label><select class="select w-full"><option value="extensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipoTechoVerde) ? ssrLooseContain(unref(form).tipoTechoVerde, "extensivo") : ssrLooseEqual(unref(form).tipoTechoVerde, "extensivo")) ? " selected" : ""}>Extensivo</option><option value="intensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipoTechoVerde) ? ssrLooseContain(unref(form).tipoTechoVerde, "intensivo") : ssrLooseEqual(unref(form).tipoTechoVerde, "intensivo")) ? " selected" : ""}>Intensivo</option><option value="semi-intensivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipoTechoVerde) ? ssrLooseContain(unref(form).tipoTechoVerde, "semi-intensivo") : ssrLooseEqual(unref(form).tipoTechoVerde, "semi-intensivo")) ? " selected" : ""}>Semi-intensivo</option></select></div><div><label class="mb-1 block text-sm font-medium text-ink">Superficie (m\xB2) *</label><input${ssrRenderAttr("value", unref(form).superficie)} class="input w-full" type="number" required></div></div><div class="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-ink">Latitud</label><input${ssrRenderAttr("value", unref(form).lat)} class="input w-full" type="number" step="any"></div><div><label class="mb-1 block text-sm font-medium text-ink">Longitud</label><input${ssrRenderAttr("value", unref(form).lng)} class="input w-full" type="number" step="any"></div></div><div><label class="mb-1 block text-sm font-medium text-ink">Estado</label><select class="select w-full"><option value="activo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "activo") : ssrLooseEqual(unref(form).estado, "activo")) ? " selected" : ""}>Activo</option><option value="mantenimiento"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "mantenimiento") : ssrLooseEqual(unref(form).estado, "mantenimiento")) ? " selected" : ""}>Mantenimiento</option><option value="inactivo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "inactivo") : ssrLooseEqual(unref(form).estado, "inactivo")) ? " selected" : ""}>Inactivo</option><option value="nuevo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "nuevo") : ssrLooseEqual(unref(form).estado, "nuevo")) ? " selected" : ""}>Nuevo</option></select></div><div><label class="mb-1 block text-sm font-medium text-ink">Direcci\xF3n</label><input${ssrRenderAttr("value", unref(form).direccion)} class="input w-full"></div><div><label class="mb-1 block text-sm font-medium text-ink">Descripci\xF3n</label><textarea class="input w-full" rows="2">${ssrInterpolate(unref(form).descripcion)}</textarea></div><div class="flex justify-end gap-3 pt-2"><button type="button" class="btn-ghost">Cancelar</button><button type="submit" class="btn-primary">${ssrInterpolate(unref(editingId) ? "Actualizar" : "Crear")}</button></div></form></div></div>`);
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

export { _sfc_main as default };
//# sourceMappingURL=index-BTGqwItm.mjs.map
