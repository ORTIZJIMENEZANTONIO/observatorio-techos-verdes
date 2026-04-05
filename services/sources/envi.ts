/**
 * ENVI Remote Sensing Data Source Adapter
 *
 * Provee datos de índices espectrales derivados de procesamiento ENVI
 * sobre imágenes Sentinel-2 (NDVI, EVI, SAVI, NDWI) y Landsat 8/9 (LST).
 *
 * En modo mock: usa data/envi/alcaldias.ts (estimaciones calibradas).
 * En modo oficial: leerá JSONs exportados del pipeline ENVI real.
 */

import { enviAlcaldias } from '~/data/envi/alcaldias'
import type { ENVIAlcaldiaData, ENVIEdificioData } from '~/types/remote-sensing'
import type { SourceMeta, WithSourceMeta } from '~/types/sources'

const ENVI_MOCK_META: SourceMeta = {
  sourceType: 'derivado',
  sourceName: 'Calculado',
  sourceUrl: 'https://scihub.copernicus.eu/',
  lastUpdated: '2025-06-20',
  confidenceLevel: 0.75,
  validationStatus: 'parcial',
}

const ENVI_OFFICIAL_META: SourceMeta = {
  sourceType: 'oficial',
  sourceName: 'SEDEMA',
  sourceUrl: 'https://scihub.copernicus.eu/',
  lastUpdated: '2025-06-20',
  confidenceLevel: 0.95,
  validationStatus: 'verificado',
}

/** Obtener datos ENVI por alcaldía */
export function getENVIAlcaldias(): WithSourceMeta<ENVIAlcaldiaData>[] {
  // TODO: cuando el pipeline ENVI esté operativo, leer de /data/envi/official/
  // y usar ENVI_OFFICIAL_META con confidenceLevel: 0.95
  return enviAlcaldias.map(d => ({
    ...d,
    _source: { ...ENVI_MOCK_META },
  }))
}

/** Obtener datos ENVI para un edificio específico */
export function getENVIEdificio(_edificioId: number): WithSourceMeta<ENVIEdificioData> | null {
  // TODO: implementar cuando se procesen footprints individuales en ENVI
  return null
}

/** Obtener solo los valores actuales de una alcaldía (lookup rápido) */
export function getENVIActual(alcaldia: string) {
  const data = enviAlcaldias.find(d => d.alcaldia === alcaldia)
  return data?.actual ?? null
}

/** Obtener serie temporal de un índice para una alcaldía */
export function getENVISerie(alcaldia: string, indice: keyof ENVIAlcaldiaData['actual']) {
  const data = enviAlcaldias.find(d => d.alcaldia === alcaldia)
  if (!data) return []
  return data.serie.observaciones.map(o => ({
    fecha: o.fecha,
    valor: o.indices[indice],
    nubosidad: o.nubosidad,
  }))
}
