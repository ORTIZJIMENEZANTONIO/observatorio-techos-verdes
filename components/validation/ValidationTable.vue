<template>
  <div>
    <!-- Desktop table -->
    <div class="table-container hidden md:block">
      <table class="table-base">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Predicción</th>
            <th>Confianza</th>
            <th>Estado</th>
            <th class="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in paginatedRecords" :key="record.id">
            <td class="font-mono text-xs text-slate-custom">
              {{ record.id.slice(0, 8) }}
            </td>
            <td>
              <div class="max-w-[200px]">
                <span class="block truncate text-sm font-medium text-ink">
                  {{ record.prediccion_ia }}
                </span>
                <span class="text-xs text-slate-custom">
                  {{ record.modelo_version }}
                </span>
              </div>
            </td>
            <td>
              <div class="flex items-center gap-1.5">
                <span
                  class="h-2 w-2 rounded-full"
                  :class="record.detalles.vegetacion_detectada ? 'bg-eco' : 'bg-gray-300'"
                />
                <span class="text-sm">
                  {{ record.detalles.vegetacion_detectada ? 'Vegetación detectada' : 'Sin vegetación' }}
                </span>
              </div>
              <span class="text-xs text-slate-custom">
                {{ record.detalles.porcentaje_cobertura }}% cobertura
              </span>
            </td>
            <td>
              <CommonConfidenceBadge
                :level="record.confianza"
                :percentage="Math.round(record.score * 100)"
              />
            </td>
            <td>
              <CommonStatusBadge :status="record.estado" size="sm" />
            </td>
            <td>
              <div class="flex items-center justify-end gap-1.5">
                <button
                  v-if="record.estado === 'pendiente'"
                  class="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary-100"
                  @click="$emit('confirm', record.id)"
                  title="Confirmar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Confirmar
                </button>
                <button
                  v-if="record.estado === 'pendiente'"
                  class="inline-flex items-center gap-1 rounded-lg bg-alert/10 px-2.5 py-1.5 text-xs font-medium text-alert transition-colors hover:bg-alert/20"
                  @click="$emit('reject', record.id)"
                  title="Rechazar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Rechazar
                </button>
                <button
                  v-if="record.estado === 'pendiente'"
                  class="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
                  @click="$emit('indeterminate', record.id)"
                  title="Indeterminado"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  N/D
                </button>
                <span v-if="record.estado !== 'pendiente'" class="text-xs text-slate-custom italic">
                  Procesado
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination (desktop) -->
    <div class="mt-4 hidden md:block">
      <CommonPaginationControls
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :total-items="records.length"
        :per-page="perPage"
      />
    </div>

    <!-- Mobile cards -->
    <div class="flex flex-col gap-3 md:hidden">
      <div
        v-for="record in paginatedRecords"
        :key="record.id"
        class="card p-4"
      >
        <!-- Header -->
        <div class="mb-3 flex items-start justify-between gap-2">
          <div>
            <span class="block text-sm font-semibold text-ink">{{ record.prediccion_ia }}</span>
            <span class="text-xs text-slate-custom">{{ record.modelo_version }}</span>
          </div>
          <CommonStatusBadge :status="record.estado" size="sm" />
        </div>

        <!-- Details -->
        <div class="mb-3 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-custom">Predicción</span>
            <div class="flex items-center gap-1.5">
              <span
                class="h-2 w-2 rounded-full"
                :class="record.detalles.vegetacion_detectada ? 'bg-eco' : 'bg-gray-300'"
              />
              <span class="font-medium text-ink">
                {{ record.detalles.vegetacion_detectada ? 'Vegetación' : 'Sin vegetación' }}
                ({{ record.detalles.porcentaje_cobertura }}%)
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-custom">Confianza</span>
            <CommonConfidenceBadge
              :level="record.confianza"
              :percentage="Math.round(record.score * 100)"
            />
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-custom">ID</span>
            <span class="font-mono text-ink">{{ record.id.slice(0, 8) }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div v-if="record.estado === 'pendiente'" class="flex gap-2 border-t border-gray-50 pt-3">
          <button
            class="flex-1 rounded-lg bg-primary-50 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary-100"
            @click="$emit('confirm', record.id)"
          >
            Confirmar
          </button>
          <button
            class="flex-1 rounded-lg bg-alert/10 py-2 text-xs font-medium text-alert transition-colors hover:bg-alert/20"
            @click="$emit('reject', record.id)"
          >
            Rechazar
          </button>
          <button
            class="flex-1 rounded-lg bg-gray-100 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
            @click="$emit('indeterminate', record.id)"
          >
            N/D
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination (mobile) -->
    <div class="mt-4 md:hidden">
      <CommonPaginationControls
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :total-items="records.length"
        :per-page="perPage"
      />
    </div>

    <!-- Empty state -->
    <CommonEmptyState
      v-if="records.length === 0"
      title="Sin registros de validación"
      description="No se encontraron registros de validación IA. Intenta ajustar los filtros de búsqueda."
      icon="data"
    />
  </div>
</template>

<script setup lang="ts">
import type { ValidationRecord } from '~/types'

interface Props {
  records: ValidationRecord[]
}

const props = defineProps<Props>()

defineEmits<{
  confirm: [id: string]
  reject: [id: string]
  indeterminate: [id: string]
}>()

const currentPage = ref(1)
const perPage = 15

const totalPages = computed(() => Math.ceil(props.records.length / perPage) || 1)
const paginatedRecords = computed(() => props.records.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))

watch(() => props.records, () => { currentPage.value = 1 })
</script>
