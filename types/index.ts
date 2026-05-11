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
/**
 * Imagen con atribución requerida — para cumplir con licencias
 * Wikimedia Commons / Flickr / Unsplash. `src` debe ser ruta local
 * (descargada en `public/img/roofs/`) para evitar hotlinking; los
 * créditos quedan junto a la imagen siempre visibles.
 */
export interface GreenRoofImage {
  src: string
  caption?: string
  credit: string // ej. "Foto: Wikimedia Commons / Usuario X"
  license: 'CC BY-SA 4.0' | 'CC BY-SA 3.0' | 'CC BY 4.0' | 'CC BY 3.0' | 'CC BY 2.0' | 'CC0' | 'Public Domain' | 'Fair use'
  sourceUrl: string // link a la página de origen (Wikimedia/Flickr)
}

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
  /** Foto principal (legacy — usar `imagenes[0].src` cuando hay galería). */
  imagen?: string
  /**
   * Galería de imágenes con atribución obligatoria. Cuando está presente,
   * la UI muestra carrusel + créditos. Las imágenes deben estar en
   * `public/img/roofs/` (descargadas, no hotlinkeadas).
   */
  imagenes?: GreenRoofImage[]
  fechaRegistro: string
  descripcion?: string
  visible?: boolean
  archivado?: boolean
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
  visible?: boolean
  archivado?: boolean
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
  visible?: boolean
  archivado?: boolean
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

// ── Admin roles & permissions ──
export type AdminRole = 'superadmin' | 'admin' | 'editor' | 'reviewer'

export type AdminPermission =
  | 'manage_users'
  | 'manage_cms'
  | 'manage_roofs'
  | 'manage_candidates'
  | 'manage_validations'
  | 'manage_prospectos'
  | 'manage_tiers'
  | 'manage_contributors'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  permissions: AdminPermission[]
  createdAt?: string
  lastLogin?: string
}

// ── Tiers (modos de participacion / escalas reputacionales) ──
export type ContributorTierSlug =
  | 'aprendiz'
  | 'reportador'
  | 'caracterizador'
  | 'especialista'
  | 'operador'
  | string  // permite slugs custom desde admin

export interface Tier {
  id?: number
  slug: ContributorTierSlug
  label: string
  description?: string | null
  minScore: number
  maxScore?: number | null
  color: string
  requirements?: string | null
  icon?: string | null
  sortOrder: number
  visible?: boolean
  archived?: boolean
  modeTitle?: string | null
  audience?: string | null
  contributions?: string[] | null
  bridge?: string | null
}

// ── Contributors ──
export type ContributorRole =
  | 'ciudadano'
  | 'propietario'
  | 'arquitecto'
  | 'ingeniero'
  | 'empresa'
  | 'gobierno'
  | 'ong'
  | 'academia'

export interface Contributor {
  id: number
  displayName: string
  handle: string
  role: ContributorRole
  affiliation?: string | null
  bio?: string | null
  avatarUrl?: string | null
  alcaldia?: string | null
  joinedAt?: string | null
  tier: ContributorTierSlug
  reputationScore: number
  validatedContributions: number
  rejectedContributions: number
  acceptanceRate: number
  averageQuality: number
  consecutiveMonthsActive: number
  badges?: ContributorBadge[] | null
  publicProfile: boolean
  verified: boolean
  visible?: boolean
  archived?: boolean
}

export interface ContributorBadge {
  id: string
  label: string
  description: string
  icon: string
  earnedAt: string
}

// ── Prospecto (con atribucion) ──
export interface ProspectoTechoVerde {
  id: number
  status: 'pendiente' | 'aprobado' | 'rechazado'
  source: 'formulario' | 'ia_detector' | 'manual'
  createdAt: string
  notasAdmin?: string
  contributorId?: number | null
  data: Record<string, any>
}

export * from './sources'
