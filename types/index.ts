// ============================================================================
// Observatorio de Techos Verdes CDMX - TypeScript Type Definitions
// ============================================================================

// ---------------------------------------------------------------------------
// Enums & Union Types
// ---------------------------------------------------------------------------

export type Alcaldia =
  | 'Álvaro Obregón'
  | 'Azcapotzalco'
  | 'Benito Juárez'
  | 'Coyoacán'
  | 'Cuajimalpa'
  | 'Cuauhtémoc'
  | 'Gustavo A. Madero'
  | 'Iztacalco'
  | 'Iztapalapa'
  | 'Magdalena Contreras'
  | 'Miguel Hidalgo'
  | 'Milpa Alta'
  | 'Tláhuac'
  | 'Tlalpan'
  | 'Venustiano Carranza'
  | 'Xochimilco'

export type TipoEdificio =
  | 'hospital'
  | 'mercado'
  | 'supermercado'
  | 'centro_comercial'
  | 'oficinas'
  | 'residencial'
  | 'educativo'
  | 'gobierno'
  | 'cultural'
  | 'industrial'

export type TipoTechoVerde = 'extensivo' | 'intensivo' | 'semi-intensivo'

export type EstadoTecho = 'activo' | 'en_mantenimiento' | 'inactivo' | 'nuevo'

export type EstatusCandidato =
  | 'candidato'
  | 'validado_visualmente'
  | 'factibilidad_pendiente'
  | 'piloto'
  | 'implementado'

export type NivelConfianza = 'alta' | 'media' | 'baja'

// ---------------------------------------------------------------------------
// Core Interfaces
// ---------------------------------------------------------------------------

/** Existing green-roof record */
export interface GreenRoof {
  id: number
  nombre: string
  alcaldia: Alcaldia
  direccion: string
  tipoEdificio: TipoEdificio
  tipoTechoVerde: TipoTechoVerde
  superficie: number // m2
  estado: EstadoTecho
  lat: number
  lng: number
  imagen?: string
  fechaRegistro: string
  descripcion?: string
}

/** Prioritised candidate roof */
export interface CandidateRoof {
  id: number
  nombre: string
  alcaldia: Alcaldia
  direccion: string
  tipoEdificio: TipoEdificio
  superficie: number
  scoreAptitud: number // 0-100
  estatus: EstatusCandidato
  lat: number
  lng: number
  imagen?: string
  variables: AptitudVariables
  confianzaIA: NivelConfianza
  fechaPriorizacion: string
}

/** Variables used for the aptitude multi-criteria model */
export interface AptitudVariables {
  lst: number // Land Surface Temperature (C)
  areaUrbanizada: number // % urbanised area
  poblacion: number // population density
  ndvi: number // Normalised Difference Vegetation Index
  densidadVial: number // road density km/km2
  o3: number // ozone ppb
  co: number // carbon monoxide ppm
  no2: number // nitrogen dioxide ppb
}

/** Human-in-the-loop validation record */
export interface ValidationRecord {
  id: number
  candidatoId: number
  nombre: string
  imagen: string
  prediccion: string
  confianza: NivelConfianza
  porcentajeConfianza: number
  estado: 'pendiente' | 'confirmado' | 'rechazado' | 'indeterminado' | 'pendiente_conciliacion'
  revisadoPor?: string
  fechaRevision?: string
}

/** Result from Gemini Vision roof analysis (processed in cercu-backend) */
export interface RoofAnalysisResult {
  techoPlano: boolean
  materialEstimado: string
  vegetacionExistente: boolean
  porcentajeVegetacion: number
  obstrucciones: string[]
  aptitudTechoVerde: number
  tipoRecomendado: 'extensivo' | 'semi-intensivo' | 'intensivo' | 'no_apto'
  areaUtilEstimadaPct: number
  prediccion: string
  confianza: 'alta' | 'media' | 'baja'
  porcentajeConfianza: number
  observaciones: string[]
}

// ---------------------------------------------------------------------------
// Dashboard / UI Interfaces
// ---------------------------------------------------------------------------

export interface KPIData {
  label: string
  valor: string | number
  unidad?: string
  icono: string
  color: string
  cambio?: string
}

export interface AptitudPeso {
  variable: string
  codigo: string
  peso: number
  descripcion: string
  color: string
}

/** Filters available on the interactive map */
export interface MapFilters {
  alcaldia: string
  tipoEdificio: string
  estatus: string
  nivelAptitud: string
  capa: 'existentes' | 'candidatos' | 'aptitud'
  capaAmbiental: string
}

/** A single row in the comparison / ranking table */
export interface RankingRow {
  posicion: number
  nombre: string
  alcaldia: Alcaldia
  tipoEdificio: TipoEdificio
  superficie: number
  scoreAptitud: number
  confianzaIA: NivelConfianza
  estatus: EstatusCandidato
}

/** Legend item for thematic map layers */
export interface LegendItem {
  label: string
  color: string
  min?: number
  max?: number
}

/** Alcaldia summary for choropleth / stats */
export interface AlcaldiaSummary {
  alcaldia: Alcaldia
  totalExistentes: number
  totalCandidatos: number
  superficieTotal: number
  scorePromedio: number
}

export * from './sources'
