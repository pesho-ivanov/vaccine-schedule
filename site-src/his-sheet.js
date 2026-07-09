(() => {
  const data = window.HIS_SHEETS;

  if (!data) {
    document.body.classList.add("site-error");
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p class=\"error-banner\">HIS sheet data did not load.</p>"
    );
    return;
  }

  const route = window.VACCINE_SITE_ROUTE || {};
  if (route.section !== "his") {
    return;
  }

  document.getElementById("schedule-page").hidden = true;
  document.getElementById("sheet-page").hidden = false;
  document.querySelectorAll("#sheet-table-section table").forEach((candidate) => {
    candidate.hidden = true;
  });

  const requestedSheet = route.sheetName || data.sheets[0]?.name;
  const sheet = data.sheets.find((candidate) => candidate.name === requestedSheet) || data.sheets[0];

  const pageNav = document.getElementById("page-nav");
  const bgToggle = document.getElementById("bg-toggle");
  const detailsToggle = document.getElementById("details-toggle");
  const sheetSource = document.getElementById("sheet-source");
  const changeNotesList = document.getElementById("change-notes-list");
  const tableSection = document.getElementById("sheet-table-section");
  const footnotes = document.getElementById("sheet-footnotes");
  const sourceList = document.getElementById("source-list");
  const otherCalendarList = document.getElementById("other-calendar-list");
  const table = document.getElementById("his-sheet-table");
  const caption = document.getElementById("sheet-caption");
  const firstRow = sheet.rows[0];
  const firstRowCells = firstRow ? Object.values(firstRow.cells).filter(Boolean) : [];
  const firstRowNote = firstRowCells.length === 1 ? firstRowCells[0] : "";
  const tableRows = firstRowNote ? sheet.rows.slice(1) : sheet.rows;
  const usesKeyRowHeader = ["CL037", "CL038"].includes(sheet.name);
  const hierarchicalHeaderRows = usesKeyRowHeader
    ? tableRows.slice(0, 2)
    : [];
  const allBodyRows = hierarchicalHeaderRows.length === 2 ? tableRows.slice(2) : tableRows;
  const footnoteRows = sheet.name === "CL038" ? allBodyRows.filter(isFootnoteRow) : [];
  const baseBodyRows = footnoteRows.length
    ? allBodyRows.filter((row) => !isFootnoteRow(row))
    : allBodyRows;
  const footnotesByMarker = new Map(
    footnoteRows
      .map((row) => {
        const match = cellValue(row, 2).match(/^(\*+)\s*(.+)$/);
        return match ? [match[1], match[2]] : null;
      })
      .filter(Boolean)
  );
  const dataColumns = Array.from(
    { length: sheet.column_count - (usesKeyRowHeader ? 1 : 0) },
    (_, index) => index + (usesKeyRowHeader ? 2 : 1)
  );
  const programGroupColumnIndex = sheet.name === "CL038"
    ? dataColumns.find((column) => cellValue(hierarchicalHeaderRows[1], column) === "Program Group") || 0
    : 0;
  const productsColumnIndex = sheet.name === "CL038"
    ? dataColumns.find((column) => cellValue(hierarchicalHeaderRows[1], column) === "CL037 Mapping (2025)") || 0
    : 0;
  const atcColumnIndex = sheet.name === "CL037"
    ? dataColumns.find((column) => cellValue(hierarchicalHeaderRows[1], column) === "ATC") || 0
    : 0;
  const innColumnIndex = sheet.name === "CL037"
    ? dataColumns.find((column) => cellValue(hierarchicalHeaderRows[1], column) === "INN") || 0
    : 0;
  const programGroupEnglishLabels = new Map([
    [
      "Задължителни планови имунизации и реимунизации",
      "Mandatory scheduled immunizations and reimmunizations",
    ],
    [
      "Целеви имунизации и реимунизации",
      "Targeted immunizations and reimmunizations",
    ],
    [
      "Препоръчителни имунизации и реимунизации",
      "Recommended immunizations and reimmunizations",
    ],
    [
      "Серуми и ваксини при нараняване",
      "Sera and vaccines for injuries",
    ],
    [
      "Имунизации по национални програми",
      "Immunizations under national programs",
    ],
  ]);
  const productLinksByKey = new Map(Object.entries(data.product_links || {}));
  const STORAGE_KEYS = {
    showBulgarian: "vaccine-schedule.show-bg",
    showDetails: "vaccine-schedule.show-details",
  };

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

  function columnName(index) {
    let name = "";
    let number = index;
    while (number > 0) {
      const remainder = (number - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      number = Math.floor((number - 1) / 26);
    }
    return name;
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

  function appendTableSourceTitle(parent, source) {
    if (!parent || !source) {
      return;
    }

    parent.replaceChildren();
    const tableText = [source.sheet_name, source.sheet_description].filter(Boolean).join(": ") || source.name;
    const versionText = [source.version, source.date].filter(Boolean).join(", ");
    parent.textContent = versionText ? `${tableText} (${versionText})` : tableText;
  }

  function renderPageNav() {
    const hisSheets = data.sheets.map((candidate) => ({
      label: window.vaccineButtonLabel(candidate.label || candidate.name, "HIS"),
      href: window.vaccinePageHref(window.vaccineButtonLabel(candidate.label || candidate.name, "HIS")),
      current: candidate.name === sheet.name,
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
    }));

    if (typeof window.renderGroupedPageNav === "function") {
      window.renderGroupedPageNav(pageNav, {
        currentSection: "his",
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
      const child = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      if (item.current) {
        link.setAttribute("aria-current", "page");
      }
      child.appendChild(link);
      legacyList.appendChild(child);
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
    return String(row?.cells[column] || "").trim();
  }

  function cellStyle(row, column) {
    return row?.styles?.[column] || "";
  }

  function applyCellStyle(element, row, column) {
    if (cellStyle(row, column) === "red") {
      element.classList.add("sheet-cell-red");
    }
  }

  function footnoteMarker(value) {
    const match = String(value || "").trim().match(/(\*+)$/);
    return match ? match[1] : "";
  }

  function leadingFootnoteMarker(value) {
    const match = String(value || "").trim().match(/^(\*+)\s+/);
    return match ? match[1] : "";
  }

  function stripFootnoteMarker(value) {
    return String(value || "").replace(/\s*\*+$/, "");
  }

  function displayFootnotedText(value) {
    const marker = footnoteMarker(value);
    return marker && footnotesByMarker.has(marker)
      ? stripFootnoteMarker(value)
      : String(value || "");
  }

  function displayTableText(value) {
    const text = displayHeaderText(value);
    return String(text).trim() === "---" ? "" : text;
  }

  function footnoteTooltip(value) {
    if (sheet.name === "CL037" && String(value || "").trim() === "ATC") {
      return "ATC";
    }
    const marker = footnoteMarker(value);
    if (marker && footnotesByMarker.has(marker)) {
      return combinedAgeFootnoteTooltip();
    }
    if (sheet.name === "CL038" && String(value || "").trim() === "Min age") {
      return combinedAgeFootnoteTooltip();
    }
    return "";
  }

  function combinedAgeFootnoteTooltip() {
    return ["*", "**"]
      .map((marker) => {
        const text = footnotesByMarker.get(marker);
        return text ? `${marker} ${text}` : "";
      })
      .filter(Boolean)
      .join("\n");
  }

  function setFootnotedText(element, value) {
    const text = displayTableText(value);
    const tooltip = text ? footnoteTooltip(value) : "";
    if (tooltip) {
      const label = document.createElement("span");
      label.className = "sheet-header-tooltip";
      label.textContent = text;
      setTooltip(label, tooltip);
      label.tabIndex = 0;
      label.setAttribute("aria-label", `${text}. ${tooltip}`);
      element.replaceChildren(label);
    } else {
      element.textContent = text;
    }
  }

  function displayHeaderText(value) {
    const text = displayFootnotedText(value);
    if (sheet.name === "CL037" && text === "ATC") {
      return "ATC";
    }
    if (sheet.name === "CL037" && text === "Number of Doses") {
      return bgColumnsVisible() ? "Брой дози" : "Number of Doses";
    }
    if (sheet.name === "CL037" && text === "Days to Next Dose") {
      return "Min Days to Next Dose";
    }
    if (sheet.name === "CL037" && text === "Display value EN") {
      return "Product";
    }
    if (sheet.name !== "CL038") {
      return text;
    }
    return {
      "CL037 Mapping (2025)": "Product",
      "Description EN": "Event",
      "Dose Number": bgColumnsVisible() ? "Номер на доза" : "Dose Number",
    }[text] || text;
  }

  function isAgeColumn(column) {
    if (sheet.name !== "CL038") {
      return false;
    }
    const label = displayFootnotedText(cellValue(hierarchicalHeaderRows[1], column));
    return label === "Min age" || label === "Max age";
  }

  function roundedMonthText(days) {
    const months = Math.round((days / 30) * 2) / 2;
    const monthText = Number.isInteger(months) ? String(months) : months.toFixed(1);
    return `${monthText} ${months === 1 ? "month" : "months"}`;
  }

  function convertedAgeCellText(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(\d+)\s+days?$/i);
    if (!match) {
      return "";
    }

    const days = Number(match[1]);
    return days > 30 ? roundedMonthText(days) : "";
  }

  function setAgeCellText(element, value, column) {
    if (!isAgeColumn(column)) {
      return false;
    }

    const convertedText = convertedAgeCellText(value);
    if (!convertedText) {
      return false;
    }

    const originalText = String(value || "").trim();
    const label = document.createElement("span");
    label.className = "sheet-cell-tooltip";
    label.textContent = convertedText;
    setTooltip(label, originalText);
    label.tabIndex = 0;
    label.setAttribute("aria-label", `${convertedText}. ${originalText}`);
    element.replaceChildren(label);
    return true;
  }

  function doseColumnKind(column) {
    const label = displayFootnotedText(cellValue(hierarchicalHeaderRows[1], column));
    if (sheet.name === "CL038" && label === "Dose Number") {
      return "dose-number";
    }
    if (sheet.name === "CL037" && label === "Number of Doses") {
      return "number-of-doses";
    }
    return "";
  }

  function doseNumberText(value, kind) {
    const text = String(value || "").trim();
    if (!text || text === "---") {
      return "";
    }
    if (kind === "dose-number") {
      return dosePositionText(text);
    }
    return doseCountText(text);
  }

  function doseCountText(text) {
    return text
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        if (bgColumnsVisible()) {
          return `${entry}${entry === "1" ? " доза" : " дози"}`;
        }
        return `${entry}${entry === "1" ? " dose" : " doses"}`;
      })
      .join("; ");
  }

  function dosePositionText(text) {
    const language = bgColumnsVisible() ? "bg" : "en";
    const singularPrefix = language === "bg" ? "доза" : "dose";
    const pluralPrefix = language === "bg" ? "дози" : "doses";
    const marker = language === "bg" ? "№" : "#";
    const rangeMatch = text.match(/^(\d+)\s*-\s*(\d+)$/);

    if (rangeMatch) {
      return `${pluralPrefix} ${marker}${rangeMatch[1]}-${marker}${rangeMatch[2]}`;
    }
    if (/^\d+\+$/.test(text)) {
      return `${pluralPrefix} ${marker}${text}`;
    }
    return `${singularPrefix} ${marker}${text}`;
  }

  function setDoseNumberCellText(element, value, column) {
    const kind = doseColumnKind(column);
    if (!kind) {
      return false;
    }

    element.textContent = doseNumberText(value, kind);
    return true;
  }

  function isDaysToNextDoseColumn(column) {
    return sheet.name === "CL037"
      && cellValue(hierarchicalHeaderRows[1], column) === "Days to Next Dose";
  }

  function daysToNextDoseText(value) {
    return String(value || "")
      .replace(/\b\d+(?:st|nd|rd|th):\s*/gi, "")
      .trim();
  }

  function dayText(days) {
    return `${days} ${days === 1 ? "day" : "days"}`;
  }

  function daysToNextDoseParts(value) {
    return daysToNextDoseText(value)
      .split(";")
      .map((entry) => entry.trim())
      .filter((entry) => entry && entry !== "---")
      .map((entry) => {
        const days = Number(entry);
        if (!Number.isInteger(days) || days < 0) {
          return { text: entry, tooltip: "" };
        }
        if (days > 30) {
          return { text: roundedMonthText(days), tooltip: dayText(days) };
        }
        return { text: dayText(days), tooltip: "" };
      });
  }

  function setDaysToNextDoseCellText(element, value, column) {
    if (!isDaysToNextDoseColumn(column)) {
      return false;
    }

    const parts = daysToNextDoseParts(value);
    element.replaceChildren();
    parts.forEach((part, index) => {
      if (index > 0) {
        element.appendChild(document.createTextNode("; "));
      }
      if (part.tooltip) {
        const label = document.createElement("span");
        label.className = "sheet-cell-tooltip";
        label.textContent = part.text;
        setTooltip(label, part.tooltip);
        label.tabIndex = 0;
        label.setAttribute("aria-label", `${part.text}. ${part.tooltip}`);
        element.appendChild(label);
      } else {
        element.appendChild(document.createTextNode(part.text));
      }
    });
    return true;
  }

  function isVaccineProductColumn(column) {
    return sheet.name === "CL037"
      && cellValue(hierarchicalHeaderRows[1], column) === "Display value EN";
  }

  function productRegistryLinkForKey(key) {
    const links = productLinksByKey.get(String(key || "").trim());
    return links
      ? links.bda_harakteristika
        || links.bda_listovka
        || links.ema
        || links.who
        || links.fda
        || ""
      : "";
  }

  function setVaccineProductCellLink(element, value, row, column) {
    if (!isVaccineProductColumn(column)) {
      return false;
    }

    const text = displayTableText(value);
    const url = productRegistryLinkForKey(cellValue(row, 1));
    if (!text || !url) {
      return false;
    }

    const link = document.createElement("a");
    link.href = url;
    link.rel = "noreferrer";
    link.textContent = text;
    element.replaceChildren(link);
    return true;
  }

  function isProductsColumn(column) {
    return sheet.name === "CL038" && column === productsColumnIndex;
  }

  function productTokens(value) {
    return String(value || "")
      .split(";")
      .map((token) => token.trim())
      .filter(Boolean);
  }

  function matchingProductNames(token) {
    if (!/[xX]/.test(token)) {
      return productDisplayValuesByKey.has(token)
        ? [productDisplayValuesByKey.get(token)]
        : [];
    }

    const pattern = new RegExp(`^${token
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/[xX]/g, "\\d")}$`);
    return productKeyOrder
      .filter((key) => pattern.test(key))
      .map((key) => productDisplayValuesByKey.get(key))
      .filter(Boolean);
  }

  function productDisplayText(value) {
    const names = [];
    const seen = new Set();

    for (const token of productTokens(value)) {
      const matches = matchingProductNames(token);
      const values = matches.length ? matches : [token];
      for (const productName of values) {
        if (!seen.has(productName)) {
          seen.add(productName);
          names.push(productName);
        }
      }
    }

    return names.join(", ");
  }

  function setProductsCellText(element, value, column) {
    if (!isProductsColumn(column)) {
      return false;
    }

    const originalText = String(value || "").trim();
    if (!originalText || originalText === "---") {
      return false;
    }

    const displayText = productDisplayText(originalText);
    if (!displayText) {
      return false;
    }

    const label = document.createElement("span");
    label.className = "sheet-cell-tooltip";
    label.textContent = displayText;
    setTooltip(label, originalText);
    label.tabIndex = 0;
    label.setAttribute("aria-label", `${displayText}. ${originalText}`);
    element.replaceChildren(label);
    return true;
  }

  function usesDefaultHeaderColor(column) {
    return sheet.name === "CL037"
      && cellValue(hierarchicalHeaderRows[1], column) === "Days to Next Dose";
  }

  function bgColumnsVisible() {
    return document.body.classList.contains("show-bg");
  }

  function programGroupDisplayLabel(label) {
    return bgColumnsVisible()
      ? label
      : programGroupEnglishLabels.get(label) || label;
  }

  function isBulgarianColumn(column) {
    return usesKeyRowHeader && /\bBG$/i.test(cellValue(hierarchicalHeaderRows[1], column));
  }

  function isProgramGroupColumn(column) {
    return sheet.name === "CL038" && column === programGroupColumnIndex;
  }

  function isAlwaysHiddenColumn(column) {
    const hiddenBySheet = {
      CL038: [
        "CL082 Mapping",
        "CL037 Mapping (2023)",
        "CL037 Mapping (2024)",
      ],
    };
    return (hiddenBySheet[sheet.name] || []).includes(cellValue(hierarchicalHeaderRows[1], column));
  }

  function isOldRecordColumn(column) {
    return usesKeyRowHeader && cellValue(hierarchicalHeaderRows[1], column) === "Valid Until";
  }

  function detailsVisible() {
    return document.body.classList.contains("show-details");
  }

  function isKeyColumn(column) {
    return usesKeyRowHeader && cellValue(hierarchicalHeaderRows[1], column) === "Key";
  }

  function isAtcColumn(column) {
    return column === atcColumnIndex;
  }

  function isInnColumn(column) {
    return column === innColumnIndex;
  }

  function atcColumnVisible() {
    return !atcColumnIndex || detailsVisible();
  }

  function rowHeaderVisible() {
    return usesKeyRowHeader && detailsVisible();
  }

  function isDetailsColumn(column) {
    const hiddenBySheet = {
      CL037: [
        "Description EN",
        "Vaccine Group",
        "Dose Quantity (ml)",
        "Permit Number",
        "Permit Owner ID",
        "Permit Owner Name",
        "MH code",
        "Since",
      ],
      CL038: [
        "Display transfered data EN",
        "Display value EN",
        "Rules",
        "Vaccine additional info",
        "Since",
      ],
    };
    return (hiddenBySheet[sheet.name] || []).includes(cellValue(hierarchicalHeaderRows[1], column));
  }

  function visibleColumns() {
    return dataColumns.filter(
      (column) => (
        !isAlwaysHiddenColumn(column)
        && !isProgramGroupColumn(column)
        && (detailsVisible() || !isOldRecordColumn(column))
        && (detailsVisible() || !isKeyColumn(column))
        && (detailsVisible() || !isAtcColumn(column))
        && (detailsVisible() || !isDetailsColumn(column))
        && (bgColumnsVisible() || !isBulgarianColumn(column))
      )
    );
  }

  function isOldRecordRow(row) {
    return usesKeyRowHeader && (row.row_style === "red" || cellStyle(row, 1) === "red");
  }

  function isDetailsRow(row) {
    return (
      (sheet.name === "CL037" && cellValue(row, 1) === "99999")
      || (sheet.name === "CL038" && cellValue(row, 1) === "00")
    );
  }

  function visibleRows() {
    return baseBodyRows.filter(
      (row) => (
        (detailsVisible() || !isOldRecordRow(row))
        && (detailsVisible() || !isDetailsRow(row))
      )
    );
  }

  function isFootnoteRow(row) {
    return !cellValue(row, 1) && /^\*+/.test(cellValue(row, 2));
  }

  function appendCaption(targetTable, text) {
    const captionNode = document.createElement("caption");
    captionNode.textContent = text;
    targetTable.appendChild(captionNode);
  }

  function appendHeader(targetTable, columns) {
    const thead = document.createElement("thead");
    const hasHierarchy = hierarchicalHeaderRows.length === 2;
    const columnCount = columns.length + 1 + (rowHeaderVisible() ? 1 : 0);

    const sourceRow = document.createElement("tr");
    sourceRow.className = "table-source-row";
    const sourceCell = document.createElement("th");
    sourceCell.scope = "colgroup";
    sourceCell.colSpan = columnCount;
    appendTableSourceTitle(sourceCell, sheet.source);
    sourceRow.appendChild(sourceCell);

    const row = document.createElement("tr");
    row.className = "sheet-column-header";

    const rowNumberHeader = document.createElement("th");
    rowNumberHeader.scope = "col";
    rowNumberHeader.className = "sheet-display-row-number";
    rowNumberHeader.setAttribute("aria-label", "Row number");
    row.appendChild(rowNumberHeader);

    if (rowHeaderVisible()) {
      const rowHeader = document.createElement("th");
      rowHeader.scope = "col";
      rowHeader.className = "sheet-row-number";
      rowHeader.textContent = usesKeyRowHeader
        ? cellValue(hierarchicalHeaderRows[1], 1) || "Key"
        : "";
      if (usesKeyRowHeader) {
        applyCellStyle(rowHeader, hierarchicalHeaderRows[1], 1);
      }
      row.appendChild(rowHeader);
    }

    if (hasHierarchy) {
      for (const index of columns) {
        const th = document.createElement("th");
        th.scope = "col";
        setFootnotedText(th, cellValue(hierarchicalHeaderRows[1], index) || columnName(index));
        if (!usesDefaultHeaderColor(index)) {
          applyCellStyle(th, hierarchicalHeaderRows[1], index);
        }
        row.appendChild(th);
      }
    } else {
      for (const index of columns) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = columnName(index);
        row.appendChild(th);
      }
    }

    thead.appendChild(sourceRow);
    thead.appendChild(row);
    targetTable.appendChild(thead);
  }

  function appendProgramTitleRow(tbody, title, columns) {
    const titleRow = document.createElement("tr");
    titleRow.className = "sheet-title-row";
    const titleCell = document.createElement("th");
    titleCell.scope = "rowgroup";
    titleCell.colSpan = columns.length + 1 + (rowHeaderVisible() ? 1 : 0);
    titleCell.textContent = programGroupDisplayLabel(title);
    titleRow.appendChild(titleCell);
    tbody.appendChild(titleRow);
  }

  function applyAtcTooltipToInnCell(element, sheetRow, column) {
    if (atcColumnVisible() || !isInnColumn(column)) {
      return;
    }

    const atc = cellValue(sheetRow, atcColumnIndex);
    const text = element.textContent.trim();
    if (!atc || !text) {
      return;
    }

    const label = document.createElement("span");
    label.className = "sheet-cell-tooltip";
    label.textContent = text;
    setTooltip(label, `ATC: ${atc}`);
    label.tabIndex = 0;
    label.setAttribute("aria-label", `${text}. ATC: ${atc}`);
    element.replaceChildren(label);
  }

  function appendSheetRow(tbody, sheetRow, columns, displayIndex) {
    const tr = document.createElement("tr");
    if (sheetRow.row_style === "red") {
      tr.classList.add("sheet-row-red");
    }

    const displayRowNumber = document.createElement("th");
    displayRowNumber.scope = "row";
    displayRowNumber.className = "sheet-display-row-number";
    displayRowNumber.textContent = displayIndex;
    tr.appendChild(displayRowNumber);

    if (rowHeaderVisible()) {
      const rowNumber = document.createElement("th");
      rowNumber.scope = "row";
      rowNumber.className = "sheet-row-number";
      rowNumber.textContent = usesKeyRowHeader ? cellValue(sheetRow, 1) : sheetRow.index;
      if (usesKeyRowHeader) {
        applyCellStyle(rowNumber, sheetRow, 1);
      }
      tr.appendChild(rowNumber);
    }

    for (const index of columns) {
      const td = document.createElement("td");
      if (
        !setVaccineProductCellLink(td, sheetRow.cells[index] || "", sheetRow, index)
        && !setProductsCellText(td, sheetRow.cells[index] || "", index)
        && !setAgeCellText(td, sheetRow.cells[index] || "", index)
        && !setDoseNumberCellText(td, sheetRow.cells[index] || "", index)
        && !setDaysToNextDoseCellText(td, sheetRow.cells[index] || "", index)
      ) {
        setFootnotedText(td, sheetRow.cells[index] || "");
      }
      applyAtcTooltipToInnCell(td, sheetRow, index);
      applyCellStyle(td, sheetRow, index);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  function appendBody(targetTable, rows, columns) {
    const tbody = document.createElement("tbody");

    for (const [index, sheetRow] of rows.entries()) {
      appendSheetRow(tbody, sheetRow, columns, index + 1);
    }

    targetTable.appendChild(tbody);
  }

  function appendProgramGroupBody(targetTable, groups, columns) {
    const tbody = document.createElement("tbody");
    let displayIndex = 1;

    for (const group of groups) {
      appendProgramTitleRow(tbody, group.label, columns);
      for (const sheetRow of group.rows) {
        appendSheetRow(tbody, sheetRow, columns, displayIndex);
        displayIndex += 1;
      }
    }

    targetTable.appendChild(tbody);
  }

  function renderTable() {
    table.hidden = false;
    tableSection.hidden = false;
    footnotes.replaceChildren();
    footnotes.hidden = true;
    if (sheet.name === "CL038" && programGroupColumnIndex) {
      renderProgramGroupTables();
    } else {
      tableSection.replaceChildren();
      const scroll = document.createElement("div");
      scroll.className = "table-scroll sheet-scroll";
      table.replaceChildren();
      appendCaption(table, `HIS ${sheet.name}`);
      const columns = visibleColumns();
      appendHeader(table, columns);
      appendBody(table, visibleRows(), columns);
      scroll.appendChild(table);
      tableSection.appendChild(scroll);
    }
    appendFootnotes();
  }

  function programGroupTables() {
    const groups = [];
    const groupsByLabel = new Map();

    for (const row of visibleRows()) {
      const label = cellValue(row, programGroupColumnIndex) || "No program group";
      if (!groupsByLabel.has(label)) {
        const group = { label, rows: [] };
        groupsByLabel.set(label, group);
        groups.push(group);
      }
      groupsByLabel.get(label).rows.push(row);
    }

    return groups;
  }

  function renderProgramGroupTables() {
    const columns = visibleColumns();
    tableSection.replaceChildren();

    const scroll = document.createElement("div");
    scroll.className = "table-scroll sheet-scroll";

    const groupTable = document.createElement("table");
    groupTable.className = "his-sheet-table";
    appendCaption(groupTable, `HIS ${sheet.name}`);
    appendHeader(groupTable, columns);
    appendProgramGroupBody(groupTable, programGroupTables(), columns);
    scroll.appendChild(groupTable);
    tableSection.appendChild(scroll);
  }

  function appendFootnotes() {
    if (!footnoteRows.length) {
      return;
    }

    const visibleFootnoteRows = footnoteRows.filter((row) => {
      const marker = leadingFootnoteMarker(cellValue(row, 2));
      return !marker || !footnotesByMarker.has(marker);
    });
    if (!visibleFootnoteRows.length) {
      return;
    }

    const list = document.createElement("ul");
    for (const row of visibleFootnoteRows) {
      const item = document.createElement("li");
      item.textContent = stripFootnoteMarker(cellValue(row, 2));
      applyCellStyle(item, row, 2);
      list.appendChild(item);
    }
    footnotes.appendChild(list);
    footnotes.hidden = false;
  }

  function changeText(change) {
    if (typeof change === "string") {
      return change;
    }
    return bgColumnsVisible()
      ? change.change || change.change_en || ""
      : change.change_en || change.change || "";
  }

  function changeRegardsVaccines(change) {
    return typeof change === "string" || change.regarding_vaccines !== false;
  }

  function sheetCodeDescriptions(sheetName) {
    const sourceSheet = data.sheets.find((candidate) => candidate.name === sheetName);
    if (!sourceSheet) {
      return new Map();
    }

    const firstSourceRow = sourceSheet.rows[0];
    const firstSourceRowCells = firstSourceRow
      ? Object.values(firstSourceRow.cells).filter(Boolean)
      : [];
    const sourceRows = firstSourceRowCells.length === 1
      ? sourceSheet.rows.slice(1)
      : sourceSheet.rows;
    const leafHeader = sourceRows[1];
    const keyColumn = findColumnByHeader(sourceSheet, leafHeader, "Key");
    const descriptionColumn = findColumnByHeader(sourceSheet, leafHeader, "Description EN");
    const lookup = new Map();

    if (!keyColumn || !descriptionColumn) {
      return lookup;
    }

    for (const row of sourceRows.slice(2)) {
      const key = cellValue(row, keyColumn);
      const description = cellValue(row, descriptionColumn);
      if (!key || !description) {
        continue;
      }
      lookup.set(key, description);
      if (sheetName === "CL038" && /^0\d$/.test(key)) {
        lookup.set(String(Number(key)), description);
      }
    }

    return lookup;
  }

  function findColumnByHeader(sourceSheet, headerRow, label) {
    for (let index = 1; index <= sourceSheet.column_count; index += 1) {
      if (cellValue(headerRow, index) === label) {
        return index;
      }
    }
    return 0;
  }

  function productDisplayValueLookup() {
    const sourceSheet = data.sheets.find((candidate) => candidate.name === "CL037");
    if (!sourceSheet) {
      return { keyOrder: [], lookup: new Map() };
    }

    const firstSourceRow = sourceSheet.rows[0];
    const firstSourceRowCells = firstSourceRow
      ? Object.values(firstSourceRow.cells).filter(Boolean)
      : [];
    const sourceRows = firstSourceRowCells.length === 1
      ? sourceSheet.rows.slice(1)
      : sourceSheet.rows;
    const leafHeader = sourceRows[1];
    const keyColumn = findColumnByHeader(sourceSheet, leafHeader, "Key");
    const displayColumn = findColumnByHeader(sourceSheet, leafHeader, "Display value EN");
    const keyOrder = [];
    const lookup = new Map();

    if (!keyColumn || !displayColumn) {
      return { keyOrder, lookup };
    }

    for (const row of sourceRows.slice(2)) {
      const key = cellValue(row, keyColumn);
      const displayValue = cellValue(row, displayColumn);
      if (!key || !displayValue || lookup.has(key)) {
        continue;
      }
      keyOrder.push(key);
      lookup.set(key, displayValue);
    }

    return { keyOrder, lookup };
  }

  function cl038EventLookup() {
    const sourceSheet = data.sheets.find((candidate) => candidate.name === "CL038");
    if (!sourceSheet) {
      return new Map();
    }

    const firstSourceRow = sourceSheet.rows[0];
    const firstSourceRowCells = firstSourceRow
      ? Object.values(firstSourceRow.cells).filter(Boolean)
      : [];
    const sourceRows = firstSourceRowCells.length === 1
      ? sourceSheet.rows.slice(1)
      : sourceSheet.rows;
    const leafHeader = sourceRows[1];
    const keyColumn = findColumnByHeader(sourceSheet, leafHeader, "Key");
    const eventColumn = findColumnByHeader(sourceSheet, leafHeader, "Description EN");
    const displayBgColumn = findColumnByHeader(sourceSheet, leafHeader, "Display value BG");
    const lookup = new Map();

    if (!keyColumn || !eventColumn || !displayBgColumn) {
      return lookup;
    }

    for (const row of sourceRows.slice(2)) {
      const key = cellValue(row, keyColumn);
      const event = cellValue(row, eventColumn);
      const displayBg = cellValue(row, displayBgColumn);
      if (!key || (!event && !displayBg)) {
        continue;
      }
      const value = { event, displayBg };
      lookup.set(key, value);
      if (/^0\d$/.test(key)) {
        lookup.set(String(Number(key)), value);
      }
    }

    return lookup;
  }

  const productDisplayValues = productDisplayValueLookup();
  const productKeyOrder = productDisplayValues.keyOrder;
  const productDisplayValuesByKey = productDisplayValues.lookup;
  const cl038EventsByCode = cl038EventLookup();

  const hisCodeDescriptionsBySheet = new Map([
    ["CL037", sheetCodeDescriptions("CL037")],
    ["CL038", sheetCodeDescriptions("CL038")],
  ]);

  function changeCodeDescription(code, text) {
    const cl037Descriptions = hisCodeDescriptionsBySheet.get("CL037") || new Map();
    const cl038Descriptions = hisCodeDescriptionsBySheet.get("CL038") || new Map();
    const mentionsCl037 = /\bCL037\b/i.test(text);
    const mentionsCl038 = /\bCL038\b/i.test(text);

    if (!mentionsCl037 && !mentionsCl038) {
      return "";
    }
    if (mentionsCl037 && !mentionsCl038) {
      return cl037Descriptions.get(code) || "";
    }
    if (mentionsCl038 && !mentionsCl037) {
      return cl038Descriptions.get(code) || cl037Descriptions.get(code) || "";
    }
    if (cl037Descriptions.has(code) && !cl038Descriptions.has(code)) {
      return cl037Descriptions.get(code);
    }
    if (cl038Descriptions.has(code) && !cl037Descriptions.has(code)) {
      return cl038Descriptions.get(code);
    }
    if (/^\s*(?:Номенклатура\s+)?CL037\b/i.test(text)) {
      return cl037Descriptions.get(code) || cl038Descriptions.get(code) || "";
    }
    return cl038Descriptions.get(code) || cl037Descriptions.get(code) || "";
  }

  function cl038EventForChangeCode(code, text) {
    if (!/\bCL038\b/i.test(text)) {
      return null;
    }

    const event = cl038EventsByCode.get(code);
    const label = bgColumnsVisible()
      ? event?.displayBg || event?.event || ""
      : event?.event || event?.displayBg || "";
    if (!label) {
      return null;
    }

    return {
      label,
      tooltip: bgColumnsVisible()
        ? `код ${code}`
        : `code ${code}`,
    };
  }

  function cl037ProductForChangeCode(code, text) {
    const mentionsCl037 = /\bCL037\b/i.test(text);
    const mentionsCl038 = /\bCL038\b/i.test(text);
    if (!mentionsCl037 && (!mentionsCl038 || cl038EventsByCode.has(code))) {
      return null;
    }

    const product = productDisplayValuesByKey.get(code);
    if (!product) {
      return null;
    }

    return {
      label: product,
      tooltip: bgColumnsVisible()
        ? `код ${code}`
        : `code ${code}`,
    };
  }

  function codeReplacementForChange(code, text) {
    return cl038EventForChangeCode(code, text) || cl037ProductForChangeCode(code, text);
  }

  function appendSheetReferenceText(parent, text) {
    const sheetPattern = /(?:Nomenclature|Номенклатура)\s+(CL037|CL038)\b/giu;
    let cursor = 0;

    for (const match of text.matchAll(sheetPattern)) {
      const phrase = match[0];
      const sheetName = match[1].toUpperCase();
      const start = match.index || 0;
      if (start > cursor) {
        parent.appendChild(document.createTextNode(text.slice(cursor, start)));
      }

      const label = data.sheets.find((candidate) => candidate.name === sheetName)?.label || sheetName;
      const sheetElement = document.createElement("span");
      sheetElement.className = "change-note-code";
      setTooltip(sheetElement, phrase);
      sheetElement.textContent = label;
      sheetElement.tabIndex = 0;
      sheetElement.setAttribute("aria-label", `${label}. ${phrase}`);
      parent.appendChild(sheetElement);
      cursor = start + phrase.length;
    }

    if (cursor < text.length) {
      parent.appendChild(document.createTextNode(text.slice(cursor)));
    }
  }

  function appendAnnotatedChangeText(parent, text) {
    const codeListPattern = /(?:(?:CL037|CL038)\s*[-:]\s*|(?:code(?:s)?|Key|record(?:s)?|row(?:s)?|код(?:ове)?|ключ(?:ове)?|запис(?:и)?|ред(?:ове)?)\s*(?::|от|from)?\s*)["“”']?-?\d+["“”']?(?:\s*(?:,|и|and|до|to|until|–)\s*["“”']?-?\d+["“”']?)*/giu;
    let cursor = 0;

    for (const match of text.matchAll(codeListPattern)) {
      const phrase = match[0];
      const start = match.index || 0;
      if (start > cursor) {
        appendSheetReferenceText(parent, text.slice(cursor, start));
      }
      appendAnnotatedCodePhrase(parent, phrase, text);
      cursor = start + phrase.length;
    }

    if (cursor < text.length) {
      appendSheetReferenceText(parent, text.slice(cursor));
    }
  }

  function eventCodePrefixText(text) {
    return text.replace(/(?:\bcode(?:s)?\b|код(?:ове)?)\s*(?::|от|from)?\s*$/iu, "");
  }

  function appendAnnotatedCodePhrase(parent, phrase, text) {
    const codePattern = /-?\d+/g;
    const codeMatches = [...phrase.matchAll(codePattern)];
    const translatedEventCount = codeMatches.filter((match) => (
      Boolean(codeReplacementForChange(match[0], text))
    )).length;
    let translatedEventIndex = 0;
    let cursor = 0;

    for (const match of codeMatches) {
      const code = match[0];
      const start = match.index || 0;
      const replacement = codeReplacementForChange(code, text);
      if (start > cursor) {
        const prefixText = phrase.slice(cursor, start);
        if (!replacement || translatedEventCount <= 1 || translatedEventIndex === 0) {
          appendSheetReferenceText(
            parent,
            replacement ? eventCodePrefixText(prefixText) : prefixText
          );
        }
      }

      if (replacement && translatedEventCount > 1) {
        parent.appendChild(document.createElement("br"));
      }

      const description = changeCodeDescription(code, text);
      if (replacement || description) {
        const codeElement = document.createElement("span");
        codeElement.className = "change-note-code";
        if (replacement && translatedEventCount > 1) {
          codeElement.classList.add("change-note-translated-line");
        }
        const label = replacement?.label || code;
        const tooltip = replacement?.tooltip || description;
        setTooltip(codeElement, tooltip);
        codeElement.textContent = label;
        codeElement.tabIndex = 0;
        codeElement.setAttribute("aria-label", `${label}. ${tooltip}`);
        parent.appendChild(codeElement);
      } else {
        parent.appendChild(document.createTextNode(code));
      }
      if (replacement) {
        translatedEventIndex += 1;
      }
      cursor = start + code.length;
    }

    if (cursor < phrase.length) {
      appendSheetReferenceText(parent, phrase.slice(cursor));
    }
  }

  function renderChangeNotes() {
    tableSection.hidden = true;
    changeNotesList.hidden = false;
    changeNotesList.replaceChildren();

    for (const version of data.change_notes || []) {
      const visibleChanges = (version.changes || []).filter(
        (change) => detailsVisible() || changeRegardsVaccines(change)
      );
      if (!visibleChanges.length) {
        continue;
      }

      const section = {
        title: versionTitle(version.version),
        style: "",
        notes: [],
      };
      appendChangeNoteSection(section);
      for (const change of visibleChanges) {
        const regardsVaccines = changeRegardsVaccines(change);
        appendChangeNote(section, changeText(change), "", !regardsVaccines, regardsVaccines);
      }
    }
  }

  function versionTitle(version) {
    return `${bgColumnsVisible() ? "Версия" : "Version"} ${version}`;
  }

  function appendChangeNoteSection(section) {
    const article = document.createElement("article");
    article.className = "change-note-version";

    const heading = document.createElement("div");
    heading.className = "change-note-title";
    heading.textContent = section.title;
    if (section.style === "red") {
      heading.classList.add("sheet-cell-red");
    }
    article.appendChild(heading);

    const notes = document.createElement("div");
    notes.className = "change-note-lines";
    article.appendChild(notes);

    section.element = article;
    section.notesElement = notes;
    changeNotesList.appendChild(article);
  }

  function appendChangeNote(section, text, style, muted = false, annotateCodes = true) {
    const item = document.createElement("div");
    item.className = "change-note-line";
    if (annotateCodes) {
      appendAnnotatedChangeText(item, text);
    } else {
      item.textContent = text;
    }
    if (style === "red") {
      item.classList.add("sheet-cell-red");
    }
    if (muted) {
      item.classList.add("change-note-line-muted");
    }
    section.notes.push(text);
    section.notesElement.appendChild(item);
  }

  document.title = `HIS ${sheet.name}`;
  caption.textContent = `HIS ${sheet.name}`;
  setButtonState(bgToggle, "show-bg", STORAGE_KEYS.showBulgarian, storedFlag(STORAGE_KEYS.showBulgarian));
  setButtonState(detailsToggle, "show-details", STORAGE_KEYS.showDetails, storedFlag(STORAGE_KEYS.showDetails));
  bgToggle.addEventListener("click", () => {
    setButtonState(
      bgToggle,
      "show-bg",
      STORAGE_KEYS.showBulgarian,
      !document.body.classList.contains("show-bg")
    );
    if (sheet.name === "Change Notes") {
      renderChangeNotes();
    } else {
      renderTable();
    }
  });
  detailsToggle.addEventListener("click", () => {
    setButtonState(
      detailsToggle,
      "show-details",
      STORAGE_KEYS.showDetails,
      !document.body.classList.contains("show-details")
    );
    if (sheet.name === "Change Notes") {
      renderChangeNotes();
    } else {
      renderTable();
    }
  });
  renderPageNav();
  if (sheet.name === "Change Notes") {
    appendSourceLine(sheetSource, sheet.source);
  }
  renderSources();
  renderOtherCalendars();
  if (sheet.name === "Change Notes") {
    renderChangeNotes();
  } else {
    renderTable();
  }
})();
