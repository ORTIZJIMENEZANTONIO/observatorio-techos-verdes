<template>
  <div class="bg-surface">
    <CommonHeroSection compact>
      <h1 class="text-3xl font-extrabold text-white md:text-4xl">Indicadores ambientales y territoriales</h1>
      <p class="mt-2 text-base text-white/80">Métricas clave del estado de los techos verdes en la Ciudad de México</p>
    </CommonHeroSection>

    <!-- KPIs + Tabs -->
    <section class="bg-white py-16">
      <div class="container-wide">
        <!-- KPI grid -->
        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
            <p class="text-2xl font-bold" :class="kpiColor(kpi.color)">{{ kpi.valor }}</p>
            <p class="text-xs text-slate-custom">{{ kpi.label }}</p>
            <p v-if="kpi.unidad" class="text-[10px] text-ink-muted">{{ kpi.unidad }}</p>
            <p v-if="kpi.cambio" class="mt-1 text-[10px] font-medium text-eco">{{ kpi.cambio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- Tab Navigation                                                    -->
    <!-- ================================================================ -->
    <div class="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div class="container-wide">
        <nav class="flex gap-1 overflow-x-auto py-2 scrollbar-hide" aria-label="Secciones de indicadores">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
            :class="activeTab === tab.id
              ? 'bg-primary text-white shadow-sm'
              : 'text-slate-custom hover:bg-gray-100 hover:text-ink'"
            @click="activeTab = tab.id"
          >
            <span v-html="tab.icon" />
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- ================================================================ -->
    <!-- TAB 1: Distribución Territorial                                    -->
    <!-- ================================================================ -->
    <div v-show="activeTab === 'territorial'">
      <!-- Distribution by alcaldia -->
      <section class="py-12">
        <div class="container-wide">
          <h3 class="text-xl font-semibold text-ink">Distribución por alcaldía</h3>
          <p class="mt-1 text-sm text-slate-custom">Cantidad de techos verdes existentes vs candidatos por alcaldía</p>
          <div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div class="panel p-6">
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsBarChart
                  :labels="alcaldiaChartLabels"
                  :datasets="alcaldiaChartDatasets"
                  :horizontal="true"
                />
              </ClientOnly>
            </div>
            <!-- Collapsible table -->
            <div>
              <button
                class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
                @click="toggleTable('alcaldia')"
              >
                <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-90': expandedTables.alcaldia }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
                {{ expandedTables.alcaldia ? 'Ocultar tabla' : 'Ver tabla detallada' }}
              </button>
              <Transition name="slide-up">
                <div v-show="expandedTables.alcaldia" class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table class="table-base w-full min-w-[320px]">
                    <thead>
                      <tr>
                        <th class="cursor-pointer select-none" @click="toggleSort('alcaldia', 'alcaldia')">Alcaldía <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.alcaldia, 'alcaldia') }}</span></th>
                        <th class="cursor-pointer select-none" @click="toggleSort('alcaldia', 'existing')">Existentes <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.alcaldia, 'existing') }}</span></th>
                        <th class="cursor-pointer select-none" @click="toggleSort('alcaldia', 'candidates')">Candidatos <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.alcaldia, 'candidates') }}</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in alcaldiaData" :key="row.alcaldia">
                        <td class="font-medium">{{ row.alcaldia }}</td>
                        <td><span class="font-semibold text-primary">{{ row.existing }}</span></td>
                        <td><span class="font-semibold text-secondary">{{ row.candidates }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Distribution by building type + techo type (side by side) -->
      <section class="bg-white py-12">
        <div class="container-wide">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <!-- Building type -->
            <div>
              <h3 class="text-xl font-semibold text-ink">Distribución por tipo de edificio</h3>
              <p class="mt-1 text-sm text-slate-custom">Clasificación según tipo de edificio</p>
              <div class="mt-6 panel p-6">
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsBarChart
                    :labels="buildingTypeLabels"
                    :datasets="buildingTypeDatasets"
                    :horizontal="true"
                  />
                </ClientOnly>
              </div>
            </div>
            <!-- Techo type -->
            <div>
              <h3 class="text-xl font-semibold text-ink">Tipo de techo verde</h3>
              <p class="mt-1 text-sm text-slate-custom">Clasificación según cubierta vegetal</p>
              <div class="mt-6 flex justify-center">
                <div class="panel p-6" style="max-width: 400px; width: 100%;">
                  <ClientOnly>
                    <template #fallback>
                      <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                    </template>
                    <ChartsDoughnutChart
                      :labels="techoTypeLabels"
                      :data="techoTypeCounts"
                      :colors="techoTypeColors"
                      :show-total="true"
                      total-label="techos"
                      :show-legend="true"
                    />
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Top alcaldias by score -->
      <section class="py-12">
        <div class="container-wide">
          <h3 class="text-xl font-semibold text-ink">Zonas con mayor aptitud</h3>
          <p class="mt-1 text-sm text-slate-custom">Top 5 alcaldías por score promedio de aptitud territorial</p>
          <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            <div
              v-for="(item, index) in topAlcaldias"
              :key="item.alcaldia"
              class="panel text-center"
            >
              <div class="mb-2 flex items-center justify-center gap-1">
                <span
                  :class="[
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white',
                    index === 0 ? 'bg-primary' : index === 1 ? 'bg-eco' : 'bg-secondary'
                  ]"
                >
                  {{ index + 1 }}
                </span>
              </div>
              <p class="text-sm font-semibold text-ink">{{ item.alcaldia }}</p>
              <p class="mt-1 text-2xl font-bold" :style="{ color: scoreColor(item.avgScore) }">{{ item.avgScore.toFixed(1) }}</p>
              <p class="text-xs text-slate-custom">score promedio</p>
              <p class="mt-1 text-[10px] text-ink-muted">{{ item.count }} candidatos</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ================================================================ -->
    <!-- TAB 2: Aptitud y Validaciones                                     -->
    <!-- ================================================================ -->
    <div v-show="activeTab === 'aptitud'">
      <!-- Score histogram + Radar side by side -->
      <section class="py-12">
        <div class="container-wide">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <!-- Score histogram -->
            <div>
              <h3 class="text-xl font-semibold text-ink">Distribución de scores de aptitud</h3>
              <p class="mt-1 text-sm text-slate-custom">Histograma de los 60 candidatos priorizados</p>
              <div class="mt-6 panel p-6">
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsBarChart
                    :labels="histogramLabels"
                    :datasets="histogramDatasets"
                  />
                </ClientOnly>
              </div>
            </div>
            <!-- Radar: aptitud profile -->
            <div>
              <h3 class="text-xl font-semibold text-ink">Perfil de aptitud promedio</h3>
              <p class="mt-1 text-sm text-slate-custom">8 variables de aptitud territorial</p>
              <div class="mt-6 flex justify-center">
                <div class="panel p-6" style="max-width: 520px; width: 100%;">
                  <ClientOnly>
                    <template #fallback>
                      <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                    </template>
                    <ChartsRadarChart
                      :labels="radarLabels"
                      :data="radarData"
                      :max-value="100"
                      color="#0E5E3A"
                    />
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Validation progress -->
      <section class="bg-white py-12">
        <div class="container-wide">
          <h3 class="text-xl font-semibold text-ink">Avance de validaciones</h3>
          <p class="mt-1 text-sm text-slate-custom">Estado de las validaciones de campo realizadas por expertos del CIIEMAD-IPN</p>
          <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="panel p-6">
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsDoughnutChart
                  :labels="validationLabels"
                  :data="validationCounts"
                  :colors="validationColors"
                  :show-total="true"
                  total-label="validaciones"
                  :show-legend="true"
                />
              </ClientOnly>
            </div>
            <div class="flex items-center justify-center">
              <div class="text-center">
                <div class="relative mx-auto h-40 w-40">
                  <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="12" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#79C141" stroke-width="12"
                      :stroke-dasharray="`${completedPct * 2.51} 251`"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold text-ink">{{ completedPct.toFixed(0) }}%</span>
                    <span class="text-xs text-slate-custom">completado</span>
                  </div>
                </div>
                <p class="mt-4 text-sm text-slate-custom">
                  {{ completedCount }} de {{ totalValidations }} validaciones revisadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ================================================================ -->
    <!-- TAB 3: Medio Ambiente                                             -->
    <!-- ================================================================ -->
    <div v-show="activeTab === 'ambiente'">
      <!-- SECCION A: Biodiversidad -->
      <section class="py-12">
        <div class="container-wide">
          <div class="flex items-center gap-3">
            <h3 class="text-xl font-semibold text-ink">Índices de biodiversidad por alcaldía</h3>
            <CommonDataSourceBadge source-name="CONABIO" />
            <CommonDataSourceBadge source-name="SEDEMA" />
          </div>
          <p class="mt-1 text-sm text-slate-custom">Métricas de diversidad biológica en azoteas verdes, basadas en índices ecológicos estándar</p>

          <!-- KPI cards biodiversidad -->
          <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <div class="kpi-card">
              <p class="text-2xl font-bold text-primary">{{ bioKpis.riquezaPromedio.toFixed(1) }}</p>
              <p class="text-xs text-slate-custom">Riqueza promedio</p>
              <p class="text-[10px] text-ink-muted">especies/alcaldía</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-eco">{{ bioKpis.shannonPromedio.toFixed(2) }}</p>
              <p class="text-xs text-slate-custom">Shannon H' promedio</p>
              <p class="text-[10px] text-ink-muted">índice de diversidad</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-secondary">{{ bioKpis.simpsonPromedio.toFixed(2) }}</p>
              <p class="text-xs text-slate-custom">Simpson 1-D promedio</p>
              <p class="text-[10px] text-ink-muted">índice de dominancia</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-accent">{{ bioKpis.coberturaPromedio.toFixed(1) }}%</p>
              <p class="text-xs text-slate-custom">Cobertura promedio</p>
              <p class="text-[10px] text-ink-muted">vegetal en azoteas</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-primary">{{ bioKpis.totalEspecies }}</p>
              <p class="text-xs text-slate-custom">Total especies</p>
              <p class="text-[10px] text-ink-muted">registradas en la red</p>
            </div>
          </div>

          <!-- Charts: Bar + Radar -->
          <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div class="panel p-6">
              <h4 class="mb-4 text-sm font-semibold text-ink">Riqueza de especies por alcaldía</h4>
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsBarChart
                  :labels="bioBarLabels"
                  :datasets="bioBarDatasets"
                  :horizontal="true"
                />
              </ClientOnly>
            </div>
            <div class="panel p-6">
              <h4 class="mb-4 text-sm font-semibold text-ink">Perfil biótico promedio</h4>
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsRadarChart
                  :labels="bioRadarLabels"
                  :data="bioRadarData"
                  :max-value="100"
                  color="#059669"
                />
              </ClientOnly>
            </div>
          </div>

          <!-- Collapsible table -->
          <div class="mt-6">
            <button
              class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              @click="toggleTable('biodiversidad')"
            >
              <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-90': expandedTables.biodiversidad }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
              {{ expandedTables.biodiversidad ? 'Ocultar tabla' : 'Ver tabla detallada de biodiversidad' }}
            </button>
            <Transition name="slide-up">
              <div v-show="expandedTables.biodiversidad" class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table class="table-base w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th class="cursor-pointer select-none" @click="toggleSort('bio', 'alcaldia')">Alcaldía <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.bio, 'alcaldia') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('bio', 'coberturaVegetal')">Cobertura % <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.bio, 'coberturaVegetal') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('bio', 'riquezaEspecies')">Riqueza spp <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.bio, 'riquezaEspecies') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('bio', 'shannon')">H' <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.bio, 'shannon') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('bio', 'simpson')">1-D <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.bio, 'simpson') }}</span></th>
                      <th>Especies dominantes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in bioTableData" :key="row.alcaldia">
                      <td class="font-medium whitespace-nowrap">{{ row.alcaldia }}</td>
                      <td>
                        <div class="flex items-center gap-2">
                          <div class="h-2 w-16 rounded-full bg-gray-200">
                            <div class="h-2 rounded-full bg-eco" :style="{ width: row.coberturaVegetal + '%' }" />
                          </div>
                          <span class="text-sm font-semibold text-eco">{{ row.coberturaVegetal }}%</span>
                        </div>
                      </td>
                      <td class="font-semibold text-primary">{{ row.riquezaEspecies }}</td>
                      <td class="font-semibold text-secondary">{{ row.indiceShannonWiener.toFixed(2) }}</td>
                      <td class="font-semibold text-accent">{{ row.indiceSimpson.toFixed(2) }}</td>
                      <td class="text-xs text-slate-custom">{{ row.especiesDominantes.join(', ') }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- SECCION B: Cobertura vegetal -->
      <section class="bg-white py-12">
        <div class="container-wide">
          <h3 class="text-xl font-semibold text-ink">Cobertura vegetal en azoteas verdes</h3>
          <p class="mt-1 text-sm text-slate-custom">Porcentaje de cobertura vegetal por alcaldía y distribución por rangos</p>

          <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div class="panel p-6">
              <h4 class="mb-4 text-sm font-semibold text-ink">Cobertura vegetal por alcaldía (%)</h4>
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsBarChart
                  :labels="coberturaBarLabels"
                  :datasets="coberturaBarDatasets"
                  :horizontal="true"
                />
              </ClientOnly>
            </div>
            <div class="flex items-center justify-center">
              <div class="panel p-6" style="max-width: 400px; width: 100%;">
                <h4 class="mb-4 text-center text-sm font-semibold text-ink">Alcaldías por rango de cobertura</h4>
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsDoughnutChart
                    :labels="coberturaRangoLabels"
                    :data="coberturaRangoCounts"
                    :colors="coberturaRangoColors"
                    :show-total="true"
                    total-label="alcaldías"
                    :show-legend="true"
                  />
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCION C: Indicadores hídricos -->
      <section class="py-12">
        <div class="container-wide">
          <div class="flex items-center gap-3">
            <h3 class="text-xl font-semibold text-ink">Indicadores hídricos y captación pluvial</h3>
            <CommonDataSourceBadge source-name="CONAGUA" />
          </div>
          <p class="mt-1 text-sm text-slate-custom">Métricas de captación de agua pluvial, escorrentía evitada y eficiencia de retención en azoteas verdes</p>

          <!-- KPI cards hidricos -->
          <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="kpi-card">
              <p class="text-2xl font-bold text-secondary">{{ hidricoKpis.captacionTotal.toLocaleString('es-MX') }}</p>
              <p class="text-xs text-slate-custom">Captación total</p>
              <p class="text-[10px] text-ink-muted">L/m²/año (suma)</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-primary">{{ hidricoKpis.escorrentiaTotal.toLocaleString('es-MX') }}</p>
              <p class="text-xs text-slate-custom">Escorrentía evitada</p>
              <p class="text-[10px] text-ink-muted">L/año (total)</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-eco">{{ hidricoKpis.eficienciaPromedio.toFixed(1) }}%</p>
              <p class="text-xs text-slate-custom">Eficiencia promedio</p>
              <p class="text-[10px] text-ink-muted">retención hídrica</p>
            </div>
            <div class="kpi-card">
              <p class="text-2xl font-bold text-accent">{{ hidricoKpis.precipitacionMedia.toFixed(0) }}</p>
              <p class="text-xs text-slate-custom">Precipitación media</p>
              <p class="text-[10px] text-ink-muted">mm/año</p>
            </div>
          </div>

          <!-- Charts -->
          <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div class="panel p-6">
              <h4 class="mb-4 text-sm font-semibold text-ink">Captación pluvial por alcaldía (L/m²/año)</h4>
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsBarChart
                  :labels="hidricoBarLabels"
                  :datasets="hidricoBarDatasets"
                  :horizontal="true"
                />
              </ClientOnly>
            </div>
            <div class="panel p-6">
              <h4 class="mb-4 text-sm font-semibold text-ink">Precipitación media anual por alcaldía (mm)</h4>
              <ClientOnly>
                <template #fallback>
                  <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                </template>
                <ChartsLineChart
                  :labels="precipitacionLineLabels"
                  :datasets="precipitacionLineDatasets"
                />
              </ClientOnly>
            </div>
          </div>

          <!-- Collapsible table -->
          <div class="mt-6">
            <button
              class="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              @click="toggleTable('hidrico')"
            >
              <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-90': expandedTables.hidrico }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
              {{ expandedTables.hidrico ? 'Ocultar tabla' : 'Ver tabla detallada de indicadores hídricos' }}
            </button>
            <Transition name="slide-up">
              <div v-show="expandedTables.hidrico" class="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table class="table-base w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th class="cursor-pointer select-none" @click="toggleSort('hidrico', 'alcaldia')">Alcaldía <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.hidrico, 'alcaldia') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('hidrico', 'precipitacionMediaAnual')">Precipitación <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.hidrico, 'precipitacionMediaAnual') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('hidrico', 'captacionPluvial')">Captación <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.hidrico, 'captacionPluvial') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('hidrico', 'escorrentiaEvitada')">Escorrentía <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.hidrico, 'escorrentiaEvitada') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('hidrico', 'superficieVerdeCaptadora')">Sup. capt. <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.hidrico, 'superficieVerdeCaptadora') }}</span></th>
                      <th class="cursor-pointer select-none" @click="toggleSort('hidrico', 'eficienciaRetencion')">Eficiencia <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.hidrico, 'eficienciaRetencion') }}</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in hidricoTableData" :key="row.alcaldia">
                      <td class="font-medium whitespace-nowrap">{{ row.alcaldia }}</td>
                      <td class="font-semibold text-secondary">{{ row.precipitacionMediaAnual }}</td>
                      <td class="font-semibold text-primary">{{ row.captacionPluvial }}</td>
                      <td>{{ row.escorrentiaEvitada.toLocaleString('es-MX') }} L</td>
                      <td>{{ row.superficieVerdeCaptadora.toLocaleString('es-MX') }} m2</td>
                      <td>
                        <div class="flex items-center gap-2">
                          <div class="h-2 w-16 rounded-full bg-gray-200">
                            <div class="h-2 rounded-full bg-secondary" :style="{ width: row.eficienciaRetencion + '%' }" />
                          </div>
                          <span class="text-sm font-semibold text-secondary">{{ row.eficienciaRetencion }}%</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </div>

    <!-- ================================================================ -->
    <!-- TAB 4: Análisis Estadístico para Toma de Decisiones               -->
    <!-- ================================================================ -->
    <div v-show="activeTab === 'estadistico'">
      <section class="py-12">
        <div class="container-wide">
          <CommonSectionTitle
            title="Análisis para toma de decisiones"
            subtitle="Diagnóstico de riesgo, costos de inacción, retorno de inversión y plan de acción para autoridades de alcaldía."
            tag="Decisiones"
          />

          <!-- ============================================================ -->
          <!-- E.0 — Diagnóstico de Riesgo Climático                        -->
          <!-- ============================================================ -->
          <div class="mt-10">
            <h3 class="text-lg font-semibold text-ink">Diagnóstico de riesgo climático</h3>
            <p class="mt-1 text-sm text-slate-custom">Evaluación de 6 indicadores críticos para la alcaldía seleccionada</p>

            <!-- Selector de alcaldia -->
            <div class="mt-4">
              <label class="block text-sm font-semibold text-ink">Alcaldía</label>
              <select v-model="selectedAlcaldia" class="select mt-1 max-w-xs">
                <option v-for="alc in alcaldiaListForRisk" :key="alc" :value="alc">{{ alc }}</option>
              </select>
            </div>

            <!-- 5 tarjetas semaforo -->
            <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-6">
              <div
                v-for="ind in riskProfile.indicadores"
                :key="ind.nombre"
                class="panel p-4"
                :class="{
                  'border-l-4 border-l-alert': ind.nivel === 'critico',
                  'border-l-4 border-l-orange-500': ind.nivel === 'alto',
                  'border-l-4 border-l-accent': ind.nivel === 'moderado',
                  'border-l-4 border-l-eco': ind.nivel === 'bajo',
                }"
              >
                <p class="text-xs font-semibold text-ink">{{ ind.nombre }}</p>
                <p class="mt-1 text-2xl font-bold" :style="{ color: riskLevelColor(ind.nivel) }">
                  {{ typeof ind.valor === 'number' && ind.valor % 1 !== 0 ? ind.valor.toFixed(1) : ind.valor }}
                  <span class="text-xs font-normal text-slate-custom">{{ ind.unidad }}</span>
                </p>
                <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    class="h-2 rounded-full transition-all"
                    :style="{
                      width: riskBarWidth(ind) + '%',
                      backgroundColor: riskLevelColor(ind.nivel),
                    }"
                  />
                </div>
                <p class="mt-1 text-[10px] font-bold uppercase" :style="{ color: riskLevelColor(ind.nivel) }">
                  {{ ind.nivel }}
                </p>
                <p class="mt-0.5 text-[10px] text-slate-custom">{{ ind.umbralRef }}</p>
              </div>
            </div>

            <!-- Caja resumen -->
            <div
              class="mt-6 rounded-lg border-2 p-5"
              :class="{
                'border-alert/40 bg-alert/5': riskProfile.nivelGeneral === 'critico',
                'border-orange-500/40 bg-orange-50': riskProfile.nivelGeneral === 'alto',
                'border-accent/40 bg-accent/5': riskProfile.nivelGeneral === 'moderado',
                'border-eco/40 bg-eco/5': riskProfile.nivelGeneral === 'bajo',
              }"
            >
              <div class="flex items-start gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                  :style="{ backgroundColor: riskLevelColor(riskProfile.nivelGeneral) }"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-ink">
                    La alcaldía {{ selectedAlcaldia }} presenta un nivel de riesgo
                    <span :style="{ color: riskLevelColor(riskProfile.nivelGeneral) }" class="uppercase">{{ riskProfile.nivelGeneral }}</span>
                    ({{ riskProfile.scoreRiesgo.toFixed(0) }}/100)
                  </p>
                  <p class="mt-1 text-sm text-slate-custom">
                    {{ riskAlertCount }} de {{ riskProfile.indicadores.length }} indicadores en zona de alerta.
                    Sin intervención, se espera un incremento sostenido en temperatura superficial y costos asociados a salud pública por golpe de calor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- E.1 — Costo de la Inacción                                   -->
          <!-- ============================================================ -->
          <div class="mt-12">
            <h3 class="text-lg font-semibold text-ink">Impacto potencial sin intervención</h3>
            <p class="mt-1 text-sm text-slate-custom">Recursos no aprovechados y riesgos incrementales si no se instalan techos verdes</p>

            <!-- Controles compartidos: estimador de superficie -->
            <div class="mt-6 panel p-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="block text-sm font-semibold text-ink">Superficie de techos verdes</label>
                  <div class="mt-2 flex items-center gap-3">
                    <input
                      v-model.number="m2Slider"
                      type="range"
                      :min="1000"
                      :max="600000"
                      :step="1000"
                      class="w-full accent-primary"
                    />
                    <div class="flex items-center gap-1">
                      <input
                        :value="m2Slider"
                        type="number"
                        min="100"
                        max="1000000"
                        step="100"
                        class="input w-28 text-right text-sm font-semibold tabular-nums"
                        @input="onM2Input($event)"
                      />
                      <span class="text-xs text-slate-custom">m²</span>
                    </div>
                  </div>
                  <div class="mt-1 flex justify-between text-[10px] text-slate-custom">
                    <span>1,000 m²</span>
                    <span>600,000 m²</span>
                  </div>
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <button
                      v-for="preset in m2Presets"
                      :key="preset.value"
                      class="rounded px-2 py-0.5 text-[10px] font-medium transition-all"
                      :class="m2Slider === preset.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-slate-custom hover:bg-gray-200'"
                      @click="m2Slider = preset.value"
                    >
                      {{ preset.label }}
                    </button>
                  </div>
                  <!-- Toggle ajuste estructural -->
                  <div class="mt-3 flex flex-wrap items-center gap-2">
                    <input
                      id="adjustStructural"
                      v-model="adjustForStructural"
                      type="checkbox"
                      class="h-4 w-4 shrink-0 rounded border-gray-300 text-primary accent-primary"
                    />
                    <label for="adjustStructural" class="text-xs text-ink">Ajustar por viabilidad constructiva</label>
                    <span
                      v-if="adjustForStructural"
                      class="rounded-full bg-eco/10 px-2 py-0.5 text-[10px] font-semibold text-eco-dark"
                    >
                      {{ effectiveM2.m2Efectivos.toLocaleString('es-MX') }} m² efectivos
                    </span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-ink">Horizonte temporal</label>
                  <div class="mt-2 flex gap-2">
                    <button
                      v-for="h in [5, 10, 15, 20]"
                      :key="h"
                      class="rounded-lg px-4 py-2 text-sm font-medium transition-all"
                      :class="yearsHorizon === h
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-gray-100 text-ink hover:bg-gray-200'"
                      @click="yearsHorizon = h"
                    >
                      {{ h }} años
                    </button>
                  </div>
                  <p class="mt-3 text-[10px] text-slate-custom">
                    Población de referencia (alcaldía seleccionada): {{ Math.round(selectedAlcData.pobProm).toLocaleString('es-MX') }} hab.
                  </p>
                </div>
              </div>

              <!-- 4 KPI cards: unidades fisicas + CO₂ monetario -->
              <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <!-- Energia: unidades fisicas -->
                <div class="kpi-card border-l-4 border-l-accent">
                  <p class="text-xl font-bold text-accent">{{ physicalImpacts.energiaMwh.toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} MWh/año</p>
                  <p class="text-xs text-slate-custom">Energía no ahorrada</p>
                  <p class="text-[10px] text-ink-muted">equivale a {{ physicalImpacts.hogares.toLocaleString('es-MX') }} hogares</p>
                  <div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed">
                    {{ m2Slider.toLocaleString('es-MX') }} m² × 432.95 kWh/m²/año
                    <p class="mt-0.5 font-sans text-[9px] italic">Cervantes Nájera (2025), Tabla 15, p. 112.</p>
                  </div>
                </div>
                <!-- Salud: riesgo -->
                <div class="kpi-card border-l-4 border-l-orange-500">
                  <p class="text-xl font-bold text-orange-600">{{ physicalImpacts.consultasAnuales }} consultas/año</p>
                  <p class="text-xs text-slate-custom">Riesgo en salud pública</p>
                  <p class="text-[10px] text-ink-muted">urgencias estimadas por calor</p>
                  <div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed">
                    {{ (selectedAlcData.pobProm / 100000).toFixed(2) }} (×100k hab) × 12 consul./año
                    <p class="mt-0.5 font-sans text-[9px] italic">SINAVE (2023), zonas urbanas >35°C LST.</p>
                  </div>
                </div>
                <!-- Agua: unidades fisicas -->
                <div class="kpi-card border-l-4 border-l-secondary">
                  <p class="text-xl font-bold text-secondary">{{ physicalImpacts.aguaM3.toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} m³/año</p>
                  <p class="text-xs text-slate-custom">Agua no captada</p>
                  <p class="text-[10px] text-ink-muted">escorrentía sin gestionar</p>
                  <div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed">
                    {{ m2Slider.toLocaleString('es-MX') }} m² × 19.5 L/m²/año ÷ 1000
                    <p class="mt-0.5 font-sans text-[9px] italic">Cervantes Nájera (2021), Cap. 5, p. 92.</p>
                  </div>
                </div>
                <!-- CO₂: mantener valor monetario (dato oficial) -->
                <div class="kpi-card border-l-4 border-l-primary">
                  <p class="text-xl font-bold text-primary">{{ physicalImpacts.co2Ton.toLocaleString('es-MX', { maximumFractionDigits: 1 }) }} tonCO₂/año</p>
                  <p class="text-xs text-slate-custom">Emisiones no capturadas</p>
                  <p class="text-[10px] text-ink-muted">{{ formatMXN(physicalImpacts.co2Ton * 500, true) }} en mercado de carbono</p>
                  <div class="mt-2 rounded bg-gray-50 p-2 text-[10px] text-slate-custom font-mono leading-relaxed">
                    {{ m2Slider.toLocaleString('es-MX') }} m² × 0.968 kg/m²/año ÷ 1000 × $500/tonCO₂
                    <p class="mt-0.5 font-sans text-[9px] italic">Cervantes Nájera (2025), Tabla 12. Precio: Mexico2 (2024).</p>
                  </div>
                </div>
              </div>

              <!-- Tarjeta resumen: impacto acumulado en fisico -->
              <div class="mt-4 rounded-xl border-2 border-accent/30 bg-accent/5 p-6">
                <p class="text-center text-sm font-semibold text-accent">Impacto acumulado en {{ yearsHorizon }} años sin intervención</p>
                <div class="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
                  <div>
                    <p class="text-lg font-bold text-accent">{{ (physicalImpacts.energiaMwh * yearsHorizon / 1000).toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} GWh</p>
                    <p class="text-[10px] text-slate-custom">energía no ahorrada</p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-orange-600">{{ (physicalImpacts.consultasAnuales * yearsHorizon).toLocaleString('es-MX') }}</p>
                    <p class="text-[10px] text-slate-custom">consultas evitables</p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-secondary">{{ (physicalImpacts.aguaM3 * yearsHorizon / 1000).toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} dam³</p>
                    <p class="text-[10px] text-slate-custom">agua no captada</p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-primary">{{ (physicalImpacts.co2Ton * yearsHorizon).toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} tonCO₂</p>
                    <p class="text-[10px] text-slate-custom">emisiones no mitigadas</p>
                  </div>
                </div>
              </div>

              <!-- Grafica de barras apiladas: unidades fisicas -->
              <div class="mt-6">
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsBarChart
                    :labels="inactionChartLabels"
                    :datasets="inactionPhysicalDatasets"
                    :stacked="true"
                    title="Impacto anual acumulado por categoría (unidades normalizadas)"
                  />
                </ClientOnly>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- E.2 — Potencial de mejora                                    -->
          <!-- ============================================================ -->
          <div class="mt-12">
            <h3 class="text-lg font-semibold text-ink">Potencial de mejora</h3>
            <p class="mt-1 text-sm text-slate-custom">Beneficios ambientales y sociales estimados con la instalación de techos verdes</p>

            <div class="mt-6 panel p-6">
              <!-- Grid comparativa: unidades fisicas -->
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Situacion actual -->
                <div class="rounded-lg border border-gray-200 p-5">
                  <p class="text-sm font-semibold text-ink">Situación actual (sin intervención)</p>
                  <div class="mt-4 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">Ahorro energético</span>
                      <span class="text-sm font-bold text-ink">0 MWh/año</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">Agua captada</span>
                      <span class="text-sm font-bold text-ink">0 m³/año</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">CO₂ capturado</span>
                      <span class="text-sm font-bold text-ink">0 ton/año</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">Reducción temperatura</span>
                      <span class="text-sm font-bold text-ink">0 °C</span>
                    </div>
                  </div>
                </div>
                <!-- Con intervencion -->
                <div class="rounded-lg border border-eco/30 bg-eco/5 p-5">
                  <p class="text-sm font-semibold text-ink">Con {{ m2Slider.toLocaleString('es-MX') }} m² de techos verdes</p>
                  <div class="mt-4 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">Ahorro energético</span>
                      <span class="text-sm font-bold text-eco">+{{ physicalImpacts.energiaMwh.toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} MWh/año</span>
                    </div>
                    <p class="text-[10px] font-mono text-slate-custom/70">{{ m2Slider.toLocaleString('es-MX') }} m² × 432.95 kWh/m²/año — Cervantes Nájera (2025)</p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">Agua captada</span>
                      <span class="text-sm font-bold text-secondary">+{{ physicalImpacts.aguaM3.toLocaleString('es-MX', { maximumFractionDigits: 0 }) }} m³/año</span>
                    </div>
                    <p class="text-[10px] font-mono text-slate-custom/70">{{ m2Slider.toLocaleString('es-MX') }} m² × 19.5 L/m²/año — Cervantes Nájera (2021)</p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">CO₂ capturado</span>
                      <span class="text-sm font-bold text-primary">+{{ physicalImpacts.co2Ton.toLocaleString('es-MX', { maximumFractionDigits: 1 }) }} ton/año</span>
                    </div>
                    <p class="text-[10px] font-mono text-slate-custom/70">{{ m2Slider.toLocaleString('es-MX') }} m² × 0.968 kg/m²/año — valor: {{ formatMXN(physicalImpacts.co2Ton * 500, true) }}/año (Mexico2, 2024)</p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-slate-custom">Reducción temperatura</span>
                      <span class="text-sm font-bold text-accent">-{{ physicalImpacts.tempReduction.toFixed(2) }} °C</span>
                    </div>
                    <p class="text-[10px] font-mono text-slate-custom/70">3.5°C × ({{ m2Slider.toLocaleString('es-MX') }} / 79,584) — Cervantes Nájera (2021)</p>
                  </div>
                </div>
              </div>

              <!-- KPI central: factor de mejora -->
              <div class="mt-6 rounded-xl border-2 border-eco/30 bg-eco/5 p-6 text-center">
                <p class="text-sm font-semibold text-eco">Impacto acumulado en {{ yearsHorizon }} años</p>
                <div class="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p class="text-2xl font-bold text-eco">{{ (physicalImpacts.energiaMwh * yearsHorizon / 1000).toLocaleString('es-MX', { maximumFractionDigits: 0 }) }}</p>
                    <p class="text-xs text-slate-custom">GWh ahorrados</p>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-secondary">{{ (physicalImpacts.aguaM3 * yearsHorizon / 1000).toLocaleString('es-MX', { maximumFractionDigits: 0 }) }}</p>
                    <p class="text-xs text-slate-custom">dam³ captados</p>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-primary">{{ (physicalImpacts.co2Ton * yearsHorizon).toLocaleString('es-MX', { maximumFractionDigits: 0 }) }}</p>
                    <p class="text-xs text-slate-custom">tonCO₂ capturadas</p>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-accent">{{ roiResult.periodoRecuperacion.toFixed(1) }}</p>
                    <p class="text-xs text-slate-custom">años recuperación</p>
                  </div>
                </div>
              </div>

              <!-- Grafica de lineas: progresion temporal -->
              <div class="mt-6">
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-64 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsLineChart
                    :labels="roiChartLabels"
                    :datasets="improvementChartDatasets"
                    title="Progresión de beneficios ambientales acumulados"
                  />
                </ClientOnly>
              </div>

              <p class="mt-4 text-[10px] text-slate-custom">
                Tasas de impacto: Cervantes Nájera (2021, 2025) CIIEMAD-IPN. Valor CO₂: $500 MXN/tonCO₂, Mexico2 mercado voluntario (2024).
              </p>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- E.3 — Evidencia Estadistica (refactoring de scatter + corr)  -->
          <!-- ============================================================ -->
          <div class="mt-12">
            <h3 class="text-lg font-semibold text-ink">Justificación del modelo</h3>
            <p class="mt-1 text-sm text-slate-custom">Evidencia estadística que respalda la priorización de techos verdes</p>

            <div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div class="panel p-6">
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsScatterChart
                    :points="scatterLstScore"
                    :regression-line="regLstScore"
                    x-label="LST (°C)"
                    y-label="Score de aptitud"
                    title="LST vs score de aptitud"
                    point-color="#0E5E3A"
                  />
                </ClientOnly>
                <!-- Caja interpretativa -->
                <div class="mt-4 space-y-2">
                  <div class="rounded-lg bg-eco/5 p-3 text-xs">
                    <p><span class="font-bold text-eco">¿Qué demuestra?</span> {{ interpretRegression(regLstScore, 'temperatura superficial', 'aptitud') }} El modelo explica el {{ (regLstScore.r2 * 100).toFixed(0) }}% de la variabilidad.</p>
                  </div>
                  <div class="rounded-lg bg-primary-50 p-3 text-xs">
                    <p><span class="font-bold text-primary">Implicación:</span> Las zonas con mayor temperatura superficial son las que más se beneficiarían de techos verdes. La priorización por LST está estadísticamente respaldada.</p>
                  </div>
                </div>
              </div>

              <div class="panel p-6">
                <ClientOnly>
                  <template #fallback>
                    <div class="flex h-80 items-center justify-center text-sm text-slate-custom">Cargando gráfica...</div>
                  </template>
                  <ChartsScatterChart
                    :points="scatterBioCob"
                    :regression-line="regBioCob"
                    x-label="Índice de biodiversidad"
                    y-label="Cobertura vegetal (%)"
                    title="Biodiversidad vs cobertura vegetal"
                    point-color="#79C141"
                  />
                </ClientOnly>
                <div class="mt-4 space-y-2">
                  <div class="rounded-lg bg-eco/5 p-3 text-xs">
                    <p><span class="font-bold text-eco">¿Qué demuestra?</span> {{ interpretRegression(regBioCob, 'biodiversidad', 'cobertura vegetal') }}</p>
                  </div>
                  <div class="rounded-lg bg-primary-50 p-3 text-xs">
                    <p><span class="font-bold text-primary">Implicación:</span> Invertir en techos verdes no solo reduce temperatura: incrementa la biodiversidad urbana, un indicador clave de resiliencia ecológica.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Matriz de correlacion -->
            <div class="mt-8">
              <h4 class="text-base font-semibold text-ink">Matriz de correlación</h4>
              <p class="mt-1 text-sm text-slate-custom">Coeficientes de Pearson entre variables ambientales y territoriales</p>

              <div class="mt-4 overflow-x-auto panel p-4">
                <table class="w-full border-collapse text-xs">
                  <thead>
                    <tr>
                      <th class="p-2 text-left font-semibold text-ink">&nbsp;</th>
                      <th
                        v-for="label in corrMatrix.labels"
                        :key="label"
                        class="p-2 text-center font-semibold text-ink"
                        style="min-width: 70px;"
                      >
                        {{ label }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, i) in corrMatrix.matrix" :key="corrMatrix.labels[i]">
                      <td class="p-2 font-semibold text-ink whitespace-nowrap">{{ corrMatrix.labels[i] }}</td>
                      <td
                        v-for="(val, j) in row"
                        :key="j"
                        class="p-2 text-center font-mono"
                        :style="{
                          backgroundColor: correlationColor(val),
                          color: Math.abs(val) > 0.6 ? '#ffffff' : '#1F2937',
                        }"
                      >
                        {{ val.toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Interpretacion de correlaciones clave -->
              <div class="mt-4 rounded-lg bg-primary-50 p-4">
                <p class="text-xs font-bold text-primary">Correlaciones clave para política pública:</p>
                <ul class="mt-2 space-y-1 text-xs text-slate-custom">
                  <li v-for="(insight, idx) in topCorrelations" :key="idx">
                    <span class="font-semibold text-ink">{{ insight.pair }}:</span> r={{ insight.value.toFixed(2) }} — {{ insight.interpretation }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- E.4 — Plan de Acción por Alcaldía                            -->
          <!-- ============================================================ -->
          <div class="mt-12">
            <h3 class="text-lg font-semibold text-ink">Priorización y plan de acción</h3>
            <p class="mt-1 text-sm text-slate-custom">Ranking de alcaldías con inversión recomendada y beneficio estimado</p>

            <div class="mt-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table class="table-base w-full min-w-[700px]">
                <thead>
                  <tr>
                    <th class="w-10">#</th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'alcaldia')">Alcaldía <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'alcaldia') }}</span></th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'indice')">Riesgo <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'indice') }}</span></th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'm2Recomendados')">m² recom. <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'm2Recomendados') }}</span></th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'scorePrefact')">Viabilidad <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'scorePrefact') }}</span></th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'm2Efectivos')">m² efect. <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'm2Efectivos') }}</span></th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'inversion')">Inversión <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'inversion') }}</span></th>
                    <th class="cursor-pointer select-none" @click="toggleSort('plan', 'beneficioAnual')">Beneficio <span class="text-[10px] opacity-60">{{ sortIcon(sortStates.plan, 'beneficioAnual') }}</span></th>
                    <th>Prioridad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in actionPlanRanking" :key="row.alcaldia">
                    <td class="font-bold" :style="{ color: necesidadColor(row.indice) }">{{ idx + 1 }}</td>
                    <td class="font-medium whitespace-nowrap">{{ row.alcaldia }}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="h-2 w-12 rounded-full bg-gray-200">
                          <div
                            class="h-2 rounded-full"
                            :style="{ width: row.indice + '%', backgroundColor: necesidadColor(row.indice) }"
                          />
                        </div>
                        <span class="text-xs font-bold" :style="{ color: necesidadColor(row.indice) }">{{ row.indice.toFixed(0) }}</span>
                      </div>
                    </td>
                    <td class="text-sm font-semibold text-ink tabular-nums">{{ row.m2Recomendados.toLocaleString('es-MX') }}</td>
                    <td>
                      <span
                        class="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap"
                        :style="{ backgroundColor: viabilidadColor(row.viabilidad) }"
                      >
                        {{ row.viabilidad }}
                      </span>
                    </td>
                    <td class="text-sm font-semibold text-ink tabular-nums">{{ row.m2Efectivos.toLocaleString('es-MX') }}</td>
                    <td class="text-sm text-ink tabular-nums">{{ formatMXN(row.inversion, true) }}</td>
                    <td class="text-sm font-semibold text-eco tabular-nums">{{ formatMXN(row.beneficioAnual, true) }}</td>
                    <td>
                      <span
                        class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase text-white whitespace-nowrap"
                        :style="{ backgroundColor: prioridadColor(row.prioridad) }"
                      >
                        {{ row.prioridad }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Caja ejecutiva -->
            <div class="mt-6 rounded-lg border-2 border-primary/30 bg-primary-50 p-5">
              <p class="text-sm font-bold text-primary">Resumen ejecutivo</p>
              <p class="mt-2 text-sm text-ink leading-relaxed">
                Las 3 alcaldías con mayor urgencia son
                <strong>{{ actionPlanRanking[0]?.alcaldia }}</strong>,
                <strong>{{ actionPlanRanking[1]?.alcaldia }}</strong> y
                <strong>{{ actionPlanRanking[2]?.alcaldia }}</strong>.
                Se recomienda iniciar con pilotos de techos verdes ligeros extensivos (TVLE) en edificios públicos,
                priorizando {{ actionPlanRanking[0]?.m2Recomendados.toLocaleString('es-MX') }} m² en {{ actionPlanRanking[0]?.alcaldia }}
                ({{ actionPlanRanking[0]?.m2Efectivos.toLocaleString('es-MX') }} m² efectivos tras evaluación estructural)
                con una inversión de {{ formatMXN(actionPlanRanking[0]?.inversion ?? 0, true) }}
                y un beneficio anual estimado de {{ formatMXN(actionPlanRanking[0]?.beneficioAnual ?? 0, true) }}.
              </p>
            </div>

            <!-- Fuentes y referencias detalladas -->
            <div class="mt-8 rounded-lg border border-gray-200 bg-white p-5">
              <button
                class="flex w-full items-center justify-between text-sm font-semibold text-ink"
                @click="toggleTable('fuentes')"
              >
                <span>Fuentes y metodología de cálculo</span>
                <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-180': expandedTables.fuentes }" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
              </button>
              <Transition name="slide-up">
                <div v-show="expandedTables.fuentes" class="mt-4 space-y-4 text-xs text-slate-custom">
                  <!-- Tesis -->
                  <div>
                    <p class="font-bold text-ink">Tesis de referencia</p>
                    <ul class="mt-1 space-y-1 list-disc pl-4">
                      <li><strong>Cervantes Nájera, A.L. (2025).</strong> "Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México." Tesis doctoral, CIIEMAD-IPN. Directora: Dra. María Concepción Martínez Rodríguez.</li>
                      <li><strong>Cervantes Nájera, A.L. (2021).</strong> "Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México." Tesis de maestría, CIIEMAD-IPN.</li>
                    </ul>
                  </div>
                  <!-- Tasas -->
                  <div>
                    <p class="font-bold text-ink">Tasas de impacto ambiental</p>
                    <div class="mt-1 overflow-x-auto">
                      <table class="w-full text-[10px]">
                        <thead>
                          <tr class="border-b">
                            <th class="py-1 pr-3 text-left font-semibold">Variable</th>
                            <th class="py-1 pr-3 text-left font-semibold">Valor</th>
                            <th class="py-1 text-left font-semibold">Fuente</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">CO₂ capturado</td><td class="py-1 pr-3 font-mono">0.968 kg/m²/año</td><td class="py-1">Cervantes Nájera (2025), Tabla 12, p. 98</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Reducción temperatura</td><td class="py-1 pr-3 font-mono">3.5°C (ref. 79,584 m²)</td><td class="py-1">Cervantes Nájera (2021), Cap. 5, p. 87</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Captación pluvial</td><td class="py-1 pr-3 font-mono">19.5 L/m²/año</td><td class="py-1">Cervantes Nájera (2021), Cap. 5, p. 92</td></tr>
                          <tr><td class="py-1 pr-3">Ahorro energético</td><td class="py-1 pr-3 font-mono">432.95 kWh/m²/año</td><td class="py-1">Cervantes Nájera (2025), Tabla 15, p. 112</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- Costos -->
                  <div>
                    <p class="font-bold text-ink">Costos unitarios de referencia</p>
                    <div class="mt-1 overflow-x-auto">
                      <table class="w-full text-[10px]">
                        <thead>
                          <tr class="border-b">
                            <th class="py-1 pr-3 text-left font-semibold">Concepto</th>
                            <th class="py-1 pr-3 text-left font-semibold">Valor</th>
                            <th class="py-1 text-left font-semibold">Fuente</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Instalación TVLE</td><td class="py-1 pr-3 font-mono">$1,200 MXN/m²</td><td class="py-1">Cervantes Nájera (2025), Tabla 18</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Mantenimiento anual</td><td class="py-1 pr-3 font-mono">$80 MXN/m²/año</td><td class="py-1">Cervantes Nájera (2025), Tabla 19</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Electricidad</td><td class="py-1 pr-3 font-mono">$2.50 MXN/kWh</td><td class="py-1">CFE, Tarifa DAC promedio CDMX (2024)</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Consulta golpe de calor</td><td class="py-1 pr-3 font-mono">$3,500 MXN</td><td class="py-1">Secretaría de Salud CDMX / IMSS (2023)</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Incidencia calor</td><td class="py-1 pr-3 font-mono">12 consul./100k hab/año</td><td class="py-1">SINAVE (2023), zonas urbanas >35°C LST</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Daño inundación</td><td class="py-1 pr-3 font-mono">$45 MXN/m³</td><td class="py-1">SACMEX / CONAGUA (2022)</td></tr>
                          <tr class="border-b border-gray-100"><td class="py-1 pr-3">Valor tonCO₂</td><td class="py-1 pr-3 font-mono">$500 MXN/ton</td><td class="py-1">Mexico2, mercado voluntario MX (2024)</td></tr>
                          <tr><td class="py-1 pr-3">Tasa descuento VPN</td><td class="py-1 pr-3 font-mono">8%</td><td class="py-1">Banco de México, tasa ref. real (2024)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- Normas -->
                  <div>
                    <p class="font-bold text-ink">Normatividad y estándares</p>
                    <ul class="mt-1 space-y-1 list-disc pl-4">
                      <li><strong>NOM-020-SSA1-2014.</strong> Valor límite de exposición ambiental permisible de ozono (O₃). DOF.</li>
                      <li><strong>NOM-023-SSA1-1993.</strong> Criterio para evaluar la calidad del aire ambiente con respecto al dióxido de nitrógeno (NO₂). DOF.</li>
                      <li><strong>OMS (2016).</strong> "Urban green spaces and health: a review of evidence." Recomendación mínima de cobertura vegetal urbana.</li>
                      <li><strong>OMS (2012).</strong> Recomendación de 9 m²/habitante de área verde urbana accesible.</li>
                      <li><strong>Magurran, A.E. (2004).</strong> "Measuring Biological Diversity." Referencia índice Shannon-Wiener H' ≥ 2.0.</li>
                    </ul>
                  </div>
                  <!-- Fuentes estructurales -->
                  <div>
                    <p class="font-bold text-ink">Fuentes de viabilidad constructiva</p>
                    <ul class="mt-1 space-y-1 list-disc pl-4">
                      <li><strong>Catastro CDMX / SIGCDMX.</strong> Dirección General de Catastro. Tipo estructural, edad de construcción, niveles, material de techumbre.</li>
                      <li><strong>Atlas de Riesgos CDMX (SGIRPC).</strong> Zonificación sísmica (I-IIId), mapas de riesgo por inundación.</li>
                      <li><strong>Dictámenes post-sismo 19S (2017).</strong> Estado estructural de edificios evaluados tras el sismo del 19 de septiembre.</li>
                      <li><strong>INEGI, Censo de Población y Vivienda (2020).</strong> Características de las viviendas: material en techos, muros, pisos.</li>
                      <li><strong>NTC-CDMX (2017).</strong> Normas Técnicas Complementarias para Diseño y Construcción de Estructuras. Capacidad de carga en azoteas.</li>
                      <li><strong>Cervantes Nájera (2025), Tabla 6.</strong> Capacidad de carga mínima TVLE: 100 kg/m²; intensivo: 300 kg/m².</li>
                    </ul>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ================================================================ -->
    <!-- TAB 5: Simulación Dinámica                                        -->
    <!-- ================================================================ -->
    <div v-show="activeTab === 'simulacion'">
      <IndicadoresSimulacionDinamica />
    </div>

    <!-- ================================================================ -->
    <!-- Footer: Descarga + Fuentes (siempre visible)                      -->
    <!-- ================================================================ -->
    <section class="bg-white py-12 border-t border-gray-100">
      <div class="container-wide">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <!-- Download -->
          <div>
            <h3 class="text-xl font-semibold text-ink">Descarga de datos</h3>
            <p class="mt-1 text-sm text-slate-custom">Exporta los datos del observatorio en formato abierto</p>
            <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="card p-4">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-eco/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <polyline points="9 15 12 18 15 15" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-ink">Inventario</p>
                    <p class="text-[10px] text-slate-custom">CSV, 57 reg.</p>
                  </div>
                </div>
                <button class="btn-outline btn-sm mt-3 w-full">Descargar</button>
              </div>
              <div class="card p-4">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <polyline points="9 15 12 18 15 15" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-ink">Candidatos</p>
                    <p class="text-[10px] text-slate-custom">GeoJSON, 60 sitios</p>
                  </div>
                </div>
                <button class="btn-outline btn-sm mt-3 w-full">Descargar</button>
              </div>
              <div class="card p-4">
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <polyline points="9 15 12 18 15 15" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-ink">Validaciones de campo</p>
                    <p class="text-[10px] text-slate-custom">CSV, 30 reg.</p>
                  </div>
                </div>
                <button class="btn-outline btn-sm mt-3 w-full">Descargar</button>
              </div>
            </div>
          </div>

          <!-- Official sources -->
          <div>
            <h3 class="text-xl font-semibold text-ink">Fuentes oficiales</h3>
            <p class="mt-1 text-sm text-slate-custom">Instituciones que proveen la información utilizada</p>
            <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div v-for="src in envSources" :key="src.name" class="card p-3">
                <div class="flex items-center gap-2">
                  <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    :style="{ backgroundColor: src.color + '15' }"
                  >
                    <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: src.color }" />
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-ink">{{ src.name }}</p>
                    <CommonDataSourceBadge :source-name="src.sourceName" />
                  </div>
                </div>
                <p class="mt-2 text-[10px] leading-relaxed text-slate-custom">{{ src.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <p class="text-xs text-slate-custom">
            <span class="font-semibold text-accent">Nota:</span>
            Los datos ambientales mostrados en esta sección son de demostración (modo mock). La plataforma está diseñada para integrar datos oficiales de CONABIO, CONAGUA, SEDEMA y SEMARNAT cuando las conexiones API estén disponibles.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { greenRoofs } from '~/data/mock-roofs'
import { candidateRoofs } from '~/data/mock-candidates'
import { validationRecords } from '~/data/mock-validations'
import { kpiData } from '~/data/kpis'
import { aptitudPesos } from '~/data/aptitud-pesos'
import { indicesBioticos } from '~/data/mock-indices-bioticos'
import { indicadoresHidricos } from '~/data/mock-indicadores-hidricos'
import { indicadoresEstructurales } from '~/data/mock-indicadores-estructurales'
import type { DataSourceName } from '~/types/sources'
import {
  linearRegression,
  correlationMatrix,
  computeIndiceNecesidad,
  computeRiskProfileWithStructural,
  computeCostOfInaction,
  computeROI,
  computeEffectiveM2,
  COSTOS_REFERENCIA,
} from '~/composables/useStatisticalAnalysis'
import type { NivelRiesgo, RiskIndicator } from '~/composables/useStatisticalAnalysis'

const { scoreColor, kpiColor } = useFormatters()

useHead({
  title: 'Indicadores | Observatorio Techos Verdes CDMX',
  meta: [
    { name: 'description', content: 'Indicadores ambientales, biológicos e hídricos del Observatorio de Techos Verdes CDMX. Biodiversidad, captación pluvial y distribución territorial.' },
  ],
})

// ===========================================================================
// Tab navigation
// ===========================================================================
const tabs = [
  { id: 'territorial', label: 'Distribución territorial', icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
  { id: 'aptitud', label: 'Aptitud y validaciones', icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' },
  { id: 'ambiente', label: 'Medio ambiente', icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: 'estadistico', label: 'Análisis estadístico', icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
  { id: 'simulacion', label: 'Simulación dinámica', icon: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
] as const

const activeTab = ref<string>('territorial')

// ===========================================================================
// Collapsible tables
// ===========================================================================
const expandedTables = reactive<Record<string, boolean>>({
  alcaldia: false,
  biodiversidad: false,
  hidrico: false,
  fuentes: false,
})

function toggleTable(key: string) {
  expandedTables[key] = !expandedTables[key]
}

// ===========================================================================
// Sortable table helpers
// ===========================================================================
type SortDir = 'asc' | 'desc'
interface SortState { col: string; dir: SortDir }

const sortStates = reactive<Record<string, SortState>>({
  alcaldia: { col: '', dir: 'desc' },
  bio: { col: 'coberturaVegetal', dir: 'desc' },
  hidrico: { col: 'precipitacionMediaAnual', dir: 'desc' },
  plan: { col: 'indice', dir: 'desc' },
})

function toggleSort(key: string, col: string) {
  const s = sortStates[key]
  if (s.col === col) {
    s.dir = s.dir === 'desc' ? 'asc' : 'desc'
  } else {
    s.col = col
    s.dir = 'desc'
  }
}

function sortedBy<T>(data: T[], state: SortState, getters: Record<string, (r: T) => number | string>): T[] {
  if (!state.col || !getters[state.col]) return data
  const getter = getters[state.col]
  const dir = state.dir === 'asc' ? 1 : -1
  return [...data].sort((a, b) => {
    const va = getter(a)
    const vb = getter(b)
    if (typeof va === 'string' && typeof vb === 'string') return dir * va.localeCompare(vb)
    return dir * ((va as number) - (vb as number))
  })
}

function sortIcon(state: SortState, col: string): string {
  if (state.col !== col) return '↕'
  return state.dir === 'asc' ? '↑' : '↓'
}

// ===========================================================================
// KPIs
// ===========================================================================
const kpis = kpiData

// ---------------------------------------------------------------------------
// Alcaldia distribution
// ---------------------------------------------------------------------------
const alcaldiaDataRaw = computed(() => {
  const map = new Map<string, { existing: number; candidates: number }>()
  greenRoofs.forEach(r => {
    const entry = map.get(r.alcaldia) || { existing: 0, candidates: 0 }
    entry.existing++
    map.set(r.alcaldia, entry)
  })
  candidateRoofs.forEach(r => {
    const entry = map.get(r.alcaldia) || { existing: 0, candidates: 0 }
    entry.candidates++
    map.set(r.alcaldia, entry)
  })
  return Array.from(map.entries())
    .map(([alcaldia, data]) => ({ alcaldia, ...data }))
    .sort((a, b) => (b.existing + b.candidates) - (a.existing + a.candidates))
})

const alcaldiaData = computed(() => {
  if (!sortStates.alcaldia.col) return alcaldiaDataRaw.value
  return sortedBy(alcaldiaDataRaw.value, sortStates.alcaldia, {
    alcaldia: r => r.alcaldia,
    existing: r => r.existing,
    candidates: r => r.candidates,
  })
})

const alcaldiaChartLabels = computed(() => alcaldiaData.value.map(d => d.alcaldia))
const alcaldiaChartDatasets = computed(() => [
  {
    label: 'Existentes',
    data: alcaldiaData.value.map(d => d.existing),
    backgroundColor: '#0E5E3A',
    borderRadius: 4,
  },
  {
    label: 'Candidatos',
    data: alcaldiaData.value.map(d => d.candidates),
    backgroundColor: '#18A5E3',
    borderRadius: 4,
  },
])

// ---------------------------------------------------------------------------
// Building type distribution
// ---------------------------------------------------------------------------
const buildingTypeData = computed(() => {
  const map = new Map<string, number>()
  greenRoofs.forEach(r => {
    map.set(r.tipoEdificio, (map.get(r.tipoEdificio) || 0) + 1)
  })
  const colors: Record<string, string> = {
    hospital: '#D9363E',
    mercado: '#F2A81D',
    supermercado: '#18A5E3',
    centro_comercial: '#0E5E3A',
    oficinas: '#5E6B78',
    residencial: '#79C141',
    educativo: '#A855F7',
    gobierno: '#0E5E3A',
    cultural: '#F97316',
    industrial: '#64748B',
  }
  const labels: Record<string, string> = {
    hospital: 'Hospital',
    mercado: 'Mercado',
    supermercado: 'Supermercado',
    centro_comercial: 'Centro comercial',
    oficinas: 'Oficinas',
    residencial: 'Residencial',
    educativo: 'Educativo',
    gobierno: 'Gobierno',
    cultural: 'Cultural',
    industrial: 'Industrial',
  }
  return Array.from(map.entries())
    .map(([type, count]) => ({
      type,
      label: labels[type] || (type ? type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ') : type),
      count,
      color: colors[type] || '#5E6B78',
    }))
    .sort((a, b) => b.count - a.count)
})

const buildingTypeLabels = computed(() => buildingTypeData.value.map(d => d.label))
const buildingTypeDatasets = computed(() => [
  {
    label: 'Techos verdes',
    data: buildingTypeData.value.map(d => d.count),
    backgroundColor: buildingTypeData.value.map(d => d.color),
    borderRadius: 4,
  },
])

// ---------------------------------------------------------------------------
// Techo type distribution (Doughnut)
// ---------------------------------------------------------------------------
const techoTypeData = computed(() => {
  const map = new Map<string, number>()
  greenRoofs.forEach(r => {
    map.set(r.tipoTechoVerde, (map.get(r.tipoTechoVerde) || 0) + 1)
  })
  const colors: Record<string, string> = {
    extensivo: '#79C141',
    intensivo: '#0E5E3A',
    'semi-intensivo': '#18A5E3',
    productivo: '#F2A81D',
    biodiverso: '#A855F7',
  }
  const labels: Record<string, string> = {
    extensivo: 'Extensivo',
    intensivo: 'Intensivo',
    'semi-intensivo': 'Semi-intensivo',
    productivo: 'Productivo',
    biodiverso: 'Biodiverso',
  }
  return Array.from(map.entries())
    .map(([type, count]) => ({
      type,
      label: labels[type] || type,
      count,
      color: colors[type] || '#5E6B78',
    }))
    .sort((a, b) => b.count - a.count)
})

const techoTypeLabels = computed(() => techoTypeData.value.map(d => d.label))
const techoTypeCounts = computed(() => techoTypeData.value.map(d => d.count))
const techoTypeColors = computed(() => techoTypeData.value.map(d => d.color))

// ---------------------------------------------------------------------------
// Validation progress (Doughnut)
// ---------------------------------------------------------------------------
const totalValidations = validationRecords.length
const validationProgress = computed(() => [
  { status: 'confirmado', label: 'Confirmados', count: validationRecords.filter(r => r.estado === 'confirmado').length, color: '#79C141' },
  { status: 'rechazado', label: 'Rechazados', count: validationRecords.filter(r => r.estado === 'rechazado').length, color: '#D9363E' },
  { status: 'indeterminado', label: 'Indeterminados', count: validationRecords.filter(r => r.estado === 'indeterminado').length, color: '#5E6B78' },
  { status: 'pendiente', label: 'Pendientes', count: validationRecords.filter(r => r.estado === 'pendiente').length, color: '#F2A81D' },
])

const validationLabels = computed(() => validationProgress.value.map(v => v.label))
const validationCounts = computed(() => validationProgress.value.map(v => v.count))
const validationColors = computed(() => validationProgress.value.map(v => v.color))

const completedCount = computed(() => totalValidations - validationRecords.filter(r => r.estado === 'pendiente').length)
const completedPct = computed(() => (completedCount.value / totalValidations) * 100)

// ---------------------------------------------------------------------------
// Radar: average aptitud profile
// ---------------------------------------------------------------------------
const radarLabels = computed(() => aptitudPesos.map(p => p.variable.replace(/\s*\(.*\)/, '')))

const radarData = computed(() => {
  const keys: (keyof typeof candidateRoofs[0]['variables'])[] = [
    'lst', 'areaUrbanizada', 'poblacion', 'ndvi', 'densidadVial', 'o3', 'co', 'no2',
  ]
  const ranges: Record<string, { min: number; max: number }> = {
    lst: { min: 28, max: 42 },
    areaUrbanizada: { min: 60, max: 100 },
    poblacion: { min: 5000, max: 20000 },
    ndvi: { min: 0, max: 0.4 },
    densidadVial: { min: 5, max: 20 },
    o3: { min: 30, max: 75 },
    co: { min: 0.5, max: 2.5 },
    no2: { min: 15, max: 50 },
  }

  return keys.map(key => {
    const sum = candidateRoofs.reduce((acc, r) => acc + r.variables[key], 0)
    const avg = sum / candidateRoofs.length
    const range = ranges[key]
    let normalised: number
    if (key === 'ndvi') {
      normalised = ((range.max - avg) / (range.max - range.min)) * 100
    } else {
      normalised = ((avg - range.min) / (range.max - range.min)) * 100
    }
    return Math.max(0, Math.min(100, Math.round(normalised)))
  })
})

// ---------------------------------------------------------------------------
// Histogram: score distribution
// ---------------------------------------------------------------------------
const histogramBins = [
  { min: 45, max: 55, label: '45-55' },
  { min: 55, max: 65, label: '55-65' },
  { min: 65, max: 75, label: '65-75' },
  { min: 75, max: 85, label: '75-85' },
  { min: 85, max: 95, label: '85-95' },
  { min: 95, max: 100, label: '95-100' },
]

const histogramLabels = histogramBins.map(b => b.label)

const histogramDatasets = computed(() => {
  const counts = histogramBins.map(bin =>
    candidateRoofs.filter(r => r.scoreAptitud >= bin.min && r.scoreAptitud < (bin.max === 100 ? 101 : bin.max)).length
  )
  const colors = ['#D9363E', '#F97316', '#F2A81D', '#79C141', '#0E5E3A', '#0E5E3A']
  return [
    {
      label: 'Candidatos',
      data: counts,
      backgroundColor: colors,
      borderRadius: 4,
    },
  ]
})

// ---------------------------------------------------------------------------
// Top alcaldias by average score
// ---------------------------------------------------------------------------
const topAlcaldias = computed(() => {
  const map = new Map<string, { total: number; count: number }>()
  candidateRoofs.forEach(r => {
    const entry = map.get(r.alcaldia) || { total: 0, count: 0 }
    entry.total += r.scoreAptitud
    entry.count++
    map.set(r.alcaldia, entry)
  })
  return Array.from(map.entries())
    .map(([alcaldia, data]) => ({
      alcaldia,
      avgScore: data.total / data.count,
      count: data.count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5)
})

// ===========================================================================
// SECCION A: Indices de biodiversidad
// ===========================================================================
const bioSorted = computed(() =>
  [...indicesBioticos].sort((a, b) => b.riquezaEspecies - a.riquezaEspecies),
)

const bioKpis = computed(() => {
  const n = indicesBioticos.length
  const riquezaPromedio = indicesBioticos.reduce((s, r) => s + r.riquezaEspecies, 0) / n
  const shannonPromedio = indicesBioticos.reduce((s, r) => s + r.indiceShannonWiener, 0) / n
  const simpsonPromedio = indicesBioticos.reduce((s, r) => s + r.indiceSimpson, 0) / n
  const coberturaPromedio = indicesBioticos.reduce((s, r) => s + r.coberturaVegetal, 0) / n
  const allSpecies = new Set(indicesBioticos.flatMap(r => r.especiesDominantes))
  return { riquezaPromedio, shannonPromedio, simpsonPromedio, coberturaPromedio, totalEspecies: allSpecies.size }
})

const bioBarLabels = computed(() => bioSorted.value.map(d => d.alcaldia))
const bioBarDatasets = computed(() => [
  {
    label: 'Riqueza de especies',
    data: bioSorted.value.map(d => d.riquezaEspecies),
    backgroundColor: bioSorted.value.map(d => {
      if (d.riquezaEspecies >= 25) return '#0E5E3A'
      if (d.riquezaEspecies >= 18) return '#79C141'
      if (d.riquezaEspecies >= 12) return '#F2A81D'
      return '#D9363E'
    }),
    borderRadius: 4,
  },
])

const bioRadarLabels = computed(() => [
  'Biodiversidad', 'Cobertura', 'Riqueza', 'Abundancia', 'Shannon H\'', 'Simpson 1-D',
])

const bioRadarData = computed(() => {
  const n = indicesBioticos.length
  const avgBio = indicesBioticos.reduce((s, r) => s + r.indiceBiodiversidad, 0) / n
  const avgCob = indicesBioticos.reduce((s, r) => s + r.coberturaVegetal, 0) / n
  const avgRiq = (indicesBioticos.reduce((s, r) => s + r.riquezaEspecies, 0) / n / 28) * 100
  const avgAbu = (indicesBioticos.reduce((s, r) => s + r.abundanciaIndividuos, 0) / n / 2000) * 100
  const avgSha = (indicesBioticos.reduce((s, r) => s + r.indiceShannonWiener, 0) / n / 3) * 100
  const avgSim = (indicesBioticos.reduce((s, r) => s + r.indiceSimpson, 0) / n) * 100
  return [avgBio, avgCob, avgRiq, avgAbu, avgSha, avgSim].map(v => Math.round(Math.min(100, v)))
})

const bioTableData = computed(() =>
  sortedBy([...indicesBioticos], sortStates.bio, {
    alcaldia: r => r.alcaldia,
    coberturaVegetal: r => r.coberturaVegetal,
    riquezaEspecies: r => r.riquezaEspecies,
    shannon: r => r.indiceShannonWiener,
    simpson: r => r.indiceSimpson,
  }),
)

// ===========================================================================
// SECCION B: Cobertura vegetal
// ===========================================================================
const coberturaSorted = computed(() =>
  [...indicesBioticos].sort((a, b) => b.coberturaVegetal - a.coberturaVegetal),
)

const coberturaBarLabels = computed(() => coberturaSorted.value.map(d => d.alcaldia))
const coberturaBarDatasets = computed(() => [
  {
    label: 'Cobertura vegetal (%)',
    data: coberturaSorted.value.map(d => d.coberturaVegetal),
    backgroundColor: coberturaSorted.value.map(d => {
      if (d.coberturaVegetal >= 80) return '#0E5E3A'
      if (d.coberturaVegetal >= 60) return '#79C141'
      return '#F2A81D'
    }),
    borderRadius: 4,
  },
])

const coberturaRangoLabels = computed(() => ['> 80%', '60-80%', '< 60%'])
const coberturaRangoCounts = computed(() => [
  indicesBioticos.filter(r => r.coberturaVegetal > 80).length,
  indicesBioticos.filter(r => r.coberturaVegetal >= 60 && r.coberturaVegetal <= 80).length,
  indicesBioticos.filter(r => r.coberturaVegetal < 60).length,
])
const coberturaRangoColors = computed(() => ['#0E5E3A', '#79C141', '#F2A81D'])

// ===========================================================================
// SECCION C: Indicadores hidricos
// ===========================================================================
const hidricoSorted = computed(() =>
  [...indicadoresHidricos].sort((a, b) => b.captacionPluvial - a.captacionPluvial),
)

const hidricoKpis = computed(() => {
  const n = indicadoresHidricos.length
  const captacionTotal = indicadoresHidricos.reduce((s, r) => s + r.captacionPluvial, 0)
  const escorrentiaTotal = indicadoresHidricos.reduce((s, r) => s + r.escorrentiaEvitada, 0)
  const eficienciaPromedio = indicadoresHidricos.reduce((s, r) => s + r.eficienciaRetencion, 0) / n
  const precipitacionMedia = indicadoresHidricos.reduce((s, r) => s + r.precipitacionMediaAnual, 0) / n
  return { captacionTotal: Math.round(captacionTotal * 10) / 10, escorrentiaTotal, eficienciaPromedio, precipitacionMedia }
})

const hidricoBarLabels = computed(() => hidricoSorted.value.map(d => d.alcaldia))
const hidricoBarDatasets = computed(() => [
  {
    label: 'Captación pluvial (L/m²/año)',
    data: hidricoSorted.value.map(d => d.captacionPluvial),
    backgroundColor: hidricoSorted.value.map(d => {
      if (d.captacionPluvial >= 22) return '#0284C7'
      if (d.captacionPluvial >= 18) return '#18A5E3'
      return '#7DD3FC'
    }),
    borderRadius: 4,
  },
])

const precipitacionSorted = computed(() =>
  [...indicadoresHidricos].sort((a, b) => b.precipitacionMediaAnual - a.precipitacionMediaAnual),
)
const precipitacionLineLabels = computed(() => precipitacionSorted.value.map(d => d.alcaldia))
const precipitacionLineDatasets = computed(() => [
  {
    label: 'Precipitación media anual (mm)',
    data: precipitacionSorted.value.map(d => d.precipitacionMediaAnual),
    borderColor: '#0284C7',
    fill: true,
  },
])

const hidricoTableData = computed(() =>
  sortedBy([...indicadoresHidricos], sortStates.hidrico, {
    alcaldia: r => r.alcaldia,
    precipitacionMediaAnual: r => r.precipitacionMediaAnual,
    captacionPluvial: r => r.captacionPluvial,
    escorrentiaEvitada: r => r.escorrentiaEvitada,
    superficieVerdeCaptadora: r => r.superficieVerdeCaptadora,
    eficienciaRetencion: r => r.eficienciaRetencion,
  }),
)

// ===========================================================================
// SECCION D: Fuentes oficiales ambientales
// ===========================================================================
interface EnvSource {
  name: string
  sourceName: DataSourceName
  description: string
  color: string
}

// ===========================================================================
// SECCION E: Analisis para Toma de Decisiones
// ===========================================================================

// ---- Shared controls ----
const m2Slider = ref(79584)
const yearsHorizon = ref(10)

// Presets for quick m² selection
const m2Presets = [
  { label: '5,000 m² (1 edificio)', value: 5000 },
  { label: '25,000 m² (colonia)', value: 25000 },
  { label: '79,584 m² (inventario actual)', value: 79584 },
  { label: '200,000 m² (meta corto plazo)', value: 200000 },
  { label: '514,000 m² (potencial tesis)', value: 514000 },
]

function onM2Input(event: Event) {
  const val = parseInt((event.target as HTMLInputElement).value)
  if (!isNaN(val) && val >= 100 && val <= 1_000_000) {
    m2Slider.value = val
  }
}

// ---- Helper: format MXN ----
function formatMXN(value: number, compact = false): string {
  if (!Number.isFinite(value)) return '$0'
  if (compact && Math.abs(value) >= 1_000_000) {
    return '$' + (value / 1_000_000).toLocaleString('es-MX', { maximumFractionDigits: 1 }) + 'M'
  }
  return '$' + Math.round(value).toLocaleString('es-MX')
}

// ---- Alcaldia data maps (shared) ----
const bioMap = new Map(indicesBioticos.map(b => [b.alcaldia, b]))
const hidMap = new Map(indicadoresHidricos.map(h => [h.alcaldia, h]))
const estMap = new Map(indicadoresEstructurales.map(e => [e.alcaldia, e]))

// ---- E.0: Risk profile ----
const alcaldiaListForRisk = computed(() =>
  indicesBioticos.map(b => b.alcaldia).sort((a, b) => a.localeCompare(b, 'es')),
)

// Default to the highest-risk alcaldia
const selectedAlcaldia = ref('')

// Compute alcaldia-level aggregates
const alcaldiaAggregates = computed(() => {
  const alcaldias = [...new Set([
    ...indicesBioticos.map(b => b.alcaldia),
    ...candidateRoofs.map(c => c.alcaldia),
  ])]

  return alcaldias.map(alc => {
    const cands = candidateRoofs.filter(c => c.alcaldia === alc)
    const bio = bioMap.get(alc)
    const hid = hidMap.get(alc)
    const est = estMap.get(alc)
    const lstProm = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.lst, 0) / cands.length : 35
    const o3Prom = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.o3, 0) / cands.length : 55
    const no2Prom = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.no2, 0) / cands.length : 30
    const pobProm = cands.length > 0 ? cands.reduce((s, c) => s + c.variables.poblacion, 0) / cands.length : 10000
    const m2Cands = cands.reduce((s, c) => s + c.superficie, 0)

    return {
      alcaldia: alc,
      lstProm,
      o3Prom,
      no2Prom,
      pobProm,
      m2Cands,
      coberturaVegetal: bio?.coberturaVegetal ?? 60,
      captacionPluvial: hid?.captacionPluvial ?? 18,
      shannon: bio?.indiceShannonWiener ?? 2.0,
      indiceBiodiversidad: bio?.indiceBiodiversidad ?? 50,
      scorePrefactibilidadPromedio: est?.scorePrefactibilidadPromedio ?? 50,
      edadPromedioAnios: est?.edadPromedioAnios ?? 35,
    }
  })
})

// Set default alcaldia to highest risk on mount
onMounted(() => {
  const ranked = [...alcaldiaAggregates.value].sort((a, b) => {
    const profA = computeRiskProfile({
      lstPromedio: a.lstProm, o3Promedio: a.o3Prom, no2Promedio: a.no2Prom,
      coberturaVegetal: a.coberturaVegetal, captacionPluvial: a.captacionPluvial,
      shannon: a.shannon, poblacion: a.pobProm,
    })
    const profB = computeRiskProfile({
      lstPromedio: b.lstProm, o3Promedio: b.o3Prom, no2Promedio: b.no2Prom,
      coberturaVegetal: b.coberturaVegetal, captacionPluvial: b.captacionPluvial,
      shannon: b.shannon, poblacion: b.pobProm,
    })
    return profB.scoreRiesgo - profA.scoreRiesgo
  })
  if (ranked.length > 0) selectedAlcaldia.value = ranked[0].alcaldia
})

const selectedAlcData = computed(() =>
  alcaldiaAggregates.value.find(a => a.alcaldia === selectedAlcaldia.value)
    ?? alcaldiaAggregates.value[0]
    ?? { lstProm: 35, o3Prom: 55, no2Prom: 30, pobProm: 10000, m2Cands: 5000, coberturaVegetal: 60, captacionPluvial: 18, shannon: 2.0, indiceBiodiversidad: 50, scorePrefactibilidadPromedio: 50, edadPromedioAnios: 35, alcaldia: '' },
)

const riskProfile = computed(() =>
  computeRiskProfileWithStructural({
    lstPromedio: selectedAlcData.value.lstProm,
    o3Promedio: selectedAlcData.value.o3Prom,
    no2Promedio: selectedAlcData.value.no2Prom,
    coberturaVegetal: selectedAlcData.value.coberturaVegetal,
    captacionPluvial: selectedAlcData.value.captacionPluvial,
    shannon: selectedAlcData.value.shannon,
    poblacion: selectedAlcData.value.pobProm,
    scorePrefactibilidadPromedio: selectedAlcData.value.scorePrefactibilidadPromedio,
  }),
)

const riskAlertCount = computed(() =>
  riskProfile.value.indicadores.filter(i => i.nivel === 'critico' || i.nivel === 'alto').length,
)

function riskLevelColor(nivel: NivelRiesgo): string {
  const map: Record<NivelRiesgo, string> = { critico: '#D9363E', alto: '#F97316', moderado: '#F2A81D', bajo: '#79C141' }
  return map[nivel]
}

function riskBarWidth(ind: RiskIndicator): number {
  // Normalize to 0-100 for visual bar
  const ranges: Record<string, [number, number]> = {
    'Isla de calor': [28, 42],
    'Calidad del aire (O₃)': [20, 100],
    'Déficit vegetal': [40, 95],
    'Vulnerabilidad hídrica': [14, 26],
    'Biodiversidad': [1, 3],
    'Viabilidad constructiva': [0, 100],
  }
  const range = ranges[ind.nombre]
  if (!range) return 50
  return Math.min(100, Math.max(0, ((ind.valor - range[0]) / (range[1] - range[0])) * 100))
}

// ---- E.1: Costo de la inaccion ----
const inactionCost = computed(() =>
  computeCostOfInaction(m2Slider.value, yearsHorizon.value, selectedAlcData.value.pobProm),
)

const inactionChartLabels = computed(() =>
  inactionCost.value.serie.map(s => `Año ${s.year}`),
)

// ---- Ajuste por viabilidad constructiva ----
const adjustForStructural = ref(true)

const effectiveM2 = computed(() => {
  if (!adjustForStructural.value) {
    return { m2Efectivos: m2Slider.value, m2Descartados: 0, factorReduccion: 1.0 }
  }
  const est = estMap.get(selectedAlcaldia.value)
  const pctPrefactible = est ? est.scorePrefactibilidadPromedio : 60
  const pctRequiereEval = Math.min(100 - pctPrefactible, 30)
  return computeEffectiveM2({
    m2Total: m2Slider.value,
    porcentajePrefactible: pctPrefactible,
    porcentajeRequiereEval: pctRequiereEval,
  })
})

// ---- Impactos en unidades fisicas (E.1 + E.2) ----
const physicalImpacts = computed(() => {
  const m2 = effectiveM2.value.m2Efectivos
  const pob = selectedAlcData.value.pobProm
  const energiaMwh = (m2 * 432.95) / 1000
  const aguaM3 = (m2 * 19.5) / 1000
  const co2Ton = (m2 * 0.968) / 1000
  const consultasAnuales = Math.round((pob / 100_000) * 12)
  const tempReduction = 3.5 * (m2 / 79584)
  const hogares = Math.round((energiaMwh * 1000) / 3500)
  return { energiaMwh, aguaM3, co2Ton, consultasAnuales, tempReduction, hogares }
})

const inactionPhysicalDatasets = computed(() => {
  const serie = inactionCost.value.serie
  const m2 = effectiveM2.value.m2Efectivos
  return [
    {
      label: 'Energía (MWh)',
      data: serie.map((_s, i) => Math.round(((m2 * 432.95) / 1000) * (i + 1))),
      backgroundColor: '#F2A81D',
      borderRadius: 2,
    },
    {
      label: 'Agua (m³)',
      data: serie.map((_s, i) => Math.round(((m2 * 19.5) / 1000) * (i + 1))),
      backgroundColor: '#18A5E3',
      borderRadius: 2,
    },
    {
      label: 'CO₂ (ton)',
      data: serie.map((_s, i) => Math.round(((m2 * 0.968) / 1000) * (i + 1) * 10) / 10),
      backgroundColor: '#0E5E3A',
      borderRadius: 2,
    },
  ]
})

// ---- E.2: ROI + mejora ----
const roiResult = computed(() =>
  computeROI(effectiveM2.value.m2Efectivos, yearsHorizon.value, selectedAlcData.value.pobProm),
)

const roiChartLabels = computed(() =>
  roiResult.value.serieAnual.map(s => `Año ${s.year}`),
)

const improvementChartDatasets = computed(() => {
  const serie = roiResult.value.serieAnual
  const m2 = effectiveM2.value.m2Efectivos
  return [
    {
      label: 'Energía acumulada (MWh)',
      data: serie.map((_s, i) => Math.round(((m2 * 432.95) / 1000) * (i + 1))),
      borderColor: '#F2A81D',
      fill: false,
    },
    {
      label: 'Agua captada acumulada (m³)',
      data: serie.map((_s, i) => Math.round(((m2 * 19.5) / 1000) * (i + 1))),
      borderColor: '#18A5E3',
      fill: false,
    },
    {
      label: 'CO₂ capturado acumulado (ton)',
      data: serie.map((_s, i) => Math.round(((m2 * 0.968) / 1000) * (i + 1) * 10) / 10),
      borderColor: '#0E5E3A',
      fill: false,
    },
  ]
})

// ---- E.3: Scatter + Correlacion (refactored) ----
const scatterLstScore = computed(() =>
  candidateRoofs.map(c => ({
    x: c.variables.lst,
    y: c.scoreAptitud,
    label: c.nombre,
  })),
)

const regLstScore = computed(() => {
  const xs = candidateRoofs.map(c => c.variables.lst)
  const ys = candidateRoofs.map(c => c.scoreAptitud)
  return linearRegression(xs, ys)
})

const scatterBioCob = computed(() =>
  indicesBioticos.map(b => ({
    x: b.indiceBiodiversidad,
    y: b.coberturaVegetal,
    label: b.alcaldia,
  })),
)

const regBioCob = computed(() => {
  const xs = indicesBioticos.map(b => b.indiceBiodiversidad)
  const ys = indicesBioticos.map(b => b.coberturaVegetal)
  return linearRegression(xs, ys)
})

function interpretRegression(
  reg: { slope: number; r2: number },
  varX: string,
  varY: string,
): string {
  const r2 = reg.r2
  const direction = reg.slope > 0 ? 'positiva' : 'negativa'
  let strength = 'débil'
  if (r2 >= 0.7) strength = 'fuerte'
  else if (r2 >= 0.4) strength = 'moderada'
  return `Correlación ${direction} ${strength} (R²=${r2.toFixed(3)}): a mayor ${varX}, ${reg.slope > 0 ? 'mayor' : 'menor'} ${varY}.`
}

const corrMatrix = computed(() => {
  const alcaldias = [...new Set(candidateRoofs.map(c => c.alcaldia))]

  const alcData = alcaldias.map(alc => {
    const cands = candidateRoofs.filter(c => c.alcaldia === alc)
    const avgLst = cands.reduce((s, c) => s + c.variables.lst, 0) / cands.length
    const avgNdvi = cands.reduce((s, c) => s + c.variables.ndvi, 0) / cands.length
    const avgScore = cands.reduce((s, c) => s + c.scoreAptitud, 0) / cands.length
    const avgPob = cands.reduce((s, c) => s + c.variables.poblacion, 0) / cands.length
    const avgUrb = cands.reduce((s, c) => s + c.variables.areaUrbanizada, 0) / cands.length
    const bio = bioMap.get(alc)
    const hid = hidMap.get(alc)
    const est = estMap.get(alc)
    return {
      lst: avgLst,
      ndvi: avgNdvi,
      score: avgScore,
      poblacion: avgPob,
      areaUrb: avgUrb,
      captacion: hid?.captacionPluvial ?? 0,
      biodiversidad: bio?.indiceBiodiversidad ?? 0,
      cobertura: bio?.coberturaVegetal ?? 0,
      prefactibilidad: est?.scorePrefactibilidadPromedio ?? 50,
      edadProm: est?.edadPromedioAnios ?? 35,
    }
  })

  return correlationMatrix({
    'LST': alcData.map(d => d.lst),
    'NDVI': alcData.map(d => d.ndvi),
    'Score': alcData.map(d => d.score),
    'Población': alcData.map(d => d.poblacion),
    'Área Urb.': alcData.map(d => d.areaUrb),
    'Captación': alcData.map(d => d.captacion),
    'Biodiv.': alcData.map(d => d.biodiversidad),
    'Cobertura': alcData.map(d => d.cobertura),
    'Prefact.': alcData.map(d => d.prefactibilidad),
    'Edad edif.': alcData.map(d => d.edadProm),
  })
})

function correlationColor(val: number): string {
  if (val >= 0) {
    const intensity = Math.round(val * 200)
    return `rgb(${255 - intensity}, 255, ${255 - intensity})`
  } else {
    const intensity = Math.round(Math.abs(val) * 200)
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`
  }
}

// Top correlations for policy interpretation
const topCorrelations = computed(() => {
  const m = corrMatrix.value
  const pairs: { pair: string; value: number; interpretation: string }[] = []
  for (let i = 0; i < m.labels.length; i++) {
    for (let j = i + 1; j < m.labels.length; j++) {
      pairs.push({ pair: `${m.labels[i]} / ${m.labels[j]}`, value: m.matrix[i][j], interpretation: '' })
    }
  }
  pairs.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
  const top3 = pairs.slice(0, 3)
  const interps: Record<string, string> = {
    'LST': 'Temperatura superficial alta indica mayor urgencia de intervención.',
    'Score': 'Confirma que el modelo de aptitud captura correctamente las zonas de riesgo.',
    'Biodiv.': 'Mayor cobertura verde se asocia con ecosistemas más diversos.',
    'Cobertura': 'La cobertura vegetal es el factor más modificable por política pública.',
    'Captación': 'La captación pluvial justifica la inversión en zonas con déficit hídrico.',
    'Población': 'Alta densidad poblacional amplifica los beneficios sociales de la intervención.',
    'NDVI': 'El índice de vegetación confirma el déficit de áreas verdes.',
    'Área Urb.': 'Las zonas más urbanizadas presentan mayor necesidad de naturación.',
    'Prefact.': 'La viabilidad constructiva determina cuántos m² son realmente aprovechables.',
    'Edad edif.': 'Edificios más antiguos requieren evaluación estructural antes de instalar techos verdes.',
  }
  top3.forEach(t => {
    const vars = t.pair.split(' / ')
    t.interpretation = interps[vars[0]] || interps[vars[1]] || 'Correlación significativa para la toma de decisiones.'
  })
  return top3
})

// ---- E.4: Plan de accion por alcaldia ----
const necesidadRanking = computed(() => {
  const alcaldias = [...new Set([
    ...indicesBioticos.map(b => b.alcaldia),
    ...candidateRoofs.map(c => c.alcaldia),
  ])]

  return alcaldias
    .map(alc => {
      const agg = alcaldiaAggregates.value.find(a => a.alcaldia === alc)
      const lstProm = agg?.lstProm ?? 35
      const pobProm = agg?.pobProm ?? 10000
      const bio = bioMap.get(alc)
      const hid = hidMap.get(alc)

      const indice = computeIndiceNecesidad({
        alcaldia: alc,
        lstPromedio: lstProm,
        coberturaVegetal: bio?.coberturaVegetal ?? 60,
        poblacion: pobProm,
        captacionPluvial: hid?.captacionPluvial ?? 18,
        indiceBiodiversidad: bio?.indiceBiodiversidad ?? 50,
      })

      const factores: string[] = []
      if (lstProm > 37) factores.push('Alta isla de calor')
      if ((bio?.coberturaVegetal ?? 60) < 55) factores.push('Baja cobertura vegetal')
      if (pobProm > 13000) factores.push('Alta densidad poblacional')
      if ((hid?.captacionPluvial ?? 18) < 17) factores.push('Baja captación pluvial')
      if ((bio?.indiceBiodiversidad ?? 50) < 45) factores.push('Baja biodiversidad')
      if (factores.length === 0) factores.push('Moderado en todos los factores')

      return { alcaldia: alc, indice, factores: factores.join(', ') }
    })
    .sort((a, b) => b.indice - a.indice)
})

function necesidadColor(indice: number): string {
  if (indice > 70) return '#D9363E'
  if (indice > 50) return '#F97316'
  if (indice > 30) return '#F2A81D'
  return '#79C141'
}

// Action plan ranking with investment & benefit columns
const actionPlanRankingRaw = computed(() => {
  return necesidadRanking.value.map(row => {
    const agg = alcaldiaAggregates.value.find(a => a.alcaldia === row.alcaldia)
    const m2 = agg?.m2Cands ?? 3000
    const est = estMap.get(row.alcaldia)
    const scorePrefact = est?.scorePrefactibilidadPromedio ?? 50
    const pctPrefactible = scorePrefact
    const pctRequiereEval = Math.min(100 - pctPrefactible, 30)
    const effM2 = computeEffectiveM2({ m2Total: m2, porcentajePrefactible: pctPrefactible, porcentajeRequiereEval: pctRequiereEval })
    const m2Ef = effM2.m2Efectivos
    const inversion = m2Ef * COSTOS_REFERENCIA.costoInstalacionTVLE
    const benefEnergiaAnual = m2Ef * 432.95 * COSTOS_REFERENCIA.costoElectricidadKwh
    const benefAguaAnual = (m2Ef * 19.5 / 1000) * COSTOS_REFERENCIA.costoM3AguaNoGestionada
    const benefCo2Anual = (m2Ef * 0.968 / 1000) * COSTOS_REFERENCIA.valorTonCO2
    const beneficioAnual = benefEnergiaAnual + benefAguaAnual + benefCo2Anual

    let viabilidad: string
    if (scorePrefact >= 65) viabilidad = 'Pre-factible'
    else if (scorePrefact >= 40) viabilidad = 'Requiere eval.'
    else viabilidad = 'No recomendado'

    let prioridad: string
    if (row.indice > 70) prioridad = 'Urgente'
    else if (row.indice > 50) prioridad = 'Prioritario'
    else if (row.indice > 30) prioridad = 'Importante'
    else prioridad = 'Preventivo'

    return {
      ...row,
      m2Recomendados: m2,
      m2Efectivos: m2Ef,
      viabilidad,
      scorePrefact,
      inversion,
      beneficioAnual,
      prioridad,
    }
  })
})

const actionPlanRanking = computed(() =>
  sortedBy(actionPlanRankingRaw.value, sortStates.plan, {
    alcaldia: r => r.alcaldia,
    indice: r => r.indice,
    m2Recomendados: r => r.m2Recomendados,
    scorePrefact: r => r.scorePrefact,
    m2Efectivos: r => r.m2Efectivos,
    inversion: r => r.inversion,
    beneficioAnual: r => r.beneficioAnual,
  }),
)

function prioridadColor(prioridad: string): string {
  const map: Record<string, string> = {
    'Urgente': '#D9363E',
    'Prioritario': '#F97316',
    'Importante': '#F2A81D',
    'Preventivo': '#79C141',
  }
  return map[prioridad] || '#64748B'
}

function viabilidadColor(viabilidad: string): string {
  if (viabilidad === 'Pre-factible') return '#79C141'
  if (viabilidad === 'Requiere eval.') return '#F2A81D'
  return '#D9363E'
}

const envSources: EnvSource[] = [
  {
    name: 'CONABIO',
    sourceName: 'CONABIO',
    description: 'Sistema Nacional de Información sobre Biodiversidad (SNIB). Registros de especies, índices de biodiversidad urbana y monitoreo de flora en azoteas verdes.',
    color: '#059669',
  },
  {
    name: 'SEDEMA',
    sourceName: 'SEDEMA',
    description: 'Secretaría del Medio Ambiente CDMX. Inventario de áreas verdes, programas de naturación urbana y monitoreo de cobertura vegetal.',
    color: '#79C141',
  },
  {
    name: 'CONAGUA',
    sourceName: 'CONAGUA',
    description: 'Comisión Nacional del Agua / Servicio Meteorológico Nacional. Datos pluviométricos, estaciones climatológicas y balance hídrico urbano.',
    color: '#0284C7',
  },
  {
    name: 'SEMARNAT',
    sourceName: 'SEMARNAT',
    description: 'Secretaría de Medio Ambiente y Recursos Naturales. Normatividad ambiental federal, áreas naturales protegidas y registros ambientales.',
    color: '#7C3AED',
  },
  {
    name: 'Catastro CDMX',
    sourceName: 'SIGCDMX',
    description: 'Dirección General de Catastro CDMX / SIGCDMX. Datos de construcción, edad, tipo estructural, niveles y material de techumbre por predio.',
    color: '#6366F1',
  },
  {
    name: 'Atlas de Riesgos',
    sourceName: 'SGIRPC',
    description: 'Secretaría de Gestión Integral de Riesgos y Protección Civil. Zonificación sísmica, dictámenes post-sismo 2017, riesgo de inundación.',
    color: '#EF4444',
  },
]
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
th.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
