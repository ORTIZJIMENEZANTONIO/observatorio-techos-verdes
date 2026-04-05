<template>
  <div>
    <h4 v-if="title" class="mb-4 text-sm font-semibold text-ink">{{ title }}</h4>
    <PolarArea :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { PolarArea } from 'vue-chartjs'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const props = defineProps<{
  labels: string[]
  data: number[]
  colors: string[]
  title?: string
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: props.colors.map(c => c + '80'),
      borderColor: props.colors,
      borderWidth: 2,
      hoverBorderWidth: 3,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      beginAtZero: true,
      grid: {
        color: '#e5e7eb',
      },
      angleLines: {
        color: '#e5e7eb',
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 3,
        useBorderRadius: true,
        padding: 12,
        font: { family: 'Inter, system-ui, sans-serif', size: 11 },
        color: '#1F2937',
      },
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleFont: { family: 'Inter, system-ui, sans-serif', size: 12 },
      bodyFont: { family: 'Inter, system-ui, sans-serif', size: 12 },
      padding: 10,
      cornerRadius: 8,
      callbacks: {
        label: (ctx: any) => {
          return ` ${ctx.label}: ${ctx.parsed.r.toFixed(1)}%`
        },
      },
    },
  },
}))
</script>
