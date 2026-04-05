<template>
  <div class="rounded-card bg-white p-4 shadow-panel">
    <h4 class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-custom">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
      Aptitud territorial
    </h4>

    <!-- Discrete classes -->
    <div class="space-y-1.5">
      <div
        v-for="level in levels"
        :key="level.label"
        class="flex items-center gap-2.5"
      >
        <span
          class="h-3.5 w-6 rounded-sm"
          :style="{ backgroundColor: level.color }"
        />
        <span class="text-xs font-medium text-ink">{{ level.label }}</span>
      </div>
    </div>

    <!-- Gradient bar -->
    <div class="mt-4">
      <div
        class="h-2.5 w-full rounded-full"
        style="background: linear-gradient(to right, #D9363E, #F2A81D, #FACC15, #79C141, #0E5E3A)"
      />
      <div class="mt-1 flex justify-between">
        <span class="text-[10px] font-medium text-slate-custom">Baja aptitud</span>
        <span class="text-[10px] font-medium text-slate-custom">Alta aptitud</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const levels = [
  { label: 'Muy alta', color: '#0E5E3A' },
  { label: 'Alta', color: '#79C141' },
  { label: 'Media', color: '#FACC15' },
  { label: 'Baja', color: '#F2A81D' },
  { label: 'Muy baja', color: '#D9363E' },
]
</script>
