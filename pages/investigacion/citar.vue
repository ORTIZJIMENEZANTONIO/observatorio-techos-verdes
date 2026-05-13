<script setup lang="ts">
useHead({
  title: 'Cómo citar — Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Formatos APA 7 y BibTeX para citar el Observatorio de Techos Verdes CDMX, el artículo Q1 de Cervantes-Nájera (2025) y las tesis CIIEMAD-IPN.',
    },
  ],
})

const cms = useCmsContent('investigacion')
interface CitarShape {
  titleApa?: string
  titleBibtex?: string
  nota?: string
  apa?: string
  bibtex?: string
}
const citar = cms.one<CitarShape>('citar')

const copied = ref<string | null>(null)
const copiar = (texto: string, key: string) => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return
  navigator.clipboard.writeText(texto).then(() => {
    copied.value = key
    setTimeout(() => { if (copied.value === key) copied.value = null }, 1800)
  })
}

const apaDefault = 'Cervantes-Nájera, A. L., & Martínez Rodríguez, M. C. (2025). Observatorio de Techos Verdes CDMX. CIIEMAD-IPN. https://observatorio.cercu.com.mx'
const bibtexDefault = `@misc{observatorio_techos_verdes_2025,
  author       = {Cervantes-N\\'ajera, Ana Laura and Mart\\'inez Rodr\\'iguez, Mar\\'ia Concepci\\'on},
  title        = {Observatorio de Techos Verdes CDMX},
  year         = {2025},
  institution  = {CIIEMAD, Instituto Polit\\'ecnico Nacional},
  url          = {https://observatorio.cercu.com.mx},
  note         = {Plataforma digital de monitoreo y an\\'alisis geoespacial}
}`

const articuloQ1Apa =
  'Cervantes-Nájera, A. L., Martínez Rodríguez, M. C., et al. (2025). Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City: A GIS-based multicriteria decision analysis to alleviate urban heat island (UHI). Sustainable Cities and Society. https://doi.org/10.1016/j.scs.2025.S2210670725006547'

const articuloQ1Bibtex = `@article{cervantes_najera_2025_scs,
  author  = {Cervantes-N\\'ajera, A. L. and Mart\\'inez Rodr\\'iguez, M. C. and others},
  title   = {Spatial suitability analysis for the implementation of green rooftops in highly urbanized Mexico City},
  journal = {Sustainable Cities and Society},
  year    = {2025},
  doi     = {10.1016/j.scs.2025.S2210670725006547},
  publisher = {Elsevier}
}`

const tesisDoctoral =
  'Cervantes Nájera, A. L. (2025). Techos verdes una solución sustentable para la adaptación al cambio climático en la Ciudad de México (Tesis doctoral, CIIEMAD-IPN). Defensa: 28 noviembre 2025.'

const tesisMaestria =
  'Cervantes Nájera, A. L. (2021). Diseño, aplicación y evaluación de un techo verde ligero extensivo como estrategia para la adaptación al cambio climático en la alcaldía Gustavo A. Madero, Ciudad de México (Tesis de maestría, CIIEMAD-IPN).'

const capitulo =
  'Martínez Rodríguez, M. C., & Cervantes-Nájera, A. L. (2023). Techos verdes en las áreas urbanas y su relación con la Agenda 2030. En Repensar la Agenda 2030: Tendencias de sostenibilidad (cap. XIII). https://doi.org/10.52501/cc.064.13'
</script>

<template>
  <div>
    <CommonHeroSection compact>
      <div class="max-w-3xl">
        <span class="mb-4 inline-flex items-center gap-2 rounded-badge bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-eco-light backdrop-blur-sm">
          Atribución
        </span>
        <h1 class="text-3xl font-extrabold leading-tight text-white md:text-5xl">
          Cómo citar el observatorio
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          Si usas datos, mapas o análisis publicados aquí, atribuye al observatorio y a la fuente académica subyacente. Estos son los formatos listos para copiar.
        </p>
      </div>
    </CommonHeroSection>

    <!-- Observatorio -->
    <section class="bg-white py-10 md:py-14">
      <div class="container-wide">
        <CommonSectionTitle
          title="Citar el observatorio"
          subtitle="Atribución estándar para reusar datos o capturas de pantalla del sitio."
          tag="Observatorio"
          :centered="false"
        />
        <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="rounded-card border border-gray-100 bg-surface p-5">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{{ citar?.titleApa || 'Formato APA 7' }}</p>
              <button class="rounded bg-primary-50 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary-100" @click="copiar(citar?.apa || apaDefault, 'apa')">
                {{ copied === 'apa' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <pre class="mt-3 whitespace-pre-wrap break-words rounded bg-white p-3 font-mono text-xs leading-relaxed text-ink">{{ citar?.apa || apaDefault }}</pre>
          </div>
          <div class="rounded-card border border-gray-100 bg-surface p-5">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{{ citar?.titleBibtex || 'BibTeX' }}</p>
              <button class="rounded bg-primary-50 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary-100" @click="copiar(citar?.bibtex || bibtexDefault, 'bibtex')">
                {{ copied === 'bibtex' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <pre class="mt-3 whitespace-pre-wrap break-words rounded bg-white p-3 font-mono text-[11px] leading-relaxed text-ink">{{ citar?.bibtex || bibtexDefault }}</pre>
          </div>
        </div>
        <p v-if="citar?.nota" class="mt-6 rounded-lg border border-primary/10 bg-primary-50 p-4 text-sm leading-relaxed text-ink">
          {{ citar.nota }}
        </p>
      </div>
    </section>

    <!-- Artículo Q1 -->
    <section class="bg-surface py-10 md:py-14">
      <div class="container-wide">
        <CommonSectionTitle
          title="Artículo Q1 — Sustainable Cities and Society (2025)"
          subtitle="Si tu trabajo usa el modelo AHP de 8 variables o los datos derivados, también cita el paper."
          tag="Publicación primaria"
          :centered="false"
        />
        <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="rounded-card border border-primary/30 bg-white p-5 shadow-glow-primary">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-primary">APA 7 (destacada)</p>
              <button class="rounded bg-primary px-2 py-1 text-[10px] font-semibold text-white hover:bg-primary-dark" @click="copiar(articuloQ1Apa, 'q1apa')">
                {{ copied === 'q1apa' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <pre class="mt-3 whitespace-pre-wrap break-words rounded bg-primary-50 p-3 font-mono text-xs leading-relaxed text-ink">{{ articuloQ1Apa }}</pre>
          </div>
          <div class="rounded-card border border-primary/30 bg-white p-5 shadow-glow-primary">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-primary">BibTeX</p>
              <button class="rounded bg-primary px-2 py-1 text-[10px] font-semibold text-white hover:bg-primary-dark" @click="copiar(articuloQ1Bibtex, 'q1bib')">
                {{ copied === 'q1bib' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <pre class="mt-3 whitespace-pre-wrap break-words rounded bg-primary-50 p-3 font-mono text-[11px] leading-relaxed text-ink">{{ articuloQ1Bibtex }}</pre>
          </div>
        </div>
        <a
          href="https://doi.org/10.1016/j.scs.2025.S2210670725006547"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Ver el artículo en Elsevier →
        </a>
      </div>
    </section>

    <!-- Tesis y capítulo -->
    <section class="bg-white py-10 md:py-14">
      <div class="container-wide">
        <CommonSectionTitle
          title="Tesis y capítulo de libro"
          subtitle="Citas formato APA 7 para las fuentes académicas subyacentes."
          tag="Marco académico"
          :centered="false"
        />
        <div class="mt-6 space-y-3">
          <div class="rounded-card border border-gray-100 bg-surface p-5">
            <div class="flex items-center justify-between gap-3">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Tesis doctoral · CIIEMAD-IPN 2025</p>
              <button class="rounded bg-primary-50 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary-100" @click="copiar(tesisDoctoral, 'tdoc')">
                {{ copied === 'tdoc' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-ink">{{ tesisDoctoral }}</p>
          </div>
          <div class="rounded-card border border-gray-100 bg-surface p-5">
            <div class="flex items-center justify-between gap-3">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Tesis maestría · CIIEMAD-IPN 2021</p>
              <button class="rounded bg-primary-50 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary-100" @click="copiar(tesisMaestria, 'tmaes')">
                {{ copied === 'tmaes' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-ink">{{ tesisMaestria }}</p>
          </div>
          <div class="rounded-card border border-gray-100 bg-surface p-5">
            <div class="flex items-center justify-between gap-3">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Capítulo · Repensar la Agenda 2030 (2023)</p>
              <button class="rounded bg-primary-50 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary-100" @click="copiar(capitulo, 'cap')">
                {{ copied === 'cap' ? 'Copiado ✓' : 'Copiar' }}
              </button>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-ink">{{ capitulo }}</p>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/investigacion#publicaciones" class="btn-outline">Ver lista completa de publicaciones</NuxtLink>
          <NuxtLink to="/referencias" class="btn-outline">Bibliografía (41 entradas)</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
