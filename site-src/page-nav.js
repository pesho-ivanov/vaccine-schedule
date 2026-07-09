(() => {
  const BDA_SOURCE_URL = "https://bda.bg/bg/регистри";
  const EMA_SOURCE_URL = "https://www.ema.europa.eu/en/medicines/download-medicine-data";

  function stripGroupPrefix(label, prefix) {
    const text = String(label || "").trim();
    const stripped = text.replace(new RegExp(`^${prefix}\\s+`, "i"), "");
    if (!stripped) {
      return text || prefix;
    }
    return stripped.charAt(0).toUpperCase() + stripped.slice(1);
  }

  function makeLink(item, className) {
    const link = document.createElement("a");
    link.className = className;
    link.href = item.href;
    link.textContent = item.label;
    if (item.current) {
      link.setAttribute("aria-current", "page");
    }
    if (item.sourceHref) {
      const wrapper = document.createElement("span");
      wrapper.className = "page-nav-button-with-source";
      if (item.current) {
        wrapper.classList.add("page-nav-button-current");
      }

      const sourceLink = document.createElement("a");
      sourceLink.className = "page-nav-button-source-link";
      sourceLink.href = item.sourceHref;
      sourceLink.textContent = "🔗";
      sourceLink.setAttribute("aria-label", `Open ${item.label} source`);
      if (/^https?:/i.test(item.sourceHref)) {
        sourceLink.rel = "noreferrer";
      }
      wrapper.append(sourceLink, link);
      return wrapper;
    }
    return link;
  }

  function makeGroupedSection(group) {
    const section = document.createElement("section");
    section.className = "page-nav-group";
    section.setAttribute("aria-labelledby", `page-nav-${group.id}`);

    const heading = document.createElement("div");
    heading.id = `page-nav-${group.id}`;
    heading.className = "page-nav-group-label";
    if (group.sourceHref) {
      const sourceLink = document.createElement("a");
      sourceLink.className = "page-nav-group-source-link";
      sourceLink.href = group.sourceHref;
      sourceLink.textContent = "🔗";
      sourceLink.setAttribute("aria-label", `Open ${group.label} source`);
      if (/^https?:/i.test(group.sourceHref)) {
        sourceLink.rel = "noreferrer";
      }
      heading.appendChild(sourceLink);
    }
    if (group.href) {
      const link = document.createElement("a");
      link.className = "page-nav-group-link";
      link.href = group.href;
      link.textContent = group.label;
      if (/^https?:/i.test(group.href)) {
        link.rel = "noreferrer";
      }
      heading.appendChild(link);
    } else {
      heading.appendChild(document.createTextNode(group.label));
    }
    section.appendChild(heading);

    const list = document.createElement("ul");
    list.className = "page-nav-list";
    for (const item of group.items) {
      const child = document.createElement("li");
      child.appendChild(makeLink(item, "page-nav-link"));
      list.appendChild(child);
    }
    section.appendChild(list);

    return section;
  }

  function makeSingleSection(item) {
    const section = document.createElement("section");
    section.className = "page-nav-group page-nav-group-single";
    section.appendChild(makeLink(item, "page-nav-link page-nav-single-link"));
    return section;
  }

  window.renderGroupedPageNav = function renderGroupedPageNav(container, options) {
    if (!container) {
      return;
    }

    const hisSheets = (options.hisSheets || []).map((item) => ({
      ...item,
      label: stripGroupPrefix(item.label, "HIS"),
    }));
    const ncprSheets = (options.ncprSheets || []).map((item) => ({
      ...item,
      label: stripGroupPrefix(item.label, "NCPR"),
    }));
    const emaSheets = (options.emaSheets || []).map((item) => ({
      ...item,
      label: stripGroupPrefix(item.label, "EMA"),
      sourceHref: EMA_SOURCE_URL,
    }));
    const bdaSheets = (options.bdaSheets || []).map((item) => ({
      ...item,
      label: stripGroupPrefix(item.label, "BDA"),
      sourceHref: BDA_SOURCE_URL,
    }));
    const registrySheets = [...bdaSheets, ...emaSheets];

    container.replaceChildren();
    container.appendChild(makeSingleSection({
      label: "Table",
      href: "index.html?sheet=Table",
      current: options.currentSection === "table",
    }));

    if (registrySheets.length) {
      container.appendChild(makeGroupedSection({
        id: "registries",
        label: "Registries",
        items: registrySheets,
      }));
    }

    if (hisSheets.length) {
      container.appendChild(makeGroupedSection({
        id: "his",
        label: "Electronic health system (HIS)",
        href: "https://his.bg",
        items: hisSheets,
      }));
    }

    if (ncprSheets.length) {
      container.appendChild(makeGroupedSection({
        id: "ncpr",
        label: "Prices (NCPR)",
        sourceHref: "https://ncpr.bg/bg/регистри.html",
        items: ncprSheets,
      }));
    }
  };
})();
