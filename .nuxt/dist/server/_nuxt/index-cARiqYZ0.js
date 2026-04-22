import { _ as __nuxt_component_0 } from "./HeroSection-BqPnfiNV.js";
import { a as __nuxt_component_1, u as useHead, _ as _export_sfc } from "../server.mjs";
import { _ as _sfc_main$3 } from "./DataSourceBadge-Dtt3IyCj.js";
import { _ as _sfc_main$2 } from "./SectionTitle-Di4BE9k7.js";
import { defineComponent, reactive, ref, computed, unref, withCtx, createVNode, useSSRContext, mergeProps } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { C as COSTOS_REFERENCIA, T as TASAS, a as computeRiskProfileWithStructural, b as computeCostOfInaction, d as computeEffectiveM2, e as computeROI, l as linearRegression, f as correlationMatrix, g as computeIndiceNecesidad } from "./useStatisticalAnalysis-Cht9jiYj.js";
import { u as useFormatters } from "./useFormatters-BCDq8oux.js";
import { g as greenRoofs } from "./mock-roofs-D-tdE7ed.js";
import { c as candidateRoofs } from "./mock-candidates-Cvvvd8Mv.js";
import { v as validationRecords } from "./mock-validations-qSEi_ZEz.js";
import { k as kpiData } from "./kpis-DWO-YlkK.js";
import { a as aptitudPesos } from "./aptitud-pesos-B4e-CPf1.js";
import { i as indicesBioticos, a as indicadoresHidricos } from "./mock-indicadores-hidricos-CcDAWtmA.js";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/hookable/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/unctx/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/ufo/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/klona/dist/index.mjs";
import "/Users/antonioortiz/Desktop/Antonio/obserbatorios/observatorio-techos-verdes/node_modules/@unhead/vue/dist/index.mjs";
import "./useDataSource-CcCLLLin.js";
const indicadoresEstructurales = [
  {
    alcaldia: "Álvaro Obregón",
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
    alcaldia: "Benito Juárez",
    porcentajeConcretoAcero: 82,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 85,
    porcentajeZonaIII: 40,
    scorePrefactibilidadPromedio: 78,
    edificiosEvaluados: 190
  },
  {
    alcaldia: "Coyoacán",
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
    alcaldia: "Cuauhtémoc",
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
    alcaldia: "Tláhuac",
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
    nombre: "Sin Intervención",
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
    descripcion: "Continuación del ritmo actual de instalación sin cambios de política.",
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
    nombre: "Política Activa",
    descripcion: "Programa gubernamental con incentivos fiscales y participación del sector privado.",
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
    descripcion: "Máxima inversión, participación público-privada amplia y economías de escala.",
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
      { key: "m2", label: "m² finales instalados", format: (r) => fmt(r.m2FinalInstalados) },
      { key: "pico", label: "Pico de instalación (m²/año)", format: (r) => fmt(r.m2PicoAnual) },
      { key: "anioPico", label: "Año del pico", format: (r) => `Año ${r.anioPicoInstalacion}` },
      { key: "energia", label: "Energía ahorrada (MWh)", format: (r) => fmt(r.energiaTotalMwh) },
      { key: "agua", label: "Agua captada (m³)", format: (r) => fmt(r.aguaTotalM3) },
      { key: "co2", label: "CO₂ evitado (ton)", format: (r) => fmtDec(r.co2TotalTon) },
      { key: "temp", label: "Reducción temperatura (°C)", format: (r) => r.tempReduccionFinal.toFixed(2) },
      { key: "inversion", label: "Inversión total (MXN)", format: (r) => fmtMXN(r.inversionTotal) },
      { key: "beneficio", label: "Beneficio total (MXN)", format: (r) => fmtMXN(r.beneficioTotal) },
      { key: "roi", label: "ROI (%)", format: (r) => `${r.roiPct.toFixed(1)}%` }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonSectionTitle = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="py-12"><div class="container-wide">`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Simulación de dinámica de sistemas",
        subtitle: "Modelo con ciclos de retroalimentación, saturación territorial y curvas de aprendizaje para proyectar escenarios de política pública.",
        tag: "Simulación"
      }, null, _parent));
      _push(`<h3 class="mt-10 text-lg font-semibold text-ink">Ciclos del modelo</h3><p class="mt-1 text-sm text-slate-custom">Cuatro mecanismos que determinan la velocidad y alcance de la instalación de techos verdes.</p><div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"><div class="panel p-4 border-l-4 border-eco"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eco/10 text-xs font-bold text-eco">R1</span><h4 class="text-sm font-semibold text-ink">Ciclo Virtuoso</h4><span class="badge-eco text-[10px]">Reforzante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> Más techos verdes → mayores ahorros energéticos e hídricos → más presupuesto disponible → más instalaciones. </p></div><div class="panel p-4 border-l-4 border-primary"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">R2</span><h4 class="text-sm font-semibold text-ink">Efecto Demostración</h4><span class="badge-primary text-[10px]">Reforzante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> Más techos verdes → mayor visibilidad → apoyo político y social → más programas e incentivos. </p></div><div class="panel p-4 border-l-4 border-accent"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">B1</span><h4 class="text-sm font-semibold text-ink">Saturación Territorial</h4><span class="badge-accent text-[10px]">Balanceante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> Más techos instalados → menos sitios disponibles → menor tasa de nuevas instalaciones. </p></div><div class="panel p-4 border-l-4 border-alert"><div class="flex items-center gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-alert/10 text-xs font-bold text-alert">B2</span><h4 class="text-sm font-semibold text-ink">Capacidad de Implementación</h4><span class="badge-alert text-[10px]">Balanceante</span></div><p class="mt-2 text-xs text-slate-custom leading-relaxed"> Alta demanda → escasez de contratistas y materiales → costos crecientes → instalación más lenta. </p></div></div></div></section><section class="py-12 bg-white border-t border-gray-100"><div class="container-wide"><h3 class="text-lg font-semibold text-ink">Controles de simulación</h3><div class="mt-4"><p class="text-xs font-medium text-slate-custom mb-2">Escenarios activos</p><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(scenarios), (sc) => {
        _push(`<button class="${ssrRenderClass([unref(activeScenarios)[sc.id] ? "border-current shadow-sm scale-[1.02]" : "border-gray-200 text-slate-custom opacity-60 hover:opacity-80", "flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all"])}" style="${ssrRenderStyle(unref(activeScenarios)[sc.id] ? { color: sc.color, borderColor: sc.color } : {})}"><span class="h-2.5 w-2.5 rounded-full" style="${ssrRenderStyle({ backgroundColor: unref(activeScenarios)[sc.id] ? sc.color : "#9ca3af" })}"></span> ${ssrInterpolate(sc.nombre)}</button>`);
      });
      _push(`<!--]--></div></div><div class="mt-6"><p class="text-xs font-medium text-slate-custom mb-2">Horizonte de simulación</p><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(horizonteOptions, (y) => {
        _push(`<button class="${ssrRenderClass([unref(horizonte) === y ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-slate-custom hover:bg-gray-200", "rounded-lg px-3 py-1.5 text-xs font-medium transition-all"])}">${ssrInterpolate(y)} años </button>`);
      });
      _push(`<!--]--></div></div><div class="mt-6"><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedPalancas) }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(expandedPalancas) ? "Ocultar palancas" : "Palancas de política")}</button><div class="mt-4 panel p-4 space-y-4" style="${ssrRenderStyle(unref(expandedPalancas) ? null : { display: "none" })}"><p class="text-[10px] text-slate-custom">Estas palancas modifican <strong>todos</strong> los escenarios activos simultáneamente.</p><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Multiplicador de presupuesto</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate(unref(levers).multiplicadorPresupuesto.toFixed(1))}x</span></div><input${ssrRenderAttr("value", unref(levers).multiplicadorPresupuesto)} type="range" min="0.5" max="3" step="0.1" class="mt-1 w-full accent-primary"></div><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Fracción de reinversión</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate((unref(levers).fraccionReinversion * 100).toFixed(0))}%</span></div><input${ssrRenderAttr("value", unref(levers).fraccionReinversion)} type="range" min="0" max="0.5" step="0.01" class="mt-1 w-full accent-primary"></div><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Participación privada</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate(unref(levers).participacionPrivada.toFixed(1))}x</span></div><input${ssrRenderAttr("value", unref(levers).participacionPrivada)} type="range" min="1" max="3" step="0.1" class="mt-1 w-full accent-primary"></div><div><div class="flex items-center justify-between"><label class="text-xs font-medium text-ink">Retraso de política</label><span class="text-xs font-semibold text-primary tabular-nums">${ssrInterpolate(unref(levers).aniosRetrasoPolitica)} años</span></div><input${ssrRenderAttr("value", unref(levers).aniosRetrasoPolitica)} type="range" min="0" max="5" step="1" class="mt-1 w-full accent-primary"></div><button class="btn-ghost text-xs"> Restablecer palancas </button></div></div></div></section><section class="py-12 border-t border-gray-100"><div class="container-wide"><h3 class="text-lg font-semibold text-ink">Proyección comparativa</h3><p class="mt-1 text-sm text-slate-custom">Evolución temporal de cada escenario durante ${ssrInterpolate(unref(horizonte))} años.</p><div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-4">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom"${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></section><section class="py-12 bg-white border-t border-gray-100"><div class="container-wide"><h3 class="text-lg font-semibold text-ink">Resumen por escenario</h3><p class="mt-1 text-sm text-slate-custom">Métricas al final del horizonte de ${ssrInterpolate(unref(horizonte))} años.</p><div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(activeResults), (r) => {
        _push(`<div class="panel p-4 border-l-4" style="${ssrRenderStyle({ borderLeftColor: r.params.color })}"><h4 class="text-sm font-semibold text-ink">${ssrInterpolate(r.params.nombre)}</h4><div class="mt-3 space-y-2"><div class="flex justify-between text-xs"><span class="text-slate-custom">m² finales</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmt(r.resumen.m2FinalInstalados))}</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">Pico instalación</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmt(r.resumen.m2PicoAnual))} m²/año</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">Energía total</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmt(r.resumen.energiaTotalMwh))} MWh</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">CO₂ evitado</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmtDec(r.resumen.co2TotalTon))} ton</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">ΔT final</span><span class="font-semibold tabular-nums">${ssrInterpolate(r.resumen.tempReduccionFinal.toFixed(2))}°C</span></div><hr class="border-gray-100"><div class="flex justify-between text-xs"><span class="text-slate-custom">Inversión total</span><span class="font-semibold tabular-nums">${ssrInterpolate(fmtMXN(r.resumen.inversionTotal))}</span></div><div class="flex justify-between text-xs"><span class="text-slate-custom">ROI</span><span class="${ssrRenderClass([r.resumen.roiPct >= 0 ? "text-eco" : "text-alert", "font-semibold tabular-nums"])}">${ssrInterpolate(r.resumen.roiPct.toFixed(1))}% </span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-6"><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTabla) }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(expandedTabla) ? "Ocultar tabla comparativa" : "Ver tabla comparativa detallada")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTabla) ? null : { display: "none" })}"><table class="table-base w-full min-w-[600px]"><thead><tr><th>Métrica</th><!--[-->`);
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
      _push(`<!--]--></tbody></table></div></div></div></section><section class="py-12 border-t border-gray-100"><div class="container-wide"><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedMetodologia) }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(expandedMetodologia) ? "Ocultar nota metodológica" : "Nota metodológica")}</button><div class="mt-4 panel p-6 space-y-4 text-xs text-slate-custom leading-relaxed" style="${ssrRenderStyle(unref(expandedMetodologia) ? null : { display: "none" })}"><h4 class="text-sm font-semibold text-ink">Método de integración</h4><p> Se utiliza el método de <strong>Euler explícito</strong> con paso temporal dt = 0.25 años (trimestral), lo que genera ${ssrInterpolate(Math.round(unref(horizonte) / 0.25))} pasos por escenario. Las gráficas muestran muestras anuales para mayor legibilidad. </p><h4 class="text-sm font-semibold text-ink">Ciclos de retroalimentación</h4><ul class="list-disc pl-4 space-y-1"><li><strong>R1 (Ciclo Virtuoso):</strong> Los ahorros generados por techos existentes se reinvierten parcialmente, aumentando el presupuesto disponible.</li><li><strong>R2 (Efecto Demostración):</strong> La visibilidad de los techos instalados genera apoyo político que facilita nuevos programas. Modelado con función logarítmica.</li><li><strong>B1 (Saturación Territorial):</strong> A medida que se cubren los sitios disponibles (514,000 m² potenciales), la tasa de instalación disminuye proporcionalmente.</li><li><strong>B2 (Capacidad de Implementación):</strong> La demanda de instalación está limitada por la capacidad del mercado local (máx. ~50,000 m²/año), modelada como restricción logística.</li></ul><h4 class="text-sm font-semibold text-ink">Supuestos clave</h4><ul class="list-disc pl-4 space-y-1"><li>Inventario inicial: 79,584 m² (Cervantes Nájera, 2025)</li><li>Potencial total: 514,000 m² (análisis GIS multicriterio)</li><li>Costo base: $1,200 MXN/m² (TVLE extensivo)</li><li>Costo mínimo (economías de escala): $720 MXN/m² (60% del original)</li><li>Tasas de impacto ambiental: Cervantes Nájera (2021, 2025) CIIEMAD-IPN</li><li>La temperatura sigue un modelo exponencial asintótico (−3.5°C máximo)</li></ul><h4 class="text-sm font-semibold text-ink">Limitaciones</h4><ul class="list-disc pl-4 space-y-1"><li>No incluye efectos estacionales ni variabilidad climática interanual</li><li>Los costos de referencia son constantes (excepto la curva de aprendizaje de instalación)</li><li>La capacidad de implementación es una aproximación, no una medición del mercado</li><li>No considera cambios regulatorios impredecibles ni disrupciones externas</li></ul><div class="rounded-lg border border-accent/30 bg-accent/5 p-3"><p><span class="font-semibold text-accent">Nota:</span> Este modelo es una <strong>herramienta exploratoria</strong> para comparar escenarios de política pública, no una predicción determinista. Los resultados deben interpretarse como tendencias relativas entre escenarios, no como pronósticos absolutos. </p></div><h4 class="text-sm font-semibold text-ink">Fuentes</h4><ul class="list-disc pl-4 space-y-1"><li>Cervantes Nájera, A.L. (2021). Tesis de maestría, CIIEMAD-IPN.</li><li>Cervantes Nájera, A.L. (2025). Tesis doctoral, CIIEMAD-IPN.</li><li>CFE (2024). Tarifa DAC promedio CDMX.</li><li>CONAGUA/SACMEX (2022). Costos de agua no gestionada.</li><li>México2 (2024). Precio crédito de carbono.</li></ul></div></div></section></div>`);
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
        { name: "description", content: "Indicadores ambientales, biológicos e hídricos del Observatorio de Techos Verdes CDMX. Biodiversidad, captación pluvial y distribución territorial." }
      ]
    });
    const tabs = [
      { id: "territorial", label: "Distribución territorial", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
      { id: "aptitud", label: "Aptitud y validaciones", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' },
      { id: "ambiente", label: "Medio ambiente", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
      { id: "estadistico", label: "Análisis estadístico", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { id: "simulacion", label: "Simulación dinámica", icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' }
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
      if (state.col !== col) return "↕";
      return state.dir === "asc" ? "↑" : "↓";
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
        label: "Captación pluvial (L/m²/año)",
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
        label: "Precipitación media anual (mm)",
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
      { label: "5,000 m² (1 edificio)", value: 5e3 },
      { label: "25,000 m² (colonia)", value: 25e3 },
      { label: "79,584 m² (inventario actual)", value: 79584 },
      { label: "200,000 m² (meta corto plazo)", value: 2e5 },
      { label: "514,000 m² (potencial tesis)", value: 514e3 }
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
          coberturaVegetal: bio?.coberturaVegetal ?? 60,
          captacionPluvial: hid?.captacionPluvial ?? 18,
          shannon: bio?.indiceShannonWiener ?? 2,
          indiceBiodiversidad: bio?.indiceBiodiversidad ?? 50,
          scorePrefactibilidadPromedio: est?.scorePrefactibilidadPromedio ?? 50,
          edadPromedioAnios: est?.edadPromedioAnios ?? 35
        };
      });
    });
    const selectedAlcData = computed(
      () => alcaldiaAggregates.value.find((a) => a.alcaldia === selectedAlcaldia.value) ?? alcaldiaAggregates.value[0] ?? { lstProm: 35, o3Prom: 55, no2Prom: 30, pobProm: 1e4, m2Cands: 5e3, coberturaVegetal: 60, captacionPluvial: 18, shannon: 2, indiceBiodiversidad: 50, scorePrefactibilidadPromedio: 50, edadPromedioAnios: 35, alcaldia: "" }
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
        "Calidad del aire (O₃)": [20, 100],
        "Déficit vegetal": [40, 95],
        "Vulnerabilidad hídrica": [14, 26],
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
      () => inactionCost.value.serie.map((s) => `Año ${s.year}`)
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
          label: "Energía (MWh)",
          data: serie.map((_s, i) => Math.round(m2 * 432.95 / 1e3 * (i + 1))),
          backgroundColor: "#F2A81D",
          borderRadius: 2
        },
        {
          label: "Agua (m³)",
          data: serie.map((_s, i) => Math.round(m2 * 19.5 / 1e3 * (i + 1))),
          backgroundColor: "#18A5E3",
          borderRadius: 2
        },
        {
          label: "CO₂ (ton)",
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
      () => roiResult.value.serieAnual.map((s) => `Año ${s.year}`)
    );
    computed(() => {
      const serie = roiResult.value.serieAnual;
      const m2 = effectiveM2.value.m2Efectivos;
      return [
        {
          label: "Energía acumulada (MWh)",
          data: serie.map((_s, i) => Math.round(m2 * 432.95 / 1e3 * (i + 1))),
          borderColor: "#F2A81D",
          fill: false
        },
        {
          label: "Agua captada acumulada (m³)",
          data: serie.map((_s, i) => Math.round(m2 * 19.5 / 1e3 * (i + 1))),
          borderColor: "#18A5E3",
          fill: false
        },
        {
          label: "CO₂ capturado acumulado (ton)",
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
      let strength = "débil";
      if (r2 >= 0.7) strength = "fuerte";
      else if (r2 >= 0.4) strength = "moderada";
      return `Correlación ${direction} ${strength} (R²=${r2.toFixed(3)}): a mayor ${varX}, ${reg.slope > 0 ? "mayor" : "menor"} ${varY}.`;
    }
    const corrMatrix = computed(() => {
      const alcaldias = [...new Set(candidateRoofs.map((c) => c.alcaldia))];
      const alcData = alcaldias.map((alc) => {
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
          captacion: hid?.captacionPluvial ?? 0,
          biodiversidad: bio?.indiceBiodiversidad ?? 0,
          cobertura: bio?.coberturaVegetal ?? 0,
          prefactibilidad: est?.scorePrefactibilidadPromedio ?? 50,
          edadProm: est?.edadPromedioAnios ?? 35
        };
      });
      return correlationMatrix({
        "LST": alcData.map((d) => d.lst),
        "NDVI": alcData.map((d) => d.ndvi),
        "Score": alcData.map((d) => d.score),
        "Población": alcData.map((d) => d.poblacion),
        "Área Urb.": alcData.map((d) => d.areaUrb),
        "Captación": alcData.map((d) => d.captacion),
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
        "LST": "Temperatura superficial alta indica mayor urgencia de intervención.",
        "Score": "Confirma que el modelo de aptitud captura correctamente las zonas de riesgo.",
        "Biodiv.": "Mayor cobertura verde se asocia con ecosistemas más diversos.",
        "Cobertura": "La cobertura vegetal es el factor más modificable por política pública.",
        "Captación": "La captación pluvial justifica la inversión en zonas con déficit hídrico.",
        "Población": "Alta densidad poblacional amplifica los beneficios sociales de la intervención.",
        "NDVI": "El índice de vegetación confirma el déficit de áreas verdes.",
        "Área Urb.": "Las zonas más urbanizadas presentan mayor necesidad de naturación.",
        "Prefact.": "La viabilidad constructiva determina cuántos m² son realmente aprovechables.",
        "Edad edif.": "Edificios más antiguos requieren evaluación estructural antes de instalar techos verdes."
      };
      top3.forEach((t) => {
        const vars = t.pair.split(" / ");
        t.interpretation = interps[vars[0]] || interps[vars[1]] || "Correlación significativa para la toma de decisiones.";
      });
      return top3;
    });
    const necesidadRanking = computed(() => {
      const alcaldias = [.../* @__PURE__ */ new Set([
        ...indicesBioticos.map((b) => b.alcaldia),
        ...candidateRoofs.map((c) => c.alcaldia)
      ])];
      return alcaldias.map((alc) => {
        const agg = alcaldiaAggregates.value.find((a) => a.alcaldia === alc);
        const lstProm = agg?.lstProm ?? 35;
        const pobProm = agg?.pobProm ?? 1e4;
        const bio = bioMap.get(alc);
        const hid = hidMap.get(alc);
        const indice = computeIndiceNecesidad({
          lstPromedio: lstProm,
          coberturaVegetal: bio?.coberturaVegetal ?? 60,
          poblacion: pobProm,
          captacionPluvial: hid?.captacionPluvial ?? 18,
          indiceBiodiversidad: bio?.indiceBiodiversidad ?? 50
        });
        const factores = [];
        if (lstProm > 37) factores.push("Alta isla de calor");
        if ((bio?.coberturaVegetal ?? 60) < 55) factores.push("Baja cobertura vegetal");
        if (pobProm > 13e3) factores.push("Alta densidad poblacional");
        if ((hid?.captacionPluvial ?? 18) < 17) factores.push("Baja captación pluvial");
        if ((bio?.indiceBiodiversidad ?? 50) < 45) factores.push("Baja biodiversidad");
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
        const agg = alcaldiaAggregates.value.find((a) => a.alcaldia === row.alcaldia);
        const m2 = agg?.m2Cands ?? 3e3;
        const est = estMap.get(row.alcaldia);
        const scorePrefact = est?.scorePrefactibilidadPromedio ?? 50;
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
        description: "Sistema Nacional de Información sobre Biodiversidad (SNIB). Registros de especies, índices de biodiversidad urbana y monitoreo de flora en azoteas verdes.",
        color: "#059669"
      },
      {
        name: "SEDEMA",
        sourceName: "SEDEMA",
        description: "Secretaría del Medio Ambiente CDMX. Inventario de áreas verdes, programas de naturación urbana y monitoreo de cobertura vegetal.",
        color: "#79C141"
      },
      {
        name: "CONAGUA",
        sourceName: "CONAGUA",
        description: "Comisión Nacional del Agua / Servicio Meteorológico Nacional. Datos pluviométricos, estaciones climatológicas y balance hídrico urbano.",
        color: "#0284C7"
      },
      {
        name: "SEMARNAT",
        sourceName: "SEMARNAT",
        description: "Secretaría de Medio Ambiente y Recursos Naturales. Normatividad ambiental federal, áreas naturales protegidas y registros ambientales.",
        color: "#7C3AED"
      },
      {
        name: "Catastro CDMX",
        sourceName: "SIGCDMX",
        description: "Dirección General de Catastro CDMX / SIGCDMX. Datos de construcción, edad, tipo estructural, niveles y material de techumbre por predio.",
        color: "#6366F1"
      },
      {
        name: "Atlas de Riesgos",
        sourceName: "SGIRPC",
        description: "Secretaría de Gestión Integral de Riesgos y Protección Civil. Zonificación sísmica, dictámenes post-sismo 2017, riesgo de inundación.",
        color: "#EF4444"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonHeroSection = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      const _component_CommonDataSourceBadge = _sfc_main$3;
      const _component_CommonSectionTitle = _sfc_main$2;
      const _component_IndicadoresSimulacionDinamica = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-surface" }, _attrs))} data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_CommonHeroSection, { compact: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-3xl font-extrabold text-white md:text-4xl" data-v-63878fb4${_scopeId}>Indicadores ambientales y territoriales</h1><p class="mt-2 text-base text-white/80" data-v-63878fb4${_scopeId}>Métricas clave del estado de los techos verdes en la Ciudad de México</p>`);
          } else {
            return [
              createVNode("h1", { class: "text-3xl font-extrabold text-white md:text-4xl" }, "Indicadores ambientales y territoriales"),
              createVNode("p", { class: "mt-2 text-base text-white/80" }, "Métricas clave del estado de los techos verdes en la Ciudad de México")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="bg-white py-16" data-v-63878fb4><div class="container-wide" data-v-63878fb4><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(kpis), (kpi) => {
        _push(`<div class="kpi-card" data-v-63878fb4><p class="${ssrRenderClass([unref(kpiColor)(kpi.color), "text-2xl font-bold"])}" data-v-63878fb4>${ssrInterpolate(kpi.valor)}</p><p class="text-xs text-slate-custom" data-v-63878fb4>${ssrInterpolate(kpi.label)}</p>`);
        if (kpi.unidad) {
          _push(`<p class="text-[10px] text-ink-muted" data-v-63878fb4>${ssrInterpolate(kpi.unidad)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (kpi.cambio) {
          _push(`<p class="mt-1 text-[10px] font-medium text-eco" data-v-63878fb4>${ssrInterpolate(kpi.cambio)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><div class="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm" data-v-63878fb4><div class="container-wide" data-v-63878fb4><nav class="flex gap-1 overflow-x-auto py-2 scrollbar-hide" aria-label="Secciones de indicadores" data-v-63878fb4><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.id ? "bg-primary text-white shadow-sm" : "text-slate-custom hover:bg-gray-100 hover:text-ink", "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"])}" data-v-63878fb4><span data-v-63878fb4>${tab.icon ?? ""}</span> ${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></nav></div></div><div style="${ssrRenderStyle(unref(activeTab) === "territorial" ? null : { display: "none" })}" data-v-63878fb4><section class="py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Distribución por alcaldía</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Cantidad de techos verdes existentes vs candidatos por alcaldía</p><div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div class="panel p-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div data-v-63878fb4><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors" data-v-63878fb4><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTables).alcaldia }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-63878fb4><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-63878fb4></path></svg> ${ssrInterpolate(unref(expandedTables).alcaldia ? "Ocultar tabla" : "Ver tabla detallada")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTables).alcaldia ? null : { display: "none" })}" data-v-63878fb4><table class="table-base w-full min-w-[320px]" data-v-63878fb4><thead data-v-63878fb4><tr data-v-63878fb4><th class="cursor-pointer select-none" data-v-63878fb4>Alcaldía <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).alcaldia, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Existentes <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).alcaldia, "existing"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Candidatos <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).alcaldia, "candidates"))}</span></th></tr></thead><tbody data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(alcaldiaData), (row) => {
        _push(`<tr data-v-63878fb4><td class="font-medium" data-v-63878fb4>${ssrInterpolate(row.alcaldia)}</td><td data-v-63878fb4><span class="font-semibold text-primary" data-v-63878fb4>${ssrInterpolate(row.existing)}</span></td><td data-v-63878fb4><span class="font-semibold text-secondary" data-v-63878fb4>${ssrInterpolate(row.candidates)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div></section><section class="bg-white py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><div class="grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Distribución por tipo de edificio</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Clasificación según tipo de edificio</p><div class="mt-6 panel p-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Tipo de techo verde</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Clasificación según cubierta vegetal</p><div class="mt-6 flex justify-center" data-v-63878fb4><div class="panel p-6" style="${ssrRenderStyle({ "max-width": "400px", "width": "100%" })}" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></div></div></section><section class="py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Zonas con mayor aptitud</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Top 5 alcaldías por score promedio de aptitud territorial</p><div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5" data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(topAlcaldias), (item, index2) => {
        _push(`<div class="panel text-center" data-v-63878fb4><div class="mb-2 flex items-center justify-center gap-1" data-v-63878fb4><span class="${ssrRenderClass([
          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white",
          index2 === 0 ? "bg-primary" : index2 === 1 ? "bg-eco" : "bg-secondary"
        ])}" data-v-63878fb4>${ssrInterpolate(index2 + 1)}</span></div><p class="text-sm font-semibold text-ink" data-v-63878fb4>${ssrInterpolate(item.alcaldia)}</p><p class="mt-1 text-2xl font-bold" style="${ssrRenderStyle({ color: unref(scoreColor)(item.avgScore) })}" data-v-63878fb4>${ssrInterpolate(item.avgScore.toFixed(1))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>score promedio</p><p class="mt-1 text-[10px] text-ink-muted" data-v-63878fb4>${ssrInterpolate(item.count)} candidatos</p></div>`);
      });
      _push(`<!--]--></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "aptitud" ? null : { display: "none" })}" data-v-63878fb4><section class="py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><div class="grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Distribución de scores de aptitud</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Histograma de los 60 candidatos priorizados</p><div class="mt-6 panel p-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Perfil de aptitud promedio</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>8 variables de aptitud territorial</p><div class="mt-6 flex justify-center" data-v-63878fb4><div class="panel p-6" style="${ssrRenderStyle({ "max-width": "520px", "width": "100%" })}" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></div></div></section><section class="bg-white py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Avance de validaciones</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Estado de las validaciones con inteligencia artificial</p><div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2" data-v-63878fb4><div class="panel p-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="flex items-center justify-center" data-v-63878fb4><div class="text-center" data-v-63878fb4><div class="relative mx-auto h-40 w-40" data-v-63878fb4><svg viewBox="0 0 100 100" class="h-full w-full -rotate-90" data-v-63878fb4><circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="12" data-v-63878fb4></circle><circle cx="50" cy="50" r="40" fill="none" stroke="#79C141" stroke-width="12"${ssrRenderAttr("stroke-dasharray", `${unref(completedPct) * 2.51} 251`)} stroke-linecap="round" data-v-63878fb4></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center" data-v-63878fb4><span class="text-2xl font-bold text-ink" data-v-63878fb4>${ssrInterpolate(unref(completedPct).toFixed(0))}%</span><span class="text-xs text-slate-custom" data-v-63878fb4>completado</span></div></div><p class="mt-4 text-sm text-slate-custom" data-v-63878fb4>${ssrInterpolate(unref(completedCount))} de ${ssrInterpolate(unref(totalValidations))} validaciones revisadas </p></div></div></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "ambiente" ? null : { display: "none" })}" data-v-63878fb4><section class="py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><div class="flex items-center gap-3" data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Índices de biodiversidad por alcaldía</h3>`);
      _push(ssrRenderComponent(_component_CommonDataSourceBadge, { "source-name": "CONABIO" }, null, _parent));
      _push(ssrRenderComponent(_component_CommonDataSourceBadge, { "source-name": "SEDEMA" }, null, _parent));
      _push(`</div><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Métricas de diversidad biológica en azoteas verdes, basadas en índices ecológicos estándar</p><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5" data-v-63878fb4><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-primary" data-v-63878fb4>${ssrInterpolate(unref(bioKpis).riquezaPromedio.toFixed(1))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Riqueza promedio</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>especies/alcaldía</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-eco" data-v-63878fb4>${ssrInterpolate(unref(bioKpis).shannonPromedio.toFixed(2))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Shannon H&#39; promedio</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>índice de diversidad</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-secondary" data-v-63878fb4>${ssrInterpolate(unref(bioKpis).simpsonPromedio.toFixed(2))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Simpson 1-D promedio</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>índice de dominancia</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-accent" data-v-63878fb4>${ssrInterpolate(unref(bioKpis).coberturaPromedio.toFixed(1))}%</p><p class="text-xs text-slate-custom" data-v-63878fb4>Cobertura promedio</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>vegetal en azoteas</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-primary" data-v-63878fb4>${ssrInterpolate(unref(bioKpis).totalEspecies)}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Total especies</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>registradas en la red</p></div></div><div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div class="panel p-6" data-v-63878fb4><h4 class="mb-4 text-sm font-semibold text-ink" data-v-63878fb4>Riqueza de especies por alcaldía</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6" data-v-63878fb4><h4 class="mb-4 text-sm font-semibold text-ink" data-v-63878fb4>Perfil biótico promedio</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div class="mt-6" data-v-63878fb4><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors" data-v-63878fb4><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTables).biodiversidad }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-63878fb4><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-63878fb4></path></svg> ${ssrInterpolate(unref(expandedTables).biodiversidad ? "Ocultar tabla" : "Ver tabla detallada de biodiversidad")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTables).biodiversidad ? null : { display: "none" })}" data-v-63878fb4><table class="table-base w-full min-w-[600px]" data-v-63878fb4><thead data-v-63878fb4><tr data-v-63878fb4><th class="cursor-pointer select-none" data-v-63878fb4>Alcaldía <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).bio, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Cobertura % <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).bio, "coberturaVegetal"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Riqueza spp <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).bio, "riquezaEspecies"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>H&#39; <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).bio, "shannon"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>1-D <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).bio, "simpson"))}</span></th><th data-v-63878fb4>Especies dominantes</th></tr></thead><tbody data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(bioTableData), (row) => {
        _push(`<tr data-v-63878fb4><td class="font-medium whitespace-nowrap" data-v-63878fb4>${ssrInterpolate(row.alcaldia)}</td><td data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="h-2 w-16 rounded-full bg-gray-200" data-v-63878fb4><div class="h-2 rounded-full bg-eco" style="${ssrRenderStyle({ width: row.coberturaVegetal + "%" })}" data-v-63878fb4></div></div><span class="text-sm font-semibold text-eco" data-v-63878fb4>${ssrInterpolate(row.coberturaVegetal)}%</span></div></td><td class="font-semibold text-primary" data-v-63878fb4>${ssrInterpolate(row.riquezaEspecies)}</td><td class="font-semibold text-secondary" data-v-63878fb4>${ssrInterpolate(row.indiceShannonWiener.toFixed(2))}</td><td class="font-semibold text-accent" data-v-63878fb4>${ssrInterpolate(row.indiceSimpson.toFixed(2))}</td><td class="text-xs text-slate-custom" data-v-63878fb4>${ssrInterpolate(row.especiesDominantes.join(", "))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></section><section class="bg-white py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Cobertura vegetal en azoteas verdes</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Porcentaje de cobertura vegetal por alcaldía y distribución por rangos</p><div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div class="panel p-6" data-v-63878fb4><h4 class="mb-4 text-sm font-semibold text-ink" data-v-63878fb4>Cobertura vegetal por alcaldía (%)</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="flex items-center justify-center" data-v-63878fb4><div class="panel p-6" style="${ssrRenderStyle({ "max-width": "400px", "width": "100%" })}" data-v-63878fb4><h4 class="mb-4 text-center text-sm font-semibold text-ink" data-v-63878fb4>Alcaldías por rango de cobertura</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div></div></section><section class="py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4><div class="flex items-center gap-3" data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Indicadores hídricos y captación pluvial</h3>`);
      _push(ssrRenderComponent(_component_CommonDataSourceBadge, { "source-name": "CONAGUA" }, null, _parent));
      _push(`</div><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Métricas de captación de agua pluvial, escorrentía evitada y eficiencia de retención en azoteas verdes</p><div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" data-v-63878fb4><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-secondary" data-v-63878fb4>${ssrInterpolate(unref(hidricoKpis).captacionTotal.toLocaleString("es-MX"))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Captación total</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>L/m²/año (suma)</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-primary" data-v-63878fb4>${ssrInterpolate(unref(hidricoKpis).escorrentiaTotal.toLocaleString("es-MX"))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Escorrentía evitada</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>L/año (total)</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-eco" data-v-63878fb4>${ssrInterpolate(unref(hidricoKpis).eficienciaPromedio.toFixed(1))}%</p><p class="text-xs text-slate-custom" data-v-63878fb4>Eficiencia promedio</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>retención hídrica</p></div><div class="kpi-card" data-v-63878fb4><p class="text-2xl font-bold text-accent" data-v-63878fb4>${ssrInterpolate(unref(hidricoKpis).precipitacionMedia.toFixed(0))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>Precipitación media</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>mm/año</p></div></div><div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div class="panel p-6" data-v-63878fb4><h4 class="mb-4 text-sm font-semibold text-ink" data-v-63878fb4>Captación pluvial por alcaldía (L/m²/año)</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="panel p-6" data-v-63878fb4><h4 class="mb-4 text-sm font-semibold text-ink" data-v-63878fb4>Precipitación media anual por alcaldía (mm)</h4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div><div class="mt-6" data-v-63878fb4><button class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors" data-v-63878fb4><svg class="${ssrRenderClass([{ "rotate-90": unref(expandedTables).hidrico }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-63878fb4><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" data-v-63878fb4></path></svg> ${ssrInterpolate(unref(expandedTables).hidrico ? "Ocultar tabla" : "Ver tabla detallada de indicadores hídricos")}</button><div class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style="${ssrRenderStyle(unref(expandedTables).hidrico ? null : { display: "none" })}" data-v-63878fb4><table class="table-base w-full min-w-[600px]" data-v-63878fb4><thead data-v-63878fb4><tr data-v-63878fb4><th class="cursor-pointer select-none" data-v-63878fb4>Alcaldía <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Precipitación <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "precipitacionMediaAnual"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Captación <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "captacionPluvial"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Escorrentía <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "escorrentiaEvitada"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Sup. capt. <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "superficieVerdeCaptadora"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Eficiencia <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).hidrico, "eficienciaRetencion"))}</span></th></tr></thead><tbody data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(hidricoTableData), (row) => {
        _push(`<tr data-v-63878fb4><td class="font-medium whitespace-nowrap" data-v-63878fb4>${ssrInterpolate(row.alcaldia)}</td><td class="font-semibold text-secondary" data-v-63878fb4>${ssrInterpolate(row.precipitacionMediaAnual)}</td><td class="font-semibold text-primary" data-v-63878fb4>${ssrInterpolate(row.captacionPluvial)}</td><td data-v-63878fb4>${ssrInterpolate(row.escorrentiaEvitada.toLocaleString("es-MX"))} L</td><td data-v-63878fb4>${ssrInterpolate(row.superficieVerdeCaptadora.toLocaleString("es-MX"))} m2</td><td data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="h-2 w-16 rounded-full bg-gray-200" data-v-63878fb4><div class="h-2 rounded-full bg-secondary" style="${ssrRenderStyle({ width: row.eficienciaRetencion + "%" })}" data-v-63878fb4></div></div><span class="text-sm font-semibold text-secondary" data-v-63878fb4>${ssrInterpolate(row.eficienciaRetencion)}%</span></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "estadistico" ? null : { display: "none" })}" data-v-63878fb4><section class="py-12" data-v-63878fb4><div class="container-wide" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_CommonSectionTitle, {
        title: "Análisis para toma de decisiones",
        subtitle: "Diagnóstico de riesgo, costos de inacción, retorno de inversión y plan de acción para autoridades de alcaldía.",
        tag: "Decisiones"
      }, null, _parent));
      _push(`<div class="mt-10" data-v-63878fb4><h3 class="text-lg font-semibold text-ink" data-v-63878fb4>Diagnóstico de riesgo climático</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Evaluación de 6 indicadores críticos para la alcaldía seleccionada</p><div class="mt-4" data-v-63878fb4><label class="block text-sm font-semibold text-ink" data-v-63878fb4>Alcaldía</label><select class="select mt-1 max-w-xs" data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(alcaldiaListForRisk), (alc) => {
        _push(`<option${ssrRenderAttr("value", alc)} data-v-63878fb4${ssrIncludeBooleanAttr(Array.isArray(unref(selectedAlcaldia)) ? ssrLooseContain(unref(selectedAlcaldia), alc) : ssrLooseEqual(unref(selectedAlcaldia), alc)) ? " selected" : ""}>${ssrInterpolate(alc)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-6" data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(riskProfile).indicadores, (ind) => {
        _push(`<div class="${ssrRenderClass([{
          "border-l-4 border-l-alert": ind.nivel === "critico",
          "border-l-4 border-l-orange-500": ind.nivel === "alto",
          "border-l-4 border-l-accent": ind.nivel === "moderado",
          "border-l-4 border-l-eco": ind.nivel === "bajo"
        }, "panel p-4"])}" data-v-63878fb4><p class="text-xs font-semibold text-ink" data-v-63878fb4>${ssrInterpolate(ind.nombre)}</p><p class="mt-1 text-2xl font-bold" style="${ssrRenderStyle({ color: riskLevelColor(ind.nivel) })}" data-v-63878fb4>${ssrInterpolate(typeof ind.valor === "number" && ind.valor % 1 !== 0 ? ind.valor.toFixed(1) : ind.valor)} <span class="text-xs font-normal text-slate-custom" data-v-63878fb4>${ssrInterpolate(ind.unidad)}</span></p><div class="mt-2 h-2 w-full rounded-full bg-gray-200" data-v-63878fb4><div class="h-2 rounded-full transition-all" style="${ssrRenderStyle({
          width: riskBarWidth(ind) + "%",
          backgroundColor: riskLevelColor(ind.nivel)
        })}" data-v-63878fb4></div></div><p class="mt-1 text-[10px] font-bold uppercase" style="${ssrRenderStyle({ color: riskLevelColor(ind.nivel) })}" data-v-63878fb4>${ssrInterpolate(ind.nivel)}</p><p class="mt-0.5 text-[10px] text-slate-custom" data-v-63878fb4>${ssrInterpolate(ind.umbralRef)}</p></div>`);
      });
      _push(`<!--]--></div><div class="${ssrRenderClass([{
        "border-alert/40 bg-alert/5": unref(riskProfile).nivelGeneral === "critico",
        "border-orange-500/40 bg-orange-50": unref(riskProfile).nivelGeneral === "alto",
        "border-accent/40 bg-accent/5": unref(riskProfile).nivelGeneral === "moderado",
        "border-eco/40 bg-eco/5": unref(riskProfile).nivelGeneral === "bajo"
      }, "mt-6 rounded-lg border-2 p-5"])}" data-v-63878fb4><div class="flex items-start gap-3" data-v-63878fb4><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style="${ssrRenderStyle({ backgroundColor: riskLevelColor(unref(riskProfile).nivelGeneral) })}" data-v-63878fb4><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-63878fb4><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" data-v-63878fb4></path><line x1="12" y1="9" x2="12" y2="13" data-v-63878fb4></line><line x1="12" y1="17" x2="12.01" y2="17" data-v-63878fb4></line></svg></div><div data-v-63878fb4><p class="text-sm font-bold text-ink" data-v-63878fb4> La alcaldía ${ssrInterpolate(unref(selectedAlcaldia))} presenta un nivel de riesgo <span style="${ssrRenderStyle({ color: riskLevelColor(unref(riskProfile).nivelGeneral) })}" class="uppercase" data-v-63878fb4>${ssrInterpolate(unref(riskProfile).nivelGeneral)}</span> (${ssrInterpolate(unref(riskProfile).scoreRiesgo.toFixed(0))}/100) </p><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>${ssrInterpolate(unref(riskAlertCount))} de ${ssrInterpolate(unref(riskProfile).indicadores.length)} indicadores en zona de alerta. Sin intervención, se espera un incremento sostenido en temperatura superficial y costos asociados a salud pública por golpe de calor. </p></div></div></div></div><div class="mt-12" data-v-63878fb4><h3 class="text-lg font-semibold text-ink" data-v-63878fb4>Impacto potencial sin intervención</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Recursos no aprovechados y riesgos incrementales si no se instalan techos verdes</p><div class="mt-6 panel p-6" data-v-63878fb4><div class="grid grid-cols-1 gap-6 md:grid-cols-2" data-v-63878fb4><div data-v-63878fb4><label class="block text-sm font-semibold text-ink" data-v-63878fb4>Superficie de techos verdes</label><div class="mt-2 flex items-center gap-3" data-v-63878fb4><input${ssrRenderAttr("value", unref(m2Slider))} type="range"${ssrRenderAttr("min", 1e3)}${ssrRenderAttr("max", 6e5)}${ssrRenderAttr("step", 1e3)} class="w-full accent-primary" data-v-63878fb4><div class="flex items-center gap-1" data-v-63878fb4><input${ssrRenderAttr("value", unref(m2Slider))} type="number" min="100" max="1000000" step="100" class="input w-28 text-right text-sm font-semibold tabular-nums" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>m²</span></div></div><div class="mt-1 flex justify-between text-[10px] text-slate-custom" data-v-63878fb4><span data-v-63878fb4>1,000 m²</span><span data-v-63878fb4>600,000 m²</span></div><div class="mt-2 flex flex-wrap gap-1.5" data-v-63878fb4><!--[-->`);
      ssrRenderList(m2Presets, (preset) => {
        _push(`<button class="${ssrRenderClass([unref(m2Slider) === preset.value ? "bg-primary text-white" : "bg-gray-100 text-slate-custom hover:bg-gray-200", "rounded px-2 py-0.5 text-[10px] font-medium transition-all"])}" data-v-63878fb4>${ssrInterpolate(preset.label)}</button>`);
      });
      _push(`<!--]--></div><div class="mt-3 flex flex-wrap items-center gap-2" data-v-63878fb4><input id="adjustStructural"${ssrIncludeBooleanAttr(Array.isArray(unref(adjustForStructural)) ? ssrLooseContain(unref(adjustForStructural), null) : unref(adjustForStructural)) ? " checked" : ""} type="checkbox" class="h-4 w-4 shrink-0 rounded border-gray-300 text-primary accent-primary" data-v-63878fb4><label for="adjustStructural" class="text-xs text-ink" data-v-63878fb4>Ajustar por viabilidad constructiva</label>`);
      if (unref(adjustForStructural)) {
        _push(`<span class="rounded-full bg-eco/10 px-2 py-0.5 text-[10px] font-semibold text-eco-dark" data-v-63878fb4>${ssrInterpolate(unref(effectiveM2).m2Efectivos.toLocaleString("es-MX"))} m² efectivos </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-63878fb4><label class="block text-sm font-semibold text-ink" data-v-63878fb4>Horizonte temporal</label><div class="mt-2 flex gap-2" data-v-63878fb4><!--[-->`);
      ssrRenderList([5, 10, 15, 20], (h) => {
        _push(`<button class="${ssrRenderClass([unref(yearsHorizon) === h ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-ink hover:bg-gray-200", "rounded-lg px-4 py-2 text-sm font-medium transition-all"])}" data-v-63878fb4>${ssrInterpolate(h)} años </button>`);
      });
      _push(`<!--]--></div><p class="mt-3 text-[10px] text-slate-custom" data-v-63878fb4> Población de referencia (alcaldía seleccionada): ${ssrInterpolate(Math.round(unref(selectedAlcData).pobProm).toLocaleString("es-MX"))} hab. </p></div></div><div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" data-v-63878fb4><div class="kpi-card border-l-4 border-l-accent" data-v-63878fb4><p class="text-xl font-bold text-accent" data-v-63878fb4>${ssrInterpolate(unref(physicalImpacts).energiaMwh.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} MWh/año</p><p class="text-xs text-slate-custom" data-v-63878fb4>Energía no ahorrada</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>equivale a ${ssrInterpolate(unref(physicalImpacts).hogares.toLocaleString("es-MX"))} hogares</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-63878fb4>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² × 432.95 kWh/m²/año <p class="mt-0.5 font-sans text-[9px] italic" data-v-63878fb4>Cervantes Nájera (2025), Tabla 15, p. 112.</p></div></div><div class="kpi-card border-l-4 border-l-orange-500" data-v-63878fb4><p class="text-xl font-bold text-orange-600" data-v-63878fb4>${ssrInterpolate(unref(physicalImpacts).consultasAnuales)} consultas/año</p><p class="text-xs text-slate-custom" data-v-63878fb4>Riesgo en salud pública</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>urgencias estimadas por calor</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-63878fb4>${ssrInterpolate((unref(selectedAlcData).pobProm / 1e5).toFixed(2))} (×100k hab) × 12 consul./año <p class="mt-0.5 font-sans text-[9px] italic" data-v-63878fb4>SINAVE (2023), zonas urbanas &gt;35°C LST.</p></div></div><div class="kpi-card border-l-4 border-l-secondary" data-v-63878fb4><p class="text-xl font-bold text-secondary" data-v-63878fb4>${ssrInterpolate(unref(physicalImpacts).aguaM3.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} m³/año</p><p class="text-xs text-slate-custom" data-v-63878fb4>Agua no captada</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>escorrentía sin gestionar</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-63878fb4>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² × 19.5 L/m²/año ÷ 1000 <p class="mt-0.5 font-sans text-[9px] italic" data-v-63878fb4>Cervantes Nájera (2021), Cap. 5, p. 92.</p></div></div><div class="kpi-card border-l-4 border-l-primary" data-v-63878fb4><p class="text-xl font-bold text-primary" data-v-63878fb4>${ssrInterpolate(unref(physicalImpacts).co2Ton.toLocaleString("es-MX", { maximumFractionDigits: 1 }))} tonCO₂/año</p><p class="text-xs text-slate-custom" data-v-63878fb4>Emisiones no capturadas</p><p class="text-[10px] text-ink-muted" data-v-63878fb4>${ssrInterpolate(formatMXN(unref(physicalImpacts).co2Ton * 500, true))} en mercado de carbono</p><div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed" data-v-63878fb4>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² × 0.968 kg/m²/año ÷ 1000 × $500/tonCO₂ <p class="mt-0.5 font-sans text-[9px] italic" data-v-63878fb4>Cervantes Nájera (2025), Tabla 12. Precio: Mexico2 (2024).</p></div></div></div><div class="mt-4 rounded-xl border-2 border-accent/30 bg-accent/5 p-6" data-v-63878fb4><p class="text-center text-sm font-semibold text-accent" data-v-63878fb4>Impacto acumulado en ${ssrInterpolate(unref(yearsHorizon))} años sin intervención</p><div class="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4 text-center" data-v-63878fb4><div data-v-63878fb4><p class="text-lg font-bold text-accent" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).energiaMwh * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))} GWh</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>energía no ahorrada</p></div><div data-v-63878fb4><p class="text-lg font-bold text-orange-600" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).consultasAnuales * unref(yearsHorizon)).toLocaleString("es-MX"))}</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>consultas evitables</p></div><div data-v-63878fb4><p class="text-lg font-bold text-secondary" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).aguaM3 * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))} dam³</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>agua no captada</p></div><div data-v-63878fb4><p class="text-lg font-bold text-primary" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).co2Ton * unref(yearsHorizon)).toLocaleString("es-MX", { maximumFractionDigits: 0 }))} tonCO₂</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>emisiones no mitigadas</p></div></div></div><div class="mt-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div></div></div><div class="mt-12" data-v-63878fb4><h3 class="text-lg font-semibold text-ink" data-v-63878fb4>Potencial de mejora</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Beneficios ambientales y sociales estimados con la instalación de techos verdes</p><div class="mt-6 panel p-6" data-v-63878fb4><div class="grid grid-cols-1 gap-6 md:grid-cols-2" data-v-63878fb4><div class="rounded-lg border border-gray-200 p-5" data-v-63878fb4><p class="text-sm font-semibold text-ink" data-v-63878fb4>Situación actual (sin intervención)</p><div class="mt-4 space-y-3" data-v-63878fb4><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>Ahorro energético</span><span class="text-sm font-bold text-ink" data-v-63878fb4>0 MWh/año</span></div><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>Agua captada</span><span class="text-sm font-bold text-ink" data-v-63878fb4>0 m³/año</span></div><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>CO₂ capturado</span><span class="text-sm font-bold text-ink" data-v-63878fb4>0 ton/año</span></div><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>Reducción temperatura</span><span class="text-sm font-bold text-ink" data-v-63878fb4>0 °C</span></div></div></div><div class="rounded-lg border border-eco/30 bg-eco/5 p-5" data-v-63878fb4><p class="text-sm font-semibold text-ink" data-v-63878fb4>Con ${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² de techos verdes</p><div class="mt-4 space-y-3" data-v-63878fb4><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>Ahorro energético</span><span class="text-sm font-bold text-eco" data-v-63878fb4>+${ssrInterpolate(unref(physicalImpacts).energiaMwh.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} MWh/año</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-63878fb4>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² × 432.95 kWh/m²/año — Cervantes Nájera (2025)</p><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>Agua captada</span><span class="text-sm font-bold text-secondary" data-v-63878fb4>+${ssrInterpolate(unref(physicalImpacts).aguaM3.toLocaleString("es-MX", { maximumFractionDigits: 0 }))} m³/año</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-63878fb4>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² × 19.5 L/m²/año — Cervantes Nájera (2021)</p><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>CO₂ capturado</span><span class="text-sm font-bold text-primary" data-v-63878fb4>+${ssrInterpolate(unref(physicalImpacts).co2Ton.toLocaleString("es-MX", { maximumFractionDigits: 1 }))} ton/año</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-63878fb4>${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} m² × 0.968 kg/m²/año — valor: ${ssrInterpolate(formatMXN(unref(physicalImpacts).co2Ton * 500, true))}/año (Mexico2, 2024)</p><div class="flex items-center justify-between" data-v-63878fb4><span class="text-xs text-slate-custom" data-v-63878fb4>Reducción temperatura</span><span class="text-sm font-bold text-accent" data-v-63878fb4>-${ssrInterpolate(unref(physicalImpacts).tempReduction.toFixed(2))} °C</span></div><p class="text-[10px] font-mono text-slate-custom/70" data-v-63878fb4>3.5°C × (${ssrInterpolate(unref(m2Slider).toLocaleString("es-MX"))} / 79,584) — Cervantes Nájera (2021)</p></div></div></div><div class="mt-6 rounded-xl border-2 border-eco/30 bg-eco/5 p-6 text-center" data-v-63878fb4><p class="text-sm font-semibold text-eco" data-v-63878fb4>Impacto acumulado en ${ssrInterpolate(unref(yearsHorizon))} años</p><div class="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4" data-v-63878fb4><div data-v-63878fb4><p class="text-2xl font-bold text-eco" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).energiaMwh * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>GWh ahorrados</p></div><div data-v-63878fb4><p class="text-2xl font-bold text-secondary" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).aguaM3 * unref(yearsHorizon) / 1e3).toLocaleString("es-MX", { maximumFractionDigits: 0 }))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>dam³ captados</p></div><div data-v-63878fb4><p class="text-2xl font-bold text-primary" data-v-63878fb4>${ssrInterpolate((unref(physicalImpacts).co2Ton * unref(yearsHorizon)).toLocaleString("es-MX", { maximumFractionDigits: 0 }))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>tonCO₂ capturadas</p></div><div data-v-63878fb4><p class="text-2xl font-bold text-accent" data-v-63878fb4>${ssrInterpolate(unref(roiResult).periodoRecuperacion.toFixed(1))}</p><p class="text-xs text-slate-custom" data-v-63878fb4>años recuperación</p></div></div></div><div class="mt-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-64 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-64 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`</div><p class="mt-4 text-[10px] text-slate-custom" data-v-63878fb4> Tasas de impacto: Cervantes Nájera (2021, 2025) CIIEMAD-IPN. Valor CO₂: $500 MXN/tonCO₂, Mexico2 mercado voluntario (2024). </p></div></div><div class="mt-12" data-v-63878fb4><h3 class="text-lg font-semibold text-ink" data-v-63878fb4>Justificación del modelo</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Evidencia estadística que respalda la priorización de techos verdes</p><div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2" data-v-63878fb4><div class="panel p-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`<div class="mt-4 space-y-2" data-v-63878fb4><div class="rounded-lg bg-eco/5 p-3 text-xs" data-v-63878fb4><p data-v-63878fb4><span class="font-bold text-eco" data-v-63878fb4>¿Qué demuestra?</span> ${ssrInterpolate(interpretRegression(unref(regLstScore), "temperatura superficial", "aptitud"))} El modelo explica el ${ssrInterpolate((unref(regLstScore).r2 * 100).toFixed(0))}% de la variabilidad.</p></div><div class="rounded-lg bg-primary-50 p-3 text-xs" data-v-63878fb4><p data-v-63878fb4><span class="font-bold text-primary" data-v-63878fb4>Implicación:</span> Las zonas con mayor temperatura superficial son las que más se beneficiarían de techos verdes. La priorización por LST está estadísticamente respaldada.</p></div></div></div><div class="panel p-6" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-80 items-center justify-center text-sm text-slate-custom" data-v-63878fb4${_scopeId}>Cargando gráfica...</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-80 items-center justify-center text-sm text-slate-custom" }, "Cargando gráfica...")
            ];
          }
        })
      }, _parent));
      _push(`<div class="mt-4 space-y-2" data-v-63878fb4><div class="rounded-lg bg-eco/5 p-3 text-xs" data-v-63878fb4><p data-v-63878fb4><span class="font-bold text-eco" data-v-63878fb4>¿Qué demuestra?</span> ${ssrInterpolate(interpretRegression(unref(regBioCob), "biodiversidad", "cobertura vegetal"))}</p></div><div class="rounded-lg bg-primary-50 p-3 text-xs" data-v-63878fb4><p data-v-63878fb4><span class="font-bold text-primary" data-v-63878fb4>Implicación:</span> Invertir en techos verdes no solo reduce temperatura: incrementa la biodiversidad urbana, un indicador clave de resiliencia ecológica.</p></div></div></div></div><div class="mt-8" data-v-63878fb4><h4 class="text-base font-semibold text-ink" data-v-63878fb4>Matriz de correlación</h4><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Coeficientes de Pearson entre variables ambientales y territoriales</p><div class="mt-4 overflow-x-auto panel p-4" data-v-63878fb4><table class="w-full border-collapse text-xs" data-v-63878fb4><thead data-v-63878fb4><tr data-v-63878fb4><th class="p-2 text-left font-semibold text-ink" data-v-63878fb4> </th><!--[-->`);
      ssrRenderList(unref(corrMatrix).labels, (label) => {
        _push(`<th class="p-2 text-center font-semibold text-ink" style="${ssrRenderStyle({ "min-width": "70px" })}" data-v-63878fb4>${ssrInterpolate(label)}</th>`);
      });
      _push(`<!--]--></tr></thead><tbody data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(corrMatrix).matrix, (row, i) => {
        _push(`<tr data-v-63878fb4><td class="p-2 font-semibold text-ink whitespace-nowrap" data-v-63878fb4>${ssrInterpolate(unref(corrMatrix).labels[i])}</td><!--[-->`);
        ssrRenderList(row, (val, j) => {
          _push(`<td class="p-2 text-center font-mono" style="${ssrRenderStyle({
            backgroundColor: correlationColor(val),
            color: Math.abs(val) > 0.6 ? "#ffffff" : "#1F2937"
          })}" data-v-63878fb4>${ssrInterpolate(val.toFixed(2))}</td>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-4 rounded-lg bg-primary-50 p-4" data-v-63878fb4><p class="text-xs font-bold text-primary" data-v-63878fb4>Correlaciones clave para política pública:</p><ul class="mt-2 space-y-1 text-xs text-slate-custom" data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(topCorrelations), (insight, idx) => {
        _push(`<li data-v-63878fb4><span class="font-semibold text-ink" data-v-63878fb4>${ssrInterpolate(insight.pair)}:</span> r=${ssrInterpolate(insight.value.toFixed(2))} — ${ssrInterpolate(insight.interpretation)}</li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="mt-12" data-v-63878fb4><h3 class="text-lg font-semibold text-ink" data-v-63878fb4>Priorización y plan de acción</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Ranking de alcaldías con inversión recomendada y beneficio estimado</p><div class="mt-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" data-v-63878fb4><table class="table-base w-full min-w-[700px]" data-v-63878fb4><thead data-v-63878fb4><tr data-v-63878fb4><th class="w-10" data-v-63878fb4>#</th><th class="cursor-pointer select-none" data-v-63878fb4>Alcaldía <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "alcaldia"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Riesgo <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "indice"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>m² recom. <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "m2Recomendados"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Viabilidad <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "scorePrefact"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>m² efect. <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "m2Efectivos"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Inversión <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "inversion"))}</span></th><th class="cursor-pointer select-none" data-v-63878fb4>Beneficio <span class="text-[10px] opacity-60" data-v-63878fb4>${ssrInterpolate(sortIcon(unref(sortStates).plan, "beneficioAnual"))}</span></th><th data-v-63878fb4>Prioridad</th></tr></thead><tbody data-v-63878fb4><!--[-->`);
      ssrRenderList(unref(actionPlanRanking), (row, idx) => {
        _push(`<tr data-v-63878fb4><td class="font-bold" style="${ssrRenderStyle({ color: necesidadColor(row.indice) })}" data-v-63878fb4>${ssrInterpolate(idx + 1)}</td><td class="font-medium whitespace-nowrap" data-v-63878fb4>${ssrInterpolate(row.alcaldia)}</td><td data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="h-2 w-12 rounded-full bg-gray-200" data-v-63878fb4><div class="h-2 rounded-full" style="${ssrRenderStyle({ width: row.indice + "%", backgroundColor: necesidadColor(row.indice) })}" data-v-63878fb4></div></div><span class="text-xs font-bold" style="${ssrRenderStyle({ color: necesidadColor(row.indice) })}" data-v-63878fb4>${ssrInterpolate(row.indice.toFixed(0))}</span></div></td><td class="text-sm font-semibold text-ink tabular-nums" data-v-63878fb4>${ssrInterpolate(row.m2Recomendados.toLocaleString("es-MX"))}</td><td data-v-63878fb4><span class="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap" style="${ssrRenderStyle({ backgroundColor: viabilidadColor(row.viabilidad) })}" data-v-63878fb4>${ssrInterpolate(row.viabilidad)}</span></td><td class="text-sm font-semibold text-ink tabular-nums" data-v-63878fb4>${ssrInterpolate(row.m2Efectivos.toLocaleString("es-MX"))}</td><td class="text-sm text-ink tabular-nums" data-v-63878fb4>${ssrInterpolate(formatMXN(row.inversion, true))}</td><td class="text-sm font-semibold text-eco tabular-nums" data-v-63878fb4>${ssrInterpolate(formatMXN(row.beneficioAnual, true))}</td><td data-v-63878fb4><span class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase text-white whitespace-nowrap" style="${ssrRenderStyle({ backgroundColor: prioridadColor(row.prioridad) })}" data-v-63878fb4>${ssrInterpolate(row.prioridad)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="mt-6 rounded-lg border-2 border-primary/30 bg-primary-50 p-5" data-v-63878fb4><p class="text-sm font-bold text-primary" data-v-63878fb4>Resumen ejecutivo</p><p class="mt-2 text-sm text-ink leading-relaxed" data-v-63878fb4> Las 3 alcaldías con mayor urgencia son <strong data-v-63878fb4>${ssrInterpolate(unref(actionPlanRanking)[0]?.alcaldia)}</strong>, <strong data-v-63878fb4>${ssrInterpolate(unref(actionPlanRanking)[1]?.alcaldia)}</strong> y <strong data-v-63878fb4>${ssrInterpolate(unref(actionPlanRanking)[2]?.alcaldia)}</strong>. Se recomienda iniciar con pilotos de techos verdes ligeros extensivos (TVLE) en edificios públicos, priorizando ${ssrInterpolate(unref(actionPlanRanking)[0]?.m2Recomendados.toLocaleString("es-MX"))} m² en ${ssrInterpolate(unref(actionPlanRanking)[0]?.alcaldia)} (${ssrInterpolate(unref(actionPlanRanking)[0]?.m2Efectivos.toLocaleString("es-MX"))} m² efectivos tras evaluación estructural) con una inversión de ${ssrInterpolate(formatMXN(unref(actionPlanRanking)[0]?.inversion ?? 0, true))} y un beneficio anual estimado de ${ssrInterpolate(formatMXN(unref(actionPlanRanking)[0]?.beneficioAnual ?? 0, true))}. </p></div><div class="mt-8 rounded-lg border border-gray-200 bg-white p-5" data-v-63878fb4><button class="flex w-full items-center justify-between text-sm font-semibold text-ink" data-v-63878fb4><span data-v-63878fb4>Fuentes y metodología de cálculo</span><svg class="${ssrRenderClass([{ "rotate-180": unref(expandedTables).fuentes }, "h-4 w-4 transition-transform"])}" viewBox="0 0 20 20" fill="currentColor" data-v-63878fb4><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" data-v-63878fb4></path></svg></button><div class="mt-4 space-y-4 text-xs text-slate-custom" style="${ssrRenderStyle(unref(expandedTables).fuentes ? null : { display: "none" })}" data-v-63878fb4><div data-v-63878fb4><p class="font-bold text-ink" data-v-63878fb4>Tesis de referencia</p><ul class="mt-1 space-y-1 list-disc pl-4" data-v-63878fb4><li data-v-63878fb4><strong data-v-63878fb4>Cervantes Nájera, A.L. (2025).</strong> &quot;Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México.&quot; Tesis doctoral, CIIEMAD-IPN. Directora: Dra. María Concepción Martínez Rodríguez.</li><li data-v-63878fb4><strong data-v-63878fb4>Cervantes Nájera, A.L. (2021).</strong> &quot;Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México.&quot; Tesis de maestría, CIIEMAD-IPN.</li></ul></div><div data-v-63878fb4><p class="font-bold text-ink" data-v-63878fb4>Tasas de impacto ambiental</p><div class="mt-1 overflow-x-auto" data-v-63878fb4><table class="w-full text-[10px]" data-v-63878fb4><thead data-v-63878fb4><tr class="border-b" data-v-63878fb4><th class="py-1 pr-3 text-left font-semibold" data-v-63878fb4>Variable</th><th class="py-1 pr-3 text-left font-semibold" data-v-63878fb4>Valor</th><th class="py-1 text-left font-semibold" data-v-63878fb4>Fuente</th></tr></thead><tbody data-v-63878fb4><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>CO₂ capturado</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>0.968 kg/m²/año</td><td class="py-1" data-v-63878fb4>Cervantes Nájera (2025), Tabla 12, p. 98</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Reducción temperatura</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>3.5°C (ref. 79,584 m²)</td><td class="py-1" data-v-63878fb4>Cervantes Nájera (2021), Cap. 5, p. 87</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Captación pluvial</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>19.5 L/m²/año</td><td class="py-1" data-v-63878fb4>Cervantes Nájera (2021), Cap. 5, p. 92</td></tr><tr data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Ahorro energético</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>432.95 kWh/m²/año</td><td class="py-1" data-v-63878fb4>Cervantes Nájera (2025), Tabla 15, p. 112</td></tr></tbody></table></div></div><div data-v-63878fb4><p class="font-bold text-ink" data-v-63878fb4>Costos unitarios de referencia</p><div class="mt-1 overflow-x-auto" data-v-63878fb4><table class="w-full text-[10px]" data-v-63878fb4><thead data-v-63878fb4><tr class="border-b" data-v-63878fb4><th class="py-1 pr-3 text-left font-semibold" data-v-63878fb4>Concepto</th><th class="py-1 pr-3 text-left font-semibold" data-v-63878fb4>Valor</th><th class="py-1 text-left font-semibold" data-v-63878fb4>Fuente</th></tr></thead><tbody data-v-63878fb4><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Instalación TVLE</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>$1,200 MXN/m²</td><td class="py-1" data-v-63878fb4>Cervantes Nájera (2025), Tabla 18</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Mantenimiento anual</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>$80 MXN/m²/año</td><td class="py-1" data-v-63878fb4>Cervantes Nájera (2025), Tabla 19</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Electricidad</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>$2.50 MXN/kWh</td><td class="py-1" data-v-63878fb4>CFE, Tarifa DAC promedio CDMX (2024)</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Consulta golpe de calor</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>$3,500 MXN</td><td class="py-1" data-v-63878fb4>Secretaría de Salud CDMX / IMSS (2023)</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Incidencia calor</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>12 consul./100k hab/año</td><td class="py-1" data-v-63878fb4>SINAVE (2023), zonas urbanas &gt;35°C LST</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Daño inundación</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>$45 MXN/m³</td><td class="py-1" data-v-63878fb4>SACMEX / CONAGUA (2022)</td></tr><tr class="border-b border-gray-100" data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Valor tonCO₂</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>$500 MXN/ton</td><td class="py-1" data-v-63878fb4>Mexico2, mercado voluntario MX (2024)</td></tr><tr data-v-63878fb4><td class="py-1 pr-3" data-v-63878fb4>Tasa descuento VPN</td><td class="py-1 pr-3 font-mono" data-v-63878fb4>8%</td><td class="py-1" data-v-63878fb4>Banco de México, tasa ref. real (2024)</td></tr></tbody></table></div></div><div data-v-63878fb4><p class="font-bold text-ink" data-v-63878fb4>Normatividad y estándares</p><ul class="mt-1 space-y-1 list-disc pl-4" data-v-63878fb4><li data-v-63878fb4><strong data-v-63878fb4>NOM-020-SSA1-2014.</strong> Valor límite de exposición ambiental permisible de ozono (O₃). DOF.</li><li data-v-63878fb4><strong data-v-63878fb4>NOM-023-SSA1-1993.</strong> Criterio para evaluar la calidad del aire ambiente con respecto al dióxido de nitrógeno (NO₂). DOF.</li><li data-v-63878fb4><strong data-v-63878fb4>OMS (2016).</strong> &quot;Urban green spaces and health: a review of evidence.&quot; Recomendación mínima de cobertura vegetal urbana.</li><li data-v-63878fb4><strong data-v-63878fb4>OMS (2012).</strong> Recomendación de 9 m²/habitante de área verde urbana accesible.</li><li data-v-63878fb4><strong data-v-63878fb4>Magurran, A.E. (2004).</strong> &quot;Measuring Biological Diversity.&quot; Referencia índice Shannon-Wiener H&#39; ≥ 2.0.</li></ul></div><div data-v-63878fb4><p class="font-bold text-ink" data-v-63878fb4>Fuentes de viabilidad constructiva</p><ul class="mt-1 space-y-1 list-disc pl-4" data-v-63878fb4><li data-v-63878fb4><strong data-v-63878fb4>Catastro CDMX / SIGCDMX.</strong> Dirección General de Catastro. Tipo estructural, edad de construcción, niveles, material de techumbre.</li><li data-v-63878fb4><strong data-v-63878fb4>Atlas de Riesgos CDMX (SGIRPC).</strong> Zonificación sísmica (I-IIId), mapas de riesgo por inundación.</li><li data-v-63878fb4><strong data-v-63878fb4>Dictámenes post-sismo 19S (2017).</strong> Estado estructural de edificios evaluados tras el sismo del 19 de septiembre.</li><li data-v-63878fb4><strong data-v-63878fb4>INEGI, Censo de Población y Vivienda (2020).</strong> Características de las viviendas: material en techos, muros, pisos.</li><li data-v-63878fb4><strong data-v-63878fb4>NTC-CDMX (2017).</strong> Normas Técnicas Complementarias para Diseño y Construcción de Estructuras. Capacidad de carga en azoteas.</li><li data-v-63878fb4><strong data-v-63878fb4>Cervantes Nájera (2025), Tabla 6.</strong> Capacidad de carga mínima TVLE: 100 kg/m²; intensivo: 300 kg/m².</li></ul></div></div></div></div></div></section></div><div style="${ssrRenderStyle(unref(activeTab) === "simulacion" ? null : { display: "none" })}" data-v-63878fb4>`);
      _push(ssrRenderComponent(_component_IndicadoresSimulacionDinamica, null, null, _parent));
      _push(`</div><section class="bg-white py-12 border-t border-gray-100" data-v-63878fb4><div class="container-wide" data-v-63878fb4><div class="grid grid-cols-1 gap-12 lg:grid-cols-2" data-v-63878fb4><div data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Descarga de datos</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Exporta los datos del observatorio en formato abierto</p><div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3" data-v-63878fb4><div class="card p-4" data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eco/10" data-v-63878fb4><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-63878fb4><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-63878fb4></path><polyline points="14 2 14 8 20 8" data-v-63878fb4></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-63878fb4></line><polyline points="9 15 12 18 15 15" data-v-63878fb4></polyline></svg></div><div data-v-63878fb4><p class="text-xs font-semibold text-ink" data-v-63878fb4>Inventario</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>CSV, 57 reg.</p></div></div><button class="btn-outline btn-sm mt-3 w-full" data-v-63878fb4>Descargar</button></div><div class="card p-4" data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10" data-v-63878fb4><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-63878fb4><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-63878fb4></path><polyline points="14 2 14 8 20 8" data-v-63878fb4></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-63878fb4></line><polyline points="9 15 12 18 15 15" data-v-63878fb4></polyline></svg></div><div data-v-63878fb4><p class="text-xs font-semibold text-ink" data-v-63878fb4>Candidatos</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>GeoJSON, 60 sitios</p></div></div><button class="btn-outline btn-sm mt-3 w-full" data-v-63878fb4>Descargar</button></div><div class="card p-4" data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10" data-v-63878fb4><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-63878fb4><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-63878fb4></path><polyline points="14 2 14 8 20 8" data-v-63878fb4></polyline><line x1="12" y1="18" x2="12" y2="12" data-v-63878fb4></line><polyline points="9 15 12 18 15 15" data-v-63878fb4></polyline></svg></div><div data-v-63878fb4><p class="text-xs font-semibold text-ink" data-v-63878fb4>Validaciones IA</p><p class="text-[10px] text-slate-custom" data-v-63878fb4>CSV, 30 reg.</p></div></div><button class="btn-outline btn-sm mt-3 w-full" data-v-63878fb4>Descargar</button></div></div></div><div data-v-63878fb4><h3 class="text-xl font-semibold text-ink" data-v-63878fb4>Fuentes oficiales</h3><p class="mt-1 text-sm text-slate-custom" data-v-63878fb4>Instituciones que proveen la información utilizada</p><div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" data-v-63878fb4><!--[-->`);
      ssrRenderList(envSources, (src) => {
        _push(`<div class="card p-3" data-v-63878fb4><div class="flex items-center gap-2" data-v-63878fb4><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style="${ssrRenderStyle({ backgroundColor: src.color + "15" })}" data-v-63878fb4><div class="h-3 w-3 rounded-full" style="${ssrRenderStyle({ backgroundColor: src.color })}" data-v-63878fb4></div></div><div data-v-63878fb4><p class="text-xs font-semibold text-ink" data-v-63878fb4>${ssrInterpolate(src.name)}</p>`);
        _push(ssrRenderComponent(_component_CommonDataSourceBadge, {
          "source-name": src.sourceName
        }, null, _parent));
        _push(`</div></div><p class="mt-2 text-[10px] leading-relaxed text-slate-custom" data-v-63878fb4>${ssrInterpolate(src.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div><div class="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4" data-v-63878fb4><p class="text-xs text-slate-custom" data-v-63878fb4><span class="font-semibold text-accent" data-v-63878fb4>Nota:</span> Los datos ambientales mostrados en esta sección son de demostración (modo mock). La plataforma está diseñada para integrar datos oficiales de CONABIO, CONAGUA, SEDEMA y SEMARNAT cuando las conexiones API estén disponibles. </p></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/indicadores/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63878fb4"]]);
export {
  index as default
};
//# sourceMappingURL=index-cARiqYZ0.js.map
