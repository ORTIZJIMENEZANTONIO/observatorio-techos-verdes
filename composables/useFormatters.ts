/**
 * Composable that provides locale-aware formatting utilities for the
 * Observatorio de Techos Verdes dashboard.
 *
 * All numeric formatting targets the es-MX locale so that thousands are
 * separated with commas and decimals with dots, matching Mexican convention.
 */
export function useFormatters() {
  // ---------------------------------------------------------------------------
  // Internal locale formatter instances (created once per composable call)
  // ---------------------------------------------------------------------------
  const numberFmt = new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: 0,
  })

  const numberFmtDecimals = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })

  const percentFmt = new Intl.NumberFormat('es-MX', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })

  const dateFmt = new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const dateFmtShort = new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // ---------------------------------------------------------------------------
  // Public helpers
  // ---------------------------------------------------------------------------

  /**
   * Format a number using the es-MX locale (e.g. 1,200).
   * Optionally allows decimal places.
   */
  function formatNumber(value: number, decimals = false): string {
    return decimals ? numberFmtDecimals.format(value) : numberFmt.format(value)
  }

  /**
   * Format a surface area value in square metres.
   * Example: 1200 -> "1,200 m\u00B2"
   */
  function formatArea(m2: number): string {
    return `${numberFmt.format(m2)} m\u00B2`
  }

  /**
   * Format a value as a percentage.
   * Input is expected as a decimal (0.85) or a whole number (85).
   * If the value is greater than 1 it is treated as an already-multiplied
   * percentage and divided by 100 before formatting.
   */
  function formatPercent(value: number): string {
    const normalized = value > 1 ? value / 100 : value
    return percentFmt.format(normalized)
  }

  /**
   * Format an ISO date string (or Date) in Spanish long format.
   * Example: "2024-03-15" -> "15 de marzo de 2024"
   */
  function formatDate(value: string | Date, short = false): string {
    const date = typeof value === 'string' ? new Date(value + 'T00:00:00') : value
    if (isNaN(date.getTime())) return String(value)
    return short ? dateFmtShort.format(date) : dateFmt.format(date)
  }

  /**
   * Format an aptitud score (0-100) and return both the formatted string and
   * a Tailwind-compatible colour class for visual indication.
   *
   * Ranges:
   *   80-100 -> green  (alta aptitud)
   *   60-79  -> yellow (media aptitud)
   *   0-59   -> red    (baja aptitud)
   */
  function formatScore(score: number): { text: string; colorClass: string } {
    const text = `${numberFmt.format(Math.round(score))}/100`

    let colorClass: string
    if (score >= 80) {
      colorClass = 'text-green-600 dark:text-green-400'
    } else if (score >= 60) {
      colorClass = 'text-yellow-600 dark:text-yellow-400'
    } else {
      colorClass = 'text-red-600 dark:text-red-400'
    }

    return { text, colorClass }
  }

  // ---------------------------------------------------------------------------
  // Domain-specific label formatters
  // ---------------------------------------------------------------------------

  function formatTipoEdificio(tipo: string): string {
    if (!tipo) return 'Sin tipo'
    const map: Record<string, string> = {
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
    return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, ' ')
  }

  function formatTipoTecho(tipo: string): string {
    if (!tipo) return 'Sin tipo'
    const map: Record<string, string> = {
      extensivo: 'Extensivo',
      intensivo: 'Intensivo',
      'semi-intensivo': 'Semi-intensivo',
    }
    return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1)
  }

  function formatEstadoTecho(estado: string): string {
    if (!estado) return 'Sin estado'
    const map: Record<string, string> = {
      activo: 'Activo',
      en_mantenimiento: 'En mantenimiento',
      inactivo: 'Inactivo',
      nuevo: 'Nuevo',
    }
    return map[estado] || estado.charAt(0).toUpperCase() + estado.slice(1).replace(/_/g, ' ')
  }

  function formatEstatus(estatus: string): string {
    if (!estatus) return 'Sin estatus'
    const map: Record<string, string> = {
      candidato: 'Candidato',
      validado_visualmente: 'Validado visualmente',
      factibilidad_pendiente: 'Factibilidad pendiente',
      piloto: 'Piloto',
      implementado: 'Implementado',
    }
    return map[estatus] || estatus.charAt(0).toUpperCase() + estatus.slice(1).replace(/_/g, ' ')
  }

  function formatConfianza(confianza: string): string {
    if (!confianza) return 'Sin datos'
    const map: Record<string, string> = {
      alta: 'Alta',
      media: 'Media',
      baja: 'Baja',
    }
    return map[confianza] || confianza
  }

  function formatEstadoValidacion(estado: string): string {
    if (!estado) return 'Sin estado'
    const map: Record<string, string> = {
      pendiente: 'Pendiente',
      confirmado: 'Confirmado',
      rechazado: 'Rechazado',
      indeterminado: 'Indeterminado',
      pendiente_conciliacion: 'Pend. conciliación',
    }
    return map[estado] || estado
  }

  // ---------------------------------------------------------------------------
  // Color helpers
  // ---------------------------------------------------------------------------

  /** 5-tier hex color for aptitud scores (0-100) */
  function scoreColor(score: number): string {
    if (score >= 80) return '#0E5E3A'
    if (score >= 60) return '#79C141'
    if (score >= 40) return '#F2A81D'
    if (score >= 20) return '#F97316'
    return '#D9363E'
  }

  function kpiColor(color: string): string {
    const map: Record<string, string> = {
      primary: 'text-primary',
      eco: 'text-eco',
      secondary: 'text-secondary',
      accent: 'text-accent',
    }
    return map[color] || 'text-ink'
  }

  // ---------------------------------------------------------------------------
  // Badge class helpers
  // ---------------------------------------------------------------------------

  function estadoTechoBadgeClass(estado: string): string {
    if (!estado) return 'bg-gray-100 text-ink-muted'
    const map: Record<string, string> = {
      activo: 'bg-eco/10 text-eco-dark',
      en_mantenimiento: 'bg-accent/10 text-accent-dark',
      inactivo: 'bg-alert/10 text-alert-dark',
      nuevo: 'bg-secondary/10 text-secondary-dark',
    }
    return map[estado] || 'bg-gray-100 text-ink-muted'
  }

  function estatusBadgeClass(estatus: string): string {
    if (!estatus) return 'bg-gray-100 text-ink-muted'
    const map: Record<string, string> = {
      candidato: 'bg-accent/10 text-accent-dark',
      validado_visualmente: 'bg-secondary/10 text-secondary-dark',
      factibilidad_pendiente: 'bg-primary-50 text-primary',
      piloto: 'bg-eco/10 text-eco-dark',
      implementado: 'bg-eco/20 text-eco-dark',
    }
    return map[estatus] || 'bg-gray-100 text-ink-muted'
  }

  function confianzaBadgeClass(confianza: string): string {
    if (!confianza) return 'bg-gray-100 text-ink-muted'
    const map: Record<string, string> = {
      alta: 'bg-eco/10 text-eco-dark',
      media: 'bg-accent/10 text-accent-dark',
      baja: 'bg-alert/10 text-alert-dark',
    }
    return map[confianza] || 'bg-gray-100 text-ink-muted'
  }

  function estadoValidacionBadgeClass(estado: string): string {
    if (!estado) return 'bg-gray-100 text-ink-muted'
    const map: Record<string, string> = {
      pendiente: 'bg-accent/10 text-accent-dark',
      confirmado: 'bg-eco/10 text-eco-dark',
      rechazado: 'bg-alert/10 text-alert-dark',
      indeterminado: 'bg-gray-100 text-ink-muted',
      pendiente_conciliacion: 'bg-secondary/10 text-secondary-dark',
    }
    return map[estado] || 'bg-gray-100 text-ink-muted'
  }

  // ---------------------------------------------------------------------------
  // Structural feasibility formatters
  // ---------------------------------------------------------------------------

  function formatTipoEstructura(tipo: string): string {
    if (!tipo) return 'Sin datos'
    const map: Record<string, string> = {
      concreto_armado: 'Concreto armado',
      acero: 'Acero',
      mamposteria_confinada: 'Mampostería confinada',
      mamposteria_simple: 'Mampostería simple',
      lamina: 'Lámina',
      madera: 'Madera',
      mixta: 'Mixta',
      desconocido: 'Desconocido',
    }
    return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, ' ')
  }

  function formatEstadoEstructural(estado: string): string {
    if (!estado) return 'Sin datos'
    const map: Record<string, string> = {
      seguro: 'Seguro',
      dano_menor: 'Daño menor',
      dano_mayor: 'Daño mayor',
      sin_dictamen: 'Sin dictamen',
    }
    return map[estado] || estado.charAt(0).toUpperCase() + estado.slice(1).replace(/_/g, ' ')
  }

  function formatMaterialTechumbre(material: string): string {
    if (!material) return 'Sin datos'
    const map: Record<string, string> = {
      losa_concreto: 'Losa de concreto',
      vigueta_bovedilla: 'Vigueta y bovedilla',
      losacero: 'Losacero',
      lamina_metalica: 'Lámina metálica',
      lamina_asbesto: 'Lámina asbesto',
      madera_teja: 'Madera y teja',
      desconocido: 'Desconocido',
    }
    return map[material] || material.charAt(0).toUpperCase() + material.slice(1).replace(/_/g, ' ')
  }

  function formatNivelPrefactibilidad(nivel: string): string {
    if (!nivel) return 'Sin datos'
    const map: Record<string, string> = {
      prefactible: 'Pre-factible',
      requiere_evaluacion: 'Requiere evaluación',
      no_recomendado: 'No recomendado',
    }
    return map[nivel] || nivel
  }

  function prefactibilidadBadgeClass(nivel: string): string {
    if (!nivel) return 'bg-gray-100 text-ink-muted'
    const map: Record<string, string> = {
      prefactible: 'bg-eco/10 text-eco-dark',
      requiere_evaluacion: 'bg-accent/10 text-accent-dark',
      no_recomendado: 'bg-alert/10 text-alert-dark',
    }
    return map[nivel] || 'bg-gray-100 text-ink-muted'
  }

  return {
    formatNumber,
    formatArea,
    formatPercent,
    formatDate,
    formatScore,
    // Domain label formatters
    formatTipoEdificio,
    formatTipoTecho,
    formatEstadoTecho,
    formatEstatus,
    formatConfianza,
    formatEstadoValidacion,
    // Color helpers
    scoreColor,
    kpiColor,
    // Badge class helpers
    estadoTechoBadgeClass,
    estatusBadgeClass,
    confianzaBadgeClass,
    estadoValidacionBadgeClass,
    // Structural feasibility formatters
    formatTipoEstructura,
    formatEstadoEstructural,
    formatMaterialTechumbre,
    formatNivelPrefactibilidad,
    prefactibilidadBadgeClass,
  }
}
