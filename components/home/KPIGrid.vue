<template>
  <section class="section-padding">
    <div class="container-wide">
      <CommonSectionTitle
        tag="Datos clave"
        title="Panorama general"
        subtitle="Cifras actualizadas del inventario de techos verdes e infraestructura verde en la Ciudad de México."
        centered
      />

      <div ref="kpiGrid" class="stagger-children grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <CommonStatCard
          v-for="kpi in kpis"
          :key="kpi.label"
          class="reveal"
          :label="kpi.label"
          :value="kpi.value"
          :unit="kpi.unit"
          :icon="kpi.icon"
          :color="kpi.color"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { revealRef: kpiGrid } = useScrollReveal({ stagger: true })

const kpis = [
  {
    label: 'Techos registrados',
    value: 57,
    icon: 'building',
    color: 'primary' as const,
  },
  {
    label: 'Superficie identificada',
    value: '81,075.25',
    unit: 'm²',
    icon: 'area',
    color: 'eco' as const,
  },
  {
    label: 'Sitios priorizados',
    value: 60,
    icon: 'target',
    color: 'secondary' as const,
  },
  {
    label: 'Variables del índice',
    value: 8,
    icon: 'chart',
    color: 'accent' as const,
  },
  {
    label: 'Alcaldías analizadas',
    value: 16,
    icon: 'map',
    color: 'primary' as const,
  },
]
</script>
