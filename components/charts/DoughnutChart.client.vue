<template>
  <div class="flex flex-col items-center">
    <h4 v-if="title" class="mb-4 text-sm font-semibold text-ink">{{ title }}</h4>
    <div class="relative w-full" style="max-width: 320px;">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div v-if="showTotal" class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-2xl font-bold text-ink">{{ total }}</span>
        <span v-if="totalLabel" class="text-xs text-slate-custom">{{ totalLabel }}</span>
      </div>
    </div>
    <div v-if="showLegend" class="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
      <div v-for="(label, i) in labels" :key="label" class="flex items-center gap-1.5">
        <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: colors[i] }" />
        <span class="text-xs text-ink">{{ label }}</span>
        <span class="text-xs font-semibold" :style="{ color: colors[i] }">{{ data[i] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = withDefaults(defineProps<{
  labels: string[]
  data: number[]
  colors: string[]
  title?: string
  cutout?: string
  showTotal?: boolean
  totalLabel?: string
  showLegend?: boolean
}>(), {
  cutout: '65%',
  showTotal: false,
  showLegend: true,
})

const total = computed(() => props.data.reduce((a, b) => a + b, 0))

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: props.colors,
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverBorderColor: '#ffffff',
      hoverBorderWidth: 3,
      hoverOffset: 6,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  cutout: props.cutout,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleFont: { family: 'Inter, system-ui, sans-serif', size: 12 },
      bodyFont: { family: 'Inter, system-ui, sans-serif', size: 12 },
      padding: 10,
      cornerRadius: 8,
      callbacks: {
        label: (ctx: any) => {
          const value = ctx.parsed
          const sum = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const pct = ((value / sum) * 100).toFixed(1)
          return ` ${ctx.label}: ${value} (${pct}%)`
        },
      },
    },
  },
}))
</script>
