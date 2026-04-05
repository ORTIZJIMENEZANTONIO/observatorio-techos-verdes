<template>
  <div class="flex gap-5">
    <!-- Number circle -->
    <div class="flex shrink-0 flex-col items-center">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-md">
        {{ number }}
      </div>
      <!-- Connecting line (hidden for last step via parent CSS if needed) -->
      <div class="mt-2 h-full w-px bg-gradient-to-b from-primary/20 to-transparent" />
    </div>

    <!-- Content -->
    <div class="pb-8">
      <!-- Icon -->
      <div v-if="icon" class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
        <svg
          v-if="icon === 'data'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
        <svg
          v-else-if="icon === 'analysis'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <svg
          v-else-if="icon === 'ai'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <svg
          v-else-if="icon === 'map'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
        <svg
          v-else-if="icon === 'target'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>

      <h3 class="text-base font-semibold text-ink">{{ title }}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-slate-custom">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  number: number
  title: string
  description: string
  icon?: string
}

defineProps<Props>()
</script>
