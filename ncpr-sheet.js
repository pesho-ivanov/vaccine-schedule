(() => {
  const data = window.NCPR_SHEETS;

  if (!data) {
    document.body.classList.add("site-error");
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p class=\"error-banner\">NCPR sheet data did not load.</p>"
    );
    return;
  }

  const route = window.VACCINE_SITE_ROUTE || {};
  if (route.section !== "ncpr") {
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
      "<p class=\"error-banner\">No NCPR vaccine sheets are available.</p>"
    );
    return;
  }

  const pageNav = document.getElementById("page-nav");
  const bgToggle = document.getElementById("bg-toggle");
  const detailsToggle = document.getElementById("details-toggle");
  const sourceList = document.getElementById("source-list");
  const otherCalendarList = document.getElementById("other-calendar-list");
  const table = document.getElementById("ncpr-sheet-table");
  const caption = document.getElementById("sheet-caption");
  const headerRows = sheet.header_rows || [];
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
      current: sheetId === sheet.id,
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
        currentSection: "ncpr",
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

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function headerTexts(column) {
    return headerRows
      .map((row) => cellValue(row, column))
      .filter(Boolean);
  }

  const columnHeaderLabels = new Map([
    ["Анатомо-терапевтичен код /АТС-код/", { en: "ATC", bg: "АТС код" }],
    ["Международно непатентно наименование /INN/", { en: "INN", bg: "INN" }],
    ["Наименование на лекарствения продукт", { en: "Product", bg: "Име на продукта" }],
    [
      "Наименование на лекарствения продукт/лекарствена форма и количество активно вещество в окончателна опаковка",
      { en: "Product", bg: "Име на продукта" },
    ],
    ["Лекарствена форма", { en: "Pharmaceutical form", bg: "Лекарствена форма" }],
    ["Количество на активното лекарствено вещество", { en: "Active substance quantity", bg: "Количество активно вещество" }],
    ["Окончателна опаковка", { en: "Pack size", bg: "Брой в опаковка" }],
    ["Окончателна опаковка(текст)", { en: "Package", bg: "Опаковка" }],
    ["Притежател на разрешението за употреба", { en: "Marketing authorization holder", bg: "Притежател на РУ" }],
    ["DDD/Терапевтичен курс", { en: "DDD / therapeutic course", bg: "DDD / терапевтичен курс" }],
    ["Цена по чл. 261a, ал.1 от ЗЛПХМ", { en: "Price under Art. 261a", bg: "Цена по чл. 261a" }],
    ["Референтна стойност за DDD/ Терапевтичен курс", { en: "Reference value for DDD / course", bg: "Референтна стойност" }],
    ["Стойност за опаковка, изчислена на база референтна стойност", { en: "Pack value by reference", bg: "Стойност за опаковка" }],
    ["Ниво на заплащане (%)", { en: "Reimbursement level", bg: "Ниво на заплащане" }],
    ["Терапевтични показания", { en: "Therapeutic indications", bg: "Показания" }],
    ["Ограничения в начина на предписване при различни индикации", { en: "Prescribing restrictions", bg: "Ограничения" }],
    ["Ограничения в предписването", { en: "Prescribing restrictions", bg: "Ограничения" }],
    ["Лечебни заведения", { en: "Medical establishments", bg: "Лечебни заведения" }],
    ["МКБ", { en: "ICD", bg: "МКБ" }],
    ["Допълнителна информация", { en: "Additional information", bg: "Допълнителна информация" }],
    ["№/дата на решението", { en: "Decision number/date", bg: "№/дата на решение" }],
    ["№ и дата на решение за поддържане на реимбурсен статус", { en: "Reimbursement status maintenance decision", bg: "Решение за реимб. статус" }],
    ["Дата на влизане в сила на решение за поддържане на реимбурсен статус", { en: "Maintenance decision effective date", bg: "Дата на влизане в сила" }],
    ["Дата на настъпили промени в обстоятелствата", { en: "Change date", bg: "Дата на промяна" }],
    [
      "Дата на настъпили промени в обстоятелствата във връзка с ПМС 196/2012 г., ДВ, бр. 68 от 04.09.2012 г.",
      { en: "PMS 196/2012 change date", bg: "Дата на промяна по ПМС 196/2012" },
    ],
    [
      "Дата на настъпили промени в обстоятелствата във връзка с &8  на НУПРЗРРЦЛП за привеждане в съответствие с чл. 1, ал. 3 от Наредба №42 на МЗ",
      { en: "Ordinance §8 alignment change date", bg: "Дата на промяна по §8" },
    ],
    ["Статус", { en: "Status", bg: "Статус" }],
    ["Национален номер", { en: "National number", bg: "Национален номер" }],
    ["Вид на лекарствен продукт", { en: "Product type", bg: "Вид ЛП" }],
  ]);

  function columnHeaderLabel(column) {
    const headers = headerTexts(column);
    if (!headers.length) {
      if (headerTexts(column - 1).includes("Количество на активното лекарствено вещество")) {
        return {
          en: "Strength unit",
          bg: "Мерна единица",
        };
      }
      if (headerTexts(column - 1).includes("DDD/Терапевтичен курс")) {
        return {
          en: "DDD / course unit",
          bg: "Мерна единица",
        };
      }
      return { en: "", bg: "" };
    }

    const primaryHeader = [...headers].reverse().find((header) => columnHeaderLabels.has(header)) || headers[0];
    const label = columnHeaderLabels.get(primaryHeader);
    return {
      en: label?.en || primaryHeader,
      bg: label?.bg || primaryHeader,
    };
  }

  function appendColumnHeader(parent, column) {
    const label = columnHeaderLabel(column);
    if (label.en) {
      appendText(parent, label.en, "column-label");
    }
    if (label.bg && label.bg !== label.en) {
      appendText(parent, label.bg, "column-meta translation-bg");
    }
  }

  function findColumnByHeader(label) {
    for (let index = 1; index <= sheet.column_count; index += 1) {
      if (headerTexts(index).includes(label)) {
        return index;
      }
    }
    return 0;
  }

  function isPatientFacingColumn(column) {
    const patientHeaders = new Set([
      "Международно непатентно наименование /INN/",
      "Наименование на лекарствения продукт",
      "Наименование на лекарствения продукт/лекарствена форма и количество активно вещество в окончателна опаковка",
      "Ниво на заплащане (%)",
      "Терапевтични показания",
      "Ограничения в начина на предписване при различни индикации",
      "Ограничения в предписването",
      "Лечебни заведения",
    ]);
    const headers = headerTexts(column);
    if (headers.some((text) => patientHeaders.has(text))) {
      return true;
    }
    return false;
  }

  function isPriceColumn(column) {
    return headerTexts(column).some((text) => {
      const header = text.trim().toLowerCase();
      return header.includes("цена")
        || header.includes("стойност")
        || header.includes("price")
        || header.includes("value")
        || header.includes("ддс")
        || header.includes("надбавка");
    });
  }

  function detailsVisible() {
    return document.body.classList.contains("show-details");
  }

  function isKeyColumn(column) {
    return headerTexts(column).some((text) => text.trim().toLowerCase() === "key");
  }

  function isAtcColumn(column) {
    return columnHeaderLabel(column).en === "ATC";
  }

  function isInnColumn(column) {
    return columnHeaderLabel(column).en === "INN";
  }

  function isProductColumn(column) {
    return columnHeaderLabel(column).en === "Product";
  }

  function atcColumnVisible() {
    return !isAtcColumn(1) || detailsVisible();
  }

  function rowHeaderVisible() {
    return (isKeyColumn(1) || isAtcColumn(1)) && detailsVisible();
  }

  function visibleColumns() {
    const columns = [];
    const startColumn = rowHeaderVisible() ? 2 : 1;
    for (let index = startColumn; index <= sheet.column_count; index += 1) {
      if (
        detailsVisible()
        || (
          !isKeyColumn(index)
          && !isAtcColumn(index)
          && (isPatientFacingColumn(index) || isPriceColumn(index))
          && columnHasVisibleProductValue(index)
        )
      ) {
        columns.push(index);
      }
    }
    return columns;
  }

  function columnHasVisibleProductValue(column) {
    return visibleRows().some(
      (row) => !isCategoryRow(row) && Boolean(displayText(cellValue(row, column)))
    );
  }

  function isOldRecordRow(row) {
    const statusColumn = findColumnByHeader("Статус");
    const status = statusColumn ? cellValue(row, statusColumn) : "";
    return Boolean(status && status !== "Активен");
  }

  function visibleRows() {
    return sheet.rows.filter((row) => detailsVisible() || !isOldRecordRow(row));
  }

  function nonEmptyCellCount(row) {
    return Object.values(row.cells || {}).filter((value) => String(value || "").trim()).length;
  }

  function isCategoryRow(row) {
    return cellValue(row, 1).startsWith("J07")
      && nonEmptyCellCount(row) <= 3
      && Boolean(cellValue(row, 3));
  }

  function categoryName(row) {
    const atc = cellValue(row, 1);
    const text = displayText(cellValue(row, 3) || cellValue(row, 2));
    if (!atc || !text) {
      return text;
    }
    return text.replace(new RegExp(`^${escapeRegExp(atc)}\\s*`, "i"), "").trim();
  }

  function productRowsWithCategoryName() {
    const rows = [];
    let currentName = "";
    for (const row of visibleRows()) {
      if (isCategoryRow(row)) {
        currentName = categoryName(row);
        continue;
      }
      rows.push({ row, name: currentName });
    }
    return rows;
  }

  function categoryNamesVisible() {
    return visibleRows().some(isCategoryRow);
  }

  function atcValue(row) {
    for (let index = 1; index <= sheet.column_count; index += 1) {
      if (isAtcColumn(index)) {
        return cellValue(row, index);
      }
    }
    return "";
  }

  function appendCellText(parent, text, tooltip = "") {
    if (!tooltip || !text) {
      parent.textContent = text;
      return;
    }

    const label = document.createElement("span");
    label.className = "sheet-cell-tooltip";
    label.textContent = text;
    setTooltip(label, tooltip);
    label.tabIndex = 0;
    label.setAttribute("aria-label", `${text}. ${tooltip}`);
    parent.appendChild(label);
  }

  function appendColumnHeaders(row, columns) {
    for (const index of columns) {
      const th = document.createElement("th");
      th.scope = "col";
      appendColumnHeader(th, index);
      row.appendChild(th);
    }
  }

  function appendSheetDataCell(tr, sheetRow, index) {
    const td = document.createElement("td");
    const text = displayText(cellValue(sheetRow, index));
    const atc = atcValue(sheetRow);
    appendCellText(
      td,
      text,
      !atcColumnVisible() && isInnColumn(index) && atc ? `ATC: ${atc}` : ""
    );
    tr.appendChild(td);
  }

  function appendHeader(targetTable) {
    const thead = document.createElement("thead");
    const row = document.createElement("tr");
    row.className = "sheet-column-header";
    const columns = visibleColumns();
    const productColumns = columns.filter(isProductColumn);
    const otherColumns = columns.filter((column) => !isProductColumn(column));
    const columnCount = columns.length
      + 1
      + (rowHeaderVisible() ? 1 : 0)
      + (categoryNamesVisible() ? 1 : 0);

    const sourceRow = document.createElement("tr");
    sourceRow.className = "table-source-row";
    const sourceCell = document.createElement("th");
    sourceCell.scope = "colgroup";
    sourceCell.colSpan = columnCount;
    appendSourceLine(sourceCell, sheet.source);
    sourceRow.appendChild(sourceCell);

    const rowNumberHeader = document.createElement("th");
    rowNumberHeader.scope = "col";
    rowNumberHeader.className = "sheet-display-row-number";
    rowNumberHeader.setAttribute("aria-label", "Row number");
    row.appendChild(rowNumberHeader);

    if (rowHeaderVisible()) {
      const rowHeader = document.createElement("th");
      rowHeader.scope = "col";
      rowHeader.className = "sheet-row-number";
      appendColumnHeader(rowHeader, 1);
      row.appendChild(rowHeader);
    }

    appendColumnHeaders(row, productColumns);

    if (categoryNamesVisible()) {
      const nameHeader = document.createElement("th");
      nameHeader.scope = "col";
      appendText(nameHeader, "Name", "column-label");
      appendText(nameHeader, "Име", "column-meta translation-bg");
      row.appendChild(nameHeader);
    }

    appendColumnHeaders(row, otherColumns);

    thead.appendChild(sourceRow);
    thead.appendChild(row);
    targetTable.appendChild(thead);
  }

  function appendBody(targetTable) {
    const tbody = document.createElement("tbody");
    const columns = visibleColumns();
    const productColumns = columns.filter(isProductColumn);
    const otherColumns = columns.filter((column) => !isProductColumn(column));

    for (const [index, { row: sheetRow, name }] of productRowsWithCategoryName().entries()) {
      const tr = document.createElement("tr");

      const rowNumberCell = document.createElement("th");
      rowNumberCell.scope = "row";
      rowNumberCell.className = "sheet-display-row-number";
      rowNumberCell.textContent = index + 1;
      tr.appendChild(rowNumberCell);

      if (rowHeaderVisible()) {
        const atcCell = document.createElement("th");
        atcCell.scope = "row";
        atcCell.className = "sheet-row-number";
        atcCell.textContent = cellValue(sheetRow, 1);
        tr.appendChild(atcCell);
      }

      for (const index of productColumns) {
        appendSheetDataCell(tr, sheetRow, index);
      }

      if (categoryNamesVisible()) {
        const nameCell = document.createElement("td");
        nameCell.textContent = name;
        tr.appendChild(nameCell);
      }

      for (const index of otherColumns) {
        appendSheetDataCell(tr, sheetRow, index);
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
  });
  detailsToggle.addEventListener("click", () => {
    setButtonState(
      detailsToggle,
      "show-details",
      STORAGE_KEYS.showDetails,
      !detailsVisible()
    );
    renderTable();
  });
  renderPageNav();
  renderTable();
  renderSources();
  renderOtherCalendars();
})();
