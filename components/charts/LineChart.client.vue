<template>
  <div>
    <h4 v-if="title" class="mb-4 text-sm font-semibold text-ink">{{ title }}</h4>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface DatasetInput {
  label: string
  data: number[]
  borderColor: string
  fill?: boolean
}

const props = defineProps<{
  labels: string[]
  datasets: DatasetInput[]
  title?: string
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    borderColor: ds.borderColor,
    backgroundColor: ds.fill ? ds.borderColor + '20' : 'transparent',
    fill: ds.fill ?? false,
    tension: 0.4,
    pointBackgroundColor: ds.borderColor,
    pointBorderColor: '#ffffff',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 2,
  })),
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      grid: {
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
      grid: {
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
