<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const store = useRoofsStore()
const loading = ref(true)

onMounted(async () => {
  if (!store.candidateRoofs.length) await store.loadRoofs()
  loading.value = false
})

const columns = [
  { key: 'id', label: 'ID', class: 'w-12' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'alcaldia', label: 'Alcaldía' },
  { key: 'tipoEdificio', label: 'Tipo' },
  { key: 'scoreAptitud', label: 'Score AHP', class: 'text-right tabular-nums' },
  { key: 'superficie', label: 'm²', class: 'text-right tabular-nums' },
  { key: 'estatus', label: 'Estatus' },
  { key: 'confianzaIA', label: 'Confianza' },
  { key: 'fechaPriorizacion', label: 'Priorizado' },
]

const rows = computed(() =>
  store.candidateRoofs.map((r: any) => ({
    id: r.id,
    nombre: r.nombre,
    alcaldia: r.alcaldia,
    tipoEdificio: r.tipoEdificio,
    scoreAptitud: r.scoreAptitud,
    superficie: r.superficie,
    estatus: r.estatus,
    confianzaIA: r.confianzaIA,
    fechaPriorizacion: r.fechaPriorizacion || '—',
    _raw: r,
  }))
)

const estatusLabel: Record<string, string> = {
  candidato: 'Candidato',
  validado_visualmente: 'Validado visual',
  factibilidad_pendiente: 'Factib. pendiente',
  piloto: 'Piloto',
  implementado: 'Implementado',
}

function handleEdit(row: any) {
  console.log('Edit candidate:', row.id)
}

function handleDelete(row: any) {
  if (confirm(`¿Eliminar candidato "${row.nombre}"?`)) {
    console.log('Delete candidate:', row.id)
  }
}
</script>

<template>
  <div>
    <AdminPipelineBanner
      current-step="candidatos"
      description="Sitios aprobados del detector + candidatos priorizados por análisis multicriterio (AHP, 8 variables). Pendientes de validación técnica antes de implementación."
    />

    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-ink sm:text-2xl">Candidatos</h2>
        <p class="mt-1 text-sm text-slate-custom">{{ rows.length }} sitios priorizados — score AHP de 0 a 100 basado en 8 variables ambientales</p>
      </div>
      <button class="btn-primary flex-shrink-0">+ Agregar</button>
    </div>

    <!-- Summary stats -->
    <div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="rounded-lg border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Score promedio</p>
        <p class="text-lg font-bold tabular-nums text-primary">
          {{ rows.length ? (rows.reduce((s: number, r: any) => s + (r.scoreAptitud || 0), 0) / rows.length).toFixed(1) : '—' }}
        </p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Score >= 70</p>
        <p class="text-lg font-bold tabular-nums text-eco">{{ rows.filter((r: any) => r.scoreAptitud >= 70).length }}</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Superficie total</p>
        <p class="text-lg font-bold tabular-nums text-ink">{{ rows.reduce((s: number, r: any) => s + (r.superficie || 0), 0).toLocaleString('es-MX') }} m²</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-3">
        <p class="text-xs text-slate-custom">Confianza alta</p>
        <p class="text-lg font-bold tabular-nums text-secondary">{{ rows.filter((r: any) => r.confianzaIA === 'alta').length }}</p>
      </div>
    </div>

    <AdminDataTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      search-placeholder="Buscar candidato..."
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-scoreAptitud="{ value }">
        <div class="flex items-center gap-2">
          <div class="h-2 w-12 overflow-hidden rounded-full bg-gray-200">
            <div
              class="h-full rounded-full"
              :class="value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-400'"
              :style="{ width: `${value}%` }"
            />
          </div>
          <span class="font-semibold tabular-nums" :class="value >= 70 ? 'text-eco' : value >= 40 ? 'text-accent' : 'text-alert'">
            {{ value }}
          </span>
        </div>
      </template>
      <template #cell-superficie="{ value }">
        {{ value ? Number(value).toLocaleString('es-MX') : '—' }}
      </template>
      <template #cell-estatus="{ value }">
        <span
          class="rounded px-2 py-0.5 text-xs font-medium"
          :class="{
            'bg-blue-100 text-blue-800': value === 'candidato',
            'bg-cyan-100 text-cyan-800': value === 'validado_visualmente',
            'bg-yellow-100 text-yellow-800': value === 'factibilidad_pendiente',
            'bg-purple-100 text-purple-800': value === 'piloto',
            'bg-green-100 text-green-800': value === 'implementado',
          }"
        >
          {{ estatusLabel[value] || value }}
        </span>
      </template>
      <template #cell-confianzaIA="{ value }">
        <span
          v-if="value"
          class="rounded px-2 py-0.5 text-xs font-medium"
          :class="{
            'bg-green-50 text-green-700': value === 'alta',
            'bg-yellow-50 text-yellow-700': value === 'media',
            'bg-red-50 text-red-700': value === 'baja',
          }"
        >
          {{ value }}
        </span>
        <span v-else class="text-xs text-gray-400">—</span>
      </template>
    </AdminDataTable>
  </div>
</template>
