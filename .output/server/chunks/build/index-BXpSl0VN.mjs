import { a as __nuxt_component_1$1, b as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BhPJ81xP.mjs';
import { defineComponent, ref, computed, withCtx, createTextVNode, unref, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useApi } from './useApi-c2WXwWRZ.mjs';
import { u as useAuthStore } from './auth-5u7f_0sK.mjs';
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
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const config = useRuntimeConfig();
    config.public.observatory;
    useAuthStore();
    const summary = ref(null);
    const loading = ref(true);
    const quickLinks = [
      { label: "Prospectos", to: "/admin/prospectos", description: "Detector + cola de aprobacion de prospectos detectados", color: "bg-accent", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { label: "Candidatos", to: "/admin/candidatos", description: "Sitios aprobados y priorizados por analisis multicriterio", color: "bg-secondary", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
      { label: "Validaciones", to: "/admin/validaciones", description: "Validacion tecnica (IA + manual) sobre candidatos", color: "bg-eco", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { label: "Inventario", to: "/admin/techos-verdes", description: "Techos verdes implementados y existentes en la CDMX", color: "bg-primary", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
    ];
    const statCards = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      return [
        { label: "Prospectos pendientes", value: (_c = (_b = (_a = summary.value) == null ? void 0 : _a.prospectos) == null ? void 0 : _b.pendientes) != null ? _c : 0, color: "text-accent", border: "border-l-accent" },
        { label: "Prospectos aprobados", value: (_f = (_e = (_d = summary.value) == null ? void 0 : _d.prospectos) == null ? void 0 : _e.aprobados) != null ? _f : 0, color: "text-eco", border: "border-l-eco" },
        { label: "Prospectos rechazados", value: (_i = (_h = (_g = summary.value) == null ? void 0 : _g.prospectos) == null ? void 0 : _h.rechazados) != null ? _i : 0, color: "text-alert", border: "border-l-alert" },
        { label: "Total prospectos", value: (_l = (_k = (_j = summary.value) == null ? void 0 : _j.prospectos) == null ? void 0 : _k.total) != null ? _l : 0, color: "text-ink", border: "border-l-primary" }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h2 class="text-2xl font-semibold text-ink">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Dashboard`);
          } else {
            return [
              createTextVNode("Dashboard")
            ];
          }
        })
      }, _parent));
      _push(`</h2><p class="mt-1 text-sm text-slate-custom">Resumen general del Observatorio de Techos Verdes</p></div>`);
      if (unref(summary)) {
        _push(`<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(statCards), (stat, i) => {
          _push(`<div class="${ssrRenderClass([stat.border, "card border-l-4 p-4 transition-all duration-300"])}" style="${ssrRenderStyle({ animationDelay: `${i * 80}ms` })}"><p class="text-sm text-slate-custom">${ssrInterpolate(stat.label)}</p><p class="${ssrRenderClass([stat.color, "mt-1 text-2xl font-bold tabular-nums"])}">${ssrInterpolate(stat.value)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(loading)) {
        _push(`<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="card animate-pulse border-l-4 border-l-gray-200 p-4"><div class="h-4 w-24 rounded bg-gray-200"></div><div class="mt-2 h-8 w-16 rounded bg-gray-200"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-custom">Pipeline de gestion</h3><div class="flex flex-wrap items-center gap-2 text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/prospectos",
        class: "group flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 font-medium text-accent transition-colors hover:bg-accent/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg> Detector `);
          } else {
            return [
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
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              ])),
              createTextVNode(" Detector ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/prospectos",
        class: "group flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 font-medium text-accent transition-colors hover:bg-accent/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Prospectos `);
          } else {
            return [
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
                  d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                })
              ])),
              createTextVNode(" Prospectos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/candidatos",
        class: "group flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3 py-2 font-medium text-secondary transition-colors hover:bg-secondary/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg> Candidatos `);
          } else {
            return [
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
                  d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                })
              ])),
              createTextVNode(" Candidatos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/validaciones",
        class: "group flex items-center gap-1.5 rounded-lg bg-eco/10 px-3 py-2 font-medium text-eco transition-colors hover:bg-eco/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Validacion `);
          } else {
            return [
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
                  d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                })
              ])),
              createTextVNode(" Validacion ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg class="h-4 w-4 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/techos-verdes",
        class: "group flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 font-medium text-primary transition-colors hover:bg-primary/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg> Inventario `);
          } else {
            return [
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
                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                })
              ])),
              createTextVNode(" Inventario ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="mt-3 text-xs text-slate-custom">Flujo completo: el detector identifica edificios, pasan a prospectos pendientes, se aprueban como candidatos, se validan tecnicamente, y los exitosos entran al inventario de techos verdes.</p></div><h3 class="mb-4 text-lg font-semibold text-ink">Secciones</h3><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: "card-interactive group flex items-start gap-4 p-5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([link.color, "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-110"])}"${_scopeId}><svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", link.icon)}${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><p class="font-semibold text-ink"${_scopeId}>${ssrInterpolate(link.label)}</p><svg class="h-4 w-4 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div><p class="mt-1 text-sm text-slate-custom"${_scopeId}>${ssrInterpolate(link.description)}</p></div>`);
            } else {
              return [
                createVNode("div", {
                  class: [link.color, "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-110"]
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5 text-white",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "stroke-width": "1.5"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: link.icon
                    }, null, 8, ["d"])
                  ]))
                ], 2),
                createVNode("div", { class: "flex-1" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("p", { class: "font-semibold text-ink" }, toDisplayString(link.label), 1),
                    (openBlock(), createBlock("svg", {
                      class: "h-4 w-4 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 5l7 7-7 7"
                      })
                    ]))
                  ]),
                  createVNode("p", { class: "mt-1 text-sm text-slate-custom" }, toDisplayString(link.description), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BXpSl0VN.mjs.map
