import type {
  Alcaldia,
  TipoEdificio,
  TipoTechoVerde,
  EstadoTecho,
  EstatusCandidato,
  NivelConfianza,
} from '~/types'

// =============================================================================
// Alcaldias de la Ciudad de Mexico
// =============================================================================

export const ALCALDIAS: Alcaldia[] = [
  'Álvaro Obregón',
  'Azcapotzalco',
  'Benito Juárez',
  'Coyoacán',
  'Cuajimalpa',
  'Cuauhtémoc',
  'Gustavo A. Madero',
  'Iztacalco',
  'Iztapalapa',
  'Magdalena Contreras',
  'Miguel Hidalgo',
  'Milpa Alta',
  'Tláhuac',
  'Tlalpan',
  'Venustiano Carranza',
  'Xochimilco',
]

// =============================================================================
// Tipos de edificio
// =============================================================================

export const TIPOS_EDIFICIO: { value: TipoEdificio; label: string }[] = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'mercado', label: 'Mercado' },
  { value: 'supermercado', label: 'Supermercado' },
  { value: 'centro_comercial', label: 'Centro comercial' },
  { value: 'oficinas', label: 'Oficinas' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'educativo', label: 'Educativo' },
  { value: 'gobierno', label: 'Gobierno' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'industrial', label: 'Industrial' },
]

// =============================================================================
// Tipos de techo verde
// =============================================================================

export const TIPOS_TECHO_VERDE: { value: TipoTechoVerde; label: string }[] = [
  { value: 'extensivo', label: 'Extensivo' },
  { value: 'intensivo', label: 'Intensivo' },
  { value: 'semi-intensivo', label: 'Semi-intensivo' },
]

// =============================================================================
// Estados de techo verde (con colores para badges / indicadores)
// =============================================================================

export const ESTADOS_TECHO: {
  value: EstadoTecho
  label: string
  color: string
  bgClass: string
  textClass: string
}[] = [
  {
    value: 'activo',
    label: 'Activo',
    color: '#16A34A',
    bgClass: 'bg-green-100 dark:bg-green-900/30',
    textClass: 'text-green-700 dark:text-green-400',
  },
  {
    value: 'en_mantenimiento',
    label: 'En mantenimiento',
    color: '#F59E0B',
    bgClass: 'bg-amber-100 dark:bg-amber-900/30',
    textClass: 'text-amber-700 dark:text-amber-400',
  },
  {
    value: 'inactivo',
    label: 'Inactivo',
    color: '#9CA3AF',
    bgClass: 'bg-gray-100 dark:bg-gray-800',
    textClass: 'text-gray-600 dark:text-gray-400',
  },
  {
    value: 'nuevo',
    label: 'Nuevo',
    color: '#3B82F6',
    bgClass: 'bg-blue-100 dark:bg-blue-900/30',
    textClass: 'text-blue-700 dark:text-blue-400',
  },
]

// =============================================================================
// Estatus de candidato
// =============================================================================

export const ESTATUS_CANDIDATO: {
  value: EstatusCandidato
  label: string
  color: string
  bgClass: string
  textClass: string
}[] = [
  {
    value: 'candidato',
    label: 'Candidato',
    color: '#8B5CF6',
    bgClass: 'bg-violet-100 dark:bg-violet-900/30',
    textClass: 'text-violet-700 dark:text-violet-400',
  },
  {
    value: 'validado_visualmente',
    label: 'Validado visualmente',
    color: '#06B6D4',
    bgClass: 'bg-cyan-100 dark:bg-cyan-900/30',
    textClass: 'text-cyan-700 dark:text-cyan-400',
  },
  {
    value: 'factibilidad_pendiente',
    label: 'Factibilidad pendiente',
    color: '#F97316',
    bgClass: 'bg-orange-100 dark:bg-orange-900/30',
    textClass: 'text-orange-700 dark:text-orange-400',
  },
  {
    value: 'piloto',
    label: 'Piloto',
    color: '#3B82F6',
    bgClass: 'bg-blue-100 dark:bg-blue-900/30',
    textClass: 'text-blue-700 dark:text-blue-400',
  },
  {
    value: 'implementado',
    label: 'Implementado',
    color: '#16A34A',
    bgClass: 'bg-green-100 dark:bg-green-900/30',
    textClass: 'text-green-700 dark:text-green-400',
  },
]

// =============================================================================
// Niveles de confianza IA
// =============================================================================

export const NIVELES_CONFIANZA: {
  value: NivelConfianza
  label: string
  color: string
  bgClass: string
  textClass: string
}[] = [
  {
    value: 'alta',
    label: 'Alta',
    color: '#16A34A',
    bgClass: 'bg-green-100 dark:bg-green-900/30',
    textClass: 'text-green-700 dark:text-green-400',
  },
  {
    value: 'media',
    label: 'Media',
    color: '#F59E0B',
    bgClass: 'bg-amber-100 dark:bg-amber-900/30',
    textClass: 'text-amber-700 dark:text-amber-400',
  },
  {
    value: 'baja',
    label: 'Baja',
    color: '#EF4444',
    bgClass: 'bg-red-100 dark:bg-red-900/30',
    textClass: 'text-red-700 dark:text-red-400',
  },
]

// =============================================================================
// Map configuration
// =============================================================================

// =============================================================================
// Niveles de aptitud territorial (5-tier scale)
// =============================================================================

export const APTITUD_LEVELS = [
  { label: 'Muy alta', range: '80-100', color: '#0E5E3A' },
  { label: 'Alta', range: '60-80', color: '#79C141' },
  { label: 'Media', range: '40-60', color: '#F2A81D' },
  { label: 'Baja', range: '20-40', color: '#F97316' },
  { label: 'Muy baja', range: '0-20', color: '#D9363E' },
] as const

// =============================================================================
// Map configuration
// =============================================================================

export const MAP_CONFIG = {
  center: [19.4326, -99.1332] as [number, number],
  zoom: 11,
  minZoom: 10,
  maxZoom: 18,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  /** Bounding box for CDMX (roughly) */
  bounds: {
    southWest: [19.05, -99.37] as [number, number],
    northEast: [19.60, -98.94] as [number, number],
  },
} as const
