<script setup lang="ts">
interface Props {
  /** Which step is active: 'detector', 'prospectos', 'candidatos', 'validacion', 'inventario' */
  currentStep: 'detector' | 'prospectos' | 'candidatos' | 'validacion' | 'inventario'
  /** Description text shown below the step indicator */
  description: string
}

defineProps<Props>()

const steps = [
  { id: 'detector', label: 'Detector' },
  { id: 'prospectos', label: 'Prospectos' },
  { id: 'candidatos', label: 'Candidatos' },
  { id: 'validacion', label: 'Validacion' },
  { id: 'inventario', label: 'Inventario' },
] as const
</script>

<template>
  <div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <!-- Pipeline step indicator -->
    <div class="flex flex-wrap items-center gap-1.5 text-xs sm:gap-2">
      <template v-for="(step, i) in steps" :key="step.id">
        <span
          class="rounded px-2 py-1 font-medium transition-colors"
          :class="step.id === currentStep
            ? 'bg-primary text-white shadow-sm'
            : 'bg-gray-100 text-gray-500'"
        >
          {{ step.label }}
        </span>
        <span v-if="i < steps.length - 1" class="text-gray-300 select-none">
          &rarr;
        </span>
      </template>
    </div>
    <!-- Description -->
    <p class="mt-2.5 text-sm leading-relaxed text-slate-custom">
      {{ description }}
    </p>
  </div>
</template>
