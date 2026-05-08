<script setup lang="ts">
useHead({
  title: 'Referencias - Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Marco institucional, tesis académicas, fuentes oficiales de datos y referencias bibliográficas que respaldan el observatorio. CIIEMAD-IPN como sede académica.',
    },
  ],
})

const { revealRef } = useScrollReveal({ stagger: true })

const tesis = [
  {
    tipo: 'Tesis doctoral',
    anio: 2025,
    titulo:
      'Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México',
    autora: 'M. en C. Ana Laura Cervantes Najera',
    directora: 'Dra. María Concepción Martínez Rodríguez',
    institucion: 'CIIEMAD-IPN',
    grado: 'Doctorado en Ciencias en Estudios Ambientales y de la Sustentabilidad',
    aportes: [
      'Inventario georreferenciado de techos verdes en CDMX',
      'Análisis multicriterio AHP con 8 variables territoriales',
      'Identificación de 428 km² de zonas prioritarias',
      'Estimación de 514,000 m² de potencial de instalación',
    ],
  },
  {
    tipo: 'Capítulo de libro',
    anio: 2023,
    titulo:
      'Techos verdes en las áreas urbanas y su relación con la Agenda 2030',
    autora: 'Dra. María Concepción Martínez Rodríguez · M. en C. Ana Laura Cervantes-Nájera',
    directora: 'Capítulo XIII, ODS 13 — Acción por el clima',
    institucion: 'CIIEMAD-IPN · Comunicación Científica',
    grado:
      'En: Rivera Acosta, P. y Neri Guzmán, J. C. (Coords.). Repensar la Agenda 2030: Tendencias de sostenibilidad (pp. 301-321). ISBN 978-607-99946-4-8 · DOI 10.52501/cc.064.13',
    aportes: [
      '7 ODS y 17 metas atendidas por techos verdes',
      '4 servicios ecosistémicos identificados (MEA 2003)',
      'Revisión sistemática Scopus 2016-2021 con VOSviewer',
      'Marco analítico que sustenta este observatorio',
    ],
  },
  {
    tipo: 'Tesis de maestría',
    anio: 2021,
    titulo:
      'Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México',
    autora: 'I.Q.I. Ana Laura Cervantes Najera',
    directora: 'Dra. María Concepción Martínez Rodríguez',
    institucion: 'CIIEMAD-IPN',
    grado: 'Maestría en Ciencias en Estudios Ambientales y de la Sustentabilidad',
    aportes: [
      'Diseño y monitoreo de techo verde ligero extensivo (TVLE) en CIIEMAD',
      'Reducción de 3.5 °C en temperatura superficial',
      '432.95 kWh/m²/año de ahorro térmico',
      '0.968 kg CO₂/m²/año de captura',
    ],
  },
]

// 7 ODS conectados al techo verde — referenciado al capítulo 2023
const odsRelevantes = [
  { num: 2, color: '#DDA63A', titulo: 'Hambre cero', via: 'Agricultura urbana' },
  { num: 3, color: '#4C9F38', titulo: 'Salud y bienestar', via: 'Reducción de partículas y bienestar psicológico' },
  { num: 6, color: '#26BDE2', titulo: 'Agua limpia y saneamiento', via: 'Captación pluvial' },
  { num: 7, color: '#FCC30B', titulo: 'Energía asequible', via: 'Aislamiento térmico' },
  { num: 11, color: '#FD9D24', titulo: 'Ciudades sostenibles', via: 'Infraestructura verde urbana' },
  { num: 13, color: '#3F7E44', titulo: 'Acción por el clima', via: 'Mitigación de isla de calor' },
  { num: 15, color: '#56C02B', titulo: 'Vida de ecosistemas terrestres', via: 'Hábitat y biodiversidad' },
]

const fuentesOficiales = [
  {
    nombre: 'SIGCDMX — Sistema de Información Geográfica',
    sigla: 'SIGCDMX',
    descripcion: 'Datos catastrales, cartografía base y capas territoriales oficiales de la Ciudad de México.',
    url: 'https://sig.cdmx.gob.mx',
  },
  {
    nombre: 'SEDEMA — Secretaría del Medio Ambiente',
    sigla: 'SEDEMA',
    descripcion: 'Capas ambientales, áreas verdes urbanas y programas de azoteas verdes de la CDMX.',
    url: 'https://datos.cdmx.gob.mx',
  },
  {
    nombre: 'SIMAT — Sistema de Monitoreo Atmosférico',
    sigla: 'SIMAT',
    descripcion: 'Lecturas de calidad del aire (O₃, NO₂, PM₂.₅, PM₁₀) y estaciones de monitoreo en CDMX.',
    url: 'http://www.aire.cdmx.gob.mx',
  },
  {
    nombre: 'INEGI — Censo de Población y Vivienda 2020',
    sigla: 'INEGI',
    descripcion: 'Densidad poblacional, materiales de construcción en techos y muros, viviendas particulares.',
    url: 'https://www.inegi.org.mx',
  },
  {
    nombre: 'SGIRPC — Atlas de Riesgos CDMX',
    sigla: 'SGIRPC',
    descripcion: 'Zonificación sísmica, riesgo de inundación y dictámenes post-sismo 19S (2017).',
    url: 'https://www.atlas.cdmx.gob.mx',
  },
  {
    nombre: 'Catastro CDMX',
    sigla: 'Catastro',
    descripcion: 'Tipo estructural, edad de construcción, niveles y material de techumbre por predio.',
    url: 'https://data.consejeria.cdmx.gob.mx',
  },
]

const sensores = [
  {
    nombre: 'Sentinel-2 (ESA / Copernicus)',
    rol: 'Índices de vegetación a 10 m',
    detalle:
      'Sensor multiespectral con bandas B02-B08; usado para NDVI, EVI, SAVI y NDWI. Producto S2MSI2A (Level-2A), revisita cada 5 días.',
    url: 'https://dataspace.copernicus.eu',
  },
  {
    nombre: 'Landsat 8/9 (NASA / USGS)',
    rol: 'Temperatura superficial (LST)',
    detalle:
      'Banda térmica TIRS ST_B10 a 100 m de resolución; producto Collection 2 Level-2. Único satélite gratuito con banda térmica calibrada.',
    url: 'https://earthexplorer.usgs.gov',
  },
  {
    nombre: 'Google Earth Engine',
    rol: 'Plataforma de procesamiento',
    detalle:
      'Catálogo de Sentinel-2 (COPERNICUS/S2_SR_HARMONIZED) y Landsat (LANDSAT/LC08-09/C02/T1_L2). Procesamiento server-side de series temporales.',
    url: 'https://earthengine.google.com',
  },
]

const normativa = [
  {
    titulo: 'NTC-CDMX 2017 — Normas Técnicas Complementarias',
    descripcion: 'Capacidad de carga mínima en azoteas: 100 kg/m² para TVLE; 300 kg/m² para techo verde intensivo.',
    fuente: 'Gobierno de la Ciudad de México',
  },
  {
    titulo: 'Norma Ambiental NADF-013-RNAT-2017',
    descripcion: 'Especificaciones técnicas para diseño, instalación y mantenimiento de azoteas verdes en la CDMX.',
    fuente: 'SEDEMA',
  },
  {
    titulo: 'Reglamento de Construcciones del Distrito Federal',
    descripcion: 'Criterios estructurales, sísmicos y de uso del suelo aplicables a edificaciones existentes y nuevas.',
    fuente: 'Gobierno de la Ciudad de México',
  },
  {
    titulo: 'NMX-AA-164-SCFI-2013 — Edificación sustentable',
    descripcion: 'Criterios y requerimientos ambientales mínimos para edificios sustentables.',
    fuente: 'Secretaría de Economía',
  },
]

// Bibliografía organizada por bloques temáticos con citas clave del capítulo 2023
const bibliografia = {
  ciiemad: [
    'Martínez Rodríguez, M. C., y Cervantes-Nájera, A. L. (2023). Techos verdes en las áreas urbanas y su relación con la Agenda 2030. En P. Rivera Acosta y J. C. Neri Guzmán (Coords.), Repensar la Agenda 2030: Tendencias de sostenibilidad (pp. 301-321). Ediciones Comunicación Científica. https://doi.org/10.52501/cc.064.13',
    'Cervantes Najera, A. L. (2025). Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México [Tesis doctoral, CIIEMAD-IPN].',
    'Cervantes Najera, A. L. (2021). Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero [Tesis de maestría, CIIEMAD-IPN].',
  ],
  agenda2030: [
    'Programa de las Naciones Unidas para el Desarrollo (PNUD) (2015). ODS en acción. https://www.undp.org/es/sustainable-development-goals',
    'Naciones Unidas (2015). Agenda para el Desarrollo Sostenible. Comunidad y Salud.',
    'United Nations (2016b). Objetivo 13: Acción por el clima.',
    'United Nations (2016c). Objetivo 2: Hambre cero.',
    'United Nations (2016d). Objetivo 6: Agua limpia y saneamiento.',
    'United Nations (2016e). Objetivo 7: Energía asequible y no contaminante.',
    'United Nations (2016f). Statistics Division. 3 Good Health and well-being.',
    'United Nations (2016a). Objetivo 11: Ciudades y comunidades sostenibles.',
    'United Nations (2019b). Statistics Division. 15 Life on land.',
    'Naciones Unidas (2018). United Nations Statistics Division. https://unstats.un.org/sdgs/report/2019/goal-11/',
  ],
  sbnEcosistemas: [
    'International Union for Conservation of Nature (IUCN) (2016). What are Nature-based Solutions? https://portals.iucn.org/library/sites/library/files/documents/2016-036.pdf',
    'Keesstra, S., Nunes, J., Novara, A., Finger, D., Avelar, D., Kalantari, Z., y Cerdà, A. (2018). The superior effect of nature based solutions in land management. Science of the Total Environment, 610-611, 997-1009.',
    'Millennium Ecosystem Assessment (2003). Ecosystems and Human Well-being: a framework for assessment.',
    'Tzoulas, K., Korpela, K., Venn, S., Yli-Pelkonen, V., Kaźmierczak, A., Niemela, J., y James, P. (2007). Promoting ecosystem and human health in urban areas using Green Infrastructure: A literature review. Landscape and Urban Planning, 81(3), 167-178.',
    'World Health Organization (WHO) (2017). Urban green space and health: Intervention impacts and effectiveness.',
    'Xie, L., y Bulkeley, H. (2020). Nature-based solutions for urban biodiversity governance. Environmental Science and Policy, 110, 77-87.',
    'NATURVATION (2018). Atlas. Urban Nature Atlas. https://naturvation.eu/atlas',
  ],
  techosVerdes: [
    'Le Corbusier (2007). Toward an architecture. Getty Publications.',
    'Jim, C. Y. (2017). An archaeological and historical exploration of the origins of green roofs. Urban Forestry and Urban Greening, 27, 32-42. https://doi.org/10.1016/j.ufug.2017.06.014',
    'Thuring, C. E., y Dunnett, N. (2014). Vegetation composition of old extensive green roofs (from 1980s Germany). Ecological Processes, 3(1), 1-11.',
    'Pardela, Ł., Kowalczyk, T., Bogacz, A., y Kasowska, D. (2020). Sustainable green roof ecosystems: 100 years of functioning on fortifications - A case study. Sustainability, 12(11). https://doi.org/10.3390/su12114721',
    'Urbano-López De Meneses, B. (2013). Naturación urbana, un desafío a la urbanización. Revista Chapingo, Serie Ciencias Forestales y del Ambiente, 19(2), 225-235.',
    'Liberalesso, T., Oliveira Cruz, C., Matos Silva, C., y Manso, M. (2020). Green infrastructure and public policies: An international review of green roofs and green walls incentives. Land Use Policy, 96.',
    'Sturiale, L., y Scuderi, A. (2019). The role of green infrastructures in urban planning for climate change adaptation. Climate, 7(10), 1-24.',
    'Nieuwenhuijsen, M. J., Khreis, H., Triguero-Mas, M., Gascon, M., y Dadvand, P. (2017). Fifty shades of green. Epidemiology, 28(1), 63-71.',
  ],
  beneficios: [
    'Baik, J. J., Kwak, K. H., Park, S. B., y Ryu, Y. H. (2012). Effects of building roof greening on air quality in street canyons. Atmospheric Environment, 61, 48-55.',
    'Jaffal, I., Ouldboukhitine, S. E., y Belarbi, R. (2012). A comprehensive study of the impact of green roofs on building energy performance. Renewable Energy, 43, 157-164.',
    'Manso, M., Sousa, V., Matos, C., y Oliveira, M. (2021). The role of green roofs in post COVID-19 confinement: An analysis of willingness to pay. Journal of Building Engineering, 44, 103388.',
    'Contreras-Bejarano, O., y Villegas-González, P. A. (2019). Techos verdes para la gestión integral del agua: caso de estudio Chapinero, Colombia. Tecnología y Ciencias del Agua, 10(5), 282-318.',
    'Brachet, A., Schiopu, N., y Clergeau, P. (2020). Biodiversity impact assessment of building\'s roofs based on Life Cycle Assessment methods. Building and Environment, 158, 133-144.',
    'Langemeyer, J., Wedgwood, D., McPhearson, T., Baró, F., Madsen, A. L., y Barton, D. N. (2020). Creating urban green infrastructure where it is needed: A spatial ecosystem service-based decision analysis of green roofs in Barcelona. Science of the Total Environment, 707.',
    'Azunre, G. A., Amponsah, O., Peprah, C., Takyi, S. A., y Braimah, I. (2019). A review of the role of urban agriculture in the sustainable city discourse. Cities, 93, 104-119.',
  ],
  metodologia: [
    'Saaty, T. L. (1980). The Analytic Hierarchy Process. McGraw-Hill.',
    'Getter, K. L., y Rowe, D. B. (2006). The role of extensive green roofs in sustainable development. HortScience, 41(5), 1276-1285.',
    'Berardi, U., GhaffarianHoseini, A., y GhaffarianHoseini, A. (2014). State-of-the-art analysis of the environmental benefits of green roofs. Applied Energy, 115, 411-428.',
    'Oberndorfer, E., Lundholm, J., Bass, B., et al. (2007). Green roofs as urban ecosystems: ecological structures, functions, and services. BioScience, 57(10), 823-833.',
    'Susca, T., Gaffin, S. R., y Dell\'Osso, G. R. (2011). Positive effects of vegetation: Urban heat island and green roofs. Environmental Pollution, 159(8-9), 2119-2126.',
    'IPCC (2022). Climate Change 2022: Impacts, Adaptation and Vulnerability. Contribution of Working Group II to the Sixth Assessment Report.',
  ],
}
</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur"
        >
          <span class="live-dot" />
          Marco académico e institucional
        </span>
        <h1 class="mt-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
          Referencias del observatorio
        </h1>
        <p class="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
          Las fuentes académicas, técnicas y normativas que respaldan los datos, modelos y
          decisiones presentadas en esta plataforma.
        </p>
      </div>
    </CommonHeroSection>

    <div ref="revealRef" class="stagger-children container-wide section-padding space-y-20">
      <!-- 1. Sede académica: IPN / CIIEMAD -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-primary">Sede académica</span>
          <span class="text-xs uppercase tracking-wider text-ink-muted">Institución principal</span>
        </div>
        <div class="card overflow-hidden">
          <div class="grid grid-cols-1 gap-0 md:grid-cols-3">
            <!-- IPN logos column -->
            <div
              class="flex flex-col items-center justify-center gap-6 bg-primary-50/60 p-8 md:p-10"
            >
              <a
                href="https://www.ipn.mx/"
                target="_blank"
                rel="noopener noreferrer"
                class="block transition-transform hover:scale-105"
              >
                <img
                  src="/images/logo-ipn.svg"
                  alt="Instituto Politécnico Nacional"
                  class="h-24 w-auto"
                />
              </a>
              <a
                href="https://www.ciiemad.ipn.mx/"
                target="_blank"
                rel="noopener noreferrer"
                class="block transition-transform hover:scale-105"
              >
                <img
                  src="/images/logo-ciiemad.png"
                  alt="CIIEMAD - IPN"
                  class="h-20 w-auto rounded-full bg-white p-2 shadow-card"
                />
              </a>
            </div>

            <!-- IPN description -->
            <div class="md:col-span-2 p-8 md:p-10">
              <h2 class="text-2xl font-bold text-ink">Instituto Politécnico Nacional</h2>
              <p class="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">
                CIIEMAD — Centro Interdisciplinario de Investigaciones y Estudios sobre Medio
                Ambiente y Desarrollo
              </p>

              <p class="mt-4 text-sm leading-relaxed text-slate-custom">
                Este observatorio se desarrolla bajo el marco académico y científico del
                <strong class="text-ink">Centro Interdisciplinario de Investigaciones y Estudios sobre Medio
                Ambiente y Desarrollo (CIIEMAD)</strong> del
                <strong class="text-ink">Instituto Politécnico Nacional (IPN)</strong>.
                La plataforma toma como base la línea de investigación de
                <em>infraestructura verde y adaptación al cambio climático en zonas
                urbanas</em>, así como las tesis de grado de la M. en C. Ana Laura Cervantes
                Najera, dirigidas por la Dra. María Concepción Martínez Rodríguez.
              </p>

              <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href="https://www.ipn.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-primary hover:shadow-card-hover"
                >
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wider text-primary">
                      Sitio oficial
                    </p>
                    <p class="text-sm font-semibold text-ink">www.ipn.mx</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-ink-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
                <a
                  href="https://www.ciiemad.ipn.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-primary hover:shadow-card-hover"
                >
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wider text-primary">
                      CIIEMAD
                    </p>
                    <p class="text-sm font-semibold text-ink">www.ciiemad.ipn.mx</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-ink-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Tesis académicas y publicaciones -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-eco">Producción académica</span>
          <h2 class="text-2xl font-bold text-ink">Trabajos de referencia del CIIEMAD-IPN</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Tres trabajos dirigidos por la Dra. Martínez Rodríguez en CIIEMAD-IPN — dos tesis
          y un capítulo de libro — constituyen la base metodológica, empírica y teórica de
          este observatorio.
        </p>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="t in tesis"
            :key="t.anio + t.tipo"
            class="card-interactive flex flex-col p-6"
          >
            <div class="flex items-center gap-2">
              <span class="badge-primary">{{ t.tipo }}</span>
              <span class="text-xs font-semibold text-ink-muted">{{ t.anio }}</span>
            </div>
            <h3 class="mt-3 text-lg font-bold leading-snug text-ink">{{ t.titulo }}</h3>
            <p class="mt-3 text-sm font-semibold text-ink">{{ t.autora }}</p>
            <p class="text-xs text-slate-custom">Directora: {{ t.directora }}</p>
            <p class="mt-1 text-xs uppercase tracking-wider text-primary">{{ t.institucion }}</p>
            <p class="mt-3 text-xs italic text-slate-custom">{{ t.grado }}</p>
            <div class="mt-4 border-t border-gray-100 pt-4">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Aportes principales
              </p>
              <ul class="space-y-1.5">
                <li
                  v-for="(a, i) in t.aportes"
                  :key="i"
                  class="flex items-start gap-2 text-sm text-slate-custom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-0.5 h-4 w-4 shrink-0 text-eco"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ a }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- 3. Agenda 2030 / ODS -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-primary">Marco internacional</span>
          <h2 class="text-2xl font-bold text-ink">Agenda 2030 y Objetivos de Desarrollo Sostenible</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Siguiendo el marco propuesto por Martínez Rodríguez y Cervantes-Nájera (2023, cap.
          XIII), el techo verde como solución basada en la naturaleza (SbN) atiende
          <strong class="text-ink">7 ODS y 17 metas</strong> de la Agenda 2030.
          <NuxtLink to="/agenda-2030" class="font-semibold text-primary hover:underline">
            Ver el desarrollo completo →
          </NuxtLink>
        </p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          <div
            v-for="o in odsRelevantes"
            :key="o.num"
            class="card flex flex-col items-center p-3 text-center"
            :style="{ borderTop: `3px solid ${o.color}` }"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg text-xl font-extrabold text-white"
              :style="{ backgroundColor: o.color }"
            >
              {{ o.num }}
            </div>
            <p class="mt-2 text-xs font-bold leading-tight text-ink">{{ o.titulo }}</p>
            <p class="mt-1 text-[10px] text-ink-muted">{{ o.via }}</p>
          </div>
        </div>
      </section>

      <!-- 4. Fuentes oficiales de datos -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-secondary">Datos oficiales</span>
          <h2 class="text-2xl font-bold text-ink">Fuentes gubernamentales</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Datos abiertos de gobierno que alimentan los modelos de aptitud, riesgo y
          pre-factibilidad estructural.
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="f in fuentesOficiales"
            :key="f.sigla"
            :href="f.url"
            target="_blank"
            rel="noopener noreferrer"
            class="card-interactive flex flex-col p-5"
          >
            <div class="flex items-center justify-between">
              <span class="badge-secondary">{{ f.sigla }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-ink-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
            <h3 class="mt-3 text-sm font-bold text-ink">{{ f.nombre }}</h3>
            <p class="mt-2 text-xs leading-relaxed text-slate-custom">{{ f.descripcion }}</p>
          </a>
        </div>
      </section>

      <!-- 4. Sensores satelitales -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-accent">Percepción remota</span>
          <h2 class="text-2xl font-bold text-ink">Sensores satelitales</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Imágenes satelitales gratuitas que se procesan vía Google Earth Engine para los
          índices NDVI, EVI, SAVI, NDWI y temperatura superficial (LST).
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <a
            v-for="s in sensores"
            :key="s.nombre"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="card-interactive flex flex-col p-5"
          >
            <div class="flex items-center gap-2">
              <span class="badge-accent">{{ s.rol }}</span>
            </div>
            <h3 class="mt-3 text-sm font-bold text-ink">{{ s.nombre }}</h3>
            <p class="mt-2 text-xs leading-relaxed text-slate-custom">{{ s.detalle }}</p>
          </a>
        </div>
      </section>

      <!-- 5. Marco normativo -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-alert">Normativa</span>
          <h2 class="text-2xl font-bold text-ink">Marco normativo aplicable</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Normas técnicas y reglamentos que rigen la viabilidad estructural y los criterios
          ambientales de los techos verdes en la CDMX.
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article v-for="n in normativa" :key="n.titulo" class="card p-5">
            <h3 class="text-sm font-bold text-ink">{{ n.titulo }}</h3>
            <p class="mt-2 text-xs leading-relaxed text-slate-custom">{{ n.descripcion }}</p>
            <p class="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              {{ n.fuente }}
            </p>
          </article>
        </div>
      </section>

      <!-- 6. Bibliografía técnica organizada por bloques -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-primary">Bibliografía</span>
          <h2 class="text-2xl font-bold text-ink">Referencias bibliográficas</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Bibliografía organizada por bloques temáticos. Las referencias del bloque
          &quot;CIIEMAD-IPN&quot; constituyen las publicaciones de origen de este
          observatorio. Los demás bloques son citados a lo largo de la plataforma.
        </p>

        <div class="space-y-4">
          <details class="panel" open>
            <summary class="flex cursor-pointer items-center justify-between gap-2">
              <span class="text-base font-bold text-ink">CIIEMAD-IPN — fuentes primarias</span>
              <span class="badge-primary">{{ bibliografia.ciiemad.length }}</span>
            </summary>
            <ol class="mt-4 list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-custom">
              <li v-for="(b, i) in bibliografia.ciiemad" :key="i" class="pl-2">{{ b }}</li>
            </ol>
          </details>

          <details class="panel">
            <summary class="flex cursor-pointer items-center justify-between gap-2">
              <span class="text-base font-bold text-ink">Agenda 2030 y ODS</span>
              <span class="badge-secondary">{{ bibliografia.agenda2030.length }}</span>
            </summary>
            <ol class="mt-4 list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-custom">
              <li v-for="(b, i) in bibliografia.agenda2030" :key="i" class="pl-2">{{ b }}</li>
            </ol>
          </details>

          <details class="panel">
            <summary class="flex cursor-pointer items-center justify-between gap-2">
              <span class="text-base font-bold text-ink">Soluciones basadas en la naturaleza y servicios ecosistémicos</span>
              <span class="badge-eco">{{ bibliografia.sbnEcosistemas.length }}</span>
            </summary>
            <ol class="mt-4 list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-custom">
              <li v-for="(b, i) in bibliografia.sbnEcosistemas" :key="i" class="pl-2">{{ b }}</li>
            </ol>
          </details>

          <details class="panel">
            <summary class="flex cursor-pointer items-center justify-between gap-2">
              <span class="text-base font-bold text-ink">Techos verdes — historia, política y diseño</span>
              <span class="badge-accent">{{ bibliografia.techosVerdes.length }}</span>
            </summary>
            <ol class="mt-4 list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-custom">
              <li v-for="(b, i) in bibliografia.techosVerdes" :key="i" class="pl-2">{{ b }}</li>
            </ol>
          </details>

          <details class="panel">
            <summary class="flex cursor-pointer items-center justify-between gap-2">
              <span class="text-base font-bold text-ink">Beneficios documentados (energía, agua, salud, biodiversidad)</span>
              <span class="badge-eco">{{ bibliografia.beneficios.length }}</span>
            </summary>
            <ol class="mt-4 list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-custom">
              <li v-for="(b, i) in bibliografia.beneficios" :key="i" class="pl-2">{{ b }}</li>
            </ol>
          </details>

          <details class="panel">
            <summary class="flex cursor-pointer items-center justify-between gap-2">
              <span class="text-base font-bold text-ink">Metodología (AHP, ecosistemas urbanos)</span>
              <span class="badge-primary">{{ bibliografia.metodologia.length }}</span>
            </summary>
            <ol class="mt-4 list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-custom">
              <li v-for="(b, i) in bibliografia.metodologia" :key="i" class="pl-2">{{ b }}</li>
            </ol>
          </details>
        </div>
      </section>

      <!-- Cierre + invitación -->
      <section class="reveal">
        <div
          class="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white md:p-12"
        >
          <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            <div class="md:col-span-2">
              <h2 class="text-2xl font-bold md:text-3xl">¿Eres autor o institución?</h2>
              <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                Si tu trabajo académico, dataset oficial o normativa debería estar listada en
                este observatorio, escríbenos para incorporar tu referencia y citarla
                correctamente.
              </p>
            </div>
            <div class="flex md:justify-end">
              <NuxtLink to="/sobre" class="btn-eco">
                Conocer el equipo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
