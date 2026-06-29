#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
BG_DATA_DIR = DATA_DIR / "bg"
SITE_SRC_DIR = ROOT / "site-src"
SITE_DIR = ROOT / "generated-site"
STATIC_FILES = ("index.html", "app.js", "styles.css", "CNAME")
ROOT_STATIC_FILES = ("ECDC_logo_simple.svg",)


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


def build_schedule_table() -> dict[str, Any]:
    columns_data = read_yaml("columns.yaml")
    diseases_data = read_yaml("diseases.yaml")
    schedule_data = read_yaml("schedule.yaml")
    dose_texts_data = read_yaml("dose_texts.yaml")
    notes_data = read_yaml("notes.yaml")
    sources_data = read_yaml("sources.yaml")
    metadata = read_yaml("metadata.yaml")

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
    for schedule_row in schedule_data["rows"]:
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
        "generated_from": [
            "data/columns.yaml",
            "data/bg/columns.yaml",
            "data/diseases.yaml",
            "data/bg/diseases.yaml",
            "data/schedule.yaml",
            "data/dose_texts.yaml",
            "data/notes.yaml",
            "data/sources.yaml",
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
    table = build_schedule_table()
    json_text = json.dumps(table, ensure_ascii=False, indent=2)
    (SITE_DIR / "schedule-table.json").write_text(f"{json_text}\n", encoding="utf-8")
    (SITE_DIR / "schedule-table.js").write_text(
        "window.VACCINE_SCHEDULE_TABLE = "
        f"{json.dumps(table, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print("copied site-src to generated-site")
    print("wrote generated-site/schedule-table.json")
    print("wrote generated-site/schedule-table.js")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
