
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AdminDataTable: typeof import("../../components/admin/AdminDataTable.vue")['default']
  AdminPipelineBanner: typeof import("../../components/admin/AdminPipelineBanner.vue")['default']
  ChartsBarChart: typeof import("../../components/charts/BarChart.client.vue")['default']
  ChartsDoughnutChart: typeof import("../../components/charts/DoughnutChart.client.vue")['default']
  ChartsLineChart: typeof import("../../components/charts/LineChart.client.vue")['default']
  ChartsPolarAreaChart: typeof import("../../components/charts/PolarAreaChart.client.vue")['default']
  ChartsRadarChart: typeof import("../../components/charts/RadarChart.client.vue")['default']
  ChartsScatterChart: typeof import("../../components/charts/ScatterChart.client.vue")['default']
  CommonAppFooter: typeof import("../../components/common/AppFooter.vue")['default']
  CommonAppHeader: typeof import("../../components/common/AppHeader.vue")['default']
  CommonConfidenceBadge: typeof import("../../components/common/ConfidenceBadge.vue")['default']
  CommonDataDisclaimer: typeof import("../../components/common/DataDisclaimer.vue")['default']
  CommonDataSourceBadge: typeof import("../../components/common/DataSourceBadge.vue")['default']
  CommonDatasetDownloadCard: typeof import("../../components/common/DatasetDownloadCard.vue")['default']
  CommonEmptyState: typeof import("../../components/common/EmptyState.vue")['default']
  CommonFeatureCard: typeof import("../../components/common/FeatureCard.vue")['default']
  CommonInfoBanner: typeof import("../../components/common/InfoBanner.vue")['default']
  CommonMethodologyStep: typeof import("../../components/common/MethodologyStep.vue")['default']
  CommonObservationTimeline: typeof import("../../components/common/ObservationTimeline.vue")['default']
  CommonOfficialSourcesSection: typeof import("../../components/common/OfficialSourcesSection.vue")['default']
  CommonPaginationControls: typeof import("../../components/common/PaginationControls.vue")['default']
  CommonSearchBar: typeof import("../../components/common/SearchBar.vue")['default']
  CommonSectionTitle: typeof import("../../components/common/SectionTitle.vue")['default']
  CommonStatCard: typeof import("../../components/common/StatCard.vue")['default']
  CommonStatusBadge: typeof import("../../components/common/StatusBadge.vue")['default']
  HomeAIBlock: typeof import("../../components/home/AIBlock.vue")['default']
  HomeFeaturedRoofs: typeof import("../../components/home/FeaturedRoofs.vue")['default']
  HomeHeroSection: typeof import("../../components/home/HeroSection.vue")['default']
  HomeHowItWorks: typeof import("../../components/home/HowItWorks.vue")['default']
  HomeKPIGrid: typeof import("../../components/home/KPIGrid.vue")['default']
  HomeMapTeaser: typeof import("../../components/home/MapTeaser.vue")['default']
  HomeMethodologySummary: typeof import("../../components/home/MethodologySummary.vue")['default']
  IndicadoresSimulacionDinamica: typeof import("../../components/indicadores/SimulacionDinamica.vue")['default']
  InventoryRoofCard: typeof import("../../components/inventory/RoofCard.vue")['default']
  InventoryRoofDetailDrawer: typeof import("../../components/inventory/RoofDetailDrawer.vue")['default']
  MapFilterSidebar: typeof import("../../components/map/FilterSidebar.vue")['default']
  MapPanel: typeof import("../../components/map/MapPanel.client.vue")['default']
  MapSuitabilityLegend: typeof import("../../components/map/SuitabilityLegend.vue")['default']
  ValidationAIAnalysisPanel: typeof import("../../components/validation/AIAnalysisPanel.vue")['default']
  ValidationTable: typeof import("../../components/validation/ValidationTable.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  ColorScheme: typeof import("../../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAdminDataTable: LazyComponent<typeof import("../../components/admin/AdminDataTable.vue")['default']>
  LazyAdminPipelineBanner: LazyComponent<typeof import("../../components/admin/AdminPipelineBanner.vue")['default']>
  LazyChartsBarChart: LazyComponent<typeof import("../../components/charts/BarChart.client.vue")['default']>
  LazyChartsDoughnutChart: LazyComponent<typeof import("../../components/charts/DoughnutChart.client.vue")['default']>
  LazyChartsLineChart: LazyComponent<typeof import("../../components/charts/LineChart.client.vue")['default']>
  LazyChartsPolarAreaChart: LazyComponent<typeof import("../../components/charts/PolarAreaChart.client.vue")['default']>
  LazyChartsRadarChart: LazyComponent<typeof import("../../components/charts/RadarChart.client.vue")['default']>
  LazyChartsScatterChart: LazyComponent<typeof import("../../components/charts/ScatterChart.client.vue")['default']>
  LazyCommonAppFooter: LazyComponent<typeof import("../../components/common/AppFooter.vue")['default']>
  LazyCommonAppHeader: LazyComponent<typeof import("../../components/common/AppHeader.vue")['default']>
  LazyCommonConfidenceBadge: LazyComponent<typeof import("../../components/common/ConfidenceBadge.vue")['default']>
  LazyCommonDataDisclaimer: LazyComponent<typeof import("../../components/common/DataDisclaimer.vue")['default']>
  LazyCommonDataSourceBadge: LazyComponent<typeof import("../../components/common/DataSourceBadge.vue")['default']>
  LazyCommonDatasetDownloadCard: LazyComponent<typeof import("../../components/common/DatasetDownloadCard.vue")['default']>
  LazyCommonEmptyState: LazyComponent<typeof import("../../components/common/EmptyState.vue")['default']>
  LazyCommonFeatureCard: LazyComponent<typeof import("../../components/common/FeatureCard.vue")['default']>
  LazyCommonInfoBanner: LazyComponent<typeof import("../../components/common/InfoBanner.vue")['default']>
  LazyCommonMethodologyStep: LazyComponent<typeof import("../../components/common/MethodologyStep.vue")['default']>
  LazyCommonObservationTimeline: LazyComponent<typeof import("../../components/common/ObservationTimeline.vue")['default']>
  LazyCommonOfficialSourcesSection: LazyComponent<typeof import("../../components/common/OfficialSourcesSection.vue")['default']>
  LazyCommonPaginationControls: LazyComponent<typeof import("../../components/common/PaginationControls.vue")['default']>
  LazyCommonSearchBar: LazyComponent<typeof import("../../components/common/SearchBar.vue")['default']>
  LazyCommonSectionTitle: LazyComponent<typeof import("../../components/common/SectionTitle.vue")['default']>
  LazyCommonStatCard: LazyComponent<typeof import("../../components/common/StatCard.vue")['default']>
  LazyCommonStatusBadge: LazyComponent<typeof import("../../components/common/StatusBadge.vue")['default']>
  LazyHomeAIBlock: LazyComponent<typeof import("../../components/home/AIBlock.vue")['default']>
  LazyHomeFeaturedRoofs: LazyComponent<typeof import("../../components/home/FeaturedRoofs.vue")['default']>
  LazyHomeHeroSection: LazyComponent<typeof import("../../components/home/HeroSection.vue")['default']>
  LazyHomeHowItWorks: LazyComponent<typeof import("../../components/home/HowItWorks.vue")['default']>
  LazyHomeKPIGrid: LazyComponent<typeof import("../../components/home/KPIGrid.vue")['default']>
  LazyHomeMapTeaser: LazyComponent<typeof import("../../components/home/MapTeaser.vue")['default']>
  LazyHomeMethodologySummary: LazyComponent<typeof import("../../components/home/MethodologySummary.vue")['default']>
  LazyIndicadoresSimulacionDinamica: LazyComponent<typeof import("../../components/indicadores/SimulacionDinamica.vue")['default']>
  LazyInventoryRoofCard: LazyComponent<typeof import("../../components/inventory/RoofCard.vue")['default']>
  LazyInventoryRoofDetailDrawer: LazyComponent<typeof import("../../components/inventory/RoofDetailDrawer.vue")['default']>
  LazyMapFilterSidebar: LazyComponent<typeof import("../../components/map/FilterSidebar.vue")['default']>
  LazyMapPanel: LazyComponent<typeof import("../../components/map/MapPanel.client.vue")['default']>
  LazyMapSuitabilityLegend: LazyComponent<typeof import("../../components/map/SuitabilityLegend.vue")['default']>
  LazyValidationAIAnalysisPanel: LazyComponent<typeof import("../../components/validation/AIAnalysisPanel.vue")['default']>
  LazyValidationTable: LazyComponent<typeof import("../../components/validation/ValidationTable.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyColorScheme: LazyComponent<typeof import("../../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
