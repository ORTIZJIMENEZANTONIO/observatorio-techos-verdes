<template>
  <div>
    <h4 v-if="title" class="mb-4 text-sm font-semibold text-ink">{{ title }}</h4>
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const props = withDefaults(defineProps<{
  labels: string[]
  data: number[]
  maxValue?: number
  title?: string
  color?: string
}>(), {
  maxValue: 100,
  color: '#0E5E3A',
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Valor',
      data: props.data,
      backgroundColor: props.color + '25',
      borderColor: props.color,
      borderWidth: 2,
      pointBackgroundColor: props.color,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      min: 0,
      max: props.maxValue,
      beginAtZero: true,
      angleLines: {
        color: '#e5e7eb',
      },
      grid: {
        color: '#e5e7eb',
      },
      pointLabels: {
        font: { family: 'Inter, system-ui, sans-serif', size: 11 },
        color: '#1F2937',
      },
      ticks: {
        display: false,
        stepSize: props.maxValue / 5,
      },
    },
  },
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
    },
  },
}))
</script>
