function resolveOrigin(search) {
  const query = typeof search === "string" ? search : "";
  const params = new URLSearchParams(query);
  const keys = ["utm_content", "origen", "utm_campaign"];

  for (let i = 0; i < keys.length; i += 1) {
    const value = params.get(keys[i]);
    if (value && value.trim() !== "") {
      return value.replace(/[\r\n]+/g, " ").trim().slice(0, 40);
    }
  }

  return "web";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { resolveOrigin };
}
