import type { DatosCatastrales } from '~/types/sources'

/**
 * Normaliza un feature WFS del SIGCDMX al modelo interno DatosCatastrales.
 * Stub: sera implementado cuando se conecte al servicio WFS real.
 */
export function normalizePredio(rawFeature: Record<string, unknown>): DatosCatastrales {
  return {
    cuentaCatastral: rawFeature['CUENTA_CATASTRAL'] as string | undefined,
    supTerreno: rawFeature['SUP_TERRENO'] as number | undefined,
    supConstruccion: rawFeature['SUP_CONSTRUCCION'] as number | undefined,
    anioConstruccion: rawFeature['ANIO_CONSTRUCCION'] as number | undefined,
    usoDeSuelo: rawFeature['USO_SUELO'] as string | undefined,
  }
}
