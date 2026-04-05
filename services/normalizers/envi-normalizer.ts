/**
 * ENVI Data Normalizer
 *
 * Transforma datos ENVI (índices espectrales) al formato interno del
 * observatorio para integrarse con los indicadores existentes.
 *
 * Mejora la confiabilidad de:
 * - coberturaVegetal: derivada de NDVI calibrado (más preciso que estimaciones)
 * - LST: medición directa por satélite vs estimaciones del Atlas de Riesgos
 * - Nuevos indicadores: EVI (menos saturación), SAVI (ajuste suelo), NDWI (agua)
 */

import type { ENVIAlcaldiaData, IndicesEspectrales } from '~/types/remote-sensing'

// ---------------------------------------------------------------------------
// NDVI → Cobertura vegetal (%)
// ---------------------------------------------------------------------------
// Modelo empírico para CDMX basado en Cervantes Nájera (2025) y Huete et al. (2002)
// NDVI < 0.1: suelo desnudo / concreto (~0% vegetación)
// NDVI 0.1-0.2: vegetación dispersa (10-30%)
// NDVI 0.2-0.4: vegetación moderada (30-60%)
// NDVI 0.4-0.6: vegetación densa (60-85%)
// NDVI > 0.6: bosque / vegetación muy densa (85-100%)

export function ndviToCoberturaVegetal(ndvi: number): number {
  if (ndvi <= 0.05) return 0
  if (ndvi >= 0.7) return 100
  // Función sigmoidal calibrada para CDMX
  const cobertura = 100 / (1 + Math.exp(-8 * (ndvi - 0.3)))
  return Math.round(Math.max(0, Math.min(100, cobertura)))
}

// ---------------------------------------------------------------------------
// EVI → Índice de verdor mejorado (0-100)
// ---------------------------------------------------------------------------
// EVI es preferible al NDVI en zonas con vegetación densa o suelo expuesto
// porque reduce la saturación y el efecto del suelo.

export function eviToIndiceVerdor(evi: number): number {
  if (evi <= 0.02) return 0
  if (evi >= 0.55) return 100
  return Math.round((evi / 0.55) * 100)
}

// ---------------------------------------------------------------------------
// SAVI → Cobertura vegetal ajustada (%)
// ---------------------------------------------------------------------------
// SAVI corrige el efecto del suelo en zonas con poca vegetación.
// Más preciso que NDVI para alcaldías con alto porcentaje de concreto.

export function saviToCoberturaAjustada(savi: number): number {
  if (savi <= 0.05) return 0
  if (savi >= 0.6) return 100
  return Math.round((savi / 0.6) * 100)
}

// ---------------------------------------------------------------------------
// NDWI → Índice de disponibilidad hídrica (0-100)
// ---------------------------------------------------------------------------
// NDWI positivo indica presencia de agua superficial.
// Valores negativos indican suelo seco / vegetación seca.

export function ndwiToDisponibilidadHidrica(ndwi: number): number {
  // Rango típico CDMX: -0.35 (muy seco) a +0.10 (presencia agua)
  const normalizado = (ndwi + 0.35) / 0.45
  return Math.round(Math.max(0, Math.min(100, normalizado * 100)))
}

// ---------------------------------------------------------------------------
// Confianza ENVI vs Mock
// ---------------------------------------------------------------------------
// Los datos ENVI mejoran la confiabilidad de los indicadores:
// - Mock (estimaciones): confidenceLevel 0.60
// - ENVI placeholder: confidenceLevel 0.75
// - ENVI procesado real: confidenceLevel 0.90-0.95

export interface ENVIConfidenceImprovement {
  indicador: string
  confianzaMock: number
  confianzaENVI: number
  mejora: string
}

export const MEJORAS_CONFIANZA: ENVIConfidenceImprovement[] = [
  { indicador: 'Cobertura vegetal', confianzaMock: 0.60, confianzaENVI: 0.92, mejora: 'NDVI calibrado reemplaza estimaciones CONABIO por medición satelital directa' },
  { indicador: 'LST', confianzaMock: 0.55, confianzaENVI: 0.90, mejora: 'Banda térmica Landsat reemplaza interpolaciones del Atlas de Riesgos' },
  { indicador: 'Isla de calor', confianzaMock: 0.50, confianzaENVI: 0.88, mejora: 'LST + NDVI permiten mapa continuo vs puntos discretos RAMA' },
  { indicador: 'Disponibilidad hídrica', confianzaMock: 0.55, confianzaENVI: 0.82, mejora: 'NDWI detecta agua superficial, complementa datos CONAGUA' },
  { indicador: 'Score de aptitud', confianzaMock: 0.60, confianzaENVI: 0.85, mejora: 'LST + NDVI (39.75% del peso AHP) basados en medición directa' },
]

// ---------------------------------------------------------------------------
// Normalización completa: ENVI → indicadores del observatorio
// ---------------------------------------------------------------------------

export interface IndicadoresNormalizados {
  coberturaVegetal: number        // % (de NDVI)
  coberturaVegetalAjustada: number // % (de SAVI, más preciso para urbano)
  indiceVerdorMejorado: number    // 0-100 (de EVI)
  disponibilidadHidrica: number   // 0-100 (de NDWI)
  lst: number                     // °C (directo de banda térmica)
  // Campos compatibles con el modelo AHP existente
  ndviParaAptitud: number         // valor bruto para useAptitudScoring
  lstParaAptitud: number          // valor bruto para useAptitudScoring
}

export function normalizarIndicesENVI(indices: IndicesEspectrales): IndicadoresNormalizados {
  return {
    coberturaVegetal: ndviToCoberturaVegetal(indices.ndvi),
    coberturaVegetalAjustada: saviToCoberturaAjustada(indices.savi),
    indiceVerdorMejorado: eviToIndiceVerdor(indices.evi),
    disponibilidadHidrica: ndwiToDisponibilidadHidrica(indices.ndwi),
    lst: indices.lst,
    ndviParaAptitud: indices.ndvi,
    lstParaAptitud: indices.lst,
  }
}

// ---------------------------------------------------------------------------
// Tendencias: calcular si la vegetación mejora o empeora
// ---------------------------------------------------------------------------

export type TendenciaCategoria = 'mejorando' | 'estable' | 'deteriorando'

export function categorizarTendencia(tendenciaPorAnio: number, umbral = 0.005): TendenciaCategoria {
  if (tendenciaPorAnio > umbral) return 'mejorando'
  if (tendenciaPorAnio < -umbral) return 'deteriorando'
  return 'estable'
}
