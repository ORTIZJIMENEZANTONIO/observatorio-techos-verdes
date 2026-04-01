import type { LecturaCalidadAire } from '~/types/sources'

export async function fetchCalidadAireActual(): Promise<LecturaCalidadAire[]> {
  throw new Error(
    '[SIMAT] Adapter no implementado. ' +
    'Requiere conexion al API de datos abiertos de calidad del aire (datosabiertos.aire.cdmx.gob.mx). ' +
    'El repositorio usara datos mock como respaldo.'
  )
}

export async function fetchCalidadAireHistorico(_params: {
  fechaInicio: string
  fechaFin: string
  estacion?: string
}): Promise<LecturaCalidadAire[]> {
  throw new Error(
    '[SIMAT] Adapter no implementado. ' +
    'Requiere conexion al API historico de SIMAT. ' +
    'El repositorio usara datos mock como respaldo.'
  )
}
