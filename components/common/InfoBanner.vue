<template>
  <div
    v-if="!dismissed"
    :class="[
      'relative flex gap-3 rounded-card border-l-4 p-4',
      typeConfig.border,
      typeConfig.bg,
    ]"
    role="alert"
  >
    <!-- Icon -->
    <div class="shrink-0 pt-0.5">
      <svg
        v-if="type === 'info'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-secondary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <svg
        v-else-if="type === 'warning'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-orange-500"
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
        class="h-5 w-5 text-accent-dark"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    </div>

    <!-- Content -->
    <div class="flex-1 text-sm leading-relaxed" :class="typeConfig.text">
      <slot>
        <p v-if="type === 'disclaimer'">
          Este observatorio muestra aptitud territorial y priorización espacial. La factibilidad estructural depende de dictámenes técnicos del inmueble.
        </p>
      </slot>
    </div>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      class="shrink-0 self-start rounded-lg p-1 transition-colors hover:bg-black/5"
      @click="dismissed = true"
      aria-label="Cerrar aviso"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        :class="typeConfig.text"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  type?: 'info' | 'warning' | 'disclaimer'
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'disclaimer',
  dismissible: false,
})

const dismissed = ref(false)

const typeMap = {
  info: {
    border: 'border-l-secondary',
    bg: 'bg-secondary/5',
    text: 'text-secondary-dark',
  },
  warning: {
    border: 'border-l-orange-400',
    bg: 'bg-orange-50',
    text: 'text-orange-800',
  },
  disclaimer: {
    border: 'border-l-accent',
    bg: 'bg-accent/5',
    text: 'text-accent-dark',
  },
}

const typeConfig = computed(() => typeMap[props.type])
</script>
