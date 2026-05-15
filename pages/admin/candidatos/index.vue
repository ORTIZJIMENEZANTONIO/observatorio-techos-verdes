<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const store = useRoofsStore()
const toast = useToast()
const loading = ref(true)

onMounted(async () => {
  if (!store.candidateRoofs.length) await store.loadRoofs()
  loading.value = false
})

const advFilter = reactive({ estatus: '', confianzaIA: '', visibilidad: '', archivo: '' })
const hasAdvFilters = computed(() => Object.values(advFilter).some(v => !!v))
function clearAdvFilters() { Object.assign(advFilter, { estatus: '', confianzaIA: '', visibilidad: '', archivo: '' }) }

function toggleVisible(row: any) {
  const next = !(row.visible ?? true)
  store.updateCandidate(row.id, { visible: next })
  toast.success(
    next ? 'Candidato visible' : 'Candidato oculto',
    `${row.nombre || 'Sin nombre'} (#${row.id})`,
  )
}
function toggleArchivado(row: any) {
  const next = !row.archivado
  store.updateCandidate(row.id, { archivado: next })
  toast.success(
    next ? 'Candidato archivado' : 'Candidato restaurado',
    `${row.nombre || 'Sin nombre'} (#${row.id})`,
  )
}

import { GLOSSARY } from '~/data/admin-glossary'

const columns = [
  { key: 'id', label: 'ID', class: 'w-12' },
  { key: 'nombre', label: 'Nombre', tooltip: GLOSSARY.candidato },
  { key: 'alcaldia', label: 'Alcaldía', tooltip: GLOSSARY.alcaldia },
  { key: 'tipoEdificio', label: 'Tipo' },
  { key: 'scoreAptitud', label: 'Score AHP', class: 'text-right tabular-nums', align: 'right' as const, tooltip: GLOSSARY.scoreAptitud },
  { key: 'superficie', label: 'm²', class: 'text-right tabular-nums', align: 'right' as const },
  { key: 'estatus', label: 'Estatus', tooltip: GLOSSARY.estatus },
  { key: 'confianzaIA', label: 'Confianza', tooltip: GLOSSARY.confianzaIA },
  { key: 'fechaPriorizacion', label: 'Priorizado' },
  { key: 'visible', label: 'Visible', class: 'w-20 text-center', align: 'center' as const, tooltip: GLOSSARY.visible },
  { key: 'archivado', label: 'Archivado', class: 'w-20 text-center', align: 'center' as const, tooltip: GLOSSARY.archived },
]

const rows = computed(() =>
  store.candidateRoofs.filter((r: any) => {
    if (advFilter.estatus && r.estatus !== advFilter.estatus) return false
    if (advFilter.confianzaIA && r.confianzaIA !== advFilter.confianzaIA) return false
    if (advFilter.visibilidad === 'visible' && r.visible === false) return false
    if (advFilter.visibilidad === 'oculto' && r.visible !== false) return false
    if (advFilter.archivo === 'activo' && r.archivado) return false
    if (advFilter.archivo === 'archivado' && !r.archivado) return false
    return true
  }).map((r: any) => ({
    id: r.id, nombre: r.nombre, alcaldia: r.alcaldia, tipoEdificio: r.tipoEdificio,
    scoreAptitud: r.scoreAptitud, superficie: r.superficie, estatus: r.estatus,
    confianzaIA: r.confianzaIA, fechaPriorizacion: r.fechaPriorizacion || '—',
    visible: r.visible, archivado: r.archivado, _raw: r,
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
      <template #filters>
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <select v-model="advFilter.estatus" class="select !py-1.5 text-xs max-w-[180px]">
            <option value="">Todos los estatus</option>
            <option value="candidato">Candidato</option>
            <option value="validado_visualmente">Validado visual</option>
            <option value="factibilidad_pendiente">Factib. pendiente</option>
            <option value="piloto">Piloto</option>
            <option value="implementado">Implementado</option>
          </select>
          <select v-model="advFilter.confianzaIA" class="select !py-1.5 text-xs max-w-[140px]">
            <option value="">Confianza: todos</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <select v-model="advFilter.visibilidad" class="select !py-1.5 text-xs max-w-[140px]">
            <option value="">Visibilidad: todos</option>
            <option value="visible">Solo visibles</option>
            <option value="oculto">Solo ocultos</option>
          </select>
          <select v-model="advFilter.archivo" class="select !py-1.5 text-xs max-w-[140px]">
            <option value="">Archivo: todos</option>
            <option value="activo">Solo activos</option>
            <option value="archivado">Solo archivados</option>
          </select>
          <button v-if="hasAdvFilters" @click="clearAdvFilters" class="btn-ghost !py-1 text-xs">Limpiar filtros</button>
        </div>
      </template>
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
