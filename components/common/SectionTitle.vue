<template>
  <div :class="['mb-8 md:mb-10', centered ? 'text-center' : '']">
    <span
      v-if="tag"
      class="mb-3 inline-flex items-center rounded-badge bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in"
    >
      {{ tag }}
    </span>
    <h2 class="text-balance animate-slide-up delay-75">
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      :class="[
        'mt-3 text-base leading-relaxed text-slate-custom md:text-lg animate-slide-up delay-150',
        centered ? 'mx-auto max-w-2xl' : 'max-w-3xl',
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  centered?: boolean
  tag?: string
}

withDefaults(defineProps<Props>(), {
  centered: false,
})
</script>
