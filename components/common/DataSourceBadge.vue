<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-badge px-2 py-0.5 text-[10px] font-medium"
    :style="{ backgroundColor: color + '15', color: color }"
    :title="tooltipText"
  >
    <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: color }" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { DataSourceName } from '~/types/sources'

const props = defineProps<{
  sourceName: DataSourceName
  lastUpdated?: string
}>()

const { getSourceLabel, getSourceColor } = useDataSource()

const label = computed(() => {
  const labels: Record<DataSourceName, string> = {
    SIGCDMX: 'SIGCDMX',
    SEDEMA: 'SEDEMA',
    SIMAT: 'SIMAT',
    INEGI: 'INEGI',
    DatosAbiertos: 'Datos Abiertos',
    CONABIO: 'CONABIO',
    CONAGUA: 'CONAGUA',
    SEMARNAT: 'SEMARNAT',
    Mock: 'Demo',
    Calculado: 'Calculado',
  }
  return labels[props.sourceName] || props.sourceName
})

const color = computed(() => getSourceColor(props.sourceName))

const tooltipText = computed(() => {
  let text = getSourceLabel(props.sourceName)
  if (props.lastUpdated) {
    text += ` | Actualizado: ${props.lastUpdated}`
  }
  return text
})
</script>
