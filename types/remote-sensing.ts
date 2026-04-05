// ============================================================================
// Observatorio de Techos Verdes CDMX — Remote Sensing / ENVI Types
// ============================================================================
//
// Pipeline: Sentinel-2 / Landsat → ENVI → Zonal Statistics → JSON → Platform
// ============================================================================

import type { Alcaldia } from './index'

// ---------------------------------------------------------------------------
// Spectral Indices
// ---------------------------------------------------------------------------

/** Índices espectrales calculados por ENVI a partir de imágenes satelitales */
export interface IndicesEspectrales {
  ndvi: number   // Normalized Difference Vegetation Index (-1 a 1, típico 0.02–0.65 urbano)
  evi: number    // Enhanced Vegetation Index (-1 a 1, menos saturación que NDVI en vegetación densa)
  savi: number   // Soil Adjusted Vegetation Index (-1 a 1, corrige exposición de suelo)
  ndwi: number   // Normalized Difference Water Index (-1 a 1, presencia de agua)
  lst: number    // Land Surface Temperature (°C, derivado de banda térmica Landsat)
}

// ---------------------------------------------------------------------------
// Temporal series
// ---------------------------------------------------------------------------

/** Una observación temporal de índices espectrales */
export interface ObservacionTemporal {
  fecha: string             // ISO date (YYYY-MM-DD)
  satelite: 'sentinel-2' | 'landsat-8' | 'landsat-9'
  nubosidad: number         // % cobertura de nubes en la escena (0-100)
  indices: IndicesEspectrales
}

/** Serie temporal de observaciones para una unidad geográfica */
export interface SerieTemporal {
  observaciones: ObservacionTemporal[]
  estadisticas: {
    inicio: string          // primera fecha
    fin: string             // última fecha
    totalObservaciones: number
    intervaloPromedioDias: number
  }
}

// ---------------------------------------------------------------------------
// Per-Alcaldía aggregated data
// ---------------------------------------------------------------------------

/** Datos ENVI agregados por alcaldía (estadística zonal sobre polígonos de alcaldías) */
export interface ENVIAlcaldiaData {
  alcaldia: Alcaldia
  fechaProcesamiento: string   // ISO date del procesamiento ENVI
  /** Promedios de la observación más reciente */
  actual: IndicesEspectrales
  /** Estadísticas históricas por índice */
  historico: {
    ndvi: EstadisticaIndice
    evi: EstadisticaIndice
    savi: EstadisticaIndice
    ndwi: EstadisticaIndice
    lst: EstadisticaIndice
  }
  /** Serie temporal completa para gráficas de evolución */
  serie: SerieTemporal
  /** Metadatos de calidad */
  calidad: CalidadDatos
}

/** Estadísticas de un índice calculadas sobre la serie temporal */
export interface EstadisticaIndice {
  media: number
  mediana: number
  desviacionEstandar: number
  min: number
  max: number
  tendencia: number    // pendiente de regresión lineal (unidades/año)
  r2Tendencia: number  // R² de la tendencia
}

/** Metadatos de calidad del procesamiento */
export interface CalidadDatos {
  porcentajePixelesValidos: number   // % de píxeles no nube/no sombra
  resolucionEspacialM: number        // resolución en metros (10 para Sentinel-2 B4/B8)
  sistemaCoordenadasEPSG: number     // típicamente 32614 (UTM 14N para CDMX)
  metodoAtmosferico: 'L2A_Sen2Cor' | 'FLAASH' | 'QUAC' | 'DOS' | 'ninguno'
  metodoLST: 'split_window' | 'single_channel' | 'radiative_transfer' | 'mono_window'
}

// ---------------------------------------------------------------------------
// Per-Building data
// ---------------------------------------------------------------------------

/** Datos ENVI para un edificio/azotea individual (estadística zonal por footprint) */
export interface ENVIEdificioData {
  edificioId: number          // matches GreenRoof.id or CandidateRoof.id
  tipo: 'green_roof' | 'candidate'
  centroide: { lat: number; lng: number }
  areaPixelesM2: number       // área del footprint cubierta por píxeles válidos
  /** Valores de la observación más reciente */
  actual: IndicesEspectrales
  /** Serie temporal (puede ser más corta que alcaldía si el edificio es pequeño) */
  serie: SerieTemporal
  /** Diferencial: valor del edificio vs promedio de la alcaldía */
  diferencialVsAlcaldia: IndicesEspectrales
  calidad: CalidadDatos
}

// ---------------------------------------------------------------------------
// Pipeline configuration
// ---------------------------------------------------------------------------

/** Configuración del pipeline de adquisición y procesamiento */
export interface ENVIPipelineConfig {
  /** Sentinel-2 */
  sentinel2: {
    productLevel: 'L2A'       // ya corregido atmosféricamente
    bandasRequeridas: string[] // ['B02','B03','B04','B08','B8A','B11','B12']
    maxNubosidad: number       // % máximo aceptable (típico 20)
    tileIds: string[]          // tiles que cubren CDMX: ['14QNG', '14QPG', '14QNH']
  }
  /** Landsat 8/9 (para LST) */
  landsat: {
    collection: 2
    level: 'L2SP'              // incluye banda térmica procesada
    bandasTermicas: string[]   // ['ST_B10'] Landsat 8, ['ST_B10'] Landsat 9
    maxNubosidad: number
    pathRow: string[]          // path/row que cubren CDMX: ['026/047']
  }
  /** Periodicidad de actualización */
  intervaloActualizacionDias: number  // ideal: 30 (mensual)
  /** Rango temporal para serie histórica */
  anioInicio: number           // e.g. 2019
  anioFin: number              // e.g. 2025
}

// ---------------------------------------------------------------------------
// ENVI processing parameters
// ---------------------------------------------------------------------------

/** Parámetros del cálculo de índices en ENVI */
export interface ENVIProcessingParams {
  ndvi: { bandaRoja: string; bandaNIR: string }       // B04, B08 (Sentinel-2)
  evi: { bandaAzul: string; bandaRoja: string; bandaNIR: string; G: number; C1: number; C2: number; L: number }
  savi: { bandaRoja: string; bandaNIR: string; L: number }  // L=0.5 para vegetación intermedia
  ndwi: { bandaVerde: string; bandaNIR: string }      // B03, B08 (Sentinel-2)
  lst: { metodo: CalidadDatos['metodoLST']; emisividad: number }  // ε ≈ 0.95 para concreto urbano
}
