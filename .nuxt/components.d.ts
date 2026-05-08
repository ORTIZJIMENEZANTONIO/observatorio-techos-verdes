
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


export const AdminDataTable: typeof import("../components/admin/AdminDataTable.vue")['default']
export const AdminPipelineBanner: typeof import("../components/admin/AdminPipelineBanner.vue")['default']
export const AdminInfoTooltip: typeof import("../components/admin/InfoTooltip.vue")['default']
export const AdminManual: typeof import("../components/admin/Manual.vue")['default']
export const AdminSortableTh: typeof import("../components/admin/SortableTh.vue")['default']
export const ChartsBarChart: typeof import("../components/charts/BarChart.client.vue")['default']
export const ChartsDoughnutChart: typeof import("../components/charts/DoughnutChart.client.vue")['default']
export const ChartsLineChart: typeof import("../components/charts/LineChart.client.vue")['default']
export const ChartsPolarAreaChart: typeof import("../components/charts/PolarAreaChart.client.vue")['default']
export const ChartsRadarChart: typeof import("../components/charts/RadarChart.client.vue")['default']
export const ChartsScatterChart: typeof import("../components/charts/ScatterChart.client.vue")['default']
export const CommonAppFooter: typeof import("../components/common/AppFooter.vue")['default']
export const CommonAppHeader: typeof import("../components/common/AppHeader.vue")['default']
export const CommonColorModeToggle: typeof import("../components/common/ColorModeToggle.vue")['default']
export const CommonConfidenceBadge: typeof import("../components/common/ConfidenceBadge.vue")['default']
export const CommonDataDisclaimer: typeof import("../components/common/DataDisclaimer.vue")['default']
export const CommonDataSourceBadge: typeof import("../components/common/DataSourceBadge.vue")['default']
export const CommonDatasetDownloadCard: typeof import("../components/common/DatasetDownloadCard.vue")['default']
export const CommonEmptyState: typeof import("../components/common/EmptyState.vue")['default']
export const CommonFeatureCard: typeof import("../components/common/FeatureCard.vue")['default']
export const CommonFilterPanel: typeof import("../components/common/FilterPanel.vue")['default']
export const CommonHeroSection: typeof import("../components/common/HeroSection.vue")['default']
export const CommonInfoBanner: typeof import("../components/common/InfoBanner.vue")['default']
export const CommonMethodologyStep: typeof import("../components/common/MethodologyStep.vue")['default']
export const CommonObservationTimeline: typeof import("../components/common/ObservationTimeline.vue")['default']
export const CommonOfficialSourcesSection: typeof import("../components/common/OfficialSourcesSection.vue")['default']
export const CommonPaginationControls: typeof import("../components/common/PaginationControls.vue")['default']
export const CommonSearchBar: typeof import("../components/common/SearchBar.vue")['default']
export const CommonSectionTitle: typeof import("../components/common/SectionTitle.vue")['default']
export const CommonStatCard: typeof import("../components/common/StatCard.vue")['default']
export const CommonStatusBadge: typeof import("../components/common/StatusBadge.vue")['default']
export const HomeAIBlock: typeof import("../components/home/AIBlock.vue")['default']
export const HomeFeaturedRoofs: typeof import("../components/home/FeaturedRoofs.vue")['default']
export const HomeHeroSection: typeof import("../components/home/HeroSection.vue")['default']
export const HomeHowItWorks: typeof import("../components/home/HowItWorks.vue")['default']
export const HomeKPIGrid: typeof import("../components/home/KPIGrid.vue")['default']
export const HomeMapTeaser: typeof import("../components/home/MapTeaser.vue")['default']
export const HomeMethodologySummary: typeof import("../components/home/MethodologySummary.vue")['default']
export const IndicadoresSimulacionDinamica: typeof import("../components/indicadores/SimulacionDinamica.vue")['default']
export const InventoryRoofCard: typeof import("../components/inventory/RoofCard.vue")['default']
export const InventoryRoofDetailDrawer: typeof import("../components/inventory/RoofDetailDrawer.vue")['default']
export const MapFilterSidebar: typeof import("../components/map/FilterSidebar.vue")['default']
export const MapPanel: typeof import("../components/map/MapPanel.client.vue")['default']
export const MapSuitabilityLegend: typeof import("../components/map/SuitabilityLegend.vue")['default']
export const ValidationAIAnalysisPanel: typeof import("../components/validation/AIAnalysisPanel.vue")['default']
export const ValidationTable: typeof import("../components/validation/ValidationTable.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const Icon: typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
export const IconCSS: typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAdminDataTable: LazyComponent<typeof import("../components/admin/AdminDataTable.vue")['default']>
export const LazyAdminPipelineBanner: LazyComponent<typeof import("../components/admin/AdminPipelineBanner.vue")['default']>
export const LazyAdminInfoTooltip: LazyComponent<typeof import("../components/admin/InfoTooltip.vue")['default']>
export const LazyAdminManual: LazyComponent<typeof import("../components/admin/Manual.vue")['default']>
export const LazyAdminSortableTh: LazyComponent<typeof import("../components/admin/SortableTh.vue")['default']>
export const LazyChartsBarChart: LazyComponent<typeof import("../components/charts/BarChart.client.vue")['default']>
export const LazyChartsDoughnutChart: LazyComponent<typeof import("../components/charts/DoughnutChart.client.vue")['default']>
export const LazyChartsLineChart: LazyComponent<typeof import("../components/charts/LineChart.client.vue")['default']>
export const LazyChartsPolarAreaChart: LazyComponent<typeof import("../components/charts/PolarAreaChart.client.vue")['default']>
export const LazyChartsRadarChart: LazyComponent<typeof import("../components/charts/RadarChart.client.vue")['default']>
export const LazyChartsScatterChart: LazyComponent<typeof import("../components/charts/ScatterChart.client.vue")['default']>
export const LazyCommonAppFooter: LazyComponent<typeof import("../components/common/AppFooter.vue")['default']>
export const LazyCommonAppHeader: LazyComponent<typeof import("../components/common/AppHeader.vue")['default']>
export const LazyCommonColorModeToggle: LazyComponent<typeof import("../components/common/ColorModeToggle.vue")['default']>
export const LazyCommonConfidenceBadge: LazyComponent<typeof import("../components/common/ConfidenceBadge.vue")['default']>
export const LazyCommonDataDisclaimer: LazyComponent<typeof import("../components/common/DataDisclaimer.vue")['default']>
export const LazyCommonDataSourceBadge: LazyComponent<typeof import("../components/common/DataSourceBadge.vue")['default']>
export const LazyCommonDatasetDownloadCard: LazyComponent<typeof import("../components/common/DatasetDownloadCard.vue")['default']>
export const LazyCommonEmptyState: LazyComponent<typeof import("../components/common/EmptyState.vue")['default']>
export const LazyCommonFeatureCard: LazyComponent<typeof import("../components/common/FeatureCard.vue")['default']>
export const LazyCommonFilterPanel: LazyComponent<typeof import("../components/common/FilterPanel.vue")['default']>
export const LazyCommonHeroSection: LazyComponent<typeof import("../components/common/HeroSection.vue")['default']>
export const LazyCommonInfoBanner: LazyComponent<typeof import("../components/common/InfoBanner.vue")['default']>
export const LazyCommonMethodologyStep: LazyComponent<typeof import("../components/common/MethodologyStep.vue")['default']>
export const LazyCommonObservationTimeline: LazyComponent<typeof import("../components/common/ObservationTimeline.vue")['default']>
export const LazyCommonOfficialSourcesSection: LazyComponent<typeof import("../components/common/OfficialSourcesSection.vue")['default']>
export const LazyCommonPaginationControls: LazyComponent<typeof import("../components/common/PaginationControls.vue")['default']>
export const LazyCommonSearchBar: LazyComponent<typeof import("../components/common/SearchBar.vue")['default']>
export const LazyCommonSectionTitle: LazyComponent<typeof import("../components/common/SectionTitle.vue")['default']>
export const LazyCommonStatCard: LazyComponent<typeof import("../components/common/StatCard.vue")['default']>
export const LazyCommonStatusBadge: LazyComponent<typeof import("../components/common/StatusBadge.vue")['default']>
export const LazyHomeAIBlock: LazyComponent<typeof import("../components/home/AIBlock.vue")['default']>
export const LazyHomeFeaturedRoofs: LazyComponent<typeof import("../components/home/FeaturedRoofs.vue")['default']>
export const LazyHomeHeroSection: LazyComponent<typeof import("../components/home/HeroSection.vue")['default']>
export const LazyHomeHowItWorks: LazyComponent<typeof import("../components/home/HowItWorks.vue")['default']>
export const LazyHomeKPIGrid: LazyComponent<typeof import("../components/home/KPIGrid.vue")['default']>
export const LazyHomeMapTeaser: LazyComponent<typeof import("../components/home/MapTeaser.vue")['default']>
export const LazyHomeMethodologySummary: LazyComponent<typeof import("../components/home/MethodologySummary.vue")['default']>
export const LazyIndicadoresSimulacionDinamica: LazyComponent<typeof import("../components/indicadores/SimulacionDinamica.vue")['default']>
export const LazyInventoryRoofCard: LazyComponent<typeof import("../components/inventory/RoofCard.vue")['default']>
export const LazyInventoryRoofDetailDrawer: LazyComponent<typeof import("../components/inventory/RoofDetailDrawer.vue")['default']>
export const LazyMapFilterSidebar: LazyComponent<typeof import("../components/map/FilterSidebar.vue")['default']>
export const LazyMapPanel: LazyComponent<typeof import("../components/map/MapPanel.client.vue")['default']>
export const LazyMapSuitabilityLegend: LazyComponent<typeof import("../components/map/SuitabilityLegend.vue")['default']>
export const LazyValidationAIAnalysisPanel: LazyComponent<typeof import("../components/validation/AIAnalysisPanel.vue")['default']>
export const LazyValidationTable: LazyComponent<typeof import("../components/validation/ValidationTable.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
export const LazyIconCSS: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
