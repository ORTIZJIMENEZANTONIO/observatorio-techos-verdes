<template>
  <div>
    <h4 v-if="title" class="mb-4 text-sm font-semibold text-ink">{{ title }}</h4>
    <Scatter :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'vue-chartjs'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface ScatterPoint {
  x: number
  y: number
  label?: string
}

const props = withDefaults(defineProps<{
  points: ScatterPoint[]
  regressionLine?: { slope: number; intercept: number; r2: number }
  xLabel?: string
  yLabel?: string
  title?: string
  pointColor?: string
}>(), {
  pointColor: '#0E5E3A',
})

const chartData = computed(() => {
  const datasets: any[] = [
    {
      label: 'Datos',
      data: props.points.map(p => ({ x: p.x, y: p.y })),
      backgroundColor: props.pointColor + 'CC',
      borderColor: props.pointColor,
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ]

  if (props.regressionLine) {
    const xs = props.points.map(p => p.x)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const { slope, intercept, r2 } = props.regressionLine

    datasets.push({
      label: `Regresion (R²=${r2.toFixed(3)})`,
      data: [
        { x: minX, y: slope * minX + intercept },
        { x: maxX, y: slope * maxX + intercept },
      ],
      type: 'line' as const,
      borderColor: '#D9363E',
      borderWidth: 2,
      borderDash: [6, 3],
      pointRadius: 0,
      fill: false,
    })
  }

  return { datasets }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      title: {
        display: !!props.xLabel,
        text: props.xLabel ?? '',
        font: { family: 'Inter, system-ui, sans-serif', size: 12, weight: '600' as const },
        color: '#1F2937',
      },
      grid: { color: '#e5e7eb', drawBorder: false },
      border: { display: false },
      ticks: {
        font: { family: 'Inter, system-ui, sans-serif', size: 11 },
        color: '#5E6B78',
      },
    },
    y: {
      title: {
        display: !!props.yLabel,
        text: props.yLabel ?? '',
        font: { family: 'Inter, system-ui, sans-serif', size: 12, weight: '600' as const },
        color: '#1F2937',
      },
      grid: { color: '#e5e7eb', drawBorder: false },
      border: { display: false },
      ticks: {
        font: { family: 'Inter, system-ui, sans-serif', size: 11 },
        color: '#5E6B78',
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
      callbacks: {
        label: (ctx: any) => {
          const point = props.points[ctx.dataIndex]
          const label = point?.label ? `${point.label}: ` : ''
          return `${label}(${ctx.parsed.x.toFixed(2)}, ${ctx.parsed.y.toFixed(2)})`
        },
      },
    },
  },
}))
</script>
