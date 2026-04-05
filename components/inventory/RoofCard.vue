<template>
  <article
    class="card-interactive flex flex-col overflow-hidden"
    @click="$emit('select', roof)"
  >
    <!-- Top colored accent bar -->
    <div class="h-1 w-full bg-gradient-to-r from-primary to-eco" />

    <div class="flex flex-1 flex-col gap-3 p-5">
      <!-- Header: name + alcaldía -->
      <div>
        <h3 class="text-sm font-semibold text-ink leading-snug">
          {{ roof.nombre }}
        </h3>
        <p class="mt-0.5 flex items-center gap-1 text-xs text-slate-custom">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ roof.alcaldia }}
        </p>
      </div>

      <!-- Badges row -->
      <div class="flex flex-wrap gap-1.5">
        <span class="badge-primary text-[10px]">
          {{ tipoEdificioLabel }}
        </span>
        <span class="badge-eco text-[10px]">
          {{ tipoTechoVerdeLabel }}
        </span>
      </div>

      <!-- Stats -->
      <div class="mt-auto grid grid-cols-2 gap-3 border-t border-gray-50 pt-3">
        <div>
          <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-custom/70">
            Superficie
          </span>
          <span class="text-sm font-semibold tabular-nums text-ink">
            {{ roof.superficie.toLocaleString('es-MX') }} m²
          </span>
        </div>
        <div class="flex items-end justify-end">
          <CommonStatusBadge :status="roof.estado" size="sm" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { GreenRoof } from '~/types'

interface Props {
  roof: GreenRoof
}

const props = defineProps<Props>()

defineEmits<{
  select: [roof: GreenRoof]
}>()

const tipoEdificioLabels: Record<string, string> = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  industrial: 'Industrial',
  gubernamental: 'Gubernamental',
  educativo: 'Educativo',
  salud: 'Salud',
  mixto: 'Mixto',
}

const tipoTechoVerdeLabels: Record<string, string> = {
  extensivo: 'Extensivo',
  intensivo: 'Intensivo',
  'semi-intensivo': 'Semi-intensivo',
  productivo: 'Productivo',
  biodiverso: 'Biodiverso',
}

const tipoEdificioLabel = computed(() => tipoEdificioLabels[props.roof.tipoEdificio] || props.roof.tipoEdificio)
const tipoTechoVerdeLabel = computed(() => tipoTechoVerdeLabels[props.roof.tipoTechoVerde] || props.roof.tipoTechoVerde)
</script>
