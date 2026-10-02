function estimateQuote(input, config) {
  const errors = [];
  const data = input || {};

  const allowedDrinks = config.drinks.map(function (d) {
    return d.id;
  });
  const allowedTiers = config.tiers.map(function (t) {
    return t.id;
  });

  const guests = Number(data.guests);
  const hours = Number(data.hours);
  const climate = data.climate;
  const drinks = Array.isArray(data.drinks) ? data.drinks : [];
  const tierId = data.tierId;
  const guestsIsPlus = data.guestsIsPlus === true;

  if (!Number.isInteger(guests) || guests < config.guestBuckets[0]) {
    errors.push("guests: entero mayor o igual a " + config.guestBuckets[0]);
  } else if (guestsIsPlus && guests < config.guestPlusMinimum) {
    errors.push("guests: 300+ requiere al menos " + config.guestPlusMinimum);
  }

  if (!Number.isInteger(hours) || hours < config.hourMin || hours > config.hourMax) {
    errors.push("hours: entero entre " + config.hourMin + " y " + config.hourMax);
  }

  if (climate !== "templado" && climate !== "calido") {
    errors.push("climate: templado o calido");
  }

  if (drinks.length === 0) {
    errors.push("drinks: elige al menos una bebida");
  } else {
    drinks.forEach(function (id) {
      if (allowedDrinks.indexOf(id) === -1) {
        errors.push("drinks: bebida desconocida " + id);
      }
    });
  }

  const tier = config.tiers.filter(function (t) {
    return t.id === tierId;
  })[0];
  if (!tier) {
    errors.push("tierId: gama desconocida");
  }

  if (errors.length > 0) {
    return { ok: false, errors: errors };
  }

  const rate = config.climateRates[climate];
  const barDrinks = guests * hours * rate;

  const selectedBar = drinks.filter(function (id) {
    return Object.prototype.hasOwnProperty.call(config.barWeights, id);
  });
  const weightSum = selectedBar.reduce(function (sum, id) {
    return sum + config.barWeights[id];
  }, 0);

  const bottleRanges = [];
  selectedBar.forEach(function (id) {
    const amount = weightSum > 0 ? (barDrinks * config.barWeights[id]) / weightSum : 0;
    bottleRanges.push({
      category: id,
      unit: "tragos",
      amount: amount,
      minBottles: Math.ceil(amount / config.barYield.alto),
      maxBottles: Math.ceil(amount / config.barYield.bajo),
    });
  });

  if (drinks.indexOf("vino") !== -1) {
    const copas = guests * config.wineGlassesPerGuest;
    bottleRanges.push({
      category: "vino",
      unit: "copas",
      amount: copas,
      minBottles: Math.ceil(copas / config.wineYield.alto),
      maxBottles: Math.ceil(copas / config.wineYield.bajo),
    });
  }

  const carajillosRequested = drinks.indexOf("carajillos") !== -1;

  return {
    ok: true,
    errors: [],
    guests: guests,
    guestsIsPlus: guestsIsPlus,
    hours: hours,
    climate: climate,
    drinks: drinks,
    tierId: tier.id,
    tierName: tier.name,
    barDrinks: weightSum > 0 ? barDrinks : 0,
    bottleRanges: bottleRanges,
    carajillosRequested: carajillosRequested,
    investmentMin: guests * tier.minPerPerson,
    investmentMax: guests * tier.maxPerPerson,
    investmentOpenEnded: tier.openEnded,
    notes: [],
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { estimateQuote };
}
