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
    heading.textContent = group.label;
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

    container.replaceChildren();
    container.appendChild(makeSingleSection({
      label: "Table",
      href: "index.html",
      current: options.currentSection === "table",
    }));

    if (hisSheets.length) {
      container.appendChild(makeGroupedSection({
        id: "his",
        label: "HIS",
        items: hisSheets,
      }));
    }

    if (ncprSheets.length) {
      container.appendChild(makeGroupedSection({
        id: "ncpr",
        label: "NCPR",
        items: ncprSheets,
      }));
    }
  };
})();
