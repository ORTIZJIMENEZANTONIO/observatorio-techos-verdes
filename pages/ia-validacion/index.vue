<template>
  <div class="bg-surface">
    <CommonHeroSection compact>
      <h1 class="text-3xl font-extrabold text-white md:text-4xl">Validación asistida por IA</h1>
      <p class="mt-2 text-base text-white/80">Revisión y validación de detecciones de techos verdes</p>
    </CommonHeroSection>

    <section class="bg-white py-16">
      <div class="container-wide">
        <!-- Data disclaimer -->
        <CommonDataDisclaimer class="mt-6" />

        <!-- AI Analysis Panel -->
        <div class="mt-8">
          <ValidationAIAnalysisPanel />
        </div>

        <!-- Disclaimer -->
        <div class="mt-6 rounded-card border border-secondary/20 bg-secondary/5 p-4">
          <div class="flex gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-secondary-dark">Sobre la validación con IA</h4>
              <p class="mt-1 text-sm leading-relaxed text-slate-custom">
                La inteligencia artificial apoya la detección visual. Los resultados requieren validación humana y no reemplazan dictámenes técnicos.
              </p>
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div class="kpi-card">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-2xl font-bold text-accent">{{ stats.pendientes }}</p>
            <p class="text-xs text-slate-custom">Pendientes</p>
          </div>
          <div class="kpi-card">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-eco/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-2xl font-bold text-eco">{{ stats.confirmados }}</p>
            <p class="text-xs text-slate-custom">Confirmados</p>
          </div>
          <div class="kpi-card">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-alert/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-2xl font-bold text-alert">{{ stats.rechazados }}</p>
            <p class="text-xs text-slate-custom">Rechazados</p>
          </div>
          <div class="kpi-card">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-custom/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-custom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-2xl font-bold text-slate-custom">{{ stats.indeterminados }}</p>
            <p class="text-xs text-slate-custom">Indeterminados</p>
          </div>
          <div class="kpi-card">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-2xl font-bold text-secondary">{{ stats.pendientesConciliacion }}</p>
            <p class="text-xs text-slate-custom">Pend. conciliación</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Filtrar:</span>
          <select v-model="filterConfianza" class="select !w-auto">
            <option value="">Confianza: Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <select v-model="filterEstado" class="select !w-auto">
            <option value="">Estado: Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="rechazado">Rechazado</option>
            <option value="indeterminado">Indeterminado</option>
            <option value="pendiente_conciliacion">Pendiente de conciliación</option>
          </select>
          <select v-model="sortSelect" class="select !w-auto">
            <option value="">Ordenar por...</option>
            <option value="nombre_asc">Nombre (A-Z)</option>
            <option value="nombre_desc">Nombre (Z-A)</option>
            <option value="confianza_desc">Confianza (mayor)</option>
            <option value="confianza_asc">Confianza (menor)</option>
            <option value="estado_asc">Estado (A-Z)</option>
            <option value="origen_asc">Origen (A-Z)</option>
            <option value="id_asc">ID (ascendente)</option>
            <option value="id_desc">ID (descendente)</option>
          </select>
          <button
            v-if="filterConfianza || filterEstado"
            class="btn-ghost btn-sm"
            @click="filterConfianza = ''; filterEstado = ''"
          >
            Limpiar
          </button>
        </div>
      </div>
    </section>

    <!-- Validation table -->
    <section class="py-12">
      <div class="container-wide">
        <div class="table-container">
          <table class="table-base">
            <thead>
              <tr>
                <th class="cursor-pointer select-none" @click="toggleSort('id')">ID <span class="text-[10px] opacity-60">{{ sortIcon('id') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('nombre')">Nombre <span class="text-[10px] opacity-60">{{ sortIcon('nombre') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('prediccion')">Predicción <span class="text-[10px] opacity-60">{{ sortIcon('prediccion') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('origen')">Origen <span class="text-[10px] opacity-60">{{ sortIcon('origen') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('confianza')">Confianza <span class="text-[10px] opacity-60">{{ sortIcon('confianza') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('estado')">Estado <span class="text-[10px] opacity-60">{{ sortIcon('estado') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('fuente')">Fuente <span class="text-[10px] opacity-60">{{ sortIcon('fuente') }}</span></th>
                <th class="cursor-pointer select-none" @click="toggleSort('revisadoPor')">Revisado por <span class="text-[10px] opacity-60">{{ sortIcon('revisadoPor') }}</span></th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in paginatedRecords" :key="record.id">
                <td class="font-mono text-xs">{{ record.id }}</td>
                <td>
                  <div class="max-w-[200px]">
                    <p class="truncate text-sm font-medium text-ink">{{ record.nombre }}</p>
                  </div>
                </td>
                <td class="text-sm text-slate-custom">{{ record.prediccion }}</td>
                <td>
                  <span
                    v-if="record.origenDeteccion"
                    :class="['badge', origenBadgeClass(record.origenDeteccion)]"
                  >
                    {{ formatOrigen(record.origenDeteccion) }}
                  </span>
                  <span v-else class="text-xs text-ink-muted">-</span>
                </td>
                <td>
                  <div class="flex items-center gap-2">
                    <span
                      :class="[
                        'badge',
                        confianzaBadgeClass(record.confianza),
                      ]"
                    >
                      {{ formatConfianza(record.confianza) }}
                    </span>
                    <span class="text-xs text-ink-muted">{{ record.porcentajeConfianza }}%</span>
                  </div>
                </td>
                <td>
                  <span
                    :class="[
                      'badge',
                      estadoBadgeClass(record.estado),
                    ]"
                  >
                    {{ formatEstadoValidacion(record.estado) }}
                  </span>
                </td>
                <td>
                  <CommonDataSourceBadge :source-name="record._source.sourceName" :last-updated="record._source.lastUpdated" />
                </td>
                <td class="text-xs text-slate-custom">
                  {{ record.revisadoPor || '-' }}
                </td>
                <td>
                  <div v-if="record.estado === 'pendiente'" class="flex gap-1">
                    <button
                      class="flex h-7 w-7 items-center justify-center rounded-lg bg-eco/10 text-eco hover:bg-eco/20 transition-colors"
                      title="Confirmar"
                      @click="confirmRecord(record.id)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                    <button
                      class="flex h-7 w-7 items-center justify-center rounded-lg bg-alert/10 text-alert hover:bg-alert/20 transition-colors"
                      title="Rechazar"
                      @click="rejectRecord(record.id)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <button
                      class="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-ink-muted hover:bg-gray-200 transition-colors"
                      title="Indeterminado"
                      @click="markIndeterminate(record.id)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <span v-else class="text-xs text-ink-muted">
                    {{ record.fechaRevision || '-' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6">
          <CommonPaginationControls
            v-model:current-page="currentPage"
            :total-pages="totalPages"
            :total-items="sortedRecords.length"
            :per-page="perPage"
          />
        </div>

        <!-- Empty state -->
        <div v-if="filteredRecords.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-ink">Sin registros</h3>
          <p class="mt-2 text-sm text-slate-custom">No hay registros de validación con los filtros actuales.</p>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { OrigenDeteccion } from '~/types/sources'

const { formatConfianza, formatEstadoValidacion, confianzaBadgeClass, estadoValidacionBadgeClass: estadoBadgeClass } = useFormatters()
const validationStore = useValidationStore()

useHead({
  title: 'Validación IA | Observatorio Techos Verdes CDMX',
  meta: [
    { name: 'description', content: 'Sistema de validación asistida por inteligencia artificial para detección de techos verdes en la Ciudad de México.' },
  ],
})

onMounted(() => {
  if (validationStore.records.length === 0) {
    validationStore.loadRecords()
  }
})

const filterConfianza = ref('')
const filterEstado = ref('')
const currentPage = ref(1)
const perPage = 15
const sortCol = ref('')
const sortDir = ref<'asc' | 'desc'>('desc')
const sortSelect = ref('')

watch(sortSelect, (v) => {
  if (!v) { sortCol.value = ''; return }
  const [col, dir] = v.split('_')
  const colMap: Record<string, string> = { nombre: 'nombre', confianza: 'confianza', estado: 'estado', origen: 'origen', id: 'id' }
  sortCol.value = colMap[col] || col
  sortDir.value = (dir as 'asc' | 'desc') || 'desc'
})

function toggleSort(col: string) {
  if (sortCol.value === col) { sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc' }
  else { sortCol.value = col; sortDir.value = 'desc' }
  sortSelect.value = `${col}_${sortDir.value}`
}

function sortIcon(col: string) {
  if (sortCol.value !== col) return '↕'
  return sortDir.value === 'asc' ? '↑' : '↓'
}

const filteredRecords = computed(() => {
  return validationStore.records.filter(r => {
    if (filterConfianza.value && r.confianza !== filterConfianza.value) return false
    if (filterEstado.value && r.estado !== filterEstado.value) return false
    return true
  })
})

const sortedRecords = computed(() => {
  const data = [...filteredRecords.value]
  if (!sortCol.value) return data
  const dir = sortDir.value === 'asc' ? 1 : -1
  return data.sort((a, b) => {
    switch (sortCol.value) {
      case 'id': return dir * (a.id - b.id)
      case 'nombre': return dir * (a.nombre || '').localeCompare(b.nombre || '')
      case 'prediccion': return dir * (a.prediccion || '').localeCompare(b.prediccion || '')
      case 'origen': return dir * (a.origenDeteccion || '').localeCompare(b.origenDeteccion || '')
      case 'confianza': return dir * (a.porcentajeConfianza - b.porcentajeConfianza)
      case 'estado': return dir * a.estado.localeCompare(b.estado)
      case 'fuente': return dir * a._source.sourceName.localeCompare(b._source.sourceName)
      case 'revisadoPor': return dir * (a.revisadoPor || '').localeCompare(b.revisadoPor || '')
      default: return 0
    }
  })
})

const totalPages = computed(() => Math.ceil(sortedRecords.value.length / perPage) || 1)
const paginatedRecords = computed(() => sortedRecords.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))

watch([filterConfianza, filterEstado], () => { currentPage.value = 1 })

const stats = computed(() => {
  const records = validationStore.records
  return {
    pendientes: records.filter(r => r.estado === 'pendiente').length,
    confirmados: records.filter(r => r.estado === 'confirmado').length,
    rechazados: records.filter(r => r.estado === 'rechazado').length,
    indeterminados: records.filter(r => r.estado === 'indeterminado').length,
    pendientesConciliacion: records.filter(r => r.estado === 'pendiente_conciliacion').length,
  }
})

function confirmRecord(id: number) {
  validationStore.confirmRecord(id, 'Usuario actual')
}

function rejectRecord(id: number) {
  validationStore.rejectRecord(id, 'Usuario actual')
}

function markIndeterminate(id: number) {
  validationStore.markIndeterminate(id, 'Usuario actual')
}

function formatOrigen(origen: OrigenDeteccion) {
  const map: Record<OrigenDeteccion, string> = {
    satelital: 'Satelital',
    catastral: 'Catastral',
    reporte_ciudadano: 'Reporte ciudadano',
    ia_automatica: 'IA automática',
  }
  return map[origen] || origen
}

function origenBadgeClass(origen: OrigenDeteccion) {
  const map: Record<OrigenDeteccion, string> = {
    satelital: 'bg-secondary/10 text-secondary-dark',
    catastral: 'bg-primary-50 text-primary',
    reporte_ciudadano: 'bg-accent/10 text-accent-dark',
    ia_automatica: 'bg-eco/10 text-eco-dark',
  }
  return map[origen] || 'bg-gray-100 text-ink-muted'
}
</script>

<style scoped>
th.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
