<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="drawer-overlay">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer-slide">
      <div
        v-if="open && roof"
        class="fixed right-0 top-0 z-[101] flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 class="text-base font-semibold text-ink">Detalle del techo</h2>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"
            @click="$emit('close')"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Top accent -->
          <div class="h-1.5 bg-gradient-to-r from-primary via-eco to-secondary" />

          <div class="p-6">
            <!-- Title -->
            <div class="mb-6">
              <h3 class="text-xl font-bold text-ink">{{ roof.nombre }}</h3>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-custom">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ roof.direccion }}
              </p>
            </div>

            <!-- Badges -->
            <div class="mb-6 flex flex-wrap gap-2">
              <CommonStatusBadge :status="roof.estado" />
              <span class="badge-primary">{{ roof.tipoEdificio }}</span>
              <span class="badge-eco">{{ roof.tipoTechoVerde }}</span>
            </div>

            <!-- Key metrics -->
            <div class="mb-6 grid grid-cols-2 gap-3">
              <div class="rounded-lg bg-surface p-3">
                <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-custom/70">Superficie</span>
                <span class="text-lg font-bold text-ink">{{ roof.superficie.toLocaleString('es-MX') }} <span class="text-xs font-medium text-slate-custom">m²</span></span>
              </div>
              <div class="rounded-lg bg-surface p-3">
                <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-custom/70">CO₂ capturado</span>
                <span class="text-lg font-bold text-ink">{{ roof.co2_capturado_kg_anual.toLocaleString('es-MX') }} <span class="text-xs font-medium text-slate-custom">kg/año</span></span>
              </div>
              <div class="rounded-lg bg-surface p-3">
                <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-custom/70">Retención agua</span>
                <span class="text-lg font-bold text-ink">{{ roof.retencion_agua_litros.toLocaleString('es-MX') }} <span class="text-xs font-medium text-slate-custom">L</span></span>
              </div>
              <div class="rounded-lg bg-surface p-3">
                <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-custom/70">Reducción temp.</span>
                <span class="text-lg font-bold text-ink">{{ roof.reduccion_temperatura_c }} <span class="text-xs font-medium text-slate-custom">°C</span></span>
              </div>
            </div>

            <!-- Details list -->
            <div class="mb-6 space-y-3">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-custom">Información general</h4>
              <div class="space-y-2">
                <div v-for="detail in details" :key="detail.label" class="flex items-start justify-between gap-4 border-b border-gray-50 pb-2 last:border-0">
                  <span class="text-xs font-medium text-slate-custom">{{ detail.label }}</span>
                  <span class="text-right text-xs font-medium text-ink">{{ detail.value }}</span>
                </div>
              </div>
            </div>

            <!-- Mini map placeholder -->
            <div class="mb-6">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">Ubicación</h4>
              <div class="flex h-40 items-center justify-center rounded-card bg-surface">
                <div class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p class="mt-1 text-xs text-slate-custom">
                    {{ roof.lat.toFixed(5) }}, {{ roof.lng.toFixed(5) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Species -->
            <div v-if="roof.especies_vegetales && roof.especies_vegetales.length > 0">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">Especies vegetales</h4>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="sp in roof.especies_vegetales"
                  :key="sp"
                  class="badge-eco text-[10px]"
                >
                  {{ sp }}
                </span>
              </div>
            </div>

            <!-- Description / Source -->
            <div v-if="roof.descripcion" class="mt-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">Descripcion y fuente</h4>
              <p class="text-sm leading-relaxed text-slate-custom">{{ roof.descripcion }}</p>
            </div>

            <!-- Notes -->
            <div v-if="roof.notas" class="mt-4">
              <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">Notas</h4>
              <p class="text-sm leading-relaxed text-slate-custom">{{ roof.notas }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { GreenRoof } from '~/types'

interface Props {
  roof: GreenRoof | null
  open: boolean
}

const props = defineProps<Props>()

defineEmits<{
  close: []
}>()

const details = computed(() => {
  if (!props.roof) return []
  return [
    { label: 'Alcaldía', value: props.roof.alcaldia },
    { label: 'Tipo de edificio', value: props.roof.tipoEdificio },
    { label: 'Tipo de techo verde', value: props.roof.tipoTechoVerde },
    { label: 'Fecha de instalación', value: props.roof.fecha_instalacion },
    { label: 'Responsable', value: props.roof.responsable },
    { label: 'Costo de instalación', value: `$${props.roof.costo_instalacion_mxn.toLocaleString('es-MX')} MXN` },
  ]
})
</script>

<style scoped>
.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
