<template>
  <div>
    <h4 v-if="title" class="mb-4 text-sm font-semibold text-ink">{{ title }}</h4>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface DatasetInput {
  label: string
  data: number[]
  backgroundColor: string | string[]
  borderRadius?: number
}

const props = withDefaults(defineProps<{
  labels: string[]
  datasets: DatasetInput[]
  title?: string
  horizontal?: boolean
  stacked?: boolean
}>(), {
  horizontal: false,
  stacked: false,
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    backgroundColor: ds.backgroundColor,
    borderRadius: ds.borderRadius ?? 4,
    borderSkipped: false as const,
    maxBarThickness: 40,
  })),
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  indexAxis: props.horizontal ? ('y' as const) : ('x' as const),
  scales: {
    x: {
      stacked: props.stacked,
      grid: {
        display: !props.horizontal,
        color: '#e5e7eb',
        drawBorder: false,
      },
      border: {
        display: false,
      },
      ticks: {
        font: { family: 'Inter, system-ui, sans-serif', size: 11 },
        color: '#5E6B78',
      },
    },
    y: {
      stacked: props.stacked,
      grid: {
        display: props.horizontal,
        color: '#e5e7eb',
        drawBorder: false,
      },
      border: {
        display: false,
      },
      ticks: {
        font: { family: 'Inter, system-ui, sans-serif', size: 11 },
        color: '#5E6B78',
      },
    },
  },
  plugins: {
    legend: {
      display: props.datasets.length > 1,
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 3,
        useBorderRadius: true,
        padding: 16,
        font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        color: '#1F2937',
      },
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleFont: { family: 'Inter, system-ui, sans-serif', size: 12 },
      bodyFont: { family: 'Inter, system-ui, sans-serif', size: 12 },
      padding: 10,
      cornerRadius: 8,
    },
  },
}))
</script>
