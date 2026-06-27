#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data/bg"
SITE_SRC_DIR = ROOT / "site-src"
SITE_DIR = ROOT / "generated-site"
STATIC_FILES = ("index.html", "app.js", "styles.css", "CNAME")
ROOT_STATIC_FILES = ("ECDC_logo_simple.svg",)
ECDC_DISEASE_URL = (
    "https://vaccine-schedule.ecdc.europa.eu/Scheduler/ByDisease"
    "?SelectedDiseaseId={disease_id}&SelectedCountryIdByDisease=-1"
)


def read_yaml(name: str) -> dict[str, Any]:
    with (DATA_DIR / name).open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{name}: expected mapping at document root")
    return data


def language_map(value: dict[str, Any] | None, fallback: str) -> dict[str, str]:
    value = value or {}
    english = str(value.get("en") or fallback)
    bulgarian = str(value.get("bg") or english)
    return {"en": english, "bg": bulgarian}


def optional_language_map(value: dict[str, Any]) -> dict[str, str]:
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
            "label": str(ecdc_disease["label"]),
            "url": ECDC_DISEASE_URL.format(disease_id=ecdc_disease["id"]),
        }
        for ecdc_disease in disease.get("ecdc_diseases", [])
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
                "short": language_map(disease.get("short"), disease["label"]["en"]),
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
            "data/bg/columns.yaml",
            "data/bg/diseases.yaml",
            "data/bg/schedule.yaml",
            "data/bg/dose_texts.yaml",
            "data/bg/notes.yaml",
            "data/bg/sources.yaml",
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
