from __future__ import annotations

import copy
import html
import math
from calendar import monthrange
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path

import yaml


MODULE_DIR = Path(__file__).resolve().parent
DATA_DIR = MODULE_DIR / "data/bg"
DAYS_PER_MONTH = 365.2425 / 12.0


def read_yaml(path: Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def normalized_disease_name(value: str) -> str:
    return " ".join(value.lower().split())


SOURCES = read_yaml(DATA_DIR / "sources.yaml")
METADATA = read_yaml(DATA_DIR / "metadata.yaml")
COLUMNS_DATA = read_yaml(DATA_DIR / "columns.yaml")
DISEASES_DATA = read_yaml(DATA_DIR / "diseases.yaml")
SCHEDULE_DATA = read_yaml(DATA_DIR / "schedule.yaml")
SCHEDULE_DOSE_TEXTS_DATA = read_yaml(DATA_DIR / "dose_texts.yaml")
SCHEDULE_NOTES_DATA = read_yaml(DATA_DIR / "notes.yaml")
SOURCE_LINKS = SOURCES["source_links"]
DISEASE_DEFS = DISEASES_DATA["diseases"]
DISEASE_BY_ID = {disease["id"]: disease for disease in DISEASE_DEFS}
VACCINES_DATA = DISEASES_DATA
VACCINE_DEFS = DISEASE_DEFS
VACCINE_BY_ID = DISEASE_BY_ID
COLUMN_DEFS = COLUMNS_DATA["columns"]
COLUMN_IDS = [column["id"] for column in COLUMN_DEFS]
COLUMN_ID_TO_INDEX = {column_id: index for index, column_id in enumerate(COLUMN_IDS)}
ECDC_CALENDAR_SOURCE_URL = SOURCE_LINKS["ecdc_calendar"]
LEX_CALENDAR_SOURCE_URL = SOURCE_LINKS["lex_calendar"]
PREGNANCY_VACCINE_SOURCE_URL = SOURCE_LINKS["pregnancy_vaccine"]
VACCINE_TEXT = METADATA["text"]

@dataclass(frozen=True)
class VaccineRecord:
    given_on: date
    date_text: str
    vaccine: str
    url: str
    diseases: tuple[str, ...]
    border_color: str
    fill_color: str

VACCINE_DISEASE_ROW_LABELS: dict[str, list[str]] = {}
for vaccine in VACCINE_DEFS:
    for alias in vaccine.get("record_aliases", []):
        VACCINE_DISEASE_ROW_LABELS.setdefault(
            normalized_disease_name(alias),
            [],
        ).append(vaccine["label"]["en"])
ECDC_CALENDAR_COLUMNS = [column["label"]["en"] for column in COLUMN_DEFS]
ECDC_LABEL_TRANSLATIONS = {
    normalized_disease_name(vaccine["label"]["en"]): vaccine["label"].get("bg", "")
    for vaccine in VACCINE_DEFS
}
ECDC_LABEL_SHORTENINGS = {
    normalized_disease_name(vaccine["label"]["en"]): vaccine.get("short", {}).get("en", vaccine["label"]["en"])
    for vaccine in VACCINE_DEFS
}
ECDC_LABEL_SHORTENINGS_BG = {
    normalized_disease_name(vaccine["label"]["en"]): vaccine.get("short", {}).get("bg", vaccine["label"].get("bg", vaccine["label"]["en"]))
    for vaccine in VACCINE_DEFS
}
ECDC_LABEL_HOVER_NAMES = {
    normalized_disease_name(vaccine["label"]["en"]): vaccine["hover_label"]["en"]
    for vaccine in VACCINE_DEFS
    if "hover_label" in vaccine
}
ECDC_CALENDAR_AGE_MONTHS = [column["age_months"] for column in COLUMN_DEFS]
ECDC_ADULT_EXTRA_START_COLUMN = ECDC_CALENDAR_COLUMNS.index(
    COLUMN_DEFS[COLUMN_ID_TO_INDEX[METADATA["age_ranges"]["adult_extra_start_column"]]]["label"]["en"]
)
VACCINE_OVERLAY_COLORS = METADATA["vaccine_overlay_colors"]
ECDC_COLUMN_LOCALIZATIONS = {
    "bg": {
        column["label"]["en"]: column["label"].get("bg", column["label"]["en"])
        for column in COLUMN_DEFS
    }
}
SCHEDULE_CELL_OVERLAY_CONFIG = METADATA["schedule_cell_overlays"]
PRE_BIRTH_RECORD_COLUMN_RULES = METADATA.get("pre_birth_record_columns", [])
DEFAULT_PRE_BIRTH_RECORD_COLUMN = METADATA.get("default_pre_birth_record_column")


def vaccine_text(locale: str) -> dict[str, str]:
    return VACCINE_TEXT.get(locale, VACCINE_TEXT["en"])


def immunization_card_html(
    calendar: dict,
    header_records: list[list[VaccineRecord]],
    personal_vaccines_label: str,
    locale: str = "en",
) -> str:
    text = vaccine_text(locale)
    title = html.escape(calendar["title"])
    calendar_id = html.escape(calendar["id"], quote=True)
    return f"""
      <article class="result-card immunization-card" id="{calendar_id}">
        <div class="chart-surface">
          <div class="result-meta">
            <h2>{title}</h2>
            <div class="calendar-range-switch" aria-label="{html.escape(text['age_range'], quote=True)}">
              <button type="button" data-calendar-range-button="all" aria-selected="false">{html.escape(text['all_ages'])}</button>
              <button type="button" data-calendar-range-button="pregnancy" aria-selected="false">{html.escape(text['pregnancy'])}</button>
              <button type="button" data-calendar-range-button="early" aria-selected="true">{html.escape(text['until_1_5_years'])}</button>
              <button type="button" data-calendar-range-button="late" aria-selected="false">{html.escape(text['after_4_years'])}</button>
              <button type="button" data-calendar-range-button="adult" aria-selected="false">{html.escape(text['adult_years'])}</button>
            </div>
          </div>
          <div class="calendar-scroll">
{immunization_table_html(calendar, header_records, personal_vaccines_label, locale)}
            <div class="vaccine-overlays" data-calendar-overlay="{calendar_id}" aria-hidden="true"></div>
          </div>
        </div>
      </article>"""


def multiline_html(value: str) -> str:
    return "<br>".join(html.escape(part) for part in value.split("\n"))


def wrapped_text_html(value: str) -> str:
    return html.escape(" ".join(value.split()))


def immunization_note_attrs(cell: dict) -> str:
    note_text = cell.get("note", "")
    if not note_text:
        if cell.get("noteStyle"):
            return ' class="calendar-note"'
        return ""

    note_text = " ".join(str(note_text).split())
    title = html.escape(note_text, quote=True)
    aria_label = html.escape(f"{cell['text']}. {note_text}", quote=True)
    return f' class="calendar-note" title="{title}" aria-label="{aria_label}"'


def immunization_cell_html(cell: dict) -> str:
    content = multiline_html(cell["text"])
    note_attrs = immunization_note_attrs(cell)
    if cell.get("struck"):
        content = f"<s>{content}</s>"
    if note_attrs:
        return f"<span{note_attrs}>{content}</span>"
    return content


def immunization_header_cell_html(
    records: list[VaccineRecord],
    date_label_override: str | None = None,
    date_label_class: str | None = None,
) -> str:
    date_class = "immunization-header-date"
    if date_label_class:
        date_class = f"{date_class} {date_label_class}"

    if not records:
        if date_label_override is None:
            return ""
        return (
            '<div class="immunization-header-group">'
            f'<div class="{date_class}">{html.escape(date_label_override)}</div>'
            "</div>"
        )

    if date_label_override is not None:
        records_by_date = {date_label_override: records}
    else:
        records_by_date: dict[str, list[VaccineRecord]] = {}
        for record in records:
            records_by_date.setdefault(record.date_text, []).append(record)

    if not records_by_date:
        return ""

    groups = []
    for date_text, date_records in records_by_date.items():
        vaccines = "".join(
            f'<div class="immunization-header-vaccine">{immunization_vaccine_link_html(record)}</div>'
            for record in date_records
        )
        groups.append(
            '<div class="immunization-header-group">'
            f'<div class="{date_class}">{html.escape(date_text)}</div>'
            f'<div class="immunization-header-vaccines">{vaccines}</div>'
            "</div>"
        )

    return "".join(groups)


def latest_vaccine_column(header_records: list[list[VaccineRecord]]) -> int | None:
    latest = latest_vaccine_info(header_records)
    return None if latest is None else latest[0]


def latest_vaccine_info(
    header_records: list[list[VaccineRecord]],
) -> tuple[int, VaccineRecord] | None:
    latest_key: tuple[date, int] | None = None
    latest: tuple[int, VaccineRecord] | None = None
    for column, records in enumerate(header_records):
        for record in records:
            candidate = (record.given_on, column)
            if latest_key is None or candidate > latest_key:
                latest_key = candidate
                latest = (column, record)
    return latest


def next_todo_column(header_records: list[list[VaccineRecord]]) -> int | None:
    latest_column = latest_vaccine_column(header_records)
    if latest_column is None:
        return None

    column = latest_column + 1
    if column >= len(header_records):
        return None
    return column


def next_todo_date(calendar: dict, header_records: list[list[VaccineRecord]]) -> date | None:
    latest = latest_vaccine_info(header_records)
    if latest is None:
        return None

    latest_column, latest_record = latest
    todo_column = next_todo_column(header_records)
    if todo_column is None:
        return None

    ages = calendar.get("ageMonths", [])
    if latest_column >= len(ages) or todo_column >= len(ages):
        return None

    month_delay = ages[todo_column] - ages[latest_column]
    if month_delay <= 0:
        return None

    return add_calendar_month_delay(latest_record.given_on, month_delay)


def next_todo_label(
    calendar: dict,
    header_records: list[list[VaccineRecord]],
    locale: str = "en",
) -> str:
    text = vaccine_text(locale)
    if due_date := next_todo_date(calendar, header_records):
        return f"{text['next']}\n~{format_short_vaccine_date(due_date)}"
    return text["next"].rstrip(":")


def immunization_column_classes(
    base_class: str,
    column: int,
    latest_column: int | None,
    todo_column: int | None,
    span: int = 1,
) -> str:
    classes = [base_class] if base_class else []
    span_end = column + span
    if todo_column is not None and column < todo_column:
        classes.append("calendar-progress-column")
    if latest_column is not None and column <= latest_column < span_end:
        classes.append("calendar-latest-vaccine-column")
    if todo_column is not None and column <= todo_column < span_end:
        classes.append("calendar-todo-column")
    return " ".join(classes)


def compact_column_width_ch(
    calendar: dict,
    header_records: list[list[VaccineRecord]],
    column: int,
    header_label_override: str | None = None,
) -> int:
    text_lengths = [len(" ".join(str(calendar["columns"][column]).split()))]
    if header_label_override:
        text_lengths.extend(
            len(line) for line in header_label_override.splitlines() if line
        )
    for record in header_records[column]:
        text_lengths.append(len(record.date_text))
        text_lengths.append(len(record.vaccine))

    for row in calendar["rows"]:
        for cell in row["cells"]:
            start_column = cell["column"]
            span = cell.get("span", 1)
            if start_column <= column < start_column + span:
                text_lengths.append(math.ceil(len(str(cell["text"])) / span))

    width = max(5, max(text_lengths, default=0) + 1)
    if column == 0:
        return min(width, 9)
    return width


def row_header_html(row: dict, locale: str = "en") -> str:
    full_label = " ".join(str(row["label"]).split())
    normalized_label = normalized_disease_name(full_label)
    hover_label = ECDC_LABEL_HOVER_NAMES.get(normalized_label, full_label)
    label_shortenings = (
        ECDC_LABEL_SHORTENINGS_BG if locale == "bg" else ECDC_LABEL_SHORTENINGS
    )
    label = wrapped_text_html(
        label_shortenings.get(normalized_label, full_label)
    )
    title_lines = [hover_label]
    if title := row.get("labelTitle") or ECDC_LABEL_TRANSLATIONS.get(
        normalized_label,
        "",
    ):
        title_lines.append(str(title))
    title = "\n".join(title_lines)
    if title == full_label and label == full_label and hover_label == full_label:
        return f'<th scope="row">{label}</th>'

    escaped_title = html.escape(title, quote=True)
    return f'<th scope="row" title="{escaped_title}">{label}</th>'


def mandatory_row_count(rows: list[dict]) -> int:
    return sum(1 for row in rows if ecdc_row_has_mandatory_cell(row))


def has_mandatory_cell_metadata(rows: list[dict]) -> bool:
    return any("mandatory" in cell for row in rows for cell in row["cells"])


def immunization_section_row_html(label: str, column_count: int) -> str:
    escaped_label = html.escape(label)
    return (
        '              <tr class="immunization-section-row">'
        f'<th scope="rowgroup" colspan="{column_count + 1}">{escaped_label}</th></tr>'
    )


def is_plain_month_column(label: str) -> bool:
    compact_label = label.replace(" ", "")
    return compact_label.endswith("m") and compact_label[:-1].isdigit()


def is_plain_year_column(label: str) -> bool:
    compact_label = label.replace(" ", "")
    number = compact_label.removesuffix("y")
    return compact_label.endswith("y") and number.removeprefix(">=").removeprefix("≥").isdigit()


def immunization_age_header_label(label: str) -> str:
    compact_label = label.replace(" ", "")
    if is_plain_month_column(label) or is_plain_year_column(label):
        return compact_label[:-1]
    return label


def immunization_age_header_html(label: str) -> str:
    content = multiline_html(immunization_age_header_label(label))
    if normalized_disease_name(label) in {"pregnancy", "бременност"}:
        escaped_url = html.escape(PREGNANCY_VACCINE_SOURCE_URL, quote=True)
        return (
            f'<a class="vaccine-link" href="{escaped_url}" target="_blank" '
            f'rel="noopener">{content}</a>'
        )
    return content


def immunization_month_group_row_html(
    calendar: dict,
    latest_column: int | None,
    todo_column: int | None,
    locale: str = "en",
) -> str:
    text = vaccine_text(locale)
    columns = calendar["columns"]
    month_indexes = [
        index
        for index, column in enumerate(columns)
        if is_plain_month_column(column)
    ]
    if not month_indexes:
        return ""

    group_start = month_indexes[0]
    group_end = month_indexes[-1]
    if month_indexes != list(range(group_start, group_end + 1)):
        return ""
    month_count = group_end - group_start + 1
    pregnancy_count = sum(1 for column in columns[:group_start] if normalized_disease_name(column) == "pregnancy" or normalized_disease_name(column) == "бременност")
    later_start = group_end + 1
    later_end = ECDC_ADULT_EXTRA_START_COLUMN
    later_count = later_end - later_start
    adult_count = len(columns) - ECDC_ADULT_EXTRA_START_COLUMN
    later_group = (
        "                  "
        f'<th scope="colgroup" class="immunization-age-group-label" '
        f'colspan="{later_count}" data-calendar-group="late" '
        f'data-column-start="{later_start}" data-column-end="{later_end}" hidden>'
        f'{html.escape(text["years"])}</th>'
        if later_count
        else ""
    )
    adult_group = (
        "                  "
        f'<th scope="colgroup" class="immunization-age-group-label" '
        f'colspan="{adult_count}" data-calendar-group="adult" '
        f'data-column-start="{ECDC_ADULT_EXTRA_START_COLUMN}" data-column-end="{len(columns)}" hidden>'
        f'{html.escape(text["years"])}</th>'
        if adult_count
        else ""
    )
    leading_header_cells = []
    index = 0
    while index < group_start:
        span = 1
        while index + span < group_start and columns[index + span] == columns[index]:
            span += 1
        classes = immunization_column_classes(
            "immunization-age-header",
            index,
            latest_column,
            todo_column,
            span,
        )
        colspan = f' colspan="{span}" data-column-span="{span}"' if span > 1 else ""
        group_attrs = ""
        if (
            normalized_disease_name(columns[index]) in {"pregnancy", "бременност"}
            and index == 0
        ):
            group_attrs = (
                ' data-calendar-group="pregnancy"'
                f' data-column-start="{index}" data-column-end="{index + span}"'
            )
        leading_header_cells.append(
            "                  "
            f'<th scope="col" class="{classes}" rowspan="2" data-column-index="{index}"{colspan}{group_attrs}>'
            f"{immunization_age_header_html(columns[index])}</th>"
        )
        index += span
    leading_headers = "\n".join(leading_header_cells)
    escaped_left_header = html.escape(calendar["leftHeader"], quote=True)
    return f"""                <tr class="immunization-age-group-row">
                  <th class="immunization-left-header" rowspan="2" aria-label="{escaped_left_header}"></th>
{leading_headers}
                  <th scope="colgroup" class="immunization-age-group-label" colspan="{month_count}" data-calendar-group="early" data-column-start="{group_start}" data-column-end="{group_end + 1}">{html.escape(text["months"])}</th>
{later_group}
{adult_group}
                </tr>"""


def immunization_table_html(
    calendar: dict,
    header_records: list[list[VaccineRecord]],
    personal_vaccines_label: str,
    locale: str = "en",
) -> str:
    text = vaccine_text(locale)
    latest_column = latest_vaccine_column(header_records)
    todo_column = next_todo_column(header_records)
    todo_label = next_todo_label(calendar, header_records, locale) if todo_column is not None else None
    month_group_row = immunization_month_group_row_html(
        calendar,
        latest_column,
        todo_column,
        locale,
    )
    date_columns = "\n".join(
        "                  "
        f"<th scope=\"col\" class=\"{immunization_column_classes('immunization-date-header', index, latest_column, todo_column)}\" data-column-index=\"{index}\">"
        f"{immunization_header_cell_html(header_records[index], todo_label if index == todo_column else None, 'calendar-next-date' if index == todo_column else None)}</th>"
        for index in range(len(calendar["columns"]))
    )
    age_columns = "\n".join(
        "                  "
        f"<th scope=\"col\" class=\"{immunization_column_classes('immunization-age-header', index, latest_column, todo_column)}\" data-column-index=\"{index}\">"
        f"{immunization_age_header_html(column)}</th>"
        for index, column in enumerate(calendar["columns"])
        if not month_group_row or is_plain_month_column(column) or is_plain_year_column(column)
    )
    column_defs = "\n".join(
        "                "
        f'<col{(" class=\"calendar-latest-vaccine-column\"" if index == latest_column else " class=\"calendar-todo-column\"" if index == todo_column else "")} '
        f'data-column-index="{index}" style="width: {compact_column_width_ch(calendar, header_records, index, todo_label if index == todo_column else None)}ch">'
        for index in range(len(calendar["columns"]))
    )

    body_rows = []
    column_count = len(calendar["columns"])
    mandatory_count = mandatory_row_count(calendar["rows"])
    has_section_rows = has_mandatory_cell_metadata(calendar["rows"])
    for row_index, row in enumerate(calendar["rows"]):
        if has_section_rows and row_index == 0 and mandatory_count:
            body_rows.append(immunization_section_row_html(text["mandatory"], column_count))
        if has_section_rows and row_index == mandatory_count and row_index < len(calendar["rows"]):
            body_rows.append(immunization_section_row_html(text["recommended"], column_count))

        cells_by_column = {cell["column"]: cell for cell in row["cells"]}
        cells = []
        column = 0
        while column < column_count:
            cell = cells_by_column.get(column)
            if cell is None:
                cell_class = immunization_column_classes(
                    "calendar-empty",
                    column,
                    latest_column,
                    todo_column,
                )
                cells.append(
                    f'<td class="{cell_class}" '
                    f'data-row-index="{row_index}" data-column-index="{column}"></td>'
                )
                column += 1
                continue

            span = cell.get("span", 1)
            colspan = f' colspan="{span}"' if span > 1 else ""
            base_classes = []
            if span > 1:
                base_classes.append("calendar-span-cell")
            if cell.get("muted"):
                base_classes.append("calendar-muted-vaccine")
            base_class = " ".join(base_classes)
            cell_class = immunization_column_classes(
                base_class,
                column,
                latest_column,
                todo_column,
                span,
            )
            cell_class = f' class="{cell_class}"' if cell_class else ""
            cells.append(
                f'<td{colspan}{cell_class} data-row-index="{row_index}" '
                f'data-column-index="{column}" data-column-span="{span}"'
                f">{immunization_cell_html(cell)}</td>"
            )
            column += span

        body_rows.append(
            "              "
            f"<tr{(' class=\"calendar-divider-after\"' if row.get('dividerAfter') else '')}>"
            f"{row_header_html(row, locale)}"
            f"{''.join(cells)}</tr>"
        )

    rows = "\n".join(body_rows)
    age_left_header = (
        ""
        if month_group_row
        else f'                  <th scope="col" class="immunization-left-header" rowspan="2" aria-label="{html.escape(calendar["leftHeader"], quote=True)}"></th>\n'
    )
    date_left_header = (
        f'                  <th scope="col" class="immunization-left-header immunization-vaccines-header">{html.escape(personal_vaccines_label)}</th>\n'
    )
    return f"""<table class="immunization-table" aria-label="{html.escape(calendar['title'])}">
              <colgroup>
                <col class="immunization-kind-column">
{column_defs}
              </colgroup>
              <thead>
{month_group_row}
                <tr>
{age_left_header.rstrip()}
{age_columns}
                </tr>
                <tr class="immunization-vaccines-row">
{date_left_header.rstrip()}
{date_columns}
                </tr>
              </thead>
              <tbody>
{rows}
              </tbody>
            </table>"""


def immunization_vaccine_link_html(record: VaccineRecord) -> str:
    style = f' style="color: {html.escape(record.border_color, quote=True)}"'
    escaped_vaccine = html.escape(record.vaccine)
    if not record.url:
        return f"<span{style}>{escaped_vaccine}</span>"

    escaped_url = html.escape(record.url, quote=True)
    return (
        f'<a class="vaccine-link" href="{escaped_url}" target="_blank" '
        f'rel="noopener"{style}>{escaped_vaccine}</a>'
    )


def age_months(measured_on: date, birth_date: date) -> float:
    return (measured_on - birth_date).days / DAYS_PER_MONTH


def format_vaccine_date(value: str) -> str:
    parts = value.split(".")
    if len(parts) == 3 and len(parts[2]) == 4:
        return ".".join([parts[0], parts[1], parts[2][-2:]])
    return value


def format_short_vaccine_date(value: date) -> str:
    return value.strftime("%d.%m.%y")


def add_calendar_months(value: date, months: int) -> date:
    month_index = value.month - 1 + months
    year = value.year + month_index // 12
    month = month_index % 12 + 1
    day = min(value.day, monthrange(year, month)[1])
    return date(year, month, day)


def add_calendar_month_delay(value: date, month_delay: float) -> date:
    whole_months = round(month_delay)
    if math.isclose(month_delay, whole_months):
        return add_calendar_months(value, whole_months)
    return value + timedelta(days=round(month_delay * DAYS_PER_MONTH))


def parse_vaccine_date(value: str) -> date:
    day, month, year = (int(part) for part in value.split("."))
    return date(year, month, day)


def load_vaccine_records(path: Path) -> list[VaccineRecord]:
    if not path.exists():
        return []

    data = read_yaml(path)
    rows: list[VaccineRecord] = []
    for index, row in enumerate(data.get("records", [])):
        date_text = str(row.get("date") or "").strip()
        vaccine = str(row.get("vaccine") or "").strip()
        url = str(row.get("url") or "").strip()
        diseases = tuple(
            str(disease).strip()
            for disease in row.get("diseases", [])
            if str(disease).strip()
        )
        if date_text or vaccine:
            color = VACCINE_OVERLAY_COLORS[index % len(VACCINE_OVERLAY_COLORS)]
            rows.append(
                VaccineRecord(
                    given_on=parse_vaccine_date(date_text),
                    date_text=format_vaccine_date(date_text),
                    vaccine=vaccine,
                    url=url,
                    diseases=diseases,
                    border_color=color["border"],
                    fill_color=color["fill"],
                )
            )
    return rows


def ecdc_row_has_mandatory_cell(row: dict) -> bool:
    return any(cell.get("mandatory") for cell in row["cells"])


def ecdc_column_index(column: str | int, occurrence: int = 1) -> int:
    if isinstance(column, int):
        return column

    if column in COLUMN_ID_TO_INDEX:
        return COLUMN_ID_TO_INDEX[column]

    normalized_column = normalized_disease_name(column)
    matches = [
        index
        for index, column_def in enumerate(COLUMN_DEFS)
        if normalized_disease_name(column_def["label"]["en"]) == normalized_column
        or normalized_disease_name(column_def["label"].get("bg", "")) == normalized_column
    ]
    if not matches:
        raise ValueError(f"Unknown vaccine schedule column: {column}")
    if occurrence < 1 or occurrence > len(matches):
        raise ValueError(
            f"Column {column!r} occurrence {occurrence} is outside 1..{len(matches)}"
        )
    return matches[occurrence - 1]


def dose_reference_key(disease_id: str, dose: dict) -> tuple[str, str, str]:
    return (
        disease_id,
        str(dose["column"]),
        str(dose.get("through", "")),
    )


def schedule_dose_texts_by_dose(texts_data: dict) -> dict[tuple[str, str, str], str]:
    texts = {}
    for row in texts_data.get("dose_texts", []):
        disease_id = row["disease"]
        for dose in row.get("doses", []):
            texts[dose_reference_key(disease_id, dose)] = str(dose["text"])
    return texts


def schedule_notes_by_dose(notes_data: dict) -> dict[tuple[str, str, str], str]:
    notes = {}
    for row in notes_data.get("notes", []):
        disease_id = row["disease"]
        for dose in row.get("doses", []):
            notes[dose_reference_key(disease_id, dose)] = str(dose["note"])
    return notes


SCHEDULE_DOSE_TEXTS_BY_DOSE = schedule_dose_texts_by_dose(SCHEDULE_DOSE_TEXTS_DATA)
SCHEDULE_NOTES_BY_DOSE = schedule_notes_by_dose(SCHEDULE_NOTES_DATA)


def curated_cell(cell: dict) -> dict:
    column = ecdc_column_index(cell["column"], int(cell.get("occurrence", 1)))
    converted = {
        ("noteStyle" if key == "note_style" else key): value
        for key, value in cell.items()
        if key not in {"column", "occurrence", "through"}
    }
    converted["column"] = column
    if "through" in cell:
        converted["span"] = ecdc_column_index(cell["through"]) - column + 1
    return converted


def schedule_row(row: dict, order: int) -> dict:
    disease = DISEASE_BY_ID[row["disease"]]
    group = row.get("group", "recommended")
    converted = {
        "id": disease["id"],
        "label": disease["label"]["en"],
        "cells": [],
        "_order": order,
    }
    if label_title := disease["label"].get("bg"):
        converted["labelTitle"] = label_title
    if row.get("divider_after"):
        converted["dividerAfter"] = True

    for dose in row.get("doses", []):
        dose_with_text = dict(dose)
        reference_key = dose_reference_key(row["disease"], dose)
        dose_with_text["text"] = SCHEDULE_DOSE_TEXTS_BY_DOSE[reference_key]
        if reference_key in SCHEDULE_NOTES_BY_DOSE:
            dose_with_text["note"] = SCHEDULE_NOTES_BY_DOSE[reference_key]
        cell = curated_cell(dose_with_text)
        cell["mandatory"] = dose.get("mandatory", group == "mandatory")
        converted["cells"].append(cell)
    return converted


def overlay_fill_lookup() -> dict[tuple[str, str], str]:
    return {
        (
            overlay["vaccine"],
            str(overlay["cell_text"]),
        ): str(overlay["fill_background"])
        for overlay in METADATA.get("cell_fills", [])
    }


def load_immunization_calendar() -> dict:
    source_rows = SCHEDULE_DATA.get("rows", [])
    if not source_rows:
        raise ValueError(f"No vaccine schedule rows found in {DATA_DIR / 'schedule.yaml'}")
    rows = [
        schedule_row(row, index)
        for index, row in enumerate(copy.deepcopy(source_rows))
    ]

    return {
        "id": "ecdc-immunization-calendar",
        "title": vaccine_text("en")["schedule_title"],
        "leftHeader": "Immunization",
        "columns": ECDC_CALENDAR_COLUMNS,
        "ageMonths": ECDC_CALENDAR_AGE_MONTHS,
        "overlayFills": overlay_fill_lookup(),
        "rows": rows,
    }


def localized_calendar(calendar: dict, locale: str) -> dict:
    columns = list(calendar["columns"])
    if locale == "bg":
        localized_columns = ECDC_COLUMN_LOCALIZATIONS.get("bg", {})
        columns = [
            localized_columns.get(column, column)
            for column in columns
        ]
    return {
        **calendar,
        "title": vaccine_text(locale)["schedule_title"],
        "columns": columns,
    }


def configured_column_index(config: dict | None) -> int | None:
    if not config:
        return None
    return ecdc_column_index(config["column"], int(config.get("occurrence", 1)))


def pre_birth_record_column(record: VaccineRecord, pre_birth_columns: list[int]) -> int:
    normalized_diseases = {
        normalized_disease_name(disease)
        for disease in record.diseases
    }
    for rule in PRE_BIRTH_RECORD_COLUMN_RULES:
        if not normalized_diseases.intersection(
            normalized_disease_name(disease)
            for disease in rule.get("diseases", [])
        ):
            continue
        if (
            (column := configured_column_index(rule)) is not None
            and column in pre_birth_columns
        ):
            return column

    if (
        (column := configured_column_index(DEFAULT_PRE_BIRTH_RECORD_COLUMN)) is not None
        and column in pre_birth_columns
    ):
        return column
    return pre_birth_columns[0]


def vaccine_calendar_column(record: VaccineRecord, birth_date: date, calendar: dict) -> int:
    age_in_months = age_months(record.given_on, birth_date)
    pre_birth_columns = [
        index
        for index, age_month in enumerate(calendar["ageMonths"])
        if age_month < 0
    ]
    birth_column = next(
        (
            index
            for index, age_month in enumerate(calendar["ageMonths"])
            if math.isclose(age_month, 0.0)
        ),
        0,
    )
    if age_in_months < 0 and pre_birth_columns:
        return pre_birth_record_column(record, pre_birth_columns)
    if age_in_months <= 0.25:
        return birth_column
    return min(
        enumerate(calendar["ageMonths"]),
        key=lambda item: abs(item[1] - age_in_months),
    )[0]


def vaccine_calendar_header_records(
    records: list[VaccineRecord],
    birth_date: date,
    calendar: dict,
) -> list[list[VaccineRecord]]:
    column_count = len(calendar["columns"])
    records_by_column: list[list[VaccineRecord]] = [[] for _ in range(column_count)]
    for record in records:
        column = vaccine_calendar_column(record, birth_date, calendar)
        if column >= column_count:
            continue
        records_by_column[column].append(record)

    return records_by_column


def vaccine_disease_row_indexes(calendar: dict, disease: str) -> list[int]:
    target_labels = VACCINE_DISEASE_ROW_LABELS.get(normalized_disease_name(disease), ())
    if not target_labels:
        return []

    row_indexes = []
    normalized_targets = {normalized_disease_name(label) for label in target_labels}
    for index, row in enumerate(calendar["rows"]):
        if normalized_disease_name(row["label"]) in normalized_targets:
            row_indexes.append(index)
    return row_indexes


def vaccine_overlay_payload(
    records: list[VaccineRecord],
    birth_date: date,
    calendar: dict,
) -> list[dict]:
    overlays: list[dict] = []
    for record in records:
        row_indexes = sorted(
            row_index
            for disease in record.diseases
            for row_index in vaccine_disease_row_indexes(calendar, disease)
        )
        if not row_indexes:
            continue

        overlays.append(
            {
                "column": vaccine_calendar_column(record, birth_date, calendar),
                "startRow": row_indexes[0],
                "endRow": row_indexes[-1],
                "label": record.vaccine,
                "date": record.date_text,
                "url": record.url,
                "borderColor": record.border_color,
                "fillColor": record.fill_color,
            }
        )
    return overlays


def schedule_cell_overlay_payload(calendar: dict) -> list[dict]:
    combined_overlay_labels = {
        str(label)
        for label in SCHEDULE_CELL_OVERLAY_CONFIG.get("combined_rows", [])
    }
    split_overlay_labels = {
        str(label)
        for label in SCHEDULE_CELL_OVERLAY_CONFIG.get("split_rows", [])
    }
    overlays = []
    overlay_fills = calendar.get("overlayFills", {})
    hexavalent_rows_by_column: dict[int, list[int]] = {}
    for row_index, row in enumerate(calendar["rows"]):
        vaccine_id = row.get("id", normalized_disease_name(row["label"]))
        for cell in row["cells"]:
            if vaccine_id in combined_overlay_labels:
                hexavalent_rows_by_column.setdefault(cell["column"], []).append(row_index)
                continue

            parts = [
                part
                for part in str(cell["text"]).splitlines()
                if part.strip()
            ]
            if (
                vaccine_id in split_overlay_labels
                and len(parts) > 1
            ):
                for slot, _part in enumerate(parts):
                    overlays.append(
                        {
                            "kind": "schedule-cell",
                            "column": cell["column"],
                            "startRow": row_index,
                            "endRow": row_index,
                            "slot": slot,
                            "slots": len(parts),
                            "borderColor": "rgb(148 163 184 / 0.56)",
                            "fillColor": "#ffffff",
                        }
                    )
                continue

            overlays.append(
                {
                    "kind": "schedule-cell",
                    "column": cell["column"],
                    "startRow": row_index,
                    "endRow": row_index,
                    "borderColor": "rgb(148 163 184 / 0.56)",
                    "fillColor": "#ffffff",
                    **(
                        {"fillBackground": fill_background}
                        if (
                            fill_background := overlay_fills.get(
                                (vaccine_id, str(cell["text"]))
                            )
                        )
                        else {}
                    ),
                }
            )
    for column, row_indexes in sorted(hexavalent_rows_by_column.items()):
        overlays.append(
            {
                "kind": "schedule-cell",
                "column": column,
                "startRow": min(row_indexes),
                "endRow": max(row_indexes),
                "borderColor": "rgb(148 163 184 / 0.56)",
                "fillColor": "#ffffff",
            }
        )
    return overlays
