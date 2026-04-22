import { _ as __nuxt_component_0 } from './HeroSection-BqPnfiNV.mjs';
import { _ as _sfc_main$1 } from './SectionTitle-Di4BE9k7.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { g as greenRoofs } from './mock-roofs-D-tdE7ed.mjs';
import { c as candidateRoofs } from './mock-candidates-Cvvvd8Mv.mjs';
import { a as aptitudPesos } from './aptitud-pesos-B4e-CPf1.mjs';
import { A as ALCALDIAS } from './constants-CRBjnGpz.mjs';
import { u as useHead } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';

const _imports_0 = publicAssetsURL("/images/tesis/tvle-ciiemad-foto.png");
const _imports_1 = publicAssetsURL("/images/tesis/ciiemad-cuadrantes.png");
const _imports_2 = publicAssetsURL("/images/tesis/ciiemad-vista-aerea.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Sobre el observatorio | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Conoce el prop\xF3sito, alcance y principios del Observatorio de Techos Verdes de la Ciudad de M\xE9xico." }
      ]
    });
    const greenRoofsCount = greenRoofs.length;
    const candidatesCount = candidateRoofs.length;
    const variablesCount = aptitudPesos.length;
    const alcaldiasCount = ALCALDIAS.length;
    const ciiemadFindings = [
      { value: "3.5\xB0C", label: "Reducci\xF3n de temperatura superficial", color: "text-secondary" },
      { value: "432.95", label: "kWh/m\xB2 ahorro energ\xE9tico anual", color: "text-accent" },
      { value: "0.077", label: "tonCO\u2082/a\xF1o capturadas (inventario)", color: "text-eco-dark" },
      { value: "18", label: "Meses de recuperaci\xF3n de inversi\xF3n", color: "text-primary" }
    ];
    const normativas = [
      {
        titulo: "Art. 88 BIS 5, Ley Ambiental de Protecci\xF3n a la Tierra CDMX",
        tipo: "Ley local",
        descripcion: "Establece la obligaci\xF3n de instalar azoteas verdes en edificaciones nuevas mayores a 2,500 m2 de construcci\xF3n en la Ciudad de M\xE9xico.",
        color: "#0E5E3A"
      },
      {
        titulo: "NADF-013-RNAT-2017",
        tipo: "Norma ambiental",
        descripcion: "Norma t\xE9cnica que establece las especificaciones para la instalaci\xF3n de azoteas verdes. Requiere m\xEDnimo 70% de cobertura vegetal y define criterios de sustrato, impermeabilizaci\xF3n y mantenimiento.",
        color: "#79C141"
      },
      {
        titulo: "ELAC 2021-2050 (Eje 5: Revegetaci\xF3n)",
        tipo: "Estrategia",
        descripcion: "Estrategia Local de Acci\xF3n Clim\xE1tica. El eje 5 prioriza la revegetaci\xF3n urbana incluyendo azoteas y muros verdes como infraestructura de adaptaci\xF3n clim\xE1tica.",
        color: "#18A5E3"
      },
      {
        titulo: "PACCM 2021-2030",
        tipo: "Programa",
        descripcion: "Programa de Acci\xF3n Clim\xE1tica de la Ciudad de M\xE9xico. Incluye metas espec\xEDficas de incremento de superficie verde en azoteas como medida de mitigaci\xF3n de isla de calor urbano.",
        color: "#F2A81D"
      },
      {
        titulo: "PERIVE",
        tipo: "Programa",
        descripcion: "Programa Estrat\xE9gico de la Red de Infraestructura Verde. Establece lineamientos para la integraci\xF3n de azoteas, muros verdes y corredores ecol\xF3gicos en la trama urbana.",
        color: "#6366F1"
      },
      {
        titulo: "C\xF3digo Fiscal CDMX - Descuento predial",
        tipo: "Incentivo fiscal",
        descripcion: "Reducci\xF3n del 10% en el impuesto predial para inmuebles que instalen y mantengan azoteas naturadas conforme a la NADF-013-RNAT-2017.",
        color: "#0E5E3A"
      }
    ];
    const principles = [
      {
        title: "Transparencia",
        description: "Datos abiertos, metodolog\xEDa documentada y c\xF3digo fuente p\xFAblico. Toda la informaci\xF3n es verificable.",
        bg: "bg-primary-50",
        iconColor: "text-primary",
        paths: [
          "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
          "M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"
        ]
      },
      {
        title: "Rigor cient\xEDfico",
        description: "Modelo basado en literatura acad\xE9mica, datos oficiales y validaci\xF3n por expertos en el tema.",
        bg: "bg-secondary/10",
        iconColor: "text-secondary",
        paths: [
          "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
        ]
      },
      {
        title: "Accesibilidad",
        description: "Informaci\xF3n presentada de forma clara y comprensible para diferentes audiencias. Interfaz intuitiva.",
        bg: "bg-eco/10",
        iconColor: "text-eco",
        paths: [
          "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
          "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
          "M23 21v-2a4 4 0 0 0-3-3.87",
          "M16 3.13a4 4 0 0 1 0 7.75"
        ]
      },
      {
        title: "Colaboraci\xF3n",
        description: "Plataforma dise\xF1ada para facilitar la colaboraci\xF3n entre gobierno, academia, sector privado y sociedad civil.",
        bg: "bg-accent/10",
        iconColor: "text-accent",
        paths: [
          "M12 2L2 7l10 5 10-5-10-5z",
          "M2 17l10 5 10-5",
          "M2 12l10 5 10-5"
        ]
      }
    ];
    const timeline = [
      {
        date: "Enero 2024",
        title: "Inicio del proyecto",
        description: "Definici\xF3n del alcance, objetivos y metodolog\xEDa del observatorio. Revisi\xF3n de literatura y selecci\xF3n de variables."
      },
      {
        date: "Marzo 2024",
        title: "Recopilaci\xF3n de datos",
        description: "Obtenci\xF3n de datos geoespaciales, im\xE1genes satelitales y estad\xEDsticas de calidad del aire de fuentes oficiales."
      },
      {
        date: "Mayo 2024",
        title: "Construcci\xF3n del modelo",
        description: "Desarrollo del \xEDndice de aptitud territorial con 8 variables ponderadas. Consulta con panel de expertos."
      },
      {
        date: "Julio 2024",
        title: "Desarrollo de IA",
        description: "Entrenamiento del modelo de visi\xF3n por computadora para detecci\xF3n de techos verdes en im\xE1genes a\xE9reas."
      },
      {
        date: "Septiembre 2024",
        title: "Levantamiento de inventario",
        description: "Registro de 57 techos verdes existentes en la CDMX. Verificaci\xF3n de campo y digitalizaci\xF3n de datos."
      },
      {
        date: "Noviembre 2024",
        title: "Priorizaci\xF3n de candidatos",
        description: "Identificaci\xF3n y priorizaci\xF3n de 60 sitios candidatos para intervenci\xF3n con techos verdes."
      },
      {
        date: "Enero 2025",
        title: "Lanzamiento de la plataforma",
        description: "Publicaci\xF3n del observatorio con mapa interactivo, inventario, candidatos priorizados y sistema de validaci\xF3n."
      },
      {
        date: "Marzo 2025",
        title: "Datos abiertos",
        description: "Publicaci\xF3n de todos los conjuntos de datos del observatorio en formatos abiertos (CSV, GeoJSON)."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonHeroSection = __nuxt_component_0;
      const _component_CommonSectionTitle = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CommonHeroSection, { compact: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-3xl font-extrabold text-white md:text-4xl"${_scopeId}>Sobre el observatorio</h1><p class="mt-2 text-base text-white/80"${_scopeId}>Un espacio abierto de datos, an\xE1lisis y visualizaci\xF3n de infraestructura verde en azoteas de la Ciudad de M\xE9xico</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-3xl font-extrabold text-white md:text-4xl" }, "Sobre el observatorio"),
              createVNode("p", { class: "mt-2 text-base text-white/80" }, "Un espacio abierto de datos, an\xE1lisis y visualizaci\xF3n de infraestructura verde en azoteas de la Ciudad de M\xE9xico")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="py-16"><div class="container-wide"><div class="grid grid-cols-1 gap-12 lg:grid-cols-2"><div><h3 class="text-2xl font-bold text-ink">Prop\xF3sito</h3><p class="mt-4 text-base leading-relaxed text-slate-custom"> El Observatorio de Techos Verdes CDMX nace con el prop\xF3sito de generar una plataforma integral para el monitoreo, an\xE1lisis y priorizaci\xF3n de techos verdes en la Ciudad de M\xE9xico. Ante los crecientes desaf\xEDos clim\xE1ticos, la isla de calor urbano y la degradaci\xF3n de la calidad del aire, los techos verdes representan una soluci\xF3n de infraestructura basada en la naturaleza con m\xFAltiples beneficios ambientales. </p><p class="mt-4 text-base leading-relaxed text-slate-custom"> Esta plataforma busca consolidar informaci\xF3n dispersa, hacerla accesible y comprensible para tomadores de decisiones, profesionales del sector y ciudadan\xEDa interesada en la sustentabilidad urbana. </p></div><div class="flex items-center justify-center"><div class="grid grid-cols-2 gap-4"><div class="kpi-card text-center"><p class="text-3xl font-bold text-primary">${ssrInterpolate(unref(greenRoofsCount))}</p><p class="text-xs text-slate-custom">Techos registrados</p></div><div class="kpi-card text-center"><p class="text-3xl font-bold text-secondary">${ssrInterpolate(unref(candidatesCount))}</p><p class="text-xs text-slate-custom">Candidatos</p></div><div class="kpi-card text-center"><p class="text-3xl font-bold text-eco">${ssrInterpolate(unref(variablesCount))}</p><p class="text-xs text-slate-custom">Variables del modelo</p></div><div class="kpi-card text-center"><p class="text-3xl font-bold text-accent">${ssrInterpolate(unref(alcaldiasCount))}</p><p class="text-xs text-slate-custom">Alcald\xEDas</p></div></div></div></div></div></section><section class="bg-white py-16"><div class="container-wide"><h3 class="text-2xl font-bold text-ink">Alcance</h3><div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"><div class="panel"><div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg></div><h4 class="text-base font-semibold text-ink">Territorial</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom"> Cobertura de las 16 alcald\xEDas de la Ciudad de M\xE9xico, con an\xE1lisis a escala de manzana urbana y sitio candidato. </p></div><div class="panel"><div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg></div><h4 class="text-base font-semibold text-ink">Basado en datos</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom"> An\xE1lisis fundamentado en datos geoespaciales, sensores remotos y estad\xEDsticas oficiales. Modelo multicriterio con 8 variables ponderadas. </p></div><div class="panel"><div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-eco/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></div><h4 class="text-base font-semibold text-ink">Plataforma abierta</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom"> Datos abiertos, c\xF3digo abierto y documentaci\xF3n p\xFAblica. Dise\xF1ado para la consulta ciudadana, la investigaci\xF3n y la toma de decisiones. </p></div></div></div></section><section class="py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Principios",
        subtitle: "Los valores que gu\xEDan el desarrollo y operaci\xF3n del observatorio.",
        centered: true
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(principles, (principle) => {
        _push(`<div class="card-interactive p-6 text-center"><div class="${ssrRenderClass(["mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl", principle.bg])}"><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass(["h-7 w-7", principle.iconColor])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><!--[-->`);
        ssrRenderList(principle.paths, (d, i) => {
          _push(`<path${ssrRenderAttr("d", d)}></path>`);
        });
        _push(`<!--]--></svg></div><h4 class="text-base font-semibold text-ink">${ssrInterpolate(principle.title)}</h4><p class="mt-2 text-sm leading-relaxed text-slate-custom">${ssrInterpolate(principle.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Investigaci\xF3n de respaldo: CIIEMAD-IPN",
        subtitle: "El Centro Interdisciplinario de Investigaciones y Estudios sobre Medio Ambiente y Desarrollo del IPN alberga el techo verde ligero extensivo de referencia.",
        centered: true,
        tag: "Investigaci\xF3n"
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"><div class="card overflow-hidden"><div class="relative h-52 overflow-hidden"><img${ssrRenderAttr("src", _imports_0)} alt="Techo verde ligero extensivo instalado en el CIIEMAD-IPN con vegetaci\xF3n Sedum" class="h-full w-full object-cover"></div><div class="p-4"><h4 class="text-sm font-semibold text-ink">TVLE del CIIEMAD</h4><p class="mt-1 text-xs leading-relaxed text-slate-custom">Techo verde ligero extensivo de 6 m\xB2 con capa drenante de paja y fibra de coco. Periodo de recuperaci\xF3n de inversi\xF3n: 18 meses.</p></div></div><div class="card overflow-hidden"><div class="relative h-52 overflow-hidden"><img${ssrRenderAttr("src", _imports_1)} alt="Cuadrantes del techo verde del CIIEMAD con vegetaci\xF3n crecida despu\xE9s de un a\xF1o de instalaci\xF3n" class="h-full w-full object-cover"></div><div class="p-4"><h4 class="text-sm font-semibold text-ink">Monitoreo de vegetaci\xF3n</h4><p class="mt-1 text-xs leading-relaxed text-slate-custom">Divisi\xF3n en cuadrantes para el seguimiento cient\xEDfico de la tasa de sobrevivencia vegetal, que supera el 100% en todas las especies.</p></div></div><div class="card overflow-hidden"><div class="relative h-52 overflow-hidden"><img${ssrRenderAttr("src", _imports_2)} alt="Vista a\xE9rea del edificio del CIIEMAD-IPN mostrando la ubicaci\xF3n del techo verde" class="h-full w-full object-cover"></div><div class="p-4"><h4 class="text-sm font-semibold text-ink">Ubicaci\xF3n en GAM</h4><p class="mt-1 text-xs leading-relaxed text-slate-custom">Alcald\xEDa Gustavo A. Madero, zona con d\xE9ficit de \xE1reas verdes urbanas y alta densidad poblacional.</p></div></div></div><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"><!--[-->`);
      ssrRenderList(ciiemadFindings, (finding) => {
        _push(`<div class="rounded-card bg-white p-4 shadow-card text-center"><span class="${ssrRenderClass([finding.color, "text-xl font-bold"])}">${ssrInterpolate(finding.value)}</span><p class="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-custom">${ssrInterpolate(finding.label)}</p></div>`);
      });
      _push(`<!--]--></div><p class="mt-4 text-center text-[10px] text-slate-custom"> Datos de: Cervantes N\xE1jera, A.L. (2021, 2025). Tesis de maestr\xEDa y doctorado, CIIEMAD-IPN. </p></div></section><section class="bg-white py-16"><div class="container-wide"><h3 class="text-2xl font-bold text-ink">Enfoque</h3><p class="mt-2 text-sm text-slate-custom max-w-3xl"> Tres dimensiones complementarias orientan el an\xE1lisis y las acciones del observatorio. </p><div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3"><div><div class="mb-3 inline-flex items-center gap-2 rounded-badge bg-primary-50 px-3 py-1"><span class="h-2 w-2 rounded-full bg-primary"></span><span class="text-xs font-semibold text-primary">Territorial</span></div><p class="text-sm leading-relaxed text-slate-custom"> An\xE1lisis espacial de la Ciudad de M\xE9xico para identificar zonas de alta prioridad ambiental. La dimensi\xF3n territorial considera la distribuci\xF3n de islas de calor, d\xE9ficit de vegetaci\xF3n y densidad urbana. </p></div><div><div class="mb-3 inline-flex items-center gap-2 rounded-badge bg-alert/10 px-3 py-1"><span class="h-2 w-2 rounded-full bg-alert"></span><span class="text-xs font-semibold text-alert-dark">Clim\xE1tico</span></div><p class="text-sm leading-relaxed text-slate-custom"> Evaluaci\xF3n del impacto de los techos verdes en la mitigaci\xF3n de islas de calor urbano, la captura de CO2 y la retenci\xF3n de agua pluvial. Se monitorean indicadores clim\xE1ticos clave para medir beneficios. </p></div><div><div class="mb-3 inline-flex items-center gap-2 rounded-badge bg-secondary/10 px-3 py-1"><span class="h-2 w-2 rounded-full bg-secondary"></span><span class="text-xs font-semibold text-secondary-dark">Tecnol\xF3gico</span></div><p class="text-sm leading-relaxed text-slate-custom"> Uso de inteligencia artificial, sistemas de informaci\xF3n geogr\xE1fica y sensores remotos para la detecci\xF3n, clasificaci\xF3n y monitoreo de infraestructura verde. Tecnolog\xEDa al servicio del an\xE1lisis ambiental. </p></div></div></div></section><section class="py-16"><div class="container-wide"><div class="overflow-hidden rounded-card bg-gradient-to-br from-primary-800 to-primary shadow-panel"><div class="p-8 lg:p-12"><span class="mb-3 inline-flex items-center gap-2 rounded-badge bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm"> Tecnolog\xEDa </span><h3 class="mt-4 text-2xl font-bold text-white">Datos, SIG e Inteligencia Artificial</h3><p class="mt-4 max-w-2xl text-base leading-relaxed text-white/75"> El observatorio integra m\xFAltiples capas de tecnolog\xEDa para generar conocimiento accionable sobre la infraestructura verde de la CDMX. </p><div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3"><div class="rounded-card bg-white/10 p-5 backdrop-blur-sm"><h4 class="text-sm font-semibold text-white">Datos abiertos</h4><p class="mt-2 text-xs leading-relaxed text-white/60"> Toda la informaci\xF3n del observatorio est\xE1 disponible en formatos abiertos (CSV, GeoJSON) para consulta, descarga y reutilizaci\xF3n. Compromiso con la transparencia y la rendici\xF3n de cuentas. </p></div><div class="rounded-card bg-white/10 p-5 backdrop-blur-sm"><h4 class="text-sm font-semibold text-white">Sistemas de informaci\xF3n geogr\xE1fica</h4><p class="mt-2 text-xs leading-relaxed text-white/60"> An\xE1lisis espacial con capas de temperatura superficial, NDVI, densidad poblacional, red vial y calidad del aire. Visualizaci\xF3n interactiva para exploraci\xF3n de datos. </p></div><div class="rounded-card bg-white/10 p-5 backdrop-blur-sm"><h4 class="text-sm font-semibold text-white">Inteligencia artificial</h4><p class="mt-2 text-xs leading-relaxed text-white/60"> Modelos de visi\xF3n por computadora para detecci\xF3n autom\xE1tica de techos verdes en im\xE1genes a\xE9reas. Sistema humano-en-el-bucle para validaci\xF3n y mejora continua del modelo. </p></div></div></div></div></div></section><section class="bg-white py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Sustento institucional y normativo",
        subtitle: "Marco legal y program\xE1tico que respalda la implementaci\xF3n de techos verdes en la Ciudad de M\xE9xico.",
        centered: true
      }, null, _parent));
      _push(`<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(normativas, (norma) => {
        _push(`<div class="card p-5"><div class="flex items-start gap-3"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style="${ssrRenderStyle({ backgroundColor: norma.color + "15" })}"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" style="${ssrRenderStyle({ color: norma.color })}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></div><div><p class="text-sm font-semibold text-ink leading-tight">${ssrInterpolate(norma.titulo)}</p><span class="mt-1 inline-block rounded-badge bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-ink-muted">${ssrInterpolate(norma.tipo)}</span></div></div><p class="mt-3 text-xs leading-relaxed text-slate-custom">${ssrInterpolate(norma.descripcion)}</p></div>`);
      });
      _push(`<!--]--></div><div class="mt-8 rounded-card border border-eco/20 bg-eco/5 p-5"><div class="flex gap-3"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eco/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div><h4 class="text-sm font-semibold text-eco-dark">Incentivo fiscal vigente</h4><p class="mt-1 text-sm leading-relaxed text-slate-custom"> Los inmuebles que instalen azoteas verdes conforme a la NADF-013 pueden obtener un <strong class="text-ink">descuento del 10% en el impuesto predial</strong>, seg\xFAn lo establecido en el C\xF3digo Fiscal de la Ciudad de M\xE9xico. </p></div></div></div></div></section><section class="bg-white py-16"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "L\xEDnea del tiempo",
        subtitle: "Hitos clave en el desarrollo del Observatorio de Techos Verdes CDMX.",
        centered: true
      }, null, _parent));
      _push(`<div class="relative mx-auto max-w-3xl"><div class="absolute left-6 top-0 h-full w-0.5 bg-primary-100 md:left-1/2 md:-translate-x-1/2"></div><div class="space-y-8"><!--[-->`);
      ssrRenderList(timeline, (event, index) => {
        _push(`<div class="${ssrRenderClass([
          "relative flex gap-6",
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        ])}"><div class="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2"><div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary shadow-sm"><div class="h-2 w-2 rounded-full bg-white"></div></div></div><div class="${ssrRenderClass(["ml-12 md:ml-0 md:w-1/2", index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"])}"><div class="card p-4"><span class="text-xs font-semibold text-primary">${ssrInterpolate(event.date)}</span><h4 class="mt-1 text-sm font-semibold text-ink">${ssrInterpolate(event.title)}</h4><p class="mt-1 text-xs leading-relaxed text-slate-custom">${ssrInterpolate(event.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></section><section class="py-16"><div class="container-wide"><div class="overflow-hidden rounded-card bg-white shadow-panel"><div class="grid grid-cols-1 lg:grid-cols-2"><div class="p-8 lg:p-12"><h3 class="text-2xl font-bold text-ink">Contacto e informaci\xF3n institucional</h3><p class="mt-4 text-base leading-relaxed text-slate-custom"> El Observatorio de Techos Verdes CDMX es una iniciativa que busca contribuir al desarrollo de pol\xEDticas p\xFAblicas basadas en evidencia para la sustentabilidad urbana de la Ciudad de M\xE9xico. </p><div class="mt-6 space-y-4"><div class="flex items-start gap-3"><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div><div><p class="text-sm font-semibold text-ink">Correo electr\xF3nico</p><p class="text-sm text-slate-custom">contacto@techosverdes.cdmx.gob.mx</p></div></div><div class="flex items-start gap-3"><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div><p class="text-sm font-semibold text-ink">Ubicaci\xF3n</p><p class="text-sm text-slate-custom">Ciudad de M\xE9xico, M\xE9xico</p></div></div><div class="flex items-start gap-3"><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div><div><p class="text-sm font-semibold text-ink">Instituci\xF3n</p><p class="text-sm text-slate-custom">Gobierno de la Ciudad de M\xE9xico</p></div></div></div></div><div class="flex items-center justify-center bg-gradient-to-br from-primary-50 to-eco/10 p-8 lg:p-12"><div class="text-center"><div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-card"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z"></path><path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68"></path><path d="M17 8c-.74-1.83-2.53-3-4.5-3"></path></svg></div><h4 class="text-lg font-bold text-primary">Observatorio de Techos Verdes</h4><p class="text-sm text-primary-light">Ciudad de M\xE9xico</p><p class="mt-4 max-w-xs text-xs leading-relaxed text-slate-custom"> Plataforma abierta para la sustentabilidad urbana. Datos, an\xE1lisis y visualizaci\xF3n de infraestructura verde. </p></div></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sobre/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C4GyLdU1.mjs.map
