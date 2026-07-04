#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
import shutil
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree

import yaml


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "data/his/vaccine-specifications.yaml"
DEFAULT_OUTPUT_DIR = ROOT / "data/his/change-notes"
XLSX_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
XLSX_REL_NS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
PACKAGE_REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def read_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = yaml.safe_load(handle) or {}
    if not isinstance(manifest, dict):
        raise ValueError(f"{path}: expected mapping")
    return manifest


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


def normalized_cell_text(value: str) -> str:
    return value.replace("\xa0", " ").strip()


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


def sheet_rows(
    archive: zipfile.ZipFile,
    sheet_path: str,
    strings: list[str],
) -> list[dict[int, str]]:
    root = ElementTree.fromstring(archive.read(sheet_path))
    rows: list[dict[int, str]] = []

    for row in root.iter(f"{XLSX_NS}row"):
        cells: dict[int, str] = {}
        for cell in row.iter(f"{XLSX_NS}c"):
            reference = cell.attrib.get("r")
            if not reference:
                continue
            value = cell_text(cell, strings)
            if value:
                cells[column_number(reference)] = value
        if cells:
            rows.append(cells)

    return rows


def version_slug(version: str) -> str:
    match = re.search(r"(\d+(?:\.\d+)+)", version)
    if not match:
        return re.sub(r"[^A-Za-z0-9._-]+", "-", version).strip("-").lower()
    return f"v{match.group(1)}"


def split_versions(rows: list[dict[int, str]]) -> list[tuple[str, list[str]]]:
    versions: list[tuple[str, list[str]]] = []
    current_version = ""
    current_notes: list[str] = []

    for row in rows:
        text = row.get(1, "").strip()
        if not text or text == "Версия / промени":
            continue

        if re.match(r"^Версия\b", text):
            if current_version:
                versions.append((current_version, current_notes))
            current_version = text
            current_notes = []
            continue

        if current_version:
            current_notes.append(text)

    if current_version:
        versions.append((current_version, current_notes))

    return versions


def write_version_csvs(versions: list[tuple[str, list[str]]], output_dir: Path) -> None:
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    for version, notes in versions:
        path = output_dir / f"{version_slug(version)}.csv"
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.writer(handle)
            writer.writerow(["version", "change"])
            for note in notes:
                writer.writerow([version, note])


def split_change_notes(manifest_path: Path, output_dir: Path) -> int:
    manifest = read_manifest(manifest_path)
    workbook_path = manifest_path.parent / str(manifest["artifact"])
    if not workbook_path.is_file():
        raise FileNotFoundError(f"missing HIS workbook: {workbook_path}")

    with zipfile.ZipFile(workbook_path) as archive:
        paths = workbook_sheet_paths(archive)
        if "Change Notes" not in paths:
            raise ValueError(f"{workbook_path.name}: missing XLSX sheet Change Notes")
        rows = sheet_rows(archive, paths["Change Notes"], shared_strings(archive))

    versions = split_versions(rows)
    write_version_csvs(versions, output_dir)
    print(f"wrote {len(versions)} CSV files to {output_dir}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Split the HIS Change Notes sheet into one CSV file per version."
    )
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()

    return split_change_notes(args.manifest, args.output_dir)


if __name__ == "__main__":
    raise SystemExit(main())
