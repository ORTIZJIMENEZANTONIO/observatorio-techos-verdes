<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const validationStore = useValidationStore()
const toast = useToast()
const loading = ref(true)
const filterEstado = ref('')

onMounted(async () => {
  if (!validationStore.records.length) await validationStore.loadRecords()
  loading.value = false
})

const advVisibilidad = ref('')
const advArchivo = ref('')
const hasAdvFilters = computed(() => !!filterEstado.value || !!advVisibilidad.value || !!advArchivo.value)
function clearAdvFilters() { filterEstado.value = ''; advVisibilidad.value = ''; advArchivo.value = '' }

function toggleVisible(row: any) {
  const next = !(row.visible ?? true)
  validationStore.updateRecord(row.id, { visible: next })
  toast.success(next ? 'Validación visible' : 'Validación oculta', `#${row.id}`)
}
function toggleArchivado(row: any) {
  const next = !row.archivado
  validationStore.updateRecord(row.id, { archivado: next })
  toast.success(next ? 'Validación archivada' : 'Validación restaurada', `#${row.id}`)
}

import { GLOSSARY } from '~/data/admin-glossary'

const columns = [
  { key: 'id', label: 'ID', class: 'w-12' },
  { key: 'nombre', label: 'Edificio candidato', tooltip: GLOSSARY.validacion },
  { key: 'estado', label: 'Resultado' },
  { key: 'confianza', label: 'Confianza IA', tooltip: GLOSSARY.confianzaIA },
  { key: 'porcentajeConfianza', label: '% conf.', class: 'text-right tabular-nums w-16', align: 'right' as const, tooltip: GLOSSARY.porcentajeConfianza },
  { key: 'prediccion', label: 'Predicción IA', tooltip: GLOSSARY.gemini },
  { key: 'revisadoPor', label: 'Revisado por' },
  { key: 'fechaRevision', label: 'Fecha' },
  { key: 'visible', label: 'Visible', class: 'w-20 text-center', align: 'center' as const, tooltip: GLOSSARY.visible },
  { key: 'archivado', label: 'Archivado', class: 'w-20 text-center', align: 'center' as const, tooltip: GLOSSARY.archived },
]

const rows = computed(() => {
  let data = validationStore.records as any[]
  if (filterEstado.value) data = data.filter((r: any) => r.estado === filterEstado.value)
  if (advVisibilidad.value === 'visible') data = data.filter((r: any) => r.visible !== false)
  if (advVisibilidad.value === 'oculto') data = data.filter((r: any) => r.visible === false)
  if (advArchivo.value === 'activo') data = data.filter((r: any) => !r.archivado)
  if (advArchivo.value === 'archivado') data = data.filter((r: any) => r.archivado)
  return data.map((r: any) => ({
    id: r.id, nombre: r.nombre,
    prediccion: r.prediccion?.length > 50 ? r.prediccion.substring(0, 50) + '...' : (r.prediccion || '—'),
    confianza: r.confianza, porcentajeConfianza: r.porcentajeConfianza, estado: r.estado,
    revisadoPor: r.revisadoPor || '—', fechaRevision: r.fechaRevision || '—',
    visible: r.visible, archivado: r.archivado, _raw: r,
  }))
})

const estadoOptions = ['pendiente', 'confirmado', 'rechazado', 'indeterminado', 'pendiente_reconciliacion']
const estadoLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  rechazado: 'Rechazado',
  indeterminado: 'Indeterminado',
  pendiente_reconciliacion: 'Reconciliación',
}

// Stats
const stats = computed(() => {
  const r = validationStore.records
  return {
    total: r.length,
    pendientes: r.filter((v: any) => v.estado === 'pendiente').length,
    confirmados: r.filter((v: any) => v.estado === 'confirmado').length,
    rechazados: r.filter((v: any) => v.estado === 'rechazado').length,
  }
})

function handleEdit(row: any) {
  console.log('Edit validation:', row.id)
}

function handleDelete(row: any) {
  if (confirm(`¿Eliminar validación #${row.id}?`)) {
    console.log('Delete validation:', row.id)
  }
}
</script>

<template>
  <div>
    <AdminPipelineBanner
      current-step="validacion"
      description="Registros de validación técnica (IA con Gemini Vision y revisión manual) sobre los candidatos. Confirma o rechaza la viabilidad de cada sitio para techo verde."
    />

    <div class="mb-6">
      <h2 class="text-xl font-semibold text-ink sm:text-2xl">Validaciones</h2>
      <p class="mt-1 text-sm text-slate-custom">Control de calidad: revisión IA y manual de candidatos antes de implementación</p>
    </div>

    <!-- Stats -->
    <div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="rounded-lg border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Total</p>
        <p class="text-lg font-bold tabular-nums text-ink">{{ stats.total }}</p>
      </div>
      <div class="rounded-lg border-l-4 border-l-yellow-400 border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Pendientes</p>
        <p class="text-lg font-bold tabular-nums text-yellow-700">{{ stats.pendientes }}</p>
      </div>
      <div class="rounded-lg border-l-4 border-l-green-400 border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Confirmados</p>
        <p class="text-lg font-bold tabular-nums text-green-700">{{ stats.confirmados }}</p>
      </div>
      <div class="rounded-lg border-l-4 border-l-red-400 border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Rechazados</p>
        <p class="text-lg font-bold tabular-nums text-red-700">{{ stats.rechazados }}</p>
      </div>
    </div>

    <!-- Filter by estado -->
    <div class="mb-4 flex flex-wrap gap-2">
      <button
        class="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
        :class="!filterEstado ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="filterEstado = ''"
      >
        Todos ({{ stats.total }})
      </button>
      <button
        v-for="est in estadoOptions"
        :key="est"
        class="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
        :class="filterEstado === est ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="filterEstado = est"
      >
        {{ estadoLabel[est] || est }}
      </button>
    </div>

    <AdminDataTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      search-placeholder="Buscar por edificio o revisor..."
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #filters>
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <select v-model="advVisibilidad" class="select !py-1.5 text-xs max-w-[140px]">
            <option value="">Visibilidad: todos</option>
            <option value="visible">Solo visibles</option>
            <option value="oculto">Solo ocultos</option>
          </select>
          <select v-model="advArchivo" class="select !py-1.5 text-xs max-w-[140px]">
            <option value="">Archivo: todos</option>
            <option value="activo">Solo activos</option>
            <option value="archivado">Solo archivados</option>
          </select>
          <button v-if="hasAdvFilters" @click="clearAdvFilters" class="btn-ghost !py-1 text-xs">Limpiar filtros</button>
        </div>
      </template>
      <template #cell-estado="{ value }">
        <span
          class="rounded px-2 py-0.5 text-xs font-medium"
          :class="{
            'bg-green-100 text-green-800': value === 'confirmado',
            'bg-yellow-100 text-yellow-800': value === 'pendiente',
            'bg-red-100 text-red-800': value === 'rechazado',
            'bg-purple-100 text-purple-800': value === 'pendiente_reconciliacion',
            'bg-gray-100 text-gray-700': value === 'indeterminado',
          }"
        >
          {{ estadoLabel[value] || value }}
        </span>
      </template>
      <template #cell-confianza="{ value }">
        <span
          v-if="value"
          class="inline-flex items-center gap-1 text-xs font-medium"
          :class="{ 'text-green-700': value === 'alta', 'text-yellow-700': value === 'media', 'text-red-600': value === 'baja' }"
        >
          <span class="h-2 w-2 rounded-full" :class="{ 'bg-green-500': value === 'alta', 'bg-yellow-500': value === 'media', 'bg-red-500': value === 'baja' }" />
          {{ value }}
        </span>
        <span v-else class="text-xs text-gray-400">—</span>
      </template>
      <template #cell-porcentajeConfianza="{ value }">
        <span v-if="value != null" class="tabular-nums">{{ value }}%</span>
        <span v-else class="text-gray-400">—</span>
      </template>
      <template #cell-prediccion="{ value }">
        <span class="text-xs text-slate-custom" :title="value">{{ value }}</span>
      </template>
      <template #cell-visible="{ row }">
        <button @click.stop="toggleVisible(row)" class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors" :class="(row.visible ?? true) ? 'text-eco hover:bg-eco/10' : 'text-gray-300 hover:bg-gray-100'">
          <svg v-if="row.visible ?? true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
        </button>
      </template>
      <template #cell-archivado="{ row }">
        <button @click.stop="toggleArchivado(row)" class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors" :class="row.archivado ? 'text-accent hover:bg-accent/10' : 'text-gray-300 hover:bg-gray-100'">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        </button>
      </template>
    </AdminDataTable>
  </div>
</template>
