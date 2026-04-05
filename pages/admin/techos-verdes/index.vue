<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin', ssr: false })

const store = useRoofsStore()
const loading = ref(true)

onMounted(async () => {
  if (!store.greenRoofs.length) await store.loadRoofs()
  loading.value = false
})

const columns = [
  { key: 'id', label: 'ID', class: 'w-16' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'alcaldia', label: 'Alcaldía' },
  { key: 'tipoEdificio', label: 'Tipo edificio' },
  { key: 'tipoTechoVerde', label: 'Tipo techo' },
  { key: 'superficie', label: 'm²', class: 'text-right tabular-nums' },
  { key: 'estado', label: 'Estado' },
  { key: 'fechaRegistro', label: 'Fecha' },
]

const rows = computed(() =>
  store.greenRoofs.map((r: any) => ({
    id: r.id,
    nombre: r.nombre,
    alcaldia: r.alcaldia,
    tipoEdificio: r.tipoEdificio,
    tipoTechoVerde: r.tipoTechoVerde,
    superficie: r.superficie,
    estado: r.estado,
    fechaRegistro: r.fechaRegistro || '—',
    // keep full object for edit
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
