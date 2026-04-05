<template>
  <div>
    <!-- ================================================================ -->
    <!-- S.0 — Modelo de Retroalimentación                                 -->
    <!-- ================================================================ -->
    <section class="py-12">
      <div class="container-wide">
        <CommonSectionTitle
          title="Simulación de dinámica de sistemas"
          subtitle="Modelo con ciclos de retroalimentación, saturación territorial y curvas de aprendizaje para proyectar escenarios de política pública."
          tag="Simulación"
        />

        <h3 class="mt-10 text-lg font-semibold text-ink">Ciclos del modelo</h3>
        <p class="mt-1 text-sm text-slate-custom">Cuatro mecanismos que determinan la velocidad y alcance de la instalación de techos verdes.</p>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- R1 -->
          <div class="panel p-4 border-l-4 border-eco">
            <div class="flex items-center gap-2">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eco/10 text-xs font-bold text-eco">R1</span>
              <h4 class="text-sm font-semibold text-ink">Ciclo Virtuoso</h4>
              <span class="badge-eco text-[10px]">Reforzante</span>
            </div>
            <p class="mt-2 text-xs text-slate-custom leading-relaxed">
              Más techos verdes → mayores ahorros energéticos e hídricos → más presupuesto disponible → más instalaciones.
            </p>
          </div>
          <!-- R2 -->
          <div class="panel p-4 border-l-4 border-primary">
            <div class="flex items-center gap-2">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">R2</span>
              <h4 class="text-sm font-semibold text-ink">Efecto Demostración</h4>
              <span class="badge-primary text-[10px]">Reforzante</span>
            </div>
            <p class="mt-2 text-xs text-slate-custom leading-relaxed">
              Más techos verdes → mayor visibilidad → apoyo político y social → más programas e incentivos.
            </p>
          </div>
          <!-- B1 -->
          <div class="panel p-4 border-l-4 border-accent">
            <div class="flex items-center gap-2">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">B1</span>
              <h4 class="text-sm font-semibold text-ink">Saturación Territorial</h4>
              <span class="badge-accent text-[10px]">Balanceante</span>
            </div>
            <p class="mt-2 text-xs text-slate-custom leading-relaxed">
              Más techos instalados → menos sitios disponibles → menor tasa de nuevas instalaciones.
            </p>
          </div>
          <!-- B2 -->
          <div class="panel p-4 border-l-4 border-alert">
            <div class="flex items-center gap-2">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-alert/10 text-xs font-bold text-alert">B2</span>
              <h4 class="text-sm font-semibold text-ink">Capacidad de Implementación</h4>
              <span class="badge-alert text-[10px]">Balanceante</span>
            </div>
            <p class="mt-2 text-xs text-slate-custom leading-relaxed">
              Alta demanda → escasez de contratistas y materiales → costos crecientes → instalación más lenta.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- S.1 — Controles de Simulación                                     -->
    <!-- ================================================================ -->
    <section class="py-12 bg-white border-t border-gray-100">
      <div class="container-wide">
        <h3 class="text-lg font-semibold text-ink">Controles de simulación</h3>

        <!-- Escenarios activos -->
        <div class="mt-4">
          <p class="text-xs font-medium text-slate-custom mb-2">Escenarios activos</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="sc in scenarios"
              :key="sc.id"
              class="flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all"
              :class="activeScenarios[sc.id]
                ? 'border-current shadow-sm scale-[1.02]'
                : 'border-gray-200 text-slate-custom opacity-60 hover:opacity-80'"
              :style="activeScenarios[sc.id] ? { color: sc.color, borderColor: sc.color } : {}"
              @click="activeScenarios[sc.id] = !activeScenarios[sc.id]"
            >
              <span
                class="h-2.5 w-2.5 rounded-full"
                :style="{ backgroundColor: activeScenarios[sc.id] ? sc.color : '#9ca3af' }"
              />
              {{ sc.nombre }}
            </button>
          </div>
        </div>

        <!-- Horizonte -->
        <div class="mt-6">
          <p class="text-xs font-medium text-slate-custom mb-2">Horizonte de simulación</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="y in horizonteOptions"
              :key="y"
              class="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
              :class="horizonte === y
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 text-slate-custom hover:bg-gray-200'"
              @click="horizonte = y"
            >
              {{ y }} años
            </button>
          </div>
        </div>

        <!-- Palancas de política (colapsable) -->
        <div class="mt-6">
          <button
            class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            @click="expandedPalancas = !expandedPalancas"
          >
            <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-90': expandedPalancas }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
            {{ expandedPalancas ? 'Ocultar palancas' : 'Palancas de política' }}
          </button>
          <Transition name="slide-up">
            <div v-show="expandedPalancas" class="mt-4 panel p-4 space-y-4">
              <p class="text-[10px] text-slate-custom">Estas palancas modifican <strong>todos</strong> los escenarios activos simultáneamente.</p>

              <!-- Multiplicador presupuesto -->
              <div>
                <div class="flex items-center justify-between">
                  <label class="text-xs font-medium text-ink">Multiplicador de presupuesto</label>
                  <span class="text-xs font-semibold text-primary tabular-nums">{{ levers.multiplicadorPresupuesto.toFixed(1) }}x</span>
                </div>
                <input
                  v-model.number="levers.multiplicadorPresupuesto"
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  class="mt-1 w-full accent-primary"
                />
              </div>

              <!-- Fracción reinversión -->
              <div>
                <div class="flex items-center justify-between">
                  <label class="text-xs font-medium text-ink">Fracción de reinversión</label>
                  <span class="text-xs font-semibold text-primary tabular-nums">{{ (levers.fraccionReinversion * 100).toFixed(0) }}%</span>
                </div>
                <input
                  v-model.number="levers.fraccionReinversion"
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  class="mt-1 w-full accent-primary"
                />
              </div>

              <!-- Participación privada -->
              <div>
                <div class="flex items-center justify-between">
                  <label class="text-xs font-medium text-ink">Participación privada</label>
                  <span class="text-xs font-semibold text-primary tabular-nums">{{ levers.participacionPrivada.toFixed(1) }}x</span>
                </div>
                <input
                  v-model.number="levers.participacionPrivada"
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  class="mt-1 w-full accent-primary"
                />
              </div>

              <!-- Retraso de política -->
              <div>
                <div class="flex items-center justify-between">
                  <label class="text-xs font-medium text-ink">Retraso de política</label>
                  <span class="text-xs font-semibold text-primary tabular-nums">{{ levers.aniosRetrasoPolitica }} años</span>
                </div>
                <input
                  v-model.number="levers.aniosRetrasoPolitica"
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  class="mt-1 w-full accent-primary"
                />
              </div>

              <button
                class="btn-ghost text-xs"
                @click="resetLevers"
              >
                Restablecer palancas
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- S.2 — Gráficas Comparativas                                       -->
    <!-- ================================================================ -->
    <section class="py-12 border-t border-gray-100">
      <div class="container-wide">
        <h3 class="text-lg font-semibold text-ink">Proyección comparativa</h3>
        <p class="mt-1 text-sm text-slate-custom">Evolución temporal de cada escenario durante {{ horizonte }} años.</p>

        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- m² Instalados -->
          <div class="panel p-4">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsLineChart
                :labels="chartLabels"
                :datasets="chartM2Instalados"
                title="m² de techos verdes instalados"
              />
            </ClientOnly>
          </div>

          <!-- Tasa de instalación -->
          <div class="panel p-4">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsLineChart
                :labels="chartLabels"
                :datasets="chartTasaInstalacion"
                title="Tasa de instalación (m²/año)"
              />
            </ClientOnly>
          </div>

          <!-- Reducción de temperatura -->
          <div class="panel p-4">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsLineChart
                :labels="chartLabels"
                :datasets="chartTemperatura"
                title="Reducción de temperatura (°C)"
              />
            </ClientOnly>
          </div>

          <!-- Energía acumulada -->
          <div class="panel p-4">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsLineChart
                :labels="chartLabels"
                :datasets="chartEnergia"
                title="Energía ahorrada acumulada (MWh)"
              />
            </ClientOnly>
          </div>

          <!-- CO₂ evitado -->
          <div class="panel p-4">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsLineChart
                :labels="chartLabels"
                :datasets="chartCO2"
                title="CO₂ evitado acumulado (ton)"
              />
            </ClientOnly>
          </div>

          <!-- Costo unitario -->
          <div class="panel p-4">
            <ClientOnly>
              <template #fallback>
                <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
              </template>
              <ChartsLineChart
                :labels="chartLabels"
                :datasets="chartCostoUnit"
                title="Costo unitario (MXN/m²)"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- S.3 — Métricas Comparativas                                       -->
    <!-- ================================================================ -->
    <section class="py-12 bg-white border-t border-gray-100">
      <div class="container-wide">
        <h3 class="text-lg font-semibold text-ink">Resumen por escenario</h3>
        <p class="mt-1 text-sm text-slate-custom">Métricas al final del horizonte de {{ horizonte }} años.</p>

        <!-- Cards -->
        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="r in activeResults"
            :key="r.scenarioId"
            class="panel p-4 border-l-4"
            :style="{ borderLeftColor: r.params.color }"
          >
            <h4 class="text-sm font-semibold text-ink">{{ r.params.nombre }}</h4>
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">m² finales</span>
                <span class="font-semibold tabular-nums">{{ fmt(r.resumen.m2FinalInstalados) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">Pico instalación</span>
                <span class="font-semibold tabular-nums">{{ fmt(r.resumen.m2PicoAnual) }} m²/año</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">Energía total</span>
                <span class="font-semibold tabular-nums">{{ fmt(r.resumen.energiaTotalMwh) }} MWh</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">CO₂ evitado</span>
                <span class="font-semibold tabular-nums">{{ fmtDec(r.resumen.co2TotalTon) }} ton</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">ΔT final</span>
                <span class="font-semibold tabular-nums">{{ r.resumen.tempReduccionFinal.toFixed(2) }}°C</span>
              </div>
              <hr class="border-gray-100" />
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">Inversión total</span>
                <span class="font-semibold tabular-nums">{{ fmtMXN(r.resumen.inversionTotal) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-custom">ROI</span>
                <span class="font-semibold tabular-nums" :class="r.resumen.roiPct >= 0 ? 'text-eco' : 'text-alert'">
                  {{ r.resumen.roiPct.toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla comparativa colapsable -->
        <div class="mt-6">
          <button
            class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            @click="expandedTabla = !expandedTabla"
          >
            <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-90': expandedTabla }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
            {{ expandedTabla ? 'Ocultar tabla comparativa' : 'Ver tabla comparativa detallada' }}
          </button>
          <Transition name="slide-up">
            <div v-show="expandedTabla" class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table class="table-base w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th>Métrica</th>
                    <th
                      v-for="r in activeResults"
                      :key="r.scenarioId"
                      class="text-right"
                    >
                      <span class="inline-flex items-center gap-1">
                        <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: r.params.color }" />
                        {{ r.params.nombre }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="metric in tableMetrics" :key="metric.key">
                    <td class="font-medium whitespace-nowrap">{{ metric.label }}</td>
                    <td
                      v-for="r in activeResults"
                      :key="r.scenarioId"
                      class="text-right tabular-nums"
                    >
                      {{ metric.format(r.resumen) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- S.4 — Nota Metodológica                                           -->
    <!-- ================================================================ -->
    <section class="py-12 border-t border-gray-100">
      <div class="container-wide">
        <button
          class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          @click="expandedMetodologia = !expandedMetodologia"
        >
          <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-90': expandedMetodologia }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
          {{ expandedMetodologia ? 'Ocultar nota metodológica' : 'Nota metodológica' }}
        </button>
        <Transition name="slide-up">
          <div v-show="expandedMetodologia" class="mt-4 panel p-6 space-y-4 text-xs text-slate-custom leading-relaxed">
            <h4 class="text-sm font-semibold text-ink">Método de integración</h4>
            <p>
              Se utiliza el método de <strong>Euler explícito</strong> con paso temporal dt = 0.25 años (trimestral), lo que genera
              {{ Math.round(horizonte / 0.25) }} pasos por escenario. Las gráficas muestran muestras anuales para mayor legibilidad.
            </p>

            <h4 class="text-sm font-semibold text-ink">Ciclos de retroalimentación</h4>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>R1 (Ciclo Virtuoso):</strong> Los ahorros generados por techos existentes se reinvierten parcialmente, aumentando el presupuesto disponible.</li>
              <li><strong>R2 (Efecto Demostración):</strong> La visibilidad de los techos instalados genera apoyo político que facilita nuevos programas. Modelado con función logarítmica.</li>
              <li><strong>B1 (Saturación Territorial):</strong> A medida que se cubren los sitios disponibles (514,000 m² potenciales), la tasa de instalación disminuye proporcionalmente.</li>
              <li><strong>B2 (Capacidad de Implementación):</strong> La demanda de instalación está limitada por la capacidad del mercado local (máx. ~50,000 m²/año), modelada como restricción logística.</li>
            </ul>

            <h4 class="text-sm font-semibold text-ink">Supuestos clave</h4>
            <ul class="list-disc pl-4 space-y-1">
              <li>Inventario inicial: 79,584 m² (Cervantes Nájera, 2025)</li>
              <li>Potencial total: 514,000 m² (análisis GIS multicriterio)</li>
              <li>Costo base: $1,200 MXN/m² (TVLE extensivo)</li>
              <li>Costo mínimo (economías de escala): $720 MXN/m² (60% del original)</li>
              <li>Tasas de impacto ambiental: Cervantes Nájera (2021, 2025) CIIEMAD-IPN</li>
              <li>La temperatura sigue un modelo exponencial asintótico (−3.5°C máximo)</li>
            </ul>

            <h4 class="text-sm font-semibold text-ink">Limitaciones</h4>
            <ul class="list-disc pl-4 space-y-1">
              <li>No incluye efectos estacionales ni variabilidad climática interanual</li>
              <li>Los costos de referencia son constantes (excepto la curva de aprendizaje de instalación)</li>
              <li>La capacidad de implementación es una aproximación, no una medición del mercado</li>
              <li>No considera cambios regulatorios impredecibles ni disrupciones externas</li>
            </ul>

            <div class="rounded-lg border border-accent/30 bg-accent/5 p-3">
              <p>
                <span class="font-semibold text-accent">Nota:</span>
                Este modelo es una <strong>herramienta exploratoria</strong> para comparar escenarios de política pública, no una predicción determinista.
                Los resultados deben interpretarse como tendencias relativas entre escenarios, no como pronósticos absolutos.
              </p>
            </div>

            <h4 class="text-sm font-semibold text-ink">Fuentes</h4>
            <ul class="list-disc pl-4 space-y-1">
              <li>Cervantes Nájera, A.L. (2021). Tesis de maestría, CIIEMAD-IPN.</li>
              <li>Cervantes Nájera, A.L. (2025). Tesis doctoral, CIIEMAD-IPN.</li>
              <li>CFE (2024). Tarifa DAC promedio CDMX.</li>
              <li>CONAGUA/SACMEX (2022). Costos de agua no gestionada.</li>
              <li>México2 (2024). Precio crédito de carbono.</li>
            </ul>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  SCENARIOS,
  DEFAULT_LEVERS,
  runAllScenarios,
  sampleAnnual,
} from '~/composables/useSystemDynamics'
import type {
  ScenarioId,
  PolicyLevers,
  SDSimulationResult,
  SDResumen,
} from '~/composables/useSystemDynamics'

const { formatNumber } = useFormatters()

// Aliases cortos
const fmt = (v: number) => formatNumber(v)
const fmtDec = (v: number) => formatNumber(v, true)

const mxnFmt = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})
const fmtMXN = (v: number) => Number.isFinite(v) ? mxnFmt.format(v) : '$0'

// ─── State ───────────────────────────────────────────────────────────────────

const scenarios = SCENARIOS

const activeScenarios = reactive<Record<ScenarioId, boolean>>({
  sin_intervencion: true,
  tendencial: true,
  politica_activa: true,
  optimista: true,
})

const horizonteOptions = [10, 20, 30, 40, 50]
const horizonte = ref(30)

const levers = reactive<PolicyLevers>({ ...DEFAULT_LEVERS })

const expandedPalancas = ref(false)
const expandedTabla = ref(false)
const expandedMetodologia = ref(false)

function resetLevers() {
  Object.assign(levers, DEFAULT_LEVERS)
}

// ─── Simulation ──────────────────────────────────────────────────────────────

const allResults = computed<SDSimulationResult[]>(() => {
  return runAllScenarios(horizonte.value, levers)
})

const activeResults = computed(() => {
  return allResults.value.filter(r => activeScenarios[r.scenarioId])
})

// ─── Chart data ──────────────────────────────────────────────────────────────

const chartLabels = computed(() => {
  if (activeResults.value.length === 0) return []
  const annual = sampleAnnual(activeResults.value[0].series)
  return annual.map(s => `${Math.round(s.t)}`)
})

function buildDatasets(
  getValue: (s: ReturnType<typeof sampleAnnual>[number]) => number,
) {
  return activeResults.value.map(r => {
    const annual = sampleAnnual(r.series)
    return {
      label: r.params.nombre,
      data: annual.map(s => Math.round(getValue(s) * 100) / 100),
      borderColor: r.params.color,
      fill: false,
    }
  })
}

const chartM2Instalados = computed(() => buildDatasets(s => s.m2Instalados))
const chartTasaInstalacion = computed(() => buildDatasets(s => s.tasaInstalacionEfectiva))
const chartTemperatura = computed(() => buildDatasets(s => s.deltaTemperatura))
const chartEnergia = computed(() => buildDatasets(s => s.energiaAcumuladaMwh))
const chartCO2 = computed(() => buildDatasets(s => s.co2AcumuladaTon))
const chartCostoUnit = computed(() => buildDatasets(s => s.costoUnitarioActual))

// ─── Table metrics ───────────────────────────────────────────────────────────

const tableMetrics = [
  { key: 'm2', label: 'm² finales instalados', format: (r: SDResumen) => fmt(r.m2FinalInstalados) },
  { key: 'pico', label: 'Pico de instalación (m²/año)', format: (r: SDResumen) => fmt(r.m2PicoAnual) },
  { key: 'anioPico', label: 'Año del pico', format: (r: SDResumen) => `Año ${r.anioPicoInstalacion}` },
  { key: 'energia', label: 'Energía ahorrada (MWh)', format: (r: SDResumen) => fmt(r.energiaTotalMwh) },
  { key: 'agua', label: 'Agua captada (m³)', format: (r: SDResumen) => fmt(r.aguaTotalM3) },
  { key: 'co2', label: 'CO₂ evitado (ton)', format: (r: SDResumen) => fmtDec(r.co2TotalTon) },
  { key: 'temp', label: 'Reducción temperatura (°C)', format: (r: SDResumen) => r.tempReduccionFinal.toFixed(2) },
  { key: 'inversion', label: 'Inversión total (MXN)', format: (r: SDResumen) => fmtMXN(r.inversionTotal) },
  { key: 'beneficio', label: 'Beneficio total (MXN)', format: (r: SDResumen) => fmtMXN(r.beneficioTotal) },
  { key: 'roi', label: 'ROI (%)', format: (r: SDResumen) => `${r.roiPct.toFixed(1)}%` },
]
</script>
