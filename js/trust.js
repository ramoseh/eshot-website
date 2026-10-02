(function () {
  if (typeof quoteConfig === "undefined") {
    return;
  }

  const heroCopy = quoteConfig.consignmentPublic
    ? quoteConfig.heroCopy.consignment
    : quoteConfig.heroCopy.fallback;
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  if (heroTitle) {
    heroTitle.textContent = heroCopy.h1;
  }
  if (heroSubtitle) {
    heroSubtitle.textContent = heroCopy.subtitle;
  }

  const claimsBox = document.getElementById("trust-claims");
  if (claimsBox) {
    claimsBox.innerHTML = "";
    quoteConfig.trustClaims
      .filter(function (claim) {
        return !claim.requiresConsignment || quoteConfig.consignmentPublic;
      })
      .forEach(function (claim) {
        const badge = document.createElement("span");
        badge.className =
          "inline-flex items-center gap-1.5 text-xs text-gray-200 border border-teal/40 rounded-full px-3 py-1";
        badge.textContent = claim.text;
        claimsBox.appendChild(badge);
      });
  }

  const approved = quoteConfig.testimonials.filter(function (item) {
    return (
      item.approved === true &&
      item.quote &&
      item.name &&
      item.eventType
    );
  });

  if (approved.length === 0) {
    return;
  }

  const gallery = document.getElementById("galeria");
  if (!gallery) {
    return;
  }

  const section = document.createElement("section");
  section.id = "testimonios";
  section.className = "py-24 bg-black";
  section.innerHTML =
    '<div class="max-w-6xl mx-auto px-6">' +
    '<div class="text-center mb-16">' +
    '<span class="text-teal text-sm font-semibold uppercase tracking-widest">Testimonios</span>' +
    '<h2 class="font-serif text-4xl md:text-5xl font-bold mt-3">Lo que dicen nuestros clientes</h2>' +
    '<div class="w-16 h-1 bg-teal mx-auto mt-6"></div>' +
    "</div>" +
    '<div class="grid md:grid-cols-3 gap-6">' +
    approved
      .slice(0, 5)
      .map(function (item) {
        return (
          '<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">' +
          '<p class="text-gray-300 leading-relaxed">“' +
          item.quote +
          '”</p>' +
          '<p class="mt-4 text-teal font-semibold">' +
          item.name +
          '</p>' +
          '<p class="text-gray-500 text-sm">' +
          item.eventType +
          "</p>" +
          "</div>"
        );
      })
      .join("") +
    "</div>" +
    "</div>";

  gallery.parentNode.insertBefore(section, gallery);
})();
