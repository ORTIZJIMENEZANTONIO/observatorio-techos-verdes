import type { CapaTerritorial } from '~/types/sources'

export async function fetchInventarioAreasVerdes(): Promise<CapaTerritorial[]> {
  throw new Error(
    '[SEDEMA] Adapter no implementado. ' +
    'Requiere conexion al portal de datos de SEDEMA (datos.cdmx.gob.mx). ' +
    'El repositorio usara datos mock como respaldo.'
  )
}

export async function fetchAzoteasVerdes(): Promise<CapaTerritorial[]> {
  throw new Error(
    '[SEDEMA] Adapter no implementado. ' +
    'Requiere filtro por subcategoria de azoteas verdes del inventario SEDEMA. ' +
    'El repositorio usara datos mock como respaldo.'
  )
}
