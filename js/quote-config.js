const quoteConfig = {
  whatsappPhone: "523322430594",
  consignmentPublic: false,
  guestBuckets: [50, 100, 150, 200],
  guestPlusMinimum: 300,
  defaultHours: 5,
  hourMin: 1,
  hourMax: 12,
  climateRates: { templado: 1, calido: 1.5 },
  barWeights: { tequila: 40, whisky: 25, cocteleria: 10 },
  barYield: { alto: 15, bajo: 12 },
  wineGlassesPerGuest: 2,
  wineYield: { alto: 6, bajo: 5 },
  tiers: [
    {
      id: "fiesta",
      name: "Fiesta",
      minPerPerson: 140,
      maxPerPerson: 190,
      openEnded: false,
      excludes: "No incluye barman ni cristalería.",
    },
    {
      id: "distincion",
      name: "Distinción",
      minPerPerson: 220,
      maxPerPerson: 290,
      openEnded: false,
      excludes: "No incluye barman ni cristalería.",
    },
    {
      id: "signature",
      name: "Signature",
      minPerPerson: 350,
      maxPerPerson: 450,
      openEnded: true,
      excludes: "No incluye barman ni cristalería.",
    },
  ],
  testimonials: [],
  trustClaims: [
    {
      id: "marbete",
      text: "100% botellas originales con marbete SAT",
      requiresConsignment: false,
    },
    {
      id: "facturacion",
      text: "Facturación fiscal inmediata",
      requiresConsignment: false,
    },
    {
      id: "consignacion",
      text: "Garantía de consignación 70/30",
      requiresConsignment: true,
    },
  ],
  heroCopy: {
    fallback: {
      h1: "Vinos y licores para eventos en Zapopan y Guadalajara.",
      subtitle:
        "Calcula un rango estimado por persona y cotiza por WhatsApp. Sin precio por botella.",
    },
    consignment: {
      h1: "Vinos y licores para eventos en Zapopan y GDL: solo pagas lo que se consume.",
      subtitle:
        "Calcula tu presupuesto en segundos, asegura tu inventario a consignación 70/30 y despreocúpate por las botellas sobrantes.",
    },
  },
  drinks: [
    { id: "tequila", label: "Tequila" },
    { id: "whisky", label: "Whisky" },
    { id: "vino", label: "Vino de banquete" },
    { id: "cocteleria", label: "Coctelería / cerveza" },
    { id: "carajillos", label: "Barra de carajillos" },
  ],
  copy: {
    estimateDisclaimer: "Estimación educativa, no es una cotización firme.",
    carajillosNote: "Barra de carajillos: sí, cotizar aparte.",
    guestsPlusNote: "Calculado con 300 invitados o más.",
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { quoteConfig };
}
