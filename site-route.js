(() => {
  function stripGroupPrefix(label, prefix) {
    const text = String(label || "").trim();
    const stripped = text.replace(new RegExp(`^${prefix}\\s+`, "i"), "");
    if (!stripped) {
      return text || prefix;
    }
    return stripped.charAt(0).toUpperCase() + stripped.slice(1);
  }

  function routeKey(value) {
    return String(value || "").trim().toLowerCase();
  }

  function pageHref(label) {
    return `index.html?sheet=${encodeURIComponent(label)}`;
  }

  function addRoute(routes, route, aliases) {
    for (const alias of aliases) {
      const key = routeKey(alias);
      if (key && !routes.has(key)) {
        routes.set(key, route);
      }
    }
  }

  function buildRoutes() {
    const routes = new Map();
    addRoute(routes, { section: "table", label: "Table" }, ["Table", ""]);

    const hisData = window.HIS_SHEETS;
    for (const sheet of hisData?.sheets || []) {
      const name = sheet.name;
      const fullLabel = sheet.label || name;
      const label = stripGroupPrefix(fullLabel, "HIS");
      addRoute(
        routes,
        { section: "his", sheetName: name, label },
        [label, fullLabel, name]
      );
    }

    const ncprData = window.NCPR_SHEETS;
    for (const id of ncprData?.ncpr_sheets || []) {
      const fullLabel = ncprData.ncpr_sheet_labels?.[id] || id;
      const label = stripGroupPrefix(fullLabel, "NCPR");
      addRoute(
        routes,
        { section: "ncpr", sheetId: id, label },
        [label, fullLabel, id]
      );
    }

    const bdaData = window.BDA_SHEETS;
    for (const id of bdaData?.bda_sheets || []) {
      const fullLabel = bdaData.bda_sheet_labels?.[id] || id;
      const label = stripGroupPrefix(fullLabel, "BDA");
      addRoute(
        routes,
        { section: "bda", sheetId: id, label },
        [label, fullLabel, id]
      );
    }

    const emaData = window.EMA_SHEETS;
    for (const id of emaData?.ema_sheets || []) {
      const fullLabel = emaData.ema_sheet_labels?.[id] || id;
      const label = stripGroupPrefix(fullLabel, "EMA");
      addRoute(
        routes,
        { section: "ema", sheetId: id, label },
        [label, fullLabel, id]
      );
    }

    return routes;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedSheet = params.get("sheet") || "Table";
  const routes = buildRoutes();
  window.vaccineButtonLabel = stripGroupPrefix;
  window.vaccinePageHref = pageHref;
  window.VACCINE_SITE_ROUTE = routes.get(routeKey(requestedSheet)) || routes.get("table");
})();
