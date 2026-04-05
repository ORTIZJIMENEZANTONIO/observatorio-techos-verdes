<template>
  <aside class="flex flex-col gap-5 rounded-card bg-white p-5 shadow-panel">
    <h3 class="flex items-center gap-2 text-sm font-semibold text-ink">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      Filtros del mapa
    </h3>

    <!-- Alcaldía -->
    <div>
      <label class="mb-1.5 block text-xs font-medium text-slate-custom">Alcaldía</label>
      <select v-model="filters.alcaldia" class="select" @change="emitFilters">
        <option :value="null">Todas las alcaldías</option>
        <option v-for="a in alcaldias" :key="a" :value="a">{{ a }}</option>
      </select>
    </div>

    <!-- Tipo de edificio -->
    <div>
      <label class="mb-1.5 block text-xs font-medium text-slate-custom">Tipo de edificio</label>
      <select v-model="filters.tipoEdificio" class="select" @change="emitFilters">
        <option :value="null">Todos los tipos</option>
        <option v-for="t in tiposEdificio" :key="t.value" :value="t.value">{{ t.label }}</option>
      </select>
    </div>

    <!-- Estatus -->
    <div>
      <label class="mb-1.5 block text-xs font-medium text-slate-custom">Estatus</label>
      <select v-model="filters.estatus" class="select" @change="emitFilters">
        <option :value="null">Todos los estatus</option>
        <option v-for="s in estatuses" :key="s.value" :value="s.value">{{ s.label }}</option>
      </select>
    </div>

    <!-- Nivel de aptitud -->
    <div>
      <label class="mb-1.5 block text-xs font-medium text-slate-custom">Nivel de aptitud</label>
      <select v-model="filters.nivelAptitud" class="select" @change="emitFilters">
        <option :value="null">Todos los niveles</option>
        <option value="muy_alta">Muy alta</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
        <option value="muy_baja">Muy baja</option>
      </select>
    </div>

    <!-- Divider -->
    <hr class="border-gray-100" />

    <!-- Layer toggles -->
    <div>
      <label class="mb-2 block text-xs font-medium text-slate-custom">Capas visibles</label>
      <div class="flex flex-col gap-2">
        <label
          v-for="layer in layers"
          :key="layer.id"
          class="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-surface"
        >
          <input
            type="checkbox"
            v-model="layer.active"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
            @change="emitFilters"
          />
          <span class="h-2.5 w-2.5 rounded-full" :class="layer.dotColor" />
          <span class="text-sm font-medium text-ink">{{ layer.label }}</span>
        </label>
      </div>
    </div>

    <!-- Divider -->
    <hr class="border-gray-100" />

    <!-- Clear filters -->
    <button
      class="btn-ghost btn-sm justify-center text-slate-custom"
      @click="clearFilters"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
      Limpiar filtros
    </button>
  </aside>
</template>

<script setup lang="ts">
interface FilterState {
  alcaldia: string | null
  tipoEdificio: string | null
  estatus: string | null
  nivelAptitud: string | null
  capas: {
    existentes: boolean
    candidatos: boolean
    aptitud: boolean
  }
}

const emit = defineEmits<{
  'update:filters': [filters: FilterState]
}>()

const alcaldias = [
  'Alvaro Obregon',
  'Azcapotzalco',
  'Benito Juarez',
  'Coyoacan',
  'Cuajimalpa de Morelos',
  'Cuauhtemoc',
  'Gustavo A. Madero',
  'Iztacalco',
  'Iztapalapa',
  'La Magdalena Contreras',
  'Miguel Hidalgo',
  'Milpa Alta',
  'Tlahuac',
  'Tlalpan',
  'Venustiano Carranza',
  'Xochimilco',
]

const tiposEdificio = [
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'gubernamental', label: 'Gubernamental' },
  { value: 'educativo', label: 'Educativo' },
  { value: 'salud', label: 'Salud' },
  { value: 'mixto', label: 'Mixto' },
]

const estatuses = [
  { value: 'activo', label: 'Activo' },
  { value: 'en_construccion', label: 'En construcción' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'inactivo', label: 'Inactivo' },
  { value: 'propuesto', label: 'Propuesto' },
]

const filters = reactive({
  alcaldia: null as string | null,
  tipoEdificio: null as string | null,
  estatus: null as string | null,
  nivelAptitud: null as string | null,
})

const layers = reactive([
  { id: 'existentes', label: 'Existentes', dotColor: 'bg-primary', active: true },
  { id: 'candidatos', label: 'Candidatos', dotColor: 'bg-accent', active: true },
  { id: 'aptitud', label: 'Aptitud', dotColor: 'bg-eco', active: false },
])

function emitFilters() {
  emit('update:filters', {
    ...filters,
    capas: {
      existentes: layers[0].active,
      candidatos: layers[1].active,
      aptitud: layers[2].active,
    },
  })
}

function clearFilters() {
  filters.alcaldia = null
  filters.tipoEdificio = null
  filters.estatus = null
  filters.nivelAptitud = null
  layers[0].active = true
  layers[1].active = true
  layers[2].active = false
  emitFilters()
}
</script>
