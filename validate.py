#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data/bg"


def read_yaml(name: str) -> dict[str, Any]:
    with (DATA_DIR / name).open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{name}: expected mapping at document root")
    return data


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def require_header(name: str, data: dict[str, Any]) -> None:
    require(data.get("version") == 1, f"{name}: version must be 1")
    require(data.get("country") == "BG", f"{name}: country must be BG")


def require_mapping(value: Any, message: str) -> dict[str, Any]:
    require(isinstance(value, dict), message)
    return value


def require_list(value: Any, message: str) -> list[Any]:
    require(isinstance(value, list), message)
    return value


def require_string(value: Any, message: str) -> str:
    require(isinstance(value, str) and bool(value), message)
    return value


def require_unique(items: list[str], message: str) -> None:
    duplicates = sorted({item for item in items if items.count(item) > 1})
    require(not duplicates, f"{message}: {', '.join(duplicates)}")


def validate() -> None:
    sources = read_yaml("sources.yaml")
    metadata = read_yaml("metadata.yaml")
    columns = read_yaml("columns.yaml")
    vaccines = read_yaml("vaccines.yaml")
    schedule = read_yaml("schedule.yaml")

    for name, data in (
        ("sources.yaml", sources),
        ("metadata.yaml", metadata),
        ("columns.yaml", columns),
        ("vaccines.yaml", vaccines),
        ("schedule.yaml", schedule),
    ):
        require_header(name, data)

    source_links = require_mapping(sources.get("source_links"), "sources.yaml: source_links must be a mapping")
    require(source_links, "sources.yaml: source_links must not be empty")
    for key, value in source_links.items():
        require_string(key, "sources.yaml: source link keys must be non-empty strings")
        require_string(value, f"sources.yaml: {key} must be a non-empty string")

    column_rows = require_list(columns.get("columns"), "columns.yaml: columns must be a list")
    column_ids = [require_string(row.get("id"), "columns.yaml: column id is required") for row in column_rows]
    require_unique(column_ids, "columns.yaml: duplicate column ids")
    column_id_set = set(column_ids)
    for row in column_rows:
        label = require_mapping(row.get("label"), f"columns.yaml: {row.get('id')}: label must be a mapping")
        require_string(label.get("en"), f"columns.yaml: {row.get('id')}: label.en is required")
        require_string(label.get("bg"), f"columns.yaml: {row.get('id')}: label.bg is required")
        if "header_label" in row:
            header_label = require_mapping(row["header_label"], f"columns.yaml: {row.get('id')}: header_label must be a mapping")
            require(isinstance(header_label.get("en"), str), f"columns.yaml: {row.get('id')}: header_label.en must be a string")
            require(isinstance(header_label.get("bg"), str), f"columns.yaml: {row.get('id')}: header_label.bg must be a string")
        require(isinstance(row.get("age_months"), (int, float)), f"columns.yaml: {row.get('id')}: age_months must be numeric")

    if "column_groups" in columns:
        column_groups = require_list(columns["column_groups"], "columns.yaml: column_groups must be a list")
        group_ids = [require_string(group.get("id"), "columns.yaml: column group id is required") for group in column_groups]
        require_unique(group_ids, "columns.yaml: duplicate column group ids")
        grouped_columns: list[str] = []
        for group in column_groups:
            group_id = group["id"]
            label = require_mapping(group.get("label"), f"columns.yaml: {group_id}: label must be a mapping")
            require_string(label.get("en"), f"columns.yaml: {group_id}: label.en is required")
            require_string(label.get("bg"), f"columns.yaml: {group_id}: label.bg is required")
            group_columns = [
                require_string(column, f"columns.yaml: {group_id}: grouped column id is required")
                for column in require_list(group.get("columns"), f"columns.yaml: {group_id}: columns must be a list")
            ]
            for column in group_columns:
                require(column in column_id_set, f"columns.yaml: {group_id}: unknown grouped column {column}")
            require_unique(group_columns, f"columns.yaml: {group_id}: duplicate grouped columns")
            grouped_columns.extend(group_columns)
        require_unique(grouped_columns, "columns.yaml: duplicate column_groups column references")
        require(grouped_columns == column_ids, "columns.yaml: column_groups must cover every column exactly once in columns order")

    vaccine_rows = require_list(vaccines.get("vaccines"), "vaccines.yaml: vaccines must be a list")
    vaccine_ids = [require_string(row.get("id"), "vaccines.yaml: vaccine id is required") for row in vaccine_rows]
    require_unique(vaccine_ids, "vaccines.yaml: duplicate vaccine ids")
    vaccine_id_set = set(vaccine_ids)
    for row in vaccine_rows:
        label = require_mapping(row.get("label"), f"vaccines.yaml: {row.get('id')}: label must be a mapping")
        require_string(label.get("en"), f"vaccines.yaml: {row.get('id')}: label.en is required")
        require_string(label.get("bg"), f"vaccines.yaml: {row.get('id')}: label.bg is required")
        for optional_key in ("short", "hover_label"):
            if optional_key in row:
                optional_label = require_mapping(row[optional_key], f"vaccines.yaml: {row.get('id')}: {optional_key} must be a mapping")
                require(optional_label, f"vaccines.yaml: {row.get('id')}: {optional_key} must not be empty")

    text = require_mapping(metadata.get("text"), "metadata.yaml: text must be a mapping")
    require("en" in text and "bg" in text, "metadata.yaml: text must define en and bg")
    age_ranges = require_mapping(metadata.get("age_ranges"), "metadata.yaml: age_ranges must be a mapping")
    adult_start = require_string(age_ranges.get("adult_extra_start_column"), "metadata.yaml: adult_extra_start_column is required")
    require(adult_start in column_id_set, f"metadata.yaml: unknown adult_extra_start_column {adult_start}")

    for rule in require_list(metadata.get("pre_birth_record_columns", []), "metadata.yaml: pre_birth_record_columns must be a list"):
        column = require_string(rule.get("column"), "metadata.yaml: pre-birth rule column is required")
        require(column in column_id_set, f"metadata.yaml: unknown pre-birth column {column}")
        require_list(rule.get("diseases"), f"metadata.yaml: pre-birth rule {column}: diseases must be a list")
    default_pre_birth = require_mapping(metadata.get("default_pre_birth_record_column"), "metadata.yaml: default_pre_birth_record_column must be a mapping")
    default_column = require_string(default_pre_birth.get("column"), "metadata.yaml: default pre-birth column is required")
    require(default_column in column_id_set, f"metadata.yaml: unknown default pre-birth column {default_column}")

    overlays = require_mapping(metadata.get("schedule_cell_overlays"), "metadata.yaml: schedule_cell_overlays must be a mapping")
    for key in ("combined_rows", "split_rows"):
        for vaccine_id in require_list(overlays.get(key, []), f"metadata.yaml: {key} must be a list"):
            require(vaccine_id in vaccine_id_set, f"metadata.yaml: {key} references unknown vaccine {vaccine_id}")
    for fill in require_list(metadata.get("cell_fills", []), "metadata.yaml: cell_fills must be a list"):
        vaccine_id = require_string(fill.get("vaccine"), "metadata.yaml: cell_fills vaccine is required")
        require(vaccine_id in vaccine_id_set, f"metadata.yaml: cell_fills references unknown vaccine {vaccine_id}")
        require_string(fill.get("cell_text"), f"metadata.yaml: {vaccine_id}: cell_text is required")
        require_string(fill.get("fill_background"), f"metadata.yaml: {vaccine_id}: fill_background is required")

    schedule_rows = require_list(schedule.get("rows"), "schedule.yaml: rows must be a list")
    for row in schedule_rows:
        vaccine_id = require_string(row.get("vaccine"), "schedule.yaml: row vaccine is required")
        require(vaccine_id in vaccine_id_set, f"schedule.yaml: unknown vaccine {vaccine_id}")
        require(row.get("group") in {"mandatory", "recommended"}, f"schedule.yaml: {vaccine_id}: invalid group")
        for dose in require_list(row.get("doses"), f"schedule.yaml: {vaccine_id}: doses must be a list"):
            column = require_string(dose.get("column"), f"schedule.yaml: {vaccine_id}: dose column is required")
            require(column in column_id_set, f"schedule.yaml: {vaccine_id}: unknown column {column}")
            require_string(dose.get("text"), f"schedule.yaml: {vaccine_id}: dose text is required")
            if "through" in dose:
                through = require_string(dose["through"], f"schedule.yaml: {vaccine_id}: through must be a string")
                require(through in column_id_set, f"schedule.yaml: {vaccine_id}: unknown through column {through}")
                require(column_ids.index(through) >= column_ids.index(column), f"schedule.yaml: {vaccine_id}: through precedes column")


def main() -> int:
    validate()
    print("vaccine-schedule data valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
