import { _ as __nuxt_component_0 } from "./nuxt-link-BhPJ81xP.js";
import { c as useRoute, a as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { u as useAuthStore } from "./auth-5u7f_0sK.js";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ufo/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/defu/dist/defu.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/hookable/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/unctx/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/klona/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const auth = useAuthStore();
    auth.loadFromStorage();
    const navItems = [
      { label: "Dashboard", to: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4", exact: true },
      { label: "Prospectos", to: "/admin/prospectos", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { label: "Candidatos", to: "/admin/candidatos", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
      { label: "Validaciones", to: "/admin/validaciones", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { label: "Inventario", to: "/admin/techos-verdes", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
    ];
    function isActive(item) {
      if (item.exact) return route.path === item.to;
      return route.path.startsWith(item.to);
    }
    const sidebarOpen = ref(false);
    const isLg = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen bg-gray-50" }, _attrs))}><aside class="${ssrRenderClass([unref(sidebarOpen) ? "translate-x-0" : "-translate-x-full", "fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0"])}"><div class="flex h-16 items-center gap-2 border-b border-gray-200 px-4"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"><svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></div><span class="text-sm font-semibold text-ink">Admin Panel</span></div><nav class="flex-1 space-y-1 px-3 py-4"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200", isActive(item) ? "bg-primary-50 text-primary shadow-sm" : "text-gray-600 hover:bg-primary-50/50 hover:text-primary"],
          onClick: ($event) => !unref(isLg) && (sidebarOpen.value = false)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"${ssrRenderAttr("stroke-width", isActive(item) ? "2" : "1.5")}${_scopeId}><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", item.icon)}${_scopeId}></path></svg> ${ssrInterpolate(item.label)}`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "h-5 w-5 flex-shrink-0",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": isActive(item) ? "2" : "1.5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: item.icon
                  }, null, 8, ["d"])
                ], 8, ["stroke-width"])),
                createTextVNode(" " + toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="border-t border-gray-200 p-4"><div class="mb-3 flex items-center gap-2"><div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`A`);
          } else {
            return [
              createTextVNode("A")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="min-w-0 flex-1">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-4 w-24 rounded bg-gray-100"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "h-4 w-24 rounded bg-gray-100" })
            ];
          }
        })
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg> Ver sitio público `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1.5"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                })
              ])),
              createTextVNode(" Ver sitio público ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Cerrar sesión </button></div></aside>`);
      if (unref(sidebarOpen) && !unref(isLg)) {
        _push(`<div class="fixed inset-0 z-30 bg-black/20"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex min-w-0 flex-1 flex-col"><header class="sticky top-0 z-20 flex h-16 flex-shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-6"><button class="flex-shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><h1 class="min-w-0 truncate text-sm font-semibold text-ink sm:text-lg">Observatorio de Techos Verdes — Admin</h1></header><main class="flex-1 overflow-x-hidden p-4 lg:p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=admin-D8ZYX16B.js.map
