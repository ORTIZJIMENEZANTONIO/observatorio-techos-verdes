<template>
  <div class="kpi-card">
    <!-- Icon -->
    <div
      v-if="icon"
      :class="[
        'mb-2 flex h-10 w-10 items-center justify-center rounded-lg',
        colorClasses.iconBg,
      ]"
    >
      <!-- Building icon -->
      <svg v-if="icon === 'building'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="colorClasses.iconText" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
        <path d="M12 10h.01" /><path d="M12 14h.01" />
        <path d="M16 10h.01" /><path d="M16 14h.01" />
        <path d="M8 10h.01" /><path d="M8 14h.01" />
      </svg>
      <!-- Leaf icon -->
      <svg v-else-if="icon === 'leaf'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="colorClasses.iconText" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.03-2.83c2.52-1.45 5.24-2.24 8.26-2.17 3.24.07 5-1.39 5-3.5S19 8 17 8z" />
        <path d="M12.5 2C9.64 2 8 4.14 8 6.5c0 2.18 1.41 3.44 3.5 3.44.84 0 1.62-.25 2.28-.68" />
      </svg>
      <!-- Area icon -->
      <svg v-else-if="icon === 'area'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="colorClasses.iconText" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
      <!-- Target icon -->
      <svg v-else-if="icon === 'target'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="colorClasses.iconText" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
      <!-- Chart icon -->
      <svg v-else-if="icon === 'chart'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="colorClasses.iconText" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
      <!-- Map icon -->
      <svg v-else-if="icon === 'map'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="colorClasses.iconText" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    </div>

    <!-- Value -->
    <div class="flex items-baseline gap-1.5">
      <span class="text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {{ formattedValue }}
      </span>
      <span v-if="unit" class="text-sm font-medium text-ink-muted">
        {{ unit }}
      </span>
    </div>

    <!-- Label -->
    <span class="text-sm font-medium text-slate-custom">
      {{ label }}
    </span>

    <!-- Change indicator -->
    <div
      v-if="change"
      class="mt-1 flex items-center gap-1 text-xs font-medium"
      :class="changeIsPositive ? 'text-eco-dark' : 'text-alert'"
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
        <polyline v-if="changeIsPositive" points="18 15 12 9 6 15" />
        <polyline v-else points="6 9 12 15 18 9" />
      </svg>
      {{ change }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  unit?: string
  icon?: string
  color?: 'primary' | 'secondary' | 'eco' | 'accent'
  change?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})

const colorMap = {
  primary: { iconBg: 'bg-primary-50', iconText: 'text-primary' },
  secondary: { iconBg: 'bg-secondary/10', iconText: 'text-secondary' },
  eco: { iconBg: 'bg-eco/10', iconText: 'text-eco-dark' },
  accent: { iconBg: 'bg-accent/10', iconText: 'text-accent-dark' },
}

const colorClasses = computed(() => colorMap[props.color])

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString('es-MX')
  }
  return props.value
})

const changeIsPositive = computed(() => {
  if (!props.change) return true
  return !props.change.startsWith('-')
})
</script>
