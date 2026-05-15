// useToast — sistema de notificaciones (toasts) unificado para el admin.
//
// El estado vive en un singleton a nivel de módulo (no en Pinia) porque es
// puramente UI y no necesita persistencia ni hidratación SSR. Cualquier
// página puede llamar `const t = useToast(); t.success('...')`.
//
// El componente `<AdminToastContainer />` (montado en layouts/admin.vue) lee
// `toasts.value` y los renderiza con animación de entrada/salida.

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  variant: ToastVariant
  title: string
  message?: string
  /** Cuántos ms antes de auto-dismiss. 0 = persistente hasta dismiss manual. */
  duration: number
}

const toasts = ref<Toast[]>([])
let _nextId = 1

const dismiss = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

const push = (toast: Omit<Toast, 'id'>): number => {
  const id = _nextId++
  toasts.value = [...toasts.value, { id, ...toast }]
  if (toast.duration > 0) {
    setTimeout(() => dismiss(id), toast.duration)
  }
  return id
}

/**
 * Extrae un mensaje legible de un error de ofetch ($fetch) o uno genérico.
 * `e?.data?.error?.message` es el formato estándar del backend cercu-backend.
 */
const errorMessage = (err: unknown, fallback = 'Ocurrió un error'): string => {
  if (!err) return fallback
  if (typeof err === 'string') return err
  const anyErr = err as any
  return (
    anyErr?.data?.error?.message ||
    anyErr?.data?.message ||
    anyErr?.message ||
    fallback
  )
}

export const useToast = () => ({
  toasts,
  dismiss,
  success: (title: string, message?: string, duration = 3500) =>
    push({ variant: 'success', title, message, duration }),
  error: (title: string, message?: string, duration = 6000) =>
    push({ variant: 'error', title, message, duration }),
  info: (title: string, message?: string, duration = 3500) =>
    push({ variant: 'info', title, message, duration }),
  warning: (title: string, message?: string, duration = 4500) =>
    push({ variant: 'warning', title, message, duration }),
  /** Toast de error desde un error de fetch — extrae el mensaje del backend. */
  errorFrom: (err: unknown, fallback = 'Ocurrió un error', title = 'Error') =>
    push({ variant: 'error', title, message: errorMessage(err, fallback), duration: 6000 }),
})
