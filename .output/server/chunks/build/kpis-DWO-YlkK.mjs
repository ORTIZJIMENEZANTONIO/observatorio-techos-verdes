const kpiPrimary = [
  {
    label: "Techos verdes registrados",
    valor: 57,
    unidad: "techos",
    icono: "leaf",
    color: "primary",
    cambio: "+8 en 2024"
  },
  {
    label: "Superficie total cubierta",
    valor: "98,430",
    unidad: "m\xB2",
    icono: "area",
    color: "eco",
    cambio: "+12,600 m\xB2"
  },
  {
    label: "Candidatos priorizados",
    valor: 60,
    unidad: "sitios",
    icono: "target",
    color: "secondary",
    cambio: "+15 nuevos"
  },
  {
    label: "Validaciones IA realizadas",
    valor: 30,
    unidad: "revisiones",
    icono: "ai",
    color: "accent",
    cambio: "87% precisi\xF3n"
  }
];
const kpiSecondary = [
  {
    label: "Alcald\xEDas con techos verdes",
    valor: 14,
    unidad: "de 16",
    icono: "map",
    color: "primary"
  },
  {
    label: "Variables del modelo",
    valor: 8,
    unidad: "variables",
    icono: "chart",
    color: "secondary"
  },
  {
    label: "Score promedio candidatos",
    valor: 81.5,
    unidad: "pts",
    icono: "score",
    color: "eco",
    cambio: "+3.2 vs anterior"
  },
  {
    label: "Pilotos activos",
    valor: 4,
    unidad: "proyectos",
    icono: "pilot",
    color: "accent",
    cambio: "+2 en Q1"
  }
];
const kpiData = [...kpiPrimary, ...kpiSecondary];

export { kpiData as k };
//# sourceMappingURL=kpis-DWO-YlkK.mjs.map
