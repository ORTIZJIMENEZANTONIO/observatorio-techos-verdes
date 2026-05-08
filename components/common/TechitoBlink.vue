<script setup lang="ts">
defineProps<{
  blinking: boolean
}>()
</script>

<template>
  <div class="techito-blink-wrap">
    <slot />
    <!--
      Párpados sobre los ojos de Techito. SVG fuente: width=960 height=1088
      (sin viewBox declarado). Usamos viewBox + preserveAspectRatio="xMidYMid meet"
      idéntico al patrón de Humedalito para que los párpados escalen 1:1 con la
      imagen del techito (object-fit:contain en el <img> hace lo equivalente).

      Coordenadas: cy=740, corridas progresivamente a la derecha (+15 px más).
        Ojo izquierdo:  cx=550, cy=740
        Ojo derecho:    cx=695, cy=740
        Radio cerrado:  rx=34, ry=28
      Color del párpado: #807a72 (gris-marrón ladrillo).
    -->
    <svg
      class="techito-eyelids"
      viewBox="0 0 960 1088"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <ellipse
        cx="550"
        cy="740"
        rx="34"
        ry="0"
        class="eyelid"
        :class="{ 'eyelid--closed': blinking }"
        fill="#807a72"
      />
      <ellipse
        cx="695"
        cy="740"
        rx="34"
        ry="0"
        class="eyelid"
        :class="{ 'eyelid--closed': blinking }"
        fill="#807a72"
      />
    </svg>
  </div>
</template>

<style scoped>
.techito-blink-wrap {
  position: relative;
  display: inline-block;
}

.techito-eyelids {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.eyelid {
  transition: ry 80ms ease-in;
}

.eyelid--closed {
  ry: 28;
  transition: ry 80ms ease-out;
}
</style>
