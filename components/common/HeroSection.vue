<script setup lang="ts">
const props = defineProps<{
  compact?: boolean
  /** Override de imagen de fondo (URL absoluta o relativa). Si se omite, usa el techo verde del CIIEMAD. */
  image?: string
}>()

const heroPhotoSrc = computed(() => props.image || '/images/tesis/techo-verde-ciiemad-panoramica.jpg')
</script>

<template>
  <section
    class="hero-section relative overflow-hidden flex items-center"
    :class="compact ? 'py-10 md:py-12' : 'py-12 md:py-16'"
  >
    <div class="hero-bg" aria-hidden="true">
      <!-- Foto real del techo verde CIIEMAD (capa base) -->
      <NuxtImg
        :src="heroPhotoSrc"
        alt=""
        class="hero-photo"
        sizes="xs:800px sm:1024px md:1280px lg:1600px xl:1600px"
        format="webp"
        loading="eager"
        densities="x1 x2"
      />
      <!-- Tint verde para integrar con la paleta -->
      <div class="hero-photo-tint" />
      <!-- Anillos isobáticos (topo) -->
      <div class="hero-topo" />
      <!-- Manchas de luz tipo dosel vegetal -->
      <div class="hero-canopy" />
      <!-- Lava orbs (atenuados sobre la foto) -->
      <span class="lava-orb orb--g1" />
      <span class="lava-orb orb--g2" />
      <span class="lava-orb orb--g3" />
      <span class="lava-orb orb--a1" />
      <span class="lava-orb orb--e1" />
      <!-- Vignette inferior para legibilidad -->
      <div class="hero-vignette" />
    </div>
    <div class="container-wide relative z-10">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background:
    radial-gradient(ellipse 90% 60% at 50% 0%, rgba(26, 122, 78, 0.45) 0%, transparent 60%),
    linear-gradient(160deg, #042B1A 0%, #0A4A2D 25%, #0E5E3A 55%, #1A7A4E 85%, #0E5E3A 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

/* --- Foto real del techo verde CIIEMAD (capa base, protagonista sutil) --- */
.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 50%;
  z-index: 0;
  filter: saturate(1.1) contrast(1.05) brightness(0.95);
  animation: photo-pan 30s ease-in-out infinite alternate;
  will-change: transform;
}

/* --- Tint verde sobre la foto para integrar con la paleta --- */
.hero-photo-tint {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(4, 43, 26, 0.55) 0%, rgba(14, 94, 58, 0.50) 50%, rgba(4, 43, 26, 0.80) 100%),
    linear-gradient(140deg, rgba(14, 94, 58, 0.45) 0%, rgba(26, 122, 78, 0.35) 100%);
  mix-blend-mode: multiply;
}

@keyframes photo-pan {
  0%   { transform: scale(1.04) translate3d(0, 0, 0); }
  100% { transform: scale(1.08) translate3d(-12px, -8px, 0); }
}

/* --- Topographical (isobath-style) rings --- */
.hero-topo {
  position: absolute;
  inset: -10%;
  z-index: 2;
  background:
    repeating-radial-gradient(
      circle at 30% 40%,
      transparent 0px,
      transparent 38px,
      rgba(121, 193, 65, 0.05) 38px,
      rgba(121, 193, 65, 0.05) 39px
    ),
    repeating-radial-gradient(
      circle at 75% 70%,
      transparent 0px,
      transparent 52px,
      rgba(197, 232, 212, 0.04) 52px,
      rgba(197, 232, 212, 0.04) 53px
    );
  mix-blend-mode: screen;
  opacity: 0.65;
  animation: drift-slow 60s linear infinite;
  will-change: transform;
  pointer-events: none;
}

/* --- Canopy light dappling --- */
.hero-canopy {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    radial-gradient(ellipse 320px 80px at 22% 28%, rgba(197, 232, 212, 0.18), transparent 70%),
    radial-gradient(ellipse 240px 60px at 78% 38%, rgba(143, 205, 95, 0.16), transparent 70%),
    radial-gradient(ellipse 200px 50px at 50% 72%, rgba(121, 193, 65, 0.14), transparent 70%);
  mix-blend-mode: screen;
  filter: blur(2px);
  animation: canopy-drift 18s ease-in-out infinite;
  will-change: transform, opacity;
  pointer-events: none;
}

/* --- Lava orbs (atenuados, dejan respirar la foto) --- */
.lava-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(32px);
  transform: translate3d(0, 0, 0);
  will-change: transform;
  mix-blend-mode: screen;
  opacity: 0.55;
  z-index: 3;
}

.orb--g1 {
  width: 600px; height: 600px;
  top: -180px; left: -120px;
  background: radial-gradient(circle, rgba(14, 94, 58, 0.85) 0%, rgba(14, 94, 58, 0) 70%);
  animation: lavaA 10s ease-in-out infinite;
}
.orb--g2 {
  width: 500px; height: 500px;
  top: -60px; right: -100px;
  background: radial-gradient(circle, rgba(26, 122, 78, 0.75) 0%, rgba(26, 122, 78, 0) 70%);
  animation: lavaB 13s ease-in-out infinite;
}
.orb--g3 {
  width: 650px; height: 650px;
  bottom: -180px; left: 20%;
  background: radial-gradient(circle, rgba(10, 74, 45, 0.80) 0%, rgba(10, 74, 45, 0) 70%);
  animation: lavaC 16s ease-in-out infinite;
}
.orb--a1 {
  width: 380px; height: 380px;
  top: 30%; right: 20%;
  background: radial-gradient(circle, rgba(121, 193, 65, 0.5) 0%, rgba(121, 193, 65, 0) 70%);
  animation: lavaD 11s ease-in-out infinite;
  opacity: 0.4;
}
.orb--e1 {
  width: 280px; height: 280px;
  bottom: 12%; right: -40px;
  background: radial-gradient(circle, rgba(242, 168, 29, 0.35) 0%, rgba(242, 168, 29, 0) 70%);
  animation: lavaB 14s ease-in-out infinite;
  opacity: 0.4;
}

/* --- Bottom vignette for content legibility --- */
.hero-vignette {
  position: absolute;
  inset: auto 0 0 0;
  height: 50%;
  z-index: 4;
  background: linear-gradient(to bottom, transparent 0%, rgba(4, 43, 26, 0.45) 100%);
  pointer-events: none;
}

@keyframes lavaA {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  25%  { transform: translate3d(50px, 20px, 0) scale(1.06); }
  50%  { transform: translate3d(15px, 50px, 0) scale(0.95); }
  75%  { transform: translate3d(-30px, 30px, 0) scale(1.04); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes lavaB {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  25%  { transform: translate3d(-40px, 30px, 0) scale(1.05); }
  50%  { transform: translate3d(-60px, 8px, 0) scale(0.93); }
  75%  { transform: translate3d(-15px, -20px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes lavaC {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  25%  { transform: translate3d(30px, -40px, 0) scale(1.08); }
  50%  { transform: translate3d(70px, -15px, 0) scale(0.92); }
  75%  { transform: translate3d(20px, -45px, 0) scale(1.05); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes lavaD {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  33%  { transform: translate3d(20px, -15px, 0) scale(1.05); }
  66%  { transform: translate3d(-12px, 18px, 0) scale(0.97); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

@keyframes drift-slow {
  0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
  100% { transform: translate3d(-2%, -1%, 0) rotate(2deg); }
}

@keyframes canopy-drift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.85; }
  50%      { transform: translate3d(2%, 1%, 0) scale(1.04); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .lava-orb,
  .hero-topo,
  .hero-canopy,
  .hero-photo {
    animation: none;
  }
}
</style>
