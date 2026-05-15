<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const store = useRoofsStore()
const toast = useToast()
const loading = ref(true)

onMounted(async () => {
  if (!store.greenRoofs.length) await store.loadRoofs()
  loading.value = false
})

// ── Advanced filters ──
const advFilter = reactive({ alcaldia: '', tipoEdificio: '', tipoTechoVerde: '', estado: '', visibilidad: '', archivo: '' })
const hasAdvFilters = computed(() => Object.values(advFilter).some(v => !!v))
function clearAdvFilters() { Object.assign(advFilter, { alcaldia: '', tipoEdificio: '', tipoTechoVerde: '', estado: '', visibilidad: '', archivo: '' }) }

import { GLOSSARY } from '~/data/admin-glossary'

const columns = [
  { key: 'id', label: 'ID', class: 'w-16' },
  { key: 'nombre', label: 'Nombre', tooltip: GLOSSARY.techoVerde },
  { key: 'alcaldia', label: 'Alcaldía', tooltip: GLOSSARY.alcaldia },
  { key: 'tipoEdificio', label: 'Tipo edificio' },
  { key: 'tipoTechoVerde', label: 'Tipo techo', tooltip: 'Sistema: extensivo (capa fina, bajo mantenimiento), semi-intensivo o intensivo (capa gruesa, requiere refuerzo estructural).' },
  { key: 'superficie', label: 'm²', class: 'text-right tabular-nums', align: 'right' as const },
  { key: 'estado', label: 'Estado' },
  { key: 'fechaRegistro', label: 'Fecha' },
  { key: 'visible', label: 'Visible', class: 'w-20 text-center', align: 'center' as const, tooltip: GLOSSARY.visible },
  { key: 'archivado', label: 'Archivado', class: 'w-20 text-center', align: 'center' as const, tooltip: GLOSSARY.archived },
]

function toggleVisible(row: any) {
  const newVal = !(row.visible ?? true)
  store.updateGreenRoof(row.id, { visible: newVal })
  toast.success(
    newVal ? 'Techo visible en el sitio público' : 'Techo oculto del sitio público',
    `${row.nombre || 'Sin nombre'} (#${row.id})`,
  )
}
function toggleArchivado(row: any) {
  const next = !row.archivado
  store.updateGreenRoof(row.id, { archivado: next })
  toast.success(
    next ? 'Techo archivado' : 'Techo restaurado',
    `${row.nombre || 'Sin nombre'} (#${row.id})`,
  )
}

const rows = computed(() =>
  store.greenRoofs.filter((r: any) => {
    if (advFilter.alcaldia && r.alcaldia !== advFilter.alcaldia) return false
    if (advFilter.tipoEdificio && r.tipoEdificio !== advFilter.tipoEdificio) return false
    if (advFilter.tipoTechoVerde && r.tipoTechoVerde !== advFilter.tipoTechoVerde) return false
    if (advFilter.estado && r.estado !== advFilter.estado) return false
    if (advFilter.visibilidad === 'visible' && r.visible === false) return false
    if (advFilter.visibilidad === 'oculto' && r.visible !== false) return false
    if (advFilter.archivo === 'activo' && r.archivado) return false
    if (advFilter.archivo === 'archivado' && !r.archivado) return false
    return true
  }).map((r: any) => ({
    id: r.id,
    nombre: r.nombre,
    alcaldia: r.alcaldia,
    tipoEdificio: r.tipoEdificio,
    tipoTechoVerde: r.tipoTechoVerde,
    superficie: r.superficie,
    estado: r.estado,
    fechaRegistro: r.fechaRegistro || '—',
    visible: r.visible,
    archivado: r.archivado,
    _raw: r,
  }))
)

// ── Form ──
const showForm = ref(false)
const editingId = ref<number | null>(null)
const form = reactive({
  nombre: '', alcaldia: '', direccion: '', tipoEdificio: '',
  tipoTechoVerde: 'extensivo', superficie: null as number | null,
  estado: 'activo', lat: 19.4326, lng: -99.1332, imagen: '', descripcion: '',
})

function resetForm() {
  Object.assign(form, {
    nombre: '', alcaldia: '', direccion: '', tipoEdificio: '',
    tipoTechoVerde: 'extensivo', superficie: null,
    estado: 'activo', lat: 19.4326, lng: -99.1332, imagen: '', descripcion: '',
  })
  editingId.value = null
}

function openCreate() { resetForm(); showForm.value = true }

function handleEdit(row: any) {
  const r = row._raw || row
  editingId.value = r.id
  Object.assign(form, {
    nombre: r.nombre || '', alcaldia: r.alcaldia || '', direccion: r.direccion || '',
    tipoEdificio: r.tipoEdificio || '', tipoTechoVerde: r.tipoTechoVerde || 'extensivo',
    superficie: r.superficie, estado: r.estado || 'activo',
    lat: r.lat ?? 19.4326, lng: r.lng ?? -99.1332,
    imagen: r.imagen || '', descripcion: r.descripcion || '',
  })
  showForm.value = true
}

function handleDelete(row: any) {
  if (confirm(`¿Eliminar "${row.nombre}" del inventario?`)) {
    console.log('Delete:', row.id)
  }
}

const tipoTechoLabel: Record<string, string> = {
  extensivo: 'Extensivo', intensivo: 'Intensivo', 'semi-intensivo': 'Semi-intensivo',
}
</script>

<template>
  <div>
    <AdminPipelineBanner
      current-step="inventario"
      description="Techos verdes existentes e implementados en la CDMX. Estos son los que se muestran en el mapa público del observatorio."
    />

    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-ink sm:text-2xl">Inventario de techos verdes</h2>
        <p class="mt-1 text-sm text-slate-custom">{{ rows.length }} techos verdes implementados — visibles en el mapa público</p>
      </div>
      <button class="btn-primary flex-shrink-0" @click="openCreate">+ Agregar</button>
    </div>

    <AdminDataTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      search-placeholder="Buscar por nombre, alcaldía..."
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #filters>
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <select v-model="advFilter.tipoTechoVerde" class="select !py-1.5 text-xs max-w-[180px]">
            <option value="">Todos los tipos</option>
            <option value="extensivo">Extensivo</option>
            <option value="intensivo">Intensivo</option>
            <option value="semi-intensivo">Semi-intensivo</option>
          </select>
          <select v-model="advFilter.estado" class="select !py-1.5 text-xs max-w-[160px]">
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="en_mantenimiento">En mantenimiento</option>
            <option value="inactivo">Inactivo</option>
            <option value="nuevo">Nuevo</option>
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
      <template #cell-tipoTechoVerde="{ value }">
        <span class="rounded bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary">
          {{ tipoTechoLabel[value] || value }}
        </span>
      </template>
      <template #cell-estado="{ value }">
        <span
          class="rounded px-2 py-0.5 text-xs font-medium"
          :class="{
            'bg-green-100 text-green-800': value === 'activo',
            'bg-yellow-100 text-yellow-800': value === 'mantenimiento',
            'bg-red-100 text-red-800': value === 'inactivo',
            'bg-blue-100 text-blue-800': value === 'nuevo',
          }"
        >
          {{ value }}
        </span>
      </template>
      <template #cell-superficie="{ value }">
        {{ value ? Number(value).toLocaleString('es-MX') : '—' }}
      </template>
      <template #cell-visible="{ row }">
        <button @click.stop="toggleVisible(row)" class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors" :class="(row.visible ?? true) ? 'text-eco hover:bg-eco/10' : 'text-gray-300 hover:bg-gray-100'" :title="(row.visible ?? true) ? 'Visible — clic para ocultar' : 'Oculto — clic para mostrar'">
          <svg v-if="row.visible ?? true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
        </button>
      </template>
      <template #cell-archivado="{ row }">
        <button @click.stop="toggleArchivado(row)" class="mx-auto flex h-7 w-7 items-center justify-center rounded-lg transition-colors" :class="row.archivado ? 'text-accent hover:bg-accent/10' : 'text-gray-300 hover:bg-gray-100'" :title="row.archivado ? 'Archivado — clic para restaurar' : 'Activo — clic para archivar'">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        </button>
      </template>
    </AdminDataTable>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" @click.self="showForm = false">
          <div class="card max-h-[90vh] w-full max-w-lg animate-scale-in overflow-y-auto p-5 shadow-panel sm:p-6">
            <h3 class="mb-4 text-lg font-semibold text-ink">
              {{ editingId ? 'Editar techo verde' : 'Agregar al inventario' }}
            </h3>
            <form class="space-y-3" @submit.prevent="showForm = false">
              <div>
                <label class="mb-1 block text-sm font-medium text-ink">Nombre *</label>
                <input v-model="form.nombre" class="input w-full" required />
              </div>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink">Alcaldía *</label>
                  <input v-model="form.alcaldia" class="input w-full" required />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink">Tipo edificio *</label>
                  <input v-model="form.tipoEdificio" class="input w-full" required />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink">Tipo techo verde *</label>
                  <select v-model="form.tipoTechoVerde" class="select w-full">
                    <option value="extensivo">Extensivo</option>
                    <option value="intensivo">Intensivo</option>
                    <option value="semi-intensivo">Semi-intensivo</option>
                  </select>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink">Superficie (m²) *</label>
                  <input v-model.number="form.superficie" class="input w-full" type="number" required />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink">Latitud</label>
                  <input v-model.number="form.lat" class="input w-full" type="number" step="any" />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-ink">Longitud</label>
                  <input v-model.number="form.lng" class="input w-full" type="number" step="any" />
                </div>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-ink">Estado</label>
                <select v-model="form.estado" class="select w-full">
                  <option value="activo">Activo</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="nuevo">Nuevo</option>
                </select>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-ink">Dirección</label>
                <input v-model="form.direccion" class="input w-full" />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-ink">Descripción</label>
                <textarea v-model="form.descripcion" class="input w-full" rows="2" />
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button type="button" class="btn-ghost" @click="showForm = false">Cancelar</button>
                <button type="submit" class="btn-primary">{{ editingId ? 'Actualizar' : 'Crear' }}</button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
