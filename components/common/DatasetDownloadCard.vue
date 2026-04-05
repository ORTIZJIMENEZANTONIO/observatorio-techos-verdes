<template>
  <div class="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex items-start gap-4">
      <!-- File icon -->
      <div :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', formatConfig.bg]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          :class="formatConfig.icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>

      <!-- Info -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3 class="text-sm font-semibold text-ink">{{ title }}</h3>
          <span :class="['badge text-[10px]', formatConfig.badge]">
            {{ format }}
          </span>
        </div>
        <p class="mt-1 text-xs leading-relaxed text-slate-custom">
          {{ description }}
        </p>
        <div v-if="size || date" class="mt-2 flex items-center gap-3 text-[10px] font-medium text-slate-custom/70">
          <span v-if="size" class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {{ size }}
          </span>
          <span v-if="date" class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {{ date }}
          </span>
        </div>
      </div>
    </div>

    <!-- Download button -->
    <button class="btn-outline btn-sm shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Descargar
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  format: 'CSV' | 'GeoJSON' | 'PDF'
  size?: string
  date?: string
}

const props = defineProps<Props>()

const formatConfigs: Record<string, { bg: string; icon: string; badge: string }> = {
  CSV: {
    bg: 'bg-primary-50',
    icon: 'text-primary',
    badge: 'bg-primary-50 text-primary',
  },
  GeoJSON: {
    bg: 'bg-secondary/10',
    icon: 'text-secondary',
    badge: 'bg-secondary/10 text-secondary-dark',
  },
  PDF: {
    bg: 'bg-alert/10',
    icon: 'text-alert',
    badge: 'bg-alert/10 text-alert-dark',
  },
}

const formatConfig = computed(() => formatConfigs[props.format] || formatConfigs.CSV)
</script>
