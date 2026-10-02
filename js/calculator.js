(function () {
  if (typeof quoteConfig === "undefined" || typeof estimateQuote === "undefined") {
    return;
  }

  const root = document.getElementById("calculadora");
  if (!root) {
    return;
  }

  const state = {
    step: 1,
    guests: null,
    guestsIsPlus: false,
    hours: quoteConfig.defaultHours,
    climate: "templado",
    drinks: [],
    tierId: null,
  };

  const guestOptions = document.getElementById("guest-options");
  const guestCustomWrap = document.getElementById("guest-custom-wrap");
  const guestsCustom = document.getElementById("guests-custom");
  const hoursInput = document.getElementById("hours");
  const drinkOptions = document.getElementById("drink-options");
  const tierOptions = document.getElementById("tier-options");
  const resultBox = document.getElementById("quote-result");
  const whatsappLink = document.getElementById("quote-whatsapp");
  const errorBox = document.getElementById("calc-error");
  const prevBtn = document.getElementById("calc-prev");
  const nextBtn = document.getElementById("calc-next");

  const ingotClasses =
    "guest-option px-3 py-2 rounded-lg border border-zinc-700 text-sm font-semibold text-gray-200 hover:border-teal transition-colors";
  const ingotActive =
    "guest-option px-3 py-2 rounded-lg border border-teal bg-teal/10 text-sm font-semibold text-teal";
  const tierCard =
    "tier-option w-full text-left p-4 rounded-xl border border-zinc-700 hover:border-teal transition-colors";
  const tierCardActive =
    "tier-option w-full text-left p-4 rounded-xl border border-teal bg-teal/10 transition-colors";

  function money(value) {
    return value.toLocaleString("es-MX");
  }

  function drinkLabel(id) {
    const found = quoteConfig.drinks.filter(function (d) {
      return d.id === id;
    })[0];
    return found ? found.label : id;
  }

  function renderGuests() {
    guestOptions.innerHTML = "";
    const buckets = quoteConfig.guestBuckets.concat(["300+"]);
    buckets.forEach(function (bucket) {
      const button = document.createElement("button");
      button.type = "button";
      const isPlus = bucket === "300+";
      const value = isPlus ? quoteConfig.guestPlusMinimum : bucket;
      const active = state.guests === value && state.guestsIsPlus === isPlus;
      button.className = active ? ingotActive : ingotClasses;
      button.textContent = String(bucket);
      button.addEventListener("click", function () {
        state.guests = value;
        state.guestsIsPlus = isPlus;
        guestCustomWrap.classList.toggle("hidden", !isPlus);
        if (isPlus && guestsCustom) {
          guestsCustom.value = "";
        }
        renderGuests();
      });
      guestOptions.appendChild(button);
    });
  }

  function renderDrinks() {
    drinkOptions.innerHTML = "";
    quoteConfig.drinks.forEach(function (drink) {
      const label = document.createElement("label");
      label.className =
        "flex items-center gap-3 p-3 rounded-lg border border-zinc-700 cursor-pointer hover:border-teal transition-colors";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = drink.id;
      input.className = "w-4 h-4 accent-teal";
      input.checked = state.drinks.indexOf(drink.id) !== -1;
      input.addEventListener("change", function () {
        if (input.checked) {
          if (state.drinks.indexOf(drink.id) === -1) {
            state.drinks.push(drink.id);
          }
        } else {
          state.drinks = state.drinks.filter(function (id) {
            return id !== drink.id;
          });
        }
      });
      const span = document.createElement("span");
      span.className = "text-sm text-gray-200";
      span.textContent = drink.label;
      label.appendChild(input);
      label.appendChild(span);
      drinkOptions.appendChild(label);
    });
  }

  function renderTiers() {
    tierOptions.innerHTML = "";
    quoteConfig.tiers.forEach(function (tier) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = state.tierId === tier.id ? tierCardActive : tierCard;
      const max = tier.openEnded ? "$" + tier.maxPerPerson + "+" : "$" + tier.maxPerPerson;
      button.innerHTML =
        '<span class="block font-serif text-lg font-bold text-white">' +
        tier.name +
        '</span><span class="block text-teal text-sm mt-1">desde $' +
        tier.minPerPerson +
        " hasta " +
        max +
        " por persona</span>" +
        '<span class="block text-gray-400 text-xs mt-1">' +
        tier.excludes +
        "</span>";
      button.addEventListener("click", function () {
        state.tierId = tier.id;
        renderTiers();
      });
      tierOptions.appendChild(button);
    });
  }

  function collectInput() {
    let guests = state.guests;
    let guestsIsPlus = state.guestsIsPlus;
    if (guestsIsPlus && guestsCustom && guestsCustom.value !== "") {
      guests = Number(guestsCustom.value);
      guestsIsPlus = false;
    }
    return {
      guests: guests,
      guestsIsPlus: guestsIsPlus,
      hours: Number(hoursInput.value),
      climate: state.climate,
      drinks: state.drinks.slice(),
      tierId: state.tierId,
    };
  }

  function showStep(step) {
    state.step = step;
    [1, 2, 3, 4].forEach(function (n) {
      document
        .getElementById("calc-step-" + n)
        .classList.toggle("hidden", n !== step);
      const dot = document.querySelector('[data-step-dot="' + n + '"]');
      if (dot) {
        dot.classList.toggle("bg-teal", n <= step);
        dot.classList.toggle("text-black", n <= step);
        dot.classList.toggle("bg-zinc-800", n > step);
        dot.classList.toggle("text-gray-400", n > step);
      }
    });
    prevBtn.classList.toggle("invisible", step === 1);
    nextBtn.classList.toggle("hidden", step === 4);
    errorBox.classList.add("hidden");

    if (step === 4) {
      renderResult();
    }
  }

  function renderResult() {
    const input = collectInput();
    const estimate = estimateQuote(input, quoteConfig);
    if (!estimate.ok) {
      errorBox.textContent = estimate.errors.join(". ");
      errorBox.classList.remove("hidden");
      resultBox.innerHTML = "";
      whatsappLink.classList.add("hidden");
      return;
    }

    whatsappLink.classList.remove("hidden");

    const guestsText = estimate.guestsIsPlus
      ? estimate.guests + " o más"
      : String(estimate.guests);
    const rows = estimate.bottleRanges
      .map(function (range) {
        return (
          '<li class="flex justify-between gap-4 py-1"><span class="text-gray-300">' +
          drinkLabel(range.category) +
          '</span><span class="text-white font-semibold">' +
          range.minBottles +
          "–" +
          range.maxBottles +
          " botellas</span></li>"
        );
      })
      .join("");
    const bottlesText =
      estimate.bottleRanges.length > 0
        ? '<ul class="mt-3 border-t border-zinc-800 pt-3">' + rows + "</ul>"
        : '<p class="text-gray-400 text-sm mt-3">Sin conteo de botellas.</p>';

    const maxLabel = estimate.investmentOpenEnded
      ? "$" + money(estimate.investmentMax) + "+"
      : "$" + money(estimate.investmentMax);

    resultBox.innerHTML =
      '<p class="text-gray-300 text-sm">Para ' +
      guestsText +
      " invitados, " +
      estimate.hours +
      " horas, clima " +
      (estimate.climate === "calido" ? "cálido" : "templado") +
      ":</p>" +
      bottlesText +
      '<p class="mt-4 text-lg text-white font-bold">Inversión estimada: $' +
      money(estimate.investmentMin) +
      " a " +
      maxLabel +
      " MXN</p>" +
      '<p class="mt-2 text-xs text-gray-500">' +
      quoteConfig.copy.estimateDisclaimer +
      "</p>" +
      (estimate.carajillosRequested
        ? '<p class="mt-1 text-xs text-gray-400">' +
          quoteConfig.copy.carajillosNote +
          "</p>"
        : "") +
      (estimate.guestsIsPlus
        ? '<p class="mt-1 text-xs text-gray-400">' +
          quoteConfig.copy.guestsPlusNote +
          "</p>"
        : "");

    whatsappLink.href =
      "https://wa.me/" +
      quoteConfig.whatsappPhone +
      "?text=" +
      encodeURIComponent(buildMessage(estimate));
  }

  function buildMessage(estimate) {
    if (typeof buildQuoteMessage === "function") {
      return buildQuoteMessage(estimate, quoteConfig);
    }
    return "Hola, quiero una cotización para mi evento.";
  }

  prevBtn.addEventListener("click", function () {
    if (state.step > 1) {
      showStep(state.step - 1);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (state.step === 1) {
      const input = collectInput();
      const check = estimateQuote(
        Object.assign({}, input, { drinks: ["tequila"], tierId: "fiesta" }),
        quoteConfig
      );
      const ownErrors = [];
      if (!check.ok) {
        check.errors.forEach(function (error) {
          if (
            error.indexOf("drinks") === -1 &&
            error.indexOf("tierId") === -1
          ) {
            ownErrors.push(error);
          }
        });
      }
      if (ownErrors.length > 0) {
        errorBox.textContent = ownErrors.join(". ");
        errorBox.classList.remove("hidden");
        return;
      }
    }
    if (state.step < 4) {
      showStep(state.step + 1);
    }
  });

  document.querySelectorAll('input[name="climate"]').forEach(function (input) {
    input.addEventListener("change", function () {
      state.climate = input.value;
    });
  });

  renderGuests();
  renderDrinks();
  renderTiers();
  showStep(1);
})();
