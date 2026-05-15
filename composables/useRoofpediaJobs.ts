// useRoofpediaJobs — cliente del API admin de Roofpedia jobs (cercu-backend).
//
// Endpoints:
//   POST   /observatory/techos-verdes/admin/roofpedia/scan
//   GET    /observatory/techos-verdes/admin/roofpedia/jobs
//   GET    /observatory/techos-verdes/admin/roofpedia/jobs/running
//   GET    /observatory/techos-verdes/admin/roofpedia/jobs/:publicId
//   GET    /observatory/techos-verdes/admin/roofpedia/jobs/:publicId/log
//   POST   /observatory/techos-verdes/admin/roofpedia/jobs/:publicId/cancel

export type RoofpediaJobStatus = 'pending' | 'running' | 'done' | 'failed' | 'cancelled'

export interface RoofpediaJobDTO {
  publicId: string
  observatory: string
  alcaldiaSlug: string
  alcaldiaNombre: string
  status: RoofpediaJobStatus
  requestedBy: string
  costEstimateUsd: number
  startedAt: string | null
  finishedAt: string | null
  errorMessage: string | null
  result: Record<string, unknown> | null
  createdAt: string
}

const BASE = '/observatory/techos-verdes/admin/roofpedia'

export function useRoofpediaJobs() {
  const { apiFetch } = useApi()

  async function startScan(alcaldiaNombre: string, costEstimateUsd: number) {
    const res = await apiFetch<{ success: true; job: RoofpediaJobDTO }>(
      `${BASE}/scan`,
      { method: 'POST', body: { alcaldiaNombre, costEstimateUsd } },
    )
    return res.job
  }

  async function listJobs(params: { status?: RoofpediaJobStatus; limit?: number } = {}) {
    const qs = new URLSearchParams()
    if (params.status) qs.set('status', params.status)
    if (params.limit) qs.set('limit', String(params.limit))
    const suffix = qs.toString() ? `?${qs.toString()}` : ''
    const res = await apiFetch<{ success: true; items: RoofpediaJobDTO[]; total: number }>(
      `${BASE}/jobs${suffix}`,
    )
    return res
  }

  async function getRunning() {
    const res = await apiFetch<{ success: true; job: RoofpediaJobDTO | null }>(
      `${BASE}/jobs/running`,
    )
    return res.job
  }

  async function getJob(publicId: string) {
    const res = await apiFetch<{ success: true; job: RoofpediaJobDTO }>(
      `${BASE}/jobs/${publicId}`,
    )
    return res.job
  }

  async function getJobLog(publicId: string, lines = 200) {
    const res = await apiFetch<{ success: true; tail: string }>(
      `${BASE}/jobs/${publicId}/log?lines=${lines}`,
    )
    return res.tail
  }

  async function cancelJob(publicId: string) {
    const res = await apiFetch<{ success: true; job: RoofpediaJobDTO }>(
      `${BASE}/jobs/${publicId}/cancel`,
      { method: 'POST' },
    )
    return res.job
  }

  return { startScan, listJobs, getRunning, getJob, getJobLog, cancelJob }
}

/**
 * Poller reactivo de un job. Devuelve `job`, `log`, `loading`, `error` y un
 * `stop()`. Hace polling cada `intervalMs` (default 5s) hasta que el job
 * termina en estado terminal (done/failed/cancelled).
 */
export function usePollJob(publicId: Ref<string | null>, intervalMs = 5000) {
  const api = useRoofpediaJobs()
  const job = ref<RoofpediaJobDTO | null>(null)
  const log = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const isTerminal = computed(() =>
    job.value ? ['done', 'failed', 'cancelled'].includes(job.value.status) : false,
  )

  async function tick() {
    if (!publicId.value) return
    try {
      const [j, l] = await Promise.all([
        api.getJob(publicId.value),
        api.getJobLog(publicId.value, 400),
      ])
      job.value = j
      log.value = l
      if (['done', 'failed', 'cancelled'].includes(j.status)) stop()
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || 'Error al consultar job'
    }
  }

  function start() {
    if (timer) return
    loading.value = true
    tick().finally(() => (loading.value = false))
    timer = setInterval(tick, intervalMs)
  }

  function stop() {
    if (timer) clearInterval(timer)
    timer = null
  }

  watch(publicId, (v) => {
    stop()
    job.value = null
    log.value = ''
    error.value = null
    if (v) start()
  }, { immediate: true })

  onScopeDispose(stop)

  return { job, log, loading, error, isTerminal, refresh: tick, stop }
}
