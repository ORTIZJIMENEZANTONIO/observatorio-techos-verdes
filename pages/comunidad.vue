<script setup lang="ts">
const { funPaths, funStyle } = useFunPalette()

import { useRuntimeConfig } from "nuxt/app";
import { reactive, ref } from "vue";
import { tiersDefaults, contributorsDefaults } from "~/data/tiers-defaults";

useHead({
  title: "Comunidad - Observatorio de Techos Verdes CDMX",
  meta: [
    {
      name: "description",
      content:
        "Cinco modos de participar en el Observatorio de Techos Verdes CDMX: desde el reporte ciudadano hasta la operación institucional. Aportes abiertos a vecinas, estudiantes, especialistas y entidades.",
    },
  ],
});

const { revealRef } = useScrollReveal({ stagger: true });

// Tiers visibles ordenados por sortOrder
const tiers = computed(() =>
  [...tiersDefaults]
    .filter((t) => t.visible !== false && !t.archived)
    .sort((a, b) => a.sortOrder - b.sortOrder)
);

const contributors = computed(() =>
  contributorsDefaults.filter(
    (c) => c.visible !== false && !c.archived && c.publicProfile
  )
);

// Mapeo del color del tier a clases Tailwind utilizables
const tierColorMap: Record<
  string,
  { bg: string; text: string; border: string; chip: string }
> = {
  slate: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
    chip: "bg-slate-200 text-slate-700",
  },
  secondary: {
    bg: "bg-secondary/10",
    text: "text-secondary-dark",
    border: "border-secondary/30",
    chip: "bg-secondary/15 text-secondary-dark",
  },
  eco: {
    bg: "bg-eco/10",
    text: "text-eco-dark",
    border: "border-eco/30",
    chip: "bg-eco/15 text-eco-dark",
  },
  primary: {
    bg: "bg-primary-50",
    text: "text-primary",
    border: "border-primary/30",
    chip: "bg-primary-50 text-primary",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent-dark",
    border: "border-accent/30",
    chip: "bg-accent/15 text-accent-dark",
  },
};

const tierColor = (color: string) => tierColorMap[color] ?? tierColorMap.slate;

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
};

// Pasos para aportar — editables desde /admin/contenido/comunidad
type PasoComunidad = { n: number; titulo: string; detalle: string; icono?: string; color?: string }
const cmsComunidad = useCmsContent('comunidad')
const pasos = cmsComunidad.list<PasoComunidad>('pasos')

// Formulario de aportes — flujo en 3 pasos:
//  1. Datos técnicos: el usuario describe el aporte. POST al backend crea
//     un ProspectSubmission con `status='pendiente'`.
//  2. Documento: BLOQUEADO en este flujo. Solo se desbloquea cuando el admin
//     verifica los datos técnicos del paso 1 desde /admin/prospectos y marca
//     el aporte como "listo para documento". El usuario recibe un correo con
//     un link único para subir su archivo. Esto evita acumular imágenes y
//     documentos que después serían descartados por validación técnica.
//  3. Confirmación: resumen + próximos pasos.
//
// Si el backend no responde, fallback a mailto.
const form = reactive({
  // Paso 1 - Datos técnicos
  nombre: "",
  email: "",
  alcaldia: "",
  direccion: "",
  tipoAporte: "",
  modo: "",
  mensaje: "",
  superficieAprox: "",
  lat: "" as string,
  lng: "" as string,
  website: "", // honeypot anti-spam (oculto en CSS)
});
const currentStep = ref<1 | 2 | 3>(1);
const enviado = ref(false);
const enviando = ref(false);
const errorEnvio = ref<string | null>(null);
const mensajeExito = ref<string | null>(null);
// Identificador devuelto por el backend al guardar paso 1 — se muestra al
// usuario como referencia y se incluye en el correo de confirmación
const referenciaAporte = ref<string | null>(null);

const runtimeConfig = useRuntimeConfig();
const observatorySlug =
  (runtimeConfig.public.observatory as string) || "techos-verdes";
const { apiFetch } = useApi();

const tiposAporte = [
  { value: "azotea_existente", label: "Reportar techo verde existente" },
  { value: "sitio_candidato", label: "Proponer sitio candidato (techo plano apto)" },
  { value: "medicion", label: "Compartir mediciones / dataset" },
  { value: "operacion", label: "Ofrecer mi organización como operador" },
  { value: "academia", label: "Aporte académico (tesis, artículo, dataset)" },
  { value: "otro", label: "Otro" },
];

const fallbackMailto = () => {
  const subject = encodeURIComponent(
    `[Comunidad] ${form.tipoAporte || form.modo || "Aporte general"} de ${form.nombre}`
  );
  const body = encodeURIComponent(
    `Nombre: ${form.nombre}\nCorreo: ${form.email}\nAlcaldía: ${
      form.alcaldia || "—"
    }\nDirección: ${form.direccion || "—"}\nTipo de aporte: ${
      form.tipoAporte || "—"
    }\nModo de participación: ${form.modo || "—"}\nSuperficie aproximada: ${
      form.superficieAprox || "—"
    } m²\n\nMensaje:\n${form.mensaje}`
  );
  window.location.href = `mailto:contacto@techosverdes.cdmx.gob.mx?subject=${subject}&body=${body}`;
};

// Validación del paso 1 — antes de enviar al backend
const validarPaso1 = (): string | null => {
  if (!form.nombre.trim()) return "Por favor escribe tu nombre.";
  if (!form.email.trim()) return "Por favor escribe tu correo.";
  if (!form.mensaje.trim() || form.mensaje.trim().length < 10) {
    return "Cuéntanos un poco más sobre tu aporte (mínimo 10 caracteres).";
  }
  if (!form.tipoAporte) return "Selecciona qué tipo de aporte quieres hacer.";
  return null;
};

const enviarPaso1 = async () => {
  errorEnvio.value = null;
  mensajeExito.value = null;

  const validacion = validarPaso1();
  if (validacion) {
    errorEnvio.value = validacion;
    return;
  }

  enviando.value = true;
  try {
    const res = await apiFetch<{ success: boolean; data?: { id?: string } }>(
      `/observatory/${observatorySlug}/comunidad/aportes`,
      {
        method: "POST",
        body: {
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          alcaldia: form.alcaldia.trim() || undefined,
          direccion: form.direccion.trim() || undefined,
          modo: form.modo || undefined,
          mensaje: [
            form.tipoAporte ? `[${form.tipoAporte}]` : null,
            form.superficieAprox ? `Superficie aprox.: ${form.superficieAprox} m²` : null,
            form.mensaje.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
          lat: form.lat ? Number(form.lat) : undefined,
          lng: form.lng ? Number(form.lng) : undefined,
          website: form.website,
        },
      }
    );
    referenciaAporte.value = res?.data?.id ?? null;
    enviado.value = true;
    // Avanza al paso 2 (que está bloqueado, espera verificación admin)
    currentStep.value = 2;
  } catch (err: any) {
    const status = err?.statusCode || err?.status;
    if (!status || status >= 500 || status === 0) {
      errorEnvio.value =
        "No pudimos enviar al servidor. Abrimos tu correo con el mensaje precargado.";
      fallbackMailto();
    } else if (status === 400) {
      const detail = err?.data?.message || "Revisa los datos del formulario.";
      errorEnvio.value = detail;
    } else {
      errorEnvio.value =
        "Ocurrió un error. Intenta de nuevo o escríbenos directamente.";
    }
  } finally {
    enviando.value = false;
  }
};

const irAPaso3 = () => {
  // El paso 2 es solo informativo. Avanzar al 3 marca el flujo como completado.
  currentStep.value = 3;
};

const reiniciarFormulario = () => {
  // Limpia y vuelve al paso 1
  form.nombre = "";
  form.email = "";
  form.alcaldia = "";
  form.direccion = "";
  form.tipoAporte = "";
  form.modo = "";
  form.mensaje = "";
  form.superficieAprox = "";
  form.lat = "";
  form.lng = "";
  referenciaAporte.value = null;
  enviado.value = false;
  errorEnvio.value = null;
  mensajeExito.value = null;
  currentStep.value = 1;
};

const stepsForm = [
  {
    n: 1,
    titulo: "Datos técnicos",
    detalle: "Cuéntanos sobre la azotea y cómo contactarte.",
  },
  {
    n: 2,
    titulo: "Documento de respaldo",
    detalle: "Te avisaremos por correo cuando el equipo verifique tus datos.",
  },
  {
    n: 3,
    titulo: "Confirmación",
    detalle: "Aporte registrado. El equipo se pondrá en contacto.",
  },
];

const roleLabel: Record<string, string> = {
  ciudadano: "Ciudadanía",
  propietario: "Propietario/a",
  arquitecto: "Arquitectura",
  ingeniero: "Ingeniería",
  empresa: "Empresa",
  gobierno: "Gobierno",
  ong: "ONG",
  academia: "Academia",
};
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
        <h1
          class="mt-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl"
        >
          Sé parte del observatorio
        </h1>
        <p class="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
          Este observatorio se construye en colectivo. Cinco modos de participar
          — desde el reporte ciudadano hasta la operación institucional —
          abiertos a quien quiera sumar.
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

    <div
      ref="revealRef"
      class="stagger-children container-wide section-padding space-y-20"
    >
      <!-- 1. Por qué comunidad -->
      <section class="reveal">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-bold text-ink">
              El observatorio se construye en colectivo
            </h2>
            <p class="mt-3 text-base leading-relaxed text-slate-custom">
              Mapear los techos verdes de la Ciudad de México requiere muchos
              ojos. Algunas azoteas son visibles desde la calle, otras solo
              desde edificios vecinos, otras están documentadas en tesis y
              reportes técnicos que no han sido digitalizados. Por eso este
              observatorio tiene puertas abiertas para vecinas y vecinos,
              estudiantes, profesionistas, dependencias y empresas.
            </p>
            <p class="mt-3 text-base leading-relaxed text-slate-custom">
              Cada aporte se asocia a un perfil, se valida por CIIEMAD-IPN y, si
              pasa el filtro técnico, se incorpora al inventario público. La
              autoría del aporte queda registrada y citable.
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
          <h2 class="text-2xl font-bold text-ink">
            Tres pasos para sumar tu aporte
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article
            v-for="p in pasos"
            :key="p.n"
            class="fun-card"
            :style="funStyle(p.color)"
          >
            <div class="fun-card-icon-wrap" aria-hidden="true">
              <span class="fun-card-icon-halo" />
              <span class="fun-card-icon-bubble" />
              <svg
                class="fun-card-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-for="(d, i) in funPaths(p.icono)" :key="i" :d="d" />
              </svg>
              <span class="fun-card-badge">{{ p.n }}</span>
              <span class="fun-card-spark fun-card-spark--1" />
              <span class="fun-card-spark fun-card-spark--2" />
            </div>
            <h3 class="fun-card-label">{{ p.titulo }}</h3>
            <p class="fun-card-desc">{{ p.detalle }}</p>
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
          No son niveles a alcanzar, son
          <strong>modos distintos de participar</strong>. Cada uno aporta valor
          al observatorio según el conocimiento, el tiempo y la posición de
          quien colabora.
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
                ></svg>
              </div>
              <div>
                <p
                  class="text-[10px] font-bold uppercase tracking-wider"
                  :class="tierColor(tier.color).text"
                >
                  {{ tier.modeTitle }}
                </p>
                <h3 class="text-lg font-bold leading-tight text-ink">
                  {{ tier.label }}
                </h3>
              </div>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-slate-custom">
              {{ tier.description }}
            </p>
            <div class="mt-4 border-t border-gray-100 pt-4">
              <p
                class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted"
              >
                Para quién es
              </p>
              <p class="mt-1 text-xs leading-relaxed text-slate-custom">
                {{ tier.audience }}
              </p>
            </div>
            <div class="mt-3">
              <p
                class="text-[10px] font-semibold uppercase tracking-wider text-ink-muted"
              >
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
            <p class="mt-4 text-[11px] italic text-ink-muted">
              {{ tier.bridge }}
            </p>
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
          Personas e instituciones cuyos datos, mediciones, fotografías o
          normativa alimentan el observatorio.
        </p>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article v-for="c in contributors" :key="c.id" class="card p-6">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-ink">
                    {{ c.displayName }}
                  </h3>
                  <span
                    v-if="c.verified"
                    class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-eco text-white"
                    aria-label="Verificado"
                    title="Verificado"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-2.5 w-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                </div>
                <p class="text-xs text-ink-muted">@{{ c.handle }}</p>
              </div>
              <span
                class="badge"
                :class="
                  tierColor(
                    tiers.find((t) => t.slug === c.tier)?.color ?? 'slate'
                  ).chip
                "
              >
                {{ tiers.find((t) => t.slug === c.tier)?.label ?? c.tier }}
              </span>
            </div>
            <p
              class="mt-2 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {{ roleLabel[c.role] ?? c.role }}
            </p>
            <p class="mt-1 text-xs text-slate-custom">{{ c.affiliation }}</p>
            <p class="mt-3 text-sm leading-relaxed text-slate-custom">
              {{ c.bio }}
            </p>
            <div
              class="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4"
            >
              <div>
                <p class="text-lg font-bold text-primary">
                  {{ c.validatedContributions }}
                </p>
                <p class="text-[10px] text-ink-muted">aportes validados</p>
              </div>
              <div>
                <p class="text-lg font-bold text-eco">
                  {{ c.consecutiveMonthsActive }}
                </p>
                <p class="text-[10px] text-ink-muted">meses activos</p>
              </div>
              <div>
                <p class="text-lg font-bold text-accent-dark">
                  {{ Math.round(c.acceptanceRate * 100) }} %
                </p>
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
              <h2 class="mt-4 text-2xl font-bold md:text-3xl text-white">
                Cuéntanos qué quieres aportar
              </h2>
              <p class="mt-3 text-sm leading-relaxed text-white/80">
                Reporta una azotea observada, comparte mediciones, propón un
                sitio candidato o ofrece tu organización como operador. El
                equipo del CIIEMAD-IPN y SEDEMA revisa cada propuesta.
              </p>
              <div class="mt-6 space-y-3 text-sm">
                <a
                  href="mailto:contacto@techosverdes.cdmx.gob.mx"
                  class="flex items-center gap-3 text-white/90 transition-colors hover:text-eco-light"
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
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>contacto@techosverdes.cdmx.gob.mx</span>
                </a>
                <NuxtLink
                  to="/referencias"
                  class="flex items-center gap-3 text-white/90 transition-colors hover:text-eco-light"
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>Ver marco académico CIIEMAD-IPN</span>
                </NuxtLink>
              </div>
            </div>

            <div class="p-8 lg:col-span-3 lg:p-10">
              <!-- Stepper visual: muestra los 3 pasos del proceso -->
              <ol class="mb-8 flex items-start gap-2 sm:gap-3" aria-label="Pasos del aporte">
                <li
                  v-for="(s, idx) in stepsForm"
                  :key="s.n"
                  class="flex flex-1 flex-col items-center text-center"
                >
                  <div class="flex w-full items-center">
                    <div
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all"
                      :class="
                        currentStep > s.n
                          ? 'border-eco bg-eco text-white'
                          : currentStep === s.n
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-gray-300 bg-white text-ink-muted'
                      "
                    >
                      <svg
                        v-if="currentStep > s.n"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span v-else>{{ s.n }}</span>
                    </div>
                    <div
                      v-if="idx < stepsForm.length - 1"
                      class="ml-2 h-0.5 flex-1 transition-colors"
                      :class="currentStep > s.n ? 'bg-eco' : 'bg-gray-200'"
                    />
                  </div>
                  <div class="mt-2">
                    <p
                      class="text-xs font-bold leading-tight"
                      :class="currentStep >= s.n ? 'text-ink' : 'text-ink-muted'"
                    >
                      {{ s.titulo }}
                    </p>
                    <p class="mt-0.5 hidden text-[10px] leading-tight text-ink-muted sm:block">
                      {{ s.detalle }}
                    </p>
                  </div>
                </li>
              </ol>

              <!-- PASO 1 — Datos técnicos -->
              <form
                v-if="currentStep === 1"
                class="space-y-4"
                @submit.prevent="enviarPaso1"
              >
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
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
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
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
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
                      Tipo de aporte <span class="text-alert">*</span>
                    </label>
                    <select v-model="form.tipoAporte" class="select mt-1" required>
                      <option value="">Selecciona…</option>
                      <option v-for="t in tiposAporte" :key="t.value" :value="t.value">
                        {{ t.label }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
                      Modo de participación
                    </label>
                    <select v-model="form.modo" class="select mt-1">
                      <option value="">Selecciona…</option>
                      <option v-for="t in tiers" :key="t.slug" :value="t.label">
                        {{ t.label }} — {{ t.modeTitle }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
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
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
                      Superficie aprox. (m²)
                    </label>
                    <input
                      v-model="form.superficieAprox"
                      type="number"
                      min="0"
                      class="input mt-1"
                      placeholder="Ej. 250"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                    >
                      Dirección o referencia
                    </label>
                    <input
                      v-model="form.direccion"
                      type="text"
                      class="input mt-1"
                      placeholder="Calle, número, colonia (opcional si compartes coordenadas)"
                    />
                  </div>
                </div>
                <div>
                  <label
                    class="text-xs font-semibold uppercase tracking-wider text-ink-muted"
                  >
                    Cuéntanos los datos técnicos
                    <span class="text-alert">*</span>
                  </label>
                  <textarea
                    v-model="form.mensaje"
                    rows="4"
                    class="input mt-1"
                    placeholder="Describe la azotea: tipo de edificio, materiales del techo, vegetación si la hay, accesos, año de construcción, cualquier dato útil para el equipo técnico."
                    required
                  />
                  <p class="mt-1 text-[11px] text-ink-muted">
                    Sé concreto/a con los datos técnicos — el equipo los usará para
                    decidir si pedirte el documento de respaldo.
                  </p>
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

                <p
                  v-if="errorEnvio"
                  class="rounded-lg bg-alert/10 px-3 py-2 text-xs text-alert-dark"
                >
                  {{ errorEnvio }}
                </p>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    class="btn-primary"
                    :disabled="enviando"
                    :class="enviando ? 'opacity-60 cursor-wait' : ''"
                  >
                    <span v-if="enviando">Enviando…</span>
                    <span v-else>Enviar datos técnicos</span>
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
                    El equipo CIIEMAD-IPN verifica primero los datos técnicos.
                  </p>
                </div>
              </form>

              <!-- PASO 2 — Documento (BLOQUEADO, espera verificación admin) -->
              <div v-else-if="currentStep === 2" class="space-y-5">
                <div
                  class="rounded-xl border-l-4 border-accent bg-accent/5 p-5"
                  role="status"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 animate-pulse"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-bold text-accent-dark">
                        Datos técnicos recibidos · esperando verificación
                      </p>
                      <p class="mt-1 text-sm leading-relaxed text-ink">
                        El equipo CIIEMAD-IPN revisará la información que nos
                        compartiste. Cuando los datos técnicos sean validados, te
                        enviaremos un correo a
                        <strong class="text-ink">{{ form.email || "tu correo" }}</strong>
                        con un enlace seguro para subir el documento o imagen de
                        respaldo.
                      </p>
                      <p
                        v-if="referenciaAporte"
                        class="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-[11px] font-mono text-ink-muted shadow-sm"
                      >
                        Referencia:
                        <span class="font-semibold text-ink">{{ referenciaAporte }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Por qué este orden -->
                <div class="rounded-xl border border-gray-200 bg-surface p-5">
                  <p class="text-xs font-bold uppercase tracking-wider text-primary">
                    ¿Por qué este orden?
                  </p>
                  <p class="mt-2 text-sm leading-relaxed text-ink-muted">
                    Pedimos el documento de respaldo solo después de verificar los
                    datos técnicos para evitar acumular archivos que después serían
                    descartados. Esto mantiene la plataforma ligera y respetuosa con
                    tu tiempo y nuestro almacenamiento.
                  </p>
                </div>

                <!-- Qué incluir cuando llegue el correo -->
                <div class="rounded-xl border border-gray-200 bg-white p-5">
                  <p class="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Cuando recibas el correo, podrás adjuntar
                  </p>
                  <ul class="mt-3 space-y-1.5 text-sm text-ink-muted">
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-eco" />
                      Fotografías de la azotea o muros verdes
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-eco" />
                      Planos, dictámenes técnicos o esquemas
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-eco" />
                      Mediciones, datasets o reportes técnicos
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-eco" />
                      Cualquier documento que respalde tu aporte
                    </li>
                  </ul>
                </div>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button type="button" class="btn-primary" @click="irAPaso3">
                    Entendido, continuar
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
                  </button>
                </div>
              </div>

              <!-- PASO 3 — Confirmación -->
              <div v-else-if="currentStep === 3" class="space-y-5">
                <div
                  class="rounded-xl border-l-4 border-eco bg-eco/5 p-5"
                  role="status"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-eco/20 text-eco-dark"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-bold text-eco-dark">
                        ¡Listo! Aporte registrado correctamente
                      </p>
                      <p class="mt-1 text-sm leading-relaxed text-ink">
                        Tu aporte entró a la cola de revisión del CIIEMAD-IPN.
                        Recibirás un correo en
                        <strong class="text-ink">{{ form.email || "tu correo" }}</strong>
                        con los siguientes pasos en cuanto se verifiquen los datos
                        técnicos.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div class="rounded-lg border border-gray-200 bg-white p-4">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-primary">
                      1 · Verificación técnica
                    </p>
                    <p class="mt-1 text-xs leading-relaxed text-ink-muted">
                      El equipo revisa los datos que enviaste.
                    </p>
                  </div>
                  <div class="rounded-lg border border-gray-200 bg-white p-4">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-primary">
                      2 · Correo con enlace
                    </p>
                    <p class="mt-1 text-xs leading-relaxed text-ink-muted">
                      Si los datos son válidos, te pediremos el documento de
                      respaldo.
                    </p>
                  </div>
                  <div class="rounded-lg border border-gray-200 bg-white p-4">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-primary">
                      3 · Publicación
                    </p>
                    <p class="mt-1 text-xs leading-relaxed text-ink-muted">
                      Una vez validado, se incorpora al inventario público.
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button type="button" class="btn-outline" @click="reiniciarFormulario">
                    Hacer otro aporte
                  </button>
                  <NuxtLink to="/inventario" class="btn-primary">
                    Explorar inventario
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Cierre / nota final -->
      <section class="reveal">
        <div
          class="overflow-hidden rounded-2xl border-l-4 border-eco bg-eco/5 p-6 md:p-8"
        >
          <p class="text-sm leading-relaxed text-ink">
            <strong class="text-eco-dark">Una nota desde el equipo:</strong>
            este observatorio es una plataforma viva. Si encuentras un dato que
            no cuadra, una azotea que falta o una referencia que debe
            reconocerse, escríbenos. La calidad del inventario depende de la
            atención compartida de la red.
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
