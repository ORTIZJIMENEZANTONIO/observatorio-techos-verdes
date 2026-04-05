import type { KPIData } from '~/types'

/** Primary KPIs displayed at the top of the dashboard */
export const kpiPrimary: KPIData[] = [
  {
    label: 'Techos verdes registrados',
    valor: 57,
    unidad: 'techos',
    icono: 'leaf',
    color: 'primary',
    cambio: '+8 en 2024',
  },
  {
    label: 'Superficie total cubierta',
    valor: '98,430',
    unidad: 'm\u00B2',
    icono: 'area',
    color: 'eco',
    cambio: '+12,600 m\u00B2',
  },
  {
    label: 'Candidatos priorizados',
    valor: 60,
    unidad: 'sitios',
    icono: 'target',
    color: 'secondary',
    cambio: '+15 nuevos',
  },
  {
    label: 'Validaciones IA realizadas',
    valor: 30,
    unidad: 'revisiones',
    icono: 'ai',
    color: 'accent',
    cambio: '87% precisión',
  },
]

/** Secondary KPIs shown in a smaller row or side panel */
export const kpiSecondary: KPIData[] = [
  {
    label: 'Alcaldías con techos verdes',
    valor: 14,
    unidad: 'de 16',
    icono: 'map',
    color: 'primary',
  },
  {
    label: 'Variables del modelo',
    valor: 8,
    unidad: 'variables',
    icono: 'chart',
    color: 'secondary',
  },
  {
    label: 'Score promedio candidatos',
    valor: 81.5,
    unidad: 'pts',
    icono: 'score',
    color: 'eco',
    cambio: '+3.2 vs anterior',
  },
  {
    label: 'Pilotos activos',
    valor: 4,
    unidad: 'proyectos',
    icono: 'pilot',
    color: 'accent',
    cambio: '+2 en Q1',
  },
]

/** Environmental impact KPIs */
export const kpiImpacto: KPIData[] = [
  {
    label: 'Reducción estimada de temperatura',
    valor: '2.4',
    unidad: '°C promedio',
    icono: 'thermometer',
    color: 'alert',
    cambio: 'en zonas con techos verdes',
  },
  {
    label: 'Agua pluvial captada',
    valor: '1,250',
    unidad: 'm\u00B3/año',
    icono: 'water',
    color: 'secondary',
    cambio: '+320 m\u00B3 vs 2023',
  },
  {
    label: 'CO\u2082 capturado estimado',
    valor: '48.5',
    unidad: 'ton/año',
    icono: 'co2',
    color: 'eco',
    cambio: '+12 ton vs 2023',
  },
  {
    label: 'Personas beneficiadas',
    valor: '185,000',
    unidad: 'habitantes',
    icono: 'people',
    color: 'primary',
    cambio: 'en radio de influencia',
  },
]

/** Combined export for convenience */
export const kpiData: KPIData[] = [...kpiPrimary, ...kpiSecondary]
