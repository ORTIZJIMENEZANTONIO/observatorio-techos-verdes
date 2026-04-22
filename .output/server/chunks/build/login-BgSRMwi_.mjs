import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-5u7f_0sK.mjs';
import 'pinia';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-[80vh] items-center justify-center overflow-hidden" }, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-white"></div><div class="absolute inset-0 opacity-[0.03]" style="${ssrRenderStyle({ "background-image": `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230E5E3A" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')` })}"></div><div class="relative z-10 w-full max-w-md px-4"><div class="card p-8 shadow-panel"><div class="mb-6 text-center"><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-md transition-transform duration-300 hover:scale-105"><svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div><h1 class="text-xl font-semibold text-ink">Panel de Administraci\xF3n</h1><p class="mt-1 text-sm text-slate-custom">Observatorio de Techos Verdes CDMX</p></div><form class="space-y-4"><div><label for="email" class="mb-1 block text-sm font-medium text-ink">Correo electr\xF3nico</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" required autocomplete="email" class="input w-full transition-shadow duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="admin@observatorio.cdmx"></div><div><label for="password" class="mb-1 block text-sm font-medium text-ink">Contrase\xF1a</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required autocomplete="current-password" class="input w-full transition-shadow duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="********"></div>`);
      if (unref(error)) {
        _push(`<div class="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"><svg class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="btn-primary w-full">`);
      if (unref(loading)) {
        _push(`<svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Ingresando..." : "Iniciar sesi\xF3n")}</button></form></div><p class="mt-6 text-center text-xs text-slate-custom/60">Acceso restringido a administradores autorizados</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BgSRMwi_.mjs.map
