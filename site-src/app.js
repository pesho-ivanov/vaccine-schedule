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
  const sourceList = document.getElementById("source-list");

  title.textContent = data.title.en;

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

    const numberCol = document.createElement("col");
    numberCol.className = "number-col";
    colgroup.appendChild(numberCol);

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

    const numberHeader = document.createElement("th");
    numberHeader.scope = "col";
    numberHeader.className = "number-column";
    numberHeader.rowSpan = 2;
    numberHeader.textContent = "#";
    groupRow.appendChild(numberHeader);

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
        appendText(th, group.label.bg, "column-group-meta");
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
        appendText(th, meta, "column-meta");
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
      doseNode.title = dose.note;
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
    anchor.title = `EU countries for ${link.label}`;
    anchor.setAttribute("aria-label", `EU countries for ${link.label}`);

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

    if (links.length > 1) {
      for (const [index, link] of links.entries()) {
        if (index > 0) {
          line.appendChild(document.createTextNode(", "));
        }
        line.appendChild(document.createTextNode(link.label));
        line.appendChild(makeEcdcLink(link));
      }
    } else {
      line.appendChild(document.createTextNode(rowData.label.en));
      if (links.length === 1) {
        line.appendChild(makeEcdcLink(links[0]));
      }
    }

    parent.appendChild(line);
    return line;
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
    appendDiseaseName(nameCell, rowData);
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

  function sourceLabel(name) {
    return {
      ecdc_calendar: "ECDC",
      lex_calendar: "lex.bg",
      pregnancy_vaccine: "plusmen",
    }[name] || name.replaceAll("_", " ");
  }

  function renderSources() {
    for (const [name, url] of Object.entries(data.source_links)) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.textContent = sourceLabel(name);
      link.rel = "noreferrer";
      item.appendChild(link);
      sourceList.appendChild(item);
    }
  }

  table.appendChild(makeColGroup());
  table.appendChild(makeHeader());
  table.appendChild(makeBody());
  renderSources();
})();
