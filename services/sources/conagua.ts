import type { IndicadorHidricoAlcaldia } from '~/types/sources'

/**
 * Stub — CONAGUA (Comision Nacional del Agua)
 * Fuente: Servicio Meteorologico Nacional (SMN) / SACMEX
 * https://smn.conagua.gob.mx
 */

export async function fetchPrecipitacionCDMX(): Promise<IndicadorHidricoAlcaldia[]> {
  throw new Error(
    '[CONAGUA] Adapter no implementado. ' +
    'Requiere conexion al SMN de conagua.gob.mx para datos pluviometricos. ' +
    'El repositorio usara datos mock como respaldo.',
  )
}

export async function fetchEstacionesClimatologicas(): Promise<unknown[]> {
  throw new Error(
    '[CONAGUA] Adapter no implementado. ' +
    'Requiere conexion a la red de estaciones climatologicas del SMN. ' +
    'El repositorio usara datos mock como respaldo.',
  )
}
