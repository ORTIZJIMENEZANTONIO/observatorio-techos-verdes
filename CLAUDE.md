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
- **Images:** `@nuxt/image` con sharp + IPX provider (avif/webp/jpg, q=78). Reemplaza `<img>` por `<NuxtImg sizes="…" format="webp">` para responsive srcset
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
    common/                 # AppHeader (dropdowns Aprende/Explora/Investigación + Comunidad), AppFooter, ColorModeToggle, SectionTitle, StatCard, StatusBadge, PaginationControls, HeroSection (lava lamp + topo + canopy + vignette + NuxtImg para la foto), TechitoBlink (overlay de párpados sobre la mascota), CountUpKPI (números animados clickeables)
    home/                   # AudienceGate (4 puertas por audiencia), AcademicHighlight (banner Cervantes-Nájera Q1 SCS 2025), HeroSection, KPIGrid, HowItWorks, FeaturedRoofs, MapTeaser, MethodologySummary
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
    index.vue               # Home (hero, AudienceGate (4 puertas), AcademicHighlight (banner Q1), KPIs, features, steps, map teaser, que-es-techo-verde, caso-estudio-CIIEMAD, evolucion, featured, methodology, zonas-prioritarias, respaldo-cientifico, disclaimer)
    aprende/                # Hub educativo (público general): qué es, 6 capas, 3 tipologías técnicas, beneficios, caso CIIEMAD experimental — todo desde CMS
    investigacion/          # Hub académico (Marco CIIEMAD + Equipo + 5 Publicaciones + AHP + Datos abiertos + Citación) — todo desde CMS
      index.vue             # Landing del hub con anclas #marco #publicaciones #metodologia
      datos.vue             # Descarga CSV/JSON de inventario, candidatos, indicadores (Blob client-side) + diccionario + licencia CC BY 4.0
      citar.vue             # 8 formatos copiables: APA + BibTeX del observatorio, paper Q1 destacado, tesis doctoral, maestría, capítulo
    mapa/                   # Full-screen Leaflet map with layers
    inventario/             # Green roof inventory with search/filters/drawer + real images
    aptitud/                # Aptitud territorial page
    candidatos/             # Prioritized candidate sites (store-based, cadastral fields, structural pre-feasibility panel, badges)
    ia-validacion/          # AI validation table (store-based, origin column, new status) + AIAnalysisPanel (Gemini Vision)
    indicadores/            # Charts dashboard (tabbed: Territorial, Aptitud, Medio Ambiente, Analisis Estadistico, Simulacion Dinamica)
    metodologia/            # AHP methodology detail + official sources section
    sobre/                  # About page + normative section
    referencias.vue         # Marco académico CIIEMAD-IPN, artículo destacado Sustainable Cities and Society 2025 (Cervantes-Nájera et al., Q1 Elsevier) con KPIs visuales + flujo metodológico AHP, tesis, capítulo 2023, ODS, fuentes oficiales, normativa, bibliografía organizada en bloques colapsables
    agenda-2030.vue         # Techos verdes y Agenda 2030 — 7 ODS conectados, MEA 2003, galería del techo verde CIIEMAD, vínculo al capítulo 10.52501/cc.064.13
    comunidad.vue           # 5 modos de participación (tiers), contribuyentes, formulario de aporte que POSTea a /comunidad/aportes (fallback mailto)
  public/
    geojson/                # CDMX alcaldia boundaries
    images/tesis/           # Images extracted from thesis PDFs (capas, CIIEMAD photos, maps, charts)
    img/roofs/              # 22 building photos + 6 secondary photos (Wikimedia CC) + 7 category fallbacks → 35 archivos
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

## IA ocultada (validación manual provisional)
La validación con IA está oculta del frontend público — la validación se hace manualmente por expertos del CIIEMAD-IPN provisionalmente.

- **Página `/ia-validacion`** existe pero no está enlazada desde ninguna nav. No la promociones en copy nuevo.
- **No hay links a `/ia-validacion`** en: AppHeader, AppFooter, cms-defaults, hero, features grid, KPI grid, ningún paso del proceso.
- **KPI "Validaciones IA realizadas"** reemplazado por "Captura de CO₂ del inventario" (60.81 tCO₂/año, fuente Cervantes-Nájera 2025).
- **Sección 8 del home** (antes AI Block) ahora es el bloque protagonista CIIEMAD/Cervantes Nájera con collage de tesis, 3 publicaciones y KPIs académicos.
- **Paso 3 de "Cómo funciona"** ahora es "Validación de campo" (icono shield) en lugar de "Detección con IA".
- **Texto y subtítulos** purgados de menciones a "inteligencia artificial" — verificación: `grep -ri "inteligencia artificial\|ia-validacion" pages/ data/cms-defaults.ts` debe devolver 0 en HTML renderizado.

## Fun-card design system (icono protagonista)
Patrón visual unificado para cards con icono dominante, color único y hover interactivo. Reemplaza los grids de `card p-6 text-center` con iconos genéricos. Usado en home (`/`), `/sobre` (principios), `/metodologia` (pasos + 8 pesos AHP), `/agenda-2030` (servicios MEA) y `/comunidad` (pasos).

### Componentes
- **CSS global**: `assets/css/main.css` — clases `.fun-card`, `.fun-card-icon-wrap`, `.fun-card-icon-halo`, `.fun-card-icon-bubble`, `.fun-card-icon-svg`, `.fun-card-spark[-1|2|3]`, `.fun-card-hint`, `.fun-card-value`, `.fun-card-unit`, `.fun-card-label`, `.fun-card-desc`, `.fun-card-delta`, `.fun-card-cta`, `.fun-card-badge`, `.fun-card-link`. Usan CSS vars `--fun-color` / `--fun-light` para theming.
- **Composable**: `composables/useFunPalette.ts` — exporta `funHex(key)`, `funLight(key)`, `funPaths(icono)`, `funStyle(key)`. Provee 9 colores (`primary`, `eco`, `secondary`, `accent`, `alert`, `violet`, `teal`, `rose`, `indigo`) y 26 iconos semánticos (leaf, area, target, ai, map, chart, score, pilot, thermometer, water, co2, people, satellite, scale, flag, shield, book, layers, cloud, zap, recycle, hand, building, heart, spark, community).

### Filosofía
1. **Icono protagonista** — 6.5rem wrapper, 3.25rem SVG, halo radial pulsante, bubble con border-color, sparkles
2. **Color único por item** — evita repetir el set base; cada KPI/principle/peso/servicio tiene su tono
3. **Card centrada** — `flex flex-col items-center text-center`
4. **Número subordinado al icono** — 1.5rem (vs 2.5rem) cuando aplica
5. **Card es link cuando hay destino** — `<NuxtLink class="fun-card fun-card-link">`, cursor pointer, focus-visible outline, hover CTA "Ver más"
6. **Hover suave** — translateY(-6px), banda superior expande, halo se enciende, icono rota -4° y escala 1.08, sparkles aparecen
7. **Respeta `prefers-reduced-motion`** — animations/transitions deshabilitadas

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

## Performance & Accessibility (Lighthouse-driven)

### Image optimization (`@nuxt/image`)
Configurado en `nuxt.config.ts → image`:
```ts
image: {
  format: ['avif', 'webp', 'jpg'],
  quality: 78,
  screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
  densities: [1, 2],
}
```

- **Patrón:** reemplazar `<img src="/path">` por `<NuxtImg src="/path" sizes="(max-width: 768px) 100vw, 600px" format="webp" loading="lazy">`. El sufijo `format="webp"` fuerza WebP aun cuando el navegador no envía Accept con AVIF.
- **Hero del home:** `pages/index.vue` y `components/common/HeroSection.vue` reemplazaron `background-image: url(...)` en CSS por `<NuxtImg class="hero-home-photo">` posicionado absolute con `object-fit: cover` — así el image module aplica WebP/AVIF responsivo en lugar de cargar siempre el JPG completo.
- **Impacto medido:** `mapa-inventario-cdmx.png` 1.7 MB → 109 KB (800w WebP). `techo-verde-ciiemad-panoramica.jpg` 608 KB → 109 KB (800w) o 289 KB (1600w).
- **Galería del inventario:** `pages/inventario/index.vue` usa `NuxtImg` con `sizes="(max-width: 768px) 100vw, 380px"` en el carrusel.
- **Externals que no optimizo:** thumbnails de OpenStreetMap (`staticmap.openstreetmap.de`) en `/candidatos`, Blob URLs locales en `AIAnalysisPanel`. Para externals habría que agregar `image.domains` whitelist.
- **Sharp en producción:** `[@nuxt/image] sharp binaries have been included in your build for darwin-arm64` aparece en build. Si despliegas a Linux, hacer `npm ci` en el servidor o usar Docker con base Linux para que se compile el binario correcto.

### Cache-Control headers
En `nuxt.config.ts`:
```ts
routeRules: {
  '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
}
nitro: {
  publicAssets: [
    { baseURL: 'images', dir: 'public/images', maxAge: 60 * 60 * 24 * 365 },
    { baseURL: 'img',    dir: 'public/img',    maxAge: 60 * 60 * 24 * 365 },
    { baseURL: 'geojson', dir: 'public/geojson', maxAge: 60 * 60 * 24 * 7 },
  ],
}
```

**Por qué dos mecanismos**: `routeRules` aplica a rutas del servidor (incluyendo `/_ipx/**` generadas por `@nuxt/image`), pero NO aplica a archivos servidos directamente desde `/public/`. Para esos hay que usar `nitro.publicAssets` con `maxAge` en segundos. Nitro añade `immutable` automáticamente cuando `maxAge > 0`.

**Implicación de `immutable`**: si reemplazas un archivo en `public/images/` con el mismo nombre, los usuarios con la versión vieja en caché no la van a refrescar durante un año. Renombra (`mapa-v2.png`) o reduce `maxAge` por carpeta si esperas actualizar imágenes.

### Color contrast (WCAG AA)
Patrón aplicado tras el reporte de Lighthouse: **nunca usar `text-eco-dark`, `text-secondary` ni `text-accent-dark` sobre fondos `bg-X/5..15`** porque la ratio queda en 2.3-2.8:1 (falla AA). Reglas concretas en uso:
- Texto sobre `bg-eco/10`, `bg-eco/15`, `bg-secondary/10`, `bg-accent/5`, `bg-primary-50` → usar `text-primary` (#0E5E3A, ~7-12:1 contra fondos claros) o `text-ink` (#1F2937, ~12:1).
- Botones `bg-eco` con `text-white` → 1.91:1 FAIL. Usar `bg-primary-light` o `bg-primary` para preservar contraste con blanco.
- Opacidades de texto blanco sobre `bg-primary-800`: `text-white/50` (4.88:1, pasa pero borderline) → subido a `text-white/80` (7.36:1). `text-white/40` (3.1:1, falla) → `text-white/70` (4.5:1+).
- `roof-card-meta` (color dinámico vía `--fun-color`): se oscurece con `color-mix(in srgb, var(--fun-color) 45%, #000 55%)` para que cualquier tono de la paleta pase AA sobre blanco.

### Heading order
Lighthouse pide secuencia descendente sin saltos. Decisiones aplicadas en `pages/index.vue`:
- El `<span>` "¿Sabías que…?" pasó a ser `<h2>` (la sección no tenía heading, los h3 cards saltaban del h1 al h3).
- "Respaldo científico" pasó de `<h3>` a `<h2>` (sección sin h2 propio).
- "Aviso importante" pasó de `<h4>` a `<h3>` (sibling del h2 de respaldo).
- Cards de pasos y `roof-card-title` pasaron de `<h4>` a `<h3>` (la sección ya tenía un `<h2>` vía `CommonSectionTitle`).
- `AppFooter.vue`: "Enlaces rápidos" y "Contacto e información" pasaron de `<h4>` a `<h3>`.

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

### Galería múltiple por techo verde
**Tipo nuevo `GreenRoofImage`** (en `types/index.ts`) con campos `src`, `caption?`, `credit` (string libre), `license` (enum CC), `sourceUrl` (link Wikimedia/Flickr) — atribución obligatoria por imagen.

**Campo `imagenes?: GreenRoofImage[]`** en `GreenRoof`. Cuando está poblado, la UI de `/inventario` muestra un carrusel client-side:
- Botones prev/next visibles en hover (en mobile siempre visibles, opacity 0.9)
- Dots numerados en la parte inferior
- Counter "1/N" arriba a la izquierda
- Crédito de la imagen ACTIVA al pie, linkeado a su `sourceUrl`
- Estado del índice por roof.id en `reactive<Record<number, number>>` para no clonar todo

**5 techos verdes con galería múltiple actualmente** (ver `data/mock-roofs.ts`):
- Hospital General de México (2 fotos)
- Mercado de Jamaica (3 fotos)
- Palacio de Bellas Artes (2 fotos)
- Senado de la República (2 fotos)
- UNAM Fac. Arquitectura (2 fotos)

Fotos descargadas desde Wikimedia Commons via `Special:FilePath` (resuelve redirects al CDN). Sufijo `-2.jpg`, `-3.jpg` para indicar orden secundario. Total fotos en repo: **35** (22 principales + 6 secundarias + 7 fallback de categoría).

### Vista satelital de candidatos (sin pesar el servidor)
`pages/candidatos/index.vue` ahora muestra **mini-mapa OSM static** por candidato vía `staticmap.openstreetmap.de/staticmap.php?center={lat},{lng}&zoom=18&size=600x300&maptype=mapnik&markers={lat},{lng},red-pushpin`. Es gratis, sin API key, atribución obligatoria visible (`© OpenStreetMap` linkeable a `openstreetmap.org/copyright`). Score badge sobrepuesto en el mapa con el valor numérico.

Ventajas vs descarga:
- 60 candidatos × snapshot ≈ 0 KB en el repo (las imágenes se cargan desde OSM)
- Refresh automático cuando OSM actualiza tiles
- Atribución cumple la ODbL de OSM

### Thesis References
- **Doctoral (2025, defensa 28 nov):** "Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México" — M. en C. Ana Laura Cervantes Nájera, CIIEMAD-IPN. Directora: Dra. María Concepción Martínez Rodríguez. **Comité tutorial** (v3): Dra. Marta Bárbara Ochman Ikanowicz · Dr. Carlos Felipe Mendoza · Dr. Ángel Refugio Terán Cuevas · Dr. Roberto Ariel Abeldaño Zuñiga. **Marco**: economía circular (EC) + soluciones basadas en la naturaleza (SbN). PDF en `utils/TESIS ALCN dceas v3(2).pdf`.
- **Master's (2021):** "Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México" — I.Q.I. Ana Laura Cervantes Nájera, CIIEMAD-IPN.
- **Capítulo de libro (2023):** Martínez Rodríguez & Cervantes-Nájera, "Techos verdes en las áreas urbanas y su relación con la Agenda 2030", en *Repensar la Agenda 2030: Tendencias de sostenibilidad* (cap. XIII). DOI 10.52501/cc.064.13.
- **Artículo Q1 SCS (2025):** Cervantes-Nájera et al., "Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City: A GIS-based multicriteria decision analysis to alleviate urban heat island (UHI)". *Sustainable Cities and Society*, Elsevier. PII S2210670725006547.

### International State-of-the-Art Reference
- **Roofpedia (2021):** Wu, A. N. y Biljecki, F. *"Roofpedia: Automatic mapping of green and solar roofs for an open roofscape registry and evaluation of urban sustainability"*. **Landscape and Urban Planning**, 214, 104167. Elsevier (Q1). DOI 10.1016/j.landurbplan.2021.104167. PDF en `utils/1-s2.0-S0169204621001304-main.pdf`.
  - **Por qué se cita**: state-of-the-art en mapeo automatizado de techos verdes vía CNN. Cubre 1M+ edificios en 17 ciudades, mismo backbone OSM que nuestro detector. Sitúa al observatorio CDMX en el contexto global y justifica la elección de validación-de-campo + AHP en lugar de detección puramente automática (la cobertura satelital para azoteas individuales en CDMX requiere validación humana). Renderizado como sección protagonista (1.75) en `/referencias` con KPIs propios (17 ciudades · 1M+ edificios · 100% accuracy · OSM data).
  - **Keywords**: Sustainable development, Convolutional Neural Network, Computer vision, Carbon neutrality, Building data, OpenStreetMap.

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

`AppHeader.vue` agrupa la navegación en **4 dropdowns por audiencia** (Fase 1 de la IA reorganizada — `cer.lau.ana.18@gmail.com` 2026-05-12):

```
[Logo] [Inicio] [Aprende ▾] [Explora ▾] [Investigación ▾] [Comunidad]   [logos CIIEMAD+IPN] [☀/🌙] [+ Aportar]
```

- **Aprende ▾** — ¿Qué es un techo verde? · Tipologías · Beneficios y ODS · Caso CIIEMAD *(audiencia: público general)*
- **Explora ▾** — Mapa interactivo · Inventario · Candidatos · Aptitud territorial · Indicadores *(audiencia: todos los que quieren datos)*
- **Investigación ▾** — Marco académico · Publicaciones · Metodología AHP · Bibliografía · Cómo citar *(audiencia: investigadores)*
- **Comunidad** — link directo (color eco) *(audiencia: ciudadanía participativa)*
- **Logos CIIEMAD + IPN** — siempre visibles, linkean a las páginas institucionales
- **+ Aportar** — CTA verde que lleva a `/comunidad#aportar`

Dropdowns: cada link muestra `description` bajo el nombre. Animación `dropdown` (scaleY+fade, 180ms). Abre en hover (desktop) y click toggleable. `isGroupActive(g)` normaliza hashes (`/aprende#tipologias` → matches `/aprende`) y resalta el grupo activo.

Mobile drawer: secciones agrupadas con cabecera tipográfica (Aprende / Explora / Investigación) + dos CTAs al pie (Aportar + Mapa).

### IA por audiencia — diseño 2026-05-12
Cada grupo del header sirve una audiencia distinta. La home tiene un `<HomeAudienceGate>` con 4 cards (Aprende · Explora · Investigación · Comunidad) que envía directo a cada hub. Esta separación es deliberada: una persona curiosa no debe tener que filtrar contenido académico para entender qué es un techo verde, y un investigador no debe tener que pasar por divulgación para llegar al paper Q1.

## Public Pages — Marco académico, ODS y Comunidad

### `/aprende` — Hub educativo (divulgación)
Pensado para público sin formación técnica. Todas las secciones consumen `useCmsContent('aprende')` y son editables desde `/admin/contenido/aprende`. Estructura:
1. Hero compact (`<CommonHeroSection>`) con anclas a las 4 secciones
2. **¿Qué es un techo verde?** — Intro divulgativa con la métrica de 514,000 m² potenciales (CMS: `intro`)
3. **#capas** — Las 6 capas de un techo verde con diagrama de Cervantes Nájera (2021) + lista numerada (CMS: `capas`)
4. **#tipologias** — 3 fun-cards: Extensivo (TVLE) · Semi-intensivo · Intensivo, con peso saturado, sustrato, vegetación, mantenimiento y uso recomendado por tipología (CMS: `tipologias`). Fuente normativa: NTC-CDMX 2017 + Tabla 6 Cervantes Nájera (2025)
5. **#beneficios** — 4 fun-cards con valores documentados: térmico (−3.5 °C), hídrico (19.5 L/m²·año), atmosférico (0.97 kg CO₂/m²·año), social (ODS 3·11·13) (CMS: `beneficios`)
6. **#caso-ciiemad** — Foto del TVLE + 6 datos clave del experimento (6 m², 18 meses payback, 94.8 % menos huella, 100 % sobrevivencia) (CMS: `casoCiiemad`, `casoIntro`)
7. CTAs finales a `/mapa`, `/inventario`, `/comunidad`

### `/investigacion` — Hub académico
Pensado para investigadores. Todas las secciones consumen `useCmsContent('investigacion')` y son editables desde `/admin/contenido/investigacion`. Estructura:
1. Hero compact con anclas + links a `/investigacion/datos` y `/investigacion/citar`
2. **#marco** — Card institucional CIIEMAD-IPN (logos + dirección Zacatenco) + 3 cards del equipo (directora, autora, comité tutorial) (CMS: `marco`, `equipo`)
3. **#publicaciones** — 5 cards académicas: Q1 SCS 2025 destacada con `shadow-glow-primary` + tesis doctoral 2025 + capítulo 2023 + tesis maestría 2021 + Roofpedia 2021. Todas con DOI clicable (CMS: `publicaciones`)
4. **#metodologia** — Resumen del modelo AHP + tabla de 8 pesos (LST 30.19 %, NDVI 9.56 %, etc.) + link a `/metodologia` completa (CMS: `metodologia`, `pesosAhp`)
5. **#datos** — 3 cards resumen + CTA a `/investigacion/datos` (CMS: `datos`)
6. **#citar** — Banner con CTA a `/investigacion/citar`

### `/investigacion/datos` — Datos abiertos
Página standalone con descargas funcionales:
- 3 datasets: Inventario (57 techos), Candidatos (60 sitios), Indicadores por alcaldía (16). Cada uno con botones CSV y JSON.
- CSV/JSON generados **client-side via `Blob`** — no requiere endpoint backend. La función `toCsv()` escapa correctamente comas, comillas y saltos.
- Diccionario de variables con 9 entradas (id, nombre, tipoEdificio, tipoTechoVerde, superficie, alcaldia, lat/lng, scoreAptitud, estado, shannon/simpson).
- Bloque de licencia **CC BY 4.0** con link a Creative Commons.

### `/investigacion/citar` — Cómo citar
Página standalone con **8 formatos copiables** vía clipboard API:
- Observatorio en APA 7 y BibTeX (`@misc`)
- Paper Q1 SCS 2025 destacada con `shadow-glow-primary` en APA y BibTeX (`@article`)
- 3 citas APA: tesis doctoral 2025, tesis maestría 2021, capítulo 2023
- Botón "Copiar" cambia a "Copiado ✓" por 1.8s tras click. La nota inferior pide citar también el paper Q1 cuando se usa el modelo AHP o los datos del TVLE.

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
6. **Formulario de aporte en 3 pasos (stepper)**:
   - **Paso 1 — Datos técnicos**: nombre, email, tipo de aporte, modo, alcaldía, superficie aprox., dirección/coordenadas, mensaje. POSTea a `POST /api/v1/observatory/techos-verdes/comunidad/aportes` con `mensaje` enriquecido (incluye `[tipoAporte]` y superficie). Honeypot anti-spam (campo `website` oculto). Si el backend no responde, fallback a `mailto:contacto@techosverdes.cdmx.gob.mx`.
   - **Paso 2 — Documento (bloqueado)**: solo se llega tras enviar el paso 1. NO permite upload directo — informa al usuario que el equipo CIIEMAD-IPN verificará primero los datos técnicos y le enviará un correo con un enlace seguro para subir el documento de respaldo. **Razón**: evitar acumular archivos/imágenes que después serían descartados por validación técnica. Muestra el ID de referencia del aporte y una lista de qué podrá adjuntar cuando llegue el correo (fotos, planos, dictámenes, datasets).
   - **Paso 3 — Confirmación**: resumen del flujo en 3 mini-cards (verificación → correo → publicación) y CTAs a "Hacer otro aporte" o "Explorar inventario".
   - El usuario navega con `currentStep` (ref) y un stepper visual arriba del form muestra el progreso. El backend actual no requiere cambios: el endpoint POST sigue creando un `ProspectSubmission` con `status='pendiente'` y `source='comunidad'`. Para activar el flujo completo (upload diferido), faltaría: (a) endpoint admin para marcar aporte como "listo para documento", (b) mailer que envíe enlace único, (c) endpoint de upload con token de un solo uso. Por ahora la UX prepara al usuario para ese flujo.

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
8. **Tracking de uso** — eventos sin cookies en `useTracking()`, agregados en `/admin/analytics`. `pageviews` está **deduplicado por `(sessionId, día, path canónico)`** — una sesión recargando la misma página el mismo día cuenta 1, no N. La agregación pura está en `events.service.ts → aggregateEvents()` (cercu-backend); cubierta por 15 unit tests en `tests/unit/events-analytics.test.ts`. El frontend muestra `pageviews` (únicos) como métrica principal y `pageviewsRaw` (crudos) + tasa de reload como info secundaria.
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

### Test Files (116 unit + 31 E2E)
| File | Type | Count | Coverage |
|------|------|-------|----------|
| `tests/unit/useAnalyticsMath.test.ts` | Unit | 13 | Estadísticas analytics (mean/median/std, IC bootstrap, Spearman, Kruskal-Wallis) |
| `tests/unit/tiers.store.test.ts` | Unit | 8 | Tiers store: 5 modos default, tierForScore boundaries, CRUD soft-delete, persistencia localStorage |
| `tests/unit/contributors.store.test.ts` | Unit | 6 | Contributors store: defaults, addContributor, 8 roles techos-verdes, filtros (role/tier/verified) |
| `tests/unit/cms-defaults.test.ts` | Data integrity | 32 | Catalog cubre todas las páginas + audienceGate (4 puertas) + academicHighlight (paper Q1) + aprende (6 capas, 3 tipologías) + investigacion (5 publicaciones con Q1 destacada, 8 pesos AHP sumando ~100 %, datos, citar APA+BibTeX) |
| `tests/unit/cms-content.test.ts` | Unit | 14 | `interpolateCmsText` + cobertura pública |
| `tests/unit/cms-store.test.ts` | Unit | 20 | Pinia store (fallback, initPage, invalidate, lectura de todas las secciones nuevas) |

### E2E Tests (Playwright)
| File | Tests | Coverage |
|------|-------|----------|
| `tests/e2e/public.spec.ts` | 5 | Smoke público: home + favicon, /inventario, /mapa, /aptitud, navegación |
| `tests/e2e/admin-manual.spec.ts` | 6 | Manual del observatorio: 10 secciones, AHP, Glosario, sidebar items nuevos. **Usa `page.route('**/observatory/techos-verdes/admin/**')` para stubear el FAKE_TOKEN ante el backend.** |
| `tests/e2e/admin-tiers-contributors.spec.ts` | 3 | Lista 5 modos default, lista 2 contribuyentes seed, crear contributor con role arquitecto. **Mismo patrón de stub.** |
| `tests/e2e/admin-cms.spec.ts` | 7 | `/admin/contenido` lista las 16 páginas; home declara las 14 secciones; fallback sin backend |
| `tests/e2e/nueva-ia.spec.ts` | 10 | AudienceGate visible · banner Q1 con DOI+KPIs · `/aprende` con 4 anclas y 3 tipologías · `/investigacion` con marco+publicaciones · `/investigacion/datos` con **descarga CSV real disparada via `page.waitForEvent('download')`** · `/investigacion/citar` con APA+BibTeX · header con 4 grupos |

### Comandos
```bash
npm test              # Vitest unit (116 tests, ~0.5s)
npm run test:watch    # Vitest watch mode
npm run test:coverage # Coverage v8
npm run test:e2e      # Playwright E2E (necesita dev server en :3000)
npm run test:e2e:install  # Descarga Chromium una vez
```

### Pre-requisitos E2E
- **Dev server corriendo** en `:3000` (`npm run dev` en otra terminal).
- **cercu-backend corriendo** en `:3003` para que el admin-cms 7º test (fallback) tenga la URL de referencia. Los demás admin tests interceptan `/observatory/techos-verdes/admin/**` con `page.route()` así que NO requieren backend para pasar.
- **Chromium descargado** la primera vez con `npm run test:e2e:install`.

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

**Páginas y secciones registradas (cobertura completa, todo el contenido editable):**
| pageSlug | secciones (sectionKey) |
|----------|------------------------|
| `home` | hero · sectionTitles · features · steps · datosCuriosos · mapTeaser · techoVerdeIntro · ciiemadShowcase · ciiemadPubs · ciiemadKpis · respaldo · **audienceGate** · **academicHighlight** · cta |
| `aprende` | **hero · intro · capas · tipologias · beneficios · casoIntro · casoCiiemad · cta** (Fase 3) |
| `investigacion` | **hero · marco · equipo · publicaciones · metodologia · pesosAhp · datos · citar** (Fase 3-4) |
| `sobre` | hero · mission · objetivos · principles · dimensiones · findings |
| `metodologia` | hero · pasos · limitations |
| `agenda-2030` | hero · intro · servicios |
| `comunidad` | hero · intro · pasos |
| `indicadores` · `inventario` · `candidatos` · `mapa` · `aptitud` · `ia-validacion` · `referencias` | hero |
| `contributors` | hero · intro |
| `footer` | brand · sources · quickLinks · institutional |

**Cobertura:** 16 páginas, **60+ secciones editables**. Todo el contenido visible en el sitio público (excepto datos reales como `greenRoofs`, `candidateRoofs`, charts) es editable desde `/admin/contenido` sin tocar código.

**Fase 2 — Home `audienceGate` y `academicHighlight`:**
- `audienceGate` = array de 4 cards (Aprende · Explora · Investigación · Comunidad). Cada card tiene `tag`, `title`, `description`, `to`, `ctaLabel`, `icono` (clave fun-card), `color` (clave fun-palette).
- `academicHighlight` = objeto con `tag`, `venue`, `anio`, `autores`, `titulo`, `descripcion`, `doi`, `kpi1Value/Label`, `kpi2Value/Label`, `kpi3Value/Label`, `ctaLabel`, `ctaTo`. Renderizado por `<HomeAcademicHighlight>` con KPIs sobre fondo `bg-primary`.

**Fase 3-4 — Hubs `/aprende` y `/investigacion`:**
- `aprende.capas` = 6 items con `num`, `nombre`, `funcion`, `color` (fun-palette). El test unit valida que `nums = [1,2,3,4,5,6]`.
- `aprende.tipologias` = 3 items con `slug` (extensivo/semi-intensivo/intensivo), `pesoSaturado`, `sustrato`, `vegetacion`, `mantenimiento`, `uso`, `color`, `icono`.
- `investigacion.publicaciones` = 5 items con `tipo`, `titulo`, `autores`, `anio`, `venue`, `doi?`, `resumen`, `destacada?`. La Q1 SCS 2025 tiene `destacada: true` y se renderiza con `shadow-glow-primary`.
- `investigacion.pesosAhp` = 8 items con `variable` y `peso` (string con %). Test unit valida que la suma esté entre 99-101.
- `investigacion.datos` = 3 items con `slug` (inventario/candidatos/indicadores), `nombre`, `formato`, `registros`, `estado` (Disponible/En preparación), `descripcion`.
- `investigacion.citar` = 1 item con `titleApa`, `titleBibtex`, `nota`, `apa` (string formateado), `bibtex` (string formateado con escapes LaTeX).

**Wiring:** cada página pública consume vía `useCmsContent('<page>')` que devuelve `list<T>()` (computed array) y `one<T>()` (computed first item). El template usa `{{ data?.field || 'fallback' }}` para que SSR pinte con defaults antes de que el backend responda.

**Backend (genérico, sin cambios por sectionKey):**
- Entidad `ObsCmsSection` con columna `observatory`, `pageSlug`, `sectionKey`, `items` (JSON), `updatedBy`, `updatedAt`.
- Migración: `1733000000000-EnsureCmsSectionsTable.ts` (idempotente).
- Endpoint público: `GET /:observatory/cms/:pageSlug/:sectionKey` — controlador ignora `sectionKey` y devuelve TODAS las secciones de la página. El composable lo invoca con `_all` como placeholder.
- Endpoint admin: `PUT /:observatory/admin/cms/:pageSlug/:sectionKey` con auth + permiso `manage_cms`. Validación Joi: `items: array of objects` — sin constraints de campos, permite cualquier nuevo sectionKey sin cambios backend.

**Admin:** `/admin/contenido` lista las 16 páginas; `/admin/contenido/:pageSlug` muestra accordion por sección con edición in-place + auto-bind al shape del default. Mover/añadir/eliminar bloques + "Restaurar default" + chip de "Sin guardar".

**Tests:**
- Unit: `tests/unit/cms-defaults.test.ts` (32 tests) — cobertura del catálogo, cada sección nueva, audienceGate (4 puertas), academicHighlight (paper Q1), aprende (capas 1-6, 3 tipologías), investigacion (5 publicaciones con Q1 destacada, 8 pesos AHP que suman ~100 %, datos, citar APA+BibTeX), ausencia de copy IA promocional.
- Unit: `tests/unit/cms-content.test.ts` (14 tests) — `interpolateCmsText` + cobertura pública.
- Unit: `tests/unit/cms-store.test.ts` (20 tests) — store Pinia (fallback, initPage, invalidate, lectura de todas las secciones nuevas).
- E2E: `tests/e2e/admin-cms.spec.ts` (7 tests) — `/admin/contenido` lista todas las páginas; el home declara las 14 secciones; fallback público funciona cuando el backend no responde.
- E2E: `tests/e2e/nueva-ia.spec.ts` (10 tests) — audienceGate visible, banner Q1 con DOI+KPIs, `/aprende` con 4 anclas y 3 tipologías, `/investigacion` con marco+publicaciones, `/investigacion/datos` con descarga CSV real disparada, `/investigacion/citar` con APA+BibTeX, header con 4 grupos.
- Total: **116 unit + 31 E2E = 147 tests pasando** (con cercu-backend corriendo en :3003).

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
