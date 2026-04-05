# Pipeline de percepción remota — Índices espectrales para el Observatorio de Techos Verdes CDMX

## Resumen

Pipeline de procesamiento de imágenes satelitales para generar índices
espectrales (NDVI, EVI, SAVI, NDWI, LST) con cobertura temporal desde 2019.
Reemplaza estimaciones mock por mediciones satelitales directas, mejorando la
confiabilidad del modelo de aptitud (LST + NDVI = 39.75% del peso AHP).

**Fuentes en vivo (gratuitas):**
- **Google Earth Engine** (prioridad) — Sentinel-2 + Landsat precargados, cómputo en la nube, gratis para investigación
- **Sentinel Hub** (fallback) — API REST con evalscript custom, 30k requests/mes gratis
- **Datos locales** (fallback offline) — `data/envi/alcaldias.ts`, estimaciones calibradas

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. ADQUISICIÓN                                                  │
│                                                                 │
│   Copernicus Open Access Hub ──→ Sentinel-2 L2A (10m, 5 días)  │
│   USGS EarthExplorer         ──→ Landsat 8/9 L2SP (30m, 16 d)  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│ 2. PRE-PROCESAMIENTO (ENVI)                                     │
│                                                                 │
│   • Subset a extensión CDMX (bbox: -99.36, 19.12, -98.94, 19.59)│
│   • Cloud masking (SCL band Sentinel-2 / QA_PIXEL Landsat)      │
│   • Verificar corrección atmosférica (L2A ya corregido)         │
│   • Reproyección a UTM 14N (EPSG:32614)                        │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│ 3. CÁLCULO DE ÍNDICES (ENVI Band Math / Spectral Indices)       │
│                                                                 │
│   Sentinel-2:                                                   │
│   ┌──────┬────────────────────────────────────────────────────┐ │
│   │ NDVI │ (B08 - B04) / (B08 + B04)                         │ │
│   │ EVI  │ 2.5 × (B08-B04) / (B08 + 6×B04 - 7.5×B02 + 1)   │ │
│   │ SAVI │ ((B08-B04) / (B08+B04+0.5)) × 1.5                 │ │
│   │ NDWI │ (B03 - B08) / (B03 + B08)                         │ │
│   └──────┴────────────────────────────────────────────────────┘ │
│                                                                 │
│   Landsat 8/9:                                                  │
│   ┌──────┬────────────────────────────────────────────────────┐ │
│   │ LST  │ ST_B10 (ya en °C en Collection 2 Level-2)          │ │
│   │      │ Alternativa: single-channel con emisividad ε=0.95  │ │
│   └──────┴────────────────────────────────────────────────────┘ │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│ 4. ESTADÍSTICA ZONAL (ENVI → ROI / Vector Analysis)             │
│                                                                 │
│   Vectores de entrada:                                          │
│   • Polígonos de 16 alcaldías (public/geojson/)                 │
│   • Footprints de 57 techos verdes + 60 candidatos              │
│                                                                 │
│   Estadísticas por zona:                                        │
│   • Media, mediana, desv. estándar, min, max                    │
│   • Percentiles (P10, P25, P75, P90)                            │
│   • % píxeles válidos (no nube)                                 │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│ 5. EXPORTACIÓN (ENVI → JSON)                                    │
│                                                                 │
│   Por alcaldía:  data/envi/alcaldias.ts    (16 registros)       │
│   Por edificio:  data/envi/edificios.ts    (117 registros)      │
│                                                                 │
│   Cada registro incluye:                                        │
│   • Valores actuales (última observación limpia)                │
│   • Serie temporal mensual (2019–2025, ~78 observaciones)       │
│   • Estadísticas históricas con tendencia lineal                │
│   • Metadatos de calidad (% píxeles válidos, resolución)        │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│ 6. INTEGRACIÓN EN PLATAFORMA                                    │
│                                                                 │
│   services/sources/envi.ts        → adapter                    │
│   services/normalizers/envi-normalizer.ts → NDVI→cobertura, etc│
│   composables/useStatisticalAnalysis.ts   → métricas mejoradas │
│   pages/indicadores/ → gráficas de evolución temporal           │
└─────────────────────────────────────────────────────────────────┘
```

## Paso 1: Adquisición de imágenes

### Sentinel-2 (NDVI, EVI, SAVI, NDWI)

| Parámetro | Valor |
|-----------|-------|
| Producto | S2MSI2A (Level-2A, corregido atmosféricamente) |
| Tiles CDMX | 14QNG, 14QPG, 14QNH |
| Resolución | 10m (B02, B03, B04, B08), 20m (B8A, B11, B12) |
| Revisita | 5 días (con ambos satélites) |
| Nubosidad máx. | ≤20% |
| Periodo | Enero 2019 – presente |
| Fuente | [Copernicus Browser](https://browser.dataspace.copernicus.eu/) |
| API | [OData API](https://documentation.dataspace.copernicus.eu/) |
| Costo | Gratuito |

**Bandas requeridas:**
- B02 (490nm, Blue) — para EVI
- B03 (560nm, Green) — para NDWI
- B04 (665nm, Red) — para NDVI, EVI, SAVI
- B08 (842nm, NIR) — para NDVI, EVI, SAVI, NDWI
- SCL (Scene Classification) — para cloud masking

### Landsat 8/9 (LST)

| Parámetro | Valor |
|-----------|-------|
| Producto | LC08_L2SP / LC09_L2SP (Collection 2, Level-2) |
| Path/Row | 026/047 |
| Resolución | 30m (óptico), 100m (térmico, remuestreado a 30m) |
| Revisita | 16 días (8 días combinando L8+L9) |
| Nubosidad máx. | ≤20% |
| Fuente | [USGS EarthExplorer](https://earthexplorer.usgs.gov/) |
| Costo | Gratuito |

**Bandas requeridas:**
- ST_B10 (TIRS-1 Surface Temperature) — LST directa en Kelvin
- QA_PIXEL — para cloud masking

## Paso 2: Pre-procesamiento en ENVI

### 2.1 Importar imágenes
```
File → Open As → Sentinel-2 → seleccionar .SAFE directory
File → Open As → Landsat → seleccionar *_MTL.txt
```

### 2.2 Subset a CDMX
```
Raster Management → Resize Data
Coordinates: UL (-99.36, 19.59) LR (-98.94, 19.12) [WGS84]
```

### 2.3 Cloud masking
```
Sentinel-2: usar banda SCL
  - Valores a enmascarar: 0 (no data), 1 (saturado), 2 (sombra oscura),
    3 (sombra nube), 8 (nube media), 9 (nube alta), 10 (cirro)
  - Valores válidos: 4 (vegetación), 5 (suelo), 6 (agua), 7 (nube baja sin prob)

Landsat: usar QA_PIXEL
  - Bit 3 (cloud shadow) = 0 Y Bit 4 (cloud) = 0 → píxel válido

ENVI: Raster Management → Apply Mask → usar banda SCL/QA reclasificada
```

## Paso 3: Cálculo de índices

### 3.1 NDVI — Índice de vegetación normalizado
```
ENVI: Spectral → Spectral Indices → NDVI
  Input NIR band: B08 (Sentinel-2)
  Input Red band: B04 (Sentinel-2)

  Fórmula: (NIR - Red) / (NIR + Red)
  Rango: -1 a 1 (vegetación urbana CDMX: 0.02 a 0.65)
```

### 3.2 EVI — Índice de vegetación mejorado
```
ENVI: Band Math
  Expresión: 2.5 * (float(B08) - float(B04)) / (float(B08) + 6.0 * float(B04) - 7.5 * float(B02) + 1.0)

  Ventaja sobre NDVI: no se satura en vegetación densa, reduce efecto atmosférico
```

### 3.3 SAVI — Índice de vegetación ajustado por suelo
```
ENVI: Band Math
  Expresión: ((float(B08) - float(B04)) / (float(B08) + float(B04) + 0.5)) * 1.5

  L = 0.5 (valor estándar para vegetación intermedia)
  Ventaja: más preciso en zonas con alto % de concreto (alcaldías centrales)
```

### 3.4 NDWI — Índice de agua normalizado
```
ENVI: Spectral → Spectral Indices → NDWI
  Input Green band: B03 (Sentinel-2)
  Input NIR band: B08 (Sentinel-2)

  Fórmula: (Green - NIR) / (Green + NIR)
  Rango: -1 a 1 (positivo = presencia de agua)
```

### 3.5 LST — Temperatura superficial
```
Landsat Collection 2 Level-2: ST_B10 ya viene en Kelvin × 0.00341802 + 149.0
Convertir a °C: LST_C = ST_B10 * 0.00341802 + 149.0 - 273.15

ENVI: Band Math
  Expresión: float(ST_B10) * 0.00341802 + 149.0 - 273.15

Alternativa single-channel (si se usa Level-1):
  LST = Tb / (1 + (λ × Tb / ρ) × ln(ε))
  donde: λ=10.9μm, ρ=14388μm·K, ε≈0.95 (concreto urbano)
```

## Paso 4: Estadística zonal

### En ENVI
```
Vectors → ROI Tool → importar GeoJSON de alcaldías
  File: public/geojson/alcaldias_cdmx.geojson

Para cada índice raster:
  Analytics → Statistics → Statistics by ROI
  - Seleccionar todas las ROIs (16 alcaldías)
  - Métricas: Mean, Median, StdDev, Min, Max
  - Exportar a CSV

Para footprints de edificios:
  Importar centroides + buffer de 50m (aproximación footprint)
  o usar polígonos de footprint si están disponibles (SIGCDMX)
```

### Exportar a JSON
Convertir los CSVs exportados al formato `ENVIAlcaldiaData` definido en
`types/remote-sensing.ts`. Script de conversión: TODO (Python o Node.js).

## Paso 5: Frecuencia de actualización

| Frecuencia | Acción |
|------------|--------|
| Mensual | Descargar nuevas imágenes, calcular índices, actualizar JSONs |
| Trimestral | Recalcular tendencias y estadísticas históricas |
| Anual | Análisis de cambio interanual, reporte de evolución |

## Mejora de confiabilidad

| Indicador | Fuente actual (mock) | Confianza | Con ENVI | Confianza |
|-----------|---------------------|-----------|----------|-----------|
| Cobertura vegetal | Estimación CONABIO | 0.60 | NDVI calibrado Sentinel-2 | 0.92 |
| LST | Interpolación Atlas Riesgos | 0.55 | Banda térmica Landsat | 0.90 |
| Isla de calor | Puntos RAMA extrapolados | 0.50 | LST + NDVI continuo | 0.88 |
| Disponibilidad hídrica | Datos CONAGUA puntuales | 0.55 | NDWI satelital | 0.82 |
| Score AHP (global) | 2 de 8 vars estimadas | 0.60 | LST+NDVI medidos (39.75% peso) | 0.85 |

## Referencias

- Huete, A. et al. (2002). Overview of the radiometric and biophysical performance of the MODIS vegetation indices. Remote Sensing of Environment, 83(1-2), 195-213.
- Cervantes Nájera, A.L. (2025). Techos verdes: una solución sustentable... CIIEMAD-IPN.
- ESA (2024). Sentinel-2 User Handbook. European Space Agency.
- USGS (2024). Landsat Collection 2 Level-2 Science Products.
- Sobrino, J.A. et al. (2004). Land surface temperature retrieval from Landsat TM 5. Remote Sensing of Environment, 90(4), 434-440.
