(() => {
  const data = window.BDA_SHEETS;

  if (!data) {
    document.body.classList.add("site-error");
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p class=\"error-banner\">BDA sheet data did not load.</p>"
    );
    return;
  }

  const route = window.VACCINE_SITE_ROUTE || {};
  if (route.section !== "bda") {
    return;
  }

  document.getElementById("schedule-page").hidden = true;
  document.getElementById("sheet-page").hidden = false;
  document.querySelectorAll("#sheet-table-section table").forEach((candidate) => {
    candidate.hidden = true;
  });

  const requestedSheet = route.sheetId || data.sheets[0]?.id;
  const sheet = data.sheets.find((candidate) => candidate.id === requestedSheet) || data.sheets[0];

  if (!sheet) {
    document.body.classList.add("site-error");
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p class=\"error-banner\">No BDA vaccine sheets are available.</p>"
    );
    return;
  }

  const pageNav = document.getElementById("page-nav");
  const bgToggle = document.getElementById("bg-toggle");
  const detailsToggle = document.getElementById("details-toggle");
  const sourceList = document.getElementById("source-list");
  const otherCalendarList = document.getElementById("other-calendar-list");
  const table = document.getElementById("bda-sheet-table");
  const caption = document.getElementById("sheet-caption");
  const headerRows = sheet.header_rows || [];
  const STORAGE_KEYS = {
    showBulgarian: "vaccine-schedule.show-bg",
    showDetails: "vaccine-schedule.show-details",
  };
  const columnHeaderLabels = new Map([
    ["Рег. №", "Reg. No."],
    ["Идентификатор", "Identifier"],
    ["Търговско име", "Trade name"],
    ["Описание", "Description"],
    ["Лек. форма", "Pharmaceutical form"],
    ["Лек. форма EN", "Pharmaceutical form (EN)"],
    ["Количество на акт.в-во", "Active substance quantity"],
    ["Опаковка", "Package"],
    ["Обем/Дозова единица", "Volume / dose unit"],
    ["Количество в крайна опаковка", "Quantity in final package"],
    ["Притежател на РУ", "Marketing authorisation holder"],
    ["Държава /EN/", "Country (EN)"],
    ["INN", "INN"],
    ["АТС-Код", "ATC"],
    ["Режим на предписване", "Prescription status"],
  ]);
  const parentFacingHeaders = new Set([
    "Търговско име",
    "Описание",
    "Лек. форма",
    "INN",
    "Режим на предписване",
  ]);

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

  function setTooltip(element, text) {
    element.dataset.tooltip = text;
  }

  function appendText(parent, value, className) {
    const node = document.createElement("span");
    if (className) {
      node.className = className;
    }
    node.textContent = value;
    parent.appendChild(node);
    return node;
  }

  function appendSourceLine(parent, source) {
    if (!parent || !source) {
      return;
    }

    parent.replaceChildren();
    const tableText = [source.sheet_name, source.sheet_description].filter(Boolean).join(": ") || source.name;

    const versionText = [source.version, source.date].filter(Boolean).join(", ");
    parent.textContent = versionText ? `${tableText} (${versionText})` : tableText;
  }

  function appendLinkItem(parent, label, url, title = "", current = false) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    if (/^https?:/i.test(url)) {
      link.rel = "noreferrer";
    }
    if (title) {
      setTooltip(link, title);
    }
    if (current) {
      link.setAttribute("aria-current", "page");
    }
    item.appendChild(link);
    parent.appendChild(item);
  }

  function renderPageNav() {
    const hisSheets = (data.his_sheets || []).map((sheetName) => ({
      label: window.vaccineButtonLabel(data.his_sheet_labels?.[sheetName] || sheetName, "HIS"),
      href: window.vaccinePageHref(window.vaccineButtonLabel(data.his_sheet_labels?.[sheetName] || sheetName, "HIS")),
    }));
    const ncprSheets = (data.ncpr_sheets || []).map((sheetId) => ({
      label: window.vaccineButtonLabel(data.ncpr_sheet_labels?.[sheetId] || sheetId, "NCPR"),
      href: window.vaccinePageHref(window.vaccineButtonLabel(data.ncpr_sheet_labels?.[sheetId] || sheetId, "NCPR")),
    }));
    const emaSheets = (data.ema_sheets || []).map((sheetId) => ({
      label: window.vaccineButtonLabel(data.ema_sheet_labels?.[sheetId] || sheetId, "EMA"),
      href: window.vaccinePageHref(window.vaccineButtonLabel(data.ema_sheet_labels?.[sheetId] || sheetId, "EMA")),
    }));
    const bdaSheets = (data.bda_sheets || []).map((sheetId) => ({
      label: window.vaccineButtonLabel(data.bda_sheet_labels?.[sheetId] || sheetId, "BDA"),
      href: window.vaccinePageHref(window.vaccineButtonLabel(data.bda_sheet_labels?.[sheetId] || sheetId, "BDA")),
      current: sheetId === sheet.id,
    }));

    if (typeof window.renderGroupedPageNav === "function") {
      window.renderGroupedPageNav(pageNav, {
        currentSection: "bda",
        hisSheets,
        ncprSheets,
        emaSheets,
        bdaSheets,
      });
      return;
    }

    const legacyList = document.getElementById("sheet-nav");
    if (!legacyList) {
      return;
    }
    legacyList.replaceChildren();
    for (const item of [...hisSheets, ...ncprSheets, ...bdaSheets, ...emaSheets]) {
      appendLinkItem(legacyList, item.label, item.href, "", item.current);
    }
  }

  function sourceLabel(name) {
    const label = {
      ecdc_calendar: "ECDC",
      lex_calendar: "Immunization ordinance",
      lex_medicine_prices: "Medicine price regulation",
      pregnancy_vaccine: "plusmen.bg",
      his_bg: "his.bg",
    }[name] || name.replaceAll("_", " ");
    const version = data.source_versions?.[name];
    return version ? `${label} (${version})` : label;
  }

  function sourceTitle(name) {
    return {
      lex_calendar: "Ordinance No. 15 on immunizations in Bulgaria.",
      lex_medicine_prices: "Rules for regulation and registration of medicinal product prices.",
      pregnancy_vaccine: "Informational site. Not complete and updated.",
      his_bg: "The electronic health system in Bulgaria. Sheets CL037 & CL038.",
    }[name] || "";
  }

  function renderSources() {
    const sourceOrder = ["lex_calendar", "lex_medicine_prices", "his_bg", "pregnancy_vaccine"];
    for (const name of sourceOrder) {
      const url = data.source_links[name];
      if (!url) {
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

  function cellValue(row, column) {
    return String(row?.cells?.[column] || "").trim();
  }

  function displayText(value) {
    const text = String(value || "").trim();
    return text === "---" ? "" : text;
  }

  function headerTexts(column) {
    return headerRows
      .map((row) => cellValue(row, column))
      .filter(Boolean);
  }

  function columnHeader(column) {
    const headers = headerTexts(column);
    if (document.body.classList.contains("show-bg")) {
      return headers.join("\n");
    }
    return headers
      .map((header) => columnHeaderLabels.get(header) || header)
      .join("\n");
  }

  function detailsVisible() {
    return document.body.classList.contains("show-details");
  }

  function isFilterColumn(column) {
    return headerTexts(column).some((header) => header === sheet.filter?.column);
  }

  function isParentFacingColumn(column) {
    return headerTexts(column).some((header) => parentFacingHeaders.has(header));
  }

  function columnHasValue(column) {
    if (columnHeader(column)) {
      return true;
    }
    return sheet.rows.some((row) => Boolean(displayText(cellValue(row, column))));
  }

  function visibleColumns() {
    const columns = [];
    for (let index = 1; index <= sheet.column_count; index += 1) {
      if (columnHasValue(index) && (detailsVisible() || (
        !isFilterColumn(index)
        && isParentFacingColumn(index)
      ))) {
        columns.push(index);
      }
    }
    return columns;
  }

  function appendHeader(targetTable) {
    const thead = document.createElement("thead");
    const columns = visibleColumns();
    const sourceRow = document.createElement("tr");
    sourceRow.className = "table-source-row";
    const sourceCell = document.createElement("th");
    sourceCell.scope = "colgroup";
    sourceCell.colSpan = columns.length + 1;
    appendSourceLine(sourceCell, sheet.source);
    sourceRow.appendChild(sourceCell);

    const row = document.createElement("tr");
    row.className = "sheet-column-header";

    const rowNumberHeader = document.createElement("th");
    rowNumberHeader.scope = "col";
    rowNumberHeader.className = "sheet-display-row-number";
    rowNumberHeader.setAttribute("aria-label", "Row number");
    row.appendChild(rowNumberHeader);

    for (const column of columns) {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = columnHeader(column);
      row.appendChild(th);
    }

    thead.appendChild(sourceRow);
    thead.appendChild(row);
    targetTable.appendChild(thead);
  }

  function appendBody(targetTable) {
    const tbody = document.createElement("tbody");
    const columns = visibleColumns();

    for (const [index, sheetRow] of sheet.rows.entries()) {
      const tr = document.createElement("tr");

      const rowNumberCell = document.createElement("th");
      rowNumberCell.scope = "row";
      rowNumberCell.className = "sheet-display-row-number";
      rowNumberCell.textContent = index + 1;
      tr.appendChild(rowNumberCell);

      for (const column of columns) {
        const td = document.createElement("td");
        td.textContent = displayText(cellValue(sheetRow, column));
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    targetTable.appendChild(tbody);
  }

  function renderTable() {
    table.hidden = false;
    table.replaceChildren();
    const captionNode = document.createElement("caption");
    captionNode.textContent = sheet.label;
    table.appendChild(captionNode);
    appendHeader(table);
    appendBody(table);
  }

  document.title = sheet.label;
  caption.textContent = sheet.label;
  setButtonState(bgToggle, "show-bg", STORAGE_KEYS.showBulgarian, storedFlag(STORAGE_KEYS.showBulgarian));
  setButtonState(detailsToggle, "show-details", STORAGE_KEYS.showDetails, storedFlag(STORAGE_KEYS.showDetails));
  bgToggle.addEventListener("click", () => {
    setButtonState(
      bgToggle,
      "show-bg",
      STORAGE_KEYS.showBulgarian,
      !document.body.classList.contains("show-bg")
    );
    renderTable();
  });
  detailsToggle.addEventListener("click", () => {
    setButtonState(
      detailsToggle,
      "show-details",
      STORAGE_KEYS.showDetails,
      !document.body.classList.contains("show-details")
    );
    renderTable();
  });
  renderPageNav();
  renderTable();
  renderSources();
  renderOtherCalendars();
})();
