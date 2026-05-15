<script setup lang="ts">
// Contenedor fijo de toasts del admin. Monta una sola vez en layouts/admin.vue
// y escucha el estado del composable useToast. Animaciones de entrada/salida
// con <TransitionGroup>.

const { toasts, dismiss } = useToast()

const iconFor = (variant: string) => {
  switch (variant) {
    case 'success': return 'lucide:check-circle-2'
    case 'error':   return 'lucide:x-circle'
    case 'warning': return 'lucide:alert-triangle'
    default:        return 'lucide:info'
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex flex-col items-center gap-2 px-4 sm:right-4 sm:left-auto sm:top-4 sm:items-end sm:px-0"
      role="region"
      aria-label="Notificaciones"
    >
      <TransitionGroup name="toast" tag="div" class="flex w-full max-w-md flex-col gap-2">
        <div
          v-for="t in toasts"
          :key="t.id"
          :class="['toast', `toast--${t.variant}`]"
          role="status"
          :aria-live="t.variant === 'error' ? 'assertive' : 'polite'"
        >
          <Icon :name="iconFor(t.variant)" size="20" class="toast-icon shrink-0" />
          <div class="min-w-0 flex-1">
            <p class="toast-title">{{ t.title }}</p>
            <p v-if="t.message" class="toast-message">{{ t.message }}</p>
          </div>
          <button
            type="button"
            class="toast-close"
            :aria-label="'Cerrar: ' + t.title"
            @click="dismiss(t.id)"
          >
            <Icon name="lucide:x" size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background: var(--c-surface, white);
  border: 1px solid var(--c-border, #E5E7EB);
  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.18), 0 4px 10px rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
}

.toast--success { border-left: 4px solid #0E5E3A; }
.toast--success .toast-icon { color: #0E5E3A; }

.toast--error { border-left: 4px solid #D9363E; }
.toast--error .toast-icon { color: #D9363E; }

.toast--warning { border-left: 4px solid #D99517; }
.toast--warning .toast-icon { color: #D99517; }

.toast--info { border-left: 4px solid #18A5E3; }
.toast--info .toast-icon { color: #18A5E3; }

.toast-title {
  margin: 0;
  font-weight: 600;
  color: var(--c-ink, #1F2937);
  line-height: 1.3;
}

.toast-message {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--c-ink-muted, #5E6B78);
  line-height: 1.45;
  word-break: break-word;
}

.toast-close {
  shrink: 0;
  margin: -0.15rem -0.25rem 0 0;
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: var(--c-ink-soft, #94A3B8);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.toast-close:hover {
  background: var(--c-surface-2, #F5F7F2);
  color: var(--c-ink, #1F2937);
}

/* Transition group animaciones */
.toast-enter-active {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}
.toast-leave-active {
  transition: transform 0.25s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease;
  position: absolute;
  width: 100%;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}
.toast-move {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move {
    transition: none;
  }
}
</style>
