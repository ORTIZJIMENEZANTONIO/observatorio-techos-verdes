import { _ as __nuxt_component_0 } from './nuxt-link-BhPJ81xP.mjs';
import { _ as _sfc_main$1 } from './SectionTitle-Di4BE9k7.mjs';
import { defineComponent, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { g as greenRoofs } from './mock-roofs-D-tdE7ed.mjs';
import { k as kpiData } from './kpis-DWO-YlkK.mjs';
import { u as useScrollReveal } from './useScrollReveal-V7xkZpXD.mjs';
import { _ as _export_sfc, u as useHead } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const _imports_0 = publicAssetsURL("/images/tesis/mapa-inventario-cdmx.png");
const _imports_1 = publicAssetsURL("/images/tesis/capas-techo-verde.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useScrollReveal({ stagger: true });
    useScrollReveal({ stagger: true });
    useScrollReveal({ stagger: true });
    useScrollReveal();
    useScrollReveal();
    useScrollReveal({ stagger: true });
    useScrollReveal();
    useScrollReveal();
    useHead({
      title: "Observatorio de Techos Verdes CDMX",
      meta: [
        {
          name: "description",
          content: "Plataforma de monitoreo y priorizaci\xF3n de techos verdes en la Ciudad de M\xE9xico. Visualizaci\xF3n geoespacial, an\xE1lisis de aptitud y validaci\xF3n con inteligencia artificial."
        }
      ]
    });
    const kpis = kpiData;
    const features = [
      {
        title: "Inventario de techos verdes",
        description: "Registro georreferenciado de los techos verdes existentes en la CDMX, con informaci\xF3n detallada de cada instalaci\xF3n.",
        to: "/inventario",
        bg: "bg-primary-50",
        iconColor: "text-primary",
        paths: [
          "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z",
          "M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68"
        ]
      },
      {
        title: "Aptitud territorial",
        description: "\xCDndice multicriterio que eval\xFAa la aptitud de cada zona para la implementaci\xF3n de techos verdes con base en 8 variables.",
        to: "/metodologia",
        bg: "bg-secondary/10",
        iconColor: "text-secondary",
        paths: [
          "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
          "M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        ]
      },
      {
        title: "Validaci\xF3n con IA",
        description: "Sistema de detecci\xF3n y validaci\xF3n asistida por inteligencia artificial con revisi\xF3n humana integrada.",
        to: "/ia-validacion",
        bg: "bg-accent/10",
        iconColor: "text-accent",
        paths: [
          "M12 2L2 7l10 5 10-5-10-5z",
          "M2 17l10 5 10-5",
          "M2 12l10 5 10-5"
        ]
      }
    ];
    const steps = [
      {
        title: "Recopilaci\xF3n de datos",
        description: "Integraci\xF3n de datos geoespaciales, sensores remotos, calidad del aire y datos urbanos."
      },
      {
        title: "\xCDndice de aptitud",
        description: "Construcci\xF3n del \xEDndice multicriterio con 8 variables ponderadas por expertos."
      },
      {
        title: "Detecci\xF3n con IA",
        description: "Modelos de visi\xF3n por computadora analizan im\xE1genes a\xE9reas para detectar techos verdes."
      },
      {
        title: "Priorizaci\xF3n",
        description: "Integraci\xF3n de resultados para identificar y priorizar sitios candidatos."
      }
    ];
    const mapFeatures = [
      "57 techos verdes existentes geolocalizados",
      "60 sitios candidatos priorizados",
      "Capa de aptitud territorial por zona",
      "Filtros por alcald\xEDa, tipo y estado"
    ];
    const featuredRoofs = greenRoofs.slice(0, 3);
    const featuredImages = {
      5: "/images/tesis/terrazas-alcazar.png"
    };
    const aiFeatures = [
      "Detecci\xF3n autom\xE1tica de vegetaci\xF3n en azoteas",
      "Clasificaci\xF3n por tipo de techo verde",
      "Nivel de confianza por predicci\xF3n",
      "Interfaz de validaci\xF3n humano-en-el-bucle"
    ];
    function kpiIconBg(color) {
      const map = {
        primary: "bg-primary-50",
        eco: "bg-eco/10",
        secondary: "bg-secondary/10",
        accent: "bg-accent/10"
      };
      return map[color] || "bg-gray-50";
    }
    function kpiIconColor(color) {
      const map = {
        primary: "text-primary",
        eco: "text-eco",
        secondary: "text-secondary",
        accent: "text-accent"
      };
      return map[color] || "text-ink-muted";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CommonSectionTitle = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7083ebfb><section class="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary to-primary-light" data-v-7083ebfb><div class="absolute inset-0 opacity-10" data-v-7083ebfb><div class="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-eco" data-v-7083ebfb></div><div class="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-secondary" data-v-7083ebfb></div></div><div class="container-wide relative py-20 md:py-26" data-v-7083ebfb><div class="max-w-3xl" data-v-7083ebfb><span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm" data-v-7083ebfb><span class="h-1.5 w-1.5 rounded-full bg-eco animate-pulse-glow" style="${ssrRenderStyle({ "animation": "pulseGlow 2s ease-in-out infinite" })}" data-v-7083ebfb></span> Plataforma abierta </span><h1 class="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl" data-v-7083ebfb> Observatorio de<br data-v-7083ebfb><span class="text-gradient-hero" data-v-7083ebfb>Techos Verdes</span><br data-v-7083ebfb> CDMX </h1><p class="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl" data-v-7083ebfb> Monitoreo, priorizaci\xF3n y an\xE1lisis de infraestructura verde en azoteas de la Ciudad de M\xE9xico. Datos abiertos, inteligencia artificial y an\xE1lisis geoespacial. </p><div class="mt-8 flex flex-wrap gap-4" data-v-7083ebfb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/mapa",
        class: "btn-primary btn-lg !bg-eco hover:!bg-eco-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb${_scopeId}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" data-v-7083ebfb${_scopeId}></polygon><line x1="8" y1="2" x2="8" y2="18" data-v-7083ebfb${_scopeId}></line><line x1="16" y1="6" x2="16" y2="22" data-v-7083ebfb${_scopeId}></line></svg> Explorar mapa `);
          } else {
            return [
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
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/metodologia",
        class: "btn btn-lg border border-white/30 text-white hover:bg-white/10"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Conocer metodolog\xEDa `);
          } else {
            return [
              createTextVNode(" Conocer metodolog\xEDa ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><section class="bg-white py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb><div class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" data-v-7083ebfb><!--[-->`);
      ssrRenderList(unref(kpis), (kpi) => {
        _push(`<div class="kpi-card reveal" data-v-7083ebfb><div class="flex items-center gap-2" data-v-7083ebfb><div class="${ssrRenderClass([
          "flex h-8 w-8 items-center justify-center rounded-lg",
          kpiIconBg(kpi.color)
        ])}" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([kpiIconColor(kpi.color), "h-4 w-4"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" data-v-7083ebfb></path></svg></div>`);
        if (kpi.cambio) {
          _push(`<span class="text-[10px] font-medium text-eco" data-v-7083ebfb>${ssrInterpolate(kpi.cambio)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="mt-2 text-2xl font-bold text-ink" data-v-7083ebfb>${ssrInterpolate(kpi.valor)}</p><p class="text-xs text-slate-custom" data-v-7083ebfb>${ssrInterpolate(kpi.label)}</p>`);
        if (kpi.unidad) {
          _push(`<p class="text-[10px] text-ink-muted" data-v-7083ebfb>${ssrInterpolate(kpi.unidad)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><section class="bg-surface py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Qu\xE9 es el observatorio",
        subtitle: "Una plataforma integral para el monitoreo, an\xE1lisis y priorizaci\xF3n de techos verdes en la Ciudad de M\xE9xico.",
        centered: true,
        tag: "Acerca de"
      }, null, _parent));
      _push(`<div class="stagger-children grid grid-cols-1 gap-6 md:grid-cols-3" data-v-7083ebfb><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(`<div class="card-interactive p-6 reveal" data-v-7083ebfb><div class="${ssrRenderClass(["mb-4 flex h-12 w-12 items-center justify-center rounded-xl", feature.bg])}" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([feature.iconColor, "h-6 w-6"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb><!--[-->`);
        ssrRenderList(feature.paths, (d, i) => {
          _push(`<path${ssrRenderAttr("d", d)} data-v-7083ebfb></path>`);
        });
        _push(`<!--]--></svg></div><h3 class="text-lg font-semibold text-ink" data-v-7083ebfb>${ssrInterpolate(feature.title)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-custom" data-v-7083ebfb>${ssrInterpolate(feature.description)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: feature.to,
          class: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Explorar <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb${_scopeId}><polyline points="9 18 15 12 9 6" data-v-7083ebfb${_scopeId}></polyline></svg>`);
            } else {
              return [
                createTextVNode(" Explorar "),
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
                  createVNode("polyline", { points: "9 18 15 12 9 6" })
                ]))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><section class="bg-white py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "C\xF3mo funciona",
        subtitle: "Un flujo de trabajo que integra datos geoespaciales, an\xE1lisis multicriterio e inteligencia artificial.",
        centered: true,
        tag: "Proceso"
      }, null, _parent));
      _push(`<div class="relative" data-v-7083ebfb><div class="absolute left-1/2 top-12 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gradient-to-r from-primary via-secondary to-eco lg:block" data-v-7083ebfb></div><div class="stagger-children grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" data-v-7083ebfb><!--[-->`);
      ssrRenderList(steps, (step, index2) => {
        _push(`<div class="relative text-center reveal" data-v-7083ebfb><div class="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg" data-v-7083ebfb><span class="text-xl font-bold" data-v-7083ebfb>${ssrInterpolate(index2 + 1)}</span></div><h4 class="text-base font-semibold text-ink" data-v-7083ebfb>${ssrInterpolate(step.title)}</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom" data-v-7083ebfb>${ssrInterpolate(step.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section><section class="bg-surface py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb><div class="overflow-hidden rounded-card bg-white shadow-panel reveal-scale" data-v-7083ebfb><div class="grid grid-cols-1 lg:grid-cols-2" data-v-7083ebfb><div class="flex flex-col justify-center p-8 lg:p-12" data-v-7083ebfb><span class="mb-3 inline-flex w-fit items-center rounded-badge bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary" data-v-7083ebfb> Mapa interactivo </span><h2 class="text-2xl font-bold text-ink md:text-3xl" data-v-7083ebfb>Explora los techos verdes de la CDMX</h2><p class="mt-4 text-base leading-relaxed text-slate-custom" data-v-7083ebfb> Visualiza la distribuci\xF3n de techos verdes existentes, sitios candidatos priorizados y el \xEDndice de aptitud territorial en un mapa interactivo con m\xFAltiples capas de informaci\xF3n. </p><ul class="mt-6 space-y-3" data-v-7083ebfb><!--[-->`);
      ssrRenderList(mapFeatures, (item) => {
        _push(`<li class="flex items-center gap-3 text-sm text-ink" data-v-7083ebfb><span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb><polyline points="20 6 9 17 4 12" data-v-7083ebfb></polyline></svg></span> ${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/mapa",
        class: "btn-primary mt-8 w-fit"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb${_scopeId}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" data-v-7083ebfb${_scopeId}></polygon><line x1="8" y1="2" x2="8" y2="18" data-v-7083ebfb${_scopeId}></line><line x1="16" y1="6" x2="16" y2="22" data-v-7083ebfb${_scopeId}></line></svg> Abrir mapa interactivo `);
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
              createTextVNode(" Abrir mapa interactivo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative min-h-[300px] overflow-hidden lg:min-h-[400px]" data-v-7083ebfb><img${ssrRenderAttr("src", _imports_0)} alt="Mapa inventario de techos verdes en la Ciudad de M\xE9xico, elaborado a partir de investigaci\xF3n de campo y datos georreferenciados" class="absolute inset-0 h-full w-full object-cover" data-v-7083ebfb><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4" data-v-7083ebfb><p class="text-xs text-white/90" data-v-7083ebfb>Inventario georreferenciado de techos verdes en la CDMX</p><p class="text-[10px] text-white/60" data-v-7083ebfb>Fuente: Cervantes N\xE1jera (2025), CIIEMAD-IPN</p></div></div></div></div></div></section><section class="bg-white py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb><div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2" data-v-7083ebfb><div class="reveal-left" data-v-7083ebfb>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Qu\xE9 es un techo verde",
        subtitle: "Un sistema de capas que incorpora vegetaci\xF3n en la parte superior de edificaciones, aportando m\xFAltiples beneficios ambientales.",
        tag: "Fundamento"
      }, null, _parent));
      _push(`<p class="text-sm leading-relaxed text-slate-custom" data-v-7083ebfb> Un techo verde es un sistema constructivo que integra vegetaci\xF3n viva sobre las cubiertas de los edificios. Se compone de m\xFAltiples capas: impermeabilizante, barrera anti-ra\xEDz, capa drenante, sustrato y la capa de vegetaci\xF3n. Los techos verdes extensivos, como el TVLE desarrollado en el CIIEMAD-IPN, utilizan materiales org\xE1nicos residuales (paja y fibra de coco) en su capa drenante, reduciendo costos y huella de carbono. </p><div class="mt-6 grid grid-cols-2 gap-3" data-v-7083ebfb><div class="rounded-lg bg-primary-50 p-3 text-center" data-v-7083ebfb><span class="text-2xl font-bold text-primary" data-v-7083ebfb>94.8%</span><p class="mt-1 text-[10px] font-medium uppercase tracking-wider text-primary/70" data-v-7083ebfb>Menos huella de carbono vs convencional</p></div><div class="rounded-lg bg-eco/10 p-3 text-center" data-v-7083ebfb><span class="text-2xl font-bold text-eco-dark" data-v-7083ebfb>25.9%</span><p class="mt-1 text-[10px] font-medium uppercase tracking-wider text-eco-dark/70" data-v-7083ebfb>M\xE1s econ\xF3mico que el convencional</p></div></div></div><div class="reveal-right" data-v-7083ebfb><div class="overflow-hidden rounded-card bg-surface shadow-card" data-v-7083ebfb><img${ssrRenderAttr("src", _imports_1)} alt="Diagrama de las capas de un techo verde: vegetaci\xF3n, sustrato, drenante, barrera anti-ra\xEDz, impermeabilizante y base del techo" class="mx-auto w-full max-w-sm p-6" data-v-7083ebfb><div class="border-t border-gray-100 px-4 py-2.5" data-v-7083ebfb><p class="text-[10px] text-slate-custom" data-v-7083ebfb>Imagen 2. Capas de un techo verde. Fuente: Cervantes N\xE1jera (2021), CIIEMAD-IPN</p></div></div></div></div></div></section><section class="bg-surface py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Techos verdes destacados",
        subtitle: "Algunos de los proyectos m\xE1s representativos de infraestructura verde en azoteas de la CDMX.",
        centered: true,
        tag: "Destacados"
      }, null, _parent));
      _push(`<div class="stagger-children grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-v-7083ebfb><!--[-->`);
      ssrRenderList(unref(featuredRoofs), (roof, index2) => {
        var _a;
        _push(`<div class="card-interactive overflow-hidden reveal" data-v-7083ebfb><div class="${ssrRenderClass([index2 === 0 ? "" : "bg-gradient-to-br from-primary-50 to-eco/10", "relative h-40 overflow-hidden"])}" data-v-7083ebfb>`);
        if (featuredImages[index2]) {
          _push(`<img${ssrRenderAttr("src", featuredImages[index2])}${ssrRenderAttr("alt", "Techo verde: " + roof.nombre)} class="h-full w-full object-cover" data-v-7083ebfb>`);
        } else {
          _push(`<div class="flex h-full items-center justify-center" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-7083ebfb><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" data-v-7083ebfb></path><path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" data-v-7083ebfb></path></svg></div>`);
        }
        _push(`</div><div class="p-5" data-v-7083ebfb><div class="mb-2 flex items-center gap-2" data-v-7083ebfb><span class="badge-primary" data-v-7083ebfb>${ssrInterpolate(roof.tipoTechoVerde)}</span><span class="${ssrRenderClass([
          "badge",
          roof.estado === "activo" ? "bg-eco/10 text-eco-dark" : "bg-accent/10 text-accent-dark"
        ])}" data-v-7083ebfb>${ssrInterpolate(roof.estado)}</span></div><h4 class="text-base font-semibold text-ink" data-v-7083ebfb>${ssrInterpolate(roof.nombre)}</h4><p class="mt-1 text-xs text-slate-custom" data-v-7083ebfb>${ssrInterpolate(roof.alcaldia)} \xB7 ${ssrInterpolate((_a = roof.superficie) == null ? void 0 : _a.toLocaleString())} m2</p><p class="mt-2 text-sm leading-relaxed text-slate-custom line-clamp-2" data-v-7083ebfb>${ssrInterpolate(roof.notas || roof.direccion)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-8 text-center" data-v-7083ebfb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/inventario",
        class: "btn-outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver inventario completo <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb${_scopeId}><polyline points="9 18 15 12 9 6" data-v-7083ebfb${_scopeId}></polyline></svg>`);
          } else {
            return [
              createTextVNode(" Ver inventario completo "),
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
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="bg-white py-16" data-v-7083ebfb><div class="container-wide" data-v-7083ebfb><div class="overflow-hidden rounded-card bg-gradient-to-br from-primary-800 to-primary shadow-panel reveal-scale" data-v-7083ebfb><div class="grid grid-cols-1 lg:grid-cols-2" data-v-7083ebfb><div class="p-8 lg:p-12" data-v-7083ebfb><span class="mb-3 inline-flex items-center gap-2 rounded-badge bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm" data-v-7083ebfb> Inteligencia Artificial </span><h2 class="mt-4 text-2xl font-bold text-white md:text-3xl" data-v-7083ebfb>Validaci\xF3n asistida por IA</h2><p class="mt-4 text-base leading-relaxed text-white/75" data-v-7083ebfb> Utilizamos modelos de visi\xF3n por computadora para detectar y clasificar techos verdes a partir de im\xE1genes a\xE9reas y satelitales. El sistema humano-en-el-bucle garantiza la calidad de las validaciones. </p><ul class="mt-6 space-y-3" data-v-7083ebfb><!--[-->`);
      ssrRenderList(aiFeatures, (item) => {
        _push(`<li class="flex items-center gap-3 text-sm text-white/80" data-v-7083ebfb><span class="flex h-5 w-5 items-center justify-center rounded-full bg-eco/20" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb><polyline points="20 6 9 17 4 12" data-v-7083ebfb></polyline></svg></span> ${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/ia-validacion",
        class: "btn mt-8 border border-white/20 bg-white/10 text-white hover:bg-white/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver validaciones `);
          } else {
            return [
              createTextVNode(" Ver validaciones ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-center p-8 lg:p-12" data-v-7083ebfb><div class="w-full max-w-sm space-y-4" data-v-7083ebfb><div class="rounded-card bg-white/10 p-4 backdrop-blur-sm" data-v-7083ebfb><div class="flex items-center justify-between" data-v-7083ebfb><span class="text-sm font-medium text-white" data-v-7083ebfb>Detecci\xF3n autom\xE1tica</span><span class="badge bg-eco/20 text-eco" data-v-7083ebfb>94% confianza</span></div><div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10" data-v-7083ebfb><div class="h-full w-[94%] rounded-full bg-eco" data-v-7083ebfb></div></div></div><div class="rounded-card bg-white/10 p-4 backdrop-blur-sm" data-v-7083ebfb><div class="flex items-center justify-between" data-v-7083ebfb><span class="text-sm font-medium text-white" data-v-7083ebfb>Validaciones completadas</span><span class="text-lg font-bold text-white" data-v-7083ebfb>30</span></div><div class="mt-2 flex gap-1.5" data-v-7083ebfb><span class="badge bg-eco/20 text-eco" data-v-7083ebfb>10 confirmadas</span><span class="badge bg-alert/20 text-alert-light" data-v-7083ebfb>5 rechazadas</span></div></div><div class="rounded-card bg-white/10 p-4 backdrop-blur-sm" data-v-7083ebfb><div class="flex items-center gap-3" data-v-7083ebfb><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-7083ebfb><path d="M12 2L2 7l10 5 10-5-10-5z" data-v-7083ebfb></path><path d="M2 17l10 5 10-5" data-v-7083ebfb></path><path d="M2 12l10 5 10-5" data-v-7083ebfb></path></svg></div><div data-v-7083ebfb><p class="text-sm font-medium text-white" data-v-7083ebfb>Modelo multicriterio</p><p class="text-xs text-white/60" data-v-7083ebfb>8 variables, pesos calibrados</p></div></div></div></div></div></div></div></div></section><section class="bg-surface py-12" data-v-7083ebfb><div class="container-wide space-y-4" data-v-7083ebfb><div class="rounded-card border border-primary/10 bg-white p-6 shadow-card reveal" data-v-7083ebfb><div class="flex flex-col gap-6 md:flex-row md:items-center" data-v-7083ebfb><div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-50" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" data-v-7083ebfb></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" data-v-7083ebfb></path></svg></div><div class="flex-1" data-v-7083ebfb><h3 class="text-base font-semibold text-ink" data-v-7083ebfb>Respaldo cient\xEDfico</h3><p class="mt-1 text-sm leading-relaxed text-slate-custom" data-v-7083ebfb> Este observatorio se fundamenta en la investigaci\xF3n doctoral y de maestr\xEDa realizada en el CIIEMAD-IPN por Ana Laura Cervantes N\xE1jera, bajo la direcci\xF3n de la Dra. Mar\xEDa Concepci\xF3n Mart\xEDnez Rodr\xEDguez. Las tasas de impacto, el inventario georreferenciado y el modelo de priorizaci\xF3n utilizados en esta plataforma provienen de dichas investigaciones. </p><div class="mt-3 space-y-1" data-v-7083ebfb><p class="text-xs text-slate-custom" data-v-7083ebfb><span class="font-medium text-ink" data-v-7083ebfb>Tesis doctoral (2025):</span> &quot;Techos verdes una soluci\xF3n sustentable para la adaptaci\xF3n al cambio clim\xE1tico en la Ciudad de M\xE9xico&quot; </p><p class="text-xs text-slate-custom" data-v-7083ebfb><span class="font-medium text-ink" data-v-7083ebfb>Tesis de maestr\xEDa (2021):</span> &quot;Dise\xF1o, aplicaci\xF3n y evaluaci\xF3n de un techo verde ligero extensivo como estrategia para la adaptaci\xF3n al cambio clim\xE1tico en la alcald\xEDa Gustavo A. Madero, Ciudad de M\xE9xico&quot; </p></div></div></div></div><div class="rounded-card border border-accent/30 bg-accent/5 p-5" data-v-7083ebfb><div class="flex gap-3" data-v-7083ebfb><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10" data-v-7083ebfb><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7083ebfb><circle cx="12" cy="12" r="10" data-v-7083ebfb></circle><line x1="12" y1="8" x2="12" y2="12" data-v-7083ebfb></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-7083ebfb></line></svg></div><div data-v-7083ebfb><h4 class="text-sm font-semibold text-accent-dark" data-v-7083ebfb>Aviso importante</h4><p class="mt-1 text-sm leading-relaxed text-slate-custom" data-v-7083ebfb> Este observatorio es una herramienta de an\xE1lisis territorial y no sustituye dict\xE1menes t\xE9cnicos de factibilidad estructural. Los datos de aptitud reflejan condiciones ambientales y urbanas, no la viabilidad constructiva de cada inmueble. Consulte las fuentes originales y los profesionales certificados antes de tomar decisiones de implementaci\xF3n. </p></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7083ebfb"]]);

export { index as default };
//# sourceMappingURL=index-VrHKJqOs.mjs.map
