/**
 * Motor de simulación de Dinámica de Sistemas para techos verdes CDMX.
 * Captura ciclos de retroalimentación, saturación territorial, restricciones
 * de capacidad y curvas de aprendizaje mediante integración Euler.
 *
 * Fuentes de tasas: Cervantes Nájera (2021, 2025) CIIEMAD-IPN.
 */

import { TASAS, COSTOS_REFERENCIA } from '~/composables/useStatisticalAnalysis'

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type ScenarioId = 'sin_intervencion' | 'tendencial' | 'politica_activa' | 'optimista'

export interface ScenarioParams {
  id: ScenarioId
  nombre: string
  descripcion: string
  color: string
  tasaInstalacionBase: number      // m²/año base
  presupuestoAnualBase: number     // MXN/año
  apoyoPolitico: number            // 0–1 (afecta efecto demostración)
  tasaAprendizaje: number          // 0–0.05 (reducción costo/año)
  tasaDegradacion: number          // 0–0.03 (% techos que se degradan/año)
  fraccionReinversion: number      // 0–1 (% ahorros reinvertidos)
  participacionPrivada: number     // 1–3 (multiplicador)
}

export interface SDState {
  t: number                        // año
  m2Instalados: number             // stock principal
  m2Disponibles: number            // área candidata restante
  presupuestoAnual: number         // MXN disponible este año
  deltaTemperatura: number         // °C (negativo = enfriamiento)
  energiaAcumuladaMwh: number
  aguaAcumuladaM3: number
  co2AcumuladaTon: number
  tasaInstalacionEfectiva: number  // m²/año este paso
  costoUnitarioActual: number      // MXN/m² con curva aprendizaje
  ahorroAnual: number              // MXN generado este año
}

export interface SDResumen {
  m2FinalInstalados: number
  m2PicoAnual: number
  anioPicoInstalacion: number
  energiaTotalMwh: number
  aguaTotalM3: number
  co2TotalTon: number
  tempReduccionFinal: number
  inversionTotal: number
  beneficioTotal: number
  roiPct: number
}

export interface SDSimulationResult {
  scenarioId: ScenarioId
  params: ScenarioParams
  series: SDState[]
  resumen: SDResumen
}

export interface PolicyLevers {
  multiplicadorPresupuesto: number  // 0.5–3.0
  fraccionReinversion: number       // 0–0.5
  participacionPrivada: number      // 1–3
  aniosRetrasoPolitica: number      // 0–5
}

// ─── Constantes ──────────────────────────────────────────────────────────────

export const SD_CONSTANTS = {
  M2_INICIAL: 79_584,
  M2_POTENCIAL_TOTAL: 514_000,
  M2_DISPONIBLES_INICIAL: 434_416,  // 514k - 79.6k
  CAPACIDAD_MAX_ANUAL: 50_000,      // techo práctico contratistas CDMX
  COSTO_INICIAL_M2: COSTOS_REFERENCIA.costoInstalacionTVLE, // 1200 MXN/m²
  COSTO_MINIMO_M2: 720,             // piso: 60% del costo original
  DT: 0.25,                         // paso trimestral
  HORIZONTE_DEFAULT: 30,
}

// ─── Escenarios predefinidos ─────────────────────────────────────────────────

export const SCENARIOS: ScenarioParams[] = [
  {
    id: 'sin_intervencion',
    nombre: 'Sin Intervención',
    descripcion: 'No se instalan nuevos techos. Los existentes se degradan gradualmente.',
    color: '#D9363E',
    tasaInstalacionBase: 0,
    presupuestoAnualBase: 0,
    apoyoPolitico: 0,
    tasaAprendizaje: 0,
    tasaDegradacion: 0.02,
    fraccionReinversion: 0,
    participacionPrivada: 1,
  },
  {
    id: 'tendencial',
    nombre: 'Tendencial',
    descripcion: 'Continuación del ritmo actual de instalación sin cambios de política.',
    color: '#F2A81D',
    tasaInstalacionBase: 5_000,
    presupuestoAnualBase: 6_000_000,
    apoyoPolitico: 0.2,
    tasaAprendizaje: 0.01,
    tasaDegradacion: 0.005,
    fraccionReinversion: 0.05,
    participacionPrivada: 1,
  },
  {
    id: 'politica_activa',
    nombre: 'Política Activa',
    descripcion: 'Programa gubernamental con incentivos fiscales y participación del sector privado.',
    color: '#18A5E3',
    tasaInstalacionBase: 10_000,
    presupuestoAnualBase: 15_000_000,
    apoyoPolitico: 0.6,
    tasaAprendizaje: 0.025,
    tasaDegradacion: 0.003,
    fraccionReinversion: 0.15,
    participacionPrivada: 1.5,
  },
  {
    id: 'optimista',
    nombre: 'Optimista',
    descripcion: 'Máxima inversión, participación público-privada amplia y economías de escala.',
    color: '#0E5E3A',
    tasaInstalacionBase: 20_000,
    presupuestoAnualBase: 30_000_000,
    apoyoPolitico: 0.9,
    tasaAprendizaje: 0.04,
    tasaDegradacion: 0.002,
    fraccionReinversion: 0.25,
    participacionPrivada: 2.5,
  },
]

// ─── Palancas por defecto ────────────────────────────────────────────────────

export const DEFAULT_LEVERS: PolicyLevers = {
  multiplicadorPresupuesto: 1.0,
  fraccionReinversion: 0.15,
  participacionPrivada: 1.5,
  aniosRetrasoPolitica: 0,
}

// ─── Motor de simulación ─────────────────────────────────────────────────────

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

export function eulerStep(
  state: SDState,
  params: ScenarioParams,
  levers: PolicyLevers,
  dt: number,
): SDState {
  const C = SD_CONSTANTS

  // Aplicar retraso de política: si estamos antes del año de arranque, no hay instalación
  const enRetraso = state.t < levers.aniosRetrasoPolitica

  // Curva de aprendizaje
  const costoUnit = Math.max(
    C.COSTO_MINIMO_M2,
    C.COSTO_INICIAL_M2 * Math.pow(1 - params.tasaAprendizaje, state.t),
  )

  // ─── Flujo de instalación ───
  let tasaInstalacionEfectiva = 0

  if (!enRetraso && params.tasaInstalacionBase > 0 && state.m2Disponibles > 0) {
    // B1: Saturación territorial
    const factorSaturacion = state.m2Disponibles / C.M2_POTENCIAL_TOTAL

    // R2: Efecto demostración (logarítmico)
    const fracObjetivo = state.m2Instalados / C.M2_POTENCIAL_TOTAL
    const factorDemostracion = 1 + params.apoyoPolitico * Math.log(1 + fracObjetivo * 10)

    // R1: Factor presupuesto (ciclo virtuoso)
    const presupEfectivo = state.presupuestoAnual
    const costoAnualBase = costoUnit * params.tasaInstalacionBase
    const factorPresupuesto = costoAnualBase > 0
      ? clamp(presupEfectivo / costoAnualBase, 0.5, 3)
      : 1

    // Participación privada (escenario + palanca)
    const privada = params.participacionPrivada * levers.participacionPrivada / DEFAULT_LEVERS.participacionPrivada

    // Tasa bruta
    const tasaBruta = params.tasaInstalacionBase * factorPresupuesto * factorDemostracion * privada

    // B2: Restricción de capacidad (logística)
    tasaInstalacionEfectiva = tasaBruta * factorSaturacion * (1 - tasaBruta / (tasaBruta + C.CAPACIDAD_MAX_ANUAL))
  }

  // No instalar más de lo disponible
  const instalacionEfectivaDt = Math.min(tasaInstalacionEfectiva * dt, state.m2Disponibles)
  const tasaEfectivaReal = instalacionEfectivaDt / dt

  // Degradación
  const degradacionDt = params.tasaDegradacion * state.m2Instalados * dt

  // Stocks
  const m2Instalados = Math.max(0, state.m2Instalados + instalacionEfectivaDt - degradacionDt)
  const m2Disponibles = Math.max(0, state.m2Disponibles - instalacionEfectivaDt)

  // Impacto ambiental (acumulativo sobre dt)
  const energiaDtMwh = m2Instalados * TASAS.energiaKwhPorM2Anio / 1000 * dt
  const aguaDtM3 = m2Instalados * TASAS.aguaLPorM2Anio / 1000 * dt
  const co2DtTon = m2Instalados * TASAS.co2KgPorM2Anio / 1000 * dt

  // Temperatura (no lineal, asíntota a -3.5°C)
  const deltaTemperatura = -TASAS.tempReduccionRef * (1 - Math.exp(-m2Instalados / TASAS.tempM2Ref))

  // Ahorro anual (para retroalimentación de presupuesto)
  const ahorroAnual =
    m2Instalados * TASAS.energiaKwhPorM2Anio * COSTOS_REFERENCIA.costoElectricidadKwh +
    (m2Instalados * TASAS.aguaLPorM2Anio / 1000) * COSTOS_REFERENCIA.costoM3AguaNoGestionada +
    (m2Instalados * TASAS.co2KgPorM2Anio / 1000) * COSTOS_REFERENCIA.valorTonCO2

  // Presupuesto siguiente paso (R1)
  const fracReinversion = enRetraso ? 0 : (params.fraccionReinversion + levers.fraccionReinversion) / 2
  const presupuestoAnual =
    params.presupuestoAnualBase * levers.multiplicadorPresupuesto +
    ahorroAnual * fracReinversion

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
    ahorroAnual,
  }
}

export function computeResumen(series: SDState[], params: ScenarioParams): SDResumen {
  const C = SD_CONSTANTS
  const last = series[series.length - 1]

  // Pico de instalación
  let m2PicoAnual = 0
  let anioPicoInstalacion = 0
  for (const s of series) {
    if (s.tasaInstalacionEfectiva > m2PicoAnual) {
      m2PicoAnual = s.tasaInstalacionEfectiva
      anioPicoInstalacion = Math.round(s.t)
    }
  }

  // Inversión total: suma de instalación + mantenimiento
  let inversionTotal = 0
  for (let i = 1; i < series.length; i++) {
    const dt = series[i].t - series[i - 1].t
    const nuevosM2 = Math.max(0, series[i].m2Instalados - series[i - 1].m2Instalados + params.tasaDegradacion * series[i - 1].m2Instalados * dt)
    inversionTotal += nuevosM2 * series[i].costoUnitarioActual
    inversionTotal += series[i].m2Instalados * COSTOS_REFERENCIA.costoMantenimientoAnual * dt
  }

  // Beneficio total
  let beneficioTotal = 0
  for (let i = 1; i < series.length; i++) {
    const dt = series[i].t - series[i - 1].t
    beneficioTotal += series[i].ahorroAnual * dt
  }

  const roiPct = inversionTotal > 0 ? ((beneficioTotal - inversionTotal) / inversionTotal) * 100 : 0

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
    roiPct: Math.round(roiPct * 10) / 10,
  }
}

export function runSimulation(
  params: ScenarioParams,
  horizonte: number = SD_CONSTANTS.HORIZONTE_DEFAULT,
  levers: PolicyLevers = DEFAULT_LEVERS,
): SDSimulationResult {
  const C = SD_CONSTANTS
  const dt = C.DT

  // Estado inicial
  let state: SDState = {
    t: 0,
    m2Instalados: C.M2_INICIAL,
    m2Disponibles: C.M2_DISPONIBLES_INICIAL,
    presupuestoAnual: params.presupuestoAnualBase * levers.multiplicadorPresupuesto,
    deltaTemperatura: -TASAS.tempReduccionRef * (1 - Math.exp(-C.M2_INICIAL / TASAS.tempM2Ref)),
    energiaAcumuladaMwh: 0,
    aguaAcumuladaM3: 0,
    co2AcumuladaTon: 0,
    tasaInstalacionEfectiva: 0,
    costoUnitarioActual: C.COSTO_INICIAL_M2,
    ahorroAnual: 0,
  }

  const series: SDState[] = [{ ...state }]
  const totalSteps = Math.round(horizonte / dt)

  for (let i = 0; i < totalSteps; i++) {
    state = eulerStep(state, params, levers, dt)
    series.push({ ...state })
  }

  return {
    scenarioId: params.id,
    params,
    series,
    resumen: computeResumen(series, params),
  }
}

export function runAllScenarios(
  horizonte: number = SD_CONSTANTS.HORIZONTE_DEFAULT,
  levers: PolicyLevers = DEFAULT_LEVERS,
): SDSimulationResult[] {
  return SCENARIOS.map(params => runSimulation(params, horizonte, levers))
}

// ─── Helpers para muestreo anual (gráficas) ─────────────────────────────────

/** Extrae muestras anuales de una serie trimestral (1 muestra por año entero). */
export function sampleAnnual(series: SDState[]): SDState[] {
  const dt = SD_CONSTANTS.DT
  const stepsPerYear = Math.round(1 / dt)
  const sampled: SDState[] = [series[0]]
  for (let i = stepsPerYear; i < series.length; i += stepsPerYear) {
    sampled.push(series[i])
  }
  return sampled
}
