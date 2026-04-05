<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-medium',
      levelConfig.bg,
      levelConfig.text,
    ]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path v-if="level === 'alta'" d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline v-if="level === 'alta'" points="22 4 12 14.01 9 11.01" />
      <circle v-if="level === 'media'" cx="12" cy="12" r="10" />
      <line v-if="level === 'media'" x1="12" y1="8" x2="12" y2="12" />
      <line v-if="level === 'media'" x1="12" y1="16" x2="12.01" y2="16" />
      <circle v-if="level === 'baja'" cx="12" cy="12" r="10" />
      <line v-if="level === 'baja'" x1="15" y1="9" x2="9" y2="15" />
      <line v-if="level === 'baja'" x1="9" y1="9" x2="15" y2="15" />
    </svg>
    <span>{{ levelConfig.label }}</span>
    <span v-if="percentage !== undefined" class="font-semibold">
      {{ percentage }}%
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  level: 'alta' | 'media' | 'baja'
  percentage?: number
}

const props = defineProps<Props>()

interface LevelStyle {
  bg: string
  text: string
  label: string
}

const levelMap: Record<string, LevelStyle> = {
  alta: { bg: 'bg-primary-50', text: 'text-primary', label: 'Alta' },
  media: { bg: 'bg-accent/10', text: 'text-accent-dark', label: 'Media' },
  baja: { bg: 'bg-alert/10', text: 'text-alert-dark', label: 'Baja' },
}

const levelConfig = computed(() => levelMap[props.level])
</script>
