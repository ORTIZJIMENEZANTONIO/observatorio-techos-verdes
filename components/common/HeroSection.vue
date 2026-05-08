<script setup lang="ts">
defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <section
    class="hero-section relative overflow-hidden flex items-center"
    :class="compact ? 'py-10 md:py-12' : 'py-12 md:py-16'"
  >
    <div class="hero-bg" aria-hidden="true">
      <!-- Topographical isobath rings (slow drift) -->
      <div class="hero-topo" />
      <!-- Light dappling through canopy (slow drift) -->
      <div class="hero-canopy" />
      <!-- Animated lava orbs -->
      <span class="lava-orb orb--g1" />
      <span class="lava-orb orb--g2" />
      <span class="lava-orb orb--g3" />
      <span class="lava-orb orb--a1" />
      <span class="lava-orb orb--e1" />
      <!-- Bottom vignette -->
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

/* --- Topographical (isobath-style) rings --- */
.hero-topo {
  position: absolute;
  inset: -10%;
  background:
    repeating-radial-gradient(
      circle at 30% 40%,
      transparent 0px,
      transparent 38px,
      rgba(121, 193, 65, 0.06) 38px,
      rgba(121, 193, 65, 0.06) 39px
    ),
    repeating-radial-gradient(
      circle at 75% 70%,
      transparent 0px,
      transparent 52px,
      rgba(197, 232, 212, 0.05) 52px,
      rgba(197, 232, 212, 0.05) 53px
    );
  mix-blend-mode: screen;
  animation: drift-slow 60s linear infinite;
  will-change: transform;
}

/* --- Canopy light dappling --- */
.hero-canopy {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 320px 80px at 22% 28%, rgba(197, 232, 212, 0.25), transparent 70%),
    radial-gradient(ellipse 240px 60px at 78% 38%, rgba(143, 205, 95, 0.22), transparent 70%),
    radial-gradient(ellipse 200px 50px at 50% 72%, rgba(121, 193, 65, 0.18), transparent 70%);
  mix-blend-mode: screen;
  filter: blur(2px);
  animation: canopy-drift 18s ease-in-out infinite;
  will-change: transform, opacity;
}

.lava-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(28px);
  transform: translate3d(0, 0, 0);
  will-change: transform;
  mix-blend-mode: screen;
  opacity: 0.9;
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
  opacity: 0.5;
}
.orb--e1 {
  width: 280px; height: 280px;
  bottom: 12%; right: -40px;
  background: radial-gradient(circle, rgba(242, 168, 29, 0.35) 0%, rgba(242, 168, 29, 0) 70%);
  animation: lavaB 14s ease-in-out infinite;
  opacity: 0.45;
}

/* --- Bottom vignette for content legibility --- */
.hero-vignette {
  position: absolute;
  inset: auto 0 0 0;
  height: 40%;
  background: linear-gradient(to bottom, transparent 0%, rgba(4, 43, 26, 0.35) 100%);
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
  .hero-canopy {
    animation: none;
  }
}
</style>
