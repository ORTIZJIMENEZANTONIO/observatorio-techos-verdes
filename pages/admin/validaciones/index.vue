<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const validationStore = useValidationStore()
const loading = ref(true)
const filterEstado = ref('')

onMounted(async () => {
  if (!validationStore.records.length) await validationStore.loadRecords()
  loading.value = false
})

const columns = [
  { key: 'id', label: 'ID', class: 'w-12' },
  { key: 'nombre', label: 'Edificio candidato' },
  { key: 'estado', label: 'Resultado' },
  { key: 'confianza', label: 'Confianza IA' },
  { key: 'porcentajeConfianza', label: '% conf.', class: 'text-right tabular-nums w-16' },
  { key: 'prediccion', label: 'Predicción IA' },
  { key: 'revisadoPor', label: 'Revisado por' },
  { key: 'fechaRevision', label: 'Fecha' },
]

const rows = computed(() => {
  let data = validationStore.records
  if (filterEstado.value) {
    data = data.filter((r: any) => r.estado === filterEstado.value)
  }
  return data.map((r: any) => ({
    id: r.id,
    nombre: r.nombre,
    prediccion: r.prediccion?.length > 50 ? r.prediccion.substring(0, 50) + '...' : (r.prediccion || '—'),
    confianza: r.confianza,
    porcentajeConfianza: r.porcentajeConfianza,
    estado: r.estado,
    revisadoPor: r.revisadoPor || '—',
    fechaRevision: r.fechaRevision || '—',
    _raw: r,
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
    </AdminDataTable>
  </div>
</template>
