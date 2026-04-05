// ============================================================================
// Observatorio de Techos Verdes CDMX - Source Metadata Types
// ============================================================================

import type { Alcaldia, CandidateRoof, GreenRoof, ValidationRecord } from './index'

// ---------------------------------------------------------------------------
// Source Types
// ---------------------------------------------------------------------------

export type DataSourceType = 'oficial' | 'mock' | 'derivado'

export type DataSourceName =
  | 'SIGCDMX'
  | 'SEDEMA'
  | 'SIMAT'
  | 'INEGI'
  | 'DatosAbiertos'
  | 'CONABIO'
  | 'CONAGUA'
  | 'SEMARNAT'
  | 'ENVI_Sentinel2'
  | 'ENVI_Landsat'
  | 'Mock'
  | 'Calculado'

export interface SourceMeta {
  sourceType: DataSourceType
  sourceName: DataSourceName
  sourceUrl?: string
  lastUpdated: string
  confidenceLevel: number // 0-1
  validationStatus: 'verificado' | 'sin_verificar' | 'parcial'
}

export type WithSourceMeta<T> = T & {
  _source: SourceMeta
}

// ---------------------------------------------------------------------------
// Extended Domain Types
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Structural Feasibility Types
// ---------------------------------------------------------------------------

export type TipoEstructura =
  | 'concreto_armado'
  | 'acero'
  | 'mamposteria_confinada'
  | 'mamposteria_simple'
  | 'lamina'
  | 'madera'
  | 'mixta'
  | 'desconocido'

export type ZonaSismica = 'I' | 'IIa' | 'IIb' | 'IIIa' | 'IIIb' | 'IIIc' | 'IIId'

export type EstadoEstructural = 'seguro' | 'dano_menor' | 'dano_mayor' | 'sin_dictamen'

export type MaterialTechumbre =
  | 'losa_concreto'
  | 'vigueta_bovedilla'
  | 'losacero'
  | 'lamina_metalica'
  | 'lamina_asbesto'
  | 'madera_teja'
  | 'desconocido'

export type NivelPrefactibilidad = 'prefactible' | 'requiere_evaluacion' | 'no_recomendado'

export interface DatosEstructurales {
  tipoEstructura: TipoEstructura
  zonaSismica: ZonaSismica
  niveles: number
  estadoEstructural: EstadoEstructural
  materialTechumbre: MaterialTechumbre
  capacidadCargaTecho?: number        // kg/m²
  dictamenPostSismo2017?: boolean
  riesgoInundacion?: 'alto' | 'medio' | 'bajo'
}

export interface IndicadorEstructuralAlcaldia {
  alcaldia: Alcaldia
  porcentajeConcretoAcero: number     // % edificios concreto/acero
  edadPromedioAnios: number
  porcentajeDictamenSeguro: number    // % post-2017 "seguro"
  porcentajeZonaIII: number           // % en zona sismica III
  scorePrefactibilidadPromedio: number // 0-100
  edificiosEvaluados: number
}

// ---------------------------------------------------------------------------
// Extended Domain Types
// ---------------------------------------------------------------------------

export interface DatosCatastrales {
  cuentaCatastral?: string
  supTerreno?: number
  supConstruccion?: number
  anioConstruccion?: number
  usoDeSuelo?: string
  datosEstructurales?: DatosEstructurales
}

export type OrigenDeteccion =
  | 'satelital'
  | 'catastral'
  | 'reporte_ciudadano'
  | 'ia_automatica'

export type GreenRoofExtended = GreenRoof & {
  datosCatastrales?: DatosCatastrales
}

export type CandidateRoofExtended = CandidateRoof & {
  datosCatastrales?: DatosCatastrales
}

export type ValidationRecordExtended = ValidationRecord & {
  origenDeteccion?: OrigenDeteccion
}

// ---------------------------------------------------------------------------
// Environmental Data Types
// ---------------------------------------------------------------------------

export interface LecturaCalidadAire {
  estacion: string
  parametro: string
  valor: number
  unidad: string
  fecha: string
}

export interface CapaTerritorial {
  id: string
  nombre: string
  tipo: string
  propiedades: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Biodiversity & Hydric Indicator Types
// ---------------------------------------------------------------------------

export interface IndiceBioticoAlcaldia {
  alcaldia: Alcaldia
  indiceBiodiversidad: number      // 0-100
  coberturaVegetal: number          // %
  riquezaEspecies: number           // numero de especies
  abundanciaIndividuos: number      // total individuos
  especiesDominantes: string[]      // top 3
  indiceShannonWiener: number       // H'
  indiceSimpson: number             // 1-D
}

export interface IndicadorHidricoAlcaldia {
  alcaldia: Alcaldia
  captacionPluvial: number          // L/m2/año
  precipitacionMediaAnual: number   // mm/año
  escorrentiaEvitada: number        // L/año
  superficieVerdeCaptadora: number  // m2
  eficienciaRetencion: number       // %
}
