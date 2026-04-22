function useFormatters() {
  const numberFmt = new Intl.NumberFormat("es-MX", {
    maximumFractionDigits: 0
  });
  const numberFmtDecimals = new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  });
  const percentFmt = new Intl.NumberFormat("es-MX", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
  const dateFmt = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const dateFmtShort = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  function formatNumber(value, decimals = false) {
    return decimals ? numberFmtDecimals.format(value) : numberFmt.format(value);
  }
  function formatArea(m2) {
    return `${numberFmt.format(m2)} m²`;
  }
  function formatPercent(value) {
    const normalized = value > 1 ? value / 100 : value;
    return percentFmt.format(normalized);
  }
  function formatDate(value, short = false) {
    const date = typeof value === "string" ? /* @__PURE__ */ new Date(value + "T00:00:00") : value;
    if (isNaN(date.getTime())) return String(value);
    return short ? dateFmtShort.format(date) : dateFmt.format(date);
  }
  function formatScore(score) {
    const text = `${numberFmt.format(Math.round(score))}/100`;
    let colorClass;
    if (score >= 80) {
      colorClass = "text-green-600 dark:text-green-400";
    } else if (score >= 60) {
      colorClass = "text-yellow-600 dark:text-yellow-400";
    } else {
      colorClass = "text-red-600 dark:text-red-400";
    }
    return { text, colorClass };
  }
  function formatTipoEdificio(tipo) {
    if (!tipo) return "Sin tipo";
    const map = {
      hospital: "Hospital",
      mercado: "Mercado",
      supermercado: "Supermercado",
      centro_comercial: "Centro comercial",
      oficinas: "Oficinas",
      residencial: "Residencial",
      educativo: "Educativo",
      gobierno: "Gobierno",
      cultural: "Cultural",
      industrial: "Industrial"
    };
    return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, " ");
  }
  function formatTipoTecho(tipo) {
    if (!tipo) return "Sin tipo";
    const map = {
      extensivo: "Extensivo",
      intensivo: "Intensivo",
      "semi-intensivo": "Semi-intensivo"
    };
    return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
  }
  function formatEstadoTecho(estado) {
    if (!estado) return "Sin estado";
    const map = {
      activo: "Activo",
      en_mantenimiento: "En mantenimiento",
      inactivo: "Inactivo",
      nuevo: "Nuevo"
    };
    return map[estado] || estado.charAt(0).toUpperCase() + estado.slice(1).replace(/_/g, " ");
  }
  function formatEstatus(estatus) {
    if (!estatus) return "Sin estatus";
    const map = {
      candidato: "Candidato",
      validado_visualmente: "Validado visualmente",
      factibilidad_pendiente: "Factibilidad pendiente",
      piloto: "Piloto",
      implementado: "Implementado"
    };
    return map[estatus] || estatus.charAt(0).toUpperCase() + estatus.slice(1).replace(/_/g, " ");
  }
  function formatConfianza(confianza) {
    if (!confianza) return "Sin datos";
    const map = {
      alta: "Alta",
      media: "Media",
      baja: "Baja"
    };
    return map[confianza] || confianza;
  }
  function formatEstadoValidacion(estado) {
    if (!estado) return "Sin estado";
    const map = {
      pendiente: "Pendiente",
      confirmado: "Confirmado",
      rechazado: "Rechazado",
      indeterminado: "Indeterminado",
      pendiente_conciliacion: "Pend. conciliación"
    };
    return map[estado] || estado;
  }
  function scoreColor(score) {
    if (score >= 80) return "#0E5E3A";
    if (score >= 60) return "#79C141";
    if (score >= 40) return "#F2A81D";
    if (score >= 20) return "#F97316";
    return "#D9363E";
  }
  function kpiColor(color) {
    const map = {
      primary: "text-primary",
      eco: "text-eco",
      secondary: "text-secondary",
      accent: "text-accent"
    };
    return map[color] || "text-ink";
  }
  function estadoTechoBadgeClass(estado) {
    if (!estado) return "bg-gray-100 text-ink-muted";
    const map = {
      activo: "bg-eco/10 text-eco-dark",
      en_mantenimiento: "bg-accent/10 text-accent-dark",
      inactivo: "bg-alert/10 text-alert-dark",
      nuevo: "bg-secondary/10 text-secondary-dark"
    };
    return map[estado] || "bg-gray-100 text-ink-muted";
  }
  function estatusBadgeClass(estatus) {
    if (!estatus) return "bg-gray-100 text-ink-muted";
    const map = {
      candidato: "bg-accent/10 text-accent-dark",
      validado_visualmente: "bg-secondary/10 text-secondary-dark",
      factibilidad_pendiente: "bg-primary-50 text-primary",
      piloto: "bg-eco/10 text-eco-dark",
      implementado: "bg-eco/20 text-eco-dark"
    };
    return map[estatus] || "bg-gray-100 text-ink-muted";
  }
  function confianzaBadgeClass(confianza) {
    if (!confianza) return "bg-gray-100 text-ink-muted";
    const map = {
      alta: "bg-eco/10 text-eco-dark",
      media: "bg-accent/10 text-accent-dark",
      baja: "bg-alert/10 text-alert-dark"
    };
    return map[confianza] || "bg-gray-100 text-ink-muted";
  }
  function estadoValidacionBadgeClass(estado) {
    if (!estado) return "bg-gray-100 text-ink-muted";
    const map = {
      pendiente: "bg-accent/10 text-accent-dark",
      confirmado: "bg-eco/10 text-eco-dark",
      rechazado: "bg-alert/10 text-alert-dark",
      indeterminado: "bg-gray-100 text-ink-muted",
      pendiente_conciliacion: "bg-secondary/10 text-secondary-dark"
    };
    return map[estado] || "bg-gray-100 text-ink-muted";
  }
  function formatTipoEstructura(tipo) {
    if (!tipo) return "Sin datos";
    const map = {
      concreto_armado: "Concreto armado",
      acero: "Acero",
      mamposteria_confinada: "Mampostería confinada",
      mamposteria_simple: "Mampostería simple",
      lamina: "Lámina",
      madera: "Madera",
      mixta: "Mixta",
      desconocido: "Desconocido"
    };
    return map[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, " ");
  }
  function formatEstadoEstructural(estado) {
    if (!estado) return "Sin datos";
    const map = {
      seguro: "Seguro",
      dano_menor: "Daño menor",
      dano_mayor: "Daño mayor",
      sin_dictamen: "Sin dictamen"
    };
    return map[estado] || estado.charAt(0).toUpperCase() + estado.slice(1).replace(/_/g, " ");
  }
  function formatMaterialTechumbre(material) {
    if (!material) return "Sin datos";
    const map = {
      losa_concreto: "Losa de concreto",
      vigueta_bovedilla: "Vigueta y bovedilla",
      losacero: "Losacero",
      lamina_metalica: "Lámina metálica",
      lamina_asbesto: "Lámina asbesto",
      madera_teja: "Madera y teja",
      desconocido: "Desconocido"
    };
    return map[material] || material.charAt(0).toUpperCase() + material.slice(1).replace(/_/g, " ");
  }
  function formatNivelPrefactibilidad(nivel) {
    if (!nivel) return "Sin datos";
    const map = {
      prefactible: "Pre-factible",
      requiere_evaluacion: "Requiere evaluación",
      no_recomendado: "No recomendado"
    };
    return map[nivel] || nivel;
  }
  function prefactibilidadBadgeClass(nivel) {
    if (!nivel) return "bg-gray-100 text-ink-muted";
    const map = {
      prefactible: "bg-eco/10 text-eco-dark",
      requiere_evaluacion: "bg-accent/10 text-accent-dark",
      no_recomendado: "bg-alert/10 text-alert-dark"
    };
    return map[nivel] || "bg-gray-100 text-ink-muted";
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
    prefactibilidadBadgeClass
  };
}
export {
  useFormatters as u
};
//# sourceMappingURL=useFormatters-BCDq8oux.js.map
