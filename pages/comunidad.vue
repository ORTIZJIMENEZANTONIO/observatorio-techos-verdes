<script setup lang="ts">
import { tiersDefaults, contributorsDefaults } from '~/data/tiers-defaults'

useHead({
  title: 'Comunidad - Observatorio de Techos Verdes CDMX',
  meta: [
    {
      name: 'description',
      content:
        'Cinco modos de participar en el Observatorio de Techos Verdes CDMX: desde el reporte ciudadano hasta la operación institucional. Aportes abiertos a vecinas, estudiantes, especialistas y entidades.',
    },
  ],
})

const { revealRef } = useScrollReveal({ stagger: true })

// Tiers visibles ordenados por sortOrder
const tiers = computed(() =>
  [...tiersDefaults]
    .filter((t) => t.visible !== false && !t.archived)
    .sort((a, b) => a.sortOrder - b.sortOrder),
)

const contributors = computed(() =>
  contributorsDefaults.filter((c) => c.visible !== false && !c.archived && c.publicProfile),
)

// Mapeo del color del tier a clases Tailwind utilizables
const tierColorMap: Record<string, { bg: string; text: string; border: string; chip: string }> = {
  slate: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    chip: 'bg-slate-200 text-slate-700',
  },
  secondary: {
    bg: 'bg-secondary/10',
    text: 'text-secondary-dark',
    border: 'border-secondary/30',
    chip: 'bg-secondary/15 text-secondary-dark',
  },
  eco: {
    bg: 'bg-eco/10',
    text: 'text-eco-dark',
    border: 'border-eco/30',
    chip: 'bg-eco/15 text-eco-dark',
  },
  primary: {
    bg: 'bg-primary-50',
    text: 'text-primary',
    border: 'border-primary/30',
    chip: 'bg-primary-50 text-primary',
  },
  accent: {
    bg: 'bg-accent/10',
    text: 'text-accent-dark',
    border: 'border-accent/30',
    chip: 'bg-accent/15 text-accent-dark',
  },
}

const tierColor = (color: string) => tierColorMap[color] ?? tierColorMap.slate

// Iconos SVG inline por slug de tier (evita dependencia de nuxt-icon en SSR)
const tierIcons: Record<string, string> = {
  aprendiz:
    '<path d="M12 2v6"/><path d="M12 22V12"/><path d="M5 8c0 4 7 4 7 4s7 0 7-4-7-4-7-4-7 0-7 4z"/>',
  reportador:
    '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  caracterizador:
    '<path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 3v18"/>',
  especialista:
    '<circle cx="6" cy="6" r="3"/><path d="m21 21-6-6"/><path d="M21 21v-3.5"/><path d="M21 21h-3.5"/><path d="M9 9 3 3"/>',
  operador:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
}

// Pasos para aportar
const pasos = [
  {
    n: 1,
    titulo: 'Identifica una azotea',
    detalle:
      'Cualquier persona puede reportar un techo verde existente o un sitio candidato observado en la calle, en su edificio o en su trabajo.',
  },
  {
    n: 2,
    titulo: 'Documenta y envía',
    detalle:
      'Foto, dirección aproximada, nombre del inmueble si lo conoces, y cualquier nota que sea relevante. Cuanto más detalle, mejor.',
  },
  {
    n: 3,
    titulo: 'El equipo valida',
    detalle:
      'CIIEMAD-IPN y SEDEMA revisan el aporte. Si pasa la validación se incorpora al inventario público y tu aporte queda asociado a tu perfil.',
  },
]

// Formulario de aportes — POST a /observatory/techos-verdes/comunidad/aportes
// Si el backend no responde, fallback a mailto.
const form = reactive({
  nombre: '',
  email: '',
  alcaldia: '',
  modo: '',
  mensaje: '',
  website: '', // honeypot anti-spam (oculto en CSS)
})
const enviado = ref(false)
const enviando = ref(false)
const errorEnvio = ref<string | null>(null)
const mensajeExito = ref<string | null>(null)

const runtimeConfig = useRuntimeConfig()
const observatorySlug = (runtimeConfig.public.observatory as string) || 'techos-verdes'
const { apiFetch } = useApi()

const fallbackMailto = () => {
  const subject = encodeURIComponent(
    `[Comunidad] ${form.modo || 'Aporte general'} de ${form.nombre}`,
  )
  const body = encodeURIComponent(
    `Nombre: ${form.nombre}\nCorreo: ${form.email}\nAlcaldía: ${form.alcaldia || '—'}\nModo de participación: ${form.modo || '—'}\n\nMensaje:\n${form.mensaje}`,
  )
  window.location.href = `mailto:contacto@techosverdes.cdmx.gob.mx?subject=${subject}&body=${body}`
}

const enviar = async () => {
  errorEnvio.value = null
  mensajeExito.value = null

  if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
    errorEnvio.value = 'Por favor completa nombre, correo y mensaje.'
    return
  }
  if (form.mensaje.trim().length < 10) {
    errorEnvio.value = 'El mensaje debe tener al menos 10 caracteres.'
    return
  }

  enviando.value = true
  try {
    await apiFetch(`/observatory/${observatorySlug}/comunidad/aportes`, {
      method: 'POST',
      body: {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        alcaldia: form.alcaldia.trim() || undefined,
        modo: form.modo || undefined,
        mensaje: form.mensaje.trim(),
        website: form.website,
      },
    })
    enviado.value = true
    mensajeExito.value =
      '¡Gracias! Tu aporte fue recibido. El equipo lo revisará y se pondrá en contacto contigo.'
    // Limpia el formulario
    form.nombre = ''
    form.email = ''
    form.alcaldia = ''
    form.modo = ''
    form.mensaje = ''
  } catch (err: any) {
    // Fallback a mailto si el backend no responde o devuelve error de red
    const status = err?.statusCode || err?.status
    if (!status || status >= 500 || status === 0) {
      errorEnvio.value =
        'No pudimos enviar al servidor. Abrimos tu correo con el mensaje precargado.'
      fallbackMailto()
    } else if (status === 400) {
      const detail = err?.data?.message || 'Revisa los datos del formulario.'
      errorEnvio.value = detail
    } else {
      errorEnvio.value = 'Ocurrió un error. Intenta de nuevo o escríbenos directamente.'
    }
  } finally {
    enviando.value = false
  }
}

const roleLabel: Record<string, string> = {
  ciudadano: 'Ciudadanía',
  propietario: 'Propietario/a',
  arquitecto: 'Arquitectura',
  ingeniero: 'Ingeniería',
  empresa: 'Empresa',
  gobierno: 'Gobierno',
  ong: 'ONG',
  academia: 'Academia',
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
          Comunidad abierta
        </span>
        <h1 class="mt-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
          Sé parte del observatorio
        </h1>
        <p class="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
          Este observatorio se construye en colectivo. Cinco modos de participar — desde el
          reporte ciudadano hasta la operación institucional — abiertos a quien quiera sumar.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a
            href="#aportar"
            class="hero-cta-primary inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-md transition-transform hover:-translate-y-0.5"
          >
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
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Quiero aportar
          </a>
          <a
            href="#tiers"
            class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Ver modos de participación
          </a>
        </div>
      </div>
    </CommonHeroSection>

    <div ref="revealRef" class="stagger-children container-wide section-padding space-y-20">
      <!-- 1. Por qué comunidad -->
      <section class="reveal">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold text-ink">El observatorio se construye en colectivo</h2>
            <p class="mt-3 text-base leading-relaxed text-slate-custom">
              Mapear los techos verdes de la Ciudad de México requiere muchos ojos. Algunas
              azoteas son visibles desde la calle, otras solo desde edificios vecinos, otras
              están documentadas en tesis y reportes técnicos que no han sido digitalizados.
              Por eso este observatorio tiene puertas abiertas para vecinas y vecinos,
              estudiantes, profesionistas, dependencias y empresas.
            </p>
            <p class="mt-3 text-base leading-relaxed text-slate-custom">
              Cada aporte se asocia a un perfil, se valida por CIIEMAD-IPN y, si pasa el
              filtro técnico, se incorpora al inventario público. La autoría del aporte queda
              registrada y citable.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <CommonCountUpKPI
              :target="tiers.length"
              detalle="Modos de participación"
              fuente="Aprendiz · Reportador · Caracterizador · Especialista · Operador"
              href="#tiers"
              number-class="text-primary"
            />
            <CommonCountUpKPI
              :target="contributors.length"
              detalle="Contribuyentes verificados"
              fuente="CIIEMAD-IPN, SEDEMA y red en crecimiento"
              href="#contribuyentes"
              number-class="text-eco-dark"
            />
            <div class="col-span-2 lg:col-span-1">
              <CommonCountUpKPI
                :target="100"
                suffix=" %"
                detalle="Datos abiertos y citables"
                fuente="Inventario público · DOI por publicación"
                href="/referencias"
                number-class="text-accent-dark"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Pasos para aportar -->
      <section class="reveal">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-eco">Cómo participar</span>
          <h2 class="text-2xl font-bold text-ink">Tres pasos para sumar tu aporte</h2>
        </div>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article
            v-for="p in pasos"
            :key="p.n"
            class="card p-6"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-base font-extrabold"
            >
              {{ p.n }}
            </div>
            <h3 class="mt-3 text-base font-bold text-ink">{{ p.titulo }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-custom">{{ p.detalle }}</p>
          </article>
        </div>
      </section>

      <!-- 3. Tiers / modos de participación -->
      <section id="tiers" class="reveal scroll-mt-24">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-primary">Modos</span>
          <h2 class="text-2xl font-bold text-ink">Cinco maneras de aportar</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          No son niveles a alcanzar, son <strong>modos distintos de participar</strong>.
          Cada uno aporta valor al observatorio según el conocimiento, el tiempo y la
          posición de quien colabora.
        </p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="tier in tiers"
            :key="tier.id"
            class="card-interactive flex flex-col p-6"
            :class="[tierColor(tier.color).border]"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                :class="tierColor(tier.color).bg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  :class="tierColor(tier.color).text"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  v-html="tierIcons[tier.slug] ?? tierIcons.aprendiz"
                />
              </div>
              <div>
                <p
                  class="text-[10px] font-bold uppercase tracking-wider"
                  :class="tierColor(tier.color).text"
                >
                  {{ tier.modeTitle }}
                </p>
                <h3 class="text-lg font-bold leading-tight text-ink">{{ tier.label }}</h3>
              </div>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-slate-custom">
              {{ tier.description }}
            </p>
            <div class="mt-4 border-t border-gray-100 pt-4">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                Para quién es
              </p>
              <p class="mt-1 text-xs leading-relaxed text-slate-custom">{{ tier.audience }}</p>
            </div>
            <div class="mt-3">
              <p class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                Aporta típicamente
              </p>
              <ul class="mt-1.5 space-y-1">
                <li
                  v-for="(c, i) in tier.contributions"
                  :key="i"
                  class="flex items-start gap-2 text-xs leading-relaxed text-slate-custom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-0.5 h-3.5 w-3.5 shrink-0"
                    :class="tierColor(tier.color).text"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{{ c }}</span>
                </li>
              </ul>
            </div>
            <p class="mt-4 text-[11px] italic text-ink-muted">{{ tier.bridge }}</p>
          </article>
        </div>
      </section>

      <!-- 4. Contribuyentes actuales -->
      <section id="contribuyentes" class="reveal scroll-mt-24">
        <div class="mb-6 flex items-center gap-3">
          <span class="badge-secondary">Red de contribuyentes</span>
          <h2 class="text-2xl font-bold text-ink">Quiénes ya aportan</h2>
        </div>
        <p class="mb-6 max-w-3xl text-sm text-slate-custom">
          Personas e instituciones cuyos datos, mediciones, fotografías o normativa
          alimentan el observatorio.
        </p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article
            v-for="c in contributors"
            :key="c.id"
            class="card p-6"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-ink">{{ c.displayName }}</h3>
                  <span
                    v-if="c.verified"
                    class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-eco text-white"
                    aria-label="Verificado"
                    title="Verificado"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-ink-muted">@{{ c.handle }}</p>
              </div>
              <span
                class="badge"
                :class="tierColor(tiers.find((t) => t.slug === c.tier)?.color ?? 'slate').chip"
              >
                {{ tiers.find((t) => t.slug === c.tier)?.label ?? c.tier }}
              </span>
            </div>
            <p class="mt-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {{ roleLabel[c.role] ?? c.role }}
            </p>
            <p class="mt-1 text-xs text-slate-custom">{{ c.affiliation }}</p>
            <p class="mt-3 text-sm leading-relaxed text-slate-custom">{{ c.bio }}</p>
            <div class="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
              <div>
                <p class="text-lg font-bold text-primary">{{ c.validatedContributions }}</p>
                <p class="text-[10px] text-ink-muted">aportes validados</p>
              </div>
              <div>
                <p class="text-lg font-bold text-eco">{{ c.consecutiveMonthsActive }}</p>
                <p class="text-[10px] text-ink-muted">meses activos</p>
              </div>
              <div>
                <p class="text-lg font-bold text-accent-dark">{{ Math.round(c.acceptanceRate * 100) }} %</p>
                <p class="text-[10px] text-ink-muted">tasa de aceptación</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 5. Formulario / cómo aportar -->
      <section id="aportar" class="reveal scroll-mt-24">
        <div class="card overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="bg-primary p-8 text-white lg:col-span-2 lg:p-10">
              <span
                class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90"
              >
                <span class="live-dot" /> Recibimos aportes
              </span>
              <h2 class="mt-4 text-2xl font-bold md:text-3xl">Cuéntanos qué quieres aportar</h2>
              <p class="mt-3 text-sm leading-relaxed text-white/80">
                Reporta una azotea observada, comparte mediciones, propón un sitio candidato
                o ofrece tu organización como operador. El equipo del CIIEMAD-IPN y SEDEMA
                revisa cada propuesta.
              </p>
              <div class="mt-6 space-y-3 text-sm">
                <a
                  href="mailto:contacto@techosverdes.cdmx.gob.mx"
                  class="flex items-center gap-3 text-white/90 transition-colors hover:text-eco-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>contacto@techosverdes.cdmx.gob.mx</span>
                </a>
                <NuxtLink
                  to="/referencias"
                  class="flex items-center gap-3 text-white/90 transition-colors hover:text-eco-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>Ver marco académico CIIEMAD-IPN</span>
                </NuxtLink>
              </div>
            </div>

            <form
              class="space-y-4 p-8 lg:col-span-3 lg:p-10"
              @submit.prevent="enviar"
            >
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label class="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Nombre <span class="text-alert">*</span>
                  </label>
                  <input
                    v-model="form.nombre"
                    type="text"
                    class="input mt-1"
                    placeholder="Tu nombre o el de tu organización"
                    required
                  />
                </div>
                <div>
                  <label class="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Correo electrónico <span class="text-alert">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="input mt-1"
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
                <div>
                  <label class="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Alcaldía
                  </label>
                  <input
                    v-model="form.alcaldia"
                    type="text"
                    class="input mt-1"
                    placeholder="Ej. Coyoacán"
                  />
                </div>
                <div>
                  <label class="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Modo de participación
                  </label>
                  <select v-model="form.modo" class="select mt-1">
                    <option value="">Selecciona…</option>
                    <option v-for="t in tiers" :key="t.slug" :value="t.label">
                      {{ t.label }} — {{ t.modeTitle }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Cuéntanos tu aporte <span class="text-alert">*</span>
                </label>
                <textarea
                  v-model="form.mensaje"
                  rows="4"
                  class="input mt-1"
                  placeholder="Describe la azotea, sitio candidato, mediciones o materiales que quieres compartir."
                  required
                />
              </div>

              <!-- Honeypot anti-spam: invisible para humanos, los bots lo llenan -->
              <input
                v-model="form.website"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                class="honeypot"
              />

              <p v-if="errorEnvio" class="rounded-lg bg-alert/10 px-3 py-2 text-xs text-alert-dark">
                {{ errorEnvio }}
              </p>
              <p v-if="mensajeExito" class="rounded-lg bg-eco/10 px-3 py-2 text-xs text-eco-dark">
                {{ mensajeExito }}
              </p>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="enviando"
                  :class="enviando ? 'opacity-60 cursor-wait' : ''"
                >
                  <span v-if="enviando">Enviando…</span>
                  <span v-else>Enviar aporte</span>
                  <svg
                    v-if="!enviando"
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
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 animate-spin-smooth"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </button>
                <p class="text-[11px] text-ink-muted">
                  Tu aporte se guarda en la cola pública de prospectos para revisión manual.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- 6. Cierre / nota final -->
      <section class="reveal">
        <div
          class="overflow-hidden rounded-2xl border-l-4 border-eco bg-eco/5 p-6 md:p-8"
        >
          <p class="text-sm leading-relaxed text-ink">
            <strong class="text-eco-dark">Una nota desde el equipo:</strong> este observatorio
            es una plataforma viva. Si encuentras un dato que no cuadra, una azotea que
            falta o una referencia que debe reconocerse, escríbenos. La calidad del
            inventario depende de la atención compartida de la red.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Honeypot oculto: si un bot llena este campo, el backend descarta el envío */
.honeypot {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
</style>
