import type { IndiceBioticoAlcaldia } from '~/types/sources'

/**
 * Stub — CONABIO (Comision Nacional para el Conocimiento y Uso de la Biodiversidad)
 * Fuente: Sistema Nacional de Informacion sobre Biodiversidad (SNIB)
 * https://www.snib.mx
 */

export async function fetchIndiceBiodiversidadUrbana(): Promise<IndiceBioticoAlcaldia[]> {
  throw new Error(
    '[CONABIO] Adapter no implementado. ' +
    'Requiere conexion al SNIB de conabio.gob.mx para indices de biodiversidad urbana. ' +
    'El repositorio usara datos mock como respaldo.',
  )
}

export async function fetchEspeciesAzoteasVerdes(): Promise<string[]> {
  throw new Error(
    '[CONABIO] Adapter no implementado. ' +
    'Requiere conexion al catalogo de especies del SNIB. ' +
    'El repositorio usara datos mock como respaldo.',
  )
}
