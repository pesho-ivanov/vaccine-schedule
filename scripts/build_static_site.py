#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import shutil
import zipfile
import csv
from pathlib import Path
from typing import Any
from xml.etree import ElementTree

import yaml


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
BG_DATA_DIR = DATA_DIR / "bg"
SITE_SRC_DIR = ROOT / "site-src"
SITE_DIR = ROOT / "generated-site"
STATIC_FILES = (
    "index.html",
    "site-route.js",
    "page-nav.js",
    "app.js",
    "his-sheet.js",
    "ncpr-sheet.js",
    "ema-sheet.js",
    "bda-sheet.js",
    "styles.css",
    "CNAME",
)
ROOT_STATIC_FILES = ("ECDC_logo_simple.svg",)
HIS_VACCINE_SPEC_PATH = DATA_DIR / "his/vaccine-specifications.yaml"
HIS_CHANGE_NOTES_DIR = DATA_DIR / "his/change-notes"
HIS_PRODUCTS_PATH = DATA_DIR / "his/products.csv"
NCPR_VACC_DIR = DATA_DIR / "ncpr/vacc"
NCPR_SOURCE_URL = "https://www.ncpr.bg/bg/%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B8.html"
EMA_DIR = DATA_DIR / "ema"
EMA_SOURCE_URL = "https://www.ema.europa.eu/en/medicines"
BDA_DIR = DATA_DIR / "bda"
BDA_SOURCE_URL = "https://bda.bg/bg/%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B8"
HIS_SHEET_NAMES = ("Change Notes", "CL037", "CL038")
HIS_OMITTED_COLUMNS = {
    "Change Notes": ("Дата на тестова", "Дата на прод"),
}
XLSX_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
XLSX_REL_NS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
PACKAGE_REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def read_yaml(name: str) -> dict[str, Any]:
    with (DATA_DIR / name).open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{name}: expected mapping at document root")
    translation_path = BG_DATA_DIR / name
    if translation_path.is_file():
        with translation_path.open(encoding="utf-8") as handle:
            translations = yaml.safe_load(handle) or {}
        if not isinstance(translations, dict):
            raise ValueError(f"data/bg/{name}: expected mapping at document root")
        data = merge_overlay(data, translations)
    return data


def merge_overlay(base: Any, overlay: Any) -> Any:
    if not isinstance(base, dict) and isinstance(overlay, dict) and "bg" in overlay:
        return {"en": str(base), **overlay}

    if isinstance(base, dict) and isinstance(overlay, dict):
        merged = dict(base)
        for key, value in overlay.items():
            if key in {"version", "country"}:
                continue
            merged[key] = merge_overlay(merged[key], value) if key in merged else value
        return merged

    if isinstance(base, list) and isinstance(overlay, list):
        merged = list(base)
        positions = {
            item["id"]: index
            for index, item in enumerate(merged)
            if isinstance(item, dict) and "id" in item
        }
        if len(positions) == len(merged):
            for item in overlay:
                item_id = item.get("id") if isinstance(item, dict) else None
                if item_id in positions:
                    merged[positions[item_id]] = merge_overlay(merged[positions[item_id]], item)
                else:
                    merged.append(item)
            return merged

    return overlay


def language_map(value: dict[str, Any] | None, fallback: str) -> dict[str, str]:
    value = value or {}
    english = str(value.get("en") or fallback)
    bulgarian = str(value.get("bg") or english)
    return {"en": english, "bg": bulgarian}


def optional_language_map(value: dict[str, Any] | None) -> dict[str, str]:
    value = value or {}
    return {"en": str(value.get("en", "")), "bg": str(value.get("bg", ""))}


def dose_reference_key(disease_id: str, dose: dict[str, Any]) -> tuple[str, str, str]:
    return (
        disease_id,
        str(dose["column"]),
        str(dose.get("through", "")),
    )


def build_text_lookup(texts_data: dict[str, Any]) -> dict[tuple[str, str, str], str]:
    texts = {}
    for row in texts_data.get("dose_texts", []):
        disease_id = row["disease"]
        for dose in row.get("doses", []):
            texts[dose_reference_key(disease_id, dose)] = str(dose["text"])
    return texts


def build_note_lookup(notes_data: dict[str, Any]) -> dict[tuple[str, str, str], str]:
    notes = {}
    for row in notes_data.get("notes", []):
        disease_id = row["disease"]
        for dose in row.get("doses", []):
            notes[dose_reference_key(disease_id, dose)] = str(dose["note"])
    return notes


def build_ecdc_links(disease: dict[str, Any]) -> list[dict[str, str]]:
    return [
        {
            "label": str(disease["label"]["en"]),
            "url": str(ecdc_url),
        }
        for ecdc_url in disease.get("ecdc_url", [])
    ]


def schedule_rows(schedule_data: dict[str, Any]) -> list[dict[str, Any]]:
    return [
        {**row, "group": group}
        for group, key in (
            ("mandatory", "rows_mandatory"),
            ("recommended", "rows_recommended"),
        )
        for row in schedule_data.get(key, [])
    ]


def his_vaccine_spec() -> dict[str, Any]:
    with HIS_VACCINE_SPEC_PATH.open(encoding="utf-8") as handle:
        spec = yaml.safe_load(handle) or {}
    if not isinstance(spec, dict):
        raise ValueError(f"{HIS_VACCINE_SPEC_PATH}: expected mapping")
    return spec


def column_number(cell_reference: str) -> int:
    match = re.match(r"([A-Z]+)", cell_reference)
    if not match:
        raise ValueError(f"invalid XLSX cell reference: {cell_reference}")

    number = 0
    for char in match.group(1):
        number = number * 26 + ord(char) - ord("A") + 1
    return number


def shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []

    root = ElementTree.fromstring(archive.read("xl/sharedStrings.xml"))
    strings = []
    for item in root.iter(f"{XLSX_NS}si"):
        strings.append("".join(text.text or "" for text in item.iter(f"{XLSX_NS}t")))
    return strings


def red_style_indexes(archive: zipfile.ZipFile) -> set[str]:
    root = ElementTree.fromstring(archive.read("xl/styles.xml"))
    fonts_element = root.find(f"{XLSX_NS}fonts")
    cell_formats_element = root.find(f"{XLSX_NS}cellXfs")
    fonts = list(fonts_element) if fonts_element is not None else []
    cell_formats = list(cell_formats_element) if cell_formats_element is not None else []
    red_styles = set()

    for style_index, cell_format in enumerate(cell_formats):
        font_id = int(cell_format.attrib.get("fontId", "0"))
        if font_id >= len(fonts):
            continue
        color = fonts[font_id].find(f"{XLSX_NS}color")
        if color is not None and is_red_rgb(color.attrib.get("rgb", "")):
            red_styles.add(str(style_index))

    return red_styles


def red_fill_style_indexes(archive: zipfile.ZipFile) -> set[str]:
    root = ElementTree.fromstring(archive.read("xl/styles.xml"))
    fills_element = root.find(f"{XLSX_NS}fills")
    cell_formats_element = root.find(f"{XLSX_NS}cellXfs")
    fills = list(fills_element) if fills_element is not None else []
    cell_formats = list(cell_formats_element) if cell_formats_element is not None else []
    red_styles = set()

    for style_index, cell_format in enumerate(cell_formats):
        fill_id = int(cell_format.attrib.get("fillId", "0"))
        if fill_id >= len(fills):
            continue
        fill = fills[fill_id]
        if any(is_red_rgb(color.attrib.get("rgb", "")) for color in fill.iter(f"{XLSX_NS}fgColor")):
            red_styles.add(str(style_index))

    return red_styles


def is_red_rgb(value: str) -> bool:
    value = value.upper()
    if len(value) == 8:
        value = value[2:]
    if len(value) != 6:
        return False

    red = int(value[0:2], 16)
    green = int(value[2:4], 16)
    blue = int(value[4:6], 16)
    return red >= 180 and green <= 80 and blue <= 80


def workbook_sheet_paths(archive: zipfile.ZipFile) -> dict[str, str]:
    workbook = ElementTree.fromstring(archive.read("xl/workbook.xml"))
    relationships = ElementTree.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    targets_by_id = {
        relationship.attrib["Id"]: relationship.attrib["Target"]
        for relationship in relationships.iter(f"{PACKAGE_REL_NS}Relationship")
    }

    paths = {}
    for sheet in workbook.iter(f"{XLSX_NS}sheet"):
        name = sheet.attrib.get("name")
        relationship_id = sheet.attrib.get(f"{XLSX_REL_NS}id")
        if not name or not relationship_id:
            continue
        target = targets_by_id[relationship_id].lstrip("/")
        paths[name] = target if target.startswith("xl/") else f"xl/{target}"
    return paths


def cell_text(cell: ElementTree.Element, strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return normalized_cell_text("".join(text.text or "" for text in cell.iter(f"{XLSX_NS}t")))

    value = cell.find(f"{XLSX_NS}v")
    if value is None or value.text is None:
        return ""

    if cell_type == "s":
        return normalized_cell_text(strings[int(value.text)])
    if cell_type == "b":
        return "TRUE" if value.text == "1" else "FALSE"
    return normalized_cell_text(value.text)


def normalized_cell_text(value: str) -> str:
    return value.replace("\xa0", " ").strip()


def sheet_rows(
    archive: zipfile.ZipFile,
    sheet_path: str,
    strings: list[str],
    red_styles: set[str],
    red_fill_styles: set[str],
) -> tuple[list[dict[str, Any]], int]:
    root = ElementTree.fromstring(archive.read(sheet_path))
    rows: list[dict[str, Any]] = []
    max_column = 0

    for row in root.iter(f"{XLSX_NS}row"):
        cells_by_column: dict[int, str] = {}
        styles_by_column: dict[int, str] = {}
        for cell in row.iter(f"{XLSX_NS}c"):
            reference = cell.attrib.get("r")
            if not reference:
                continue
            column = column_number(reference)
            value = cell_text(cell, strings)
            if value:
                cells_by_column[column] = value
                max_column = max(max_column, column)
                if cell.attrib.get("s") in red_styles:
                    styles_by_column[column] = "red"
                if column == 1 and cell.attrib.get("s") in red_fill_styles:
                    styles_by_column[0] = "red"

        if cells_by_column:
            projected_row: dict[str, Any] = {
                "index": int(row.attrib["r"]),
                "cells": cells_by_column,
            }
            if styles_by_column:
                row_style = styles_by_column.pop(0, None)
                if row_style:
                    projected_row["row_style"] = row_style
                if styles_by_column:
                    projected_row["styles"] = styles_by_column
            rows.append(projected_row)

    return rows, max_column


def without_omitted_columns(
    rows: list[dict[str, Any]],
    column_count: int,
    omitted_headings: tuple[str, ...],
) -> tuple[list[dict[str, Any]], int]:
    if not rows or not omitted_headings:
        return rows, column_count

    omitted = set(omitted_headings)
    omitted_columns = {
        column
        for column, value in rows[0]["cells"].items()
        if str(value).strip() in omitted
    }
    if not omitted_columns:
        return rows, column_count

    column_map = {
        column: compact_column
        for compact_column, column in enumerate(
            (column for column in range(1, column_count + 1) if column not in omitted_columns),
            start=1,
        )
    }
    compact_rows = []
    for row in rows:
        cells = {
            column_map[column]: value
            for column, value in row["cells"].items()
            if column in column_map
        }
        if cells:
            styles = {
                column_map[column]: value
                for column, value in row.get("styles", {}).items()
                if column in column_map
            }
            compact_row = {**row, "cells": cells}
            if styles:
                compact_row["styles"] = styles
            elif "styles" in compact_row:
                del compact_row["styles"]
            compact_rows.append(compact_row)

    return compact_rows, len(column_map)


def his_sheet_label(name: str, rows: list[dict[str, Any]]) -> str:
    if name == "CL037":
        return "HIS products"
    if name == "CL038":
        return "HIS events"
    if name == "Change Notes":
        return "HIS changes"
    if name not in {"CL037", "CL038"} or not rows:
        return name

    cells = [str(value).strip() for value in rows[0]["cells"].values() if str(value).strip()]
    return cells[0] if len(cells) == 1 else name


def his_sheet_source_details(name: str, rows: list[dict[str, Any]]) -> dict[str, str]:
    if name in {"CL037", "CL038"} and rows:
        cells = [str(value).strip() for value in rows[0]["cells"].values() if str(value).strip()]
        if cells:
            sheet_name, separator, description = cells[0].partition(" - ")
            if separator:
                return {
                    "sheet_name": sheet_name.strip(),
                    "sheet_description": description.strip(),
                }
    if name == "Change Notes":
        return {
            "sheet_name": "Change Notes",
            "sheet_description": "Version change notes",
        }
    return {
        "sheet_name": name,
        "sheet_description": "",
    }


def version_sort_key(version: str) -> tuple[int, ...]:
    match = re.search(r"(\d+(?:\.\d+)+)", version)
    if not match:
        return ()
    return tuple(int(part) for part in match.group(1).split("."))


def build_change_notes() -> list[dict[str, Any]]:
    if not HIS_CHANGE_NOTES_DIR.is_dir():
        raise FileNotFoundError(f"missing HIS change notes directory: {HIS_CHANGE_NOTES_DIR}")

    versions = []
    for path in sorted(HIS_CHANGE_NOTES_DIR.glob("*.csv")):
        with path.open(encoding="utf-8", newline="") as handle:
            rows = list(csv.DictReader(handle))
        if not rows:
            continue
        version = rows[0]["version"]
        changes = []
        for row in rows:
            change = row.get("change", "")
            if not change:
                continue
            regards_vaccines = row.get("regarding vaccines")
            changes.append(
                {
                    "change": change,
                    "change_en": row.get("change EN", ""),
                    "regarding_vaccines": (
                        True
                        if regards_vaccines is None
                        else regards_vaccines.strip().casefold() == "true"
                    ),
                }
            )
        versions.append(
            {
                "version": version,
                "file": str(path.relative_to(ROOT)),
                "changes": changes,
            }
        )

    return sorted(versions, key=lambda item: version_sort_key(item["version"]), reverse=True)


def build_product_links() -> dict[str, dict[str, str]]:
    if not HIS_PRODUCTS_PATH.is_file():
        raise FileNotFoundError(f"missing HIS products links file: {HIS_PRODUCTS_PATH}")

    with HIS_PRODUCTS_PATH.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))

    links = {}
    for row in rows:
        key = str(row.get("key", "")).strip()
        if not key:
            continue
        links[key] = {
            "product": str(row.get("product", "")).strip(),
            "bda_listovka": str(row.get("BDA listovka link", "")).strip(),
            "bda_harakteristika": str(row.get("BDA harakteristika link", "")).strip(),
            "ema": str(row.get("EMA link", "")).strip(),
            "who": str(row.get("WHO link", "")).strip(),
            "fda": str(row.get("FDA link", "")).strip(),
        }
    return links


def build_his_sheets() -> dict[str, Any]:
    his_spec = his_vaccine_spec()
    sources_data = read_yaml("sources.yaml")
    artifact = DATA_DIR / "his" / str(his_spec["artifact"])
    if not artifact.is_file():
        raise FileNotFoundError(f"missing HIS artifact: {artifact}")

    with zipfile.ZipFile(artifact) as archive:
        strings = shared_strings(archive)
        red_styles = red_style_indexes(archive)
        red_fill_styles = red_fill_style_indexes(archive)
        paths = workbook_sheet_paths(archive)
        sheets = []
        for name in HIS_SHEET_NAMES:
            if name not in paths:
                raise ValueError(f"{artifact.name}: missing XLSX sheet {name}")
            rows, column_count = sheet_rows(
                archive,
                paths[name],
                strings,
                red_styles,
                red_fill_styles,
            )
            rows, column_count = without_omitted_columns(
                rows,
                column_count,
                HIS_OMITTED_COLUMNS.get(name, ()),
            )
            sheets.append(
                {
                    "name": name,
                    "label": his_sheet_label(name, rows),
                    "source": {
                        "name": "his.bg",
                        "url": str(his_spec["source_url"]),
                        "version": f"v{his_spec['his_version']}",
                        "date": str(his_spec["nomenclatures_date"]),
                        **his_sheet_source_details(name, rows),
                    },
                    "column_count": column_count,
                    "rows": rows,
                }
            )

    return {
        "schema_version": 1,
        "source": {
            "artifact": str(his_spec["artifact"]),
            "url": str(his_spec["source_url"]),
            "page_url": str(his_spec["pages"]["nomenclatures"]),
            "his_version": f"v{his_spec['his_version']}",
            "nomenclatures_date": str(his_spec["nomenclatures_date"]),
        },
        "source_links": sources_data["source_links"],
        "source_versions": {
            "his_bg": f"v{his_spec['his_version']}",
        },
        "change_notes": build_change_notes(),
        "product_links": build_product_links(),
        "sheets": sheets,
    }


def first_non_empty_cell(row: dict[str, Any] | None) -> str:
    if not row:
        return ""
    for _, value in sorted(row.get("cells", {}).items()):
        text = str(value).strip()
        if text:
            return text
    return ""


def contains_atc_header(value: str) -> bool:
    text = value.upper()
    return ("АТС" in text or "ATC" in text) and ("КОД" in text or "CODE" in text)


def contains_ncpr_data_header(value: str) -> bool:
    text = value.upper()
    return contains_atc_header(value) or (
        "МЕЖДУНАРОДНО" in text
        and "НЕПАТЕНТНО" in text
        and ("INN" in text or "НАИМЕНОВАНИЕ" in text)
    )


def ncpr_header_row_position(rows: list[dict[str, Any]]) -> int:
    for position, row in enumerate(rows):
        if any(contains_ncpr_data_header(str(value)) for value in row.get("cells", {}).values()):
            return position
    raise ValueError("missing NCPR data header row")


def ncpr_date_text(rows: list[dict[str, Any]]) -> str:
    for row in rows:
        text = first_non_empty_cell(row)
        match = re.search(r"(\d{2}\.\d{2}\.\d{4})", text)
        if match:
            return match.group(1)
    return ""


def ncpr_sheet_label(path: Path, source_rows: list[dict[str, Any]]) -> str:
    appendix = ""
    for row in source_rows:
        text = first_non_empty_cell(row)
        if "ПРИЛОЖЕНИЕ" in text.upper():
            appendix = text
            break

    match = re.search(r"(\d+)", appendix)
    if match:
        return f"NCPR Appendix {match.group(1)}"

    name = path.stem.split("-Export", 1)[0].replace("-", " ")
    return f"NCPR {name}"


def ncpr_national_number_column(header_rows: list[dict[str, Any]], column_count: int) -> int:
    for column in range(1, column_count + 1):
        if any(str(row.get("cells", {}).get(column, "")).strip() == "Национален номер" for row in header_rows):
            return column
    return 0


def normalize_ncpr_national_numbers(
    rows: list[dict[str, Any]],
    header_rows: list[dict[str, Any]],
    column_count: int,
) -> None:
    national_number_column = ncpr_national_number_column(header_rows, column_count)
    if not national_number_column:
        return

    for row in rows:
        value = str(row.get("cells", {}).get(national_number_column, "")).strip()
        match = re.fullmatch(r"(\d+)\.0+", value)
        if match:
            row["cells"][national_number_column] = match.group(1)


def build_ncpr_sheets() -> dict[str, Any]:
    sources_data = read_yaml("sources.yaml")
    sheets = []
    if NCPR_VACC_DIR.is_dir():
        for artifact in sorted(NCPR_VACC_DIR.glob("*.xlsx")):
            if artifact.name.startswith(".~lock"):
                continue
            with zipfile.ZipFile(artifact) as archive:
                strings = shared_strings(archive)
                red_styles = red_style_indexes(archive)
                red_fill_styles = red_fill_style_indexes(archive)
                paths = workbook_sheet_paths(archive)
                if not paths:
                    raise ValueError(f"{artifact.name}: no worksheets found")
                workbook_sheet_name, sheet_path = next(iter(paths.items()))
                rows, column_count = sheet_rows(
                    archive,
                    sheet_path,
                    strings,
                    red_styles,
                    red_fill_styles,
                )

            header_position = ncpr_header_row_position(rows)
            source_rows = rows[:header_position]
            header_rows = rows[header_position:header_position + 2]
            body_rows = rows[header_position + 2:]
            normalize_ncpr_national_numbers(body_rows, header_rows, column_count)
            sheet_name = first_non_empty_cell(next((row for row in source_rows if row["index"] == 4), None))
            sheet_description = first_non_empty_cell(
                next((row for row in source_rows if row["index"] == 5), None)
            )
            sheets.append(
                {
                    "id": artifact.stem,
                    "label": ncpr_sheet_label(artifact, source_rows),
                    "artifact": str(artifact.relative_to(ROOT)),
                    "workbook_sheet_name": workbook_sheet_name,
                    "title": first_non_empty_cell(source_rows[0] if source_rows else None),
                    "updated": ncpr_date_text(source_rows),
                    "source": {
                        "name": "NCPR",
                        "url": NCPR_SOURCE_URL,
                        "date": ncpr_date_text(source_rows),
                        "sheet_name": sheet_name or workbook_sheet_name,
                        "sheet_description": sheet_description,
                    },
                    "column_count": column_count,
                    "header_rows": header_rows,
                    "rows": body_rows,
                }
            )

    return {
        "schema_version": 1,
        "source": {
            "directory": str(NCPR_VACC_DIR.relative_to(ROOT)),
            "url": NCPR_SOURCE_URL,
        },
        "source_links": sources_data["source_links"],
        "source_versions": {},
        "sheets": sheets,
    }


def ema_header_row_position(rows: list[dict[str, Any]]) -> int:
    for position, row in enumerate(rows):
        if any(str(value).strip() == "ATC code (human)" for value in row.get("cells", {}).values()):
            return position
    raise ValueError("missing EMA ATC header row")


def ema_generated_text(source_rows: list[dict[str, Any]]) -> str:
    for row in source_rows:
        cells = row.get("cells", {})
        generated = str(cells.get(3, "")).strip()
        value = str(cells.get(4, "")).strip()
        if generated and value:
            return value
    return ""


def ema_sheet_label(path: Path) -> str:
    stem = path.stem
    if stem.endswith("_J07"):
        return "EU (EMA)"
    return f"EMA {stem.replace('-', ' ').replace('_', ' ')}"


def build_ema_sheets() -> dict[str, Any]:
    sources_data = read_yaml("sources.yaml")
    sheets = []
    if EMA_DIR.is_dir():
        for artifact in sorted(EMA_DIR.glob("*.xlsx")):
            if artifact.name.startswith(".~lock") or not artifact.stem.endswith("_J07"):
                continue
            with zipfile.ZipFile(artifact) as archive:
                strings = shared_strings(archive)
                red_styles = red_style_indexes(archive)
                red_fill_styles = red_fill_style_indexes(archive)
                paths = workbook_sheet_paths(archive)
                if not paths:
                    raise ValueError(f"{artifact.name}: no worksheets found")
                workbook_sheet_name, sheet_path = next(iter(paths.items()))
                rows, column_count = sheet_rows(
                    archive,
                    sheet_path,
                    strings,
                    red_styles,
                    red_fill_styles,
                )

            header_position = ema_header_row_position(rows)
            source_rows = rows[:header_position]
            header_rows = [rows[header_position]]
            body_rows = rows[header_position + 1:]
            sheets.append(
                {
                    "id": artifact.stem,
                    "label": ema_sheet_label(artifact),
                    "artifact": str(artifact.relative_to(ROOT)),
                    "workbook_sheet_name": workbook_sheet_name,
                    "title": "EMA medicines report",
                    "updated": ema_generated_text(source_rows),
                    "source": {
                        "name": "EMA",
                        "url": EMA_SOURCE_URL,
                        "date": ema_generated_text(source_rows),
                        "sheet_name": "Medicines report",
                        "sheet_description": "ATC J07 medicines",
                    },
                    "filter": {
                        "column": "ATC code (human)",
                        "prefix": "J07",
                    },
                    "column_count": column_count,
                    "header_rows": header_rows,
                    "rows": body_rows,
                }
            )

    return {
        "schema_version": 1,
        "source": {
            "directory": str(EMA_DIR.relative_to(ROOT)),
            "url": EMA_SOURCE_URL,
        },
        "source_links": sources_data["source_links"],
        "source_versions": {},
        "sheets": sheets,
    }


def bda_header_row_position(rows: list[dict[str, Any]]) -> int:
    for position, row in enumerate(rows):
        if any(str(value).strip() == "АТС-Код" for value in row.get("cells", {}).values()):
            return position
    raise ValueError("missing BDA ATC header row")


def bda_sheet_label(path: Path) -> str:
    stem = path.stem
    if stem.endswith("_J07"):
        return "Bulgarian (BDA)"
    return f"BDA {stem.replace('-', ' ').replace('_', ' ')}"


def bda_file_date(path: Path) -> str:
    match = re.search(r"_(\d{2})_(\d{4})(?:_|$)", path.stem)
    if not match:
        return ""
    return f"{match.group(1)}/{match.group(2)}"


def build_bda_sheets() -> dict[str, Any]:
    sources_data = read_yaml("sources.yaml")
    sheets = []
    if BDA_DIR.is_dir():
        for artifact in sorted(BDA_DIR.glob("*.xlsx")):
            if artifact.name.startswith(".~lock") or not artifact.stem.endswith("_J07"):
                continue
            with zipfile.ZipFile(artifact) as archive:
                strings = shared_strings(archive)
                red_styles = red_style_indexes(archive)
                red_fill_styles = red_fill_style_indexes(archive)
                paths = workbook_sheet_paths(archive)
                if not paths:
                    raise ValueError(f"{artifact.name}: no worksheets found")
                workbook_sheet_name, sheet_path = next(iter(paths.items()))
                rows, column_count = sheet_rows(
                    archive,
                    sheet_path,
                    strings,
                    red_styles,
                    red_fill_styles,
                )

            header_position = bda_header_row_position(rows)
            header_rows = [rows[header_position]]
            body_rows = rows[header_position + 1:]
            sheets.append(
                {
                    "id": artifact.stem,
                    "label": bda_sheet_label(artifact),
                    "artifact": str(artifact.relative_to(ROOT)),
                    "workbook_sheet_name": workbook_sheet_name,
                    "title": "BDA IAL register",
                    "updated": bda_file_date(artifact),
                    "source": {
                        "name": "BDA",
                        "url": BDA_SOURCE_URL,
                        "date": bda_file_date(artifact),
                        "sheet_name": "IAL register",
                        "sheet_description": "ATC J07 medicines",
                    },
                    "filter": {
                        "column": "АТС-Код",
                        "prefix": "J07",
                    },
                    "column_count": column_count,
                    "header_rows": header_rows,
                    "rows": body_rows,
                }
            )

    return {
        "schema_version": 1,
        "source": {
            "directory": str(BDA_DIR.relative_to(ROOT)),
            "url": BDA_SOURCE_URL,
        },
        "source_links": sources_data["source_links"],
        "source_versions": {},
        "sheets": sheets,
    }


def build_schedule_table(
    his_sheet_labels: dict[str, str] | None = None,
    ncpr_sheet_labels: dict[str, str] | None = None,
    ema_sheet_labels: dict[str, str] | None = None,
    bda_sheet_labels: dict[str, str] | None = None,
) -> dict[str, Any]:
    columns_data = read_yaml("columns.yaml")
    diseases_data = read_yaml("diseases.yaml")
    schedule_data = read_yaml("schedule.yaml")
    dose_texts_data = read_yaml("dose_texts.yaml")
    notes_data = read_yaml("notes.yaml")
    sources_data = read_yaml("sources.yaml")
    metadata = read_yaml("metadata.yaml")
    his_spec = his_vaccine_spec()

    columns = columns_data["columns"]
    column_ids = [column["id"] for column in columns]
    column_index = {column_id: index for index, column_id in enumerate(column_ids)}
    diseases = {disease["id"]: disease for disease in diseases_data["diseases"]}
    text_lookup = build_text_lookup(dose_texts_data)
    note_lookup = build_note_lookup(notes_data)
    cell_fills = {
        (fill["vaccine"], fill["cell_text"]): fill["fill_background"]
        for fill in metadata.get("cell_fills", [])
    }

    rows: list[dict[str, Any]] = []
    for schedule_row in schedule_rows(schedule_data):
        disease_id = schedule_row["disease"]
        disease = diseases[disease_id]
        doses: list[dict[str, Any]] = []

        for dose in schedule_row["doses"]:
            column = dose["column"]
            through = dose.get("through", column)
            start = column_index[column]
            end = column_index[through]
            if end < start:
                raise ValueError(f"{disease_id}: dose through column precedes start column")

            reference_key = dose_reference_key(disease_id, dose)
            dose_text = text_lookup[reference_key]
            dose_projection = {
                "column": column,
                "through": through,
                "span": end - start + 1,
                "text": dose_text,
            }
            if reference_key in note_lookup:
                dose_projection["note"] = note_lookup[reference_key]
            if dose.get("muted"):
                dose_projection["muted"] = True
            if dose.get("note_style") or dose.get("noteStyle"):
                dose_projection["note_style"] = True
            fill_background = cell_fills.get((disease_id, dose_text))
            if fill_background:
                dose_projection["fill_background"] = fill_background
            doses.append(dose_projection)

        rows.append(
            {
                "disease": disease_id,
                "group": schedule_row["group"],
                "label": language_map(disease.get("label"), disease_id),
                "short": optional_language_map(disease.get("short")),
                "ecdc_links": build_ecdc_links(disease),
                "doses": doses,
                "divider_after": bool(schedule_row.get("divider_after")),
            }
        )

    text = metadata["text"]
    return {
        "schema_version": 1,
        "country": columns_data["country"],
        "title": {
            "en": text["en"]["schedule_title"],
            "bg": text["bg"]["schedule_title"],
        },
        "columns": [
            {
                **{
                    "id": column["id"],
                    "label": language_map(column.get("label"), column["id"]),
                    "age_months": column["age_months"],
                },
                **(
                    {"header_label": optional_language_map(column["header_label"])}
                    if "header_label" in column
                    else {}
                ),
            }
            for column in columns
        ],
        "column_groups": [
            {
                "id": group["id"],
                "label": language_map(group.get("label"), group["id"]),
                "columns": group["columns"],
            }
            for group in columns_data.get("column_groups", [])
        ],
        "rows": rows,
        "table_source": {
            "name": "Immunization ordinance",
            "url": sources_data["source_links"]["lex_calendar"],
            "sheet_name": "Bulgarian immunization calendar",
            "sheet_description": text["en"]["schedule_title"],
        },
        "groups": {
            "mandatory": {
                "en": text["en"]["mandatory"],
                "bg": text["bg"]["mandatory"],
            },
            "recommended": {
                "en": text["en"]["recommended"],
                "bg": text["bg"]["recommended"],
            },
        },
        "source_links": sources_data["source_links"],
        "source_versions": {
            "his_bg": f"v{his_spec['his_version']}",
        },
        "his_sheets": list(HIS_SHEET_NAMES),
        "his_sheet_labels": {
            name: his_sheet_labels.get(name, name) if his_sheet_labels else name
            for name in HIS_SHEET_NAMES
        },
        "ncpr_sheets": list(ncpr_sheet_labels or {}),
        "ncpr_sheet_labels": ncpr_sheet_labels or {},
        "ema_sheets": list(ema_sheet_labels or {}),
        "ema_sheet_labels": ema_sheet_labels or {},
        "bda_sheets": list(bda_sheet_labels or {}),
        "bda_sheet_labels": bda_sheet_labels or {},
        "his_sheets_source": {
            "url": str(his_spec["pages"]["nomenclatures"]),
            "version": f"v{his_spec['his_version']}",
            "date": str(his_spec["nomenclatures_date"]),
        },
        "generated_from": [
            "data/columns.yaml",
            "data/bg/columns.yaml",
            "data/diseases.yaml",
            "data/bg/diseases.yaml",
            "data/schedule.yaml",
            "data/dose_texts.yaml",
            "data/notes.yaml",
            "data/sources.yaml",
            "data/his/vaccine-specifications.yaml",
            "data/metadata.yaml",
            "data/bg/metadata.yaml",
        ],
    }


def rebuild_site_dir() -> None:
    if SITE_DIR.exists():
        shutil.rmtree(SITE_DIR)
    SITE_DIR.mkdir()


def copy_static_files() -> None:
    for filename in STATIC_FILES:
        source = SITE_SRC_DIR / filename
        if not source.is_file():
            raise FileNotFoundError(f"missing static site source: {source}")
        shutil.copy2(source, SITE_DIR / filename)
    for filename in ROOT_STATIC_FILES:
        source = ROOT / filename
        if not source.is_file():
            raise FileNotFoundError(f"missing static site source: {source}")
        shutil.copy2(source, SITE_DIR / filename)
    (SITE_DIR / ".nojekyll").write_text("", encoding="utf-8")


def main() -> int:
    rebuild_site_dir()
    copy_static_files()
    his_sheets = build_his_sheets()
    his_sheet_labels = {
        sheet["name"]: sheet.get("label", sheet["name"])
        for sheet in his_sheets["sheets"]
    }
    ncpr_sheets = build_ncpr_sheets()
    ncpr_sheet_labels = {
        sheet["id"]: sheet.get("label", sheet["id"])
        for sheet in ncpr_sheets["sheets"]
    }
    ema_sheets = build_ema_sheets()
    ema_sheet_labels = {
        sheet["id"]: sheet.get("label", sheet["id"])
        for sheet in ema_sheets["sheets"]
    }
    bda_sheets = build_bda_sheets()
    bda_sheet_labels = {
        sheet["id"]: sheet.get("label", sheet["id"])
        for sheet in bda_sheets["sheets"]
    }
    his_sheets["ncpr_sheets"] = list(ncpr_sheet_labels)
    his_sheets["ncpr_sheet_labels"] = ncpr_sheet_labels
    his_sheets["ema_sheets"] = list(ema_sheet_labels)
    his_sheets["ema_sheet_labels"] = ema_sheet_labels
    his_sheets["bda_sheets"] = list(bda_sheet_labels)
    his_sheets["bda_sheet_labels"] = bda_sheet_labels
    ncpr_sheets["his_sheets"] = list(HIS_SHEET_NAMES)
    ncpr_sheets["his_sheet_labels"] = his_sheet_labels
    ncpr_sheets["ncpr_sheets"] = list(ncpr_sheet_labels)
    ncpr_sheets["ncpr_sheet_labels"] = ncpr_sheet_labels
    ncpr_sheets["ema_sheets"] = list(ema_sheet_labels)
    ncpr_sheets["ema_sheet_labels"] = ema_sheet_labels
    ncpr_sheets["bda_sheets"] = list(bda_sheet_labels)
    ncpr_sheets["bda_sheet_labels"] = bda_sheet_labels
    ema_sheets["his_sheets"] = list(HIS_SHEET_NAMES)
    ema_sheets["his_sheet_labels"] = his_sheet_labels
    ema_sheets["ncpr_sheets"] = list(ncpr_sheet_labels)
    ema_sheets["ncpr_sheet_labels"] = ncpr_sheet_labels
    ema_sheets["ema_sheets"] = list(ema_sheet_labels)
    ema_sheets["ema_sheet_labels"] = ema_sheet_labels
    ema_sheets["bda_sheets"] = list(bda_sheet_labels)
    ema_sheets["bda_sheet_labels"] = bda_sheet_labels
    bda_sheets["his_sheets"] = list(HIS_SHEET_NAMES)
    bda_sheets["his_sheet_labels"] = his_sheet_labels
    bda_sheets["ncpr_sheets"] = list(ncpr_sheet_labels)
    bda_sheets["ncpr_sheet_labels"] = ncpr_sheet_labels
    bda_sheets["ema_sheets"] = list(ema_sheet_labels)
    bda_sheets["ema_sheet_labels"] = ema_sheet_labels
    bda_sheets["bda_sheets"] = list(bda_sheet_labels)
    bda_sheets["bda_sheet_labels"] = bda_sheet_labels
    table = build_schedule_table(his_sheet_labels, ncpr_sheet_labels, ema_sheet_labels, bda_sheet_labels)
    json_text = json.dumps(table, ensure_ascii=False, indent=2)
    (SITE_DIR / "schedule-table.json").write_text(f"{json_text}\n", encoding="utf-8")
    (SITE_DIR / "schedule-table.js").write_text(
        "window.VACCINE_SCHEDULE_TABLE = "
        f"{json.dumps(table, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    his_sheets_json = json.dumps(his_sheets, ensure_ascii=False, indent=2)
    (SITE_DIR / "his-sheets.json").write_text(f"{his_sheets_json}\n", encoding="utf-8")
    (SITE_DIR / "his-sheets.js").write_text(
        "window.HIS_SHEETS = "
        f"{json.dumps(his_sheets, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    ncpr_sheets_json = json.dumps(ncpr_sheets, ensure_ascii=False, indent=2)
    (SITE_DIR / "ncpr-sheets.json").write_text(f"{ncpr_sheets_json}\n", encoding="utf-8")
    (SITE_DIR / "ncpr-sheets.js").write_text(
        "window.NCPR_SHEETS = "
        f"{json.dumps(ncpr_sheets, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    ema_sheets_json = json.dumps(ema_sheets, ensure_ascii=False, indent=2)
    (SITE_DIR / "ema-sheets.json").write_text(f"{ema_sheets_json}\n", encoding="utf-8")
    (SITE_DIR / "ema-sheets.js").write_text(
        "window.EMA_SHEETS = "
        f"{json.dumps(ema_sheets, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    bda_sheets_json = json.dumps(bda_sheets, ensure_ascii=False, indent=2)
    (SITE_DIR / "bda-sheets.json").write_text(f"{bda_sheets_json}\n", encoding="utf-8")
    (SITE_DIR / "bda-sheets.js").write_text(
        "window.BDA_SHEETS = "
        f"{json.dumps(bda_sheets, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print("copied site-src to generated-site")
    print("wrote generated-site/schedule-table.json")
    print("wrote generated-site/schedule-table.js")
    print("wrote generated-site/his-sheets.json")
    print("wrote generated-site/his-sheets.js")
    print("wrote generated-site/ncpr-sheets.json")
    print("wrote generated-site/ncpr-sheets.js")
    print("wrote generated-site/ema-sheets.json")
    print("wrote generated-site/ema-sheets.js")
    print("wrote generated-site/bda-sheets.json")
    print("wrote generated-site/bda-sheets.js")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
