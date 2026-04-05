<template>
  <div class="flex min-h-screen flex-col bg-surface">
    <CommonAppHeader />
    <CommonDataDisclaimer v-if="isMock" :compact="true" class="mx-auto w-full max-w-screen-xl px-4" />
    <main class="flex-1">
      <slot />
    </main>
    <CommonAppFooter />
  </div>
</template>

<script setup lang="ts">
const { isMock } = useDataSource()
</script>
