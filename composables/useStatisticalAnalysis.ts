/**
 * Motor de análisis estadístico puro (sin dependencia de Chart.js).
 * Tasas de impacto basadas en Cervantes Nájera (2021, 2025) CIIEMAD-IPN.
 */

// ─── Regresión lineal (mínimos cuadrados ordinarios) ──────────────────────────

export interface RegressionResult {
  slope: number
  intercept: number
  r2: number
  predict: (x: number) => number
}

export function linearRegression(xs: number[], ys: number[]): RegressionResult {
  const n = xs.length
  if (n < 2) return { slope: 0, intercept: 0, r2: 0, predict: () => 0 }

  const sumX = xs.reduce((a, b) => a + b, 0)
  const sumY = ys.reduce((a, b) => a + b, 0)
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0)
  const sumX2 = xs.reduce((a, x) => a + x * x, 0)

  const meanY = sumY / n
  const denom = n * sumX2 - sumX * sumX
  if (denom === 0) return { slope: 0, intercept: meanY, r2: 0, predict: () => meanY }

  const slope = (n * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / n

  // R²
  const ssTot = ys.reduce((a, y) => a + (y - meanY) ** 2, 0)
  const ssRes = ys.reduce((a, y, i) => a + (y - (slope * xs[i] + intercept)) ** 2, 0)
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot

  return { slope, intercept, r2, predict: (x: number) => slope * x + intercept }
}

// ─── Correlación de Pearson ───────────────────────────────────────────────────

export function pearsonCorrelation(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0

  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n

  let num = 0
  let denX = 0
  let denY = 0
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX
    const dy = ys[i] - meanY
    num += dx * dy
    denX += dx * dx
    denY += dy * dy
  }

  const den = Math.sqrt(denX * denY)
  return den === 0 ? 0 : num / den
}

// ─── Estadísticas descriptivas ────────────────────────────────────────────────

export interface DescriptiveStats {
  mean: number
  median: number
  stdDev: number
  min: number
  max: number
  q1: number
  q3: number
}

export function descriptiveStats(values: number[]): DescriptiveStats {
  if (values.length === 0) {
    return { mean: 0, median: 0, stdDev: 0, min: 0, max: 0, q1: 0, q3: 0 }
  }

  const sorted = [...values].sort((a, b) => a - b)
  const n = sorted.length
  const mean = sorted.reduce((a, b) => a + b, 0) / n
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)]
  const stdDev = Math.sqrt(sorted.reduce((a, v) => a + (v - mean) ** 2, 0) / n)
  const q1 = sorted[Math.floor(n * 0.25)]
  const q3 = sorted[Math.floor(n * 0.75)]

  return { mean, median, stdDev, min: sorted[0], max: sorted[n - 1], q1, q3 }
}

// ─── Matriz de correlación ────────────────────────────────────────────────────

export interface CorrelationMatrixResult {
  labels: string[]
  matrix: number[][]
}

export function correlationMatrix(variables: Record<string, number[]>): CorrelationMatrixResult {
  const labels = Object.keys(variables)
  const arrays = labels.map(l => variables[l])
  const matrix = labels.map((_, i) =>
    labels.map((_, j) => pearsonCorrelation(arrays[i], arrays[j])),
  )
  return { labels, matrix }
}

// ─── Proyecciones de impacto ──────────────────────────────────────────────────
// Tasas basadas en Cervantes Nájera (2021, 2025) CIIEMAD-IPN

/**
 * Tasas de impacto por m² de techo verde por año.
 * Fuentes:
 * - CO₂: Cervantes Nájera (2025), Tabla 12, p. 98. Inventario 79,584 m² captura 0.077 tonCO₂/año → 0.968 g/m²/año.
 * - Temperatura: Cervantes Nájera (2021), Cap. 5, p. 87. Reducción de 3.5°C en temperatura superficial (LST) medida en TVLE CIIEMAD.
 * - Agua: Cervantes Nájera (2021), Cap. 5, p. 92. Captación promedio medida: 19.5 L/m²/año en sustrato extensivo de 10 cm.
 * - Energía: Cervantes Nájera (2025), Tabla 15, p. 112. Ahorro térmico modelado: 432.95 kWh/m²/año (reducción demanda climatización).
 */
export const TASAS = {
  co2KgPorM2Anio: 0.968,           // kg CO₂/m²/año — Cervantes Nájera (2025), Tabla 12
  tempReduccionRef: 3.5,            // °C — Cervantes Nájera (2021), Cap. 5
  tempM2Ref: 79584,                 // m² referencia inventario CDMX — Cervantes Nájera (2025), Figura 13
  aguaLPorM2Anio: 19.5,            // L/m²/año — Cervantes Nájera (2021), Cap. 5
  energiaKwhPorM2Anio: 432.95,     // kWh/m²/año — Cervantes Nájera (2025), Tabla 15
  costoKwh: 1.85,                   // MXN/kWh — CFE tarifa promedio 2024
}

export interface ProjectionYear {
  year: number
  co2: number             // toneladas acumuladas
  tempReduction: number   // °C
  waterCaptured: number   // litros acumulados
  energySaved: number     // kWh acumulados
}

export function computeProjections(m2Verdes: number, years: number): ProjectionYear[] {
  const result: ProjectionYear[] = []

  for (let y = 1; y <= years; y++) {
    result.push({
      year: y,
      co2: (TASAS.co2KgPorM2Anio * m2Verdes * y) / 1000,                     // en toneladas
      tempReduction: TASAS.tempReduccionRef * (m2Verdes / TASAS.tempM2Ref),    // escala lineal
      waterCaptured: TASAS.aguaLPorM2Anio * m2Verdes * y,                     // litros acumulados
      energySaved: TASAS.energiaKwhPorM2Anio * m2Verdes * y,                  // kWh acumulados
    })
  }

  return result
}

// ─── Índice de necesidad por alcaldía ─────────────────────────────────────────

export interface AlcaldiaNecesidadInput {
  alcaldia: string
  lstPromedio: number           // temperatura superficial
  coberturaVegetal: number      // % cobertura vegetal
  poblacion: number             // densidad poblacional (representativa)
  captacionPluvial: number      // L/m²/año
  indiceBiodiversidad: number   // 0-100
}

export function computeIndiceNecesidad(input: AlcaldiaNecesidadInput): number {
  // Normalizar cada variable a 0-100 (mayor valor = más necesidad)

  // LST: rango 30-42°C → 0-100 (alta temp = más necesidad)
  const lstNorm = Math.min(100, Math.max(0, ((input.lstPromedio - 30) / 12) * 100))

  // Déficit de cobertura vegetal: 100 - cobertura (baja cobertura = más necesidad)
  const deficitVegetal = 100 - input.coberturaVegetal

  // Densidad poblacional: rango 6,000-18,000 → 0-100
  const pobNorm = Math.min(100, Math.max(0, ((input.poblacion - 6000) / 12000) * 100))

  // Baja captación pluvial: rango 15-25 → invertido
  const captNorm = Math.min(100, Math.max(0, ((25 - input.captacionPluvial) / 10) * 100))

  // Baja biodiversidad: invertido 0-100
  const bioNorm = 100 - input.indiceBiodiversidad

  // Pesos: 30% LST, 25% déficit vegetal, 20% población, 15% captación, 10% biodiversidad
  return (
    lstNorm * 0.30 +
    deficitVegetal * 0.25 +
    pobNorm * 0.20 +
    captNorm * 0.15 +
    bioNorm * 0.10
  )
}

// ─── Umbrales de riesgo y costos de referencia ──────────────────────────────

/**
 * Umbrales de riesgo climático y ambiental.
 * Fuentes:
 * - LST: Cervantes Nájera (2025), Cap. 4. Clasificación de isla de calor urbana en CDMX.
 * - O₃: NOM-020-SSA1-2014 (DOF). Límite 0.095 ppm (95 ppb) promedio 8h.
 * - NO₂: NOM-023-SSA1-1993 (DOF). Límite 0.21 ppm horario; atención preventiva ~40 ppb.
 * - Cobertura vegetal: OMS (2016), "Urban green spaces and health". Mín 15% cobertura verde.
 * - AVU: OMS (2012). Mínimo 9 m²/habitante de área verde urbana.
 * - Shannon: Magurran (2004). H' ≥ 2.0 indica diversidad saludable en ecosistemas urbanos.
 */
export const UMBRALES_RIESGO = {
  lst: { critico: 38, alto: 35, moderado: 32 },  // °C — Cervantes Nájera (2025)
  o3: { limite: 95, atencion: 70 },               // ppb — NOM-020-SSA1-2014
  no2: { limite: 60, atencion: 40 },              // ppb — NOM-023-SSA1-1993
  coberturaVegetalIdeal: 15,                       // % — OMS (2016)
  avuPorHabitanteOMS: 9,                           // m²/hab — OMS (2012)
  shannonSaludable: 2.0,                           // H' — Magurran (2004)
}

/**
 * Costos de referencia para análisis económico.
 * Fuentes:
 * - Instalación TVLE: Cervantes Nájera (2025), Tabla 18, p. 121. Costo total instalación techo verde ligero extensivo.
 * - Mantenimiento: Cervantes Nájera (2025), Tabla 19, p. 123. Costo anual mantenimiento (riego, poda, sustitución).
 * - Electricidad: CFE (2024). Tarifa DAC promedio CDMX: $2.50/kWh (incluye cargo fijo + consumo).
 * - Consulta calor: Secretaría de Salud CDMX / IMSS (2023). Costo promedio atención urgencias golpe de calor.
 * - Consultas/100k hab: SINAVE (2023). Incidencia estimada enfermedades por calor en zonas urbanas >35°C LST.
 * - Agua no gestionada: SACMEX / CONAGUA (2022). Costo estimado daño por inundación pluvial urbana.
 * - Valor CO₂: México2 / Mercado voluntario de carbono MX (2024). Precio promedio crédito compensación.
 * - Tasa descuento: Banco de México (2024). Tasa de referencia real ~8% para evaluación proyectos públicos.
 */
export const COSTOS_REFERENCIA = {
  costoInstalacionTVLE: 1200,       // MXN/m² — Cervantes Nájera (2025), Tabla 18
  costoMantenimientoAnual: 80,      // MXN/m²/año — Cervantes Nájera (2025), Tabla 19
  costoElectricidadKwh: 2.5,        // MXN/kWh — CFE tarifa DAC (2024)
  costoConsultaCalor: 3500,         // MXN/consulta — Secretaría de Salud CDMX (2023)
  consultasPor100kHab: 12,          // consultas/año/100k hab — SINAVE (2023)
  costoM3AguaNoGestionada: 45,      // MXN/m³ — SACMEX/CONAGUA (2022)
  valorTonCO2: 500,                 // MXN/tonCO₂ — México2 mercado voluntario (2024)
  tasaDescuento: 0.08,              // — Banxico tasa referencia real (2024)
}

// ─── Perfil de riesgo por alcaldía ──────────────────────────────────────────

export type NivelRiesgo = 'critico' | 'alto' | 'moderado' | 'bajo'

export interface RiskIndicator {
  nombre: string
  valor: number
  unidad: string
  nivel: NivelRiesgo
  umbralRef: string
}

export interface AlcaldiaRiskProfile {
  indicadores: RiskIndicator[]
  scoreRiesgo: number         // 0-100
  nivelGeneral: NivelRiesgo
}

export interface RiskProfileInput {
  lstPromedio: number
  o3Promedio: number
  no2Promedio: number
  coberturaVegetal: number
  captacionPluvial: number
  shannon: number
  poblacion: number
}

export function computeRiskProfile(input: RiskProfileInput): AlcaldiaRiskProfile {
  const indicadores: RiskIndicator[] = []

  // 1. Isla de calor
  const lstNivel: NivelRiesgo =
    input.lstPromedio >= UMBRALES_RIESGO.lst.critico ? 'critico'
      : input.lstPromedio >= UMBRALES_RIESGO.lst.alto ? 'alto'
        : input.lstPromedio >= UMBRALES_RIESGO.lst.moderado ? 'moderado'
          : 'bajo'
  indicadores.push({
    nombre: 'Isla de calor',
    valor: input.lstPromedio,
    unidad: '°C',
    nivel: lstNivel,
    umbralRef: `Crítico ≥${UMBRALES_RIESGO.lst.critico}°C`,
  })

  // 2. Calidad del aire (O3)
  const o3Nivel: NivelRiesgo =
    input.o3Promedio >= UMBRALES_RIESGO.o3.limite ? 'critico'
      : input.o3Promedio >= UMBRALES_RIESGO.o3.atencion ? 'alto'
        : input.o3Promedio >= 50 ? 'moderado'
          : 'bajo'
  indicadores.push({
    nombre: 'Calidad del aire (O₃)',
    valor: input.o3Promedio,
    unidad: 'ppb',
    nivel: o3Nivel,
    umbralRef: `NOM-020: ${UMBRALES_RIESGO.o3.limite} ppb`,
  })

  // 3. Déficit vegetal
  const defVegNivel: NivelRiesgo =
    input.coberturaVegetal < 45 ? 'critico'
      : input.coberturaVegetal < 55 ? 'alto'
        : input.coberturaVegetal < 65 ? 'moderado'
          : 'bajo'
  indicadores.push({
    nombre: 'Déficit vegetal',
    valor: input.coberturaVegetal,
    unidad: '%',
    nivel: defVegNivel,
    umbralRef: `OMS: ${UMBRALES_RIESGO.coberturaVegetalIdeal}% min`,
  })

  // 4. Vulnerabilidad hídrica
  const hidNivel: NivelRiesgo =
    input.captacionPluvial < 16 ? 'critico'
      : input.captacionPluvial < 18 ? 'alto'
        : input.captacionPluvial < 20 ? 'moderado'
          : 'bajo'
  indicadores.push({
    nombre: 'Vulnerabilidad hídrica',
    valor: input.captacionPluvial,
    unidad: 'L/m²/año',
    nivel: hidNivel,
    umbralRef: 'Ref: 20 L/m²/año',
  })

  // 5. Biodiversidad
  const bioNivel: NivelRiesgo =
    input.shannon < 1.5 ? 'critico'
      : input.shannon < UMBRALES_RIESGO.shannonSaludable ? 'alto'
        : input.shannon < 2.5 ? 'moderado'
          : 'bajo'
  indicadores.push({
    nombre: 'Biodiversidad',
    valor: input.shannon,
    unidad: 'H\'',
    nivel: bioNivel,
    umbralRef: `Saludable ≥${UMBRALES_RIESGO.shannonSaludable}`,
  })

  // Score general ponderado (0-100, mayor = más riesgo)
  const nivelToScore = (n: NivelRiesgo) =>
    n === 'critico' ? 100 : n === 'alto' ? 75 : n === 'moderado' ? 45 : 15

  const pesos = [0.30, 0.20, 0.20, 0.15, 0.15]
  const scoreRiesgo = indicadores.reduce((sum, ind, i) => sum + nivelToScore(ind.nivel) * pesos[i], 0)

  const nivelGeneral: NivelRiesgo =
    scoreRiesgo >= 75 ? 'critico'
      : scoreRiesgo >= 55 ? 'alto'
        : scoreRiesgo >= 35 ? 'moderado'
          : 'bajo'

  return { indicadores, scoreRiesgo, nivelGeneral }
}

// ─── Costo de la inacción ───────────────────────────────────────────────────

export interface InactionCostYear {
  year: number
  energia: number
  salud: number
  inundaciones: number
  ambiental: number
  total: number
  acumulado: number
}

export interface InactionCostResult {
  serie: InactionCostYear[]
  totalAcumulado: number
}

export function computeCostOfInaction(
  m2: number,
  years: number,
  poblacion: number,
): InactionCostResult {
  const C = COSTOS_REFERENCIA
  const serie: InactionCostYear[] = []
  let acumulado = 0

  for (let y = 1; y <= years; y++) {
    const energia = m2 * TASAS.energiaKwhPorM2Anio * C.costoElectricidadKwh
    const salud = (poblacion / 100_000) * C.consultasPor100kHab * C.costoConsultaCalor
    const inundaciones = (m2 * TASAS.aguaLPorM2Anio / 1000) * C.costoM3AguaNoGestionada
    const ambiental = (m2 * TASAS.co2KgPorM2Anio / 1000) * C.valorTonCO2
    const total = energia + salud + inundaciones + ambiental
    acumulado += total
    serie.push({ year: y, energia, salud, inundaciones, ambiental, total, acumulado })
  }

  return { serie, totalAcumulado: acumulado }
}

// ─── Retorno de inversión (ROI) ─────────────────────────────────────────────

export interface ROIYear {
  year: number
  costoAcumulado: number
  beneficioAcumulado: number
  flujoNeto: number
}

export interface ROIResult {
  inversionTotal: number
  beneficioTotal: number
  beneficioNeto: number
  roiPct: number
  vpn: number
  periodoRecuperacion: number
  serieAnual: ROIYear[]
}

export function computeROI(m2: number, years: number, poblacion: number = 500_000): ROIResult {
  const C = COSTOS_REFERENCIA
  const instalacion = m2 * C.costoInstalacionTVLE
  const mantenimientoAnual = m2 * C.costoMantenimientoAnual

  // Beneficios anuales
  const benefEnergiaAnual = m2 * TASAS.energiaKwhPorM2Anio * C.costoElectricidadKwh
  const benefAguaAnual = (m2 * TASAS.aguaLPorM2Anio / 1000) * C.costoM3AguaNoGestionada
  const benefCo2Anual = (m2 * TASAS.co2KgPorM2Anio / 1000) * C.valorTonCO2
  const benefSaludAnual = (poblacion / 100_000) * C.consultasPor100kHab * C.costoConsultaCalor
  const benefTotalAnual = benefEnergiaAnual + benefAguaAnual + benefCo2Anual + benefSaludAnual

  const serieAnual: ROIYear[] = []
  let costoAcum = instalacion
  let benefAcum = 0
  let periodoRecuperacion = years // default: no se recupera
  let vpn = -instalacion

  for (let y = 1; y <= years; y++) {
    costoAcum += mantenimientoAnual
    benefAcum += benefTotalAnual
    const flujoNeto = benefAcum - costoAcum

    vpn += (benefTotalAnual - mantenimientoAnual) / Math.pow(1 + C.tasaDescuento, y)

    if (flujoNeto >= 0 && periodoRecuperacion === years) {
      // Interpolate within the year
      const prevNeto = (benefAcum - benefTotalAnual) - (costoAcum - mantenimientoAnual)
      const frac = prevNeto < 0 ? Math.abs(prevNeto) / (Math.abs(prevNeto) + flujoNeto) : 0
      periodoRecuperacion = Math.round((y - 1 + frac) * 10) / 10
    }

    serieAnual.push({ year: y, costoAcumulado: costoAcum, beneficioAcumulado: benefAcum, flujoNeto })
  }

  const inversionTotal = instalacion + mantenimientoAnual * years
  const beneficioTotal = benefTotalAnual * years
  const beneficioNeto = beneficioTotal - inversionTotal
  const roiPct = inversionTotal > 0 ? (beneficioNeto / inversionTotal) * 100 : 0

  return { inversionTotal, beneficioTotal, beneficioNeto, roiPct, vpn, periodoRecuperacion, serieAnual }
}

// ─── Pre-factibilidad constructiva ──────────────────────────────────────────
// Fuentes:
// - NTC-CDMX (2017, act. 2020). Normas Técnicas Complementarias para Diseño por Sismo.
// - RCDF (2017). Reglamento de Construcciones para el Distrito Federal, Art. 139-141.
// - Protección Civil CDMX (2017). Dictámenes de seguridad estructural post-sismo 19S.
// - Atlas de Riesgos CDMX (2019). Zonificación sísmica y riesgo por inundación.

import type {
  TipoEstructura,
  ZonaSismica,
  EstadoEstructural,
  MaterialTechumbre,
  NivelPrefactibilidad,
} from '~/types/sources'

export const UMBRALES_ESTRUCTURALES = {
  capacidadCargaMinTVLE: 100,          // kg/m² — peso saturado TVLE extensivo (Cervantes Nájera 2025, Tabla 6)
  capacidadCargaMinIntensivo: 300,     // kg/m² — techo verde intensivo con sustrato >20cm
  edadMaxSinRefuerzo: 50,              // años — después requiere evaluación estructural obligatoria
  nivelesMaxSinAnalisis: 3,            // pisos — edificios >3 niveles requieren análisis de carga
}

export const PESOS_PREFACTIBILIDAD = {
  tipoEstructura: 0.25,
  zonaSismica: 0.20,
  edadConstruccion: 0.15,
  niveles: 0.10,
  estadoEstructural: 0.15,
  materialTechumbre: 0.15,
}

export interface PrefactibilidadInput {
  tipoEstructura: TipoEstructura
  zonaSismica: ZonaSismica
  anioConstruccion: number
  niveles: number
  estadoEstructural: EstadoEstructural
  materialTechumbre: MaterialTechumbre
}

export interface PrefactibilidadResult {
  score: number
  nivel: NivelPrefactibilidad
  factoresRiesgo: string[]
  detalleComponentes: {
    estructura: number
    zonaSismica: number
    edad: number
    niveles: number
    dictamen: number
    techumbre: number
  }
}

export function computeScorePrefactibilidad(input: PrefactibilidadInput): PrefactibilidadResult {
  const factoresRiesgo: string[] = []

  // 1. Tipo de estructura (0-100)
  const estructuraScores: Record<TipoEstructura, number> = {
    concreto_armado: 95,
    acero: 95,
    mixta: 80,
    mamposteria_confinada: 60,
    mamposteria_simple: 30,
    madera: 20,
    lamina: 10,
    desconocido: 25,
  }
  const estructura = estructuraScores[input.tipoEstructura]
  if (estructura < 50) factoresRiesgo.push('Estructura no apta para carga adicional')

  // 2. Zona sísmica (0-100)
  const zonaScores: Record<ZonaSismica, number> = {
    I: 100, IIa: 85, IIb: 75,
    IIIa: 55, IIIb: 40, IIIc: 25, IIId: 10,
  }
  const zonaSismica = zonaScores[input.zonaSismica]
  if (zonaSismica < 50) factoresRiesgo.push('Zona sísmica de alto riesgo')

  // 3. Edad de construcción (0-100)
  const currentYear = new Date().getFullYear()
  const edad = currentYear - input.anioConstruccion
  const edadScore = edad <= 10 ? 100 : edad <= 25 ? 85 : edad <= 40 ? 65 : edad <= 50 ? 45 : 20
  if (edad > UMBRALES_ESTRUCTURALES.edadMaxSinRefuerzo)
    factoresRiesgo.push(`Construcción de ${edad} años (>50 requiere evaluación)`)

  // 4. Niveles (0-100)
  const nivelesScore = input.niveles <= 2 ? 100 : input.niveles <= 4 ? 80 : input.niveles <= 8 ? 60 : 40
  if (input.niveles > UMBRALES_ESTRUCTURALES.nivelesMaxSinAnalisis)
    factoresRiesgo.push(`${input.niveles} niveles — requiere análisis de carga`)

  // 5. Estado estructural post-sismo (0-100)
  const dictamenScores: Record<EstadoEstructural, number> = {
    seguro: 100,
    dano_menor: 55,
    dano_mayor: 10,
    sin_dictamen: 35,
  }
  const dictamen = dictamenScores[input.estadoEstructural]
  if (input.estadoEstructural === 'dano_mayor')
    factoresRiesgo.push('Dictamen post-sismo: daño mayor')
  if (input.estadoEstructural === 'sin_dictamen')
    factoresRiesgo.push('Sin dictamen estructural post-sismo 2017')

  // 6. Material de techumbre (0-100)
  const techumbreScores: Record<MaterialTechumbre, number> = {
    losa_concreto: 100,
    losacero: 90,
    vigueta_bovedilla: 70,
    lamina_metalica: 30,
    lamina_asbesto: 15,
    madera_teja: 20,
    desconocido: 25,
  }
  const techumbre = techumbreScores[input.materialTechumbre]
  if (techumbre < 50) factoresRiesgo.push('Techumbre no soporta carga de sustrato')

  // Score ponderado
  const P = PESOS_PREFACTIBILIDAD
  const score =
    estructura * P.tipoEstructura +
    zonaSismica * P.zonaSismica +
    edadScore * P.edadConstruccion +
    nivelesScore * P.niveles +
    dictamen * P.estadoEstructural +
    techumbre * P.materialTechumbre

  const nivel: NivelPrefactibilidad =
    score >= 65 ? 'prefactible'
      : score >= 40 ? 'requiere_evaluacion'
        : 'no_recomendado'

  if (factoresRiesgo.length === 0) factoresRiesgo.push('Sin factores de riesgo identificados')

  return {
    score: Math.round(score * 10) / 10,
    nivel,
    factoresRiesgo,
    detalleComponentes: { estructura, zonaSismica, edad: edadScore, niveles: nivelesScore, dictamen, techumbre },
  }
}

// ─── Perfil de riesgo extendido (con viabilidad constructiva) ───────────────

export interface RiskProfileWithStructuralInput extends RiskProfileInput {
  scorePrefactibilidadPromedio?: number
}

export function computeRiskProfileWithStructural(
  input: RiskProfileWithStructuralInput,
): AlcaldiaRiskProfile {
  const base = computeRiskProfile(input)

  if (input.scorePrefactibilidadPromedio !== undefined) {
    const structScore = input.scorePrefactibilidadPromedio
    // Invertido: bajo score = alto riesgo
    const structNivel: NivelRiesgo =
      structScore < 35 ? 'critico'
        : structScore < 50 ? 'alto'
          : structScore < 65 ? 'moderado'
            : 'bajo'

    base.indicadores.push({
      nombre: 'Viabilidad constructiva',
      valor: structScore,
      unidad: 'pts',
      nivel: structNivel,
      umbralRef: 'Pre-factible ≥65 pts',
    })

    // Recalcular score general con 6 pesos (originales escalados a 0.90 + 0.10 estructural)
    const nivelToScore = (n: NivelRiesgo) =>
      n === 'critico' ? 100 : n === 'alto' ? 75 : n === 'moderado' ? 45 : 15

    const pesos6 = [0.27, 0.18, 0.18, 0.135, 0.135, 0.10]
    base.scoreRiesgo = Math.round(
      base.indicadores.reduce((sum, ind, i) => sum + nivelToScore(ind.nivel) * pesos6[i], 0) * 10,
    ) / 10

    base.nivelGeneral =
      base.scoreRiesgo >= 75 ? 'critico'
        : base.scoreRiesgo >= 55 ? 'alto'
          : base.scoreRiesgo >= 35 ? 'moderado'
            : 'bajo'
  }

  return base
}

// ─── m² efectivos (ajustados por viabilidad constructiva) ──────────────────

export interface EffectiveM2Input {
  m2Total: number
  porcentajePrefactible: number     // 0-100
  porcentajeRequiereEval: number    // 0-100
}

export function computeEffectiveM2(input: EffectiveM2Input): {
  m2Efectivos: number
  m2Descartados: number
  factorReduccion: number
} {
  // Prefactible: 100% crédito, requiere_evaluacion: 50%, no_recomendado: 0%
  const factor = (input.porcentajePrefactible + input.porcentajeRequiereEval * 0.5) / 100
  const m2Efectivos = Math.round(input.m2Total * factor)
  return {
    m2Efectivos,
    m2Descartados: input.m2Total - m2Efectivos,
    factorReduccion: Math.round(factor * 1000) / 1000,
  }
}
