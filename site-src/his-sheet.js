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

  const params = new URLSearchParams(window.location.search);
  const requestedSheet = params.get("sheet") || data.sheets[0]?.name;
  const sheet = data.sheets.find((candidate) => candidate.name === requestedSheet) || data.sheets[0];

  const nav = document.getElementById("sheet-nav");
  const bgToggle = document.getElementById("bg-toggle");
  const oldRecordsToggle = document.getElementById("old-records-toggle");
  const detailsToggle = document.getElementById("details-toggle");
  const hisSheetsSource = document.getElementById("his-sheets-source");
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
  const dataColumns = Array.from(
    { length: sheet.column_count - (usesKeyRowHeader ? 1 : 0) },
    (_, index) => index + (usesKeyRowHeader ? 2 : 1)
  );

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

  function appendSheetNav() {
    for (const candidate of data.sheets) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `his-sheet.html?sheet=${encodeURIComponent(candidate.name)}`;
      link.textContent = candidate.label || candidate.name;
      if (["CL037", "CL038"].includes(candidate.name)) {
        link.title = `sheet ${candidate.name}`;
      }
      if (candidate.name === sheet.name) {
        link.setAttribute("aria-current", "page");
      }
      item.appendChild(link);
      nav.appendChild(item);
    }
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
      link.title = title;
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

  function bgColumnsVisible() {
    return document.body.classList.contains("show-bg");
  }

  function isBulgarianColumn(column) {
    return usesKeyRowHeader && /\bBG$/i.test(cellValue(hierarchicalHeaderRows[1], column));
  }

  function isAlwaysHiddenColumn(column) {
    return sheet.name === "CL038" && [
      "CL082 Mapping",
      "CL037 Mapping (2023)",
      "CL037 Mapping (2024)",
    ].includes(cellValue(hierarchicalHeaderRows[1], column));
  }

  function isOldRecordColumn(column) {
    return usesKeyRowHeader && cellValue(hierarchicalHeaderRows[1], column) === "Valid Until";
  }

  function detailsVisible() {
    return document.body.classList.contains("show-details");
  }

  function isDetailsColumn(column) {
    const hiddenBySheet = {
      CL037: [
        "Description EN",
        "Vaccine Group",
        "Dose Quantity (ml)",
        "Permit Number",
        "Permit Owner ID",
        "MH code",
        "Since",
      ],
      CL038: [
        "Display transfered data EN",
        "Display value EN",
        "Since",
      ],
    };
    return (hiddenBySheet[sheet.name] || []).includes(cellValue(hierarchicalHeaderRows[1], column));
  }

  function visibleColumns() {
    return dataColumns.filter(
      (column) => (
        !isAlwaysHiddenColumn(column)
        && (oldRecordsVisible() || !isOldRecordColumn(column))
        && (detailsVisible() || !isDetailsColumn(column))
        && (bgColumnsVisible() || !isBulgarianColumn(column))
      )
    );
  }

  function oldRecordsVisible() {
    return document.body.classList.contains("show-old-records");
  }

  function isOldRecordRow(row) {
    return usesKeyRowHeader && (row.row_style === "red" || cellStyle(row, 1) === "red");
  }

  function isDetailsRow(row) {
    return sheet.name === "CL037" && cellValue(row, 1) === "99999";
  }

  function visibleRows() {
    return baseBodyRows.filter(
      (row) => (
        (oldRecordsVisible() || !isOldRecordRow(row))
        && (detailsVisible() || !isDetailsRow(row))
      )
    );
  }

  function isFootnoteRow(row) {
    return !cellValue(row, 1) && /^\*+/.test(cellValue(row, 2));
  }

  function groupHeaders(row, columns) {
    const starts = [];
    for (let index = 1; index <= sheet.column_count; index += 1) {
      const label = cellValue(row, index);
      if (label) {
        starts.push({ column: index, label, style: cellStyle(row, index) });
      }
    }

    return starts.map((group, index) => {
      const next = starts[index + 1];
      const end = (next ? next.column : sheet.column_count + 1) - 1;
      return {
        label: group.label,
        span: columns.filter((column) => column >= group.column && column <= end).length,
        style: group.style,
      };
    }).filter((group) => group.span > 0);
  }

  function appendHeader() {
    const thead = document.createElement("thead");
    const hasHierarchy = hierarchicalHeaderRows.length === 2;
    const columns = visibleColumns();
    const row = document.createElement("tr");
    row.className = hasHierarchy ? "sheet-group-header" : "sheet-column-header";

    const rowHeader = document.createElement("th");
    rowHeader.scope = "col";
    rowHeader.className = "sheet-row-number";
    if (hasHierarchy) {
      rowHeader.rowSpan = 2;
    }
    rowHeader.textContent = usesKeyRowHeader
      ? cellValue(hierarchicalHeaderRows[1], 1) || "Key"
      : "";
    if (usesKeyRowHeader) {
      applyCellStyle(rowHeader, hierarchicalHeaderRows[1], 1);
    }
    row.appendChild(rowHeader);

    if (hasHierarchy) {
      for (const group of groupHeaders(hierarchicalHeaderRows[0], columns)) {
        const th = document.createElement("th");
        th.scope = "colgroup";
        th.colSpan = group.span;
        th.textContent = group.label;
        if (group.style === "red") {
          th.classList.add("sheet-cell-red");
        }
        row.appendChild(th);
      }
      thead.appendChild(row);

      const leafRow = document.createElement("tr");
      leafRow.className = "sheet-column-header";
      for (const index of columns) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = cellValue(hierarchicalHeaderRows[1], index) || columnName(index);
        applyCellStyle(th, hierarchicalHeaderRows[1], index);
        leafRow.appendChild(th);
      }
      thead.appendChild(leafRow);
    } else {
      for (const index of columns) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = columnName(index);
        row.appendChild(th);
      }
      thead.appendChild(row);
    }

    table.appendChild(thead);
  }

  function appendBody() {
    const tbody = document.createElement("tbody");
    const columns = visibleColumns();

    for (const sheetRow of visibleRows()) {
      const tr = document.createElement("tr");
      if (sheetRow.row_style === "red") {
        tr.classList.add("sheet-row-red");
      }
      const rowNumber = document.createElement("th");
      rowNumber.scope = "row";
      rowNumber.className = "sheet-row-number";
      rowNumber.textContent = usesKeyRowHeader ? cellValue(sheetRow, 1) : sheetRow.index;
      if (usesKeyRowHeader) {
        applyCellStyle(rowNumber, sheetRow, 1);
      }
      tr.appendChild(rowNumber);

      for (const index of columns) {
        const td = document.createElement("td");
        td.textContent = sheetRow.cells[index] || "";
        applyCellStyle(td, sheetRow, index);
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
  }

  function renderTable() {
    table.replaceChildren();
    footnotes.replaceChildren();
    footnotes.hidden = true;
    appendHeader();
    appendBody();
    appendFootnotes();
  }

  function appendFootnotes() {
    if (!footnoteRows.length) {
      return;
    }

    const list = document.createElement("ul");
    for (const row of footnoteRows) {
      const item = document.createElement("li");
      item.textContent = cellValue(row, 2);
      applyCellStyle(item, row, 2);
      list.appendChild(item);
    }
    footnotes.appendChild(list);
    footnotes.hidden = false;
  }

  function appendChangeNotes() {
    tableSection.hidden = true;
    changeNotesList.hidden = false;

    for (const version of data.change_notes || []) {
      const section = {
        title: version.version,
        style: "",
        notes: [],
      };
      appendChangeNoteSection(section);
      for (const change of version.changes) {
        appendChangeNote(section, change, "");
      }
    }
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

  function appendChangeNote(section, text, style) {
    const item = document.createElement("div");
    item.className = "change-note-line";
    item.textContent = text;
    if (style === "red") {
      item.classList.add("sheet-cell-red");
    }
    section.notes.push(text);
    section.notesElement.appendChild(item);
  }

  document.title = `HIS ${sheet.name}`;
  caption.textContent = `HIS ${sheet.name}`;
  hisSheetsSource.href = data.source.page_url;
  hisSheetsSource.textContent = `HIS sheets (${data.source.his_version}, ${data.source.nomenclatures_date}):`;
  bgToggle.addEventListener("click", () => {
    const showBulgarian = !document.body.classList.contains("show-bg");
    document.body.classList.toggle("show-bg", showBulgarian);
    bgToggle.setAttribute("aria-pressed", String(showBulgarian));
    if (sheet.name !== "Change Notes") {
      renderTable();
    }
  });
  oldRecordsToggle.addEventListener("click", () => {
    const showOldRecords = !document.body.classList.contains("show-old-records");
    document.body.classList.toggle("show-old-records", showOldRecords);
    oldRecordsToggle.setAttribute("aria-pressed", String(showOldRecords));
    if (sheet.name !== "Change Notes") {
      renderTable();
    }
  });
  detailsToggle.addEventListener("click", () => {
    const showDetails = !document.body.classList.contains("show-details");
    document.body.classList.toggle("show-details", showDetails);
    detailsToggle.setAttribute("aria-pressed", String(showDetails));
    if (sheet.name !== "Change Notes") {
      renderTable();
    }
  });
  appendSheetNav();
  renderSources();
  renderOtherCalendars();
  if (sheet.name === "Change Notes") {
    appendChangeNotes();
  } else {
    renderTable();
  }
})();
