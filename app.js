(() => {
  const data = window.VACCINE_SCHEDULE_TABLE;

  if (!data) {
    document.body.classList.add("site-error");
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p class=\"error-banner\">Schedule data did not load.</p>"
    );
    return;
  }

  const table = document.getElementById("schedule-table");
  const title = document.getElementById("page-title");
  const bgToggle = document.getElementById("bg-toggle");
  const tableSource = document.getElementById("table-source");
  const sourceList = document.getElementById("source-list");
  const otherCalendarList = document.getElementById("other-calendar-list");
  const pageNav = document.getElementById("page-nav");
  const STORAGE_KEYS = {
    showBulgarian: "vaccine-schedule.show-bg",
  };

  title.textContent = data.title.en;

  function storedFlag(key) {
    try {
      return window.localStorage.getItem(key) === "true";
    } catch {
      return false;
    }
  }

  function storeFlag(key, value) {
    try {
      window.localStorage.setItem(key, String(value));
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
  }

  function setButtonState(button, className, storageKey, enabled) {
    document.body.classList.toggle(className, enabled);
    button.setAttribute("aria-pressed", String(enabled));
    storeFlag(storageKey, enabled);
  }

  setButtonState(bgToggle, "show-bg", STORAGE_KEYS.showBulgarian, storedFlag(STORAGE_KEYS.showBulgarian));
  bgToggle.addEventListener("click", () => {
    setButtonState(
      bgToggle,
      "show-bg",
      STORAGE_KEYS.showBulgarian,
      !document.body.classList.contains("show-bg")
    );
  });

  function appendText(parent, value, className) {
    const node = document.createElement("span");
    if (className) {
      node.className = className;
    }
    node.textContent = value;
    parent.appendChild(node);
    return node;
  }

  function setTooltip(element, text) {
    element.dataset.tooltip = text;
  }

  function appendSourceLine(parent, source) {
    if (!parent || !source) {
      return;
    }

    parent.replaceChildren();
    appendText(parent, "Source:", "table-source-label");
    const link = document.createElement("a");
    link.href = source.url;
    link.rel = "noreferrer";
    link.textContent = source.name;
    parent.appendChild(link);

    const versionText = [source.version, source.date].filter(Boolean).join(", ");
    if (versionText) {
      appendText(parent, `(${versionText})`, "table-source-version");
    }

    const sheetText = [source.sheet_name, source.sheet_description].filter(Boolean).join(": ");
    if (sheetText) {
      appendText(parent, `- ${sheetText}`, "table-source-sheet");
    }
  }

  function normalizedText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function columnMeta(column) {
    const headerLabel = columnHeaderLabel(column);
    if (!headerLabel.en && !headerLabel.bg) {
      return "";
    }
    const english = String(headerLabel.en || "").trim().toLowerCase();
    const bulgarian = String(headerLabel.bg || "").trim().toLowerCase();
    if (headerLabel.bg && bulgarian !== english) {
      return headerLabel.bg;
    }
    return "";
  }

  function columnHeaderLabel(column) {
    return column.header_label || column.label;
  }

  function widestLineLength(value) {
    return String(value)
      .split(/\r?\n/)
      .reduce((widest, line) => Math.max(widest, line.trim().length), 0);
  }

  function columnWidth(column) {
    const headerLabel = columnHeaderLabel(column);
    const values = [headerLabel.en, columnMeta(column)];
    for (const row of data.rows) {
      for (const dose of row.doses) {
        if (dose.column === column.id && (dose.span || 1) === 1) {
          values.push(dose.text);
        }
      }
    }

    const maxChars = Math.max(...values.map(widestLineLength));
    return Math.min(112, Math.max(42, Math.ceil(maxChars * 7.5 + 20)));
  }

  function makeColGroup() {
    const colgroup = document.createElement("colgroup");

    const rowNumberCol = document.createElement("col");
    rowNumberCol.className = "row-number-col";
    colgroup.appendChild(rowNumberCol);

    const vaccineCol = document.createElement("col");
    vaccineCol.className = "vaccine-col";
    colgroup.appendChild(vaccineCol);

    for (const column of data.columns) {
      const col = document.createElement("col");
      col.className = "time-col";
      col.style.width = `${columnWidth(column)}px`;
      colgroup.appendChild(col);
    }

    return colgroup;
  }

  function columnGroups() {
    if (data.column_groups && data.column_groups.length) {
      return data.column_groups;
    }
    return [
      {
        id: "all",
        label: { en: "Schedule", bg: "Schedule" },
        columns: data.columns.map((column) => column.id),
      },
    ];
  }

  function makeHeader() {
    const thead = document.createElement("thead");
    const groupRow = document.createElement("tr");
    groupRow.className = "column-group-row";
    const timeRow = document.createElement("tr");
    timeRow.className = "time-header-row";

    const rowNumberHeader = document.createElement("th");
    rowNumberHeader.scope = "col";
    rowNumberHeader.className = "schedule-row-number";
    rowNumberHeader.rowSpan = 2;
    rowNumberHeader.setAttribute("aria-label", "Row number");
    groupRow.appendChild(rowNumberHeader);

    const vaccineHeader = document.createElement("th");
    vaccineHeader.scope = "col";
    vaccineHeader.className = "vaccine-column";
    vaccineHeader.rowSpan = 2;
    vaccineHeader.textContent = "Vaccine";
    groupRow.appendChild(vaccineHeader);

    for (const group of columnGroups()) {
      const th = document.createElement("th");
      th.scope = "colgroup";
      th.className = "column-group-header";
      th.colSpan = group.columns.length;
      appendText(th, group.label.en, "column-group-label");
      if (group.label.bg && group.label.bg !== group.label.en) {
        appendText(th, group.label.bg, "column-group-meta translation-bg");
      }
      groupRow.appendChild(th);
    }

    for (const column of data.columns) {
      const th = document.createElement("th");
      th.scope = "col";
      th.className = "time-column";
      const headerLabel = columnHeaderLabel(column);
      if (headerLabel.en) {
        appendText(th, headerLabel.en, "column-label");
      }
      const meta = columnMeta(column);
      if (meta) {
        appendText(th, meta, "column-meta translation-bg");
      }
      timeRow.appendChild(th);
    }

    thead.appendChild(groupRow);
    thead.appendChild(timeRow);
    return thead;
  }

  function makeDose(dose, group) {
    const doseNode = document.createElement("span");
    doseNode.className = `dose ${group}`;
    if (dose.muted) {
      doseNode.classList.add("muted-dose");
    }
    if (dose.note || dose.note_style) {
      doseNode.classList.add("noted-dose");
      doseNode.tabIndex = 0;
    }
    doseNode.textContent = dose.text;
    if (dose.note) {
      doseNode.dataset.tooltip = dose.note;
      doseNode.setAttribute("aria-label", `${dose.text}. ${dose.note}`);
    }
    return doseNode;
  }

  function makeEcdcLink(link) {
    const anchor = document.createElement("a");
    anchor.className = "ecdc-link";
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    setTooltip(anchor, `Compare EU countries for ${link.label}`);
    anchor.setAttribute("aria-label", `Compare EU countries for ${link.label}`);

    const logo = document.createElement("img");
    logo.src = "ECDC_logo_simple.svg";
    logo.alt = "";
    logo.width = 18;
    logo.height = 18;
    anchor.appendChild(logo);
    return anchor;
  }

  function appendDiseaseName(parent, rowData) {
    const line = document.createElement("span");
    line.className = "vaccine-label";
    const links = rowData.ecdc_links || [];

    line.appendChild(document.createTextNode(rowData.label.en));
    for (const link of links) {
      line.appendChild(makeEcdcLink(link));
    }

    parent.appendChild(line);
    return line;
  }

  function appendShortName(parent, rowData) {
    const shortName = rowData.short?.en;
    if (!shortName || normalizedText(shortName) === normalizedText(rowData.label.en)) {
      return;
    }
    appendText(parent, shortName, "vaccine-short");
  }

  function makeBodyRow(rowData, rowNumber) {
    const tr = document.createElement("tr");
    tr.className = `schedule-row ${rowData.group}`;
    if (rowData.divider_after) {
      tr.classList.add("divider-after");
    }

    const rowNumberCell = document.createElement("th");
    rowNumberCell.scope = "row";
    rowNumberCell.className = "schedule-row-number";
    rowNumberCell.textContent = rowNumber;
    tr.appendChild(rowNumberCell);

    const nameCell = document.createElement("th");
    nameCell.scope = "row";
    nameCell.className = "vaccine-cell";
    appendShortName(nameCell, rowData);
    appendDiseaseName(nameCell, rowData);
    if (rowData.label.bg && rowData.label.bg !== rowData.label.en) {
      appendText(nameCell, rowData.label.bg, "vaccine-bg translation-bg");
    }
    tr.appendChild(nameCell);

    const starts = new Map();
    for (const dose of rowData.doses) {
      const doses = starts.get(dose.column) || [];
      doses.push(dose);
      starts.set(dose.column, doses);
    }

    let skipUntil = -1;
    for (let index = 0; index < data.columns.length; index += 1) {
      if (index < skipUntil) {
        continue;
      }

      const column = data.columns[index];
      const doses = starts.get(column.id);
      const td = document.createElement("td");
      td.className = "time-cell";

      if (doses && doses.length) {
        const span = Math.max(...doses.map((dose) => dose.span || 1));
        td.colSpan = span;
        td.classList.add("filled-cell", rowData.group);
        const fillBackground = doses.find((dose) => dose.fill_background)?.fill_background;
        if (fillBackground) {
          td.style.setProperty("--cell-bg", fillBackground);
        }
        for (const dose of doses) {
          td.appendChild(makeDose(dose, rowData.group));
        }
        skipUntil = index + span;
      } else {
        td.setAttribute("aria-label", `${rowData.label.en}, ${column.label.en}: no scheduled dose`);
        skipUntil = index + 1;
      }

      tr.appendChild(td);
    }

    return tr;
  }

  function makeBody() {
    const tbody = document.createElement("tbody");
    let currentGroup = "";

    for (const [index, rowData] of data.rows.entries()) {
      if (rowData.group !== currentGroup) {
        currentGroup = rowData.group;
        const groupRow = document.createElement("tr");
        groupRow.className = `group-row ${currentGroup}`;
        const groupCell = document.createElement("th");
        groupCell.scope = "rowgroup";
        groupCell.colSpan = data.columns.length + 2;
        groupCell.textContent = data.groups[currentGroup].en;
        groupRow.appendChild(groupCell);
        tbody.appendChild(groupRow);
      }
      tbody.appendChild(makeBodyRow(rowData, index + 1));
    }

    return tbody;
  }

  function sourceLabel(name) {
    const label = {
      ecdc_calendar: "ECDC",
      lex_calendar: "lex.bg",
      pregnancy_vaccine: "plusmen.bg",
      his_bg: "his.bg",
    }[name] || name.replaceAll("_", " ");
    const version = data.source_versions?.[name];
    return version ? `${label} (${version})` : label;
  }

  function sourceTitle(name) {
    return {
      lex_calendar: "The law about vaccines in Bulgaria.",
      pregnancy_vaccine: "Informational site. Not complete and updated.",
      his_bg: "The electronic health system in Bulgaria. Sheets CL037 & CL038.",
    }[name] || "";
  }

  function appendLinkItem(parent, label, url, title = "") {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    link.rel = "noreferrer";
    if (title) {
      setTooltip(link, title);
    }
    item.appendChild(link);
    parent.appendChild(item);
  }

  function renderSources() {
    const sourceOrder = ["lex_calendar", "his_bg", "pregnancy_vaccine"];
    for (const name of sourceOrder) {
      const url = data.source_links[name];
      if (!url) {
        continue;
      }
      appendLinkItem(sourceList, sourceLabel(name), url, sourceTitle(name));
    }
    for (const [name, url] of Object.entries(data.source_links)) {
      if (name === "ecdc_calendar") {
        continue;
      }
      if (sourceOrder.includes(name)) {
        continue;
      }
      appendLinkItem(sourceList, sourceLabel(name), url, sourceTitle(name));
    }
  }

  function renderOtherCalendars() {
    appendLinkItem(otherCalendarList, "ECDC (EU)", data.source_links.ecdc_calendar);
    appendLinkItem(
      otherCalendarList,
      "NHS (UK)",
      "https://www.nhs.uk/vaccinations/nhs-vaccinations-and-when-to-have-them"
    );
    appendLinkItem(
      otherCalendarList,
      "CDC (US)",
      "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age.html"
    );
    appendLinkItem(
      otherCalendarList,
      "Australia",
      "https://www.health.gov.au/sites/default/files/2026-06/national-immunisation-program-schedule.pdf"
    );
    appendLinkItem(
      otherCalendarList,
      "Germany",
      "https://www.bundesgesundheitsministerium.de/en/topics/vaccinations"
    );
  }

  function renderPageNav() {
    const hisSheets = (data.his_sheets || []).map((sheetName) => ({
      label: data.his_sheet_labels?.[sheetName] || sheetName,
      href: `his-sheet.html?sheet=${encodeURIComponent(sheetName)}`,
    }));
    const ncprSheets = (data.ncpr_sheets || []).map((sheetId) => ({
      label: data.ncpr_sheet_labels?.[sheetId] || sheetId,
      href: `ncpr-sheet.html?sheet=${encodeURIComponent(sheetId)}`,
    }));

    if (typeof window.renderGroupedPageNav === "function") {
      window.renderGroupedPageNav(pageNav, {
        currentSection: "table",
        hisSheets,
        ncprSheets,
      });
      return;
    }

    const legacyList = document.getElementById("his-sheet-list");
    if (!legacyList) {
      return;
    }
    legacyList.replaceChildren();
    for (const item of [...hisSheets, ...ncprSheets]) {
      appendLinkItem(legacyList, item.label, item.href);
    }
  }

  table.appendChild(makeColGroup());
  table.appendChild(makeHeader());
  table.appendChild(makeBody());
  appendSourceLine(tableSource, data.table_source);
  renderSources();
  renderOtherCalendars();
  renderPageNav();
})();
