import { _ as _sfc_main$2 } from './SectionTitle-Di4BE9k7.mjs';
import { _ as _export_sfc, u as useHead, a as __nuxt_component_1$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './DataSourceBadge-Dtt3IyCj.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { a as computeRiskProfileWithStructural, b as computeCostOfInaction, d as computeEffectiveM2, e as computeROI, l as linearRegression, f as correlationMatrix, g as computeIndiceNecesidad, C as COSTOS_REFERENCIA, T as TASAS } from './useStatisticalAnalysis-Cht9jiYj.mjs';
import { u as useFormatters } from './useFormatters-BCDq8oux.mjs';
import { g as greenRoofs } from './mock-roofs-D-tdE7ed.mjs';
import { c as candidateRoofs } from './mock-candidates-Cvvvd8Mv.mjs';
import { v as validationRecords } from './mock-validations-qSEi_ZEz.mjs';
import { k as kpiData } from './kpis-DWO-YlkK.mjs';
import { a as aptitudPesos } from './aptitud-pesos-B4e-CPf1.mjs';
import { i as indicesBioticos, a as indicadoresHidricos } from './mock-indicadores-hidricos-CcDAWtmA.mjs';
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
import './useDataSource-CcCLLLin.mjs';

const indicadoresEstructurales = [
  {
    alcaldia: "\xC1lvaro Obreg\xF3n",
    porcentajeConcretoAcero: 72,
    edadPromedioAnios: 35,
    porcentajeDictamenSeguro: 78,
    porcentajeZonaIII: 30,
    scorePrefactibilidadPromedio: 71,
    edificiosEvaluados: 145
  },
  {
    alcaldia: "Azcapotzalco",
    porcentajeConcretoAcero: 58,
    edadPromedioAnios: 42,
    porcentajeDictamenSeguro: 68,
    porcentajeZonaIII: 75,
    scorePrefactibilidadPromedio: 55,
    edificiosEvaluados: 120
  },
  {
    alcaldia: "Benito Ju\xE1rez",
    porcentajeConcretoAcero: 82,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 85,
    porcentajeZonaIII: 40,
    scorePrefactibilidadPromedio: 78,
    edificiosEvaluados: 190
  },
  {
    alcaldia: "Coyoac\xE1n",
    porcentajeConcretoAcero: 75,
    edadPromedioAnios: 33,
    porcentajeDictamenSeguro: 82,
    porcentajeZonaIII: 20,
    scorePrefactibilidadPromedio: 76,
    edificiosEvaluados: 160
  },
  {
    alcaldia: "Cuajimalpa",
    porcentajeConcretoAcero: 68,
    edadPromedioAnios: 25,
    porcentajeDictamenSeguro: 88,
    porcentajeZonaIII: 0,
    scorePrefactibilidadPromedio: 80,
    edificiosEvaluados: 65
  },
  {
    alcaldia: "Cuauht\xE9moc",
    porcentajeConcretoAcero: 65,
    edadPromedioAnios: 48,
    porcentajeDictamenSeguro: 62,
    porcentajeZonaIII: 80,
    scorePrefactibilidadPromedio: 52,
    edificiosEvaluados: 280
  },
  {
    alcaldia: "Gustavo A. Madero",
    porcentajeConcretoAcero: 55,
    edadPromedioAnios: 40,
    porcentajeDictamenSeguro: 65,
    porcentajeZonaIII: 70,
    scorePrefactibilidadPromedio: 53,
    edificiosEvaluados: 175
  },
  {
    alcaldia: "Iztacalco",
    porcentajeConcretoAcero: 50,
    edadPromedioAnios: 43,
    porcentajeDictamenSeguro: 55,
    porcentajeZonaIII: 90,
    scorePrefactibilidadPromedio: 42,
    edificiosEvaluados: 95
  },
  {
    alcaldia: "Iztapalapa",
    porcentajeConcretoAcero: 45,
    edadPromedioAnios: 38,
    porcentajeDictamenSeguro: 48,
    porcentajeZonaIII: 85,
    scorePrefactibilidadPromedio: 38,
    edificiosEvaluados: 230
  },
  {
    alcaldia: "Magdalena Contreras",
    porcentajeConcretoAcero: 60,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 85,
    porcentajeZonaIII: 0,
    scorePrefactibilidadPromedio: 75,
    edificiosEvaluados: 45
  },
  {
    alcaldia: "Miguel Hidalgo",
    porcentajeConcretoAcero: 80,
    edadPromedioAnios: 32,
    porcentajeDictamenSeguro: 83,
    porcentajeZonaIII: 35,
    scorePrefactibilidadPromedio: 77,
    edificiosEvaluados: 170
  },
  {
    alcaldia: "Milpa Alta",
    porcentajeConcretoAcero: 40,
    edadPromedioAnios: 28,
    porcentajeDictamenSeguro: 90,
    porcentajeZonaIII: 0,
    scorePrefactibilidadPromedio: 65,
    edificiosEvaluados: 30
  },
  {
    alcaldia: "Tl\xE1huac",
    porcentajeConcretoAcero: 42,
    edadPromedioAnios: 35,
    porcentajeDictamenSeguro: 45,
    porcentajeZonaIII: 95,
    scorePrefactibilidadPromedio: 35,
    edificiosEvaluados: 80
  },
  {
    alcaldia: "Tlalpan",
    porcentajeConcretoAcero: 70,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 84,
    porcentajeZonaIII: 15,
    scorePrefactibilidadPromedio: 77,
    edificiosEvaluados: 140
  },
  {
    alcaldia: "Venustiano Carranza",
    porcentajeConcretoAcero: 52,
    edadPromedioAnios: 45,
    porcentajeDictamenSeguro: 50,
    porcentajeZonaIII: 85,
    scorePrefactibilidadPromedio: 40,
    edificiosEvaluados: 130
  },
  {
    alcaldia: "Xochimilco",
    porcentajeConcretoAcero: 48,
    edadPromedioAnios: 32,
    porcentajeDictamenSeguro: 82,
    porcentajeZonaIII: 5,
    scorePrefactibilidadPromedio: 68,
    edificiosEvaluados: 55
  }
];
const SD_CONSTANTS = {
  M2_INICIAL: 79584,
  M2_POTENCIAL_TOTAL: 514e3,
  M2_DISPONIBLES_INICIAL: 434416,
  // 514k - 79.6k
  CAPACIDAD_MAX_ANUAL: 5e4,
  // techo práctico contratistas CDMX
  COSTO_INICIAL_M2: COSTOS_REFERENCIA.costoInstalacionTVLE,
  // 1200 MXN/m²
  COSTO_MINIMO_M2: 720,
  // piso: 60% del costo original
  DT: 0.25,
  // paso trimestral
  HORIZONTE_DEFAULT: 30
};
const SCENARIOS = [
  {
    id: "sin_intervencion",
    nombre: "Sin Intervenci\xF3n",
    descripcion: "No se instalan nuevos techos. Los existentes se degradan gradualmente.",
    color: "#D9363E",
    tasaInstalacionBase: 0,
    presupuestoAnualBase: 0,
    apoyoPolitico: 0,
    tasaAprendizaje: 0,
    tasaDegradacion: 0.02,
    fraccionReinversion: 0,
    participacionPrivada: 1
  },
  {
    id: "tendencial",
    nombre: "Tendencial",
    descripcion: "Continuaci\xF3n del ritmo actual de instalaci\xF3n sin cambios de pol\xEDtica.",
    color: "#F2A81D",
    tasaInstalacionBase: 5e3,
    presupuestoAnualBase: 6e6,
    apoyoPolitico: 0.2,
    tasaAprendizaje: 0.01,
    tasaDegradacion: 5e-3,
    fraccionReinversion: 0.05,
    participacionPrivada: 1
  },
  {
    id: "politica_activa",
    nombre: "Pol\xEDtica Activa",
    descripcion: "Programa gubernamental con incentivos fiscales y participaci\xF3n del sector privado.",
    color: "#18A5E3",
    tasaInstalacionBase: 1e4,
    presupuestoAnualBase: 15e6,
    apoyoPolitico: 0.6,
    tasaAprendizaje: 0.025,
    tasaDegradacion: 3e-3,
    fraccionReinversion: 0.15,
    participacionPrivada: 1.5
  },
  {
    id: "optimista",
    nombre: "Optimista",
    descripcion: "M\xE1xima inversi\xF3n, participaci\xF3n p\xFAblico-privada amplia y econom\xEDas de escala.",
    color: "#0E5E3A",
    tasaInstalacionBase: 2e4,
    presupuestoAnualBase: 3e7,
    apoyoPolitico: 0.9,
    tasaAprendizaje: 0.04,
    tasaDegradacion: 2e-3,
    fraccionReinversion: 0.25,
    participacionPrivada: 2.5
  }
];
const DEFAULT_LEVERS = {
  multiplicadorPresupuesto: 1,
  fraccionReinversion: 0.15,
  participacionPrivada: 1.5,
  aniosRetrasoPolitica: 0
};
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
function eulerStep(state, params, levers, dt) {
  const C = SD_CONSTANTS;
  const enRetraso = state.t < levers.aniosRetrasoPolitica;
  const costoUnit = Math.max(
    C.COSTO_MINIMO_M2,
    C.COSTO_INICIAL_M2 * Math.pow(1 - params.tasaAprendizaje, state.t)
  );
  let tasaInstalacionEfectiva = 0;
  if (!enRetraso && params.tasaInstalacionBase > 0 && state.m2Disponibles > 0) {
    const factorSaturacion = state.m2Disponibles / C.M2_POTENCIAL_TOTAL;
    const fracObjetivo = state.m2Instalados / C.M2_POTENCIAL_TOTAL;
    const factorDemostracion = 1 + params.apoyoPolitico * Math.log(1 + fracObjetivo * 10);
    const presupEfectivo = state.presupuestoAnual;
    const costoAnualBase = costoUnit * params.tasaInstalacionBase;
    const factorPresupuesto = costoAnualBase > 0 ? clamp(presupEfectivo / costoAnualBase, 0.5, 3) : 1;
    const privada = params.participacionPrivada * levers.participacionPrivada / DEFAULT_LEVERS.participacionPrivada;
    const tasaBruta = params.tasaInstalacionBase * factorPresupuesto * factorDemostracion * privada;
    tasaInstalacionEfectiva = tasaBruta * factorSaturacion * (1 - tasaBruta / (tasaBruta + C.CAPACIDAD_MAX_ANUAL));
  }
  const instalacionEfectivaDt = Math.min(tasaInstalacionEfectiva * dt, state.m2Disponibles);
  const tasaEfectivaReal = instalacionEfectivaDt / dt;
  const degradacionDt = params.tasaDegradacion * state.m2Instalados * dt;
  const m2Instalados = Math.max(0, state.m2Instalados + instalacionEfectivaDt - degradacionDt);
  const m2Disponibles = Math.max(0, state.m2Disponibles - instalacionEfectivaDt);
  const energiaDtMwh = m2Instalados * TASAS.energiaKwhPorM2Anio / 1e3 * dt;
  const aguaDtM3 = m2Instalados * TASAS.aguaLPorM2Anio / 1e3 * dt;
  const co2DtTon = m2Instalados * TASAS.co2KgPorM2Anio / 1e3 * dt;
  const deltaTemperatura = -3.5 * (1 - Math.exp(-m2Instalados / TASAS.tempM2Ref));
  const ahorroAnual = m2Instalados * TASAS.energiaKwhPorM2Anio * COSTOS_REFERENCIA.costoElectricidadKwh + m2Instalados * TASAS.aguaLPorM2Anio / 1e3 * COSTOS_REFERENCIA.costoM3AguaNoGestionada + m2Instalados * TASAS.co2KgPorM2Anio / 1e3 * COSTOS_REFERENCIA.valorTonCO2;
  const fracReinversion = enRetraso ? 0 : (params.fraccionReinversion + levers.fraccionReinversion) / 2;
  const presupuestoAnual = params.presupuestoAnualBase * levers.multiplicadorPresupuesto + ahorroAnual * fracReinversion;
  return {
    t: state.t + dt,
    m2Instalados,
    m2Disponibles,
    presupuestoAnual,
    deltaTemperatura,
    energiaAcumuladaMwh: state.energiaAcumuladaMwh + energiaDtMwh,
    aguaAcumuladaM3: state.aguaAcumuladaM3 + aguaDtM3,
    co2AcumuladaTon: state.co2AcumuladaTon + co2DtTon,
    tasaInstalacionEfectiva: tasaEfectivaReal,
    costoUnitarioActual: costoUnit,
    ahorroAnual
  };
}
function computeResumen(series, params) {
  const last = series[series.length - 1];
  let m2PicoAnual = 0;
  let anioPicoInstalacion = 0;
  for (const s of series) {
    if (s.tasaInstalacionEfectiva > m2PicoAnual) {
      m2PicoAnual = s.tasaInstalacionEfectiva;
      anioPicoInstalacion = Math.round(s.t);
    }
  }
  let inversionTotal = 0;
  for (let i = 1; i < series.length; i++) {
    const dt = series[i].t - series[i - 1].t;
    const nuevosM2 = Math.max(0, series[i].m2Instalados - series[i - 1].m2Instalados + params.tasaDegradacion * series[i - 1].m2Instalados * dt);
    inversionTotal += nuevosM2 * series[i].costoUnitarioActual;
    inversionTotal += series[i].m2Instalados * COSTOS_REFERENCIA.costoMantenimientoAnual * dt;
  }
  let beneficioTotal = 0;
  for (let i = 1; i < series.length; i++) {
    const dt = series[i].t - series[i - 1].t;
    beneficioTotal += series[i].ahorroAnual * dt;
  }
  const roiPct = inversionTotal > 0 ? (beneficioTotal - inversionTotal) / inversionTotal * 100 : 0;
  return {
    m2FinalInstalados: Math.round(last.m2Instalados),
    m2PicoAnual: Math.round(m2PicoAnual),
    anioPicoInstalacion,
    energiaTotalMwh: Math.round(last.energiaAcumuladaMwh),
    aguaTotalM3: Math.round(last.aguaAcumuladaM3),
    co2TotalTon: Math.round(last.co2AcumuladaTon * 10) / 10,
    tempReduccionFinal: Math.round(last.deltaTemperatura * 100) / 100,
    inversionTotal: Math.round(inversionTotal),
    beneficioTotal: Math.round(beneficioTotal),
    roiPct: Math.round(roiPct * 10) / 10
  };
}
function runSimulation(params, horizonte = SD_CONSTANTS.HORIZONTE_DEFAULT, levers = DEFAULT_LEVERS) {
  const C = SD_CONSTANTS;
  const dt = C.DT;
  let state = {
    t: 0,
    m2Instalados: C.M2_INICIAL,
    m2Disponibles: C.M2_DISPONIBLES_INICIAL,
    presupuestoAnual: params.presupuestoAnualBase * levers.multiplicadorPresupuesto,
    deltaTemperatura: -3.5 * (1 - Math.exp(-79584 / TASAS.tempM2Ref)),
    energiaAcumuladaMwh: 0,
    aguaAcumuladaM3: 0,
    co2AcumuladaTon: 0,
    tasaInstalacionEfectiva: 0,
    costoUnitarioActual: C.COSTO_INICIAL_M2,
    ahorroAnual: 0
  };
  const series = [{ ...state }];
  const totalSteps = Math.round(horizonte / dt);
  for (let i = 0; i < totalSteps; i++) {
    state = eulerStep(state, params, levers, dt);
    series.push({ ...state });
  }
  return {
    scenarioId: params.id,
    params,
    series,
    resumen: computeResumen(series, params)
  };
}
function runAllScenarios(horizonte = SD_CONSTANTS.HORIZONTE_DEFAULT, levers = DEFAULT_LEVERS) {
  return SCENARIOS.map((params) => runSimulation(params, horizonte, levers));
}
function sampleAnnual(series) {
  const dt = SD_CONSTANTS.DT;
  const stepsPerYear = Math.round(1 / dt);
  const sampled = [series[0]];
  for (let i = stepsPerYear; i < series.length; i += stepsPerYear) {
    sampled.push(series[i]);
  }
  return sampled;
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SimulacionDinamica",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatNumber } = useFormatters();
    const fmt = (v) => formatNumber(v);
    const fmtDec = (v) => formatNumber(v, true);
    const mxnFmt = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    });
    const fmtMXN = (v) => Number.isFinite(v) ? mxnFmt.format(v) : "$0";
    const scenarios = SCENARIOS;
    const activeScenarios = reactive({
      sin_intervencion: true,
      tendencial: true,
      politica_activa: true,
      optimista: true
    });
    const horizonteOptions = [10, 20, 30, 40, 50];
    const horizonte = ref(30);
    const levers = reactive({ ...DEFAULT_LEVERS });
    const expandedPalancas = ref(false);
    const expandedTabla = ref(false);
    const expandedMetodologia = ref(false);
    const allResults = computed(() => {
      return runAllScenarios(horizonte.value, levers);
    });
    const activeResults = computed(() => {
      return allResults.value.filter((r) => activeScenarios[r.scenarioId]);
    });
    computed(() => {
      if (activeResults.value.length === 0) return [];
      const annual = sampleAnnual(activeResults.value[0].series);
      return annual.map((s) => `${Math.round(s.t)}`);
    });
    function buildDatasets(getValue) {
      return activeResults.value.map((r) => {
        const annual = sampleAnnual(r.series);
        return {
          label: r.params.nombre,
          data: annual.map((s) => Math.round(getValue(s) * 100) / 100),
          borderColor: r.params.color,
          fill: false
        };
      });
    }
    computed(() => buildDatasets((s) => s.m2Instalados));
    computed(() => buildDatasets((s) => s.tasaInstalacionEfectiva));
    computed(() => buildDatasets((s) => s.deltaTemperatura));
    computed(() => buildDatasets((s) => s.energiaAcumuladaMwh));
    computed(() => buildDatasets((s) => s.co2AcumuladaTon));
    computed(() => buildDatasets((s) => s.costoUnitarioActual));
    const tableMetrics = [
      { key: "m2", label: "m\xB2 finales instalados", format: (r) => fmt(r.m2FinalInstalados) },
      { key: "pico", label: "Pico de instalaci\xF3n (m\xB2/a\xF1o)", format: (r) => fmt(r.m2PicoAnual) },
      { key: "anioPico", label: "A\xF1o del pico", format: (r) => `A\xF1o ${r.anioPicoInstalacion}` },
      { key: "energia", label: "Energ\xEDa ahorrada (MWh)", format: (r) => fmt(r.energiaTotalMwh) },
      { key: "agua", label: "Agua captada (m\xB3)", format: (r) => fmt(r.aguaTotalM3) },
      { key: "co2", label: "CO\u2082 evitado (ton)", format: (r) => fmtDec(r.co2TotalTon) },
      { key: "temp", label: "Reducci\xF3n temperatura (\xB0C)", format: (r) => r.tempReduccionFinal.toFixed(2) },
      { key: "inversion", label: "Inversi\xF3n total (MXN)", format: (r) => fmtMXN(r.inversionTotal) },
      { key: "beneficio", label: "Beneficio total (MXN)", format: (r) => fmtMXN(r.beneficioTotal) },
      { key: "roi", label: "ROI (%)", format: (r) => `${r.roiPct.toFixed(1)}%` }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonSectionTitle = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="py-12"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Simulaci\xF3n de Din\xE1mica de Sistemas",
        subtitle: "Modelo con ciclos de retroalimentaci\xF3n, saturaci\xF3n territorial y curvas de aprendizaje para proyectar escenarios de pol\xEDtica p\xFAblica.",
        tag: "Simulaci\xF3n"
      }, null, _parent));
      _push(`<h3 class="mt-10 text-lg font-semibold text-ink">Ciclos del modelo</h3><p class="mt-1 text-sm text-slate-custom">Cuatro mecanismos que determinan la velocidad y alcance de la instalaci\xF3n de techos verdes.</p><div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="panel p-4 border-l-4 border-eco"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eco/10 text-xs font-bold text-eco">R1</span><h4 class="text-sm font-semibold text-ink">Ciclo Virtuoso</h4><span class="badge-eco text-[10px]">Reforzante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> M\xE1s techos verdes \u2192 mayores ahorros energ\xE9ticos e h\xEDdricos \u2192 m\xE1s presupuesto disponible \u2192 m\xE1s instalaciones. </p></div><div class="panel p-4 border-l-4 border-primary"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">R2</span><h4 class="text-sm font-semibold text-ink">Efecto Demostraci\xF3n</h4><span class="badge-primary text-[10px]">Reforzante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> M\xE1s techos verdes \u2192 mayor visibilidad \u2192 apoyo pol\xEDtico y social \u2192 m\xE1s programas e incentivos. </p></div><div class="panel p-4 border-l-4 border-accent"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">B1</span><h4 class="text-sm font-semibold text-ink">Saturaci\xF3n Territorial</h4><span class="badge-accent text-[10px]">Balanceante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> M\xE1s techos instalados \u2192 menos sitios disponibles \u2192 menor tasa de nuevas instalaciones. </p></div><div class="panel p-4 border-l-4 border-alert"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-alert/10 text-xs font-bold text-alert">B2</span><h4 class="text-sm font-semibold text-ink">Capacidad de Implementaci\xF3n</h4><span class="badge-alert text-[10px]">Balanceante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> Alta demanda \u2192 escasez de contratistas y materiales \u2192 costos crecientes \u2192 instalaci\xF3n m\xE1s lenta. </p></div></div></div></section><section class="py-12 bg-white border-t border-gray-100"><div class="container-wide"><h3 class="text-lg font-semibold text-ink">Controles de simulaci\xF3n</h3><div class="mt-4"><p class="text-xs font-medium text-slate-custom mb-2">Escenarios activos</p><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(scenarios), (sc) => {
        _push(`<button class="${ssrRenderClass([unref(activeScenarios)[sc.id] ? "border-current shadow-sm scale-[1.02]" : "border-gray-200 text-slate-custom opacity-60 hover:opacity-80", "flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all"])}" style="${ssrRenderStyle(unref(activeScenarios)[sc.id] ? { color: sc.color, borderColor: sc.color } : {})}"><span class="h-2.5 w-2.5 rounded-full" style="${ssrRenderStyle({ backgroundColor: unref(activeScenarios)[sc.id] ? sc.color : "#9ca3af" })}"></span> ${ssrInterpolate(sc.nombre)}</button>`);
      });
      _push(`<!--]--></div></div><div class="mt-6"><p class="text-xs font-medium text-slate-custom mb-2">Horizonte de simulaci\xF3n</p><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(horizonteOptions, (y) => {
        _push(`<button class="${ssrRenderClass([unref(horizonte) === y ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-slate-custom hover:bg-gray-200", "rounded-lg px-3 py-1.5 text-xs font-medium transition-all"])}">${ssrInterpolate(y)} a\xF1os </button>`);
      });
      _push(`<!--]--></div></div><div class="mt-6"><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedPalancas) }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(expandedPalancas) ? "Ocultar palancas" : "Palancas de pol\xEDtica")}</button><div class="mt-4 panel p-4 space-y-4" style="${ssrRenderStyle(unref(expandedPalancas) ? null : { display: "none" })}"><p class="text-[10px] text-slate-custom">Estas palancas modifican <strong>todos</strong> los escenarios activos simult\xE1neamente.</p><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Multiplicador de presupuesto</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate(unref(levers).multiplicadorPresupuesto.toFixed(1))}x</span></div><input${ssrRenderAttr("value", unref(levers).multiplicadorPresupuesto)} type="range" min="0.5" max="3" step="0.1" class="mt-1 w-full accent-primary"></div><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Fracci\xF3n de reinversi\xF3n</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate((unref(levers).fraccionReinversion * 100).toFixed(0))}%</span></div><input${ssrRenderAttr("value", unref(levers).fraccionReinversion)} type="range" min="0" max="0.5" step="0.01" class="mt-1 w-full accent-primary"></div><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Participaci\xF3n privada</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate(unref(levers).participacionPrivada.toFixed(1))}x</span></div><input${ssrRenderAttr("value", unref(levers).participacionPrivada)} type="range" min="1" max="3" step="0.1" class="mt-1 w-full accent-primary"></div><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Retraso de pol\xEDtica</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate(unref(levers).aniosRetrasoPolitica)} a\xF1os</span></div><input${ssrRenderAttr("value", unref(levers).aniosRetrasoPolitica)} type="range" min="0" max="5" step="1" class="mt-1 w-full accent-primary"></div><button class="btn-ghost text-xs"> Restablecer palancas </button></div></div></div></section><section class="py-12 border-t border-gray-100"><div class="container-wide"><h3 class="text-lg font-semibold text-ink">Proyecci\xF3n comparativa</h3><p class="mt-1 text-sm text-slate-custom">Evoluci\xF3n temporal de cada escenario durante ${ssrInterpolate(unref(horizonte))} a\xF1os.</p><div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></section><section class="py-12 bg-white border-t border-gray-100"><div class="container-wide"><h3 class="text-lg font-semibold text-ink">Resumen por escenario</h3><p class="mt-1 text-sm text-slate-custom">M\xE9tricas al final del horizonte de ${ssrInterpolate(unref(horizonte))} a\xF1os.</p><div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(activeResults), (r) => {
        _push(`<div class="panel p-4 border-l-4" style="${ssrRenderStyle({ borderLeftColor: r.params.color })}"><h4 class="text-sm font-semibold text-ink">${ssrInterpolate(r.params.nombre)}</h4><div class="mt-3 space-y-2"><div class="flex justify-between text-xs"><span class="text-slate-custom">m\xB2 finales</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmt(r.resumen.m2FinalInstalados))}</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">Pico instalaci\xF3n</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmt(r.resumen.m2PicoAnual))} m\xB2/a\xF1o</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">Energ\xEDa total</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmt(r.resumen.energiaTotalMwh))} MWh</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">CO\u2082 evitado</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmtDec(r.resumen.co2TotalTon))} ton</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">\u0394T final</span><span class="font-semibold tabular-nums">${ssrInterpolate(r.resumen.tempReduccionFinal.toFixed(2))}\xB0C</span></div><hr class="border-gray-100"><div class="flex justify-between text-xs"><span class="text-slate-custom">Inversi\xF3n total</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmtMXN(r.resumen.inversionTotal))}</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">ROI</span><span class="${ssrRenderClass([r.resumen.roiPct >= 0 ? "text-eco" : "text-alert", "font-semibold tabular-nums"])}">${ssrInterpolate(r.resumen.roiPct.toFixed(1))}% </span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-6"><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTabla) }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(expandedTabla) ? "Ocultar tabla comparativa" : "Ver tabla comparativa detallada")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTabla) ? null : { display: "none" })}"><table class="table-base w-full min-w-[600px]"><thead><tr><th>M\xE9trica</th><!--[-->`);
      ssrRenderList(unref(activeResults), (r) => {
        _push(`<th class="text-right"><span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full" style="${ssrRenderStyle({ backgroundColor: r.params.color })}"></span> ${ssrInterpolate(r.params.nombre)}</span></th>`);
      });
      _push(`<!--]--></tr></thead><tbody><!--[-->`);
      ssrRenderList(tableMetrics, (metric) => {
        _push(`<tr><td class="font-medium whitespace-nowrap">${ssrInterpolate(metric.label)}</td><!--[-->`);
        ssrRenderList(unref(activeResults), (r) => {
          _push(`<td class="text-right tabular-nums">${ssrInterpolate(metric.format(r.resumen))}</td>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></section><section class="py-12 border-t border-gray-100"><div class="container-wide"><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedMetodologia) }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(expandedMetodologia) ? "Ocultar nota metodol\xF3gica" : "Nota metodol\xF3gica")}</button><div class="mt-4 panel p-6 space-y-4 text-xs text-slate-custom leading-relaxed" style="${ssrRenderStyle(unref(expandedMetodologia) ? null : { display: "none" })}"><h4 class="text-sm font-semibold text-ink">M\xE9todo de integraci\xF3n</h4><p> Se utiliza el m\xE9todo de <strong>Euler expl\xEDcito</strong> con paso temporal dt = 0.25 a\xF1os (trimestral), lo que genera ${ssrInterpolate(Math.round(unref(horizonte) / 0.25))} pasos por escenario. Las gr\xE1ficas muestran muestras anuales para mayor legibilidad. </p><h4 class="text-sm font-semibold text-ink">Ciclos de retroalimentaci\xF3n</h4><ul class="list-disc pl-4 space-y-1"><li><strong>R1 (Ciclo Virtuoso):</strong> Los ahorros generados por techos existentes se reinvierten parcialmente, aumentando el presupuesto disponible.</li><li><strong>R2 (Efecto Demostraci\xF3n):</strong> La visibilidad de los techos instalados genera apoyo pol\xEDtico que facilita nuevos programas. Modelado con funci\xF3n logar\xEDtmica.</li><li><strong>B1 (Saturaci\xF3n Territorial):</strong> A medida que se cubren los sitios disponibles (514,000 m\xB2 potenciales), la tasa de instalaci\xF3n disminuye proporcionalmente.</li><li><strong>B2 (Capacidad de Implementaci\xF3n):</strong> La demanda de instalaci\xF3n est\xE1 limitada por la capacidad del mercado local (m\xE1x. ~50,000 m\xB2/a\xF1o), modelada como restricci\xF3n log\xEDstica.</li></ul><h4 class="text-sm font-semibold text-ink">Supuestos clave</h4><ul class="list-disc pl-4 space-y-1"><li>Inventario inicial: 79,584 m\xB2 (Cervantes N\xE1jera, 2025)</li><li>Potencial total: 514,000 m\xB2 (an\xE1lisis GIS multicriterio)</li><li>Costo base: $1,200 MXN/m\xB2 (TVLE extensivo)</li><li>Costo m\xEDnimo (econom\xEDas de escala): $720 MXN/m\xB2 (60% del original)</li><li>Tasas de impacto ambiental: Cervantes N\xE1jera (2021, 2025) CIIEMAD-IPN</li><li>La temperatura sigue un modelo exponencial asint\xF3tico (\u22123.5\xB0C m\xE1ximo)</li></ul><h4 class="text-sm font-semibold text-ink">Limitaciones</h4><ul class="list-disc pl-4 space-y-1"><li>No incluye efectos estacionales ni variabilidad clim\xE1tica interanual</li><li>Los costos de referencia son constantes (excepto la curva de aprendizaje de instalaci\xF3n)</li><li>La capacidad de implementaci\xF3n es una aproximaci\xF3n, no una medici\xF3n del mercado</li><li>No considera cambios regulatorios impredecibles ni disrupciones externas</li></ul><div class="rounded-lg border border-accent/30 bg-accent/5 p-3"><p><span class="font-semibold text-accent">Nota:</span> Este modelo es una <strong>herramienta exploratoria</strong> para comparar escenarios de pol\xEDtica p\xFAblica, no una predicci\xF3n determinista. Los resultados deben interpretarse como tendencias relativas entre escenarios, no como pron\xF3sticos absolutos. </p></div><h4 class="text-sm font-semibold text-ink">Fuentes</h4><ul class="list-disc pl-4 space-y-1"><li>Cervantes N\xE1jera, A.L. (2021). Tesis de maestr\xEDa, CIIEMAD-IPN.</li><li>Cervantes N\xE1jera, A.L. (2025). Tesis doctoral, CIIEMAD-IPN.</li><li>CFE (2024). Tarifa DAC promedio CDMX.</li><li>CONAGUA/SACMEX (2022). Costos de agua no gestionada.</li><li>M\xE9xico2 (2024). Precio cr\xE9dito de carbono.</li></ul></div></div></section></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/indicadores/SimulacionDinamica.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { scoreColor, kpiColor } = useFormatters();
    useHead({
      title: "Indicadores | Observatorio Techos Verdes CDMX",
      meta: [
        { name: "description", content: "Indicadores ambientales, biol\xF3gicos e h\xEDdricos del Observatorio de Techos Verdes CDMX. Biodiversidad, captaci\xF3n pluvial y distribuci\xF3n territorial." }
      ]
    });
    const tabs = [
      { id: "territorial", label: "Distribuci\xF3n Territorial", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
      { id: "aptitud", label: "Aptitud y Validaciones", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' },
      { id: "ambiente", label: "Medio Ambiente", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
      { id: "estadistico", label: "An\xE1lisis Estad\xEDstico", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { id: "simulacion", label: "Simulaci\xF3n Din\xE1mica", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' }
    ];
    const activeTab = ref("territorial");
    const expandedTables = reactive({
      alcaldia: false,
      biodiversidad: false,
      hidrico: false,
      fuentes: false
    });
    const sortStates = reactive({
      alcaldia: { col: "", dir: "desc" },
      bio: { col: "coberturaVegetal", dir: "desc" },
      hidrico: { col: "precipitacionMediaAnual", dir: "desc" },
      plan: { col: "indice", dir: "desc" }
    });
    function sortedBy(data, state, getters) {
      if (!state.col || !getters[state.col]) return data;
      const getter = getters[state.col];
      const dir = state.dir === "asc" ? 1 : -1;
      return [...data].sort((a, b) => {
        const va = getter(a);
        const vb = getter(b);
        if (typeof va === "string" && typeof vb === "string") return dir * va.localeCompare(vb);
        return dir * (va - vb);
      });
    }
    function sortIcon(state, col) {
      if (state.col !== col) return "\u2195";
      return state.dir === "asc" ? "\u2191" : "\u2193";
    }
    const kpis = kpiData;
    const alcaldiaDataRaw = computed(() => {
      const map = /* @__PURE__ */ new Map();
      greenRoofs.forEach((r) => {
        const entry = map.get(r.alcaldia) || { existing: 0, candidates: 0 };
        entry.existing++;
        map.set(r.alcaldia, entry);
      });
      candidateRoofs.forEach((r) => {
        const entry = map.get(r.alcaldia) || { existing: 0, candidates: 0 };
        entry.candidates++;
        map.set(r.alcaldia, entry);
      });
      return Array.from(map.entries()).map(([alcaldia, data]) => ({ alcaldia, ...data })).sort((a, b) => b.existing + b.candidates - (a.existing + a.candidates));
    });
    const alcaldiaData = computed(() => {
      if (!sortStates.alcaldia.col) return alcaldiaDataRaw.value;
      return sortedBy(alcaldiaDataRaw.value, sortStates.alcaldia, {
        alcaldia: (r) => r.alcaldia,
        existing: (r) => r.existing,
        candidates: (r) => r.candidates
      });
    });
    computed(() => alcaldiaData.value.map((d) => d.alcaldia));
    computed(() => [
      {
        label: "Existentes",
        data: alcaldiaData.value.map((d) => d.existing),
        backgroundColor: "#0E5E3A",
        borderRadius: 4
      },
      {
        label: "Candidatos",
        data: alcaldiaData.value.map((d) => d.candidates),
        backgroundColor: "#18A5E3",
        borderRadius: 4
      }
    ]);
    const buildingTypeData = computed(() => {
      const map = /* @__PURE__ */ new Map();
      greenRoofs.forEach((r) => {
        map.set(r.tipoEdificio, (map.get(r.tipoEdificio) || 0) + 1);
      });
      const colors = {
        hospital: "#D9363E",
        mercado: "#F2A81D",
        supermercado: "#18A5E3",
        centro_comercial: "#0E5E3A",
        oficinas: "#5E6B78",
        residencial: "#79C141",
        educativo: "#A855F7",
        gobierno: "#0E5E3A",
        cultural: "#F97316",
        industrial: "#64748B"
      };
      const labels = {
        hospital: "Hospital",
        mercado: "Mercado",
        supermercado: "Supermercado",
        centro_comercial: "Centro comercial",
        oficinas: "Oficinas",
        residencial: "Residencial",
        educativo: "Educativo",
        gobierno: "Gobierno",
        cultural: "Cultural",
        industrial: "Industrial"
      };
      return Array.from(map.entries()).map(([type, count]) => ({
        type,
        label: labels[type] || (type ? type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ") : type),
        count,
        color: colors[type] || "#5E6B78"
      })).sort((a, b) => b.count - a.count);
    });
    computed(() => buildingTypeData.value.map((d) => d.label));
    computed(() => [
      {
        label: "Techos verdes",
        data: buildingTypeData.value.map((d) => d.count),
        backgroundColor: buildingTypeData.value.map((d) => d.color),
        borderRadius: 4
      }
    ]);
    const techoTypeData = computed(() => {
      const map = /* @__PURE__ */ new Map();
      greenRoofs.forEach((r) => {
        map.set(r.tipoTechoVerde, (map.get(r.tipoTechoVerde) || 0) + 1);
      });
      const colors = {
        extensivo: "#79C141",
        intensivo: "#0E5E3A",
        "semi-intensivo": "#18A5E3",
        productivo: "#F2A81D",
        biodiverso: "#A855F7"
      };
      const labels = {
        extensivo: "Extensivo",
        intensivo: "Intensivo",
        "semi-intensivo": "Semi-intensivo",
        productivo: "Productivo",
        biodiverso: "Biodiverso"
      };
      return Array.from(map.entries()).map(([type, count]) => ({
        type,
        label: labels[type] || type,
        count,
        color: colors[type] || "#5E6B78"
      })).sort((a, b) => b.count - a.count);
    });
    computed(() => techoTypeData.value.map((d) => d.label));
    computed(() => techoTypeData.value.map((d) => d.count));
    computed(() => techoTypeData.value.map((d) => d.color));
    const totalValidations = validationRecords.length;
    const validationProgress = computed(() => [
      { status: "confirmado", label: "Confirmados", count: validationRecords.filter((r) => r.estado === "confirmado").length, color: "#79C141" },
      { status: "rechazado", label: "Rechazados", count: validationRecords.filter((r) => r.estado === "rechazado").length, color: "#D9363E" },
      { status: "indeterminado", label: "Indeterminados", count: validationRecords.filter((r) => r.estado === "indeterminado").length, color: "#5E6B78" },
      { status: "pendiente", label: "Pendientes", count: validationRecords.filter((r) => r.estado === "pendiente").length, color: "#F2A81D" }
    ]);
    computed(() => validationProgress.value.map((v) => v.label));
    computed(() => validationProgress.value.map((v) => v.count));
    computed(() => validationProgress.value.map((v) => v.color));
    const completedCount = computed(() => totalValidations - validationRecords.filter((r) => r.estado === "pendiente").length);
    const completedPct = computed(() => completedCount.value / totalValidations * 100);
    computed(() => aptitudPesos.map((p) => p.variable.replace(/\s*\(.*\)/, "")));
    computed(() => {
      const keys = [
        "lst",
        "areaUrbanizada",
        "poblacion",
        "ndvi",
        "densidadVial",
        "o3",
        "co",
        "no2"
      ];
      const ranges = {
        lst: { min: 28, max: 42 },
        areaUrbanizada: { min: 60, max: 100 },
        poblacion: { min: 5e3, max: 2e4 },
        ndvi: { min: 0, max: 0.4 },
        densidadVial: { min: 5, max: 20 },
        o3: { min: 30, max: 75 },
        co: { min: 0.5, max: 2.5 },
        no2: { min: 15, max: 50 }
      };
      return keys.map((key) => {
        const sum = candidateRoofs.reduce((acc, r) => acc + r.variables[key], 0);
        const avg = sum / candidateRoofs.length;
        const range = ranges[key];
        let normalised;
        if (key === "ndvi") {
          normalised = (range.max - avg) / (range.max - range.min) * 100;
        } else {
          normalised = (avg - range.min) / (range.max - range.min) * 100;
        }
        return Math.max(0, Math.min(100, Math.round(normalised)));
      });
    });
    const histogramBins = [
      { min: 45, max: 55, label: "45-55" },
      { min: 55, max: 65, label: "55-65" },
      { min: 65, max: 75, label: "65-75" },
      { min: 75, max: 85, label: "75-85" },
      { min: 85, max: 95, label: "85-95" },
      { min: 95, max: 100, label: "95-100" }
    ];
    histogramBins.map((b) => b.label);
    computed(() => {
      const counts = histogramBins.map(
        (bin) => candidateRoofs.filter((r) => r.scoreAptitud >= bin.min && r.scoreAptitud < (bin.max === 100 ? 101 : bin.max)).length
      );
      const colors = ["#D9363E", "#F97316", "#F2A81D", "#79C141", "#0E5E3A", "#0E5E3A"];
      return [
        {
          label: "Candidatos",
          data: counts,
          backgroundColor: colors,
          borderRadius: 4
        }
      ];
    });
    const topAlcaldias = computed(() => {
      const map = /* @__PURE__ */ new Map();
      candidateRoofs.forEach((r) => {
        const entry = map.get(r.alcaldia) || { total: 0, count: 0 };
        entry.total += r.scoreAptitud;
        entry.count++;
        map.set(r.alcaldia, entry);
      });
      return Array.from(map.entries()).map(([alcaldia, data]) => ({
        alcaldia,
        avgScore: data.total / data.count,
        count: data.count
      })).sort((a, b) => b.avgScore - a.avgScore).slice(0, 5);
    });
    const bioSorted = computed(
      () => [...indicesBioticos].sort((a, b) => b.riquezaEspecies - a.riquezaEspecies)
    );
    const bioKpis = computed(() => {
      const n = indicesBioticos.length;
      const riquezaPromedio = indicesBioticos.reduce((s, r) => s + r.riquezaEspecies, 0) / n;
      const shannonPromedio = indicesBioticos.reduce((s, r) => s + r.indiceShannonWiener, 0) / n;
      const simpsonPromedio = indicesBioticos.reduce((s, r) => s + r.indiceSimpson, 0) / n;
      const coberturaPromedio = indicesBioticos.reduce((s, r) => s + r.coberturaVegetal, 0) / n;
      const allSpecies = new Set(indicesBioticos.flatMap((r) => r.especiesDominantes));
      return { riquezaPromedio, shannonPromedio, simpsonPromedio, coberturaPromedio, totalEspecies: allSpecies.size };
    });
    computed(() => bioSorted.value.map((d) => d.alcaldia));
    computed(() => [
      {
        label: "Riqueza de especies",
        data: bioSorted.value.map((d) => d.riquezaEspecies),
        backgroundColor: bioSorted.value.map((d) => {
          if (d.riquezaEspecies >= 25) return "#0E5E3A";
          if (d.riquezaEspecies >= 18) return "#79C141";
          if (d.riquezaEspecies >= 12) return "#F2A81D";
          return "#D9363E";
        }),
        borderRadius: 4
      }
    ]);
    computed(() => [
      "Biodiversidad",
      "Cobertura",
      "Riqueza",
      "Abundancia",
      "Shannon H'",
      "Simpson 1-D"
    ]);
    computed(() => {
      const n = indicesBioticos.length;
      const avgBio = indicesBioticos.reduce((s, r) => s + r.indiceBiodiversidad, 0) / n;
      const avgCob = indicesBioticos.reduce((s, r) => s + r.coberturaVegetal, 0) / n;
      const avgRiq = indicesBioticos.reduce((s, r) => s + r.riquezaEspecies, 0) / n / 28 * 100;
      const avgAbu = indicesBioticos.reduce((s, r) => s + r.abundanciaIndividuos, 0) / n / 2e3 * 100;
      const avgSha = indicesBioticos.reduce((s, r) => s + r.indiceShannonWiener, 0) / n / 3 * 100;
      const avgSim = indicesBioticos.reduce((s, r) => s + r.indiceSimpson, 0) / n * 100;
      return [avgBio, avgCob, avgRiq, avgAbu, avgSha, avgSim].map((v) => Math.round(Math.min(100, v)));
    });
    const bioTableData = computed(
      () => sortedBy([...indicesBioticos], sortStates.bio, {
        alcaldia: (r) => r.alcaldia,
        coberturaVegetal: (r) => r.coberturaVegetal,
        riquezaEspecies: (r) => r.riquezaEspecies,
        shannon: (r) => r.indiceShannonWiener,
        simpson: (r) => r.indiceSimpson
      })
    );
    const coberturaSorted = computed(
      () => [...indicesBioticos].sort((a, b) => b.coberturaVegetal - a.coberturaVegetal)
    );
    computed(() => coberturaSorted.value.map((d) => d.alcaldia));
    computed(() => [
      {
        label: "Cobertura vegetal (%)",
        data: coberturaSorted.value.map((d) => d.coberturaVegetal),
        backgroundColor: coberturaSorted.value.map((d) => {
          if (d.coberturaVegetal >= 80) return "#0E5E3A";
          if (d.coberturaVegetal >= 60) return "#79C141";
          return "#F2A81D";
        }),
        borderRadius: 4
      }
    ]);
    computed(() => ["> 80%", "60-80%", "< 60%"]);
    computed(() => [
      indicesBioticos.filter((r) => r.coberturaVegetal > 80).length,
      indicesBioticos.filter((r) => r.coberturaVegetal >= 60 && r.coberturaVegetal <= 80).length,
      indicesBioticos.filter((r) => r.coberturaVegetal < 60).length
    ]);
    computed(() => ["#0E5E3A", "#79C141", "#F2A81D"]);
    const hidricoSorted = computed(
      () => [...indicadoresHidricos].sort((a, b) => b.captacionPluvial - a.captacionPluvial)
    );
    const hidricoKpis = computed(() => {
      const n = indicadoresHidricos.length;
      const captacionTotal = indicadoresHidricos.reduce((s, r) => s + r.captacionPluvial, 0);
      const escorrentiaTotal = indicadoresHidricos.reduce((s, r) => s + r.escorrentiaEvitada, 0);
      const eficienciaPromedio = indicadoresHidricos.reduce((s, r) => s + r.eficienciaRetencion, 0) / n;
      const precipitacionMedia = indicadoresHidricos.reduce((s, r) => s + r.precipitacionMediaAnual, 0) / n;
      return { captacionTotal: Math.round(captacionTotal * 10) / 10, escorrentiaTotal, eficienciaPromedio, precipitacionMedia };
    });
    computed(() => hidricoSorted.value.map((d) => d.alcaldia));
    computed(() => [
      {
        label: "Captaci\xF3n pluvial (L/m\xB2/a\xF1o)",
        data: hidricoSorted.value.map((d) => d.captacionPluvial),
        backgroundColor: hidricoSorted.value.map((d) => {
          if (d.captacionPluvial >= 22) return "#0284C7";
          if (d.captacionPluvial >= 18) return "#18A5E3";
          return "#7DD3FC";
        }),
        borderRadius: 4
      }
    ]);
    const precipitacionSorted = computed(
      () => [...indicadoresHidricos].sort((a, b) => b.precipitacionMediaAnual - a.precipitacionMediaAnual)
    );
    computed(() => precipitacionSorted.value.map((d) => d.alcaldia));
    computed(() => [
      {
        label: "Precipitaci\xF3n media anual (mm)",
        data: precipitacionSorted.value.map((d) => d.precipitacionMediaAnual),
        borderColor: "#0284C7",
        fill: true
      }
    ]);
    const hidricoTableData = computed(
      () => sortedBy([...indicadoresHidricos], sortStates.hidrico, {
        alcaldia: (r) => r.alcaldia,
        precipitacionMediaAnual: (r) => r.precipitacionMediaAnual,
        captacionPluvial: (r) => r.captacionPluvial,
        escorrentiaEvitada: (r) => r.escorrentiaEvitada,
        superficieVerdeCaptadora: (r) => r.superficieVerdeCaptadora,
        eficienciaRetencion: (r) => r.eficienciaRetencion
      })
    );
    const m2Slider = ref(79584);
    const yearsHorizon = ref(10);
    const m2Presets = [
      { label: "5,000 m\xB2 (1 edificio)", value: 5e3 },
      { label: "25,000 m\xB2 (colonia)", value: 25e3 },
      { label: "79,584 m\xB2 (inventario actual)", value: 79584 },
      { label: "200,000 m\xB2 (meta corto plazo)", value: 2e5 },
      { label: "514,000 m\xB2 (potencial tesis)", value: 514e3 }
    ];
    function formatMXN(value, compact = false) {
      if (!Number.isFinite(value)) return "$0";
      if (compact && Math.abs(value) >= 1e6) {
        return "$" + (value / 1e6).toLocaleString("es-MX", { maximumFractionDigits: 1 }) + "M";
      }
      return "$" + Math.round(value).toLocaleString("es-MX");
    }
    const bioMap = new Map(indicesBioticos.map((b) => [b.alcaldia, b]));
    const hidMap = new Map(indicadoresHidricos.map((h) => [h.alcaldia, h]));
    const estMap = new Map(indicadoresEstructurales.map((e) => [e.alcaldia, e]));
    const alcaldiaListForRisk = computed(
      () => indicesBioticos.map((b) => b.alcaldia).sort((a, b) => a.localeCompare(b, "es"))
    );
    const selectedAlcaldia = ref("");
    const alcaldiaAggregates = computed(() => {
      const alcaldias = [.../* @__PURE__ */ new Set([
        ...indicesBioticos.map((b) => b.alcaldia),
        ...candidateRoofs.map((c) => c.alcaldia)
      ])];
      return alcaldias.map((alc) => {
        var _a, _b, _c, _d, _e, _f;
        const cands = candidateRoofs.filter((c) => c.alcaldia === alc);
        const bio = bioMap.get(alc);
        const hid = hidMap.get(alc);
        const est = estMap.get(alc);
        const lstProm = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.lst, 0) / cands.length : 35;
        const o3Prom = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.o3, 0) / cands.length : 55;
        const no2Prom = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.no2, 0) / cands.length : 30;
        const pobProm = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.poblacion, 0) / cands.length : 1e4;
        const m2Cands = cands.reduce((s, c) => s + c.superficie, 0);
        return {
          alcaldia: alc,
          lstProm,
          o3Prom,
          no2Prom,
          pobProm,
          m2Cands,
          coberturaVegetal: (_a = bio == null ? void 0 : bio.coberturaVegetal) != null ? _a : 60,
          captacionPluvial: (_b = hid == null ? void 0 : hid.captacionPluvial) != null ? _b : 18,
          shannon: (_c = bio == null ? void 0 : bio.indiceShannonWiener) != null ? _c : 2,
          indiceBiodiversidad: (_d = bio == null ? void 0 : bio.indiceBiodiversidad) != null ? _d : 50,
          scorePrefactibilidadPromedio: (_e = est == null ? void 0 : est.scorePrefactibilidadPromedio) != null ? _e : 50,
          edadPromedioAnios: (_f = est == null ? void 0 : est.edadPromedioAnios) != null ? _f : 35
        };
      });
    });
    const selectedAlcData = computed(
      () => {
        var _a, _b;
        return (_b = (_a = alcaldiaAggregates.value.find((a) => a.alcaldia === selectedAlcaldia.value)) != null ? _a : alcaldiaAggregates.value[0]) != null ? _b : { lstProm: 35, o3Prom: 55, no2Prom: 30, pobProm: 1e4, m2Cands: 5e3, coberturaVegetal: 60, captacionPluvial: 18, shannon: 2, indiceBiodiversidad: 50, scorePrefactibilidadPromedio: 50, edadPromedioAnios: 35, alcaldia: "" };
      }
    );
    const riskProfile = computed(
      () => computeRiskProfileWithStructural({
        lstPromedio: selectedAlcData.value.lstProm,
        o3Promedio: selectedAlcData.value.o3Prom,
        no2Promedio: selectedAlcData.value.no2Prom,
        coberturaVegetal: selectedAlcData.value.coberturaVegetal,
        captacionPluvial: selectedAlcData.value.captacionPluvial,
        shannon: selectedAlcData.value.shannon,
        poblacion: selectedAlcData.value.pobProm,
        scorePrefactibilidadPromedio: selectedAlcData.value.scorePrefactibilidadPromedio
      })
    );
    const riskAlertCount = computed(
      () => riskProfile.value.indicadores.filter((i) => i.nivel === "critico" || i.nivel === "alto").length
    );
    function riskLevelColor(nivel) {
      const map = { critico: "#D9363E", alto: "#F97316", moderado: "#F2A81D", bajo: "#79C141" };
      return map[nivel];
    }
    function riskBarWidth(ind) {
      const ranges = {
        "Isla de calor": [28, 42],
        "Calidad del aire (O\u2083)": [20, 100],
        "D\xE9ficit vegetal": [40, 95],
        "Vulnerabilidad h\xEDdrica": [14, 26],
        "Biodiversidad": [1, 3],
        "Viabilidad constructiva": [0, 100]
      };
      const range = ranges[ind.nombre];
      if (!range) return 50;
      return Math.min(100, Math.max(0, (ind.valor - range[0]) / (range[1] - range[0]) * 100));
    }
    const inactionCost = computed(
      () => computeCostOfInaction(m2Slider.value, yearsHorizon.value, selectedAlcData.value.pobProm)
    );
    computed(
      () => inactionCost.value.serie.map((s) => `A\xF1o ${s.year}`)
    );
    const adjustForStructural = ref(true);
    const effectiveM2 = computed(() => {
      if (!adjustForStructural.value) {
        return { m2Efectivos: m2Slider.value, m2Descartados: 0, factorReduccion: 1 };
      }
      const est = estMap.get(selectedAlcaldia.value);
      const pctPrefactible = est ? est.scorePrefactibilidadPromedio : 60;
      const pctRequiereEval = Math.min(100 - pctPrefactible, 30);
      return computeEffectiveM2({
        m2Total: m2Slider.value,
        porcentajePrefactible: pctPrefactible,
        porcentajeRequiereEval: pctRequiereEval
      });
    });
    const physicalImpacts = computed(() => {
      const m2 = effectiveM2.value.m2Efectivos;
      const pob = selectedAlcData.value.pobProm;
      const energiaMwh = m2 * 432.95 / 1e3;
      const aguaM3 = m2 * 19.5 / 1e3;
      const co2Ton = m2 * 0.968 / 1e3;
      const consultasAnuales = Math.round(pob / 1e5 * 12);
      const tempReduction = 3.5 * (m2 / 79584);
      const hogares = Math.round(energiaMwh * 1e3 / 3500);
      return { energiaMwh, aguaM3, co2Ton, consultasAnuales, tempReduction, hogares };
    });
    computed(() => {
      const serie = inactionCost.value.serie;
      const m2 = effectiveM2.value.m2Efectivos;
      return [
        {
          label: "Energ\xEDa (MWh)",
          data: serie.map((_s, i) => Math.round(m2 * 432.95 / 1e3 * (i + 1))),
          backgroundColor: "#F2A81D",
          borderRadius: 2
        },
        {
          label: "Agua (m\xB3)",
          data: serie.map((_s, i) => Math.round(m2 * 19.5 / 1e3 * (i + 1))),
          backgroundColor: "#18A5E3",
          borderRadius: 2
        },
        {
          label: "CO\u2082 (ton)",
          data: serie.map((_s, i) => Math.round(m2 * 0.968 / 1e3 * (i + 1) * 10) / 10),
          backgroundColor: "#0E5E3A",
          borderRadius: 2
        }
      ];
    });
    const roiResult = computed(
      () => computeROI(effectiveM2.value.m2Efectivos, yearsHorizon.value, selectedAlcData.value.pobProm)
    );
    computed(
      () => roiResult.value.serieAnual.map((s) => `A\xF1o ${s.year}`)
    );
    computed(() => {
      const serie = roiResult.value.serieAnual;
      const m2 = effectiveM2.value.m2Efectivos;
      return [
        {
          label: "Energ\xEDa acumulada (MWh)",
          data: serie.map((_s, i) => Math.round(m2 * 432.95 / 1e3 * (i + 1))),
          borderColor: "#F2A81D",
          fill: false
        },
        {
          label: "Agua captada acumulada (m\xB3)",
          data: serie.map((_s, i) => Math.round(m2 * 19.5 / 1e3 * (i + 1))),
          borderColor: "#18A5E3",
          fill: false
        },
        {
          label: "CO\u2082 capturado acumulado (ton)",
          data: serie.map((_s, i) => Math.round(m2 * 0.968 / 1e3 * (i + 1) * 10) / 10),
          borderColor: "#0E5E3A",
          fill: false
        }
      ];
    });
    computed(
      () => candidateRoofs.map((c) => ({
        x: c.variables.lst,
        y: c.scoreAptitud,
        label: c.nombre
      }))
    );
    const regLstScore = computed(() => {
      const xs = candidateRoofs.map((c) => c.variables.lst);
      const ys = candidateRoofs.map((c) => c.scoreAptitud);
      return linearRegression(xs, ys);
    });
    computed(
      () => indicesBioticos.map((b) => ({
        x: b.indiceBiodiversidad,
        y: b.coberturaVegetal,
        label: b.alcaldia
      }))
    );
    const regBioCob = computed(() => {
      const xs = indicesBioticos.map((b) => b.indiceBiodiversidad);
      const ys = indicesBioticos.map((b) => b.coberturaVegetal);
      return linearRegression(xs, ys);
    });
    function interpretRegression(reg, varX, varY) {
      const r2 = reg.r2;
      const direction = reg.slope > 0 ? "positiva" : "negativa";
      let strength = "d\xE9bil";
      if (r2 >= 0.7) strength = "fuerte";
      else if (r2 >= 0.4) strength = "moderada";
      return `Correlaci\xF3n ${direction} ${strength} (R\xB2=${r2.toFixed(3)}): a mayor ${varX}, ${reg.slope > 0 ? "mayor" : "menor"} ${varY}.`;
    }
    const corrMatrix = computed(() => {
      const alcaldias = [...new Set(candidateRoofs.map((c) => c.alcaldia))];
      const alcData = alcaldias.map((alc) => {
        var _a, _b, _c, _d, _e;
        const cands = candidateRoofs.filter((c) => c.alcaldia === alc);
        const avgLst = cands.reduce((s, c) => s + c.variables.lst, 0) / cands.length;
        const avgNdvi = cands.reduce((s, c) => s + c.variables.ndvi, 0) / cands.length;
        const avgScore = cands.reduce((s, c) => s + c.scoreAptitud, 0) / cands.length;
        const avgPob = cands.reduce((s, c) => s + c.variables.poblacion, 0) / cands.length;
        const avgUrb = cands.reduce((s, c) => s + c.variables.areaUrbanizada, 0) / cands.length;
        const bio = bioMap.get(alc);
        const hid = hidMap.get(alc);
        const est = estMap.get(alc);
        return {
          lst: avgLst,
          ndvi: avgNdvi,
          score: avgScore,
          poblacion: avgPob,
          areaUrb: avgUrb,
          captacion: (_a = hid == null ? void 0 : hid.captacionPluvial) != null ? _a : 0,
          biodiversidad: (_b = bio == null ? void 0 : bio.indiceBiodiversidad) != null ? _b : 0,
          cobertura: (_c = bio == null ? void 0 : bio.coberturaVegetal) != null ? _c : 0,
          prefactibilidad: (_d = est == null ? void 0 : est.scorePrefactibilidadPromedio) != null ? _d : 50,
          edadProm: (_e = est == null ? void 0 : est.edadPromedioAnios) != null ? _e : 35
        };
      });
      return correlationMatrix({
        "LST": alcData.map((d) => d.lst),
        "NDVI": alcData.map((d) => d.ndvi),
        "Score": alcData.map((d) => d.score),
        "Poblaci\xF3n": alcData.map((d) => d.poblacion),
        "\xC1rea Urb.": alcData.map((d) => d.areaUrb),
        "Captaci\xF3n": alcData.map((d) => d.captacion),
        "Biodiv.": alcData.map((d) => d.biodiversidad),
        "Cobertura": alcData.map((d) => d.cobertura),
        "Prefact.": alcData.map((d) => d.prefactibilidad),
        "Edad edif.": alcData.map((d) => d.edadProm)
      });
    });
    function correlationColor(val) {
      if (val >= 0) {
        const intensity = Math.round(val * 200);
        return `rgb(${255 - intensity}, 255, ${255 - intensity})`;
      } else {
        const intensity = Math.round(Math.abs(val) * 200);
        return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
      }
    }
    const topCorrelations = computed(() => {
      const m = corrMatrix.value;
      const pairs = [];
      for (let i = 0; i < m.labels.length; i++) {
        for (let j = i + 1; j < m.labels.length; j++) {
          pairs.push({ pair: `${m.labels[i]} / ${m.labels[j]}`, value: m.matrix[i][j], interpretation: "" });
        }
      }
      pairs.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
      const top3 = pairs.slice(0, 3);
      const interps = {
        "LST": "Temperatura superficial alta indica mayor urgencia de intervenci\xF3n.",
        "Score": "Confirma que el modelo de aptitud captura correctamente las zonas de riesgo.",
        "Biodiv.": "Mayor cobertura verde se asocia con ecosistemas m\xE1s diversos.",
        "Cobertura": "La cobertura vegetal es el factor m\xE1s modificable por pol\xEDtica p\xFAblica.",
        "Captaci\xF3n": "La captaci\xF3n pluvial justifica la inversi\xF3n en zonas con d\xE9ficit h\xEDdrico.",
        "Poblaci\xF3n": "Alta densidad poblacional amplifica los beneficios sociales de la intervenci\xF3n.",
        "NDVI": "El \xEDndice de vegetaci\xF3n confirma el d\xE9ficit de \xE1reas verdes.",
        "\xC1rea Urb.": "Las zonas m\xE1s urbanizadas presentan mayor necesidad de naturaci\xF3n.",
        "Prefact.": "La viabilidad constructiva determina cu\xE1ntos m\xB2 son realmente aprovechables.",
        "Edad edif.": "Edificios m\xE1s antiguos requieren evaluaci\xF3n estructural antes de instalar techos verdes."
      };
      top3.forEach((t) => {
        const vars = t.pair.split(" / ");
        t.interpretation = interps[vars[0]] || interps[vars[1]] || "Correlaci\xF3n significativa para la toma de decisiones.";
      });
      return top3;
    });
    const necesidadRanking = computed(() => {
      const alcaldias = [.../* @__PURE__ */ new Set([
        ...indicesBioticos.map((b) => b.alcaldia),
        ...candidateRoofs.map((c) => c.alcaldia)
      ])];
      return alcaldias.map((alc) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const agg = alcaldiaAggregates.value.find((a) => a.alcaldia === alc);
        const lstProm = (_a = agg == null ? void 0 : agg.lstProm) != null ? _a : 35;
        const pobProm = (_b = agg == null ? void 0 : agg.pobProm) != null ? _b : 1e4;
        const bio = bioMap.get(alc);
        const hid = hidMap.get(alc);
        const indice = computeIndiceNecesidad({
          lstPromedio: lstProm,
          coberturaVegetal: (_c = bio == null ? void 0 : bio.coberturaVegetal) != null ? _c : 60,
          poblacion: pobProm,
          captacionPluvial: (_d = hid == null ? void 0 : hid.captacionPluvial) != null ? _d : 18,
          indiceBiodiversidad: (_e = bio == null ? void 0 : bio.indiceBiodiversidad) != null ? _e : 50
        });
        const factores = [];
        if (lstProm > 37) factores.push("Alta isla de calor");
        if (((_f = bio == null ? void 0 : bio.coberturaVegetal) != null ? _f : 60) < 55) factores.push("Baja cobertura vegetal");
        if (pobProm > 13e3) factores.push("Alta densidad poblacional");
        if (((_g = hid == null ? void 0 : hid.captacionPluvial) != null ? _g : 18) < 17) factores.push("Baja captaci\xF3n pluvial");
        if (((_h = bio == null ? void 0 : bio.indiceBiodiversidad) != null ? _h : 50) < 45) factores.push("Baja biodiversidad");
        if (factores.length === 0) factores.push("Moderado en todos los factores");
        return { alcaldia: alc, indice, factores: factores.join(", ") };
      }).sort((a, b) => b.indice - a.indice);
    });
    function necesidadColor(indice) {
      if (indice > 70) return "#D9363E";
      if (indice > 50) return "#F97316";
      if (indice > 30) return "#F2A81D";
      return "#79C141";
    }
    const actionPlanRankingRaw = computed(() => {
      return necesidadRanking.value.map((row) => {
        var _a, _b;
        const agg = alcaldiaAggregates.value.find((a) => a.alcaldia === row.alcaldia);
        const m2 = (_a = agg == null ? void 0 : agg.m2Cands) != null ? _a : 3e3;
        const est = estMap.get(row.alcaldia);
        const scorePrefact = (_b = est == null ? void 0 : est.scorePrefactibilidadPromedio) != null ? _b : 50;
        const pctPrefactible = scorePrefact;
        const pctRequiereEval = Math.min(100 - pctPrefactible, 30);
        const effM2 = computeEffectiveM2({ m2Total: m2, porcentajePrefactible: pctPrefactible, porcentajeRequiereEval: pctRequiereEval });
        const m2Ef = effM2.m2Efectivos;
        const inversion = m2Ef * COSTOS_REFERENCIA.costoInstalacionTVLE;
        const benefEnergiaAnual = m2Ef * 432.95 * COSTOS_REFERENCIA.costoElectricidadKwh;
        const benefAguaAnual = m2Ef * 19.5 / 1e3 * COSTOS_REFERENCIA.costoM3AguaNoGestionada;
        const benefCo2Anual = m2Ef * 0.968 / 1e3 * COSTOS_REFERENCIA.valorTonCO2;
        const beneficioAnual = benefEnergiaAnual + benefAguaAnual + benefCo2Anual;
        let viabilidad;
        if (scorePrefact >= 65) viabilidad = "Pre-factible";
        else if (scorePrefact >= 40) viabilidad = "Requiere eval.";
        else viabilidad = "No recomendado";
        let prioridad;
        if (row.indice > 70) prioridad = "Urgente";
        else if (row.indice > 50) prioridad = "Prioritario";
        else if (row.indice > 30) prioridad = "Importante";
        else prioridad = "Preventivo";
        return {
          ...row,
          m2Recomendados: m2,
          m2Efectivos: m2Ef,
          viabilidad,
          scorePrefact,
          inversion,
          beneficioAnual,
          prioridad
        };
      });
    });
    const actionPlanRanking = computed(
      () => sortedBy(actionPlanRankingRaw.value, sortStates.plan, {
        alcaldia: (r) => r.alcaldia,
        indice: (r) => r.indice,
        m2Recomendados: (r) => r.m2Recomendados,
        scorePrefact: (r) => r.scorePrefact,
        m2Efectivos: (r) => r.m2Efectivos,
        inversion: (r) => r.inversion,
        beneficioAnual: (r) => r.beneficioAnual
      })
    );
    function prioridadColor(prioridad) {
      const map = {
        "Urgente": "#D9363E",
        "Prioritario": "#F97316",
        "Importante": "#F2A81D",
        "Preventivo": "#79C141"
      };
      return map[prioridad] || "#64748B";
    }
    function viabilidadColor(viabilidad) {
      if (viabilidad === "Pre-factible") return "#79C141";
      if (viabilidad === "Requiere eval.") return "#F2A81D";
      return "#D9363E";
    }
    const envSources = [
      {
        name: "CONABIO",
        sourceName: "CONABIO",
        description: "Sistema Nacional de Informaci\xF3n sobre Biodiversidad (SNIB). Registros de especies, \xEDndices de biodiversidad urbana y monitoreo de flora en azoteas verdes.",
        color: "#059669"
      },
      {
        name: "SEDEMA",
        sourceName: "SEDEMA",
        description: "Secretar\xEDa del Medio Ambiente CDMX. Inventario de \xE1reas verdes, programas de naturaci\xF3n urbana y monitoreo de cobertura vegetal.",
        color: "#79C141"
      },
      {
        name: "CONAGUA",
        sourceName: "CONAGUA",
        description: "Comisi\xF3n Nacional del Agua / Servicio Meteorol\xF3gico Nacional. Datos pluviom\xE9tricos, estaciones climatol\xF3gicas y balance h\xEDdrico urbano.",
        color: "#0284C7"
      },
      {
        name: "SEMARNAT",
        sourceName: "SEMARNAT",
        description: "Secretar\xEDa de Medio Ambiente y Recursos Naturales. Normatividad ambiental federal, \xE1reas naturales protegidas y registros ambientales.",
        color: "#7C3AED"
      },
      {
        name: "Catastro CDMX",
        sourceName: "SIGCDMX",
        description: "Direcci\xF3n General de Catastro CDMX / SIGCDMX. Datos de construcci\xF3n, edad, tipo estructural, niveles y material de techumbre por predio.",
        color: "#6366F1"
      },
      {
        name: "Atlas de Riesgos",
        sourceName: "SGIRPC",
        description: "Secretar\xEDa de Gesti\xF3n Integral de Riesgos y Protecci\xF3n Civil. Zonificaci\xF3n s\xEDsmica, dict\xE1menes post-sismo 2017, riesgo de inundaci\xF3n.",
        color: "#EF4444"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const _component_CommonSectionTitle = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_CommonDataSourceBadge = _sfc_main$3;
      const _component_IndicadoresSimulacionDinamica = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))} data-v-0c196b3e><section class="bg-white py-16" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Indicadores Ambientales y Territoriales",
        subtitle: "M\xE9tricas clave del estado de los techos verdes en la Ciudad de M\xE9xico.",
        tag: "Indicadores"
      }, null, _parent));
      _push(`<div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(kpis), (kpi) => {
        _push(`<div class="kpi-card" data-v-0c196b3e><p class="${ssrRenderClass([unref(kpiColor)(kpi.color), "text-2xl font-bold"])}" data-v-0c196b3e>${ssrInterpolate(kpi.valor)}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>${ssrInterpolate(kpi.label)}</p>`);
        if (kpi.unidad) {
          _push(`<p class="text-[10px] text-ink-muted" data-v-0c196b3e>${ssrInterpolate(kpi.unidad)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (kpi.cambio) {
          _push(`<p class="mt-1 text-[10px] font-medium text-eco" data-v-0c196b3e>${ssrInterpolate(kpi.cambio)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><div class="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><nav class="flex gap-1 overflow-x-auto py-2 scrollbar-hide" aria-label="Secciones de indicadores" data-v-0c196b3e><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        var _a2;
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.id ? "bg-primary text-white shadow-sm" : "text-slate-custom hover:bg-gray-100 hover:text-ink", "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"])}" data-v-0c196b3e><span data-v-0c196b3e>${(_a2 = tab.icon) != null ? _a2 : ""}</span> ${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></nav></div></div><div style="${ssrRenderStyle(unref(activeTab) === "territorial" ? null : { display: "none" })}" data-v-0c196b3e><section class="py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Distribuci\xF3n por alcald\xEDa</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Cantidad de techos verdes existentes vs candidatos por alcald\xEDa</p><div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div class="panel p-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div data-v-0c196b3e><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors" data-v-0c196b3e><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTables).alcaldia }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-0c196b3e><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-0c196b3e></path></svg> ${ssrInterpolate(unref(expandedTables).alcaldia ? "Ocultar tabla" : "Ver tabla detallada")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTables).alcaldia ? null : { display: "none" })}" data-v-0c196b3e><table class="table-base w-full min-w-[320px]" data-v-0c196b3e><thead data-v-0c196b3e><tr data-v-0c196b3e><th class="cursor-pointer select-none" data-v-0c196b3e>Alcald\xEDa <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).alcaldia, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Existentes <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).alcaldia, "existing"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Candidatos <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).alcaldia, "candidates"))}</span></th></tr></thead><tbody data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(alcaldiaData), (row) => {
        _push(`<tr data-v-0c196b3e><td class="font-medium" data-v-0c196b3e>${ssrInterpolate(row.alcaldia)}</td><td data-v-0c196b3e><span class="font-semibold text-primary" data-v-0c196b3e>${ssrInterpolate(row.existing)}</span></td><td data-v-0c196b3e><span class="font-semibold text-secondary" data-v-0c196b3e>${ssrInterpolate(row.candidates)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div></section><section class="bg-white py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><div class="grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Distribuci\xF3n por tipo de edificio</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Clasificaci\xF3n seg\xFAn tipo de edificio</p><div class="mt-6 panel p-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Tipo de techo verde</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Clasificaci\xF3n seg\xFAn cubierta vegetal</p><div class="mt-6 flex justify-center" data-v-0c196b3e><div class="panel p-6" style="${ssrRenderStyle({ "max-width": "400px", "width": "100%" })}" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></div></div></section><section class="py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Zonas con mayor aptitud</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Top 5 alcald\xEDas por score promedio de aptitud territorial</p><div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5" data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(topAlcaldias), (item, index2) => {
        _push(`<div class="panel text-center" data-v-0c196b3e><div class="mb-2 flex items-center justify-center gap-1" data-v-0c196b3e><span class="${ssrRenderClass([
          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white",
          index2 === 0 ? "bg-primary" : index2 === 1 ? "bg-eco" : "bg-secondary"
        ])}" data-v-0c196b3e>${ssrInterpolate(index2 + 1)}</span></div><p class="text-sm font-semibold text-ink" data-v-0c196b3e>${ssrInterpolate(item.alcaldia)}</p><p class="mt-1 text-2xl font-bold" style="${ssrRenderStyle({ color: unref(scoreColor)(item.avgScore) })}" data-v-0c196b3e>${ssrInterpolate(item.avgScore.toFixed(1))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>score promedio</p><p class="mt-1 text-[10px] text-ink-muted" data-v-0c196b3e>${ssrInterpolate(item.count)} candidatos</p></div>`);
      });
      _push(`<!--]--></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "aptitud" ? null : { display: "none" })}" data-v-0c196b3e><section class="py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><div class="grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Distribuci\xF3n de scores de aptitud</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Histograma de los 60 candidatos priorizados</p><div class="mt-6 panel p-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Perfil de aptitud promedio</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>8 variables de aptitud territorial</p><div class="mt-6 flex justify-center" data-v-0c196b3e><div class="panel p-6" style="${ssrRenderStyle({ "max-width": "520px", "width": "100%" })}" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></div></div></section><section class="bg-white py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Avance de validaciones</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Estado de las validaciones con inteligencia artificial</p><div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2" data-v-0c196b3e><div class="panel p-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="flex items-center justify-center" data-v-0c196b3e><div class="text-center" data-v-0c196b3e><div class="relative mx-auto h-40 w-40" data-v-0c196b3e><svg viewBox="0 0 100 100" class="h-full w-full -rotate-90" data-v-0c196b3e><circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="12" data-v-0c196b3e></circle><circle cx="50" cy="50" r="40" fill="none" stroke="#79C141" stroke-width="12"${ssrRenderAttr("stroke-dasharray", `${unref(completedPct) * 2.51} 251`)} stroke-linecap="round" data-v-0c196b3e></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center" data-v-0c196b3e><span class="text-2xl font-bold text-ink" data-v-0c196b3e>${ssrInterpolate(unref(completedPct).toFixed(0))}%</span><span class="text-xs text-slate-custom" data-v-0c196b3e>completado</span></div></div><p class="mt-4 text-sm text-slate-custom" data-v-0c196b3e>${ssrInterpolate(unref(completedCount))} de ${ssrInterpolate(unref(totalValidations))} validaciones revisadas </p></div></div></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "ambiente" ? null : { display: "none" })}" data-v-0c196b3e><section class="py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><div class="flex items-center gap-3" data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>\xCDndices de biodiversidad por alcald\xEDa</h3>`);
      _push(ssrRenderComponent(_component_CommonDataSourceBadge, { "source-name": "CONABIO" }, null, _parent));
      _push(ssrRenderComponent(_component_CommonDataSourceBadge, { "source-name": "SEDEMA" }, null, _parent));
      _push(`</div><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>M\xE9tricas de diversidad biol\xF3gica en azoteas verdes, basadas en \xEDndices ecol\xF3gicos est\xE1ndar</p><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5" data-v-0c196b3e><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-primary" data-v-0c196b3e>${ssrInterpolate(unref(bioKpis).riquezaPromedio.toFixed(1))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Riqueza promedio</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>especies/alcald\xEDa</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-eco" data-v-0c196b3e>${ssrInterpolate(unref(bioKpis).shannonPromedio.toFixed(2))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Shannon H&#39; promedio</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>\xEDndice de diversidad</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-secondary" data-v-0c196b3e>${ssrInterpolate(unref(bioKpis).simpsonPromedio.toFixed(2))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Simpson 1-D promedio</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>\xEDndice de dominancia</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-accent" data-v-0c196b3e>${ssrInterpolate(unref(bioKpis).coberturaPromedio.toFixed(1))}%</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Cobertura promedio</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>vegetal en azoteas</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-primary" data-v-0c196b3e>${ssrInterpolate(unref(bioKpis).totalEspecies)}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Total especies</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>registradas en la red</p></div></div><div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div class="panel p-6" data-v-0c196b3e><h4 class="mb-4 text-sm font-semibold text-ink" data-v-0c196b3e>Riqueza de especies por alcald\xEDa</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6" data-v-0c196b3e><h4 class="mb-4 text-sm font-semibold text-ink" data-v-0c196b3e>Perfil bi\xF3tico promedio</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div class="mt-6" data-v-0c196b3e><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors" data-v-0c196b3e><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTables).biodiversidad }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-0c196b3e><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-0c196b3e></path></svg> ${ssrInterpolate(unref(expandedTables).biodiversidad ? "Ocultar tabla" : "Ver tabla detallada de biodiversidad")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTables).biodiversidad ? null : { display: "none" })}" data-v-0c196b3e><table class="table-base w-full min-w-[600px]" data-v-0c196b3e><thead data-v-0c196b3e><tr data-v-0c196b3e><th class="cursor-pointer select-none" data-v-0c196b3e>Alcald\xEDa <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).bio, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Cobertura % <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).bio, "coberturaVegetal"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Riqueza spp <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).bio, "riquezaEspecies"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>H&#39; <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).bio, "shannon"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>1-D <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).bio, "simpson"))}</span></th><th data-v-0c196b3e>Especies dominantes</th></tr></thead><tbody data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(bioTableData), (row) => {
        _push(`<tr data-v-0c196b3e><td class="font-medium whitespace-nowrap" data-v-0c196b3e>${ssrInterpolate(row.alcaldia)}</td><td data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="h-2 w-16 rounded-full bg-gray-200" data-v-0c196b3e><div class="h-2 rounded-full bg-eco" style="${ssrRenderStyle({ width: row.coberturaVegetal + "%" })}" data-v-0c196b3e></div></div><span class="text-sm font-semibold text-eco" data-v-0c196b3e>${ssrInterpolate(row.coberturaVegetal)}%</span></div></td><td class="font-semibold text-primary" data-v-0c196b3e>${ssrInterpolate(row.riquezaEspecies)}</td><td class="font-semibold text-secondary" data-v-0c196b3e>${ssrInterpolate(row.indiceShannonWiener.toFixed(2))}</td><td class="font-semibold text-accent" data-v-0c196b3e>${ssrInterpolate(row.indiceSimpson.toFixed(2))}</td><td class="text-xs text-slate-custom" data-v-0c196b3e>${ssrInterpolate(row.especiesDominantes.join(", "))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></section><section class="bg-white py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Cobertura vegetal en azoteas verdes</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Porcentaje de cobertura vegetal por alcald\xEDa y distribuci\xF3n por rangos</p><div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div class="panel p-6" data-v-0c196b3e><h4 class="mb-4 text-sm font-semibold text-ink" data-v-0c196b3e>Cobertura vegetal por alcald\xEDa (%)</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="flex items-center justify-center" data-v-0c196b3e><div class="panel p-6" style="${ssrRenderStyle({ "max-width": "400px", "width": "100%" })}" data-v-0c196b3e><h4 class="mb-4 text-center text-sm font-semibold text-ink" data-v-0c196b3e>Alcald\xEDas por rango de cobertura</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></div></section><section class="py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><div class="flex items-center gap-3" data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Indicadores h\xEDdricos y captaci\xF3n pluvial</h3>`);
      _push(ssrRenderComponent(_component_CommonDataSourceBadge, { "source-name": "CONAGUA" }, null, _parent));
      _push(`</div><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>M\xE9tricas de captaci\xF3n de agua pluvial, escorrent\xEDa evitada y eficiencia de retenci\xF3n en azoteas verdes</p><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" data-v-0c196b3e><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-secondary" data-v-0c196b3e>${ssrInterpolate(unref(hidricoKpis).captacionTotal.toLocaleString("es-MX"))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Captaci\xF3n total</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>L/m\xB2/a\xF1o (suma)</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-primary" data-v-0c196b3e>${ssrInterpolate(unref(hidricoKpis).escorrentiaTotal.toLocaleString("es-MX"))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Escorrent\xEDa evitada</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>L/a\xF1o (total)</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-eco" data-v-0c196b3e>${ssrInterpolate(unref(hidricoKpis).eficienciaPromedio.toFixed(1))}%</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Eficiencia promedio</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>retenci\xF3n h\xEDdrica</p></div><div class="kpi-card" data-v-0c196b3e><p class="text-2xl font-bold text-accent" data-v-0c196b3e>${ssrInterpolate(unref(hidricoKpis).precipitacionMedia.toFixed(0))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Precipitaci\xF3n media</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>mm/a\xF1o</p></div></div><div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div class="panel p-6" data-v-0c196b3e><h4 class="mb-4 text-sm font-semibold text-ink" data-v-0c196b3e>Captaci\xF3n pluvial por alcald\xEDa (L/m\xB2/a\xF1o)</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6" data-v-0c196b3e><h4 class="mb-4 text-sm font-semibold text-ink" data-v-0c196b3e>Precipitaci\xF3n media anual por alcald\xEDa (mm)</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div class="mt-6" data-v-0c196b3e><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors" data-v-0c196b3e><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTables).hidrico }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-0c196b3e><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-0c196b3e></path></svg> ${ssrInterpolate(unref(expandedTables).hidrico ? "Ocultar tabla" : "Ver tabla detallada de indicadores h\xEDdricos")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTables).hidrico ? null : { display: "none" })}" data-v-0c196b3e><table class="table-base w-full min-w-[600px]" data-v-0c196b3e><thead data-v-0c196b3e><tr data-v-0c196b3e><th class="cursor-pointer select-none" data-v-0c196b3e>Alcald\xEDa <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Precipitaci\xF3n <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "precipitacionMediaAnual"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Captaci\xF3n <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "captacionPluvial"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Escorrent\xEDa <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "escorrentiaEvitada"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Sup. capt. <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "superficieVerdeCaptadora"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Eficiencia <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "eficienciaRetencion"))}</span></th></tr></thead><tbody data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(hidricoTableData), (row) => {
        _push(`<tr data-v-0c196b3e><td class="font-medium whitespace-nowrap" data-v-0c196b3e>${ssrInterpolate(row.alcaldia)}</td><td class="font-semibold text-secondary" data-v-0c196b3e>${ssrInterpolate(row.precipitacionMediaAnual)}</td><td class="font-semibold text-primary" data-v-0c196b3e>${ssrInterpolate(row.captacionPluvial)}</td><td data-v-0c196b3e>${ssrInterpolate(row.escorrentiaEvitada.toLocaleString("es-MX"))} L</td><td data-v-0c196b3e>${ssrInterpolate(row.superficieVerdeCaptadora.toLocaleString("es-MX"))} m2</td><td data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="h-2 w-16 rounded-full bg-gray-200" data-v-0c196b3e><div class="h-2 rounded-full bg-secondary" style="${ssrRenderStyle({ width: row.eficienciaRetencion + "%" })}" data-v-0c196b3e></div></div><span class="text-sm font-semibold text-secondary" data-v-0c196b3e>${ssrInterpolate(row.eficienciaRetencion)}%</span></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "estadistico" ? null : { display: "none" })}" data-v-0c196b3e><section class="py-12" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "An\xE1lisis para Toma de Decisiones",
        subtitle: "Diagn\xF3stico de riesgo, costos de inacci\xF3n, retorno de inversi\xF3n y plan de acci\xF3n para autoridades de alcald\xEDa.",
        tag: "Decisiones"
      }, null, _parent));
      _push(`<div class="mt-10" data-v-0c196b3e><h3 class="text-lg font-semibold text-ink" data-v-0c196b3e>Diagn\xF3stico de riesgo clim\xE1tico</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Evaluaci\xF3n de 6 indicadores cr\xEDticos para la alcald\xEDa seleccionada</p><div class="mt-4" data-v-0c196b3e><label class="block text-sm font-semibold text-ink" data-v-0c196b3e>Alcald\xEDa</label><select class="select mt-1 max-w-xs" data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(alcaldiaListForRisk), (alc) => {
        _push(`<option${ssrRenderAttr("value", alc)} data-v-0c196b3e${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAlcaldia)) ? ssrLooseContain(unref(selectedAlcaldia), alc) : ssrLooseEqual(unref(selectedAlcaldia), alc)) ? " selected" : ""}>${ssrInterpolate(alc)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-6" data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(riskProfile).indicadores, (ind) => {
        _push(`<div class="${ssrRenderClass([{
          "border-l-4 border-l-alert": ind.nivel === "critico",
          "border-l-4 border-l-orange-500": ind.nivel === "alto",
          "border-l-4 border-l-accent": ind.nivel === "moderado",
          "border-l-4 border-l-eco": ind.nivel === "bajo"
        }, "panel p-4"])}" data-v-0c196b3e><p class="text-xs font-semibold text-ink" data-v-0c196b3e>${ssrInterpolate(ind.nombre)}</p><p class="mt-1 text-2xl font-bold" style="${ssrRenderStyle({ color: riskLevelColor(ind.nivel) })}" data-v-0c196b3e>${ssrInterpolate(typeof ind.valor === "number" && ind.valor % 1 !== 0 ? ind.valor.toFixed(1) : ind.valor)} <span class="text-xs font-normal text-slate-custom" data-v-0c196b3e>${ssrInterpolate(ind.unidad)}</span></p><div class="mt-2 h-2 w-full rounded-full bg-gray-200" data-v-0c196b3e><div class="h-2 rounded-full transition-all" style="${ssrRenderStyle({
          width: riskBarWidth(ind) + "%",
          backgroundColor: riskLevelColor(ind.nivel)
        })}" data-v-0c196b3e></div></div><p class="mt-1 text-[10px] font-bold uppercase" style="${ssrRenderStyle({ color: riskLevelColor(ind.nivel) })}" data-v-0c196b3e>${ssrInterpolate(ind.nivel)}</p><p class="mt-0.5 text-[10px] text-slate-custom" data-v-0c196b3e>${ssrInterpolate(ind.umbralRef)}</p></div>`);
      });
      _push(`<!--]--></div><div class="${ssrRenderClass([{
        "border-alert/40 bg-alert/5": unref(riskProfile).nivelGeneral === "critico",
        "border-orange-500/40 bg-orange-50": unref(riskProfile).nivelGeneral === "alto",
        "border-accent/40 bg-accent/5": unref(riskProfile).nivelGeneral === "moderado",
        "border-eco/40 bg-eco/5": unref(riskProfile).nivelGeneral === "bajo"
      }, "mt-6 rounded-lg border-2 p-5"])}" data-v-0c196b3e><div class="flex items-start gap-3" data-v-0c196b3e><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style="${ssrRenderStyle({ backgroundColor: riskLevelColor(unref(riskProfile).nivelGeneral) })}" data-v-0c196b3e><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-0c196b3e><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" data-v-0c196b3e></path><line x1="12" y1="9" x2="12" y2="13" data-v-0c196b3e></line><line x1="12" y1="17" x2="12.01" y2="17" data-v-0c196b3e></line></svg></div><div data-v-0c196b3e><p class="text-sm font-bold text-ink" data-v-0c196b3e> La alcald\xEDa ${ssrInterpolate(unref(selectedAlcaldia))} presenta un nivel de riesgo <span style="${ssrRenderStyle({ color: riskLevelColor(unref(riskProfile).nivelGeneral) })}" class="uppercase" data-v-0c196b3e>${ssrInterpolate(unref(riskProfile).nivelGeneral)}</span> (${ssrInterpolate(unref(riskProfile).scoreRiesgo.toFixed(0))}/100) </p><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>${ssrInterpolate(unref(riskAlertCount))} de ${ssrInterpolate(unref(riskProfile).indicadores.length)} indicadores en zona de alerta. Sin intervenci\xF3n, se espera un incremento sostenido en temperatura superficial y costos asociados a salud p\xFAblica por golpe de calor. </p></div></div></div></div><div class="mt-12" data-v-0c196b3e><h3 class="text-lg font-semibold text-ink" data-v-0c196b3e>Impacto potencial sin intervenci\xF3n</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Recursos no aprovechados y riesgos incrementales si no se instalan techos verdes</p><div class="mt-6 panel p-6" data-v-0c196b3e><div class="grid grid-cols-1 gap-6 md:grid-cols-2" data-v-0c196b3e><div data-v-0c196b3e><label class="block text-sm font-semibold text-ink" data-v-0c196b3e>Superficie de techos verdes</label><div class="mt-2 flex items-center gap-3" data-v-0c196b3e><input${ssrRenderAttr("value", unref(m2Slider))} type="range"${ssrRenderAttr("min", 1e3)}${ssrRenderAttr("max", 6e5)}${ssrRenderAttr("step", 1e3)} class="w-full accent-primary" data-v-0c196b3e><div class="flex items-center gap-1" data-v-0c196b3e><input${ssrRenderAttr("value", unref(m2Slider))} type="number" min="100" max="1000000" step="100" class="input w-28 text-right text-sm font-semibold tabular-nums" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>m\xB2</span></div></div><div class="mt-1 flex justify-between text-[10px] text-slate-custom" data-v-0c196b3e><span data-v-0c196b3e>1,000 m\xB2</span><span data-v-0c196b3e>600,000 m\xB2</span></div><div class="mt-2 flex flex-wrap gap-1.5" data-v-0c196b3e><!--[-->`);
      ssrRenderList(m2Presets, (preset) => {
        _push(`<button class="${ssrRenderClass([unref(m2Slider) === preset.value ? "bg-primary text-white" : "bg-gray-100 text-slate-custom hover:bg-gray-200", "rounded px-2 py-0.5 text-[10px] font-medium transition-all"])}" data-v-0c196b3e>${ssrInterpolate(preset.label)}</button>`);
      });
      _push(`<!--]--></div><div class="mt-3 flex flex-wrap items-center gap-2" data-v-0c196b3e><input id="adjustStructural"${ssrIncludeBooleanAttr(Array.isArray(unref(adjustForStructural)) ? ssrLooseContain(unref(adjustForStructural), null) : unref(adjustForStructural)) ? " checked" : ""} type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-primary accent-primary" data-v-0c196b3e><label for="adjustStructural" class="text-xs text-ink" data-v-0c196b3e>Ajustar por viabilidad constructiva</label>`);
      if (unref(adjustForStructural)) {
        _push(`<span class="rounded-full bg-eco/10 px-2 py-0.5 text-[10px] font-semibold text-eco-dark" data-v-0c196b3e>${ssrInterpolate(unref(effectiveM2).m2Efectivos.toLocaleString("es-MX"))} m\xB2 efectivos </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-0c196b3e><label class="block text-sm font-semibold text-ink" data-v-0c196b3e>Horizonte temporal</label><div class="mt-2 flex gap-2" data-v-0c196b3e><!--[-->`);
      ssrRenderList([5, 10, 15, 20], (h) => {
        _push(`<button class="${ssrRenderClass([unref(yearsHorizon) === h ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-ink hover:bg-gray-200", "rounded-lg px-4 py-2 text-sm font-medium transition-all"])}" data-v-0c196b3e>${ssrInterpolate(h)} a\xF1os </button>`);
      });
      _push(`<!--]--></div><p class="mt-3 text-[10px] text-slate-custom" data-v-0c196b3e> Poblaci\xF3n de referencia (alcald\xEDa seleccionada): ${ssrInterpolate(Math.round(unref(selectedAlcData).pobProm).toLocaleString("es-MX"))} hab. </p></div></div><div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" data-v-0c196b3e><div class="kpi-card border-l-4 border-l-accent" data-v-0c196b3e><p class="text-xl font-bold text-accent" data-v-0c196b3e>${ssrInterpolate(unref(physicalImpacts).energiaMwh.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} MWh/a\xF1o</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Energ\xEDa no ahorrada</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>equivale a ${ssrInterpolate(unref(physicalImpacts).hogares.toLocaleString("es-MX"))} hogares</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-0c196b3e>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 \xD7 432.95 kWh/m\xB2/a\xF1o <p class="mt-0.5 font-sans text-[9px] italic" data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 15, p. 112.</p></div></div><div class="kpi-card border-l-4 border-l-orange-500" data-v-0c196b3e><p class="text-xl font-bold text-orange-600" data-v-0c196b3e>${ssrInterpolate(unref(physicalImpacts).consultasAnuales)} consultas/a\xF1o</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Riesgo en salud p\xFAblica</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>urgencias estimadas por calor</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-0c196b3e>${ssrInterpolate((unref(selectedAlcData).pobProm / 1e5).toFixed(2))} (\xD7100k hab) \xD7 12 consul./a\xF1o <p class="mt-0.5 font-sans text-[9px] italic" data-v-0c196b3e>SINAVE (2023), zonas urbanas &gt;35\xB0C LST.</p></div></div><div class="kpi-card border-l-4 border-l-secondary" data-v-0c196b3e><p class="text-xl font-bold text-secondary" data-v-0c196b3e>${ssrInterpolate(unref(physicalImpacts).aguaM3.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} m\xB3/a\xF1o</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Agua no captada</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>escorrent\xEDa sin gestionar</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-0c196b3e>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 \xD7 19.5 L/m\xB2/a\xF1o \xF7 1000 <p class="mt-0.5 font-sans text-[9px] italic" data-v-0c196b3e>Cervantes N\xE1jera (2021), Cap. 5, p. 92.</p></div></div><div class="kpi-card border-l-4 border-l-primary" data-v-0c196b3e><p class="text-xl font-bold text-primary" data-v-0c196b3e>${ssrInterpolate(unref(physicalImpacts).co2Ton.toLocaleString("es-MX", { maximumFractionDigits: 1 }))} tonCO\u2082/a\xF1o</p><p class="text-xs text-slate-custom" data-v-0c196b3e>Emisiones no capturadas</p><p class="text-[10px] text-ink-muted" data-v-0c196b3e>${ssrInterpolate(formatMXN(unref(physicalImpacts).co2Ton * 500, true))} en mercado de carbono</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-0c196b3e>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 \xD7 0.968 kg/m\xB2/a\xF1o \xF7 1000 \xD7 $500/tonCO\u2082 <p class="mt-0.5 font-sans text-[9px] italic" data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 12. Precio: Mexico2 (2024).</p></div></div></div><div class="mt-4 rounded-xl border-2 border-accent/30 bg-accent/5 p-6" data-v-0c196b3e><p class="text-center text-sm font-semibold text-accent" data-v-0c196b3e>Impacto acumulado en ${ssrInterpolate(unref(yearsHorizon))} a\xF1os sin intervenci\xF3n</p><div class="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4 text-center" data-v-0c196b3e><div data-v-0c196b3e><p class="text-lg font-bold text-accent" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).energiaMwh * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))} GWh</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>energ\xEDa no ahorrada</p></div><div data-v-0c196b3e><p class="text-lg font-bold text-orange-600" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).consultasAnuales * unref(yearsHorizon)).toLocaleString("es-MX"))}</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>consultas evitables</p></div><div data-v-0c196b3e><p class="text-lg font-bold text-secondary" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).aguaM3 * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))} dam\xB3</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>agua no captada</p></div><div data-v-0c196b3e><p class="text-lg font-bold text-primary" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).co2Ton * unref(yearsHorizon)).toLocaleString("es-MX", { maximumFractionDigits: 0 }))} tonCO\u2082</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>emisiones no mitigadas</p></div></div></div><div class="mt-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div><div class="mt-12" data-v-0c196b3e><h3 class="text-lg font-semibold text-ink" data-v-0c196b3e>Potencial de mejora</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Beneficios ambientales y sociales estimados con la instalaci\xF3n de techos verdes</p><div class="mt-6 panel p-6" data-v-0c196b3e><div class="grid grid-cols-1 gap-6 md:grid-cols-2" data-v-0c196b3e><div class="rounded-lg border border-gray-200 p-5" data-v-0c196b3e><p class="text-sm font-semibold text-ink" data-v-0c196b3e>Situaci\xF3n actual (sin intervenci\xF3n)</p><div class="mt-4 space-y-3" data-v-0c196b3e><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>Ahorro energ\xE9tico</span><span class="text-sm font-bold text-ink" data-v-0c196b3e>0 MWh/a\xF1o</span></div><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>Agua captada</span><span class="text-sm font-bold text-ink" data-v-0c196b3e>0 m\xB3/a\xF1o</span></div><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>CO\u2082 capturado</span><span class="text-sm font-bold text-ink" data-v-0c196b3e>0 ton/a\xF1o</span></div><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>Reducci\xF3n temperatura</span><span class="text-sm font-bold text-ink" data-v-0c196b3e>0 \xB0C</span></div></div></div><div class="rounded-lg border border-eco/30 bg-eco/5 p-5" data-v-0c196b3e><p class="text-sm font-semibold text-ink" data-v-0c196b3e>Con ${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 de techos verdes</p><div class="mt-4 space-y-3" data-v-0c196b3e><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>Ahorro energ\xE9tico</span><span class="text-sm font-bold text-eco" data-v-0c196b3e>+${ssrInterpolate(unref(physicalImpacts).energiaMwh.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} MWh/a\xF1o</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-0c196b3e>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 \xD7 432.95 kWh/m\xB2/a\xF1o \u2014 Cervantes N\xE1jera (2025)</p><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>Agua captada</span><span class="text-sm font-bold text-secondary" data-v-0c196b3e>+${ssrInterpolate(unref(physicalImpacts).aguaM3.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} m\xB3/a\xF1o</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-0c196b3e>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 \xD7 19.5 L/m\xB2/a\xF1o \u2014 Cervantes N\xE1jera (2021)</p><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>CO\u2082 capturado</span><span class="text-sm font-bold text-primary" data-v-0c196b3e>+${ssrInterpolate(unref(physicalImpacts).co2Ton.toLocaleString("es-MX", { maximumFractionDigits: 1 }))} ton/a\xF1o</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-0c196b3e>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m\xB2 \xD7 0.968 kg/m\xB2/a\xF1o \u2014 valor: ${ssrInterpolate(formatMXN(unref(physicalImpacts).co2Ton * 500, true))}/a\xF1o (Mexico2, 2024)</p><div class="flex items-center justify-between" data-v-0c196b3e><span class="text-xs text-slate-custom" data-v-0c196b3e>Reducci\xF3n temperatura</span><span class="text-sm font-bold text-accent" data-v-0c196b3e>-${ssrInterpolate(unref(physicalImpacts).tempReduction.toFixed(2))} \xB0C</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-0c196b3e>3.5\xB0C \xD7 (${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} / 79,584) \u2014 Cervantes N\xE1jera (2021)</p></div></div></div><div class="mt-6 rounded-xl border-2 border-eco/30 bg-eco/5 p-6 text-center" data-v-0c196b3e><p class="text-sm font-semibold text-eco" data-v-0c196b3e>Impacto acumulado en ${ssrInterpolate(unref(yearsHorizon))} a\xF1os</p><div class="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4" data-v-0c196b3e><div data-v-0c196b3e><p class="text-2xl font-bold text-eco" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).energiaMwh * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>GWh ahorrados</p></div><div data-v-0c196b3e><p class="text-2xl font-bold text-secondary" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).aguaM3 * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>dam\xB3 captados</p></div><div data-v-0c196b3e><p class="text-2xl font-bold text-primary" data-v-0c196b3e>${ssrInterpolate((unref(physicalImpacts).co2Ton * unref(yearsHorizon)).toLocaleString("es-MX", { maximumFractionDigits: 0 }))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>tonCO\u2082 capturadas</p></div><div data-v-0c196b3e><p class="text-2xl font-bold text-accent" data-v-0c196b3e>${ssrInterpolate(unref(roiResult).periodoRecuperacion.toFixed(1))}</p><p class="text-xs text-slate-custom" data-v-0c196b3e>a\xF1os recuperaci\xF3n</p></div></div></div><div class="mt-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><p class="mt-4 text-[10px] text-slate-custom" data-v-0c196b3e> Tasas de impacto: Cervantes N\xE1jera (2021, 2025) CIIEMAD-IPN. Valor CO\u2082: $500 MXN/tonCO\u2082, Mexico2 mercado voluntario (2024). </p></div></div><div class="mt-12" data-v-0c196b3e><h3 class="text-lg font-semibold text-ink" data-v-0c196b3e>Justificaci\xF3n del modelo</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Evidencia estad\xEDstica que respalda la priorizaci\xF3n de techos verdes</p><div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-0c196b3e><div class="panel p-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`<div class="mt-4 space-y-2" data-v-0c196b3e><div class="rounded-lg bg-eco/5 p-3 text-xs" data-v-0c196b3e><p data-v-0c196b3e><span class="font-bold text-eco" data-v-0c196b3e>\xBFQu\xE9 demuestra?</span> ${ssrInterpolate(interpretRegression(unref(regLstScore), "temperatura superficial", "aptitud"))} El modelo explica el ${ssrInterpolate((unref(regLstScore).r2 * 100).toFixed(0))}% de la variabilidad.</p></div><div class="rounded-lg bg-primary-50 p-3 text-xs" data-v-0c196b3e><p data-v-0c196b3e><span class="font-bold text-primary" data-v-0c196b3e>Implicaci\xF3n:</span> Las zonas con mayor temperatura superficial son las que m\xE1s se beneficiar\xEDan de techos verdes. La priorizaci\xF3n por LST est\xE1 estad\xEDsticamente respaldada.</p></div></div></div><div class="panel p-6" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-0c196b3e${_scopeId}>Cargando gr\xE1fica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gr\xE1fica...")
            ];
          }
        })
      }, _parent));
      _push(`<div class="mt-4 space-y-2" data-v-0c196b3e><div class="rounded-lg bg-eco/5 p-3 text-xs" data-v-0c196b3e><p data-v-0c196b3e><span class="font-bold text-eco" data-v-0c196b3e>\xBFQu\xE9 demuestra?</span> ${ssrInterpolate(interpretRegression(unref(regBioCob), "biodiversidad", "cobertura vegetal"))}</p></div><div class="rounded-lg bg-primary-50 p-3 text-xs" data-v-0c196b3e><p data-v-0c196b3e><span class="font-bold text-primary" data-v-0c196b3e>Implicaci\xF3n:</span> Invertir en techos verdes no solo reduce temperatura: incrementa la biodiversidad urbana, un indicador clave de resiliencia ecol\xF3gica.</p></div></div></div></div><div class="mt-8" data-v-0c196b3e><h4 class="text-base font-semibold text-ink" data-v-0c196b3e>Matriz de correlaci\xF3n</h4><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Coeficientes de Pearson entre variables ambientales y territoriales</p><div class="mt-4 overflow-x-auto panel p-4" data-v-0c196b3e><table class="w-full border-collapse text-xs" data-v-0c196b3e><thead data-v-0c196b3e><tr data-v-0c196b3e><th class="p-2 text-left font-semibold text-ink" data-v-0c196b3e>\xA0</th><!--[-->`);
      ssrRenderList(unref(corrMatrix).labels, (label) => {
        _push(`<th class="p-2 text-center font-semibold text-ink" style="${ssrRenderStyle({ "min-width": "70px" })}" data-v-0c196b3e>${ssrInterpolate(label)}</th>`);
      });
      _push(`<!--]--></tr></thead><tbody data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(corrMatrix).matrix, (row, i) => {
        _push(`<tr data-v-0c196b3e><td class="p-2 font-semibold text-ink whitespace-nowrap" data-v-0c196b3e>${ssrInterpolate(unref(corrMatrix).labels[i])}</td><!--[-->`);
        ssrRenderList(row, (val, j) => {
          _push(`<td class="p-2 text-center font-mono" style="${ssrRenderStyle({
            backgroundColor: correlationColor(val),
            color: Math.abs(val) > 0.6 ? "#ffffff" : "#1F2937"
          })}" data-v-0c196b3e>${ssrInterpolate(val.toFixed(2))}</td>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-4 rounded-lg bg-primary-50 p-4" data-v-0c196b3e><p class="text-xs font-bold text-primary" data-v-0c196b3e>Correlaciones clave para pol\xEDtica p\xFAblica:</p><ul class="mt-2 space-y-1 text-xs text-slate-custom" data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(topCorrelations), (insight, idx) => {
        _push(`<li data-v-0c196b3e><span class="font-semibold text-ink" data-v-0c196b3e>${ssrInterpolate(insight.pair)}:</span> r=${ssrInterpolate(insight.value.toFixed(2))} \u2014 ${ssrInterpolate(insight.interpretation)}</li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="mt-12" data-v-0c196b3e><h3 class="text-lg font-semibold text-ink" data-v-0c196b3e>Priorizaci\xF3n y plan de acci\xF3n</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Ranking de alcald\xEDas con inversi\xF3n recomendada y beneficio estimado</p><div class="mt-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" data-v-0c196b3e><table class="table-base w-full min-w-[700px]" data-v-0c196b3e><thead data-v-0c196b3e><tr data-v-0c196b3e><th class="w-10" data-v-0c196b3e>#</th><th class="cursor-pointer select-none" data-v-0c196b3e>Alcald\xEDa <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Riesgo <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "indice"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>m\xB2 recom. <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "m2Recomendados"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Viabilidad <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "scorePrefact"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>m\xB2 efect. <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "m2Efectivos"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Inversi\xF3n <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "inversion"))}</span></th><th class="cursor-pointer select-none" data-v-0c196b3e>Beneficio <span class="text-[10px] opacity-60" data-v-0c196b3e>${ssrInterpolate(sortIcon(unref(sortStates).plan, "beneficioAnual"))}</span></th><th data-v-0c196b3e>Prioridad</th></tr></thead><tbody data-v-0c196b3e><!--[-->`);
      ssrRenderList(unref(actionPlanRanking), (row, idx) => {
        _push(`<tr data-v-0c196b3e><td class="font-bold" style="${ssrRenderStyle({ color: necesidadColor(row.indice) })}" data-v-0c196b3e>${ssrInterpolate(idx + 1)}</td><td class="font-medium whitespace-nowrap" data-v-0c196b3e>${ssrInterpolate(row.alcaldia)}</td><td data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="h-2 w-12 rounded-full bg-gray-200" data-v-0c196b3e><div class="h-2 rounded-full" style="${ssrRenderStyle({ width: row.indice + "%", backgroundColor: necesidadColor(row.indice) })}" data-v-0c196b3e></div></div><span class="text-xs font-bold" style="${ssrRenderStyle({ color: necesidadColor(row.indice) })}" data-v-0c196b3e>${ssrInterpolate(row.indice.toFixed(0))}</span></div></td><td class="text-sm font-semibold text-ink tabular-nums" data-v-0c196b3e>${ssrInterpolate(row.m2Recomendados.toLocaleString("es-MX"))}</td><td data-v-0c196b3e><span class="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap" style="${ssrRenderStyle({ backgroundColor: viabilidadColor(row.viabilidad) })}" data-v-0c196b3e>${ssrInterpolate(row.viabilidad)}</span></td><td class="text-sm font-semibold text-ink tabular-nums" data-v-0c196b3e>${ssrInterpolate(row.m2Efectivos.toLocaleString("es-MX"))}</td><td class="text-sm text-ink tabular-nums" data-v-0c196b3e>${ssrInterpolate(formatMXN(row.inversion, true))}</td><td class="text-sm font-semibold text-eco tabular-nums" data-v-0c196b3e>${ssrInterpolate(formatMXN(row.beneficioAnual, true))}</td><td data-v-0c196b3e><span class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase text-white whitespace-nowrap" style="${ssrRenderStyle({ backgroundColor: prioridadColor(row.prioridad) })}" data-v-0c196b3e>${ssrInterpolate(row.prioridad)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-6 rounded-lg border-2 border-primary/30 bg-primary-50 p-5" data-v-0c196b3e><p class="text-sm font-bold text-primary" data-v-0c196b3e>Resumen ejecutivo</p><p class="mt-2 text-sm text-ink leading-relaxed" data-v-0c196b3e> Las 3 alcald\xEDas con mayor urgencia son <strong data-v-0c196b3e>${ssrInterpolate((_a = unref(actionPlanRanking)[0]) == null ? void 0 : _a.alcaldia)}</strong>, <strong data-v-0c196b3e>${ssrInterpolate((_b = unref(actionPlanRanking)[1]) == null ? void 0 : _b.alcaldia)}</strong> y <strong data-v-0c196b3e>${ssrInterpolate((_c = unref(actionPlanRanking)[2]) == null ? void 0 : _c.alcaldia)}</strong>. Se recomienda iniciar con pilotos de techos verdes ligeros extensivos (TVLE) en edificios p\xFAblicos, priorizando ${ssrInterpolate((_d = unref(actionPlanRanking)[0]) == null ? void 0 : _d.m2Recomendados.toLocaleString("es-MX"))} m\xB2 en ${ssrInterpolate((_e = unref(actionPlanRanking)[0]) == null ? void 0 : _e.alcaldia)} (${ssrInterpolate((_f = unref(actionPlanRanking)[0]) == null ? void 0 : _f.m2Efectivos.toLocaleString("es-MX"))} m\xB2 efectivos tras evaluaci\xF3n estructural) con una inversi\xF3n de ${ssrInterpolate(formatMXN((_h = (_g = unref(actionPlanRanking)[0]) == null ? void 0 : _g.inversion) != null ? _h : 0, true))} y un beneficio anual estimado de ${ssrInterpolate(formatMXN((_j = (_i = unref(actionPlanRanking)[0]) == null ? void 0 : _i.beneficioAnual) != null ? _j : 0, true))}. </p></div><div class="mt-8 rounded-lg border border-gray-200 bg-white p-5" data-v-0c196b3e><button class="flex w-full items-center justify-between text-sm font-semibold text-ink" data-v-0c196b3e><span data-v-0c196b3e>Fuentes y metodolog\xEDa de c\xE1lculo</span><svg class="${ssrRenderClass([{ "rotate-180": unref(expandedTables).fuentes }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-0c196b3e><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" data-v-0c196b3e></path></svg></button><div class="mt-4 space-y-4 text-xs text-slate-custom" style="${ssrRenderStyle(unref(expandedTables).fuentes ? null : { display: "none" })}" data-v-0c196b3e><div data-v-0c196b3e><p class="font-bold text-ink" data-v-0c196b3e>Tesis de referencia</p><ul class="mt-1 space-y-1 list-disc pl-4" data-v-0c196b3e><li data-v-0c196b3e><strong data-v-0c196b3e>Cervantes N\xE1jera, A.L. (2025).</strong> &quot;Techos verdes una soluci\xF3n sustentable para la adaptaci\xF3n al cambio clim\xE1tico en la Ciudad de M\xE9xico.&quot; Tesis doctoral, CIIEMAD-IPN. Directora: Dra. Mar\xEDa Concepci\xF3n Mart\xEDnez Rodr\xEDguez.</li><li data-v-0c196b3e><strong data-v-0c196b3e>Cervantes N\xE1jera, A.L. (2021).</strong> &quot;Dise\xF1o, aplicaci\xF3n y evaluaci\xF3n de un techo verde ligero extensivo como estrategia para la adaptaci\xF3n al cambio clim\xE1tico en la alcald\xEDa Gustavo A. Madero, Ciudad de M\xE9xico.&quot; Tesis de maestr\xEDa, CIIEMAD-IPN.</li></ul></div><div data-v-0c196b3e><p class="font-bold text-ink" data-v-0c196b3e>Tasas de impacto ambiental</p><div class="mt-1 overflow-x-auto" data-v-0c196b3e><table class="w-full text-[10px]" data-v-0c196b3e><thead data-v-0c196b3e><tr class="border-b" data-v-0c196b3e><th class="py-1 pr-3 text-left font-semibold" data-v-0c196b3e>Variable</th><th class="py-1 pr-3 text-left font-semibold" data-v-0c196b3e>Valor</th><th class="py-1 text-left font-semibold" data-v-0c196b3e>Fuente</th></tr></thead><tbody data-v-0c196b3e><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>CO\u2082 capturado</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>0.968 kg/m\xB2/a\xF1o</td><td class="py-1" data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 12, p. 98</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Reducci\xF3n temperatura</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>3.5\xB0C (ref. 79,584 m\xB2)</td><td class="py-1" data-v-0c196b3e>Cervantes N\xE1jera (2021), Cap. 5, p. 87</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Captaci\xF3n pluvial</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>19.5 L/m\xB2/a\xF1o</td><td class="py-1" data-v-0c196b3e>Cervantes N\xE1jera (2021), Cap. 5, p. 92</td></tr><tr data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Ahorro energ\xE9tico</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>432.95 kWh/m\xB2/a\xF1o</td><td class="py-1" data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 15, p. 112</td></tr></tbody></table></div></div><div data-v-0c196b3e><p class="font-bold text-ink" data-v-0c196b3e>Costos unitarios de referencia</p><div class="mt-1 overflow-x-auto" data-v-0c196b3e><table class="w-full text-[10px]" data-v-0c196b3e><thead data-v-0c196b3e><tr class="border-b" data-v-0c196b3e><th class="py-1 pr-3 text-left font-semibold" data-v-0c196b3e>Concepto</th><th class="py-1 pr-3 text-left font-semibold" data-v-0c196b3e>Valor</th><th class="py-1 text-left font-semibold" data-v-0c196b3e>Fuente</th></tr></thead><tbody data-v-0c196b3e><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Instalaci\xF3n TVLE</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>$1,200 MXN/m\xB2</td><td class="py-1" data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 18</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Mantenimiento anual</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>$80 MXN/m\xB2/a\xF1o</td><td class="py-1" data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 19</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Electricidad</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>$2.50 MXN/kWh</td><td class="py-1" data-v-0c196b3e>CFE, Tarifa DAC promedio CDMX (2024)</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Consulta golpe de calor</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>$3,500 MXN</td><td class="py-1" data-v-0c196b3e>Secretar\xEDa de Salud CDMX / IMSS (2023)</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Incidencia calor</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>12 consul./100k hab/a\xF1o</td><td class="py-1" data-v-0c196b3e>SINAVE (2023), zonas urbanas &gt;35\xB0C LST</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Da\xF1o inundaci\xF3n</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>$45 MXN/m\xB3</td><td class="py-1" data-v-0c196b3e>SACMEX / CONAGUA (2022)</td></tr><tr class="border-b border-gray-100" data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Valor tonCO\u2082</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>$500 MXN/ton</td><td class="py-1" data-v-0c196b3e>Mexico2, mercado voluntario MX (2024)</td></tr><tr data-v-0c196b3e><td class="py-1 pr-3" data-v-0c196b3e>Tasa descuento VPN</td><td class="py-1 pr-3 font-mono" data-v-0c196b3e>8%</td><td class="py-1" data-v-0c196b3e>Banco de M\xE9xico, tasa ref. real (2024)</td></tr></tbody></table></div></div><div data-v-0c196b3e><p class="font-bold text-ink" data-v-0c196b3e>Normatividad y est\xE1ndares</p><ul class="mt-1 space-y-1 list-disc pl-4" data-v-0c196b3e><li data-v-0c196b3e><strong data-v-0c196b3e>NOM-020-SSA1-2014.</strong> Valor l\xEDmite de exposici\xF3n ambiental permisible de ozono (O\u2083). DOF.</li><li data-v-0c196b3e><strong data-v-0c196b3e>NOM-023-SSA1-1993.</strong> Criterio para evaluar la calidad del aire ambiente con respecto al di\xF3xido de nitr\xF3geno (NO\u2082). DOF.</li><li data-v-0c196b3e><strong data-v-0c196b3e>OMS (2016).</strong> &quot;Urban green spaces and health: a review of evidence.&quot; Recomendaci\xF3n m\xEDnima de cobertura vegetal urbana.</li><li data-v-0c196b3e><strong data-v-0c196b3e>OMS (2012).</strong> Recomendaci\xF3n de 9 m\xB2/habitante de \xE1rea verde urbana accesible.</li><li data-v-0c196b3e><strong data-v-0c196b3e>Magurran, A.E. (2004).</strong> &quot;Measuring Biological Diversity.&quot; Referencia \xEDndice Shannon-Wiener H&#39; \u2265 2.0.</li></ul></div><div data-v-0c196b3e><p class="font-bold text-ink" data-v-0c196b3e>Fuentes de viabilidad constructiva</p><ul class="mt-1 space-y-1 list-disc pl-4" data-v-0c196b3e><li data-v-0c196b3e><strong data-v-0c196b3e>Catastro CDMX / SIGCDMX.</strong> Direcci\xF3n General de Catastro. Tipo estructural, edad de construcci\xF3n, niveles, material de techumbre.</li><li data-v-0c196b3e><strong data-v-0c196b3e>Atlas de Riesgos CDMX (SGIRPC).</strong> Zonificaci\xF3n s\xEDsmica (I-IIId), mapas de riesgo por inundaci\xF3n.</li><li data-v-0c196b3e><strong data-v-0c196b3e>Dict\xE1menes post-sismo 19S (2017).</strong> Estado estructural de edificios evaluados tras el sismo del 19 de septiembre.</li><li data-v-0c196b3e><strong data-v-0c196b3e>INEGI, Censo de Poblaci\xF3n y Vivienda (2020).</strong> Caracter\xEDsticas de las viviendas: material en techos, muros, pisos.</li><li data-v-0c196b3e><strong data-v-0c196b3e>NTC-CDMX (2017).</strong> Normas T\xE9cnicas Complementarias para Dise\xF1o y Construcci\xF3n de Estructuras. Capacidad de carga en azoteas.</li><li data-v-0c196b3e><strong data-v-0c196b3e>Cervantes N\xE1jera (2025), Tabla 6.</strong> Capacidad de carga m\xEDnima TVLE: 100 kg/m\xB2; intensivo: 300 kg/m\xB2.</li></ul></div></div></div></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "simulacion" ? null : { display: "none" })}" data-v-0c196b3e>`);
      _push(ssrRenderComponent(_component_IndicadoresSimulacionDinamica, null, null, _parent));
      _push(`</div><section class="bg-white py-12 border-t border-gray-100" data-v-0c196b3e><div class="container-wide" data-v-0c196b3e><div class="grid grid-cols-1 gap-12 lg:grid-cols-2" data-v-0c196b3e><div data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Descarga de datos</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Exporta los datos del observatorio en formato abierto</p><div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3" data-v-0c196b3e><div class="card p-4" data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eco/10" data-v-0c196b3e><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-0c196b3e><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-0c196b3e></path><polyline points="14 2 14 8 20 8" data-v-0c196b3e></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-0c196b3e></line><polyline points="9 15 12 18 15 15" data-v-0c196b3e></polyline></svg></div><div data-v-0c196b3e><p class="text-xs font-semibold text-ink" data-v-0c196b3e>Inventario</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>CSV, 57 reg.</p></div></div><button class="btn-outline btn-sm mt-3 w-full" data-v-0c196b3e>Descargar</button></div><div class="card p-4" data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10" data-v-0c196b3e><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-0c196b3e><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-0c196b3e></path><polyline points="14 2 14 8 20 8" data-v-0c196b3e></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-0c196b3e></line><polyline points="9 15 12 18 15 15" data-v-0c196b3e></polyline></svg></div><div data-v-0c196b3e><p class="text-xs font-semibold text-ink" data-v-0c196b3e>Candidatos</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>GeoJSON, 60 sitios</p></div></div><button class="btn-outline btn-sm mt-3 w-full" data-v-0c196b3e>Descargar</button></div><div class="card p-4" data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10" data-v-0c196b3e><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-0c196b3e><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-0c196b3e></path><polyline points="14 2 14 8 20 8" data-v-0c196b3e></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-0c196b3e></line><polyline points="9 15 12 18 15 15" data-v-0c196b3e></polyline></svg></div><div data-v-0c196b3e><p class="text-xs font-semibold text-ink" data-v-0c196b3e>Validaciones IA</p><p class="text-[10px] text-slate-custom" data-v-0c196b3e>CSV, 30 reg.</p></div></div><button class="btn-outline btn-sm mt-3 w-full" data-v-0c196b3e>Descargar</button></div></div></div><div data-v-0c196b3e><h3 class="text-xl font-semibold text-ink" data-v-0c196b3e>Fuentes oficiales</h3><p class="mt-1 text-sm text-slate-custom" data-v-0c196b3e>Instituciones que proveen la informaci\xF3n utilizada</p><div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" data-v-0c196b3e><!--[-->`);
      ssrRenderList(envSources, (src) => {
        _push(`<div class="card p-3" data-v-0c196b3e><div class="flex items-center gap-2" data-v-0c196b3e><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style="${ssrRenderStyle({ backgroundColor: src.color + "15" })}" data-v-0c196b3e><div class="h-3 w-3 rounded-full" style="${ssrRenderStyle({ backgroundColor: src.color })}" data-v-0c196b3e></div></div><div data-v-0c196b3e><p class="text-xs font-semibold text-ink" data-v-0c196b3e>${ssrInterpolate(src.name)}</p>`);
        _push(ssrRenderComponent(_component_CommonDataSourceBadge, {
          "source-name": src.sourceName
        }, null, _parent));
        _push(`</div></div><p class="mt-2 text-[10px] leading-relaxed text-slate-custom" data-v-0c196b3e>${ssrInterpolate(src.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div><div class="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4" data-v-0c196b3e><p class="text-xs text-slate-custom" data-v-0c196b3e><span class="font-semibold text-accent" data-v-0c196b3e>Nota:</span> Los datos ambientales mostrados en esta secci\xF3n son de demostraci\xF3n (modo mock). La plataforma est\xE1 dise\xF1ada para integrar datos oficiales de CONABIO, CONAGUA, SEDEMA y SEMARNAT cuando las conexiones API est\xE9n disponibles. </p></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/indicadores/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0c196b3e"]]);

export { index as default };
//# sourceMappingURL=index-DiU4C4io.mjs.map
