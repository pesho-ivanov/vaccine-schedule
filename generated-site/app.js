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
  const summaryVaccines = document.getElementById("summary-vaccines");
  const summaryColumns = document.getElementById("summary-columns");
  const sourceList = document.getElementById("source-list");

  title.textContent = data.title.en;
  summaryVaccines.textContent = String(data.rows.length);
  summaryColumns.textContent = String(data.columns.length);
  table.style.setProperty("--column-count", data.columns.length);

  function appendText(parent, value, className) {
    const node = document.createElement("span");
    if (className) {
      node.className = className;
    }
    node.textContent = value;
    parent.appendChild(node);
    return node;
  }

  function columnMeta(column) {
    if (column.id.startsWith("pregnancy_")) {
      return column.id.replace("pregnancy_", "").toUpperCase();
    }
    if (column.label.bg && column.label.bg !== column.label.en) {
      return column.label.bg;
    }
    return "";
  }

  function makeHeader() {
    const thead = document.createElement("thead");
    const row = document.createElement("tr");

    const numberHeader = document.createElement("th");
    numberHeader.scope = "col";
    numberHeader.className = "number-column";
    numberHeader.textContent = "#";
    row.appendChild(numberHeader);

    const vaccineHeader = document.createElement("th");
    vaccineHeader.scope = "col";
    vaccineHeader.className = "vaccine-column";
    vaccineHeader.textContent = "Vaccine";
    row.appendChild(vaccineHeader);

    for (const column of data.columns) {
      const th = document.createElement("th");
      th.scope = "col";
      th.className = "time-column";
      appendText(th, column.label.en, "column-label");
      const meta = columnMeta(column);
      if (meta) {
        appendText(th, meta, "column-meta");
      }
      row.appendChild(th);
    }

    thead.appendChild(row);
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
      doseNode.title = dose.note;
      doseNode.setAttribute("aria-label", `${dose.text}. ${dose.note}`);
    }
    return doseNode;
  }

  function makeBodyRow(rowData, rowNumber) {
    const tr = document.createElement("tr");
    tr.className = `schedule-row ${rowData.group}`;
    if (rowData.divider_after) {
      tr.classList.add("divider-after");
    }

    const numberCell = document.createElement("td");
    numberCell.className = "number-cell";
    numberCell.textContent = String(rowNumber);
    tr.appendChild(numberCell);

    const nameCell = document.createElement("th");
    nameCell.scope = "row";
    nameCell.className = "vaccine-cell";
    appendText(nameCell, rowData.short.en, "vaccine-short");
    appendText(nameCell, rowData.label.en, "vaccine-label");
    if (rowData.label.bg && rowData.label.bg !== rowData.label.en) {
      appendText(nameCell, rowData.label.bg, "vaccine-bg");
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

  function renderSources() {
    for (const [name, url] of Object.entries(data.source_links)) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.textContent = name.replaceAll("_", " ");
      link.rel = "noreferrer";
      item.appendChild(link);
      sourceList.appendChild(item);
    }
  }

  table.appendChild(makeHeader());
  table.appendChild(makeBody());
  renderSources();
})();
