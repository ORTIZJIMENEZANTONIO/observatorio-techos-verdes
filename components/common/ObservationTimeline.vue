<template>
  <div class="relative">
    <!-- Vertical line -->
    <div class="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />

    <!-- Events -->
    <div class="space-y-6">
      <div
        v-for="(event, index) in events"
        :key="index"
        class="relative flex gap-4 pl-0"
      >
        <!-- Dot -->
        <div class="relative z-10 flex shrink-0">
          <div
            :class="[
              'mt-1 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white',
              typeConfig(event.type).bg,
            ]"
          >
            <svg
              v-if="event.type === 'registro'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="typeConfig(event.type).icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <svg
              v-else-if="event.type === 'validacion'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="typeConfig(event.type).icon"
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
            <svg
              v-else-if="event.type === 'alerta'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="typeConfig(event.type).icon"
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
              v-else-if="event.type === 'actualizacion'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="typeConfig(event.type).icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="typeConfig(event.type).icon"
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
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 pb-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h4 class="text-sm font-semibold text-ink">{{ event.title }}</h4>
              <p v-if="event.description" class="mt-1 text-xs leading-relaxed text-slate-custom">
                {{ event.description }}
              </p>
            </div>
            <span class="shrink-0 text-[10px] font-medium text-slate-custom/70 tabular-nums">
              {{ event.date }}
            </span>
          </div>

          <!-- Type badge -->
          <span
            :class="[
              'mt-2 inline-flex items-center rounded-badge px-2 py-0.5 text-[10px] font-medium',
              typeConfig(event.type).badge,
            ]"
          >
            {{ typeLabel(event.type) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineEvent {
  date: string
  title: string
  description?: string
  type: string
}

interface Props {
  events: TimelineEvent[]
}

defineProps<Props>()

interface TypeStyle {
  bg: string
  icon: string
  badge: string
}

const typeStyles: Record<string, TypeStyle> = {
  registro: {
    bg: 'bg-primary-50',
    icon: 'text-primary',
    badge: 'bg-primary-50 text-primary',
  },
  validacion: {
    bg: 'bg-eco/10',
    icon: 'text-eco-dark',
    badge: 'bg-eco/10 text-eco-dark',
  },
  alerta: {
    bg: 'bg-alert/10',
    icon: 'text-alert',
    badge: 'bg-alert/10 text-alert-dark',
  },
  actualizacion: {
    bg: 'bg-secondary/10',
    icon: 'text-secondary',
    badge: 'bg-secondary/10 text-secondary-dark',
  },
}

const defaultStyle: TypeStyle = {
  bg: 'bg-gray-100',
  icon: 'text-gray-500',
  badge: 'bg-gray-100 text-gray-600',
}

function typeConfig(type: string): TypeStyle {
  return typeStyles[type] || defaultStyle
}

const typeLabels: Record<string, string> = {
  registro: 'Registro',
  validacion: 'Validación',
  alerta: 'Alerta',
  actualizacion: 'Actualización',
}

function typeLabel(type: string): string {
  return typeLabels[type] || type
}
</script>
