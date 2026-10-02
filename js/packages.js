(function () {
  if (typeof quoteConfig === "undefined" || typeof buildTierMessage !== "function") {
    return;
  }

  function waHref(message) {
    return (
      "https://wa.me/" +
      quoteConfig.whatsappPhone +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  const catalog = document.getElementById("catalog-cta");
  if (catalog) {
    catalog.href = waHref(buildCatalogMessage(quoteConfig));
    catalog.target = "_blank";
    catalog.rel = "noopener noreferrer";
  }

  document.querySelectorAll("[data-tier-id]").forEach(function (link) {
    const tier = quoteConfig.tiers.filter(function (t) {
      return t.id === link.getAttribute("data-tier-id");
    })[0];
    if (tier) {
      link.href = waHref(buildTierMessage(tier, quoteConfig));
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
})();
