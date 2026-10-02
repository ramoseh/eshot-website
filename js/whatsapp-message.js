function waMoney(value) {
  return value.toLocaleString("es-MX");
}

function waDrinkLabel(config, id) {
  const found = config.drinks.filter(function (d) {
    return d.id === id;
  })[0];
  return found ? found.label : id;
}

function waOrigin() {
  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.resolveOrigin === "function"
  ) {
    const search =
      typeof globalThis.location !== "undefined" && globalThis.location
        ? globalThis.location.search
        : "";
    return globalThis.resolveOrigin(search);
  }
  return "web";
}

function buildQuoteMessage(estimate, config) {
  const guestsText = estimate.guestsIsPlus
    ? estimate.guests + " o más"
    : String(estimate.guests);
  const drinkText = estimate.drinks
    .map(function (id) {
      return waDrinkLabel(config, id);
    })
    .join(", ");
  const bottleText =
    estimate.bottleRanges.length > 0
      ? estimate.bottleRanges
          .map(function (range) {
            return (
              waDrinkLabel(config, range.category) +
              " " +
              range.minBottles +
              "–" +
              range.maxBottles
            );
          })
          .join("; ")
      : "sin conteo de botellas";
  const max = estimate.investmentOpenEnded
    ? "$" + waMoney(estimate.investmentMax) + "+"
    : "$" + waMoney(estimate.investmentMax);

  const lines = [
    "Hola, quiero una cotización para mi evento.",
    "Invitados: " + guestsText,
    "Duración: " + estimate.hours + " h",
    "Clima: " + (estimate.climate === "calido" ? "Cálido" : "Templado"),
    "Bebidas: " + drinkText,
    "Gama: " + estimate.tierName,
    "Botellas estimadas: " + bottleText,
    "Inversión estimada: $" + waMoney(estimate.investmentMin) + " a " + max + " MXN",
    "Origen: " + waOrigin(),
  ];

  if (estimate.carajillosRequested) {
    lines.push("Barra de carajillos: sí, cotizar aparte.");
  }

  return lines.join("\n");
}

function buildCatalogMessage(config) {
  return (
    "Hola, quiero ver el catálogo de paquetes para mi evento.\nOrigen: " + waOrigin()
  );
}

function buildTierMessage(tier, config) {
  return (
    "Hola, me interesa el paquete " +
    tier.name +
    " (desde $" +
    waMoney(tier.minPerPerson) +
    " por persona).\nOrigen: " +
    waOrigin()
  );
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildQuoteMessage, buildCatalogMessage, buildTierMessage };
}
