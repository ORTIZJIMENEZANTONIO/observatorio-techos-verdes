<script setup lang="ts">
interface Column {
  key: string
  label: string
  class?: string
}

const props = defineProps<{
  columns: Column[]
  rows: any[]
  loading?: boolean
  searchPlaceholder?: string
}>()

const emit = defineEmits<{
  edit: [row: any]
  delete: [row: any]
}>()

const search = ref('')
const currentPage = ref(1)
const perPage = 15

const filtered = computed(() => {
  if (!search.value) return props.rows
  const q = search.value.toLowerCase()
  return props.rows.filter(row =>
    props.columns.some(col => {
      const val = row[col.key]
      return val && String(val).toLowerCase().includes(q)
    })
  )
})

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage) || 1)
const paginated = computed(() => filtered.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))

watch([search, () => props.rows], () => { currentPage.value = 1 })
</script>

<template>
  <div>
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <div class="relative w-full sm:max-w-xs sm:flex-1">
        <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="search"
          type="text"
          :placeholder="searchPlaceholder || 'Buscar...'"
          class="input w-full pl-9 transition-shadow duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-slate-custom">
        <span class="tabular-nums font-semibold text-ink">{{ filtered.length }}</span>
        <span>{{ filtered.length === 1 ? 'registro' : 'registros' }}</span>
      </span>
    </div>

    <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-lg border border-gray-200">
      <table class="table-base w-full min-w-[640px]">
        <thead>
          <tr class="bg-gray-50">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              :class="col.class"
            >
              {{ col.label }}
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="loading">
            <td :colspan="columns.length + 1" class="px-4 py-12 text-center">
              <div class="flex flex-col items-center gap-3">
                <svg class="h-8 w-8 animate-spin text-primary/40" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span class="text-sm text-gray-400">Cargando registros...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="filtered.length === 0">
            <td :colspan="columns.length + 1" class="px-4 py-12 text-center">
              <div class="flex flex-col items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Sin resultados</p>
                  <p v-if="search" class="mt-0.5 text-xs text-gray-400">Intenta con otro termino de busqueda</p>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-for="row in paginated"
            :key="row.id"
            class="group transition-colors duration-150 hover:bg-primary-50/30"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-sm text-ink"
              :class="col.class"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] ?? '—' }}
              </slot>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1 opacity-100 sm:opacity-60 transition-opacity duration-150 group-hover:opacity-100">
                <button
                  class="rounded-md p-2.5 sm:p-1.5 text-gray-400 transition-all duration-150 hover:bg-primary-50 hover:text-primary hover:shadow-sm"
                  title="Editar"
                  @click="emit('edit', row)"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  class="rounded-md p-2.5 sm:p-1.5 text-gray-400 transition-all duration-150 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
                  title="Eliminar"
                  @click="emit('delete', row)"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4">
      <CommonPaginationControls
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filtered.length"
        :per-page="perPage"
      />
    </div>
  </div>
</template>
