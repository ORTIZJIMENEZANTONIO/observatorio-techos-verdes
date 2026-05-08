# Observatorio de Techos Verdes CDMX

## Product
Plataforma digital de monitoreo, analisis geoespacial y priorizacion de techos verdes en la Ciudad de Mexico. Integra datos abiertos, un modelo multicriterio de aptitud territorial (AHP, 8 variables), evaluacion de viabilidad constructiva (pre-factibilidad estructural) y validacion asistida por inteligencia artificial (Google Gemini Vision para analisis de imagenes de azoteas).

Contenido 100% en espanol (es-MX). Tono: institucional, tecnico pero accesible.

### Capitalización en español
Todos los títulos, encabezados, etiquetas de tabs y subtítulos siguen la convención del español: solo la primera palabra y nombres propios en mayúscula (sentence case). No usar Title Case en inglés.
- Correcto: "Indicadores ambientales y territoriales"
- Incorrecto: "Indicadores Ambientales y Territoriales"
- Excepción: nombres propios (Ciudad de México, CDMX, CIIEMAD, IPN, Observatorio de Techos Verdes CDMX como marca) y acrónimos (IA, AHP, ODS)

## Stack
- **Framework:** Nuxt 3 + Vue 3 (Composition API, `<script setup lang="ts">`)
- **State:** Pinia (setup/composable style)
- **Styling:** Tailwind CSS 3 + custom design system (`assets/css/main.css`)
- **Maps:** Leaflet (`.client.vue` pattern + `<ClientOnly>`)
- **Charts:** Chart.js + vue-chartjs (`.client.vue` pattern)
- **AI/Vision:** Google Gemini 2.0 Flash via `@google/generative-ai` (free tier, server-only)
- **Utilities:** VueUse, @nuxtjs/color-mode
- **TypeScript:** strict

## Commands
```bash
npm run dev        # Dev server (port 3000)
npm run build      # Production build
npm run generate   # Static generation
npm run preview    # Preview production build
```

## Key Directories
```
observatorio-techos-verdes/
  assets/css/main.css       # Global styles, animations, Leaflet overrides
  components/
    common/                 # AppHeader (dropdowns Datos/Conocimiento + Comunidad CTA), AppFooter, ColorModeToggle, SectionTitle, StatCard, StatusBadge, PaginationControls, HeroSection (lava lamp + topo + canopy + vignette), TechitoBlink (overlay de párpados sobre la mascota), CountUpKPI (números animados clickeables)
    home/                   # HeroSection, KPIGrid, HowItWorks, FeaturedRoofs, AIBlock, MapTeaser, MethodologySummary
    inventory/              # RoofCard, RoofDetailDrawer
    map/                    # MapPanel.client.vue, FilterSidebar, SuitabilityLegend
    charts/                 # DoughnutChart, BarChart, RadarChart, LineChart, PolarAreaChart, ScatterChart (all .client.vue)
    validation/             # ValidationTable, AIAnalysisPanel
    indicadores/            # SimulacionDinamica (System Dynamics tab)
  composables/
    useFormatters.ts        # es-MX locale formatters + structural feasibility formatters
    useMapConfig.ts         # Leaflet config, marker styles
    useScrollReveal.ts      # IntersectionObserver scroll-reveal animations
    useStats.ts             # Computed stats from stores
    useDataSource.ts        # Reactive data mode + source helpers
    useStatisticalAnalysis.ts # Linear regression, Pearson correlation, projections, necesidad index, risk profile, structural pre-feasibility, cost of inaction, ROI
    useVisionAI.ts          # Gemini Vision composable (analyzeFromFile, fileToBase64, analyzing/lastResult/error refs)
    useSystemDynamics.ts    # System Dynamics simulation engine (Euler solver, 4 feedback loops, 4 scenarios, policy levers)
    useCountUp.ts           # Animated number transitions (easeOutExpo, respects prefers-reduced-motion)
    useApi.ts               # $fetch wrapper to cercu-backend with Bearer token + 401 handling
  data/
    mock-roofs.ts           # 57 GreenRoof records (exported as `greenRoofs`)
    mock-candidates.ts      # 60 CandidateRoof records (exported as `candidateRoofs`)
    mock-validations.ts     # 30 ValidationRecord records (exported as `validationRecords`)
    mock-cadastral.ts       # Cadastral data for candidate enrichment
    mock-indices-bioticos.ts # 16 IndiceBioticoAlcaldia records (exported as `indicesBioticos`)
    mock-indicadores-hidricos.ts # 16 IndicadorHidricoAlcaldia records (exported as `indicadoresHidricos`)
    mock-datos-estructurales.ts  # 117 DatosEstructurales records keyed by building ID (57 green roofs + 60 candidates)
    mock-indicadores-estructurales.ts # 16 IndicadorEstructuralAlcaldia records (exported as `indicadoresEstructurales`)
    aptitud-pesos.ts        # 8 AHP weights
    kpis.ts                 # KPI data
  services/
    sources/                # Data source adapters
      sigcdmx.ts            # SIGCDMX WFS adapter (stub)
      sedema.ts             # SEDEMA adapter (stub)
      simat.ts              # SIMAT adapter (stub)
      mock-source.ts        # Mock data with source metadata (working)
    normalizers/            # Raw data → internal model transforms
      sigcdmx-normalizer.ts # WFS feature → DatosCatastrales
      simat-normalizer.ts   # SIMAT raw → LecturaCalidadAire
      sedema-normalizer.ts  # GeoJSON → CapaTerritorial
    repositories/           # Official-first data gateways
      roofs-repository.ts   # Green roofs + candidates
      validation-repository.ts # Validation records
      air-quality-repository.ts # Air quality readings
  layouts/default.vue       # AppHeader + DataDisclaimer (mock mode) + slot + AppFooter
  pages/
    index.vue               # Home (hero, KPIs, features, steps, map teaser, que-es-techo-verde, caso-estudio-CIIEMAD, evolucion, featured, methodology, zonas-prioritarias, AI, respaldo-cientifico, disclaimer)
    mapa/                   # Full-screen Leaflet map with layers
    inventario/             # Green roof inventory with search/filters/drawer + real images
    aptitud/                # Aptitud territorial page
    candidatos/             # Prioritized candidate sites (store-based, cadastral fields, structural pre-feasibility panel, badges)
    ia-validacion/          # AI validation table (store-based, origin column, new status) + AIAnalysisPanel (Gemini Vision)
    indicadores/            # Charts dashboard (tabbed: Territorial, Aptitud, Medio Ambiente, Analisis Estadistico, Simulacion Dinamica)
    metodologia/            # AHP methodology detail + official sources section
    sobre/                  # About page + normative section
    referencias.vue         # Marco académico CIIEMAD-IPN, tesis, capítulo 2023, ODS, fuentes oficiales, normativa, bibliografía organizada en bloques colapsables
    agenda-2030.vue         # Techos verdes y Agenda 2030 — 7 ODS conectados, MEA 2003, galería del techo verde CIIEMAD, vínculo al capítulo 10.52501/cc.064.13
    comunidad.vue           # 5 modos de participación (tiers), contribuyentes, formulario de aporte que POSTea a /comunidad/aportes (fallback mailto)
  public/
    geojson/                # CDMX alcaldia boundaries
    images/tesis/           # Images extracted from thesis PDFs (capas, CIIEMAD photos, maps, charts)
    img/roofs/              # 22 building photos (Wikimedia CC) + 7 category fallbacks
  stores/                   # roofs, validation, map (Pinia composable style, repository-backed)
  types/
    index.ts                # Core types (GreenRoof, CandidateRoof, ValidationRecord, etc.)
    sources.ts              # Source metadata types (SourceMeta, WithSourceMeta, extended types, structural feasibility types)
    remote-sensing.ts       # ENVI/satellite types (IndicesEspectrales, ENVIAlcaldiaData, SerieTemporal, pipeline config)
  docs/
    pipeline-envi.md        # Pipeline completo: adquisición → ENVI → JSON → plataforma
```

## Data Architecture

### Flow
```
Official APIs (SIGCDMX WFS, SIMAT, SEDEMA)
         ↓
   [Source Adapters]       /services/sources/
         ↓
   [Normalizers]           /services/normalizers/
         ↓
   [Repositories]          /services/repositories/
         ↓                 (official-first, mock fallback)
   [Pinia Stores]          /stores/
         ↓
   [Components/Pages]      (show provenance via DataSourceBadge)

Sentinel-2 / Landsat imagery
         ↓
   [ENVI Processing]       docs/pipeline-envi.md (offline)
         ↓
   [Zonal Statistics]      per alcaldía + per edificio
         ↓
   [JSON Export]           data/envi/alcaldias.ts
         ↓
   [Source Adapter]        services/sources/envi.ts
         ↓
   [Normalizer]            services/normalizers/envi-normalizer.ts
         ↓                 NDVI→cobertura, EVI→verdor, SAVI→ajustada, NDWI→hídrica, LST directo
   [Stores/Composables]   mejora confiabilidad de LST (0.55→0.90) y NDVI (0.60→0.92)
```

### Environment Variables
- Todas las API keys (Gemini, GEE, Sentinel Hub) se configuran en **cercu-backend**, no en este repo
- `NUXT_PUBLIC_DATA_MODE`: `mock` (default) or `official` — controls data source priority
- `NUXT_PUBLIC_SIGCDMX_BASE_URL`: SIGCDMX WFS endpoint
- `NUXT_PUBLIC_SIMAT_BASE_URL`: SIMAT API endpoint
- `NUXT_PUBLIC_SEDEMA_BASE_URL`: SEDEMA data portal
- `NUXT_PUBLIC_API_BASE_URL`: cercu-backend API URL (default: `http://localhost:3003/api/v1`) — for admin system

### AI Vision Pipeline (Gemini)
```
User uploads image (drag & drop / file picker)
         ↓
[AIAnalysisPanel.vue]       components/validation/
         ↓
[useVisionAI.ts]            composables/ (fileToBase64 + $fetch)
         ↓  POST /observatory/techos-verdes/ai/analyze-roof
[cercu-backend]             Express endpoint (Gemini API key en backend .env)
         ↓
[Google Gemini 2.0 Flash]   Vision model (free tier: 15 RPM, 1,500 req/day)
         ↓
[RoofAnalysisResult]        Parsed + validated JSON
         ↓
[validation store]          addAIRecord() → origenDeteccion: 'ia_automatica'
         ↓
[Validation table]          New pending record for human review
```

#### RoofAnalysisResult Type
```typescript
interface RoofAnalysisResult {
  techoPlano: boolean
  materialEstimado: string              // matches MaterialTechumbre union
  vegetacionExistente: boolean
  porcentajeVegetacion: number          // 0-100
  obstrucciones: string[]               // e.g. ['HVAC', 'tinacos', 'antenas']
  aptitudTechoVerde: number             // 0-100
  tipoRecomendado: 'extensivo' | 'semi-intensivo' | 'intensivo' | 'no_apto'
  areaUtilEstimadaPct: number           // % free of obstructions
  prediccion: string                    // Natural language summary (Spanish)
  confianza: 'alta' | 'media' | 'baja'
  porcentajeConfianza: number           // 0-100
  observaciones: string[]
}
```

#### Prompt Engineering
The system prompt instructs Gemini as a TVLE expert with CDMX-specific context:
- NTC-CDMX 2017 load requirements (100 kg/m² min)
- Flat roof / <15° slope requirement
- Optimal materials (losa de concreto, losacero, vigueta y bovedilla)
- Common obstructions (HVAC, tinacos, antenas, ductos, paneles solares)
- Response always in Spanish, structured JSON only

#### Server-side Safety
- API key (`GEMINI_API_KEY`) se configura en cercu-backend `.env` — nunca expuesta al cliente
- Response JSON is parsed and validated with clamped numerics and enum checks
- Falls back gracefully if Gemini returns non-JSON text

### Source Types
- `oficial` — verified government data
- `derivado` — calculated from primary sources
- `mock` — demonstration data for MVP

### Key Types
- `SourceMeta` — provenance metadata attached to every record
- `WithSourceMeta<T>` — generic wrapper adding `_source: SourceMeta`
- `GreenRoofExtended` — GreenRoof + optional `DatosCatastrales` (includes structural data)
- `CandidateRoofExtended` — CandidateRoof + optional `DatosCatastrales`
- `ValidationRecordExtended` — ValidationRecord + optional `OrigenDeteccion`
- `IndiceBioticoAlcaldia` — biodiversity metrics per alcaldia (Shannon, Simpson, species richness)
- `IndicadorHidricoAlcaldia` — hydric metrics per alcaldia (rainfall, capture, runoff)
- `DatosEstructurales` — structural data per building (tipoEstructura, zonaSismica, niveles, estadoEstructural, materialTechumbre, capacidadCargaTecho)
- `IndicadorEstructuralAlcaldia` — structural metrics per alcaldia (porcentajeConcretoAcero, edadPromedioAnios, porcentajeDictamenSeguro, scorePrefactibilidadPromedio)
- `TipoEstructura` — `'concreto_armado' | 'acero' | 'mamposteria_confinada' | 'mamposteria_simple' | 'lamina' | 'madera' | 'mixta' | 'desconocido'`
- `ZonaSismica` — `'I' | 'IIa' | 'IIb' | 'IIIa' | 'IIIb' | 'IIIc' | 'IIId'`
- `NivelPrefactibilidad` — `'prefactible' | 'requiere_evaluacion' | 'no_recomendado'`

## Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0E5E3A` | Main institutional green |
| `primary-light` | `#1A7A4E` | Hover states |
| `primary-dark` | `#094A2E` | Active/pressed |
| `primary-50` | `#ECFDF5` | Light backgrounds |
| `secondary` | `#18A5E3` | Water/hydro accent |
| `eco` | `#79C141` | Vegetation/positive |
| `accent` | `#F2A81D` | Highlights/warnings |
| `alert` | `#D9363E` | Errors/negatives |
| `surface` | `#F7F8F4` | Page background |
| `ink` | `#1F2937` | Primary text |
| `slate-custom` | `#64748B` | Secondary text |

### Typography
- **Font:** Inter (300-800)
- **Headings:** font-semibold, tracking-tight
- **All content in Spanish** (es-MX locale for formatting)

### Component Classes
- `.card` / `.card-interactive` / `.card-flat` / `.panel`
- `.btn-primary` / `.btn-secondary` / `.btn-eco` / `.btn-outline` / `.btn-ghost`
- `.badge-primary` / `.badge-eco` / `.badge-secondary` / `.badge-accent` / `.badge-alert`
- `.kpi-card` / `.input` / `.select` / `.table-base`
- `.container-wide` / `.container-narrow` / `.section-padding`

### Shadows
- `shadow-card`: `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`
- `shadow-card-hover`: `0 10px 15px -3px rgba(0,0,0,0.06)`
- `shadow-panel`: `0 4px 12px rgba(0,0,0,0.05)`

## Animation System (CERCU-inspired)
Smooth, physics-based motion language adapted from the cercu-frontend project.

### Easing Functions
- **Smooth:** `cubic-bezier(0.22, 1, 0.36, 1)` — default for most transitions
- **Bouncy:** `cubic-bezier(0.34, 1.56, 0.64, 1)` — scale/pop entrances
- **Exit:** `cubic-bezier(0.4, 0, 1, 1)` — element removal

### Page Transitions
Configured in `nuxt.config.ts` as `pageTransition: { name: 'page', mode: 'out-in' }`.
Enter: fade + slide-up (12px). Leave: fade + slide-up (-8px).

### Vue `<Transition>` Names
| Name | Effect |
|------|--------|
| `fade` | Opacity only |
| `scale` | Opacity + scale(0.92) with bouncy easing |
| `slide-up` | Opacity + translateY(20px) |
| `slide-right` | Opacity + translateX(-20px) |
| `pop` | Opacity + scale(0.75) with bouncy easing |

### Scroll Reveal (`useScrollReveal`)
CSS classes + IntersectionObserver composable:
- `.reveal` — slide up 32px + fade
- `.reveal-left` / `.reveal-right` — slide horizontal 32px + fade
- `.reveal-scale` — scale(0.9) + fade
- `.stagger-children` — container that staggers `.reveal` children (60ms delay each)
- `.is-visible` — applied by observer, triggers transition

Usage:
```vue
<script setup>
const { revealRef } = useScrollReveal({ stagger: true })
</script>
<template>
  <div ref="revealRef" class="stagger-children">
    <div class="reveal">Item 1</div>
    <div class="reveal">Item 2</div>
  </div>
</template>
```

### CSS Animation Utilities
| Class | Animation |
|-------|-----------|
| `.animate-fade-in` | Opacity 0→1 |
| `.animate-slide-up` | Translate Y 24px→0 + fade |
| `.animate-slide-down` | Translate Y -16px→0 + fade |
| `.animate-slide-right` | Translate X -24px→0 + fade |
| `.animate-scale-in` | Scale 0.9→1 + fade |
| `.animate-bounce-in` | Scale bounce entrance |
| `.animate-float` | Gentle vertical float (infinite) |
| `.animate-shimmer` | Gradient sweep (infinite) |
| `.animate-pulse-glow` | Box-shadow pulse (infinite) |
| `.animate-wiggle` | Rotation wiggle |
| `.animate-gradient-shift` | BG position shift (infinite) |
| `.delay-100` ... `.delay-700` | Animation delay utilities |

### Micro-interactions
- **Cards:** `.card-interactive` lifts 4px on hover with enhanced shadow, scales 0.99 on active press
- **Buttons:** `.btn` lifts 1px on hover, scales 0.97 on active press
- **Logo:** Scales 1.1 + slight rotation on hover
- **Filter chips:** `scale-[1.02]` when active, `active:scale-95` press feedback
- **Progress bars:** `animation: progressFill 1s` for animated width fill

### Lava Lamp Hero (`CommonHeroSection.vue`)
Reusable component used by all public pages via `<CommonHeroSection compact>`.
- 4 orbs: 3 green primary (`#0E5E3A`, `#1A7A4E`, `#0A4A2D`) + 1 eco accent (`#79C141`)
- GPU-accelerated via `translate3d` + `will-change: transform`
- `filter: blur(26px)`, `mix-blend-mode: screen`
- Keyframes `lavaA`-`lavaD` (10-16s staggered)
- `compact` prop controls padding; `<slot>` receives inner content

### Reduced Motion
All animations and transitions are disabled with `@media (prefers-reduced-motion: reduce)`.

## Key Patterns

### Client-Only Components
Leaflet maps and Chart.js charts must render client-side only:
- Use `.client.vue` suffix on the component file
- Wrap with `<ClientOnly>` and provide a `#fallback` slot

### Mock Data Property Names
Properties use **camelCase** in TypeScript (not snake_case):
- `tipoEdificio` (not `tipo_edificio`)
- `tipoTechoVerde` (not `tipo_techo_verde`)
- `scoreAptitud` (not `score_aptitud`)
- `superficie` (not `superficie_m2`)

### Format Functions
Always add null guards: `if (!value) return 'Sin tipo'`
Use fallback: `map[value] || value.charAt(0).toUpperCase() + value.slice(1)`
No global `formatMXN()` exists in `useFormatters` — components that need MXN formatting create a local `Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })` with `Number.isFinite()` guard.

### Stores (Pinia composable style)
```typescript
export const useMyStore = defineStore('myStore', () => {
  const items = ref([])
  const loading = ref(false)
  // ...
  return { items, loading }
})
```

### Pagination (configurable, default 15 items per page)
All data tables use client-side pagination via `CommonPaginationControls.vue` with configurable per-page selector (10/15/25/50). `AdminDataTable` accepts `defaultPerPage` prop and renders a dropdown. The component receives `v-model:current-page`, `totalPages`, `totalItems`, and `perPage` props.

**Pattern:**
```typescript
const currentPage = ref(1)
const perPage = 15
const totalPages = computed(() => Math.ceil(filtered.value.length / perPage) || 1)
const paginated = computed(() => filtered.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))
watch([/* filter refs */], () => { currentPage.value = 1 }) // reset on filter change
```

**Applied to:**
- `AdminDataTable.vue` — built-in pagination (used by admin/techos-verdes, admin/validaciones, admin/candidatos)
- `ValidationTable.vue` — desktop table + mobile cards both paginated
- `pages/inventario/index.vue` — roof card grid (57 items)
- `pages/candidatos/index.vue` — candidate card grid (60 items)
- `pages/ia-validacion/index.vue` — validation table (30 items)

When `v-if`/`v-else` patterns exist alongside pagination, wrap the list + pagination in `<template v-if>` to keep the `v-else` chain intact.

### Lazy Loading for Images
Card grids with images use native `loading="lazy"` on `<img>` tags. Applied in `pages/inventario/index.vue` roof cards.

### Map Popups
Green roof popups show `descripcion` field (source/reference info) when available.
Candidate popups show score with color-coded value.
Popup functions: `buildGreenRoofPopup()`, `buildCandidatePopup()` in `pages/mapa/index.vue`.

### MapPanel Move Suppression
`MapPanel.client.vue` uses a `suppressMoveEmit` flag to prevent recursive update loops when the parent programmatically updates `center`/`zoom` props. The `moveend` listener skips emitting when the flag is set, and center/zoom watchers include coordinate-comparison guards.

### Tabbed Pages (Indicadores pattern)
For pages with many sections, use sticky tab navigation with `v-show` (not `v-if`) to avoid chart re-renders:
```vue
<div class="sticky top-0 z-30 border-b bg-white/95 backdrop-blur-sm">
  <nav class="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" ...>
```
Tables use collapsible toggles (`expandedTables` reactive object + `toggleTable(key)`) to reduce visual overload.

### Sortable Tables
**All** data tables with `v-for` rows support click-to-sort on column headers (except static reference tables and the correlation matrix).

**`AdminDataTable.vue`** — sorting built-in: click any `<th>` to sort by that column. Sort icon (`↑`/`↓`) only appears on the active column inside a fixed-width `w-3` span to avoid column width changes. Chain: `filtered` → `sorted` → `paginated`. Compares numbers numerically, strings with `localeCompare`, nulls pushed to end.

**Per-page tables (indicadores):**
- `SortState` type: `{ col: string; dir: 'asc' | 'desc' }`
- One `ref<SortState>` per table: `sortAlcaldia`, `sortBio`, `sortHidrico`, `sortPlan`
- `toggleSort(state, col)` — toggles direction if same column, otherwise sets descending
- `sortedBy(data, state, getters)` — generic sort using a `Record<string, (row) => number | string>` getter map
- Hover feedback: scoped CSS `th.cursor-pointer:hover { background-color: rgba(0,0,0,0.03) }`

**Card grids** use a `<select>` dropdown for ordering (no `<th>` available):
- `inventario/index.vue` — nombre, superficie, alcaldía, fecha
- `candidatos/index.vue` — score, nombre, superficie, alcaldía, estatus

**Pages with sortable `<th>` tables:**
- `indicadores/index.vue` — alcaldía, biodiversidad, hídrico, plan de acción (4 tables)
- `ia-validacion/index.vue` — validation table (8 sortable columns + select dropdown + Acciones)
- `admin/*` — all pages via `AdminDataTable` (techos-verdes, candidatos, validaciones)
- `admin/prospectos/index.vue` — detector results (custom columns)

### Mobile-First Design
All layouts follow mobile-first Tailwind convention (`grid-cols-1` base → `md:`/`lg:` breakpoints for wider screens):
- **Tables:** wrapped in `overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0` for edge-to-edge horizontal scroll on mobile, with `min-w-[Xpx]` to prevent column crushing
- **Grids:** always start from `grid-cols-1` or `grid-cols-2`, scaling up at `md:`/`lg:`/`xl:` breakpoints
- **Alcaldia names:** `whitespace-nowrap` on `<td>` to prevent awkward mid-word breaks
- **Badges:** `whitespace-nowrap` on viabilidad/prioridad badges
- **Numeric columns:** `tabular-nums` class for monospace digit alignment
- **Sources grid:** `grid-cols-1 sm:grid-cols-2` (not always 2-col)
- **Structural toggle:** `flex-wrap` so badge wraps to new line on narrow viewports

## Statistical Analysis (`useStatisticalAnalysis.ts`)
Pure functions (no Chart.js dependency):
- `linearRegression(xs, ys)` → `{ slope, intercept, r2, predict(x) }`
- `pearsonCorrelation(xs, ys)` → number (-1 to 1)
- `descriptiveStats(values)` → `{ mean, median, stdDev, min, max, q1, q3 }`
- `correlationMatrix(variables)` → `{ labels, matrix }`
- `computeProjections(m2, years)` → `ProjectionYear[]` (CO₂, temp, water, energy)
- `computeIndiceNecesidad(input)` → number (0-100 composite score)
- `computeRiskProfile(input)` → `AlcaldiaRiskProfile` (5 risk indicators with semaphore levels + overall score)
- `computeRiskProfileWithStructural(input)` → `AlcaldiaRiskProfile` (6 indicators: 5 environmental + "Viabilidad constructiva"; rescaled weights)
- `computeScorePrefactibilidad(input)` → `PrefactibilidadResult` (6-component weighted score → 3 levels: prefactible ≥65, requiere_evaluacion ≥40, no_recomendado <40)
- `computeEffectiveM2(input)` → `{ m2Efectivos, m2Descartados, factorReduccion }` (reduces m² by structural viability: prefactible 100%, requiere_evaluacion 50%, no_recomendado 0%)
- `computeCostOfInaction(m2, years, poblacion)` → `InactionCostResult` (annual cost series by category)
- `computeROI(m2, years, poblacion)` → `ROIResult` (investment vs benefits, ROI%, VPN, payback period)

### Constants
- `UMBRALES_RIESGO` — thresholds for LST (critico/alto/moderado), O3, NO2, vegetation, Shannon
- `COSTOS_REFERENCIA` — unit costs for TVLE installation ($1,200/m²), maintenance ($80/m²/año), electricity ($2.5/kWh CFE DAC), health consultations ($3,500), flood damage ($45/m³), CO₂ ($500/tonCO₂)
- `UMBRALES_ESTRUCTURALES` — structural thresholds: capacidadCargaMinTVLE (100 kg/m²), capacidadCargaMinIntensivo (300 kg/m²), edadMaxSinRefuerzo (50 años), nivelesMaxSinAnalisis (3)
- `PESOS_PREFACTIBILIDAD` — 6-component weights: tipoEstructura (0.25), zonaSismica (0.20), edadConstruccion (0.15), niveles (0.10), estadoEstructural (0.15), materialTechumbre (0.15)

### Impact Rates (Cervantes Najera 2021, 2025 — CIIEMAD-IPN)
- CO₂: 0.968 kg/m²/año
- Temperatura: 3.5°C reduccion (ref. 79,584 m²)
- Agua: 19.5 L/m²/año captacion
- Energia: 432.95 kWh/m²/año ahorro termico

### Necesidad Index Weights
LST promedio (30%), deficit cobertura vegetal (25%), densidad poblacional (20%), baja captacion pluvial (15%), baja biodiversidad (10%).

### Structural Pre-Feasibility
Pre-feasibility is a **technical constraint orthogonal to AHP aptitude**. It does NOT modify the 8-variable AHP model — it acts as a separate dimension that reduces "effective m²" available for green roof installation.

**Score components** (0-100 each, weighted sum):
- Tipo estructura (25%): concreto_armado=95, acero=90, mixta=70, mamposteria_confinada=60, mamposteria_simple=35, madera=20, lamina=10
- Zona sismica (20%): I=100, IIa=85, IIb=75, IIIa=60, IIIb=45, IIIc=30, IIId=10
- Edad construccion (15%): <10 years=100, 10-25=85, 25-50=60, 50-80=35, >80=15
- Niveles (10%): 1-2=100, 3=85, 4-5=65, 6-10=45, >10=30
- Estado estructural (15%): seguro=100, dano_menor=50, dano_mayor=10, sin_dictamen=40
- Material techumbre (15%): losa_concreto=95, vigueta_bovedilla=80, losacero=85, lamina_metalica=40, lamina_asbesto=10, madera_teja=25

**Classification**: prefactible (≥65), requiere_evaluacion (40-64), no_recomendado (<40)

**Effective m²**: prefactible → 100% credit, requiere_evaluacion → 50%, no_recomendado → 0%

**Risk profile integration**: 6th indicator "Viabilidad constructiva" at 10% weight (original 5 rescaled from 1.0 to 0.9)

**Official data sources** (mock for MVP):
- Catastro CDMX / SIGCDMX — tipo estructural, edad, niveles, material techumbre
- Atlas de Riesgos CDMX (SGIRPC) — zonificacion sismica, riesgo inundacion
- Dictamenes post-sismo 19S (2017) — estado estructural
- INEGI Censo 2020 — material en techos/muros
- NTC-CDMX 2017 — capacidad de carga en azoteas
- Cervantes Najera (2025), Tabla 6 — carga minima TVLE: 100 kg/m², intensivo: 300 kg/m²

### Indicadores Tab "Analisis Estadistico" (Decision-oriented)
5 sections designed for municipal authorities. **Physical-units approach:** indicators use MWh, m³, tonCO₂, consultas instead of monetary values to avoid premature cost commitments during early presentation stages. Exception: CO₂ keeps monetary reference ($500/tonCO₂, Mexico2 2024) as official market data. Structural pre-feasibility is integrated as an orthogonal constraint (not an AHP variable) that reduces "effective m²" available for intervention.

- **E.0 Diagnostico de Riesgo:** Alcaldia selector → 6 semaphore cards (isla de calor, O₃, deficit vegetal, vulnerabilidad hidrica, biodiversidad, **viabilidad constructiva**) + summary box with risk score (0-100)
- **E.1 Impacto Potencial sin Intervencion:** Shared m² slider+input+presets / years controls + **structural toggle** ("Ajustar por viabilidad constructiva" checkbox) → 4 physical-unit KPI cards (MWh/año, consultas/año, m³/año, tonCO₂/año with monetary ref) + cumulative summary + stacked bar chart. When toggle is on, all calculations use `effectiveM2` (reduced by structural viability of selected alcaldia).
- **E.2 Potencial de Mejora:** Before/after comparison grid (0 → +X physical units) + cumulative impact KPIs + line chart with energy/water/CO₂ progression over time (uses effective m²)
- **E.3 Evidencia Estadistica:** Scatter plots + 10-variable correlation matrix (8 original + **Prefact.** + **Edad edif.**) with interpretive boxes for policy makers
- **E.4 Plan de Accion:** Enriched ranking table (m² recommended, **viabilidad badge**, **m² efectivos**, investment, annual benefit, priority badge) + executive summary mentioning effective m² + collapsible "Fuentes y metodologia" reference panel with structural sources (Catastro CDMX, Atlas de Riesgos, Dictamenes 19S, INEGI Censo 2020, NTC-CDMX 2017)

Key script computeds for E.1/E.2:
- `physicalImpacts` — energiaMwh, aguaM3, co2Ton, consultasAnuales, tempReduction, hogares (uses `effectiveM2.m2Efectivos`)
- `effectiveM2` — computed from `computeEffectiveM2()` using selected alcaldia's structural profile
- `adjustForStructural` — ref toggle; when false, `effectiveM2` passes through raw `m2Slider` value
- `inactionPhysicalDatasets` — stacked bar (MWh, m³, tonCO₂ cumulative per year)
- `improvementChartDatasets` — line chart (energy, water, CO₂ accumulated benefits)

## Remote Sensing / ENVI Pipeline

### Índices espectrales
| Índice | Fórmula (Sentinel-2) | Rango | Uso |
|--------|---------------------|-------|-----|
| NDVI | (B08-B04)/(B08+B04) | -1 a 1 | Cobertura vegetal (peso AHP 9.56%) |
| EVI | 2.5×(B08-B04)/(B08+6×B04-7.5×B02+1) | -1 a 1 | Verdor mejorado (menos saturación) |
| SAVI | ((B08-B04)/(B08+B04+0.5))×1.5 | -1 a 1 | Cobertura ajustada por suelo urbano |
| NDWI | (B03-B08)/(B03+B08) | -1 a 1 | Disponibilidad hídrica superficial |
| LST | Landsat ST_B10 → °C | 25-42°C | Isla de calor (peso AHP 30.19%) |

### Fuentes satelitales

**Sentinel-2 (ESA/Copernicus) — fuente principal para índices de vegetación**
- **Satélites:** Sentinel-2A (2015) + Sentinel-2B (2017), órbita polar heliosíncrona a 786 km
- **Resolución espacial:** 10m (bandas visibles B02-B04 + NIR B08), 20m (red-edge B05-B07, SWIR B11-B12), 60m (atmosférica)
- **Resolución temporal:** 5 días (combinando 2A+2B), 10 días por satélite individual
- **Cobertura CDMX:** tiles 14QNG, 14QPG, 14QNH (sistema MGRS)
- **Producto usado:** S2MSI2A (Level-2A) — reflectancia de superficie, ya corregido atmosféricamente por Sen2Cor
- **Bandas clave:** B02 (490nm azul, para EVI), B03 (560nm verde, para NDWI), B04 (665nm rojo, para NDVI/EVI/SAVI), B08 (842nm NIR, para todos), SCL (clasificación de escena, para cloud masking)
- **Uso en el observatorio:** NDVI, EVI, SAVI, NDWI — los 4 índices de vegetación y agua
- **Acceso:** gratuito vía Copernicus Data Space (dataspace.copernicus.eu) o Google Earth Engine (`COPERNICUS/S2_SR_HARMONIZED`)
- **Ventajas:** resolución 10m ideal para azoteas individuales, revisita frecuente para series temporales, corrección atmosférica incluida en L2A

**Landsat 8/9 (NASA/USGS) — fuente para temperatura superficial (LST)**
- **Satélites:** Landsat 8 (2013, sensores OLI + TIRS) + Landsat 9 (2021, OLI-2 + TIRS-2), órbita polar a 705 km
- **Resolución espacial:** 30m (bandas ópticas), 100m (bandas térmicas TIRS, remuestreadas a 30m en producto)
- **Resolución temporal:** 16 días por satélite, 8 días combinando L8+L9
- **Cobertura CDMX:** path 026, row 047 (sistema WRS-2)
- **Producto usado:** LC08_L2SP / LC09_L2SP (Collection 2 Level-2 Science Product) — incluye reflectancia de superficie + temperatura superficial
- **Banda clave:** ST_B10 (TIRS-1 Surface Temperature) — LST en Kelvin, conversión: `°C = DN × 0.00341802 + 149.0 - 273.15`
- **Uso en el observatorio:** LST (temperatura superficial terrestre) — el índice de mayor peso en el modelo AHP (30.19%)
- **Acceso:** gratuito vía USGS EarthExplorer (earthexplorer.usgs.gov) o Google Earth Engine (`LANDSAT/LC08/C02/T1_L2`, `LANDSAT/LC09/C02/T1_L2`)
- **Ventajas:** único satélite gratuito con banda térmica calibrada; continuidad del programa desde 1972 (Landsat 1) permite análisis histórico de décadas
- **Limitación:** resolución térmica real de 100m limita análisis a nivel manzana (no edificio individual); para azoteas se usa el promedio zonal de la alcaldía

**MODIS (NASA) — referencia para validación cruzada**
- **Satélites:** Terra (1999) + Aqua (2002), órbita polar a 705 km
- **Resolución espacial:** 250m-1km según producto
- **Resolución temporal:** diaria (ambos satélites)
- **Productos relevantes:** MOD13Q1 (NDVI/EVI 250m, 16 días), MOD11A2 (LST 1km, 8 días)
- **Uso en el observatorio:** no se usa como fuente directa (resolución insuficiente para análisis urbano), pero sirve como referencia de validación cruzada para verificar tendencias temporales de NDVI y LST derivados de Sentinel-2/Landsat
- **Acceso:** gratuito vía GEE (`MODIS/061/MOD13Q1`, `MODIS/061/MOD11A2`)

**¿Por qué estas fuentes y no otras?**
| Criterio | Sentinel-2 | Landsat 8/9 | MODIS | Imágenes comerciales (Maxar, Planet) |
|----------|-----------|-------------|-------|-------------------------------------|
| Costo | Gratis | Gratis | Gratis | $$$$ |
| Resolución | 10m | 30m (100m térmica) | 250m-1km | 0.3-3m |
| Banda térmica | No | Sí (TIRS) | Sí | Rara |
| Revisita | 5 días | 8 días | Diaria | 1-5 días |
| Histórico | 2015+ | 1984+ | 2000+ | Variable |
| Acceso API | GEE, SH | GEE, USGS | GEE | APIs propietarias |

Para un observatorio público de investigación con presupuesto cero, Sentinel-2 + Landsat cubren el 100% de las necesidades: vegetación a 10m y temperatura a 100m, ambos gratuitos con +40 años de archivo combinado.

### Consulta en vivo (Google Earth Engine / Sentinel Hub)
```
Cliente → useRemoteSensing() → cercu-backend POST /observatory/techos-verdes/remote-sensing/indices
                                  → Google Earth Engine (gratis, prioridad)
                                  → Sentinel Hub (gratis 30k req/mes, fallback)
                               → datos locales calibrados (fallback offline: data/envi/alcaldias.ts)
```
El procesamiento de GEE/Sentinel Hub ocurre en **cercu-backend**, no en Nitro. Las credenciales (GEE Service Account, Sentinel Hub OAuth) se configuran en el backend.

- `composables/useRemoteSensing.ts` — `fetchIndices({ lat, lng, alcaldia?, radio?, fechaInicio?, fechaFin? })` → `indices`, `serie`, `fuente`, `fuenteLabel`, `calidad`, `confianzaColor`, `loading`, `error`. Si cercu-backend no responde, usa fallback local automáticamente.

### Archivos
- `types/remote-sensing.ts` — tipos: `IndicesEspectrales`, `ENVIAlcaldiaData`, `SerieTemporal`, `CalidadDatos`, `ENVIPipelineConfig`
- `data/envi/alcaldias.ts` — datos por alcaldía con serie temporal mensual 2019-2025 (placeholder calibrado)
- `services/sources/envi.ts` — adapter offline: `getENVIAlcaldias()`, `getENVIActual()`, `getENVISerie()`
- `services/normalizers/envi-normalizer.ts` — `ndviToCoberturaVegetal()`, `eviToIndiceVerdor()`, `saviToCoberturaAjustada()`, `ndwiToDisponibilidadHidrica()`, `categorizarTendencia()`
- `docs/pipeline-envi.md` — pipeline paso a paso con comandos ENVI

### Mejora de confiabilidad
| Indicador | Mock → ENVI | Impacto |
|-----------|-------------|---------|
| Cobertura vegetal | 0.60 → 0.92 | NDVI calibrado reemplaza estimaciones |
| LST | 0.55 → 0.90 | Medición directa por banda térmica |
| Score AHP global | 0.60 → 0.85 | LST+NDVI = 39.75% del peso del modelo |

### Serie temporal
Cada alcaldía tiene ~78 observaciones mensuales (2019-2025) con variación estacional (NDVI↑ en lluvias jun-oct, LST↑ en secas mar-may). Permite gráficas de evolución y cálculo de tendencias lineales por índice.

## System Dynamics Simulation (`useSystemDynamics.ts`)
Euler-based simulation engine with feedback loops for policy scenario comparison. Imports `TASAS` and `COSTOS_REFERENCIA` from `useStatisticalAnalysis.ts`.

### Scenarios
| ScenarioId | tasa base (m²/yr) | presupuesto | color |
|------------|-------------------|-------------|-------|
| `sin_intervencion` | 0 | 0 | `#D9363E` (alert) |
| `tendencial` | 5,000 | 6M | `#F2A81D` (accent) |
| `politica_activa` | 10,000 | 15M | `#18A5E3` (secondary) |
| `optimista` | 20,000 | 30M | `#0E5E3A` (primary) |

### Feedback Loops
- **R1 Ciclo Virtuoso** (reinforcing): ahorros → mas presupuesto → mas techos
- **R2 Efecto Demostracion** (reinforcing): visibilidad → apoyo politico → mas programas (logarithmic)
- **B1 Saturacion Territorial** (balancing): menos sitios disponibles → instalacion mas lenta
- **B2 Capacidad Implementacion** (balancing): escasez contratistas → costos → mas lento (logistic cap 50,000 m²/yr)

### Constants (`SD_CONSTANTS`)
- `M2_INICIAL`: 79,584 (inventario actual)
- `M2_POTENCIAL_TOTAL`: 514,000 (analisis GIS)
- `CAPACIDAD_MAX_ANUAL`: 50,000 m²/año
- `COSTO_MINIMO_M2`: 720 MXN (60% del original, piso curva aprendizaje)
- `DT`: 0.25 (paso trimestral Euler)
- `HORIZONTE_DEFAULT`: 30 años

### Key Types
- `ScenarioId` — `'sin_intervencion' | 'tendencial' | 'politica_activa' | 'optimista'`
- `ScenarioParams` — full scenario configuration (tasa, presupuesto, aprendizaje, degradacion, etc.)
- `SDState` — state vector per timestep (m2Instalados, m2Disponibles, deltaTemperatura, acumulados)
- `SDSimulationResult` — scenario + series + resumen
- `PolicyLevers` — user-adjustable multipliers (presupuesto, reinversion, participacion privada, retraso)

### Exported Functions
- `eulerStep(state, params, levers, dt)` → `SDState`
- `runSimulation(params, horizonte?, levers?)` → `SDSimulationResult`
- `runAllScenarios(horizonte?, levers?)` → `SDSimulationResult[]`
- `computeResumen(series, params)` → `SDResumen`
- `sampleAnnual(series)` → `SDState[]` (1 sample/year from quarterly data for charts)

### Model Equations
- **Temperature**: non-linear exponential asymptote `deltaT = -3.5 * (1 - e^(-m2/79584))`
- **Learning curve**: `costoUnit = max(720, 1200 * (1 - tasaAprendizaje)^t)`
- **Installation**: `tasaBruta * factorSaturacion * logisticCap` with budget/demonstration multipliers
- **Stocks**: `dm2/dt = instalacion - degradacion * m2Instalados`

### Indicadores Tab "Simulacion Dinamica" (5th tab)
Extracted into `components/indicadores/SimulacionDinamica.vue` to keep `indicadores/index.vue` manageable.

- **S.0 Modelo de Retroalimentacion:** 2x2 grid of feedback loop cards (R1, R2, B1, B2) with color-coded borders
- **S.1 Controles:** Scenario toggle chips, horizon presets (10-50 yr), collapsible policy lever sliders (multiplicadorPresupuesto, fraccionReinversion, participacionPrivada, aniosRetrasoPolitica)
- **S.2 Graficas Comparativas:** 6 LineCharts (m² instalados, tasa instalacion, temperatura, energia acumulada, CO₂ acumulado, costo unitario) with 1-4 series per active scenario
- **S.3 Metricas Comparativas:** Per-scenario summary cards + collapsible comparison table
- **S.4 Nota Metodologica:** Collapsible section with Euler method, assumptions, limitations, sources

## Thesis Images (`public/images/tesis/`)
Images extracted from the two CIIEMAD-IPN theses by Ana Laura Cervantes Najera:

| File | Content | Source |
|------|---------|--------|
| `capas-techo-verde.png` | Diagram of 6 green roof layers | Master's thesis (2021), Imagen 2 |
| `tvle-ciiemad-foto.png` | Photo of TVLE green roof at CIIEMAD | Doctoral thesis (2025), Figura 3 |
| `ciiemad-cuadrantes.png` | Photo of monitored quadrants (C1-C4) | Master's thesis (2021), Imagen 15 |
| `ciiemad-vista-aerea.png` | Aerial view of CIIEMAD building | Master's thesis (2021), Imagen 11 |
| `mapa-inventario-cdmx.png` | Satellite map of green roofs inventory | Doctoral thesis (2025), Figura 13 |
| `evolucion-tv-chart.png` | Bar+line chart green roof growth 1999-2023 | Doctoral thesis (2025), Figura 15 |
| `sitios-potenciales-125.png` | Map of priority zones for TVLE | Doctoral thesis (2025), Figura 34 |
| `terrazas-alcazar.png` | Terrazas del Alcazar historic green roof | Doctoral thesis (2025), Figura 14 |
| `prospectiva-indicadores-130.png` | Sustainability indicators projection | Doctoral thesis (2025), Figura 35 |
| `techo-verde-ciiemad-panoramica.jpg` | Panorámica del techo verde con contexto urbano de Zacatenco | TECHOS VERDES.pptx (CIIEMAD, jul 2023) |
| `techo-verde-ciiemad-suculentas.jpg` | Detalle de echeverias y crasuláceas | TECHOS VERDES.pptx (CIIEMAD, jul 2023) |
| `techo-verde-ciiemad-modulo.jpg` | Módulo experimental con cubierta vegetal mixta | TECHOS VERDES.pptx (CIIEMAD, jul 2023) |
| `techo-verde-ciiemad-floracion.jpg` | Floración estacional en suculentas del techo | TECHOS VERDES.pptx (CIIEMAD, jul 2023) |
| `techo-verde-ciiemad-mantenimiento.jpg` | Equipo CIIEMAD durante trabajos de mantenimiento | TECHOS VERDES.pptx (CIIEMAD, jul 2023) |
| `techo-verde-ciiemad-edificio.jpg` | Vista del techo desde lo alto con edificio académico al fondo | TECHOS VERDES.pptx (CIIEMAD, jul 2023) |

## Inventory Images (`public/img/roofs/`)
22 building-specific photos from Wikimedia Commons (CC BY-SA / CC0 / CC BY, 800px wide):

| File | Building | License |
|------|----------|---------|
| `bellas-artes.jpg` | Palacio de Bellas Artes | CC BY 4.0 |
| `hospital-general.jpg` | Hospital General de México | Public Domain |
| `mercado-jamaica.jpg` | Mercado de Jamaica | CC BY-SA 2.0 |
| `torre-bbva.jpg` | Torre BBVA Bancomer | CC0 |
| `unam-arquitectura.jpg` | UNAM Fac. Arquitectura | CC BY-SA 4.0 |
| `perisur.jpg` | Centro Comercial Perisur | CC BY 4.0 |
| `museo-antropologia.jpg` | Museo Nacional de Antropología | CC BY 4.0 |
| `mercado-merced.jpg` | Mercado de la Merced | Public Domain |
| `senado.jpg` | Senado de la República | CC BY-SA 4.0 |
| `sep.jpg` | Secretaría de Educación Pública | CC BY-SA 3.0 |
| `mercado-sonora.jpg` | Mercado de Sonora | CC BY-SA 4.0 |
| `centro-santa-fe.jpg` | Centro Comercial Santa Fe | CC BY 2.0 |
| `hospital-infantil.jpg` | Hospital Infantil Federico Gómez | CC BY-SA 4.0 |
| `gobierno-cdmx.jpg` | Antiguo Palacio del Ayuntamiento | CC BY-SA 4.0 |
| `mercado-coyoacan.jpg` | Mercado de Coyoacán | CC BY-SA 4.0 |
| `conagua.jpg` | CONAGUA Edificio Sede | CC BY-SA 4.0 |
| `colmex.jpg` | El Colegio de México | CC BY 3.0 |
| `forum-buenavista.jpg` | Forum Buenavista | CC BY-SA 4.0 |
| `mercado-san-juan.jpg` | Mercado de San Juan | CC BY-SA 4.0 |
| `tec-cdmx.jpg` | Tec de Monterrey Campus CDMX | CC BY-SA 4.0 |
| `liverpool-insurgentes.jpg` | Liverpool (Centro CDMX) | CC BY-SA 4.0 |
| `ipn-ciiemad.jpg` | IPN CIIEMAD Zacatenco | Cervantes Najera (2025) |

7 category-based fallback images (generic green roofs, Wikimedia CC):

| File | Category | Source |
|------|----------|--------|
| `_fallback-gobierno.jpg` | gobierno, cultural | Chicago City Hall green roof |
| `_fallback-oficinas.jpg` | oficinas | WIPO HQ, Geneva |
| `_fallback-industrial.jpg` | industrial | Ford Rouge Plant |
| `_fallback-residencial.jpg` | residencial | EVA-Lanxmeer eco-district |
| `_fallback-educativo.jpg` | educativo | University of Warwick |
| `_fallback-comercial.jpg` | centro_comercial, supermercado, mercado | Vancouver BC |
| `_fallback-hospital.jpg` | hospital | Mouscron, Belgium |

### Image Fallback Chain
Only 22 of 57 roofs have `imagen` set (those with actual files). The other 35 have no `imagen` field to avoid 404 console errors.
`roof.imagen` → `CATEGORY_FALLBACKS[tipoEdificio]` → gradient placeholder (CSS bg).
Handled by `roofImageSrc()` + `onImgError()` in `pages/inventario/index.vue`.
Attribution footer at bottom of inventory page.

### Thesis References
- **Doctoral (2025):** "Techos verdes una solucion sustentable para la adaptacion al cambio climatico en la Ciudad de Mexico" — M. en C. Ana Laura Cervantes Najera, CIIEMAD-IPN. Directora: Dra. Maria Concepcion Martinez Rodriguez.
- **Master's (2021):** "Diseno, aplicacion y evaluacion de un techo verde ligero extensivo como estrategia para la adaptacion al cambio climatico en la alcaldia Gustavo A. Madero, Ciudad de Mexico" — I.Q.I. Ana Laura Cervantes Najera, CIIEMAD-IPN.

### Key Findings Used in Platform
- 94.8% reduction in carbon footprint (TVLE vs conventional)
- 25.9% more economical than conventional green roof
- 18-month payback period
- 3.5°C surface temperature reduction
- 432.95 kWh/m²/year energy savings
- 0.077 tonCO₂/year captured by existing inventory
- 428 km² priority zones identified via GIS multicriteria analysis
- 514,000 m² potential installation area
- 2.8 million kWh/year potential energy savings
- $8 million MXN annual economic benefit

## Header Navigation

`AppHeader.vue` agrupa la navegación en **4 slots primarios** (en lugar de 8 links planos):

```
[Logo] [Inicio] [Datos ▾] [Conocimiento ▾] [Comunidad]   [logos] [☀/🌙] [+ Aportar]
```

- **Datos ▾** — Inventario · Candidatos · Mapa interactivo · Indicadores
- **Conocimiento ▾** — Sobre · Metodología · Agenda 2030 · Referencias
- **Comunidad** — link directo (color eco)
- **+ Aportar** — CTA verde que lleva a `/comunidad#aportar`

Dropdowns: cada link muestra `description` bajo el nombre. Animación `dropdown` (scaleY+fade, 180ms). Abre en hover (desktop) y click toggleable. Detecta sub-rutas activas via `isGroupActive(g)` y resalta el grupo.

Mobile drawer: secciones agrupadas con cabecera tipográfica (Datos / Conocimiento) + dos CTAs al pie (Aportar + Mapa).

## Public Pages — Marco académico, ODS y Comunidad

### `/agenda-2030` — Techos verdes y la Agenda 2030
Página completa basada en el capítulo XIII de Martínez Rodríguez & Cervantes-Nájera (2023, *Repensar la Agenda 2030*, Comunicación Científica, DOI [10.52501/cc.064.13](https://doi.org/10.52501/cc.064.13)). Estructura:
1. Cita académica destacada del capítulo
2. KPIs (7 ODS, 17 metas, 142 proyectos NATURVATION, 75 % emisiones urbanas, 7M muertes contaminación, 60 % GEI energía)
3. 4 servicios ecosistémicos (MEA 2003): SC · SR · SA · SS
4. Las 7 tarjetas de ODS conectados (2, 3, 6, 7, 11, 13, 15) con colores oficiales ONU + metas + cita justificativa
5. Galería del techo verde CIIEMAD (6 imágenes de `techo-verde-ciiemad-*.jpg`)
6. Aterrizaje territorial: links a /mapa, /indicadores, /candidatos
7. Cierre ODS 17 con CTA a /referencias y al capítulo en acceso abierto

### `/referencias` — Marco académico institucional
Página de referencias organizadas por bloques. Estructura:
1. **Sede académica IPN/CIIEMAD** — card destacada con logos y links externos
2. **Tesis y publicaciones** (3 cards): doctoral 2025, capítulo 2023, maestría 2021
3. **Agenda 2030 y ODS** (7 mini-cards de los ODS conectados, link a `/agenda-2030`)
4. **Fuentes oficiales de datos** (SIGCDMX, SEDEMA, SIMAT, INEGI, SGIRPC, Catastro)
5. **Sensores satelitales** (Sentinel-2, Landsat 8/9, GEE)
6. **Marco normativo** (NTC-CDMX 2017, NADF-013-RNAT-2017, RCDF, NMX-AA-164)
7. **Bibliografía técnica** organizada en 6 `<details>` colapsables: CIIEMAD-IPN (3) · Agenda 2030 (10) · SbN/ecosistemas (7) · Techos verdes historia/política (8) · Beneficios (7) · Metodología (6). Total: 41 referencias.

### `/comunidad` — Aportes ciudadanos
Página pública para que cualquier persona pueda sumar al observatorio. Estructura:
1. Hero con CTAs ancla `#aportar` y `#tiers`
2. KPIs (5 modos · contribuyentes verificados · 100 % datos abiertos)
3. 3 pasos: identifica → documenta → equipo valida
4. **5 modos de participación** (tarjetas tier importadas de `tiersDefaults`): Aprendiz · Reportador · Caracterizador · Especialista · Operador
5. **Contribuyentes actuales** (CIIEMAD-IPN + SEDEMA) con badge de tier, validados, meses activos, tasa de aceptación
6. **Formulario de aporte** que POSTea a `POST /api/v1/observatory/techos-verdes/comunidad/aportes`. Honeypot anti-spam (campo `website` oculto). Estados: `enviando`, `errorEnvio`, `mensajeExito`. Si el backend no responde, fallback a `mailto:contacto@techosverdes.cdmx.gob.mx`

#### Endpoint /comunidad/aportes (cercu-backend)
```
POST /api/v1/observatory/:observatory/comunidad/aportes
```
Público (sin auth). Validado con `comunidadAporteSchema` (Joi). Crea un `ProspectSubmission` con `source='comunidad'` y `status='pendiente'` para revisión manual desde `/admin/prospectos`. Soporta cualquier observatorio (`techos-verdes`, `humedales`, `arrecifes`).

**Payload:**
```typescript
{
  nombre: string        // 2-150 chars, required
  email: string         // valid email, required
  alcaldia?: string     // 0-120 chars
  modo?: 'aprendiz' | 'reportador' | 'caracterizador' | 'especialista' | 'operador' | ''
  rol?: 'ciudadano' | 'propietario' | 'arquitecto' | 'ingeniero' | 'empresa' | 'gobierno' | 'ong' | 'academia' | ''
  mensaje: string       // 10-4000 chars, required
  lat?: number          // -90..90 (cuando el aporte es geolocalizado)
  lng?: number          // -180..180
  direccion?: string    // 0-255 chars
  imagen?: string       // URL
  website?: string      // honeypot — si tiene contenido, response 200 sin guardar
}
```

**Backend module:** `cercu-backend/src/modules/observatory/comunidad/`
- `comunidad.routes.ts` — POST `/:observatory/comunidad/aportes` (sin auth)
- `comunidad.controller.ts` — wrapper sobre el service
- `comunidad.service.ts` — `submitAporteComunidad()` crea ProspectSubmission con `source=ProspectSource.COMUNIDAD`
- `submitProspectSchema` y `comunidadAporteSchema` — ambos en `observatory-admin.validation.ts`
- `ProspectSource.COMUNIDAD = 'comunidad'` añadido al enum

## Mascota Techito (`components/common/TechitoBlink.vue`)

Mascota del observatorio: edificio de ladrillo con techo verde + ojos cartoon. SVG ubicado en `public/images/mascots/techito.svg` (origen: `utils/techito (1).svg`, ~879 KB, dimensiones nativas 960×1088).

### Animaciones (en `pages/index.vue`)
- **Parpadeo**: cada 2.6s × 150ms via `TechitoBlink.vue` con dos `<ellipse>` que cierran de `ry: 0` → `ry: 28` cuando `blinking=true`. Coords actuales `cx=550 cy=740` (izq) y `cx=695 cy=740` (der), `rx=34`, color `#807a72`.
- **Saludo automático**: en `onMounted` muestra el bocadillo "Hola, soy Techito" desde t=800ms durante 3.5s
- **Hover/touch**: `showSpeech` toggle del bocadillo (auto-hide 2.5s en mobile)
- **Easter egg de petting**: 5 taps en 3s → `mascotWiggle` 0.6s × 3 + 3 corazones flotantes (💚 🌿 💛) con `heartFloat` keyframe
- **Float idle**: 5s loop sobre `:deep(.techito-blink-wrap)` (no sobre el `<img>`, para que los párpados no se desincronicen)
- Respeta `prefers-reduced-motion`

### Animación del brazo (NO implementada — knowledge guardado)
El SVG es image-traced (path único monolítico), por lo que no se puede aislar el brazo con clip-path basado en color clustering del PNG (mi primer intento clippeó el brazo derecho equivocado). El path real del brazo de saludo está identificado:
- Selector: `<path fill="#7E532F" transform="translate(250,669)" d="M0 0 C0.93423645 3.01031744 ...">`
- Bbox absoluto en SVG: x=238-290, y=669-766 (en %: 24.8%-30.2% × 61.5%-70.4%)
- Pivot del hombro: (264, 669) = 27.5%/61.5%
Para reactivar la animación: dual-layer img con clip-path basado en estos % + `transform-origin` en el hombro + keyframe rotando el overlay de la capa-arm.

### Hero del home (`pages/index.vue`)
- Hero embebido (NO usa `CommonHeroSection`) con foto de fondo `/images/tesis/techo-verde-ciiemad-panoramica.jpg`
- 5 capas: foto + tint verde (mix-blend multiply) + topo isobath + lava orbs + vignette inferior
- Grid 12 cols: 7-8 cols con texto + 4 quick links (Inventario, Mapa, Agenda 2030, Comunidad) con iconos 2.25rem; 4-5 cols con mascota Techito + 3 chips flotantes (NDVI Sentinel-2 +0.62 / Reducción LST −3.5°C / Captura CO₂ 0.97 kg/m²·año)

## Admin System

### Visibility & Archive System
All three content types (GreenRoof, CandidateRoof, ValidationRecord) support `visible` (default true) and `archivado` (default false) fields:
- **Public pages** (`filteredGreenRoofs`, `filteredCandidates`, `filteredRecords`) exclude archived/hidden items
- **Admin pages** show all items with toggle buttons (eye icon / archive box) in table columns
- **Backend** public endpoints filter server-side (`publicOnly: true`); admin endpoints accept `visible`/`archivado` query params
- **Persistence** admin toggle changes saved to localStorage (`obs-techos-verdes-overrides`, `obs-techos-verdes-candidates-overrides`, `obs-techos-verdes-validation-overrides`), applied on store init and `set*()` calls

### Architecture
- **Backend:** cercu-backend (shared Express/TypeORM API at `NUXT_PUBLIC_API_BASE_URL`)
- **Auth:** Email + password login via `/api/v1/observatory/auth/login` → JWT (15min access token)
- **Entity:** `ObservatoryAdmin` (separate from CERCU users) — password bcrypt-hashed (12 rounds)
- **Approval queue:** Prospects detected by external detector → pending review → admin approves/rejects

### Pipeline
```
Detector → Prospectos → Candidatos → Validación → Inventario
```
Cada sección del admin corresponde a un paso del pipeline. Los prospectos detectados se aprueban para convertirse en candidatos, se validan técnicamente, y al implementarse pasan al inventario público.

### Admin Files
```
stores/auth.ts              # Pinia auth store (login, logout, token in localStorage)
stores/tiers.ts             # Pinia tiers store (5 modos default, CRUD soft-delete, tierForScore)
stores/contributors.ts      # Pinia contributors store (CRUD + filtros, vinculo con prospectos via contributorId)
data/tiers-defaults.ts      # 5 tiers (aprendiz/reportador/caracterizador/especialista/operador) + 2 contribuyentes seed
composables/useApi.ts       # $fetch wrapper with Bearer token + 401 handling
middleware/admin.ts          # Nuxt route middleware (redirects to /admin/login if unauthenticated)
layouts/admin.vue            # Admin layout, sidebar en orden de pipeline + Contenido/Contributors/Tiers, responsive
components/admin/
  AdminPipelineBanner.vue    # Step indicator reutilizable (muestra paso actual en el pipeline)
  AdminDataTable.vue         # Tabla con búsqueda, paginación, filtros, visible/archivado toggles, responsive
  Manual.vue                 # Manual del observatorio: 10 secciones acordeón embebido en /admin
pages/admin/
  login.vue                  # Email + password login form
  index.vue                  # Dashboard con pipeline visual, stats, quick links + Manual.vue
  prospectos/index.vue       # Tabs: Cola de aprobación + Detector + selector de atribución (contributorId)
  candidatos/index.vue       # Sitios aprobados + priorizados AHP, pendientes de validación
  validaciones/index.vue     # Registros de validación IA (Gemini) y manual
  techos-verdes/index.vue    # Inventario: techos verdes implementados (57 del mapa público)
  contributors/index.vue     # CRUD red de colaboradores (filtros role/tier/verified/search)
  tiers/index.vue            # CRUD modos de participación (5 tiers default, modal de edición)
  contenido/index.vue        # CMS page list (10 páginas + contributors)
  contenido/[pageSlug].vue   # CMS section editor (auto-save a API)
  detector/index.vue         # Redirect → /admin/prospectos
```

### Admin Routes (orden de pipeline + soporte)
- `/admin/login` — login (layout default)
- `/admin` — dashboard con pipeline visual + Manual del observatorio
- `/admin/prospectos` — Cola de aprobación + Detector + selector de atribución (entrada del pipeline)
- `/admin/candidatos` — candidatos aprobados, pendientes de validación
- `/admin/validaciones` — validación IA/manual de candidatos
- `/admin/techos-verdes` — inventario de techos verdes implementados (fin del pipeline)
- `/admin/contenido` — CMS de las 11 páginas públicas
- `/admin/contributors` — CRUD red de colaboradores
- `/admin/tiers` — CRUD modos de participación

### Manual del observatorio (`components/admin/Manual.vue`)
Componente embebido en `/admin/index.vue`. 10 secciones acordeón en español accesible para personas sin formación técnica:
1. **¿Qué es este observatorio?** — cuatro frentes integrados (inventario, AHP, IA visual, reportes ciudadanos).
2. **Flujo de los datos** — recorrido típico desde origen hasta visualización.
3. **Percepción remota e índices** — NDVI / NDBI / LST con fórmulas Sentinel-2 y Landsat 8/9.
4. **Detector de candidatos OSM** — Overpass API + Turf.js sobre buildings.
5. **AHP — Modelo multicriterio** — explicación de las 8 variables y por qué los pesos son una decisión política.
6. **Validación visual con IA** — workflow Gemini Vision, predicción + confianza, decisión humana.
7. **Tipologías de techo verde** — Extensivo (TVLE), Semi-intensivo, Intensivo con cargas y costos.
8. **Tracking de uso** — eventos sin cookies en `useTracking()`, agregados en `/admin/analytics`.
9. **Glosario de siglas** — TVLE, AHP, scoreAptitud, NDVI/NDBI, LST, SEDEMA, CIIEMAD, ODS, OSM, Turf.js.
10. **Limitaciones honestas** — no reemplaza dictamen estructural, IA orienta no decide, cobertura sesgada, pesos AHP son política, datos satelitales con caché.

### Tiers + Contributors System
**Modelo:** cada Contributor tiene un `tier` (slug). Los tiers se editan en `/admin/tiers` y se presentan como **modos de participación distintos** (no niveles a alcanzar) — patrón compartido con humedales y arrecifes pero con vocabulario propio del dominio techos verdes.

**5 tiers default:**
| Slug | Modo | Score | Quién aporta así |
|------|------|-------|------------------|
| `aprendiz` | Curiosidad ciudadana | 0–19 | Vecinas/vecinos, peatones |
| `reportador` | Observación sostenida | 20–99 | Personas que dan seguimiento a una azotea |
| `caracterizador` | Caracterización técnica | 100–299 | Estudiantes, técnicos urbanos, ONGs |
| `especialista` | Diseño e investigación | 300–999 | Arquitectos, ingenieros, academia |
| `operador` | Operación institucional | 1000+ | Empresas constructoras, SEDEMA, ONGs grandes |

**Score auto-calculado:** `validatedContributions × 10 − rejectedContributions × 2`. Al aprobar un prospecto con `contributorId` asignado, el contributor incrementa contadores y `tierForScore()` recalcula su tier en cliente.

**Atribución a prospectos:** UI en `/admin/prospectos` (selector dentro de cada card). Persiste tanto en backend (PATCH `/admin/prospectos/:id/contributor`) como en localStorage como fallback.

**Backend (cercu-backend):**
- Tablas separadas: `obs_techos_verdes_tiers` y `obs_techos_verdes_contributors` (NO comparten con humedales ni arrecifes para evitar colisión de slugs/handles).
- Migración: `1739000000000-CreateTechosVerdesTiersAndContributors.ts` (idempotente).
- Migración complementaria: `1740000000000-SeedExpandedCmsSections.ts` siembra `contributors.hero` y `contributors.intro` en `obs_cms_sections` para que el admin pueda editar el copy desde `/admin/contenido/contributors` (idempotente — solo inserta secciones que falten).
- Service: `src/modules/observatory/techos-verdes/techos-verdes-attribution.service.ts` (CRUD + `attachContributorToProspect` + `incrementContributorOnApproval`).
- Routes: `/observatory/techos-verdes/admin/tiers`, `.../admin/contributors`, públicas en `/observatory/techos-verdes/tiers` y `.../contributors`.

### Roles del Contributor
Adaptados al dominio techos verdes (8 opciones):
`ciudadano | propietario | arquitecto | ingeniero | empresa | gobierno | ong | academia`

## Testing

### Stack
- **Vitest** — unit + integration
- **@vue/test-utils** — Vue component testing
- **happy-dom** — lightweight DOM environment
- **@playwright/test** — end-to-end browser tests (chromium)

### Test Files (34 unit + 14 E2E)
| File | Type | Count | Coverage |
|------|------|-------|----------|
| `tests/unit/useAnalyticsMath.test.ts` | Unit | 13 | Estadísticas analytics (mean/median/std, IC bootstrap, Spearman, Kruskal-Wallis) |
| `tests/unit/tiers.store.test.ts` | Unit | 8 | Tiers store: 5 modos default, tierForScore boundaries, CRUD soft-delete, persistencia localStorage |
| `tests/unit/contributors.store.test.ts` | Unit | 6 | Contributors store: defaults, addContributor, 8 roles techos-verdes, filtros (role/tier/verified) |
| `tests/unit/cms-defaults.test.ts` | Data integrity | 6 | Catalog cubre todas las páginas, contributors hero, **home.hero con campos esperados**, footer URLs válidas |

### E2E Tests (Playwright)
| File | Tests | Coverage |
|------|-------|----------|
| `tests/e2e/public.spec.ts` | 5 | Smoke público: home + favicon, /inventario, /mapa, /aptitud, navegación |
| `tests/e2e/admin-manual.spec.ts` | 6 | Manual del observatorio: 10 secciones, AHP, Glosario, sidebar items nuevos |
| `tests/e2e/admin-tiers-contributors.spec.ts` | 3 | Lista 5 modos default, lista 2 contribuyentes seed, crear contributor con role arquitecto |

### Comandos
```bash
npm test              # Vitest unit (34 tests, ~1s)
npm run test:watch    # Vitest watch mode
npm run test:coverage # Coverage v8
npm run test:e2e      # Playwright E2E (necesita dev server en :3000)
npm run test:e2e:install  # Descarga Chromium una vez
```

### Admin UI/UX Patterns
- **Pipeline banner:** Indicador horizontal de pasos en cada página, resalta el paso actual (`AdminPipelineBanner.vue`)
- **Mobile-first responsive:** Sidebar oculto en mobile (toggle hamburger), tablas con scroll horizontal edge-to-edge (`-mx-4 px-4 sm:mx-0`), grids desde `grid-cols-1`, touch targets 44px, acciones siempre visibles en mobile
- **Collapsible methodology:** Panel cerrado por defecto explicando scoring/detección
- **Paginated tables:** Filtros avanzados + columnas ordenables + selector de filas por página (10/15/25/50, default 15) vía `<AdminDataTable>` que internamente usa `useSortableList` + `usePaginatedList`
- **Sortable th con flecha indicadora:** `<AdminSortableTh>` se usa internamente — cycle none → asc → desc, accesible (aria-sort)
- **Tooltips de glosario:** `<AdminInfoTooltip text="...">` en headers de columna y labels de form. Definiciones en `data/admin-glossary.ts` (AHP, NDVI, Gemini, score AHP, ZOFEMAT, etc.)
- **Score breakdown:** Barras de progreso expandibles por fila mostrando componentes del score
- **TransitionGroup:** Animaciones fade + slide en listas
- **Modal transitions:** `fade` + `scale-in` + `backdrop-blur`
- **Active route indicator:** Sidebar con matching exacto de ruta
- **Welcome greeting:** Saludo personalizado con nombre del admin
- **Empty states:** Iconos contextuales + texto descriptivo + CTAs

### Componentes admin reusables
- `components/admin/AdminDataTable.vue` — tabla genérica con search + filters slot + sort + paginación + tooltips por columna. Acepta `columns: { key, label, class?, align?, tooltip?, sortable? }[]`.
- `components/admin/InfoTooltip.vue` — `<AdminInfoTooltip text="..." [variant=inline|icon]>`. Hover desktop, tap mobile, accesible.
- `components/admin/SortableTh.vue` — `<th>` clickeable con flecha asc/desc/none.
- `components/common/FilterPanel.vue` — drawer mobile-first reusable.
- `composables/useSortableList.ts` — sort genérico con coerción inteligente.
- `composables/usePaginatedList.ts` — paginación in-memory.
- `composables/useCmsContent.ts` — helper para que páginas públicas consuman el CMS.
- `data/admin-glossary.ts` — glosario centralizado con 30+ términos del dominio techos verdes (AHP, scoreAptitud, gemini, NDVI, NDWI, GEE, etc.).
- `data/cms-defaults.ts` — catálogo CMS con copy editable de 11 páginas públicas (home/sobre/metodologia/indicadores/inventario/candidatos/mapa/aptitud/ia-validacion/contributors/footer). Incluye `home.hero` editable con eyebrow, titleLine1/2, subtitle, primary/secondary CTAs.

**Hero del home editable:** `pages/index.vue` consume `home.hero` via `useCmsContent('home').one<HeroShape>('hero')` con `<template v-if>` por cada campo — los cambios desde `/admin/contenido/home → Hero principal` se reflejan inmediatamente en el sitio público.
- `stores/cms.ts` — Pinia store que cachea secciones por pageSlug, fallback automático a defaults si el backend no responde.

### Dashboard `/admin` (enriquecido)
- 8 KPI cards con tooltips (techos instalados, candidatos, validaciones, prospectos pendientes, score AHP alto ≥80, total prospectos, aprobados, secciones CMS).
- Banda de **Acciones rápidas**: detector OSM, score AHP, validación IA Gemini, editar contenido, analytics.
- 6 cards de monitoreo: cola de prospectos, distribución AHP (alto/medio/bajo), candidatos por estatus, validaciones por estado, inventario por tipo, CMS.
- Backend `getSummary` enriquecido con `candidatesByEstatus`, `validationsByEstado`, `greenRoofsByTipo`, `ahpBuckets`, `cmsSections` — todo paralelizado con `Promise.all`.

### CMS — Contenido editorial editable (✅ implementado)
Sistema multi-tenant para que un editor sin background técnico pueda cambiar el copy del sitio público desde `/admin/contenido` sin tocar código.

**Arquitectura:**
```
data/cms-defaults.ts    ──┐  fallback síncrono (también es la verdad de origen)
                          ├──> stores/cms.ts (Pinia)
useCmsContent(page)  ─────┘    ├─ getSection / getOne (sync con fallback)
                               └─ fetchPage (1 request → todas las secciones)
                                      │
   GET /observatory/techos-verdes/cms/<page>/_all  ◄──┘
   PUT /observatory/techos-verdes/admin/cms/<page>/<sectionKey>
```

**Páginas y secciones registradas:**
| pageSlug | secciones (sectionKey) |
|----------|------------------------|
| `home` | hero · features · cta |
| `sobre` | hero · mission · objetivos |
| `metodologia` | hero · pasos |
| `indicadores` · `inventario` · `candidatos` · `mapa` · `aptitud` · `ia-validacion` | hero |
| `footer` | brand · sources · quickLinks · institutional |

**Backend:** entidad `ObsCmsSection` con columna `observatory='techos-verdes'`. Endpoint admin `PUT /:observatory/admin/cms/:pageSlug/:sectionKey`. Seed inicial siembra 18 secciones (ver `cercu-backend/src/seeds/observatory-content.seed.ts`).

**Admin:** `/admin/contenido` lista las 10 páginas; `/admin/contenido/:pageSlug` muestra accordion por sección con edición in-place + auto-bind al shape del default. Mover/añadir/eliminar bloques + "Restaurar default" + chip de "Sin guardar".

### Prospect Approval Flow
```
External detector → POST /api/v1/observatory/techos-verdes/prospectos
         ↓
[ProspectSubmission] status: 'pendiente'
         ↓
Admin reviews at /admin/prospectos
         ↓
Approve → POST .../aprobar   |   Reject → POST .../rechazar (+ notas)
```

### Geospatial Detector (tab dentro de `/admin/prospectos`)
Built-in detector that identifies green roof candidates using OpenStreetMap data + Turf.js spatial analysis. Runs entirely in JS (no Python).

**Pipeline:**
```
Admin defines bounding box + params → POST /api/v1/observatory/techos-verdes/detector/run
         ↓
[cercu-backend] Overpass API → OSM building footprints
         ↓
[Turf.js] area, centroid, rectangularity per building
         ↓
Scoring: superficie (25pts) + rectangularidad (20pts) + tipo edificio (15pts)
       + niveles (10pts) + techo plano/concreto (15pts) + nombre (5pts)
         ↓
Ranked candidates returned to frontend
         ↓
Admin selects → POST .../detector/submit → ProspectSubmission (source: ia_detector)
```

**Scoring criteria (0-100):**
| Factor | Max pts | Logic |
|--------|---------|-------|
| Superficie | 25 | >=1000m2=25, >=500=20, >=200=10 |
| Rectangularidad | 20 | >=85%=20, >=70%=12 |
| Tipo edificio | 15 | commercial/industrial/public/hospital/school=15 |
| Niveles | 10 | 1-5=10, 6-10=5 |
| Techo plano/concreto | 15 | OSM roof:material=concrete or roof:shape=flat |
| Nombre identificado | 5 | Named building bonus |

**Cost: $0** — uses free OSM/Overpass API + Turf.js (no satellite imagery fees)
