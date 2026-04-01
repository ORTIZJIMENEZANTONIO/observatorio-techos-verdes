import type { DatosCatastrales } from '~/types/sources'

const WFS_BASE = 'https://sig.cdmx.gob.mx/geoserver/ows'

export function getWfsUrl(typeName: string, params: Record<string, string> = {}): string {
  const base = new URL(WFS_BASE)
  base.searchParams.set('service', 'WFS')
  base.searchParams.set('version', '2.0.0')
  base.searchParams.set('request', 'GetFeature')
  base.searchParams.set('typeName', typeName)
  base.searchParams.set('outputFormat', 'application/json')
  for (const [k, v] of Object.entries(params)) {
    base.searchParams.set(k, v)
  }
  return base.toString()
}

export async function fetchPrediosByBbox(_bbox: [number, number, number, number]): Promise<DatosCatastrales[]> {
  throw new Error(
    '[SIGCDMX] Adapter no implementado. ' +
    'Requiere conexion al servicio WFS de sig.cdmx.gob.mx. ' +
    'El repositorio usara datos mock como respaldo.'
  )
}

export async function fetchPrediosByCuenta(_cuentas: string[]): Promise<DatosCatastrales[]> {
  throw new Error(
    '[SIGCDMX] Adapter no implementado. ' +
    'Requiere conexion al servicio WFS de sig.cdmx.gob.mx con filtro CQL por cuenta catastral. ' +
    'El repositorio usara datos mock como respaldo.'
  )
}
