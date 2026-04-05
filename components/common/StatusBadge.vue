<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-badge font-medium',
      sizeClasses,
      statusConfig.bg,
      statusConfig.text,
    ]"
  >
    <span
      :class="['rounded-full', statusConfig.dot, size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2']"
    />
    {{ statusConfig.label }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClasses = computed(() =>
  props.size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
)

interface StatusStyle {
  bg: string
  text: string
  dot: string
  label: string
}

const statusMap: Record<string, StatusStyle> = {
  activo: { bg: 'bg-primary-50', text: 'text-primary', dot: 'bg-primary', label: 'Activo' },
  confirmado: { bg: 'bg-primary-50', text: 'text-primary', dot: 'bg-primary', label: 'Confirmado' },
  implementado: { bg: 'bg-primary-50', text: 'text-primary', dot: 'bg-primary', label: 'Implementado' },
  candidato: { bg: 'bg-accent/10', text: 'text-accent-dark', dot: 'bg-accent', label: 'Candidato' },
  pendiente: { bg: 'bg-accent/10', text: 'text-accent-dark', dot: 'bg-accent', label: 'Pendiente' },
  validado_visualmente: { bg: 'bg-secondary/10', text: 'text-secondary-dark', dot: 'bg-secondary', label: 'Validado visualmente' },
  piloto: { bg: 'bg-secondary/10', text: 'text-secondary-dark', dot: 'bg-secondary', label: 'Piloto' },
  factibilidad_pendiente: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500', label: 'Factibilidad pendiente' },
  rechazado: { bg: 'bg-alert/10', text: 'text-alert-dark', dot: 'bg-alert', label: 'Rechazado' },
  inactivo: { bg: 'bg-alert/10', text: 'text-alert-dark', dot: 'bg-alert', label: 'Inactivo' },
  indeterminado: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Indeterminado' },
  en_mantenimiento: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: 'En mantenimiento' },
  en_construccion: { bg: 'bg-secondary/10', text: 'text-secondary-dark', dot: 'bg-secondary', label: 'En construcción' },
  propuesto: { bg: 'bg-accent/10', text: 'text-accent-dark', dot: 'bg-accent', label: 'Propuesto' },
  identificado: { bg: 'bg-secondary/10', text: 'text-secondary-dark', dot: 'bg-secondary', label: 'Identificado' },
  evaluado: { bg: 'bg-accent/10', text: 'text-accent-dark', dot: 'bg-accent', label: 'Evaluado' },
  aprobado: { bg: 'bg-primary-50', text: 'text-primary', dot: 'bg-primary', label: 'Aprobado' },
  en_proceso: { bg: 'bg-secondary/10', text: 'text-secondary-dark', dot: 'bg-secondary', label: 'En proceso' },
  mantenimiento: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Mantenimiento' },
}

const defaultStatus: StatusStyle = {
  bg: 'bg-gray-100',
  text: 'text-gray-600',
  dot: 'bg-gray-400',
  label: 'Desconocido',
}

const statusConfig = computed(() => {
  const normalized = props.status.toLowerCase().replace(/\s+/g, '_')
  const config = statusMap[normalized]
  if (config) return config
  return { ...defaultStatus, label: props.status }
})
</script>
