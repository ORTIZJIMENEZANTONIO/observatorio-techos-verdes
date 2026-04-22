import { _ as __nuxt_component_0$1 } from "./nuxt-link-BhPJ81xP.js";
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderTeleport, ssrRenderSlot } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { c as useRoute, _ as _export_sfc } from "../server.mjs";
import { _ as _sfc_main$3 } from "./DataDisclaimer-Bsqs480u.js";
import { u as useDataSource } from "./useDataSource-CcCLLLin.js";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ufo/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/defu/dist/defu.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ofetch/dist/node.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/hookable/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/unctx/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/klona/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/@unhead/vue/dist/index.mjs";
const _imports_0 = publicAssetsURL("/images/logo-ciiemad.png");
const _imports_1 = publicAssetsURL("/images/logo-ipn.svg");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileOpen = ref(false);
    const navLinks = [
      { to: "/", label: "Inicio" },
      { to: "/sobre", label: "Sobre" },
      { to: "/inventario", label: "Inventario" },
      { to: "/candidatos", label: "Candidatos" },
      // { to: '/ia-validacion', label: 'Validación IA' },
      { to: "/indicadores", label: "Indicadores" },
      { to: "/metodologia", label: "Metodología" }
    ];
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        mobileOpen.value = false;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm" }, _attrs))} data-v-49616e70><div class="container-wide" data-v-49616e70><div class="flex h-16 items-center justify-between" data-v-49616e70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2.5 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95" data-v-49616e70${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49616e70${_scopeId}><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" data-v-49616e70${_scopeId}></path><path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" data-v-49616e70${_scopeId}></path><path d="M17 8c-.74-1.83-2.53-3-4.5-3" data-v-49616e70${_scopeId}></path></svg></div><div class="hidden sm:block" data-v-49616e70${_scopeId}><span class="text-sm font-bold text-ink leading-tight" data-v-49616e70${_scopeId}>Observatorio Techos Verdes</span><span class="block text-[10px] font-medium uppercase tracking-wider text-primary" data-v-49616e70${_scopeId}>CDMX</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  createVNode("path", { d: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" }),
                  createVNode("path", { d: "M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" }),
                  createVNode("path", { d: "M17 8c-.74-1.83-2.53-3-4.5-3" })
                ]))
              ]),
              createVNode("div", { class: "hidden sm:block" }, [
                createVNode("span", { class: "text-sm font-bold text-ink leading-tight" }, "Observatorio Techos Verdes"),
                createVNode("span", { class: "block text-[10px] font-medium uppercase tracking-wider text-primary" }, "CDMX")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden lg:flex items-center gap-1" data-v-49616e70><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: "rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-200 hover:bg-primary-50 hover:text-primary",
          "active-class": "!bg-primary-50 !text-primary !font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex items-center gap-2 sm:gap-3" data-v-49616e70><a href="https://www.ciiemad.ipn.mx/" target="_blank" rel="noopener noreferrer" class="shrink-0" data-v-49616e70><img${ssrRenderAttr("src", _imports_0)} alt="CIIEMAD - IPN" class="h-8 sm:h-10 w-auto" data-v-49616e70></a><a href="https://www.ipn.mx/" target="_blank" rel="noopener noreferrer" class="shrink-0" data-v-49616e70><img${ssrRenderAttr("src", _imports_1)} alt="Instituto Politécnico Nacional" class="h-8 sm:h-10 w-auto" data-v-49616e70></a></div><div class="flex items-center gap-3" data-v-49616e70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/mapa",
        class: "btn-primary btn-sm hidden lg:inline-flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49616e70${_scopeId}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" data-v-49616e70${_scopeId}></polygon><line x1="8" y1="2" x2="8" y2="18" data-v-49616e70${_scopeId}></line><line x1="16" y1="6" x2="16" y2="22" data-v-49616e70${_scopeId}></line></svg> Explorar mapa `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("polygon", { points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" }),
                createVNode("line", {
                  x1: "8",
                  y1: "2",
                  x2: "8",
                  y2: "18"
                }),
                createVNode("line", {
                  x1: "16",
                  y1: "6",
                  x2: "16",
                  y2: "22"
                })
              ])),
              createTextVNode(" Explorar mapa ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 lg:hidden" aria-label="Abrir menú" data-v-49616e70><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49616e70><line x1="3" y1="6" x2="21" y2="6" data-v-49616e70></line><line x1="3" y1="12" x2="21" y2="12" data-v-49616e70></line><line x1="3" y1="18" x2="21" y2="18" data-v-49616e70></line></svg></button></div></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (mobileOpen.value) {
          _push2(`<div class="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm lg:hidden" data-v-49616e70></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (mobileOpen.value) {
          _push2(`<div class="fixed right-0 top-0 z-[101] flex h-full w-72 flex-col bg-white shadow-2xl lg:hidden" data-v-49616e70><div class="flex items-center justify-between border-b border-gray-100 px-4 py-4" data-v-49616e70><span class="text-sm font-bold text-ink" data-v-49616e70>Menú</span><button class="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100" aria-label="Cerrar menú" data-v-49616e70><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49616e70><line x1="18" y1="6" x2="6" y2="18" data-v-49616e70></line><line x1="6" y1="6" x2="18" y2="18" data-v-49616e70></line></svg></button></div><nav class="flex-1 overflow-y-auto px-3 py-4" data-v-49616e70><!--[-->`);
          ssrRenderList(navLinks, (link) => {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              key: link.to,
              to: link.to,
              class: "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary",
              "active-class": "!bg-primary-50 !text-primary !font-semibold",
              onClick: ($event) => mobileOpen.value = false
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(link.label)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(link.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push2(`<!--]--></nav><div class="border-t border-gray-100 p-4" data-v-49616e70>`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/mapa",
            class: "btn-primary w-full justify-center",
            onClick: ($event) => mobileOpen.value = false
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49616e70${_scopeId}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" data-v-49616e70${_scopeId}></polygon><line x1="8" y1="2" x2="8" y2="18" data-v-49616e70${_scopeId}></line><line x1="16" y1="6" x2="16" y2="22" data-v-49616e70${_scopeId}></line></svg> Explorar mapa `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createVNode("polygon", { points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" }),
                    createVNode("line", {
                      x1: "8",
                      y1: "2",
                      x2: "8",
                      y2: "18"
                    }),
                    createVNode("line", {
                      x1: "16",
                      y1: "6",
                      x2: "16",
                      y2: "22"
                    })
                  ])),
                  createTextVNode(" Explorar mapa ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-49616e70"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const quickLinks = [
      { to: "/", label: "Inicio" },
      { to: "/mapa", label: "Mapa interactivo" },
      { to: "/inventario", label: "Inventario de techos" },
      { to: "/candidatos", label: "Sitios candidatos" },
      { to: "/ia-validacion", label: "Validación IA" },
      { to: "/indicadores", label: "Indicadores" },
      { to: "/metodologia", label: "Metodología y aptitud" },
      { to: "/sobre", label: "Sobre el proyecto" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-primary-800 text-white" }, _attrs))}><div class="container-wide section-padding"><div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"><div class="space-y-4"><div class="flex items-center gap-2.5"><div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z"></path><path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68"></path><path d="M17 8c-.74-1.83-2.53-3-4.5-3"></path></svg></div><div><span class="text-sm font-bold leading-tight">Observatorio Techos Verdes</span><span class="block text-[10px] font-medium uppercase tracking-wider text-eco">CDMX</span></div></div><p class="text-sm leading-relaxed text-white/70"> Plataforma de monitoreo y análisis de techos verdes en la Ciudad de México. </p><div class="rounded-lg border border-white/10 bg-white/5 p-3"><p class="text-xs leading-relaxed text-white/60"><span class="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-accent">Aviso importante</span> Este observatorio muestra aptitud territorial y priorización espacial. La factibilidad estructural depende de dictámenes técnicos del inmueble. </p></div></div><div><h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50"> Enlaces rápidos </h4><ul class="space-y-2"><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.to,
          class: "text-sm text-white/70 transition-colors duration-200 hover:text-eco"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50"> Contacto e información </h4><ul class="space-y-3 text-sm text-white/70"><li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>Ciudad de México, México</span></li><li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span>contacto@techosverdes.cdmx.gob.mx</span></li><li class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg><span>Gobierno de la Ciudad de México</span></li></ul></div></div><div class="mt-10 border-t border-white/10 pt-6"><div class="flex items-center justify-center gap-6 mb-4"><a href="https://www.ciiemad.ipn.mx/" target="_blank" rel="noopener noreferrer"><img${ssrRenderAttr("src", _imports_0)} alt="CIIEMAD - IPN" class="h-14 w-auto rounded-full bg-white p-1"></a><a href="https://www.ipn.mx/" target="_blank" rel="noopener noreferrer"><img${ssrRenderAttr("src", _imports_1)} alt="Instituto Politécnico Nacional" class="h-12 w-auto brightness-0 invert"></a></div><p class="text-center text-xs text-white/40"> © 2024 Observatorio de Techos Verdes CDMX. Todos los derechos reservados. </p></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { isMock } = useDataSource();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAppHeader = __nuxt_component_0;
      const _component_CommonDataDisclaimer = _sfc_main$3;
      const _component_CommonAppFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col bg-surface" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CommonAppHeader, null, null, _parent));
      if (unref(isMock)) {
        _push(ssrRenderComponent(_component_CommonDataDisclaimer, {
          compact: true,
          class: "mx-auto w-full max-w-screen-xl px-4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonAppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-CpBC6kHM.js.map
