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
      (sin viewBox declarado). preserveAspectRatio="xMidYMid meet" mantiene
      el mismo encuadre que `object-fit: contain` en el <img>, por lo que las
      coordenadas absolutas en el viewBox coinciden 1:1 con las del SVG real.

      Coordenadas calculadas a partir de los <path> de córnea del SVG fuente
      (fill #4A351C y #4B351D, los dos paths que dibujan el iris/pupila):

        Córnea izquierda (Techito's right): path translate(474, 580),
          bbox local x[-19.47, 8.85] y[-0.84, 35.5] → centro abs (469, 597)
        Córnea derecha (Techito's left):    path translate(581, 579),
          bbox local x[-19.43, 7.0]  y[-0.66, 35]   → centro abs (575, 596)
        rx ≈ 14, ry abierto = 0, ry cerrado = 18 (mitad de altura del ojo).
      Color del párpado: #7E532F (ladrillo de Techito), coincide con la piel
      alrededor de los ojos.
    -->
    <svg
      class="techito-eyelids"
      viewBox="0 0 960 1088"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <!-- Ojo izquierdo del observador -->
      <ellipse
        cx="469"
        cy="597"
        rx="14"
        ry="0"
        class="eyelid"
        :class="{ 'eyelid--closed': blinking }"
        fill="#7E532F"
      />
      <!-- Ojo derecho del observador -->
      <ellipse
        cx="575"
        cy="596"
        rx="14"
        ry="0"
        class="eyelid"
        :class="{ 'eyelid--closed': blinking }"
        fill="#7E532F"
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
  ry: 18;
  transition: ry 80ms ease-out;
}
</style>
