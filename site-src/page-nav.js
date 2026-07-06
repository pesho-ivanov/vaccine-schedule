(() => {
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
    return link;
  }

  function makeGroupedSection(group) {
    const section = document.createElement("section");
    section.className = "page-nav-group";
    section.setAttribute("aria-labelledby", `page-nav-${group.id}`);

    const heading = document.createElement("div");
    heading.id = `page-nav-${group.id}`;
    heading.className = "page-nav-group-label";
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
      heading.textContent = group.label;
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
    }));
    const bdaSheets = (options.bdaSheets || []).map((item) => ({
      ...item,
      label: stripGroupPrefix(item.label, "BDA"),
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
        href: "https://www.ncpr.bg",
        items: ncprSheets,
      }));
    }
  };
})();
