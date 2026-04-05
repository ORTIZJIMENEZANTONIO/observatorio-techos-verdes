<template>
  <div
    :class="[
      'rounded-card border p-4',
      compact ? 'py-2.5' : 'p-4',
      isMock
        ? 'border-accent/30 bg-accent/5'
        : 'border-eco/30 bg-eco/5',
    ]"
  >
    <div :class="['flex gap-3', compact ? 'items-center' : 'items-start']">
      <div
        :class="[
          'flex shrink-0 items-center justify-center rounded-lg',
          compact ? 'h-6 w-6' : 'h-8 w-8',
          isMock ? 'bg-accent/10' : 'bg-eco/10',
        ]"
      >
        <svg
          v-if="isMock"
          xmlns="http://www.w3.org/2000/svg"
          :class="[compact ? 'h-3.5 w-3.5' : 'h-4 w-4', 'text-accent']"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          :class="[compact ? 'h-3.5 w-3.5' : 'h-4 w-4', 'text-eco']"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <div>
        <h4
          v-if="!compact"
          :class="[
            'text-sm font-semibold',
            isMock ? 'text-accent-dark' : 'text-eco-dark',
          ]"
        >
          {{ isMock ? 'Datos de demostracion' : 'Datos oficiales' }}
        </h4>
        <p
          :class="[
            'leading-relaxed text-slate-custom',
            compact ? 'text-xs' : 'mt-1 text-sm',
          ]"
        >
          {{ disclaimerText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  compact?: boolean
}>()

const { isMock, disclaimerText } = useDataSource()
</script>
