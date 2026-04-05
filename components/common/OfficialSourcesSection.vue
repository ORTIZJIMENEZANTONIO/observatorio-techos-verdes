<template>
  <div>
    <h3 class="text-xl font-semibold text-ink">Fuentes oficiales de datos</h3>
    <p class="mt-2 text-sm text-slate-custom max-w-3xl">
      El observatorio está diseñado para integrar datos de las siguientes fuentes oficiales de la Ciudad de México y de instituciones federales.
    </p>
    <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="source in sources"
        :key="source.name"
        class="card p-5"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg"
              :style="{ backgroundColor: source.color + '15' }"
            >
              <div class="h-4 w-4 rounded-full" :style="{ backgroundColor: source.color }" />
            </div>
            <div>
              <p class="text-sm font-semibold text-ink">{{ source.name }}</p>
              <CommonDataSourceBadge :source-name="source.sourceName" />
            </div>
          </div>
        </div>
        <p class="mt-3 text-xs leading-relaxed text-slate-custom">{{ source.description }}</p>
        <div class="mt-3 space-y-1">
          <div class="flex items-center gap-2 text-[10px] text-ink-muted">
            <span class="font-semibold uppercase tracking-wider">Formato:</span>
            <span>{{ source.format }}</span>
          </div>
          <div class="flex items-center gap-2 text-[10px] text-ink-muted">
            <span class="font-semibold uppercase tracking-wider">Protocolo:</span>
            <span>{{ source.protocol }}</span>
          </div>
          <div class="flex items-center gap-2 text-[10px] text-ink-muted">
            <span class="font-semibold uppercase tracking-wider">URL:</span>
            <span class="truncate">{{ source.url }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DataSourceName } from '~/types/sources'

interface OfficialSource {
  name: string
  sourceName: DataSourceName
  description: string
  format: string
  protocol: string
  url: string
  color: string
}

const sources: OfficialSource[] = [
  {
    name: 'SIGCDMX',
    sourceName: 'SIGCDMX',
    description: 'Sistema de Información Geográfica de la CDMX. Proporciona capas catastrales, uso de suelo, predios y equipamiento urbano vía servicios WFS/WMS.',
    format: 'GeoJSON / GML',
    protocol: 'WFS 2.0',
    url: 'sig.cdmx.gob.mx/geoserver/ows',
    color: '#0E5E3A',
  },
  {
    name: 'SEDEMA',
    sourceName: 'SEDEMA',
    description: 'Secretaría del Medio Ambiente de la CDMX. Inventario de áreas verdes, programas ambientales y registro de azoteas verdes.',
    format: 'CSV / JSON',
    protocol: 'REST API',
    url: 'datos.cdmx.gob.mx',
    color: '#79C141',
  },
  {
    name: 'SIMAT',
    sourceName: 'SIMAT',
    description: 'Sistema de Monitoreo Atmosférico. Datos en tiempo real e históricos de calidad del aire de la red de estaciones RAMA.',
    format: 'CSV / JSON',
    protocol: 'REST API',
    url: 'datosabiertos.aire.cdmx.gob.mx',
    color: '#18A5E3',
  },
  {
    name: 'Datos Abiertos CDMX',
    sourceName: 'DatosAbiertos',
    description: 'Portal de datos abiertos del Gobierno de la Ciudad de México. Conjuntos de datos tabulares y geoespaciales de múltiples dependencias.',
    format: 'CSV / GeoJSON / XLSX',
    protocol: 'CKAN API',
    url: 'datos.cdmx.gob.mx',
    color: '#F2A81D',
  },
  {
    name: 'INEGI',
    sourceName: 'INEGI',
    description: 'Instituto Nacional de Estadística y Geografía. Datos censales de población, vivienda y marco geoestadístico nacional.',
    format: 'CSV / SHP / GeoJSON',
    protocol: 'REST API / WFS',
    url: 'inegi.org.mx',
    color: '#6366F1',
  },
  {
    name: 'Aire CDMX',
    sourceName: 'SIMAT',
    description: 'Plataforma complementaria del SIMAT con visualizaciones y datos históricos procesados de la red de monitoreo atmosférico.',
    format: 'JSON / CSV',
    protocol: 'REST API',
    url: 'aire.cdmx.gob.mx',
    color: '#06B6D4',
  },
  {
    name: 'CONABIO',
    sourceName: 'CONABIO',
    description: 'Comisión Nacional para el Conocimiento y Uso de la Biodiversidad. Sistema Nacional de Información sobre Biodiversidad (SNIB) con registros de especies e índices bióticos.',
    format: 'CSV / GeoJSON / SHP',
    protocol: 'REST API / WMS',
    url: 'snib.mx',
    color: '#059669',
  },
  {
    name: 'CONAGUA',
    sourceName: 'CONAGUA',
    description: 'Comisión Nacional del Agua. Servicio Meteorológico Nacional (SMN) con datos climatológicos, pluviométricos y de estaciones de monitoreo hidrológico.',
    format: 'CSV / JSON / XML',
    protocol: 'REST API',
    url: 'smn.conagua.gob.mx',
    color: '#0284C7',
  },
  {
    name: 'SEMARNAT',
    sourceName: 'SEMARNAT',
    description: 'Secretaría de Medio Ambiente y Recursos Naturales. Registros ambientales federales, normatividad y datos de áreas naturales protegidas.',
    format: 'CSV / PDF / SHP',
    protocol: 'REST API',
    url: 'datos.semarnat.gob.mx',
    color: '#7C3AED',
  },
]
</script>
