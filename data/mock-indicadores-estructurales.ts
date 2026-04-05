// ============================================================================
// Mock: Indicadores Estructurales por Alcaldía
// Fuentes simuladas: Catastro CDMX, Atlas de Riesgos (2019),
// Dictámenes post-sismo 19S (2017), INEGI Censo 2020
// ============================================================================

import type { IndicadorEstructuralAlcaldia } from '~/types/sources'

/**
 * Indicadores estructurales agregados por alcaldía.
 * Valores realistas basados en:
 * - Zonificación sísmica del Atlas de Riesgos CDMX
 * - Distribución de tipos constructivos por zona (INEGI Censo 2020)
 * - Resultados de dictámenes post-sismo 19S (Protección Civil CDMX)
 */
export const indicadoresEstructurales: IndicadorEstructuralAlcaldia[] = [
  {
    alcaldia: 'Álvaro Obregón',
    porcentajeConcretoAcero: 72,
    edadPromedioAnios: 35,
    porcentajeDictamenSeguro: 78,
    porcentajeZonaIII: 30,
    scorePrefactibilidadPromedio: 71,
    edificiosEvaluados: 145,
  },
  {
    alcaldia: 'Azcapotzalco',
    porcentajeConcretoAcero: 58,
    edadPromedioAnios: 42,
    porcentajeDictamenSeguro: 68,
    porcentajeZonaIII: 75,
    scorePrefactibilidadPromedio: 55,
    edificiosEvaluados: 120,
  },
  {
    alcaldia: 'Benito Juárez',
    porcentajeConcretoAcero: 82,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 85,
    porcentajeZonaIII: 40,
    scorePrefactibilidadPromedio: 78,
    edificiosEvaluados: 190,
  },
  {
    alcaldia: 'Coyoacán',
    porcentajeConcretoAcero: 75,
    edadPromedioAnios: 33,
    porcentajeDictamenSeguro: 82,
    porcentajeZonaIII: 20,
    scorePrefactibilidadPromedio: 76,
    edificiosEvaluados: 160,
  },
  {
    alcaldia: 'Cuajimalpa',
    porcentajeConcretoAcero: 68,
    edadPromedioAnios: 25,
    porcentajeDictamenSeguro: 88,
    porcentajeZonaIII: 0,
    scorePrefactibilidadPromedio: 80,
    edificiosEvaluados: 65,
  },
  {
    alcaldia: 'Cuauhtémoc',
    porcentajeConcretoAcero: 65,
    edadPromedioAnios: 48,
    porcentajeDictamenSeguro: 62,
    porcentajeZonaIII: 80,
    scorePrefactibilidadPromedio: 52,
    edificiosEvaluados: 280,
  },
  {
    alcaldia: 'Gustavo A. Madero',
    porcentajeConcretoAcero: 55,
    edadPromedioAnios: 40,
    porcentajeDictamenSeguro: 65,
    porcentajeZonaIII: 70,
    scorePrefactibilidadPromedio: 53,
    edificiosEvaluados: 175,
  },
  {
    alcaldia: 'Iztacalco',
    porcentajeConcretoAcero: 50,
    edadPromedioAnios: 43,
    porcentajeDictamenSeguro: 55,
    porcentajeZonaIII: 90,
    scorePrefactibilidadPromedio: 42,
    edificiosEvaluados: 95,
  },
  {
    alcaldia: 'Iztapalapa',
    porcentajeConcretoAcero: 45,
    edadPromedioAnios: 38,
    porcentajeDictamenSeguro: 48,
    porcentajeZonaIII: 85,
    scorePrefactibilidadPromedio: 38,
    edificiosEvaluados: 230,
  },
  {
    alcaldia: 'Magdalena Contreras',
    porcentajeConcretoAcero: 60,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 85,
    porcentajeZonaIII: 0,
    scorePrefactibilidadPromedio: 75,
    edificiosEvaluados: 45,
  },
  {
    alcaldia: 'Miguel Hidalgo',
    porcentajeConcretoAcero: 80,
    edadPromedioAnios: 32,
    porcentajeDictamenSeguro: 83,
    porcentajeZonaIII: 35,
    scorePrefactibilidadPromedio: 77,
    edificiosEvaluados: 170,
  },
  {
    alcaldia: 'Milpa Alta',
    porcentajeConcretoAcero: 40,
    edadPromedioAnios: 28,
    porcentajeDictamenSeguro: 90,
    porcentajeZonaIII: 0,
    scorePrefactibilidadPromedio: 65,
    edificiosEvaluados: 30,
  },
  {
    alcaldia: 'Tláhuac',
    porcentajeConcretoAcero: 42,
    edadPromedioAnios: 35,
    porcentajeDictamenSeguro: 45,
    porcentajeZonaIII: 95,
    scorePrefactibilidadPromedio: 35,
    edificiosEvaluados: 80,
  },
  {
    alcaldia: 'Tlalpan',
    porcentajeConcretoAcero: 70,
    edadPromedioAnios: 30,
    porcentajeDictamenSeguro: 84,
    porcentajeZonaIII: 15,
    scorePrefactibilidadPromedio: 77,
    edificiosEvaluados: 140,
  },
  {
    alcaldia: 'Venustiano Carranza',
    porcentajeConcretoAcero: 52,
    edadPromedioAnios: 45,
    porcentajeDictamenSeguro: 50,
    porcentajeZonaIII: 85,
    scorePrefactibilidadPromedio: 40,
    edificiosEvaluados: 130,
  },
  {
    alcaldia: 'Xochimilco',
    porcentajeConcretoAcero: 48,
    edadPromedioAnios: 32,
    porcentajeDictamenSeguro: 82,
    porcentajeZonaIII: 5,
    scorePrefactibilidadPromedio: 68,
    edificiosEvaluados: 55,
  },
]
