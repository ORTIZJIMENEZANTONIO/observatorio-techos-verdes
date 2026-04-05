<template>
  <div class="flex flex-col items-center justify-center px-4 py-16 text-center">
    <!-- Icon placeholder -->
    <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
      <svg
        v-if="icon === 'search'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-9 w-9 text-primary/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <svg
        v-else-if="icon === 'map'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-9 w-9 text-primary/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
      <svg
        v-else-if="icon === 'data'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-9 w-9 text-primary/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-9 w-9 text-primary/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    </div>

    <!-- Title -->
    <h3 class="mb-2 text-lg font-semibold text-ink">
      {{ title }}
    </h3>

    <!-- Description -->
    <p v-if="description" class="mb-6 max-w-sm text-sm leading-relaxed text-slate-custom">
      {{ description }}
    </p>

    <!-- Action CTA -->
    <NuxtLink
      v-if="action && actionTo"
      :to="actionTo"
      class="btn-primary"
    >
      {{ action }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
  action?: string
  actionTo?: string
}

defineProps<Props>()
</script>
